const EleventyFetch = require("@11ty/eleventy-fetch");
const deepmerge = require("deepmerge");
const buildOptions = require("./buildOptions.js");

module.exports = async function(post, options) {
  const opts = buildOptions(options);
  
  try {
    // Build embed HTML
    let embedHtml = `<div class="${opts.embedClass}">`;
    embedHtml += `<iframe src="https://${opts.embedDomain}/profile/${post.handle}/post/${post.postId}/embed" style="width: 100%; height: ${opts.height || 300}px;" frameborder="0"></iframe>`;
    embedHtml += "</div>";

    return embedHtml;
  } catch (error) {
    console.warn("Error building Bluesky embed:", error);
    return "";
  }
};
