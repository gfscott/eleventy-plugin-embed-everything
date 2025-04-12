const merge = require('deepmerge');
const downloadAndCache = require('@11ty/eleventy-fetch');
const { thumbnails, liteDefaults } = require('./defaults.js');
/**
 * @typedef {import('./defaults.js').PluginOptions} PluginOptions
 * @typedef {import('./defaults.js').LiteDefaults} LiteDefaults
 */


/**
 * Create the embed code for a YouTube video
 * @param {RegExpMatchArray} match - Array of matches from the RegExp
 * @param {PluginOptions} config - Object of user-configurable options
 * @param {number} index - Index of the current match in the input string
 * @returns {string} - The embed code for the YouTube video
 */
module.exports = function(match, config, index) {
  [
    ,       // Full match
    ,       // Whitespace
    ,       // Whitespace
    __url,  // YouTube URL without protocol
    __id,   // YouTube video ID; TODO remove this and refactor regex
    ,       // Whitespace
    ,       // Whitespace
  ] = match;

  // 1. The regex deliberately doesn't capture the protocol, so that
  //    we can manually guarantee it will be present; otherwise an
  //    invalid URL will error when passed to the URL constructor.
  // 2. The URL constructor doesn't correct escaped ampersands, so we
  //    do that ourselves.
  const url = __removeEscapedAmpersands(`https://${__url}`);

  return config.lite
    ? liteEmbed(url, config, index)
    : defaultEmbed(url, config);
}


/**
 * Default embed code generator
 * @param {string} url - YouTube URL
 * @param {PluginOptions} options - User-configured options
 * @returns {string} - The embed code for the YouTube video
 */
async function defaultEmbed(url, options){
  const {v: id, list: playlist} = __getParamsFromUrl(url);
  const title = await __constructTitle(id, options);
  const embedSrc = __constructEmbedSrc(url, options);

  let out = `<div id="${id ?? playlist}" class="${options.embedClass}" `;
  out += `style="${options.cssWrapper}">`;
  out += `<iframe style="${options.cssIframe}"`;
  out += ` width="100%" height="100%" frameborder="0" title="${title}"`;
  out += ` src="${embedSrc}"`;
  out += ` allow="${options.allowAttrs}"`;
  out += `${options.allowFullscreen ? ' allowfullscreen' : ''}`;
  out += `${options.lazy ? ' loading="lazy"' : ''}`;
  out += '></iframe></div>';
  return out;
}
/**
 * Lite embed code generator
 * @param {string} url - YouTube URL
 * @param {PluginOptions} options - Object with user-configurable options
 * @param {number} index - Index of the current match in the input string
 * @returns {string} - The lite-mode embed code for the YouTube video
 */
async function liteEmbed(url, options, index) {
  const {v: id, list: playlist, start, t} = __getParamsFromUrl(url);

	// Lite mode doesn't support playlists, so if there's no
	// video ID, bail out and just return the plain URL.
	if (!id) {
		console.error(`Lite mode doesn't support YouTube playlists. Skipping ${url}`);
		return `<p>${url}</p>`;
	}

  // override start time if it's set in the URL
  if (start || t) options.startTime = parseInt(start ?? t);

  const liteOpt = liteConfig(options);
        liteOpt.thumbnailQuality = validateThumbnailSize(liteOpt.thumbnailQuality);
        liteOpt.thumbnailFormat = validateThumbnailFormat(liteOpt.thumbnailFormat);
  const params = stringifyUrlParams(options);

  const thumbnailUrl = () => {
    const fileTypePath = liteOpt.thumbnailFormat === 'webp' ? 'vi_webp' : 'vi';
    const fileName = `${liteOpt.thumbnailQuality}.${liteOpt.thumbnailFormat}`;
    return `https://i.ytimg.com/${fileTypePath}/${id ?? playlist}/${fileName}`;
  }


	let title = undefined;
	/**
	 * In Lite mode, the title is overlaid on the thumbnail.
	 * It's only worth showing it if it's the actual name of the video,
	 * So we only fetch it if the user has configured the plugin to download
	 * the actual title from YouTube via oEmbed.
	 */
	if ( options.titleOptions.download ) {
		const oembedTitle = await __getYouTubeTitleViaOembed(id, options);
		// If fetching oEmbed fails for any reason, it falls back to the configured default title.
		// So only set the title if it's different from the default.
		if ( oembedTitle !== options.title) {
			title =  ` title="${oembedTitle}"`;
		}
	}

  // Access the file system to read the lite embed CSS and JS
  const fs = require('fs');
  const path = require('path');
  const isInstalled = __dirname.includes('node_modules');
  const basePath = isInstalled ? path.resolve(__dirname, '../../') : path.resolve(__dirname, '../node_modules/');
  const liteCssFilePath = path.join(basePath, 'lite-youtube-embed/src/lite-yt-embed.css');
  const liteJsFilePath = path.join(basePath, 'lite-youtube-embed/src/lite-yt-embed.js');
  const inlineCss = fs.readFileSync(liteCssFilePath, 'utf-8');
  const inlineJs = fs.readFileSync(liteJsFilePath, 'utf-8');

  // Build the lite embed code
  let out = '';
  if ( index === 0 && liteOpt.css.enabled) {
    out += liteOpt.css.inline ? `<style>${inlineCss}</style>\n` : `<link rel="stylesheet" href="${liteOpt.css.path}">\n`;
  }
  if ( index === 0 && liteOpt.js.enabled) {
    out += liteOpt.js.inline ? `<script>${inlineJs}</script>\n` : `<script defer="defer" src="${liteOpt.js.path}"></script>\n`;
  }
  out += index === 0 && liteOpt.responsive ? `<style>.${options.embedClass} lite-youtube {max-width:100%}</style>\n` : '';

  out += `<div id="${id ?? playlist}" class="${options.embedClass}">`;
  out += `<lite-youtube videoid="${id ?? playlist}" style="background-image: url('${thumbnailUrl()}');"${params ? ` params="${params}"` : ''}${liteOpt.jsApi ? ' js-api' : ''}${title ?? ''}>`;
  out += '<div class="lty-playbtn"></div></lite-youtube></div>';
  return out;
}

/**
 * Stringify plugin options that get passed as URL params
 * @param {PluginOptions} options - Object with user-configurable options
 * @returns {string} - URL params string
 */
function stringifyUrlParams(options){
  let params = []

  // autoplay is _technically_ possible, but be cool, don't do this
  if(options.allowAutoplay) params.push('autoplay=1');
  if(options.recommendSelfOnly) params.push('rel=0');
  if(options.startTime) params.push(`start=${options.startTime}`);

  if (params.length === 0) return '';
  // In lite mode, params are passed as attribute values,
  // so you need to leave out the question mark
  if (options.lite) return params.join("&amp;");
  return '?' + params.join("&amp;");
}

/**
 * Create the lite embed options object
 * @param {PluginOptions} options - User-configured options
 * @param {LiteDefaults} [defaults=liteDefaults] - Default lite embed options
 * @returns {Object} Object with user-configured lite embed options
 */
function liteConfig(options, defaults = liteDefaults){
  return typeof options.lite == 'object'
    ? merge(defaults, options.lite)
    : defaults;
}

/**
 * Validate that the thumbnail size is one of the valid options
 * @param {string} inputString - Thumbnail size string
 * @returns {string} - Valid thumbnail size.
 *
 * This does *not* check that an image of this size exists, simply
 * that the filename matches a set of valid filenames. If an invalid
 * string is passed, it returns the default value.
 */
function validateThumbnailSize(inputString = thumbnails.defaultSize) {
  if ( !thumbnails.validSizes.includes(inputString) ) {
    return thumbnails.defaultSize
  }
  return inputString;
}

/**
 * Get the video title from YouTube's oembed API
 * @private
 * @param {string} id - YouTube video ID
 * @returns {string} - Video title, with fallback to plugin default
 */
async function __getYouTubeTitleViaOembed(id, options) {
  const cacheDuration = options.titleOptions.cacheDuration;
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  try {
    const {title} = await downloadAndCache(url, {
      duration: cacheDuration,
      type: "json" // @11ty/eleventy-fetch parses JSON by default
    });
    return title;
  } catch (error) {
    console.info("Couldn’t fetch video title. Falling back to default...\n", error);
    return options.title;
  }
}

/**
 * Thumbnail format validator
 * @param {string} format - The thumbnail format to validate.
 * @todo Make this more functional, "thumbnails" makes this non-pure.
 * @returns {string} - The validated thumbnail format.
 */
function validateThumbnailFormat(format) {
  return thumbnails.validFormats.includes(format)
  ? format
  : thumbnails.defaultFormat;
}

/**
 * Construct the base URL for YouTube embeds
 * @private
 * @param {PluginOptions} opt - User-configured options
 * @returns {string} Base URL for YouTube embeds
 */
function __constructEmbedUrlBase(opt) {
  const domain = opt.noCookie ? "youtube-nocookie" : "youtube";
  return `https://www.${domain}.com/`;
}

/**
 * Construct embed title
 * @private
 * @param {string} id - YouTube video ID
 * @param {PluginOptions} opt - User-configured options
 * @returns {string} - Video title, either the default or fetched via oEmbed
 */
async function __constructTitle(id, opt) {
  if (opt.titleOptions.download) {
    const oEmbedTitle = await __getYouTubeTitleViaOembed(id, opt);
    return oEmbedTitle;
  } else {
    return opt.title;
  }
}

/**
 * Get video and playlist IDs from a YouTube URL
 * @private
 * @param {string} url YouTube URL
 * @returns {Object} Object containing all URL parameters
 * @todo Handle with a single URL constructor, drop the regex?
 */
function __getParamsFromUrl(url) {
  // Check whether it's a youtu.be URL
  const dotBeID = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);

  const params = new URL(url).searchParams;
  // If it's a youtu.be URL, the video ID is in the pathname
  // Add it as a search param so we can return all params together
  if (dotBeID) params.set('v', dotBeID[1]);
  return Object.fromEntries(params.entries());
}

/**
 * Remove escaped ampersands from a URL
 * @private
 * @param {URL} url URL that might contain escaped ampersands
 * @returns {URL} URL with escaped ampersands converted to regular ones
 */
function __removeEscapedAmpersands(url) {
  return url.replace(/&amp;/g, "&");
}

/**
 * Construct the embed URL for a YouTube video
 * @private
 * @param {URL} url The URL of the YouTube video
 * @param {PluginOptions} opt The user-configured options
 * @returns {URL} The URL of the YouTube video embed
 */
function __constructEmbedSrc(url, opt) {
  const embedUrl = new URL(__constructEmbedUrlBase(opt));
  const {v: id, list: playlist, start, t} = __getParamsFromUrl(url);

  // Playlist embeds include a "videoseries" pathname, while
  // single video embeds use the video ID as the pathname.
  embedUrl.pathname = (playlist && !id) ? 'embed/videoseries' : `embed/${id}`;

  const params = {
    list: playlist,
    autoplay: opt.allowAutoplay ? 1 : 0,
    rel: opt.recommendSelfOnly ? 1 : 0,
    start: parseInt(opt.startTime ?? t ?? start),
  };

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      embedUrl.searchParams.append(key, value);
    }
  }

  return embedUrl.toString();
}

// These are only exported for testing purposes
module.exports.validateThumbnailSize = validateThumbnailSize;
module.exports.validateThumbnailFormat = validateThumbnailFormat;
module.exports.getYouTubeTitleViaOembed = __getYouTubeTitleViaOembed;
module.exports.stringifyUrlParams = stringifyUrlParams;
