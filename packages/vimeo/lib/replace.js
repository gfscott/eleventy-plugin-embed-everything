module.exports = function(match, config) {
  const {id} = match[3]

  let embed = `<div id="vimeo-${id}" class="${config.embedClass}" style="${config.containerCss}">`
  embed += `<iframe
		style="${config.iframeStyle}"
		frameborder="0"
		src="https://player.vimeo.com/video/${id}?dnt=${config.dnt ? 1 : 0}"
		${config.allowFullscreen ? 'allowfullscreen' : ''}
		></iframe></div>`

  return embed;
}
