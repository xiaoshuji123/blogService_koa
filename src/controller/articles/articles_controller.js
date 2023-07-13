const dayjs = require("dayjs");
const fs = require("fs");

const articlesService = require("../../service/articles/articles_service");
const { UPLOAD_PATH } = require("../../config/path");
const deleteImage = require("../../utils/deleteImg");

class ArticlesController {
	async list(ctx, next) {
		const { offset = "0", limit = "20", title = null } = ctx.query;
		const res = await articlesService.list(offset, limit, title);
		res.forEach((item) => {
			item.createTime = dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss");
			item.updateTime = dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss");
		});
		if (res) {
			ctx.body = {
				code: 0,
				data: res,
			};
		}
	}
	async create(ctx, next) {
		const { title, content, coverUrl, authorId } = ctx.request.body;
		const res = await articlesService.createArticle(
			title,
			content,
			coverUrl,
			authorId
		);
		if (res) {
			ctx.body = {
				code: 0,
				data: "创建文章成功",
			};
		}
	}
	async edit(ctx, next) {
		const { id, title, content, authorId, coverUrl } = ctx.request.body;
		const res = await articlesService.editArticle(
			title,
			content,
			authorId,
			coverUrl,
			id
		);
		if (res) {
			ctx.body = {
				code: 0,
				data: "编辑文章成功",
			};
		}
	}
	async delete(ctx, next) {
		const { id } = ctx.request.body;
		const { coverUrl } = await articlesService.articleDetail(id);

		deleteImage(coverUrl.split("/").pop());
		const res = await articlesService.deleteArticle(id);
		if (res) {
			ctx.body = {
				code: 0,
				data: "删除文章成功",
			};
		}
	}
	async detail(ctx, next) {
		const { articleId } = ctx.params;
		const res = await articlesService.articleDetail(articleId);
		if (res) {
			ctx.body = {
				code: 0,
				data: res,
			};
		}
	}
	// 这个接口是用来获取图片的，往后的图片就调用这个接口来展示
	async getImg(ctx, next) {
		try {
			const { filename } = ctx.params;
			const res = await articlesService.getImg(filename);
			ctx.type = res.mimetype;
			const url = `${UPLOAD_PATH}/${res.filename}`;
			const newUrl = fs.createReadStream(url);
			ctx.body = newUrl;
		} catch (error) {
			ctx.body = error;
		}
	}
}

module.exports = new ArticlesController();
