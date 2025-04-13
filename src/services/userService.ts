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

export const getUsersByRole = async (roleName: string, includeDeleted : boolean = false, page : number, limit : number) => {
  const skip = (page - 1) * limit;
  const users = await prisma.user.findMany({
      where: {
        role: {
          name: roleName
      },
      isDeleted: includeDeleted,
      
      },
      select: {
          id: true,
          name: true,
          email: true,
          role: true,
          adress: true
      },
      skip,
      take: limit,
      orderBy : {
        name: "asc",
      }
  });

  const totalCount = await prisma.user.count({
    where: includeDeleted ? { isDeleted: true } : { isDeleted: false },
  });

    return {users, totalCount};
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

export const updateUser = async (id: number, data: userCreate) => {
  let updatedData = { ...data };

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    updatedData.password = hashedPassword;
  }

  return await prisma.user.update({
    where: { id },
    data: updatedData,
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
