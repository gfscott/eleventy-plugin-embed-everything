import test from 'ava';
import pattern from '../lib/pattern.js';
import { getBoundingBox } from '../lib/replace.js';

test('Custom bounding box calculation is within acceptable variance from OSM', t => {
  
  
  // These are values produced by the OSM embed service
  const expected = {
    long_s: -7.451734542846681,
    lat_e: 62.103039201617996,
    long_e: -7.426950931549073,
    lat_s: 62.117492893935236,
  }
  
  const str = '<p>https://www.openstreetmap.org/#map=16/62.1103/-7.4393</p>';
  const {groups} = pattern.exec(str);
  const {long, lat, zoom} = groups;

  // Hard-coding the width and height because it mimics the default embed size
  // returned by the OSM embed code. If you substantially change these values,
  // then the zoom level looks wrong.
  // Even with these bounding box size values, you can set the iframe width
  // and height to 100% and the map still looks OK.
  const {long_s, lat_e, long_e, lat_s} = getBoundingBox(long, lat, zoom, 425, 350);
  
  // The values produced by our calculations and OSM's are close, but not
  // _exactly_ the same. In practice this isn't an issue as long as the 
  // difference is small enough. This is kind of a magic number.
  // TODO: See if we can align more closely how OSM calculates its bounding boxes?
  // https://github.com/openstreetmap/openstreetmap-website/blob/master/lib/bounding_box.rb
  const acceptableDrift = 0.01;
  
  t.is(Math.abs(long_s - expected.long_s) < acceptableDrift, true);
  t.is(Math.abs(lat_e - expected.lat_e) < acceptableDrift, true);
  t.is(Math.abs(long_e - expected.long_e) < acceptableDrift, true);
  t.is(Math.abs(lat_s - expected.lat_s) < acceptableDrift, true);

});