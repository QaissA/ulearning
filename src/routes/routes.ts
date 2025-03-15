import express from "express";
import userRouter from "./userRoutes";
import attendanceRouter from "./attendanceRoutes";
import notesRouter from "./noteRoutes";
import matiereRouter from "./matiereRoutes";
import classRouter from "./classRoutes";
import timetableRouter from "./timetableRoutes";
import loginRouter from "./loginRoutes";

const router = express.Router();

// Use the account creation routes
router.use("/login", loginRouter);
router.use("/users", userRouter);
router.use("/attendance", attendanceRouter);
router.use("/notes", notesRouter);
router.use("/matieres", matiereRouter);
router.use("/classes", classRouter);
router.use("/timetable", timetableRouter);

export default router;
