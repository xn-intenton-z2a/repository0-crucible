# PRETTIER_CORE

## Crawl Summary
Prettier reprints code by parsing to AST and applying fixed rules for whitespace, commas, and wrapping at `printWidth`. It supports major web languages. Prettier replaces all formatting lint rules; linters should focus on code-quality rules. It maintains minimal, opinionated configuration.

## Normalised Extract
Table of Contents
1 Supported Languages
2 Formatting Mechanics
3 Linter Integration
4 Configuration Categories

1 Supported Languages
JavaScript (ES1–ESNext), TypeScript, JSX, Flow, Vue, Angular, CSS, Less, SCSS, HTML, Handlebars/Ember, JSON, GraphQL, Markdown (GFM, MDX), YAML

2 Formatting Mechanics
- AST-based reprint
- `printWidth`: default 80 columns
- Preserves empty lines and multi-line objects
- Adds trailing comma if `trailingComma` != "none"
- Inserts/removes semicolons per `semi` option

3 Linter Integration
- Disable formatting rules in ESLint/TSLint/stylelint:
  * max-len, no-mixed-spaces-and-tabs, comma-style, keyword-spacing
- Use Prettier CLI or API before lint run
- Lint-only code-quality rules: no-unused-vars, no-extra-bind, no-implicit-globals

4 Configuration Categories (prettier.config.js or .prettierrc)
- Whitespace:
  * printWidth: 80 (integer)
  * tabWidth: 2 (integer)
  * useTabs: false (boolean)
- Punctuation:
  * semi: true|false
  * trailingComma: "none"|"es5"|"all"
  * bracketSpacing: true|false
- Quotes:
  * singleQuote: false|true
  * quoteProps: "as-needed"|"consistent"|"preserve"
  * jsxSingleQuote: false|true

## Supplementary Details
Use via CLI: `prettier --write "src/**/*.{js,ts,json,css,md}"`.  Or via API: `import { format, resolveConfigSync } from "prettier"; const options = resolveConfigSync("file.js"); const output = format(input, { ...options, parser: "babel" });` Ensure `parser` matches file type.

Integration in ESLint (.eslintrc.js):
```
module.exports = {
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: { "prettier/prettier": "error" }
};
```

Add git hook: `npm install --save-dev husky lint-staged` and in package.json:
```
"husky": { "hooks": { "pre-commit": "lint-staged" } },
"lint-staged": { "*.{js,ts,css,md}": ["prettier --write", "git add"] }
```


## Reference Details
API format signature:
```
format(source: string, options?: {
  parser: string;
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
  semi?: boolean;
  singleQuote?: boolean;
  quoteProps?: "as-needed"|"consistent"|"preserve";
  jsxSingleQuote?: boolean;
  trailingComma?: "none"|"es5"|"all";
  bracketSpacing?: boolean;
  jsxBracketSameLine?: boolean;
  arrowParens?: "avoid"|"always";
  proseWrap?: "always"|"never"|"preserve";
  endOfLine?: "lf"|"crlf"|"cr"|"auto";
  embeddedLanguageFormatting?: "auto"|"off";
  filepath?: string;
  requirePragma?: boolean;
  insertPragma?: boolean;
}): string;
```

CLI Usage:
```
prettier [options] [file/dir/glob]*
Options:
  --write             Overwrite files with formatted output.
  --check             Exit with non-zero code if files are unformatted.
  --list-different    Print unformatted files.
  --config <path>     Path to config file.
  --ignore-path <path> Path to .prettierignore file.
  --parser <string>   Parse input with given parser.
  --print-width <int> Specify max line length. Default 80.
  --tab-width <int>   Number of spaces per indent. Default 2.
  --use-tabs          Indent with tabs instead of spaces.
  --no-semi           Omit semicolons. Default true.
  --single-quote      Use single quotes. Default false.
  --trailing-comma <es5|all|none> Print trailing commas. Default "es5".
  --bracket-spacing   Print spaces between brackets. Default true.
  --jsx-bracket-same-line Put > of JSX on last line. Default false.
  --arrow-parens <avoid|always> Include parentheses around arrow function params. Default "avoid".
  --end-of-line <lf|crlf|cr|auto> How to enforce line endings. Default "lf".
```

Troubleshooting:
- Unformatted files on commit: ensure `lint-staged` glob matches file extensions.
- Parser errors: set `--parser` explicitly (babel, babel-ts, typescript, json, html, etc.).
- Conflicts with ESLint: install `eslint-config-prettier` to disable formatting rules.


## Information Dense Extract
supportedLanguages: [js,tsx,jsx,ts,css,scss,less,html,vue,angular,hbs,json,graphql,md,mdx,yaml]
formatMechanics: AST->string; printWidth:80; tabWidth:2; preserve blank lines; wrap args; preserve multi-line objects
officialAPI: format(source, {parser,printWidth,tabWidth,useTabs,semi,singleQuote,quoteProps,jsxSingleQuote,trailingComma,bracketSpacing,jsxBracketSameLine,arrowParens,proseWrap,endOfLine,embeddedLanguageFormatting,filepath,requirePragma,insertPragma}):string
cliOptions: write,check,list-different,config,ignore-path,parser,print-width(80),tab-width(2),use-tabs,false/semi,true,single-quote,false,trailing-comma,es5,bracket-spacing,true,jsx-bracket-same-line,false,arrow-parens,avoid,end-of-line,lf
eslintIntegration: extends plugin:prettier/recommended; plugin prettier; rule prettier/prettier:error
gitHook: husky pre-commit lint-staged "*.{js,ts,css,md}":[prettier --write,git add]

## Sanitised Extract
Table of Contents
1 Supported Languages
2 Formatting Mechanics
3 Linter Integration
4 Configuration Categories

1 Supported Languages
JavaScript (ES1ESNext), TypeScript, JSX, Flow, Vue, Angular, CSS, Less, SCSS, HTML, Handlebars/Ember, JSON, GraphQL, Markdown (GFM, MDX), YAML

2 Formatting Mechanics
- AST-based reprint
- 'printWidth': default 80 columns
- Preserves empty lines and multi-line objects
- Adds trailing comma if 'trailingComma' != 'none'
- Inserts/removes semicolons per 'semi' option

3 Linter Integration
- Disable formatting rules in ESLint/TSLint/stylelint:
  * max-len, no-mixed-spaces-and-tabs, comma-style, keyword-spacing
- Use Prettier CLI or API before lint run
- Lint-only code-quality rules: no-unused-vars, no-extra-bind, no-implicit-globals

4 Configuration Categories (prettier.config.js or .prettierrc)
- Whitespace:
  * printWidth: 80 (integer)
  * tabWidth: 2 (integer)
  * useTabs: false (boolean)
- Punctuation:
  * semi: true|false
  * trailingComma: 'none'|'es5'|'all'
  * bracketSpacing: true|false
- Quotes:
  * singleQuote: false|true
  * quoteProps: 'as-needed'|'consistent'|'preserve'
  * jsxSingleQuote: false|true

## Original Source
Code Quality & Formatting
https://prettier.io/docs/en/index.html

## Digest of PRETTIER_CORE

# Overview
Prettier is an opinionated code formatter for JavaScript, TypeScript, CSS, HTML, JSON, GraphQL, Markdown (GFM and MDX v1), YAML, Vue, Angular, JSX, Flow and other languages. It parses code to an AST and reprints formatted output based on rules that enforce a consistent style and take `printWidth` into account.

# Supported Languages
- JavaScript (including experimental features)
- JSX
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, SCSS
- HTML
- Ember/Handlebars
- JSON
- GraphQL
- Markdown, GFM, MDX v1
- YAML

# Formatting Behavior
- Parses input to AST, disregarding original whitespace and styling (preserves empty lines and multi-line objects when practical).
- Applies line wrapping based on `printWidth` (default: 80).
- Inserts or removes commas, spaces, line breaks according to deterministic rules.
- Example transformation:

    Input:
    foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());

    Output:
    foo(  reallyLongArg(),  omgSoManyParameters(),  IShouldRefactorThis(),  isThereSeriouslyAnotherOne(),);

# Prettier vs Linters
- Prettier handles *formatting rules* (max-len, comma-style, keyword-spacing). Those lint rules should be disabled when using Prettier.
- Linters (ESLint, TSLint, stylelint) handle *code-quality rules* (no-unused-vars, no-implicit-globals, prefer-promise-reject-errors).
- Integration pattern: run Prettier first, then run linter for quality issues.

# Option Philosophy
- Prettier is intentionally opinionated and offers a minimal set of options.
- Avoid debates on styling by limiting configuration surface.
- Only three categories of options remain: cosmetic (printWidth, tabWidth, useTabs), punctuation (semi, trailingComma, bracketSpacing), quote style (singleQuote, quoteProps, jsxSingleQuote).


## Attribution
- Source: Code Quality & Formatting
- URL: https://prettier.io/docs/en/index.html
- License: License: MIT
- Crawl Date: 2025-05-17T06:28:24.543Z
- Data Size: 1361345 bytes
- Links Found: 2920

## Retrieved
2025-05-17
