# ZOD_SCHEMA

## Crawl Summary
z.string(), z.number(), z.boolean(), z.date(), z.array(schema), z.object(shape) with strict/passthrough/catchall, composites union/intersection/enum/literal, optional/nullable. Parsing: parse(input) throws, safeParse(input) returns success/data/error, async variants return Promises. Error handling via ZodError. Transform/Refine APIs. Type inference via TypeOf. Configuration via setErrorMap. Best practices: safeParse in handlers, strict object, use refine/transform. Troubleshooting: flatten errors.

## Normalised Extract
Table of Contents
1 Basic Schemas
2 Composite Schemas
3 Parsing Methods
4 Error Handling
5 Transformations & Refinements
6 Type Inference
7 Configuration
8 Best Practices
9 Troubleshooting

1 Basic Schemas
z.string()             min(length, message) max(length, message) email(message) url(message) uuid(message)
z.number()             int(message) positive(message) nonnegative(message) negative(message)
z.boolean()
z.date()               min(Date, message) max(Date, message)

2 Composite Schemas
z.array(schema)        min(length, message) max(length, message) nonempty(message)
z.object(shape)        strict() pasthrough() catchall(schema)
                         .partial() .required() .deepPartial() .pick(keys) .omit(keys) .extend(shape)
z.union([schemas])
z.intersection(a, b)
z.enum([values])
z.literal(value)
z.optional(schema)
z.nullable(schema)

3 Parsing Methods
schema.parse(input)               -> T or throws ZodError
schema.safeParse(input)           -> { success:boolean; data?:T; error?:ZodError }
schema.parseAsync(input)          -> Promise<T>
schema.safeParseAsync(input)      -> Promise<{ success:boolean; data?:T; error?:ZodError }>

4 Error Handling
ZodError.issues:Array<ZodIssue>{ path:Array<string|number>; message:string; code:string }
error.flatten() -> { formErrors:string[]; fieldErrors:Record<string,string[]> }
error.format()  -> Record<string,string[]>

5 Transformations & Refinements
schema.transform(fn:In=>Out)      -> ZodTransformer<In,Out>
schema.refine(fn:In=>boolean, {message, path}) -> ZodEffects<In>

6 Type Inference
TypeOf<typeof schema> yields TypeScript type of schema

7 Configuration
setErrorMap(map:ErrorMap) with signature (issue, ctx) => { message:string }

8 Best Practices
Use safeParse to avoid throws in production
Use strict() on root objects to reject extra keys
Combine refine and transform for computed fields

9 Troubleshooting
Common error Unexpected key 'x' use strict() to detect
Inspect issues: console.log(error.flatten())

## Supplementary Details
Parameter Defaults and Effects
z.string(): default min=0, max=Infinity
z.number(): default no range, supports int enforcement
z.array(): default any length, min=0 max=Infinity
z.object(): default allows unknown keys unless strict()

ErrorMap Default
(issue, ctx) => { return { message: ctx.defaultError }; }
Override via setErrorMap to customize all messages

Parser Behavior
parse throws first error encountered, safeParse returns aggregated issues
parseAsync/safeParseAsync support Promises for async refinements

Refinement Path
refine(()=>boolean) default path=[] unless custom path array provided

Transformer Timing
transform runs after all validation steps

Strict Mode
strict() rejects unknown keys with code 'unrecognized_keys'
passthrough() retains unknown keys, catchall applies schema to all unknown values


## Reference Details
Constructor Signatures
z.string(): ZodString
z.number(): ZodNumber
z.boolean(): ZodBoolean
z.date(): ZodDate
z.array<T>(schema:ZodType<T>): ZodArray<ZodType<T>>
z.object<Shape extends ZodRawShape>(shape:Shape): ZodObject<Shape>
z.union<T extends [ZodTypeAny, ...ZodTypeAny[]]>(schemas:T): ZodUnion<T>
z.intersection<A extends ZodTypeAny, B extends ZodTypeAny>(a:A, b:B): ZodIntersection<A,B>
z.enum<T extends [string, ...string[]]>(values:T): ZodEnum<T>
z.literal<T extends string|number|boolean|null>(value:T): ZodLiteral<T>
z.optional<T>(schema:ZodType<T>): ZodOptional<ZodType<T>>
z.nullable<T>(schema:ZodType<T>): ZodNullable<ZodType<T>>

Parse Methods
parse(input:unknown):T throws ZodError
safeParse(input:unknown):{ success:boolean; data?:T; error?:ZodError }
parseAsync(input:unknown):Promise<T>
safeParseAsync(input:unknown):Promise<{ success:boolean; data?:T; error?:ZodError }>

ZodError
interface ZodIssue { path:(string|number)[]; message:string; code:string }
class ZodError { issues:ZodIssue[]; format():Record<string,string[]>; flatten():{ formErrors:string[]; fieldErrors:Record<string,string[]> } }

setErrorMap(map:ErrorMap):void
interface ErrorMap { (issue:ZodIssue, ctx:ErrorMapCtx):{ message:string } }
interface ErrorMapCtx { defaultError:string; data:any; } 

Best Practice Example
const userSchema = z.object({ id: z.string().uuid(), email: z.string().email(), age: z.number().int().nonnegative() }).strict();
const result = userSchema.safeParseAsync(req.body);
if (!result.success) { console.error(result.error.flatten()); res.status(400).json({ errors: result.error.format() }); }

Troubleshooting Commands
Inspect shape issues: console.log(JSON.stringify(error.issues, null, 2))
List field errors: const { fieldErrors } = error.flatten();


## Information Dense Extract
z.string|min,max,email,url,uuid; z.number|int,positive,range; z.boolean; z.date|min,max; z.array|min,max,nonempty; z.object|strict,passthrough,catchall,partial,required,pick,omit,extend; z.union,z.intersection,z.enum,z.literal,z.optional,z.nullable. parse(input)=>T throws; safeParse=>{success,data?,error?}; async variants. ZodError.issues[{path,message,code}]; error.format(),error.flatten(). transform(fn)=>ZodTransformer; refine(fn,{message,path})=>ZodEffects. TypeOf<typeof schema>. setErrorMap(map). Best: safeParse in handlers, strict root, refine+transform. Troubleshoot: error.flatten(), JSON.stringify(error.issues,2).

## Sanitised Extract
Table of Contents
1 Basic Schemas
2 Composite Schemas
3 Parsing Methods
4 Error Handling
5 Transformations & Refinements
6 Type Inference
7 Configuration
8 Best Practices
9 Troubleshooting

1 Basic Schemas
z.string()             min(length, message) max(length, message) email(message) url(message) uuid(message)
z.number()             int(message) positive(message) nonnegative(message) negative(message)
z.boolean()
z.date()               min(Date, message) max(Date, message)

2 Composite Schemas
z.array(schema)        min(length, message) max(length, message) nonempty(message)
z.object(shape)        strict() pasthrough() catchall(schema)
                         .partial() .required() .deepPartial() .pick(keys) .omit(keys) .extend(shape)
z.union([schemas])
z.intersection(a, b)
z.enum([values])
z.literal(value)
z.optional(schema)
z.nullable(schema)

3 Parsing Methods
schema.parse(input)               -> T or throws ZodError
schema.safeParse(input)           -> { success:boolean; data?:T; error?:ZodError }
schema.parseAsync(input)          -> Promise<T>
schema.safeParseAsync(input)      -> Promise<{ success:boolean; data?:T; error?:ZodError }>

4 Error Handling
ZodError.issues:Array<ZodIssue>{ path:Array<string|number>; message:string; code:string }
error.flatten() -> { formErrors:string[]; fieldErrors:Record<string,string[]> }
error.format()  -> Record<string,string[]>

5 Transformations & Refinements
schema.transform(fn:In=>Out)      -> ZodTransformer<In,Out>
schema.refine(fn:In=>boolean, {message, path}) -> ZodEffects<In>

6 Type Inference
TypeOf<typeof schema> yields TypeScript type of schema

7 Configuration
setErrorMap(map:ErrorMap) with signature (issue, ctx) => { message:string }

8 Best Practices
Use safeParse to avoid throws in production
Use strict() on root objects to reject extra keys
Combine refine and transform for computed fields

9 Troubleshooting
Common error Unexpected key 'x' use strict() to detect
Inspect issues: console.log(error.flatten())

## Original Source
Schema Validation with Zod
https://zod.dev/

## Digest of ZOD_SCHEMA

# Zod Schema API Reference
Date Retrieved: 2024-06-20

# Core Schema Constructors

## z.string()
Signature: z.string()
Returns: ZodString
Description: Validates input as a string. Supports chained modifiers: min(length:number, message?:string), max(length:number, message?:string), email(message?:string), url(message?:string), uuid(message?:string), regex(pattern:RegExp, message?:string).

## z.number()
Signature: z.number()
Returns: ZodNumber
Modifiers: int(message?:string), positive(message?:string), nonnegative(message?:string), negative(message?:string), nonpositive(message?:string), min(value:number, message?:string), max(value:number, message?:string), multipleOf(value:number, message?:string).

## z.boolean()
Signature: z.boolean()
Returns: ZodBoolean

## z.date()
Signature: z.date()
Returns: ZodDate
Modifiers: min(date:Date, message?:string), max(date:Date, message?:string).

## z.array(schema: ZodType<T>)
Signature: z.array<T>(schema: ZodType<T>)
Returns: ZodArray<ZodType<T>>
Modifiers: min(length:number, message?:string), max(length:number, message?:string), nonempty(message?:string).

## z.object(shape: { [key:string]: ZodTypeAny })
Signature: z.object<Shape extends ZodRawShape>(shape: Shape)
Returns: ZodObject<Shape>
Modifiers: strict(), pasthrough(), catchall(schema:ZodTypeAny).
Methods: .partial(), .required(), .deepPartial(), .pick(keys:string[]), .omit(keys:string[]), .extend(shape).

## z.union([schemas])
Signature: z.union<T extends [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(schemas:readonly [...T])
Returns: ZodUnion<T>

## z.intersection(a: ZodTypeAny, b: ZodTypeAny)
Signature: z.intersection<A extends ZodTypeAny, B extends ZodTypeAny>(a:A, b:B)
Returns: ZodIntersection<A,B>

## z.enum(values: readonly [string, ...string[]])
Signature: z.enum<T extends [string, ...string[]]>(values:T)
Returns: ZodEnum<T>

## z.literal(value: string|number|boolean|null)
Signature: z.literal<T extends string|number|boolean|null>(value:T)
Returns: ZodLiteral<T>

## z.optional(schema: ZodType<T>)
Signature: z.optional<T>(schema: ZodType<T>)
Returns: ZodOptional<ZodType<T>>

## z.nullable(schema: ZodType<T>)
Signature: z.nullable<T>(schema: ZodType<T>)
Returns: ZodNullable<ZodType<T>>

# Parsing Methods

## parse(input: unknown)
Signature: schema.parse(input)
Returns: T or throws ZodError

## safeParse(input: unknown)
Signature: schema.safeParse(input)
Returns: { success: boolean; data?: T; error?: ZodError }

## parseAsync(input: unknown)
Signature: schema.parseAsync(input)
Returns: Promise<T>

## safeParseAsync(input: unknown)
Signature: schema.safeParseAsync(input)
Returns: Promise<{ success: boolean; data?: T; error?: ZodError }>

# Error Handling

## ZodError
Properties: issues: ZodIssue[]
Methods: format(): { [path:string]:string[] }, flatten(): { formErrors:string[]; fieldErrors:Record<string,string[]> }

# Transformations & Refinements

## transform(fn)
Signature: schema.transform<Out>(fn:(val:In)=>Out)
Returns: ZodTransformer<In,Out>

## refine(fn, params?)
Signature: schema.refine((val)=>boolean, { message?:string, path?: (string|number)[] })
Returns: ZodEffects

# Type Inference

Type: TypeOf<typeof schema> yields the inferred TypeScript type of the schema.

# Configuration
Default error map: to customize messages via setErrorMap(map:ErrorMap).

# Best Practices
• Use safeParse in request handlers to avoid runtime exceptions.
• Apply strict() on root objects to reject unknown keys.
• Combine refine and transform for advanced validations and derived values.

# Troubleshooting
• Common Error: Unexpected key ‘foo’ – use strict() to pinpoint.
• Command to inspect issues: console.log(error.flatten())



## Attribution
- Source: Schema Validation with Zod
- URL: https://zod.dev/
- License: License: MIT
- Crawl Date: 2025-05-16T18:28:30.222Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-16
