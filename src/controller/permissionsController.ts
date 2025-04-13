import { Request, Response } from 'express';
import * as permissionsService from '../services/permissionsService';

// Change the return type to void - this is crucial
export const getRolePermissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const roleId = parseInt(req.params.roleId);
        if(isNaN(roleId)) {
            res.status(400).json({ message: 'Invalid role ID'});
            return;
        }
        const permissions = await permissionsService.getPermissionsByRoleId(roleId);
        res.status(200).json({permissions});
    } catch (error) {
        console.error('Error fetching role permissions:', error);
        res.status(500).json({ message: 'Failed to fetch role permissions' });
    }
}

// Change the return type to void - this is crucial
export const getUserPermissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId);
        if(isNaN(userId)) {
            res.status(400).json({message: 'Invalid user ID'});
            return;
        }
        const permissions = await permissionsService.getUserPermissions(userId);
        res.status(200).json(permissions);
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        res.status(500).json({ message: 'Failed to fetch user permissions' });
    }
}