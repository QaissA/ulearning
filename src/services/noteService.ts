import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new note
export const createNote = async (userId: number, matiereId: number, score: number) => {
  return await prisma.note.create({
    data: { userId, matiereId, score }, 
  });
};

// Get all notes
export const getNotes = async () => {
  return await prisma.note.findMany({
    include: { user: true, matiere: true }, 
  });
};

// Get notes by user (previously student)
export const getNotesByUser = async (userId: number) => { 
  return await prisma.note.findMany({
    where: { userId }, 
    include: { user: true, matiere: true },
  });
};

// Update a note
export const updateNote = async (id: number, score: number) => {
  return await prisma.note.update({
    where: { id },
    data: { score },
  });
};

// Delete a note
export const deleteNote = async (id: number) => {
  return await prisma.note.delete({
    where: { id },
  });
};
