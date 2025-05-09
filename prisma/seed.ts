import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding...`);

  // Create Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      description: 'Administrator with full access',
    },
  });

  const teacherRole = await prisma.role.create({
    data: {
      name: 'TEACHER',
      description: 'Teacher with access to classes, attendance, and notes',
    },
  });

  const studentRole = await prisma.role.create({
    data: {
      name: 'STUDENT',
      description: 'Student with limited access',
    },
  });

  console.log(`Created roles`);

  // Create Permissions
  const permissions = await Promise.all([
    prisma.permission.create({
      data: {
        name: 'Read Users',
        description: 'Can view user information',
        key: 'users:read',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Write Users',
        description: 'Can create and edit users',
        key: 'users:write',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Delete Users',
        description: 'Can delete users',
        key: 'users:delete',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Read Classes',
        description: 'Can view classes',
        key: 'classes:read',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Write Classes',
        description: 'Can create and edit classes',
        key: 'classes:write',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Read Attendance',
        description: 'Can view attendance records',
        key: 'attendance:read',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Write Attendance',
        description: 'Can create and edit attendance records',
        key: 'attendance:write',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Read Notes',
        description: 'Can view notes/scores',
        key: 'notes:read',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Write Notes',
        description: 'Can create and edit notes/scores',
        key: 'notes:write',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Read Schedule',
        description: 'Can view schedule',
        key: 'schedule:read',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'Write Schedule',
        description: 'Can create and edit schedule',
        key: 'schedule:write',
      },
    }),
  ]);

  console.log(`Created permissions`);

  // Assign permissions to roles
  // Admin gets all permissions
  const adminPermissions = await Promise.all(
    permissions.map((permission) =>
      prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      })
    )
  );

  // Teacher permissions
  const teacherPermKeys = [
    'users:read',
    'classes:read',
    'attendance:read',
    'attendance:write',
    'notes:read',
    'notes:write',
    'schedule:read',
  ];
  
  const teacherPermissions = await Promise.all(
    permissions
      .filter((p) => teacherPermKeys.includes(p.key))
      .map((permission) =>
        prisma.rolePermission.create({
          data: {
            roleId: teacherRole.id,
            permissionId: permission.id,
          },
        })
      )
  );

  // Student permissions
  const studentPermKeys = ['notes:read', 'schedule:read'];
  
  const studentPermissions = await Promise.all(
    permissions
      .filter((p) => studentPermKeys.includes(p.key))
      .map((permission) =>
        prisma.rolePermission.create({
          data: {
            roleId: studentRole.id,
            permissionId: permission.id,
          },
        })
      )
  );

  console.log(`Assigned permissions to roles`);

  // Create Classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        name: 'Class 6A',
        description: 'Sixth grade, section A',
      },
    }),
    prisma.class.create({
      data: {
        name: 'Class 6B',
        description: 'Sixth grade, section B',
      },
    }),
    prisma.class.create({
      data: {
        name: 'Class 7A',
        description: 'Seventh grade, section A',
      },
    }),
    prisma.class.create({
      data: {
        name: 'Class 7B',
        description: 'Seventh grade, section B',
      },
    }),
  ]);

  console.log(`Created classes`);

  // Create Matieres (Subjects)
  const subjects = await Promise.all([
    prisma.matiere.create({
      data: {
        name: 'Mathematics',
        description: 'Study of numbers, quantities, and shapes',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'French',
        description: 'Study of French language and literature',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'English',
        description: 'Study of English language',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'History',
        description: 'Study of past events',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'Geography',
        description: 'Study of places and the relationships between people and their environments',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'Physics',
        description: 'Study of matter, energy, and the fundamental forces of nature',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'Chemistry',
        description: 'Study of substances, their properties, structure, and the changes they undergo',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'Biology',
        description: 'Study of living organisms',
      },
    }),
    prisma.matiere.create({
      data: {
        name: 'Physical Education',
        description: 'Physical fitness, sports, and health education',
      },
    }),
  ]);

  console.log(`Created subjects`);

  // Hash for password - in a real application, use a proper password hashing function
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@school.com',
      password: hashedPassword,
      roleId: adminRole.id,
      adress: '123 Admin Street, City',
      isVerified: true,
    },
  });

  console.log(`Created admin user`);

  // Create Teachers
  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Marie Curie',
        email: 'marie.curie@school.com',
        password: hashedPassword,
        roleId: teacherRole.id,
        adress: '42 Science Ave, Paris',
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Albert Einstein',
        email: 'albert.einstein@school.com',
        password: hashedPassword,
        roleId: teacherRole.id,
        adress: '123 Relativity Road, Zurich',
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Isaac Newton',
        email: 'isaac.newton@school.com',
        password: hashedPassword,
        roleId: teacherRole.id,
        adress: '1 Gravity Lane, Cambridge',
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Ada Lovelace',
        email: 'ada.lovelace@school.com',
        password: hashedPassword,
        roleId: teacherRole.id,
        adress: '27 Computing Street, London',
        isVerified: true,
      },
    }),
  ]);

  console.log(`Created teacher users`);

  // Create Students (5 per class)
  const studentNames = [
    ['Jean Dupont', 'jean.dupont@student.com', '1 Rue de la Paix, Paris'],
    ['Marie Lambert', 'marie.lambert@student.com', '15 Avenue Victor Hugo, Lyon'],
    ['Lucas Martin', 'lucas.martin@student.com', '8 Rue du Commerce, Marseille'],
    ['Emma Bernard', 'emma.bernard@student.com', '22 Boulevard Gambetta, Lille'],
    ['Thomas Dubois', 'thomas.dubois@student.com', '5 Place de la République, Toulouse'],
    ['Léa Petit', 'lea.petit@student.com', '19 Rue Pasteur, Nice'],
    ['Hugo Leroy', 'hugo.leroy@student.com', '7 Avenue de la Liberté, Nantes'],
    ['Chloé Moreau', 'chloe.moreau@student.com', '12 Rue des Fleurs, Strasbourg'],
    ['Nathan Lefebvre', 'nathan.lefebvre@student.com', '31 Boulevard des Alpes, Grenoble'],
    ['Camille Girard', 'camille.girard@student.com', '9 Rue de la Fontaine, Bordeaux'],
    ['Louis Fournier', 'louis.fournier@student.com', '16 Avenue Jean Jaurès, Montpellier'],
    ['Manon Mercier', 'manon.mercier@student.com', '24 Rue Victor Hugo, Rennes'],
    ['Jules Blanc', 'jules.blanc@student.com', '3 Place Bellecour, Lyon'],
    ['Zoé Laurent', 'zoe.laurent@student.com', '17 Rue de la République, Paris'],
    ['Théo Michel', 'theo.michel@student.com', '6 Avenue Foch, Strasbourg'],
    ['Inès Robert', 'ines.robert@student.com', '28 Boulevard Saint-Michel, Paris'],
    ['Gabriel Richard', 'gabriel.richard@student.com', '14 Rue Gambetta, Lille'],
    ['Léna Durand', 'lena.durand@student.com', '10 Place des Terreaux, Lyon'],
    ['Ethan Lefevre', 'ethan.lefevre@student.com', '21 Avenue de la Marne, Bordeaux'],
    ['Sara Simon', 'sara.simon@student.com', '11 Rue Nationale, Tours'],
  ];

  const students = [];
  
  for (let i = 0; i < studentNames.length; i++) {
    const classId = classes[Math.floor(i / 5)].id; // Assign 5 students per class
    
    const student = await prisma.user.create({
      data: {
        name: studentNames[i][0],
        email: studentNames[i][1],
        password: hashedPassword,
        roleId: studentRole.id,
        adress: studentNames[i][2],
        isVerified: true,
        classId: classId,
      },
    });
    
    students.push(student);
  }

  console.log(`Created student users`);

  // Create Schedule (EmploiDuTemps)
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    { start: '08:00', end: '09:30' },
    { start: '09:45', end: '11:15' },
    { start: '11:30', end: '13:00' },
    { start: '14:00', end: '15:30' },
    { start: '15:45', end: '17:15' },
  ];

  for (const classObj of classes) {
    // Assign different subjects to different days and times
    let scheduleCount = 0;
    
    for (const day of days) {
      for (const timeSlot of timeSlots) {
        // Skip some slots to make the schedule more realistic (not every slot filled)
        if (Math.random() > 0.8) continue;
        
        const subjectIndex = (scheduleCount % subjects.length);
        const teacherIndex = (scheduleCount % teachers.length);
        
        await prisma.emploiDuTemps.create({
          data: {
            classId: classObj.id,
            matiereId: subjects[subjectIndex].id,
            teacherId: teachers[teacherIndex].id,
            day: day,
            heureDebut: timeSlot.start,
            heureFin: timeSlot.end,
          },
        });
        
        scheduleCount++;
      }
    }
  }

  console.log(`Created schedules`);

  // Create Attendance Records
  // Generate attendance for the last 10 days
  const today = new Date();
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    for (const student of students) {
      // 90% chance of being present
      const status = Math.random() > 0.1 ? 'PRESENT' : 'ABSENT';
      
      await prisma.attendance.create({
        data: {
          userId: student.id,
          date: date,
          status: status,
        },
      });
    }
  }

  console.log(`Created attendance records`);

  // Create Notes (Grades)
  for (const student of students) {
    for (const subject of subjects) {
      // Some students might not have grades in all subjects yet
      if (Math.random() > 0.7) continue;
      
      // Generate a random score between 0 and 20 (French grading system)
      const score = parseFloat((Math.random() * 20).toFixed(1));
      
      await prisma.note.create({
        data: {
          userId: student.id,
          matiereId: subject.id,
          score: score,
        },
      });
    }
  }

  console.log(`Created notes/grades`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });