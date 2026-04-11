const test = require("node:test");
const assert = require("node:assert/strict");
const validatePlugins = require("../lib/validatePlugins.js");
const {defaultPlugins, validPlugins} = require("../lib/pluginDefaults.js");

test(
	"Validator returns expected default plugin array",
	() => {
		let output = validatePlugins(defaultPlugins);
		assert.deepEqual(output, defaultPlugins);
	},
);

test(
	"Validator rejects invalid plugin strings, returns defaults",
	() => {
		let list = [...defaultPlugins, "wrong"];
		let output = validatePlugins(list);
		assert.deepEqual(output, defaultPlugins);
	},
);

test(
	"Validator accepts valid non-default plugin string",
	() => {
		let list = [...defaultPlugins, "soundcloud"];
		let output = validatePlugins(list);
		for (let p of output) {
			assert.ok(validPlugins.includes(p));
		}
	},
);

test(
	"Validator returns non-alphabetical list in alphabetical order",
	() => {
		let list = ["youtube", "vimeo", "twitter"];
		let output = validatePlugins(list);
		assert.deepEqual(output, ["twitter", "vimeo", "youtube"]);
	},
);

test(
	"Validator returns expected valid plugin list subset",
	() => {
		let list = ["instagram", "soundcloud", "spotify"];
		let output = validatePlugins(list);
		assert.deepEqual(output, list);
	},
);

test(
	"Validator returns expected subset, but rejects invalid plugin",
	() => {
		let list = ["instagram", "spotify", "wrong"];
		let output = validatePlugins(list);
		assert.deepEqual(output, ["instagram", "spotify"]);
	},
);

test(
	"Validator rejects non-string array items",
	() => {
		let list = [false, "instagram", "spotify", true, 123, {foo: "bar"}];
		let output = validatePlugins(list);
		assert.deepEqual(output, ["instagram", "spotify"]);
	},
);
