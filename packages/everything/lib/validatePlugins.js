const {validPlugins} = require("./pluginDefaults.js");

/**
 * 
 * @param {Array} arr 
 * 
 * Accepts an array of plugin handles. Returns an alphabetical array
 * of plugin handles that are accepted as valid.
 */
module.exports = function(arr) {
	return arr.map((pluginHandle) => isValidPlugin(pluginHandle)).filter((
		pluginHandle,
	) => pluginHandle).sort();
};

/**
 * Private method
 * --------------
 * @param {String} str 
 * 
 * Accepts a plugin handle string. Returns the string if it's a
 * valid plugin and false if not.
 */
function isValidPlugin(str) {
	return validPlugins.includes(str) ? str : false;
}
