import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { _getPostOembed, _replace } from '../lib/replace';
import config from '../lib/defaults.js';

// Mock API responses
import {server} from './_mocking.mjs';
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Query Bluesky posts via oEmbed', () => {

	// https://stackoverflow.com/a/76271250/26829947
	const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
	beforeEach(() => {
    vi.resetAllMocks();
  });

	it('Returns null if URL is missing', async () =>{
		const urlMissing = await _getPostOembed(undefined);
		expect(urlMissing).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Missing URL.')
	});

	it('Returns null if URL is invalid', async () =>{
		const urlInvalid = await _getPostOembed('https://example.com/invalid');
		expect(urlInvalid).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Error fetching post data from Bluesky', expect.any(Error))
	});

	it('Returns null if post is not found', async () =>{
		const post404 = await _getPostOembed('https://bsky.app/profile/bsky.app/post/0000000000000');
		expect(post404).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Error fetching post data from Bluesky', expect.any(Error))
	});

	it('Returns mock HTML if post exists', async () =>{
		const html = await _getPostOembed('https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
		expect(html).toBe('VALID_HTML');
	});

});

describe('Returns expected output', () => {

	// https://stackoverflow.com/a/76271250/26829947
	const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
	beforeEach(() => {
    vi.resetAllMocks();
  });

	it('Empty string on no match', async () =>{
		const noMatch = await _replace(undefined);
		expect(noMatch).toBe("");
	});

	it('Original string on no username', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', undefined, '3lgu4lg6j2k2v'];
		const html = await _replace(match, config);
		expect(html).toBe('https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
	});

	it('Original string on no post ID', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', undefined];
		const html = await _replace(match, config);
		expect(html).toBe('https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
	});

	it('Original string on error', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/0000000000000', 'bsky.app', '0000000000000'];
		const html = await _replace(match, config);
		expect(html).toBe('https://bsky.app/profile/bsky.app/post/0000000000000');
		expect(consoleMock).toHaveBeenCalledOnce()
	});

	it('Default settings', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const html = await _replace(match, config);
		expect(html).toBe('<div class="eleventy-plugin-embed-bluesky">VALID_HTML</div>');
	});

	it('Custom class name', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const customConfig = Object.assign({}, config, {embedClass: 'foo'});
		const html = await _replace(match, customConfig);
		expect(html).toBe('<div class="foo">VALID_HTML</div>');
	});

	it('Custom cache duration', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const customConfig = Object.assign({}, config, {cacheDuration: '2w'});
		const html = await _replace(match, customConfig);
		expect(html).toBe('<div class="eleventy-plugin-embed-bluesky">VALID_HTML</div>');
	});

});

describe('Forced error handling', () => {
	const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('Returns original string on forced error', async () =>{
		const match = ['https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v', 'bsky.app', '3lgu4lg6j2k2v'];
		const customConfig = Object.assign({}, config, {__forceError: true});
		const html = await _replace(match, customConfig);
		expect(html).toBe('https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
		expect(consoleMock).toHaveBeenCalledOnce()
	});
});
