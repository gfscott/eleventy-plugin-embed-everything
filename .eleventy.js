const patternPresent = require('./lib/spotPattern.js');
const extractMatches = require('./lib/extractMatches.js');
const buildEmbed = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

module.exports = function(eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedTikTok", async (content, outputPath) => {
    if (!outputPath.endsWith(".html")) {
      return content;
    }
    let matches = patternPresent(content);
    if (!matches) {
      return content;
    }
    // index is used to limit the number of script tags added to each page to one
    matches.forEach(function(stringToReplace, index) {
      let media = extractMatches(stringToReplace);
      let embedCode = buildEmbed(media, pluginConfig, index);
      content = content.replace(stringToReplace, embedCode);
    });
    return content;
  });
};
