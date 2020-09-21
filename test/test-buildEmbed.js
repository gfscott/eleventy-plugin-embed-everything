/**
 * Test buildEmbed.js
 * -------------------
 * This file tests that the buildEmbed module returns the expected
 * HTML, given the extracted data.
 */

const test = require("ava");
const extractMatch = require("../lib/extractMatches.js");
const pluginDefaults = require("../lib/pluginDefaults.js");
const buildEmbed = require("../lib/buildEmbed.js");

test(
	"URL string returns expected HTML string for albums, default options",
	(t) => {
		let str = "<p>https://open.spotify.com/album/75qojmHz1id8sL2LDR5qVz</p>";
		let expected = '<div id="spotify-album-75qojmHz1id8sL2LDR5qVz" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-album"><iframe title="album on Spotify" src="https://open.spotify.com/embed/album/75qojmHz1id8sL2LDR5qVz" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>';
		let out = buildEmbed(extractMatch(str), pluginDefaults);
		t.is(out, expected);
	},
);

test(
	"URL string returns expected HTML string for artists, default options",
	(t) => {
		let str = "<p>https://open.spotify.com/artist/066X20Nz7iquqkkCW6Jxy6</p>";
		let expected = '<div id="spotify-artist-066X20Nz7iquqkkCW6Jxy6" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-artist"><iframe title="artist on Spotify" src="https://open.spotify.com/embed/artist/066X20Nz7iquqkkCW6Jxy6" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>';
		let out = buildEmbed(extractMatch(str), pluginDefaults);
		t.is(out, expected);
	},
);

test(
	"URL string returns expected HTML string for playlists, default options",
	(t) => {
		let str = "<p>https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj</p>";
		let expected = '<div id="spotify-playlist-7zv2xFPTH1MBynYafuvtCj" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-playlist"><iframe title="playlist on Spotify" src="https://open.spotify.com/embed/playlist/7zv2xFPTH1MBynYafuvtCj" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>';
		let out = buildEmbed(extractMatch(str), pluginDefaults);
		t.is(out, expected);
	},
);

test(
	"URL string returns expected HTML string for user-specific playlists, default options",
	(t) => {
		let str = "<p>https://open.spotify.com/user/gfscott/playlist/7zv2xFPTH1MBynYafuvtCj</p>";
		let expected = '<div id="spotify-playlist-7zv2xFPTH1MBynYafuvtCj" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-playlist"><iframe title="playlist on Spotify" src="https://open.spotify.com/embed/playlist/7zv2xFPTH1MBynYafuvtCj" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>';
		let out = buildEmbed(extractMatch(str), pluginDefaults);
		t.is(out, expected);
	},
);

test(
	"URL string returns expected HTML string for tracks, default options",
	(t) => {
		let str = "<p>https://open.spotify.com/track/3gsCAGsWr6pUm1Vy7CPPob</p>";
		let expected = '<div id="spotify-track-3gsCAGsWr6pUm1Vy7CPPob" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-track"><iframe title="track on Spotify" src="https://open.spotify.com/embed/track/3gsCAGsWr6pUm1Vy7CPPob" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>';
		let out = buildEmbed(extractMatch(str), pluginDefaults);
		t.is(out, expected);
	},
);

// Note that expected output is different for podcast episodes!
// Podcast players have different dimensions from standard Spotify embeds,
// and their embed iframe URL uses a different directory.
test(
	"URL string returns expected HTML string for podcast episodes, default options",
	(t) => {
		let str = "<p>https://open.spotify.com/episode/7G5O2wWmch1ciYDPZS4a4O</p>";
		let expected = '<div id="spotify-episode-7G5O2wWmch1ciYDPZS4a4O" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-episode"><iframe title="episode on Spotify" src="https://open.spotify.com/embed-podcast/episode/7G5O2wWmch1ciYDPZS4a4O" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>';
		let out = buildEmbed(extractMatch(str), pluginDefaults);
		t.is(out, expected);
	},
);
