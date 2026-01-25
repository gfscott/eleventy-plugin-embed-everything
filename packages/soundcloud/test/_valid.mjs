import permute from "permute-arrays";

const validPrefixes = ['', '//', 'http://', 'https://', 'www.', '//www.', 'http://www.', 'https://www.']
const validSuffixes = ['?', '?foo', '?foo=bar']

const artistUrls = permute(['soundcloud.com/earlxsweatshirtmusic'], validPrefixes, validSuffixes);
const trackUrls = permute(['soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies'], validPrefixes, validSuffixes);
const setUrls = permute(['soundcloud.com/earlxsweatshirtmusic/sets/earl-15'], validPrefixes, validSuffixes);

function createStrings(str) {
	return [
		`<p>${str}</p>`,
		`<p><a href="">${str}</a></p>`,
		`<p>
			${str}
		</p>`,
		`<p>
			<a href="">
				${str}
			</a>
		</p>`,
	]
}

export const artist = artistUrls.flatMap(url => createStrings(url));
export const track = trackUrls.flatMap(url => createStrings(url));
export const set = setUrls.flatMap(url => createStrings(url));
export const all = [...artist, ...track, ...set];
