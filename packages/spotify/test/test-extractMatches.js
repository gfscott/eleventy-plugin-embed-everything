/**
 * Test extractMatches.js
 * -------------------
 * This file tests that the extractMatches module returns the expected
 * data.
 */

const test = require("ava");
const validStrings = require("./inc/validStrings.js");
const extractMatch = require("../lib/extractMatches.js");

validStrings.forEach((obj) => {
	test(
		`URL string returns expected media type for ${obj.type}`,
		(t) => {
			let str = `<p>https://open.${obj.str}</p>`;
			let extract = extractMatch(str).type;
			let expected = obj.slug;
			// User playlists may have the username in the URL, but it's
			// not neccessary for embedding, so the extractor only returns
			// the 'playlist' type.
			if (obj.slug === "userPlaylist") {
				t.is(extract, "playlist");
			} else {
				t.is(extract, expected);
			}
		},
	);

	test(
		`URL string returns expected media ID for ${obj.type}`,
		(t) => {
			let str = `<p>https://open.${obj.str}</p>`;
			let extract = extractMatch(str).id;
			let expected = obj.id;
			t.is(extract, expected);
		},
	);

	test(
		`URL string returns expected media object for ${obj.type}`,
		(t) => {
			let str = `<p>https://open.${obj.str}</p>`;
			let extract = extractMatch(str);
			let expected = {
				type: obj.slug,
				id: obj.id,
			};
			// see user playlist notes above
			if (obj.slug === "userPlaylist") {
				t.deepEqual(extract, {type: "playlist", id: "7zv2xFPTH1MBynYafuvtCj"});
			} else {
				t.deepEqual(extractMatch(str), expected);
			}
		},
	);
});

/**
 * In the "validStrings.js" file, the "playlist" and "userPlaylist" types
 * should have identical IDs and produce the same `type` when processed by
 * extractMatch.js. This test ensures that the ids and slugs of those two
 * types remain in sync. It will error out if those strings are messed with!
 */
test(
	"Playlist and User Playlist types in validStrings.js have identical IDs",
	(t) => {
		let filteredArray = validStrings.filter((obj) =>
			obj.slug === "playlist" || obj.slug === "userPlaylist"
		);

		// filteredArray should always be exactly 2 entries
		t.is(filteredArray.length, 2);

		// Both filteredArray objects have the same IDs, and it's the expected one
		t.is(filteredArray[0].id, filteredArray[1].id);
		t.is(filteredArray[0].id, "7zv2xFPTH1MBynYafuvtCj");
	},
);
