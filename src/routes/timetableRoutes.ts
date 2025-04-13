import express from "express";
import { 
  createTimetable, 
  getTimetables, 
  getTimetableById, 
  updateTimetable, 
  deleteTimetable, 
  restoreTimetable
} from "../controller/timetableController";
import { authenticateToken } from "../middleware/authMiddleware";

const timetableRouter = express.Router();

timetableRouter.post("/", authenticateToken,createTimetable);
timetableRouter.get("/", authenticateToken,getTimetables);
timetableRouter.get("/:id", authenticateToken, getTimetableById);
timetableRouter.put("/:id", authenticateToken, updateTimetable);
timetableRouter.delete("/:id", authenticateToken,deleteTimetable);
timetableRouter.put("/:id/restore", authenticateToken,restoreTimetable);

export default timetableRouter;