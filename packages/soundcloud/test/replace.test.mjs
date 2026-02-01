import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { _getPostOembed, _getParamsFromOptions, _getApiUrlFromOembedHtml } from '../lib/replace.js';
import defaults from '../lib/defaults.js';
import _replace from '../lib/replace.js';



// Mock API responses
import {server} from './_mocking.mjs';
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
	server.resetHandlers();
	// Restore any spies/mocks created by vi.spyOn between tests so calls don't accumulate
	vi.restoreAllMocks();
})


describe('Query SoundCloud oembed', () => {

	// https://stackoverflow.com/a/76271250/26829947
	let consoleMock;
  beforeEach(() => {
    consoleMock = vi.spyOn(console, 'error');
  });

		it('Returns null on HTTP 404 status', async () => {
			const oembedHtml = await _getPostOembed('https://soundcloud.com/nonexistentuser/nonexistenttrack', defaults);
			expect(oembedHtml).toBe(null);
		});

		it('Queries oembed data', async () => {
		const oembedHtml = await _getPostOembed('https://soundcloud.com/existentuser/existenttrack', defaults);
		expect(oembedHtml).toStrictEqual({html: 'OEMBED_HTML', title: 'OEMBED_TITLE'});
	});

});


describe('_getApiUrlFromOembedHtml', () => {
	it('Extracts API URL from oEmbed HTML', () => {
		const html = '<iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F24883142&visual=true"></iframe>';
		const apiUrl = _getApiUrlFromOembedHtml(html);
		expect(apiUrl).toBe('https://api.soundcloud.com/users/24883142');
	});

	it('Returns null if iframe src is absent', () => {
		const html = '<div>No iframe here</div>';
		const apiUrl = _getApiUrlFromOembedHtml(html);
		expect(apiUrl).toBe(null);
	});
});

describe('_getParamsFromOptions', () => {
	it('Converts options to URL params as expected', () => {
		const options = {
			auto_play: true,
			color: 'ff5500',
			sharing: false,
			show_artwork: false,
			show_comments: false,
			show_playcount: false,
			show_reposts: true,
			show_teaser: true,
			show_user: false,
		};

		const paramsString = _getParamsFromOptions(options);
		const params = new URLSearchParams(paramsString);

		expect(params.get('auto_play')).toBe('true');
		expect(params.get('color')).toBe('ff5500');
		expect(params.get('sharing')).toBe('false');
		expect(params.get('show_artwork')).toBe('false');
		expect(params.get('show_comments')).toBe('false');
		expect(params.get('show_playcount')).toBe('false');
		expect(params.get('show_reposts')).toBe('true');
		expect(params.get('show_teaser')).toBe('true');
		expect(params.get('show_user')).toBe('false');

	});

	it('Excludes expected parameters', () => {
		const options = {
			height: 166,
			width: 500,
			embedClass: 'custom-class',
			iframeTitle: 'Custom Title',
			cacheDuration: 4000,
		};

		const paramsString = _getParamsFromOptions(options);
		const params = new URLSearchParams(paramsString);

		expect(params.get('height')).toBe(null); // Excluded
		expect(params.get('width')).toBe(null);  // Excluded
		expect(params.get('embedClass')).toBe(null); // Excluded
		expect(params.get('iframeTitle')).toBe(null); // Excluded
		expect(params.get('cacheDuration')).toBe(null); // Excluded
	});
});

describe('Forced error handling', () => {
	let consoleMock;
	beforeEach(() => {
		consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
	});
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Returns original string on forced error', async () =>{
		const match = ['INPUT_STRING', '', '', '/earlxsweatshirtmusic'];
		const customConfig = Object.assign({}, defaults, {__forceError: true});
		const html = await _replace(match, customConfig);
		expect(html).toBe('INPUT_STRING');
		expect(consoleMock).toHaveBeenCalledOnce();
		expect(consoleMock).toHaveBeenCalledWith('Error creating SoundCloud embed:', expect.objectContaining({ message: 'Forced error for testing' }));
	});
});
