// Reference: https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md

module.exports = {
  types: [
    { type: "feat", section: 'Features' },
    { type: "fix", section: 'Bug Fixes' },
    { type: "chore", hidden: true },
    { type: "docs", section: 'Documentations' },
    { type: "style", hidden: true },
    { type: "refactor", section: 'Refactors' },
    { type: "perf", hidden: true },
    { type: "test", hidden: true }
  ]
};
