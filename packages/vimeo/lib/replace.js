module.exports = function(match, config) {
  const id = match[3]

  let embed = `<div id="vimeo-${id}" class="${config.embedClass}" style="${config.wrapperStyle}">`;
  embed += `<iframe style="${config.iframeStyle}" frameborder="0"`;
  embed += ` src="https://player.vimeo.com/video/${id}?dnt=${config.dnt ? 1 : 0}"`;
  embed += `${config.allowFullscreen ? ' allowfullscreen' : ''}></iframe></div>`;

	return embed;
}
