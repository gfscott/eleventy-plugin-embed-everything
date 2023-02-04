const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:w{3}\.)??(?:twitter\.com)\/([a-zA-Z0-9_]{1,15})?(?:\/(?:status)\/)(\d+)?(?:[^\s<>]*)(?=(\s*))\5(?:<\/a>)??(?=(\s*))\6<\/p>/g;

module.exports = function(str) {
return str.match(pattern);
};
