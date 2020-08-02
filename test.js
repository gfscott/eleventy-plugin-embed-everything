const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
const extractId = require('./lib/extractMatches.js');
const buildEmbed = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');

// These should PASS
const validStrings = [
  {type: 'Standard', str: 'https://vimeo.com/400344311'},
  {type: 'With http', str: 'http://vimeo.com/400344311'},
  {type: 'Without protocol', str: 'vimeo.com/400344311'},
  {type: 'With arbitrary params', str: 'https://vimeo.com/400344311?foo=bar&baz'},
]

// These should FAIL
const invalidStrings = [
  {type: 'With prepended text', str: 'foo https://vimeo.com/400344311'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://vimeo.com/400344311</a>'},
  {type: 'With appended text', str: 'https://vimeo.com/400344311 bar'},
  {type: 'With appended text, with link', str: '<a href="">https://vimeo.com/400344311</a> bar'},
]

/**
 * Test that regex returns true for valid strings
 */
validStrings.forEach(function(obj){
  test(`Valid string returns true: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.truthy(patternPresent(idealCase));
  });
  test(`Valid string returns true: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.truthy(patternPresent(withLinks));
  });
  test(`Valid string returns true: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.truthy(patternPresent(withWhitespace));
  });
  test(`Valid string returns true: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
  });
});

/**
 * Test that extractor returns proper video ID string
 */
validStrings.forEach(function(obj){
  test(`Proper ID returned: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(extractId(idealCase), '400344311');
  });
  test(`Proper ID returned: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(extractId(withLinks), '400344311');
  });
  test(`Proper ID returned: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(extractId(withWhitespace), '400344311');
  });
  test(`Proper ID returned: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(extractId(withLinksAndWhitespace), '400344311');
  });
});

/**
 * Test that embed builder returns expected HTML
 */
validStrings.forEach(function(obj){
  test(`Expected HTML returned: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbed(extractId(idealCase), pluginDefaults),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1" allowfullscreen></iframe></div>`
    );
  });
  test(`Expected HTML returned: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbed(extractId(withLinks), pluginDefaults),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1" allowfullscreen></iframe></div>`
    );
  });
  test(`Expected HTML returned: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbed(extractId(withWhitespace), pluginDefaults),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1" allowfullscreen></iframe></div>`
    );
  });
  test(`Expected HTML returned: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbed(extractId(withLinksAndWhitespace), pluginDefaults),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1" allowfullscreen></iframe></div>`
    );
  });
});

/**
 * Test that embed builder returns expected HTML with non-default options
 */

const optionsDntFalse = Object.assign({}, pluginDefaults, { dnt: false });
validStrings.forEach(function(obj){
  test(`Expected HTML returned; case: DNT false: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbed(extractId(idealCase), optionsDntFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=0" allowfullscreen></iframe></div>`
    );
  });
  test(`Expected HTML returned; case: DNT false: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbed(extractId(withLinks), optionsDntFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=0" allowfullscreen></iframe></div>`
    );
  });
  test(`Expected HTML returned; case: DNT false: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbed(extractId(withWhitespace), optionsDntFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=0" allowfullscreen></iframe></div>`
    );
  });
  test(`Expected HTML returned; case: DNT false: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbed(extractId(withLinksAndWhitespace), optionsDntFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=0" allowfullscreen></iframe></div>`
    );
  });
});

/**
 * Test that embed builder returns expected HTML with non-default options
 */

const optionsFullscreenFalse = Object.assign({}, pluginDefaults, { allowFullscreen: false });
validStrings.forEach(function(obj){
  test(`Expected HTML returned; case: allowFullscreen false: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbed(extractId(idealCase), optionsFullscreenFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1"></iframe></div>`
    );
  });
  test(`Expected HTML returned; case: allowFullscreen false: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbed(extractId(withLinks), optionsFullscreenFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1"></iframe></div>`
    );
  });
  test(`Expected HTML returned; case: allowFullscreen false: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbed(extractId(withWhitespace), optionsFullscreenFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1"></iframe></div>`
    );
  });
  test(`Expected HTML returned; case: allowFullscreen false: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbed(extractId(withLinksAndWhitespace), optionsFullscreenFalse),
      `<div id="vimeo-400344311" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://player.vimeo.com/video/400344311?dnt=1"></iframe></div>`
    );
  });
});

invalidStrings.forEach(function(obj){
  test(`Invalid string returns false: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.falsy(patternPresent(idealCase));
  });
  test(`Invalid string returns false: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.falsy(patternPresent(withWhitespace));
  });
});