const defaults = require('./defaults.js');
const merge = require('deepmerge');

module.exports = function(match, options = {}) {

  const config = merge(defaults, options);
  
  const {long, lat, zoom} = match.pop();
  const {long_s, lat_e, long_e, lat_s} = getBoundingBox(long, lat, zoom, 425, 350);
  const bbox = encodeURIComponent(`${long_s},${lat_e},${long_e},${lat_s}`);
  
  let out = `<div class="${config.embedClass}" style="${config.wrapperStyle}">`;
  out += `<iframe width="100%" height="100%" frameborder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=${config.layer}"></iframe>`;
  out += `</div>`;
  
  return out;
}






function rad2deg(radians) {
  return radians * (180/Math.PI);
}

function deg2rad(degrees) {
  return degrees * (Math.PI/180);
}

function sec(num) {
  return 1 / Math.cos(num);
}

function getLongLat(xtile, ytile, zoom) {
  const n = Math.pow(2, zoom);
  const longDegree = xtile / n * 360.0 - 180.0;
  const latDegree = rad2deg(Math.atan(Math.sinh(Math.PI * (1 - 2 * ytile / n))));
  return [longDegree, latDegree];
}

function getTileNumber(long, lat, zoom) {
  const xtile = (long + 180)/360 * Math.pow(2, zoom);
  const ytile = (1 - Math.log(Math.tan(deg2rad(lat)) + sec(deg2rad(lat)))/Math.PI)/2 * Math.pow(2, zoom);
  return [xtile, ytile];
}

function getBoundingBox(long, lat, zoom, width, height) {  
  const [xtile, ytile] = getTileNumber(parseFloat(long), parseFloat(lat), zoom);
  
  const tileSize = 256;

	const xtile_s = (xtile * tileSize - width) / tileSize;
	const ytile_s = (ytile * tileSize - height) / tileSize;
	const xtile_e = (xtile * tileSize + width) / tileSize;
	const ytile_e = (ytile * tileSize + height) / tileSize;

	const [long_s, lat_s] = getLongLat(xtile_s, ytile_s, zoom);
	const [long_e, lat_e] = getLongLat(xtile_e, ytile_e, zoom);
  
  return {
    long_s,
    lat_e,
    long_e,
    lat_s
  }
}

module.exports.getBoundingBox = getBoundingBox;