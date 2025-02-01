const test = require("ava");
const extractMatch = require("../lib/extractMatch.js");
const validStrings = require("./_validStrings.js");
const invalidStrings = require("./_invalidStrings.js");

/**
 * TEST: Returns expected post object when wrapped in paragraph tags
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} ideal case`, (t) => {
		const idealCase = `<p>${obj.str}</p>`;
		const match = extractMatch(idealCase);
		t.truthy(match);
		t.true(match.handle.length > 0);
		t.true(match.postId.length >= 10);
	});
});

/**
 * TEST: Returns expected post object when wrapped in paragraph tags with whitespace
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} with whitespace`, (t) => {
		const withWhitespace = `<p>  ${obj.str}  </p>`;
		const match = extractMatch(withWhitespace);
		t.truthy(match);
		t.true(match.handle.length > 0);
		t.true(match.postId.length >= 10);
	});
});

/**
 * TEST: Returns expected post object when wrapped in paragraph and link tags
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} with links`, (t) => {
		const withLinks = `<p><a href="${obj.str}">${obj.str}</a></p>`;
		const match = extractMatch(withLinks);
		t.truthy(match);
		t.true(match.handle.length > 0);
		t.true(match.postId.length >= 10);
	});
});

/**
 * TEST: Returns expected post object when wrapped in paragraph and link tags with whitespace
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} with links and whitespace`, (t) => {
		const withLinksAndWhitespace = `<p>  <a href="${obj.str}">  ${obj.str}  </a>  </p>`;
		const match = extractMatch(withLinksAndWhitespace);
		t.truthy(match);
		t.true(match.handle.length > 0);
		t.true(match.postId.length >= 10);
	});
});

/**
 * TEST: Returns null for invalid strings
 */
invalidStrings.forEach(function (obj) {
	test(`Invalid string rejected: ${obj.type}`, (t) => {
		const idealCase = `<p>${obj.str}</p>`;
		t.falsy(extractMatch(idealCase));
	});
});

/**
 * TEST: Returns null for invalid strings with whitespace
 */
invalidStrings.forEach(function (obj) {
	test(`Invalid string rejected: ${obj.type} with whitespace`, (t) => {
		const withWhitespace = `<p>  ${obj.str}  </p>`;
		t.falsy(extractMatch(withWhitespace));
	});
});
