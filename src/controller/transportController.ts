import { Request, Response } from "express";
import { transportService } from "../services/transportService";

export const getAllTransports = async (req: Request, res: Response) => {
  try {
    const schoolId = req.query.schoolId ? Number(req.query.schoolId) : undefined;
    const transports = await transportService.getAllTransports(schoolId);
    res.json(transports);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTransportById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const transport = await transportService.getTransportById(id);
    if (!transport || transport.isDeleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(transport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTransport = async (req: Request, res: Response) => {
  try {
    const { routeName, driver, vehicle, capacity, schoolId, stops, studentIds } = req.body;
    if (!routeName || !driver) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const transport = await transportService.createTransport(routeName, driver, vehicle, capacity, schoolId, stops, studentIds);
    res.status(201).json(transport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTransport = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const { routeName, driver, vehicle, capacity, stops, studentIds } = req.body;
    const transport = await transportService.updateTransport(id, routeName, driver, vehicle, capacity, stops, studentIds);
    res.json(transport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTransport = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await transportService.softDeleteTransport(id);
    res.json({ message: "Transport soft deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const restoreTransport = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await transportService.restoreTransport(id);
    res.json({ message: "Transport restored" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
