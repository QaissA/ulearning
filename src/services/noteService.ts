import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new note
export const createNote = async (userId: number, matiereId: number, score: number) => {
  return await prisma.note.create({
    data: { userId, matiereId, score, isDeleted: false }, 
  });
};

// Get all active notes (excluding soft-deleted ones) with pagination
export const getNotes = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const notes = await prisma.note.findMany({
    where: { isDeleted: false },
    include: { user: true, matiere: true },
    skip,
    take: limit,
    orderBy: { id: "asc" },
  });
  const totalCount = await prisma.note.count({ where: { isDeleted: false } });
  return { notes, totalCount };
};

// Get notes by user (excluding soft-deleted ones)
export const getNotesByUser = async (userId: number) => { 
  return await prisma.note.findMany({
    where: { userId, isDeleted: false }, 
    include: { user: true, matiere: true },
  });
};

// Update a note
export const updateNote = async (id: number, score: number) => {
  return await prisma.note.update({
    where: { id, isDeleted: false },
    data: { score },
  });
};

// Soft delete a note (mark as deleted)
export const deleteNote = async (id: number) => {
  return await prisma.note.update({
    where: { id },
    data: { isDeleted: true },
  });
};

// Restore a soft-deleted note
export const restoreNote = async (id: number) => {
  return await prisma.note.update({
    where: { id },
    data: { isDeleted: false },
  });
};
