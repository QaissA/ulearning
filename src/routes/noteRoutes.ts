import express from "express";
import * as noteController from "../controller/noteController";

const notesRouter = express.Router();

notesRouter.post("/", noteController.createNote); // Create a new note
notesRouter.get("/", noteController.getNotes); // Get all notes
notesRouter.get("/:studentId", noteController.getNotesByStudent); // Get notes by student
notesRouter.put("/:id", noteController.updateNote); // Update a note's score
notesRouter.delete("/:id", noteController.deleteNote); // Delete a note

export default notesRouter;
