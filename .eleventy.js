const patternPresent = require('./lib/spotPattern.js');
const extractVideoId = require('./lib/extractMatches.js');
const buildEmbedCodeString = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

module.exports = function(eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedYouTube", async (content, outputPath) => {
    if (!outputPath.endsWith(".html")) {
      return content;
    }
    let matches = patternPresent(content);
    if (!matches) {
      return content;
    }
    matches.forEach(function(stringToReplace) {
      let videoId = extractVideoId(stringToReplace);
      let embedCode = buildEmbedCodeString(videoId, pluginConfig);
      content = content.replace(stringToReplace, embedCode);
    });
    return content;
  });
};
