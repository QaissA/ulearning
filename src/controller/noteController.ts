import { Request, Response } from "express";
import * as noteService from "../services/noteService";

// Create a new note
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, matiereId, score } = req.body; 
    if (!userId || !matiereId || score === undefined) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const note = await noteService.createNote(userId, matiereId, score);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all notes
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getNotes();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get notes by user
export const getNotesByUser = async (req: Request, res: Response) => { 
  try {
    const { userId } = req.params; 
    const notes = await noteService.getNotesByUser(Number(userId));
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a note
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    if (score === undefined) {
      res.status(400).json({ error: "Score is required" });
      return;
    }

    const updatedNote = await noteService.updateNote(Number(id), score);
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await noteService.deleteNote(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};