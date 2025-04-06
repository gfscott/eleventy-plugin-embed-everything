import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { _getPostOembed } from '../lib/replace';

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
		const noHostname = await _getPostOembed(undefined);
		expect(noHostname).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Missing URL.')
	});

	it('Returns null if URL is invalid', async () =>{
		const noHostname = await _getPostOembed('https://example.com/invalid');
		expect(noHostname).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Error fetching post data from Bluesky', expect.any(Error))
	});

	it('Returns null if post is not found', async () =>{
		const noHostname = await _getPostOembed('https://bsky.app/profile/bsky.app/post/0000000000000');
		expect(noHostname).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Error fetching post data from Bluesky', expect.any(Error))
	});

	it('Returns mock HTML if post exists', async () =>{
		const html = await _getPostOembed('https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v');
		expect(html).toBe('VALID_HTML');
	});


});
