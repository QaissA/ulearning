import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; //

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
    },
  });

  const studenRole = await prisma.role.upsert({
    where: { name: "STUDENT" },
    update: {},
    create: {
      name: "STUDENT",
    },
  });

  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "password123", // Make sure to hash the password
      roleId: adminRole.id,
    },
    {
      name: "Student User",
      email: "student@example.com",
      password: "password123",
      roleId: studenRole.id,
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        roleId: user.roleId,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log("seeding successfully.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
