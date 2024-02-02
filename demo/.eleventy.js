const embeds = require('eleventy-plugin-embed-everything')
const osm = require('eleventy-plugin-embed-openstreetmap')

module.exports = function(eleventyConfig) {
  // Configure global layout template
  eleventyConfig.addGlobalData("layout", "layout.njk");
  // Also watch package folders
  eleventyConfig.addWatchTarget("../packages/**");
  
  eleventyConfig.addPlugin(osm)

  // Add plugin
  eleventyConfig.addPlugin(embeds, {
    // Enable soundcloud, which isn't on by default
    add: ['soundcloud'],
    // Add the mandatory "parent" value required by Twitch.
    // See https://bit.ly/11ty-plugin-twitch-parent-error for details
    twitch: {
      options: {
        parent: ['localhost']
      }
    },
  });

  return {
    dir: {
      input: "src",
    }
  }
}