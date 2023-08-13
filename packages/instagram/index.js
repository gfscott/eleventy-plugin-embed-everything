const patternPresent = require('./lib/spotPattern.js');
const extractId = require('./lib/extractMatches.js');
const buildEmbed = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

module.exports = function (eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedInstagram", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let matches = patternPresent(content);
      if (!matches) {
        return content;
      }
      // index is used to limit the number of script tags added to each page to one
      matches.forEach(function (stringToReplace, index) {
        let mediaId = extractId(stringToReplace);
        let embedCode = buildEmbed(mediaId, pluginConfig, index);
        content = content.replace(stringToReplace, embedCode);
      });
      return content;
    }
    return content;
  });
};
