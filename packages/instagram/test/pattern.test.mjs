import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import pattern from "../lib/pattern.js";
import { valid } from "./_strings.mjs";

describe("Pattern matches valid strings", () => {
	for (const u of valid) {
		it(`${u}`, () => {
			pattern.lastIndex = 0; assert.match(u, pattern);
		});
	}
});

/**
 * This matches what's tested as of v1.3.0.
 * TODO this can be expanded to cover more cases
 */
describe("Pattern doesn't match invalid strings", () => {
	it("Incomplete photo ID", () => {
		const str = '<p>https://www.instagram.com/p/abcde/</p>';
		pattern.lastIndex = 0; assert.doesNotMatch(str, pattern);
	}
	);
	it("Prepended text", () => {
		const str = '<p>foo https://www.instagram.com/p/B-rRt1MjKZD/</p>';
		pattern.lastIndex = 0; assert.doesNotMatch(str, pattern);
	}
	);
	it("Malformed protocol", () => {
		const str = '<p>https//www.instagram.com/p/B-rRt1MjKZD/</p>';
		pattern.lastIndex = 0; assert.doesNotMatch(str, pattern);
	}
	);
	it("Prepended text, with link", () => {
		const str = '<p>foo <a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a></p>';
		pattern.lastIndex = 0; assert.doesNotMatch(str, pattern);
	}
	);
	it("Appended text", () => {
		const str = '<p>https://www.instagram.com/p/B-rRt1MjKZD/ bar</p>';
		pattern.lastIndex = 0; assert.doesNotMatch(str, pattern);
	}
	);
	it("Appended text, with link", () => {
		const str = '<p><a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a> bar</p>';
		pattern.lastIndex = 0; assert.doesNotMatch(str, pattern);
	}
	);
});
