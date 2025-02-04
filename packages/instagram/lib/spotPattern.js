const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)?(?:w{3}\.)?(?:instagram\.com\/(?:p|reel|tv)\/)(?:[0-9a-zA-Z_-]{11})[^\s]*?(?=(\s*))\3(?:<\/a>)??(?=(\s*))\4<\/p>/g;
module.exports = function(str) {
  return str.match(pattern);
}