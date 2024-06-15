const pattern = require("./lib/pattern.js");
const replace = require('./lib/replace.js');

module.exports = function(eleventyConfig, options = {}) {
  eleventyConfig.addTransform("embedOpenStreetMap",async function(content, outputPath) {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    return content.replace(pattern, (...match) => replace(match, options));
  });
};