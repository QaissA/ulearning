import { Request, Response } from "express";
import { schoolService } from "../services/schoolService";

export const getAllSchools = async (req: Request, res: Response) => {
  try {
    const schools = await schoolService.getAllSchools();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSchoolById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const school = await schoolService.getSchoolById(id);
    if (!school) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSchool = async (req: Request, res: Response) => {
  try {
    const { name, address, phone, email } = req.body;
    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }
    const school = await schoolService.createSchool(name, address, phone, email);
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSchool = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const { name, address, phone, email } = req.body;
    const school = await schoolService.updateSchool(id, name, address, phone, email);
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSchool = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await schoolService.softDeleteSchool(id);
    res.json({ message: "School soft deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const restoreSchool = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await schoolService.restoreSchool(id);
    res.json({ message: "School restored" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSchoolsByTeacherId = async (req: Request, res: Response) => {
  try {
    const teacherId = Number(req.params.teacherId);
    if (isNaN(teacherId)) {
      res.status(400).json({ error: "Invalid teacher ID" });
      return;
    }
    const schools = await schoolService.getSchoolsByTeacherId(teacherId);
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
