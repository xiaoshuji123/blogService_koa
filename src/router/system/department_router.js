const KoaRouter = require("@koa/router");
// 创建路由
const departMentRouter = new KoaRouter({ prefix: "/department" });

departMentRouter.post("/");

module.exports = departMentRouter;
