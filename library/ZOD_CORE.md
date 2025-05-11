# ZOD_CORE

## Crawl Summary
Installation: TS4.5+, enable strict. npm|yarn|pnpm|bun|deno install zod. Basic Usage: z.string, z.object, z.infer. Primitives: z.string, z.number, z.bigint, z.boolean, z.date, empty/catchall types. Coercion: z.coerce.* uses built-in constructors. Parsing: .parse, .parseAsync, .safeParse, .safeParseAsync. Composition: object, array, tuple, union, discriminatedUnion, record, map, set, intersection. Schema methods: .extend, .merge, .pick/.omit, .partial/.deepPartial, .required, .strict/.passthrough/.strip/.catchall. Refinements: .refine, .superRefine; transforms: .transform, .preprocess, .pipe. Enums: z.enum, z.nativeEnum with .enum and .options, .extract/.exclude. Helpers: .optional, .nullable. Advanced: .lazy for recursion, ZodType<>, function schemas, z.instanceof. Errors: custom messages. Troubleshooting: cycles, promise schemas, boolean coercion caveats.

## Normalised Extract
Table of Contents:
1. Installation
2. Basic Usage
3. Primitives & Coercion
4. Parsing Methods
5. Schema Composition
6. Refinements & Transforms
7. Enums & Helpers
8. Advanced Patterns
9. Troubleshooting

1. Installation
   - Requirements: TypeScript>=4.5, tsconfig.json strict=true
   - Commands: npm install zod | yarn add zod | pnpm add zod | bun add zod | deno add npm:zod
   - Canary: install zod@canary

2. Basic Usage
   import { z } from "zod"
   z.string().parse("foo")           // returns "foo"
   z.string().safeParse(123)           // { success:false,... }
   const User = z.object({ username:z.string() })
   User.parse({ username:"alice" })  // returns object
   type User = z.infer<typeof User>    // { username: string }

3. Primitives & Coercion
   z.string(opts?), z.number(opts?), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()
   z.coerce.string() -> String(input)
   z.coerce.number() -> Number(input)
   z.coerce.boolean() -> Boolean(input)
   z.coerce.date() -> new Date(input)

4. Parsing Methods
   .parse(data:unknown):T
   .parseAsync(data:unknown):Promise<T>
   .safeParse(data:unknown):{success:boolean;data?:T;error?:ZodError}
   .safeParseAsync(data:unknown):Promise<same>

5. Schema Composition
   Objects: z.object(shape)
      .extend(fields), .merge(obj)
      .pick(keys), .omit(keys)
      .partial(keys?), .deepPartial()
      .required(keys?)
      .strict(), .passthrough(), .strip(), .catchall(schema)
   Arrays: z.array(item)
      .nonempty({message}), .min(n,{message}), .max(n), .length(n)
   Tuples: z.tuple([schemas]).rest(schema)
   Unions: z.union([schemas]), schema1.or(schema2)
   Discriminated union: z.discriminatedUnion(key, options[])
   Record: z.record(keySchema,valueSchema)
   Map: z.map(keySchema,valueSchema)
   Set: z.set(item).nonempty()/min()/max()/size()
   Intersection: z.intersection(A,B) or A.and(B)

6. Refinements & Transforms
   .refine(validator,val=>boolean, {message?,path?})
   .superRefine((val,ctx)=>ctx.addIssue({code,path,message}))
   .transform(fn:val=>newVal)
   .preprocess(fn:input=>converted, targetSchema)
   .pipe(schema)

7. Enums & Helpers
   z.enum(["A","B",...]) -> ZodEnum
      .enum property, .options, .extract(vals), .exclude(vals)
   z.nativeEnum(NativeEnumObj)
   .optional(), .nullable()

8. Advanced Patterns
   z.lazy(()=>schema) for recursion
   const schema: ZodType<Output,Def,Input> = base.extend({})
   z.function().args(...schemas).returns(schema).implement(fn)
   z.instanceof(Class)

9. Troubleshooting
   - Cyclical object loops: detect or preprocess
   - Promise schemas: .parse returns Promise; catch errors via .catch
   - Boolean coercion caveat: truthy->true, falsy->false; use z.preprocess for custom logic



## Supplementary Details
Type Inference:
- z.infer<typeof Schema> extracts output type.
- z.input<typeof EffectsSchema> and z.output<typeof EffectsSchema> for ZodEffects.

TS Config:
- strict:true required.

Error Customization:
- schema methods accept optional params: { message:string, path:(string|number)[] }.

Catchall Config:
- .catchall(zSchema) validates unknown keys against zSchema.

Schema Unknown Key Policies:
- Default: strip unknown.
- .passthrough(): keep unknown.
- .strict(): error on unknown.
- .strip(): revert to strip.

Function Schemas:
- z.function(): base
   .args(z.string(),z.number(),...)
   .returns(z.boolean())
   .implement((...args)=>output)

Coercion Caveats:
- Boolean: z.coerce.boolean() maps any truthy to true, any falsy to false.
- Use z.preprocess for custom casts.

Lazy & Recursive:
- z.lazy(()=>schema) wrap self-referencing definitions.
- Provide ZodType<Out,Def,In> when input/output differ.



## Reference Details
### z.string([options])
Signature: z.string(opts?: { required_error?: string; invalid_type_error?: string }) -> ZodString
Methods:
- min(min: number, ctx?: { message?: string; }): ZodString
- max(max: number, ctx?: { message?: string; }): ZodString
- length(len: number, ctx?: { message?: string; }): ZodString
- email(ctx?: { message?: string; }): ZodString
- url(ctx?: { message?: string; }): ZodString
- regex(regex: RegExp, ctx?: { message?: string; }): ZodString
- includes(substr: string, ctx?: { message?: string; }): ZodString
- startsWith(substr: string, ctx?: { message?: string; }): ZodString
- endsWith(substr: string, ctx?: { message?: string; }): ZodString
- datetime(opts?: { offset?: boolean; local?: boolean; precision?: number; message?: string; }): ZodString
- date(): ZodString  // YYYY-MM-DD
- time(opts?: { precision?: number; message?: string; }): ZodString
- ip(opts?: { version?: "v4"|"v6"; message?: string; }): ZodString
- cidr(opts?: { version?: "v4"|"v6"; message?: string; }): ZodString
- trim(): ZodString
- toLowerCase(): ZodString
- toUpperCase(): ZodString
- brand<B extends string>(): ZodBranded<ZodString,B>
- optional(): ZodOptional<ZodString>
- nullable(): ZodNullable<ZodString>
- array(): ZodArray<ZodString>
- promise(): ZodPromise<ZodString>
- or<Other>(other: ZodType<Other>): ZodUnion<[ZodString, ZodType<Other>]> 
- and<Other>(other: ZodType<Other>): ZodIntersection<ZodString, ZodType<Other>>

Parsing:
- .parse(data): string  // throws ZodError
- .parseAsync(data): Promise<string>
- .safeParse(data): { success:true; data:string } | { success:false; error:ZodError }
- .safeParseAsync(data): Promise< same >

Refinement & Transform:
- .refine((val:string)=>boolean, { message?:string; path?: Path; }) -> ZodString
- .superRefine((val:string, ctx)=>void) -> ZodString
- .transform((val:string)=>U) -> ZodEffects<ZodString,U>

### z.number([options])
Signature: z.number(opts?: { required_error?: string; invalid_type_error?: string }) -> ZodNumber
Methods:
- min(min: number, ctx?: { message?: string; }): ZodNumber
- max(max: number, ctx?: { message?: string; }): ZodNumber
- int(): ZodNumber
- positive(): ZodNumber
- nonnegative(): ZodNumber
- negative(): ZodNumber
- nonpositive(): ZodNumber
- multipleOf(factor: number): ZodNumber
- finite(): ZodNumber
- safe(): ZodNumber

### z.object(shape)
Signature: z.object<T extends ZodRawShape>(shape: T) -> ZodObject<T>
Methods:
- .extend<New extends ZodRawShape>(newShape: New): ZodObject<T & New>
- .merge<U extends ZodRawShape>(other: ZodObject<U>): ZodObject<T & U>
- .pick<Keys extends keyof T>(keys: Record<Keys, true>): ZodObject<Pick<T, Keys>>
- .omit<Keys extends keyof T>(keys: Record<Keys, true>): ZodObject<Omit<T, Keys>>
- .partial<Keys extends keyof T>(keys?: Record<Keys, true>): ZodObject<Partial<T>>
- .deepPartial(): ZodObject<DeepPartial<T>>
- .required<Keys extends keyof T>(keys?: Record<Keys, true>): ZodObject<Required<T>>
- .strict(): ZodObject<T>  // error on unknown keys
- .passthrough(): ZodObject<T>  // keep unknown keys
- .strip(): ZodObject<T>  // strip unknown keys
- .catchall<SChema>(schema: ZodType<SChema>): ZodObject<T>  // validate unknown keys

### z.array(item)
Signature: z.array<T extends ZodType>(schema: T) -> ZodArray<T>
Methods:
- .nonempty(ctx?: { message?: string }): ZodNonEmptyArray<T>
- .min(min: number, ctx?: { message?: string }): ZodArray<T>
- .max(max: number, ctx?: { message?: string }): ZodArray<T>
- .length(len: number, ctx?: { message?: string }): ZodArray<T>

### z.union(schemas)
Signature: z.union<T extends [ZodType,...ZodType[]]>(schemas: T) -> ZodUnion<T>
Alternative: schema1.or(schema2)

### z.discriminatedUnion(key: string, schemas: ZodObject[]): ZodDiscriminatedUnion

### z.tuple(schemas)
Signature: z.tuple<T extends [ZodType,...ZodType[]]>(schemas: T) -> ZodTuple<T>
Method: .rest(schema)

### z.record(keySchema, valueSchema)
z.map(keySchema, valueSchema)
z.set(itemSchema)

### z.lazy(fn:()=>ZodType)

### z.function()
Signature: z.function(): ZodFunction<[],unknown>
Methods:
- .args(...schemas)
- .returns(schema)
- .implement(fn)
- .parameters() -> ZodTuple
- .returnType() -> ZodType

### z.instanceof(Class)

### z.preprocess(fn, schema)
### z.custom<T>(check?: (val:unknown)=>boolean, params?:{ message?:string })

Troubleshooting Commands:
- Detect cyclical: JSON.stringify(obj) throws "Converting circular structure to JSON"
- Parse promise: await schema.parse(Promise.resolve(val)).catch(err=>console.error(err))
- Validate date: z.coerce.date().safeParse("invalid").success === false

## Information Dense Extract
TS>=4.5 strict; install zod via npm|yarn|pnpm|bun|deno; import {z}; core schemas: z.string(opts), z.number(opts), z.boolean(), z.bigint(), z.date(), z.any(), z.unknown(), z.never(), z.undefined(), z.null(), z.void(); coercion: z.coerce.[string|number|boolean|date]( ); composition: z.object(shape).extend/merge/pick/omit/partial/deepPartial/required/strict/passthrough/strip/catchall, z.array(item).nonempty/min/max/length, z.tuple([...]).rest(item), z.union([...])/.or, z.discriminatedUnion(key,opts), z.record(keySchema,valueSchema), z.map, z.set.min/max/size/nonempty, z.intersection(A,B)/and; parsing: .parse, .parseAsync, .safeParse, .safeParseAsync; refinements: .refine(predicate,{message,path}), .superRefine((val,ctx)=>ctx.addIssue), transforms: .transform(fn), .preprocess(fn,targetSchema), .pipe(schema); enums: z.enum(vals).enum/.options/.extract/.exclude, z.nativeEnum(obj); helpers: schema.optional(), schema.nullable(); advanced: z.lazy for recursion, ZodType<Out,Def,In>, z.function().args(...).returns(...).implement(fn), z.instanceof(Class), z.custom<T>(fn,msg); error messages via opts or method params; boolean coercion caveat: truthy->true; troubleshooting: detect cycles via JSON.stringify, catch promise parse errors with catch, validate date strings with z.coerce.date();

## Sanitised Extract
Table of Contents:
1. Installation
2. Basic Usage
3. Primitives & Coercion
4. Parsing Methods
5. Schema Composition
6. Refinements & Transforms
7. Enums & Helpers
8. Advanced Patterns
9. Troubleshooting

1. Installation
   - Requirements: TypeScript>=4.5, tsconfig.json strict=true
   - Commands: npm install zod | yarn add zod | pnpm add zod | bun add zod | deno add npm:zod
   - Canary: install zod@canary

2. Basic Usage
   import { z } from 'zod'
   z.string().parse('foo')           // returns 'foo'
   z.string().safeParse(123)           // { success:false,... }
   const User = z.object({ username:z.string() })
   User.parse({ username:'alice' })  // returns object
   type User = z.infer<typeof User>    // { username: string }

3. Primitives & Coercion
   z.string(opts?), z.number(opts?), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()
   z.coerce.string() -> String(input)
   z.coerce.number() -> Number(input)
   z.coerce.boolean() -> Boolean(input)
   z.coerce.date() -> new Date(input)

4. Parsing Methods
   .parse(data:unknown):T
   .parseAsync(data:unknown):Promise<T>
   .safeParse(data:unknown):{success:boolean;data?:T;error?:ZodError}
   .safeParseAsync(data:unknown):Promise<same>

5. Schema Composition
   Objects: z.object(shape)
      .extend(fields), .merge(obj)
      .pick(keys), .omit(keys)
      .partial(keys?), .deepPartial()
      .required(keys?)
      .strict(), .passthrough(), .strip(), .catchall(schema)
   Arrays: z.array(item)
      .nonempty({message}), .min(n,{message}), .max(n), .length(n)
   Tuples: z.tuple([schemas]).rest(schema)
   Unions: z.union([schemas]), schema1.or(schema2)
   Discriminated union: z.discriminatedUnion(key, options[])
   Record: z.record(keySchema,valueSchema)
   Map: z.map(keySchema,valueSchema)
   Set: z.set(item).nonempty()/min()/max()/size()
   Intersection: z.intersection(A,B) or A.and(B)

6. Refinements & Transforms
   .refine(validator,val=>boolean, {message?,path?})
   .superRefine((val,ctx)=>ctx.addIssue({code,path,message}))
   .transform(fn:val=>newVal)
   .preprocess(fn:input=>converted, targetSchema)
   .pipe(schema)

7. Enums & Helpers
   z.enum(['A','B',...]) -> ZodEnum
      .enum property, .options, .extract(vals), .exclude(vals)
   z.nativeEnum(NativeEnumObj)
   .optional(), .nullable()

8. Advanced Patterns
   z.lazy(()=>schema) for recursion
   const schema: ZodType<Output,Def,Input> = base.extend({})
   z.function().args(...schemas).returns(schema).implement(fn)
   z.instanceof(Class)

9. Troubleshooting
   - Cyclical object loops: detect or preprocess
   - Promise schemas: .parse returns Promise; catch errors via .catch
   - Boolean coercion caveat: truthy->true, falsy->false; use z.preprocess for custom logic

## Original Source
zod
https://github.com/colinhacks/zod

## Digest of ZOD_CORE

# Zod Core Technical Summary
Date Retrieved: 2024-06-10

## Installation

### Requirements
TypeScript 4.5+ with strict mode enabled in tsconfig.json:

{
  "compilerOptions": {
    "strict": true
  }
}

### Package Installation

- npm: npm install zod
- yarn: yarn add zod
- pnpm: pnpm add zod
- bun: bun add zod
- deno: deno add npm:zod

Canary builds:
- npm install zod@canary

## Basic Usage

import { z } from "zod";

// String schema
const s = z.string();
s.parse("foo");           // returns "foo"
s.safeParse(123);         // { success:false; error: ZodError }

// Object schema
const User = z.object({ username: z.string() });
User.parse({ username: "alice" });
type User = z.infer<typeof User>;  // { username: string }

## Primitives

- z.string(options?:{ required_error?: string; invalid_type_error?: string })
- z.number(options?:{ required_error?: string; invalid_type_error?: string })
- z.bigint()
- z.boolean()
- z.date()
- z.undefined(), z.null(), z.void()
- z.any(), z.unknown(), z.never()

## Coercion for Primitives

z.coerce.string(): applies String(input)
z.coerce.number(): applies Number(input)
z.coerce.boolean(): applies Boolean(input)
z.coerce.date(): applies new Date(input)

Example:
const coercedNum = z.coerce.number().int().positive();
coercedNum.parse("42");    // 42 (number)

## Parsing Methods

.parse(data: unknown): T  // throws ZodError on invalid
.parseAsync(data: unknown): Promise<T>  // for async refinements
.safeParse(data: unknown): { success:true; data:T } | { success:false; error:ZodError }
.safeParseAsync(data: unknown): Promise< same shape >

## Schema Composition

- z.object(shape: Record<string, ZodType>)
  • .extend(fields)
  • .merge(other)
  • .pick({ key:true })
  • .omit({ key:true })
  • .partial(keys?)
  • .deepPartial()
  • .required(keys?)
  • .strict(), .passthrough(), .strip(), .catchall(zSchema)

- z.array(itemSchema)
  • .nonempty({ message?: string })
  • .min(count, { message? })
  • .max(count, { message? })
  • .length(count, { message? })

- z.tuple([schemas...]).rest(schema)
- z.union([schemas...]) / .or(otherSchema)
- z.discriminatedUnion(key, options[])
- z.record(keySchema, valueSchema)
- z.map(keySchema, valueSchema)
- z.set(itemSchema).nonempty()/min()/max()/size()
- z.intersection(A, B) / A.and(B)

## Refinements & Transforms

.refine(validator: (val:T)=>boolean, params?:{ message?:string; path?: (string|number)[] })
.transform(transformFn: (val:T)=>U)
.superRefine((val, ctx)=>{ ctx.addIssue({...}) })
.preprocess((input)=>any, targetSchema)
.pipe(otherSchema)

## Enums

- z.enum([value1,value2,...])  // returns ZodEnum
- z.nativeEnum(NativeEnumObject)
  • .enum property: mapping of keys to values
  • .options: readonly array of allowed values
  • .extract([...])/.exclude([...])

## Type Helpers

- z.optional(schema) or schema.optional()
- z.nullable(schema) or schema.nullable()

## Advanced

- z.lazy(() => schema) for recursive types
- z.ZodType<Output,Def,Input> for effects with explicit input/output
- z.function().args(...schemas).returns(schema).implement(fn)
- z.instanceof(Class)


## Troubleshooting

- Circular data detection: must preprocess or guard against cycles
- For promise schemas: parse returns Promise<T> and errors must be caught via .catch
- For boolean coercion: z.coerce.boolean() treats any truthy as true, falsy as false; use preprocess for custom logic


## Error Handling

Custom error messages:

z.string({ required_error:"Req", invalid_type_error:"Not string" })
z.string().min(5, { message:"Min length 5" })

.global config: none


## Attribution
- Source: zod
- URL: https://github.com/colinhacks/zod
- License: MIT License
- Crawl Date: 2025-05-11T01:24:26.995Z
- Data Size: 891173 bytes
- Links Found: 6089

## Retrieved
2025-05-11
