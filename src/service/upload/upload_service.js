const connect = require("../../app/database");

class UploadService {
	async upload(filename, mimetype, size, url) {
		const statement =
			"INSERT INTO image (filename, size, mimetype, url) VALUES (?, ?, ?, ?)";
		const [res] = await connect.execute(statement, [filename, size, mimetype, url]);
		return res;
	}
}

module.exports = new UploadService();
