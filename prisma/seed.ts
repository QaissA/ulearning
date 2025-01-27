import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "Administrator with full access",
    },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: "STUDENT" },
    update: {},
    create: {
      name: "STUDENT",
      description: "Regular student user",
    },
  });

  // Seed users
  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "password123", // Will be hashed
      roleId: adminRole.id,
      adress: "123 Admin St, Admin City",
      verificationCode: null,
      isVerified: true,
    },
    {
      name: "Student User",
      email: "student@example.com",
      password: "password123",
      roleId: studentRole.id,
      adress: "456 Student St, Student City",
      verificationCode: null,
      isVerified: true,
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        roleId: user.roleId,
        adress: user.adress,
        verificationCode: user.verificationCode,
        isVerified: user.isVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // If the user is a student, create a related Student record
    if (user.roleId === studentRole.id) {
      await prisma.student.upsert({
        where: { userId: createdUser.id },
        update: {},
        create: {
          userId: createdUser.id,
          gradeLevel: "Grade 10", // Example grade level, modify as needed
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
