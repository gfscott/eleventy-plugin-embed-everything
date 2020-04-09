const pattern = /<p>\s*(?:<a(.*)>)?\s*(?:https?:\/\/)?(?:w{3}\.)?(?:instagram\.com)\/(?:p\/)(?:[0-9a-zA-Z_-]{11})\S*\s*(?:<\/a>)?\s*?<\/p>/g;
module.exports = function(str) {
  return str.match(pattern);
}