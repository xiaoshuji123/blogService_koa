const connect = require("../../app/database");

class ArticlesService {
	//平常get请求是?offset=0&limit=20这种常见的方式，它是字符串
	//因为我采用的是post请求，传递过来的参数是数字类型，所以需要转换成字符串类型
	async list(offset, limit) {
		try {
			const statement = `
			SELECT
				a.id id , a.title title, a.content content, a.createTime createTime, a.authorId authorId, u.name authorName,
				CASE
					WHEN COUNT(c.id) > 0 THEN JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'articleId', c.article_id, 'content', c.content, 'createTime', c.create_time, 'parentId', c.parent_id, 'userName', u.name ))
					ELSE JSON_ARRAY() END as comments
			FROM articles a
			LEFT JOIN user u ON u.id = a.authorId
			LEFT JOIN comment c ON c.article_id = a.id
			GROUP BY a.id
			ORDER BY createTime DESC LIMIT ?, ?`;
			const [res] = await connect.execute(statement, [offset + '', limit + '']);
			return res;
		} catch (error) {
			console.log(error);
		}
	}
	async createArticle(title, content, authorId) {
		const statement =
			"INSERT INTO articles (title, content, authorId) VALUES (?, ?, ?);";
		const [res] = await connect.execute(statement, [title, content, authorId]);
		return res;
	}
	async editArticle(title, content, authorId, id) {
		const statement =
			"UPDATE articles SET title = ?, content = ?, authorId = ? WHERE id = ?;";
		const [res] = await connect.execute(statement, [
			title,
			content,
			authorId,
			id,
		]);
		return res;
	}
	async deleteArticle(id) {
		const statement = `DELETE FROM articles WHERE id = ?`;
		const [res] = await connect.execute(statement, [id]);
		return res;
	}
	async getImg(id) {
		const statement = `SELECT * FROM image WHERE id = ?`;
		const [res] = await connect.execute(statement, [id]);
		return res;
	}

}

module.exports = new ArticlesService();
