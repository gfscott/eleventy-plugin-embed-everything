module.exports = function(match, config) {
  const theUrl = match[3].startsWith('http') ? match[3] : `https://${match[3]}`;
  
  const {pathname} = new URL(theUrl);
  const embedUrl = `https://embed.ted.com${pathname}`
  
  let embed = `<div class="${config.embedClass}" style="${config.containerCss}">`
  embed += `<iframe src="${embedUrl}" style="${config.iframeCss}" width="${config.iframeWidth}" height="${config.iframeHeight}" frameborder="${config.iframeFrameborder}" scrolling="${config.iframeScrolling}" ${config.allowFullscreen ? 'allowfullscreen' : ''}></iframe>`
  embed += "</div>"
  
  return embed;
}