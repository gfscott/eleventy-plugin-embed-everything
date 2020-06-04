const patternPresent = require('./lib/spotPattern.js');
const getEmbed = require('./lib/getEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

// module.exports = function(eleventyConfig, options) {
//   const pluginConfig = Object.assign({}, pluginDefaults, options);
//   eleventyConfig.addTransform("embedSoundCloud", async (content, outputPath) => {
//     if (!outputPath.endsWith(".html")) {
//       return content;
//     }
//     let matches = patternPresent(content);
//     if (!matches) {
//       return content;
//     }
//     // modern for loop instead of array.forEach, to enable await
//     // https://stackoverflow.com/a/37576787
//     for ( const match of matches ) {
//       let embedCode = await getEmbed(match, pluginConfig);
//       content = content.replace(match, embedCode);
//     }
//     return content;
//   });
// };

module.exports = function (eleventyConfig, options) {
  const pluginConfig = Object.assign(pluginDefaults, options);
  eleventyConfig.addTransform("embedSoundCloud", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let matches = patternPresent(content);
      if (!matches) {
        return content;
      }
      // modern for loop instead of array.forEach, to enable await
      // https://stackoverflow.com/a/37576787
      for ( const match of matches ) {
        let embedCode = await getEmbed(match, pluginConfig);
        content = content.replace(match, embedCode);
      }
      return content;
    }

    return content;
  });
};