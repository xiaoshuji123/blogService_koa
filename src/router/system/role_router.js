const KoaRouter = require("@koa/router");
// 创建路由
const roleRouter = new KoaRouter({ prefix: "/role" });

roleRouter.post("/");

module.exports = roleRouter;
