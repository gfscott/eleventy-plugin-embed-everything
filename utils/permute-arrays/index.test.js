import test from 'ava';
import { coerceToArray, appendEach, prependEach } from './index.js';
import permuteArrays from './index.js';

test('coerceToArray - should return the input array if it is already an array', (t) => {
  const input = [1, 2, 3];
  const result = coerceToArray(input);
  t.deepEqual(result, input);
});

test('coerceToArray - should convert a string to an array with the string as the only element', (t) => {
  const input = 'hello';
  const result = coerceToArray(input);
  t.deepEqual(result, ['hello']);
});

test('coerceToArray - should return undefined for any other input type', (t) => {
  const input = { key: 'value' };
  const result = coerceToArray(input);
  t.is(result, undefined);
});

test('appendEach - should append each suffix to each term in the array', (t) => {
  const term = ['fast', 'slow'];
  const suffixes = ['er', 'est'];
  const result = appendEach(term, suffixes);
  t.deepEqual(result, ['faster', 'fastest', 'slower', 'slowest']);
});

test('appendEach - should return an empty array if the term is an empty array', (t) => {
  const term = [];
  const suffixes = ['s', 'es'];
  const result = appendEach(term, suffixes);
  t.deepEqual(result, []);
});

test('appendEach - should return an empty array if the suffixes array is empty', (t) => {
  const term = ['apple', 'banana'];
  const suffixes = [];
  const result = appendEach(term, suffixes);
  t.deepEqual(result, []);
});

test('appendEach - should return an empty array if both the term and suffixes arrays are empty', (t) => {
  const term = [];
  const suffixes = [];
  const result = appendEach(term, suffixes);
  t.deepEqual(result, []);
});

test('prependEach - should prepend each prefix to each term in the array', (t) => {
  const term = ['fast', 'slow'];
  const prefixes = ['super', 'ultra'];
  const result = prependEach(term, prefixes);
  t.deepEqual(result, ['superfast', 'ultrafast', 'superslow', 'ultraslow']);
});

test('prependEach - should return an empty array if the term is an empty array', (t) => {
  const term = [];
  const prefixes = ['big', 'small'];
  const result = prependEach(term, prefixes);
  t.deepEqual(result, []);
});

test('prependEach - should return an empty array if the prefixes array is empty', (t) => {
  const term = ['apple', 'banana'];
  const prefixes = [];
  const result = prependEach(term, prefixes);
  t.deepEqual(result, []);
});

test('prependEach - should return an empty array if both the term and prefixes arrays are empty', (t) => {
  const term = [];
  const prefixes = [];
  const result = prependEach(term, prefixes);
  t.deepEqual(result, []);
});

test('permuteArrays - should prepend each prefix and append each suffix to each term in the array', (t) => {
  const term = ['a'];
  const prefixes = ['d', 'r'];
  const suffixes = ['d', 'm'];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, ['da', 'ra', 'ad', 'am', 'dad', 'dam', 'rad', 'ram']);
});

test('permuteArrays - should return an empty array if the term is an empty array', (t) => {
  const term = [];
  const prefixes = ['big', 'small'];
  const suffixes = ['s', 'es'];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, []);
});

test('permuteArrays - should return term with suffixes if the prefixes array is empty', (t) => {
  const term = ['high', 'low'];
  const prefixes = [];
  const suffixes = ['ly', 'est'];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, ['highly', 'highest', 'lowly', 'lowest']);
});

test('permuteArrays - should return an empty array if the suffixes array is empty', (t) => {
  const term = ['way', 'line'];
  const prefixes = ['high', 'by'];
  const suffixes = [];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, ['highway', 'byway', 'highline', 'byline']);
});

test('permuteArrays - should return an empty array if both the term and prefixes arrays are empty', (t) => {
  const term = [];
  const prefixes = [];
  const suffixes = ['s', 'es'];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, []);
});

test('permuteArrays - should return an empty array if both the term and suffixes arrays are empty', (t) => {
  const term = [];
  const prefixes = ['big', 'small'];
  const suffixes = [];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, []);
});

test('permuteArrays - should return an empty array if both the prefixes and suffixes arrays are empty', (t) => {
  const term = ['apple', 'banana'];
  const prefixes = [];
  const suffixes = [];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, []);
});

test('permuteArrays - should return an empty array if all arrays (term, prefixes, suffixes) are empty', (t) => {
  const term = [];
  const prefixes = [];
  const suffixes = [];
  const result = permuteArrays(term, prefixes, suffixes);
  t.deepEqual(result, []);
});