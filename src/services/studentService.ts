import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface CreateStudentData {
  userId: number;
  gradeLevel: string;
}


export const createStudent = async (data: { name: string; email: string; password: string; gradeLevel: string }) => {
  try {
    const { name, email, password, gradeLevel } = data;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.$transaction(async (prisma) => {
      // Find the 'STUDENT' role in the Role table
      const studentRole = await prisma.role.findUnique({
        where: { name: 'STUDENT' },
      });

      if (!studentRole) {
        throw new Error("Role 'STUDENT' not found in the database.");
      }

      // Create the user with the role relation
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: { connect: { id: studentRole.id } }, // Correct way to set the relation
        },
      });

      // Create the student and link it to the user
      const student = await prisma.student.create({
        data: {
          userId: user.id,
          gradeLevel,
        },
        include: { user: true },
      });

      return student;
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating student and user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating the student and user.");
    }
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
