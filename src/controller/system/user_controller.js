const { create } = require("../../service/system/user_service");

class UserController {
  async create(ctx, next) {
    const users = ctx.request.body;
    const res = await create(users);
    ctx.body = {
      code: 0,
      data: "用户注册成功",
    };
  }
}

module.exports = new UserController();
