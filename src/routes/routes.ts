import express from "express";
import userRouter from "./userRoutes";
import studentsRouter from "./studentRoutes";
import attendanceRouter from "./attendanceRoutes";

const router = express.Router();

// Use the account creation routes
router.use('/users', userRouter);
router.use('/students', studentsRouter);
router.use('/attendance', attendanceRouter);

export default router;
