import express from "express";
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  restoreDocument,
} from "../controller/documentController";
import { authenticateToken } from "../middleware/authMiddleware";

const documentRouter = express.Router();

documentRouter.get("/", authenticateToken, getAllDocuments);
documentRouter.get("/:id", authenticateToken, getDocumentById);
documentRouter.post("/", authenticateToken, createDocument);
documentRouter.put("/:id", authenticateToken, updateDocument);
documentRouter.delete("/:id", authenticateToken, deleteDocument);
documentRouter.put("/restore/:id", authenticateToken, restoreDocument);

export default documentRouter;
