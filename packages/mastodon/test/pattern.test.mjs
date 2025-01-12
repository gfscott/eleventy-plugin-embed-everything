import { describe, it, expect } from 'vitest';
import patternGenerator from '../lib/pattern.js';
import validStrings from './_validStrings.mjs';

const pattern = patternGenerator('social.vivaldi.net');

describe('URL valid pattern tests', () => {
  validStrings.forEach((str, index) => {
    it(`Regex test ${index}: ${str}`, () => {
      expect(str).toMatch(pattern);
    });
  });
});

describe('Destructuring works as expected', () => {

		it('Captures expected data for federated toots', () => {
			const match = '<p>https://social.vivaldi.net/@foo@example.com/123</p>'.match(pattern);
			const { hostname, user, server, id } = match.groups;
			expect(hostname).toBe('social.vivaldi.net');
			expect(user).toBe('foo');
			expect(server).toBe('example.com');
			expect(id).toBe('123');
		});

		it('Federated server is absent for non-federated toots', () => {
			const match = '<p>https://social.vivaldi.net/@foo/123</p>'.match(pattern);
			const { hostname, user, server, id } = match.groups;
			expect(hostname).toBe('social.vivaldi.net');
			expect(user).toBe('foo');
			expect(id).toBe('123');
			expect(server).toBe(undefined);
		});

});
