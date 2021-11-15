/**
 * Video ID is 4th item in array of matches.
 * [0]    = full matched string
 * [1, 2] = zero-backtrack arbitrary whitespace, requires capture for lookahead
 * [3]    = video ID
 * [4, 5] = zero-backtrack arbitrary whitespace, requires capture for lookahead
 */
const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)??(?:w{3}\.)??(?:vimeo\.com)\/(\d{1,20})(?:[^\s<>]*)(?=(\s*))\4(?:<\/a>)??(?=(\s*))\5<\/p>/;

module.exports = function(str) {
  return str.match(pattern)[3];
}