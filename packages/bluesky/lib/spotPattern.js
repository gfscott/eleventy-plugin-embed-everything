/**
 * Check if a string contains a Bluesky URL.
 * @param {string} str - The string to check
 * @returns {boolean} True if the string contains a Bluesky URL
 */
module.exports = function (str) {
	try {
		// Skip if inside code tag
		if (str.includes("<code>")) {
			return false;
		}

		// Clean URL and extract parts
		const cleanUrl = str.replace(/<[^>]+>/g, "").trim();

		// Extract URL from paragraph tags if present
		const urlMatch = cleanUrl.match(
			/(?:https?:)?(?:\/\/)??(?:bsky\.app|staging\.bsky\.app)\/profile\/([^/\s]+)\/post\/([a-zA-Z0-9]+)/,
		);

		if (!urlMatch) {
			return false;
		}

		// Validate post ID length (should be at least 10 characters)
		if (urlMatch[2].length < 10) {
			return false;
		}

		return true;
	} catch (e) {
		return false;
	}
};
