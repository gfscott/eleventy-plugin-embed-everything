module.exports = function(id, options) {
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
  out += 'width="100%" height="100%" frameborder="0" ';
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
  out += '></iframe></div>';
  return out;
}