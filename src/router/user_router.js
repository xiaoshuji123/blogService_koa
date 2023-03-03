const KoaRouter = require("@koa/router");
const userController = require("../controller/user")

// 创建路由
const userRouter = new KoaRouter({ prefix: "/user" });
// 注册路由中间件
// userRouter.get('/', (ctx, next) => {
//   // 这里会写很多逻辑
//   // 1.读取传递过来的参数
//   // 2.操作数据库，
//   // 3.将数据库的信息返回给客户端

//   // 如果在这里处理这些逻辑的话会造成这个文件很大，因为还有很多的路由中间件需要匹配
//   // 所以将这里的操作单独在其他文件中处理，比如在controller中
// })

userRouter.get("/", userController.create)

module.exports = userRouter

