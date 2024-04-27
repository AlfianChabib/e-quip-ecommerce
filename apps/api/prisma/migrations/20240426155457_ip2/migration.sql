/*
  Warnings:

  - You are about to drop the column `userId` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `RefreshToken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- AlterTable
ALTER TABLE `AuthInfo` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `RefreshToken` DROP COLUMN `userId`,
    ADD COLUMN `authInfoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_authInfoId_fkey` FOREIGN KEY (`authInfoId`) REFERENCES `AuthInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
