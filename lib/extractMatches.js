const pattern = /<p>\s*(?:<a.*>)?\s*(?:https?:\/\/)?(?:w{3}\.)?(?:instagram\.com)\/(?:p\/)?([0-9a-zA-Z-_]{11})(?:\S*)(?:\s*)(?:<\/a>)?(?:\s*)?<\/p>/;
module.exports = function(str) {
  let [, out ] = pattern.exec(str);
  return out;
}