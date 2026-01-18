import { describe, it, expect } from 'vitest';
import patternGenerator from '../lib/pattern.js';
import {federatedStrings, originStrings} from './_validStrings.mjs';

const pattern = patternGenerator('social.vivaldi.net');

/**
 * The `regex` library outputs a native RegExp object.
 * This test snapshots that output, and will fail if the
 * output changes between regex library versions.
 * That's not necessarily a problem, but should be reviewed
 * for compatibility.
 */
describe('Snapshot regex library output', () => {
  it('Produces the same RegExp output across regex versions', () => {
    const pattern = patternGenerator('social.vivaldi.net');
    expect(pattern.toString()).toMatchSnapshot();
  });
});


const allStrings = [...federatedStrings, ...originStrings];

describe('Valid federated URL patterns', () => {
  allStrings.forEach((str, index) => {
    it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
      expect(str).toMatch(pattern);
    });
  });
});

// social.vivaldi.net/@username@example.com/123456789123456789
describe('Destructuring works for federated posts', () => {
  federatedStrings.forEach((str, index) => {
    it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
			const match = pattern.exec(str);
			const { hostname, user, server, id, url } = match.groups;
			expect(hostname).toBe('social.vivaldi.net');
			expect(user).toBe('username');
			expect(server).toBe('example.com');
			expect(id).toBe('123456789123456789');
			expect(url).toBe('social.vivaldi.net/@username@example.com/123456789123456789');
    });
  });
});

// social.vivaldi.net/@foo/987654321987654321
describe('Destructuring works for origin posts', () => {
  originStrings.forEach((str, index) => {
    it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
			const match = pattern.exec(str);
			const { hostname, user, server, id, url } = match.groups;
			expect(hostname).toBe('social.vivaldi.net');
			expect(user).toBe('foo');
			expect(id).toBe('987654321987654321');
			expect(server).toBe(undefined);
			expect(url).toBe('social.vivaldi.net/@foo/987654321987654321');
    });
  });
});
