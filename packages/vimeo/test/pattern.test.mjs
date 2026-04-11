import { test } from 'node:test';
import assert from 'node:assert/strict';
import pattern from '../lib/pattern.js';
import {publicUrls, privateUrls} from './_validUrls.mjs';

const validUrls = [...publicUrls, ...privateUrls];

for (let [index, url] of validUrls.entries()) {

  test(`Regex test ${index}-a: ${url}`, async () => {
    pattern.lastIndex = 0;
    let str = `<p>${url}</p>`
    assert.match(str, pattern);
  });

  test(`Regex test ${index}-b: ${url}, with whitespace`, async () => {
    pattern.lastIndex = 0;
    let str = `<p>
                ${url}
              </p>`
    assert.match(str, pattern);
  });

  test(`Regex test ${index}-c: ${url}, with link`, async () => {
    pattern.lastIndex = 0;
    let str = `<p><a href="${url}">${url}</a></p>`
    assert.match(str, pattern);
  });

  test(`Regex test ${index}-d: ${url}, with link and whitespace`, async () => {
    pattern.lastIndex = 0;
    let str = `<p>
                <a href="${url}">
                  ${url}
                </a>
              </p>`
    assert.match(str, pattern);
  });

}
