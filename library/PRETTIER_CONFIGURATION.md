# PRETTIER_CONFIGURATION

## Crawl Summary
Prettier is installed via npm or yarn; configure via .prettierrc JSON with options: printWidth (80), tabWidth (2), useTabs (false), semi (true), singleQuote (false), quoteProps (as-needed), jsxSingleQuote (false), trailingComma (all), bracketSpacing (true), arrowParens (always), objectWrap, experimentalOperatorPosition, tsconfig. CLI commands: prettier [options] [file|glob], key flags: --write, --check, --list-different, --cache, --cache-location. Official editor integrations available for VS Code, WebStorm, Vim, Sublime, Emacs, Atom, Nova. Recent releases added new options and parser support.

## Normalised Extract
Table of Contents:
1. Installation
2. Configuration Options
3. CLI Commands and Flags
4. Editor Integration
5. Release Options

1. Installation
npm install --save-dev prettier
or yarn add --dev prettier

2. Configuration Options
--printWidth <int> Default: 80
--tabWidth <int> Default: 2
--useTabs <boolean> Default: false
--semi <boolean> Default: true
--singleQuote <boolean> Default: false
--quoteProps <as-needed|consistent|preserve> Default: as-needed
--jsxSingleQuote <boolean> Default: false
--trailingComma <none|es5|all> Default: all
--bracketSpacing <boolean> Default: true
--arrowParens <avoid|always> Default: always
--objectWrap <preserve|always|none> (3.5+) Default: preserve
--experimentalOperatorPosition <same-line|next-line> (3.5+)
--tsconfig <path> (3.5+) Path to tsconfig.json

3. CLI Commands and Flags
prettier [options] [file|dir|glob ...]
Options:
  --write                Overwrite files with formatted code
  --check                Exit code 1 if any file is unformatted
  --list-different       Print unformatted file paths
  --cache                Only reprint changed files
  --cache-location <path> Use custom cache file location
  --config <path>        Specify config file manually

4. Editor Integration
VS Code: install "Prettier - Code formatter"
WebStorm: Built-in, enable in Preferences > Languages & Frameworks > JavaScript > Prettier
Vim: instal vim-prettier and set autocmd BufWritePre *.js,*.ts Prettier
Sublime: install JsPrettier plugin
Emacs: install prettier-js or prettier.el
Atom: install prettier-atom

5. Release Options
3.5: Added objectWrap, experimentalOperatorPosition, tsconfig
3.4: Bug fixes
3.3: Flow component/hook formatting
3.2: JSONC parser, ICU support
3.1: --experimental-ternaries, Angular v17 syntax
3.0: ESM modules, plugin interface, trailingComma default all
2.8: Improved --cache and --cache-location


## Supplementary Details
Configuration file precedence: CLI flags > .prettierrc > package.json > default options. Supported file extensions: .js, .jsx, .ts, .tsx, .css, .scss, .less, .json, .jsonc, .md, .mdx, .html, .vue, .graphql, .yaml, .yml, .hbs
Exclude files via .prettierignore with glob patterns. Add "format" script to package.json: "format": "prettier --write \"src/**/*.{js,ts,jsx,tsx,json,css,md}\"". Use Husky or lint-staged for pre-commit: "lint-staged": { "*.{js,ts,jsx,tsx}": ["prettier --write"] }.

## Reference Details
CLI API:
Signature: prettier(options: string[] | { [key:string]: any }, filePaths?: string[]): Promise<void>
Parameters:
  options.* flags as above
  filePaths: glob patterns or file/directory strings
Return: Resolves when formatting complete; rejects on syntax error or missing parser

Examples:
// As Node API
import { format, formatWithCursor } from 'prettier'
const code = "function  test( ){return 42;}"
const formatted = format(code, { parser: "babel", singleQuote: true })

// package.json scripts
{
  "scripts": {
    "format": "prettier --write ./src/**/*.{js,ts,jsx,tsx}" 
  }
}

Best Practices:
- Commit .prettierrc and .prettierignore
- Use pre-commit hook: npx husky add .husky/pre-commit "npx lint-staged"
- Lint-staged config:
  "*.{js,ts}": ["prettier --write"]

Troubleshooting:
# Syntax error on unknown syntax
Ensure parser installed or upgrade Prettier: npm i --save-dev prettier@latest
# Config not applied
Verify file is matched by Prettier: npx prettier --find-config-path src/index.js
# Editor format on save not working
Check editor uses project local Prettier: VS Code setting "prettier.prettierPath" set to "./node_modules/prettier"

## Information Dense Extract
install: npm install --save-dev prettier; config keys: printWidth=80,tabWidth=2,useTabs=false,semi=true,singleQuote=false,quoteProps=as-needed,jsxSingleQuote=false,trailingComma=all,bracketSpacing=true,arrowParens=always,objectWrap=preserve,experimentalOperatorPosition=same-line,tsconfig=./tsconfig.json; CLI: prettier [options] [files], flags: --write,--check,--list-different,--cache,--cache-location<path>,--config<path>; editor plugins: vscode,webstorm,vim,sublime,emacs,atom; file ext: js,jsx,ts,tsx,css,scss,less,json,jsonc,md,mdx,html,vue,graphql,yaml,yml,hbs; ignore via .prettierignore; Node API: format(text,{parser,options}); package.json script: "format":"prettier --write \"src/**/*.{js,ts,jsx,tsx}\""; pre-commit: lint-staged with prettier; troubleshooting: parser errors upgrade or install plugin.

## Sanitised Extract
Table of Contents:
1. Installation
2. Configuration Options
3. CLI Commands and Flags
4. Editor Integration
5. Release Options

1. Installation
npm install --save-dev prettier
or yarn add --dev prettier

2. Configuration Options
--printWidth <int> Default: 80
--tabWidth <int> Default: 2
--useTabs <boolean> Default: false
--semi <boolean> Default: true
--singleQuote <boolean> Default: false
--quoteProps <as-needed|consistent|preserve> Default: as-needed
--jsxSingleQuote <boolean> Default: false
--trailingComma <none|es5|all> Default: all
--bracketSpacing <boolean> Default: true
--arrowParens <avoid|always> Default: always
--objectWrap <preserve|always|none> (3.5+) Default: preserve
--experimentalOperatorPosition <same-line|next-line> (3.5+)
--tsconfig <path> (3.5+) Path to tsconfig.json

3. CLI Commands and Flags
prettier [options] [file|dir|glob ...]
Options:
  --write                Overwrite files with formatted code
  --check                Exit code 1 if any file is unformatted
  --list-different       Print unformatted file paths
  --cache                Only reprint changed files
  --cache-location <path> Use custom cache file location
  --config <path>        Specify config file manually

4. Editor Integration
VS Code: install 'Prettier - Code formatter'
WebStorm: Built-in, enable in Preferences > Languages & Frameworks > JavaScript > Prettier
Vim: instal vim-prettier and set autocmd BufWritePre *.js,*.ts Prettier
Sublime: install JsPrettier plugin
Emacs: install prettier-js or prettier.el
Atom: install prettier-atom

5. Release Options
3.5: Added objectWrap, experimentalOperatorPosition, tsconfig
3.4: Bug fixes
3.3: Flow component/hook formatting
3.2: JSONC parser, ICU support
3.1: --experimental-ternaries, Angular v17 syntax
3.0: ESM modules, plugin interface, trailingComma default all
2.8: Improved --cache and --cache-location

## Original Source
Prettier Code Formatter
https://prettier.io/docs/en/index.html

## Digest of PRETTIER_CONFIGURATION

# Installation

Install Prettier as a dev dependency:

```bash
npm install --save-dev prettier
# or
yarn add --dev prettier
```

# Configuration File (.prettierrc)

Create a `.prettierrc` file in your project root with JSON or YAML:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "objectWrap": "preserve",
  "experimentalOperatorPosition": "same-line",
  "tsconfig": "./tsconfig.json"
}
```

# CLI Usage

Use Prettier via the CLI to format files or whole directories:

```bash
prettier [options] [file|dir|glob ...]
``` 

Key options:

--write      Overwrite source files with formatted code
--check      Exit with non-zero if unformatted files are found
--list-different  List files that are not formatted
--cache      Only reformat changed files (requires --cache-location)
--cache-location <path>  Custom cache file path

# Editor Integrations

Prettier bundles official plugins for major editors. Install the corresponding extension and enable "Format on Save".

Supported editors:
- VS Code (`prettier-vscode`)
- WebStorm (built-in)
- Vim (`vim-prettier`, `coc-prettier`)
- Sublime Text (`JsPrettier`)
- Emacs (`prettier-js`, `prettier.el`)
- Atom, Nova, Neoformat, ALE

# Release Highlights

- 3.5 (Feb 9, 2025): `objectWrap`, `experimentalOperatorPosition`, TS config support
- 3.4 (Nov 26, 2024): bug fixes
- 3.3 (Jun 1, 2024): Flow component/hook declarations
- 3.2 (Jan 12, 2024): JSONC parser, Angular ICU
- 3.1 (Nov 13, 2023): `--experimental-ternaries`, Angular v17 control flow
- 3.0 (Jul 5, 2023): ESM modules, plugin interface overhaul, default `trailingComma: "all"`
- 2.8 (Nov 23, 2022): `--cache-location`, fixed cache bug


## Attribution
- Source: Prettier Code Formatter
- URL: https://prettier.io/docs/en/index.html
- License: MIT
- Crawl Date: 2025-05-13T03:35:11.251Z
- Data Size: 1045001 bytes
- Links Found: 2592

## Retrieved
2025-05-13
