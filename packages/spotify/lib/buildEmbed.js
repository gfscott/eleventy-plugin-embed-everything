module.exports = function(media, options) {
	let out = `<div id="spotify-${media.type}-${media.id}" class="${options.embedClass} ${options.embedClass}-${media.type}">`;
	out += `<iframe title="${media.type} on Spotify" src="https://open.spotify.com/embed${media.type ===
	"episode"
		? "-podcast"
		: ""}/${media.type}/${media.id}" `;
	out += `width="${media.type === "episode" ? "100%" : options.width}" height="${media.type ===
	"episode"
		? "232"
		: options.height}" `;
	out += `frameborder="0" allowtransparency="true" allow="${options.allowAttrs}"></iframe>`;
	out += "</div>";
	return out;
};
