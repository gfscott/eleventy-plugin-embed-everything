import { describe, it, expect } from 'vitest';
import patternGenerator from '../lib/pattern.js';
import replace from '../lib/replace.js';
import { _getFederatedStatus, _getOriginOembed } from '../lib/replace.js';
import asyncReplace from 'string-replace-async';

const config = {};
const pattern = patternGenerator('social.vivaldi.net');
const str = '<p>https://social.vivaldi.net/@eleventy@fosstodon.org/113198584572922516?asdf=1234</p>';

const foo = await asyncReplace(str, pattern, (...match) => replace(match, config));


describe('TODO', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});

