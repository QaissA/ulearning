import express from "express";
import userRouter from "./userRoutes";
import attendanceRouter from "./attendanceRoutes";
import notesRouter from "./noteRoutes";
import matiereRouter from "./matiereRoutes";
import classRouter from "./classRoutes";
import timetableRouter from "./timetableRoutes";
import loginRouter from "./loginRoutes";
import PermissionsRouter from "./permissionsRoutes";
import schoolYearRouter from "./schoolYearRoutes";
import schoolRouter from "./schoolRoutes";

const router = express.Router();

// Use the account creation routes
router.use("/login", loginRouter);
router.use("/users", userRouter);
router.use("/attendance", attendanceRouter);
router.use("/notes", notesRouter);
router.use("/matieres", matiereRouter);
router.use("/classes", classRouter);
router.use("/timetable", timetableRouter);
router.use('/permissions', PermissionsRouter)
router.use("/school-years", schoolYearRouter)
router.use("/school", schoolRouter);

export default router;
