import { Request, Response } from "express";
import { loginUserService } from "../services/authService";
import { createUser } from "../services/userService";

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUserService(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const registerUser = async (req : Request, res : Response) => {
    try {
        const userAdded = await createUser(req.body);
        res.status(201).json(userAdded);
    } catch (error) {
        res.status(500).json({ error : "Error creating user", details : error});
    }
}