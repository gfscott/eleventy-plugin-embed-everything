module.exports = [
	{
		type: "With prepended text",
		str: "foo https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj",
	},
	{
		type: "With prepended text, with link",
		str: 'foo <a href="">https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj</a>',
	},
	{
		type: "With appended text",
		str: "https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj bar",
	},
	{
		type: "With appended text, with link",
		str: '<a href="">https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj</a> bar',
	},
	{
		type: "With incomplete playlist ID",
		str: "https://open.spotify.com/playlist/7zv2xFPTH1M",
	},
];
