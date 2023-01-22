const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:open\.|www\.)??spotify\.com\/(?:user)??\/??(?:[0-9a-zA-Z]+)??\/??(playlist|track|album|artist|episode)\/([0-9a-zA-Z]{22})(?:[^\s<>]*)(?=(\s*))\5(?:<\/a>)??(?=(\s*))\6<\/p>/;

module.exports = function(str) {
	let match = str.match(pattern);
	let type = match[3];
	let id = match[4];
	return {
		type,
		id,
	};
};
