const test = require("ava");
const validatePlugins = require("../lib/validatePlugins.js");
const {defaultPlugins, validPlugins} = require("../lib/pluginDefaults.js");

test(
	"Validator returns expected default plugin array",
	(t) => {
		let output = validatePlugins(defaultPlugins);
		t.deepEqual(output, defaultPlugins);
	},
);

test(
	"Validator rejects invalid plugin strings, returns defaults",
	(t) => {
		let list = [...defaultPlugins, "wrong"];
		let output = validatePlugins(list);
		t.deepEqual(output, defaultPlugins);
	},
);

test(
	"Validator accepts valid non-default plugin string",
	(t) => {
		let list = [...defaultPlugins, "soundcloud"];
		let output = validatePlugins(list);
		for (let p of output) {
			t.true(validPlugins.includes(p));
		}
	},
);

test(
	"Validator returns non-alphabetical list in alphabetical order",
	(t) => {
		let list = ["youtube", "vimeo", "twitter"];
		let output = validatePlugins(list);
		t.deepEqual(output, ["twitter", "vimeo", "youtube"]);
	},
);

test(
	"Validator returns expected valid plugin list subset",
	(t) => {
		let list = ["instagram", "soundcloud", "spotify"];
		let output = validatePlugins(list);
		t.deepEqual(output, list);
	},
);

test(
	"Validator returns expected subset, but rejects invalid plugin",
	(t) => {
		let list = ["instagram", "spotify", "wrong"];
		let output = validatePlugins(list);
		t.deepEqual(output, ["instagram", "spotify"]);
	},
);

test(
	"Validator rejects non-string array items",
	(t) => {
		let list = [false, "instagram", "spotify", true, 123, {foo: "bar"}];
		let output = validatePlugins(list);
		t.deepEqual(output, ["instagram", "spotify"]);
	},
);
