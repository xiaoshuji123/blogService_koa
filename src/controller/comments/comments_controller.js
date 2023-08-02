const dayjs = require("dayjs");
const commentsService = require("../../service/comments/comments_service");

class CommentsController {
	async list(ctx, next) {
		const { offset = 0, limit = 20, title = '' } = ctx.request.body;
		const res = await commentsService.list(offset, limit, title);
		res.list.forEach((item) => {
			item.createTime = dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss");
		});
		if (res) {
			ctx.body = {
				code: 0,
				message: "",
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
					message: "创建成功",
					data: null,
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
				message: "删除成功",
				data: null,
			};
		}
	}
}

module.exports = new CommentsController();
