# ZOD_REFERENCE

## Crawl Summary
Core constructors: z.string(), z.number(), z.object({...}), z.array(), z.enum([...]), z.nativeEnum(...), z.union([...]), z.discriminatedUnion(key, schemas), z.intersection(a,b), z.tuple([...]), z.record(keyType,valueType), z.map(...), z.set(...), z.instanceof(), z.function(). Methods: .parse/.parseAsync, .safeParse/.safeParseAsync, .refine, .superRefine, .transform, .default, .nullable/.nullish, .optional, .catch, .brand, .pipe, .args, .returns, .implement, .parameters, .returnType. String validations: .min, .max, .length, .email, .url, .regex, .includes, .startsWith, .endsWith, .datetime({offset,local,precision}), .date, .time, .ip({version}), .cidr({version}). Number: .min/.max/.int/.positive/.multipleOf/.finite/.safe. BigInt same. Date: z.date(), z.coerce.date(). Object methods: .shape, .extend, .merge, .pick, .omit, .partial, .deepPartial, .required, .passthrough, .strict, .strip, .catchall, .keyof. Array: .min/.max/.length/.nonempty. Tuple .rest. Coercion: z.coerce primitives. Error customization. specific TS inference patterns: z.infer, z.input, z.output. Recursive: z.lazy. Function schemas. Best practices: strict mode, safeParse, discriminatedUnion. Data retrieved on 2024-06-19.

## Normalised Extract
Table of Contents
1  Installation
2  Core Schema Constructors
3  Parsing & Safe Parsing Methods
4  String Validations
5  Number & BigInt Validations
6  Object Schema Methods
7  Array & Tuple Methods
8  Composite Types: Union, Intersection, Discriminated Union
9  Utility Types: Record, Map, Set, Lazy, Instanceof
10 Function Schemas
11 Refinements & Transforms
12 Coercion Shortcuts

1  Installation
Requirements: TS >=4.5, tsconfig.json { compilerOptions: { strict: true }}
npm install zod

2  Core Schema Constructors
z.string(): ZodString
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

3  Parsing & Safe Parsing Methods
.parse(data: unknown): T throws ZodError
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: boolean; data?:T; error?:ZodError}
.safeParseAsync(data: unknown): Promise<{ success:boolean; data?:T; error?:ZodError}>

4  String Validations
.string()
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .email({ message? })
  .url({ message? })
  .regex(RegExp, { message? })
  .includes(str, { message? })
  .startsWith(prefix, { message? })
  .endsWith(suffix, { message? })
  .datetime({ offset?:boolean; local?:boolean; precision?:number; message?:string })
  .date({ message? })
  .time({ precision?:number; message?:string })
  .ip({ version?:"v4"|"v6"; message?:string })
  .cidr({ version?:"v4"|"v6"; message?:string })
  .trim()
  .toLowerCase()
  .toUpperCase()

5  Number & BigInt Validations
.number()
  .min(val, { message? }) alias .gte
  .max(val, { message? }) alias .lte
  .int({ message? })
  .positive({ message? })
  .nonnegative({ message? })
  .negative({ message? })
  .nonpositive({ message? })
  .multipleOf(val, { message? })
  .finite({ message? })
  .safe({ message? })
.bigint() similar: .min/.max/.positive/.negative/.multipleOf

6  Object Schema Methods
.object({ key: schema, ... })
  .shape
  .extend({ additionalKey: schema, ... })
  .merge(otherZodObject)
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key?:true, ... })
  .deepPartial()
  .required({ key?:true, ... })
  .strict()
  .passthrough()
  .strip()
  .catchall(schema)
  .keyof()

7  Array & Tuple Methods
.array(itemSchema)
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .nonempty({ message? })
.element property

.tuple([schema1, schema2, ...])
  .rest(itemSchema)

8  Composite Types
.z.union([schema1, schema2, ...])
  .or(otherSchema)
.z.discriminatedUnion(discriminatorKey, [objectSchemas])
.z.intersection(schemaA, schemaB)

9  Utility Types
.z.record(keySchema, valueSchema)
.z.map(keySchema, valueSchema)
.z.set(itemSchema)
  .min/.max/.size/.nonempty
.z.lazy(() => schema)
.z.instanceof(ClassConstructor)

10 Function Schemas
.z.function()
  .args(...argSchemas)
  .returns(returnSchema)
  .implement((...args)=> returnValue)
  .parameters()
  .returnType()

11 Refinements & Transforms
.refine(validatorFn, { message?, path?, params? })
.superRefine((data, ctx)=> void)
.transform(transformFn)
.default(valueOrFn)
.nullable()
.nullish()
.optional()
.catch(errorHandler)
.brand<BrandName>()
.pipe(targetSchema)

12 Coercion Shortcuts
z.coerce.string()
z.coerce.number()
z.coerce.boolean()
z.coerce.bigint()
z.coerce.date()


## Supplementary Details
Installation
tsc --version >= 4.5
Add to tsconfig.json: { compilerOptions: { strict: true }}

Strict mode enables accurate z.infer and z.input/z.output inference.

Error customization
z.string({ required_error: 'X required', invalid_type_error: 'X must be string' })
z.number({ required_error: 'Y required', invalid_type_error: 'Y must be number' })

Custom error messages
ez.string().min(5, { message: 'Min length 5' })

Coercion with z.preprocess
const dated = z.preprocess(val=> new Date(val as string), z.date())

Recursive schema
const Base = z.object({ name: z.string() })
type Node = { name: string; children: Node[] }
const NodeSchema: z.ZodType<Node> = Base.extend({ children: z.lazy(()=> NodeSchema.array()) })

JSON type
const Literal = z.union([z.string(),z.number(),z.boolean(),z.null()])
type Json = Literal | Json[] | Record<string,Json>
const JsonSchema: z.ZodType<Json> = z.lazy(()=> z.union([Literal, JsonSchema.array(), z.record(JsonSchema)]))


## Reference Details
// Full Code Examples and Patterns

1. Installing and Importing
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "CommonJS"
  }
}

npm install zod

import { z, ZodError } from 'zod'

2. Parsing Patterns
// throws on invalid
try {
  const result = z.string().min(3).parse(input)
} catch (err) {
  if (err instanceof ZodError) {
    console.error(err.issues)
  }
}
// safe parsing
const parseResult = z.number().positive().safeParse(maybeNum)
if (!parseResult.success) {
  console.error(parseResult.error.issues)
} else {
  const num = parseResult.data
}

3. Object Composition
const Address = z.object({ street: z.string(), zip: z.string().length(5) })
const User = z.object({ name: z.string(), age: z.number().int().nonnegative(), address: Address })
type User = z.infer<typeof User>

User.parse({ name: 'Alice', age: 30, address: { street: 'Main', zip: '12345' } })

4. Discriminated Unions
const Success = z.object({ status: z.literal('success'), data: z.string() })
const Failure = z.object({ status: z.literal('failure'), error: z.string() })
const Response = z.discriminatedUnion('status', [Success, Failure])

Response.parse({ status: 'success', data: 'ok' }) // pass
Response.parse({ status: 'failure', error: 'bad' }) // pass

5. Function Schema Implementation
const Multiply = z.function().args(z.number(), z.number()).returns(z.number()).implement((a, b) => a * b)
const product = Multiply(2, 3) // 6

6. Configuration Options Reference

// z.string()
.min: minimum length (number)
.max: maximum length (number)
.email: validate format
.url: validate URL
.datetime: options: { offset:boolean, local:boolean, precision:number }

// z.number()
.min: minimum value
.max: maximum value
.int: integer only
.positive, .nonnegative, .negative, .nonpositive
.multipleOf: divisor

7. Troubleshooting

Command: tsc --noEmit
Expected: No errors; ensures Zod types align with TS types.

Runtime: node dist/app.js
If ZodError issues reference unexpected path, enable debug with ZodError.format()

Memory: For large schemas use .strict() to trim unneeded keys and reduce object size.


## Information Dense Extract
zod v4 API: constructors string,number,bigint,boolean,date,undefined,null,void,any,unknown,never. parser methods parse/parseAsync, safeParse/safeParseAsync. string validations min,max,length,email,url,regex,includes,startsWith,endsWith,datetime({offset,local,precision}),date,time(ip,version),cidr. number validations min/gte,max/lte,int,positive,nonnegative,negative,nonpositive,multipleOf,finite,safe. object methods shape,extend,merge,pick,omit,partial,deepPartial,required,strict,passthrough,strip,catchall,keyof. arrays min,max,length,nonempty; tuples rest. composite: union/or,discriminatedUnion,key,intersection. utils: record,map,set(restraints),lazy,instanceof,function args/returns/implement/parameters/returnType. refinements refine,superRefine; transforms transform; preprocess; defaults default; nullability nullable,nullish,optional; catch; brand; pipe. coercion z.coerce.{string,number,boolean,bigint,date}. infers: z.infer, z.input, z.output. error customization required_error,invalid_type_error. best practices: TS strict mode, safeParse for inputs, discriminatedUnion for unions, z.preprocess or pipe for advanced coercion.

## Sanitised Extract
Table of Contents
1  Installation
2  Core Schema Constructors
3  Parsing & Safe Parsing Methods
4  String Validations
5  Number & BigInt Validations
6  Object Schema Methods
7  Array & Tuple Methods
8  Composite Types: Union, Intersection, Discriminated Union
9  Utility Types: Record, Map, Set, Lazy, Instanceof
10 Function Schemas
11 Refinements & Transforms
12 Coercion Shortcuts

1  Installation
Requirements: TS >=4.5, tsconfig.json { compilerOptions: { strict: true }}
npm install zod

2  Core Schema Constructors
z.string(): ZodString
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

3  Parsing & Safe Parsing Methods
.parse(data: unknown): T throws ZodError
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: boolean; data?:T; error?:ZodError}
.safeParseAsync(data: unknown): Promise<{ success:boolean; data?:T; error?:ZodError}>

4  String Validations
.string()
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .email({ message? })
  .url({ message? })
  .regex(RegExp, { message? })
  .includes(str, { message? })
  .startsWith(prefix, { message? })
  .endsWith(suffix, { message? })
  .datetime({ offset?:boolean; local?:boolean; precision?:number; message?:string })
  .date({ message? })
  .time({ precision?:number; message?:string })
  .ip({ version?:'v4'|'v6'; message?:string })
  .cidr({ version?:'v4'|'v6'; message?:string })
  .trim()
  .toLowerCase()
  .toUpperCase()

5  Number & BigInt Validations
.number()
  .min(val, { message? }) alias .gte
  .max(val, { message? }) alias .lte
  .int({ message? })
  .positive({ message? })
  .nonnegative({ message? })
  .negative({ message? })
  .nonpositive({ message? })
  .multipleOf(val, { message? })
  .finite({ message? })
  .safe({ message? })
.bigint() similar: .min/.max/.positive/.negative/.multipleOf

6  Object Schema Methods
.object({ key: schema, ... })
  .shape
  .extend({ additionalKey: schema, ... })
  .merge(otherZodObject)
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key?:true, ... })
  .deepPartial()
  .required({ key?:true, ... })
  .strict()
  .passthrough()
  .strip()
  .catchall(schema)
  .keyof()

7  Array & Tuple Methods
.array(itemSchema)
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .nonempty({ message? })
.element property

.tuple([schema1, schema2, ...])
  .rest(itemSchema)

8  Composite Types
.z.union([schema1, schema2, ...])
  .or(otherSchema)
.z.discriminatedUnion(discriminatorKey, [objectSchemas])
.z.intersection(schemaA, schemaB)

9  Utility Types
.z.record(keySchema, valueSchema)
.z.map(keySchema, valueSchema)
.z.set(itemSchema)
  .min/.max/.size/.nonempty
.z.lazy(() => schema)
.z.instanceof(ClassConstructor)

10 Function Schemas
.z.function()
  .args(...argSchemas)
  .returns(returnSchema)
  .implement((...args)=> returnValue)
  .parameters()
  .returnType()

11 Refinements & Transforms
.refine(validatorFn, { message?, path?, params? })
.superRefine((data, ctx)=> void)
.transform(transformFn)
.default(valueOrFn)
.nullable()
.nullish()
.optional()
.catch(errorHandler)
.brand<BrandName>()
.pipe(targetSchema)

12 Coercion Shortcuts
z.coerce.string()
z.coerce.number()
z.coerce.boolean()
z.coerce.bigint()
z.coerce.date()

## Original Source
Zod
https://github.com/colinhacks/zod

## Digest of ZOD_REFERENCE

# Zod API Specifications and Usage (Retrieved 2024-06-19)

## 1. Installation and Setup
• Requirements: TypeScript >=4.5 with "strict": true in tsconfig.json (compilerOptions.strict = true)
• Install: npm install zod | yarn add zod | pnpm add zod | bun add zod
• Canary: npm install zod@canary | yarn add zod@canary | pnpm add zod@canary | bun add zod@canary

## 2. Core Methods and Signatures
### 2.1 Schema Constructors
• z.string(): ZodString
• z.number(): ZodNumber
• z.bigint(): ZodBigInt
• z.boolean(): ZodBoolean
• z.date(): ZodDate
• z.undefined(): ZodUndefined
• z.null(): ZodNull
• z.void(): ZodVoid
• z.any(): ZodAny
• z.unknown(): ZodUnknown
• z.never(): ZodNever

### 2.2 Parsing and Safe Parsing
• parse(input: unknown): T throws ZodError
• parseAsync(input: unknown): Promise<T>
• safeParse(input: unknown): { success: boolean; data?: T; error?: ZodError }
• safeParseAsync(input: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

## 3. String Validations and Transformations
• Methods and signatures:
  - .min(min: number, opts?: { message: string }): ZodString
  - .max(max: number, opts?: { message: string }): ZodString
  - .length(len: number, opts?: { message: string }): ZodString
  - .email(opts?: { message: string }): ZodString
  - .url(opts?: { message: string }): ZodString
  - .regex(pattern: RegExp, opts?: { message: string }): ZodString
  - .includes(substr: string, opts?: { message: string }): ZodString
  - .startsWith(prefix: string, opts?: { message: string }): ZodString
  - .endsWith(suffix: string, opts?: { message: string }): ZodString
  - .datetime(opts?: { offset?: boolean; local?: boolean; precision?: number; message?: string }): ZodString
  - .date(opts?: { message: string }): ZodString
  - .time(opts?: { precision?: number; message?: string }): ZodString
  - .ip(opts?: { version?: "v4" | "v6"; message?: string }): ZodString
  - .cidr(opts?: { version?: "v4" | "v6"; message?: string }): ZodString
  - .trim(): ZodString
  - .toLowerCase(): ZodString
  - .toUpperCase(): ZodString

## 4. Number and BigInt Validations
• z.number(): ZodNumber
  - .min(val: number, opts?: { message: string }) alias .gte
  - .max(val: number, opts?: { message: string }) alias .lte
  - .int(opts?: { message: string }): ZodNumber
  - .positive(opts?: { message: string }): ZodNumber
  - .nonnegative(opts?: { message: string }): ZodNumber
  - .negative(opts?: { message: string }): ZodNumber
  - .nonpositive(opts?: { message: string }): ZodNumber
  - .multipleOf(val: number, opts?: { message: string }): ZodNumber
  - .finite(opts?: { message: string }): ZodNumber
  - .safe(opts?: { message: string }): ZodNumber
• z.bigint(): ZodBigInt with .min/.max/.positive/.negative/.multipleOf

## 5. Object and Utility Methods
• z.object(shape: Record<string, ZodType>): ZodObject
  - .shape: Record access
  - .extend(ext: Record<string, ZodType>): ZodObject
  - .merge(other: ZodObject): ZodObject
  - .pick(keys: Record<string, boolean>): ZodObject
  - .omit(keys: Record<string, boolean>): ZodObject
  - .partial(keys?: Record<string, boolean>): ZodObject
  - .deepPartial(): ZodObject
  - .required(keys?: Record<string, boolean>): ZodObject
  - .strict(): ZodObject
  - .passthrough(): ZodObject
  - .strip(): ZodObject
  - .catchall(schema: ZodType): ZodObject
  - .keyof(): ZodEnum

• Arrays: z.array(item: ZodType): ZodArray
  - .min(n: number, opts?: { message:string }): ZodArray
  - .max(n: number, opts?: { message:string }): ZodArray
  - .length(n: number, opts?: { message:string }): ZodArray
  - .nonempty(opts?: { message:string }): ZodArray

• z.tuple(items: ZodType[]): ZodTuple
  - .rest(item: ZodType): ZodTuple

• z.union(options: ZodType[]): ZodUnion
  - .or(other: ZodType): ZodUnion
• z.discriminatedUnion(key: string, options: ZodObject[]): ZodUnion
• z.intersection(a: ZodType, b: ZodType): ZodIntersection
• z.record(keyType: ZodType, valueType: ZodType): ZodRecord
• z.map(keyType: ZodType, valueType: ZodType): ZodMap
• z.set(item: ZodType): ZodSet
  - .min/.max/.size/.nonempty
• z.lazy(fn: ()=>ZodType): ZodType
• z.instanceof(classRef: new (...args:any)=> any): ZodType
• z.function(): ZodFunction
  - .args(...args: ZodType[]): ZodFunction
  - .returns(returnType: ZodType): ZodFunction
  - .implement(fn: (...args:any[])=> any): (...args:any[])=> any
  - .parameters(): ZodTuple
  - .returnType(): ZodType

## 6. Refinements, Transforms, Preprocessing
• .refine(validator: (data:T)=> boolean|Promise<boolean>, opts?: { message?: string; path?: (string|number)[]; params?: any }): ZodType
• .superRefine((data, ctx)=> void): ZodType
• .transform(transformer: (data:T)=> any|Promise<any>): ZodType
• .default(def: T|(()=>T)): ZodType
• .nullable(): ZodType
• .nullish(): ZodType
• .optional(): ZodType
• .catch(handler: (err: ZodError)=> T): ZodType
• .brand<U extends string>(): ZodBrandedType
• .pipe(target: ZodType): ZodType

## 7. Coercion Shortcuts
• z.coerce.string(): String(input)
• z.coerce.number(): Number(input)
• z.coerce.boolean(): Boolean(input)
• z.coerce.bigint(): BigInt(input)
• z.coerce.date(): new Date(input)

## 8. Error Handling
• ZodError.issues: { path: (string|number)[]; message: string; code: string }[]
• customize required_error and invalid_type_error in constructors

## 9. Best Practices & Troubleshooting
• Always enable strict TypeScript mode
• Use safeParse in user input contexts
• For complex coercion use z.preprocess or z.pipe
• For discriminated unions prefer z.discriminatedUnion over z.union



## Attribution
- Source: Zod
- URL: https://github.com/colinhacks/zod
- License: MIT License
- Crawl Date: 2025-05-11T04:35:14.753Z
- Data Size: 896451 bytes
- Links Found: 6108

## Retrieved
2025-05-11
