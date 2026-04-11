import { test } from 'node:test';
import assert from 'node:assert/strict';
import { valid, invalid } from './_strings.mjs';
import { invalid as invalidUrls } from './_urls.mjs';
import pattern from '../lib/pattern.js';

for (let [index, str] of valid.entries()) {
  test(`Valid-${index}: (${str})`, async () => {
    pattern.lastIndex = 0;
    assert.match(str, pattern)
  });
}

for (let [index, str] of invalid.entries()) {
  test(`Invalid-${index}: (${str})`, async () => {
    pattern.lastIndex = 0;
    assert.doesNotMatch(str, pattern)
  });
}

for (let [index, str] of invalidUrls.entries()) {
  test(`Invalid-URL-${index}: (<p>${str}</p>)`, async () => {
    pattern.lastIndex = 0;
    assert.doesNotMatch(`<p>${str}</p>`, pattern)
  });
}
