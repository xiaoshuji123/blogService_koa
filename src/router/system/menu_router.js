const KoaRouter = require("@koa/router");
// 创建路由
const menuRouter = new KoaRouter({ prefix: "/menu" });

menuRouter.post("/");

module.exports = menuRouter;
