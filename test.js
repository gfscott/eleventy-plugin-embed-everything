const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');

const validStrings = [
  // User profiles: these render as playlists of most recent track uploads
  {type: 'User URL, Standard', str: 'https://soundcloud.com/earlxsweatshirtmusic'},
  {type: 'User URL, With http', str: 'http://soundcloud.com/earlxsweatshirtmusic'},
  {type: 'User URL, Without protocol', str: 'www.soundcloud.com/earlxsweatshirtmusic'},
  {type: 'User URL, Without protocol or www', str: 'soundcloud.com/earlxsweatshirtmusic'},
  {type: 'User URL, Without protocol or www, with slashes', str: '//soundcloud.com/earlxsweatshirtmusic'},
  {type: 'User URL, With arbitrary params', str: 'https://soundcloud.com/earlxsweatshirtmusic?foo=bar'},
  // Individual tracks
  {type: 'Track URL, Standard', str: 'https://soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies'},
  {type: 'Track URL, With http', str: 'http://soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies'},
  {type: 'Track URL, Without protocol', str: 'www.soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies'},
  {type: 'Track URL, Without protocol or www', str: 'soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies'},
  {type: 'Track URL, Without protocol or www, with slashes', str: '//soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies'},
  {type: 'Track URL, With arbitrary params', str: 'https://soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies?foo=bar'},
  // "Sets" include both albums and playlists
  {type: 'Sets URL, Standard', str: 'https://soundcloud.com/earlxsweatshirtmusic/sets/earl-15'},
  {type: 'Sets URL, With http', str: 'http://soundcloud.com/earlxsweatshirtmusic/sets/earl-15'},
  {type: 'Sets URL, Without protocol', str: 'www.soundcloud.com/earlxsweatshirtmusic/sets/earl-15'},
  {type: 'Sets URL, Without protocol or www', str: 'soundcloud.com/earlxsweatshirtmusic/sets/earl-15'},
  {type: 'Sets URL, Without protocol or www, with slashes', str: '//soundcloud.com/earlxsweatshirtmusic/sets/earl-15'},
  {type: 'Sets URL, With arbitrary params', str: 'https://soundcloud.com/earlxsweatshirtmusic/sets/earl-15?foo=bar'},
]

const invalidStrings = [
  {type: 'With prepended text', str: 'foo https://soundcloud.com/earlxsweatshirtmusic'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://soundcloud.com/earlxsweatshirtmusic</a>'},
  {type: 'With appended text', str: 'https://soundcloud.com/earlxsweatshirtmusic bar'},
  {type: 'With appended text, with link', str: '<a href="">https://soundcloud.com/earlxsweatshirtmusic</a> bar'},
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