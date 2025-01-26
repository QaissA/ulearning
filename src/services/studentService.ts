import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateStudentData {
  userId: number;
  gradeLevel: string;
}

export const createStudent = async (data: CreateStudentData) => {
  try {
    const student = await prisma.student.create({
      data,
    });
    return student;
  } catch (error) {
    throw new Error('Error creating student: ' + error);
  }
};

export const getStudents = async () => {
  try {
    const students = await prisma.student.findMany();
    return students;
  } catch (error) {
    throw new Error('Error fetching students: ' + error);
  }
};

export const getStudentById = async (id: number) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id },
    });
    return student;
  } catch (error) {
    throw new Error('Error fetching student: ' + error);
  }
};

export const updateStudent = async (id: number, data: Partial<CreateStudentData>) => {
  try {
    const student = await prisma.student.update({
      where: { id },
      data,
    });
    return student;
  } catch (error) {
    throw new Error('Error updating student: ' + error);
  }
};

export const deleteStudent = async (id: number) => {
  try {
    await prisma.student.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Error deleting student: ' + error);
  }
};
