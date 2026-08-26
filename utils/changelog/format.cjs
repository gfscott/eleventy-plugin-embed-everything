// Minimal replacement for @svitejs/changesets-changelog-github-compact (deprecated).
// Formats changelog lines as "- summary (#pr)" / "- summary (commit-link)".

function repoOf(options) {
	if (!options || !options.repo) {
		throw new Error(
			'Please provide a repo to this changelog generator like this:\n"changelog": ["./utils/changesets-changelog.cjs", { "repo": "org/repo" }]'
		);
	}
	return options.repo;
}

// ponytail: unauthenticated GitHub API calls are rate-limited to 60/hr; set GITHUB_TOKEN
// in CI if changesets ever needs more commits' worth of PR lookups per release.
async function commitPullLink(repo, commit) {
	const res = await fetch(`https://api.github.com/repos/${repo}/commits/${commit}/pulls`, {
		headers: {
			Accept: "application/vnd.github+json",
			...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
		}
	});
	if (!res.ok) return null;
	const [pr] = await res.json();
	return pr ? `[#${pr.number}](${pr.html_url})` : null;
}

async function getReleaseLine(changeset, _type, options) {
	const repo = repoOf(options);
	const summary = changeset.summary.trim();

	const pullLink = changeset.commit ? await commitPullLink(repo, changeset.commit) : null;
	const commitLink = changeset.commit
		? `[\`${changeset.commit.slice(0, 7)}\`](https://github.com/${repo}/commit/${changeset.commit})`
		: null;
	const suffix = pullLink ? ` (${pullLink})` : commitLink ? ` (${commitLink})` : "";

	return `\n- ${summary}${suffix}`;
}

async function getDependencyReleaseLine(changesets, dependenciesUpdated, options) {
	const repo = repoOf(options);
	if (dependenciesUpdated.length === 0) return "";

	const commitLinks = changesets
		.filter((cs) => cs.commit)
		.map((cs) => `[\`${cs.commit.slice(0, 7)}\`](https://github.com/${repo}/commit/${cs.commit})`);

	const heading = `- Updated dependencies [${commitLinks.join(", ")}]:`;
	const deps = dependenciesUpdated.map((dep) => `  - ${dep.name}@${dep.newVersion}`);
	return [heading, ...deps].join("\n");
}

module.exports = { getReleaseLine, getDependencyReleaseLine };
