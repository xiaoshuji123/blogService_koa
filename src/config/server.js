const dotenv = require("dotenv")
dotenv.config();

// 这里可以利用dotenv直接从.env文件中获取数据
module.exports = {
  SERVER_PORT,
	SERVER_HOST
} = process.env
