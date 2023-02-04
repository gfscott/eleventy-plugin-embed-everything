const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)??(?:w{3}\.)??(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)??([A-Za-z0-9-_]{11})(?:[^\s<>]*)(?=(\s*))\4(?:<\/a>)??(?=(\s*))\5<\/p>/g;

module.exports = function(str) {
  return str.match(pattern);
}