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

  const teacherRole = await prisma.role.upsert({
    where: { name: "TEACHER" },
    update: {},
    create: {
      name: "TEACHER",
      description: "Teacher with class management permissions",
    },
  });

  const adminStaffRole = await prisma.role.upsert({
    where: { name: "ADMIN_STAFF" },
    update: {},
    create: {
      name: "ADMIN_STAFF",
      description: "Administrative staff handling school operations",
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
    {
      name: "Teacher User",
      email: "teacher@example.com",
      password: "password123",
      roleId: teacherRole.id,
      adress: "789 Teacher St, Teacher City",
      verificationCode: null,
      isVerified: true,
    },
    {
      name: "Admin Staff User",
      email: "adminstaff@example.com",
      password: "password123",
      roleId: adminStaffRole.id,
      adress: "101 Admin St, Admin City",
      verificationCode: null,
      isVerified: true,
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
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
  }

  // Seed matieres (subjects)
  const matieres = [
    { name: "Mathematics", description: "Study of numbers and equations" },
    { name: "Physics", description: "Study of matter and energy" },
    { name: "Chemistry", description: "Study of substances and reactions" },
    { name: "Biology", description: "Study of living organisms" },
    { name: "History", description: "Study of past events" },
    { name: "Geography", description: "Study of Earth's landscapes and environments" },
    { name: "English", description: "Study of the English language" },
    { name: "Computer Science", description: "Study of computers and programming" },
  ];

  for (const matiere of matieres) {
    await prisma.matiere.upsert({
      where: { name: matiere.name },
      update: {},
      create: {
        name: matiere.name,
        description: matiere.description,
      },
    });
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
