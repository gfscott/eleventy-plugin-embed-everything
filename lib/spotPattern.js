const pattern = /<p>\s*(?:<a(.*)>)?\s*(?:https?:\/\/)?(?:w{3}\.)?(?:tiktok\.com)\/(?:@.+?)\/video\/(?:\d{19})\S*\s*(?:<\/a>)?\s*?<\/p>/g;
module.exports = function(str) {
  return str.match(pattern);
}

