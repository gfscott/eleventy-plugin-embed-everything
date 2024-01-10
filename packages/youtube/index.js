const pattern = require('./lib/pattern.js');
const embed = require('./lib/embed.js');
const { defaults } = require('./lib/defaults.js');
const deepmerge = require('deepmerge');

module.exports = function (eleventyConfig, options = {}) {
  const config = deepmerge(defaults, options);
  eleventyConfig.addTransform("embedYouTube", async (content, outputPath) => {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    const {default: asyncReplace} = await import('string-replace-async');
    let index = 0;
    return await asyncReplace(content, pattern, async (...match) => {
      return await embed(match, config, index++)
    });
  });
};
