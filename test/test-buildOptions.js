const test = require("ava");
const merge = require("deepmerge");
const buildOptions = require("../lib/buildOptions.js");
const pluginDefaults = require("../lib/pluginDefaults.js");

/**
 * Default behavior: Return HTML custom attributes ("data-*").
 */
test(
	"Default data attribute: No options specified",
	(t) => {
		let expected = "";
		let computed = buildOptions(pluginDefaults);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Dark theme",
	(t) => {
		let opt = merge(pluginDefaults, {theme: "dark"});
		let expected = 'data-theme="dark"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Do Not Track",
	(t) => {
		let opt = merge(pluginDefaults, {doNotTrack: true});
		let expected = 'data-dnt="true"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Alignment left",
	(t) => {
		let opt = merge(pluginDefaults, {align: "left"});
		let expected = 'data-align="left"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Alignment center",
	(t) => {
		let opt = merge(pluginDefaults, {align: "center"});
		let expected = 'data-align="center"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Alignment right",
	(t) => {
		let opt = merge(pluginDefaults, {align: "right"});
		let expected = 'data-align="right"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Alignment is invalid",
	(t) => {
		let opt = merge(pluginDefaults, {align: "foo"});
		let expected = "";
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Cards are hidden",
	(t) => {
		let opt = merge(pluginDefaults, {cards: "hidden"});
		let expected = 'data-cards="hidden"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Conversations are deactivated",
	(t) => {
		let opt = merge(pluginDefaults, {conversation: "none"});
		let expected = 'data-conversation="none"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Lang is configurable",
	(t) => {
		let opt = merge(pluginDefaults, {lang: "es"});
		let expected = 'data-lang="es"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Width is configurable",
	(t) => {
		let opt = merge(pluginDefaults, {width: 325});
		let expected = 'data-width="325"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: Width must be a number",
	(t) => {
		let opt = merge(pluginDefaults, {width: "foo"});
		let expected = "";
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: oEmbed-only omit_script option produces no data attribute",
	(t) => {
		let opt = merge(pluginDefaults, {omit_script: true});
		let expected = "";
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Default data attribute: oEmbed-only tweetUrl option produces no data attribute",
	(t) => {
		let opt = merge(pluginDefaults, {tweetUrl: "https://www.example.com"});
		let expected = "";
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

/**
 * SELECTED COMBINATIONS
 */

test(
	"Combined data attributes: dark theme AND dnt",
	(t) => {
		let opt = merge(pluginDefaults, {theme: "dark", doNotTrack: true});
		let expected = 'data-theme="dark" data-dnt="true"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Combined data attributes: cards hidden AND conversation off",
	(t) => {
		let opt = merge(pluginDefaults, {cards: "hidden", conversation: "none"});
		let expected = 'data-cards="hidden" data-conversation="none"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Combined data attributes: align center AND custom width",
	(t) => {
		let opt = merge(pluginDefaults, {align: "center", width: 310});
		let expected = 'data-align="center" data-width="310"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

test(
	"Combined data attributes: custom lang AND invalid alignment",
	(t) => {
		let opt = merge(pluginDefaults, {lang: "fr", align: "foo"});
		let expected = 'data-lang="fr"';
		let computed = buildOptions(opt);
		t.is(expected, computed);
	},
);

/**
 * Configurable behavior: Return return URL param string ("?foo=bar")
 */
test(
	"Custom URL param attribute: Dark theme",
	(t) => {
		let opt = merge(pluginDefaults, {theme: "dark"});
		let expected = "?theme=dark";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Do Not Track",
	(t) => {
		let opt = merge(pluginDefaults, {doNotTrack: true});
		let expected = "?dnt=true";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Alignment left",
	(t) => {
		let opt = merge(pluginDefaults, {align: "left"});
		let expected = "?align=left";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Alignment center",
	(t) => {
		let opt = merge(pluginDefaults, {align: "center"});
		let expected = "?align=center";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Alignment right",
	(t) => {
		let opt = merge(pluginDefaults, {align: "right"});
		let expected = "?align=right";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Alignment is invalid",
	(t) => {
		let opt = merge(pluginDefaults, {align: "foo"});
		let expected = "";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Cards are hidden",
	(t) => {
		let opt = merge(pluginDefaults, {cards: "hidden"});
		let expected = "?hide_media=true";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Conversations are deactivated",
	(t) => {
		let opt = merge(pluginDefaults, {conversation: "none"});
		let expected = "?hide_thread=true";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Lang is configurable",
	(t) => {
		let opt = merge(pluginDefaults, {lang: "es"});
		let expected = "?lang=es";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Width must be a number",
	(t) => {
		let opt = merge(pluginDefaults, {width: "foo"});
		let expected = "";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Omit script",
	(t) => {
		let opt = merge(pluginDefaults, {omit_script: true});
		let expected = "?omit_script=true";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Custom URL param attribute: Tweet url param returns URLencoded",
	(t) => {
		let opt = merge(
			pluginDefaults,
			{tweetUrl: "https://twitter.com/SaraSoueidan/status/1289865845053652994"},
		);
		let expected = "?url=https%3A%2F%2Ftwitter.com%2FSaraSoueidan%2Fstatus%2F1289865845053652994";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

/**
 * SELECTED COMBINATIONS
 */

test(
	"Combined URL param attributes: dark theme AND dnt",
	(t) => {
		let opt = merge(pluginDefaults, {theme: "dark", doNotTrack: true});
		let expected = "?theme=dark&dnt=true";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Combined URL param attributes: cards hidden AND conversation off",
	(t) => {
		let opt = merge(pluginDefaults, {cards: "hidden", conversation: "none"});
		let expected = "?hide_media=true&hide_thread=true";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Combined URL param attributes: align center AND custom width",
	(t) => {
		let opt = merge(pluginDefaults, {align: "center", width: 310});
		let expected = "?align=center&maxwidth=310";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);

test(
	"Combined URL param attributes: custom lang AND invalid alignment",
	(t) => {
		let opt = merge(pluginDefaults, {lang: "fr", align: "foo"});
		let expected = "?lang=fr";
		let computed = buildOptions(opt, "url");
		t.is(expected, computed);
	},
);
