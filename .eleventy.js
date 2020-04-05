const spotPattern = require('./lib/spotPattern.js');
const extractMatches = require('./lib/extractMatches.js');
const buildEmbedCodeString = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

module.exports = function(eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedSpotify", async (content, outputPath) => {
    if (!outputPath.endsWith(".html")) {
      return content;
    }
    let matches = spotPattern(content);
    if (!matches) {
      return content;
    }
    matches.forEach(function(stringToReplace) {
      let mediaDetail = extractMatches(stringToReplace);
      let embedCode = buildEmbedCodeString(mediaDetail, pluginConfig);
      content = content.replace(stringToReplace, embedCode);
    });
    return content;
  });
};
