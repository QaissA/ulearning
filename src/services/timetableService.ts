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
      heureFin: data.heureFin  
    }
  });
};



export const getTimetables = async () => {
  return await prisma.emploiDuTemps.findMany({
    include: {
      class: true,
      matiere: true,
      teacher: true,
    },
  });
};

export const getTimetableById = async (id: number) => {
  return await prisma.emploiDuTemps.findUnique({
    where: { id },
    include: {
      class: true,
      matiere: true,
      teacher: true,
    },
  });
};

export const updateTimetable = async (id: number, data: any) => {
  return await prisma.emploiDuTemps.update({
    where: { id },
    data,
  });
};

export const deleteTimetable = async (id: number) => {
  return await prisma.emploiDuTemps.delete({
    where: { id },
  });
};
