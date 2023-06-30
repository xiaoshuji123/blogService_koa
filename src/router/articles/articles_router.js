const KoaRouter = require("@koa/router");
const articlesController = require("../../controller/articles/articles_controller");

const articlesRouter = new KoaRouter({prefix: '/article'});

// 创建文章
articlesRouter.post('/createArticle', articlesController.create);

// 修改文章
articlesRouter.post('/editArticle', articlesController.edit)
module.exports = articlesRouter
