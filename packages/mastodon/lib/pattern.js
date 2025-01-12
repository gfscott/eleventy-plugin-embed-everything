const {regex} = require('regex');

module.exports = function(hostname) {
  return regex`
	<p>
	(?>\s*+)?
	(?><a [^>]*?>)?
	(?>\s*+)?
	(?>https?:)?
	(?>/{2})?
	(?>w{3}\.)?
	(
		(?<hostname>${hostname})
		/@(?<user>\w+)
		 @?(?<server>[\w\.]+)?
		/(?<id>\d+)
		\S*
	)
	(?>\s*+)?
	(?><\/a>)?
	(?>\s*+)?
	</p>
  `;
}


/**
 * Mastodon's oembed behavior:
 * 1. The oembed endpoint is the ORIGINAL server URL plus `/api/oembed?url=`
 * 2. Mastodon usernames can be letters, numbers, and underscores
 * 3. Mastodon servers take the form of domains or subdomains
 * 4. Basic structure is https://:rendering_server/@:username@:originating_server/:toot_id
 * ...And you need them all to query the correct oembed endpoint
 *
 * Example:
 * - https://social.vivaldi.net/@eleventy@fosstodon.org/113198584572922516
 * needs to be transformed into:
 * - https://fosstodon.org/api/oembed?url=https://fosstodon.org/@eleventy/113198584572922516
 *
 */
