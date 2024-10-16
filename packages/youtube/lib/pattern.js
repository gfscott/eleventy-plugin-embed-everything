/**
 * Regex for parsing YouTube URLs
 * 
 * Notable points:
 * 
 * - We omit capturing the protocol because we use the standard URL API interface
 * to parse the URL, and it fails if the protocol is not included. It’s more
 * reliable to *not* capture the protocol here, and prepend it later.
 * - The pattern accepts youtube.com and youtu.be URLs.
 * - The pattern accepts both the `watch?v=` and `embed/` paths.
 * - These decisions mean that the pattern can accept URLs that are not, in fact,
 * valid YouTube URLs. But the goal is to interpret the user’s intent — not
 * to insist on valid URL structures in messy user input.
 * 
 * The numbered capture groups are required for mimicking atomic groups
 * in Javascript. See: https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 * 
 * 1. Arbitrary whitespace
 * 2. Arbitrary whitespace
 * 3. The YouTube URL, without its protocol.
 * 4. The YouTube video ID
 * 5. Arbitrary whitespace
 * 6. Arbitrary whitespace 
 */

module.exports = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)??((?:w{3}\.)??(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|playlist\?list=)??([A-Za-z0-9-_]{11})(?:[^\s<>]*))(?=(\s*))\5(?:<\/a>)??(?=(\s*))\6<\/p>/g;