import {
  registerUser,
  removeUser,
  ModifyUser,
  getUser,
} from "../controller/userController";
import { 
  loginUser 
} from "../controller/authController";
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const userRouter = express.Router();

//ROUTES FOR USERS CONTROLLER
userRouter.get("/:id", authenticateToken, getUser);
userRouter.put("/:id", ModifyUser);
userRouter.delete("/:id", removeUser);

// Signup and Login Routes
userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
