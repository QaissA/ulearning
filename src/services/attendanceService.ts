import { PrismaClient } from '@prisma/client';
import moment from 'moment-timezone';

const prisma = new PrismaClient();

// Mark attendance
export const markAttendance = async (userId: number, status: 'PRESENT' | 'ABSENT') => {
  return await prisma.attendance.create({
    data: {
      user: {
        connect: { id: userId },
      },
      status,
    },
  });
};

// Get attendance for a specific user
export const getUserAttendance = async (userId: number) => {
  return await prisma.attendance.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
};

// Get attendance for all users on a specific date
export const getAttendanceByDate = async (date: string) => {
  const timezone = 'America/Los_Angeles';

  const parsedDate = moment.tz(date, timezone).startOf('day').toDate();
  const endOfDay = moment.tz(date, timezone).endOf('day').toDate();

  return await prisma.attendance.findMany({
    where: {
      date: {
        gte: parsedDate,
        lt: endOfDay,
      },
    },
    include: { user: { select: { id: true, name: true } } },
  });
};

// Update attendance record
export const updateAttendance = async (id: number, status: 'PRESENT' | 'ABSENT') => {
  return await prisma.attendance.update({
    where: { id },
    data: { status },
  });
};

// Delete attendance record
export const deleteAttendance = async (id: number) => {
  return await prisma.attendance.delete({
    where: { id },
  });
};
