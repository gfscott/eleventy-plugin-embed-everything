import test from 'ava';
import pattern from '../lib/pattern.js';
import permuteArrays from 'permute-arrays';

const base = 'openstreetmap.org';
const prefixes = ['', '//', 'www.', '//www.', 'https://', 'http://', 'https://www.', 'http://www.'];
const suffixes = [
  '/#map=8/46.195/-81.362',
  '/way/1147323572#map=8/46.195/-81.362',
  '/search?whereami=1&query=52.147%2C104.106#map=8/46.195/-81.362'
];
// Use set to remove duplicates; slice to remove URLs without paths
const validUrls = new Set(permuteArrays(base, prefixes, suffixes).slice(prefixes.length))

for (let url of validUrls) {
  test(`${url} is a valid URL`, t => {
    pattern.lastIndex = 0;
    t.regex(`<p>${url}</p>`, pattern);
  });

  test(`Expected values extracted from ${url}`, t => {
    pattern.lastIndex = 0;
    const { groups: { zoom, lat, long } } = pattern.exec(`<p>${url}</p>`);
    t.is(zoom, '8');
    t.is(lat, '46.195');
    t.is(long, '-81.362');
  })
}