# COMMITIZEN

## Crawl Summary
Install commitizen globally or locally, init adapters via npx commitizen init <adapter> --save-dev --save-exact. Configure adapter path in package.json config.commitizen.path or .czrc/.czrc.js. Use git cz or npm run commit. Customize adapters (e.g., cz-customizable) via cz.config.js defining types, scopes, limits. Programmatic API exposed as run(args[], {cwd, config}). Troubleshoot PATH, config syntax, adapter resolution errors.

## Normalised Extract
Table of Contents:
1 Installation
2 Initialization
3 Configuration
4 Adapter Customization
5 CLI Usage
6 Programmatic API
7 Troubleshooting

1 Installation
 Global: npm install -g commitizen@4.4.4
 Local: npm install --save-dev commitizen@4.4.4

2 Initialization
 Command: npx commitizen init <adapter> --save-dev --save-exact
 Effects:
  add devDependency <adapter>@latest
  package.json: config.commitizen.path = "./node_modules/<adapter>"

3 Configuration
 package.json:
  "config": { "commitizen": { "path": "./node_modules/<adapter>" } }
 .czrc (JSON): { "path": "node_modules/<adapter>" }
 .czrc.js (Module.exports) supports additional fields maxHeaderWidth, maxLineWidth
 Priority: project .czrc > package.json > user .czrc

4 Adapter Customization (cz-customizable)
 File: cz.config.js
  fields:
    types: array of {value:string, name:string}
    scopes: string[]
    allowCustomScopes: boolean
    allowBreakingChanges: string[]
    subjectLimit: number
    skipQuestions: string[]

5 CLI Usage
 Commands:
  git cz
  npx git-cz
  npm run commit (requires script "commit": "git-cz")
 Flags:
  --verbose : debug output
  --config <path> : override adapter path or config file

6 Programmatic API
 Signature:
  run(args: string[], options?: { cwd?: string; config?: string|object; }): Promise<void>
 Example:
  const { run } = require('commitizen');
  run(['--config', './cz.config.js'], { cwd: process.cwd() });

7 Troubleshooting
  Ensure node_modules/.bin in PATH or global install
  Validate JSON/JS syntax in config files
  Verify adapter installation and correct path in config

## Supplementary Details
Installation versions: commitizen@4.4.4, cz-conventional-changelog@4.3.0, cz-customizable@6.3.0. Adapter init flags: --save-dev adds to devDependencies, --save-exact pins exact version. Config file resolution order: project .czrc -> package.json config.commitizen.path -> user ~/.czrc. Default CLI exit codes: 0 success, 1 invalid config, 2 adapter load error. Adapter config defaults: maxHeaderWidth=100, maxLineWidth=100, allowCustomScopes=false, allowBreakingChanges=[]. Config file names supported: .czrc, .czrc.js, cz.config.js. Package.json key: config.commitizen.path. git-cz shim name resolution: lookup package.json script "commit" alias.

## Reference Details
API: run(args: string[], options?: { cwd?: string; config?: string|object; }): Promise<void>
Parameters:
 args: array of CLI arguments: --config, --verbose, adapter-specific flags
 options.cwd: working directory path string
 options.config: path to adapter config file or object with adapter settings
Return: Promise resolves on successful commit, rejects with Error containing code, message, stack

CLI:
 Global: commitizen
 Local: npx commitizen
 Alias: git-cz
 Commands:
  init <adapter> [--save-dev] [--save-exact]
    adapter: name or module path
  run [--config <path>] [--verbose]

package.json config:
  "config": { "commitizen": { "path": string } }

Adapter config (cz-config.js): module.exports = { types: {value:string,name:string}[], scopes:string[], allowCustomScopes:boolean, allowBreakingChanges:string[], subjectLimit:number, skipQuestions:string[], breaklineChar:string }

Example .czrc.js:
module.exports = {
  path: "node_modules/cz-customizable",
  maxHeaderWidth: 72,
  maxLineWidth: 100
};

Best Practices:
• Lock adapter versions with --save-exact
• Define subjectLimit<=50
• Allow breaking changes only for feat and fix
• Skip body/footer prompts if not needed

Troubleshooting Commands:
$ git cz --verbose
Expected: prompts appear, commit message printed to stdout

$ npx commitizen init nonexistent-adapter
Expected: Error: Adapter "nonexistent-adapter" not found

Check:
$ node -e "console.log(require('commitizen/package.json').version)"
Expected: 4.4.4

## Information Dense Extract
commitizen@4.4.4 install via npm global/local; init adapters: npx commitizen init <adapter> --save-dev --save-exact => config.commitizen.path=./node_modules/<adapter>; config resolution: project .czrc > package.json> user .czrc; .czrc.js supports path, maxHeaderWidth=100, maxLineWidth=100; cz-customizable cz.config.js fields types[{value,name}],scopes[],allowCustomScopes=false,allowBreakingChanges[],subjectLimit=50,skipQuestions[]; CLI: git cz|npx git-cz (script "commit":"git-cz"); flags: --config<path>,--verbose; API: run(args:string[],options?{cwd?:string,config?:string|object}):Promise<void>; exit codes:0 success,1 invalid config,2 load error; key config.commitizen.path; troubleshooting: ensure node_modules/.bin in PATH, valid JSON/JS, adapter installed.

## Sanitised Extract
Table of Contents:
1 Installation
2 Initialization
3 Configuration
4 Adapter Customization
5 CLI Usage
6 Programmatic API
7 Troubleshooting

1 Installation
 Global: npm install -g commitizen@4.4.4
 Local: npm install --save-dev commitizen@4.4.4

2 Initialization
 Command: npx commitizen init <adapter> --save-dev --save-exact
 Effects:
  add devDependency <adapter>@latest
  package.json: config.commitizen.path = './node_modules/<adapter>'

3 Configuration
 package.json:
  'config': { 'commitizen': { 'path': './node_modules/<adapter>' } }
 .czrc (JSON): { 'path': 'node_modules/<adapter>' }
 .czrc.js (Module.exports) supports additional fields maxHeaderWidth, maxLineWidth
 Priority: project .czrc > package.json > user .czrc

4 Adapter Customization (cz-customizable)
 File: cz.config.js
  fields:
    types: array of {value:string, name:string}
    scopes: string[]
    allowCustomScopes: boolean
    allowBreakingChanges: string[]
    subjectLimit: number
    skipQuestions: string[]

5 CLI Usage
 Commands:
  git cz
  npx git-cz
  npm run commit (requires script 'commit': 'git-cz')
 Flags:
  --verbose : debug output
  --config <path> : override adapter path or config file

6 Programmatic API
 Signature:
  run(args: string[], options?: { cwd?: string; config?: string|object; }): Promise<void>
 Example:
  const { run } = require('commitizen');
  run(['--config', './cz.config.js'], { cwd: process.cwd() });

7 Troubleshooting
  Ensure node_modules/.bin in PATH or global install
  Validate JSON/JS syntax in config files
  Verify adapter installation and correct path in config

## Original Source
Commitizen & Conventional Commits
https://github.com/conventional-changelog/commitizen#readme

## Digest of COMMITIZEN

# COMMITIZEN

Content retrieved on 2024-06-04 from https://github.com/conventional-changelog/commitizen#readme

## 1. Installation

### 1.1 Global
npm install -g commitizen@4.4.4

### 1.2 Local (Project)
npm install --save-dev commitizen@4.4.4

## 2. Initialization

### 2.1 Init with Adapter
npx commitizen init cz-conventional-changelog --save-dev --save-exact

Effects:
  • Adds devDependency cz-conventional-changelog@4.3.0
  • Updates package.json with:
    {
      "config": {
        "commitizen": {
          "path": "./node_modules/cz-conventional-changelog"
        }
      }
    }
  • Installs git-cz CLI shim in node_modules/.bin/git-cz

## 3. Configuration

### 3.1 package.json
In package.json:
  "config": {
    "commitizen": {
      "path": "./node_modules/<adapter>"
    }
  }

### 3.2 .czrc (JSON)
In project root or $HOME/.czrc:
  {
    "path": "node_modules/<adapter>"
  }

### 3.3 .czrc.js (Module)
module.exports = {
  path: "node_modules/<adapter>",
  maxHeaderWidth: 100,
  maxLineWidth: 100
};

Resolution priority: 1) .czrc in project, 2) package.json config.commitizen, 3) $HOME/.czrc

## 4. Adapter Customization (cz-customizable)

File: cz.config.js in project root:

module.exports = {
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix",  name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    { value: "style",name: "style:    Changes that do not affect the meaning of the code" }
  ],
  scopes: ["core", "cli", "api", "infra"],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 50,
  skipQuestions: ["body", "footer"]
};

## 5. Usage

### 5.1 CLI Commands
• git cz  
• npx git-cz  
• npm run commit (script: "commit": "git-cz")

### 5.2 Flags
--verbose       Enable debug logging
--config <path> Override adapter path or config file

## 6. Programmatic API

Import and run within Node.js scripts:

```js
const { run } = require("commitizen");

run(["--config", "./cz.config.js"], { cwd: process.cwd() })
  .then(() => console.log("Commit complete"))
  .catch(err => console.error(err));
```

Signature:
  run(args: string[], options?: {
    cwd?: string;
    config?: string | object;
  }): Promise<void>

## 7. Troubleshooting

### 7.1 Command Not Found
Ensure node_modules/.bin is in PATH or install commitizen globally.

### 7.2 Bad Configuration
Error: Unexpected token in JSON.  
Check .czrc or cz.config.js syntax.

### 7.3 Adapter Load Fail
Error: Cannot find module <adapter>.  
Verify adapter installed and config.path correct.

Attribution: Conventional Changelog Commitizen README
Data Size: 2.5 KB

## Attribution
- Source: Commitizen & Conventional Commits
- URL: https://github.com/conventional-changelog/commitizen#readme
- License: MIT License
- Crawl Date: 2025-05-03T00:30:52.200Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-03
