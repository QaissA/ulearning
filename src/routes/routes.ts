import express from "express";
import userRouter from "./userRoutes";

const router = express.Router();

// Use the account creation routes
router.use('/users', userRouter);

export default router;
