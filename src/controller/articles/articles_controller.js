const articlesService = require("../../service/articles/articles_service");

class ArticlesController {
	async list(ctx, next) {
		const { offset = 0, limit = 20 } = ctx.request.body;
		const res = await articlesService.list(offset, limit);
		if (res) {
			ctx.body = {
				code: 0,
				data: res,
			};
		}
	}
	async create(ctx, next) {
		const { title, content, authorId } = ctx.request.body;
		const res = await articlesService.createArticle(title, content, authorId);
		if (res) {
			ctx.body = {
				code: 0,
				data: "创建文章成功",
			};
		}
	}
	async edit(ctx, next) {
		const { id, title, content, authorId } = ctx.request.body;
		const res = await articlesService.editArticle(title, content, authorId, id);
		if (res) {
			ctx.body = {
				code: 0,
				data: "编辑文章成功",
			};
		}
	}
	async delete(ctx, next) {
		const { id } = ctx.request.body;
		const res = await articlesService.deleteArticle(id);
		if (res) {
			ctx.body = {
				code: 0,
				data: "删除文章成功",
			};
		}
	}
}

module.exports = new ArticlesController();
