const test = require("ava");
const config = require("../lib/configOptions.js");

const defaultOptions = {
	activePlugins: [
		"instagram",
		"spotify",
		"tiktok",
		"twitch",
		"twitter",
		"vimeo",
		"youtube",
	],
	activePluginOptions: {
		instagram: {options: {}},
		spotify: {options: {}},
		tiktok: {options: {}},
		twitch: {options: {}},
		twitter: {options: {}},
		vimeo: {options: {}},
		youtube: {options: {}},
	},
};

// Clone helper function
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

test(
	"Config returns expected default output without input param",
	(t) => {
		let output = config();
		t.deepEqual(output, defaultOptions);
	},
);

test(
	"Config returns expected default output with empty config object param",
	(t) => {
		let output = config({});
		t.deepEqual(output, defaultOptions);
	},
);

test(
	`Config returns expected default output with invalid "add" option`,
	(t) => {
		let output = config({
			add: ["wrong"],
		});
		t.deepEqual(output, defaultOptions);
	},
);

test(
	`Config returns expected output with valid "add" option`,
	(t) => {
		let output = config({
			add: ["soundcloud"],
		});
		let expected = clone(defaultOptions);
		expected.activePlugins.splice(1, 0, "soundcloud");
		expected.activePluginOptions.soundcloud = {options: {}};
		t.deepEqual(output, expected);
	},
);

test(
	`Config returns expected output with valid "use" option`,
	(t) => {
		let output = config({
			use: ["vimeo", "youtube"],
		});
		let expected = {
			activePlugins: ["vimeo", "youtube"],
			activePluginOptions: {
				vimeo: {options: {}},
				youtube: {options: {}},
			},
		};
		t.deepEqual(output, expected);
	},
);

test(
	`Config "use" option overrides valid "add" option as expected`,
	(t) => {
		let output = config({
			add: ["soundcloud"],
			use: ["vimeo", "youtube"],
		});
		let expected = {
			activePlugins: ["vimeo", "youtube"],
			activePluginOptions: {
				vimeo: {options: {}},
				youtube: {options: {}},
			},
		};
		t.deepEqual(output, expected);
	},
);

test(
	`Config "use" option overrides invalid "add" option as expected`,
	(t) => {
		let output = config({
			add: ["wrong"],
			use: ["vimeo", "youtube"],
		});
		let expected = {
			activePlugins: ["vimeo", "youtube"],
			activePluginOptions: {
				vimeo: {options: {}},
				youtube: {options: {}},
			},
		};
		t.deepEqual(output, expected);
	},
);

test(
	"Passing an option to a plugin produces expected config output",
	(t) => {
		let output = config({
			youtube: {
				options: {
					lite: true,
				},
			},
		});
		let expected = clone(defaultOptions);
		expected.activePluginOptions.youtube.options.lite = true;
		t.deepEqual(output, expected);
	},
);

test(
	"Passing an option to a plugin produces expected output",
	(t) => {
		let output = config({
			twitter: {
				options: {
					cacheText: true,
				},
			},
		});
		let expected = clone(defaultOptions);
		expected.activePluginOptions.twitter.options.cacheText = true;
		t.deepEqual(output, expected);
	},
);

test(
	"Passing an option to a subset of plugins produces expected output",
	(t) => {
		let output = config({
			use: ["soundcloud"],
			soundcloud: {
				options: {
					small: true,
				},
			},
		});
		let expected = {
			activePlugins: ["soundcloud"],
			activePluginOptions: {
				soundcloud: {
					options: {
						small: true,
					},
				},
			},
		};
		t.deepEqual(output, expected);
	},
);

test(
	"Config does not return options for invalid/nonexistent plugins",
	(t) => {
		let output = config({
			use: ["soundcloud"],
			soundcloud: {options: {small: true}},
			yooooooooootube: {options: {lite: true}},
		});
		let expected = {
			activePlugins: ["soundcloud"],
			activePluginOptions: {
				soundcloud: {options: {small: true}},
			},
		};
		t.deepEqual(output, expected);
	},
);

test(
	"Config does not return options for valid but unused plugins",
	(t) => {
		let output = config({
			use: ["soundcloud"],
			soundcloud: {options: {small: true}},
			youtube: {options: {lite: true}},
		});
		let expected = {
			activePlugins: ["soundcloud"],
			activePluginOptions: {
				soundcloud: {options: {small: true}},
			},
		};
		t.deepEqual(output, expected);
	},
);

test(
	"Config returns expected output when adding a plugin and passing options",
	(t) => {
		let output = config({
			add: ["soundcloud"],
			soundcloud: {options: {small: true}},
		});
		let expected = clone(defaultOptions);
		expected.activePlugins.splice(1, 0, "soundcloud");
		expected.activePluginOptions.soundcloud = {options: {small: true}};
		t.deepEqual(output, expected);
	},
);
