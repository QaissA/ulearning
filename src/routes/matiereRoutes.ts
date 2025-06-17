import express from "express";
import { getAllMatieres, getMatiereById, createMatiere, updateMatiere, deleteMatiere, restoreMatiere } from "../controller/matiereController";
import { authenticateToken } from "../middleware/authMiddleware";

const matiereRouter = express.Router();

matiereRouter.get("/", authenticateToken, getAllMatieres);
matiereRouter.get("/:id", authenticateToken, getMatiereById);
matiereRouter.post("/", authenticateToken, createMatiere);
matiereRouter.put("/:id", authenticateToken, updateMatiere);
matiereRouter.delete("/:id", authenticateToken, deleteMatiere);
matiereRouter.put("/restore/:id", authenticateToken, restoreMatiere);

export default matiereRouter;
