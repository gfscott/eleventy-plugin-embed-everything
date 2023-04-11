const merge = require('deepmerge');

module.exports = function(videoData, options, index) {
  let output;
  if ( !!options.lite ) {
    output = liteEmbed(videoData, options, index);
  } else {
    output = defaultEmbed(videoData, options);
  }
  return output;
}

/**
 * Parse params from input URL
 * 
 * @param {string} url - The full YouTube URL the user pasted.
 * 
 * There are some embed options that can be configured directly 
 * through URL params. The specificity of these per-video options 
 * is higher,so we let them override general plugin-level settings.
 */
function parseInputUrlParams(url) {
  // Regex accpets protocol-less URLs, but Node's URL constructor can't.
  // So prepend https:// if it's missing.
  url = url.startsWith('http') ? url : `https://${url}`;

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

function urlParams(options){
  let params = []

  // autoplay is _technically_ possible, but be cool, don't do this
  if(options.allowAutoplay) params.push('autoplay=1');
  if(options.recommendSelfOnly) params.push('rel=0');
  if(options.modestBranding) params.push('modestbranding=1');
  if(options.startTime) params.push(`start=${options.startTime}`);

if(params.length > 0) {
  return params.join("&amp;")
}
}

function liteEmbed({id, url}, options, index) {
  options = Object.assign({}, options, parseInputUrlParams(url))
  let liteOpt = liteConfig(options);
  liteOpt.thumbnailQuality = validateThumbnailSize(liteOpt.thumbnailQuality);
  let out = '';

  const fs = require('fs');
  const path = require('path');
  const isInstalled = __dirname.includes('node_modules');
  const basePath = isInstalled ? path.resolve(__dirname, '../../') : path.resolve(__dirname, '../node_modules/');

  const liteCssFilePath = path.join(basePath, 'lite-youtube-embed/src/lite-yt-embed.css');
  const liteJsFilePath = path.join(basePath, 'lite-youtube-embed/src/lite-yt-embed.js');
  const inlineCss = fs.readFileSync(liteCssFilePath, 'utf-8');
  const inlineJs = fs.readFileSync(liteJsFilePath, 'utf-8');
  const params = urlParams(options);

  if ( liteOpt.css.enabled && index === 0 ) {
    out += liteOpt.css.inline ? `<style>${inlineCss}</style>\n` : `<link rel="stylesheet" href="${liteOpt.css.path}">\n`;
  }
  if ( liteOpt.js.enabled && index === 0 ) {
    out += liteOpt.js.inline ? `<script>${inlineJs}</script>\n` : `<script defer="defer" src="${liteOpt.js.path}"></script>\n`;
  }
  out += `<div id="${id}" class="${options.embedClass}">`;
  out += `<lite-youtube videoid="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/${liteOpt.thumbnailQuality}.jpg');"`
  out += params ? ` params="${params}"`: "";
  out += `>`;
  out += `<div class="lty-playbtn"></div>`;
  out += `</lite-youtube>`;
  out += `</div>`;
  return out;
}

function liteConfig(options){
  const { liteDefaults } = require('./pluginDefaults.js');
  if ( options.lite && typeof options.lite === 'boolean') {
    return liteDefaults;
  } else {
    return merge(liteDefaults, options.lite);
  }
}

function defaultEmbed({id, url}, options){
  // Build the string, using config data as we go
  // unique ID based on youtube video id
  options = Object.assign({}, options, parseInputUrlParams(url))
  const params = urlParams(options);
  let out =
    '<div id="' + id + '" ';
  // global class name for all embeds, use this for styling
  out += 'class="' + options.embedClass + '" ';
  // intrinsic aspect ratio; currently hard-coded to 16:9
  // TODO: make configurable somehow
  out += 'style="position:relative;width:100%;padding-top: 56.25%;">';
  out +=
    '<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" ';
  out += 'width="100%" height="100%" frameborder="0" title="Embedded YouTube video" ';
  out += 'src="https://www.';
  // default to nocookie domain
  out += options.noCookie ? "youtube-nocookie" : "youtube";
  out += '.com/embed/';
  out += id;
  out += params ? `?${params}` : "";
  out += '" ';
  // configurable allow attributes
  out += 'allow="' + options.allowAttrs + '"';
  // configurable fullscreen capability
  out += options.allowFullscreen ? ' allowfullscreen' : '';
  //configurable iframe lazy-loading
  out += options.lazy ? ' loading="lazy"' : '';
  out += '></iframe></div>';
  return out;
}

/**
 * 
 * @param {String} inputString 
 * @returns {String} that is a valid thumbnail filename.
 * 
 * This does *not* check that an image of this size exists, simply
 * that the filename matches a set of valid filenames. If an invalid
 * string is passed, it returns the default value.
 * 
 */
const { thumbnails } = require('./pluginDefaults.js');

function validateThumbnailSize(inputString = thumbnails.defaultSize) { 
  if ( !thumbnails.validSizes.includes(inputString) ) {
    return thumbnails.defaultSize
  }
  return inputString;
}

module.exports.validateThumbnailSize = validateThumbnailSize;