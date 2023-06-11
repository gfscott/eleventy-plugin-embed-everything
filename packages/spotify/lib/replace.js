module.exports = function(media, options) {

	const [, , , type, id] = media

	let out = `<div id="spotify-${type}-${id}" class="${options.embedClass} ${options.embedClass}-${type}">`;
	out += `<iframe style="${options.iframeStyle}" title="Spotify ${type}" src="https://open.spotify.com/embed/${type}/${id}" `;
	out += `width="${options.width}" height="${options.height}" `;
	out += `frameborder="0" allowtransparency="true" allow="${options.allowAttrs}" loading="${options.lazy ? 'lazy' : 'eager'}"></iframe>`;
	out += "</div>";
	return out;
};
