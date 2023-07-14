const connect = require("../../app/database");
class TagService {
	async list(offset, limit) {
		try {
			const statement = "SELECT * FROM tags ORDER BY create_time DESC LIMIT ?, ?";
			const [res] = await connect.execute(statement, [offset + '', limit + '']);
			return res;
		} catch (error) {
			throw error
		}
	}
	async create(name) {
		try {
			const statement = "INSERT INTO tags (name) VALUES (?)";
			const [res] = await connect.execute(statement, [name]);
			return res;
		} catch (error) {
			throw error
		}
	}
	async edit(id, name) {
		try {
			const statement = "UPDATE tags SET name = ? WHERE id = ?;";
			const [res] = await connect.execute(statement, [name, id]);
			return res;
		} catch (error) {
			throw error
		}
	}

	async detail(id) {
		try {
			const statement = "SELECT * FROM tags WHERE id = ?";
			const [res] = await connect.execute(statement, [id]);
			return res[0];
		} catch (error) {
			throw error
		}
	}
}

module.exports = new TagService();
