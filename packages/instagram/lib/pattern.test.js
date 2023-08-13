const test = require('ava');
const pattern = require('./pattern.js')

console.log(pattern)
test('works?', t => {
	const foo = pattern.exec('<p>https://www.instagram.com/p/0123456789a</p>')

	t.pass()

})
