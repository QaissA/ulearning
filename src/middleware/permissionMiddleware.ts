// auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { getUserPermissions } from "../services/permissionsService";

// Remove the global declaration if it's causing conflicts

export const verifyPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Accessing the user that was set by authentication middleware
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const permissions = await getUserPermissions(user.id);
      // Set permissions on req object
      (req as any).permissions = permissions;

      // Check if the user has the required permission
      const hasPermission = permissions.some(
        (p: any) => p.key === requiredPermission
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
};
