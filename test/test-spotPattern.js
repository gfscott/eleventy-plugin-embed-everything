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
