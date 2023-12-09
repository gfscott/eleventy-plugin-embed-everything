const test = require('ava');
const {valid, invalid} = require('./_inc/strings.js');
const {invalid: invalidUrls} = require('./_inc/urls.js');
const pattern = require('../lib/pattern.js');

for (let [index, str] of valid.entries()) {
  test(`Valid-${index}: (${str})`, async t => {
    pattern.lastIndex = 0;
    t.regex(str, pattern)
  });
}

for (let [index, str] of invalid.entries()) {
  test(`Invalid-${index}: (${str})`, async t => {
    pattern.lastIndex = 0;
    t.notRegex(str, pattern)
  });
}

for (let [index, str] of invalidUrls.entries()) {
  test(`Invalid-URL-${index}: (<p>${str}</p>)`, async t => {
    pattern.lastIndex = 0;
    t.notRegex(`<p>${str}</p>`, pattern)
  });
}