/**
 * Regular expression to extract the Instagram media ID and type from the URL.
 *
 * Why out[3] and out[4]?
 * -----------------------
 * `\s*`, necessary to accommodate arbitrary whitespace, is
 * vulnerable to catastrophic backtracking that can lead to
 * regular expression denial-of-service. JS/Node doesn’t support
 * RegEx atomic groups like other languages do. The workaround
 * requires capturing groups for whitespace with positive
 * lookaheads:
 *
 * https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 *
 * Until we formally drop support for older Node versions and can start using
 * named capture groups, we have to count matches in the returned
 * RegEx array.
 *
 * out[0]           = full match
 * out[1], out[2]   = optional whitespace characters
 * out[3]           = Instagram media type (p|reel|tv)
 * out[4]           = Instagram media ID
 * out[5], out[6]   = optional whitespace characters
 */

const pattern =
	/<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)?(?:w{3}\.)?(?:instagram\.com)\/(p|reel|tv)\/([0-9a-zA-Z_-]+)(?:\/.*)?(?=(\s*))\5(?:<\/a>)?(?=(\s*))\6<\/p>/;

module.exports = function (str) {
	let out = pattern.exec(str);
	if (!out) return null;

	return {
		type: out[3], // p, reel, or tv
		id: out[4], // Instagram media ID
	};
};
