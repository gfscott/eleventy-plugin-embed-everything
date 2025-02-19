import { expect, test, describe } from 'vitest';
import { coerceToArray, appendEach, prependEach } from './index.js';
import permuteArrays from './index.js';

describe('coerceToArray', () => {
	test('should return the input array if it is already an array', () => {
		const input = [1, 2, 3];
		const result = coerceToArray(input);
		expect(result).toEqual(input);
	});

	test('should convert a string to an array with the string as the only element', () => {
		const input = 'hello';
		const result = coerceToArray(input);
		expect(result).toEqual(['hello']);
	});

	test('should return undefined for any other input type', () => {
		const input = { key: 'value' };
		const result = coerceToArray(input);
		expect(result).toBe(undefined);
	});
});

describe('appendEach', () => {
	test('should append each suffix to each term in the array', () => {
		const term = ['fast', 'slow'];
		const suffixes = ['er', 'est'];
		const result = appendEach(term, suffixes);
		expect(result).toEqual(['faster', 'fastest', 'slower', 'slowest']);
	});

	test('should return an empty array if the term is an empty array', () => {
		const term = [];
		const suffixes = ['s', 'es'];
		const result = appendEach(term, suffixes);
		expect(result).toEqual([]);
	});

	test('should return an empty array if the suffixes array is empty', () => {
		const term = ['apple', 'banana'];
		const suffixes = [];
		const result = appendEach(term, suffixes);
		expect(result).toEqual([]);
	});

	test('should return an empty array if both the term and suffixes arrays are empty', () => {
		const term = [];
		const suffixes = [];
		const result = appendEach(term, suffixes);
		expect(result).toEqual([]);
	});
});

describe('prependEach', () => {
	test('should prepend each prefix to each term in the array', () => {
		const term = ['fast', 'slow'];
		const prefixes = ['super', 'ultra'];
		const result = prependEach(term, prefixes);
		expect(result).toEqual(['superfast', 'ultrafast', 'superslow', 'ultraslow']);
	});

	test('should return an empty array if the term is an empty array', () => {
		const term = [];
		const prefixes = ['big', 'small'];
		const result = prependEach(term, prefixes);
		expect(result).toEqual([]);
	});

	test('should return an empty array if the prefixes array is empty', () => {
		const term = ['apple', 'banana'];
		const prefixes = [];
		const result = prependEach(term, prefixes);
		expect(result).toEqual([]);
	});

	test('should return an empty array if both the term and prefixes arrays are empty', () => {
		const term = [];
		const prefixes = [];
		const result = prependEach(term, prefixes);
		expect(result).toEqual([]);
	});
});

describe('permuteArrays', () => {
	test('should prepend each prefix and append each suffix to each term in the array', () => {
		const term = ['a'];
		const prefixes = ['d', 'r'];
		const suffixes = ['d', 'm'];
		const result = permuteArrays(term, prefixes, suffixes);
		expect(result).toEqual(['da', 'ra', 'ad', 'am', 'dad', 'dam', 'rad', 'ram']);
	});

	test('should return an empty array if the term is an empty array', () => {
		const term = [];
		const prefixes = ['big', 'small'];
		const suffixes = ['s', 'es'];
		const result = permuteArrays(term, prefixes, suffixes);
		expect(result).toEqual([]);
	});

	test('should return term with suffixes if the prefixes array is empty', () => {
		const term = ['high', 'low'];
		const prefixes = [];
		const suffixes = ['ly', 'est'];
		const result = permuteArrays(term, prefixes, suffixes);
		expect(result).toEqual(['highly', 'highest', 'lowly', 'lowest']);
	});

	test('should return an empty array if the suffixes array is empty', () => {
		const term = ['way', 'line'];
		const prefixes = ['high', 'by'];
		const suffixes = [];
		const result = permuteArrays(term, prefixes, suffixes);
		expect(result).toEqual(['highway', 'byway', 'highline', 'byline']);
	});

	test('should return an empty array if both arrays are empty', () => {
		const term = [];
		const prefixes = [];
		const suffixes = [];
		const result = permuteArrays(term, prefixes, suffixes);
		expect(result).toEqual([]);
	});

	test('Default empty prefix and suffix values work as expected', () => {
		const term = ['fee', 'fi'];
		const prefixes = undefined;
		const suffixes = undefined;
		const result = permuteArrays(term, prefixes, suffixes);
		expect(result).toEqual([]);
	});
});
