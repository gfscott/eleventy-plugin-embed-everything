import test from 'ava';
import spotPattern from '../lib/spotPattern.js';
import validUrls from './_validUrls.mjs';
import invalidUrls from './_invalidUrls.mjs';

/**
 * =====================================================
 * For all possible valid URLs, test that the pattern is
 * spotted correctly.
 * 
 * Getting indexes with a for...of loop:
 * https://reactgo.com/javascript-get-index-for-of-loop/
 */
for (let [index, url] of validUrls.entries()) {
  
  test(`Valid-${index}: without link, without whitespace`, t => {
    t.truthy(spotPattern(`<p>${url}</p>`));
  }); 
  
  test(`Valid-${index}: without link, with whitespace`, t => {
    t.truthy(spotPattern(`<p>
      ${url}
    </p>`));
  }); 
  
  test(`Valid-${index}: with link, without whitespace`, t => {
    t.truthy(spotPattern(`<p><a href="${url}">${url}</a></p>`));
  }); 

  test(`Valid-${index}: with link, with whitespace`, t => {
    t.truthy(spotPattern(`<p>
      <a href="${url}">
        ${url}
      </a>
    </p>`));
  });

}

/**
 * =======================================================
 * For all possible invalid URLs, test that the pattern is
 * rejected correctly.
 * 
 * Getting indexes with a for...of loop:
 * https://reactgo.com/javascript-get-index-for-of-loop/
 */
 for (let [index, url] of invalidUrls.entries()) {
  
  test(`Invalid-${index}: without link, without whitespace`, t => {
    t.falsy(spotPattern(`<p>${url}</p>`));
  }); 
  
  test(`Invalid-${index}: without link, with whitespace`, t => {
    t.falsy(spotPattern(`<p>
      ${url}
    </p>`));
  }); 
  
  test(`Invalid-${index}: with link, without whitespace`, t => {
    t.falsy(spotPattern(`<p><a href="${url}">${url}</a></p>`));
  }); 

  test(`Invalid-${index}: with link, with whitespace`, t => {
    t.falsy(spotPattern(`<p>
      <a href="${url}">
        ${url}
      </a>
    </p>`));
  });

}