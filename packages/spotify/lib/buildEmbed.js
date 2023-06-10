module.exports = function(media, options) {
	let out = `<div id="spotify-${media.type}-${media.id}" class="${options.embedClass} ${options.embedClass}-${media.type}">`;
	out += `<iframe style="${options.iframeStyle}" title="Spotify ${media.type}" src="https://open.spotify.com/embed/${media.type}/${media.id}" `;
	out += `width="${options.width}" height="${options.height}" `;
	out += `frameborder="0" allowtransparency="true" allow="${options.allowAttrs}" loading="${options.lazy ? 'lazy' : 'eager'}"></iframe>`;
	out += "</div>";
	return out;
};
