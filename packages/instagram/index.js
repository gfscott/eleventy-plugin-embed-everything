const replace = require('./lib/replace.js');
const defaults = require("./lib/defaults.js");

module.exports = function(eleventyConfig, options = {}) {

  const config = Object.assign({}, defaults, options);

  eleventyConfig.addTransform("embedInstagram",async function(content, outputPath) {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    return replace(content, config)
  });
};
