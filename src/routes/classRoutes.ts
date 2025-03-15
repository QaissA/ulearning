import express from "express";
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  restoreClass,
} from "../controller/classController";

const classRouter = express.Router();

classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassById);
classRouter.post("/", createClass);
classRouter.put("/:id", updateClass);
classRouter.delete("/:id", deleteClass);
classRouter.put("/restore/:id", restoreClass);

export default classRouter;
