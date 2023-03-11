module.exports = function(match, config) {
  [, url] = match;
  // This is the most brittle, basic possible way to do this
  const embedUrl = url.replace(/www/, 'embed')
  
  // read URL
  // get URL information
  // massage the URL data
  // build the iframe
  
  return `<iframe class="${config.embedClass}" src="${embedUrl}" width="854" height="480" frameborder="0" scrolling="no" allowfullscreen></iframe>`


  // <div style="max-width:854px"><div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://embed.ted.com/talks/lang/en/mesmin_destin_how_everyday_interactions_shape_your_future" width="854" height="480" style="position:absolute;left:0;top:0;width:100%;height:100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div></div>
}