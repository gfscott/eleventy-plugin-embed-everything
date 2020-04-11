const pattern = /<p>\s*(?:<a.*>)?\s*(?:https?)?(?::)?(?:\/\/)?(?:w{3}\.)?(?:soundcloud\.com)(?:\/\S+)\s*(?:<\/a>)?\s*<\/p>/g;

module.exports = function(str) {
  return str.match(pattern);
}