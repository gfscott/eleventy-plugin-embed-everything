const patternPresent = require('./lib/spotPattern.js');
const extractVideoId = require('./lib/extractMatches.js');
const buildEmbed = require('./lib/buildEmbed.js');
const { pluginDefaults } = require('./lib/pluginDefaults.js');

module.exports = function (eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedYouTube", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let matches = patternPresent(content);
      if (!matches) {
        return content;
      }
      matches.forEach(function (stringToReplace, index) {
        let videoData = extractVideoId(stringToReplace);
        let embedCode = buildEmbed(videoData, pluginConfig, index);
        content = content.replace(stringToReplace, embedCode);
      });
      return content;
    }

    return content;
  });
};
