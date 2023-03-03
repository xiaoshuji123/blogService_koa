// 对app进行了抽取,因为到时候main.js里需要写大量的路由，中间件相关的代码，会造成main.js文件过大，不宜维护
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/user_router");

// 1.创建服务器
const app = new Koa();

// 使用第三方中间件解析body数据
app.use(bodyParser());

// 让路由生效
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app