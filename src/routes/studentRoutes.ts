import { Router } from 'express';
import {
  createStudentController,
  getStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} from '../controller/studentController';
import { authenticateToken } from '../middleware/authMiddleware';

const studentsRouter = Router();

studentsRouter.post('/', authenticateToken,createStudentController);
studentsRouter.get('/', authenticateToken, getStudentsController);
studentsRouter.get('/:id', authenticateToken, getStudentByIdController);
studentsRouter.put('/:id', authenticateToken, updateStudentController);
studentsRouter.delete('/:id', authenticateToken, deleteStudentController);

export default studentsRouter;