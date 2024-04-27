-- DropForeignKey
ALTER TABLE `RefreshToken` DROP FOREIGN KEY `RefreshToken_authInfoId_fkey`;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_authInfoId_fkey` FOREIGN KEY (`authInfoId`) REFERENCES `AuthInfo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
