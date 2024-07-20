const test = require("ava");
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
		(t) => {
			const idealCase = `<p>${obj.str}</p>`;
			t.deepEqual(extractMatch(idealCase), expected);
		},
	);
});

/**
 * TEST: Returns expected Tweet object when wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} withWhitespace`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.deepEqual(extractMatch(withWhitespace), expected);
		},
	);
});

/**
 * TEST: Returns expected Tweet object when wrapped in paragraph tags
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} with links`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.deepEqual(extractMatch(withLinks), expected);
		},
	);
});

/**
 * TEST: Returns expected Tweet object when wrapped in paragraph tags
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
			t.deepEqual(extractMatch(withLinksAndWhitespace), expected);
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
	(t) => {
		let paragraphs = "<p>https://twitter.com/SaraSoueidan/status/1289865845053652994</p><p>Foo</p>";
		let output = extractMatch(paragraphs);
		t.deepEqual(output, expected);
	},
);

test(
	"RegEx doesn't greedily consume subsequent paragraph tags in minified HTML, including anchor tags",
	(t) => {
		let paragraphs = `<p><a href="foo">https://twitter.com/SaraSoueidan/status/1289865845053652994</a></p><p>Foo</p>`;
		let output = extractMatch(paragraphs);
		t.deepEqual(output, expected);
	},
);
