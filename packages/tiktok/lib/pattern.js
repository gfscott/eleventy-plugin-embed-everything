const {regex} = require('regex');

module.exports = regex('g')`
	<p>
	(?>\s*+)?
	(?><a [^>]*?>)?
	(?>\s*+)?
	(?>https?:)?
	(?>/{2})?
	(?>w{3}\.)?
	tiktok.com/
	(?<user>@[\w\.]+?)
	/video/
	(?<id>\d{19})
	[^\s<>]*?
	(?>\s*+)?
	(?><\/a>)?
	(?>\s*+)?
	</p>
`;

