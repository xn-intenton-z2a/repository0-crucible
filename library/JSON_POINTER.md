# JSON_POINTER

## Crawl Summary
Defines the JSON Pointer syntax (ABNF for json-pointer and reference-token), escape rules (~0 and ~1), and evaluation algorithm: decode tokens then traverse JSON objects by exact-key match or JSON arrays by numeric index (digits only) or '-' (error). Specifies JSON string representation (escape quotes, backslash, control chars) and URI fragment mapping (UTF-8 plus percent-encoding). Details error conditions: invalid syntax, missing member, index errors.

## Normalised Extract
Table of Contents
1 Syntax
2 Token Decoding
3 Object Traversal
4 Array Traversal
5 JSON String Representation
6 URI Fragment Mapping
7 Error Conditions

1 Syntax
 json-pointer    = *( "/" reference-token )
 reference-token = *( unescaped / escaped )
 unescaped       = U+0000-U+002E / U+0030-U+007D / U+007F-U+10FFFF except '/' and '~'
 escaped         = '~' '0' | '~' '1'

2 Token Decoding
 apply replacements in order: '~1'->'/' then '~0'->'~'

3 Object Traversal
 given value V is object and decoded token T: if V has property T (Unicode exact match) then value = V[T] else error

4 Array Traversal
 given value V is array:
 - if token matches digits per array-index grammar (no leading zeros unless '0'): index = parseInt(token); if index<V.length then value=V[index] else error
 - if token is '-': error by default (element after last)

5 JSON String Representation
 pointer as JSON string must escape '"','\\', control U+0000-U+001F; JSON parser unescapes before use

6 URI Fragment Mapping
 UTF-8 encode pointer; percent-encode any char outside fragment rule (e.g. space,%25,^,|,\",\\); prefix '#'

7 Error Conditions
 errors: invalid syntax, nonexistent object member, invalid or out-of-range array index, '-' token resolution error


## Supplementary Details
Pseudocode for JSON Pointer Evaluation:
function evaluatePointer(document, pointer):
  if pointer == '':
    return document
  tokens = pointer.split('/').slice(1)
  value = document
  for token in tokens:
    decoded = token.replace(/~1/g,'/').replace(/~0/g,'~')
    if typeof value == 'object' && !Array.isArray(value):
      if decoded in value:
        value = value[decoded]
      else:
        throw new ReferenceError('Member not found: '+decoded)
    else if Array.isArray(value):
      if decoded == '-':
        throw new RangeError('Cannot use "-" in evaluation')
      if /^[0]|[1-9]\d*$/.test(decoded):
        idx = parseInt(decoded,10)
        if idx < value.length:
          value = value[idx]
        else:
          throw new RangeError('Index out of bounds: '+decoded)
      else:
        throw new TypeError('Invalid array index: '+decoded)
    else:
      throw new TypeError('Cannot traverse non-container value')
  return value

Example JSON Document and Pointers:
{ 'foo': ['bar','baz'], '':0, 'a/b':1, 'm~n':8 }
evaluatePointer(doc,'') => whole document
evaluatePointer(doc,'/foo/0') => 'bar'
evaluatePointer(doc,'/a~1b') => 1
evaluatePointer(doc,'/m~0n') => 8

Escaping Rules in JSON Strings:
 '"' -> \"  '\\' -> \\\\  U+0000-U+001F -> \uXXXX

URI Fragment Examples:
#/foo -> ['bar','baz']
#/a~1b -> 1
#/c%25d -> 2

## Reference Details
JavaScript SDK Method:
Type Signature:
 function evaluatePointer(document: any, pointer: string): any
Parameters:
 document: parsed JSON value (object or array)
 pointer: JSON Pointer string conforming to RFC6901
Returns:
 The JSON value at the specified location
Throws:
 ReferenceError for missing object property
 RangeError for invalid or out-of-range array index or '-' token
 TypeError for traversal on primitive

Complete Implementation Pattern:
1. Pre-validate pointer with regex: ^(\/(?:~0|~1|[^~/])*)*$
2. Tokenize: pointers=pointer.split('/').slice(1)
3. Iterate tokens and apply pseudocode above
4. Return final value

Configuration Options for Error Handling (application-level):
 onMissingMember: 'throw' or 'default' with defaultMemberValue
 onIndexError: 'throw' or 'clamp' to nearest valid index

Best Practices with Code:
const result = evaluatePointer(data,'/users/0/email')
// wrap in try-catch to handle errors and log contextual info

Detailed Troubleshooting Commands:
// Test pointer syntax validity
echo '/foo/01' | grep -P '^(\/(?:~0|~1|[^~/])*)*$' && echo valid || echo invalid
// Inspect tokens
echo '/foo/01' | sed 's/^\///;s/\//\n/g'
// Check array length and index in REPL
node -e "const arr=[1,2];console.log(arr.length, arr[2])"


## Information Dense Extract
json-pointer=*("/" reference-token); reference-token=*(unescaped|escaped); unescaped=U+0000-002E|0030-007D|007F-10FFFF except '/' '~'; escaped='~0'->'~'|'~1'->'/'; evaluate: if pointer=='' return doc; tokens=split('/')[1..]; decode each token by =~1->/;~0->~; if value is object select property exact-match else if array if digits regex ^0|[1-9]\d*$ parseInt and in-range else '-' error; JSON string pointer must unescape \u0000-\u001F,\",\\; URI fragment: UTF8 then percent-encode unsafe; errors: syntax, missing property, invalid index, non-container traversal; JS function evaluatePointer(document:any,pointer:string):any throws ReferenceError,RangeError,TypeError.

## Sanitised Extract
Table of Contents
1 Syntax
2 Token Decoding
3 Object Traversal
4 Array Traversal
5 JSON String Representation
6 URI Fragment Mapping
7 Error Conditions

1 Syntax
 json-pointer    = *( '/' reference-token )
 reference-token = *( unescaped / escaped )
 unescaped       = U+0000-U+002E / U+0030-U+007D / U+007F-U+10FFFF except '/' and '~'
 escaped         = '~' '0' | '~' '1'

2 Token Decoding
 apply replacements in order: '~1'->'/' then '~0'->'~'

3 Object Traversal
 given value V is object and decoded token T: if V has property T (Unicode exact match) then value = V[T] else error

4 Array Traversal
 given value V is array:
 - if token matches digits per array-index grammar (no leading zeros unless '0'): index = parseInt(token); if index<V.length then value=V[index] else error
 - if token is '-': error by default (element after last)

5 JSON String Representation
 pointer as JSON string must escape ''','''', control U+0000-U+001F; JSON parser unescapes before use

6 URI Fragment Mapping
 UTF-8 encode pointer; percent-encode any char outside fragment rule (e.g. space,%25,^,|,'',''); prefix '#'

7 Error Conditions
 errors: invalid syntax, nonexistent object member, invalid or out-of-range array index, '-' token resolution error

## Original Source
JSON Pointer (RFC 6901)
https://tools.ietf.org/html/rfc6901

## Digest of JSON_POINTER

# Syntax
A JSON Pointer is defined by the ABNF grammar:

json-pointer    = *( "/" reference-token )
reference-token = *( unescaped / escaped )
unescaped       = %x00-2E / %x30-7D / %x7F-10FFFF   ; excludes '/' and '~'
escaped         = '~' ( '0' / '1' )                ; '~0' expands to '~', '~1' to '/'

# Evaluation
To evaluate a JSON Pointer against a JSON document:
1. If the pointer string is empty, return the root document value.
2. Split the pointer at each '/'; discard the initial empty element to get reference tokens.
3. For each token:
   a. Replace all occurrences of '~1' with '/'.
   b. Replace all occurrences of '~0' with '~'.
   c. If the current value is an object, select the property named exactly as the decoded token; if missing, error.
   d. If the current value is an array:
      - If token matches array-index (%x30 or %x31-39 *(%x30-39)), convert to integer and select the element at that zero-based index; if out of range, error.
      - If token is '-', it denotes the position after the last element and by default results in an error.
   e. Otherwise, error when applying a token to a non-container value.
4. Return the final referenced value.

# JSON String Representation
When represented in JSON text, pointers are JSON strings. Per RFC4627, escape '"', '\\', and control characters U+0000–U+001F using backslash escapes. Unescape these before pointer evaluation.

# URI Fragment Identifier Representation
To use a JSON Pointer in a URI fragment:
1. Encode the pointer string as UTF-8 octets.
2. Percent-encode characters not allowed in URI fragment per RFC3986 (e.g., space -> %20, '%' -> %25, '^' -> %5E, '|' -> %7C, '"' -> %22, '\\' -> %5C).
3. Prepend '#' to the percent-encoded UTF-8 string.

# Error Handling
Error conditions:
- Pointer syntax invalid (violates ABNF).
- Reference to a nonexistent object member.
- Array index token invalid or out of range.
- '-' token resolving to nonexistent element.
Applications must specify error handling strategy (throw or recover).

Date retrieved: 2024-06-08
Data Size: 3878567 bytes

## Attribution
- Source: JSON Pointer (RFC 6901)
- URL: https://tools.ietf.org/html/rfc6901
- License: IETF Trust
- Crawl Date: 2025-05-02T11:47:15.836Z
- Data Size: 3878567 bytes
- Links Found: 6555

## Retrieved
2025-05-02
