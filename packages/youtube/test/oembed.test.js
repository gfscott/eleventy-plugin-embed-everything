const test = require('node:test');
const assert = require('node:assert/strict');
const {defaults} = require('../lib/defaults.js');
const {getYouTubeTitleViaOembed} = require('../lib/embed.js');


test('getYouTubeTitleViaOembed returns a string', async () => {
  const result = await getYouTubeTitleViaOembed('hIs5StN8J-0', defaults);
  assert.equal(typeof result, 'string');
});

test('getYouTubeTitleViaOembed returns the correct title', async () => {
  const result = await getYouTubeTitleViaOembed('hIs5StN8J-0', defaults);
  assert.equal(result, 'Animotion - Obsession');
});

test('getYouTubeTitleViaOembed returns the default title on network error', async () => {
  const result = await getYouTubeTitleViaOembed('00000000000', defaults);
  assert.equal(result, defaults.title);
});
