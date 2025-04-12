import permute from 'permute-arrays';

/**
 * Non-core URL structures accepted by the plugin
 * Various protocol variants and URL parameters
 */
const validPrefixes = ['', '//', 'http://', 'https://', 'www.', 'http://www.', 'https://www.']
const validSuffixes = ['/', '?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']


/**
 * Base URL variants for Bluesky embeds
 */
const _valid = [
	// Standard {handle}.bsky.social
	'bsky.app/profile/karenmcgrane.bsky.social/post/3lhm5noo6v22y',
	// Custom domain handle
	'bsky.app/profile/shellen.com/post/3ldmp5qd6es2p',
	// Rare DID handle
	'bsky.app/profile/did:plc:yc6gmb3bo56qotdsywnsxrxp/post/3lgvpv7k5sc26',
]


const validUrls = permute(_valid, validPrefixes, validSuffixes);
const validStrings = validUrls.flatMap((url) => {
	return [
		// No whitespace
		`<p>${url}</p>`,
		// No whitespace with link
		`<p><a href="${url}">${url}</a></p>`,
		// Whitespace
		`<p>
			${url}
		</p>`,
		// Whitespace with link
		`<p>
			<a href="${url}">
				${url}
			</a>
		</p>`,
	];
});

const _invalid = [
  // Post ID too short
	"bsky.app/profile/bsky.app/post/abc",
  // Invalid paths
	"bsky.app/user/bsky.app/post/3lgu4lg6j2k2v",
  "bsky.app/profile/bsky.app/status/3lgu4lg6j2k2v",
  // Invalid domain
	"example.com/profile/bsky.app/post/3lgu4lg6j2k2v"
];

const invalidUrls = permute(_invalid, validPrefixes, validSuffixes);
const invalidStrings = invalidUrls.flatMap((url) => {
	return [
		// No whitespace
		`<p>${url}</p>`,
		// No whitespace with link
		`<p><a href="${url}">${url}</a></p>`,
		// Whitespace
		`<p>
			${url}
		</p>`,
		// Whitespace with link
		`<p>
			<a href="${url}">
				${url}
			</a>
		</p>`,
	];
});

export { validStrings, invalidStrings };
