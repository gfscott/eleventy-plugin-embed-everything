/**
 * @typedef {Object} PluginOptions
 * @property {string} [allowAttrs] - Allowed attributes.
 * @property {boolean} [allowAutoplay] - Whether autoplay is allowed.
 * @property {boolean} [allowFullscreen] - Whether fullscreen is allowed.
 * @property {string} [embedClass] - The class for the embed.
 * @property {boolean} [lazy] - Whether lazy loading is enabled.
 * @property {boolean} [lite] - Whether lite mode is enabled.
 * @property {boolean} [modestBranding] - Whether modest branding is enabled.
 * @property {boolean} [noCookie] - Whether cookies are disabled.
 * @property {boolean} [recommendSelfOnly] - Whether to only recommend self videos.
 */
const defaults = {
  allowAttrs: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  allowAutoplay: false,
  allowFullscreen: true,
  embedClass: 'eleventy-plugin-youtube-embed',
  lazy: false,
  lite: false,
  modestBranding: false,
  noCookie: true,
  recommendSelfOnly: false,
};

/**
 * @typedef {Object} Thumbnails
 * @property {string[]} validSizes - An array of valid sizes.
 * @property {string} defaultSize - The default size.
 */
const thumbnails = {
  validSizes: ["default", "hqdefault", "mqdefault", "sddefault", "maxresdefault"],
  defaultSize: "hqdefault"
}

/**
 * @typedef {Object} LiteDefaults
 * @property {Object} [css] - CSS settings.
 * @property {boolean} [css.enabled] - Whether CSS is enabled.
 * @property {boolean} [css.inline] - Whether CSS is inline.
 * @property {string} [css.path] - The path to the CSS file.
 * @property {Object} [js] - JS settings.
 * @property {boolean} [js.enabled] - Whether JS is enabled.
 * @property {boolean} [js.inline] - Whether JS is inline.
 * @property {string} [js.path] - The path to the JS file.
 * @property {boolean} [responsive] - Whether the layout is responsive.
 * @property {string} [thumbnailQuality] - The quality of the thumbnail.
 */
const liteDefaults = {
  css: {
    enabled: true,
    inline: false,
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css'
  },
  js: {
    enabled: true,
    inline: false,
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js'
  },
  responsive: false,
  thumbnailQuality: thumbnails.defaultSize,
};
  
module.exports.thumbnails = thumbnails;
module.exports.liteDefaults = liteDefaults;
module.exports.defaults = defaults;
