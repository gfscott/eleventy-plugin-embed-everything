const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
// TODO: Finish tests for extracting ID strings and correct outputs
// const extractVideoId = require('./lib/extractMatches.js');
// const buildEmbedCodeString = require('./lib/buildEmbed.js');

const validStrings = [
  {type: 'Standard', str: 'https://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With http', str: 'http://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'Without protocol', str: 'www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'Without trailing slash', str: 'https://www.instagram.com/p/B-rRt1MjKZD'},
  {type: 'With https, without www', str: 'https://instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With http, without www', str: 'https://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'Without https, without www', str: 'instagram.com/p/B-rRt1MjKZD/'},
]

const invalidStrings = [
  {type: 'Incomplete photo ID', str: 'https://www.instagram.com/p/abcde/'},
  {type: 'With prepended text', str: 'foo https://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With malformed protocol', str: 'https//www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a>'},
  {type: 'With appended text', str: 'https://www.instagram.com/p/B-rRt1MjKZD/ bar'},
  {type: 'With appended text, with link', str: '<a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a> bar'},
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