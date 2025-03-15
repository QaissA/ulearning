import express from "express";
import * as noteController from "../controller/noteController";

const notesRouter = express.Router();

notesRouter.post("/", noteController.createNote);
notesRouter.get("/", noteController.getNotes);
notesRouter.get("/:userId", noteController.getNotesByUser);
notesRouter.put("/:id", noteController.updateNote);
notesRouter.delete("/:id", noteController.deleteNote);
notesRouter.put("/:id/restore", noteController.restoreNote);

export default notesRouter;
