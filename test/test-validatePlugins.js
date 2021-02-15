const test = require('ava');
const validatePlugins = require('../lib/validatePlugins.js');
const { defaultPlugins, validPlugins } = require('../lib/pluginDefaults.js');

test(
  `Validator returns expected default plugin array`,
  (t) => {
    output = validatePlugins(defaultPlugins);
    t.deepEqual(output, defaultPlugins);
  },
);

test(
  `Validator rejects invalid plugin strings, returns defaults`,
  (t) => {
    let list = [...defaultPlugins, 'wrong'];
    output = validatePlugins(list);
    t.deepEqual(output, defaultPlugins);
  },
);

test(
  `Validator accepts valid non-default plugin string`,
  (t) => {
    let list = [...defaultPlugins, 'soundcloud'];
    output = validatePlugins(list);
    t.deepEqual(output, validPlugins);
  },
);

test(
  `Validator returns non-alphabetical list in alphabetical order`,
  (t) => {
    let list = ['youtube', 'vimeo', 'twitter'];
    output = validatePlugins(list);
    t.deepEqual(output, ['twitter', 'vimeo', 'youtube']);
  },
);

test(
  `Validator returns expected valid plugin list subset`,
  (t) => {
    let list = ['instagram', 'soundcloud', 'spotify'];
    output = validatePlugins(list);
    t.deepEqual(output, list);
  },
);

test(
  `Validator returns expected subset, but rejects invalid plugin`,
  (t) => {
    let list = ['instagram', 'spotify', 'wrong'];
    output = validatePlugins(list);
    t.deepEqual(output, ['instagram', 'spotify']);
  },
);

test(
  `Validator rejects non-string array items`,
  (t) => {
    let list = [false, 'instagram', 'spotify', true, 123, {foo: 'bar'}];
    output = validatePlugins(list);
    t.deepEqual(output, ['instagram', 'spotify']);
  },
);