import express from "express";
import userRouter from "./userRoutes";
import studentsRouter from "./studentRoutes";

const router = express.Router();

// Use the account creation routes
router.use('/users', userRouter);
router.use('/students', studentsRouter);

export default router;
