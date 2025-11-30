import test from 'ava';
import {addEmbedUrlParams} from "../lib/replace.js";

test("Missing input returns default string", t => {
	const str = addEmbedUrlParams()
	t.is(str, "dnt=1")
});

test("Empty object returns default string", t => {
	const str = addEmbedUrlParams({})
	t.is(str, "dnt=1")
});

test("Custom DNT value matches default", t => {
	const str = addEmbedUrlParams({dnt: true})
	t.is(str, "dnt=1")
});

test("Custom DNT off", t => {
	const str = addEmbedUrlParams({dnt: false})
	t.is(str, "dnt=0")
});

test("Privacy hash", t => {
	const str = addEmbedUrlParams({hash: 'asdf1234'})
	t.is(str, "dnt=1&h=asdf1234")
});
