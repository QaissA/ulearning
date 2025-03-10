import express from "express";
import userRouter from "./userRoutes";
import studentsRouter from "./studentRoutes";
import attendanceRouter from "./attendanceRoutes";
import notesRouter from "./noteRoutes";
import matiereRouter from "./matiereRoutes";
import classRouter from "./classRoutes";

const router = express.Router();

// Use the account creation routes
router.use('/users', userRouter);
router.use('/students', studentsRouter);
router.use('/attendance', attendanceRouter);
router.use('/notes', notesRouter);
router.use('/matieres', matiereRouter);
router.use('/classes', classRouter);

export default router;