# ZOD_SCHEMA

## Crawl Summary
TypeScript-first schema validation. Requires TS 4.5+, strict mode. Install via npm/yarn/deno/bun/pnpm. Primitives: z.string(), z.number(), z.boolean(), z.bigint(), z.date(), z.symbol(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never(). Coercion: z.coerce.string(), number(), boolean(), bigint(), date(). Literal schemas via z.literal(value). String validations: max, min, length, email, url, regex, datetime({offset,local,precision}), date(), time({precision}), ip({version}), cidr({version}). Number & bigint validations: gt, gte, lt, lte, int, positive, nonnegative, negative, nonpositive, multipleOf, finite, safe. Objects: object(), .shape, .keyof, extend, merge, pick, omit, partial, deepPartial, required, passthrough, strict, strip, catchall. Arrays: array(), .element, nonempty, min, max, length. Tuples, sets, maps, records. Unions (.or, .union), discriminatedUnion(key, schemas), intersections (.and). Recursive with z.lazy. Effects: refine, superRefine, transform, default, catch, optional, nullable, nullish, array, promise, or, and, brand, readonly, pipe, describe. Parsing: parse, parseAsync, safeParse, safeParseAsync, spa alias. Functions: function().args(...).returns().implement(), parameters(), returnType(). Preprocess: z.preprocess(fn, schema). Custom: z.custom<T>(...).

## Normalised Extract
Table of Contents
1 Installation  2 Primitives & Coercion  3 String Schema Methods  4 Number & BigInt Schema Methods  5 Object Schema Methods  6 Collections: Arrays, Tuples, Sets, Maps, Records  7 Union, Discriminated Union, Intersection  8 Recursive Types & Lazy  9 Effects: refine, superRefine, transform  10 Parsers: parse, safeParse, parseAsync  11 Function Schemas  12 Preprocess & Custom

1 Installation
Requirements  TypeScript>=4.5; tsconfig.json { compilerOptions:{ strict:true } }
Commands  npm install zod; yarn add zod; bun add zod; deno add npm:zod; pnpm add zod; use @canary tag for canary builds

2 Primitives & Coercion
z.string() z.number() z.bigint() z.boolean() z.date() z.symbol() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
z.coerce.string()  applies String(input)
z.coerce.number()  applies Number(input)
z.coerce.boolean() applies Boolean(input)
z.coerce.bigint()  applies BigInt(input)
z.coerce.date()    applies new Date(input)
z.literal(value)

3 String Schema Methods
.string().max(max:number, opts?) .min(min:number, opts?) .length(len:number, opts?) .email(opts?) .url(opts?) .regex(reg:RegExp, opts?) .datetime({ offset?:boolean, local?:boolean, precision?:number }, opts?) .date(opts?) .time({ precision?:number }, opts?) .ip({ version?:"v4"|"v6" }, opts?) .cidr({ version?:"v4"|"v6" }, opts?)
t.c. .trim() .toLowerCase() .toUpperCase()

4 Number & BigInt Schema Methods
.number().gt(num:number, opts?) .gte(num:number, opts?) .lt(num:number, opts?) .lte(num:number, opts?) .int(opts?) .positive(opts?) .nonnegative(opts?) .negative(opts?) .nonpositive(opts?) .multipleOf(step:number, opts?) .finite(opts?) .safe(opts?)
.bigint() counterpart methods with bigint

5 Object Schema Methods
.object({key:schema,...})
.shape  .keyof() .extend({key:schema}) .merge(otherObj) .pick({key:true}) .omit({key:true}) .partial(keys?) .deepPartial() .required(keys?) .passthrough() .strict() .strip() .catchall(schema)

6 Collections: Arrays, Tuples, Sets, Maps, Records
.array(itemSchema)
.element  .nonempty(opts?) .min(n,opts?) .max(n,opts?) .length(n,opts?)
.tuple([schemas...]).rest(restSchema?)
.set(itemSchema).nonempty().min(n).max(n).size(n)
.map(keySchema,valueSchema)
.record(keySchema,valueSchema)

7 Union, Discriminated Union, Intersection
.union([schemas...])  .or(otherSchema)
.discriminatedUnion("key", [objSchemas...]).options
.intersection(schemaA,schemaB)

8 Recursive Types & Lazy
.z.lazy(() => schemaRef)

9 Effects: refine, superRefine, transform
.refine(fn:(val)=>boolean, {message, path, params}) .superRefine((val,ctx)=>{})
.transform(fn:(val)=>newVal) .default(val) .catch(valOrFn) .optional() .nullable() .nullish() .array() .promise() .or() .and() .brand() .readonly() .pipe() .describe(text)

10 Parsers: parse, safeParse, parseAsync
.parse(input):T or throws ZodError
.parseAsync(input):Promise<T> or throws ZodError
.safeParse(input):{success, data?, error?}
.safeParseAsync(input):Promise<safeParseResult> alias .spa

11 Function Schemas
.function().args(...schemas).returns(schema).implement(fn) => validated function
.parameters():ZodTuple ; .returnType():ZodSchema

12 Preprocess & Custom
.preprocess(fn, targetSchema) // applies fn before validation
.custom<T>(validatorFn?, opts?) // no built-in validations

## Supplementary Details
Installation Steps:
1. Verify TypeScript>=4.5 and strict mode in tsconfig.json
2. Choose package manager
3. Run install command
4. For canary builds: install with @canary tag

Configuration Options:
- datetime: offset(boolean)=false, local=false, precision(number)=unbounded
- time: precision(number)=unbounded
- ip/cidr: version="v4"|"v6" or both
- object unknownKeys policy: default strip; passthrough; strict; catchall(schema)

Implementation Steps:
- Import z: `import { z } from "zod"`
- Create schema: call z.<type>()
- Chain validations or coercions
- For arrays: ensure method order: `.string().array().optional()` vs `.string().optional().array()`
- Use parse/parseAsync to validate or safeParse for error objects

Best Practices:
- Use discriminated unions for performance and specific error path
- Prefer .merge over intersection for objects
- Use z.coerce.* for primitive coercion
- Use .transform after parse for mapping values
- Use .superRefine for validation requiring multiple issues
- Use .spa for asynchronous safe parses

Troubleshooting:
- If .parseAsync on non-Promise: error Non-Promise type
- If coercion yields unexpected boolean results, use z.preprocess
- For recursive schemas: supply explicit type with z.ZodType<Output,Def,Input>
- For date coercion in older versions, use z.preprocess
Commands:
`ts-node script.ts` shows typed errors
`z.parseAsync(Promise.resolve(3))` returns Promise<number>


## Reference Details
// Exact Method Signatures and Return Types
interface ZodString extends ZodType<string,ZodStringDef,string> {
  min(min:length, opts?:{message:string}):ZodString;
  max(max:length, opts?:{message:string}):ZodString;
  length(len:length, opts?:{message:string}):ZodString;
  email(opts?:{message:string}):ZodString;
  url(opts?:{message:string}):ZodString;
  regex(pattern:RegExp, opts?:{message:string}):ZodString;
  datetime(opts?:{offset?:boolean,local?:boolean,precision?:number,message?:string}):ZodString;
  date(opts?:{message?:string}):ZodString;
  time(opts?:{precision?:number,message?:string}):ZodString;
  ip(opts?:{version?:"v4"|"v6",message?:string}):ZodString;
  cidr(opts?:{version?:"v4"|"v6",message?:string}):ZodString;
  trim():ZodString;
  toLowerCase():ZodString;
  toUpperCase():ZodString;
}

interface ZodNumber extends ZodType<number,ZodNumberDef,number> {
  gt(value:number, opts?:{message:string}):ZodNumber;
  gte(value:number, opts?:{message:string}):ZodNumber;
  lt(value:number, opts?:{message:string}):ZodNumber;
  lte(value:number, opts?:{message:string}):ZodNumber;
  int(opts?:{message:string}):ZodNumber;
  positive(opts?:{message:string}):ZodNumber;
  nonnegative(opts?:{message:string}):ZodNumber;
  negative(opts?:{message:string}):ZodNumber;
  nonpositive(opts?:{message:string}):ZodNumber;
  multipleOf(step:number, opts?:{message:string}):ZodNumber;
  finite(opts?:{message:string}):ZodNumber;
  safe(opts?:{message:string}):ZodNumber;
}

function z(): void;
function z.string(): ZodString;
function z.number(): ZodNumber;
function z.bigint(): ZodBigInt;
function z.boolean(): ZodBoolean;
function z.date(): ZodDate;
function z.symbol(): ZodSymbol;
function z.undefined(): ZodUndefined;
function z.null(): ZodNull;
function z.void(): ZodVoid;
function z.any(): ZodAny;
function z.unknown(): ZodUnknown;
function z.never(): ZodNever;
function z.literal<T extends string|number|boolean|bigint|symbol>(value:T):ZodLiteral<T>;
function z.coerce:{ string():ZodString; number():ZodNumber; boolean():ZodBoolean; bigint():ZodBigInt; date():ZodDate; }
function z.object<Shape extends ZodRawShape>(shape:Shape):ZodObject<Shape>;
function z.array<T extends ZodTypeAny>(schema:T):ZodArray<T>;
function z.tuple<T extends [ZodTypeAny, ...ZodTypeAny[]]>(schemas:T):ZodTuple<T>;
function z.set<T extends ZodTypeAny>(schema:T):ZodSet<T>;
function z.map<K extends ZodTypeAny, V extends ZodTypeAny>(keySchema:K, valueSchema:V):ZodMap<K,V>;
function z.record<K extends ZodTypeAny, V extends ZodTypeAny>(keySchema:K, valueSchema:V):ZodRecord<K,V>;
function z.union<T extends ZodTypeAny[]>(schemas:T):ZodUnion<T>;
function z.discriminatedUnion<K extends string, T extends ZodObject<any>[]>(key:K, options:T):ZodDiscriminatedUnion<K,T>;
function z.intersection<A extends ZodTypeAny, B extends ZodTypeAny>(a:A,b:B):ZodIntersection<A,B>;
function z.lazy<T extends ZodTypeAny>(getter: ()=>T):T;
function z.function():ZodFunction<ZodTuple<ZodTypeAny[]>,ZodTypeAny>;
function z.preprocess(transform: (val: unknown) => unknown, schema: ZodTypeAny): ZodEffects<any>;
function z.custom<T>(check?: (val:unknown)=>boolean, message?:string): ZodCustom<T>;

// Parsing
parse(input:unknown):Type or throws ZodError;
parseAsync(input:unknown):Promise<Type>;
safeParse(input:unknown):{ success:true; data:Type } | { success:false; error:ZodError };
safeParseAsync(input:unknown):Promise< ... >;

// Function schema
interface ZodFunction<ArgsType extends ZodTuple<any>, ReturnType extends ZodTypeAny> extends ZodType<(...args: z.infer<ArgsType>) => z.infer<ReturnType>> {
  args(...schemas:ArgsType['_def']['items']): ZodFunction<ArgsType,ReturnType>;
  returns(schema:ReturnType): ZodFunction<ArgsType,ReturnType>;
  implement<Fun extends (...args:any[])=>any>(fn:Fun):Fun;
  parameters():ArgsType;
  returnType():ReturnType;
}

// Examples
const UserSchema = z.object({ id:z.string(), age:z.number().gte(0) }).strict();
type User = z.infer<typeof UserSchema>;

const parseUser = UserSchema.parse; // (input:unknown)=>User

const CoercedDate = z.coerce.date(); // ZodDate from Date|string

// Troubleshooting Commands
// parseAsync with non-promise
try {
  z.promise(z.number()).parseAsync(123);
} catch(e) {
  console.error(e.message); // Non-Promise type: number
}


## Information Dense Extract
TS>=4.5 strict. Install via npm/yarn/deno/bun/pnpm. z.string(),number(),bigint(),boolean(),date(),symbol(),undefined(),null(),void(),any(),unknown(),never(). z.literal(value). z.coerce.string(),number(),boolean(),bigint(),date(). String methods: .min(n),.max(n),.length(n),.email(),.url(),.regex(),.datetime({offset,local,precision}),.date(),.time({precision}),.ip({version}),.cidr({version}),.trim(),.toLowerCase(),.toUpperCase(). Number methods: .gt(n),.gte(n),.lt(n),.lte(n),.int(),.positive(),.nonnegative(),.negative(),.nonpositive(),.multipleOf(n),.finite(),.safe(). Bigint analogous. Object: z.object(shape).shape,.keyof(),.extend(),.merge(),.pick(),.omit(),.partial(),.deepPartial(),.required(),.passthrough(),.strict(),.strip(),.catchall(). Collections: .array(),.nonempty(),.min(),.max(),.length(); .tuple([...]).rest(); .set().nonempty().min().max().size(); .map(key,value); .record(key,value). Unions: z.union(),.or(); z.discriminatedUnion(key,opts); .options; .intersection(). Recommended .merge. Recursive: z.lazy(()=>schema). Effects: .refine(fn,opts),.superRefine((val,ctx)),.transform(fn),.default(val),.catch(val|fn),.optional(),.nullable(),.nullish(),.array(),.promise(),.or(),.and(),.brand(),.readonly(),.pipe(),.describe(). Parsing: .parse(),.parseAsync(),.safeParse(),.safeParseAsync(.spa). Functions: z.function().args(...).returns().implement(),.parameters(),.returnType(). Preprocess: z.preprocess(fn,schema). Custom: z.custom<T>(fn,opts).

## Sanitised Extract
Table of Contents
1 Installation  2 Primitives & Coercion  3 String Schema Methods  4 Number & BigInt Schema Methods  5 Object Schema Methods  6 Collections: Arrays, Tuples, Sets, Maps, Records  7 Union, Discriminated Union, Intersection  8 Recursive Types & Lazy  9 Effects: refine, superRefine, transform  10 Parsers: parse, safeParse, parseAsync  11 Function Schemas  12 Preprocess & Custom

1 Installation
Requirements  TypeScript>=4.5; tsconfig.json { compilerOptions:{ strict:true } }
Commands  npm install zod; yarn add zod; bun add zod; deno add npm:zod; pnpm add zod; use @canary tag for canary builds

2 Primitives & Coercion
z.string() z.number() z.bigint() z.boolean() z.date() z.symbol() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
z.coerce.string()  applies String(input)
z.coerce.number()  applies Number(input)
z.coerce.boolean() applies Boolean(input)
z.coerce.bigint()  applies BigInt(input)
z.coerce.date()    applies new Date(input)
z.literal(value)

3 String Schema Methods
.string().max(max:number, opts?) .min(min:number, opts?) .length(len:number, opts?) .email(opts?) .url(opts?) .regex(reg:RegExp, opts?) .datetime({ offset?:boolean, local?:boolean, precision?:number }, opts?) .date(opts?) .time({ precision?:number }, opts?) .ip({ version?:'v4'|'v6' }, opts?) .cidr({ version?:'v4'|'v6' }, opts?)
t.c. .trim() .toLowerCase() .toUpperCase()

4 Number & BigInt Schema Methods
.number().gt(num:number, opts?) .gte(num:number, opts?) .lt(num:number, opts?) .lte(num:number, opts?) .int(opts?) .positive(opts?) .nonnegative(opts?) .negative(opts?) .nonpositive(opts?) .multipleOf(step:number, opts?) .finite(opts?) .safe(opts?)
.bigint() counterpart methods with bigint

5 Object Schema Methods
.object({key:schema,...})
.shape  .keyof() .extend({key:schema}) .merge(otherObj) .pick({key:true}) .omit({key:true}) .partial(keys?) .deepPartial() .required(keys?) .passthrough() .strict() .strip() .catchall(schema)

6 Collections: Arrays, Tuples, Sets, Maps, Records
.array(itemSchema)
.element  .nonempty(opts?) .min(n,opts?) .max(n,opts?) .length(n,opts?)
.tuple([schemas...]).rest(restSchema?)
.set(itemSchema).nonempty().min(n).max(n).size(n)
.map(keySchema,valueSchema)
.record(keySchema,valueSchema)

7 Union, Discriminated Union, Intersection
.union([schemas...])  .or(otherSchema)
.discriminatedUnion('key', [objSchemas...]).options
.intersection(schemaA,schemaB)

8 Recursive Types & Lazy
.z.lazy(() => schemaRef)

9 Effects: refine, superRefine, transform
.refine(fn:(val)=>boolean, {message, path, params}) .superRefine((val,ctx)=>{})
.transform(fn:(val)=>newVal) .default(val) .catch(valOrFn) .optional() .nullable() .nullish() .array() .promise() .or() .and() .brand() .readonly() .pipe() .describe(text)

10 Parsers: parse, safeParse, parseAsync
.parse(input):T or throws ZodError
.parseAsync(input):Promise<T> or throws ZodError
.safeParse(input):{success, data?, error?}
.safeParseAsync(input):Promise<safeParseResult> alias .spa

11 Function Schemas
.function().args(...schemas).returns(schema).implement(fn) => validated function
.parameters():ZodTuple ; .returnType():ZodSchema

12 Preprocess & Custom
.preprocess(fn, targetSchema) // applies fn before validation
.custom<T>(validatorFn?, opts?) // no built-in validations

## Original Source
Zod Schema Validation Library
https://github.com/colinhacks/zod#readme

## Digest of ZOD_SCHEMA

# Zod Schema Validation Library Detailed Digest

Date Retrieved: 2024-06-18
Source: https://github.com/colinhacks/zod#readme

## 1. Installation Requirements and Commands
- TypeScript 4.5+; tsconfig.json must enable "strict": true

npm install zod       # npm
deno add npm:zod      # deno
yarn add zod          # yarn
bun add zod           # bun
pnpm add zod          # pnpm

Canary versions:

npm install zod@canary


## 2. Core Usage and Schema Creation

### Primitives
- z.string()  returns ZodString
- z.number()  returns ZodNumber
- z.bigint()  returns ZodBigInt
- z.boolean() returns ZodBoolean
- z.date()    returns ZodDate
- z.symbol()  returns ZodSymbol
- z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

### Coercion
z.coerce.string()   => applies String(input)
z.coerce.number()   => applies Number(input)
z.coerce.boolean()  => Boolean(input)
z.coerce.bigint()   => BigInt(input)
z.coerce.date()     => new Date(input)

### Literals
- z.literal(value: string|number|boolean|bigint|symbol)

## 3. String Schema Methods
| Method             | Parameters                                    | Return Type | Default Behavior                          |
|--------------------|-----------------------------------------------|-------------|-------------------------------------------|
| max                | max: number, opts?: { message: string }       | ZodString   | string length <= max                      |
| min                | min: number, opts?: { message: string }       | ZodString   | string length >= min                      |
| length             | length: number, opts?: { message: string }    | ZodString   | string length === length                  |
| email              | opts?: { message: string }                   | ZodString   | valid email                               |
| url                | opts?: { message: string }                   | ZodString   | valid URL                                 |
| regex              | regex: RegExp, opts?: { message: string }     | ZodString   | regex.test(value)                         |
| datetime           | opts?: { offset?: boolean; local?: boolean; precision?: number; message?: string } | ZodString | ISO8601 date-time                         |
| date               | opts?: { message?: string }                   | ZodString   | YYYY-MM-DD                                |
| time               | opts?: { precision?: number; message?:string}| ZodString   | HH:MM:SS[.SS...]                          |
| ip                 | opts?: { version?: "v4"|"v6"; message?:string } | ZodString | IPv4/IPv6                                |
| cidr               | opts?: { version?: "v4"|"v6"; message?:string } | ZodString | IP range CIDR                            |

## 4. Number/BigInt Schema Methods
### Numbers
z.number().gt(value:number, opts?);    // > value
z.number().gte(value:number, opts?);   // >= value
z.number().lt(value:number, opts?);    // < value
z.number().lte(value:number, opts?);   // <= value
z.number().int(opts?);                 // is integer
z.number().positive(opts?);            // > 0
z.number().nonnegative(opts?);         // >= 0
z.number().negative(opts?);            // < 0
z.number().nonpositive(opts?);         // <= 0
z.number().multipleOf(value:number, opts?); // divisible by value
z.number().finite(opts?);              // not Infinity/-Infinity
z.number().safe(opts?);                // between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER

### BigInts
z.bigint().gt(value: bigint, opts?);
... analogous to numbers

## 5. Object Schema Methods
const Obj = z.object({ key: z.string(), age: z.number() });
- .shape
- .keyof()
- .extend(schemaMap)
- .merge(otherObject)
- .pick({fields})
- .omit({fields})
- .partial(fields?)
- .deepPartial()
- .required(fields?)
- .passthrough()
- .strict()
- .strip()
- .catchall(schema)

## 6. Collection Types
### Arrays
z.array(elementSchema)
.element
.nonempty(opts?) => [T,...T[]]
.min(len, opts?)
.max(len, opts?)
.length(len, opts?)

### Tuples
z.tuple([schemas...]).rest(restSchema?)

### Sets
z.set(elementSchema)
.nonempty(opts?)
.min(len, opts?)
.max(len, opts?)
.size(len, opts?)

### Maps
z.map(keySchema, valueSchema)

### Records
z.record(keySchema, valueSchema)

## 7. Union/Intersection
z.union([schemas...])
or-method chaining
z.discriminatedUnion(discriminator:string, options:objectSchemas[])
.options
z.intersection(schemaA, schemaB)
.merge for objects recommended

## 8. Recursive and Lazy
z.lazy(() => schema)
Define type hints manually for recursive

## 9. Effects, Transforms, Refinements
- .refine(validatorFn, opts)
- .superRefine((data, ctx)=>{})
- .transform(transformFn)
- .default(value)
- .catch(fnOrValue)
- .optional()
- .nullable()
- .nullish()
- .array()
- .promise()
- .or()
- .and()
- .brand() // tag type
- .readonly()
- .pipe()
- .describe(text)

## 10. Parsing Methods
.parse(input): T or throws ZodError
.parseAsync(input): Promise<T> or throws ZodError
.safeParse(input): { success:boolean; data?|error? }
.safeParseAsync(input): Promise<safeParseResult>
.spa alias for safeParseAsync

## 11. Function Schemas
z.function().args(...schemas).returns(schema).implement(fn)
.parameters()
.returnType()

## 12. Preprocess and Custom
z.preprocess(fn, schema)
z.custom<T>(validationFn?, opts?)

## 13. Troubleshooting Tips
- For promise schemas use .parseAsync
- For coercion use z.coerce.* or z.preprocess
- Use discriminatedUnion for faster performance
- Avoid array().optional() vs optional().array() pitfalls

### Data Size: 1045184 bytes
### Links Found: 6725

## Attribution
- Source: Zod Schema Validation Library
- URL: https://github.com/colinhacks/zod#readme
- License: License if known
- Crawl Date: 2025-04-29T04:50:58.323Z
- Data Size: 1045184 bytes
- Links Found: 6725

## Retrieved
2025-04-29
