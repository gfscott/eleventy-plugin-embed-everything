const test = require("node:test");
const assert = require("node:assert/strict");
const patternPresent = require("../lib/spotPattern.js");
const validStrings = require("./_validStrings.js");
// const invalidStrings = require("./_invalidStrings.js");

/**
 * TEST: Recognizes valid strings wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} ideal case`,
		() => {
			let idealCase = `<p>${obj.str}</p>`;
			assert.ok(patternPresent(idealCase));
		},
	);
});

/**
 * TEST: Recognizes valid strings wrapped in paragraph tags, with
 * additional whitespace
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} with whitespace`,
		() => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			assert.ok(patternPresent(withWhitespace));
		},
	);
});

/**
 * TEST: Recognizes valid strings wrapped in paragraph and anchor tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} with links`,
		() => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			assert.ok(patternPresent(withLinks));
		},
	);
});

/**
 * TEST: Recognizes valid strings wrapped in paragraph and anchor tags,
 * with additional whitespace
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
			assert.ok(patternPresent(withLinksAndWhitespace));
		},
	);
});

/**
 * TESTS: Doesn’t greedily consume subsequent paragraph tags in minified HTML
 * @since			1.3.3
 * @see				https://github.com/gfscott/eleventy-plugin-embed-twitter/issues/33
 */
test(
	"Regex doesn't greedily consume subsequent paragraph tags in minified HTML",
	() => {
		let multipleParagraphs = "<p>https://twitter.com/SaraSoueidan/status/1289865845053652994</p><p>Foo</p>";
		let output = patternPresent(multipleParagraphs);
		let expected = [
			"<p>https://twitter.com/SaraSoueidan/status/1289865845053652994</p>",
		];
		assert.deepEqual(output, expected);
	},
);

test(
	"Regex doesn't greedily consume subsequent paragraph tags in minified HTML, including anchor tags",
	() => {
		let multipleParagraphs = `<p><a href="foo">https://twitter.com/SaraSoueidan/status/1289865845053652994</a></p><p>Foo</p>`;
		let output = patternPresent(multipleParagraphs);
		let expected = [
			'<p><a href="foo">https://twitter.com/SaraSoueidan/status/1289865845053652994</a></p>',
		];
		assert.deepEqual(output, expected);
	},
);
