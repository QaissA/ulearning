import { Request, Response } from "express";
import * as timetableService from "../services/timetableService";

export const createTimetable = async (req: Request, res: Response) => {
  try {
    const newTimetable = await timetableService.createTimetable(req.body);
    res.status(201).json(newTimetable);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
  
};

export const getTimetables = async (_req: Request, res: Response) => {
  try {
    const timetables = await timetableService.getTimetables();
    res.status(200).json(timetables);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
  
};

export const getTimetableById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timetable = await timetableService.getTimetableById(Number(id));

    if (!timetable) {
      res.status(404).json({ error: "Timetable not found" });
      return;
    }

    res.status(200).json(timetable);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
  
};

export const updateTimetable = async (req: Request, res: Response) => {
  try {
    const updatedTimetable = await timetableService.updateTimetable(Number(req.params.id), req.body);
    res.status(200).json(updatedTimetable);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
  
};

export const deleteTimetable = async (req: Request, res: Response) => {
  try {
    await timetableService.deleteTimetable(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
  
};
