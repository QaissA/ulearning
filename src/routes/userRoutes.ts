import {
  removeUser,
  ModifyUser,
  getUser,
  restoreDeletedUser,
  getAllUsersController,
  getUsersByRoleController,
} from "../controller/userController";

import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const userRouter = express.Router();

//ROUTES FOR USERS
userRouter.get("/", authenticateToken, getAllUsersController);
userRouter.get("/:id", authenticateToken, getUser);
userRouter.get("/role/:roleName", authenticateToken, getUsersByRoleController);
userRouter.put("/:id", authenticateToken, ModifyUser);
userRouter.delete("/:id", authenticateToken, removeUser);
userRouter.put("/restore/:id", authenticateToken, restoreDeletedUser);

export default userRouter;
