const chalk = require('chalk');

module.exports = function(media, options) {

  /**
   * If the user hasn't set the "parent" value, print an error to the console
   * Default value is an empty string instead of null or undefined, to make it
   * more intuitively obvious to the user that it needs to be a string.
   * We coerce the empty string to falsy with the triple-bang trick.
   */
  if ( !!!options.parent ) {
    console.error(`⚠️  ${ chalk.red('Error embedding Twitch video') }
  Eleventy plugin ${chalk.cyan('eleventy-plugin-embed-twitch')} requires a \`parent\` option to be set.
  🔗  See ${chalk.cyan.underline('https://bit.ly/11ty-plugin-twitch-parent-error')} for details.`);
}
  
  // Build the string, using config data as we go
  // id based on channel or video id
  // TODO:
  // Channel ID could conceivably lead to multiple divs with the same ID in one page.
  // Is there a way to avoid this? What's the actual impact here?
  let out =
    `<div id="twitch-${media.id}" class="${options.embedClass}" `;

  // intrinsic aspect ratio; currently hard-coded to 16:9
  // TODO: make configurable somehow
  out += `style="position:relative;width:100%;padding-top: 56.25%;">`;
  
  out +=
    `<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" `;
  out += `width="100%" height="100%" frameborder="0" scrolling="no" `;
  out += `src="https://player.twitch.tv/?`;

  // TODO: more granular autoplay controls
  if ( media.type === 'channel' ) {
    out += `channel=${media.id}`;
    out += options.autoplayChannels ? `&autoplay=true` : `&autoplay=false`;
    out += `&parent=${options.parent}`;
    out += `"`;
  }
  if ( media.type === 'video' ){
    out += `video=${media.id}&autoplay=false`;
    out += `&parent=${options.parent}`;
    out += `"`;
  }
  out += ` allow="${options.allowAttrs}" allowfullscreen`
  out += '></iframe></div>';
  return out;
}