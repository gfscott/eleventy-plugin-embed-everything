const merge = require("deepmerge");
const defaults = require("./pluginDefaults.js");

/**
 * Build options object by merging defaults with user options
 * @param {Object} options - User-provided options
 * @returns {Object} - Complete options object
 */
module.exports = function(options = {}) {
  // Deep merge user options with defaults
  const opts = merge(defaults, options);
  
  // Validate and normalize options
  opts.width = parseInt(opts.width, 10) || defaults.width;
  opts.maxEmbeds = parseInt(opts.maxEmbeds, 10) || defaults.maxEmbeds;
  
  // Ensure cache duration is valid
  if (typeof opts.cacheDuration !== 'string' || !opts.cacheDuration.match(/^\d+[hdwmy]$/)) {
    opts.cacheDuration = defaults.cacheDuration;
  }
  
  // Ensure oEmbed endpoint is valid
  if (typeof opts.oEmbedEndpoint !== 'string' || !opts.oEmbedEndpoint.startsWith('https://')) {
    opts.oEmbedEndpoint = defaults.oEmbedEndpoint;
  }

  return opts;
};
