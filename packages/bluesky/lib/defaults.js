/**
 * Default configuration for Bluesky embeds
 *
 * embedDomain: The domain to use for embeds.
 * - Production: bsky.app
 * - Staging: staging.bsky.app
 * - Custom: Set to your own Bluesky-compatible instance
 *
 * Note: Custom domains must implement the Bluesky embed endpoint at /profile/:handle/post/:id/embed
 */
module.exports = {
	// Embed appearance
	cacheDuration: "60m",
	embedClass: "eleventy-plugin-embed-bluesky",
	// Bluesky configuration
	embedDomain: "bsky.app", // Default to production, can be overridden for staging or custom domains
};
