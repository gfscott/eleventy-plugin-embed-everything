/**
 * Regex for parsing Vimeo URLs
 *
 * Notable points:
 * The numbered capture groups are required for mimicking atomic groups
 * in Javascript. See: https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 *
 * 1. Arbitrary whitespace
 * 2. Arbitrary whitespace
 * 3. Vimeo domain, pathname, params, fragments.
 * 4. The video ID. Numeric ID maxes out at 20 digits. Why 20? It's the
 * 		max length of a 64-bit integer, which Vimeo will be unlikely to ever
 * 		reach.
 * 5. Privacy hash used by unlisted videos, if it's part of the pathname.
 * 		(Can also be a param, so check for ?h=abc123 separately). Hashes are likely
 * 		hex ([0-9a-f]), but hard to be sure, so allowing full alphanumeric just in case.
 * 6. Arbitrary whitespace
 * 7. Arbitrary whitespace
 */

module.exports = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:w{3}\.)??((?:vimeo\.com\/)(\d{1,20})\/?([a-zA-Z0-9]{1,20})?(?:[^\s<>]*))(?=(\s*))\6(?:<\/a>)??(?=(\s*))\7<\/p>/g
