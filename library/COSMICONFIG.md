# COSMICONFIG

## Crawl Summary
cosmiconfig module exposes async and sync entry points. Async: cosmiconfig(name,options), sync: cosmiconfigSync(name,options). Default search path includes package.json, rc files in root and .config subdir, config files with extensions. Explorer methods: search, load, clearLoadCache, clearSearchCache, clearCaches. Options control searchStrategy, searchPlaces, loaders, packageProp, stopDir, cache, transform, ignoreEmptySearchPlaces. Default loaders map extensions to loadJson, loadYaml, loadJs, loadTs. JS modules loaded via dynamic import in async API; sync API uses require. Caching per-explorer, clearable. Differs from rc: stops at first match, supports JS/TS.

## Normalised Extract
Table of Contents

1. Async API Instantiation
2. Explorer.search
3. Explorer.load
4. Cache Management
5. Configuration Options
   5.1 searchStrategy
   5.2 searchPlaces
   5.3 loaders
   5.4 packageProp
   5.5 stopDir
   5.6 cache
   5.7 transform
   5.8 ignoreEmptySearchPlaces
6. Default Search Places
7. Default Loaders
8. Loading JS Modules
9. Caching
10. Differences from rc

1. Async API Instantiation
Function signature: cosmiconfig(moduleName: string, options?: CosmiconfigOptions): Explorer
moduleName must be filename-safe, no scoped names
Returns Explorer with initialized caches

2. Explorer.search
Signature: search(searchFrom?: string): Promise<Result|null>
Default searchFrom: process.cwd()
Result object structure: { config: any; filepath: string; isEmpty?: true }
Search order per directory: package.json property, .moduleName rc, .rc.json/.yaml/.yml/.js/.ts/.mjs/.cjs, .config subdir variants, moduleName.config.js/.ts/.mjs/.cjs
Strategy after current directory determined by searchStrategy: none, project, or global. global then checks OS config dir ~/.config/moduleName/

3. Explorer.load
Signature: load(loadPath: string): Promise<Result>
Reads loadPath via loader based on extension or noExt
Throws if file missing or parse error

4. Cache Management
clearLoadCache(): void clears load cache
clearSearchCache(): void clears search cache
clearCaches(): void calls both

5. Configuration Options
5.1 searchStrategy: none|project|global default none or global if stopDir set
5.2 searchPlaces: string[] default 22 paths built from moduleName
5.3 loaders: { [ext]: loader } merged with defaultLoaders; keys ext include ".js", ".json", ".yaml", ".ts", ".mjs", ".cjs", "noExt"
5.4 packageProp: string|string[] default moduleName
5.5 stopDir: string default home directory
5.6 cache: boolean default true
5.7 transform: (result)=>Result|Promise<Result> transform cached result
5.8 ignoreEmptySearchPlaces: boolean default true

6. Default Search Places
Asynchronous default searchPlaces list of 22 file paths as above

7. Default Loaders
Ext to defaultLoaders mapping: see defaultLoaders export
Sync version excludes .mjs

8. Loading JS Modules
Async uses dynamic import for .js/.ts/.mjs/.cjs
Sync uses require for .js/.cjs only

9. Caching
Per-instance caches for search and load
Cache disabled by option cache=false or by clear methods

10. Differences from rc
Finds first config then stops, no merging
Built-in JSON, YAML, CommonJS support
Asynchronous by default

## Supplementary Details
Default values
searchStrategy: none or global if stopDir set
searchPlaces: see normalisedExtract section 6
loaders: defaultLoaders Async with .mjs,.cjs,.js,.ts,.json,.yaml,.yml,noExt; Sync excludes .mjs
packageProp: moduleName
stopDir: os.homedir()
cache: true
ignoreEmptySearchPlaces: true

Implementation Steps
1. npm install cosmiconfig
2. import { cosmiconfig } from 'cosmiconfig'
3. const explorer = cosmiconfig('myapp',{ cache:false, searchStrategy:'project' })
4. const result = await explorer.search('/path/to/start')
5. if(result) use result.config; else handle no config
6. explorer.clearCaches() before program exit to free memory

Loader Customization Example
cosmiconfig('foo',{ loaders:{ '.json':defaultLoadersSync['.json'] } }) // enforce strict JSON

Transform Example
cosmiconfig('foo',{ transform:result=>{ result.config.env=process.env.NODE_ENV; return result } })

## Reference Details
Async API

import { cosmiconfig, defaultLoaders } from 'cosmiconfig'

const explorer = cosmiconfig('appName',{
  searchStrategy:'global',
  searchPlaces:[
    'package.json',
    '.appnrc',
    '.appnrc.json',
    '.config/appnrc.yaml',
    'appn.config.js'
  ],
  loaders: {
    '.yaml': defaultLoaders['.yaml'],
    'noExt': defaultLoaders['.json']
  },
  packageProp:['configs','appName'],
  stopDir:'/project/root',
  cache:false,
  transform: async result => ({ ...result, config: sanitize(result.config) }),
  ignoreEmptySearchPlaces:false
})

// search()
// Returns Promise<{ config:any; filepath:string; isEmpty?:true } | null>

explorer.search('/cwd/subdir')
  .then(result=>{
    if(!result) throw new Error('No config found')
    applyConfig(result.config)
  })
  .catch(err=>console.error('config load error',err))

// load()
// Returns Promise<Result>

explorer.load('/config/path/app.config.yaml')
  .then(({config,filepath})=> console.log('loaded',filepath))
  .catch(err=> console.error(err))

// Caching methods
e.explorer.clearLoadCache()
explorer.clearSearchCache()
explorer.clearCaches()

Sync API

import { cosmiconfigSync, defaultLoadersSync } from 'cosmiconfig'

const explorerSync = cosmiconfigSync('appName',{ cache:true })
const resultSync = explorerSync.search('/start')
if(resultSync) use(resultSync.config)

Configuration Options Table

| Option                  | Type                         | Default                                        | Effect                                          |
|-------------------------|------------------------------|------------------------------------------------|-------------------------------------------------|
| searchStrategy          | 'none'|'project'|'global'  | 'none' if no stopDir, 'global' if stopDir set  | Controls directory traversal strategy           |
| searchPlaces            | string[]                     | default 22 module-based places                 | Defines files and paths to check per directory  |
| loaders                 | { [ext]: loader }            | defaultLoaders/Sync                            | Maps extensions to parse functions              |
| packageProp             | string  string[]       | moduleName                                     | Property path in package.json                   |
| stopDir                 | string                       | os.homedir()                                   | Directory where search stops                    |
| cache                   | boolean                      | true                                           | Enables caching of results                      |
| transform               | (Result)=>ResultPromise | identity                                       | Transforms result before caching                |
| ignoreEmptySearchPlaces | boolean                      | true                                           | Skip empty files during search                  |

Best Practice Example

// Enforce strict JSON for rc files and disable caching
const explorerStrict = cosmiconfig('myapp',{
  cache:false,
  loaders:{ noExt:defaultLoaders['.json'] }
})

const resultStrict = await explorerStrict.search()
if(resultStrict) console.log(JSON.stringify(resultStrict.config))

Troubleshooting

1. No config found but file exists
   Command: console.log(explorer.searchPlaces)
   Expected: array includes your filename
   Fix: add custom searchPlaces covering extension

2. Syntax error in JS config
   Command: try explorer.load('path.js').catch(console.error)
   Expected: SyntaxError with stack trace
   Fix: ensure file exports via module.exports or use ESM with .mjs and async API

3. Transform not applied
   Check: option transform is async vs sync API mismatch
   Fix: use sync-only transform for cosmiconfigSync


## Information Dense Extract
cosmiconfig(name,options) returns Explorer with methods search(searchFrom?), load(path), clearLoadCache(), clearSearchCache(), clearCaches(). Default search files per directory: package.json->packageProp, .name rc (noExt->YAML/JSON), .rc.json/.yaml/.yml/.js/.ts/.mjs/.cjs, .config subdir variants, name.config.js/.ts/.mjs/.cjs. Options: searchStrategy('none'|'project'|'global'), searchPlaces(string[]), loaders({ext:loader}), packageProp(string|string[]), stopDir(string), cache(boolean), transform(function), ignoreEmptySearchPlaces(boolean). Default loaders Async: .mjs,.cjs,.js(loadJs),.ts(loadTs),.json(loadJson),.yaml/.yml(loadYaml),noExt(loadYaml). JS modules loaded via dynamic import in async API; sync API uses require, ignores .mjs. Caching per instance, clearable. cosmiconfigSync for sync API identical signatures without promises.

## Sanitised Extract
Table of Contents

1. Async API Instantiation
2. Explorer.search
3. Explorer.load
4. Cache Management
5. Configuration Options
   5.1 searchStrategy
   5.2 searchPlaces
   5.3 loaders
   5.4 packageProp
   5.5 stopDir
   5.6 cache
   5.7 transform
   5.8 ignoreEmptySearchPlaces
6. Default Search Places
7. Default Loaders
8. Loading JS Modules
9. Caching
10. Differences from rc

1. Async API Instantiation
Function signature: cosmiconfig(moduleName: string, options?: CosmiconfigOptions): Explorer
moduleName must be filename-safe, no scoped names
Returns Explorer with initialized caches

2. Explorer.search
Signature: search(searchFrom?: string): Promise<Result|null>
Default searchFrom: process.cwd()
Result object structure: { config: any; filepath: string; isEmpty?: true }
Search order per directory: package.json property, .moduleName rc, .rc.json/.yaml/.yml/.js/.ts/.mjs/.cjs, .config subdir variants, moduleName.config.js/.ts/.mjs/.cjs
Strategy after current directory determined by searchStrategy: none, project, or global. global then checks OS config dir ~/.config/moduleName/

3. Explorer.load
Signature: load(loadPath: string): Promise<Result>
Reads loadPath via loader based on extension or noExt
Throws if file missing or parse error

4. Cache Management
clearLoadCache(): void clears load cache
clearSearchCache(): void clears search cache
clearCaches(): void calls both

5. Configuration Options
5.1 searchStrategy: none|project|global default none or global if stopDir set
5.2 searchPlaces: string[] default 22 paths built from moduleName
5.3 loaders: { [ext]: loader } merged with defaultLoaders; keys ext include '.js', '.json', '.yaml', '.ts', '.mjs', '.cjs', 'noExt'
5.4 packageProp: string|string[] default moduleName
5.5 stopDir: string default home directory
5.6 cache: boolean default true
5.7 transform: (result)=>Result|Promise<Result> transform cached result
5.8 ignoreEmptySearchPlaces: boolean default true

6. Default Search Places
Asynchronous default searchPlaces list of 22 file paths as above

7. Default Loaders
Ext to defaultLoaders mapping: see defaultLoaders export
Sync version excludes .mjs

8. Loading JS Modules
Async uses dynamic import for .js/.ts/.mjs/.cjs
Sync uses require for .js/.cjs only

9. Caching
Per-instance caches for search and load
Cache disabled by option cache=false or by clear methods

10. Differences from rc
Finds first config then stops, no merging
Built-in JSON, YAML, CommonJS support
Asynchronous by default

## Original Source
cosmiconfig
https://github.com/davidtheclark/cosmiconfig

## Digest of COSMICONFIG

# Installation

Installation Command

npm install cosmiconfig

Supported Environments

Node.js >=14

# Asynchronous API

Function: cosmiconfig(moduleName: string, options?: CosmiconfigOptions): Explorer

Explorer Methods:

search(searchFrom?: string): Promise<Result|null>
load(loadPath: string): Promise<Result>
clearLoadCache(): void
clearSearchCache(): void
clearCaches(): void

# Synchronous API

Function: cosmiconfigSync(moduleName: string, options?: CosmiconfigOptions): ExplorerSync

ExplorerSync Methods:

search(searchFrom?: string): Result|null
load(loadPath: string): Result
clearLoadCache(): void
clearSearchCache(): void
clearCaches(): void

# CosmiconfigOptions

searchStrategy: 'none' | 'project' | 'global'  default none unless stopDir is set then global
searchPlaces: string[]  default array of 22 paths based on moduleName
loaders: {[ext: string]: SyncLoader|AsyncLoader}  merged with defaultLoaders
packageProp: string|string[]  default moduleName
stopDir: string  default user home directory
cache: boolean  default true
transform: (result: Result)=> Result|Promise<Result>
ignoreEmptySearchPlaces: boolean  default true

# Default searchPlaces (async)

package.json
.${moduleName}rc
.${moduleName}rc.json
.${moduleName}rc.yaml
.${moduleName}rc.yml
.${moduleName}rc.js
.${moduleName}rc.ts
.${moduleName}rc.mjs
.${moduleName}rc.cjs
.config/${moduleName}rc
.config/${moduleName}rc.json
.config/${moduleName}rc.yaml
.config/${moduleName}rc.yml
.config/${moduleName}rc.js
.config/${moduleName}rc.ts
.config/${moduleName}rc.mjs
.config/${moduleName}rc.cjs
${moduleName}.config.js
${moduleName}.config.ts
${moduleName}.config.mjs
${moduleName}.config.cjs

# Default loaders (async)

Extension to function mapping:
.mjs -> loadJs
.cjs -> loadJs
.js  -> loadJs
.ts  -> loadTs
.json-> loadJson
.yaml-> loadYaml
.yml -> loadYaml
noExt-> loadYaml

# Loading JS modules

Async API uses dynamic import for .js,.ts,.mjs,.cjs
Sync API treats all .js/.cjs as CommonJS, ignores .mjs

# Caching

Each Explorer instance has separate caches for search and load
default cache=true
clearLoadCache clears load cache
e.g. explorer.clearLoadCache()

# Differences from rc

Stops at first found config, does not merge up-tree
Built-in JSON,YAML,CommonJS support
Asynchronous by default


## Attribution
- Source: cosmiconfig
- URL: https://github.com/davidtheclark/cosmiconfig
- License: MIT License
- Crawl Date: 2025-05-10T23:33:14.117Z
- Data Size: 1796518 bytes
- Links Found: 7855

## Retrieved
2025-05-10
