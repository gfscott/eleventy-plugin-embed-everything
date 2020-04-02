const thisPattern = /<p>(?:\s*)(?:<a(?:.*)>)?(?:\s*)(?:https?:\/\/)?(?:w{3}\.)?(?:vimeo\.com)\/(\d+)(?:\S*)(?:\s*)(?:<\/a>)?(?:\s*)<\/p>/

module.exports = function(str) {
  let [ match, out ] = thisPattern.exec(str);
  return out;
}