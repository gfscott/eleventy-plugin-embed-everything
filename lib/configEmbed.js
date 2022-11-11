module.exports = function(str, options) {

  // convenience setting to use the smaller player, overrides visual and height
  if ( options.small ) {
    options.visual = false
    options.height = 166
  }
  
  // get the iframe src as provided by SoundCloud
  let [, src] = str.match(/src="(.+?)"/);
  
  // parse the "url" param to get the track URL
  let embedUrl = new URL(src).searchParams.get('url');
  
  // compile the player params
  let params = '';
  for ( let option in options ){
    // stuff not set with URL params
    const exclude = ['height', 'width', 'small', 'embedClass'];
    if ( exclude.indexOf(option) < 0 ) {
      params += `${option}=${encodeURIComponent(options[option])}&`;
    } else {
      params += '';
    }
  }

  // build the embed HTML
  let out = `<div class="${options.embedClass}">`;
      out += `<iframe title="${options.iframeTitle}" width="${options.width}" height="${options.height}" scrolling="no" frameborder="no" allow="autoplay" `;
      out += `src="https://w.soundcloud.com/player/?url=${encodeURIComponent(embedUrl)}&${params}"></iframe>`;
      out += `</div>`;

  return out;
}