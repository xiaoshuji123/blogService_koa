const KoaRouter = require("@koa/router");
const UserController = require("../../controller/system/user_controller");
const { vertifyUser } = require("../../middleware/system/user_middleware");
// 创建路由
const userRouter = new KoaRouter({ prefix: "/user" });

userRouter.post("/createUser", vertifyUser, UserController.create);

module.exports = userRouter;
