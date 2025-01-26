import { describe, it, expect } from 'vitest';
import { _getFederatedStatus, _getOriginOembed } from '../lib/replace.js';

describe('Query Mastodon status', () => {
	it('Returns null if missing hostname', async () => {
		const noHostname = await _getFederatedStatus(undefined, '123')
		expect(noHostname).toBe(null)
	});
	it('Returns null if missing id', async () => {
		const noId = await _getFederatedStatus('social.vivaldi.net', undefined)
		expect(noId).toBe(null)
	});
	it('Returns null if missing both parameters', async () => {
		const neither = await _getFederatedStatus()
		expect(neither).toBe(null)
	});
});

describe('Query oembed data', () => {
	it('Returns null if missing hostname', async () =>{
		const noHostname = await _getOriginOembed(undefined, 'https://example.com');
		expect(noHostname).toBe(null);
	});
	it('Returns null if missing url', async () =>{
		const noUrl = await _getOriginOembed('fosstodon.org', undefined);
		expect(noUrl).toBe(null);
	});
	it('Returns null if missing both parameters', async () =>{
		const neither = await _getOriginOembed();
		expect(neither).toBe(null);
	});
});
