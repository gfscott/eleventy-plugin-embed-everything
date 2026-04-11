import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import pattern from "../lib/pattern.js";
import { validStrings, invalidStrings } from "./_validUrls.mjs";

/**
 * Test pattern matching with valid strings
 */
describe('Valid URL patterns', () => {
	for (const [index, str] of validStrings.entries()) {
		it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
			pattern.lastIndex = 0; assert.match(str, pattern);
		});
	}
});

describe('Invalid URL patterns', () => {
	for (const [index, str] of invalidStrings.entries()) {
		it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
			pattern.lastIndex = 0; assert.doesNotMatch(str, pattern);
		});
	}
});
