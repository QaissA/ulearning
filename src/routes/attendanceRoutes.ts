import { Router } from 'express';
import {
  markAttendanceController,
  getStudentAttendanceController,
  getAttendanceByDateController,
  updateAttendanceController,
  deleteAttendanceController,
} from '../controller/attendanceController';

const attendanceRouter = Router();

attendanceRouter.post('/mark', markAttendanceController);
attendanceRouter.get('/student/:studentId', getStudentAttendanceController);
attendanceRouter.get('/date', getAttendanceByDateController);
attendanceRouter.put('/:id', updateAttendanceController);
attendanceRouter.delete('/:id', deleteAttendanceController);

export default attendanceRouter;
