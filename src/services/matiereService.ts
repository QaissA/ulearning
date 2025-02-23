import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const matiereService = {
  async getAllMatieres() {
    return await prisma.matiere.findMany();
  },

  async getMatiereById(id: number) {
    return await prisma.matiere.findUnique({ where: { id } });
  },

  async createMatiere(name: string, description?: string) {
    return await prisma.matiere.create({
      data: { name, description },
    });
  },

  async updateMatiere(id: number, name?: string, description?: string) {
    return await prisma.matiere.update({
      where: { id },
      data: { name, description },
    });
  },

  async deleteMatiere(id: number) {
    return await prisma.matiere.delete({ where: { id } });
  },
};
