const RoleService = require("../../service/system/role_service");

class RoleController {
	async list(ctx, next) {
		try {
			const res = await RoleService.list();
			if (res) {
				ctx.body = {
					code: 0,
					data: res,
					message: null,
				};
			}
		} catch (error) {
			ctx.status = 404;
			ctx.body = {
				code: -1,
				data: null,
				message: error.message,
			};
		}
	}
	create() {}
}

module.exports = new RoleController();
