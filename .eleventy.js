// Needs to be in global context to be accessed by module
global.instagram = require('eleventy-plugin-embed-instagram');
global.soundcloud = require('eleventy-plugin-embed-soundcloud');
global.spotify = require('eleventy-plugin-embed-spotify');
global.vimeo = require('eleventy-plugin-vimeo-embed');
global.youtube = require('eleventy-plugin-youtube-embed');

module.exports = function(eleventyConfig, options) {

  // every valid embed offered
  const validEmbeds = [
    'instagram',
    'soundcloud',
    'spotify',
    'vimeo',
    'youtube'
  ];

  // embeds offered by default
  const defaultEmbeds = [
    'instagram',
    'spotify',
    'vimeo',
    'youtube'
  ];

  // active embeds on this instance
  // if user has requested a non-default list of embeds, validate and activate the valid ones
  let activeEmbeds = options && options.use ? validateEmbeds(options.use) : defaultEmbeds;
  // dynamically build default settings
  let activeEmbedOptions = {};
  activeEmbeds.forEach(function(embed){
    // Parsing a string this way is a hack, but the alternative is using eval
    let str = '{"'+ embed + '":{"options":{}}}';
    let obj = JSON.parse(str);
    activeEmbedOptions = Object.assign(activeEmbedOptions, obj, options);
  });

  // for each valid embed being used, call it in eleventy
  activeEmbeds.forEach(function(embedName){
    eleventyConfig.addPlugin(global[embedName], activeEmbedOptions[embedName].options);
  });

  // Helper functions
  function validateEmbeds(arr){
    let out = [];
    arr.forEach(str => {
      if(validEmbeds.indexOf(str) > -1){
        out.push(str);
        console.info("✅  Embeds are active for “" + str + "”.");
      } else {
        console.error("🛑  Sorry, “" + str + "” is not supported by this plugin right now.");
      }
    });
    return out;
  };

};
