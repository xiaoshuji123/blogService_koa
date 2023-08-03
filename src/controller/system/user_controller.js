const dayjs = require("dayjs");
const { transaction } = require("../../app/database");
const UserService = require("../../service/system/user_service");

class UserController {
	async create(ctx, next) {
		try {
			const users = ctx.request.body;
			const res = await transaction(async (connection) => {
				const res = await UserService.create(connection, users);
				return res;
			});
			if (res) {
				ctx.body = {
					code: 0,
					message: "用户创建成功",
					data: null,
				};
			}
		} catch (error) {
			ctx.status = 404;
			ctx.body = {
				code: -1,
				message: error.message,
				data: null,
			};
		}
	}

	async list(ctx, next) {
		try {
			const { offset, limit, username = "" } = ctx.request.body;
			const res = await UserService.list(offset, limit, username);
			if (res) {
				res.list.forEach((item) => {
					item.createTime = dayjs(item.createTime).format(
						"YYYY-MM-DD HH:mm:ss"
					);
					item.updateTime = dayjs(item.updateTime).format(
						"YYYY-MM-DD HH:mm:ss"
					);
				});
				ctx.body = {
					code: 0,
					message: null,
					data: res,
				};
			}
		} catch (error) {
			ctx.status = 500;
			ctx.body = {
				code: -1,
				data: null,
				message: error.message,
			};
		}
	}

	async edit(ctx, next) {
		const { id, name, realname, iphone, role } = ctx.request.body;
		try {
			const res = await transaction(async (connection) => {
				const res = await UserService.editUser(
					connection,
					name,
					realname,
					iphone,
					id
				);
				await UserService.editRoleById(connection, id, role);
				return res;
			});
			if (res) {
				ctx.body = {
					code: 0,
					message: "编辑用户成功",
					data: null,
				};
			}
		} catch (error) {
			if (error.statusCode === 404) {
				ctx.status = error.statusCode;
				ctx.body = {
					code: -1020,
					message: error.message,
					data: null,
				};
			} else {
				ctx.body = {
					code: -1,
					message: error.message,
					data: null,
				};
			}
		}
	}
	async delete(ctx, next) {
		try {
			const { id } = ctx.request.body;
			const res = await UserService.deleteUser(id);
			if (res) {
				ctx.body = {
					code: 0,
					message: "删除用户成功",
					data: null,
				};
			}
		} catch (error) {
			ctx.body = {
				code: -1,
				message: error.message,
				data: null,
			};
		}
	}
	async detail(ctx, next) {
		const { userId } = ctx.params;
		const res = await UserService.UserDetail(userId);
		if (res) {
			ctx.body = {
				code: 0,
				message: "",
				data: res,
			};
		}
	}
}

module.exports = new UserController();
