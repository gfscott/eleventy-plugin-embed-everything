const thisPattern = /<p>(?:\s*)(?:<a(?:.*)>)?(?:\s*)(?:https?:\/\/)?(?:w{3}\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([A-Za-z0-9-_]{11})(?:\S*)(?:\s*)(?:<\/a>)?(?:\s*)<\/p>/;

module.exports = function(str) {
  // CHANGE @1.3.0: Remove named capture group (Node ^10). Instead use destructuring (Node ^6).
  let [ match, out ] = thisPattern.exec(str);
  return out;
}