const test = require('node:test');
const assert = require('node:assert/strict');
const patternPresent = require('./lib/spotPattern.js');
// TODO: Finish tests for extracting ID strings and correct outputs
const extractVideoId = require('./lib/extractMatches.js');
// const buildEmbedCodeString = require('./lib/buildEmbed.js');

const validStrings = [
  // user channels
  {type: 'User', str: 'https://www.twitch.tv/vixella'},
  {type: 'User, With http', str: 'http://www.twitch.tv/vixella'},
  {type: 'User, Without protocol', str: 'www.twitch.tv/vixella'},
  {type: 'User, With https, without www', str: 'https://twitch.tv/vixella'},
  {type: 'User, With http, without www', str: 'http://twitch.tv/vixella'},
  // archived videos
  {type: 'Archived', str: 'https://www.twitch.tv/videos/597008599'},
  {type: 'Archived, With http', str: 'http://www.twitch.tv/videos/597008599'},
  {type: 'Archived, Without protocol', str: 'www.twitch.tv/videos/597008599'},
  {type: 'Archived, With https, without www', str: 'https://twitch.tv/videos/597008599'},
  {type: 'Archived, With http, without www', str: 'http://twitch.tv/videos/597008599'},
]

const invalidStrings = [
  {type: 'User, With prepended text', str: 'foo https://www.twitch.tv/vixella'},
  {type: 'User, With prepended text, with link', str: 'foo <a href="">https://www.twitch.tv/vixella</a>'},
  {type: 'User, With appended text', str: 'https://www.twitch.tv/vixella bar'},
  {type: 'User, With appended text, with link', str: '<a href="">https://www.twitch.tv/vixella</a> bar'},
  {type: 'Archived, With prepended text', str: 'foo https://www.twitch.tv/videos/597008599'},
  {type: 'Archived, With prepended text, with link', str: 'foo <a href="">https://www.twitch.tv/videos/597008599</a>'},
  {type: 'Archived, With appended text', str: 'https://www.twitch.tv/videos/597008599 bar'},
  {type: 'Archived, With appended text, with link', str: '<a href="">https://www.twitch.tv/videos/597008599</a> bar'},
]

validStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, () => {
    let idealCase = `<p>${obj.str}</p>`;
    assert.ok(patternPresent(idealCase));
  });
  test(`${obj.type} with links`, () => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    assert.ok(patternPresent(withLinks));
  });
  test(`${obj.type} with whitespace`, () => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    assert.ok(patternPresent(withWhitespace));
  });
  test(`${obj.type} with links and whitespace`, () => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    assert.ok(patternPresent(withLinksAndWhitespace));
  });
});

invalidStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, () => {
    let idealCase = `<p>${obj.str}</p>`;
    assert.ok(!patternPresent(idealCase));
  });
  test(`${obj.type} with whitespace`, () => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    assert.ok(!patternPresent(withWhitespace));
  });
});

/**
 * Given valid strings, extractMatches.js returns the proper
 * type and ID.
 */
validStrings.forEach(function(obj){
  test(`Extract ID, ${obj.type}, ideal case`, () => {
    let idealCase = `<p>${obj.str}</p>`;
    let out = extractVideoId(idealCase);
    assert.ok(['channel', 'video'].includes(out.type));
    assert.ok(['vixella', '597008599'].includes(out.id));
  });
  test(`Extract ID, ${obj.type}, with links`, () => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    let out = extractVideoId(withLinks);
    assert.ok(['channel', 'video'].includes(out.type));
    assert.ok(['vixella', '597008599'].includes(out.id));
  });
  test(`Extract ID, ${obj.type}, with whitespace`, () => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    let out = extractVideoId(withWhitespace);
    assert.ok(['channel', 'video'].includes(out.type));
    assert.ok(['vixella', '597008599'].includes(out.id));
  });
  test(`Extract ID, ${obj.type}, with links and whitespace`, () => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    let out = extractVideoId(withLinksAndWhitespace);
    assert.ok(['channel', 'video'].includes(out.type));
    assert.ok(['vixella', '597008599'].includes(out.id));
  });
});
