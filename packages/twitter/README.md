# eleventy-plugin-embed-twitter

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-twitter?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-twitter)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-twitter/test-and-codecov.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-twitter/actions?query=workflow%3A%22Node.js+CI+and+Codecov%22)
[![codecov](https://img.shields.io/codecov/c/github/gfscott/eleventy-plugin-embed-twitter?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-embed-twitter)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-twitter?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-twitter/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds Tweets from URLs in markdown files.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-twitter
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedTwitter = require("eleventy-plugin-embed-twitter");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedTwitter);
};
```

## Usage

To embed a Tweet into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://twitter.com/SaraSoueidan/status/1289865845053652994s

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Tweet by Sara Soueidan: “I've been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.”](https://user-images.githubusercontent.com/547470/91612120-bb73c680-e94a-11ea-9f56-cb7a1ee50e90.png)

## Configure

### Plugin default options

The plugin’s default settings reside in [lib/pluginDefaults.js](lib/pluginDefaults.js). Pass an options object to the plugin to override any of its default settings.

<table style="width: 100%;">
  <thead>
    <tr>
      <td style="width:15%">Option</td>
      <td style="width:15%">Type</td>
      <td style="width:15%">Default <br>value</td>
      <td style="width:40%">Notes</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✨ <b>New in v1.3.0!</b><br><code>align</code></td>
      <td>String</td>
      <td><code>undefined</code></td>
      <td>Change to <code>left</code>, <code>center</code>, or <code>right</code> to control the embed alignment.</td>
    </tr>
    <tr>
      <td>✨ <b>New in v1.3.0!</b><br><code>cacheDuration</code></td>
      <td>String</td>
      <td><code>5m</code></td>
      <td>How long to cache the response from Twitter’s servers when <code>cacheText</code> is <code>true</code>. Use the <a href="https://www.11ty.dev/docs/plugins/cache/#change-the-cache-duration"><code>eleventy-cache-assets</code></a> syntax to set the duration. See also <a href="#cacheText">Caching Tweet content as plain HTML</a>.</td>
    </tr>
    <tr>
      <td><code>cacheText</code></td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Whether to save the Tweet content as plain HTML. Causes network calls on save. See <a href="#cacheText">Caching Tweet content as plain HTML</a> for more details.</td>
    </tr>
    <tr>
      <td>✨ <b>New in v1.3.0!</b><br><code>cards</code></td>
      <td>String</td>
      <td><code>undefined</code></td>
      <td>Change to <code>hidden</code> to deactivate embedded media in Tweets, such as images or video.</td>
    </tr>
    <tr>
      <td>✨ <b>New in v1.3.0!</b><br><code>conversation</code></td>
      <td>String</td>
      <td><code>undefined</code></td>
      <td>Change to <code>none</code> to deactivate default automatic threading of the original Tweet when embedding a reply.</td>
    </tr>
    <tr>
      <td><code>doNotTrack</code></td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Change to <code>true</code> to opt out of Twitter’s <a href="https://developer.twitter.com/en/docs/twitter-for-websites/privacy">personalization features</a>.</td>
    </tr>
    <tr>
      <td><code>embedClass</code></td>
      <td>String</td>
      <td><code>eleventy-plugin-embed-twitter</code></td>
      <td>Class name applied to the <code>div</code> element that wrapps the embedded Tweet <code>blockquote</code>. Use the default string to target the embeds with CSS, or substitute your preferred string.</td>
    </tr>
    <tr>
      <td>✨ <b>New in v1.3.0!</b><br><code>lang</code></td>
      <td>String</td>
      <td><code>undefined</code></td>
      <td>Change to any of Twitter’s <a href="https://developer.twitter.com/en/docs/twitter-for-websites/supported-languages">supported language codes</a> to localize embedded Tweet components. Note that this has no connection to the language of the Tweet text itself!</td>
    </tr>
    <tr>
      <td><code>theme</code></td>
      <td>String</td>
      <td><code>undefined</code></td>
      <td>By default, Tweets embed with a black-on-white color scheme. Change to <code>dark</code> to switch to dark mode display.</td>
    </tr>
    <tr>
      <td>✨ <b>New in v1.3.0!</b><br><code>width</code></td>
      <td>Number</td>
      <td><code>undefined</code></td>
      <td>Change to a whole number to control the width, in pixels, of embedded Tweets. Twitter <a href="https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference">recommends</a> keeping this value between 250 and 550.</td>
    </tr>
    <tr style="background-color: #444; color: #eee; font-weight: bold">
      <td><code>twitterScript</code></td>
      <td colspan="3">Object</td>
    </tr>
    <tr>
      <td><code>twitterScript.async</code></td>
      <td>Boolean</td>
      <td><code>true</code></td>
      <td>By default, Twitter’s JavaScript loads asynchronously. Changing to <code>false</code> will load it synchronously. Not recommended, as this harms page rendering performance.</td>
    </tr>
    <tr>
      <td><code>twitterScript.charset</code></td>
      <td>String</td>
      <td><code>utf-8</code></td>
      <td>The <code>charset</code> attribute for the Twitter <code>script</code> tag. This mirrors Twitter’s default embed approach, although <code>charset</code> is <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-charset">deprecated</a>. Expect this option to be removed in a future release.</td>
    </tr>
    <tr>
      <td><code>twitterScript.defer</code></td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Change to <code>true</code> to add a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer"><code>defer</code></a> attribute to the Twitter script element. In most cases <code>async</code> is enough.</td>
    </tr>
    <tr>
      <td><code>twitterScript.enabled</code></td>
      <td>Boolean</td>
      <td><code>true</code></td>
      <td>Change this to <code>false</code> to prevent the plugin from adding the Twitter <code>script</code> tag. Use this if you’re implementing your own strategy for loading Twitter’s <code>widgets.js</code> script.</td>
    </tr>
    <tr>
      <td><code>twitterScript.src</code></td>
      <td>String</td>
      <td><code>https://platform.twitter.com/widgets.js</code></td>
      <td>The official URL for Twitter’s <code>widgets.js</code> script. This may be useful if you prefer to self-host your own version of the code instead of loading it from Twitter’s CDN.</td>
    </tr>
  </tbody>
</table>

<span id="cacheText"></span>

### Caching Tweet content as plain HTML

By default, the plugin does _not_ save the text of the Tweet as plain HTML. That’s because doing so requires making a network request to Twitter. By default, we don’t make network calls unless you decide to enable them. To save the complete Tweet text when processing files in Eleventy, turn on the `cacheText` option:

```js
eleventyConfig.addPlugin(embedTwitter, {
	cacheText: true,
});
```

As of v1.3.0, `cacheText` uses [`eleventy-cache-assets`](https://www.11ty.dev/docs/plugins/cache/) to download the text of the Tweet and cache it locally for up to 5 minutes, which reduces the overall number of network calls and speeds up builds. You can configure the cache timing with the `cacheDuration` option. If the plugin experiences any network failure (such as if you're not connected to the internet), then it simply won’t complete the embed and the Tweet URL will be rendered as plain text.

## Notes and caveats

- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize Twitter URLs, wrapped in an HTML `<p>` tag or, optionally, additionally wrapped in an anchor tag. If your Markdown parser produces any other output, it won’t be recognized.
- The plugin supports common URL variants as well. Check the [supported URL variants](test/inc/validStrings.js) to see the complete list, but there are conceivably valid Twitter URLs that wouldn’t be recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-twitter/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
- By necessity, this plugin will add a call to Twitter’s third-party JavaScript file. It does this once per page, if that page contains a Twitter embed.
- Currently the plugin supports only individual Tweets. Embedding timelines, lists, or Twitter Moments isn’t possible right now.
