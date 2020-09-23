const thisPattern = /<p>(?:\s*)(?:<a(?:.*)>)?(?:\s*)(?:https?)?(?::?\/\/)?(?:open\.|www\.)?(?:spotify\.com)\/(?:user)?\/?(?:[0-9a-zA-Z]+)?\/?(playlist|track|album|artist|episode)\/([0-9a-zA-Z]{22})(?:\S*)(?:\s*)(?:<\/a>)?(?:\s*)<\/p>/;

module.exports = function(str) {
	// empty [0] value: full pattern match is returned as the first array item, but it's not used
	let [, type, id] = thisPattern.exec(str);
	return {
		type,
		id,
	};
};
