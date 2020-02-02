global.instagram = require('eleventy-plugin-instagram-embed');
global.youtube = require('eleventy-plugin-youtube-embed');

module.exports = function(eleventyConfig, options) {

  // every valid embed offered
  const availableEmbeds = ['instagram', 'youtube'];
  // embeds offered by default
  const defaultEmbeds = ['instagram', 'youtube'];
  // dynamically build default settings
  let defaultOptions = {};
  availableEmbeds.forEach(function(embed){
    // this is kind of ugly
    let str = '{"'+ embed + '":{"options":{}}}';
    let obj = JSON.parse(str);
    defaultOptions = Object.assign({}, defaultOptions, obj);
  });

  // combine defaults and user options to configure the plugin
  let pluginConfig = Object.assign(defaultOptions, options);
  // filter the requested embeds so only valid ones are accepted
  pluginConfig.use = ( options.use ? validateEmbeds(options.use) : defaultEmbeds );
  
  // for each valid embed being used, call it in eleventy
  pluginConfig.use.forEach(function(embedName){
    eleventyConfig.addPlugin(global[embedName], pluginConfig[embedName].options);
  });

  // Helper functions

  function validateEmbeds(arr){
    let out = [];
    arr.forEach(str => {
      if(availableEmbeds.indexOf(str) > -1){
        out.push(str);
        console.log("✅  Embeds are active for “" + str + "”.");
      } else {
        console.error("🛑  Sorry, “" + str + "” is not supported by this plugin right now.");
      }
    });
    return out;
  };

};
