module.exports = function(id, options, index) {
  let output;
  if ( !!options.lite ) {
    output = liteEmbed(id, options, index);
  } else {
    output = defaultEmbed(id, options);
  }
  return output;
}

function liteEmbed(id, options, index) {
  let liteOpt = liteConfig(options);
  let out = '';
  // only include css and js once per html file
  if ( index === 0 ) {
    out += `<link rel="stylesheet" href="${liteOpt.css.path}">`;
    out += `<script defer="defer" src="${liteOpt.js.path}"></script>`;
  }
  out += `<div id="${id}" class="${options.embedClass}">`;
  out += `<lite-youtube videoid="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg');">`;
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
    return Object.assign({}, liteDefaults, options.lite);
  }
}

function defaultEmbed(id, options){
  // Build the string, using config data as we go
  // unique ID based on youtube video id
  let out =
    '<div id="' + id + '" ';
  // global class name for all embeds, use this for styling
  out += 'class="' + options.embedClass + '"';
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
  // autoplay is _technically_ possible, but be cool, don't do this
  out += options.allowAutoplay ? '?autoplay=1' : '';
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
