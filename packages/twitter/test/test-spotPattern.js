const test = require("ava");
const patternPresent = require("../lib/spotPattern.js");
const validStrings = require("./inc/validStrings.js");
// const invalidStrings = require("./inc/invalidStrings.js");

/**
 * TEST: Recognizes valid strings wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} ideal case`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.truthy(patternPresent(idealCase));
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
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.truthy(patternPresent(withWhitespace));
		},
	);
});

/**
 * TEST: Recognizes valid strings wrapped in paragraph and anchor tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} with links`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.truthy(patternPresent(withLinks));
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
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			t.truthy(patternPresent(withLinksAndWhitespace));
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
	(t) => {
		let multipleParagraphs = "<p>https://twitter.com/SaraSoueidan/status/1289865845053652994</p><p>Foo</p>";
		let output = patternPresent(multipleParagraphs);
		let expected = [
			"<p>https://twitter.com/SaraSoueidan/status/1289865845053652994</p>",
		];
		t.deepEqual(output, expected);
	},
);

test(
	"Regex doesn't greedily consume subsequent paragraph tags in minified HTML, including anchor tags",
	(t) => {
		let multipleParagraphs = `<p><a href="foo">https://twitter.com/SaraSoueidan/status/1289865845053652994</a></p><p>Foo</p>`;
		let output = patternPresent(multipleParagraphs);
		let expected = [
			'<p><a href="foo">https://twitter.com/SaraSoueidan/status/1289865845053652994</a></p>',
		];
		t.deepEqual(output, expected);
	},
);
