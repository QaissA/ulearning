import { Router } from 'express';
import {
  markAttendanceController,
  getUserAttendanceController,
  getAttendanceByDateController,
  updateAttendanceController,
  deleteAttendanceController,
  restoreAttendanceController,
} from '../controller/attendanceController';
import { authenticateToken } from '../middleware/authMiddleware';

const attendanceRouter = Router();

attendanceRouter.post('/', authenticateToken, markAttendanceController);
attendanceRouter.get('/user/:userId', authenticateToken, getUserAttendanceController);
attendanceRouter.get('/date', authenticateToken, getAttendanceByDateController);
attendanceRouter.put('/:id', authenticateToken, updateAttendanceController);
attendanceRouter.delete('/:id', authenticateToken, deleteAttendanceController);
attendanceRouter.put('/restore/:id', authenticateToken, restoreAttendanceController);

export default attendanceRouter;
