const pattern = require("./lib/pattern.js");
const replace = require('./lib/replace.js');
const defaults = require("./lib/defaults.js");

module.exports = function(eleventyConfig, options = {}) {
  const config = Object.assign({}, defaults, options);
  eleventyConfig.addTransform("embedSpotify", async function(content, outputPath) {
    // Return content untouched if there's no output path or it's not HTML
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    return content.replace(pattern, (...match) => replace(match, config));
  });
};
