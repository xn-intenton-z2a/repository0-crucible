# ZOD

## Crawl Summary
Installation: TS 4.5+, strict mode tsconfig, npm|yarn|pnpm|bun install zod; canary via @canary. Core types: z.string, z.number, z.bigint, z.boolean, z.date, z.undefined, z.null, z.void, z.any, z.unknown, z.never. Coercion: z.coerce.string(), .number(), .boolean(), .bigint(), .date(). Literal schemas via z.literal. String validations: min,max,length,email,url,regex,datetime({offset,local,precision}),date,time({precision}),ip({version}),cidr({version}),trim,toLowerCase,toUpperCase. Number validations: min,max,int,positive,nonpositive,finite,safe,multipleOf. Object: .shape, .keyof, .extend, .merge, .pick, .omit, .partial, .deepPartial, .required, .passthrough, .strip, .strict, .catchall. Array: z.array, .element, .nonempty, .min,max,length. Tuple: z.tuple, .rest. Union: z.union, .or; discriminatedUnion(key,schemas). Record/Map/Set: z.record,keyType,valueType; z.map; z.set methods nonempty,min,max,size. Intersection: z.intersection. Recursive via z.lazy. Effects: refine,superRefine,transform. Preprocess. Custom schemas. Function schemas: z.function,args(),returns(),implement(). Parsing: .parse, .safeParse, .parseAsync, .safeParseAsync. Error customization at schema creation and per-method.

## Normalised Extract
Table of Contents
 1 Installation Requirements
 2 Installation Commands
 3 Core Schemas
 4 Coercion
 5 Primitive Validations
 6 Object Schemas
 7 Array & Tuple Schemas
 8 Union & Intersection Schemas
 9 Discriminated Unions
 10 Collections: Record, Map, Set
 11 Recursive Schemas
 12 Effects: refine, transform, superRefine
 13 Preprocessing
 14 Custom Schemas
 15 Function Schemas
 16 Parsing Methods
 17 Error Customization

1 Installation Requirements
 TypeScript 4.5+ with strict= true in tsconfig.json

2 Installation Commands
 npm install zod
 yarn add zod
 pnpm add zod
 bun add zod
 npm install zod@canary

3 Core Schemas
 string: z.string(): ZodString
 number: z.number(): ZodNumber
 bigint: z.bigint(): ZodBigInt
 boolean: z.boolean(): ZodBoolean
 date: z.date(): ZodDate
 undefined, null, void, any, unknown, never

4 Coercion
 z.coerce.string(): ZodString // String(input)
 z.coerce.number(): ZodNumber // Number(input)
 z.coerce.boolean(): ZodBoolean // Boolean(input)
 z.coerce.bigint(): ZodBigInt // BigInt(input)
 z.coerce.date(): ZodDate // new Date(input)

5 Primitive Validations
 Strings: .min(n,{message}),.max(n),.length(n),.email(),.url(),.regex(rx),.datetime({offset,local,precision}),.date(),.time({precision}),.ip({version}),.cidr({version}),.trim(),.toLowerCase(),.toUpperCase();
 Numbers: .min(n),.max(n),.int(),.positive(),.nonnegative(),.negative(),.nonpositive(),.multipleOf(n),.finite(),.safe();

6 Object Schemas
 creation: z.object({key: schema})
 methods: .shape, .keyof(), .extend({}), .merge(obj), .pick({k:true}), .omit({k:true}), .partial([keys]), .deepPartial(), .required([keys]), .passthrough(), .strip(), .strict(), .catchall(schema)

7 Array & Tuple Schemas
 Array: z.array(item)
 methods: .element, .nonempty({msg}), .min(n), .max(n), .length(n)
 Tuple: z.tuple([schemas]), .rest(schema)

8 Union & Intersection Schemas
 z.union([schemas]), schema.or(other), z.intersection(a,b)

9 Discriminated Unions
 z.discriminatedUnion("key", [z.object, ...])
 access: union.options

10 Collections: Record, Map, Set
 z.record(keySchema,valueSchema)
 z.map(keySchema,valueSchema)
 z.set(itemSchema).nonempty(),.min(n),.max(n),.size(n)

11 Recursive Schemas
 z.lazy(()=> schema) with manual type hint for input/output

12 Effects: refine, transform, superRefine
 refine(fn, {message}) returns ZodEffects
 superRefine((data,ctx)=>void)
 transform(fn)

13 Preprocessing
 z.preprocess(fn,val=>unknown, schema)

14 Custom Schemas
 z.custom< T >(validator?,{message})

15 Function Schemas
 z.function().args(...schemas).returns(schema).implement(fn)
 parameters via .parameters(), returnType via .returnType()

16 Parsing Methods
 .parse(input): T or throws
 .safeParse(input): { success, data|error }
 .parseAsync(input): Promise<T>
 .safeParseAsync(input): Promise<SafeParseReturn>

17 Error Customization
 At schema creation: z.string({ required_error, invalid_type_error })
 Per-method: .min(n,{message}), .email({message}), etc.

## Supplementary Details
tsconfig.json strict=true. install canary version via @canary tag. Input coercion uses built-in constructors. Boolean coercion maps truthy to true, falsy to false. String.datetime defaults offset=false, local=false, precision=any; offset:true to allow timezone offsets; local:true to allow unqualified; precision:number to enforce sub-second digits. IP/CIDR default version=both; version:"v4"|"v6" to restrict. Array.nonempty returns tuple type [T,...T[]]; .min/.max/.length do not alter type. Object unknownKeys default strip; .passthrough to keep unknown; .strict to reject unknown; .catchall to validate unknown keys against a schema. deepPartial, partial, required accept key filters. Record numerical keys coerced to string at runtime. z.function args accepts variadic; implement wraps business logic and validates input/output. .pipe alias of preprocess+transform for coercion flows. Abort early default true; use .refine for per-value checks; .superRefine for multiple issues. Custom z.custom<T> requires validator or skips validation. Recursive schemas need manual TypeScript type definitions and z.lazy.Error formatting via error.format() or error.issues. Use safeParse in async contexts to avoid exceptions.

## Reference Details
Installation Commands
  npm install zod
  yarn add zod
  pnpm add zod
  bun add zod
  npm install zod@canary

tsconfig.json
  {
    "compilerOptions": {
      "strict": true
    }
  }

API: z.string()
  Signature: z.string(params?: { required_error?: string; invalid_type_error?: string }): ZodString
  Returns: ZodString
  Methods:
    min(min: number, opts?: { message?: string }): ZodString
    max(max: number, opts?: { message?: string }): ZodString
    length(len: number, opts?: { message?: string }): ZodString
    email(opts?: { message?: string }): ZodString
    url(opts?: { message?: string }): ZodString
    regex(pattern: RegExp, opts?: { message?: string }): ZodString
    datetime(options?: { offset?: boolean; local?: boolean; precision?: number; message?: string }): ZodString
    date(opts?: { message?: string }): ZodString
    time(options?: { precision?: number; message?: string }): ZodString
    ip(options?: { version?: "v4" | "v6"; message?: string }): ZodString
    cidr(options?: { version?: "v4" | "v6"; message?: string }): ZodString
    trim(): ZodString
    toLowerCase(): ZodString
    toUpperCase(): ZodString

Example:
const email = z.string().email({ message: "Invalid email" });

Parsing:
email.parse("a@b.com"); // returns "a@b.com"
email.safeParse("x"); // { success: false; error: ZodError }

Schema: z.number()
Signature: z.number(params?: { required_error?: string; invalid_type_error?: string }): ZodNumber
Methods:
  min, max, int, positive, nonnegative, negative, nonpositive, multipleOf, finite, safe

Example:
const count = z.number().int().nonnegative();
count.parse(3); // 3
count.parse(-1); // throws ZodError

Object Schema:
Signature: z.object<Shape extends Record<string, ZodTypeAny>>(shape: Shape, params?: { required_error?: string; invalid_type_error?: string }): ZodObject<Shape>
Methods:
  shape: Shape
  keyof(): ZodEnum<keyof Shape>
  extend<Ext extends Record<string, ZodTypeAny>>(ext: Ext): ZodObject<Shape & Ext>
  merge<Other extends ZodObject<any>>(other: Other): ZodObject<Shape & Other["shape"]>
  pick<Keys extends keyof Shape>(keys: Record<Keys, true>): ZodObject<Pick<Shape, Keys>>
  omit<Keys extends keyof Shape>(keys: Record<Keys, true>): ZodObject<Omit<Shape, Keys>>
  partial(): ZodObject<Partial<Shape>>
  deepPartial(): ZodObject<DeepPartial<Shape>>
  required<K extends keyof Shape>(keys: K[]): ZodObject<Required<Pick<Shape,K>>> & default
  passthrough(): ZodObject<Shape> (keeps unknown keys)
  strip(): ZodObject<Shape> (default)
  strict(): ZodObject<Shape> (rejects unknown keys)
  catchall(schema: ZodTypeAny): ZodObject<Shape> (validate unknown keys)

Example:
const User = z.object({ id: z.string(), age: z.number() }).strict();
User.parse({ id: '1', age: 30 }); // passes
User.parse({ id: '1', age: 30, x:1 }); // throws ZodError

Array Schema:
Signature: z.array<T extends ZodTypeAny>(schema: T): ZodArray<T>
Methods:
  element: T
  nonempty(opts?: { message?: string }): ZodArray<T>
  min(min: number, opts?: { message?: string }): ZodArray<T>
  max(max: number, opts?: { message?: string }): ZodArray<T>
  length(len: number, opts?: { message?: string }): ZodArray<T>

Tuple Schema:
Signature: z.tuple<RTuple extends [ZodTypeAny, ...ZodTypeAny[]]>(schemas: RTuple): ZodTuple<RTuple>
Methods:
  rest(schema: ZodTypeAny): ZodTuple<RTuple>["rest"]

Union:
Signature: z.union<CT extends [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(schemas: CT): ZodUnion<CT>
Method: or(other: ZodTypeAny): ZodUnion<[Self, Other]>

Discriminated Union:
Signature: z.discriminatedUnion<Tag extends string, CT extends ZodObject<any>[]>(tag: Tag, options: CT): ZodDiscriminatedUnion<Tag, CT>
Access: schema.options: CT

Record/Map/Set:
z.record<Key extends ZodTypeAny, Value extends ZodTypeAny>(keySchema: Key, valueSchema: Value): ZodRecord<Key, Value>
z.map<Key extends ZodTypeAny, Value extends ZodTypeAny>(keySchema: Key, valueSchema: Value): ZodMap<Key, Value>
z.set<Item extends ZodTypeAny>(schema: Item): ZodSet<Item>
Set methods: nonempty, min, max, size

Recursive Schema:
z.lazy<Output, Def, Input>(() => schema): ZodType<Output, Def, Input>
Require explicit Input and Output types for inference.

Refine & Effects:
schema.refine(check:(data:T)=>boolean|Promise<boolean>, opts?: { message?: string; path?: (string|number)[] }): ZodEffects
schema.superRefine((data:T, ctx: RefinementCtx)=>void)
schema.transform((data:T)=>U|Promise<U>): ZodEffects

Preprocess:
z.preprocess((val:any)=>unknown, schema: ZodTypeAny): ZodEffects

Function Schema:
Signature: z.function<Params extends ZodTypeAny[], Return extends ZodTypeAny>(): ZodFunction<Params, Return>
Methods:
  args(...schemas: Params): ZodFunction<Params, Return>
  returns(schema: Return): ZodFunction<Params, Return>
  implement(fn: (...args: Input<Params>)=>Output<Return>): (...args: Input<Params>)=>Output<Return>
Properties:
  parameters(): ZodTuple<Params>
  returnType(): Return

Parsing & SafeParse:
parse(data: unknown): T
parseAsync(data: unknown): Promise<T>
safeParse(data: unknown): { success: true; data: T } | { success: false; error: ZodError }
safeParseAsync(data: unknown): Promise<SafeParseReturn<T>>

Error Handling:
ZodError.issues: Issue[]
Issue: { path: (string|number)[]; message: string; code: string }
error.format(): Record<string, any>

Best Practices:
- Use strict mode in tsconfig
- Use safeParse in user input contexts
- Use .catchall for dynamic keys
- Use z.coerce for primitive coercion
- Use z.lazy with explicit types for recursive schemas
- Provide custom error messages

Troubleshooting:
Command: node -e "require('zod').z.string().parse(123)"
Expected: throw ZodError: "Invalid\n" path: []
Use safeParse: const res = z.string().safeParse(123); res.success false, res.error.issues[0].message
Check unknown keys: .strict() rejects, .passthrough() retains, .catchall() validates


## Information Dense Extract
Zod installation: npm install zod; tsconfig strict=true. Import z. Core schemas: z.string():ZodString; z.number():ZodNumber; z.coerce.string():String(input); z.literal(val); z.object(shape):ZodObject; z.array(item):ZodArray; z.tuple(items):ZodTuple; z.union([schemas]); z.discriminatedUnion(key,schemas); z.record(keySchema,valueSchema); z.map(keySchema,valueSchema); z.set(itemSchema).nonempty/min/max/size; z.lazy(()=>schema).refine(fn,{message}); superRefine((data,ctx)); transform(fn); preprocess(fn,schema); custom<T>(validator,{message}); function schemas: z.function().args(...).returns(schema).implement(fn). Parse: .parse()/safeParse()/parseAsync()/safeParseAsync(). Customize errors: schema params and method opts. Object methods: .shape/.keyof/.extend/.merge/.pick/.omit/.partial/.deepPartial/.required/.passthrough/.strip/.strict/.catchall. Array: .element/.nonempty/.min/.max/.length. String validations: min/max/length/email/url/regex/datetime({offset,local,precision})/date/time({precision})/ip({version})/cidr({version})/trim/toLowerCase/toUpperCase. Number: min/max/int/positive/nonnegative/negative/nonpositive/multipleOf/finite/safe. Error issues: path,message,code. Best: safeParse for UIs; strict tsconfig; z.coerce for input; explicit lazy types; catchall for dynamic keys.

## Sanitised Extract
Table of Contents
 1 Installation Requirements
 2 Installation Commands
 3 Core Schemas
 4 Coercion
 5 Primitive Validations
 6 Object Schemas
 7 Array & Tuple Schemas
 8 Union & Intersection Schemas
 9 Discriminated Unions
 10 Collections: Record, Map, Set
 11 Recursive Schemas
 12 Effects: refine, transform, superRefine
 13 Preprocessing
 14 Custom Schemas
 15 Function Schemas
 16 Parsing Methods
 17 Error Customization

1 Installation Requirements
 TypeScript 4.5+ with strict= true in tsconfig.json

2 Installation Commands
 npm install zod
 yarn add zod
 pnpm add zod
 bun add zod
 npm install zod@canary

3 Core Schemas
 string: z.string(): ZodString
 number: z.number(): ZodNumber
 bigint: z.bigint(): ZodBigInt
 boolean: z.boolean(): ZodBoolean
 date: z.date(): ZodDate
 undefined, null, void, any, unknown, never

4 Coercion
 z.coerce.string(): ZodString // String(input)
 z.coerce.number(): ZodNumber // Number(input)
 z.coerce.boolean(): ZodBoolean // Boolean(input)
 z.coerce.bigint(): ZodBigInt // BigInt(input)
 z.coerce.date(): ZodDate // new Date(input)

5 Primitive Validations
 Strings: .min(n,{message}),.max(n),.length(n),.email(),.url(),.regex(rx),.datetime({offset,local,precision}),.date(),.time({precision}),.ip({version}),.cidr({version}),.trim(),.toLowerCase(),.toUpperCase();
 Numbers: .min(n),.max(n),.int(),.positive(),.nonnegative(),.negative(),.nonpositive(),.multipleOf(n),.finite(),.safe();

6 Object Schemas
 creation: z.object({key: schema})
 methods: .shape, .keyof(), .extend({}), .merge(obj), .pick({k:true}), .omit({k:true}), .partial([keys]), .deepPartial(), .required([keys]), .passthrough(), .strip(), .strict(), .catchall(schema)

7 Array & Tuple Schemas
 Array: z.array(item)
 methods: .element, .nonempty({msg}), .min(n), .max(n), .length(n)
 Tuple: z.tuple([schemas]), .rest(schema)

8 Union & Intersection Schemas
 z.union([schemas]), schema.or(other), z.intersection(a,b)

9 Discriminated Unions
 z.discriminatedUnion('key', [z.object, ...])
 access: union.options

10 Collections: Record, Map, Set
 z.record(keySchema,valueSchema)
 z.map(keySchema,valueSchema)
 z.set(itemSchema).nonempty(),.min(n),.max(n),.size(n)

11 Recursive Schemas
 z.lazy(()=> schema) with manual type hint for input/output

12 Effects: refine, transform, superRefine
 refine(fn, {message}) returns ZodEffects
 superRefine((data,ctx)=>void)
 transform(fn)

13 Preprocessing
 z.preprocess(fn,val=>unknown, schema)

14 Custom Schemas
 z.custom< T >(validator?,{message})

15 Function Schemas
 z.function().args(...schemas).returns(schema).implement(fn)
 parameters via .parameters(), returnType via .returnType()

16 Parsing Methods
 .parse(input): T or throws
 .safeParse(input): { success, data|error }
 .parseAsync(input): Promise<T>
 .safeParseAsync(input): Promise<SafeParseReturn>

17 Error Customization
 At schema creation: z.string({ required_error, invalid_type_error })
 Per-method: .min(n,{message}), .email({message}), etc.

## Original Source
Ontology Validation with Zod
https://github.com/colinhacks/zod#readme

## Digest of ZOD

# Installation

## Requirements
TypeScript 4.5+ with strict mode enabled in tsconfig.json:
{
  "compilerOptions": {
    "strict": true
  }
}

## From npm
npm install zod       # npm
yarn add zod          # yarn
pnpm add zod          # pnpm
bun add zod           # bun
# To install canary:
npm install zod@canary

# Basic Usage

## Import and create schemas
import { z } from "zod";
const myStringSchema = z.string();
const myObjectSchema = z.object({ username: z.string(), age: z.number() });

## Parsing methods
schema.parse(input: unknown): T  // throws ZodError on failure
schema.safeParse(input: unknown): { success: true; data: T } | { success: false; error: ZodError }
schema.parseAsync(input: unknown): Promise<T>
schema.safeParseAsync(input: unknown): Promise<SafeParseReturn<T>>

# Primitives & Empty Types

z.string(): ZodString
z.number(): ZodNumber
z.bigint(): ZodBigInt
z.boolean(): ZodBoolean
z.date(): ZodDate
z.symbol(): ZodSymbol
z.undefined(): ZodUndefined
z.null(): ZodNull
z.void(): ZodVoid
z.any(): ZodAny
z.unknown(): ZodUnknown
z.never(): ZodNever

# Coercion for Primitives

z.coerce.string(): ZodString       // String(input)
z.coerce.number(): ZodNumber       // Number(input)
z.coerce.boolean(): ZodBoolean     // Boolean(input)
z.coerce.bigint(): ZodBigInt       // BigInt(input)
z.coerce.date(): ZodDate           // new Date(input)

# Literals

z.literal(value: string|number|boolean|bigint|symbol): ZodLiteral

# String-specific methods

z.string().min(min: number, opts?: { message?: string }): ZodString
z.string().max(max: number, opts?: { message?: string }): ZodString
z.string().length(len: number, opts?: { message?: string }): ZodString
z.string().email(opts?: { message?: string }): ZodString
z.string().url(opts?: { message?: string }): ZodString
z.string().regex(pattern: RegExp, opts?: { message?: string }): ZodString
z.string().datetime(options?: { offset?: boolean; local?: boolean; precision?: number; message?: string }): ZodString
z.string().date(): ZodString
z.string().time(options?: { precision?: number; message?: string }): ZodString
z.string().ip(options?: { version: "v4" | "v6"; message?: string }): ZodString
z.string().cidr(options?: { version: "v4" | "v6"; message?: string }): ZodString
z.string().trim(): ZodString
z.string().toLowerCase(): ZodString
z.string().toUpperCase(): ZodString

# Number-specific methods

z.number().min(min: number, opts?: { message?: string }): ZodNumber
z.number().max(max: number, opts?: { message?: string }): ZodNumber
z.number().int(): ZodNumber
z.number().positive(): ZodNumber
z.number().nonnegative(): ZodNumber
z.number().negative(): ZodNumber
z.number().nonpositive(): ZodNumber
z.number().multipleOf(factor: number): ZodNumber
z.number().finite(): ZodNumber
z.number().safe(): ZodNumber

# Objects

z.object(shape: Record<string, ZodType>): ZodObject
object.shape         // access inner schemas
object.keyof(): ZodEnum<keyof shape>
object.extend(ext: Record<string, ZodType>): ZodObject
object.merge(other: ZodObject): ZodObject
object.pick(keys: Record<string,true>): ZodObject
object.omit(keys: Record<string,true>): ZodObject
object.partial(keys?: Record<string,true>): ZodObject
object.deepPartial(): ZodObject
object.required(keys?: Record<string,true>): ZodObject
object.passthrough(): ZodObject
object.strip(): ZodObject
object.strict(): ZodObject
object.catchall(schema: ZodType): ZodObject

# Arrays & Tuples

z.array(item: ZodType): ZodArray
array.element       // access element schema
array.nonempty(opts?: { message?: string }): ZodArray
array.min(min: number, opts?: { message?: string }): ZodArray
array.max(max: number, opts?: { message?: string }): ZodArray
array.length(len: number, opts?: { message?: string }): ZodArray
z.tuple(items: ZodType[]): ZodTuple
tuple.rest(item: ZodType): ZodTuple

# Unions & Intersections

z.union(options: ZodType[]): ZodUnion
schema.or(other: ZodType): ZodUnion
z.intersection(a: ZodType, b: ZodType): ZodIntersection

# Discriminated Unions

z.discriminatedUnion(discriminator: string, options: ZodObject[]): ZodUnion
union.options       // access schemas

# Records, Maps, Sets

z.record(keyType: ZodType, valueType: ZodType): ZodRecord
z.map(keyType: ZodType, valueType: ZodType): ZodMap
z.set(item: ZodType): ZodSet
set.nonempty(): ZodSet
set.min(n: number): ZodSet
set.max(n: number): ZodSet
set.size(n: number): ZodSet

# Recursive & Lazy

z.lazy(() => schema): ZodType
Use for self-referential schemas with manual input/output type hints.

# Effects: refine, superRefine, transform

schema.refine(check: (data:T)=>boolean|Promise<boolean>, opts?: { message?: string }): ZodEffect
schema.superRefine((data, ctx)=>void): ZodEffect
schema.transform(fn: (data:T)=>U|Promise<U>): ZodEffect

# Preprocess

z.preprocess(fn:(val:any)=>unknown, schema: ZodType): ZodEffects

# Custom

z.custom<T>(validator?: (val:any)=>boolean, opts?: { message?: string }): ZodType<T>

# Function schemas

z.function(): ZodFunction
.function.args(...schemas: ZodType[]): ZodFunction
.function.returns(schema: ZodType): ZodFunction
.function.implement(fn:(...args:any[])=>any): (...args:any[])=>any

# Schema Methods: parse, safeParse, parseAsync, safeParseAsync

# Errors & Messages

Customize messages via method options or at schema creation e.g. z.string({ required_error: "msg", invalid_type_error: "msg" }).

## Attribution
- Source: Ontology Validation with Zod
- URL: https://github.com/colinhacks/zod#readme
- License: MIT License
- Crawl Date: 2025-04-26T03:52:49.447Z
- Data Size: 1219002 bytes
- Links Found: 7247

## Retrieved
2025-04-26
