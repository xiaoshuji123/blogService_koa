const redis = require("redis");
const client = redis.createClient();
function setCache(key, value) {
	client.set(key, value);
}
function getCache(key) {
	return new Promise((resolve, reject) => {
		client.get(key, (err, value) => {
			if (err) {
				reject(err);
			} else {
				resolve(value);
			}
		});
	});
}
module.exports = {
	setCache,
	getCache,
};
