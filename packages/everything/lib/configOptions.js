const merge = require("deepmerge");
const validatePlugins = require("./validatePlugins.js");
const {defaultPlugins} = require("./pluginDefaults.js");

module.exports = function(options = {}) {
	let output = {};
	output.activePlugins = setActivePlugins(options);
	output.activePluginOptions = setPluginOptions(output.activePlugins, options);

	return output;
};

/**
 * Private method
 * --------------
 *
 * @param {Object} obj User config object
 * Accepts an object containing user configuration settings.
 * Returns an array of valid active plugins.
 */
function setActivePlugins(obj) {
	let active = [...defaultPlugins]; // default
	// Add to default plugin list
	// The `Set` ensures there are no duplicates
	if (obj.add) {
		warnIfAddingDefaults(obj.add);
		active = [...new Set([...defaultPlugins, ...obj.add])];
	}
	// Define custom plugin list from scratch.
	// Will always override `add`
	if (obj.use) {
		active = obj.use;
	}
	return validatePlugins(active);
}

/**
 * Private method
 * --------------
 *
 * @param {Array} added Plugin handles from the user's `add` option
 * Logs a console warning if any of them are already active by default,
 * which suggests the user probably wanted the `use` option instead.
 */
function warnIfAddingDefaults(added) {
	for (const plugin of added) {
		if (defaultPlugins.includes(plugin)) {
			console.warn(
				`[eleventy-plugin-embed-everything] You're using "add" with a default plugin ` +
					`(${plugin}). You might want "use" instead, which instead overrides the default plugins.`,
			);
		}
	}
}


/**
 * Private method
 * --------------
 *
 * @param {Array} arr
 * @param {Object} opt
 * Accepts an array of plugins and an object of config options.
 * Returns an object containing key-value pairs, where the plugin
 * handle is the key and its corresponding options object is the
 * value.
 *
 */
function setPluginOptions(arr, opt) {
	const output = {};
	for (const plugin of arr) {
		// default options object is empty
		let pluginOpt = {options: {}};
		// override default if user has supplied options
		if (opt[plugin]) {
			pluginOpt = merge(pluginOpt, opt[plugin]);
		}
		output[plugin] = pluginOpt;
	}
	return output;
}
