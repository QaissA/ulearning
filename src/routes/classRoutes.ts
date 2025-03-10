import express from "express";
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from "../controller/classController";

const classRouter = express.Router();

classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassById);
classRouter.post("/", createClass);
classRouter.put("/:id", updateClass);
classRouter.delete("/:id", deleteClass);

export default classRouter;
