module.exports = function(eleventyConfig, options) {
  const defaults = {
    noCookie: true,
    embedClass: 'eleventy-plugin-youtube-embed',
    allowAttrs: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
    allowFullscreen: true,
    autoplay: false
  };
  const pluginConfig = Object.assign(defaults, options);

  eleventyConfig.addTransform("embedYouTube", async (content, outputPath) => {
    if (!outputPath.endsWith(".html")) {
      return content;
    }
    let matches = contentContainsYouTubeUrls(content);
    if (!matches) {
      return content;
    }
    matches.forEach(function(youTubeStringToReplace) {
      let videoId = extractVideoId(youTubeStringToReplace);
      let youTubeEmbedCode = buildEmbedCodeString(videoId);
      content = content.replace(youTubeStringToReplace, youTubeEmbedCode);
    });
    return content;
  });

  // Helper functions
  function contentContainsYouTubeUrls(str) {
    const youTubeUrlPattern = /<p>(\s*)(<a(.*)>)?(\s*)(https?:\/\/)?(w{3}\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/)?([A-Za-z0-9-_]{11})(\S*)(\s*)(<\/a>)?(\s*)<\/p>/g;
    return str.match(youTubeUrlPattern);
  }

  function extractVideoId(str) {
    // need to use exec to get named regex groups
    const thisPattern = /<p>(\s*)(<a(.*)>)?(\s*)(https?:\/\/)?(w{3}\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/)?(?<videoId>[A-Za-z0-9-_]{11})(\S*)(\s*)(<\/a>)?(\s*)<\/p>/;
    return thisPattern.exec(str).groups.videoId;
  }

  function buildEmbedCodeString(id) {
    // Build the string, using config data as we go
    // unique ID based on youtube video id
    let out =
      '<div id="' + id + '" ';
    // global class name for all embeds, use this for styling
    out += 'class="' + pluginConfig.embedClass + '"';
    // intrinsic aspect ratio; currently hard-coded to 16:9
    // TODO: make configurable somehow
    out += 'style="position:relative;width:100%;padding-top: 56.25%;">';
    out +=
      '<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" ';
    out += 'width="100%" height="100%" frameborder="0" ';
    out += 'src="https://www.';
    // default to nocookie domain
    out += pluginConfig.noCookie ? "youtube-nocookie" : "youtube";
    out += '.com/embed/';
    out += id;
    // autoplay is _technically_ possible, but be cool, don't do this
    out += pluginConfig.autoplay ? '?autoplay=1' : '';
    out += '" ';
    // configurable allow attributes
    out += 'allow="' + pluginConfig.allowAttrs + '"';
    // configurable fullscreen capability
    out += pluginConfig.allowFullscreen ? ' allowfullscreen' : '';
    out += '></iframe></div>';
    return out;
  }
};
