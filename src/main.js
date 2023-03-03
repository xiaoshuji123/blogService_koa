const app = require("./app/index")
const { SERVER_PORT } = require("./config/server");

// 2.开启服务，监听端口
app.listen(SERVER_PORT, () => {
  console.log("koa服务器已经开启了")
})