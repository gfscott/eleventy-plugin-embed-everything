const pattern = require("./lib/pattern.js");
const replace = require('./lib/replace.js');
const defaults = require("./lib/defaults.js");

module.exports = function(eleventyConfig, options = {}) {
  const config = Object.assign({}, defaults, options);
	eleventyConfig.addTransform("embedVimeo", async function(content, outputPath) {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
		return content.replace(pattern, (...match) => replace(match, config));
  });
};
