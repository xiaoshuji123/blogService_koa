const KoaRouter = require("@koa/router");
const articlesController = require("../../controller/articles/articles_controller");

const articlesRouter = new KoaRouter({prefix: '/article'});

// 文章列表
articlesRouter.get('/list', articlesController.list);

// 创建文章
articlesRouter.post('/createArticle', articlesController.create);

// 修改文章
articlesRouter.post('/editArticle', articlesController.edit);

// 删除文章
articlesRouter.post('/deleteArticle', articlesController.delete)

// 文章详情
articlesRouter.get('/:articleId', articlesController.detail)


articlesRouter.get('/img/:filename', articlesController.getImg)

module.exports = articlesRouter
