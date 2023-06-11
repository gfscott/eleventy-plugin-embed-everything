/**
 * Regex for parsing Spotify URLs
 * 
 * Notable points:
 * 
 * - The numbered capture groups are required for mimicking 
 *   atomic groups in Javascript. 
 *   See: https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 * - Arbitrary whitespace is allowed before and after the URL.
 * - The URL can optionally be wrapped in an anchor tag.
 * - The URL must be a Spotify URL.
 * - The URL must be a playlist, track, album, artist, episode, or show.
 * - The URL can optionally include a username. This is only relevant for playlist URLs.
 * - The media ID must be 22 characters long.
 * - The user/{username} portion of the URL is ignored. It's no longer used in embed URLs
 *   but retained for backward compatibility.
 * 
 * The object returned by this regex is an array, with the following structure:
 * - [0]: The entire match
 * - [1]: Arbitrary whitespace
 * - [2]: Arbitrary whitespace
 * - [3]: Media type
 * - [4]: Media ID
 * - [5]: Arbitrary whitespace
 * - [6]: Arbitrary whitespace
 */

module.exports = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:open\.|www\.)??spotify\.com\/(?:user)??\/??(?:[0-9a-zA-Z]+)??\/??(playlist|track|album|artist|episode|show)\/([0-9a-zA-Z]{22})(?:[^\s<>]*)(?=(\s*))\5(?:<\/a>)??(?=(\s*))\6<\/p>/g;