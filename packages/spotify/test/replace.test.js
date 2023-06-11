const test = require('ava');
const defaults = require('../lib/defaults.js');
const pattern = require('../lib/pattern.js');
const replace = require('../lib/replace.js');
const {album, artist, playlist, userPlaylist, track, episode, show} = require('./_validUrls.js');

const allStrings = {
  album: paragraphs(album),
  artist: paragraphs(artist),
  playlist: paragraphs(playlist),
  userPlaylist: paragraphs(userPlaylist),
  track: paragraphs(track),
  episode: paragraphs(episode),
  show: paragraphs(show),
}

/**
 * Albums
 */
for (let [index, str] of allStrings.album.entries()) {

  test(`${index}: Embed album, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-album-75qojmHz1id8sL2LDR5qVz" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-album"><iframe style="border-radius:12px;" title="Spotify album" src="https://open.spotify.com/embed/album/75qojmHz1id8sL2LDR5qVz" width="100%" height="352" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

  test(`${index}: Embed album, custom options`, async t => {
    const config = Object.assign({}, defaults, {width: 300, height: 400, embedClass: 'custom-class', iframeStyle: 'border-radius: 0;'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-album-75qojmHz1id8sL2LDR5qVz" class="custom-class custom-class-album"><iframe style="border-radius: 0;" title="Spotify album" src="https://open.spotify.com/embed/album/75qojmHz1id8sL2LDR5qVz" width="300" height="400" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

}

/**
 * Artists
 */
for (let [index, str] of allStrings.artist.entries()) {

  test(`${index}: Embed artist, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-artist-066X20Nz7iquqkkCW6Jxy6" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-artist"><iframe style="border-radius:12px;" title="Spotify artist" src="https://open.spotify.com/embed/artist/066X20Nz7iquqkkCW6Jxy6" width="100%" height="352" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

  test(`${index}: Embed artist, custom options`, async t => {
    const config = Object.assign({}, defaults, {width: 300, height: 400, embedClass: 'custom-class', iframeStyle: 'border-radius: 0;'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-artist-066X20Nz7iquqkkCW6Jxy6" class="custom-class custom-class-artist"><iframe style="border-radius: 0;" title="Spotify artist" src="https://open.spotify.com/embed/artist/066X20Nz7iquqkkCW6Jxy6" width="300" height="400" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })
}

/**
 * Playlists
 */
for (let [index, str] of allStrings.playlist.entries()) {

  test(`${index}: Embed playlist, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-playlist-7zv2xFPTH1MBynYafuvtCj" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-playlist"><iframe style="border-radius:12px;" title="Spotify playlist" src="https://open.spotify.com/embed/playlist/7zv2xFPTH1MBynYafuvtCj" width="100%" height="352" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

  test(`${index}: Embed playlist, custom options`, async t => {
    const config = Object.assign({}, defaults, {width: 300, height: 400, embedClass: 'custom-class', iframeStyle: 'border-radius: 0;'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-playlist-7zv2xFPTH1MBynYafuvtCj" class="custom-class custom-class-playlist"><iframe style="border-radius: 0;" title="Spotify playlist" src="https://open.spotify.com/embed/playlist/7zv2xFPTH1MBynYafuvtCj" width="300" height="400" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })
}

/**
 * User playlists
 */
for (let [index, str] of allStrings.userPlaylist.entries()) {

  test(`${index}: Embed user playlist, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-playlist-7zv2xFPTH1MBynYafuvtCj" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-playlist"><iframe style="border-radius:12px;" title="Spotify playlist" src="https://open.spotify.com/embed/playlist/7zv2xFPTH1MBynYafuvtCj" width="100%" height="352" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

  test(`${index}: Embed user playlist, custom options`, async t => {
    const config = Object.assign({}, defaults, {width: 300, height: 400, embedClass: 'custom-class', iframeStyle: 'border-radius: 0;'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-playlist-7zv2xFPTH1MBynYafuvtCj" class="custom-class custom-class-playlist"><iframe style="border-radius: 0;" title="Spotify playlist" src="https://open.spotify.com/embed/playlist/7zv2xFPTH1MBynYafuvtCj" width="300" height="400" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })
}

/**
 * Tracks
 */

for (let [index, str] of allStrings.track.entries()) {

  test(`${index}: Embed track, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-track-3gsCAGsWr6pUm1Vy7CPPob" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-track"><iframe style="border-radius:12px;" title="Spotify track" src="https://open.spotify.com/embed/track/3gsCAGsWr6pUm1Vy7CPPob" width="100%" height="352" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

  test(`${index}: Embed track, custom options`, async t => {
    const config = Object.assign({}, defaults, {width: 300, height: 400, embedClass: 'custom-class', iframeStyle: 'border-radius: 0;'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-track-3gsCAGsWr6pUm1Vy7CPPob" class="custom-class custom-class-track"><iframe style="border-radius: 0;" title="Spotify track" src="https://open.spotify.com/embed/track/3gsCAGsWr6pUm1Vy7CPPob" width="300" height="400" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })
}

/**
 * Podcast episodes
 */

for (let [index, str] of allStrings.episode.entries()) {

  test(`${index}: Embed episode, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-episode-7G5O2wWmch1ciYDPZS4a4O" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-episode"><iframe style="border-radius:12px;" title="Spotify episode" src="https://open.spotify.com/embed/episode/7G5O2wWmch1ciYDPZS4a4O" width="100%" height="352" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

  test(`${index}: Embed episode, custom options`, async t => {
    const config = Object.assign({}, defaults, {width: 300, height: 400, embedClass: 'custom-class', iframeStyle: 'border-radius: 0;'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-episode-7G5O2wWmch1ciYDPZS4a4O" class="custom-class custom-class-episode"><iframe style="border-radius: 0;" title="Spotify episode" src="https://open.spotify.com/embed/episode/7G5O2wWmch1ciYDPZS4a4O" width="300" height="400" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

}

/**
 * Podcast profiles
 */
for (let [index, str] of allStrings.show.entries()) {

  test(`${index}: Embed show, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-show-3rDR8CfpIEMpITG2UC3w5W" class="eleventy-plugin-embed-spotify eleventy-plugin-embed-spotify-show"><iframe style="border-radius:12px;" title="Spotify show" src="https://open.spotify.com/embed/show/3rDR8CfpIEMpITG2UC3w5W" width="100%" height="352" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })

  test(`${index}: Embed show, custom options`, async t => {
    const config = Object.assign({}, defaults, {width: 300, height: 400, embedClass: 'custom-class', iframeStyle: 'border-radius: 0;'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="spotify-show-3rDR8CfpIEMpITG2UC3w5W" class="custom-class custom-class-show"><iframe style="border-radius: 0;" title="Spotify show" src="https://open.spotify.com/embed/show/3rDR8CfpIEMpITG2UC3w5W" width="300" height="400" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>')
  })
}





/**
 * Paragraphs helper function
 * @param {Array} arr 
 * @returns Array of strings with all valid combinations of paragraphs and links
 */
function paragraphs(arr) {
  let out = []
  arr.map(url => {
    // No whitespace
    out.push(`<p>${url}</p>`)
    
    // With whitespace
    out.push(`<p>
      ${url}
    </p>`)

    // With link, no whitespace
    out.push(`<p><a href="${url}">${url}</a></p>`)
    
    // With whitespace and link
    out.push(`<p>
      <a href="${url}">
        ${url}
      </a>
    </p>`)
  })
  return out
}