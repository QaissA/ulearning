import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTimetable = async (data: any) => {
  return await prisma.emploiDuTemps.create({
    data: {
      classId: data.classId,
      matiereId: data.matiereId,
      teacherId: data.teacherId,
      day: data.day,
      heureDebut: data.heureDebut,
      heureFin: data.heureFin,
    },
  });
};

export const getTimetables = async () => {
  return await prisma.emploiDuTemps.findMany({
    where: { isDeleted: false },
    include: {
      class: true,
      matiere: true,
      teacher: true,
    },
  });
};

export const getTimetableById = async (id: number) => {
  return await prisma.emploiDuTemps.findUnique({
    where: { id, isDeleted: false },
    include: {
      class: true,
      matiere: true,
      teacher: true,
    },
  });
};

export const updateTimetable = async (id: number, data: any) => {
  return await prisma.emploiDuTemps.update({
    where: { id, isDeleted: false },
    data,
  });
};

export const deleteTimetable = async (id: number) => {
  return await prisma.emploiDuTemps.update({
    where: { id },
    data: { isDeleted: true },
  });
};

export const restoreTimetable = async (id: number) => {
  return await prisma.emploiDuTemps.update({
    where: { id },
    data: { isDeleted: false },
  });
};