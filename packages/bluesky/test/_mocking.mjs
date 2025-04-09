import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Handlers
const restHandlers = [
	http.get('https://embed.bsky.app/oembed', ({request}) => {

		const bskyUrl = new URL(request.url).searchParams.get('url');

		// Missing `url` parameter
		if (!bskyUrl) {
			return HttpResponse.text("Expected 'url' to be bsky.app URL or AT-URI: empty url", { status: 400 })
		}

		// Invalid `url` parameter
		if (bskyUrl === 'https://example.com/invalid') {
			return HttpResponse.text("Expected 'url' to be bsky.app URL or AT-URI: only bsky.app URLs currently supported", { status: 400 })
		}

		// Valid url that doesn't exist
		if (bskyUrl === 'https://bsky.app/profile/bsky.app/post/0000000000000') {
			return HttpResponse.text('post not found', { status: 404 })
		}

		// Valid status
		if (bskyUrl === 'https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v') {
			return HttpResponse.json({"html":"VALID_HTML",})
		}
	})
]

export const server = setupServer(...restHandlers)
