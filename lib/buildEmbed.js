module.exports = function(id, options) {
  // Build the string, using config data as we go
  // unique ID based on video id and global class name for all embeds
  let out = `<div id="vimeo-${id}" class="${options.embedClass}"`;
  out += options.wrapperStyle ? ` style="${options.wrapperStyle}">` : ">";
  out += `<iframe`
  out += options.iframeStyle ? ` style="${options.iframeStyle}"` : "";
  out += ' frameborder="0"';
  out += ' src="https://player.vimeo.com/video/';
  out += id;
  out += options.dnt ? '?dnt=1' : '?dnt=0';
  out += '"';
  out += options.allowFullscreen ? ' allowfullscreen' : '';
  out += '></iframe></div>';
  return out;
}