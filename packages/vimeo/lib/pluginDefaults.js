module.exports = {
  allowFullscreen: true,
  dnt: true,
  embedClass: 'eleventy-plugin-vimeo-embed',
  
  /**
   * By default, uses the Intrinsic Aspect Ratio technique
   * https://codepen.io/gfscott/pen/qpKqZR?editors=1100
   * Pass an options object with alternate inline styles to override
   */
  iframeStyle: 'position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;',
  wrapperStyle: 'position:relative;width:100%;padding-top:56.25%;',
};