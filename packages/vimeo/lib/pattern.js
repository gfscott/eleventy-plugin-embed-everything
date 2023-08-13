/**
 * Regex for parsing Vimeo URLs
 *
 * Notable points:
 * The numbered capture groups are required for mimicking atomic groups
 * in Javascript. See: https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 *
 * 1. Arbitrary whitespace
 * 2. Arbitrary whitespace
 * 3. The video ID. Numeric ID maxes out at 20 digits. Why 20? It's the
 * 		max length of a 64-bit integer, which Vimeo will be unlikely to ever
 * 		reach. Discards everything after the numeric ID.
 * 4. Arbitrary whitespace
 * 5. Arbitrary whitespace
 */

module.exports = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:w{3}\.)??(?:vimeo\.com\/)(\d{1,20})(?:[^\s<>]*)(?=(\s*))\4(?:<\/a>)??(?=(\s*))\5<\/p>/g
