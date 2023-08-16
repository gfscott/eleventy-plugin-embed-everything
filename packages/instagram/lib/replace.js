module.exports = function(match, config, index) {
	const id = match[3]
	const scriptTag = '<script async defer src="https://www.instagram.com/embed.js"></script>';
	return `<blockquote class="${config.embedClass} instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${id}"></blockquote>${index == 0 ? scriptTag : '' }`;
}
