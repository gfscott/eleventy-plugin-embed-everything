import {federatedUrls, originUrls} from './_validUrls.mjs';

export const federatedStrings = urlsToParagraphs(federatedUrls);
export const originStrings = urlsToParagraphs(originUrls);


/**
 * For an array of URLs, return an array of paragraphs
 * in a variety of formats.
 * @param {array} urls - An array of URL strings
 * @returns {array} - An array of HTML paragraphs
 */
function urlsToParagraphs(urls) {
	return urls.flatMap(url => [
		// One line
		`<p>${url}</p>`,

		// Whitespace
		`<p>
				${url}
		</p>`,

		// One line, links
		`<p><a href="${url}">${url}</a></p>`,

		// Whitespace, links
		`<p>
				<a href="${url}">
					${url}
				</a>
		</p>`
	]);
}
