module.exports = {
  // CSS class for the embed wrapper
  embedClass: "eleventy-plugin-embed-bluesky",

  // Default width for embeds (matches Bluesky's default)
  width: 550,

  // Cache duration for oEmbed responses
  cacheDuration: "1d",

  // oEmbed endpoint
  oEmbedEndpoint: "https://bsky.app/oembed",

  // Whether to cache oEmbed responses
  cacheResponses: true,

  // Maximum embeds per page (0 for unlimited)
  maxEmbeds: 0,

  // Domain to use for embeds
  embedDomain: "bsky.app",

  // Whether to add noscript fallback
  addNoscript: true,
};
