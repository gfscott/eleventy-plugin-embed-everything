const test = require('ava');
const getEmbed = require('../lib/getEmbed.js');
const pluginDefaults = require('../lib/pluginDefaults.js');

const artistUrl = '<p>https://soundcloud.com/earlxsweatshirtmusic</p>';
const trackUrl = '<p>https://soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies</p>';
const setUrl = '<p>https://soundcloud.com/earlxsweatshirtmusic/sets/earl-15</p>';
const badUrl = '<p>https://soundcloud.com/earlxsweatshirtmusicbutnonexistent</p>';
const expectedArtistOutput = '<div class="eleventy-plugin-embed-soundcloud"><iframe title="Earl Sweatshirt" width="100%" height="400" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F24883142&auto_play=false&cacheDuration=5m&color=%23ff7700&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_reposts=false&show_teaser=false&show_user=true&single_active=true&visual=true&iframeTitle=Earl%20Sweatshirt&"></iframe></div>';
const expectedTrackOutput = '<div class="eleventy-plugin-embed-soundcloud"><iframe title="TISK TISK / COOKIES by Earl Sweatshirt" width="100%" height="400" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F706125730&auto_play=false&cacheDuration=5m&color=%23ff7700&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_reposts=false&show_teaser=false&show_user=true&single_active=true&visual=true&iframeTitle=TISK%20TISK%20%2F%20COOKIES%20by%20Earl%20Sweatshirt&"></iframe></div>';
const expectedSetOutput = '<div class="eleventy-plugin-embed-soundcloud"><iframe title="Earl by Earl Sweatshirt" width="100%" height="400" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F284902110&auto_play=false&cacheDuration=5m&color=%23ff7700&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_reposts=false&show_teaser=false&show_user=true&single_active=true&visual=true&iframeTitle=Earl%20by%20Earl%20Sweatshirt&"></iframe></div>';

const smallPlayer = Object.assign({}, pluginDefaults, {small: true});
const expectedArtistOutput_sm = '<div class="eleventy-plugin-embed-soundcloud"><iframe title="Earl Sweatshirt" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F24883142&auto_play=false&cacheDuration=5m&color=%23ff7700&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_reposts=false&show_teaser=false&show_user=true&single_active=true&visual=false&iframeTitle=Earl%20Sweatshirt&"></iframe></div>';
const expectedTrackOutput_sm = '<div class="eleventy-plugin-embed-soundcloud"><iframe title="TISK TISK / COOKIES by Earl Sweatshirt" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F706125730&auto_play=false&cacheDuration=5m&color=%23ff7700&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_reposts=false&show_teaser=false&show_user=true&single_active=true&visual=false&iframeTitle=TISK%20TISK%20%2F%20COOKIES%20by%20Earl%20Sweatshirt&"></iframe></div>';
const expectedSetOutput_sm = '<div class="eleventy-plugin-embed-soundcloud"><iframe title="Earl by Earl Sweatshirt" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F284902110&auto_play=false&cacheDuration=5m&color=%23ff7700&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_reposts=false&show_teaser=false&show_user=true&single_active=true&visual=false&iframeTitle=Earl%20by%20Earl%20Sweatshirt&"></iframe></div>';


/**
 * For the three supported URL types, check that the plugin produces 
 * the expected markup
 */
test(`Artist URL`, async t => {
  let out = await getEmbed(artistUrl, pluginDefaults);
  t.is(out, expectedArtistOutput);
});
test(`Track URL`, async t => {
  let out = await getEmbed(trackUrl, pluginDefaults);
  t.is(out, expectedTrackOutput);
});
test(`Set URL`, async t => {
  let out = await getEmbed(setUrl, pluginDefaults);
  t.is(out, expectedSetOutput);
});

/**
 * For the three supported URL types, check that the plugin produces 
 * the expected markup with the "small" embed type specified
 */
test(`Artist URL, small version`, async t => {
  let out = await getEmbed(artistUrl, smallPlayer);
  t.is(out, expectedArtistOutput_sm);
});
test(`Track URL, small version`, async t => {
  let out = await getEmbed(trackUrl, smallPlayer);
  t.is(out, expectedTrackOutput_sm);
});
test(`Set URL, small version`, async t => {
  let out = await getEmbed(setUrl, smallPlayer);
  t.is(out, expectedSetOutput_sm);
});

/**
 * On request failure, return the URL unchanged
 */
test(`oEmbed fetch failure`, async t => {
  let out = await getEmbed(badUrl, pluginDefaults);
  t.is(out, badUrl);
});
