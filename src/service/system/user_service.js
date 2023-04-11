// 这里将数据库的统一配置进行了抽取
// 进行数据库的逻辑操作
const connect = require("../../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = "INSERT INTO `user` (name, password) VALUES (?, ?)";
    const [res] = await connect.execute(statement, [name, password]);
    return res;
  }
  async findUserByName(name) {
    const statement = "SELECT * FROM user WHERE name = ?";
    const [res] = await connect.execute(statement, [name]);
    return !!res.length;
  }
}

module.exports = new UserService();
