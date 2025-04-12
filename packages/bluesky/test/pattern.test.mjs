import { describe, it, expect } from 'vitest';
import pattern from "../lib/pattern.js";
import { validStrings, invalidStrings } from "./_validUrls.mjs";

/**
 * Test pattern matching with valid strings
 */
describe('Valid URL patterns', () => {
	for (const [index, str] of validStrings.entries()) {
		it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
			expect(str).toMatch(pattern);
		});
	}
});

describe('Invalid URL patterns', () => {
	for (const [index, str] of invalidStrings.entries()) {
		it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
			expect(str).not.toMatch(pattern);
		});
	}
});
