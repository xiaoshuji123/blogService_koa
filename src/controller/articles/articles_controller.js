const dayjs = require("dayjs");
const fs = require("fs");
const { connect, transaction } = require("../../app/database");

const articlesService = require("../../service/articles/articles_service");
const { UPLOAD_PATH } = require("../../config/path");
const deleteImage = require("../../utils/deleteImg");

class ArticlesController {
	async list(ctx, next) {
		const { offset = "0", limit = "20", title = "" } = ctx.query;
		const res = await articlesService.list(offset, limit, title);
		res.forEach((item) => {
			item.createTime = dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss");
			item.updateTime = dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss");
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
		const { title, content, coverUrl, authorId, tagIds } = ctx.request.body;
		try {
			const res = await transaction(async (connection) => {
				const res = await articlesService.createArticle(
					connection,
					title,
					content,
					coverUrl,
					authorId
				);
				const newId = res.insertId;
				// 先创建文章，获取文章ID，再将标签与文章进行绑定
				for (const tagId of tagIds) {
					await articlesService.createTagById(connection, newId, tagId);
				}
				return res
			})
			if (res) {
				ctx.body = {
					code: 0,
					message: "创建文章成功",
					data: null,
				};
			}
		} catch (error) {
			ctx.status = error.statusCode;
			ctx.body = {
				code: -1020,
				message: error.message,
				data: null,
			};
		}
	}
	async edit(ctx, next) {
		const { id, title, content, authorId, coverUrl, tagIds } = ctx.request.body;
		try {
			const res = await transaction(async (connection) => {
				const res = await articlesService.editArticle(
					connection,
					title,
					content,
					authorId,
					coverUrl,
					id
				);
				for (const tagId of tagIds) {
					await articlesService.editTagById(connection, id, tagId);
				}
				return res
			})
			if (res) {
				ctx.body = {
					code: 0,
					message: "编辑文章成功",
					data: null,
				};
			}
		} catch (error) {
			if (error.statusCode === 400) {
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
		const { id } = ctx.request.body;
		const { coverUrl } = await articlesService.articleDetail(id);

		deleteImage(coverUrl.split("/").pop());
		const res = await articlesService.deleteArticle(id);
		if (res) {
			ctx.body = {
				code: 0,
				message: "删除文章成功",
				data: null,
			};
		}
	}
	async detail(ctx, next) {
		const { articleId } = ctx.params;
		const res = await articlesService.articleDetail(articleId);
		if (res) {
			ctx.body = {
				code: 0,
				message: "",
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
