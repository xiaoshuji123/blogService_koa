const KoaRouter = require("@koa/router");
const { handelImage } = require("../../middleware/upload/upload.middleware");
const uploadController = require("../../controller/upload/upload_controller");

const uploadRouter = new KoaRouter({ prefix: "/upload" });

uploadRouter.post("/", handelImage, uploadController.upload);

module.exports = uploadRouter;
