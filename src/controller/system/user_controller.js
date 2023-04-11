const userService = require("../../service/user");
class UserController {
  create(ctx, next) {
    console.log(1);
    console.log(ctx);
  }
}

module.exports = new UserController();
