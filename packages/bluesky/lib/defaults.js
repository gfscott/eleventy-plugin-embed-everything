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
	embedClass: "eleventy-plugin-embed-bluesky",
	containerCss: "position: relative; width: 100%; padding-bottom: 0;",
	iframeCss: "border: 0; position: relative; width: 100%;",
	iframeWidth: "550",
	iframeHeight: "300",
	iframeFrameborder: "0",
	iframeScrolling: "no",
	allowFullscreen: true,

	// Bluesky configuration
	embedDomain: "bsky.app", // Default to production, can be overridden for staging or custom domains
};
