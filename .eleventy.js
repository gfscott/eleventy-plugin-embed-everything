const patternPresent = require('./lib/spotPattern.js');
const extractVideoId = require('./lib/extractMatches.js');
const buildEmbedCodeString = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

module.exports = function(eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedTwitch", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let matches = patternPresent(content);
      if (!matches) {
        return content;
      }
      matches.forEach(function (stringToReplace) {
        let media = extractVideoId(stringToReplace);
        let embedCode = buildEmbedCodeString(media, pluginConfig);
        content = content.replace(stringToReplace, embedCode);
      });
      return content;
    }
    return content;
  });
};