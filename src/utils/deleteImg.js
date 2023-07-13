const fs = require('fs');
const path = require("path");
function deleteImage(filename) {
	const imagePath = path.join(__dirname, '../../uploads', filename);

	// 删除本地图片
	fs.unlink(imagePath, (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
}

module.exports = deleteImage;
