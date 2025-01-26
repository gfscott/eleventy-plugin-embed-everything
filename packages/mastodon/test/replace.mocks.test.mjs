// Vitest
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
// Mocking
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

import { _getFederatedStatus, _getOriginOembed } from '../lib/replace.js';

// Mocking
const statusData = {
	"url": "https://example.com"
}
const oembedData = {
	"type": "rich",
	"version": "1.0",
	"author_name": "Eleventy 🎈 v3.0.0",
	"author_url": "https://fosstodon.org/@eleventy",
	"provider_name": "fosstodon.org",
	"provider_url": "https://fosstodon.org/",
	"cache_age": 86400,
	"html": "OEMBED_HTML",
	"width": 400,
	"height": null
}
const mastodonApiError = {
	"error":"Record not found"
}

const restHandlers = [
	http.get('https://social.vivaldi.net/api/v1/statuses/:id', ({ params }) => {
		if (params.id === '404') {
			return HttpResponse.json(mastodonApiError, { status: 404 })
		}
		return HttpResponse.json(statusData)
	}),
	http.get('https://fosstodon.org/api/oembed', ({request}) => {
		const url = new URL(request.url);
		const statusUrl = url.searchParams.get('url');
		if (statusUrl === 'https://nonexistent.com') {
			return HttpResponse.json(mastodonApiError, { status: 404 })
		}
		return HttpResponse.json(oembedData)
	}),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen())

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())

describe('Query Mastodon status', () => {
	it('Queries federated server for original URL', async () => {
		const originUrl = await _getFederatedStatus('social.vivaldi.net', '123')
		expect(originUrl).toBe("https://example.com")
	});

	it('Returns null on HTTP 404 status', async () => {
		const originUrl = await _getFederatedStatus('social.vivaldi.net', '404')
		expect(originUrl).toBe(null)
	});
});

describe('Query oembed data', () => {
	it('Queries oembed data ', async () => {
		const oembedHtml = await _getOriginOembed('fosstodon.org', 'https://example.com')
		expect(oembedHtml).toBe("OEMBED_HTML")
	});

	it('Returns null on HTTP 404 status', async () => {
		const oembedHtml = await _getOriginOembed('fosstodon.org', 'https://nonexistent.com')
		expect(oembedHtml).toBe(null);
	});
});
