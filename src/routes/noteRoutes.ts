import express from "express";
import * as noteController from "../controller/noteController";
import { authenticateToken } from "../middleware/authMiddleware";

const notesRouter = express.Router();

notesRouter.post("/", authenticateToken, noteController.createNote);
notesRouter.get("/", authenticateToken, noteController.getNotes);
notesRouter.get("/:userId", authenticateToken, noteController.getNotesByUser);
notesRouter.get("/teacher/:teacherId/students", authenticateToken, noteController.getNotesByTeacher);
notesRouter.put("/:id", authenticateToken, noteController.updateNote);
notesRouter.delete("/:id", authenticateToken, noteController.deleteNote);
notesRouter.put("/:id/restore", authenticateToken, noteController.restoreNote);

export default notesRouter;
