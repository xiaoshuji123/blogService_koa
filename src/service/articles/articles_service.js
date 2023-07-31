const { connect } = require("../../app/database");

class ArticlesService {
	//平常get请求是?offset=0&limit=20这种常见的方式，它是字符串
	//因为我采用的是post请求，传递过来的参数是数字类型，所以需要转换成字符串类型
	// const [res] = await connect.execute(statement, [offset + '', limit + '']);
	async list(offset, limit, title) {
		try {
			const statement = `
			SELECT
				a.id id , a.title title, a.content content, a.createTime createTime, a.updateTime updateTime, a.authorId authorId, u.name authorName, a.coverUrl coverUrl,
				CASE
					WHEN COUNT(c.id) > 0 THEN JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'articleId', c.article_id, 'content', c.content, 'createTime', c.create_time, 'parentId', c.parent_id, 'userName', u.name ))
					ELSE JSON_ARRAY() END as comments
			FROM articles a
			LEFT JOIN user u ON u.id = a.authorId
			LEFT JOIN comment c ON c.article_id = a.id
			WHERE a.title LIKE ?
			GROUP BY a.id
			ORDER BY createTime DESC LIMIT ?, ?`;
			const [res] = await connect.execute(statement, [
				`%${title}%`,
				offset,
				limit,
			]);
			return res;
		} catch (error) {
			console.log(error);
			// WHERE IFNULL(a.title, '') LIKE ?
			// 	AND (a.title IS NOT NULL OR a.title != '')
		}
	}
	async createArticle(connection, title, content, coverUrl, authorId) {
		const statement =
			"INSERT INTO articles (title, content, coverUrl, authorId) VALUES (?, ?, ?, ?);";
		const [res] = await connection.execute(statement, [
			title,
			content,
			coverUrl,
			authorId,
		]);
		return res;
	}
	async editArticle(connection, title, content, authorId, coverUrl, id) {
		try {
			const statement =
				"UPDATE articles SET title = ?, content = ?, authorId = ?, coverUrl = ? WHERE id = ?;";
			const [res] = await connection.execute(statement, [
				title,
				content,
				authorId,
				coverUrl,
				id,
			]);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async deleteArticle(id) {
		const statement = `DELETE FROM articles WHERE id = ?`;
		const [res] = await connect.execute(statement, [id]);
		return res;
	}

	async articleDetail(articleId) {
		const statement = `SELECT * FROM articles WHERE id = ?`;
		const [res] = await connect.execute(statement, [articleId]);
		return res[0];
	}

	async createTagById(connection, articleId, tagId) {
		try {
			await this.tagHandel(connection, articleId, tagId);
			const statement = `INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)`;
			const [res] = await connection.execute(statement, [articleId, tagId]);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async editTagById(connection, articleId, tagId) {
		try {
			// 1.检查文章是否存在，不存在返回错误信息
			// 2.检查新的标签是否存在。如果新的标签不存在，应该返回错误信息。
			// 3.检查新的标签是否和旧的标签相同。如果相同，不需要执行任何操作。
			// 4.删除旧的标签。
			// 5.添加新的标签。
			const [article] = await connection.execute(`SELECT * FROM articles WHERE id = ?`, [articleId]);
			console.log(article)
			if (!article[0]) {
				const error = new Error("文章不存在");
				error.statusCode = 404;
				throw error;
			}
			await this.tagHandel(connection, articleId, tagId);
			const statement = `INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)`;
			const [res] = await connection.execute(statement, [articleId, tagId]);
			return res;
		} catch (error) {
			throw error;
		}
	}
	// 检查同一篇文章下是否有重复标签
	async hasDuplicateTag(connection, articleId, tagId) {
		const statement = `SELECT * FROM article_tags WHERE article_id = ? AND tag_id = ?`;
		const [res] = await connection.execute(statement, [articleId, tagId]);
		return !!res[0];
	}

	async deleteTagByarticleId(articleId) {
		const statement = `DELETE FROM article_tags WHERE article_id = ?`;
		const [res] = await connect.execute(statement, [articleId]);
		return res;

		try {
			// 检查文章是否存在
			const [articleId] = await connect.execute(
				"SELECT * FROM article_tags WHERE article_id = ?",
				[articleId]
			);
			if (articleId.length === 0) {
				const error = new Error("文章不存在");
				error.statusCode = 404;
				throw error;
			}
			// 删除标签
			const [result] = await connect.execute(
				"DELETE FROM articles WHERE id = ?",
				[articleId]
			);
			return result.affectedRows;
		} catch (error) {
			throw error;
		}
	}

	async getImg(filename) {
		try {
			const statement = `SELECT * FROM image WHERE filename = ?`;
			const [res] = await connect.execute(statement, [filename]);
			return res.pop();
		} catch (error) {
			throw error;
		}
	}
	async tagHandel(connection, articleId, tagId) {
		// 1.检查文章是否存在，不存在返回错误信息
		// 2.检查新的标签是否存在。如果新的标签不存在，应该返回错误信息。
		// 3.检查标签是否在一篇文章中重复。
		try {
			const [tag] = await connection.execute(
				`SELECT * FROM tags WHERE id = ?`,
				[tagId]
			);
			if (!tag[0]) {
				const error = new Error("标签不存在");
				error.statusCode = 404;
				throw error;
			}
			const data = await this.hasDuplicateTag(connection, articleId, tagId);
			if (data) {
				const error = new Error("同一篇文章不能有相同的标签");
				error.statusCode = 404;
				throw error;
			}
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new ArticlesService();
