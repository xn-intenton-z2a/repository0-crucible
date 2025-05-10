# ZOD_CORE

## Crawl Summary
TypeScript>=4.5 strict mode required. Install zod via npm/yarn/pnpm/bun with optional canary. Import z from 'zod'. Build schemas: primitives, arrays, objects, tuples, unions, records, maps, sets, intersections, discriminated unions, lazy recursive types, function schemas, effects (refine, transform, preprocess). Methods: .parse, .safeParse, .parseAsync, .safeParseAsync, .refine, .superRefine, .transform, .default, .catch, .optional, .nullable, .nullish, .brand, .readonly, .pipe. Configuration: object strict/passthrough/strip, object .catchall(schema). Coercion: z.coerce for primitives. Error handling: ZodError with path, message, code, params.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Basic Usage
 3 Schema Builders
 4 Parsing Methods
 5 Error Handling
 6 Advanced Features

1 Installation
  - Requirements: TypeScript>=4.5, tsconfig.json strict: true
  - Commands: npm install zod; yarn add zod; pnpm add zod; bun add zod; canary builds via @canary

2 Basic Usage
  - import { z } from 'zod'
  - Define schema: z.string(), z.number(), z.object({ key: schema })
  - Parse: schema.parse(input); schema.safeParse(input)
  - Infer types: type T = z.infer<typeof schema>

3 Schema Builders
  Primitives:
    z.string(); z.number(); z.bigint(); z.boolean(); z.date(); z.symbol(); z.any(); z.unknown(); z.never()
  Coercion:
    z.coerce.string(); z.coerce.number(); z.coerce.boolean(); z.coerce.bigint(); z.coerce.date()
  String Methods:
    .min(n[, message]); .max(n); .length(n); .email(); .url(); .regex(regex); .datetime({ offset:boolean, local:boolean, precision:number}); .date(); .time(); .duration(); .base64(); .ip({ version:'v4'|'v6'}); .cidr({ version:'v4'|'v6'})
  Number Methods:
    .gt(n); .gte(n); .lt(n); .lte(n); .int(); .positive(); .nonnegative(); .negative(); .nonpositive(); .multipleOf(n); .finite(); .safe()
  Arrays:
    z.array(itemSchema); .min(n); .max(n); .length(n); .nonempty({ message })
  Objects:
    z.object({}); .partial(keys?); .deepPartial(); .required(keys?); .extend(shape); .merge(schema); .pick(keys); .omit(keys); .strict(); .passthrough(); .strip(); .catchall(schema)
  Unions & Tuples:
    z.union([schemas]); schemaA.or(schemaB); z.tuple([schemas]); .rest(schema)
  Discriminated Unions:
    z.discriminatedUnion(key, [objectSchemas])
  Recursive:
    z.lazy(() => schemaDefinition)

4 Parsing Methods
  .parse(data:unknown): T | throws ZodError
  .parseAsync(data): Promise<T>
  .safeParse(data): { success: boolean; data?: T; error?: ZodError }
  .safeParseAsync(data)

5 Error Handling and Refinements
  .refine(validator: (val)=>boolean, { message, path, params })
  .superRefine((val, ctx)=>{ ctx.addIssue({ code, message, path, params }); })
  .transform((val)=>newVal)
  .default(value); .catch(fun); .optional(); .nullable(); .nullish(); .brand(); .readonly(); .pipe()

6 Advanced Features
  Function schemas: z.function().args(...schemas).returns(schema).implement(fn)
  Effects: z.preprocess(fn, schema)
  JSON type: z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))
  Promises: z.promise(schema)
  Instance checks: z.instanceof(Class)


## Supplementary Details
 - tsconfig.json: { "compilerOptions": { "strict": true, "target": "ES2020", "module": "ESNext", "lib": ["ES2020","DOM"] } }
 - z.coerce.string(): uses String(input) before validation; returns ZodString instance supporting .email, .min, .max, .regex
 - z.coerce.number(): Number(input) then validations
 - z.coerce.date(): new Date(input) then Date-specific checks
 - Object unknownKeys policies: default strip, .passthrough() retains unknown properties, .strict() throws on unknown, .strip() resets to strip
 - .catchall(schema): validate all extra keys against schema
 - Default error codes: invalid_type, custom messages via { message: string } parameter
 - Deep partial limitation: only objects, arrays, tuples
 - DiscriminatedUnion .options property returns array of ZodObject schemas
 - Function schema .parameters() returns ZodTuple; .returnType() returns return ZodType
 - Preprocess return type: ZodEffects wrapper, use generic ZodType<Output,Def,Input>


## Reference Details
API: z.string(): ZodString
Methods:
  .min(min: number, params?: { message?: string }): ZodString
  .max(max: number, params?: { message?: string }): ZodString
  .length(len: number, params?: { message?: string }): ZodString
  .email(params?: { message?: string }): ZodString
  .url(params?: { message?: string }): ZodString
  .regex(regex: RegExp, params?: { message?: string }): ZodString
  .datetime(options?: { offset?: boolean; local?: boolean; precision?: number; message?: string }): ZodString
  .date(params?: { message?: string }): ZodString
  .time(options?: { precision?: number; message?: string }): ZodString
  .ip(options?: { version?: 'v4'|'v6'; message?: string }): ZodString
  .cidr(options?: { version?: 'v4'|'v6'; message?: string }): ZodString

z.number(): ZodNumber
  .gt(n: number, params?: { message?: string }): ZodNumber
  .gte(n, params?): ZodNumber
  .lt(n, params?): ZodNumber
  .lte(n, params?): ZodNumber
  .int(params?): ZodNumber
  .positive(params?): ZodNumber
  .nonnegative(params?): ZodNumber
  .negative(params?): ZodNumber
  .nonpositive(params?): ZodNumber
  .multipleOf(n: number, params?): ZodNumber
  .finite(params?): ZodNumber
  .safe(params?): ZodNumber

z.coerce.string(): ZodEffects<string,string>

z.object<T extends ZodRawShape>(shape: T): ZodObject<T>
  .partial(keys?: Record<keyof T, boolean>): ZodObject
  .deepPartial(): ZodObject
  .required(keys?: Record<keyof T, boolean>): ZodObject
  .extend<U extends ZodRawShape>(shape: U): ZodObject<T & U>
  .merge<O extends ZodTypeAny>(other: ZodObject<any>): ZodObject
  .pick<K extends keyof T>(keys: Record<K, true>): ZodObject<Pick<T,K>>
  .omit<K extends keyof T>(keys: Record<K, true>): ZodObject<Omit<T,K>>
  .strict(): ZodObject
  .passthrough(): ZodObject
  .strip(): ZodObject
  .catchall(schema: ZodTypeAny): ZodObject

z.array<T extends ZodTypeAny>(schema: T): ZodArray<T>
  .min(n: number, params?): ZodArray<T>
  .max(n, params?): ZodArray<T>
  .length(n, params?): ZodArray<T>
  .nonempty(params?): ZodNonEmptyArray<T>

z.union<[A extends ZodTypeAny, B extends ZodTypeAny]>(schemas: [A,B,...ZodTypeAny[]]): ZodUnion<[A,B,...]> 
  .or(schema): Union of two

z.discriminatedUnion<K extends string, S extends ZodDiscriminatedUnionOption>(key: K, options: S[]): ZodDiscriminatedUnion<K,S>

z.lazy<T>(getter: () => ZodType<T>): ZodLazy<T>

z.function(): ZodFunction<ZodTuple<any>, ZodTypeAny>
  .args(...schemas: ZodTypeAny[]): ZodFunction<any,any>
  .returns(schema: ZodTypeAny): ZodFunction<any,any>
  .implement(fn: (...args: any[])=>any): (...args: any[])=>any
  .parameters(): ZodTuple<any>
  .returnType(): ZodTypeAny

z.preprocess(fn: (arg: unknown)=>unknown, schema: ZodTypeAny): ZodEffects<any,any>

.parse(data: unknown): T
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: true; data: T }|{ success: false; error: ZodError }
.safeParseAsync(data): Promise<above>
.refine(check: (data:T)=>boolean|Promise<boolean>, params?: { message?: string; path?: (string|number)[]; params?: object }): This
.superRefine((data, ctx) => void): This
.transform<U>(fn: (data:T)=>U): ZodEffects<U,any>
.default(def: T | (()=>T)): ZodEffects<T,any>
.catch<Q>(fn: (err: ZodError)=>Q): ZodEffects<T|Q,any>
.optional(): ZodOptional<This>
.nullable(): ZodNullable<This>
.nullish(): ZodOptional<ZodNullable<This>>
.array(): ZodArray<This>
.promise(): ZodPromise<This>
.or<Other>(other: ZodTypeAny): ZodUnion
.and<Other>(other: ZodTypeAny): ZodIntersection
.brand<BRAND extends string>(): ZodBranded<This,BRAND>
.readonly(): ZodReadonly<This>
.pipe<NewOut>(arg: ZodTypeAny): ZodPipeline<T,NewOut>

Best Practices:
- Enable strict mode, use z.coerce for primitive coercion.
- Validate unknown keys via .strict or .catchall.
- Use discriminatedUnions for fast branching.
- Provide custom messages via params object.
- Use .safeParse in async contexts to avoid unhandled exceptions.

Troubleshooting:
# Node REPL parse test
node -e "const { z }=require('zod'); console.log(z.string().uuid().safeParse('123e4567-e89b-12d3-a456-426614174000'));"
# Expect { success: true; data: '123e4567-e89b-12d3-a456-426614174000' }

# Invalid parse
node -e "const { z }=require('zod'); try { z.string().datetime().parse('2020-01-01'); } catch(e) { console.error(e.errors); }"
# Expect issue code 'invalid_string', path [], message 'Invalid datetime string'


## Information Dense Extract
TS>=4.5 strict:true. Install: npm/yarn/pnpm/bun add zod[@canary]. import {z} from 'zod'. Primitives:z.string(),number,bigint,boolean,date,symbol,undefined,null,void,any,unknown,never. Coerce:z.coerce.string/number/boolean/bigint/date wraps JS constructors. String methods:.min(n),.max(n),.length(n),.email(),.url(),.regex(re),.datetime({offset:boolean,local:boolean,precision:number}),.date(),.time({precision}),.duration(),.ip({version}),.cidr({version}). Number methods:.gt(n),.gte(n),.lt(n),.lte(n),.int(),.positive(),.nonnegative(),.negative(),.nonpositive(),.multipleOf(n),.finite(),.safe(). Arrays:z.array(schema)[.min(n),.max(n),.length(n),.nonempty()]. Objects:z.object(shape)[.partial(keys),.deepPartial(),.required(keys),.extend(shape),.merge(obj),.pick(keys),.omit(keys),.strict(),.passthrough(),.strip(),.catchall(schema)]. Unions:z.union([schemas])/schema1.or(schema2). Discriminated:z.discriminatedUnion(key,schemas). Tuple:z.tuple([...])[.rest(schema)]. Recursive:z.lazy(()=>self). Function:z.function().args(...).returns(schema).implement(fn). Effects:z.preprocess(fn,target)/.refine(check,{message,path,params})/.superRefine(ctx=>ctx.addIssue)/.transform(fn)/.default()/ .catch()/.optional()/.nullable()/.nullish()/ .brand()/ .readonly()/ .pipe(). Parsing:.parse()/parseAsync()/.safeParse()/safeParseAsync(). Error:ZodError with issues[{code,path,message,params}]. Best: strict TS, coerce primitives, use discriminatedUnion, safeParse in async. Troubleshoot via node REPL commands above.

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Basic Usage
 3 Schema Builders
 4 Parsing Methods
 5 Error Handling
 6 Advanced Features

1 Installation
  - Requirements: TypeScript>=4.5, tsconfig.json strict: true
  - Commands: npm install zod; yarn add zod; pnpm add zod; bun add zod; canary builds via @canary

2 Basic Usage
  - import { z } from 'zod'
  - Define schema: z.string(), z.number(), z.object({ key: schema })
  - Parse: schema.parse(input); schema.safeParse(input)
  - Infer types: type T = z.infer<typeof schema>

3 Schema Builders
  Primitives:
    z.string(); z.number(); z.bigint(); z.boolean(); z.date(); z.symbol(); z.any(); z.unknown(); z.never()
  Coercion:
    z.coerce.string(); z.coerce.number(); z.coerce.boolean(); z.coerce.bigint(); z.coerce.date()
  String Methods:
    .min(n[, message]); .max(n); .length(n); .email(); .url(); .regex(regex); .datetime({ offset:boolean, local:boolean, precision:number}); .date(); .time(); .duration(); .base64(); .ip({ version:'v4'|'v6'}); .cidr({ version:'v4'|'v6'})
  Number Methods:
    .gt(n); .gte(n); .lt(n); .lte(n); .int(); .positive(); .nonnegative(); .negative(); .nonpositive(); .multipleOf(n); .finite(); .safe()
  Arrays:
    z.array(itemSchema); .min(n); .max(n); .length(n); .nonempty({ message })
  Objects:
    z.object({}); .partial(keys?); .deepPartial(); .required(keys?); .extend(shape); .merge(schema); .pick(keys); .omit(keys); .strict(); .passthrough(); .strip(); .catchall(schema)
  Unions & Tuples:
    z.union([schemas]); schemaA.or(schemaB); z.tuple([schemas]); .rest(schema)
  Discriminated Unions:
    z.discriminatedUnion(key, [objectSchemas])
  Recursive:
    z.lazy(() => schemaDefinition)

4 Parsing Methods
  .parse(data:unknown): T | throws ZodError
  .parseAsync(data): Promise<T>
  .safeParse(data): { success: boolean; data?: T; error?: ZodError }
  .safeParseAsync(data)

5 Error Handling and Refinements
  .refine(validator: (val)=>boolean, { message, path, params })
  .superRefine((val, ctx)=>{ ctx.addIssue({ code, message, path, params }); })
  .transform((val)=>newVal)
  .default(value); .catch(fun); .optional(); .nullable(); .nullish(); .brand(); .readonly(); .pipe()

6 Advanced Features
  Function schemas: z.function().args(...schemas).returns(schema).implement(fn)
  Effects: z.preprocess(fn, schema)
  JSON type: z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))
  Promises: z.promise(schema)
  Instance checks: z.instanceof(Class)

## Original Source
CLI Parsing and Validation
https://github.com/colinhacks/zod

## Digest of ZOD_CORE

# Zod Core Documentation (Retrieved 2024-06-11)

## Installation

### Requirements
- TypeScript >= 4.5 with strict mode enabled in tsconfig.json
  {
    "compilerOptions": {
      "strict": true
    }
  }

### Install via Package Manager
- npm install zod
- yarn add zod
- pnpm add zod
- bun add zod

- Canary builds:
  - npm install zod@canary
  - yarn add zod@canary


## Basic Usage

```typescript
import { z } from "zod";

// String schema
const mySchema = z.string();
mySchema.parse("tuna");        // returns "tuna"
mySchema.safeParse(12);         // { success: false; error: ZodError }

// Object schema + type inference
const User = z.object({ username: z.string() });
User.parse({ username: "Ludwig" });
type UserType = z.infer<typeof User>;  // { username: string }
```


## Schema Builders and Methods

### Primitives
- z.string(), z.number(), z.bigint(), z.boolean(), z.date(), z.symbol()
- z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

### Coercion
- z.coerce.string(), z.coerce.number(), z.coerce.boolean(), z.coerce.bigint(), z.coerce.date()
  - wraps built-in constructors: String(input), Number(input), Boolean(input), BigInt(input), new Date(input)

### String Validations
- z.string().min(length[, { message }])
- z.string().max(length[, { message }])
- z.string().length(length[, { message }])
- z.string().email([{ message }])
- z.string().url([{ message }])
- z.string().regex(pattern[, { message }])
- z.string().datetime([{ offset: boolean, local: boolean, precision: number, message }])
- z.string().date(), z.string().time(), z.string().duration(), z.string().ip([{ version }]), z.string().cidr([{ version }])

### Number Validations
- z.number().gt(n), .gte(n), .lt(n), .lte(n), .int(), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(n), .finite(), .safe()

### Array
- z.array(itemSchema), or itemSchema.array()
- .min(n), .max(n), .length(n), .nonempty([{ message }])

### Object
- z.object({ key: schema, ... })
- .partial([{ keys }]), .deepPartial(), .required([{ keys }]), .extend({ schema }), .merge(schema), .pick(keys), .omit(keys), .strict(), .passthrough(), .strip(), .catchall(schema)


## Parsing and Error Handling

- .parse(data: unknown): T | throws ZodError
- .parseAsync(data): Promise<T>
- .safeParse(data): { success: boolean; data?: T; error?: ZodError }
- .safeParseAsync(data): Promise<same>

- .refine(validator, { message?, path?, params? })
- .superRefine((data, ctx) => { ctx.addIssue({ code, message, path, params }); })
- .transform(fn)


## Advanced

### Discriminated Unions
- z.discriminatedUnion(discriminatorKey, [schemaA, schemaB])

### Recursive Schemas
- z.lazy(() => schemaDefinition)
- Provide explicit ZodType<Output, Def, Input>

### Function Schemas
- z.function().args(...schemas).returns(schema).implement(fn)

### Preprocessing
- z.preprocess(transformFn, targetSchema)


## Troubleshooting Commands

```bash
# Validate schema in REPL
node -e "const { z } = require('zod'); console.log(z.string().email().safeParse('foo@bar.com'));"

# Detect cyclical objects before parse
# Use custom utility: 
node -e "const { z } = require('zod'); function isCyclic(obj, seen=new Set()) { if (obj && typeof obj==='object') { if (seen.has(obj)) return true; seen.add(obj); for (const key in obj) if (isCyclic(obj[key], seen)) return true; } return false } console.log(isCyclic({a:{},b:{a:{}}}));"
```

## Attribution
- Source: CLI Parsing and Validation
- URL: https://github.com/colinhacks/zod
- License: License: MIT
- Crawl Date: 2025-05-10T12:30:13.350Z
- Data Size: 902332 bytes
- Links Found: 6127

## Retrieved
2025-05-10
