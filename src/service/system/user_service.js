// 这里将数据库的统一配置进行了抽取
// 进行数据库的逻辑操作
const { connect } = require("../../app/database");

class UserService {
	async create(connection, user) {
		try {
			const { name, password, realname, iphone, role } = user;
			const statement =
				"INSERT INTO `user` (name, password, realname, iphone) VALUES (?, ?, ?, ?)";
			const [userRes] = await connection.execute(statement, [
				name,
				password,
				realname,
				iphone,
			]);
			const roleStatement =
				"INSERT INTO `user_role` (user_id, role_id) VALUES (?, ?)";
			for (const roleId of role) {
				await connection.execute(roleStatement, [userRes.insertId, roleId]);
			}
			return userRes;
		} catch (error) {
			throw error;
		}
	}
	async list(offset, limit, username) {
		try {
			const [countResult] = await connect.execute(
				`SELECT COUNT(*) as total FROM user`
			);
			const total = countResult[0].total;
			const statement = `
			SELECT
				u.id id , u.name username, u.realname realname, u.createDate createTime, u.updateDate updateTime, u.status status, u.iphone iphone,
				CASE
					WHEN COUNT(UR.role_id) > 0 THEN JSON_ARRAYAGG(ur.role_id)
					ELSE JSON_ARRAY()
					END as roleIds
			FROM user u
			LEFT JOIN user_role ur ON ur.user_id = u.id
			LEFT JOIN role r ON r.id = ur.role_id
			WHERE u.name LIKE ?
			GROUP BY u.id
			ORDER BY createTime DESC LIMIT ?, ?`;
			const [list] = await connect.execute(statement, [
				`%${username}%`,
				offset + "",
				limit + "",
			]);
			return { total, list };
		} catch (error) {
			throw error;
		}
	}

	async editUser(connection, name, realname, iphone, id) {
		try {
			const statement =
				"UPDATE user SET name = ?, realname = ?, iphone = ? WHERE id = ?";
			const [res] = await connection.execute(statement, [
				name,
				realname,
				iphone,
				id,
			]);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async deleteUser(id) {
		const statement = `DELETE FROM user WHERE id = ?`;
		const [res] = await connect.execute(statement, [id]);
		return res;
	}

	async UserDetail(userId) {
		try {
			const statement = `
			SELECT
				u.id id , u.name username, u.realname realname, u.createDate createTime, u.updateDate updateTime, u.status status, u.iphone iphone,
				CASE
					WHEN COUNT(ur.role_id) > 0 THEN JSON_ARRAYAGG(ur.role_id)
					ELSE JSON_ARRAY()
					END as roleIds
			FROM user u
			LEFT JOIN user_role ur ON ur.user_id = u.id
			LEFT JOIN role r ON r.id = ur.role_id
			WHERE u.id = ?
			GROUP BY u.id`;
			const [res] = await connect.execute(statement, [userId]);
			return res[0];
		} catch (error) {
			throw error;
		}
	}

	async editRoleById(connection, userId, newRoleIds) {
		try {
			// 1.检查文章是否存在，不存在返回错误信息
			// 2.检查新的标签是否存在。如果新的标签不存在，应该返回错误信息。
			// 3.检查新的标签是否和旧的标签相同。如果相同，不需要执行任何操作。
			// 4.删除旧的标签。
			// 5.添加新的标签。
			const [user] = await connection.execute(
				`SELECT * FROM user WHERE id = ?`,
				[userId]
			);
			if (!user[0]) {
				const error = new Error("文章不存在");
				error.statusCode = 404;
				throw error;
			}
			const [olds] = await connection.execute(
				`SELECT role_id FROM user_role WHERE user_id = ?`,
				[userId]
			);
			const oldUserIds = olds.map((item) => item.role_id);

			// 删除旧标签
			for (const oldRole of oldUserIds) {
				const index = newRoleIds.findIndex((roleId) => roleId === oldRole);
				if (index === -1) {
					const statement = `DELETE FROM user_role WHERE user_id = ? AND role_id = ?`;
					await connection.execute(statement, [userId, oldRole]);
				}
			}
			// 添加新标签
			for (const roleId of newRoleIds) {
				const index = oldUserIds.findIndex((oldRole) => roleId === oldRole);
				if (index === -1) {
					const statement = `INSERT INTO user_role (user_id, role_id) VALUES (?, ?)`;
					await connection.execute(statement, [userId, roleId]);
				}
			}
		} catch (error) {
			throw error;
		}
	}

	async findUserByName(name) {
		const statement = "SELECT * FROM user WHERE name = ?";
		const [res] = await connect.execute(statement, [name]);
		return !!res.length;
	}

	async findRoleById(roleId) {
		try {
			const statement = "SELECT * FROM role WHERE id = ?";
			const [res] = await connect.execute(statement, [roleId]);
			return !!res.length;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new UserService();
