module.exports = function(match, config) {

  const {long, lat, zoom} = match.pop();
  const bbox = longLatToBbox(long, lat, zoom, 425, 350);
  
  let out = `<div class="${config.embedClass}" style="aspect-ratio: 1/1">`;
  out += `<iframe width="100%" height="100%" frameborder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik"></iframe>`;
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

function getLonLat(xtile, ytile, zoom) {
  const n = Math.pow(2, zoom);
  const lonDegree = xtile / n * 360.0 - 180.0;
  const latDegree = rad2deg(Math.atan(Math.sinh(Math.PI * (1 - 2 * ytile / n))));
  return [lonDegree, latDegree];
}

function getTileNumber(lon, lat, zoom) {
  const xtile = (lon + 180)/360 * Math.pow(2, zoom);
  const ytile = (1 - Math.log(Math.tan(deg2rad(lat)) + sec(deg2rad(lat)))/Math.PI)/2 * Math.pow(2,zoom);
  return [xtile, ytile];
}

function longLatToBbox(lon, lat, zoom, embedWidth, embedHeight) {  
  const [xtile, ytile] = getTileNumber(parseFloat(lon), parseFloat(lat), zoom);
  const tileSize = 256;

	const xtile_s = (xtile * tileSize - embedWidth) / tileSize;
	const ytile_s = (ytile * tileSize - embedHeight) / tileSize;
	const xtile_e = (xtile * tileSize + embedWidth) / tileSize;
	const ytile_e = (ytile * tileSize + embedHeight) / tileSize;

	const [lon_s, lat_s] = getLonLat(xtile_s, ytile_s, zoom);
	const [lon_e, lat_e] = getLonLat(xtile_e, ytile_e, zoom);
  
  return encodeURIComponent(`${lon_s},${lat_e},${lon_e},${lat_s}`);
}

module.exports.longLatToBbox = longLatToBbox;