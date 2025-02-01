/**
 * Extract handle and post ID from a matched Bluesky URL.
 * @param {string} url - The matched URL
 * @returns {Object|null} Object containing handle and postId, or null if invalid
 */
module.exports = function (url) {
	try {
		// Skip if inside code tag
		if (url.includes("<code>")) {
			return null;
		}

		// Clean URL and extract parts
		const cleanUrl = url.replace(/<[^>]+>/g, "").trim();

		// Extract URL from paragraph tags if present
		const urlMatch = cleanUrl.match(
			/(?:https?:)?(?:\/\/)??(?:bsky\.app|staging\.bsky\.app)\/profile\/([^/\s]+)\/post\/([a-zA-Z0-9]+)/,
		);

		if (!urlMatch) {
			return null;
		}

		// Validate post ID length (should be at least 10 characters)
		if (urlMatch[2].length < 10) {
			return null;
		}

		return {
			handle: urlMatch[1],
			postId: urlMatch[2],
		};
	} catch (e) {
		return null;
	}
};
