import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// This simulates the real error returned by the Mastodon API
const mastodonApiError = {
	"error":"Record not found"
}

// Handlers
const restHandlers = [
	http.get('https://social.vivaldi.net/api/v1/statuses/:id', ({ params }) => {

		// Non-existent status
		if (params.id === '000000000000000000') {
			return HttpResponse.json(mastodonApiError, { status: 404 })
		}

		// Status exists, but this will simulate a failing oembed response below
		if (params.id === '111111111111111111') {
			return HttpResponse.json({"url": "https://fosstodon.org/@eleventy/111111111111111111"})
		}

		// Existing status
		return HttpResponse.json({"url": "https://fosstodon.org/@eleventy/113198584376721364"})
	}),


	http.get('https://fosstodon.org/api/oembed', ({request}) => {
		const url = new URL(request.url);
		const statusUrl = url.searchParams.get('url');

		// Non-existent status returns 404
		if (statusUrl === 'https://fosstodon.org/@eleventy/000000000000000000') {
			return HttpResponse.json(mastodonApiError, { status: 404 })
		}

		// Existing status, but this simulates a failing oembed response.
		// TODO: In reality this is probably more like a network error/timeout but it'll do for now
		if (statusUrl === 'https://fosstodon.org/@eleventy/111111111111111111') {
			return HttpResponse.json(mastodonApiError, { status: 404 })
		}

		// Success. Production endpoints return more, but the HTML string
		// is the only data that actually gets used and it's really long.
		return HttpResponse.json({"html": "OEMBED_HTML"})
	}),
]

export const server = setupServer(...restHandlers)
