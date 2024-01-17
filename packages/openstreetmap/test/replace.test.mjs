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
  const str = '<p>https://www.openstreetmap.org/#map=8/21.42242/39.82621</p>';
  const {groups} = pattern.exec(str);
  const {long, lat, zoom} = groups;
  // Hard-coding the width and height because it mimics the default embed size
  // returned by the OSM embed code. If you substantially change these values,
  // then the zoom level looks wrong.
  // Even with these bounding box size values, you can set the iframe width
  // and height to 100% and the map will still look OK.
  console.log(longLatToBbox(long, lat, zoom, 425, 350));

  t.pass();

});


// -85.51757812500001,42.86791248391533,-79.17297363281251,48.39273786659243