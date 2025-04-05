import {
  removeUser,
  ModifyUser,
  getUser,
  restoreDeletedUser,
  getUsersByRoleController,
} from "../controller/userController";

import express from "express";

const userRouter = express.Router();

//ROUTES FOR USERS
userRouter.get("/:id", getUser);
userRouter.get("/role/:roleName", getUsersByRoleController);
userRouter.put("/:id", ModifyUser);
userRouter.delete("/:id", removeUser);
userRouter.put("/restore/:id", restoreDeletedUser);

export default userRouter;
