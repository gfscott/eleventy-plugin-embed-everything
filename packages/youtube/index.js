const pattern = require('./lib/pattern.js');
const embed = require('./lib/embed.js');
const { pluginDefaults } = require('./lib/pluginDefaults.js');
const deepmerge = require('deepmerge');

module.exports = function (eleventyConfig, options = {}) {
  const config = deepmerge(pluginDefaults, options);
  eleventyConfig.addTransform("embedYouTube", async (content, outputPath) => {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    let index = 0;
    return content.replace(pattern, (...match) => embed(match, config, index++));
  });
};
