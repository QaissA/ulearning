import { Request, Response } from "express";
import * as noteService from "../services/noteService";

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, matiereId, score } = req.body;
    if (!studentId || !matiereId || score === undefined) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const note = await noteService.createNote(studentId, matiereId, score);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getNotes();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNotesByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const notes = await noteService.getNotesByStudent(Number(studentId));
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
