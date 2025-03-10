import { Request, Response } from "express";
import { classService } from "../services/classService";

// Get all classes
export const getAllClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const classes = await classService.getAllClasses();
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a class by ID
export const getClassById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid class ID" });
      return;
    }

    const classData = await classService.getClassById(id);
    if (!classData) {
      res.status(404).json({ error: "Class not found" });
      return;
    }

    res.json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new class
export const createClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name) {
      res.status(400).json({ error: "Class name is required" });
      return;
    }

    const classData = await classService.createClass(name, description);
    res.status(201).json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a class
export const updateClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid class ID" });
      return;
    }

    const { name, description } = req.body;

    const classData = await classService.updateClass(id, name, description);
    res.json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a class
export const deleteClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid class ID" });
      return;
    }

    await classService.deleteClass(id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
