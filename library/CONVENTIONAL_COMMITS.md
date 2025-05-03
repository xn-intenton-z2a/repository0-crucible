# CONVENTIONAL_COMMITS

## Crawl Summary
Commits must follow `<type>[scope][!]: description` header with optional body and footers. Types: feat→MINOR, fix→PATCH; others no effect. Scope in parentheses. Description required, max 72 chars. Body separated by blank line. Footers: `<token>: <value>` or `token #value`, token hyphenated. Breaking changes: use `!` or `BREAKING CHANGE:` footer. Implement with commitlint rules and conventional-changelog CLI.

## Normalised Extract
Table of Contents
1 Commit Message Grammar
2 Type Definitions
3 Scope Syntax
4 Description Requirements
5 Body Content
6 Footer Format
7 Breaking Change Indicators
8 Usage Examples

1 Commit Message Grammar
Header must match regex ^(?<type>\w+)(?:\((?<scope>[\w\- ]+)\))?(?<breaking>!)?: (?<description>.+)$

2 Type Definitions
feat : increment MINOR version
fix  : increment PATCH version
Allowed additional types: build, chore, ci, docs, style, refactor, perf, test (no semver effect unless breaking)

3 Scope Syntax
scope MUST be noun/hyphen words inside () immediately after type, e.g., feat(parser-core)

4 Description Requirements
MUST follow colon and space. SHOULD be ≤72 chars. No trailing period.

5 Body Content
MAY include after one blank line. Free-form paragraphs. No metadata tokens.

6 Footer Format
MAY include after one blank line. Each line:<token>: <value> or <token> #<value>. Tokens use hyphens, e.g., Reviewed-by.

7 Breaking Change Indicators
MUST use ! in header before : OR FOOTER token BREAKING CHANGE:. Include description after ": ".

8 Usage Examples
feat(cli): add interactive prompt
fix(api)!: remove deprecated parameter
BREAKING CHANGE: config file format changed


## Supplementary Details
Commitlint configuration snippet:
{
  "rules": {
    "type-enum": [2, "always", ["feat","fix","build","chore","ci","docs","style","refactor","perf","test"]],
    "scope-case": [2, "always", "kebab-case"],
    "header-max-length": [2, "always", 72],
    "subject-case": [2, "never", ["start-case","pascal-case"]]
  }
}

Conventional-changelog CLI:
npx conventional-changelog -p angular -i CHANGELOG.md -s

Semantic-release plugin:
"@semantic-release/commit-analyzer": {"preset":"angular"}


## Reference Details
Regex validation in parser:
const headerPattern = /^(\w+)(?:\([\w\- ]+\))!?\: .+$/;

Sample commitlint.config.js:
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: { 'header-max-length': [2, 'always', 72] }
};

Git hook integration (husky):
"husky":{ "hooks":{ "commit-msg":"commitlint -E HUSKY_GIT_PARAMS" }}

Best practice: Use git commit --amend to fix header mismatch. Then git push --force-with-lease.

Troubleshooting common errors:
Error: header must not be longer than 72 characters
Command: commitlint -e $GIT_PARAMS
Fix: shorten header summary.


## Information Dense Extract
HeaderRegex:^(type)(\(scope\))?(!)?:description;Types:feat→MINOR,fix→PATCH,others no semver;Scope:(noun-hyphen);Desc:MUST non-empty,≤72;Body:MAY paragraphs after blank-line;Footer:token: value or token #value;TokenHyphenated;Breaking:! or BREAKING CHANGE:desc;CommitlintRules:type-enum,scope-case,kebab,header-max-length72;CLI:npx conventional-changelog -p angular -i CHANGELOG.md -s;GitHook:husky commitlint;Amend:git commit --amend;Push:--force-with-lease;

## Sanitised Extract
Table of Contents
1 Commit Message Grammar
2 Type Definitions
3 Scope Syntax
4 Description Requirements
5 Body Content
6 Footer Format
7 Breaking Change Indicators
8 Usage Examples

1 Commit Message Grammar
Header must match regex ^(?<type>'w+)(?:'((?<scope>['w'- ]+)'))?(?<breaking>!)?: (?<description>.+)$

2 Type Definitions
feat : increment MINOR version
fix  : increment PATCH version
Allowed additional types: build, chore, ci, docs, style, refactor, perf, test (no semver effect unless breaking)

3 Scope Syntax
scope MUST be noun/hyphen words inside () immediately after type, e.g., feat(parser-core)

4 Description Requirements
MUST follow colon and space. SHOULD be 72 chars. No trailing period.

5 Body Content
MAY include after one blank line. Free-form paragraphs. No metadata tokens.

6 Footer Format
MAY include after one blank line. Each line:<token>: <value> or <token> #<value>. Tokens use hyphens, e.g., Reviewed-by.

7 Breaking Change Indicators
MUST use ! in header before : OR FOOTER token BREAKING CHANGE:. Include description after ': '.

8 Usage Examples
feat(cli): add interactive prompt
fix(api)!: remove deprecated parameter
BREAKING CHANGE: config file format changed

## Original Source
Conventional Commits Specification
https://www.conventionalcommits.org/en/v1.0.0/

## Digest of CONVENTIONAL_COMMITS

# Conventional Commits 1.0.0

## Overview
The Conventional Commits spec defines a strict commit message format:
  - Header: `<type>[scope][!]: description`
  - Body: blank line followed by free-form text
  - Footers: blank line followed by one or more metadata lines

## Grammar
```regex
^(?<type>\w+)(?:\((?<scope>[\w\- ]+)\))?(?<breaking>!)?: (?<description>.+)$```

## Types
  • feat (MINOR semver)  
  • fix (PATCH semver)  
  • build, chore, ci, docs, style, refactor, perf, test, etc. (no semver effect unless breaking)

## Scope
  • Format: noun or hyphenated words inside parentheses  
  • Example: `feat(parser): parse arrays`

## Description
  • Required: non-empty summary after `: `  
  • Max length: 72 characters recommended

## Body
  • Optional: blank line then paragraphs  
  • Explain motivation and internal details

## Footers
  • Format: `<token>: <value>` or `<token> #<value>`  
  • Tokens use hyphens instead of spaces except `BREAKING CHANGE`

## Breaking Changes
  • Indicated by `!` before `:` or `BREAKING CHANGE: description` footer  
  • Always use uppercase token and provide description

## Examples
  • `feat: add new API method`
  • `fix(api)!: update endpoint signature`
  • Footer example:
    BREAKING CHANGE: endpoint now requires auth token

## Integration
  • commitlint rules: type-enum, header-max-length, scope-case, subject-capital-letter
  • changelog generation: conventional-changelog CLI, semantic-release plugins

## Troubleshooting
  • git rebase -i HEAD~N to amend past commits  
  • commitlint error codes and remediation  
  • Fix invalid header: update to match regex

Retrieved: 2023-10-10
Data Size: 352798 bytes

## Attribution
- Source: Conventional Commits Specification
- URL: https://www.conventionalcommits.org/en/v1.0.0/
- License: CC0 Public Domain
- Crawl Date: 2025-05-03T20:48:27.235Z
- Data Size: 352798 bytes
- Links Found: 232

## Retrieved
2025-05-03
