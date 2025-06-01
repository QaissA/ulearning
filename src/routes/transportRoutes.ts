import express from "express";
import {
  getAllTransports,
  getTransportById,
  createTransport,
  updateTransport,
  deleteTransport,
  restoreTransport,
} from "../controller/transportController";
import { authenticateToken } from "../middleware/authMiddleware";

const transportRouter = express.Router();

transportRouter.get("/", authenticateToken, getAllTransports);
transportRouter.get("/:id", authenticateToken, getTransportById);
transportRouter.post("/", authenticateToken, createTransport);
transportRouter.put("/:id", authenticateToken, updateTransport);
transportRouter.delete("/:id", authenticateToken, deleteTransport);
transportRouter.put("/restore/:id", authenticateToken, restoreTransport);

export default transportRouter;
