import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const documentService = {
  getAllDocuments: async (schoolId?: number) => {
    return prisma.document.findMany({
      where: { isDeleted: false, ...(schoolId ? { schoolId } : {}) },
      include: { user: true, school: true },
    });
  },
  getDocumentById: async (id: number) => {
    return prisma.document.findUnique({
      where: { id },
      include: { user: true, school: true },
    });
  },
  createDocument: async (title: string, url: string, uploadedBy: number, schoolId?: number, description?: string) => {
    return prisma.document.create({
      data: { title, url, uploadedBy, schoolId, description },
    });
  },
  updateDocument: async (id: number, title?: string, url?: string, description?: string) => {
    return prisma.document.update({
      where: { id },
      data: { title, url, description },
    });
  },
  softDeleteDocument: async (id: number) => {
    return prisma.document.update({
      where: { id },
      data: { isDeleted: true },
    });
  },
  restoreDocument: async (id: number) => {
    return prisma.document.update({
      where: { id },
      data: { isDeleted: false },
    });
  },
};
