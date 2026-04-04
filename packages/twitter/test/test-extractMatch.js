const test = require("node:test");
const assert = require("node:assert/strict");
const extractMatch = require("../lib/extractMatch.js");
const validStrings = require("./_validStrings.js");

/**
 * Expected object when extracting from valid strings
 */
const expected = {userHandle: "SaraSoueidan", tweetId: "1289865845053652994"};

/**
 * TEST: Returns expected Tweet object when wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} ideal case`,
		() => {
			const idealCase = `<p>${obj.str}</p>`;
			assert.deepEqual(extractMatch(idealCase), expected);
		},
	);
});

/**
 * TEST: Returns expected Tweet object when wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} withWhitespace`,
		() => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			assert.deepEqual(extractMatch(withWhitespace), expected);
		},
	);
});

/**
 * TEST: Returns expected Tweet object when wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} with links`,
		() => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			assert.deepEqual(extractMatch(withLinks), expected);
		},
	);
});

/**
 * TEST: Returns expected Tweet object when wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} with links and whitespace`,
		() => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			assert.deepEqual(extractMatch(withLinksAndWhitespace), expected);
		},
	);
});

/**
 * TESTS: RegEx doesn’t greedily consume subsequent paragraph tags in minified HTML
 *
 * @since			1.3.3
 * @see				https://github.com/gfscott/eleventy-plugin-embed-twitter/issues/33
 *
 * This is more of a problem for lib/spotPattern.js but testing this ensures consistent
 * behavior for the two regular expressions.
 */
test(
	"RegEx doesn't greedily consume subsequent paragraph tags in minified HTML",
	() => {
		let paragraphs = "<p>https://twitter.com/SaraSoueidan/status/1289865845053652994</p><p>Foo</p>";
		let output = extractMatch(paragraphs);
		assert.deepEqual(output, expected);
	},
);

test(
	"RegEx doesn't greedily consume subsequent paragraph tags in minified HTML, including anchor tags",
	() => {
		let paragraphs = `<p><a href="foo">https://twitter.com/SaraSoueidan/status/1289865845053652994</a></p><p>Foo</p>`;
		let output = extractMatch(paragraphs);
		assert.deepEqual(output, expected);
	},
);
