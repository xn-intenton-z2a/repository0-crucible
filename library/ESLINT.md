# ESLINT

## Crawl Summary
ESLint provides a CLI with commands to lint files and directories, configurable via flags (--config, --ext, --fix, --format, --ignore-path, --cache, etc.). Configuration is defined in .eslintrc.* files supporting env, parserOptions, extends, rules, overrides. The Node.js API exports class ESLint with constructor options for cwd, config overrides, extensions, ignore behavior, fix settings. Methods include lintText, lintFiles, loadFormatter, outputFixes. LintResult includes filePath, messages with ruleId, severity, location, and optional fix data.

## Normalised Extract
Table of Contents
1. CLI Usage
2. Configuration File
3. Node.js API

1. CLI Usage
   npx eslint [options] [files/globs]
   Options with types and defaults:
     --config <string> (default .eslintrc.*)
     --env <string[]>
     --parser <string>
     --ext <string[]> (default ['.js'])
     --ignore-path <string> (default .eslintignore)
     --no-ignore
     --rule <string>:<string|array>
     --format <string>
     --output-file <string>
     --fix
     --cache
     --cache-location <string> (default .eslintcache)
     --max-warnings <number>
     --quiet
     -v/--version
     -h/--help

2. Configuration File (.eslintrc.js)
   env: Record<string, boolean>
   parserOptions: { ecmaVersion: number; sourceType: 'script'|'module'; ecmaFeatures?: Record<string, boolean> }
   extends: string[]
   rules: Record<string, 'off'|'warn'|'error'|[ 'off'|'warn'|'error', ...any[] ]>
   overrides: [{ files: string|string[]; parser?: string; plugins?: string[]; rules?: Record<string, any> }]

3. Node.js API
   import { ESLint } from 'eslint'
   new ESLint(options?: {
     cwd?: string;
     overrideConfigFile?: string;
     overrideConfig?: object;
     extensions?: string[];
     ignore?: boolean;
     ignorePath?: string;
     ignorePattern?: string[];
     fix?: boolean;
     fixTypes?: ('problem'|'suggestion'|'layout')[];
     allowInlineConfig?: boolean;
     useEslintrc?: boolean;
   })
   Methods:
     lintText(text: string, options?: { filePath?: string; warnIgnored?: boolean }): Promise<LintResult[]>
     lintFiles(patterns: string|string[]): Promise<LintResult[]>
     loadFormatter(name?: string): Promise<Formatter>
     static outputFixes(results: LintResult|LintResult[]): Promise<void>
   LintResult fields:
     filePath, messages[], errorCount, warningCount, fixableErrorCount, fixableWarningCount, source?
   Message fields:
     ruleId, severity (1=warning,2=error), message, line, column, nodeType, fix?


## Supplementary Details
Default behaviors and effects:
- CLI uses .eslintrc.* and .eslintignore in cwd unless overridden
- --fix applies all fixable rules; use --fix-types to limit to problem|suggestion|layout
- --cache stores lint results at .eslintcache; subsequent runs only re-lint changed files
- Configuration file supports extends inheritance top-down; later extends override earlier
- Overrides allow per-glob rule customization; parser and plugins can differ per override
- Node API resolves config and ignore patterns relative to cwd; overrideConfig bypasses file-based config
- loadFormatter(name) accepts built-in names or absolute modules exporting Formatter interface
- outputFixes writes fixed files to disk synchronously per file result.fix.range and text


## Reference Details
API Specification:
class ESLint
  constructor(options?: ESLint.Options)
    ESLint.Options:
      cwd?: string (default process.cwd())
      overrideConfigFile?: string
      overrideConfig?: Linter.Config
      extensions?: string[] (default ['.js'])
      ignore?: boolean (default true)
      ignorePath?: string
      ignorePattern?: string[]
      fix?: boolean (default false)
      fixTypes?: ('problem'|'suggestion'|'layout')[] (default ['problem','suggestion','layout'])
      allowInlineConfig?: boolean (default true)
      useEslintrc?: boolean (default true)
  async lintText(text: string, options?: { filePath?: string; warnIgnored?: boolean }): Promise<ESLint.LintResult[]>
  async lintFiles(patterns: string|string[]): Promise<ESLint.LintResult[]>
  async loadFormatter(name?: string): Promise<ESLint.Formatter>
  static async outputFixes(results: ESLint.LintResult|ESLint.LintResult[]): Promise<void>

LintResult:
  filePath: string
  messages: Array<{ ruleId: string|null; severity: 1|2; message: string; line: number; column: number; nodeType: string; fix?: { range: [number,number]; text: string } }>
  errorCount: number
  warningCount: number
  fixableErrorCount: number
  fixableWarningCount: number
  source?: string

Formatter:
  (results: ESLint.LintResult[]) => string

Configuration (.eslintrc.js):
- env: { [envName: string]: boolean }
- parserOptions: { ecmaVersion: number; sourceType: 'script'|'module'; ecmaFeatures?: object }
- extends: string[]
- plugins: string[]
- settings: object
- rules: { [ruleName: string]: 'off'|'warn'|'error'|[ 'off'|'warn'|'error', ...any[] ] }
- overrides: Array<{ files: string|string[]; excludedFiles?: string|string[]; parser?: string; parserOptions?: object; plugins?: string[]; rules?: object }>

Examples:
const eslint = new ESLint({ fix: true, extensions: ['.js','.ts'] });
const results = await eslint.lintFiles(['src/**/*.js']);
await ESLint.outputFixes(results);
const formatter = await eslint.loadFormatter('stylish');
const output = formatter.format(results);
console.log(output);

Troubleshooting:
- "No ESLint configuration found" => ensure .eslintrc.js exists or pass --config
- Exit code 1 indicates errors found; use --max-warnings 0 to treat warnings as errors
- Use --debug to print internal resolution paths: npx eslint --debug file.js
- Cache corruption: delete .eslintcache


## Information Dense Extract
CLI: npx eslint [files] --config<string> --env<string[]> --parser<string> --ext<string[]> --ignore-path<string> --no-ignore --rule<string:config> --format<string> --output-file<string> --fix --fix-types<string[]> --cache --cache-location<string> --max-warnings<number> --quiet
Config: .eslintrc.js exports env:{browser,node,es2021}, parserOptions:{ecmaVersion(12),sourceType(module)}, extends:[...], rules:{'no-console':'warn','indent':['error',2]}, overrides:[{files:'**/*.ts',parser:'@typescript-eslint/parser',rules:{...}}]
API: import { ESLint } from 'eslint'; new ESLint({cwd?,overrideConfigFile?,overrideConfig?,extensions?,ignore?,ignorePath?,ignorePattern?,fix?,fixTypes?,allowInlineConfig?,useEslintrc?}); methods: lintText(string,{filePath?,warnIgnored?}):Promise<LintResult[]>, lintFiles(string|string[]):Promise<LintResult[]>, loadFormatter(string?):Promise<Formatter>, static outputFixes(LintResult|LintResult[]):Promise<void>; LintResult: {filePath,messages[{ruleId,severity(1|2),message,line,column,nodeType,fix?}],errorCount,warningCount,fixableErrorCount,fixableWarningCount,source?}; Formatter: function returning string; Troubleshoot with --debug, delete .eslintcache.

## Sanitised Extract
Table of Contents
1. CLI Usage
2. Configuration File
3. Node.js API

1. CLI Usage
   npx eslint [options] [files/globs]
   Options with types and defaults:
     --config <string> (default .eslintrc.*)
     --env <string[]>
     --parser <string>
     --ext <string[]> (default ['.js'])
     --ignore-path <string> (default .eslintignore)
     --no-ignore
     --rule <string>:<string|array>
     --format <string>
     --output-file <string>
     --fix
     --cache
     --cache-location <string> (default .eslintcache)
     --max-warnings <number>
     --quiet
     -v/--version
     -h/--help

2. Configuration File (.eslintrc.js)
   env: Record<string, boolean>
   parserOptions: { ecmaVersion: number; sourceType: 'script'|'module'; ecmaFeatures?: Record<string, boolean> }
   extends: string[]
   rules: Record<string, 'off'|'warn'|'error'|[ 'off'|'warn'|'error', ...any[] ]>
   overrides: [{ files: string|string[]; parser?: string; plugins?: string[]; rules?: Record<string, any> }]

3. Node.js API
   import { ESLint } from 'eslint'
   new ESLint(options?: {
     cwd?: string;
     overrideConfigFile?: string;
     overrideConfig?: object;
     extensions?: string[];
     ignore?: boolean;
     ignorePath?: string;
     ignorePattern?: string[];
     fix?: boolean;
     fixTypes?: ('problem'|'suggestion'|'layout')[];
     allowInlineConfig?: boolean;
     useEslintrc?: boolean;
   })
   Methods:
     lintText(text: string, options?: { filePath?: string; warnIgnored?: boolean }): Promise<LintResult[]>
     lintFiles(patterns: string|string[]): Promise<LintResult[]>
     loadFormatter(name?: string): Promise<Formatter>
     static outputFixes(results: LintResult|LintResult[]): Promise<void>
   LintResult fields:
     filePath, messages[], errorCount, warningCount, fixableErrorCount, fixableWarningCount, source?
   Message fields:
     ruleId, severity (1=warning,2=error), message, line, column, nodeType, fix?

## Original Source
ESLint
https://eslint.org/docs/latest/

## Digest of ESLINT

# ESLint CLI Usage

## Installation

npx eslint [options] [files/globs]

## Core CLI Options

--config <file>             Path to configuration file (default: .eslintrc.*)
--env <env1,env2,...>       Enable environments by name (browser,node,es2021)
--parser <module>           Specify a custom parser module
--ext <.js,.jsx,.ts>        Define file extensions to lint (default: .js)
--ignore-path <file>        Path to file with patterns to ignore (default: .eslintignore)
--no-ignore                 Disable use of ignore files and patterns
--rule <ruleName>:<config>  Override rule severity or options (e.g. no-console:warn)
--format <formatter>        Use a specific output format (stylish, json, checkstyle)
--output-file <file>        Specify file to write report to
--fix                       Automatically fix problems (syntax-aware fixes)
--cache                     Only check changed files (stores cache at .eslintcache)
--cache-location <path>     Path to the cache file or directory (default .eslintcache)
--max-warnings <number>     Number of warnings to allow before non-zero exit code
--quiet                     Report errors only (ignore warnings)
-v, --version               Output the version number
-h, --help                  Show help

# ESLint Configuration File (.eslintrc.js)

module.exports = {
  env: {
    browser: true,
    node:    true,
    es2021:  true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  rules: {
    'no-console':       'warn',
    'indent':           ['error', 2],
    'quotes':           ['error', 'single'],
    'semi':             ['error', 'always']
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['error']
      }
    }
  ]
};

# Node.js API (import { ESLint })

import { ESLint } from 'eslint';

### Constructor

new ESLint(options?: ESLint.Options)

Options:
  cwd?                string    Working directory for resolution (default process.cwd())
  overrideConfigFile? string    Path to config file
  overrideConfig?     object    Inline configuration (overrides file-based config)
  extensions?         string[]  File extensions to lint (default ['.js'])
  ignore?             boolean   Use ignore files (default true)
  ignorePath?         string    Path to ignore file
  ignorePattern?      string[]  Additional glob patterns to ignore
  fix?                boolean   Apply fixes (default false)
  fixTypes?           ('problem'|'suggestion'|'layout')[] Types of fixes to apply
  allowInlineConfig?  boolean   Allow /* eslint-disable */ comments (default true)
  useEslintrc?        boolean   Use .eslintrc.* files (default true)
  cwd?                string    Working directory

### Methods

async lintText(text: string, options?: { filePath?: string; warnIgnored?: boolean }): Promise<ESLint.LintResult[]>
async lintFiles(patterns: string | string[]): Promise<ESLint.LintResult[]>
async loadFormatter(name?: string): Promise<ESLint.Formatter>
static async outputFixes(results: ESLint.LintResult | ESLint.LintResult[]): Promise<void>

type LintResult = {
  filePath:       string;
  messages:       { ruleId: string | null; severity: number; message: string; line: number; column: number; nodeType: string; fix?: { range: [number, number]; text: string } }[];
  errorCount:     number;
  warningCount:   number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  source?:        string;
};


## Attribution
- Source: ESLint
- URL: https://eslint.org/docs/latest/
- License: MIT License
- Crawl Date: 2025-05-04T17:31:57.574Z
- Data Size: 2193889 bytes
- Links Found: 5063

## Retrieved
2025-05-04
