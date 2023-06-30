const KoaRouter = require("@koa/router");
const { personalized_newsong, lyric } = require("NeteaseCloudMusicApi");

const musicRouter = new KoaRouter({ prefix: "/music" });

// 获取推荐新歌曲
musicRouter.get("/personalized", async (ctx, next) => {
	try {
		const res = await personalized_newsong();
		if (res.status === 200) {
			ctx.body = res.body;
		}
	} catch (error) {
		ctx.body = error;
	}
});

// 获取歌词
musicRouter.get("/lyric", async (ctx, next) => {
	try {
		const { id } = ctx.query;
		const res = await lyric({ id });
		if (res.status === 200) {
			ctx.body = res.body;
		}
	} catch (error) {
		ctx.body = error;
	}
});

module.exports = musicRouter;
