const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
// TODO: Finish tests for extracting ID strings and correct outputs
// const extractVideoId = require('./lib/extractMatches.js');
// const buildEmbedCodeString = require('./lib/buildEmbed.js');

// These should PASS by throwing truthy
const validStrings = [
  {type: 'Standard', str: 'https://vimeo.com/400344311'},
  {type: 'With http', str: 'http://vimeo.com/400344311'},
  {type: 'Without protocol', str: 'vimeo.com/400344311'},
  {type: 'With arbitrary params', str: 'https://vimeo.com/400344311?foo=bar&baz'},
]

// These should FAIL by throwing falsy
const invalidStrings = [
  {type: 'With prepended text', str: 'foo https://vimeo.com/400344311'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://vimeo.com/400344311</a>'},
  {type: 'With appended text', str: 'https://vimeo.com/400344311 bar'},
  {type: 'With appended text, with link', str: '<a href="">https://vimeo.com/400344311</a> bar'},
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