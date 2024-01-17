const pattern = require("./lib/pattern.js");
const replace = require('./lib/replace.js');
const defaults = require("./lib/defaults.js");
const deepmerge = require('deepmerge');

module.exports = function(eleventyConfig, options = {}) {
  const config = deepmerge(defaults, options);
  eleventyConfig.addTransform("embedOpenStreetMap",async function(content, outputPath) {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    return content.replace(pattern, (...match) => replace(match, config));
  });
};