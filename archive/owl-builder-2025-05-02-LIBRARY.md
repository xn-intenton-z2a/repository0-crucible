library/SHACL_CONSTRAINTS.md
# library/SHACL_CONSTRAINTS.md
# SHACL_CONSTRAINTS

## Crawl Summary
Value type constraints: sh:class (domain PropertyShape, range rdfs:Class), sh:datatype (PropertyShape, XML datatype IRI), sh:nodeKind (PropertyShape, one of sh:IRI, sh:BlankNode, sh:Literal, sh:BlankNodeOrIRI). Cardinality constraints: sh:minCount and sh:maxCount accept xsd:integer. Range constraints: sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive accept literals. String constraints: sh:minLength, sh:maxLength integers; sh:pattern regex; sh:languageIn list of xsd:string; sh:uniqueLang boolean. Property pair constraints: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals accept rdf:Property. Logical: sh:not shape; sh:and, sh:or, sh:xone lists of shapes. Shape-based: sh:node NodeShape; sh:property PropertyShape; sh:qualifiedValueShape Shape; sh:qualifiedMinCount, sh:qualifiedMaxCount integers. Other: sh:closed boolean; sh:ignoredProperties list of rdf:Property; sh:hasValue RDF term; sh:in list of terms.

## Normalised Extract
Table of Contents
1. Value Type Constraints
2. Cardinality Constraints
3. Value Range Constraints
4. String Constraints
5. Property Pair Constraints
6. Logical Constraints
7. Shape-Based Constraints
8. Other Constraints

1. Value Type Constraints
   • sh:class — PropertyShape → rdfs:Class; single
   • sh:datatype — PropertyShape → XML datatype IRI; single
   • sh:nodeKind — PropertyShape → sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI; single

2. Cardinality Constraints
   • sh:minCount — PropertyShape → xsd:integer; single
   • sh:maxCount — PropertyShape → xsd:integer; single

3. Value Range Constraints
   • sh:minExclusive — PropertyShape → literal; single
   • sh:minInclusive — PropertyShape → literal; single
   • sh:maxExclusive — PropertyShape → literal; single
   • sh:maxInclusive — PropertyShape → literal; single

4. String Constraints
   • sh:minLength — PropertyShape → xsd:integer; single
   • sh:maxLength — PropertyShape → xsd:integer; single
   • sh:pattern — PropertyShape → xsd:string (regex); single
   • sh:languageIn — PropertyShape → RDF list of language tags; single
   • sh:uniqueLang — PropertyShape → xsd:boolean; single

5. Property Pair Constraints
   • sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals — PropertyShape → rdf:Property; single each

6. Logical Constraints
   • sh:not — Shape → Shape; single
   • sh:and, sh:or, sh:xone — Shape → RDF list of Shape; single each

7. Shape-Based Constraints
   • sh:node — PropertyShape → NodeShape; single
   • sh:property — NodeShape/PropertyShape → PropertyShape; multiple
   • sh:qualifiedValueShape — PropertyShape → Shape; single
   • sh:qualifiedMinCount, sh:qualifiedMaxCount — PropertyShape → xsd:integer; single each

8. Other Constraints
   • sh:closed — NodeShape → xsd:boolean; single
   • sh:ignoredProperties — NodeShape → RDF list of rdf:Property; single
   • sh:hasValue — PropertyShape → any RDF term; single
   • sh:in — PropertyShape → RDF list of RDF terms; single

## Supplementary Details
1. Prefix Declaration: prefix sh: <http://www.w3.org/ns/shacl#>
2. Define a NodeShape:
   ex:MyShape a sh:NodeShape;
     sh:targetClass ex:Person;
     sh:property [ sh:path ex:age; sh:datatype xsd:integer; sh:minInclusive 0; sh:maxInclusive 150 ].
3. Cardinality: omit sh:maxCount for unbounded; omit sh:minCount to allow zero.
4. Combine constraints by listing multiple parameters within a property shape.
5. Use RDF lists for sh:and, sh:or, sh:xone and sh:in:
   _:list1 rdf:first ex:Value1; rdf:rest _:list2. _:list2 rdf:first ex:Value2; rdf:rest rdf:nil.
6. To restrict by nodeKind: sh:nodeKind sh:IRI.
7. To disallow additional properties: set sh:closed true and list allowed predicates in sh:property or sh:ignoredProperties.
8. For qualified counts: include sh:qualifiedValueShape and sh:qualifiedMinCount/MaxCount in the same property shape block.


## Reference Details
Vocabulary domain/range/cardinality per parameter as listed in detailed digest. Turtle example:

@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix ex: <http://example.com/ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

en:PersonShape a sh:NodeShape;
  sh:targetClass ex:Person;
  sh:closed true;
  sh:property [
    sh:path ex:ssn;
    sh:datatype xsd:string;
    sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$";
    sh:maxCount 1
  ];
  sh:property [
    sh:path ex:worksFor;
    sh:nodeKind sh:IRI;
    sh:class ex:Company
  ];
  sh:ignoredProperties ( rdf:type ) .

Apache Jena validation Java API:

import org.apache.jena.rdf.model.Model;
import org.apache.jena.shacl.ValidationReport;
import org.apache.jena.shacl.ShaclValidator;

Model shapes = RDFDataMgr.loadModel("shapes.ttl");
Model data   = RDFDataMgr.loadModel("data.ttl");
ValidationReport report = ShaclValidator.get().validate(shapes.getGraph(), data.getGraph());
boolean conforms = report.conforms();
report.getEntries().forEach(r -> System.out.println(r.message()));

Maven dependency:
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-shacl</artifactId>
  <version>4.8.0</version>
</dependency>

Troubleshooting:
- If shapes graph is ill-formed, the validator throws ShaclValidationException with message starting "Ill-formed shapes graph".
- Enable debug logging: -Djena.shacl.log=true
- Expected output on missing sh:datatype violation: ValidationResult focusNode ex:Alice, path ex:ssn, value "ABC", sourceConstraintComponent sh:pattern.


## Information Dense Extract
sh:class PropertyShape→rdfs:Class 0..1; sh:datatype PropertyShape→xsd:datatype IRI 0..1; sh:nodeKind PropertyShape→sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI 0..1; sh:minCount PropertyShape→xsd:integer 0..1; sh:maxCount PropertyShape→xsd:integer 0..1; sh:minExclusive PropertyShape→literal 0..1; sh:minInclusive PropertyShape→literal 0..1; sh:maxExclusive PropertyShape→literal 0..1; sh:maxInclusive PropertyShape→literal 0..1; sh:minLength PropertyShape→xsd:integer 0..1; sh:maxLength PropertyShape→xsd:integer 0..1; sh:pattern PropertyShape→xsd:string(regex) 0..1; sh:languageIn PropertyShape→rdf:List of xsd:string 0..1; sh:uniqueLang PropertyShape→xsd:boolean 0..1; sh:equals|sh:disjoint|sh:lessThan|sh:lessThanOrEquals PropertyShape→rdf:Property 0..1; sh:not Shape→Shape 0..1; sh:and|sh:or|sh:xone Shape→rdf:List of Shape 0..1; sh:node PropertyShape→NodeShape 0..1; sh:property NodeShape/PropertyShape→PropertyShape 0..*; sh:qualifiedValueShape PropertyShape→Shape 0..1; sh:qualifiedMinCount|sh:qualifiedMaxCount PropertyShape→xsd:integer 0..1; sh:closed NodeShape→xsd:boolean 0..1; sh:ignoredProperties NodeShape→rdf:List of rdf:Property 0..1; sh:hasValue PropertyShape→any RDF term 0..1; sh:in PropertyShape→rdf:List of RDF terms 0..1.

## Sanitised Extract
Table of Contents
1. Value Type Constraints
2. Cardinality Constraints
3. Value Range Constraints
4. String Constraints
5. Property Pair Constraints
6. Logical Constraints
7. Shape-Based Constraints
8. Other Constraints

1. Value Type Constraints
    sh:class  PropertyShape  rdfs:Class; single
    sh:datatype  PropertyShape  XML datatype IRI; single
    sh:nodeKind  PropertyShape  sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI; single

2. Cardinality Constraints
    sh:minCount  PropertyShape  xsd:integer; single
    sh:maxCount  PropertyShape  xsd:integer; single

3. Value Range Constraints
    sh:minExclusive  PropertyShape  literal; single
    sh:minInclusive  PropertyShape  literal; single
    sh:maxExclusive  PropertyShape  literal; single
    sh:maxInclusive  PropertyShape  literal; single

4. String Constraints
    sh:minLength  PropertyShape  xsd:integer; single
    sh:maxLength  PropertyShape  xsd:integer; single
    sh:pattern  PropertyShape  xsd:string (regex); single
    sh:languageIn  PropertyShape  RDF list of language tags; single
    sh:uniqueLang  PropertyShape  xsd:boolean; single

5. Property Pair Constraints
    sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals  PropertyShape  rdf:Property; single each

6. Logical Constraints
    sh:not  Shape  Shape; single
    sh:and, sh:or, sh:xone  Shape  RDF list of Shape; single each

7. Shape-Based Constraints
    sh:node  PropertyShape  NodeShape; single
    sh:property  NodeShape/PropertyShape  PropertyShape; multiple
    sh:qualifiedValueShape  PropertyShape  Shape; single
    sh:qualifiedMinCount, sh:qualifiedMaxCount  PropertyShape  xsd:integer; single each

8. Other Constraints
    sh:closed  NodeShape  xsd:boolean; single
    sh:ignoredProperties  NodeShape  RDF list of rdf:Property; single
    sh:hasValue  PropertyShape  any RDF term; single
    sh:in  PropertyShape  RDF list of RDF terms; single

## Original Source
SHACL – Shapes Constraint Language
https://www.w3.org/TR/shacl/

## Digest of SHACL_CONSTRAINTS

# Core Constraint Components

Date Retrieved: 2024-06-15

## 4.1 Value Type Constraint Components

### 4.1.1 sh:class
• Domain: sh:PropertyShape
• Range: rdfs:Class
• Cardinality: 0..1

### 4.1.2 sh:datatype
• Domain: sh:PropertyShape
• Range: IRI of XML Schema datatype
• Cardinality: 0..1

### 4.1.3 sh:nodeKind
• Domain: sh:PropertyShape
• Range: one of sh:IRI, sh:BlankNode, sh:Literal, sh:BlankNodeOrIRI
• Cardinality: 0..1

## 4.2 Cardinality Constraint Components

### 4.2.1 sh:minCount
• Domain: sh:PropertyShape
• Range: xsd:integer (minimum 0)
• Cardinality: 0..1

### 4.2.2 sh:maxCount
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

## 4.3 Value Range Constraint Components

### 4.3.1 sh:minExclusive
• Domain: sh:PropertyShape
• Range: literal matching datatype of values
• Cardinality: 0..1

### 4.3.2 sh:minInclusive
• Domain: sh:PropertyShape
• Range: literal
• Cardinality: 0..1

### 4.3.3 sh:maxExclusive
• Domain: sh:PropertyShape
• Range: literal
• Cardinality: 0..1

### 4.3.4 sh:maxInclusive
• Domain: sh:PropertyShape
• Range: literal
• Cardinality: 0..1

## 4.4 String-based Constraint Components

### 4.4.1 sh:minLength
• Domain: sh:PropertyShape
• Range: xsd:integer (>=0)
• Cardinality: 0..1

### 4.4.2 sh:maxLength
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

### 4.4.3 sh:pattern
• Domain: sh:PropertyShape
• Range: xsd:string (regular expression)
• Cardinality: 0..1

### 4.4.4 sh:languageIn
• Domain: sh:PropertyShape
• Range: RDF list of xsd:string (language tags)
• Cardinality: 0..1

### 4.4.5 sh:uniqueLang
• Domain: sh:PropertyShape
• Range: xsd:boolean
• Cardinality: 0..1

## 4.5 Property Pair Constraint Components

### 4.5.1 sh:equals
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

### 4.5.2 sh:disjoint
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

### 4.5.3 sh:lessThan
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

### 4.5.4 sh:lessThanOrEquals
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

## 4.6 Logical Constraint Components

### 4.6.1 sh:not
• Domain: sh:Shape
• Range: sh:Shape
• Cardinality: 0..1

### 4.6.2 sh:and
• Domain: sh:Shape
• Range: RDF list of sh:Shape
• Cardinality: 0..1

### 4.6.3 sh:or
• Domain: sh:Shape
• Range: RDF list of sh:Shape
• Cardinality: 0..1

### 4.6.4 sh:xone
• Domain: sh:Shape
• Range: RDF list of sh:Shape
• Cardinality: 0..1

## 4.7 Shape-based Constraint Components

### 4.7.1 sh:node
• Domain: sh:PropertyShape
• Range: sh:NodeShape
• Cardinality: 0..1

### 4.7.2 sh:property
• Domain: sh:NodeShape or sh:PropertyShape
• Range: sh:PropertyShape
• Cardinality: 0..*

### 4.7.3 sh:qualifiedValueShape
• Domain: sh:PropertyShape
• Range: sh:Shape
• Cardinality: 0..1

### 4.7.4 sh:qualifiedMinCount
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

### 4.7.5 sh:qualifiedMaxCount
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

## 4.8 Other Constraint Components

### 4.8.1 sh:closed
• Domain: sh:NodeShape
• Range: xsd:boolean
• Cardinality: 0..1

### 4.8.2 sh:ignoredProperties
• Domain: sh:NodeShape
• Range: RDF list of rdf:Property
• Cardinality: 0..1

### 4.8.3 sh:hasValue
• Domain: sh:PropertyShape
• Range: any RDF term
• Cardinality: 0..1

### 4.8.4 sh:in
• Domain: sh:PropertyShape
• Range: RDF list of allowed RDF terms
• Cardinality: 0..1

## Attribution
- Source: SHACL – Shapes Constraint Language
- URL: https://www.w3.org/TR/shacl/
- License: W3C Document License
- Crawl Date: 2025-05-02T19:13:37.801Z
- Data Size: 15000832 bytes
- Links Found: 118960

## Retrieved
2025-05-02
library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
Commander.js provides a fluent API for building CLI tools in Node.js. Core functionality includes defining commands, options, arguments, and help, with strict parsing and suggestion of unknown options. Key method signatures: .option(flags, desc, default), .requiredOption, .argument(name, desc, default), .command(name, desc, opts), .action(handler), .parse(args), .parseAsync(args). Advanced: Option class for elaborate options (choices, env, conflicts, implies), lifecycle hooks (preAction, postAction, preSubcommand), help customization (.addHelpText, .helpOption, .helpCommand), error handling (.error, .exitOverride, .configureOutput), parsing tweaks (.enablePositionalOptions, .passThroughOptions, .allowUnknownOption, .allowExcessArguments), legacy compatibility (.storeOptionsAsProperties), TypeScript support (@commander-js/extra-typings).

## Normalised Extract
Contents
1 Installation and Imports
2 Command and Program Setup
3 Defining Options
4 Option Types and Behaviors
5 Defining Arguments
6 Subcommands
7 Action Handlers
8 Parsing Methods
9 Help System
10 Error and Exit Handling
11 Lifecycle Hooks
12 Advanced Configuration
13 TypeScript Support

1 Installation and Imports
• npm install commander
• import { program, Command, Option, InvalidArgumentError } from 'commander'

2 Command and Program Setup
• createCommand(): Command
• new Command([name]): Command
• program.name(string)
• program.description(string, summary?)
• program.version(string, flags?, description?)

3 Defining Options
• program.option(flags: string, description: string, defaultValue?)
• program.requiredOption(flags: string, description: string, defaultValue?)
• program.addOption(new Option(flags, description))

4 Option Types and Behaviors
• Boolean: --debug
• Value: -p, --port <number>
• Negatable: --no-feature
• Boolean|Value: --flag [value]
• Variadic: -n, --items <items...>
• Default values: .option(..., default)
• Custom parser: .option(flag, desc, parserFn, default)

5 Defining Arguments
• program.argument(name: string, description?: string, defaultValue?)
• Variadic argument: <args...>

6 Subcommands
• program.command(nameAndArgs: string, description?, opts?)
• .addCommand(cmd)
• .alias(alias)
• isDefault, hidden, executableFile

7 Action Handlers
• .action(fn)
• fn receives declared args, options object, and command instance
• Async handlers: use .parseAsync

8 Parsing Methods
• program.parse([argv], {from})
• program.parseAsync([argv], {from})
• from: 'node' | 'electron' | 'user'

9 Help System
• Auto-generated: -h, --help
• .helpOption(flags?, description?)
• .helpCommand(name?, description?)
• .addHelpText(position, textOrFn)
• .showHelpAfterError(msg?)
• .showSuggestionAfterError(enable)

10 Error and Exit Handling
• .error(message, {exitCode, code})
• .exitOverride([handler])
• .configureOutput({writeOut, writeErr, outputError})

11 Lifecycle Hooks
• .hook(event, fn)
• event: 'preAction','postAction','preSubcommand'

12 Advanced Configuration
• .enablePositionalOptions()
• .passThroughOptions()
• .allowUnknownOption(allow)
• .allowExcessArguments(allow)
• .storeOptionsAsProperties(store)

13 TypeScript Support
• Install @commander-js/extra-typings
• Strong typing for .opts() and .action parameters

## Supplementary Details
• Option.flags syntax: short and long separated by comma: '-s, --separator <char>'
• .opts(): returns Record<string, any> of parsed options
• .optsWithGlobals(): merged local/global
• .getOptionValue(key): any
• .setOptionValue(key, value): void
• .getOptionValueSource(key): 'default'|'env'|'cli'
• .setOptionValueWithSource(key, value, source): void
• Argument.choices(array): restrict values
• Argument.default(value, description): set default
• Stand-alone subcommands directory: entry script folder
• .executableDir(dir): change lookup dir
• Node inspect child: port+1
• npm scripts pass-through: use '--'
• InvalidArgumentError extends Error: thrown to signal parse errors

## Reference Details
API Specifications
Command methods:
  option(flags: string, description: string, defaultValue?: any): Command
  requiredOption(flags: string, description: string, defaultValue?: any): Command
  addOption(option: Option): Command
  argument(name: string, description?: string, defaultValue?: any): Command
  addArgument(arg: Argument): Command
  command(nameAndArgs: string, description?: string, opts?: { isDefault?: boolean; hidden?: boolean; executableFile?: string }): Command | this
  addCommand(cmd: Command): this
  alias(alias: string): Command
  name(name: string): Command
  description(desc: string, summary?: string): Command
  version(version: string, flags?: string, description?: string): Command
  action(fn: (...args: any[]) => void | Promise<any>): Command
  parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
  parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>
  help(): void
  outputHelp(opts?: { error?: boolean }): void
  helpInformation(): string
  helpOption(flags: string|false, description?: string): Command
  helpCommand(name?: string|false, description?: string): Command
  addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|(ctx)=>string): Command
  showHelpAfterError(msg?: string): Command
  showSuggestionAfterError(enable: boolean): Command
  error(message: string, opts?: { exitCode?: number; code?: string }): void
  exitOverride(handler?: (err: CommanderError)=>void): Command
  configureOutput(opts: { writeOut?: (s:string)=>void; writeErr?: (s:string)=>void; outputError?: (s:string, write:(s:string)=>void)=>void }): Command
  hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCommand:Command, actionCommand:Command)=>void|Promise<void>): Command
  enablePositionalOptions(): Command
  passThroughOptions(): Command
  allowUnknownOption(allow?: boolean): Command
  allowExcessArguments(allow?: boolean): Command
  storeOptionsAsProperties(store?: boolean): Command

Option class methods:
  constructor(flags: string, description?: string)
  default(value: any, description?: string): Option
  env(variable: string): Option
  choices(values: any[]): Option
  preset(value: any): Option
  argParser(parserFn: (val:string, prev:any)=>any): Option
  conflicts(key: string): Option
  implies(mapping: Record<string, any>): Option
  hideHelp(): Option
  makeOptionMandatory(): Option

InvalidArgumentError:
  constructor(message: string)

Best Practices:
• Define a local Command instance for testable code: const program = new Command()
• Use .addOption for advanced option config: choices, env, conflicts, implies
• For async actions, always use parseAsync
• For monolithic CLIs, enablePositionalOptions + passThroughOptions for nested tools
• Use exitOverride in libraries to catch errors instead of process.exit

Troubleshooting:
1 Unknown option error:
   program.parse(['--fits'], { from: 'user' })
   // error: unknown option '--fits' (Did you mean --first?)
2 Missing argument:
   program.option('-c, --cheese <type>').parse()
   // error: option '-c, --cheese <type>' argument missing
3 Invalid choice:
   program.addOption(new Option('-d, --drink <size>').choices(['small','medium','large'])).parse()
   // error: option '-d, --drink <size>' argument 'huge' is invalid. Allowed choices are small, medium, large
4 Exit override:
   program.exitOverride()
   try { program.parse() } catch(err) { if(err.exitCode) handle(err) }


## Information Dense Extract
npm install commander; import {program,Command,Option,InvalidArgumentError} from 'commander'
createCommand():Command; new Command([name]):Command
program.name(name).description(text,summary).version(ver,flags,desc)
program.option(flags,desc,default).requiredOption(flags,desc,default).addOption(new Option(flags,desc).default(val).choices(arr).env(var).preset(val).argParser(fn).conflicts(key).implies(map).hideHelp().makeOptionMandatory())
program.argument(name,desc,default).addArgument(new Argument(name,desc).choices(arr).default(val))
program.command(def,desc,opts).addCommand(cmd).alias(alias)
program.action(fn(arg1,..,opts,cmd)).parse([argv],{from:'node'|'electron'|'user'}).parseAsync(...)
program.help().outputHelp({error}).helpInformation().helpOption(flags,desc).helpCommand(name,desc).addHelpText(pos,textOrFn).showHelpAfterError(msg).showSuggestionAfterError(bool)
program.error(msg,{exitCode,code}).exitOverride(handler).configureOutput({writeOut,writeErr,outputError})
program.hook('preAction'|'postAction'|'preSubcommand',fn)
program.enablePositionalOptions().passThroughOptions().allowUnknownOption(bool).allowExcessArguments(bool).storeOptionsAsProperties(bool)
Options: boolean, <value>, [opt], <vals...>; access opts() or optsWithGlobals(); getOptionValue(key); setOptionValue(key,val); getOptionValueSource(key); setOptionValueWithSource(key,val,src)
Examples: .option('-p, --port <num>','port',80); .option('-i, --int <n>',parseIntStrict,0); program.command('split <str>').option('--first').option('-s, --sep <c>',',').action((str,opts)=>{})
Use parseAsync for async actions; exitOverride to catch errors; configureOutput for custom IO; addHelpText for usage info; showHelpAfterError to display help on error; showSuggestionAfterError to disable suggestions; enablePositionalOptions+passThroughOptions for nested CLIs


## Sanitised Extract
Contents
1 Installation and Imports
2 Command and Program Setup
3 Defining Options
4 Option Types and Behaviors
5 Defining Arguments
6 Subcommands
7 Action Handlers
8 Parsing Methods
9 Help System
10 Error and Exit Handling
11 Lifecycle Hooks
12 Advanced Configuration
13 TypeScript Support

1 Installation and Imports
 npm install commander
 import { program, Command, Option, InvalidArgumentError } from 'commander'

2 Command and Program Setup
 createCommand(): Command
 new Command([name]): Command
 program.name(string)
 program.description(string, summary?)
 program.version(string, flags?, description?)

3 Defining Options
 program.option(flags: string, description: string, defaultValue?)
 program.requiredOption(flags: string, description: string, defaultValue?)
 program.addOption(new Option(flags, description))

4 Option Types and Behaviors
 Boolean: --debug
 Value: -p, --port <number>
 Negatable: --no-feature
 Boolean|Value: --flag [value]
 Variadic: -n, --items <items...>
 Default values: .option(..., default)
 Custom parser: .option(flag, desc, parserFn, default)

5 Defining Arguments
 program.argument(name: string, description?: string, defaultValue?)
 Variadic argument: <args...>

6 Subcommands
 program.command(nameAndArgs: string, description?, opts?)
 .addCommand(cmd)
 .alias(alias)
 isDefault, hidden, executableFile

7 Action Handlers
 .action(fn)
 fn receives declared args, options object, and command instance
 Async handlers: use .parseAsync

8 Parsing Methods
 program.parse([argv], {from})
 program.parseAsync([argv], {from})
 from: 'node' | 'electron' | 'user'

9 Help System
 Auto-generated: -h, --help
 .helpOption(flags?, description?)
 .helpCommand(name?, description?)
 .addHelpText(position, textOrFn)
 .showHelpAfterError(msg?)
 .showSuggestionAfterError(enable)

10 Error and Exit Handling
 .error(message, {exitCode, code})
 .exitOverride([handler])
 .configureOutput({writeOut, writeErr, outputError})

11 Lifecycle Hooks
 .hook(event, fn)
 event: 'preAction','postAction','preSubcommand'

12 Advanced Configuration
 .enablePositionalOptions()
 .passThroughOptions()
 .allowUnknownOption(allow)
 .allowExcessArguments(allow)
 .storeOptionsAsProperties(store)

13 TypeScript Support
 Install @commander-js/extra-typings
 Strong typing for .opts() and .action parameters

## Original Source
Commander.js – Node.js CLI Framework
https://github.com/tj/commander.js#readme

## Digest of COMMANDER_JS

# Commander.js CLI Framework - Technical Reference

Date retrieved: 2024-06-10  
Source: https://github.com/tj/commander.js#readme  
Data size: 790299 bytes

## Installation

Execute:

npm install commander

Import in code:

CommonJS:  
const { program, Command, Option, InvalidArgumentError } = require('commander');

ESM:  
import { program, Command, Option, InvalidArgumentError } from 'commander';

## Core API Methods and Signatures

### Command Creation

createCommand(): Command
new Command(name?: string): Command
program.name(string): Command
program.description(string, summary?: string): Command
program.version(string, flags?: string, description?: string): Command

### Option Definition

program.option(flags: string, description: string, defaultValue?: any): Command
program.requiredOption(flags: string, description: string, defaultValue?: any): Command
program.addOption(option: Option): Command

Option class:
new Option(flags: string, description?: string)
.option.default(value: any, description?: string): Option
.option.choices(values: any[]): Option
.option.env(name: string): Option
.option.preset(value: any): Option
.option.argParser(fn: (val: string, prev: any) => any): Option
.option.conflicts(key: string): Option
.option.implies(mapping: Record<string, any>): Option
.option.hideHelp(): Option
.option.makeOptionMandatory(): Option

### Argument Definition

program.argument(name: string, description?: string, defaultValue?: any): Command
program.arguments(string): Command
program.addArgument(arg: Argument): Command

### Subcommands

program.command(nameAndArgs: string, description?: string, opts?: { isDefault?: boolean, hidden?: boolean, executableFile?: string }): Command | this
program.addCommand(cmd: Command): this
program.alias(alias: string): Command

### Action Handlers

program.action(fn: (...args: any[]) => void | Promise<any>): Command
fn signature: (arg1, arg2, ..., options: Record<string, any>, command: Command) => void or Promise<void>

### Parsing

program.parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
program.parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>

### Help and Output

program.help(): void  // exits
program.outputHelp(options?: { error?: boolean }): void
program.helpInformation(): string
program.helpOption(flags: string|false, description?: string): Command
program.helpCommand(name?: string|false, description?: string): Command
program.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|(ctx:{error:boolean,command:Command})=>string): Command
program.showHelpAfterError(message?: string): Command
program.showSuggestionAfterError(enable?: boolean): Command

### Error and Exit Handling

program.error(message: string, options?: { exitCode?: number, code?: string }): void  // calls process.exit
program.exitOverride(handler?: (err: CommanderError) => void): Command
program.configureOutput(options: {
  writeOut?: (str: string) => void,
  writeErr?: (str: string) => void,
  outputError?: (str: string, write: (s:string)=>void) => void
}): Command

### Lifecycle Hooks

program.hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCommand:Command, actionCommand:Command) => void|Promise<void>): Command

## Configuration Options

.enablePositionalOptions(): Command  // process only options before args
.passThroughOptions(): Command      // allow unknown options to pass through
.allowUnknownOption(allow?: boolean): Command  // treat unknown options as args
.allowExcessArguments(allow?: boolean): Command // allow extra arguments
.storeOptionsAsProperties(store?: boolean): Command // legacy .debug vs opts().debug

## TypeScript Support

Optional package: @commander-js/extra-typings

## Examples

### Defining and Parsing Options

program.option('-p, --port <number>', 'server port number', 80)
       .option('--trace', 'add extra debugging output')
       .parse(process.argv);
const opts = program.opts();
console.log(opts.port, opts.trace);

### Custom Option Processing

function parseIntStrict(val, prev) {
  const v = parseInt(val, 10);
  if (isNaN(v)) throw new InvalidArgumentError('Not a number.');
  return v;
}
program.option('-i, --int <n>', 'integer', parseIntStrict, 0);

### Subcommands with Action Handlers

program.command('clone <src> [dest]')
       .description('clone repo')
       .option('-r, --recursive', 'clone recursively')
       .action((src, dest, options) => {
         // implement
       });

### Stand-alone Executable Subcommands

program.command('install [pkgs...]', 'install packages', { executableFile: 'myInstall' });

### Async Parsing

program.command('run').action(async () => {/*...*/});
await program.parseAsync(process.argv);

### Help Customization

program.addHelpText('after', '\nExample: $ myprog --help');
program.showHelpAfterError('(add --help for info)');

## Attribution
- Source: Commander.js – Node.js CLI Framework
- URL: https://github.com/tj/commander.js#readme
- License: MIT License
- Crawl Date: 2025-05-02T19:00:14.970Z
- Data Size: 790299 bytes
- Links Found: 5494

## Retrieved
2025-05-02
library/RDF_CONCEPTS.md
# library/RDF_CONCEPTS.md
# RDF_CONCEPTS

## Crawl Summary
RDF graphs are sets of triples subject predicate object with terms IRI blank node literal. IRIs must be absolute RFC3987 strings; equality via string comparison. Literals are lexical form datatype IRI optional language tag; simple literals map to xsd:string. Blank nodes local anonymous identifiers; use Skolem IRIs under /.well-known/genid/ for global identification. RDF datasets include one default graph and named graphs with unique names. Recognized datatypes are RDF-compatible XSD types and rdf:HTML rdf:XMLLiteral. Graph and dataset isomorphism defined by bijection on blank nodes preserving terms.

## Normalised Extract
Table of Contents:
1. RDF Triple Structure
2. RDF Term Specifications
3. IRI Syntax and Equality
4. Literal Composition and Value Mapping
5. Blank Node Handling and Skolemization
6. RDF Graph Definition
7. RDF Dataset Structure
8. Recognized Datatype IRIs

1. RDF Triple Structure
Subject: IRI or blank node
Predicate: IRI
Object: IRI, literal, or blank node
Triples form unordered sets representing RDF graphs.

2. RDF Term Specifications
IRI: Unicode string per RFC3987 absolute form
Literal: lexical form, datatype IRI, optional language tag for rdf:langString; simple literal equals xsd:string
Blank node: anonymous term, not equal to any IRI or literal

3. IRI Syntax and Equality
IRIs must conform to RFC3987 syntax, be absolute, may include fragments. Compare IRIs by exact character sequence. Avoid non-normal forms: uppercase scheme or domain, unnecessary percent-encoding, default ports, empty path, dot segments, lowercase hex in percent-encoding, non-NFC Unicode.

4. Literal Composition and Value Mapping
Lexical form must be Unicode NFC. Datatype IRI directs lexical-to-value function. If lexical form outside datatype lexical space, literal is ill-typed but accepted. Language-tagged strings use rdf:langString and valid BCP47 tag.

5. Blank Node Handling and Skolemization
Blank nodes carry no global identifier. To substitute, generate Skolem IRIs under authority A: https://A/.well-known/genid/UniqueSuffix. Enables ID persistence and exchange.

6. RDF Graph Definition
Graph: set of triples. Graph isomorphism: existence of bijection mapping blank nodes between graphs preserving IRIs, literals, and triple membership.

7. RDF Dataset Structure
Dataset: one default graph plus zero or more named graphs. Named graph: pair (nameTerm, RDF graph), where nameTerm is IRI or blank node. Graph names unique. Blank nodes may be shared across graphs. SPARQL 1.1 requires IRI names; skolemize blank nodes when targeting SPARQL.

8. Recognized Datatype IRIs
All http://www.w3.org/2001/XMLSchema#xxx must refer to xsd:xxx RDF-compatible type. Allocate rdf:HTML at http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML and rdf:XMLLiteral at http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral. Datatypes define lexical space value space and mapping.

## Supplementary Details
IRI Normalization Checklist:
- scheme and authority to lowercase
- omit default port
- ensure non-empty path ending with '/'
- remove '/./' and '/../'
- uppercase hex in percent-encoding
- NFC normalization

Recommended RDF-Compatible XSD Types (IRI and Value Space):
xsd:string: Unicode strings
xsd:boolean: {"true","false","1","0"}
xsd:integer: arbitrary precision integers
xsd:decimal: arbitrary precision decimals
xsd:float: IEEE 754 32-bit
xsd:double: IEEE 754 64-bit
xsd:date: YYYY-MM-DD with optional timezone
xsd:dateTime: ISO 8601 date-time
xsd:duration: ISO 8601 durations
xsd:hexBinary: hex-encoded binary
xsd:base64Binary: base64-encoded binary

Skolemization Implementation Steps:
1. For each blank node in graph, generate UUID or counter
2. Construct Skolem IRI: baseAuthority + '/.well-known/genid/' + identifier
3. Replace blank node label with Skolem IRI in each triple

Dataset Construction Pattern:
1. Define defaultGraphTriples array
2. Define namedGraphs map from IRI/blank node to triple arrays
3. When serializing for SPARQL, ensure all graph names are IRIs; replace blank node names with Skolem IRIs


## Reference Details
RDF Graph Model API Signatures (pseudocode):
interface RDFTerm {}
class NamedNode implements RDFTerm {
  constructor(value: string)
  value: string // absolute IRI
}
class BlankNode implements RDFTerm {
  constructor(id?: string)
  id: string // local identifier
}
class Literal implements RDFTerm {
  constructor(value: string, datatype?: NamedNode, language?: string)
  value: string
  datatype: NamedNode
  language: string
}
class Triple {
  constructor(subject: RDFTerm, predicate: NamedNode, object: RDFTerm)
  subject: RDFTerm
  predicate: NamedNode
  object: RDFTerm
}
class Graph {
  triples: Set<Triple>
  add(triple: Triple): void
  has(triple: Triple): boolean
  isomorphic(other: Graph): boolean
}
class Dataset {
  defaultGraph: Graph
  namedGraphs: Map<RDFTerm, Graph>
  addNamedGraph(name: RDFTerm, graph: Graph): void
  getGraph(name: RDFTerm): Graph | undefined
}

Code Example: Skolemizing blank nodes
const graph = new Graph();
graph.add(new BlankNode('b0'), new NamedNode('http://example.com/p'), new Literal('value', new NamedNode('http://www.w3.org/2001/XMLSchema#string')));
const skolemBase = 'http://example.com/.well-known/genid/';
let counter=0;
graph.triples.forEach(t => {
  if (t.subject instanceof BlankNode) {
    t.subject = new NamedNode(skolemBase + (counter++));
  }
  if (t.object instanceof BlankNode) {
    t.object = new NamedNode(skolemBase + (counter++));
  }
});

Best Practice: Always normalize IRIs at creation:
function normalizeIri(iri: string): string {
  // use ICU or URL API to lowercase host, remove default port, normalize path, NFC
}

Troubleshooting:
Command: rapper -i turtle -o ntriples input.ttl > output.nt
Expected: no syntax errors, resulting N-Triples on stdout
If ill-typed literal encountered, warnings like "Warning: ill-typed literal 'abc'^^<xsd:integer>"

SPARQL Dataset Usage:
When using GRAPH ?g { ?s ?p ?o }, ensure ?g bound only to IRI values. If dataset contains blank-node-named graphs, skolemize first to avoid empty results.

## Information Dense Extract
Triples: subject(IR|BN) predicate(IR) object(IR|LT|BN). IRIs: RFC3987 absolute, simple string comparison, normalize scheme/host lowercase, remove default port, percent-encoding uppercase, strip dot segments, NFC. Literals: (lexicalForm, datatypeIRI, [langTag]), simpleLiterals map to xsd:string, illTyped accepted. BlankNodes local, skolemize to https://domain/.well-known/genid/ID. Graph: set<Triple>, isomorphic if blank-node bijection. Dataset: defaultGraph + Map<name(RI|BN),Graph>, SPARQL requires IRI names. Recognized Datatypes: xsd:string, boolean, integer, decimal, float, double, date, dateTime, duration, hexBinary, base64Binary, rdf:HTML, rdf:XMLLiteral. API classes: NamedNode(value), BlankNode(id), Literal(value,datatype,lang), Triple(s,p,o), Graph.add(),isomorphic(), Dataset.addNamedGraph(),getGraph(). Normalize IRIs on creation. Skolemization code pattern. Troubleshoot with rapper CLI: warnings for ill-typed literals.

## Sanitised Extract
Table of Contents:
1. RDF Triple Structure
2. RDF Term Specifications
3. IRI Syntax and Equality
4. Literal Composition and Value Mapping
5. Blank Node Handling and Skolemization
6. RDF Graph Definition
7. RDF Dataset Structure
8. Recognized Datatype IRIs

1. RDF Triple Structure
Subject: IRI or blank node
Predicate: IRI
Object: IRI, literal, or blank node
Triples form unordered sets representing RDF graphs.

2. RDF Term Specifications
IRI: Unicode string per RFC3987 absolute form
Literal: lexical form, datatype IRI, optional language tag for rdf:langString; simple literal equals xsd:string
Blank node: anonymous term, not equal to any IRI or literal

3. IRI Syntax and Equality
IRIs must conform to RFC3987 syntax, be absolute, may include fragments. Compare IRIs by exact character sequence. Avoid non-normal forms: uppercase scheme or domain, unnecessary percent-encoding, default ports, empty path, dot segments, lowercase hex in percent-encoding, non-NFC Unicode.

4. Literal Composition and Value Mapping
Lexical form must be Unicode NFC. Datatype IRI directs lexical-to-value function. If lexical form outside datatype lexical space, literal is ill-typed but accepted. Language-tagged strings use rdf:langString and valid BCP47 tag.

5. Blank Node Handling and Skolemization
Blank nodes carry no global identifier. To substitute, generate Skolem IRIs under authority A: https://A/.well-known/genid/UniqueSuffix. Enables ID persistence and exchange.

6. RDF Graph Definition
Graph: set of triples. Graph isomorphism: existence of bijection mapping blank nodes between graphs preserving IRIs, literals, and triple membership.

7. RDF Dataset Structure
Dataset: one default graph plus zero or more named graphs. Named graph: pair (nameTerm, RDF graph), where nameTerm is IRI or blank node. Graph names unique. Blank nodes may be shared across graphs. SPARQL 1.1 requires IRI names; skolemize blank nodes when targeting SPARQL.

8. Recognized Datatype IRIs
All http://www.w3.org/2001/XMLSchema#xxx must refer to xsd:xxx RDF-compatible type. Allocate rdf:HTML at http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML and rdf:XMLLiteral at http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral. Datatypes define lexical space value space and mapping.

## Original Source
RDF 1.1 Concepts and Abstract Syntax
https://www.w3.org/TR/rdf11-concepts/

## Digest of RDF_CONCEPTS

# RDF Triples
An RDF triple consists of three components:
- Subject: an IRI or a blank node
- Predicate: an IRI
- Object: an IRI, a literal, or a blank node
Triples are ordered as subject predicate object and collected in sets called RDF graphs.

# RDF Terms
IRIs, literals, and blank nodes. Term equality:
- IRI equality: simple string comparison per RFC3987 section 5.1, no further normalization
- Literal equality: identical lexical form, datatype IRI, and language tag if present
- Blank nodes: disjoint from IRIs and literals; identifiers not part of abstract syntax

# IRIs
Syntax: Unicode string conforming to RFC3987, absolute, may contain fragment identifiers
Normalization to avoid interoperability issues:
- Lowercase scheme and domain
- Avoid unnecessary percent-encoding
- Omit default port 80 in HTTP
- Ensure non-empty path
- Remove "/./" and "/../"
- Use uppercase hex digits in percent-encoding
- Unicode Normalization Form C

# Literals
Components:
- Lexical form: Unicode string (should be NFC)
- Datatype IRI: identifies mapping from lexical form to value
- Optional language tag for rdf:langString
Simple literal without datatype or language tag defaults to datatype xsd:string
Datatype mapping:
- If recognized, apply lexical-to-value mapping or accept ill-typed as graph generation

# Blank Nodes and Skolemization
Blank nodes are anonymous; to skolemize, mint a unique IRI per blank node. Use well-known IRI path /.well-known/genid/ under an HTTP or HTTPS authority. Example: http://example.com/.well-known/genid/12345

# RDF Graphs
An RDF graph is a set of triples. Graph isomorphism defined via bijection on blank nodes preserving IRIs and literals.

# RDF Datasets
Consist of exactly one default graph and zero or more named graphs (IRI or blank node name paired with graph). Named graphs may share blank nodes with the default graph. SPARQL uses only IRI names for named graphs; skolemize blank-node graph names to IRI to avoid interoperability issues.

# Datatypes
Recognized datatype IRIs must refer to RDF-compatible XSD types (http://www.w3.org/2001/XMLSchema#xxx) or rdf:HTML, rdf:XMLLiteral. XML Schema types and mapping:
- boolean, integer, decimal, float, double, string, dateTime, etc.

# Fragment Identifiers
Any IRI fragment identifier is part of the IRI; resolution and interaction outside abstract syntax not defined here.

## Attribution
- Source: RDF 1.1 Concepts and Abstract Syntax
- URL: https://www.w3.org/TR/rdf11-concepts/
- License: W3C Document License (CC-BY 4.0)
- Crawl Date: 2025-05-02T20:24:00.529Z
- Data Size: 49707300 bytes
- Links Found: 139852

## Retrieved
2025-05-02
library/GEONAMES_WEBSERVICES.md
# library/GEONAMES_WEBSERVICES.md
# GEONAMES_WEBSERVICES

## Crawl Summary
Authentication: every request must include `username`. Register account and enable via confirmation link.
Rate Limits: 10 000 daily, 1 000 hourly credits per `username`, 1 credit per request, HTTP 503 on exceed.
Endpoints: REST GET at `api.geonames.org` (HTTP) or `secure.geonames.org` (HTTPS); append `JSON` to path for JSON output; default XML.
Common Params: `username`(required), `style`(SHORT|MEDIUM|LONG|FULL; default MEDIUM), `charset`(UTF-8), `maxRows`, `lat`,`lng`,`radius`.
Postal Code Search: `/postalCodeSearch`, filters by `postalcode`, `placename`, supports wildcards and bounding box.
Reverse Geocoding: `/findNearbyPostalCodes`, `/findNearbyPlaceName`, `/findNearby`, `/extendedFindNearby`.
Country Data: `/postalCodeCountryInfo`, `/countryInfo`, `/countryCode`, `/countrySubdivision`.
Geospatial: `/ocean`, `/neighbourhood`, `/srtm1`,`/srtm3`,`/astergdem`,`/gtopo30`,`/timezone`.
Restrictions: CA/IE/MT partial codes, AR 4-digit codes, BR major codes only.

## Normalised Extract
Table of Contents:
1. Authentication
2. Rate Limits
3. Secure and JSON Endpoints
4. Common Parameters
5. Postal Code Restrictions
6. Postal Code Search Endpoint
7. Reverse Geocoding Endpoints
8. Country Information Endpoints
9. Geospatial and Elevation Endpoints
10. Timezone Endpoint

1. Authentication
  username: string, required. Register account, confirm email.

2. Rate Limits
  dailyCredits: int = 10000 per username
  hourlyCredits: int = 1000 per username
  creditPerRequest: 1
  onLimitExceeded: HTTP 503 + error payload

3. Secure and JSON Endpoints
  hostHTTP: api.geonames.org
  hostHTTPS: secure.geonames.org
  outputXML: /endpoint
  outputJSON: /endpointJSON
  charset: UTF-8 URL encoding required

4. Common Parameters
  style: enum {SHORT,MEDIUM,LONG,FULL}, default MEDIUM
  charset: string, default UTF-8
  maxRows: integer, default varies
  lat,lng: float (WGS84)
  radius: float (km)

5. Postal Code Restrictions
  CA, IE, MT: only initial letters
  AR: 4-digit codes
  BR: codes ending 000 only

6. Postal Code Search Endpoint
  HTTP GET /postalCodeSearch
  Required: postalcode or placename
  Optional: postalcode_startsWith, placename_startsWith, country (ISO-3166, repeatable), countryBias, operator (AND|OR, default AND), east,west,north,south
  Response: list of postal codes with place name, countryCode, adminName, lat, lng, distance

7. Reverse Geocoding Endpoints
  - findNearbyPostalCodes: /findNearbyPostalCodes
     params: lat,lng or postalcode,country; radius, maxRows, style, localCountry, isReduced
  - findNearbyPlaceName: /findNearbyPlaceName
     params: lat,lng, lang, radius, maxRows, style, localCountry, cities filter
  - findNearby: /findNearby
     params: lat,lng, featureClass, featureCode[], radius, maxRows, style, localCountry
  - extendedFindNearby: /extendedFindNearby
     params: lat,lng

8. Country Information Endpoints
  - postalCodeCountryInfo: /postalCodeCountryInfo
  - countryInfo: /countryInfo, params: country[], lang
  - countryCode: /countryCode, params: lat,lng, type(xml|JSON), lang, radius
  - countrySubdivision: /countrySubdivision, params: lat,lng, lang, level, radius, maxRows

9. Geospatial and Elevation Endpoints
  - ocean: /ocean, params: lat,lng, radius
  - neighbourhood: /neighbourhood, params: lat,lng
  - srtm1: /srtm1, params: lat,lng or lists lats[], lngs[]
  - srtm3: /srtm3, same as srtm1
  - astergdem: /astergdem, same pattern
  - gtopo30: /gtopo30, params: lat,lng

10. Timezone Endpoint
  GET /timezone
  params: lat,lng, radius, lang, date
  response: countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, dstOffset


## Supplementary Details
Secure Endpoint Configuration:
  - Use HTTPS by directing requests to secure.geonames.org
  - No change to path or parameters when switching to HTTPS

URL Encoding:
  - All string parameters must be UTF-8 URL-encoded (spaces → %20, accents → %C3%A9, etc.)

JSON vs XML:
  - Default response: XML
  - For JSON: call `<endpoint>JSON` and set `Accept: application/json`

Client Integration Patterns:
  - Browser: use JSON endpoints to avoid CORS XML issues
  - Server: choose XML or JSON based on toolchain

Error Handling Steps:
  1. Check HTTP status; non-200 indicates transport error
  2. Check response body for `<status><message>...` or JSON `status` object
  3. On limit breach, catch HTTP 503 and implement exponential backoff

Registration Workflow:
  1. POST no payload; visit registration URL
  2. Confirm via email link
  3. Enable WebService on account page


## Reference Details
### Common HTTP Request
ingetRequest(endpoint, params) {
  baseURL = 'https://api.geonames.org';
  url = baseURL + endpoint;
  query = '?' + Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  return fetch(url + query).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  });
}

### postalCodeSearch
HTTP GET https://api.geonames.org/postalCodeSearch
Parameters:
  postalcode: string, required if placename not set
  placename: string, required if postalcode not set
  postalcode_startsWith: string, optional
  placename_startsWith: string, optional
  country: ISO-3166 code, optional, repeatable
  countryBias: string, optional
  operator: enum {AND,OR}, default AND
  maxRows: integer, default 10
  style: enum {SHORT,MEDIUM,LONG,FULL}, default MEDIUM
  charset: string, default UTF-8
  isReduced: boolean, default false
  east,west,north,south: float bounding box, optional
Response Types:
  XML: `<geonames><code>…</code>…</geonames>`
  JSON: `{"geonames":[{postalcode,name,countryCode,adminName1,lat,lng,...}]}`
Example (curl):
  curl "https://api.geonames.org/postalCodeSearchJSON?postalcode=9011&maxRows=10&username=demo"

### findNearbyPostalCodes
HTTP GET https://api.geonames.org/findNearbyPostalCodes
Parameters (lat/lng mode):
  lat,lng: float required
  radius: float km, default 5
  maxRows: integer, default 5
  style: enum, default MEDIUM
  country: ISO-3166, optional
  localCountry: boolean, default false
  isReduced: boolean, default true on commercial servers
Parameters (postalcode mode):
  postalcode: string
  country: ISO-3166
  radius,maxRows,style same as above
Returns: list sorted by distance, XML or JSON structure

### findNearbyPlaceName
HTTP GET /findNearbyPlaceName
Parameters: lat,lng; lang; radius; maxRows; style; localCountry; cities filter {cities1000,cities5000,cities15000}
Response: nearest populated place (featureClass=P)

### countryInfo
HTTP GET /countryInfo
Parameters: country (code), lang
Response: list of country records: countryCode, countryName, capital, population, areaInSqKm, bbox
CSV variant: /countryInfoCSV

### countryCode
HTTP GET /countryCode
Parameters: lat,lng; type(xml|JSON); lang; radius
Response XML: `<countryCode>US</countryCode><countryName>United States</countryName>`
JSON: `{"countryCode":"US","countryName":"United States"}`

### countrySubdivision
HTTP GET /countrySubdivision
Parameters: lat,lng; lang; level; radius; maxRows
Response: administrative subdivisions with code and name

### ocean
HTTP GET /ocean
Parameters: lat,lng; radius
Response: `<ocean>Atlantic Ocean</ocean>` or JSON

### neighbourhood
HTTP GET /neighbourhood
Parameters: lat,lng
Response: `<neighbourhood>Upper West Side</neighbourhood>`

### Elevation Services (srtm1, srtm3, astergdem, gtopo30)
HTTP GET /{srtm1|srtm3|astergdem|gtopo30}
Parameters: lat,lng or lists lats[],lngs[]; username; GET or POST allowed
Response: single integer per point. No-data flagged as -32768 or -9999
Limits: free server max 20 points; premium 2000 points

### timezone
HTTP GET /timezone
Parameters: lat,lng; radius; lang; date (YYYY-MM-DD)
Response JSON: {countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, dstOffset}

### Implementation Best Practices
- Use JSON endpoints in browser to avoid XML/CORS issues
- Back off and retry on HTTP 503
- Cache static endpoints (countryInfo, postalCodeCountryInfo)
- Batch elevation requests when possible

### Troubleshooting Commands
- Verbose HTTP: `curl -v "https://api.geonames.org/countryInfo?username=demo"`
- Check rate limit errors: look for HTTP 503 and `<status><message>daily limit` or JSON `{status:{message}}`


## Information Dense Extract
username(required); dailyCredits=10000,hourlyCredits=1000; host=api.geonames.org or secure.geonames.org; default output=XML, JSON=endpointJSON;
commonParams={style:[SHORT,MEDIUM,LONG,FULL]=MEDIUM,charset=UTF-8,maxRows,varies,lat:float,lng:float,radius:float};
postalCodeSearch GET /postalCodeSearch?postalcode=string|placename=string&[,postalcode_startsWith,placename_startsWith,country=ISO-3166+,countryBias,operator=[AND|OR],east,west,north,south];
findNearbyPostalCodes GET /findNearbyPostalCodes?lat=float&lng=float or postalcode=string&country=ISO-3166[,radius,maxRows,style,localCountry,isReduced];
findNearbyPlaceName GET /findNearbyPlaceName?lat,lng,lang,radius,maxRows,style,localCountry,citiesFilter;
countryInfo GET /countryInfo?username&[country=ISO-3166+,lang];
countryCode GET /countryCode?lat,lng[,type=xml|JSON,lang,radius];
countrySubdivision GET /countrySubdivision?lat,lng[,lang,level,radius,maxRows];
ocean GET /ocean?lat,lng; neighbourhood GET /neighbourhood?lat,lng;
elevation GET /{srtm1|srtm3|astergdem|gtopo30}?lat,lng or lats[],lngs[]; pointsLimit free=20,premium=2000;
timezone GET /timezone?lat,lng[,radius,lang,date]; responses include offsets,sunrise/sunset; errors=HTTP503+{status.message}.

## Sanitised Extract
Table of Contents:
1. Authentication
2. Rate Limits
3. Secure and JSON Endpoints
4. Common Parameters
5. Postal Code Restrictions
6. Postal Code Search Endpoint
7. Reverse Geocoding Endpoints
8. Country Information Endpoints
9. Geospatial and Elevation Endpoints
10. Timezone Endpoint

1. Authentication
  username: string, required. Register account, confirm email.

2. Rate Limits
  dailyCredits: int = 10000 per username
  hourlyCredits: int = 1000 per username
  creditPerRequest: 1
  onLimitExceeded: HTTP 503 + error payload

3. Secure and JSON Endpoints
  hostHTTP: api.geonames.org
  hostHTTPS: secure.geonames.org
  outputXML: /endpoint
  outputJSON: /endpointJSON
  charset: UTF-8 URL encoding required

4. Common Parameters
  style: enum {SHORT,MEDIUM,LONG,FULL}, default MEDIUM
  charset: string, default UTF-8
  maxRows: integer, default varies
  lat,lng: float (WGS84)
  radius: float (km)

5. Postal Code Restrictions
  CA, IE, MT: only initial letters
  AR: 4-digit codes
  BR: codes ending 000 only

6. Postal Code Search Endpoint
  HTTP GET /postalCodeSearch
  Required: postalcode or placename
  Optional: postalcode_startsWith, placename_startsWith, country (ISO-3166, repeatable), countryBias, operator (AND|OR, default AND), east,west,north,south
  Response: list of postal codes with place name, countryCode, adminName, lat, lng, distance

7. Reverse Geocoding Endpoints
  - findNearbyPostalCodes: /findNearbyPostalCodes
     params: lat,lng or postalcode,country; radius, maxRows, style, localCountry, isReduced
  - findNearbyPlaceName: /findNearbyPlaceName
     params: lat,lng, lang, radius, maxRows, style, localCountry, cities filter
  - findNearby: /findNearby
     params: lat,lng, featureClass, featureCode[], radius, maxRows, style, localCountry
  - extendedFindNearby: /extendedFindNearby
     params: lat,lng

8. Country Information Endpoints
  - postalCodeCountryInfo: /postalCodeCountryInfo
  - countryInfo: /countryInfo, params: country[], lang
  - countryCode: /countryCode, params: lat,lng, type(xml|JSON), lang, radius
  - countrySubdivision: /countrySubdivision, params: lat,lng, lang, level, radius, maxRows

9. Geospatial and Elevation Endpoints
  - ocean: /ocean, params: lat,lng, radius
  - neighbourhood: /neighbourhood, params: lat,lng
  - srtm1: /srtm1, params: lat,lng or lists lats[], lngs[]
  - srtm3: /srtm3, same as srtm1
  - astergdem: /astergdem, same pattern
  - gtopo30: /gtopo30, params: lat,lng

10. Timezone Endpoint
  GET /timezone
  params: lat,lng, radius, lang, date
  response: countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, dstOffset

## Original Source
GeoNames Web Services
http://www.geonames.org/export/ws-overview.html

## Digest of GEONAMES_WEBSERVICES

# GeoNames Web Services

Retrieved: 2024-07-04
Data Size: 831367 bytes
Source Contact: info@geonames.org

## Authentication
All REST endpoints require a `username` query parameter. Register at http://www.geonames.org/login, confirm by email, then enable on your account page.

## Rate Limits and Credits
- Daily limit: 10 000 credits per `username`.
- Hourly limit: 1 000 credits per `username`.
- Each request consumes 1 credit; on limit breach the service responds with HTTP 503 and an error payload.

## Secure Endpoint
Switch host from `api.geonames.org` to `secure.geonames.org` for HTTPS.

## JSON vs XML
- Append `JSON` to the endpoint path for JSON output (e.g. `/postalCodeSearchJSON`).
- Default output is XML.
- Always URL-encode parameters using UTF-8.

## Common Query Parameters
- `username` (string, required)
- `style` (enum: SHORT, MEDIUM, LONG, FULL; default = MEDIUM)
- `charset` (string; default = UTF-8)
- `maxRows` (integer; default varies by service)
- `lat`, `lng` (float; WGS84)
- `radius` (float; kilometers)

## Postal Code Restrictions
- CA, IE, MT: only initial letters of full codes
- AR: 4-digit codes only
- BR: codes ending “000” only

## Key Endpoints

### postalCodeSearch
**URL**  GET `/postalCodeSearch?postalcode={string}&username={string}[…]&maxRows={int}&style={enum}`
Returns postal code data by code or place name. US first result uses area shape; others use centroid.

### findNearbyPostalCodes
**URL**  GET `/findNearbyPostalCodes?lat={float}&lng={float}&username={string}[…]&radius={float}&maxRows={int}`
Reverse-geocoding via coordinates or postal code; sorted by distance.

### findNearbyPlaceName
**URL**  GET `/findNearbyPlaceName?lat={float}&lng={float}&username={string}[…]&lang={string}&radius={float}&maxRows={int}`
Closest populated place (featureClass = P).

### countryInfo
**URL**  GET `/countryInfo?username={string}[&country={ISO-3166}][&lang={string}]`
Returns capital, population, area, bounding box.

### countryCode
**URL**  GET `/countryCode?lat={float}&lng={float}&username={string}[&type={xml|JSON}][&radius={float}]`
ISO code (+ country name if `type=xml`).

### countrySubdivision
**URL**  GET `/countrySubdivision?lat={float}&lng={float}&username={string}[&lang={string}][&level={int}][&radius={float}][&maxRows={int}]`
Returns adm division names and codes.

### ocean
**URL**  GET `/ocean?lat={float}&lng={float}&username={string}`
Returns ocean or sea name.

### neighbourhood
**URL**  GET `/neighbourhood?lat={float}&lng={float}&username={string}`
Returns US neighbourhood (Zillow cc-by-sa).

### srtm1 / srtm3 / astergdem / gtopo30
**URL**  GET `/{service}?lat={float}&lng={float}&username={string}[&lats={list}&lngs={list}]`
Returns elevation (integer meters; masked as –32768 or –9999 for no data).

### timezone
**URL**  GET `/timezone?lat={float}&lng={float}&username={string}[&radius={float}][&lang={string}][&date={YYYY-MM-DD}]`
Returns raw and DST offsets, local time, sunrise/sunset.


## Attribution
- Source: GeoNames Web Services
- URL: http://www.geonames.org/export/ws-overview.html
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Crawl Date: 2025-05-02T20:02:28.667Z
- Data Size: 831367 bytes
- Links Found: 3002

## Retrieved
2025-05-02
