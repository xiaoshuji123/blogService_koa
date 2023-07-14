const tagService = require("../../service/tags/tags_service");

class TagController {
	async list(ctx, next) {
		const { offset = "0", limit = "20" } = ctx.request.body;
		const res = await tagService.list(offset, limit);
		if (res) {
			ctx.body = {
				code: 0,
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
				data: "创建成功",
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
				data: "编辑成功",
			};
		}
	}

	async detail(ctx, next) {
		const { tagId } = ctx.params;
		const res = await tagService.detail(tagId);
		if (res) {
			ctx.body = {
				code: 0,
				data: res,
			};
		}
	}
}

module.exports = new TagController();
