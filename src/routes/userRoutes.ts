import {
  removeUser,
  getUser,
  restoreDeletedUser,
  getAllUsersController,
  getUsersByRoleController,
  updateUserProfileController,
  updateUserPasswordController,
  getMyStudents,
} from "../controller/userController";

import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const userRouter = express.Router();

//ROUTES FOR USERS
userRouter.get("/", authenticateToken, getAllUsersController);
userRouter.get("/:id", authenticateToken, getUser);
userRouter.get("/role/:roleName", authenticateToken, getUsersByRoleController);
userRouter.delete("/:id", authenticateToken, removeUser);
userRouter.put("/restore/:id", authenticateToken, restoreDeletedUser);
// Update profile info (no password)
userRouter.put("/profile/:id", authenticateToken, (req, res) => {
  updateUserProfileController(req, res);
});
// Update password only
userRouter.put("/password/:id", authenticateToken, (req, res) => {
  updateUserPasswordController(req, res);
});
// Route to get all students for the teacher by id param
userRouter.get("/:id/my-students", authenticateToken, (req, res) => {
  getMyStudents(req, res);
});

export default userRouter;
