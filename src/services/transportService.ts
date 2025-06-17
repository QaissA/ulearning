import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const transportService = {
  getAllTransports: async (schoolId?: number) => {
    return prisma.transport.findMany({
      where: { isDeleted: false, ...(schoolId ? { schoolId } : {}) },
      include: { school: true, students: true },
    });
  },
  getTransportById: async (id: number) => {
    return prisma.transport.findUnique({
      where: { id },
      include: { school: true, students: true },
    });
  },
  createTransport: async (routeName: string, driver: string, vehicle?: string, capacity?: number, schoolId?: number, stops?: string, studentIds?: number[]) => {
    return prisma.transport.create({
      data: {
        routeName,
        driver,
        vehicle,
        capacity,
        schoolId,
        stops,
        students: studentIds && studentIds.length > 0 ? { connect: studentIds.map(id => ({ id })) } : undefined,
      },
    });
  },
  updateTransport: async (id: number, routeName?: string, driver?: string, vehicle?: string, capacity?: number, stops?: string, studentIds?: number[]) => {
    return prisma.transport.update({
      where: { id },
      data: {
        routeName,
        driver,
        vehicle,
        capacity,
        stops,
        students: studentIds ? { set: studentIds.map(id => ({ id })) } : undefined,
      },
    });
  },
  softDeleteTransport: async (id: number) => {
    return prisma.transport.update({
      where: { id },
      data: { isDeleted: true },
    });
  },
  restoreTransport: async (id: number) => {
    return prisma.transport.update({
      where: { id },
      data: { isDeleted: false },
    });
  },
};
