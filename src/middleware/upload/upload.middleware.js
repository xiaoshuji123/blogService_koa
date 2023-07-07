const multer = require("@koa/multer");
const { UPLOAD_PATH } = require("../../config/path");

const upload = multer({
	dest: UPLOAD_PATH,
});

// 对图片进行处理
const handelImage = upload.single("file");

module.exports = {
	handelImage,
};
