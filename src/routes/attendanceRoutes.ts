import { Router } from 'express';
import {
  markAttendanceController,
  getUserAttendanceController,
  getAttendanceByDateController,
  updateAttendanceController,
  deleteAttendanceController,
  restoreAttendanceController,
} from '../controller/attendanceController';

const attendanceRouter = Router();

attendanceRouter.post('/', markAttendanceController);
attendanceRouter.get('/user/:userId', getUserAttendanceController);
attendanceRouter.get('/date', getAttendanceByDateController);
attendanceRouter.put('/:id', updateAttendanceController);
attendanceRouter.delete('/:id', deleteAttendanceController);
attendanceRouter.put('/restore/:id', restoreAttendanceController);

export default attendanceRouter;
