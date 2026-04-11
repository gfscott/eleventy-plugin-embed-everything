import { test } from 'node:test';
import assert from 'node:assert/strict';
import pattern from '../lib/pattern.js';
import {getHashIfExists} from "../lib/replace.js";

test("Hash returns undefined when absent", () => {
	const match = pattern.exec("<p>https://vimeo.com/123456</p>");
	assert.equal(getHashIfExists(match), undefined);
	pattern.lastIndex = 0;
});

test("Hash returned correctly via regex", () => {
	const match = pattern.exec("<p>https://vimeo.com/123456/asdf1234</p>");
	assert.equal(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});

test("Hash returned correctly via param", () => {
	const match = pattern.exec("<p>https://vimeo.com/123456?h=asdf1234</p>");
	assert.equal(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});

test("Hash returned correctly via param, multiple params", () => {
	const match = pattern.exec("<p>https://vimeo.com/123456?foo=bar&h=asdf1234</p>");
	assert.equal(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});

test("Hash returned correctly via regex, with additional params", () => {
	const match = pattern.exec("<p>https://vimeo.com/123456/asdf1234?foo=bar</p>");
	assert.equal(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});

test("Hash returned correctly with both", () => {
	const match = pattern.exec("<p>https://vimeo.com/123456/asdf1234?h=asdf1234</p>");
	assert.equal(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});
