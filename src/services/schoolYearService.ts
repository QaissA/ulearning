import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const schoolYearService = {
  getAllSchoolYears: async () => {
    return prisma.schoolYear.findMany({ include: { classes: true } });
  },
  getSchoolYearById: async (id: number) => {
    return prisma.schoolYear.findUnique({ where: { id }, include: { classes: true } });
  },
  createSchoolYear: async (name: string, startDate: string, endDate: string) => {
    return prisma.schoolYear.create({
      data: { name, startDate: new Date(startDate), endDate: new Date(endDate) },
    });
  },
  updateSchoolYear: async (id: number, name?: string, startDate?: string, endDate?: string) => {
    return prisma.schoolYear.update({
      where: { id },
      data: {
        name,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });
  },
  // Soft delete school year
  softDeleteSchoolYear: async (id: number) => {
    return prisma.schoolYear.update({
      where: { id },
      data: { isDeleted: true },
    });
  },
  // Restore school year
  restoreSchoolYear: async (id: number) => {
    return prisma.schoolYear.update({
      where: { id },
      data: { isDeleted: false },
    });
  },
};
