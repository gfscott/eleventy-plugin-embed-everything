const thisPattern = /<p>(?:\s*)(?:<a(?:.*)>)?(?:\s*)(?:https?:\/\/)?(?:w{3}\.)?(?:twitch\.tv)\/(\S+?)(?:\s*)(?:<\/a>)?(?:\s*)<\/p>/;
const videoPattern = /videos\/(\d+)/;

module.exports = function(str) {
  
  let [ , target ] = str.match(thisPattern);
  let videoId = target.match(videoPattern);
  let out = {};

  if ( videoId ){
    out.type = 'video';
    out.id = videoId[1];
  } else {
    out.type = 'channel';
    out.id = target;
  }
  
  return out;
}