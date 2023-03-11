const pattern = require("./lib/pattern.js");
const replace = require('./lib/replace.js');
const defaults = require("./lib/defaults.js");

module.exports = function(eleventyConfig, options = {}) {
	
  const config = Object.assign({}, defaults, options);
  
  eleventyConfig.addTransform("embedTed",async function(content, outputPath) {
    // Return content untouched if there's no output path or it's not HTML
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    // 1. Use the spread operator for the replace function parameter to allow an arbitrary number of capturing groups
    // 2. Use an anonymous function to immediately pass the full matches array to a function that can also accept the embed config object.
    return content.replace(pattern, (...match) => replace(match, config));
  });
};