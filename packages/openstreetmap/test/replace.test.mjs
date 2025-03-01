import test from 'ava';
import pattern from '../lib/pattern.js';
import replace from '../lib/replace.js';
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
  const { groups: { zoom, lat, long } } = pattern.exec(str);

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

test('Input produces expected output with default options', t => {
  const input = '<p>https://www.openstreetmap.org/#map=11/47.9012/106.8911</p>';
  const output = input.replace(pattern, (...match) => replace(match));
  const expected = '<div class="eleventy-plugin-embed-openstreetmap" style="aspect-ratio: 16/9"><iframe width="100%" height="100%" frameborder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=106.59927565917968%2C47.73983206904563%2C107.1829243408203%2C48.06206649357146&layer=mapnik"></iframe></div>';
  t.is(output, expected);
});

test('Input produces expected output with custom class name', t => {
  const input = '<p>https://www.openstreetmap.org/#map=11/47.9012/106.8911</p>';
  const output = input.replace(pattern, (...match) => replace(match, {embedClass: 'foo'}));
  const expected = '<div class="foo" style="aspect-ratio: 16/9"><iframe width="100%" height="100%" frameborder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=106.59927565917968%2C47.73983206904563%2C107.1829243408203%2C48.06206649357146&layer=mapnik"></iframe></div>';
  t.is(output, expected);
});

test('Input produces expected output with custom wrapper style', t => {
  const input = '<p>https://www.openstreetmap.org/#map=11/47.9012/106.8911</p>';
  const output = input.replace(pattern, (...match) => replace(match, { wrapperStyle: 'width: 100%; height: 500px;' }));
  const expected = '<div class="eleventy-plugin-embed-openstreetmap" style="width: 100%; height: 500px;"><iframe width="100%" height="100%" frameborder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=106.59927565917968%2C47.73983206904563%2C107.1829243408203%2C48.06206649357146&layer=mapnik"></iframe></div>';
  t.is(output, expected);
});

test('Input produces expected output with custom map layer', t => {
  const input = '<p>https://www.openstreetmap.org/#map=11/47.9012/106.8911</p>';
  const output = input.replace(pattern, (...match) => replace(match, {layer: 'cycle'}));
  const expected = '<div class="eleventy-plugin-embed-openstreetmap" style="aspect-ratio: 16/9"><iframe width="100%" height="100%" frameborder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=106.59927565917968%2C47.73983206904563%2C107.1829243408203%2C48.06206649357146&layer=cycle"></iframe></div>';
  t.is(output, expected);
});

test('Input produces expected output with marker option active', t => {
  const input = '<p>https://www.openstreetmap.org/#map=11/47.9012/106.8911</p>';
  const output = input.replace(pattern, (...match) => replace(match, {includeMarker: true}));
  const expected = '<div class="eleventy-plugin-embed-openstreetmap" style="aspect-ratio: 16/9"><iframe width="100%" height="100%" frameborder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=106.59927565917968%2C47.73983206904563%2C107.1829243408203%2C48.06206649357146&layer=mapnik&marker=47.9012%2C106.8911"></iframe></div>';
  t.is(output, expected);
});
