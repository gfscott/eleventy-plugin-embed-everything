const sc = 'https://soundcloud.com';
const configEmbed = require('./configEmbed.js');
const bent = require('bent');
const get = bent('json', 200);
const pattern = /<p>\s*(?:<a.*>)?\s*(?:https?)?(?::\/\/)?(?:soundcloud\.com)(\/\S+?)(?:\?\S+)?\s*(?:<\/a>)?\s*<\/p>/;

module.exports = async function(str, options) {
  let [ , id ] = str.match(pattern);
  let url = `${sc}/oembed?url=${encodeURIComponent(sc + id)}&format=json`;
  try {
    let json = await get(url);
    let out = await configEmbed(json.html, options);
    return out;
  } catch (err) {
    console.error("Error communicating with SoundCloud’s servers: ", err);
    return str;
  }
  
}