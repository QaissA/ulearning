import express from "express";
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  restoreClass,
} from "../controller/classController";
import { authenticateToken } from "../middleware/authMiddleware";

const classRouter = express.Router();

classRouter.get("/", authenticateToken, getAllClasses);
classRouter.get("/:id", authenticateToken, getClassById);
classRouter.post("/", authenticateToken, createClass);
classRouter.put("/:id", authenticateToken, updateClass);
classRouter.delete("/:id", authenticateToken, deleteClass);
classRouter.put("/restore/:id", authenticateToken, restoreClass);

export default classRouter;
