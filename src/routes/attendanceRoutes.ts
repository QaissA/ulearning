import { Router } from 'express';
import {
  markAttendanceController,
  getUserAttendanceController,
  getAttendanceByDateController,
  updateAttendanceController,
  deleteAttendanceController,
} from '../controller/attendanceController';

const attendanceRouter = Router();

attendanceRouter.post('/', markAttendanceController);
attendanceRouter.get('/user/:userId', getUserAttendanceController);
attendanceRouter.get('/date', getAttendanceByDateController);
attendanceRouter.put('/:id', updateAttendanceController);
attendanceRouter.delete('/:id', deleteAttendanceController);

export default attendanceRouter;
