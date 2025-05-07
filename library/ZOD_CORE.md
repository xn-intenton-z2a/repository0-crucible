# ZOD_CORE

## Crawl Summary
Requirements: TS4.5+, strict mode. Install via npm/yarn/pnpm/bun, canary with @canary. Import z from "zod". Core constructors: z.string(), z.number(), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never(). Schemas: object, array, tuple, union, discriminatedUnion, record, map, set, enum, nativeEnum, lazy, function. Methods: .parse, .safeParse, .parseAsync, .safeParseAsync. Modifiers: optional, nullable, partial, deepPartial, required, array, nonempty, min, max, length, extend, merge, pick, omit, strict, passthrough, strip, catchall, brand, readonly, or, and, pipe. Transforms: .transform, .refine, .superRefine, z.preprocess, .default. Type inference: z.infer, z.input, z.output. Error customization via { message } and constructor params. Troubleshooting: try/catch or safeParse.

## Normalised Extract
Table of Contents:
1 Installation
2 Basic Usage
3 Core Schemas
4 Modifiers
5 Refinements & Transforms
6 Type Utilities
7 Error Handling

1 Installation
TypeScript 4.5+ with strict:true in tsconfig.json. Install zod: npm install zod (or yarn, pnpm, bun). Canary: zod@canary.

2 Basic Usage
import { z } from "zod". Create schemas and use parse/safeParse methods.

3 Core Schemas
z.string() z.number() z.bigint() z.boolean() z.date() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
4 container types
z.object({key:z.type}) z.array(z.type) z.tuple([...]) z.union([...]) z.discriminatedUnion("key", [...]) z.record(keySchema, valueSchema) z.map(k,v) z.set(v) z.enum(["A","B"]) z.nativeEnum(NativeEnum) z.lazy(()=>schema) z.function().args(...).returns(...)

4 Modifiers
.schema.optional() .nullable() .nullish() .array() .nonempty() .min(n) .max(n) .length(n) .partial() .deepPartial() .required() .extend({}) .merge(other) .pick({k:true}) .omit({k:true}) .strict() .passthrough() .strip() .catchall(schema) .brand() .readonly() .or() .and() .pipe()

5 Refinements & Transforms
.schema.transform(fn) .refine(fn,{message,path}) .superRefine((v,ctx)=>{}) z.preprocess(fn, schema) .default(value)

6 Type Utilities
type T = z.infer<typeof schema> type In = z.input<typeof schema> type Out = z.output<typeof schema>

7 Error Handling
schema.parse(data) throws ZodError with .errors array. Use schema.safeParse(data) to get result.success and result.data or result.error.


## Supplementary Details
Exact tsconfig.json snippet: {"compilerOptions":{"strict":true}}. CLI commands: npm install zod; yarn add zod; pnpm add zod; bun add zod. Canary builds: zod@canary. ensure TypeScript version>=4.5. Use import { z } from "zod". Default import path: "zod".
Use z.coerce.string(), z.coerce.number(), z.coerce.boolean(), z.coerce.bigint(), z.coerce.date() to coerce values using JS constructors. Boolean coercion: truthy->true, falsy->false.
Date coercion: new Date(input). validate invalid dates as failure.
String validations: .email(), .url(), .uuid(), .regex(regex), .datetime({offset?:boolean,local?:boolean,precision?:number}), .date(), .time({precision?:number}), .ip({version:"v4"|"v6"}), .cidr({version:"v4"|"v6"}).
Number validations: .gt(n), .gte(n), .lt(n), .lte(n), .int(), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(n), .finite(), .safe().
BigInt validations similar with n suffix. NaN schema: z.nan().
Enum: z.enum([...]) yields .options array and .enum object. .extract([...]) .exclude([...]).
NativeEnum: z.nativeEnum(MyEnum).
Object unknownKey policy: default strip, use .passthrough(), .strict(), .catchall(schema).
Array sizing: .min(count,{message}), .max(count), .length(count). .nonempty({message}).
Tuple: .rest(schema).
Record: key type must be string or number; runtime keys always string.
Map and Set size constraints: .nonempty(), .min(n), .max(n), .size(n).
Function schemas: .args(...schemas), .returns(schema), .implement(fn).
Preprocess: z.preprocess(fn, schema).fn returns preconverted data.
Custom schemas: z.custom<Type>((val)=>boolean,{message}).



## Reference Details
API: z.string(): ZodString
z.number(): ZodNumber
z.bigint(): ZodBigInt
z.boolean(): ZodBoolean
z.date(): ZodDate
z.undefined(): ZodUndefined
z.null(): ZodNull
z.void(): ZodVoid
z.any(): ZodAny
z.unknown(): ZodUnknown
z.never(): ZodNever
z.object<Shape extends ZodRawShape>(shape: Shape): ZodObject<Shape,UnknownKeys,Catchall>
z.array<T extends ZodTypeAny>(schema: T): ZodArray<T>
z.tuple<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: T): ZodTuple<T>
z.union<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: T): ZodUnion<T>
z.discriminatedUnion<Key extends string, Options extends ZodDiscriminatedUnionOption<Key>[]>(discriminator: Key, options: Options): ZodDiscriminatedUnion<Key,Options>
z.record<Key extends ZodTypeAny,Value extends ZodTypeAny>(keySchema: Key, valueSchema: Value): ZodRecord<Key,Value>
z.map<Key extends ZodTypeAny,Value extends ZodTypeAny>(keySchema: Key, valueSchema: Value): ZodMap<Key,Value>
z.set<Elem extends ZodTypeAny>(elementSchema: Elem): ZodSet<Elem>
z.enum<Arr extends [string,...string[]]>(values: Arr): ZodEnum<Arr>
z.nativeEnum<E extends object>(e: E): ZodNativeEnum<E>
z.lazy<T>(getter: ()=>ZodType<T>): ZodLazy<T>
z.function(): ZodFunction<Args,Return>

.parse(data: unknown): T
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: true; data: T } | { success: false; error: ZodError }
.safeParseAsync(data: unknown): Promise<{ success: true; data: T } | { success: false; error: ZodError }>

Modifiers:
.optional(): ZodOptional<...>
.nullable(): ZodNullable<...>
.nullish(): ZodOptional<ZodNullable<...>>
.default(def: T): ZodDefault<...>
.array(): ZodArray<...>
.nonempty(opts?:{message:string}): ZodNonEmptyArray<...>
.min(n:number, opts?:{message:string}): ZodArray<...>
.max(n:number, opts?:{message:string}): ZodArray<...>
.length(n:number, opts?:{message:string}): ZodArray<...>
.partial(props?:{ [K in keyof T]?: boolean }): ZodObject<...>
.deepPartial(): ZodObject<...>
.required(props?:{ [K in keyof T]?: boolean }): ZodObject<...>
.extend(shape: ZodRawShape): ZodObject<...>
.merge(other: ZodObject): ZodObject<...>
.pick(props: { [K in keyof T]?: boolean }): ZodObject<...>
.omit(props: { [K in keyof T]?: boolean }): ZodObject<...>
.strict(): ZodObject<...>
.passthrough(): ZodObject<...>
.strip(): ZodObject<...>
.catchall(schema: ZodTypeAny): ZodObject<...>
.brand<B extends string>(): ZodBranded<...>
.readonly(): ZodObject<...>
.or(other: ZodTypeAny): ZodUnion<[Self,Other]>
.and(other: ZodTypeAny): ZodIntersection<Self,Other>
.pipe(schema: ZodType): ZodPipeline<Self,Schema>

.refine(check: (data:T)=>boolean|Promise<boolean>, params?:{message?:string,path?:(string|number)[], }
.superRefine((data:T,ctx:RefinementCtx)=>void)
.transform<U>(fn:(arg:T)=>U|Promise<U>): ZodEffects<...>
.preprocess(fn:(val:any)=>any, schema:ZodTypeAny): ZodEffects<...>

z.coerce.string(): ZodString converts via String(input)
z.coerce.number(): ZodNumber via Number(input)
z.coerce.boolean(): ZodBoolean via Boolean(input)
z.coerce.bigint(): ZodBigInt via BigInt(input)
z.coerce.date(): ZodDate via new Date(input)

Error customization in constructors: z.string({required_error:string, invalid_type_error:string}); in methods: .min(n,{message}); .email({message}); etc.

Implementation Patterns:
1. Define schema
2. Use schema.parse(data) or safeParse
3. Handle errors
4. Chain refinements and transforms
5. Use z.infer for TS types

Best practices:
- Always enable TS strict mode
- Use safeParse in async contexts to avoid exceptions
- Use discriminatedUnion for tagged union performance

Troubleshooting:
Command: node -e "console.log(require('zod').z.string().parse(123))"
Expected: throws ZodError: Invalid type
Check error.errors for path and message arrays
Use .spa alias for safeParseAsync


## Information Dense Extract
TS4.5+,strict:true. npm install zod|yarn|pnpm|bun; canary via @canary. import {z} from "zod". Constructors: z.string(),z.number(),z.bigint(),z.boolean(),z.date(),z.undefined(),z.null(),z.void(),z.any(),z.unknown(),z.never(),z.object(shape),z.array(elem),z.tuple([...]),z.union([...])|.or(),z.discriminatedUnion(key,opts),z.record(keySchema,valueSchema),z.map(k,v),z.set(v),z.enum(values),z.nativeEnum(Enum),z.lazy(fn),z.function().args(...).returns(schema).modifiers: .optional(),.nullable(),.nullish(),.default(val),.array(),.nonempty({message}),.min(n),.max(n),.length(n),.partial(props),.deepPartial(),.required(props),.extend(shape),.merge(schema),.pick(fields),.omit(fields),.strict(),.passthrough(),.strip(),.catchall(schema),.brand(),.readonly(),.and(),.or(),.pipe(schema).transforms: .transform(fn),.refine(fn,{message,path}),.superRefine((v,ctx)),z.preprocess(fn,schema).coercion: z.coerce.string()|number()|boolean()|bigint()|date().parsing: .parse(data):T throws; .parseAsync(data):Promise<T>; .safeParse(data):result; .safeParseAsync(data):Promise<result>; usage pattern: define schema->parse/safeParse->handle. TS types: z.infer,z.input,z.output. Error customization via {required_error,invalid_type_error} and method {message}. Discriminated union performance: use key. Troubleshooting: inspect ZodError.errors. Use .spa alias.

## Sanitised Extract
Table of Contents:
1 Installation
2 Basic Usage
3 Core Schemas
4 Modifiers
5 Refinements & Transforms
6 Type Utilities
7 Error Handling

1 Installation
TypeScript 4.5+ with strict:true in tsconfig.json. Install zod: npm install zod (or yarn, pnpm, bun). Canary: zod@canary.

2 Basic Usage
import { z } from 'zod'. Create schemas and use parse/safeParse methods.

3 Core Schemas
z.string() z.number() z.bigint() z.boolean() z.date() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
4 container types
z.object({key:z.type}) z.array(z.type) z.tuple([...]) z.union([...]) z.discriminatedUnion('key', [...]) z.record(keySchema, valueSchema) z.map(k,v) z.set(v) z.enum(['A','B']) z.nativeEnum(NativeEnum) z.lazy(()=>schema) z.function().args(...).returns(...)

4 Modifiers
.schema.optional() .nullable() .nullish() .array() .nonempty() .min(n) .max(n) .length(n) .partial() .deepPartial() .required() .extend({}) .merge(other) .pick({k:true}) .omit({k:true}) .strict() .passthrough() .strip() .catchall(schema) .brand() .readonly() .or() .and() .pipe()

5 Refinements & Transforms
.schema.transform(fn) .refine(fn,{message,path}) .superRefine((v,ctx)=>{}) z.preprocess(fn, schema) .default(value)

6 Type Utilities
type T = z.infer<typeof schema> type In = z.input<typeof schema> type Out = z.output<typeof schema>

7 Error Handling
schema.parse(data) throws ZodError with .errors array. Use schema.safeParse(data) to get result.success and result.data or result.error.

## Original Source
Zod Schema Validation
https://github.com/colinhacks/zod#readme

## Digest of ZOD_CORE

# Installation

Requirements
TypeScript 4.5+ with strict mode enabled in tsconfig.json:

{
  "compilerOptions": {
    "strict": true
  }
}

Install from npm:

npm install zod
# or yarn add zod
# or pnpm add zod
# or bun add zod

Install canary builds with @canary suffix.

# Basic Usage

Import the library and define schemas:

import { z } from "zod";

Primitives:
z.string(), z.number(), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

Parsing methods:
.parse(data: unknown): T throws ZodError on failure
.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
.parseAsync(data: unknown): Promise<T>
.safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

# Core Schemas and Methods

Schema creation:
- Objects: z.object({ key: z.type(), ... })
- Arrays: z.array(z.elementType)
- Tuples: z.tuple([z.type1, z.type2, ...])
- Unions: z.union([z.typeA, z.typeB]) or z.typeA.or(z.typeB)
- Discriminated unions: z.discriminatedUnion("discriminatorKey", [ ... ])
- Records: z.record(keySchema, valueSchema)
- Maps: z.map(keySchema, valueSchema)
- Sets: z.set(elementSchema)
- Enums: z.enum(["A","B"]), z.nativeEnum(NativeEnum)
- Recursive types using z.lazy
- Function schemas: z.function().args(...).returns(...).implement(fn)

Modifiers:
- .optional(), .nullable(), .nullish()
- .partial(), .deepPartial(), .required()
- .array(), .element
- .nonempty(), .min(n), .max(n), .length(n)
- .extend({ ... }), .merge(otherSchema)
- .pick({ key:true }), .omit({ key:true })
- .strict(), .passthrough(), .strip(), .catchall(schema)
- .brand(), .readonly(), .or(), .and(), .pipe()

Transformations and refinements:
- .transform(transformFn)
- .refine(predicateFn, { message, path?, params? })
- .superRefine((value, ctx)=>{})
- z.preprocess(preFn, schema)
- .default(value)

Type utilities:
- z.infer<typeof Schema>
- z.input<typeof Schema>
- z.output<typeof Schema>

Error customization:
- Custom messages in constructor: z.string({ required_error, invalid_type_error })
- Custom messages in methods: .min(n, { message })

# Error Handling and Troubleshooting

Catch and inspect errors:

try {
  schema.parse(data)
} catch (e) {
  if (e instanceof ZodError) {
    console.error(e.errors)
  }
}

Use safeParse to avoid exceptions.

# TypeScript Inference

All schemas infer type automatically:

type DataType = z.infer<typeof schema>

## Attribution
- Source: Zod Schema Validation
- URL: https://github.com/colinhacks/zod#readme
- License: MIT License
- Crawl Date: 2025-05-07T15:30:46.452Z
- Data Size: 1032521 bytes
- Links Found: 6618

## Retrieved
2025-05-07
