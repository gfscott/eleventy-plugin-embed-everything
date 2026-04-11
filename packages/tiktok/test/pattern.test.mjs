import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import pattern from "../lib/pattern.js";
import validUrls from "./_validUrls.mjs";

/**
 * The `regex` library outputs a native RegExp object.
 * This test snapshots that output, and will fail if the
 * output changes between regex library versions.
 * That's not necessarily a problem, but should be reviewed
 * for compatibility.
 */
describe("Snapshot regex library output", () => {
	it("Produces the same RegExp output across regex versions", (t) => {
		t.assert.snapshot(String(pattern));
	});
});

describe("Valid URL pattern tests", () => {
	for( let url of validUrls) {
		it(`Ideal case (<p>${url}</p>)`, () => {
			pattern.lastIndex = 0; assert.match(`<p>${url}</p>`, pattern);
		});

		it(`Links (${url})`, () => {
			pattern.lastIndex = 0; assert.match(`<p><a href="${url}">${url}</a></p>`, pattern);
		});

		it(`Whitespace (${url})`, () => {
			pattern.lastIndex = 0; assert.match(`<p>
				${url}
			</p>`, pattern);
		});

		it(`Whitespace and links (${url})`, () => {
			pattern.lastIndex = 0; assert.match(`<p>
				<a href="${url}">
					${url}
				</a>
			</p>`, pattern);
		});
	}
});


describe("Invalid URL pattern tests", () => {
	it("Prepended text", () => {
		pattern.lastIndex = 0; assert.doesNotMatch("<p>Foo https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877</p>", pattern);
	});
	it("Appended text", () => {
		pattern.lastIndex = 0; assert.doesNotMatch("<p>https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877 bar</p>", pattern);
	});
	it("Incomplete video ID", () => {
		pattern.lastIndex = 0; assert.doesNotMatch("<p>https://www.tiktok.com/@guiltyaesthetic/video/6806676200</p>", pattern);
	});
});

describe("Correct metadata extracted from URL", () => {
	const match = pattern.exec('<p>tiktok.com/@guiltyaesthetic/video/6806676200652655877</p>');
	it("Should contain the correct user", () => {
		assert.equal(match.groups.user, "@guiltyaesthetic");
	});
	it("Should contain the correct video ID", () => {
		assert.equal(match.groups.id, "6806676200652655877");
	});
});
