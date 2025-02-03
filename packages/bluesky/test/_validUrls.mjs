/**
 * Test URLs for Bluesky embeds
 */

export const validUrls = [
  "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v",
  "https://bsky.app/profile/stereogum.bsky.social/post/3lh27cswiwc27/",
  "http://bsky.app/profile/merlevans.bsky.social/post/3lgzl25gr2c2k",
  "//bsky.app/profile/bsky.app/post/3le6bze3nus2c",
  "bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v",
  "https://bsky.app/profile/did:plc:yc6gmb3bo56qotdsywnsxrxp/post/3lgvpv7k5sc26",
  "https://bsky.app/profile/merlevans.bsky.social/post/3lgzl25gr2c2k",
  "https://bsky.app/profile/shellen.com/post/3ldmp5qd6es2p",
  "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo",
  "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo=bar",
  "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo&bar",
  "https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo=bar&baz=qux"
];

export const invalidUrls = [
  "https://bsky.app/profile/bsky.app/post/abc",
  "https://bsky.app/user/bsky.app/post/3lgu4lg6j2k2v",
  "https://bsky.app/profile/bsky.app/status/3lgu4lg6j2k2v",
  "https://example.com/profile/bsky.app/post/3lgu4lg6j2k2v"
];
