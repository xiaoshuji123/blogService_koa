#创建一个用户表
CREATE TABLE IF NOT EXISTS `user`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL UNIQUE,
	password VARCHAR(20) NOT NULL,
	createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
CREATE TABLE IF NOT EXISTS `role`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	user_id INT NOT NULL UNIQUE,
	intro VARCHAR(100),
	createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES `user`(id)
)

#根据名字去用户表里查找是否有重名
SELECT * FROM user WHERE name = ?
#往用户列表里插入一条数据
INSERT INTO `user` (name, password) VALUES (?, ?)

#用户角色权限三张表的链接

#创建一个角色表
CREATE TABLE IF NOT EXISTS `role`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	user_id INT NOT NULL UNIQUE,
	intro VARCHAR(100),
	createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES `user`(id)
)
#前面的创建表时没有加ON UPDATE CURRENT_TIMESTAMP ，更改updateDate
ALTER TABLE `role` DROP `updateDate`
ALTER TABLE `role` ADD `updateDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
#往角色表中插入一些数据
INSERT INTO `role` (name, intro, user_id) VALUES ("超级管理员", "所有权限", 1)
INSERT INTO `role` (name, intro, user_id) VALUES ("人事", "人事的权限", 1)
#删除user_id的不唯一
ALTER TABLE `role` DROP INDEX `user_id`, ADD CONSTRAINT `user_id` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

#给user新增realName和iphone
ALTER TABLE `user` ADD COLUMN `realName` VARCHAR(50) NULL, ADD COLUMN `iphone` VARCHAR(20) NULL;

#创建一个权限表
CREATE TABLE IF NOT EXISTS `permission` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NULL,
  `type` ENUM('read', 'write', 'execute') NOT NULL DEFAULT 'read',
  `level` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'low',
  `createDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);
#往权限表插入一些数据
INSERT INTO permission (name, description, type) VALUES ('系统管理权限', '系统管理权限', 'read');
INSERT INTO permission (name, description, type) VALUES ('用户管理权限', '用户管理权限', 'read');
INSERT INTO permission (name, description, type) VALUES ('添加用户权限', '添加用户权限', 'execute');
INSERT INTO permission (name, description, type) VALUES ('编辑用户权限', '编辑用户权限', 'execute');
INSERT INTO permission (name, description, type) VALUES ('删除用户权限', '删除用户权限', 'execute');

#创建一个角色权限的关系表
CREATE TABLE IF NOT EXISTS `role_permission`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	role_id INT NOT NULL,
	permission_id INT NOT NULL,
	FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (permission_id) REFERENCES permission(id) ON UPDATE CASCADE ON DELETE CASCADE
)
#设计一个菜单表
CREATE TABLE IF NOT EXISTS `menu`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	`url` VARCHAR(30) NOT NULL,
	parent_id INT NOT NULL,
	order_num INT DEFAULT 1
)
#往菜单表插入一些数据
INSERT INTO `menu` (name, url, parent_id, order_num) VALUES ('系统管理', '/system', 0, 1)
INSERT INTO `menu` (name, url, parent_id, order_num) VALUES ('用户管理', '/system/users', 1, 1)
INSERT INTO menu (name, url, parent_id, order_num) VALUES ('添加用户', '', 2, 2)
INSERT INTO menu (name, url, parent_id, order_num) VALUES ('编辑用户', '', 2, 3)
INSERT INTO menu (name, url, parent_id, order_num) VALUES ('删除用户', '', 2, 4)
#角色菜单关系表
CREATE TABLE IF NOT EXISTS `role_menu`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	role_id INT NOT NULL,
	menu_id INT NOT NULL,
	FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (menu_id) REFERENCES menu(id) ON UPDATE CASCADE ON DELETE CASCADE
)
#往角色菜单关系表中插入数据
INSERT INTO role_menu (role_id, menu_id) VALUES (1, 1);
INSERT INTO role_menu (role_id, menu_id) VALUES (1, 2);
INSERT INTO role_menu (role_id, menu_id) VALUES (1, 3);
INSERT INTO role_menu (role_id, menu_id) VALUES (1, 4);
INSERT INTO role_menu (role_id, menu_id) VALUES (1, 5);
#往角色权限关系表插入数据
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 1);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 2);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 3);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 4);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 5);







