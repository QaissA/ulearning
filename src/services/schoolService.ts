import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const schoolService = {
  getAllSchools: async () => {
    return prisma.school.findMany({ include: { classes: true, schoolYears: true } });
  },
  getSchoolById: async (id: number) => {
    return prisma.school.findUnique({ where: { id }, include: { classes: true, schoolYears: true } });
  },
  createSchool: async (name: string, address?: string, phone?: string, email?: string) => {
    return prisma.school.create({
      data: { name, address, phone, email },
    });
  },
  updateSchool: async (id: number, name?: string, address?: string, phone?: string, email?: string) => {
    return prisma.school.update({
      where: { id },
      data: { name, address, phone, email },
    });
  },
  // Soft delete school
  softDeleteSchool: async (id: number) => {
    return prisma.school.update({
      where: { id },
      data: { isDeleted: true },
    });
  },
  // Restore school
  restoreSchool: async (id: number) => {
    return prisma.school.update({
      where: { id },
      data: { isDeleted: false },
    });
  },
};
