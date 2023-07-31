const { connect }= require("../../app/database");

class LoginService {
  async findUserByName(name) {
    const statement = "SELECT * FROM user WHERE name = ?";
    const [res] = await connect.execute(statement, [name]);
    return res;
  }
}

module.exports = new LoginService();
