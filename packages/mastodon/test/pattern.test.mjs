import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
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
describe("Snapshot regex library output", () => {
	it("Produces the same RegExp output across regex versions", (t) => {
		t.assert.snapshot(String(pattern));
	});
});

const allStrings = [...federatedStrings, ...originStrings];

describe('Valid federated URL patterns', () => {
  allStrings.forEach((str, index) => {
    it(`Regex test ${index}: ${str}`, () => {
			pattern.lastIndex = 0;
      assert.match(str, pattern);
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
			assert.equal(hostname, 'social.vivaldi.net');
			assert.equal(user, 'username');
			assert.equal(server, 'example.com');
			assert.equal(id, '123456789123456789');
			assert.equal(url, 'social.vivaldi.net/@username@example.com/123456789123456789');
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
			assert.equal(hostname, 'social.vivaldi.net');
			assert.equal(user, 'foo');
			assert.equal(id, '987654321987654321');
			assert.equal(server, undefined);
			assert.equal(url, 'social.vivaldi.net/@foo/987654321987654321');
    });
  });
});
