// const domain = "https://publish.twitter.com";
// const bent = require("bent");
// const get = bent("json", 200);
// const pattern = /<p>\s*(?:<a.*>)?\s*(?:https?)?(?::\/\/)?(?:soundcloud\.com)(\/\S+?)(?:\?\S+)?\s*(?:<\/a>)?\s*<\/p>/;
// module.exports = async function(str, options) {
// 	let [, id] = str.match(pattern);
// 	let url = `${domain}/oembed?url=${encodeURIComponent(str)}`;
// 	try {
// 		let json = await get(url);
// 		let out = await configEmbed(json.html, options);
// 		return out;
// 	} catch (err) {
// 		console.error("Error communicating with Twitter\u2019s servers: ", err);
// 		return str;
// 	}
// };
