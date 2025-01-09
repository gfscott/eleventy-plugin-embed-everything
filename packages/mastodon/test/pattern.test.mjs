import { describe, it, expect } from 'vitest';
import patternGenerator from '../lib/pattern.js';
import validStrings from './_validStrings.mjs';

const pattern = patternGenerator('social.vivaldi.net');

describe('URL pattern tests', () => {
  validStrings.forEach((str, index) => {
    it(`Regex test ${index}: ${str}`, () => {
      expect(str).toMatch(pattern);
    });
  });
});

