/**
 * Regex for parsing Bluesky URLs
 *
 * Notable points:
 * - Matches both bsky.app and staging.bsky.app domains
 * - Post IDs are alphanumeric and at least 10 characters long
 * - Profile IDs follow the handle format (including DID and custom domains)
 * - Supports URLs with and without protocol
 * - Handles query parameters
 * - Handles trailing slashes
 *
 * The numbered capture groups are:
 * 1. The handle
 * 2. The post ID
 */

module.exports = /<p>\s*(?:<a [^>]*?>)?\s*(?:https?:)?(?:\/\/)?(?:w{3}\.)?(?:staging\.)?bsky\.app\/profile\/([^\/\s]+)\/post\/([a-zA-Z0-9]{10,})(?:[^<>\s]*)?\s*(?:<\/a>)?\s*<\/p>/;
