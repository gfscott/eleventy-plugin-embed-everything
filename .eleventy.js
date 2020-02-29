module.exports = function(eleventyConfig, options) {
  const defaults = {
    allowFullscreen: true,
    dnt: true,
    embedClass: 'eleventy-plugin-vimeo-embed'
  };
  const pluginConfig = Object.assign(defaults, options);

  eleventyConfig.addTransform("embedVimeo", async (content, outputPath) => {
    if (!outputPath.endsWith(".html")) {
      return content;
    }
    let matches = contentContainsRelevantUrls(content);
    if (!matches) {
      return content;
    }
    matches.forEach(function(relevantStringToReplace) {
      let videoId = extractVideoId(relevantStringToReplace);
      let videoEmbedCode = buildEmbedCodeString(videoId);
      content = content.replace(relevantStringToReplace, videoEmbedCode);
    });
    return content;
  });

  // Helper functions
  function contentContainsRelevantUrls(str) {
    const thisUrlPattern = /<p>(\s*)(<a(.*)>)?(\s*)(https?:\/\/)?(w{3}\.)?(vimeo\.com)\/(\d+)(\S*)(\s*)(<\/a>)?(\s*)<\/p>/g;
    return str.match(thisUrlPattern);
  }

  function extractVideoId(str) {
    // need to use exec to get named regex groups
    const thisPattern = /<p>(\s*)(<a(.*)>)?(\s*)(https?:\/\/)?(w{3}\.)?(vimeo\.com)\/(?<videoId>\d+)(\S*)(\s*)(<\/a>)?(\s*)<\/p>/;
    return id = thisPattern.exec(str).groups.videoId;
  }

  function buildEmbedCodeString(id) {
    // Build the string, using config data as we go
    // unique ID based on video id
    let out =
      '<div id="vimeo-' + id + '" ';
    // global class name for all embeds of this type, use this for styling
    out += 'class="' + pluginConfig.embedClass + '"';
    // intrinsic aspect ratio; currently hard-coded to 16:9
    // TODO: make configurable somehow
    out += 'style="position:relative;width:100%;padding-top: 56.25%;">';
    out +=
      '<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" ';
    out += 'width="100%" height="100%" frameborder="0" ';
    out += 'src="https://player.vimeo.com/video/';
    out += id;
    out += pluginConfig.dnt ? '?dnt=1' : '?dnt=0';
    out += '"';
    out += pluginConfig.allowFullscreen ? ' allowfullscreen' : '';
    out += '></iframe></div>';
    return out;
  }
};
