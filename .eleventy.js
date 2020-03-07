module.exports = function(eleventyConfig, options) {
  const defaults = {
    embedClass: 'eleventy-plugin-embed-instagram'
  };
  const pluginConfig = Object.assign(defaults, options);

  eleventyConfig.addTransform("embedInstagram", async (content, outputPath) => {
    if (!outputPath.endsWith(".html")) {
      return content;
    }
    let matches = contentContainsRelevantUrls(content);
    if (!matches) {
      return content;
    }
    // index is used to limit the number of script tags added to each page
    matches.forEach(function(relevantStringToReplace, index) {
      let mediaId = extractMediaId(relevantStringToReplace);
      let mediaEmbedCode = buildEmbedCodeString(mediaId, index);
      content = content.replace(relevantStringToReplace, mediaEmbedCode);
    });
    return content;
  });

  // Helper functions
  function contentContainsRelevantUrls(str) {
    const instagramUrlPattern = /<p>(\s*)(<a(.*)>)?(\s*)(https?:\/\/)?(w{3}\.)?(instagram\.com)\/(p\/)?([A-Za-z0-9-_]{11})(\S*)(\s*)(<\/a>)?(\s*)?<\/p>/g;
    return str.match(instagramUrlPattern);
  }

  function extractMediaId(str) {
    // need to use exec to get named regex groups
    const thisPattern = /<p>(\s*)(<a(.*)>)?(\s*)(https?:\/\/)?(w{3}\.)?(instagram\.com)\/(p\/)?(?<targetId>[A-Za-z0-9-_]{11})(\S*)(\s*)(<\/a>)?(\s*)?<\/p>/;
    return thisPattern.exec(str).groups.targetId;
  }

  function buildEmbedCodeString(id, embedCount) {
    let out = '<blockquote ';
    // class MUST include "instagram-media" because Instagram's script uses it for DOM parsing
    out += `class="${pluginConfig.embedClass} instagram-media"`;
    out += ` data-instgrm-permalink="https://www.instagram.com/p/${id}">`;
    out += '</blockquote>';
    // Only add the script tag on the first instance, otherwise script tag added multiple times
    out += embedCount === 0 ? '<script async defer src="https://www.instagram.com/embed.js"></script>' : '';
    return out;
  }
};
