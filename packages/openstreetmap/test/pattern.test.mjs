import test from 'ava';
import pattern from '../lib/pattern.js';

// const str = '<p>https://www.openstreetmap.org/#map=8/46.195/-81.362</p>';
// const str = '<p>https://www.openstreetmap.org/way/1147323572#map=8/46.195/-81.362</p>';
const str = '<p>https://www.openstreetmap.org/search?whereami=1&query=52.147%2C104.106#map=8/46.195/-81.362</p>';

test('Extremely basic regex proof of concept', t => {
  pattern.lastIndex = 0;
  t.regex(str, pattern)
})

test('Expected values extracted', t => {
  pattern.lastIndex = 0;
  const { groups: { zoom, lat, long } } = pattern.exec(str);
  t.is(zoom, '8');
  t.is(lat, '46.195');
  t.is(long, '-81.362');
})