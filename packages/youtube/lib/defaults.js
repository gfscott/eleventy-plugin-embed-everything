/**
 * @typedef {Object} PluginOptions
 * @property {string} [allowAttrs] - Allowed attributes.
 * @property {boolean} [allowAutoplay] - Whether autoplay is allowed.
 * @property {boolean} [allowFullscreen] - Whether fullscreen is allowed.
 * @property {string} [cssWrapper] - Inline CSS for the wrapper.
 * @property {string} [cssIframe] - Inline CSS for the iframe.
 * @property {string} [embedClass] - The class for the embed.
 * @property {boolean} [lazy] - Whether lazy loading is enabled.
 * @property {boolean} [lite] - Whether lite mode is enabled.
 * @property {boolean} [modestBranding] - Whether modest branding is enabled.
 * @property {boolean} [noCookie] - Whether cookies are disabled.
 * @property {boolean} [recommendSelfOnly] - Whether to only recommend self videos.
 * @property {string} [title] - The default title for the embed iframe.
 * @property {Object} [titleOptions] - Title options.
 * @property {boolean} [titleOptions.download] - Whether to download the video title from YouTube.
 * @property {string} [titleOptions.cacheDuration] - How long to cache the video title.
 */
const defaults = {
  allowAttrs: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
  allowAutoplay: false,
  allowFullscreen: true,
  cssWrapper: 'position:relative;width:100%;padding-top: 56.25%;',
	cssIframe: 'position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;',
	embedClass: 'eleventy-plugin-youtube-embed',
  lazy: false,
  lite: false,
  noCookie: true,
  recommendSelfOnly: false,
  title: 'Embedded YouTube video',
  titleOptions: {
    download: false,
    cacheDuration: '5m',
  }
};

/**
 * @typedef {Object} Thumbnails
 * @property {string[]} validSizes - An array of valid sizes.
 * @property {string} defaultSize - The default size.
 * @property {string[]} validFormats - An array of valid formats.
 * @property {string} defaultFormat - The default format.
 */
const thumbnails = {
  validSizes: ["default", "hqdefault", "mqdefault", "sddefault", "maxresdefault"],
  defaultSize: "hqdefault",
  validFormats: ["jpg", "webp"],
  defaultFormat: "jpg",
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
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css'
  },
  js: {
    enabled: true,
    inline: false,
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js'
  },
  jsApi: false,
  responsive: false,
  thumbnailQuality: thumbnails.defaultSize,
  thumbnailFormat: thumbnails.defaultFormat,
};

module.exports.thumbnails = thumbnails;
module.exports.liteDefaults = liteDefaults;
module.exports.defaults = defaults;
