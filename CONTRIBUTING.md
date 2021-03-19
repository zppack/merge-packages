# How to contribute to this project

Feel free to come up with a PR or an issue. I am very looking forward to see it.

## Commits

This project uses `standard-version`, which depends on `[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)` rules, for versions and change logs management.

In this case your commit message should be structured as follows:

``` vim
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common commit structural elements are:

1. **fix**: a commit of the type `fix` patches a bug in your codebase (this correlates with `PATCH` in semantic versioning).

1. **feat**: a commit of the type `feat` introduces a new feature to the codebase (this correlates with `MINOR` in semantic versioning).

1. **BREAKING CHANGE**: a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with `MAJOR` in semantic versioning). A BREAKING CHANGE can be part of commits of any `type`.

1. `types` other than `fix:` and `feat:` are allowed, for example `[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)` (based on the [the Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.

1. `footers` other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

Here is some commit message [examples](https://www.conventionalcommits.org/en/v1.0.0/#examples).
