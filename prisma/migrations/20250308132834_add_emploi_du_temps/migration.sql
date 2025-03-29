-- CreateTable
CREATE TABLE `EmploiDuTemps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classId` INTEGER NOT NULL,
    `matiereId` INTEGER NOT NULL,
    `teacherId` INTEGER NOT NULL,
    `day` VARCHAR(20) NOT NULL,
    `heureDebut` DATETIME(3) NOT NULL,
    `heureFin` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmploiDuTemps` ADD CONSTRAINT `EmploiDuTemps_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmploiDuTemps` ADD CONSTRAINT `EmploiDuTemps_matiereId_fkey` FOREIGN KEY (`matiereId`) REFERENCES `Matiere`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmploiDuTemps` ADD CONSTRAINT `EmploiDuTemps_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
