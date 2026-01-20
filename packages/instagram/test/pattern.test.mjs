import { it, expect } from "vitest";
import pattern from "../lib/pattern";
import { valid } from "./_strings.mjs";

for (const u of valid) {
	it(`${u}`, () => {
		expect(u).toMatch(pattern);
	});
}
