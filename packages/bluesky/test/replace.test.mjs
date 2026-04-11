import { describe, it, beforeEach, afterEach, before, after, mock } from 'node:test';
import assert from 'node:assert/strict';
import { _getPostOembed, _replace } from '../lib/replace.js';
import config from '../lib/defaults.js';

// Mock API responses
import {server} from './_mocking.mjs';
before(() => server.listen())
after(() => server.close())
afterEach(() => {
	server.resetHandlers()
	mock.restoreAll()
})

describe('Query Bluesky posts via oEmbed', () => {

	// https://stackoverflow.com/a/76271250/26829947
	let consoleMock;
  beforeEach(() => {
    consoleMock = mock.method(console, 'error', () => undefined);
  });

	it('Returns null if URL is missing', async () =>{
		const urlMissing = await _getPostOembed(undefined);
		assert.equal(urlMissing, null);
		assert.equal(consoleMock.mock.calls.length, 1);
		assert.deepEqual(consoleMock.mock.calls[0].arguments, ['Missing URL.']);
	});

	it('Returns null if URL is invalid', async () =>{
		const urlInvalid = await _getPostOembed('https://example.com/invalid');
		assert.equal(urlInvalid, null);
		assert.equal(consoleMock.mock.calls.length, 1);
		assert.equal(consoleMock.mock.calls[0].arguments[0], 'Error fetching post data from Bluesky'); assert.ok(consoleMock.mock.calls[0].arguments[1] instanceof Error);
	});

	it('Returns null if post is not found', async () =>{
		const post404 = await _getPostOembed('https://bsky.app/profile/bsky.app/post/0000000000000');
		assert.equal(post404, null);
		assert.equal(consoleMock.mock.calls.length, 1);
		assert.equal(consoleMock.mock.calls[0].arguments[0], 'Error fetching post data from Bluesky'); assert.ok(consoleMock.mock.calls[0].arguments[1] instanceof Error);
	});

	it('Returns mock HTML if post exists', async () =>{
		const html = await _getPostOembed('https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
		assert.equal(html, 'VALID_HTML');
	});

});

describe('Returns expected output', () => {

	// https://stackoverflow.com/a/76271250/26829947
	let consoleMock;
  beforeEach(() => {
    consoleMock = mock.method(console, 'error', () => undefined);
  });

	it('Empty string on no match', async () =>{
		const noMatch = await _replace(undefined);
		assert.equal(noMatch, "");
	});

	it('Original string on no username', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', undefined, '3lgu4lg6j2k2v'];
		const html = await _replace(match, config);
		assert.equal(html, 'https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
	});

	it('Original string on no post ID', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', undefined];
		const html = await _replace(match, config);
		assert.equal(html, 'https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
	});

	it('Original string on error', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/0000000000000', 'bsky.app', '0000000000000'];
		const html = await _replace(match, config);
		assert.equal(html, 'https://bsky.app/profile/bsky.app/post/0000000000000');
		assert.equal(consoleMock.mock.calls.length, 1);
	});

	it('Default settings', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const html = await _replace(match, config);
		assert.equal(html, '<div class="eleventy-plugin-embed-bluesky">VALID_HTML</div>');
	});

	it('Custom class name', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const customConfig = Object.assign({}, config, {embedClass: 'foo'});
		const html = await _replace(match, customConfig);
		assert.equal(html, '<div class="foo">VALID_HTML</div>');
	});

	it('Custom cache duration', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const customConfig = Object.assign({}, config, {cacheDuration: '2w'});
		const html = await _replace(match, customConfig);
		assert.equal(html, '<div class="eleventy-plugin-embed-bluesky">VALID_HTML</div>');
	});

});

describe('Forced error handling', () => {
	let consoleMock;
	beforeEach(() => {
		consoleMock = mock.method(console, 'error', () => undefined);
	});
	afterEach(() => {
		mock.restoreAll();
	});

	it('Returns original string on forced error', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const customConfig = Object.assign({}, config, {__forceError: true});
		const html = await _replace(match, customConfig);
		assert.equal(html, 'https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
	assert.equal(consoleMock.mock.calls.length, 1);
	});
});
