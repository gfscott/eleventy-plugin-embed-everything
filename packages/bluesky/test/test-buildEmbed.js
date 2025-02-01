const test = require("ava");
const deepmerge = require("deepmerge");
const buildEmbed = require("../lib/buildEmbed.js");
const buildOptions = require("../lib/buildOptions.js");
const extractMatch = require("../lib/extractMatch.js");
const pluginDefaults = require("../lib/pluginDefaults.js");
const validStrings = require("./_validStrings.js");

/**
 * TEST: Build script returns expected HTML string, given valid input and default options
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} default embed behavior`, async (t) => {
		const idealCase = `<p>${obj.str}</p>`;
		const postObj = extractMatch(idealCase);
		const output = await buildEmbed(postObj, pluginDefaults);
		const expected = `<div class="eleventy-plugin-embed-bluesky"><iframe src="https://bsky.app/profile/${postObj.handle}/post/${postObj.postId}/embed" style="width: 100%; height: 300px;" frameborder="0"></iframe></div>`;
		t.is(output, expected);
	});
});

/**
 * TEST: Build script returns expected HTML string with custom height
 */
validStrings.forEach(function (obj) {
	test(`${obj.type} custom height`, async (t) => {
		const customHeight = deepmerge(pluginDefaults, { height: 500 });
		const idealCase = `<p>${obj.str}</p>`;
		const postObj = extractMatch(idealCase);
		const output = await buildEmbed(postObj, customHeight);
		const expected = `<div class="eleventy-plugin-embed-bluesky"><iframe src="https://bsky.app/profile/${postObj.handle}/post/${postObj.postId}/embed" style="width: 100%; height: 500px;" frameborder="0"></iframe></div>`;
		t.is(output, expected);
	});
});

/**
 * TEST: Build script returns expected HTML string
 */
validStrings.forEach((testCase) => {
	test(`Build embed: ${testCase.type}`, async (t) => {
		const post = extractMatch(`<p>${testCase.str}</p>`);
		const embedHtml = await buildEmbed(post, pluginDefaults);
		t.truthy(embedHtml);
		t.true(embedHtml.includes("iframe"));
		t.true(embedHtml.includes(post.handle));
		t.true(embedHtml.includes(post.postId));
	});
});
