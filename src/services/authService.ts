import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Service for logging in a user
export const loginUserService = async (email: string, password: string) => {
  // Find the user by email and include role information
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.role) {
    throw new Error("User has no role assigned");
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate a JWT with role information
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.name,
      roleId: user.roleId,
    },
    JWT_SECRET,
    {
      expiresIn: "3000h",
    }
  );

  // Remove sensitive information before sending user data
  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};
