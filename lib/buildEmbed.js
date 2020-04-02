module.exports = function(id, options) {
  // Build the string, using config data as we go
  // unique ID based on video id
  let out =
    '<div id="vimeo-' + id + '" ';
  // global class name for all embeds of this type, use this for styling
  out += 'class="' + options.embedClass + '"';
  // intrinsic aspect ratio; currently hard-coded to 16:9
  // TODO: make configurable somehow
  out += 'style="position:relative;width:100%;padding-top: 56.25%;">';
  out +=
    '<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" ';
  out += 'width="100%" height="100%" frameborder="0" ';
  out += 'src="https://player.vimeo.com/video/';
  out += id;
  out += options.dnt ? '?dnt=1' : '?dnt=0';
  out += '"';
  out += options.allowFullscreen ? ' allowfullscreen' : '';
  out += '></iframe></div>';
  return out;
}