import express from "express";
import { 
  createTimetable, 
  getTimetables, 
  getTimetableById, 
  updateTimetable, 
  deleteTimetable 
} from "../controller/timetableController";

const timetableRouter = express.Router();

timetableRouter.post("/", createTimetable);
timetableRouter.get("/", getTimetables);
timetableRouter.get("/:id", getTimetableById);
timetableRouter.put("/:id", updateTimetable);
timetableRouter.delete("/:id", deleteTimetable);

export default timetableRouter;
