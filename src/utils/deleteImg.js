const fs = require("fs");
const path = require("path");
function deleteImage(filename) {
	return new Promise((_, reject) => {
		const imagePath = path.join(__dirname, "../../uploads", filename);
		// 删除本地图片
		fs.unlink(imagePath, (err) => {
			if (err) {
				reject(err)
			}
		});
	});
}

module.exports = deleteImage;
