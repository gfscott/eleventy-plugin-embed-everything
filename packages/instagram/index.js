const pattern = require("./lib/pattern.js");
const replace = require('./lib/replace.js');
const defaults = require("./lib/defaults.js");

module.exports = function(eleventyConfig, options = {}) {

  const config = Object.assign({}, defaults, options);
  /**
   * Counter tracks the number of embeds on each page.
   * This is required so that the Instagram script tag is
   * only added once per page.
   */
  let index = 0;

  eleventyConfig.addTransform("embedInstagram",async function(content, outputPath) {
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    const output = content.replace(pattern, (...match) => {
      const replacer = replace(match, config, index)
      index++
      return replacer
    })
    /**
     * Reset the index to zero.
     * This is only needed for the dev server's watch mode,
     * where this value doesn't get reset between rebuilds.
     * No effect on production builds!
     */ 
    index = 0;
    return output;
  });
};
