const embeds = require('eleventy-plugin-embed-everything')

module.exports = function(eleventyConfig) {
  // Configure global layout template
  eleventyConfig.addGlobalData("layout", "layout.njk");
  // Also watch package folders
  eleventyConfig.addWatchTarget("../packages/**");
  
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
    youtube: {
      options: {
        titleOptions: {
          download: true
        }
      }
    }
  });

  return {
    dir: {
      input: "src",
    }
  }
}