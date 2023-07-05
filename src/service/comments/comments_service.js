const connect = require("../../app/database");

class CommentsService {
	async list(offset, limit) {
		try {
			const statement = `
			SELECT
				C.id id , c.article_id articleId, c.content content, c.create_time createTime, c.parent_id parentId, u.name userName, a.title title,
				u2.name replyName
			FROM comment c
			LEFT JOIN user u ON u.id = c.user_id
			LEFT JOIN articles a ON a.id = c.article_id
			LEFT JOIN comment c2 ON c.parent_id = c2.id
			LEFT JOIN user u2 ON c2.user_id = u2.id
			ORDER BY createTime DESC LIMIT ?, ?`;
			const [res] = await connect.execute(statement, [offset + '', limit + '']);
			return res;
		} catch (error) {
			return error;
		}
	}
	async create(data) {
		const { articleId, content, userId, parentId } = data;
		try {
			const statement =
				"INSERT INTO `comment` (article_id, content, user_id, parent_id) VALUES (?, ?, ?, ?)";
			const [res] = await connect.execute(statement, [
				articleId,
				content,
				userId,
				parentId,
			]);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async delete(id) {
		const statement = `DELETE FROM comment WHERE id = ?`;
		const [res] = await connect.execute(statement, [id]);
		return res;
	}
}

module.exports = new CommentsService();
