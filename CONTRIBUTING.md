# Contributing to Embed Everything

Thanks for your interest in contributing to Embed Everything!

## Getting started

I recommended using [pnpm](https://pnpm.io/) when working with this repo.


### Installation

1. Clone this repo.
1. Install the project dependencies: `pnpm install`.

### Running the demo

1. From the project root, run `pnpm dev`.
1. Open http://localhost:8080/ to view the demo.

### Running the tests

1. From the project root, run `pnpm test`.


## Monorepo structure

Embed Everything is a [monorepo](https://monorepo.tools/). Each individual embed provider (like YouTube or Vimeo) gets released as a standalone npm package. Those packages are then bundled together in the `everything` package.

## Anatomy of a plugin

This is the fundamental structure of each plugin:

```
plugin
├── README.md
├── index.js
├── lib
│   ├── defaults.js
│   ├── pattern.js
│   └── replace.js
├── package.json
└── test
```

File | Description
---|---
`README.md` | The plugin readme. Check out some of the existing plugins to see the basic structure. Should include instructions for installation, usage, available configuration options, and any caveats or gotchas to be aware of.
`index.js` | The main package file. This is the file that interacts directly with Eleventy to make the plugin functionality available in someone’s project.
`lib/defaults.js` | Exports a static object containing the plugin's default configuration.
`lib/pattern.js` | Exports a regular expression used to find and replace the relevant snippets when processing Eleventy templates.
`lib/replace.js` | Exports a function that procedurally builds the markup required to render an embed.
`package.json` | The usual.
`test/` | Folder to contain test files. Tests are kept in a standalone folder so they can be excluded from the published package, mitigating bloat.
