const merge = require('deepmerge');

module.exports = function(id, options, index) {
  let output;
  if ( !!options.lite ) {
    output = liteEmbed(id, options, index);
  } else {
    output = defaultEmbed(id, options);
  }
  return output;
}

function urlParams(options){
  let params = []

  // autoplay is _technically_ possible, but be cool, don't do this
  if(options.allowAutoplay) params.push('autoplay=1');
  if(options.recommendSelfOnly) params.push('rel=0');
  if(options.modestBranding) params.push('modestbranding=1');

if(params.length > 0) {
  return params.join("&amp;")
}
}

function liteEmbed(id, options, index) {
  let liteOpt = liteConfig(options);
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
  out += `<lite-youtube videoid="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg');"`
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

function defaultEmbed(id, options){
  // Build the string, using config data as we go
  // unique ID based on youtube video id
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
