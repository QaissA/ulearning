
import express from "express";
import { getRolePermissions, getUserPermissions } from "../controller/permissionsController";
import { authenticateToken } from "../middleware/authMiddleware";

const PermissionsRouter = express.Router();

PermissionsRouter.get("/role/:roleId", authenticateToken, getRolePermissions);
PermissionsRouter.get("/user/:userId", authenticateToken, getUserPermissions);

export default PermissionsRouter;