const dayjs = require("dayjs");
const tagService = require("../../service/tags/tags_service");

class TagController {
	async list(ctx, next) {
		const { offset = "0", limit = "20", name = "" } = ctx.request.body;
		const res = await tagService.list(offset, limit, name);
		res.forEach((item) => {
			item.create_time = dayjs(item.create_time).format("YYYY-MM-DD HH:mm:ss");
			// item.updateTime = dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss");
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
		const { name } = ctx.request.body;
		const res = await tagService.create(name);
		if (res) {
			ctx.body = {
				code: 0,
				message: "创建成功",
				data: null,
			};
		}
	}

	async edit(ctx, next) {
		const { tagId } = ctx.params;
		const { name } = ctx.request.body;
		const res = await tagService.edit(tagId, name);
		if (res) {
			ctx.body = {
				code: 0,
				message: "编辑成功",
				data: null,
			};
		}
	}

	async delete(ctx, next) {
		const { tagId } = ctx.request.body;
		try {
			if (!Array.isArray(tagId) || tagId.length === 0) {
				ctx.app.emit("error", -1008, ctx);
				return;
			}
			const promises = tagId.map((id) => tagService.delete(id));
			const res = await Promise.all(promises);
			if (res.every((item) => item)) {
				ctx.body = {
					code: 0,
					message: "删除成功",
					data: null,
				};
			} else {
				ctx.app.emit("error", -1007, ctx);
			}
		} catch (error) {
			console.log(error);
			ctx.app.emit("error", -1007, ctx);
		}
	}

	async detail(ctx, next) {
		const { tagId } = ctx.params;
		const res = await tagService.detail(tagId);
		if (res) {
			ctx.body = {
				code: 0,
				message: "",
				data: res,
			};
		}
	}
}

module.exports = new TagController();
