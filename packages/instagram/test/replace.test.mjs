import { describe, it, expect } from "vitest";
import pattern from "../lib/pattern";
import replace from "../lib/replace";
import defaults from "../lib/defaults.js";
import { valid } from "./_strings.mjs";
import { describe } from "vitest";

describe("First embed", () => {
	for (const u of valid) {
		it(`${u}`, () => {
			const match = pattern.exec(u);
			pattern.lastIndex = 0;
			const embedCode = replace(match, defaults, 0);
			const extracted = {
				type: match[3],
				id: match[4],
			};
			expect(embedCode).toBe(
				`<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
			);
		});
	}
});

describe("Subsequent embeds", () => {
	for (const u of valid) {
		it(`${u}`, () => {
			const match = pattern.exec(u);
			pattern.lastIndex = 0;
			const embedCode = replace(match, defaults, 1);
			const extracted = {
				type: match[3],
				id: match[4],
			};
			expect(embedCode).toBe(
				`<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote>`
			);
		});
	}
});

describe("Custom class", () => {
	for (const u of valid) {
		it(`${u}`, () => {
			const match = pattern.exec(u);
			pattern.lastIndex = 0;
			const customDefaults = Object.assign({}, defaults, {
				embedClass: "foo",
			});
			const embedCode = replace(match, customDefaults, 0);
			const extracted = {
				type: match[3],
				id: match[4],
			};
			expect(embedCode).toBe(
				`<blockquote class="foo instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
			);
		});
	}
});
