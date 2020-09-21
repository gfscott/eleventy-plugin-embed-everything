const pattern = /<p>\s*(?:<a.*>)?\s*(?:https?)?(?::?\/\/)?(?:open\.|www\.)?spotify\.com\/(?:user)?\/?(?:[0-9a-zA-Z]+)?\/?(?:playlist|track|album|artist|episode)\/[0-9a-zA-Z]{22}\S*\s*(?:<\/a>)?\s*<\/p>/g;

module.exports = function(str) {
	return str.match(pattern);
};
