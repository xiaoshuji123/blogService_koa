const fs = require("fs")
const uploadService = require("../../service/upload/upload_service");
const { SERVER_HOST, SERVER_PORT } = require("../../config/server");
const { UPLOAD_PATH } = require("../../config/path");

class UploadController {
	async upload(ctx, next) {
		const { filename, mimetype, size } = ctx.request.file;
		// const url = `${SERVER_HOST}:${SERVER_PORT}/${filename}`;
		// ctx.type = mimetype;
		// const newUrl = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
		// console.log(newUrl)
		const res = await uploadService.upload(filename, mimetype, size, url);
		if (res) {
			ctx.body = {
				code: 0,
				data: "上传成功",
			};
		}
	}
}

module.exports = new UploadController();
