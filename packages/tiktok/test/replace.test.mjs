import {describe, it, expect}  from "vitest";
import merge from "deepmerge";
import _replace from "../lib/replace.js";
import pattern from "../lib/pattern.js";
import defaults, { maxWidth } from "../lib/defaults.js";

const str = '<p>tiktok.com/@guiltyaesthetic/video/6806676200652655877</p>'

describe("Returns expected HTML", () => {

	it("Zero config", () => {
		const match = str.replace(pattern, (...match) => _replace(match, defaults, 0));
		expect(match).toBe('<blockquote class="eleventy-plugin-embed-tiktok tiktok-embed" cite="https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877" data-video-id="6806676200652655877" style="max-width: 605px; min-width: 325px;"><section></section></blockquote><script async defer src="https://www.tiktok.com/embed.js"></script>');
	});

	it("No script tag when index > 0", () => {
		const match = str.replace(pattern, (...match) => _replace(match, defaults, 1));
		expect(match).toBe('<blockquote class="eleventy-plugin-embed-tiktok tiktok-embed" cite="https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877" data-video-id="6806676200652655877" style="max-width: 605px; min-width: 325px;"><section></section></blockquote>');
	});

	it("Custom wrapper class", () => {
		const config = merge(defaults, {embedClass: "foo"});
		const match = str.replace(pattern, (...match) => _replace(match, config, 0));
		expect(match).toBe('<blockquote class="foo tiktok-embed" cite="https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877" data-video-id="6806676200652655877" style="max-width: 605px; min-width: 325px;"><section></section></blockquote><script async defer src="https://www.tiktok.com/embed.js"></script>');
	});

	it("Custom max width", () => {
		const config = merge(defaults, {maxWidth: "500px"});
		const match = str.replace(pattern, (...match) => _replace(match, config, 0));
		expect(match).toBe('<blockquote class="eleventy-plugin-embed-tiktok tiktok-embed" cite="https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877" data-video-id="6806676200652655877" style="max-width: 500px; min-width: 325px;"><section></section></blockquote><script async defer src="https://www.tiktok.com/embed.js"></script>');
	});

	it("Custom min width", () => {
		const config = merge(defaults, {minWidth: "500px"});
		const match = str.replace(pattern, (...match) => _replace(match, config, 0));
		expect(match).toBe('<blockquote class="eleventy-plugin-embed-tiktok tiktok-embed" cite="https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877" data-video-id="6806676200652655877" style="max-width: 605px; min-width: 500px;"><section></section></blockquote><script async defer src="https://www.tiktok.com/embed.js"></script>');
	});

});
