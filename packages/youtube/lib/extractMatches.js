/**
 * Video ID is 4th item in array of matches.
 * [0]    = full matched string
 * [1, 2] = zero-backtrack arbitrary whitespace, requires capture for lookahead
 * [3]    = full YouTube url
 * [4]    = video ID
 * [5, 6] = zero-backtrack arbitrary whitespace, requires capture for lookahead
 */

const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2((?:https?:\/\/)??(?:w{3}\.)??(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)??([A-Za-z0-9-_]{11})(?:[^\s<>]*))(?=(\s*))\5(?:<\/a>)??(?=(\s*))\6<\/p>/;

module.exports = function(str) {
  const matchArray = str.match(pattern);
  return {
    id: matchArray[4],
    url: matchArray[3]
  }
}
