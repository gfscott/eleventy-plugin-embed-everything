const test = require("ava");
const extractMatch = require("../lib/extractMatch.js");
const validStrings = require("./inc/validStrings.js");

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
