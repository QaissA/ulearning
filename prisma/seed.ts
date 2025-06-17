import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator role',
    },
  });

  const teacherRole = await prisma.role.upsert({
    where: { name: 'Teacher' },
    update: {},
    create: {
      name: 'Teacher',
      description: 'Teacher role',
    },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: 'Student' },
    update: {},
    create: {
      name: 'Student',
      description: 'Student role',
    },
  });

  // Create permissions
  const permissionData = [
    { name: 'Read Users', key: 'users:read', description: 'Can read users' },
    { name: 'Write Users', key: 'users:write', description: 'Can modify users' },
    { name: 'Manage Classes', key: 'classes:manage', description: 'Can manage classes' },
  ];

  for (const perm of permissionData) {
    await prisma.permission.upsert({
      where: { key: perm.key },
      update: {},
      create: perm,
    });
  }

  // Attach permissions to Admin role
  const allPermissions = await prisma.permission.findMany();
  await Promise.all(
    allPermissions.map((permission) =>
      prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      })
    )
  );

  // Create schools
  const school1 = await prisma.school.upsert({
    where: { name: 'Green Valley School' },
    update: {},
    create: {
      name: 'Green Valley School',
      address: '123 Main St, Cityville',
      phone: '+1234567890',
      email: 'info@greenvalley.edu',
    },
  });

  const school2 = await prisma.school.upsert({
    where: { name: 'Blue Mountain Academy' },
    update: {},
    create: {
      name: 'Blue Mountain Academy',
      address: '456 Hill Rd, Townsville',
      phone: '+0987654321',
      email: 'contact@bluemountain.edu',
    },
  });

  // Create school year (now linked to school1)
  const schoolYear = await prisma.schoolYear.upsert({
    where: { name: '2024-2025' },
    update: {},
    create: {
      name: '2024-2025',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-06-30'),
      schoolId: school1.id,
    },
  });

  // Create class 1
  const class1 = await prisma.class.upsert({
    where: { name: 'CM1 A' },
    update: {},
    create: {
      name: 'CM1 A',
      description: 'Primary school class CM1 section A',
      schoolYearId: schoolYear.id,
      schoolId: school1.id,
    },
  });

  // Create class 2
  const class2 = await prisma.class.upsert({
    where: { name: 'CM1 B' },
    update: {},
    create: {
      name: 'CM1 B',
      description: 'Primary school class CM1 section B',
      schoolYearId: schoolYear.id,
      schoolId: school1.id,
    },
  });

  // Create subjects
  const math = await prisma.matiere.upsert({
    where: { name: 'Math' },
    update: {},
    create: {
      name: 'Math',
      description: 'Mathematics subject',
    },
  });

  const science = await prisma.matiere.upsert({
    where: { name: 'Science' },
    update: {},
    create: {
      name: 'Science',
      description: 'Science subject',
    },
  });

  // Create teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      name: 'Mr. Smith',
      email: 'teacher@example.com',
      password: 'hashed_password',
      roleId: teacherRole.id,
      isVerified: true,
    },
  });

  // Create students for class 1
  const student1 = await prisma.user.upsert({
    where: { email: 'alice@student.com' },
    update: {},
    create: {
      name: 'Alice Student',
      email: 'alice@student.com',
      password: 'hashed_password',
      roleId: studentRole.id,
      classId: class1.id,
      isVerified: true,
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: 'bob@student.com' },
    update: {},
    create: {
      name: 'Bob Student',
      email: 'bob@student.com',
      password: 'hashed_password',
      roleId: studentRole.id,
      classId: class1.id,
      isVerified: true,
    },
  });

  // Create students for class 2
  const student3 = await prisma.user.upsert({
    where: { email: 'carol@student.com' },
    update: {},
    create: {
      name: 'Carol Student',
      email: 'carol@student.com',
      password: 'hashed_password',
      roleId: studentRole.id,
      classId: class2.id,
      isVerified: true,
    },
  });

  const student4 = await prisma.user.upsert({
    where: { email: 'dave@student.com' },
    update: {},
    create: {
      name: 'Dave Student',
      email: 'dave@student.com',
      password: 'hashed_password',
      roleId: studentRole.id,
      classId: class2.id,
      isVerified: true,
    },
  });

  // Create schedule for both classes (teacher teaches both)
  await prisma.emploiDuTemps.createMany({
    data: [
      {
        classId: class1.id,
        matiereId: math.id,
        teacherId: teacher.id,
        day: 'Monday',
        heureDebut: '08:00',
        heureFin: '10:00',
      },
      {
        classId: class1.id,
        matiereId: science.id,
        teacherId: teacher.id,
        day: 'Tuesday',
        heureDebut: '10:00',
        heureFin: '12:00',
      },
      {
        classId: class2.id,
        matiereId: math.id,
        teacherId: teacher.id,
        day: 'Wednesday',
        heureDebut: '08:00',
        heureFin: '10:00',
      },
      {
        classId: class2.id,
        matiereId: science.id,
        teacherId: teacher.id,
        day: 'Thursday',
        heureDebut: '10:00',
        heureFin: '12:00',
      },
    ],
    skipDuplicates: true,
  });

  // Add notes and attendance for all students
  await prisma.note.createMany({
    data: [
      { userId: student1.id, matiereId: math.id, score: 15 },
      { userId: student2.id, matiereId: science.id, score: 18 },
      { userId: student3.id, matiereId: math.id, score: 14 },
      { userId: student3.id, matiereId: science.id, score: 16 }, // Carol extra note
      { userId: student4.id, matiereId: math.id, score: 13 },    // Dave extra note
      { userId: student4.id, matiereId: science.id, score: 17 },
    ],
    skipDuplicates: true,
  });

  await prisma.attendance.createMany({
    data: [
      { userId: student1.id, status: 'PRESENT' },
      { userId: student2.id, status: 'ABSENT' },
      { userId: student3.id, status: 'PRESENT' },
      { userId: student4.id, status: 'PRESENT' },
    ],
    skipDuplicates: true,
  });

  // Seed documents
  await prisma.document.createMany({
    data: [
      {
        title: 'School Handbook',
        description: 'General rules and policies for the school year.',
        url: 'https://example.com/handbook.pdf',
        uploadedBy: teacher.id, // assuming teacher from previous seed
        schoolId: school1.id,   // assuming school1 from previous seed
        isDeleted: false,
      },
      {
        title: 'Math Syllabus',
        description: 'Syllabus for the Math subject.',
        url: 'https://example.com/math-syllabus.pdf',
        uploadedBy: teacher.id,
        schoolId: school1.id,
        isDeleted: false,
      },
    ],
    skipDuplicates: true,
  });

  // Seed transports
  await prisma.transport.createMany({
    data: [
      {
        routeName: 'North Route',
        driver: 'John Doe',
        vehicle: 'Bus 1',
        capacity: 40,
        schoolId: school1.id,
        stops: 'Main St, Oak Ave, Pine Rd',
        isDeleted: false,
      },
      {
        routeName: 'South Route',
        driver: 'Jane Smith',
        vehicle: 'Bus 2',
        capacity: 35,
        schoolId: school2.id,
        stops: 'Hill Rd, River St, Maple Ave',
        isDeleted: false,
      },
    ],
    skipDuplicates: true,
  });

  // Associate teacher with user id 3 to both schools
  await prisma.teacherSchool.createMany({
    data: [
      { teacherId: 3, schoolId: school1.id },
      { teacherId: 3, schoolId: school2.id },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
