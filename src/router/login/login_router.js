const KoaRouter = require("@koa/router");
const LoginController = require("../../controller/login/login_controller");
const { vertifyLogin } = require("../../middleware/login/login_middleware");
// 创建路由
const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", vertifyLogin, LoginController.login);

module.exports = loginRouter;
