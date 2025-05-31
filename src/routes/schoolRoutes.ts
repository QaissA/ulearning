import express from "express";
import {
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  restoreSchool,
} from "../controller/schoolController";
import { authenticateToken } from "../middleware/authMiddleware";

const schoolRouter = express.Router();

schoolRouter.get("/", authenticateToken, getAllSchools);
schoolRouter.get("/:id", authenticateToken, getSchoolById);
schoolRouter.post("/", authenticateToken, createSchool);
schoolRouter.put("/:id", authenticateToken, updateSchool);
schoolRouter.delete("/:id", authenticateToken, deleteSchool);
schoolRouter.put("/restore/:id", authenticateToken, restoreSchool);

export default schoolRouter;
