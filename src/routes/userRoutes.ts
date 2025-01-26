import {
  registerUser,
  removeUser,
  ModifyUser,
  getUser,
} from "../controller/userController";
import { 
  registerUser1, 
  loginUser 
} from "../controller/authController";
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const userRouter = express.Router();

//ROUTES FOR USERS CONTROLLER
userRouter.post("/", registerUser);
userRouter.get("/:id", authenticateToken, getUser);
userRouter.put("/:id", ModifyUser);
userRouter.delete("/:id", removeUser);

// Signup and Login Routes
userRouter.post("/signup", registerUser1);
userRouter.post("/login", loginUser);

export default userRouter;
