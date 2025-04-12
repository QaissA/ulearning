import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: { name: "ADMIN", description: "Administrator with full access" },
    }),
    prisma.role.upsert({
      where: { name: "STUDENT" },
      update: {},
      create: { name: "STUDENT", description: "Regular student user" },
    }),
    prisma.role.upsert({
      where: { name: "TEACHER" },
      update: {},
      create: {
        name: "TEACHER",
        description: "Teacher with class management permissions",
      },
    }),
    prisma.role.upsert({
      where: { name: "ADMIN_STAFF" },
      update: {},
      create: {
        name: "ADMIN_STAFF",
        description: "Administrative staff handling school operations",
      },
    }),
  ]);

  const [adminRole, studentRole, teacherRole, adminStaffRole] = roles;

  // Create classes
  const classes = await Promise.all([
    prisma.class.upsert({
      where: { name: "Class A" },
      update: {},
      create: { name: "Class A", description: "First grade class" },
    }),
    prisma.class.upsert({
      where: { name: "Class B" },
      update: {},
      create: { name: "Class B", description: "Second grade class" },
    }),
  ]);

  const [classA, classB] = classes;

  // Seed users
  const usersData = [
    {
      name: "Admin User",
      email: "admin@example.com",
      roleId: adminRole.id,
      adress: "123 Admin St",
      isVerified: true,
    },
    {
      name: "Student User",
      email: "student@example.com",
      roleId: studentRole.id,
      adress: "456 Student St",
      classId: classA.id,
      isVerified: true,
    },
    {
      name: "Teacher User",
      email: "teacher@example.com",
      roleId: teacherRole.id,
      adress: "789 Teacher St",
      isVerified: true,
    },
    {
      name: "Admin Staff User",
      email: "adminstaff@example.com",
      roleId: adminStaffRole.id,
      adress: "101 Admin St",
      isVerified: true,
    },
  ];

  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: hashedPassword },
    });
  }

  // Seed subjects
  const matieres = await Promise.all([
    prisma.matiere.upsert({
      where: { name: "Mathematics" },
      update: {},
      create: { name: "Mathematics", description: "Study of numbers" },
    }),
    prisma.matiere.upsert({
      where: { name: "Physics" },
      update: {},
      create: { name: "Physics", description: "Study of matter" },
    }),
  ]);

  const [math, physics] = matieres;

  // Seed schedule (EmploiDuTemps)
  await prisma.emploiDuTemps.createMany({
    data: [
      {
        classId: classA.id,
        matiereId: math.id,
        teacherId: 3,
        day: "Monday",
        heureDebut: "08:00",
        heureFin: "10:00",
      },
      {
        classId: classB.id,
        matiereId: physics.id,
        teacherId: 3,
        day: "Tuesday",
        heureDebut: "10:00",
        heureFin: "12:00",
      },
    ],
  });

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
