# URL_MODULE

## Crawl Summary
Provides WHATWG URL Standard API and legacy Node-specific URL parsing utilities. Core classes: URL, URLPattern, URLSearchParams. URL constructor takes input and optional base string. URL instances expose get/set properties for hash, host, hostname, href, origin, password, pathname, port, protocol, search, searchParams, username. Methods toString and toJSON return serialized URL. Static helpers: createObjectURL, revokeObjectURL, canParse, parse. URLPattern supports pattern construction, exec, test with optional base and ignoreCase. URLSearchParams supports multiple constructors, manipulation methods (append, delete, set, sort), accessors (get, getAll, has), iteration via entries, keys, values, iterator, size property. Utilities convert domains, file URLs to paths, format URLs, convert paths to file URLs, and map URLs to HTTP options. Legacy APIs: url.parse, url.format, url.resolve retained for compatibility.

## Normalised Extract
Table of Contents
 1 URL class usage
 2 URL properties assignments
 3 URL serialization
 4 Static URL methods
 5 URLPattern matching
 6 URLSearchParams manipulation
 7 Domain encoding functions
 8 File URL conversions
 9 URL formatting options
 10 HTTP options conversion

1 URL class usage
 Constructor new URL(input[, base])
  input string absolute or relative URL
  base string used if input relative
 Throws TypeError on invalid URL

2 URL properties assignments
  url.hash = '#frag' yields percent-encoded fragment
  url.host = 'host:port' invalid ignored
  url.hostname = 'host' invalid ignored
  url.port accepts numbers or numeric prefixes; default port => ''
  url.protocol = 'scheme:' invalid ignored
  url.search = '?q=v'; url.searchParams reflects changes
  url.username, url.password percent-encoded on set

3 URL serialization
  url.href or url.toString() or url.toJSON() return full URL
  Setting href recreates URL object

4 Static URL methods
  createObjectURL(blob): returns blob URL string
  revokeObjectURL(id): unregisters blob URL
  canParse(input[, base]): returns boolean
  parse(input[, base]): returns URL or null

5 URLPattern matching
  new URLPattern(pattern[, baseURL][, {ignoreCase}])
  exec(input[, baseURL]): returns match object with components and groups
  test(input[, baseURL]): returns boolean

6 URLSearchParams manipulation
  append(name,value)
  delete(name[,value])
  get(name): first value or null
  getAll(name): all values
  has(name[,value])
  set(name,value)
  sort() stable by name
  toString(): serialized 'a=b&c=d'
  iterate with entries(), keys(), values(), forEach
  size property count of entries

7 Domain encoding functions
  domainToASCII(domain): punycode ASCII or '' if invalid
  domainToUnicode(domain): unicode or '' if invalid

8 File URL conversions
  fileURLToPath(url[, {windows}]) => platform path string
  pathToFileURL(path[, {windows}]) => file URL object

9 URL formatting options
  url.format(URL, {auth:boolean, fragment:boolean, search:boolean, unicode:boolean}) => string

10 HTTP options conversion
  urlToHttpOptions(URL): {protocol, hostname, port, path, auth, href, hash, search, pathname}


## Supplementary Details
Implementation steps
 1 Importing
    import { URL, URLPattern, URLSearchParams, domainToASCII, fileURLToPath, format, pathToFileURL, urlToHttpOptions } from 'node:url'
    const url = require('node:url')
 2 Constructing URLs
    const u1 = new URL('https://example.org')
    const u2 = new URL('/path', 'https://example.org')
 3 Modifying components
    u1.pathname = '/new'; u1.searchParams.append('a','1')
 4 Serializing
    const s = u1.href
 5 Pattern matching
    const p = new URLPattern('https://*/api/*',{ignoreCase:true}); const m = p.exec('https://nodejs.org/api/url.html')
 6 Query parameter workflows
    const params = new URLSearchParams('foo=bar'); params.set('foo','baz'); const q = params.toString()
 7 Domain conversions
    const ascii = domainToASCII('中文.com')
 8 File URL handling
    const filePath = fileURLToPath(new URL(import.meta.url))
    const fileUrl = pathToFileURL('/tmp/test.txt')
 9 URL formatting
    const custom = format(u1,{auth:false,fragment:false,unicode:true})
 10 HTTP request options
    const opts = urlToHttpOptions(new URL('https://user:pass@host/path?q#f'))


## Reference Details
Class URL
 Signature new URL(input: string, base?: string) => URL
 Throws TypeError on invalid input/base
 Properties get/set:
  hash: string
  host: string
  hostname: string
  href: string
  origin: string (read-only)
  password: string
  pathname: string
  port: string
  protocol: string
  search: string
  searchParams: URLSearchParams
  username: string
 Methods:
  toString(): string
  toJSON(): string
 Static Methods:
  createObjectURL(blob: Blob): string
  revokeObjectURL(id: string): void
  canParse(input: string, base?: string): boolean
  parse(input: string, base?: string): URL | null

Class URLPattern
 new URLPattern(pattern: string|object, baseURL?: string, options?: {ignoreCase: boolean})
 exec(input: string|object, baseURL?: string): PatternResult|null
 test(input: string|object, baseURL?: string): boolean
 PatternResult keys: inputs: string[], protocol:{input:string,groups:{[key:string]:string}}, username, password, hostname, port, pathname, search, hash

Class URLSearchParams
 Constructors:
  new URLSearchParams(): URLSearchParams
  new URLSearchParams(init: string|object|Iterable<[string,string]>): URLSearchParams
 Methods:
  append(name: string, value: string): void
  delete(name: string, value?: string): void
  entries(): Iterator<[string,string]>
  forEach(fn: (value:string,name:string,self:URLSearchParams)=>void, thisArg?: any): void
  get(name: string): string|null
  getAll(name: string): string[]
  has(name: string, value?: string): boolean
  keys(): Iterator<string>
  set(name: string, value: string): void
  sort(): void
  toString(): string
  values(): Iterator<string>
  [Symbol.iterator](): Iterator<[string,string]>
 Properties:
  size: number

Functions:
 domainToASCII(domain: string): string
 domainToUnicode(domain: string): string
 fileURLToPath(url: URL|string, options?: {windows?: boolean}): string
 pathToFileURL(path: string, options?: {windows?: boolean}): URL
 format(URL: URL, options?: {auth?: boolean,fragment?: boolean,search?: boolean,unicode?: boolean}): string
 urlToHttpOptions(url: URL): {protocol:string,hostname:string,port:number,path:string,href:string,auth?:string,hash:string,search:string,pathname:string}

Code Examples:
 const { URL } = require('node:url')
 const u = new URL('https://user:pass@host:8080/path?x=y#f')
 console.log(u.origin) // https://host:8080
 u.port = '80'
 console.log(u.href) // https://host/

 const params = new URLSearchParams('a=1')
 params.append('b','2')
 console.log(params.toString()) // a=1&b=2

 const pattern = new URLPattern('https://example.com/:id')
 console.log(pattern.exec('https://example.com/123').pathname.groups.id) // 123

 const path = fileURLToPath(import.meta.url)
 console.log(path)

 Troubleshooting:
 Validate URL parsing:
   try { new URL('bad') } catch(e) { console.error(e.code) }
 Authorizing HTTP requests:
   const opts = urlToHttpOptions(new URL('https://u:p@h'))
   if (opts.auth) headers.Authorization = 'Basic '+Buffer.from(opts.auth).toString('base64')


## Information Dense Extract
URL(input:string,base?:string)=>URL|TypeError hash,host,hostname,href,origin,password,pathname,port,protocol,search,searchParams,username get/set toString():string toJSON():string static createObjectURL(blob):string revokeObjectURL(id):void canParse(input,base?):boolean parse(input,base?):URL|null URLPattern(pattern,base?,{ignoreCase?:boolean}) exec(input,base?):PatternResult|null test(input,base?):boolean URLSearchParams(string|object|Iterable) append(name,value) delete(name[,value]) entries() forEach(fn) get(name) getAll(name) has(name[,value]) keys() set(name,value) sort() toString() values() [Symbol.iterator]() size domainToASCII(domain):string domainToUnicode(domain):string fileURLToPath(url, {windows?:boolean}):string pathToFileURL(path,{windows?:boolean}):URL format(URL,{auth?:boolean,fragment?:boolean,search?:boolean,unicode?:boolean}):string urlToHttpOptions(URL):{protocol,hostname,port,path,href,auth,hash,search,pathname}

## Sanitised Extract
Table of Contents
 1 URL class usage
 2 URL properties assignments
 3 URL serialization
 4 Static URL methods
 5 URLPattern matching
 6 URLSearchParams manipulation
 7 Domain encoding functions
 8 File URL conversions
 9 URL formatting options
 10 HTTP options conversion

1 URL class usage
 Constructor new URL(input[, base])
  input string absolute or relative URL
  base string used if input relative
 Throws TypeError on invalid URL

2 URL properties assignments
  url.hash = '#frag' yields percent-encoded fragment
  url.host = 'host:port' invalid ignored
  url.hostname = 'host' invalid ignored
  url.port accepts numbers or numeric prefixes; default port => ''
  url.protocol = 'scheme:' invalid ignored
  url.search = '?q=v'; url.searchParams reflects changes
  url.username, url.password percent-encoded on set

3 URL serialization
  url.href or url.toString() or url.toJSON() return full URL
  Setting href recreates URL object

4 Static URL methods
  createObjectURL(blob): returns blob URL string
  revokeObjectURL(id): unregisters blob URL
  canParse(input[, base]): returns boolean
  parse(input[, base]): returns URL or null

5 URLPattern matching
  new URLPattern(pattern[, baseURL][, {ignoreCase}])
  exec(input[, baseURL]): returns match object with components and groups
  test(input[, baseURL]): returns boolean

6 URLSearchParams manipulation
  append(name,value)
  delete(name[,value])
  get(name): first value or null
  getAll(name): all values
  has(name[,value])
  set(name,value)
  sort() stable by name
  toString(): serialized 'a=b&c=d'
  iterate with entries(), keys(), values(), forEach
  size property count of entries

7 Domain encoding functions
  domainToASCII(domain): punycode ASCII or '' if invalid
  domainToUnicode(domain): unicode or '' if invalid

8 File URL conversions
  fileURLToPath(url[, {windows}]) => platform path string
  pathToFileURL(path[, {windows}]) => file URL object

9 URL formatting options
  url.format(URL, {auth:boolean, fragment:boolean, search:boolean, unicode:boolean}) => string

10 HTTP options conversion
  urlToHttpOptions(URL): {protocol, hostname, port, path, auth, href, hash, search, pathname}

## Original Source
Node.js URL Module
https://nodejs.org/api/url.html

## Digest of URL_MODULE

# URL Module Detailed Digest

Date Retrieved: 2024-06-10
Source: Node.js v23.11.0 node:url API documentation

# URL Class

new URL(input[, base])
  input <string> The absolute or relative URL. Coerced to string.
  base <string> Required if input is relative. Coerced to string.

Properties (get/set):
  hash <string> Fragment including leading '#'. Percent-encodes invalid characters on set.
  host <string> Hostname and port. Invalid assignments are ignored.
  hostname <string> Hostname only. Invalid assignments are ignored.
  href <string> Serialized URL. Setting throws TypeError on invalid.
  origin <string> Read-only origin (scheme + host).
  password <string> Password. Percent-encoded on set.
  pathname <string> Path portion. Percent-encoded on set.
  port <string> Port number (0–65535). Default port yields empty string. Non-numeric prefixes allowed.
  protocol <string> Scheme including trailing ':'. Invalid assignments are ignored.
  search <string> Serialized query including leading '?'. Percent-encoded on set.
  searchParams <URLSearchParams> Read-only URLSearchParams object for query. Mutations affect URL.
  username <string> Username. Percent-encoded on set.

Methods:
  toString(): string  Returns href.
  toJSON(): string    Returns href. Called by JSON.stringify.

Static Methods:
  URL.createObjectURL(blob): string
  URL.revokeObjectURL(id): void
  URL.canParse(input[, base]): boolean
  URL.parse(input[, base]): URL | null

# URLPattern Class

new URLPattern(pattern[, baseURL][, options])
  pattern <string> | <Object>
  baseURL <string> | undefined
  options.ignoreCase <boolean>

Methods:
  exec(input[, baseURL]): PatternResult | null
  test(input[, baseURL]): boolean

# URLSearchParams Class

Constructors:
  new URLSearchParams()
  new URLSearchParams(string)
  new URLSearchParams(obj)
  new URLSearchParams(iterable)

Methods:
  append(name, value): void
  delete(name[, value]): void
  entries(): Iterator<[string,string]>
  forEach(fn[, thisArg]): void
  get(name): string|null
  getAll(name): string[]
  has(name[, value]): boolean
  keys(): Iterator<string>
  set(name, value): void
  sort(): void
  toString(): string
  values(): Iterator<string>
  [Symbol.iterator](): Iterator<[string,string]>
  size <number> (property)

# Utility Functions

url.domainToASCII(domain): string
url.domainToUnicode(domain): string
url.fileURLToPath(url[, options]): string
url.format(URL[, options]): string
url.pathToFileURL(path[, options]): URL
url.urlToHttpOptions(url): Object

# Legacy API (Deprecated)

url.parse(urlString[, parseQueryString[, slashesDenoteHost]]): UrlObject
url.format(urlObject): string
url.resolve(from, to): string

Attribute entries, values, and behaviors match WHATWG spec. High-value actionable content extracted.


## Attribution
- Source: Node.js URL Module
- URL: https://nodejs.org/api/url.html
- License: License: Open source (Node.js Foundation)
- Crawl Date: 2025-05-02T02:20:17.296Z
- Data Size: 3889420 bytes
- Links Found: 3237

## Retrieved
2025-05-02
