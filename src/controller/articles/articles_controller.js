const dayjs = require("dayjs");
const fs = require("fs")
const { SERVER_HOST, SERVER_PORT } = require("../../config/server");

const articlesService = require("../../service/articles/articles_service");
const { UPLOAD_PATH } = require("../../config/path");

class ArticlesController {
	async list(ctx, next) {
		const { offset = 0, limit = 20 } = ctx.request.body;
		const res = await articlesService.list(offset, limit);
		res.forEach((item) => {
			item.createTime = dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss");
		});
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
	async getImg(ctx, next) {
		const { id } = ctx.query;
		const res = await articlesService.getImg(id);
		ctx.type = res[0].mimetype;
		const url = `uploads/${res[0].filename}`;
		const newUrl = `${SERVER_HOST}:${SERVER_PORT}/${url}`;

		console.log(newUrl)
		ctx.body = {
			code: 0,
			url: newUrl,
			data: "获取图片成功",
		};
	}
}

module.exports = new ArticlesController();
