# OCLIF_INTRO

## Crawl Summary
Install oclif CLI globally via npm. Generate a new project with "oclif generate <name>", answering prompts for module-type (ESM|CommonJS), npm package name, and binary name. Development mode uses bin/dev.js, production mode uses bin/run.js. Initialize an existing project with "oclif init", supplying flags --bin, --module-type, --package-manager, --topic-separator, --output-dir, --yes. init adds bin scripts, oclif section to package.json (fields bin, dirname, commands, topicSeparator), dependencies @oclif/core and ts-node. Create commands via "oclif generate command <topic:command>", defining class extending Command with static description, flags, args, and async run returning Promise<void>. Create hooks via "oclif generate hook <name> --event <lifecycle>". package.json oclif section supports bin, dirname, commands, topicSeparator. Flag definitions use Flags.boolean, Flags.string, Flags.integer with char, description, default, required. Args defined as array of {name, description, required}.

## Normalised Extract
Table of Contents

1 Installation
2 Project Generation
3 Development & Production Execution
4 Initialization in Existing Project
5 Command Creation
6 Hook Creation
7 Configuration Options
8 Flags Definition
9 Arguments Definition

1 Installation

Install oclif CLI globally

$ npm install --global oclif

2 Project Generation

$ oclif generate mynewcli
Prompts:
  module type  ESM or CommonJS
  npm package name  mynewcli
  command bin name  mynewcli

3 Development & Production Execution

Development mode:
$ ./bin/dev.js hello world
Production mode:
$ ./bin/run.js hello world

4 Initialization in Existing Project

$ oclif init --output-dir=/path/to/project --bin=my-pkg --module-type=CommonJS --package-manager=npm --topic-separator=spaces --yes
Creates:
  bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
  package.json oclif section with fields:
    bin: my-pkg
    dirname: ./src/commands
    commands: ./src/commands
    topicSeparator: " "
  dependencies: @oclif/core
  devDependencies: ts-node

5 Command Creation

$ oclif generate command foo:bar
Creates src/commands/foo/bar.ts
Class skeleton:
import {Command, Flags} from '@oclif/core'
export default class FooBar extends Command {
  static description = '...'
  static flags = { force: Flags.boolean({char: 'f', description: '...', default: false}) }
  static args = [{name: 'input', required: true, description: '...'}]
  async run(): Promise<void> { const {args, flags} = await this.parse(FooBar) }
}

6 Hook Creation

$ oclif generate hook my-hook --event init
Creates src/hooks/my-hook.ts

7 Configuration Options

package.json oclif section:
  bin          string   CLI executable name
  dirname      string   path to commands folder
  commands     string   path or glob for commands
  topicSeparator string ":" or " "

8 Flags Definition

static flags = {
  count: Flags.integer({char: 'c', description: '...', default: 1, required: true}),
  name: Flags.string({char: 'n', description: '...', required: false}),
}

9 Arguments Definition

static args = [ { name: 'file', description: '...', required: true } ]

## Supplementary Details
Exact package.json changes when running init:

Add under dependencies:
  "@oclif/core": "^<version>"
Add under devDependencies:
  "ts-node": "^<version>"

After init, package.json entry:
"oclif": {
  "bin": "my-pkg",
  "dirname": "./src/commands",
  "commands": "./src/commands",
  "topicSeparator": " "
}

Generated bin scripts content:

bin/run.js:
#!/usr/bin/env node
require('@oclif/command').run()

bin/dev.js:
#!/usr/bin/env node
process.env.NODE_ENV='development'
require('@oclif/command').run()

Configuration step-by-step:
1 install oclif CLI
2 run oclif init in existing project directory
3 verify package.json oclif section
4 add commands or hooks via generate
5 run dev and run scripts

Flag options for init command:
--output-dir <value>  default: cwd
--bin <value>         default: package.json "name"
--module-type <ESM|CommonJS> default: ESM
--package-manager <npm|yarn|pnpm> default: npm
--topic-separator <colons|spaces> default: colons
-y, --yes             use defaults for all prompts



## Reference Details
CLI Commands

1 npm install --global oclif
2 oclif generate <name>
   Options:
     --language <TypeScript|JavaScript>   default: TypeScript
     --module-type <ESM|CommonJS>         default: ESM
     --package-manager <npm|yarn|pnpm>    default: npm
     --bin <value>                        command binary name
3 oclif init [--output-dir <value>] [--bin <value>] [--module-type <ESM|CommonJS>] [--package-manager <npm|yarn|pnpm>] [--topic-separator <colons|spaces>] [-y]
   Creates bin scripts and updates package.json
4 oclif generate command <topic:command>
   Creates src/commands/<topic>/<command>.ts with skeleton:
     import {Command, Flags} from '@oclif/core'
     export default class Name extends Command {
       static description = '...'
       static flags = {...}
       static args = [{name, description, required}]
       async run(): Promise<void> { ... }
     }
5 oclif generate hook <name> --event <lifecycle>
   Lifecycle events: init, prerun, postrun, command_not_found, update

SDK Method Signatures

declare module '@oclif/core' {
  export abstract class Command {
    static description?: string
    static flags?: Record<string, import('@oclif/core').Flag>
    static args?: Array<{name: string; description?: string; required?: boolean}>
    parse<T extends Command>(this: new () => T): Promise<{args: any; flags: any}>
    log(message: string): void
    error(message: string, options?: {code?: string; exit?: number; ref?: string; suggestions?: string[]}): void
  }
  export namespace Flags {
    function boolean(opts: {char?: string; description: string; default?: boolean; required?: boolean}): import('@oclif/core').Flag<boolean>
    function string(opts: {char?: string; description: string; required?: boolean; multiple?: boolean; default?: string}): import('@oclif/core').Flag<string>
    function integer(opts: {char?: string; description: string; default?: number; required?: boolean}): import('@oclif/core').Flag<number>
  }
}

Configuration Variables

In package.json:
"oclif": {
  "bin": "mycli",
  "dirname": "./src/commands",
  "commands": "./src/commands",
  "topicSeparator": ":"  or  " "
}

Best Practices

Use src/commands subdirectories to group topics. Topic separator default is colon but can switch to spaces. Hide deprecated commands via hiddenAliases array on Command class. Preparse hook example:

export async function preparse(input: string[]): Promise<string[]> {
  if (input[0]==='--flags-dir') {
    const fileFlags = require(input[1])
    return [...fileFlags, ...input.slice(2)]
  }
  return input
}

Troubleshooting

If commands not found, verify package.json oclif.commands path points to correct directory. Example:
  "commands": "./build/commands"

Enable debug output:

$ export OCLIF_DEBUG=1
$ ./bin/run.js hello

Check generated bin scripts have shebang '#!/usr/bin/env node' and correct require('@oclif/core').run() calls.

## Information Dense Extract
npm install -g oclif | oclif generate <name> --language TypeScript --module-type ESM --package-manager npm --bin <name> | cd <name> | ./bin/dev.js <cmd> for dev, ./bin/run.js <cmd> for prod | oclif init [--output-dir=<dir>] [--bin=<name>] [--module-type=ESM|CommonJS] [--package-manager=npm|yarn|pnpm] [--topic-separator=colons|spaces] [-y] adds bin scripts, package.json oclif:{bin,dirname,commands,topicSeparator}, deps:@oclif/core,devDeps:ts-node | oclif generate command <topic:cmd> creates src/commands/<topic>/<cmd>.ts with class extends Command, static description, flags via Flags.boolean/string/integer, args array, async run():Promise<void> parse via this.parse() | oclif generate hook <name> --event <init|prerun|postrun|command_not_found|update> | package.json oclif:{bin:string,dirname:string,commands:string,topicSeparator:':'} | Flags.boolean({char?,description,default?,required?}), Flags.string({char?,description,required?,multiple?,default?}), Flags.integer({char?,description,default?,required?}) | Command.parse<T>():Promise<{args,flags}>, Command.log(msg), Command.error(msg,{code,exit,ref,suggestions}) | Troubleshoot via OCLIF_DEBUG=1, verify oclif.commands path

## Sanitised Extract
Table of Contents

1 Installation
2 Project Generation
3 Development & Production Execution
4 Initialization in Existing Project
5 Command Creation
6 Hook Creation
7 Configuration Options
8 Flags Definition
9 Arguments Definition

1 Installation

Install oclif CLI globally

$ npm install --global oclif

2 Project Generation

$ oclif generate mynewcli
Prompts:
  module type  ESM or CommonJS
  npm package name  mynewcli
  command bin name  mynewcli

3 Development & Production Execution

Development mode:
$ ./bin/dev.js hello world
Production mode:
$ ./bin/run.js hello world

4 Initialization in Existing Project

$ oclif init --output-dir=/path/to/project --bin=my-pkg --module-type=CommonJS --package-manager=npm --topic-separator=spaces --yes
Creates:
  bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
  package.json oclif section with fields:
    bin: my-pkg
    dirname: ./src/commands
    commands: ./src/commands
    topicSeparator: ' '
  dependencies: @oclif/core
  devDependencies: ts-node

5 Command Creation

$ oclif generate command foo:bar
Creates src/commands/foo/bar.ts
Class skeleton:
import {Command, Flags} from '@oclif/core'
export default class FooBar extends Command {
  static description = '...'
  static flags = { force: Flags.boolean({char: 'f', description: '...', default: false}) }
  static args = [{name: 'input', required: true, description: '...'}]
  async run(): Promise<void> { const {args, flags} = await this.parse(FooBar) }
}

6 Hook Creation

$ oclif generate hook my-hook --event init
Creates src/hooks/my-hook.ts

7 Configuration Options

package.json oclif section:
  bin          string   CLI executable name
  dirname      string   path to commands folder
  commands     string   path or glob for commands
  topicSeparator string ':' or ' '

8 Flags Definition

static flags = {
  count: Flags.integer({char: 'c', description: '...', default: 1, required: true}),
  name: Flags.string({char: 'n', description: '...', required: false}),
}

9 Arguments Definition

static args = [ { name: 'file', description: '...', required: true } ]

## Original Source
CLI Frameworks
https://oclif.io/docs/introduction

## Digest of OCLIF_INTRO

# Installation

Install the oclif CLI globally:

    $ npm install --global oclif

# Create an oclif Project from Scratch

Run the generator:

    $ oclif generate mynewcli

Prompts:
  • Select module type           ESM or CommonJS
  • npm package name             mynewcli
  • Command bin name the CLI will export  mynewcli

After generation:

    $ cd mynewcli

# Development and Production Scripts

Use development script (with automatic reload):

    $ ./bin/dev.js hello world
    hello world!  (./src/commands/hello/world.ts)

Use production script:

    $ ./bin/run.js hello world
    hello world!  (./src/commands/hello/world.ts)

# Initialize oclif in an Existing Project

Run init with optional flags:

    $ oclif init --output-dir=/path/to/project \
      --bin=my-pkg \
      --module-type=CommonJS \
      --package-manager=npm \
      --topic-separator=spaces \
      --yes

Files and changes added:
  • bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
  • package.json oclif section:
      {
        "bin": "my-pkg",
        "dirname": "./src/commands",
        "commands": "./src/commands",
        "topicSeparator": " "
      }
  • @oclif/core added to dependencies
  • ts-node added to devDependencies

# Add Commands

Generate a new command:

    $ oclif generate command foo:bar

Creates file:

    src/commands/foo/bar.ts

Skeleton:

    import {Command, Flags} from '@oclif/core'

    export default class FooBar extends Command {
      static description = 'describe the command'

      static flags = {
        force: Flags.boolean({char: 'f', description: 'force operation', default: false}),
      }

      static args = [
        {name: 'input', required: true, description: 'input file'}
      ]

      async run(): Promise<void> {
        const {args, flags} = await this.parse(FooBar)
        // implementation
      }
    }

# Add Hooks

Generate a new hook:

    $ oclif generate hook my-hook --event init

Creates file:

    src/hooks/my-hook.ts

# Configuration Options

In package.json under "oclif":
  • bin: string            Command binary name
  • dirname: string        Path to commands directory
  • commands: string       Glob or directory for command files
  • topicSeparator: string ":" or " "

# Flags and Arguments

Flag definition:

    static flags = {
      count: Flags.integer({char: 'c', description: 'number of items', default: 1, required: true}),
      name: Flags.string({char: 'n', description: 'user name', required: false}),
    }

Argument definition:

    static args = [
      {name: 'file', description: 'file to process', required: true}
    ]


## Attribution
- Source: CLI Frameworks
- URL: https://oclif.io/docs/introduction
- License: MIT License
- Crawl Date: 2025-05-03T04:50:47.140Z
- Data Size: 5079924 bytes
- Links Found: 4226

## Retrieved
2025-05-03
