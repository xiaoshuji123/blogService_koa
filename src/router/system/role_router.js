const KoaRouter = require("@koa/router");
const RoleController = require("../../controller/system/role_controller");
// 创建路由
const roleRouter = new KoaRouter({ prefix: "/role" });

roleRouter.get("/", RoleController.list);

module.exports = roleRouter;
