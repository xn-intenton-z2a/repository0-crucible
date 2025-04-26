# ZOD_CORE

## Crawl Summary
Zod Core 4: TS-first schema validation with static type inference. Zero dependencies; 8kb min+zip; Node & browsers. Strict TS required. Install via npm/yarn/pnpm/bun/deno. Import z from 'zod'. Create primitive, object, composite schemas. Use .parse/.safeParse/.parseAsync/.safeParseAsync. Primitive schemas support coercion via z.coerce.<type>(). Object modifiers: extend, merge, pick, omit, partial, deepPartial, required, passthrough, strict, strip, catchall. Composite types: arrays, tuples, unions, discriminatedUnion, record, map, set, intersection. Transform & refine: .refine(predicate,params), .superRefine, .transform, .preprocess, .pipe. Functions: z.function().args(...).returns(...).implement(fn). Promises: z.promise(schema). Error handling via thrown ZodError. Customize messages. Recursion: z.lazy, explicit ZodType input/output.

## Normalised Extract
Table of Contents
1 Installation and Setup
2 Primitive Schemas and Coercion
3 Object Schema Construction and Modifiers
4 Composite Types: Arrays, Tuples, Unions, Records, Maps, Sets, Intersections
5 Parsing Methods and Error Handling
6 Transformations, Refinements, and Preprocessing
7 Function and Promise Schemas
8 Recursive and Cyclical Types

1 Installation and Setup
Requirements
TypeScript>=4.5 with "strict":true in tsconfig.json

Commands
npm install zod
yarn add zod
pnpm add zod
bun add zod
deno add npm:zod
npm install zod@canary for canary

Import
import { z } from "zod"

2 Primitive Schemas and Coercion
Schemas
z.string(), z.number(), z.boolean(), z.bigint(), z.date(), z.symbol(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

Coercion Methods
z.coerce.string(): String(input)
z.coerce.number(): Number(input)
z.coerce.boolean(): Boolean(input)
z.coerce.bigint(): BigInt(input)
z.coerce.date(): new Date(input)

3 Object Schema Construction and Modifiers
Define
const Obj = z.object({ k: z.string(), n: z.number() })

Modifiers
.extend({ f: schema })
.merge(otherObjectSchema)
.pick({ a:true, b:false })
.omit({ a:true })
.partial(keysOptional?)
.deepPartial()
.required(keysRequired?)
.passthrough()
.strict()
.strip()
.catchall(schema)

4 Composite Types
Array
z.array(itemSchema).min(n).max(n).length(n).nonempty({ message })
Element schema at .element

Tuple
z.tuple([s1,s2,...]).rest(sRest)

Union
z.union([s1,s2]) or s1.or(s2)

Discriminated Union
z.discriminatedUnion("key",[obj1,obj2])

Record
z.record(keySchema,valueSchema)

Map
z.map(keySchema,valueSchema)

Set
z.set(itemSchema).min(n).max(n).size(n)

Intersection
z.intersection(A,B) or A.and(B)

5 Parsing Methods and Error Handling
.parse(data:unknown):Output throws ZodError
.parseAsync(data:unknown):Promise<Output>
.safeParse(data:unknown):{success:true,data}|{success:false,error}
.safeParseAsync(data):Promise<...>

Customize errors
z.string({ required_error, invalid_type_error })
.method(params?,{message})

6 Transformations, Refinements, Preprocessing
.refine(predicate:(val)=>boolean|Promise<boolean>,{message?,path?})
.superRefine((val,ctx)=>ctx.addIssue({code,message,path,type}))
.transform((val)=>newVal)
.preprocess((input)=>mapped, schema)
.pipe()

7 Function and Promise Schemas
Function
z.function().args(s1,s2,...).returns(retSchema)
.implement((...args)=>result)
.parameters():ZodTuple
.returnType():ZodType

Promise
z.promise(schema)

8 Recursive and Cyclical Types
Recursive
const Base = z.object({ name:z.string() })
type T=Infer<typeof Base>&{ children:T[] }
const Schema:z.ZodType<T> = Base.extend({ children:z.lazy(()=>Schema.array()) })

Cyclical detection: custom pre-check to track visited references


## Supplementary Details
TypeScript tsconfig.json snippet
{
  "compilerOptions":{
    "strict":true
  }
}

Strict mode required to infer types correctly. Zod ships as ESM. Use import syntax. No additional config. Can integrate with bundlers directly. Supports Node.js v12+ and modern browsers. All methods return new schema instances (immutable).

Transforms and refinements execute in order: preprocess→parse→transform. Asynchronous refinements require .parseAsync. Default unknownKeys policy for objects: strip. Use .passthrough or .strict to override.

Error codes: each ZodIssue contains code:String, message:String, path:Array<String|Number>. Use .formatErrors() or error.issues for custom formatting.


## Reference Details
// API Signatures
z.string():ZodString
z.number():ZodNumber
z.boolean():ZodBoolean
z.bigint():ZodBigInt
z.date():ZodDate
z.symbol():ZodSymbol
z.undefined():ZodUndefined
z.null():ZodNull
z.void():ZodVoid
z.any():ZodAny
z.unknown():ZodUnknown
z.never():ZodNever
z.coerce.string():ZodString
z.object<Shape extends ZodRawShape>(shape:Shape):ZodObject<Shape>
z.array<T extends ZodTypeAny>(schema:T):ZodArray<T>
z.tuple<T extends readonly ZodTypeAny[]>(schemas:T):ZodTuple<T>
z.union<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas:T):ZodUnion<T>
z.discriminatedUnion<Key extends string,T extends ZodObject<any>[]>(key:Key, options:T):ZodDiscriminatedUnion<Key,T>
z.record<K extends ZodTypeAny,V extends ZodTypeAny>(key:K,value:V):ZodRecord<K,V>
z.map<K extends ZodTypeAny,V extends ZodTypeAny>(key:K,value:V):ZodMap<K,V>
z.set<T extends ZodTypeAny>(schema:T):ZodSet<T>
z.intersection<A extends ZodTypeAny,B extends ZodTypeAny>(a:A,b:B):ZodIntersection<A,B>
z.function():ZodFunction<ZodTuple<[]>,ZodUnknown>
z.promise<T extends ZodTypeAny>(schema:T):ZodPromise<T>
z.lazy<T extends ZodTypeAny>(getter:()=>T):T
z.custom<T>(check?: (val:any)=>boolean|Promise<boolean>, params?:{message?:string}):ZodCustom<T>

// ZodString Methods
.string().min(min:number, params?:{message?:string}):ZodString
.max(max:number, params?:{message?:string}):ZodString
.email(params?:{message?:string}):ZodString
.url(params?:{message?:string}):ZodString
.regex(regex:RegExp,params?:{message?:string}):ZodString
.datetime(options?:{offset?:boolean;local?:boolean;precision?:number},params?:{message?:string}):ZodString

// Common ZodType Methods
.parse(data:unknown):OutputType
.parseAsync(data:unknown):Promise<OutputType>
.safeParse(data:unknown):{success:true;data:OutputType}|{success:false;error:ZodError}
.safeParseAsync(data:unknown):Promise<...>
.refine(predicate:(val:InputType)=>boolean|Promise<boolean>, params?:{message?:string;path?:(string|number)[]}):ZodEffects<InputType,InputType,
 InputType>
.superRefine((val:InputType,ctx:RefinementCtx)=>void):ZodEffects<InputType,InputType,InputType>
.transform<U>(transform:(val:InputType)=>U):ZodEffects<InputType,U,InputType>
.preprocess<IN>(pre:(val:any)=>IN, schema:ZodType<any>):ZodEffects<any,any,any>
.optional():ZodOptional<ZodTypeAny>
.nullable():ZodNullable<ZodTypeAny>
.or<TOther extends ZodTypeAny>(other:TOther):ZodUnion<[Self,TOther]>
.and<TOther extends ZodTypeAny>(other:TOther):ZodIntersection<Self,TOther>
.catchall(schema:ZodTypeAny):ZodObject<any>

// Code Examples
import { z } from "zod"
// Basic parse
const name = z.string().min(3)
name.parse("Bob") // "Bob"
// Safe parse
const result = name.safeParse(12)
if (!result.success) console.error(result.error.issues)

// Function schema
const fn = z.function().args(z.string(),z.number()).returns(z.boolean()).implement((s,n)=>s.length>n)
fn("hello",3) // true

// Recursive schema
interface Category { name:string; children:Category[] }
const base = z.object({ name:z.string() })
const category: z.ZodType<Category> = base.extend({ children:z.lazy(()=>category.array()) })

// Troubleshooting
// Infinite loop in recursion -> wrap recursive reference in z.lazy
// Incorrect TS inference -> ensure tsconfig strict=true


## Information Dense Extract
TS>=4.5 strict; ERM: ESM import {z} from 'zod'; install via npm/yarn/pnpm/bun/deno; core: primitive schemas and z.coerce; object:z.object(shape)+modifiers extend,merge,pick,omit,partial,deepPartial,required,passthrough,strict,strip,catchall; arrays:z.array(schema).min/max/length/nonempty; tuples:z.tuple([...]).rest; unions:z.union or .or; discriminatedUnion(key,options); record,map,set; intersection:A.and(B); parse: .parse throws, .safeParse returns union; async: parseAsync,safeParseAsync; refine(predicate,{message,path}), superRefine; transform(fn); preprocess(fn,schema); function schemas: z.function().args(...).returns(...).implement; promise:z.promise(schema); recursion:z.lazy; ZodType<Out,Def,In>. Error codes: code,message,path; methods immutable; default unknownKeys=strip; override with passthrough or strict.

## Sanitised Extract
Table of Contents
1 Installation and Setup
2 Primitive Schemas and Coercion
3 Object Schema Construction and Modifiers
4 Composite Types: Arrays, Tuples, Unions, Records, Maps, Sets, Intersections
5 Parsing Methods and Error Handling
6 Transformations, Refinements, and Preprocessing
7 Function and Promise Schemas
8 Recursive and Cyclical Types

1 Installation and Setup
Requirements
TypeScript>=4.5 with 'strict':true in tsconfig.json

Commands
npm install zod
yarn add zod
pnpm add zod
bun add zod
deno add npm:zod
npm install zod@canary for canary

Import
import { z } from 'zod'

2 Primitive Schemas and Coercion
Schemas
z.string(), z.number(), z.boolean(), z.bigint(), z.date(), z.symbol(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

Coercion Methods
z.coerce.string(): String(input)
z.coerce.number(): Number(input)
z.coerce.boolean(): Boolean(input)
z.coerce.bigint(): BigInt(input)
z.coerce.date(): new Date(input)

3 Object Schema Construction and Modifiers
Define
const Obj = z.object({ k: z.string(), n: z.number() })

Modifiers
.extend({ f: schema })
.merge(otherObjectSchema)
.pick({ a:true, b:false })
.omit({ a:true })
.partial(keysOptional?)
.deepPartial()
.required(keysRequired?)
.passthrough()
.strict()
.strip()
.catchall(schema)

4 Composite Types
Array
z.array(itemSchema).min(n).max(n).length(n).nonempty({ message })
Element schema at .element

Tuple
z.tuple([s1,s2,...]).rest(sRest)

Union
z.union([s1,s2]) or s1.or(s2)

Discriminated Union
z.discriminatedUnion('key',[obj1,obj2])

Record
z.record(keySchema,valueSchema)

Map
z.map(keySchema,valueSchema)

Set
z.set(itemSchema).min(n).max(n).size(n)

Intersection
z.intersection(A,B) or A.and(B)

5 Parsing Methods and Error Handling
.parse(data:unknown):Output throws ZodError
.parseAsync(data:unknown):Promise<Output>
.safeParse(data:unknown):{success:true,data}|{success:false,error}
.safeParseAsync(data):Promise<...>

Customize errors
z.string({ required_error, invalid_type_error })
.method(params?,{message})

6 Transformations, Refinements, Preprocessing
.refine(predicate:(val)=>boolean|Promise<boolean>,{message?,path?})
.superRefine((val,ctx)=>ctx.addIssue({code,message,path,type}))
.transform((val)=>newVal)
.preprocess((input)=>mapped, schema)
.pipe()

7 Function and Promise Schemas
Function
z.function().args(s1,s2,...).returns(retSchema)
.implement((...args)=>result)
.parameters():ZodTuple
.returnType():ZodType

Promise
z.promise(schema)

8 Recursive and Cyclical Types
Recursive
const Base = z.object({ name:z.string() })
type T=Infer<typeof Base>&{ children:T[] }
const Schema:z.ZodType<T> = Base.extend({ children:z.lazy(()=>Schema.array()) })

Cyclical detection: custom pre-check to track visited references

## Original Source
Ontology Validation with Zod
https://github.com/colinhacks/zod#readme

## Digest of ZOD_CORE

# Zod Core Technical Reference
Date retrieved: 2024-06-21
Data Size: 1201903 bytes
Attribution: colinhacks/zod#readme

# Installation
- Requirements: TypeScript 4.5+, strict mode enabled in tsconfig.json
- Commands:
  • npm install zod        
  • yarn add zod           
  • pnpm add zod           
  • bun add zod            
  • deno add npm:zod       
- Canary builds: install zod@canary via same commands

# Basic Usage
import { z } from "zod"

const schema = z.string()
schema.parse(data: unknown): string // throws ZodError on invalid
schema.safeParse(data: unknown): { success: true; data: string } | { success: false; error: ZodError }

# Primitive Schemas & Coercion
Schemas:
• z.string(), z.number(), z.boolean(), z.bigint(), z.date(), z.symbol(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

Coercion:
• z.coerce.string(): applies String(input)
• z.coerce.number(): Number(input)
• z.coerce.boolean(): Boolean(input)
• z.coerce.bigint(): BigInt(input)
• z.coerce.date(): new Date(input)

# Object Schemas
const Obj = z.object({ key: z.string(), count: z.number() })

Modifiers:
• .extend(fields)
• .merge(other)
• .pick({ keys })
• .omit({ keys })
• .partial(keys?)  shallow optional
• .deepPartial()    recursive optional
• .required(keys?)
• .passthrough()    allow unknown keys
• .strict()         disallow unknown keys
• .strip()          reset to strip mode
• .catchall(schema) validate unknown keys

# Composite Types
• Arrays: z.array(itemSchema).min(n).max(n).length(n).nonempty({message})
• Tuples: z.tuple([...schemas]).rest(schema)
• Unions: z.union([s1,s2]) or s1.or(s2)
• Discriminated unions: z.discriminatedUnion(key, [objectSchemas])
• Records: z.record(keySchema,valueSchema)
• Maps: z.map(keySchema,valueSchema)
• Sets: z.set(itemSchema).min(n).max(n).size(n)
• Intersections: z.intersection(A,B) or A.and(B)

# Transformations & Refinements
• .refine(predicate, { message?, path? }) synchronous or async return boolean
• .superRefine((data,ctx)=>{ctx.addIssue({...})}) for multiple issues
• .transform(fn) map input->output
• .preprocess(fn,inputSchema) apply before validation
• .pipe() chain coercion or preprocess + parsing

# Functions & Promises
Function schemas:
const fn = z.function().args(z.string(),z.number()).returns(z.boolean())
fn.implement((s,n)=>boolean)
fn.parse(args) validates Promise via .then/.catch

# Error Handling
- All .parse() methods throw ZodError
- Use .safeParse() or .safeParseAsync() for error object
- Customize messages in schema constructor and validation methods

# Recursive & Cyclical Types
- Use z.lazy(() => schema) for recursion
- Provide explicit input/output types in ZodType<T,Def,Input>
- Detect cycles via custom code to avoid infinite loops


## Attribution
- Source: Ontology Validation with Zod
- URL: https://github.com/colinhacks/zod#readme
- License: MIT License
- Crawl Date: 2025-04-26T04:49:54.643Z
- Data Size: 1201903 bytes
- Links Found: 7273

## Retrieved
2025-04-26
