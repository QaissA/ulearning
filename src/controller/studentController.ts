import { Request, Response } from 'express';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../services/studentService';

// Create Student
export const createStudentController = async (req: Request, res: Response) => {
  const { userId, gradeLevel } = req.body;
  try {
    const newStudent = await createStudent({ userId, gradeLevel });
    res.status(201).json(newStudent);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

// Get All Students
export const getStudentsController = async (req: Request, res: Response) => {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

// Get Student By ID 
export const getStudentByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const student = await getStudentById(Number(id));
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

// Update Student
export const updateStudentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { gradeLevel } = req.body;
  try {
    const updatedStudent = await updateStudent(Number(id), { gradeLevel });
    res.status(200).json(updatedStudent);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

// Delete Student
export const deleteStudentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteStudent(Number(id));
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};
