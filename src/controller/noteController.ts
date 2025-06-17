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

// Get all notes with pagination
export const getNotes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { notes, totalCount } = await noteService.getNotes(page, limit);
    res.json({ notes, totalCount, page, limit });
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

// Get notes for all students of a specific teacher
export const getNotesByTeacher = (req: Request, res: Response) => {
  const teacherId = parseInt(req.params.teacherId);
  if (isNaN(teacherId)) {
    res.status(400).json({ error: "Invalid teacher id" });
    return;
  }
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  noteService.getNotesByTeacher(teacherId, page, limit)
    .then(({ notes, totalCount }) => {
      res.json({ notes, totalCount, page, limit });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
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


// Soft delete a note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await noteService.deleteNote(Number(id));
    res.status(200).json({ message: "Note soft deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Restore a soft-deleted note
export const restoreNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await noteService.restoreNote(Number(id));
    res.status(200).json({ message: "Note restored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};