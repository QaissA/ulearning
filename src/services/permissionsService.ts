// permissions.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPermissionsByRoleId = async (roleId: number) => {
  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      roleId,
    },
    include: {
      permission: true,
    },
  });

  return rolePermissions.map((rp) => rp.permission);
};

export const getUserPermissions = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!user || !user.role) {
    return [];
  }

  return user.role.rolePermissions.map((rp) => rp.permission);
};
