const pattern = /<p>(?:\s*)(?:<a(?:.*)>)?(?:\s*)(?:https?:)?(?:\/\/)?(?:w{3}\.)?(?:twitter\.com)\/([a-zA-Z0-9_]{1,15})?(?:\/(?:status)\/)(\d+)?(?:\S*)(?:\s*)(?:<\/a>)?(?:\s*)<\/p>/;

module.exports = function(str) {
	let [, user, id] = pattern.exec(str);
	return {
		userHandle: user,
		tweetId: id,
	};
};
