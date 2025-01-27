import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/authService";

export const registerUser1 = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const newUser = await registerUserService(name, email, password);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUserService(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
