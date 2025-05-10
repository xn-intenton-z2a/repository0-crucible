# COSMICONFIG

## Crawl Summary
Default async searchPlaces array of 21 entries. Sync searchPlaces array of 17 entries. API method signatures: cosmiconfig, explorer.search/load/clear*. cosmiconfigOptions with types and defaults: searchStrategy, searchPlaces, loaders, packageProp, stopDir, cache, transform, ignoreEmptySearchPlaces. DefaultLoaders mapping extensions to loader functions. JS module loading conditions. Caching behavior and cache-clearing methods. End-user file places and $import merging.

## Normalised Extract
Table of Contents
1  Instance Creation and Core Methods
2  Default Search Places
3  cosmiconfigOptions with Defaults
4  Loader Configuration
5  JS Module Loading
6  Caching Control
7  End-User File Locations and $import

1  Instance Creation and Core Methods
- Create explorer: const explorer = cosmiconfig(moduleName, options)
- search(searchFrom?: string): Promise<Result|null>
  Returns first matching config or null.
- load(loadPath: string): Promise<Result>
  Loads specific file or rejects.
- clearLoadCache(): void
- clearSearchCache(): void
- clearCaches(): void
- Sync counterparts in cosmiconfigSync; methods return Result or void and throw on error.

2  Default Search Places
- Async default searchPlaces[21]:
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
- Sync variant omits mjs entries.

3  cosmiconfigOptions with Defaults
- searchStrategy: none|project|global (none unless stopDir set => global)
- searchPlaces: string[] (default above)
- loaders: Record<string,SyncLoader|AsyncLoader> merged with defaults
- packageProp: string|string[] (default moduleName)
- stopDir: string (default user home)
- cache: boolean (default true)
- transform: (Result)=>Result|Promise<Result> cached output
- ignoreEmptySearchPlaces: boolean (default true)

4  Loader Configuration
- defaultLoaders keys: .mjs,.cjs,.js,.ts,.json,.yaml,.yml,noExt
- defaultLoadersSync keys: .cjs,.js,.ts,.json,.yaml,.yml,noExt
- Custom loader signature sync: (filepath: string, content: string)=>object|null
- Async loader signature: (filepath: string, content: string)=>object|null|Promise<object|null>
- Custom loader merge: specify only needed keys

5  JS Module Loading
- Async: dynamic import for .mjs and ESM .js files
- Sync: CommonJS require only; ignores .mjs

6  Caching Control
- By default cache enabled per explorer instance
- Disable: options.cache=false
- Clear caches via explorer.clearLoadCache, clearSearchCache, clearCaches or create new instance

7  End-User File Locations and $import
- Supported files: package.json, .{NAME}rc(.json|.yaml|.yml|.js|.ts|.cjs|.mjs), .config/{NAME}rc(.json|.yaml|.yml|.js|.ts|.cjs|.mjs), {NAME}.config.(js|ts|cjs|mjs)
- $import: string or array; imported in declaration order; last wins


## Supplementary Details
Implementation Steps:
1  Installation: npm install cosmiconfig
2  Import:
   const { cosmiconfig, cosmiconfigSync, defaultLoaders } = require('cosmiconfig')
3  Create explorer:
   const explorer = cosmiconfig('moduleName', { searchStrategy:'global', cache:true })
4  Search:
   explorer.search().then(res=>{ if(res) use res.config })
5  Load:
   explorer.load('path/to/config.json')
6  Custom loader example:
   const json5Loader = (path,content)=>require('json5').parse(content)
   cosmiconfig('mod',{ loaders:{ '.json': json5Loader } })
7  Disable cache:
   cosmiconfig('mod',{ cache:false })
8  Clear caches:
   explorer.clearLoadCache()
   explorer.clearSearchCache()
9  Sync usage:
   const explorerSync = cosmiconfigSync('moduleName',options)
   const res = explorerSync.search(); const cfg = explorerSync.load(path)

Configuration Options Summary:
- searchStrategy: none|project|global
- searchPlaces: custom array to override default
- loaders: override or extend defaultLoaders
- packageProp: property path in package.json
- stopDir: directory to stop upward search
- cache: toggle in-memory caches
- transform: function to post-process and cache output
- ignoreEmptySearchPlaces: include empty files when false


## Reference Details
Type Definitions:

type Result = {
  config: any,
  filepath: string,
  isEmpty?: boolean
}

type SyncLoader = (filepath:string,content:string)=>object|null

type AsyncLoader = (filepath:string,content:string)=>object|null|Promise<object|null>

interface CosmiconfigOptions {
  searchStrategy?: 'none'|'project'|'global',
  searchPlaces?: string[],
  loaders?: Record<string,SyncLoader|AsyncLoader>,
  packageProp?: string|string[],
  stopDir?: string,
  cache?: boolean,
  transform?: (result:Result)=>Result|Promise<Result>,
  ignoreEmptySearchPlaces?: boolean
}

interface Explorer {
  search(searchFrom?:string):Promise<Result|null>
  load(loadPath:string):Promise<Result>
  clearLoadCache():void
  clearSearchCache():void
  clearCaches():void
}

interface ExplorerSync {
  search(searchFrom?:string):Result|null
  load(loadPath:string):Result
  clearLoadCache():void
  clearSearchCache():void
  clearCaches():void
}

Function Signatures:

cosmiconfig(moduleName:string, options?:CosmiconfigOptions):Explorer
cosmiconfigSync(moduleName:string, options?:CosmiconfigOptions):ExplorerSync

Default searchPlaces array definition in code:
const defaultSearchPlaces = [
  'package.json',
  `.${moduleName}rc`,
  `.${moduleName}rc.json`,
  `.${moduleName}rc.yaml`,
  `.${moduleName}rc.yml`,
  `.${moduleName}rc.js`,
  `.${moduleName}rc.ts`,
  `.${moduleName}rc.mjs`,
  `.${moduleName}rc.cjs`,
  `.config/${moduleName}rc`,
  `.config/${moduleName}rc.json`,
  `.config/${moduleName}rc.yaml`,
  `.config/${moduleName}rc.yml`,
  `.config/${moduleName}rc.js`,
  `.config/${moduleName}rc.ts`,
  `.config/${moduleName}rc.mjs`,
  `.config/${moduleName}rc.cjs`,
  `${moduleName}.config.js`,
  `${moduleName}.config.ts`,
  `${moduleName}.config.mjs`,
  `${moduleName}.config.cjs`
]

Default loaders mapping in code:
const defaultLoaders = {
  '.mjs':loadJs,
  '.cjs':loadJs,
  '.js':loadJs,
  '.ts':loadTs,
  '.json':loadJson,
  '.yaml':loadYaml,
  '.yml':loadYaml,
  'noExt':loadYaml
}

Code Examples:

// Async search example
const { cosmiconfig } = require('cosmiconfig')
const explorer = cosmiconfig('myapp')
explorer.search().then(res=>{
  if(res){
    console.log('config:',res.config)
    console.log('path:',res.filepath)
  } else console.log('No config found')
}).catch(err=>console.error(err))

// Sync search example
const { cosmiconfigSync } = require('cosmiconfig')
const explorerSync = cosmiconfigSync('myapp',{cache:false})
try{
  const resSync = explorerSync.search()
  if(resSync) console.log(resSync.config)
} catch(e){ console.error(e) }

Best Practices:
- Use transform option to post-process and cache expensive operations.
- Disable cache in development for deterministic behavior: options.cache=false.
- Provide custom loaders for non-standard file types and merge with defaultLoaders.

Troubleshooting:
# Clear caches if stale results:
node -e "require('cosmiconfig')('mod').clearCaches()"
# Error loading malformed YAML:
Expected: .yaml file with valid syntax, error thrown includes file path and parse location.
# Missing config returns null, not error. Check result===null.
# Dynamic import errors for ESM require Node >=12.17.0 and correct file extension or package.json type field.


## Information Dense Extract
cosmiconfig(moduleName:string,options?:CosmiconfigOptions):Explorer; Explorer.search(searchFrom?:string):Promise<Result|null>; Explorer.load(loadPath:string):Promise<Result>; clearLoadCache()/clearSearchCache()/clearCaches():void; cosmiconfigSync returns ExplorerSync with same methods sync. Default searchPlaces async: ['package.json',`.${name}rc`,`.${name}rc.json`,`.${name}rc.yaml`,`.${name}rc.yml`,`.${name}rc.js`,`.${name}rc.ts`,`.${name}rc.mjs`,`.${name}rc.cjs`,`.config/${name}rc`,`.config/${name}rc.json`,`.config/${name}rc.yaml`,`.config/${name}rc.yml`,`.config/${name}rc.js`,`.config/${name}rc.ts`,`.config/${name}rc.mjs`,`.config/${name}rc.cjs`,`${name}.config.js`,`${name}.config.ts`,`${name}.config.mjs`,`${name}.config.cjs`]; sync omits .mjs entries. Options: searchStrategy:none|project|global (none by default), searchPlaces:string[], loaders:Record<string,SyncLoader|AsyncLoader>, packageProp:string|string[], stopDir:string, cache:boolean=true, transform:(Result)=>Result|Promise<Result>, ignoreEmptySearchPlaces:boolean=true. defaultLoaders: .mjs/.cjs/.js=>loadJs, .ts=>loadTs, .json=>loadJson, .yaml/.yml/noExt=>loadYaml. Sync loaders exclude .mjs. Loader signatures: SyncLoader(filepath,content)=>object|null; AsyncLoader returns object|null or Promise. JS modules: dynamic import for async, require for sync. Cache control via options.cache=false or clear methods. $import key merges base files in order. End-user file locations as above.

## Sanitised Extract
Table of Contents
1  Instance Creation and Core Methods
2  Default Search Places
3  cosmiconfigOptions with Defaults
4  Loader Configuration
5  JS Module Loading
6  Caching Control
7  End-User File Locations and $import

1  Instance Creation and Core Methods
- Create explorer: const explorer = cosmiconfig(moduleName, options)
- search(searchFrom?: string): Promise<Result|null>
  Returns first matching config or null.
- load(loadPath: string): Promise<Result>
  Loads specific file or rejects.
- clearLoadCache(): void
- clearSearchCache(): void
- clearCaches(): void
- Sync counterparts in cosmiconfigSync; methods return Result or void and throw on error.

2  Default Search Places
- Async default searchPlaces[21]:
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
- Sync variant omits mjs entries.

3  cosmiconfigOptions with Defaults
- searchStrategy: none|project|global (none unless stopDir set => global)
- searchPlaces: string[] (default above)
- loaders: Record<string,SyncLoader|AsyncLoader> merged with defaults
- packageProp: string|string[] (default moduleName)
- stopDir: string (default user home)
- cache: boolean (default true)
- transform: (Result)=>Result|Promise<Result> cached output
- ignoreEmptySearchPlaces: boolean (default true)

4  Loader Configuration
- defaultLoaders keys: .mjs,.cjs,.js,.ts,.json,.yaml,.yml,noExt
- defaultLoadersSync keys: .cjs,.js,.ts,.json,.yaml,.yml,noExt
- Custom loader signature sync: (filepath: string, content: string)=>object|null
- Async loader signature: (filepath: string, content: string)=>object|null|Promise<object|null>
- Custom loader merge: specify only needed keys

5  JS Module Loading
- Async: dynamic import for .mjs and ESM .js files
- Sync: CommonJS require only; ignores .mjs

6  Caching Control
- By default cache enabled per explorer instance
- Disable: options.cache=false
- Clear caches via explorer.clearLoadCache, clearSearchCache, clearCaches or create new instance

7  End-User File Locations and $import
- Supported files: package.json, .{NAME}rc(.json|.yaml|.yml|.js|.ts|.cjs|.mjs), .config/{NAME}rc(.json|.yaml|.yml|.js|.ts|.cjs|.mjs), {NAME}.config.(js|ts|cjs|mjs)
- $import: string or array; imported in declaration order; last wins

## Original Source
cosmiconfig
https://github.com/davidtheclark/cosmiconfig

## Digest of COSMICONFIG

# Cosmiconfig Detailed Digest

Retrieved on: 2024-06-25
Data size: 664411 bytes

## 1. Asynchronous API

### cosmiconfig(moduleName, cosmiconfigOptions)
Creates an explorer instance with caches initialized.

Arguments:
- moduleName: string (required)
- cosmiconfigOptions: object (optional)

### explorer.search([searchFrom])
Returns Promise<Result|null>. Resolves with first found configuration or null.

### explorer.load(loadPath)
Returns Promise<Result>. Loads file at loadPath or rejects on error.

### explorer.clearLoadCache()
Clears load cache.

### explorer.clearSearchCache()
Clears search cache.

### explorer.clearCaches()
Clears both load and search caches.

## 2. Synchronous API

### cosmiconfigSync(moduleName, cosmiconfigOptions)
Creates explorerSync with caches initialized.

Methods identical to async but return values directly and throw on errors:
- explorerSync.search([searchFrom]): Result|null
- explorerSync.load(loadPath): Result
- explorerSync.clearLoadCache(): void
- explorerSync.clearSearchCache(): void
- explorerSync.clearCaches(): void

## 3. Default Search Places

Asynchronous defaults (array order):
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

In sync API .mjs entries are omitted.

## 4. Default Loaders

Exported defaults:
- '.mjs' => loadJs
- '.cjs' => loadJs
- '.js'  => loadJs
- '.ts'  => loadTs
- '.json'=> loadJson
- '.yaml'=> loadYaml
- '.yml' => loadYaml
- 'noExt'=> loadYaml

Sync loaders exclude '.mjs'.

## 5. cosmiconfigOptions

- searchStrategy: 'none'|'project'|'global' (default none unless stopDir set => global)
- searchPlaces: string[] (default above)
- loaders: object mapping extension to loader function
- packageProp: string|string[] (default moduleName)
- stopDir: string (default user home dir)
- cache: boolean (default true)
- transform: function(Result)=>Result|Promise<Result>
- ignoreEmptySearchPlaces: boolean (default true)

## 6. Loading JS Modules

Async API uses dynamic import for .mjs and .js under ESM conditions.
Sync API treats all JS as CommonJS; ignores .mjs.

## 7. Caching

By default cache enabled per explorer instance. Disable via options.cache=false or use clearLoadCache, clearSearchCache, clearCaches repeatedly.

## 8. End-User Usage and $import

Supports $import key to merge base configurations. Import paths array processed in order, last wins.

## Attribution
- Source: cosmiconfig
- URL: https://github.com/davidtheclark/cosmiconfig
- License: MIT License
- Crawl Date: 2025-05-10T14:58:31.177Z
- Data Size: 664411 bytes
- Links Found: 4978

## Retrieved
2025-05-10
