const { findUserByName, create } = require("../../service/system/user_service");
const sha256Password = require("../../utils/sha_password");

async function vertifyUser(ctx, next) {
  const { name, password } = ctx.request.body;
  // 1.判断用户名或者密码是否为空
  if (!name || !password) {
    ctx.app.emit("error", -1000, ctx);
    return;
  }

  // 2.判断name是否在数据库中已经存在
  const res = await findUserByName(name);
  if (res) {
    // 代表数据库已存在
    ctx.app.emit("error", -1001, ctx);
    return;
  }
  await next();
}

/* sha256加密密码 */
async function handelPassword(ctx, next) {
  const { password } = ctx.request.body;
  ctx.request.body.password = sha256Password(password);
  await next();
}
module.exports = {
  vertifyUser,
  handelPassword,
};
