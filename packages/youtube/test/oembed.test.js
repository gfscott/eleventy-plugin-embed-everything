const test = require('ava');
const {defaults} = require('../lib/defaults.js');
const {getYouTubeTitleViaOembed} = require('../lib/embed.js');


test('getYouTubeTitleViaOembed returns a string', async (t) => {
  const result = await getYouTubeTitleViaOembed('hIs5StN8J-0', defaults);
  t.is(typeof result, 'string');
});

test('getYouTubeTitleViaOembed returns the correct title', async (t) => {
  const result = await getYouTubeTitleViaOembed('hIs5StN8J-0', defaults);
  t.is(result, 'Animotion - Obsession (Official Music Video)');
});

test('getYouTubeTitleViaOembed returns the default title on network error', async (t) => {
  const result = await getYouTubeTitleViaOembed('00000000000', defaults);
  t.is(result, defaults.title);
});