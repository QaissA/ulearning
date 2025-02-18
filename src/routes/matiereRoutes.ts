import express from "express";
import { getAllMatieres, getMatiereById, createMatiere, updateMatiere, deleteMatiere } from "../controller/matiereController";

const matiereRouter = express.Router();

matiereRouter.get("/", getAllMatieres);
matiereRouter.get("/:id", getMatiereById);
matiereRouter.post("/", createMatiere);
matiereRouter.put("/:id", updateMatiere);
matiereRouter.delete("/:id", deleteMatiere);

export default matiereRouter;
