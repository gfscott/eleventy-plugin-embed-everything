const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
// TODO: Finish tests for extracting ID strings and correct outputs
// const extractVideoId = require('./lib/extractMatches.js');
// const buildEmbedCodeString = require('./lib/buildEmbed.js');

const validStrings = [
  {type: 'Album', str: 'spotify.com/album/75qojmHz1id8sL2LDR5qVz'},
  {type: 'Artist', str: 'spotify.com/artist/066X20Nz7iquqkkCW6Jxy6'},
  {type: 'Playlist', str: 'spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj'},
  {type: 'Playlist with user ID', str: 'spotify.com/user/gfscott/playlist/7zv2xFPTH1MBynYafuvtCj'},
  {type: 'Track', str: 'spotify.com/track/3gsCAGsWr6pUm1Vy7CPPob'},
  {type: 'Podcast episode', str: 'spotify.com/episode/7G5O2wWmch1ciYDPZS4a4O'},
]

const invalidStrings = [
  {type: 'With prepended text', str: 'foo https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj</a>'},
  {type: 'With appended text', str: 'https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj bar'},
  {type: 'With appended text, with link', str: '<a href="">https://open.spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj</a> bar'},
]

// This whole testing scheme is feeling kind of overbuilt, tbh, open to suggestion
validStrings.forEach(function(obj){
  test(`VALID: ${obj.type} ideal full HTTPS URL`, t => {
    let str = `<p>https://open.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} HTTP URL`, t => {
    let str = `<p>http://open.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} no protocol, with slashes`, t => {
    let str = `<p>//open.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} no protocol, no slashes `, t => {
    let str = `<p>open.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, ideal full HTTPS URL`, t => {
    let str = `<p>https://www.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, HTTP URL`, t => {
    let str = `<p>http://www.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, no protocol, with slashes`, t => {
    let str = `<p>//www.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, no protocol, no slashes `, t => {
    let str = `<p>www.${obj.str}</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} ideal full HTTPS URL, with arbitrary params`, t => {
    let str = `<p>https://open.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} HTTP URL, with arbitrary params`, t => {
    let str = `<p>http://open.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} no protocol, with slashes, with arbitrary params`, t => {
    let str = `<p>//open.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} no protocol, no slashes , with arbitrary params`, t => {
    let str = `<p>open.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, ideal full HTTPS URL, with arbitrary params`, t => {
    let str = `<p>https://www.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, HTTP URL, with arbitrary params`, t => {
    let str = `<p>http://www.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, no protocol, with slashes, with arbitrary params`, t => {
    let str = `<p>//www.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
  test(`VALID: ${obj.type} open > www, no protocol, no slashes , with arbitrary params`, t => {
    let str = `<p>www.${obj.str}?foo=bar</p>`;
    t.truthy(patternPresent(str));
  });
});

invalidStrings.forEach(function(obj){
  test(`INVALID: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.falsy(patternPresent(idealCase));
  });
  test(`INVALID: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.falsy(patternPresent(withWhitespace));
  });
});