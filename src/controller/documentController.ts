import { Request, Response } from "express";
import { documentService } from "../services/documentService";

export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const schoolId = req.query.schoolId ? Number(req.query.schoolId) : undefined;
    const docs = await documentService.getAllDocuments(schoolId);
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const doc = await documentService.getDocumentById(id);
    if (!doc || doc.isDeleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createDocument = async (req: Request, res: Response) => {
  try {
    const { title, url, uploadedBy, schoolId, description } = req.body;
    if (!title || !url || !uploadedBy) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const doc = await documentService.createDocument(title, url, uploadedBy, schoolId, description);
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateDocument = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const { title, url, description } = req.body;
    const doc = await documentService.updateDocument(id, title, url, description);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await documentService.softDeleteDocument(id);
    res.json({ message: "Document soft deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const restoreDocument = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    await documentService.restoreDocument(id);
    res.json({ message: "Document restored" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
