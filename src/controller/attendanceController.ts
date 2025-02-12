import { Request, Response } from "express";
import {
  markAttendance,
  getStudentAttendance,
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance,
} from "../services/attendanceService";

// Mark attendance
export const markAttendanceController = async (req: Request, res: Response): Promise<void> => {
  const { studentId, status } = req.body;
  try {
    const attendance = await markAttendance(Number(studentId), status);
    res.status(201).json(attendance);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Get attendance for a specific student
export const getStudentAttendanceController = async (req: Request, res: Response): Promise<void> => {
  const { studentId } = req.params;
  try {
    const attendance = await getStudentAttendance(Number(studentId));
    res.status(200).json(attendance);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Get attendance for all students on a specific date
export const getAttendanceByDateController = async (req: Request, res: Response): Promise<void> => {
  const { date } = req.query;
  if (!date) {
    res.status(400).json({ error: "Date is required" }); 
    return;
  }

  try {
    const attendance = await getAttendanceByDate(date as string);
    res.status(200).json(attendance);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};


// Update attendance record
export const updateAttendanceController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const attendance = await updateAttendance(Number(id), status);
    res.status(200).json(attendance);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Delete attendance record
export const deleteAttendanceController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteAttendance(Number(id));
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
