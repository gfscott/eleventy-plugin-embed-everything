/**
 * Test spotPattern.js
 * -------------------
 * This file tests that valid strings are correctly identified
 * by the spotPattern module.
 */

const test = require("ava");
const validStrings = require("./inc/validStrings.js");
const invalidStrings = require("./inc/invalidStrings.js");
const patternPresent = require("../lib/spotPattern.js");

validStrings.forEach(function(obj) {
	test(
		`VALID: ${obj.type} ideal full HTTPS URL`,
		(t) => {
			let str = `<p>https://open.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} HTTP URL`,
		(t) => {
			let str = `<p>http://open.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} no protocol, with slashes`,
		(t) => {
			let str = `<p>//open.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} no protocol, no slashes `,
		(t) => {
			let str = `<p>open.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, ideal full HTTPS URL`,
		(t) => {
			let str = `<p>https://www.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, HTTP URL`,
		(t) => {
			let str = `<p>http://www.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, no protocol, with slashes`,
		(t) => {
			let str = `<p>//www.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, no protocol, no slashes `,
		(t) => {
			let str = `<p>www.${obj.str}</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} ideal full HTTPS URL, with arbitrary params`,
		(t) => {
			let str = `<p>https://open.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} HTTP URL, with arbitrary params`,
		(t) => {
			let str = `<p>http://open.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} no protocol, with slashes, with arbitrary params`,
		(t) => {
			let str = `<p>//open.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} no protocol, no slashes , with arbitrary params`,
		(t) => {
			let str = `<p>open.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, ideal full HTTPS URL, with arbitrary params`,
		(t) => {
			let str = `<p>https://www.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, HTTP URL, with arbitrary params`,
		(t) => {
			let str = `<p>http://www.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, no protocol, with slashes, with arbitrary params`,
		(t) => {
			let str = `<p>//www.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
	test(
		`VALID: ${obj.type} open > www, no protocol, no slashes , with arbitrary params`,
		(t) => {
			let str = `<p>www.${obj.str}?foo=bar</p>`;
			t.truthy(patternPresent(str));
		},
	);
});

invalidStrings.forEach(function(obj) {
	test(
		`INVALID: ${obj.type} ideal case`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.falsy(patternPresent(idealCase));
		},
	);
	test(
		`INVALID: ${obj.type} with whitespace`,
		(t) => {
			let withWhitespace = `<p>
        ${obj.str}
        </p>`;
			t.falsy(patternPresent(withWhitespace));
		},
	);
});
