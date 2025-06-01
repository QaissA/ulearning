import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

interface userCreate {
  name: string;
  email: string;
  password: string;
  roleId: number;
  adress?: string;
}

const prisma = new PrismaClient();
const saltRounds = 10;

export const createUser = async (data: userCreate) => {
  try {
    // First check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error(
        "Email already registered. Please use a different email address."
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // Verify that the role exists
    const role = await prisma.role.findUnique({
      where: { id: data.roleId },
    });

    if (!role) {
      throw new Error("Invalid role ID");
    }

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        roleId: data.roleId,
        adress: data.adress,
        isDeleted: false,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error; // Throw our custom error message
    }
    console.error("Error in createUser:", error);
    throw new Error("An error occurred while creating the user");
  }
};

export const getUsersByRole = async (
  roleName: string,
  includeDeleted: boolean = false,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;
  const users = await prisma.user.findMany({
    where: {
      role: {
        name: roleName,
      },
      isDeleted: includeDeleted,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      adress: true,
    },
    skip,
    take: limit,
    orderBy: {
      name: "asc",
    },
  });

  const totalCount = await prisma.user.count({
    where: includeDeleted ? { isDeleted: true } : { isDeleted: false },
  });

  return { users, totalCount };
};

export const getUserById = async (id: number, isDeleted: boolean = false) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      adress: true,
      isDeleted: isDeleted,
    },
  });
};

// Soft delete user
export const softDeleteUser = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};

// function to restore a deleted user
export const restoreUser = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: {
      isDeleted: false,
    },
  });
};

// Get all users with option to include soft-deleted ones
export const getAllUsers = async (
  includeDeleted: boolean = false,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    where: includeDeleted ? { isDeleted: true } : { isDeleted: false },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      adress: true,
      isDeleted: true,
      class: true,
    },
    skip,
    take: limit,
    orderBy: {
      name: "asc",
    },
  });

  const totalCount = await prisma.user.count({
    where: includeDeleted ? { isDeleted: true } : { isDeleted: false },
  });

  return { users, totalCount };
};

// Update user profile info (excluding password)
export const updateUserProfile = async (id: number, data: Partial<Omit<userCreate, 'password'>>) => {
  // Directly use data, since password is not part of the type
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// Update user password (requires current password verification)
export const updateUserPassword = async (id: number, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) throw new Error('Current password is incorrect');
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  return await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
};
