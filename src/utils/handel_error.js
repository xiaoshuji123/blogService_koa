const app = require("../app");
/* 这里可以集中处理错误 */
app.on("error", (err, ctx) => {
  const code = err;
  let message = "";
  switch (err) {
    case -1000:
      message = "账号或者密码不能为空";
      break;
    case -1001:
      message = "该用户名已经被占用了";
      break;
    case -1002:
      message = "该用户名不存在";
      break;
    case -1003:
      message = "密码不正确，请检查密码";
      break;
    case -1004:
      message = "token不通过, 请重新登录";
      break;
    case -1005:
      message = "没有权限操作";
      break;
    case -1006:
      message = "不是该动态的作者，没有权限操作";
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
