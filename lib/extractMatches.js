const pattern = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:w{3}\.)??(?:twitch\.tv)\/([^\s<>]+?)(?=(\s*))\4(?:<\/a>)??(?=(\s*))\5<\/p>/;
const videoPattern = /videos\/(\d+)/;

module.exports = function(str) {
  
  let target = str.match(pattern)[3];
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