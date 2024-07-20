import test from 'ava';
import pattern from '../lib/pattern.js';
import validUrls from './_validUrls.mjs';

for (let [index, url] of validUrls.entries()) {

  test(`Regex test ${index}-a: ${url}`, async t => {
    pattern.lastIndex = 0;
    let str = `<p>${url}</p>`
    t.regex(str, pattern);
  });

  test(`Regex test ${index}-b: ${url}, with whitespace`, async t => {
    pattern.lastIndex = 0;
    let str = `<p>
                ${url}
              </p>`
    t.regex(str, pattern);
  });

  test(`Regex test ${index}-c: ${url}, with link`, async t => {
    pattern.lastIndex = 0;
    let str = `<p><a href="${url}">${url}</a></p>`
    t.regex(str, pattern);
  });

  test(`Regex test ${index}-d: ${url}, with link and whitespace`, async t => {
    pattern.lastIndex = 0;
    let str = `<p>
                <a href="${url}">
                  ${url}
                </a>
              </p>`
    t.regex(str, pattern);
  });

}
