import { Request, Response } from "express";
import { createUser, getUserById, updateUser, deleteUser } from "../services/userService";

export const registerUser = async (req : Request, res : Response) => {
    try {
        const userAdded = await createUser(req.body);
        res.status(201).json(userAdded);
    } catch (error) {
        res.status(500).json({ error : "Error creating user", details : error});
    }
}

export const  getUser = async (req : Request, res : Response) => {
    try {
        const user = await getUserById(parseInt(req.params.id))
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error : "Error getting user", details : error});
    }
}


export const ModifyUser = async (req : Request, res : Response) => {
    try {
        const userUpdated = await updateUser(parseInt(req.params.id), req.body);
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(500).json({ error : "Error updating user", details : error});
    }
}

export const removeUser = async (req : Request, res : Response) => {
    try {
        const removedUser = await deleteUser(parseInt(req.params.id));
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(500).json({ error : "Error removed user", details : error});   
    }
}