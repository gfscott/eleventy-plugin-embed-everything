import test from 'ava';
import pattern from '../lib/pattern.js';
import {getHashIfExists} from "../lib/replace.js";

test("Hash returns undefined when absent", t => {
	const match = pattern.exec("<p>https://vimeo.com/123456</p>");
	t.is(getHashIfExists(match), undefined);
	pattern.lastIndex = 0;
});

test("Hash returned correctly via regex", t => {
	const match = pattern.exec("<p>https://vimeo.com/123456/asdf1234</p>");
	t.is(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});

test("Hash returned correctly via param", t => {
	const match = pattern.exec("<p>https://vimeo.com/123456?h=asdf1234</p>");
	t.is(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});

test("Hash returned correctly via param, multiple params", t => {
	const match = pattern.exec("<p>https://vimeo.com/123456?foo=bar&h=asdf1234</p>");
	t.is(getHashIfExists(match), "asdf1234");
	pattern.lastIndex = 0;
});
