module.exports = [
	{
		type: "Bsky.app User status, ideal",
		str: "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v",
	},
	{
		type: "Bsky.app User status, with trailing slash",
		str: "https://bsky.app/profile/stereogum.bsky.social/post/3lh27cswiwc27/",
	},
	{
		type: "Bsky.app User status, with protocol, without secure, with slash, without www",
		str: "http://bsky.app/profile/merlevans.bsky.social/post/3lgzl25gr2c2k",
	},
	{
		type: "Bsky.app User status, without protocol, with slash, without www",
		str: "//bsky.app/profile/bsky.app/post/3le6bze3nus2c",
	},
	{
		type: "Bsky.app User status, without protocol, without slash, without www",
		str: "bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v",
	},
	{
		type: "Bsky.app User status, with DID handle",
		str: "https://bsky.app/profile/did:plc:yc6gmb3bo56qotdsywnsxrxp/post/3lgvpv7k5sc26",
	},
	{
		type: "Bsky.app User status, with bsky.social handle",
		str: "https://bsky.app/profile/merlevans.bsky.social/post/3lgzl25gr2c2k",
	},
	{
		type: "Bsky.app User status, with custom domain handle",
		str: "https://bsky.app/profile/shellen.com/post/3ldmp5qd6es2p",
	},
	{
		type: "Bsky.app User status, with arbitrary query param",
		str: "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo",
	},
	{
		type: "Bsky.app User status, with arbitrary key-value param",
		str: "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo=bar",
	},
	{
		type: "Bsky.app User status, with multiple query params",
		str: "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo&bar",
	},
	{
		type: "Bsky.app User status, with multiple key-value params",
		str: "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo=bar&baz=qux",
	},
];
