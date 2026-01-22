import { describe, it, expect } from "vitest";
import pattern from "../lib/pattern";
import { valid } from "./_strings.mjs";

describe("Pattern matches valid strings", () => {
	for (const u of valid) {
		it(`${u}`, () => {
			expect(u).toMatch(pattern);
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
		expect(str).not.toMatch(pattern);
	}
	);
	it("Prepended text", () => {
		const str = '<p>foo https://www.instagram.com/p/B-rRt1MjKZD/</p>';
		expect(str).not.toMatch(pattern);
	}
	);
	it("Malformed protocol", () => {
		const str = '<p>https//www.instagram.com/p/B-rRt1MjKZD/</p>';
		expect(str).not.toMatch(pattern);
	}
	);
	it("Prepended text, with link", () => {
		const str = '<p>foo <a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a></p>';
		expect(str).not.toMatch(pattern);
	}
	);
	it("Appended text", () => {
		const str = '<p>https://www.instagram.com/p/B-rRt1MjKZD/ bar</p>';
		expect(str).not.toMatch(pattern);
	}
	);
	it("Appended text, with link", () => {
		const str = '<p><a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a> bar</p>';
		expect(str).not.toMatch(pattern);
	}
	);
});
