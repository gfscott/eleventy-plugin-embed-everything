/**
 * Regex details:
 * - (?=(\s*))\1 -- Mimics atomic groups in JavaScript RegEx using positive lookaheads.
 * @see https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 * 
 * - (\d{1,20}). Maximum 64-bit integer is 20 digits long. Capping the group length is more efficient than `\d*`
 * @see https://www.wolframalpha.com/input/?i=2%5E64
 */
const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)??(?:w{3}\.)??(?:vimeo\.com)\/(?:\d{1,20})(?:[^\s<>]*)(?=(\s*))\3(?:<\/a>)??(?=(\s*))\4<\/p>/g;

module.exports = function(str) {
  return str.match(pattern);
}