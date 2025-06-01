import { Request, Response } from "express";
import { schoolYearService } from "../services/schoolYearService";

export const getAllSchoolYears = async (req: Request, res: Response): Promise<void> => {
  try {
    const years = await schoolYearService.getAllSchoolYears();
    res.json(years);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSchoolYearById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const year = await schoolYearService.getSchoolYearById(id);
    if (!year) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(year);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSchoolYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, startDate, endDate } = req.body;
    if (!name || !startDate || !endDate) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }
    const year = await schoolYearService.createSchoolYear(name, startDate, endDate);
    res.status(201).json(year);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSchoolYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const { name, startDate, endDate } = req.body;
    
    const updatedYear = await schoolYearService.updateSchoolYear(id, name, startDate, endDate);
    res.json(updatedYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSchoolYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await schoolYearService.softDeleteSchoolYear(id);
    res.json({ message: "School year soft deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const restoreSchoolYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await schoolYearService.restoreSchoolYear(id);
    res.json({ message: "School year restored" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
