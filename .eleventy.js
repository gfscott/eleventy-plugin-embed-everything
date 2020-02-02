global.instagram = require('eleventy-plugin-instagram-embed');
global.youtube = require('eleventy-plugin-youtube-embed');

module.exports = function(eleventyConfig, options) {

  // every valid embed offered
  const validEmbeds = ['instagram', 'youtube'];
  // embeds offered by default
  const defaultEmbeds = ['instagram', 'youtube'];
  // dynamically build default settings
  let defaultOptions = {};
  validEmbeds.forEach(function(embed){
    // this is kind of ugly
    let str = '{"'+ embed + '":{"options":{}}}';
    let obj = JSON.parse(str);
    defaultOptions = Object.assign({}, defaultOptions, obj);
  });
  defaultOptions.use = options && options.use ? validateEmbeds(options.use) : validateEmbeds(defaultEmbeds);

  // combine defaults and user options to configure the plugin
  let pluginConfig = Object.assign(defaultOptions, options);

  // for each valid embed being used, call it in eleventy
  pluginConfig.use.forEach(function(embedName){
    eleventyConfig.addPlugin(global[embedName], pluginConfig[embedName].options);
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
