const re = require('re2')

module.exports = new re(/<p>\s*(?:<a [^>]*?>)??\s*(?:https?:\/\/)??(?:w{3}\.)??(?:instagram\.com\/p\/)([0-9a-zA-Z_-]{11})[^\s]*?\s*(?:<\/a>)??\s*<\/p>/g)
