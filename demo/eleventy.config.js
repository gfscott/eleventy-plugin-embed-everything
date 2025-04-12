import embeds from 'eleventy-plugin-embed-everything';

export default function(eleventyConfig) {
  // Configure global layout template
  eleventyConfig.addGlobalData("layout", "layout.njk");
  // Also watch package folders
  eleventyConfig.addWatchTarget("../packages/**");

  // Add plugin
  eleventyConfig.addPlugin(embeds, {
    // Enable plugins that aren't active by default
    add: ['bluesky', 'mastodon', 'soundcloud'],
    // Add the mandatory "server" value required for Mastodon.
		mastodon: {
			options: {
				server: 'social.vivaldi.net',
			}
		},
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
