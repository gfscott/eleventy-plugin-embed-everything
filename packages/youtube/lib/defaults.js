const defaults = {
  allowAttrs: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  allowAutoplay: false,
  allowFullscreen: true,
  embedClass: 'eleventy-plugin-youtube-embed',
  lazy: false,
  lite: false,
  modestBranding: false,
  noCookie: true,
  recommendSelfOnly: false,
};

const thumbnails = {
  validSizes: ["default", "hqdefault", "mqdefault", "sddefault", "maxresdefault"],
  defaultSize: "hqdefault"
}

const liteDefaults = {
  css: {
    enabled: true,
    inline: false,
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css'
  },
  js: {
    enabled: true,
    inline: false,
    path: 'https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js'
  },
  responsive: false,
  thumbnailQuality: thumbnails.defaultSize,
};
  
module.exports.thumbnails = thumbnails;
module.exports.liteDefaults = liteDefaults;
module.exports.defaults = defaults;
