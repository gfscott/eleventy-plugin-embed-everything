import test from "ava";
import pattern from "../lib/pattern.js";
import replace from "../lib/replace.js";
import { validUrls } from "./_validUrls.mjs";

test("Creates valid embed HTML with default domain", (t) => {
	const url = "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v";
	const matches = pattern.exec(`<p>${url}</p>`);
	const result = replace(matches, {
		embedDomain: "bsky.app",
		embedClass: "eleventy-plugin-embed-bluesky",
		containerCss: "width: 100%;",
		iframeCss: "width: 100%; border: 0;",
		iframeWidth: "550",
		iframeHeight: "300",
		iframeFrameborder: "0",
		iframeScrolling: "no",
		allowFullscreen: true,
	});

	t.true(
		result.includes('class="eleventy-plugin-embed-bluesky"'),
		"Should include the default class",
	);
	t.true(
		result.includes(
			'src="https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v/embed"',
		),
		"Should use correct embed URL",
	);
	t.true(result.includes('width="550"'), "Should include width");
	t.true(result.includes('height="300"'), "Should include height");
	t.true(result.includes("allowfullscreen"), "Should include allowfullscreen");
});

test("Supports staging domain", (t) => {
	const url = "https://staging.bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v";
	const matches = pattern.exec(`<p>${url}</p>`);
	const result = replace(matches, {
		embedDomain: "staging.bsky.app",
		embedClass: "eleventy-plugin-embed-bluesky",
		containerCss: "width: 100%;",
		iframeCss: "width: 100%; border: 0;",
		iframeWidth: "550",
		iframeHeight: "300",
		iframeFrameborder: "0",
		iframeScrolling: "no",
		allowFullscreen: true,
	});

	t.true(
		result.includes(
			'src="https://staging.bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v/embed"',
		),
		"Should use staging domain for embed",
	);
});

test("Supports custom domain", (t) => {
	const url = "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v";
	const matches = pattern.exec(`<p>${url}</p>`);
	const result = replace(matches, {
		embedDomain: "custom.example.com",
		embedClass: "eleventy-plugin-embed-bluesky",
		containerCss: "width: 100%;",
		iframeCss: "width: 100%; border: 0;",
		iframeWidth: "550",
		iframeHeight: "300",
		iframeFrameborder: "0",
		iframeScrolling: "no",
		allowFullscreen: true,
	});

	t.true(
		result.includes(
			'src="https://custom.example.com/profile/bsky.app/post/3lgu4lg6j2k2v/embed"',
		),
		"Should use custom domain for embed",
	);
});

test("Handles invalid match gracefully", (t) => {
	const result = replace(null, {
		embedDomain: "bsky.app",
		embedClass: "eleventy-plugin-embed-bluesky",
	});

	t.is(result, "", "Should return empty string for invalid match");
});

/**
 * Test embed generation with valid strings
 */
validUrls.forEach((str) => {
	test(`Generates valid embed: ${str}`, (t) => {
		const matches = pattern.exec(`<p>${str}</p>`);
		t.truthy(matches, "Should find pattern matches");

		const result = replace(matches, {
			embedDomain: "bsky.app",
			embedClass: "eleventy-plugin-embed-bluesky",
			containerCss: "width: 100%;",
			iframeCss: "width: 100%; border: 0;",
			iframeWidth: "550",
			iframeHeight: "300",
			iframeFrameborder: "0",
			iframeScrolling: "no",
			allowFullscreen: true,
		});

		t.true(
			result.includes('class="eleventy-plugin-embed-bluesky"'),
			"Should include default class",
		);
		t.true(result.includes("iframe"), "Should create iframe element");
		t.true(result.includes('/embed"'), "Should use embed endpoint");

		// Extract handle and post ID from the URL for verification
		const urlParts = str.match(/\/profile\/([^/]+)\/post\/([^/?]+)/);
		t.truthy(urlParts, "Should be able to parse URL parts");

		const [_, handle, postId] = urlParts;
		t.true(
			result.includes(`/profile/${handle}/post/${postId}/embed`),
			"Should use correct handle and post ID",
		);
	});
});
