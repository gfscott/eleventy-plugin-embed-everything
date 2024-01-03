const test = require('ava');
const delay = require('delay');
const replaceAsync = require('string-replace-async');

  const content = 'foo bar foo bar';
  const expected = 'foo baz foo bar';
  const pattern = /bar/g;

/**
 * These tests compare the results of the sync and async replacement functions.
 * The purpose is to ensure that the async function produces the same results
 * as the sync function. This is important because the async function comes
 * from a third-party library, and it's important to know that it behaves the
 * same way as the native Javascript replace function.
 * 
 * The string-replace-async library seems solid but we're pinning an older
 * CJS version and so we want be doubly sure that it works as expected.
 */

const bar = async () => {
  await delay(100);
  return 'bar'
};

const baz = async () => {
  await delay(100);
  return 'baz'
};

const syncReplace = (_content, _pattern, index) => {
  if(index === 0) {
    return 'baz';
  }
  return 'bar';
};

const asyncReplace = async (_content, _pattern, index) => {
  if(index === 0) {
    return await baz();
  }
  return await bar();
};

test('Async replace produces identical results to sync replace', async (t) => {
  
  // With index 0, result is "foo baz foo bar"
  const syncResult = syncReplace(content, pattern, 0);
  const asyncResult = await asyncReplace(content, pattern, 0);
  
  // With index 1, result is "foo bar foo bar"
  const syncResult_index1 = syncReplace(content, pattern, 1);
  const asyncResult_index1 = await asyncReplace(content, pattern, 1);
  
  t.is(syncResult, asyncResult);
  t.is(syncResult_index1, asyncResult_index1);

});

/**
 * This test replicates the behavior of how the plugin index file works.
 * The purpose is to test that the index variable is incremented correctly,
 * and that the resulting string is correct. It tests both that the mock
 * embed function finds the matches as expected, and that it returns the 
 * expected output string as a result.
 */
test('Index of replacements inside content works as expected', async (t) => {

  // The callback function should find two matches with these exact indexes.
  const expectedMatches = [
    ['bar', 4, 'foo bar foo bar'],
    ['bar', 12, 'foo bar foo bar'],
  ]
  const actualMatches = [];

  // Note: config is not used in this test but we pass it anyway.
  const embed_mock = async (match, _config, index) => {
    
    // For each match found, push the regex match array to the "actualMatches" array.
    actualMatches.push(match);

    // If the index is 0, return "baz". Otherwise, return "bar".
    if (index === 0) {
      await delay(100)
      return await baz();
    }
    await delay(100)
    return await bar();
  };
  
  // Start the index at 0.
  let index = 0;
  // Call embed_mock for each match, passing the index and then incrementing it.
  // Testing this ensures that the incrementing of the index inside the callback
  // works as expected.
  const result = await replaceAsync(content, pattern, async (...match) => await embed_mock(match, {}, index++));  
  
  t.is(result, expected)
  t.deepEqual(actualMatches, expectedMatches)
});

