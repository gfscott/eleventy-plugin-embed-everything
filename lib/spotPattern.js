const pattern = /<p>(\s*)(<a(.*)>)?(\s*)(https?:\/\/)?(w{3}\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/)?([A-Za-z0-9-_]{11})(\S*)(\s*)(<\/a>)?(\s*)<\/p>/g;

module.exports = function(str) {
  return str.match(pattern);
}