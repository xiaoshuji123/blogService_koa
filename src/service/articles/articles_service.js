const connect = require("../../app/database");

class ArticlesService {
  async createArticle(title, content, authorId) {
    const statement = "INSERT INTO articles (title, content, authorId) VALUES (?, ?, ?);";
    const [res] = await connect.execute(statement, [title, content, authorId]);
    return res;
  }
	async editArticle(title, content, authorId, id) {
    const statement = "UPDATE articles SET title = ?, content = ?, authorId = ? WHERE id = ?;";
    const [res] = await connect.execute(statement, [title, content, authorId, id]);
    return res;
  }
}

module.exports = new ArticlesService();
