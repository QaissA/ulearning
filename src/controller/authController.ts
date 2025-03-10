import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/authService";

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUserService(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
