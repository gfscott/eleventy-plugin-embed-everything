const test = require('ava');

/**
 * This test mocks the behavior of how the plugin index file works.
 * The purpose is to test that the index of the replacement is passed
 * correctly to the embed function. This is important because the index
 * is used to determine whether to use the lite embed or the default embed.
 * The lite embed needs to know whether it is the first embed in the content
 * so that it can determine whether to include additional markup, such as
 * style and script tags. The default embed doesn't need to be aware of its
 * index.
 */
test('Index of replacements inside content works as expected', (t) => {
  // `bar` appears twice in the test string.
  const content = 'foo bar foo bar';
  // We expect *only* the first `bar` to be replaced with `baz`.
  const expected = 'foo baz foo bar';
  // The pattern is global, so it will match all instances of `bar`.
  const pattern = /bar/g;
  // This function mocks the way the index file handles content replacement.
  // the match and config arguments aren't used in this test.
  const mockEmbed = (match, config, i) => {
    return i === 0 ? 'baz' : 'bar';
  };
  // Start the index at 0.
  let index = 0;
  // Call mockEmbed for each match, passing the index and then incrementing it.
  const result = content.replace(pattern, (...match) => mockEmbed(match, {}, index++));
  // The resulting string should only replace the first instance of `bar`.
  t.is(result, expected)
})