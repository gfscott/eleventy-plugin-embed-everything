import { test } from 'node:test';
import assert from 'node:assert/strict';
import {addEmbedUrlParams} from "../lib/replace.js";

test("Missing input returns default string", () => {
	const str = addEmbedUrlParams()
	assert.equal(str, "dnt=1")
});

test("Empty object returns default string", () => {
	const str = addEmbedUrlParams({})
	assert.equal(str, "dnt=1")
});

test("Custom DNT value matches default", () => {
	const str = addEmbedUrlParams({dnt: true})
	assert.equal(str, "dnt=1")
});

test("Custom DNT off", () => {
	const str = addEmbedUrlParams({dnt: false})
	assert.equal(str, "dnt=0")
});

test("Privacy hash", () => {
	const str = addEmbedUrlParams({hash: 'asdf1234'})
	assert.equal(str, "dnt=1&h=asdf1234")
});
