const connect = require("../../app/database");

class UploadService {
	async upload(filename, mimetype, size, url) {
		try {
			const statement =
				"INSERT INTO image (filename, size, mimetype) VALUES (?, ?, ?)";
			const [res] = await connect.execute(statement, [filename, size, mimetype]);
			return res;
		} catch (error) {
			throw error
		}
	}
}

module.exports = new UploadService();
