module.exports = function(eleventyConfig, options) {
  const defaults = {
    noCookie: true
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
  function contentContainsYouTubeUrls(str) {
    const youTubeUrlPattern = /<p>(https?:\/\/)?(w{3}\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([A-Za-z0-9-_]{11})(.*)<\/p>/g;
    return str.match(youTubeUrlPattern);
  }

  function extractVideoId(str) {
    // need to use exec to get named regex groups
    const thisPattern = /<p>(https?:\/\/)?(w{3}\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?(?<videoId>[A-Za-z0-9-_]{11})(.*)<\/p>/;
    return thisPattern.exec(str).groups.videoId;
  }
  pluginConfig;
  function buildEmbedCodeString(id) {
    let out =
      '<div style="position:relative;width: 100%;padding-top: 56.25%;">';
    out +=
      '<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" ';
    out += 'width="100%" height="100%" frameborder="0" allowfullscreen ';
    out += 'src="https://www.';
    out += pluginConfig.noCookie ? "youtube-nocookie" : "youtube";
    out += ".com/embed/";
    out += id;
    out += '"></iframe></div>';
    return out;
  }
};
