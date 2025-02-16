import { PrismaClient } from '@prisma/client';
import moment from 'moment-timezone';

const prisma = new PrismaClient();

// Mark attendance
export const markAttendance = async (studentId: number, status: 'PRESENT' | 'ABSENT') => {
  return await prisma.attendance.create({
    data: { studentId, status },
  });
};

// Get attendance for a specific student
export const getStudentAttendance = async (studentId: number) => {
  return await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { date: 'desc' },
  });
};

// Get attendance for all students on a specific date
export const getAttendanceByDate = async (date: string) => {
  const timezone = 'America/Los_Angeles'; // This is the time zone for Pacific Time (US & Canada)

  // Convert the date to start of the day in PST time zone
  const parsedDate = moment.tz(date, timezone).startOf('day').toDate();
  const endOfDay = moment.tz(date, timezone).endOf('day').toDate();

  return await prisma.attendance.findMany({
    where: {
      date: {
        gte: parsedDate,  // Use the start of the day in PST
        lt: endOfDay,     // Use the end of the day in PST
      },
    },
    include: { student: true },
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
