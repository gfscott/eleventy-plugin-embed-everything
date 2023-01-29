const spotPattern = require('./lib/spotPattern.js');
const extractMatches = require('./lib/extractMatches.js');
const buildEmbed = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

module.exports = function(eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedTikTok", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let matches = spotPattern(content);
      if (!matches) {
        return content;
      }
      matches.forEach(function (stringToReplace, index) {
        let media = extractMatches(stringToReplace);
        let embedCode = buildEmbed(media, pluginConfig, index);
        content = content.replace(stringToReplace, embedCode);
      });
      return content;
    }
    return content;
  });
};