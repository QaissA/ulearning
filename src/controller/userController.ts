import { Request, Response } from "express";
import {
  getUserById,
  softDeleteUser,
  restoreUser,
  getAllUsers,
  getUsersByRole,
  updateUserProfile,
  updateUserPassword,
} from "../services/userService";
import { read } from "fs";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user", details: error });
  }
};

export const getUsersByRoleController = async (req: Request, res: Response) => {
  try {
    const includeDeleted = req.query.includeDeleted === "true";
    const { roleName } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await getUsersByRole(roleName, includeDeleted, page, limit);
    res.status(200).json({
      users,
      pagination: {},
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching users by role", details: error });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const removedUser = await softDeleteUser(parseInt(req.params.id));
    res.status(200).json(removedUser);
  } catch (error) {
    res.status(500).json({ error: "Error removed user", details: error });
  }
};

export const restoreDeletedUser = async (req: Request, res: Response) => {
  try {
    const restoredUser = await restoreUser(parseInt(req.params.id));
    res
      .status(200)
      .json({ message: "User restored successfully", user: restoredUser });
  } catch (error) {
    res.status(500).json({ error: "Error restoring user", details: error });
  }
};
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const includeDeleted = req.query.includeDeleted === "true";

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await getAllUsers(includeDeleted, page, limit);
    res.status(200).json({
      users: users.users,
      totalCount: users.totalCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Error getting users", details: error });
  }
};

export const updateUserProfileController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await updateUserProfile(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile", details: error });
  }
};

export const updateUserPasswordController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current and new password are required" });
    }
    const updatedUser = await updateUserPassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: "Error updating password", details: error instanceof Error ? error.message : error });
  }
};
