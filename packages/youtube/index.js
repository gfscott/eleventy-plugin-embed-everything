const pattern = require('./lib/pattern.js');
const embed = require('./lib/embed.js');
const { defaults } = require('./lib/defaults.js');
const deepmerge = require('deepmerge');
const replace = require('string-replace-async');

module.exports = function (eleventyConfig, options = {}) {
  const config = deepmerge(defaults, options);
  eleventyConfig.addTransform("embedYouTube", async (content, outputPath) => {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    let index = 0;
    return await replace(content, pattern, async (...match) => embed(match, config, index++));
  });
};
