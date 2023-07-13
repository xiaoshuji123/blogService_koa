const fs = require("fs");
const uploadService = require("../../service/upload/upload_service");
const { SERVER_PORT, SERVER_HOST } = require("../../config/server");

class UploadController {
	async upload(ctx, next) {
		console.log(ctx.request.file);
		const { filename, mimetype, size } = ctx.request.file;
		const res = await uploadService.upload(filename, mimetype, size);
		const url = `${SERVER_HOST}:${SERVER_PORT}/article/img/${filename}`;
		if (res) {
			ctx.body = {
				code: 0,
				url: url,
				data: "上传成功",
			};
		}
	}
}

module.exports = new UploadController();
