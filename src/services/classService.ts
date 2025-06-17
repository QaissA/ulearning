import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const classService = {
  getAllClasses: async () => {
    return await prisma.class.findMany({
      where: { isDeleted: false },
      include: { users: true },
    });
  },

  getClassById: async (id: number) => {
    return await prisma.class.findUnique({
      where: { id, isDeleted: false },
      include: { users: true },
    });
  },

  createClass: async (
    name: string,
    description?: string,
    schoolYearId?: number
  ) => {
    return await prisma.class.create({
      data: { name, description, isDeleted: false, schoolYearId },
    });
  },

  updateClass: async (id: number, name?: string, description?: string, schoolYearId?: number) => {
    return await prisma.class.update({
      where: { id, isDeleted: false },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(schoolYearId !== undefined && { schoolYearId }),
      },
    });
  },

  deleteClass: async (id: number) => {
    return await prisma.class.update({
      where: { id },
      data: { isDeleted: true },
    });
  },

  restoreClass: async (id: number) => {
    return await prisma.class.update({
      where: { id },
      data: { isDeleted: false },
    });
  },
};