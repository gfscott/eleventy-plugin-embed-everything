const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:w{3}\.)??(?:tiktok\.com)\/(@[\w\.]+?)\/video\/(\d{19})(?:[^\s<>]*?)??(?=(\s*))\5(?:<\/a>)??(?=(\s*))\6<\/p>/;
module.exports = function(str) {
  let match = str.match(pattern);
   return {
    user: match[3],
    id: match[4]
  };
}