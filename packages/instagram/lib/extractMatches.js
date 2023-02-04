/**
 * Regular expression to extract the Instagram ID from the URL.
 * 
 * Why out[3]?
 * -----------
 * `\s*`, necessary to accomodate arbitrary whitespace, is 
 * vulnerable to catastrophic backtracking that can lead to 
 * regular expression denial-of-service. JS/Node doesn’t support
 * RegEx atomic groups like other languages do. The workaround
 * requires capturing groups for whitespace with positive
 * lookaheads:
 * 
 * https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 * 
 * Until we formally drop support for Node 8 and can start using
 * named capture groups, we have to count matches in the returned
 * RegEx array.
 *  
 * out[0]           = full match
 * out[1], out[2]   = optional whitespace characters 
 * out[3]           = Instagram media ID
 * out[4], out[5]   = optional whitespace characters
 */

const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)?(?:w{3}\.)?(?:instagram\.com)\/(?:p\/)?([0-9a-zA-Z-_]{11})(?:\S*)(?=(\s*))\4(?:<\/a>)?(?=(\s*))\5<\/p>/;
module.exports = function(str) {
  let out = pattern.exec(str);
  return out[3];
}