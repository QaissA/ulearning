import express from "express";
import { getAllMatieres, getMatiereById, createMatiere, updateMatiere, deleteMatiere, restoreMatiere } from "../controller/matiereController";

const matiereRouter = express.Router();

matiereRouter.get("/", getAllMatieres);
matiereRouter.get("/:id", getMatiereById);
matiereRouter.post("/", createMatiere);
matiereRouter.put("/:id", updateMatiere);
matiereRouter.delete("/:id", deleteMatiere);
matiereRouter.put("/restore/:id", restoreMatiere);

export default matiereRouter;
