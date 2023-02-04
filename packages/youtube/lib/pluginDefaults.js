exports.pluginDefaults = {
  allowAttrs: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  allowAutoplay: false,
  allowFullscreen: true,
  embedClass: 'eleventy-plugin-youtube-embed',
  lazy: false,
  lite: false,
  noCookie: true
};

exports.liteDefaults = {
  css: {
    enabled: true,
    inline: false,
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css'
  },
  js: {
    enabled: true,
    inline: false,
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js'
  }
};
