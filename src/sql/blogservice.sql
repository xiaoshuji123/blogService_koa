/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : blogservice

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 28/07/2023 19:24:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_tags
-- ----------------------------
DROP TABLE IF EXISTS `article_tags`;
CREATE TABLE `article_tags`  (
  `article_id` int NOT NULL,
  `tag_id` int NOT NULL,
  INDEX `article_id`(`article_id` ASC) USING BTREE,
  INDEX `tag_id`(`tag_id` ASC) USING BTREE,
  CONSTRAINT `article_tags_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `article_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_tags
-- ----------------------------
INSERT INTO `article_tags` VALUES (17, 22);
INSERT INTO `article_tags` VALUES (17, 9);
INSERT INTO `article_tags` VALUES (17, 22);

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(220) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章内容',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `authorId` int NOT NULL COMMENT '用户id',
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `coverUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tag_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `authorId`(`authorId` ASC) USING BTREE,
  INDEX `tag_id`(`tag_id` ASC) USING BTREE,
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (2, '古诗', '长风破浪会有时，直挂云帆济沧海', '2023-06-30 17:43:55', 2, '2023-06-30 19:05:39', '', NULL);
INSERT INTO `articles` VALUES (4, '流言', '蔡徐坤崩塌了', '2023-07-10 18:52:27', 2, '2023-07-10 18:52:27', '123123', NULL);
INSERT INTO `articles` VALUES (5, '测试一下', '## 测试数据\n123213123\n## 图片\n![jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png](http://localhost:7000/article/img/75ef72ec2f2123a99108b8429f36f354)非常好看123213123', '2023-07-10 18:52:33', 2, '2023-07-13 09:43:11', 'http://localhost:7000/article/img/0cce8f77157ef661f17495c219dfee30', NULL);
INSERT INTO `articles` VALUES (16, '12321', '123213', '2023-07-14 10:21:05', 2, '2023-07-14 10:21:05', 'http://localhost:7000/article/img/accc303e215abcbf5370e683731770b8', NULL);
INSERT INTO `articles` VALUES (17, '还未王', '123411', '2023-07-28 15:58:50', 2, '2023-07-28 18:38:10', 'http://localhost:7000/article/img/215194fad8b44f796d24425b92698b69', NULL);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `article_id` int NOT NULL COMMENT '文章id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论内容',
  `user_id` int NOT NULL COMMENT '用户id',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `parent_id` int NULL DEFAULT NULL COMMENT '父级评论id',
  `reply_id` int NULL DEFAULT NULL COMMENT '回复人id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `acticle_id`(`article_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `parent_id`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (11, 2, '好诗好诗', 1, '2023-07-14 10:00:24', NULL, NULL);
INSERT INTO `comment` VALUES (12, 2, '好诗好诗', 1, '2023-07-14 10:02:11', NULL, NULL);
INSERT INTO `comment` VALUES (13, 16, '动漫好看', 1, '2023-07-14 10:21:26', NULL, NULL);
INSERT INTO `comment` VALUES (16, 16, '非常推荐', 1, '2023-07-14 10:25:57', 13, NULL);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size` int NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (3, 'a043ddf03871589c0f59de9dd9f662de', 50538, '2023-07-10 11:36:18', 'image/webp');
INSERT INTO `image` VALUES (4, '7479953afc7465a7b4a02935d277c4bd', 50538, '2023-07-10 11:38:02', 'image/webp');
INSERT INTO `image` VALUES (5, '27d04ed0823c27a03f0505ddae509553', 1435417, '2023-07-10 16:31:04', 'image/png');
INSERT INTO `image` VALUES (12, '0cce8f77157ef661f17495c219dfee30', 1435417, '2023-07-10 18:50:50', 'image/png');
INSERT INTO `image` VALUES (13, '54b7acb7e3d03dcad158eb90c2cd0970', 1435417, '2023-07-10 18:51:07', 'image/png');
INSERT INTO `image` VALUES (14, '86a48fff2a4f5d09e320ee41b11c3b97', 1435417, '2023-07-12 18:57:27', 'image/png');
INSERT INTO `image` VALUES (15, 'cd54a6456c9fe26ce21ec039c15a5613', 1435417, '2023-07-12 19:00:02', 'image/png');
INSERT INTO `image` VALUES (16, '75ef72ec2f2123a99108b8429f36f354', 1435417, '2023-07-12 19:02:39', 'image/png');
INSERT INTO `image` VALUES (17, 'a5894477fcc8eff8955d710f1b64e490', 50538, '2023-07-13 10:54:56', 'image/webp');
INSERT INTO `image` VALUES (18, '7966ed7ab23dc97677f0595a8a75e43d', 50538, '2023-07-13 10:56:39', 'image/webp');
INSERT INTO `image` VALUES (19, '839b1ddce1ecdcc04b4138abd28a250f', 50538, '2023-07-13 10:58:36', 'image/webp');
INSERT INTO `image` VALUES (20, 'e684e230b16c412af48032cf1d1fec24', 50538, '2023-07-13 11:32:48', 'image/webp');
INSERT INTO `image` VALUES (21, '6ac56dc39f6c6dcb6e8c9315a7d592ed', 50538, '2023-07-13 11:39:50', 'image/webp');
INSERT INTO `image` VALUES (22, 'b3a8a29ad4dc924d56227f4263f1d0a2', 50538, '2023-07-13 12:55:00', 'image/webp');
INSERT INTO `image` VALUES (23, '2f7100d45505f3d5599379a8181b5e0d', 50538, '2023-07-13 12:55:17', 'image/webp');
INSERT INTO `image` VALUES (24, '7a9291c35687a7389561fad91dcf16ad', 50538, '2023-07-13 14:31:10', 'image/webp');
INSERT INTO `image` VALUES (25, '09ba0100d315a88fd4ab731e63f348f5', 50538, '2023-07-13 14:34:01', 'image/webp');
INSERT INTO `image` VALUES (26, '82ac7d47460668f9c96c0b427a131cb8', 50538, '2023-07-13 17:46:06', 'image/webp');
INSERT INTO `image` VALUES (27, 'accc303e215abcbf5370e683731770b8', 50538, '2023-07-14 10:21:04', 'image/webp');
INSERT INTO `image` VALUES (28, '215194fad8b44f796d24425b92698b69', 50538, '2023-07-28 15:57:16', 'image/webp');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `url` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `parent_id` int NOT NULL,
  `order_num` int NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '系统管理', '/system', 0, 1);
INSERT INTO `menu` VALUES (2, '用户管理', '/system/users', 1, 1);
INSERT INTO `menu` VALUES (3, '添加用户', '', 2, 2);
INSERT INTO `menu` VALUES (4, '编辑用户', '', 2, 3);
INSERT INTO `menu` VALUES (5, '删除用户', '', 2, 4);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` enum('read','write','execute') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'read',
  `level` enum('low','medium','high') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'low',
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES (1, '系统管理权限', '系统管理权限', 'read', 'low', '2023-04-15 11:29:26', '2023-04-15 11:29:26');
INSERT INTO `permission` VALUES (2, '用户管理权限', '用户管理权限', 'read', 'low', '2023-04-15 11:29:26', '2023-04-15 11:29:26');
INSERT INTO `permission` VALUES (3, '添加用户权限', '添加用户权限', 'execute', 'low', '2023-04-15 11:29:26', '2023-04-15 11:29:26');
INSERT INTO `permission` VALUES (4, '编辑用户权限', '编辑用户权限', 'execute', 'low', '2023-04-15 11:31:58', '2023-04-15 11:31:58');
INSERT INTO `permission` VALUES (5, '删除用户权限', '删除用户权限', 'execute', 'low', '2023-04-15 11:31:58', '2023-04-15 11:31:58');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL,
  `intro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', 1, '所有权限', '2023-04-12 17:26:50', '2023-04-12 18:45:22');
INSERT INTO `role` VALUES (4, '人事', 1, '人事的权限', '2023-04-12 17:56:14', '2023-04-12 18:45:22');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  INDEX `menu_id`(`menu_id` ASC) USING BTREE,
  CONSTRAINT `role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, 1);
INSERT INTO `role_menu` VALUES (2, 1, 2);
INSERT INTO `role_menu` VALUES (3, 1, 3);
INSERT INTO `role_menu` VALUES (4, 1, 4);
INSERT INTO `role_menu` VALUES (5, 1, 5);

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  INDEX `permission_id`(`permission_id` ASC) USING BTREE,
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES (1, 1, 1);
INSERT INTO `role_permission` VALUES (2, 1, 2);
INSERT INTO `role_permission` VALUES (3, 1, 3);
INSERT INTO `role_permission` VALUES (4, 1, 4);
INSERT INTO `role_permission` VALUES (5, 1, 5);

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (1, 'javaScript', '2023-07-14 15:02:57');
INSERT INTO `tags` VALUES (9, 'java1', '2023-07-17 19:22:56');
INSERT INTO `tags` VALUES (22, 'dddd', '2023-07-27 18:22:32');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `realName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `iphone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'coderxsj', '111', '2023-04-11 21:56:54', '2023-04-11 21:56:54', 'coderxsj', '13212124455');
INSERT INTO `user` VALUES (2, 'coderwhy', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2023-04-12 10:52:16', '2023-04-12 10:52:16', 'coderwhy', '13423456754');

SET FOREIGN_KEY_CHECKS = 1;
