const KoaRouter= require("@koa/router");
const tagsController = require("../../controller/tags/tags_controller");
const tagsRouter = new KoaRouter({ prefix: '/tags'});

// 1.标签列表
tagsRouter.post("/", tagsController.list)

// 2.创建标签
tagsRouter.post("/createTag", tagsController.create)

// 3.编辑标签
tagsRouter.post("/editTag/:tagId", tagsController.edit)

// 4.删除标签
tagsRouter.post("/deleteTag/:tagId", tagsController.delete)

// 5.标签详情
tagsRouter.get("/:tagId", tagsController.detail)

module.exports = tagsRouter;
