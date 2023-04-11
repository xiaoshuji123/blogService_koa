const KoaRouter = require("@koa/router");
// 创建路由
const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/");

module.exports = loginRouter;
