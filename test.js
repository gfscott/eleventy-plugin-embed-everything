const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
// TODO: Finish tests for extracting ID strings and correct outputs
// const extractVideoId = require('./lib/extractMatches.js');
// const buildEmbedCodeString = require('./lib/buildEmbed.js');

const validStrings = [
  {type: 'Standard', str: 'https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
  {type: 'With http', str: 'http://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
  {type: 'Without protocol', str: 'www.tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
  {type: 'With https, without www', str: 'https://tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
  {type: 'With http, without www', str: 'http://tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
  {type: 'Without https, without www', str: 'tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
]

const invalidStrings = [
  {type: 'Incomplete video ID', str: 'https://www.tiktok.com/@guiltyaesthetic/video/6806676200'},
  {type: 'With prepended text', str: 'foo https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
  {type: 'With malformed protocol', str: 'https//www.tiktok.com/@guiltyaesthetic/video/6806676200652655877'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877</a>'},
  {type: 'With appended text', str: 'https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877 bar'},
  {type: 'With appended text, with link', str: '<a href="">https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877</a> bar'},
]

validStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.truthy(patternPresent(idealCase));
  });
  test(`${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.truthy(patternPresent(withLinks));
  });
  test(`${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.truthy(patternPresent(withWhitespace));
  });
  test(`${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
  });
});

invalidStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.falsy(patternPresent(idealCase));
  });
  test(`${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.falsy(patternPresent(withWhitespace));
  });
});