import { Request, Response } from "express";
import {
  markAttendance,
  getUserAttendance,  
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance,
  restoreAttendance,
} from "../services/attendanceService";

// Mark attendance
export const markAttendanceController = async (req: Request, res: Response): Promise<void> => {
  const { userId, status } = req.body;
  try {
    if (!userId || !status) {
      res.status(400).json({ error: "User ID and status are required" });
      return;
    }
    
    const attendance = await markAttendance(Number(userId), status);
    res.status(201).json(attendance);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Get attendance for a specific user
export const getUserAttendanceController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; 
  try {
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    
    const attendance = await getUserAttendance(Number(userId));
    res.status(200).json(attendance);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Get attendance for all users on a specific date
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
    if (!status) {
      res.status(400).json({ error: "Status is required" });
      return;
    }

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

// Restore attendance record
export const restoreAttendanceController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const restoredAttendance = await restoreAttendance(Number(id));
    res.status(200).json(restoredAttendance);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: "Error restoring attendance record", details: error.message });
  }
};