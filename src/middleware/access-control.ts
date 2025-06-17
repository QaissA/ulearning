import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authorize = (roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user.id; // Assuming req.user contains the authenticated user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user || !roles.includes(user.role.name)) {
      res.status(403).json({ message: "Forbidden: Access is denied" });
      return; // Return to avoid calling next()
    }

    next(); // Proceed to the next middleware or route handler
  };
};
