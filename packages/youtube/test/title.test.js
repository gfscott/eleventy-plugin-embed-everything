const test = require('ava');
const merge = require('deepmerge');
const {defaults: options} = require('../lib/defaults.js');
const {getVideoTitle} = require('../lib/embed.js');

test('getVideoTitle returns the default title when the API call fails', async t => {
  const title = await getVideoTitle('not_valid', options);
  t.is(title, options.title);
});

test('getVideoTitle returns expected title via oEmbed', async t => {
  const expectedTitle = 'Animotion - Obsession (Official Music Video)';
  const enableDownloadOption = merge(options, {titleOptions: {download: true}});
  const title = await getVideoTitle('hIs5StN8J-0', enableDownloadOption);
  t.is(title, expectedTitle);
});