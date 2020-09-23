// Follows defaults used on Spotify’s Play Button generator
// https://developer.spotify.com/documentation/widgets/generate/play-button/
// Spotify requires `allow="encrypted-media"` to enable full-track playback in embeds
// https://web.archive.org/web/20200405163940/https://developer.spotify.com/community/news/2018/07/19/new-updates-to-spotify-play-button/
module.exports = {
	allowAttrs: "encrypted-media",
	embedClass: "eleventy-plugin-embed-spotify",
	height: "380",
	width: "300",
};
