import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const matiereService = {
  async getAllMatieres() {
    return await prisma.matiere.findMany({
      where: { isDeleted: false },
    });
  },

  async getMatiereById(id: number) {
    return await prisma.matiere.findUnique({
      where: { id, isDeleted: false },
    });
  },

  async createMatiere(name: string, description?: string) {
    return await prisma.matiere.create({
      data: { name, description, isDeleted: false },
    });
  },

  async updateMatiere(id: number, name?: string, description?: string) {
    return await prisma.matiere.update({
      where: { id, isDeleted: false },
      data: { name, description },
    });
  },

  async deleteMatiere(id: number) {
    return await prisma.matiere.update({
      where: { id },
      data: { isDeleted: true },
    });
  },

  async restoreMatiere(id: number) {
    return await prisma.matiere.update({
      where: { id },
      data: { isDeleted: false },
    });
  },
};
