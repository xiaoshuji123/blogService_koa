const KoaRouter = require("@koa/router");
const UserController = require("../../controller/system/user_controller");
const {
	vertifyUser,
	vertifyRole,
	handelPassword,
} = require("../../middleware/system/user_middleware");
// 创建路由
const userRouter = new KoaRouter({ prefix: "/user" });

// 创建用户
userRouter.post(
	"/createUser",
	vertifyUser,
	vertifyRole,
	handelPassword,
	UserController.create
);

// 用户列表
userRouter.post("/list", UserController.list);

// 修改用户
userRouter.post('/editUser', vertifyRole, UserController.edit);

// 删除用户
userRouter.post('/deleteUser', UserController.delete)

// 用户详情
userRouter.get('/:userId', UserController.detail)


// 注册用户 ---暂时还没想好，这个接口先不用，不确定在登录页注册的话给予用户的角色是啥
userRouter.post(
	"/gisterUser",
	vertifyUser,
	handelPassword,
	UserController.create
);

module.exports = userRouter;
