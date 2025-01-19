import {
  registerUser,
  removeUser,
  ModifyUser,
  getUser,
} from "../controller/userController";
import express from "express";

const userRouter = express.Router();

//ROUTES FOR USERS CONTROLLER
userRouter.post("/", registerUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id", ModifyUser);
userRouter.delete("/:id", removeUser);

export default userRouter;
