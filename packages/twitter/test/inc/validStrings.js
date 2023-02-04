module.exports = [
	{
		type: "User status, ideal",
		str: "https://twitter.com/SaraSoueidan/status/1289865845053652994",
	},
	{
		type: "User status, with protocol, without secure, with slash, without www",
		str: "http://twitter.com/SaraSoueidan/status/1289865845053652994",
	},
	{
		type: "User status, without protocol, with slash, without www",
		str: "//twitter.com/SaraSoueidan/status/1289865845053652994",
	},
	{
		type: "User status, with protocol, with secure, with slash, with www",
		str: "https://www.twitter.com/SaraSoueidan/status/1289865845053652994",
	},
	{
		type: "User status, with protocol, without secure, with slash, with www",
		str: "http://www.twitter.com/SaraSoueidan/status/1289865845053652994",
	},
	{
		type: "User status, without protocol, with slash, with www",
		str: "//www.twitter.com/SaraSoueidan/status/1289865845053652994",
	},
	{
		type: "User status, without protocol, without slash, without www",
		str: "twitter.com/SaraSoueidan/status/1289865845053652994",
	},
	{
		type: "User status, ideal, with arbitrary param",
		str: "https://twitter.com/SaraSoueidan/status/1289865845053652994?foo",
	},
	{
		type: "User status, ideal, with arbitrary key-value param",
		str: "https://twitter.com/SaraSoueidan/status/1289865845053652994?foo=bar",
	},
	{
		type: "User status, ideal, with arbitrary multiple params",
		str: "https://twitter.com/SaraSoueidan/status/1289865845053652994?foo&bar",
	},
	{
		type: "User status, ideal, with arbitrary multiple key-value params",
		str: "https://twitter.com/SaraSoueidan/status/1289865845053652994?foo=bar&baz=boo",
	},
];
