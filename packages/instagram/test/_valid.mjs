import permute from "permute-arrays";

const valid = [
	"instagram.com/p/B-rRt1MjKZD",
	"instagram.com/reel/DE0T298yYMj",
	"instagram.com/tv/BkQjCfsBIzi"
]

const validPrefixes = ['', '//', 'http://', 'https://', 'www.', '//www.', 'http://www.', 'https://www.']
const validSuffixes = ['?', '?foo', '?foo=bar']

export default permute(valid, validPrefixes, validSuffixes);
