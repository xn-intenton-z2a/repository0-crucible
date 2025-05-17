# URL_SEARCH_PARAMS

## Crawl Summary
Constructor new URLSearchParams([init]) accepts string/object/iterable/URLSearchParams; property size:number; append(name:string,value:string); delete(name:string, value?:string); get(name:string):string|null; getAll(name:string):string[]; has(name:string,value?:string):boolean; set(name:string,value:string); sort():void; toString():string; entries(), keys(), values(), forEach(), [Symbol.iterator](); parses percent-encoding, '+' as space; does not parse full URLs; integrates with URL.searchParams, space encoding differences.

## Normalised Extract
Table of Contents
1. Constructor Overloads
2. Property: size
3. CRUD Methods
4. Iteration Methods
5. Serialization and Encoding
6. Integration with URL
7. Pitfalls and Workarounds

1. Constructor Overloads
   Signature: new URLSearchParams([init])
   init parameter types and behavior:
     • String: query string; strips leading '?' ; percent-decodes; '+'→space
     • Object: own enumerable string properties paired
     • Iterable: array of [name,value] pairs
     • URLSearchParams: constructs deep copy

2. Property: size
   size returns count of all key/value entries

3. CRUD Methods
   append(name,value):void adds new entry
   delete(name,value?):void removes entries matching name or name+value
   get(name):string|null returns first value or null
   getAll(name):string[] returns all matching values
   has(name,value?):boolean checks existence
   set(name,value):void replaces all values for name with value
   sort():void sorts entries by name codepoint order

4. Iteration Methods
   entries():iterator<[string,string]>
   keys():iterator<string>
   values():iterator<string>
   forEach(fn,thisArg?):void invokes fn(value,name,params)
   [Symbol.iterator]():iterator<[string,string]>

5. Serialization and Encoding
   toString():string yields application/x-www-form-urlencoded
     percent-encodes all except ASCII alphanumeric, '*','-','.', '_' ; encodes space as '+'
   encoding rules applied only on serialization/deserialization, not on individual access
   double-encoding occurs if percent-encoded inputs appended

6. Integration with URL
   URL.searchParams reflects URL.search
   Mutating searchParams writes back to URL.search
   URL.search uses '%20' for spaces; URLSearchParams uses '+'

7. Pitfalls and Workarounds
   • '+' treated as space in constructor: avoid parsing raw base64; use append
   • No full URL parsing: pass url.search to constructor
   • Empty vs no-equals: both map to empty string; to force empty value use 'name=' explicitly

## Supplementary Details
Specification of init parameter:
- init: USVString including percent-encoded sequences; strips initial '?'
- init: Record<string,string> maps each property key to string value
- init: Iterable<[string,string]> accepts any iterable of string pair arrays
Optional behaviors:
- percent-encoding set: all code points excluding ASCII alnum,*,-,.,_ ; space encode U+0020→'+'
- space decode: '+' in input interpreted as U+0020
Implementation steps:
1. Create instance: const params = new URLSearchParams(init)
2. Modify: use append/set/delete to manage entries; avoid string concatenation
3. Retrieve: get/getAll/has for value checks
4. Iterate: for (const [n,v] of params)
5. Serialize: let qs = params.toString()
Integration:
- new URL(url).searchParams to get linked params instance
- After mutation, url.search reflects serialized params


## Reference Details
API Specifications:
Constructor:
new URLSearchParams():URLSearchParams
new URLSearchParams(init: string|Record<string,string>|Iterable<[string,string]>|URLSearchParams):URLSearchParams

Properties:
readonly size: number

Methods:
append(name: string, value: string): void
delete(name: string, value?: string): void
get(name: string): string | null
getAll(name: string): string[]
has(name: string, value?: string): boolean
set(name: string, value: string): void
sort(): void
toString(): string
entries(): IterableIterator<[string,string]>
keys(): IterableIterator<string>
values(): IterableIterator<string>
forEach(callbackfn: (value: string, name: string, parent: URLSearchParams) => void, thisArg?: any): void
[Symbol.iterator](): IterableIterator<[string,string>]

Code Examples:
// Construct from string
const p1 = new URLSearchParams('a=1&b=2');
console.log(p1.get('b')); // '2'
// Construct from object
const p2 = new URLSearchParams({foo:'bar',baz:'qux'});
console.log(p2.toString()); // 'foo=bar&baz=qux'
// Append and serialize
const p3 = new URLSearchParams();
p3.append('x','1');
p3.append('x','2');
console.log(p3.toString()); // 'x=1&x=2'
// Delete specific
p3.delete('x','1');
console.log(p3.toString()); // 'x=2'
// Iterate
for(const [k,v] of p3){ /* use k,v */ }

Best Practices:
- Never use dynamic strings: do not do new URLSearchParams(`bin=${data}`)
- Always use append or set to include binary/base64 data
- Use URL.searchParams when integrating with URL objects

Troubleshooting:
1. Plus sign lost:
// Incorrect
const p = new URLSearchParams(`data=${b64}`);
console.log(p.get('data')); // spaces replace '+'
// Fix
const p = new URLSearchParams();
p.append('data',b64);
console.log(p.get('data')); // original '+' preserved

2. Unexpected URL mutation:
const url = new URL('https://ex/?q=a%20b');
console.log(url.searchParams.toString()); // 'q=a+b'
url.searchParams.sort();
console.log(url.href); // 'https://ex/?q=a+b' // space encoding changed

3. No value vs empty:
const p = new URLSearchParams('foo&bar=baz');
console.log(p.get('foo')); // ''
console.log(p.toString()); // 'foo=&bar=baz'


## Information Dense Extract
Constructor new URLSearchParams(init?:string|Record<string,string>|Iterable<[string,string]>|URLSearchParams):URLSearchParams; size:number; append(name:string,value:string):void; delete(name:string,value?:string):void; set(name:string,value:string):void; get(name:string):string|null; getAll(name:string):string[]; has(name:string,value?:string):boolean; sort():void; toString():string; entries():Iterator<[string,string]>; keys():Iterator<string>; values():Iterator<string>; forEach(fn,value,name,parent):void; [Symbol.iterator]=>entries; parsing: percent-decodes input; '+'->space; strips leading '?'; does not parse full URLs; serialization: percent-encodes except ASCII alnum,*,-,.,_; space-> '+' ; integration: URL.searchParams auto-updates URL.search; pitfall: URL.search uses '%20'; always use append to preserve '+'; empty vs none-equals both yield empty string

## Sanitised Extract
Table of Contents
1. Constructor Overloads
2. Property: size
3. CRUD Methods
4. Iteration Methods
5. Serialization and Encoding
6. Integration with URL
7. Pitfalls and Workarounds

1. Constructor Overloads
   Signature: new URLSearchParams([init])
   init parameter types and behavior:
      String: query string; strips leading '?' ; percent-decodes; '+'space
      Object: own enumerable string properties paired
      Iterable: array of [name,value] pairs
      URLSearchParams: constructs deep copy

2. Property: size
   size returns count of all key/value entries

3. CRUD Methods
   append(name,value):void adds new entry
   delete(name,value?):void removes entries matching name or name+value
   get(name):string|null returns first value or null
   getAll(name):string[] returns all matching values
   has(name,value?):boolean checks existence
   set(name,value):void replaces all values for name with value
   sort():void sorts entries by name codepoint order

4. Iteration Methods
   entries():iterator<[string,string]>
   keys():iterator<string>
   values():iterator<string>
   forEach(fn,thisArg?):void invokes fn(value,name,params)
   [Symbol.iterator]():iterator<[string,string]>

5. Serialization and Encoding
   toString():string yields application/x-www-form-urlencoded
     percent-encodes all except ASCII alphanumeric, '*','-','.', '_' ; encodes space as '+'
   encoding rules applied only on serialization/deserialization, not on individual access
   double-encoding occurs if percent-encoded inputs appended

6. Integration with URL
   URL.searchParams reflects URL.search
   Mutating searchParams writes back to URL.search
   URL.search uses '%20' for spaces; URLSearchParams uses '+'

7. Pitfalls and Workarounds
    '+' treated as space in constructor: avoid parsing raw base64; use append
    No full URL parsing: pass url.search to constructor
    Empty vs no-equals: both map to empty string; to force empty value use 'name=' explicitly

## Original Source
Fetch API & URLSearchParams
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

## Digest of URL_SEARCH_PARAMS

# URLSearchParams Detailed Digest

Date Retrieved: 2024-06-20
Data Size: 2443004 bytes

## Constructor

### new URLSearchParams([init])

- Signature: new URLSearchParams()
- Overloads:
  • init: USVString (query string), automatically strips leading '?'
  • init: Record<string,string>
  • init: Iterable<[string,string]>
  • init: URLSearchParams (copy constructor)
- Returns: URLSearchParams instance

## Instance Properties

### size : number (read-only)
Indicates total number of key/value entries

## Instance Methods

### append(name: string, value: string): void
Appends a new search parameter. Percent-encodes name and value on serialization.

### delete(name: string, value?: string): void
Removes all entries matching name, or only those matching name and value if value is provided.

### get(name: string): string | null
Returns first value for the given name, or null if absent.

### getAll(name: string): string[]
Returns all values for the given name.

### has(name: string, value?: string): boolean
Returns true if name exists, or name/value pair exists if value provided.

### set(name: string, value: string): void
Sets the value for name; deletes other values for same name.

### sort(): void
Sorts entries in place by their names (UTF-8 codepoint order).

### toString(): string
Serializes entries into "application/x-www-form-urlencoded" string: percent-encodes all except [0-9a-zA-Z*\-._], encodes space (U+0020) as '+'

### entries(): IterableIterator<[string,string]>
Iterator over [name,value] in insertion order.

### keys(): IterableIterator<string>
Iterator over names in insertion order.

### values(): IterableIterator<string>
Iterator over values in insertion order.

### forEach(callback(value: string, name: string, params: URLSearchParams): void, thisArg?: any): void
Iterates over each entry in insertion order.

### [Symbol.iterator]() : IterableIterator<[string,string]>
Alias for entries()


## Encoding Behavior

- Parsing: percent-decodes input string; '+' is interpreted as space
- Serialization: percent-encodes reserved characters; ' ' → '+'
- Edge: constructor does not parse full URLs; input containing 'http://' is treated as raw string

## Integration with URL.searchParams

- URL.searchParams returns URLSearchParams instance reflecting URL.search
- Mutating searchParams updates URL.search with serialization rules of URLSearchParams, potentially altering space encoding (URL uses '%20')

## Common Pitfalls and Workarounds

- Plus signs lost when parsing base64 data: use append method instead of dynamic string construction
- No distinction between empty value and no '=': both normalize to empty string on get
- Percent-encoded keys treated as unencoded on append, causing double-encoding


## Attribution
- Source: Fetch API & URLSearchParams
- URL: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
- License: License: CC BY-SA 2.5
- Crawl Date: 2025-05-17T18:28:34.986Z
- Data Size: 2443004 bytes
- Links Found: 18751

## Retrieved
2025-05-17
