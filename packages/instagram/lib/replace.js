// module.exports = function(id, options, index) {
//   let out = '<blockquote ';
//     // class MUST include "instagram-media" because Instagram's script uses it for DOM parsing
//     out += `class="${options.embedClass} instagram-media"`;
//     out += ` data-instgrm-permalink="https://www.instagram.com/p/${id}">`;
//     out += '</blockquote>';
//     // Only add the script tag on the first instance per page, otherwise script tag added multiple times
//     out += index === 0 ? '<script async defer src="https://www.instagram.com/embed.js"></script>' : '';
//     return out;
// }

module.exports = function(match, config, index) {
	console.log(index)
	const id = match[3]
	let embed = `<blockquote class="${config.embedClass} instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${id}"></blockquote>`
  return embed;
}
