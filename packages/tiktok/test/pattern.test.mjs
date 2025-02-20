import { describe, it, expect } from "vitest";
import pattern from "../lib/pattern.js";
import validUrls from "./_validUrls.mjs";

describe("Valid URL pattern tests", () => {
	for( let url of validUrls) {
		it(`Ideal case (<p>${url}</p>)`, () => {
			expect(`<p>${url}</p>`).toMatch(pattern);
		});

		it(`Links (${url})`, () => {
			expect(`<p><a href="${url}">${url}</a></p>`).toMatch(pattern);
		});

		it(`Whitespace (${url})`, () => {
			expect(`<p>
				${url}
			</p>`).toMatch(pattern);
		});

		it(`Whitespace and links (${url})`, () => {
			expect(`<p>
				<a href="${url}">
					${url}
				</a>
			</p>`).toMatch(pattern);
		});
	}
});


describe("Invalid URL pattern tests", () => {
	it("Prepended text", () => {
		expect("<p>Foo https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877</p>").not.toMatch(pattern);
	});
	it("Appended text", () => {
		expect("<p>https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877 bar</p>").not.toMatch(pattern);
	});
	it("Incomplete video ID", () => {
		expect("<p>https://www.tiktok.com/@guiltyaesthetic/video/6806676200</p>").not.toMatch(pattern);
	});
});

describe("Correct metadata extracted from URL", () => {
	const match = pattern.exec('<p>tiktok.com/@guiltyaesthetic/video/6806676200652655877</p>');
	it("Should contain the correct user", () => {
		expect(match.groups.user).toBe("@guiltyaesthetic");
	});
	it("Should contain the correct video ID", () => {
		expect(match.groups.id).toBe("6806676200652655877");
	});
});
