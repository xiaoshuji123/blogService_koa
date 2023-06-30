const fs = require("fs");

/* 写了一个自动化工具，自动注册路由  */
function registerRouters(app) {
  // 递归的读取文件夹中所有的文件
  function readDirectory(path) {
    // 读取文件夹
    fs.readdir(path, { withFileTypes: true }, (err, files) => {
      files.forEach((file) => {
        if (file.isDirectory()) {
          //判断是否是文件夹
          readDirectory(`${path}/${file.name}`);
        } else {
          // 表示是文件
          if (file.name.endsWith("_router.js")) {
            const router = require(`${path}/${file.name}`);
            // 注册路由
            app.use(router.routes());
            app.use(router.allowedMethods());
          }
        }
      });
    });
  }
  readDirectory(__dirname);
}
module.exports = registerRouters;
