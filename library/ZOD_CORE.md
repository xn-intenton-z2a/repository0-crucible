# ZOD_CORE

## Crawl Summary
Installation requirements: TypeScript 4.5+, strict mode in tsconfig. Install zod via npm, yarn, pnpm, bun. Import z from 'zod'. Core schema types: string, number, bigint, boolean, date, literal. Methods: min, max, email, url, regex, int, positive, nonnegative. Coercion via z.coerce. Object: shape, extend, merge, pick, omit, partial, required, strict, passthrough, catchall. Array: min, max, nonempty, element. Tuple: fixed length, rest. Unions: union, or, discriminatedUnion. Intersection: and, merge. Refinements: refine, superRefine, transform, preprocess. Parsing: parse, safeParse, parseAsync, safeParseAsync. Type inference via z.infer.

## Normalised Extract
Table of Contents
1 Installation
2 Basic Usage
3 Primitives
4 Objects
5 Arrays & Tuples
6 Unions & Intersections
7 Refinements & Transforms
8 Parsing Methods

1 Installation
TypeScript >=4.5 with strict:true in tsconfig
npm install zod

2 Basic Usage
import { z } from "zod"

3 Primitives
z.string()
  .min( length, { message } )
  .max( length, { message } )
  .email( { message } )

z.number()
  .min( value, { message } )
  .max( value, { message } )
  .int()
  .positive()

z.boolean()
z.bigint()
z.date()

Coercion: z.coerce.string(), z.coerce.number(), z.coerce.date(), z.coerce.boolean(), z.coerce.bigint()

4 Objects
z.object({ key: schema, ... })
  .extend({ newKey: schema })
  .merge( otherObject )
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key:true })
  .required({ key:true })
  .strict()
  .passthrough()
  .catchall( schema )

5 Arrays & Tuples
z.array( schema )
  .min( count, { message } )
  .max( count, { message } )
  .nonempty({ message })

z.tuple( [ schema1, schema2, ... ] )
  .rest( schema )

6 Unions & Intersections
z.union( [ schemaA, schemaB ] )
schemaA.or( schemaB )

z.discriminatedUnion( "key", [objA, objB] )
z.intersection( schemaA, schemaB )

7 Refinements & Transforms
schema.refine( fn(data)=>boolean, { message } )
schema.superRefine( (data, ctx)=>void )
schema.transform( fn(data)=>U )
schema.preprocess( fn(input)=>any, schema )

8 Parsing Methods
schema.parse( input ) -> T
schema.safeParse( input ) -> { success, data?, error? }
schema.parseAsync( input ) -> Promise<T>
schema.safeParseAsync( input ) -> Promise<result>


## Supplementary Details
Configuration
- tsconfig.json: strict true

Installation steps
1 Ensure TypeScript>=4.5 installed
2 Add zod via package manager
3 Import from 'zod'

Implementation steps
1 Define schemas using z.<type>()
2 Chain validations and transforms
3 Call parse or safeParse
4 Use z.infer<typeof schema> for TypeScript types


## Reference Details
API Specifications

z.string(): ZodString
  methods:
    min(min: number, params?: { message?: string }): ZodString
    max(max: number, params?: { message?: string }): ZodString
    email(params?: { message?: string }): ZodString
    url(params?: { message?: string }): ZodString
    regex(pattern: RegExp, params?: { message?: string }): ZodString

z.number(): ZodNumber
  methods:
    min(min: number, params?: { message?: string }): ZodNumber
    max(max: number, params?: { message?: string }): ZodNumber
    int(): ZodNumber
    positive(): ZodNumber
    nonnegative(): ZodNumber
    finite(): ZodNumber
    safe(): ZodNumber

z.boolean(): ZodBoolean
z.bigint(): ZodBigInt
z.date(): ZodDate

z.literal(value: any): ZodLiteral

z.array(item: ZodType): ZodArray
  min(length: number, params?: { message?: string })
  max(length: number, params?: { message?: string })
  nonempty(params?: { message?: string })

z.tuple(items: ZodType[]): ZodTuple
  rest(item: ZodType): ZodTuple

z.object(shape: Record<string,ZodType>): ZodObject
  extend(shape): ZodObject
  merge(other: ZodObject): ZodObject
  pick(keys: Record<string,true>): ZodObject
  omit(keys: Record<string,true>): ZodObject
  partial(keys?: Record<string,true>): ZodObject
  required(keys?: Record<string,true>): ZodObject
  strict(): ZodObject
  passthrough(): ZodObject
  catchall(schema: ZodType): ZodObject

z.union(options: ZodType[]): ZodUnion
z.discriminatedUnion(key: string, options: ZodObject[]): ZodDiscriminatedUnion
z.intersection(typeA: ZodType, typeB: ZodType): ZodIntersection

Refinement & Transform
schema.refine(check: (data)=>boolean, params?: { message?: string }): ZodType
schema.superRefine((data, ctx)=>void): ZodType
schema.transform(fn: (data)=>U): ZodEffects
schema.preprocess(fn: (input)=>any, schema: ZodType): ZodEffects

Parsing
schema.parse(input: unknown): T throws ZodError
schema.safeParse(input: unknown): { success: true; data: T } | { success: false; error: ZodError }
schema.parseAsync(input): Promise<T>
schema.safeParseAsync(input): Promise<...>

Best Practices
- Always use strict mode in tsconfig
- Use safeParse in user input contexts
- Use discriminatedUnion for tagged unions
- Use z.coerce for primitive coercion

Troubleshooting
Command: schema.parse(value)
Expected: returns typed value or throws ZodError
If error.path incorrect, use refine or superRefine to customize issue.path


## Information Dense Extract
TypeScript >=4.5 strict:true. npm install zod. import { z } from 'zod'. Primitives: z.string().min(n,msg).max(n,msg).email(msg).url(msg); z.number().min(n,msg).max(n,msg).int().positive().nonnegative().finite().safe(); z.boolean(); z.bigint(); z.date(); Literal: z.literal(val). Coercion: z.coerce.string(),number(),boolean(),date(),bigint(). Arrays: z.array(schema).min(n,msg).max(n,msg).nonempty(msg). element property holds item schema. Tuples: z.tuple([...]).rest(schema). Objects: z.object(shape).extend(shape).merge(obj).pick(keys).omit(keys).partial(keys).required(keys).strict().passthrough().catchall(schema). Unions: z.union([a,b]) or a.or(b); z.discriminatedUnion(key,opts). Intersection: z.intersection(a,b). Refinements: schema.refine(fn,msg).superRefine(fn). Transforms: schema.transform(fn).preprocess(fn,schema). Parsing: parse(input)->T throws ZodError; safeParse(input)->result; parseAsync and safeParseAsync. Type inference: z.infer<typeof schema>.

## Sanitised Extract
Table of Contents
1 Installation
2 Basic Usage
3 Primitives
4 Objects
5 Arrays & Tuples
6 Unions & Intersections
7 Refinements & Transforms
8 Parsing Methods

1 Installation
TypeScript >=4.5 with strict:true in tsconfig
npm install zod

2 Basic Usage
import { z } from 'zod'

3 Primitives
z.string()
  .min( length, { message } )
  .max( length, { message } )
  .email( { message } )

z.number()
  .min( value, { message } )
  .max( value, { message } )
  .int()
  .positive()

z.boolean()
z.bigint()
z.date()

Coercion: z.coerce.string(), z.coerce.number(), z.coerce.date(), z.coerce.boolean(), z.coerce.bigint()

4 Objects
z.object({ key: schema, ... })
  .extend({ newKey: schema })
  .merge( otherObject )
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key:true })
  .required({ key:true })
  .strict()
  .passthrough()
  .catchall( schema )

5 Arrays & Tuples
z.array( schema )
  .min( count, { message } )
  .max( count, { message } )
  .nonempty({ message })

z.tuple( [ schema1, schema2, ... ] )
  .rest( schema )

6 Unions & Intersections
z.union( [ schemaA, schemaB ] )
schemaA.or( schemaB )

z.discriminatedUnion( 'key', [objA, objB] )
z.intersection( schemaA, schemaB )

7 Refinements & Transforms
schema.refine( fn(data)=>boolean, { message } )
schema.superRefine( (data, ctx)=>void )
schema.transform( fn(data)=>U )
schema.preprocess( fn(input)=>any, schema )

8 Parsing Methods
schema.parse( input ) -> T
schema.safeParse( input ) -> { success, data?, error? }
schema.parseAsync( input ) -> Promise<T>
schema.safeParseAsync( input ) -> Promise<result>

## Original Source
zod
https://github.com/colinhacks/zod

## Digest of ZOD_CORE

# Installation

Requirements

TypeScript 4.5+ and tsconfig.json with strict mode enabled:

{
  "compilerOptions": {
    "strict": true
  }
}

Install from npm:

npm install zod       # npm
yarn add zod          # yarn
pnpm add zod          # pnpm
bun add zod           # bun

Alternate canary:

npm install zod@canary

# Basic Usage

Import and define schemas:

import { z } from "zod";

// Primitive schema
const myString = z.string();
myString.parse("text"); // returns string
myString.safeParse(123);  // returns { success: false; error: ZodError }

// Object schema
const User = z.object({
  id: z.string(),
  age: z.number().int().nonnegative()
});
type User = z.infer<typeof User>;
User.parse({ id: "u1", age: 30 });

# Schema Types and Methods

## Primitives

z.string()
  .min(length: number, params?: { message?: string }): ZodString
  .max(length: number, params?: { message?: string }): ZodString
  .email(params?: { message?: string }): ZodString
  .url(params?: { message?: string }): ZodString

z.number()
  .min(value: number, params?: { message?: string }): ZodNumber
  .max(value: number, params?: { message?: string }): ZodNumber
  .int(): ZodNumber
  .positive(): ZodNumber
  .nonnegative(): ZodNumber

z.boolean(), z.bigint(), z.date()

All primitives support coercion via z.coerce.method():
  z.coerce.string(), z.coerce.number(), z.coerce.date(), z.coerce.boolean(), z.coerce.bigint()

## Literal

z.literal(value: string | number | boolean | symbol): ZodLiteral

## Arrays and Tuples

z.array(itemSchema)
  .min(length: number, params?: { message?: string }): ZodArray
  .max(length: number, params?: { message?: string }): ZodArray
  .nonempty(params?: { message?: string }): ZodArray

z.tuple([schema1, schema2, ...])
  .rest(schema): ZodTuple

## Objects

z.object(shape: Record<string, ZodType>)
  .extend(shapeExtension)
  .merge(otherObject)
  .pick(keys)
  .omit(keys)
  .partial(keys?)
  .required(keys?)
  .strict()
  .passthrough()
  .catchall(schema)

## Unions and Intersections

z.union([schemaA, schemaB]) or schemaA.or(schemaB)
z.discriminatedUnion(discriminatorKey: string, options: ZodObject[])
z.intersection(schemaA, schemaB)

## Refinements and Transforms

.refine(validator: (data)=>boolean, params?: { message?: string }): ZodType
.superRefine((data, ctx)=>void)
.transform(transformFn: (data)=>U): ZodEffects
.preprocess(preprocessFn: (input)=>any, schema: ZodType)

## Parsing

schema.parse(input: unknown): T throws ZodError
schema.safeParse(input: unknown): { success: true; data: T } | { success: false; error: ZodError }
schema.parseAsync(input): Promise<T>
schema.safeParseAsync(input): Promise<...>


## Attribution
- Source: zod
- URL: https://github.com/colinhacks/zod
- License: MIT License
- Crawl Date: 2025-05-11T03:35:35.354Z
- Data Size: 800061 bytes
- Links Found: 5356

## Retrieved
2025-05-11
