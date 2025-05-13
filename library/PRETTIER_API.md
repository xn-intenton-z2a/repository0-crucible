# PRETTIER_API

## Crawl Summary
Prettier CLI accepts flags to format or check files: --write, --check, --list-different. Core formatting options include printWidth (default 80), tabWidth (2), useTabs (false), semi (true), singleQuote (false), trailingComma (es5), bracketSpacing (true), arrowParens (always). Node API provides format, formatWithCursor, check, resolveConfig, resolveConfigFile and their sync variants. Configuration file (.prettierrc) supports JSON/YAML with explicit keys and defaults. Plugins export parsers, printers, options. Troubleshooting covers parser errors, missing config, editor integration issues, caching.

## Normalised Extract
Table of Contents:
1. CLI Commands & Options
2. Node.js API Functions
3. Configuration File Schema
4. Plugin Module Structure
5. Troubleshooting Commands & Procedures

1. CLI Commands & Options:
- Usage: `prettier [--write] [--check] [--list-different] [options] [file/dir/glob...]`
- Options with defaults: printWidth:80, tabWidth:2, useTabs:false, semi:true, singleQuote:false, trailingComma:es5, bracketSpacing:true, arrowParens:always, parser:(inferred), config:(none), ignorePath:.prettierignore, requirePragma:false, insertPragma:false, cache:false, cacheLocation:node_modules/.cache/prettier, cacheStrategy:metadata, withNodeModules:false, endOfLine:lf, embeddedLanguageFormatting:auto, color:true, loglevel:log.
- Examples: `npx prettier --write "src/**/*.js"`, `npx prettier --check .`

2. Node.js API Functions:
- `format(source: string, options: Options): string`
- `formatWithCursor(source: string, options: Options & {cursorOffset:number}): {formatted:string;cursorOffset:number}`
- `check(source: string, options: Options): boolean`
- `resolveConfig(filePath:string, options?:{editorconfig?:boolean;useCache?:boolean}):Promise<Options|null>`
- `resolveConfig.sync(filePath?:string,options?:{editorconfig?:boolean;useCache?:boolean}):Options|null`
- `resolveConfigFile(filePath?:string):Promise<string|null>`
- `resolveConfigFile.sync(filePath?:string):string|null`
- `clearConfigCache():void`

3. Configuration File Schema:
- JSON/YAML keys: printWidth, tabWidth, useTabs, semi, singleQuote, quoteProps, trailingComma, bracketSpacing, jsxBracketSameLine, arrowParens, rangeStart, rangeEnd, parser, requirePragma, insertPragma, proseWrap, htmlWhitespaceSensitivity, vueIndentScriptAndStyle, endOfLine, embeddedLanguageFormatting.
- Default values provided in detailed digest.

4. Plugin Module Structure:
- Export objects: `parsers`, `printers`, `options`.
- Parser: `{ parse(fileContent:string):AST, astFormat:string }`
- Printer: `{ print(path, options, print):Doc }`
- Options definition: type, category, default, description.

5. Troubleshooting Commands & Procedures:
- Parser mismatch: `prettier --parser babel file.js`
- Clear cache: `prettier --no-cache "src/**/*.js"` or `clearConfigCache()` in Node API
- Debug CLI: `prettier --loglevel debug .`
- Check config load: `prettier --config ./config/.prettierrc src/index.js`

## Supplementary Details
• Supported parsers: babel, babel-flow, babel-ts, typescript, flow, estree, json, json5, jsonc, graphql, markdown, markdown (mdx), html, vue, angular, yaml, glimmer, visualforce, lwc
• Configuration file lookup order: [--config flag] → .prettierrc {json,yml,yaml,toml}, prettier.config.js, package.json > prettier key → editorconfig if enabled
• Programmatic formatting pipeline:
  1. resolveConfig
  2. format or formatWithCursor
  3. optionally write to disk via fs.writeFileSync
• Editor integration settings:
  - VS Code: `prettier.requireConfig": true`, `editor.formatOnSave": true
  - ESLint: use `eslint-plugin-prettier` with `prettier/prettier` rule set to error
  - Git hooks: hook via Husky + lint-staged: `{ "*.js": ["prettier --write"] }`
• Cache details: metadata strategy caches by file mtime+size, content strategy caches by hash of content


## Reference Details
### Complete CLI Specification
prettier [--write] [--check] [--list-different] [--config <path>] [--ignore-path <path>] [--cache] [--cache-location <path>] [--cache-strategy <metadata|content>] [--no-cache] [--with-node-modules] [--no-color] [--color] [--loglevel <debug|log|warn|error>] [--parser <parser>] [--plugin <path>] [--plugin-search-dir <path>] [--write-stdin <path>] [--stdin-filepath <path>] [--print-width <int>] [--tab-width <int>] [--use-tabs|--no-use-tabs] [--semi|--no-semi] [--single-quote|--no-single-quote] [--trailing-comma <none|es5|all>] [--bracket-spacing|--no-bracket-spacing] [--jsx-bracket-same-line|--no-jsx-bracket-same-line] [--arrow-parens <always|avoid>] [--range-start <int>] [--range-end <int>] [--end-of-line <lf|crlf|cr|auto>] [--embedded-language-formatting <auto|off|strip>] [--require-pragma|--no-require-pragma] [--insert-pragma|--no-insert-pragma] [--version] [--help]

### Node API
```ts
import { format, formatWithCursor, check, resolveConfig, resolveConfigFile, clearConfigCache } from "prettier";

interface Options {
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
  semi?: boolean;
  singleQuote?: boolean;
  quoteProps?: "as-needed" | "consistent" | "preserve";
  trailingComma?: "none" | "es5" | "all";
  bracketSpacing?: boolean;
  jsxBracketSameLine?: boolean;
  arrowParens?: "always" | "avoid";
  proseWrap?: "always" | "never" | "preserve";
  htmlWhitespaceSensitivity?: "css" | "strict" | "ignore";
  vueIndentScriptAndStyle?: boolean;
  endOfLine?: "lf" | "crlf" | "cr" | "auto";
  embeddedLanguageFormatting?: "auto" | "off" | "strip";
  parser?: string;
  filepath?: string;
  requirePragma?: boolean;
  insertPragma?: boolean;
  rangeStart?: number;
  rangeEnd?: number;
  plugins?: string[];
}

declare function format(source: string, options: Options): string;
declare function formatWithCursor(source: string, options: Options & { cursorOffset: number }): { formatted: string; cursorOffset: number };
declare function check(source: string, options: Options): boolean;
declare function resolveConfig(filePath: string, options?: { editorconfig?: boolean; useCache?: boolean }): Promise<Options | null>;
declare namespace resolveConfig {
  function sync(filePath?: string, options?: { editorconfig?: boolean; useCache?: boolean }): Options | null;
}
declare function resolveConfigFile(filePath?: string): Promise<string | null>;
declare namespace resolveConfigFile {
  function sync(filePath?: string): string | null;
}
declare function clearConfigCache(): void;
```

### Plugin API
```ts
export interface Plugin {  
  parsers?: Record<string, { parse: (text: string, parsers: any) => any; astFormat: string }>;  
  printers?: Record<string, { print: (path: any, options: any, print: any) => any }>;  
  options?: Record<string, { type: string; category: string; default: any; description?: string }>;  
}
```  

### Best Practices
1. Enforce via Git hook:
```json
{"husky": {"hooks": {"pre-commit": "lint-staged"}},"lint-staged":{"*.js": ["prettier --write"]}}
```
2. Integrate with ESLint:
```js
module.exports = {plugins: ["prettier"], rules: {"prettier/prettier": ["error", { singleQuote: true }]}}
```
3. VS Code settings:
```json
{"editor.formatOnSave": true,"[javascript]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},"prettier.requireConfig": true}
```

### Troubleshooting Procedures
- Verify formatting violations:
  - Command: `npx prettier --check "src/**/*.{js,ts,json,css,md}"`
  - Exit code: 0 if all pass, 1 if any fail.
- Debug config load:
  - `DEBUG=prettier:* npx prettier --check file.js`
  - Inspect printed config path and merged options.
- Clear cache when stale output:
  - CLI: `npx prettier --no-cache --write "src/**/*.js"`
  - Programmatic: `clearConfigCache()`
- Resolve EOL issues on Windows:
  - Use `--end-of-line auto` or set `endOfLine` in config to `crlf`.


## Information Dense Extract
CLI: format/write/check files, core flags with defaults printWidth80,tabWidth2,useTabsfalse,semi true, singleQuotefalse,trailingCommaes5,bracketSpacingtrue,arrowParensalways; config lookup .prettierrc/js/package.json>prettier; Node API: format(source,Options):string,formatWithCursor(source,Options&{cursorOffset}):{formatted,cursorOffset},check(source,Options):boolean,resolveConfig(path,{editorconfig?,useCache?}):Promise<Options|null>,resolveConfig.sync,resolveConfigFile,resolveConfigFile.sync,clearConfigCache; Config file keys identical to CLI series; Plugin: export parsers{parse,astFormat},printers{print},options{type,category,default}; Best practices: Git hook via Husky+lint-staged, ESLint plugin, VSCode settings; Troubleshoot: --check exit codes, DEBUG env, --no-cache, clearConfigCache(), end-of-line settings.

## Sanitised Extract
Table of Contents:
1. CLI Commands & Options
2. Node.js API Functions
3. Configuration File Schema
4. Plugin Module Structure
5. Troubleshooting Commands & Procedures

1. CLI Commands & Options:
- Usage: 'prettier [--write] [--check] [--list-different] [options] [file/dir/glob...]'
- Options with defaults: printWidth:80, tabWidth:2, useTabs:false, semi:true, singleQuote:false, trailingComma:es5, bracketSpacing:true, arrowParens:always, parser:(inferred), config:(none), ignorePath:.prettierignore, requirePragma:false, insertPragma:false, cache:false, cacheLocation:node_modules/.cache/prettier, cacheStrategy:metadata, withNodeModules:false, endOfLine:lf, embeddedLanguageFormatting:auto, color:true, loglevel:log.
- Examples: 'npx prettier --write 'src/**/*.js'', 'npx prettier --check .'

2. Node.js API Functions:
- 'format(source: string, options: Options): string'
- 'formatWithCursor(source: string, options: Options & {cursorOffset:number}): {formatted:string;cursorOffset:number}'
- 'check(source: string, options: Options): boolean'
- 'resolveConfig(filePath:string, options?:{editorconfig?:boolean;useCache?:boolean}):Promise<Options|null>'
- 'resolveConfig.sync(filePath?:string,options?:{editorconfig?:boolean;useCache?:boolean}):Options|null'
- 'resolveConfigFile(filePath?:string):Promise<string|null>'
- 'resolveConfigFile.sync(filePath?:string):string|null'
- 'clearConfigCache():void'

3. Configuration File Schema:
- JSON/YAML keys: printWidth, tabWidth, useTabs, semi, singleQuote, quoteProps, trailingComma, bracketSpacing, jsxBracketSameLine, arrowParens, rangeStart, rangeEnd, parser, requirePragma, insertPragma, proseWrap, htmlWhitespaceSensitivity, vueIndentScriptAndStyle, endOfLine, embeddedLanguageFormatting.
- Default values provided in detailed digest.

4. Plugin Module Structure:
- Export objects: 'parsers', 'printers', 'options'.
- Parser: '{ parse(fileContent:string):AST, astFormat:string }'
- Printer: '{ print(path, options, print):Doc }'
- Options definition: type, category, default, description.

5. Troubleshooting Commands & Procedures:
- Parser mismatch: 'prettier --parser babel file.js'
- Clear cache: 'prettier --no-cache 'src/**/*.js'' or 'clearConfigCache()' in Node API
- Debug CLI: 'prettier --loglevel debug .'
- Check config load: 'prettier --config ./config/.prettierrc src/index.js'

## Original Source
Code Quality & Formatting
https://prettier.io/docs/en/index.html

## Digest of PRETTIER_API

# Prettier CLI Reference

## Usage
```
prettier [--write] [--check] [--list-different] [options] [file/dir/glob...]
```

## Common Options

| Option                                  | Parameter           | Default                             |
|-----------------------------------------|---------------------|-------------------------------------|
| --print-width                           | <integer>           | 80                                  |
| --tab-width                             | <integer>           | 2                                   |
| --use-tabs / --no-use-tabs              |                     | false                               |
| --semi / --no-semi                      |                     | true                                |
| --single-quote / --no-single-quote      |                     | false                               |
| --trailing-comma                        | none
es5
all | es5                                 |
| --bracket-spacing / --no-bracket-spacing|                     | true                                |
| --jsx-single-quote / --no-jsx-single-quote |                  | false                               |
| --arrow-parens                         | always
avoid     | always                              |
| --parser                                | <parser name>       | inferred from file extension       |
| --config                                | <path>              | none                                |
| --ignore-path                           | <path>              | .prettierignore                     |
| --require-pragma / --no-require-pragma  |                     | false                               |
| --insert-pragma / --no-insert-pragma    |                     | false                               |
| --cache / --no-cache                    |                     | false                               |
| --cache-location                        | <path>              | node_modules/.cache/prettier        |
| --cache-strategy                        | metadata
content   | metadata                            |
| --with-node-modules                     |                     | false                               |
| --end-of-line                           | lf
crlf
cr
auto | lf                                  |
| --embedded-language-formatting         | auto
off
strip | auto                                |
| --color / --no-color                    |                     | true                                |
| --loglevel                              | debug
log
warn
error | log                                 |
| --help                                  |                     | false                               |
| --version                               |                     | false                               |

## Examples
```
npx prettier --write "src/**/*.js"
npx prettier --check .
```  

# Prettier Node API

```js
import { format, formatWithCursor, check, resolveConfig, resolveConfigFile, clearConfigCache } from "prettier";
```

### format
- Signature: format(source: string, options: Options): string
- Description: Formats a string of code and returns the formatted result.

### formatWithCursor
- Signature: formatWithCursor(source: string, options: Options & { cursorOffset: number }): { formatted: string; cursorOffset: number }
- Description: Formats code and returns updated cursor position.

### check
- Signature: check(source: string, options: Options): boolean
- Description: Returns true if code is formatted according to options.

### resolveConfig
- Signature: resolveConfig(filePath: string, options?: { editorconfig?: boolean; useCache?: boolean }): Promise<Options | null>
- Description: Loads and merges config file settings asynchronously.

### resolveConfig.sync
- Signature: resolveConfig.sync(filePath?: string, options?: { editorconfig?: boolean; useCache?: boolean }): Options | null

### resolveConfigFile
- Signature: resolveConfigFile(filePath?: string): Promise<string | null>

### resolveConfigFile.sync
- Signature: resolveConfigFile.sync(filePath?: string): string | null

### clearConfigCache
- Signature: clearConfigCache(): void
- Description: Clears the internal config cache.

# Configuration File Options (JSON/YAML)

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "quoteProps": "as-needed",
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "rangeStart": 0,
  "rangeEnd": Infinity,
  "parser": null,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto"
}
```

# Plugin Interface

- Export `parsers`, `printers`, `options` objects.
- Example:
```js
module.exports = {
  parsers: { myParser: { parse: src => ast, astFormat: "myFormat" } },
  printers: { myFormat: { print: (path, options, print) => doc } },
  options: { customOption: { type: "boolean", category: "myPlugin", default: false } }
};
```

# Troubleshooting

- **Parser Errors**: ensure matching parser option or file extension.
- **No Config Loaded**: verify config path or filename (.prettierrc, package.json > prettier).
- **Editor Plugin Not Formatting**: check that `editor.formatOnSave` is enabled and plugin is installed.
- **Caching Issues**: clear cache with `--no-cache` or programmatically via `clearConfigCache()`.


## Attribution
- Source: Code Quality & Formatting
- URL: https://prettier.io/docs/en/index.html
- License: License: MIT
- Crawl Date: 2025-05-13T15:28:48.825Z
- Data Size: 1448339 bytes
- Links Found: 2977

## Retrieved
2025-05-13
