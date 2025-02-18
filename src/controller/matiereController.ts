import { Request, Response } from "express";
import { matiereService } from "../services/matiereService";

export const getAllMatieres = async (req: Request, res: Response) => {
  try {
    const matieres = await matiereService.getAllMatieres();
    res.json(matieres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMatiereById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const matiere = await matiereService.getMatiereById(id);
    if (!matiere) {
      res.status(404).json({ error: "Matiere not found" });
      return;
    }
    res.json(matiere);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMatiere = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }
    const matiere = await matiereService.createMatiere(name, description);
    res.status(201).json(matiere);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMatiere = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    const matiere = await matiereService.updateMatiere(id, name, description);
    res.json(matiere);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMatiere = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await matiereService.deleteMatiere(id);
    res.json({ message: "Matiere deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
