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
      isDeleted: false,
    },
  });
};

// Get attendance for a specific user
export const getUserAttendance = async (userId: number) => {
  return await prisma.attendance.findMany({
    where: { userId, isDeleted: false },
    orderBy: { date: 'desc' },
  });
};

// Get attendance for all users on a specific date
export const getAttendanceByDate = async (date: string, page: number, limit: number) => {
  const timezone = 'America/Los_Angeles';

  const parsedDate = moment.tz(date, timezone).startOf('day').toDate();
  const endOfDay = moment.tz(date, timezone).endOf('day').toDate();
  const skip = (page - 1) * limit;

  const attendance = await prisma.attendance.findMany({
    where: {
      date: {
        gte: parsedDate,
        lt: endOfDay,
      },
      isDeleted: false,
    },
    include: { user: { select: { id: true, name: true } } },
    skip,
    take: limit,
    orderBy: { id: 'asc' },
  });

  const totalCount = await prisma.attendance.count({
    where: {
      date: {
        gte: parsedDate,
        lt: endOfDay,
      },
      isDeleted: false,
    },
  });

  return { attendance, totalCount };
};

// Update attendance record
export const updateAttendance = async (id: number, status: 'PRESENT' | 'ABSENT') => {
  return await prisma.attendance.update({
    where: { id, isDeleted: false, },
    data: { status },
  });
};

// Soft delete attendance record
export const deleteAttendance = async (id: number) => {
  return await prisma.attendance.update({
    where: { id },
    data: { isDeleted: true },
  });
};

// Restore a soft-deleted attendance record
export const restoreAttendance = async (id: number) => {
  return await prisma.attendance.update({
    where: { id },
    data: { isDeleted: false },
  });
};