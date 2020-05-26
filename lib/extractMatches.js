const pattern = /<p>\s*(?:<a(?:.*)>)?\s*(?:https?:\/\/)?(?:w{3}\.)?(?:tiktok\.com)\/(@.+?)\/video\/(\d{19})\S*\s*(?:<\/a>)?\s*?<\/p>/;
module.exports = function(str) {
  // empty [0] value: full pattern match is returned as the first array item, but it's not used
  let [, user, id ] = pattern.exec(str);
   return {
    user: user,
    id: id
  };
}