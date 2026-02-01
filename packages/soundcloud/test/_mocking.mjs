import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Handlers
const restHandlers = [

	http.get('https://soundcloud.com/oembed', ({request}) => {
		const url = new URL(request.url);
		const statusUrl = url.searchParams.get('url');

		// Non-existent status returns 404
		if (statusUrl === 'https://soundcloud.com/nonexistentuser/nonexistenttrack') {
			return HttpResponse.json(null, { status: 404 })
		}

		// Success. There's more to the complete response but we only use these
		return HttpResponse.json({
			"html": "OEMBED_HTML",
			"title": "OEMBED_TITLE"
		})
	}),
]

export const server = setupServer(...restHandlers)
