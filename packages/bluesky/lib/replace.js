module.exports = function(match, config) {
	try {
		if (!match || !match[0]) {
			return "";
		}

		// Extract handle and post ID from the match array
		// match[1] is the handle
		// match[2] is the post ID
		const handle = match[1];
		const postId = match[2];

		if (!handle || !postId) {
			return match[0];
		}

		// Create the embed URL using Bluesky's embed endpoint
		const embedDomain = match[0].includes("staging.bsky.app") ? "staging.bsky.app" : config.embedDomain;
		const embedUrl = `https://${embedDomain}/profile/${handle}/post/${postId}/embed`;

		// Build the embed HTML
		let embed = `<div class="${config.embedClass}" style="${config.containerCss}">`;
		embed += `<iframe src="${embedUrl}" style="${config.iframeCss}" width="${config.iframeWidth}" height="${config.iframeHeight}" frameborder="${config.iframeFrameborder}" scrolling="${config.iframeScrolling}" ${config.allowFullscreen ? "allowfullscreen" : ""}></iframe>`;
		embed += "</div>";

		return embed;
	} catch (error) {
		console.warn("Error creating Bluesky embed:", error);
		return match[0] || "";
	}
};
