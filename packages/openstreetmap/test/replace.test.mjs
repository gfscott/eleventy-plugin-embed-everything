import test from 'ava';
import pattern from '../lib/pattern.js';
import replace from '../lib/replace.js';
import { longLatToBbox } from '../lib/replace.js';

test('Very basic proof of concept', t => {
  const match = 'something';
  const config = 'else';
  t.is(replace(match, config), 'foo');
});

test('longlat', t => {
  const str = '<p>https://www.openstreetmap.org/#map=16/62.1103/-7.4393</p>';
  const expected = '-7.451734542846681%2C62.103039201617996%2C-7.426950931549073%2C62.117492893935236'
  const {groups} = pattern.exec(str);
  const {long, lat, zoom} = groups;
  // Hard-coding the width and height because it mimics the default embed size
  // returned by the OSM embed code. If you substantially change these values,
  // then the zoom level looks wrong.
  // Even with these bounding box size values, you can set the iframe width
  // and height to 100% and the map will still look OK.
  const bbox = longLatToBbox(long, lat, zoom, 425, 350);
  t.is(bbox, expected);

  // t.pass();

});