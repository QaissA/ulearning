import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const classService = {
  getAllClasses: async () => {
    return await prisma.class.findMany({
      include: {
        students: true, // Include students in the class
      },
    });
  },

  getClassById: async (id: number) => {
    return await prisma.class.findUnique({
      where: { id },
      include: {
        students: true,
      },
    });
  },

  createClass: async (name: string, description?: string) => {
    return await prisma.class.create({
      data: { name, description },
    });
  },

  updateClass: async (id: number, name?: string, description?: string) => {
    return await prisma.class.update({
      where: { id },
      data: { name, description },
    });
  },

  deleteClass: async (id: number) => {
    return await prisma.class.delete({
      where: { id },
    });
  },
};
