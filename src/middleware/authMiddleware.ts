import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Access denied, no token provided" });  // Token not found
//   }

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     (req as any).user = verified;
//     next();
//   } catch (error) {
//     res.status(403).json({ error: "Invalid token" });
//   }
// };

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided or invalid format" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    next();
  });
};