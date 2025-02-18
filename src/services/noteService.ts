import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNote = async (studentId: number, matiereId: number, score: number) => {
  return await prisma.note.create({
    data: { studentId, matiereId, score },
  });
};


export const getNotes = async () => {
  return await prisma.note.findMany({
    include: { student: true },
  });
};

export const getNotesByStudent = async (studentId: number) => {
  return await prisma.note.findMany({
    where: { studentId },
    include: { student: true },
  });
};

export const updateNote = async (id: number, score: number) => {
  return await prisma.note.update({
    where: { id },
    data: { score },
  });
};

export const deleteNote = async (id: number) => {
  return await prisma.note.delete({
    where: { id },
  });
};
