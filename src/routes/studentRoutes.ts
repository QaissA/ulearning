import { Router } from 'express';
import {
  createStudentController,
  getStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} from '../controller/studentController';

const studentsRouter = Router();

studentsRouter.post('/', createStudentController);
studentsRouter.get('/', getStudentsController);
studentsRouter.get('/:id', getStudentByIdController);
studentsRouter.put('/:id', updateStudentController);
studentsRouter.delete('/:id', deleteStudentController);

export default studentsRouter;