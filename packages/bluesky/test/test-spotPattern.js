const test = require("ava");
const patternPresent = require("../lib/spotPattern.js");
const validStrings = require("./_validStrings.js");
const invalidStrings = require("./_invalidStrings.js");

/**
 * TEST: Returns true for valid strings
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} ideal case`, (t) => {
		let idealCase = `<p>${obj.str}</p>`;
		t.truthy(patternPresent(idealCase));
	});
});

/**
 * TEST: Returns true for valid strings with whitespace
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} with whitespace`, (t) => {
		let withWhitespace = `<p>  ${obj.str}  </p>`;
		t.truthy(patternPresent(withWhitespace));
	});
});

/**
 * TEST: Returns true for valid strings with links
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} with links`, (t) => {
		let withLinks = `<p><a href="${obj.str}">${obj.str}</a></p>`;
		t.truthy(patternPresent(withLinks));
	});
});

/**
 * TEST: Returns true for valid strings with links and whitespace
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} with links and whitespace`, (t) => {
		let withLinksAndWhitespace = `<p>  <a href="${obj.str}">  ${obj.str}  </a>  </p>`;
		t.truthy(patternPresent(withLinksAndWhitespace));
	});
});

/**
 * TEST: Returns false for invalid strings
 */
invalidStrings.forEach(function (obj) {
	test(`${obj.type} ideal case`, (t) => {
		let idealCase = `<p>${obj.str}</p>`;
		t.falsy(patternPresent(idealCase));
	});
});

/**
 * TEST: Returns false for invalid strings with whitespace
 */
invalidStrings.forEach(function (obj) {
	test(`${obj.type} with whitespace`, (t) => {
		let withWhitespace = `<p>  ${obj.str}  </p>`;
		t.falsy(patternPresent(withWhitespace));
	});
});
