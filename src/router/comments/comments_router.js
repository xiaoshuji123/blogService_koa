const KoaRouter = require("@koa/router");
const commentsController = require("../../controller/comments/comments_controller");

const commentRouter = new KoaRouter({ prefix: "/comment" });

commentRouter.post("/list", commentsController.list);
commentRouter.post("/createComment", commentsController.create);
commentRouter.post("/deleteComment", commentsController.delete);

module.exports = commentRouter;
