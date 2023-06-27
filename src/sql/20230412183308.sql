/*
MySQL Backup
Database: blogservice
Backup Time: 2023-04-12 18:33:08
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `blogservice`.`role`;
DROP TABLE IF EXISTS `blogservice`.`user`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `user_id` int NOT NULL,
  `intro` varchar(100) DEFAULT NULL,
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `realName` varchar(50) DEFAULT NULL,
  `iphone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
BEGIN;
LOCK TABLES `blogservice`.`role` WRITE;
DELETE FROM `blogservice`.`role`;
INSERT INTO `blogservice`.`role` (`id`,`name`,`user_id`,`intro`,`createDate`,`updateDate`) VALUES (1, '超级管理员', 1, '所有权限', '2023-04-12 17:26:50', '2023-04-12 17:26:50'),(4, '人事', 1, '人事的权限', '2023-04-12 17:56:14', '2023-04-12 17:56:14');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `blogservice`.`user` WRITE;
DELETE FROM `blogservice`.`user`;
INSERT INTO `blogservice`.`user` (`id`,`name`,`password`,`createDate`,`updateDate`,`realName`,`iphone`) VALUES (1, 'coderxsj', '111', '2023-04-11 21:56:54', '2023-04-11 21:56:54', 'coderxsj', '13212124455'),(2, 'coderwhy', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2023-04-12 10:52:16', '2023-04-12 10:52:16', 'coderwhy', '13423456754');
UNLOCK TABLES;
COMMIT;
