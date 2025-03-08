import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import merge from 'deepmerge';
import { _getFederatedStatus, _getOriginOembed } from '../lib/replace.js';
import asyncReplace from 'string-replace-async';
import defaults from '../lib/defaults.js';
import replace from '../lib/replace.js';
import patternGenerator from '../lib/pattern.js';

// Mock API responses
// Mostly mocking is beneficial because Mastodon API response times and reliability
// are all over the place.
import {server} from './_mocking.mjs';
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Query Mastodon status', () => {

	// https://stackoverflow.com/a/76271250/26829947
	const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  beforeEach(() => {
    vi.resetAllMocks();
  });

	it('Returns null if missing hostname', async () => {
		const noHostname = await _getFederatedStatus(undefined, '123')
		expect(noHostname).toBe(null)
		expect(consoleMock).toHaveBeenCalledOnce();
		expect(consoleMock).toHaveBeenCalledWith('Missing Mastodon instance or status ID.');
	});
	it('Returns null if missing id', async () => {
		const noId = await _getFederatedStatus('social.vivaldi.net', undefined)
		expect(noId).toBe(null)
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Missing Mastodon instance or status ID.')
	});
	it('Returns null if missing both parameters', async () => {
		const neither = await _getFederatedStatus()
		expect(neither).toBe(null)
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Missing Mastodon instance or status ID.')
	});
	it('Queries federated server for original URL', async () => {
		const originUrl = await _getFederatedStatus('social.vivaldi.net', '123')
		expect(originUrl).toBe("https://fosstodon.org/@eleventy/113198584376721364")
	});

	it('Returns null on HTTP 404 status', async () => {
		const originUrl = await _getFederatedStatus('social.vivaldi.net', '000000000000000000')
		expect(originUrl).toBe(null)
	});
});

describe('Query oembed data', () => {

	const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  beforeEach(() => {
    vi.resetAllMocks();
  });

	it('Returns null if missing hostname', async () =>{
		const noHostname = await _getOriginOembed(undefined, 'https://fosstodon.org');
		expect(noHostname).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Missing hostname or URL.')

	});
	it('Returns null if missing url', async () =>{
		const noUrl = await _getOriginOembed('fosstodon.org', undefined);
		expect(noUrl).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Missing hostname or URL.')
	});
	it('Returns null if missing both parameters', async () =>{
		const neither = await _getOriginOembed();
		expect(neither).toBe(null);
		expect(consoleMock).toHaveBeenCalledOnce()
		expect(consoleMock).toHaveBeenCalledWith('Missing hostname or URL.')
	});
	it('Queries oembed data', async () => {
		const oembedHtml = await _getOriginOembed('fosstodon.org', 'https://fosstodon.org/@eleventy/113198584376721364')
		expect(oembedHtml).toBe("OEMBED_HTML")
	});

	it('Returns null on HTTP 404 status', async () => {
		const oembedHtml = await _getOriginOembed('fosstodon.org', 'https://fosstodon.org/@eleventy/000000000000000000')
		expect(oembedHtml).toBe(null);
	});
});

describe('Graceful failures', () => {

	it('Returns original input if match not found', async () => {
		const config = merge(defaults, {server: 'social.vivaldi.net'});
		const pattern = patternGenerator(config.server);
		const content = "<p>Foo bar baz</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(content);
	});

	it('Returns original input config.server is not set', async () => {
		const config = defaults;
		const pattern = patternGenerator(config.server);
		const content = "<p>https://social.vivaldi.net/@eleventy@fosstodon.org/113198584572922516</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(content);
	});

	it('Returns original input if API query for origin status ID fails', async () => {
		const config = merge(defaults, {server: 'social.vivaldi.net'});
		const pattern = patternGenerator(config.server);
		const content = "<p>https://social.vivaldi.net/@eleventy@fosstodon.org/000000000000000000</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(content);
	});

	it('Returns original input if oembed response fails', async () => {
		const config = merge(defaults, {server: 'social.vivaldi.net'});
		const pattern = patternGenerator(config.server);
		const content = "<p>https://social.vivaldi.net/@eleventy@fosstodon.org/111111111111111111</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(content);
	});


});

describe('Returns expected HTML', () => {

	// This is the mock HTML string returned by ./_mocking.mjs.
	const mockOEmbedResponse = "OEMBED_HTML"

	it('Origin server status', async () => {
		const config = merge(defaults, {server: 'fosstodon.org'});
		const pattern = patternGenerator(config.server);
		const content = "<p>https://fosstodon.org/@eleventy/113198584376721364</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(`<div class="eleventy-plugin-embed-mastodon">${mockOEmbedResponse}</div>`);
	});

	it('Federated server status', async () => {
		const config = merge(defaults, {server: 'social.vivaldi.net'});
		const pattern = patternGenerator(config.server);
		const content = "<p>https://social.vivaldi.net/@eleventy@fosstodon.org/113198584572922516</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(`<div class="eleventy-plugin-embed-mastodon">${mockOEmbedResponse}</div>`);
	});

	it('With extraneous URL params', async () => {
		const config = merge(defaults, {server: 'social.vivaldi.net'});
		const pattern = patternGenerator(config.server);
		const content = "<p>https://social.vivaldi.net/@eleventy@fosstodon.org/113198584572922516?foo=bar&baz</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(`<div class="eleventy-plugin-embed-mastodon">${mockOEmbedResponse}</div>`);
	});

	it('Custom wrapper class', async () => {
		const config = merge(defaults, {embedClass: 'foo', server: 'social.vivaldi.net'});
		const pattern = patternGenerator(config.server);
		const content = "<p>https://social.vivaldi.net/@eleventy@fosstodon.org/113198584572922516</p>";

		const output = await asyncReplace(content, pattern, (...match) => replace(match, config));
		expect(output).toBe(`<div class="foo">${mockOEmbedResponse}</div>`);
	});

});
