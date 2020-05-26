module.exports = function(media, options, index) {
  let out = '<blockquote';
    // class MUST include "tiktok-embed" because TikToks script uses it for DOM parsing
    out += ` class="${options.embedClass} tiktok-embed"`;
    out += ` cite="https://www.tiktok.com/${media.user}/video/${media.id}"`;
    out += ` data-video-id="${media.id}"`;
    out += ` style="max-width: ${options.maxWidth}; min-width: ${options.minWidth};">`;
    out += '<section></section>';
    out += '</blockquote>';
    // Only add the script tag on the first instance per page, otherwise script tag added multiple times
    out += index === 0 ? '<script async defer src="https://www.tiktok.com/embed.js"></script>' : '';
    return out;
}