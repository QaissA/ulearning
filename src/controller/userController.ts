import { Request, Response } from "express";
import { getUserById, updateUser, softDeleteUser, restoreUser } from "../services/userService";

export const getUser = async (req : Request, res : Response) => {
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
        const removedUser = await softDeleteUser(parseInt(req.params.id));
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(500).json({ error : "Error removed user", details : error});   
    }
}

export const restoreDeletedUser = async (req: Request, res: Response) => {
    try {
        const restoredUser = await restoreUser(parseInt(req.params.id));
        res.status(200).json({ message: "User restored successfully", user: restoredUser });
    } catch (error) {
        res.status(500).json({ error: "Error restoring user", details: error });
    }
};