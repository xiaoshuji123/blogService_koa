const commentsService = require("../../service/comments/comments_service");

class CommentsController {
	async list(ctx, next) {
		const { offset = 0, limit = 20 } = ctx.request.body;
		const res = await commentsService.list(offset, limit);
		if (res) {
			ctx.body = {
				code: 0,
				data: res,
			};
		}
	}
	async create(ctx, next) {
		try {
			const data = ctx.request.body;
			const res = await commentsService.create(data);
			if (res) {
				ctx.body = {
					code: 0,
					data: "创建成功",
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
	async delete(ctx, next) {
		const { id } = ctx.request.body;
		const res = await commentsService.delete(id);
		if (res) {
			ctx.body = {
				code: 0,
				data: "删除成功",
			};
		}
	}
}

module.exports = new CommentsController();
