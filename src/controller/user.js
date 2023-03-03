const userService = require("../service/user")
class UserController {
  create(ctx, next) {
    // 这里会写很多逻辑
    // 1.读取传递过来的参数
    // 2.操作数据库，
    // 3.将数据库的信息返回给客户端
    userService.create();
    
    // 这里将操作数据库的地方抽取单独处理
    
    ctx.body = "dddd"
  }
}

module.exports = new UserController()