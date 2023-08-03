const { connect } = require("../../app/database");

class RoleService {
	async list() {
		try {
			const statement = `SELECT * FROM role`;
			const [res] = await connect.execute(statement);
			return res;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new RoleService();
