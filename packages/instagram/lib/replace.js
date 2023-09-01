const pattern = require("./pattern.js");
const scriptTag = '<script async defer src="https://www.instagram.com/embed.js"></script>';

module.exports = function(content, config) {
	let index = 0
	return content.replace(pattern, (...match) => {
		const id = match[3]
		const str = `<blockquote class="${config.embedClass} instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${id}"></blockquote>${index == 0 ? scriptTag : '' }`
		index++
		return str
	})
}