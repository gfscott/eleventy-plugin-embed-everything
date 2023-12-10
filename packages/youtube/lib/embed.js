const merge = require('deepmerge');
const { thumbnails } = require('./defaults.js');

/**
 * @typedef {Object} VideoObject
 * @property {string} id - The YouTube video ID.
 * @property {string} url - The YouTube URL.
 */ 

/**
 * Create the embed code for a YouTube video
 * @param {RegExpMatchArray} match - Array of matches from the RegExp
 * @param {PluginOptions} config - Object of user-configurable options 
 * @param {number} index - Index of the current match in the input string
 * @returns {string}
 */
module.exports = function(match, config, index) {
  [
    ,       // Full match
    ,       // Whitespace
    ,       // Whitespace
    __url,  // YouTube URL without protocol
    id,     // YouTube video ID
    ,       // Whitespace
    ,       // Whitespace
  ] = match;

  // The regex omits the protocol so we can add it back for more consistency and predictability.
  const url = `https://${__url}`;

  return config.lite ? liteEmbed({id, url}, config, index) : defaultEmbed({id, url}, config);
}


/**
 * Default embed code generator
 * @param {VideoObject} video - Video ID and URL
 * @param {PluginOptions} options - User-configured options
 * @returns 
 */
function defaultEmbed({id, url}, options){
  options = merge(options, getInputUrlParams(url))
  const params = stringifyUrlParams(options);
  const domain = options.noCookie ? "youtube-nocookie" : "youtube"

  let out = `<div id="${id}" class="${options.embedClass}" `;
  // intrinsic aspect ratio; currently hard-coded to 16:9
  // TODO: make configurable somehow
  out += 'style="position:relative;width:100%;padding-top: 56.25%;">';
  out +=
    '<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;"';
  out += ' width="100%" height="100%" frameborder="0" title="Embedded YouTube video"';
  out += ` src="https://www.${domain}.com/embed/${id}${ params ? `?${params}` : '' }"`;
  out += ` allow="${options.allowAttrs}"`;
  out += `${options.allowFullscreen ? ' allowfullscreen' : ''}`;
  out += `${options.lazy ? ' loading="lazy"' : ''}`;
  out += '></iframe></div>';
  return out;
}


/**
 * Lite embed code generator
 * @param {VideoObject} video - Object with video ID and URL
 * @param {PluginOptions} options - Object with user-configurable options
 * @param {number} index - Index of the current match in the input string
 * @returns 
 */
function liteEmbed({id, url}, options, index) {
  // Sort out all the various lite embed options
  options = merge(options, getInputUrlParams(url))
  const liteOpt = liteConfig(options);
        liteOpt.thumbnailQuality = validateThumbnailSize(liteOpt.thumbnailQuality);
  const params = stringifyUrlParams(options);
  
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
  
  out += `<div id="${id}" class="${options.embedClass}">`;
  out += `<lite-youtube videoid="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/${liteOpt.thumbnailQuality}.jpg');"${params ? ` params="${params}"` : ''}>`;
  out += '<div class="lty-playbtn"></div></lite-youtube></div>';
  return out;
}

/**
 * Parse params from input URL
 * 
 * @param {URL} url - The full YouTube URL the user pasted.
 * 
 * There are some embed options that can be configured directly 
 * through URL params. The specificity of these per-video options 
 * is higher,so we let them override general plugin-level settings.
 */
function getInputUrlParams(url) {

  // URLSearchParams object doesn't escape HTML-encoded ampersands, 
  // so replace them before parsing
  let unescapedUrl = url.replace("&amp;", "&")
  let params = new URL(unescapedUrl).searchParams;
  let urlOptions = new Object;
  
  // YouTube treats 'start' and 't' params as synonymous but 't' is the
  // official param so if you pass both 't' wins by being parsed last.
  // In addition, we parseInt these values to ensure they're numbers in seconds.
  // YouTube's embed URLs don't accept a start time if the 's' is included.
  if ( params.has('start') ) urlOptions.startTime = parseInt(params.get('start'));
  if ( params.has('t') ) urlOptions.startTime = parseInt(params.get('t'));

  return urlOptions;
}

/**
 * Stringify plugin options that get passed as URL params
 * @param {PluginOptions} options - Object with user-configurable options
 * @returns {String | null} 
 */
function stringifyUrlParams(options){
  let params = []

  // autoplay is _technically_ possible, but be cool, don't do this
  if(options.allowAutoplay) params.push('autoplay=1');
  if(options.recommendSelfOnly) params.push('rel=0');
  if(options.modestBranding) params.push('modestbranding=1');
  if(options.startTime) params.push(`start=${options.startTime}`);

  if (params.length === 0) return null;
  
  return params.join("&amp;");
}


/**
 * Create the lite embed options object
 * @param {PluginOptions} options 
 * @returns Object with user-configured lite embed options
 */
function liteConfig(options){
  const { liteDefaults } = require('./defaults.js');
  if ( options.lite && typeof options.lite === 'boolean') {
    return liteDefaults;
  } else {
    return merge(liteDefaults, options.lite);
  }
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

module.exports.validateThumbnailSize = validateThumbnailSize;