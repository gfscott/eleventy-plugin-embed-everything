module.exports = function(match, options, index) {

	const type = match[3];
	const id = match[4];

	let out = '<blockquote';
	// class MUST include "instagram-media" because Instagram's script uses it for DOM parsing
	out += ` class="${options.embedClass} instagram-media"`;
	out += ` data-instgrm-permalink="https://www.instagram.com/${type}/${id}">`;
	out += '</blockquote>';

	// Only add the script tag on the first instance per page
	if (index === 0) {
		out += '<script async defer src="https://www.instagram.com/embed.js"></script>';
	}

	return out;
}
