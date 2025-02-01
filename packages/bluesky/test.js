const test = require("ava");
const spotPattern = require("./lib/spotPattern.js");
const extractMatch = require("./lib/extractMatch.js");
const buildEmbed = require("./lib/buildEmbed.js");
const buildOptions = require("./lib/buildOptions.js");
const pluginDefaults = require("./lib/pluginDefaults.js");

const validStrings = require("./test/_validStrings.js");
const invalidStrings = require("./test/_invalidStrings.js");

/**
 * Ensure that valid strings pass pattern matching
 */
validStrings.forEach((testCase) => {
	test(`String is valid: ${testCase.type} ideal case`, (t) => {
		let matches = spotPattern(`<p>${testCase.str}</p>`);
		t.truthy(matches);
	});

	test(`String is valid: ${testCase.type} with links`, (t) => {
		let matches = spotPattern(`<p><a href="${testCase.str}">${testCase.str}</a></p>`);
		t.truthy(matches);
	});

	test(`String is valid: ${testCase.type} with whitespace`, (t) => {
		let matches = spotPattern(`<p>  ${testCase.str}  </p>`);
		t.truthy(matches);
	});

	test(`String is valid: ${testCase.type} with links and whitespace`, (t) => {
		let matches = spotPattern(
			`<p>  <a href="${testCase.str}">${testCase.str}</a>  </p>`,
		);
		t.truthy(matches);
	});
});

/**
 * Ensure that valid strings produce the expected handle and post ID
 */
validStrings.forEach((testCase) => {
	test(`Proper data extracted: ${testCase.type} ideal case`, (t) => {
		let data = extractMatch(`<p>${testCase.str}</p>`);
		t.truthy(data);
		t.truthy(data.handle);
		t.truthy(data.postId);
	});

	test(`Proper data extracted: ${testCase.type} with links`, (t) => {
		let data = extractMatch(`<p><a href="${testCase.str}">${testCase.str}</a></p>`);
		t.truthy(data);
		t.truthy(data.handle);
		t.truthy(data.postId);
	});

	test(`Proper data extracted: ${testCase.type} with whitespace`, (t) => {
		let data = extractMatch(`<p>  ${testCase.str}  </p>`);
		t.truthy(data);
		t.truthy(data.handle);
		t.truthy(data.postId);
	});

	test(`Proper data extracted: ${testCase.type} with links and whitespace`, (t) => {
		let data = extractMatch(
			`<p>  <a href="${testCase.str}">${testCase.str}</a>  </p>`,
		);
		t.truthy(data);
		t.truthy(data.handle);
		t.truthy(data.postId);
	});
});

/**
 * Ensure that invalid strings fail
 */
invalidStrings.forEach((testCase) => {
	test(`Invalid string rejected: ${testCase.type} ideal case`, (t) => {
		let data = extractMatch(`<p>${testCase.str}</p>`);
		t.falsy(data);
	});

	test(`Invalid string rejected: ${testCase.type} with whitespace`, (t) => {
		let data = extractMatch(`<p>  ${testCase.str}  </p>`);
		t.falsy(data);
	});
});
