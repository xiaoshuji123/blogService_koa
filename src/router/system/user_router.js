const KoaRouter = require("@koa/router");
const { create } = require("../../controller/system/user_controller");
// 创建路由
const userRouter = new KoaRouter({ prefix: "/user" });

userRouter.post("/createUser", create);

module.exports = userRouter;
