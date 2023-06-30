const { findUserByName } = require("../../service/login/login_service");
const sha256Password = require("../../utils/sha_password");

async function vertifyLogin(ctx, next) {
  const { name, password } = ctx.request.body;
  // 1.判断一下有无账号，密码
  if (!name || !password) {
    ctx.app.emit("error", -1000, ctx);
    return;
  }
  // 2.判断一下账号是否在数据库存在
  const [user] = await findUserByName(name);
  if (!user) {
    ctx.app.emit("error", -1001, ctx);
    return;
  }
  // 3.密码是否正确
  console.log(0)
  if (user.password !== sha256Password(password)) {
    ctx.app.emit("error", -1003, ctx);
    return;
  }
  // 保存user，后续使用
  ctx.user = user;
  await next();
}

module.exports = {
  vertifyLogin,
};
