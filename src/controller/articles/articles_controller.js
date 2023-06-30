const articlesService = require("../../service/articles/articles_service");

class ArticlesController {
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
}

module.exports = new ArticlesController();
