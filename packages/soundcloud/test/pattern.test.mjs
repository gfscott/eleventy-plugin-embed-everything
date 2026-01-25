import { describe, it, expect } from "vitest";
import pattern from "../lib/pattern.js";
import { all } from "./_valid.mjs";

describe("SoundCloud URL Patterns", () => {
	for (const e of all) {
		it(`${e}`, () => {
			expect(e).toMatch(pattern);
		});
	}
});
