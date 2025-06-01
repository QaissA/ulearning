import express from "express";
import {
  getAllSchoolYears,
  getSchoolYearById,
  createSchoolYear,
  updateSchoolYear,
  deleteSchoolYear,
  restoreSchoolYear,
} from "../controller/schoolYearController";
import { authenticateToken } from "../middleware/authMiddleware";

const schoolYearRouter = express.Router();

schoolYearRouter.get("/", authenticateToken, getAllSchoolYears);
schoolYearRouter.get("/:id", authenticateToken, getSchoolYearById);
schoolYearRouter.post("/", authenticateToken, createSchoolYear);
schoolYearRouter.put("/:id", authenticateToken, updateSchoolYear);
schoolYearRouter.delete("/:id", authenticateToken, deleteSchoolYear);
schoolYearRouter.put("/restore/:id", authenticateToken, restoreSchoolYear);

export default schoolYearRouter;
