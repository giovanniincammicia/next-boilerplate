export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [2, "always", ["chore", "config", "docs", "feat", "fix", "refactor", "test"]],
	},
};
