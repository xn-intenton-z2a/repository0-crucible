# PINO_LOGGER

## Crawl Summary
Installation via npm and yarn; import via require('pino')() returning a logger with .info(msg) method; child loggers via logger.child(bindings); output JSON fields: level,time,msg,pid,hostname and any bound properties; use pino-pretty for CLI formatting with options --colorize and --translateTime; offload transports with pino.transport in worker threads; logs at low overhead (>5x faster); bundlable with webpack or esbuild.

## Normalised Extract
Table of Contents:
1. Installation
2. Initialization
3. Logging Methods
4. Child Loggers
5. JSON Output Format
6. Development Formatting
7. Transports & Log Processing
8. Performance Metrics
9. Bundling Support

1. Installation
Commands:
  npm install pino
  yarn add pino
Link for v6:
  https://github.com/pinojs/pino/tree/v6.x

2. Initialization
Code:
  const logger = require('pino')({ level: 'info' })
Defaults:
  level: 'info'
  base: { pid, hostname }
  timestamp: millisecond epoch

3. Logging Methods
Signatures:
  logger.info(msg: string, ...args: any[]): void
  logger.error(msg: string, ...args: any[]): void
  logger.warn(msg: string, ...args: any[]): void
  logger.debug(msg: string, ...args: any[]): void
  logger.trace(msg: string, ...args: any[]): void
  logger.fatal(msg: string, ...args: any[]): void

4. Child Loggers
Code:
  const child = logger.child({ module: 'user-service' })
  child.info('action completed')
Effect:
  subsequent logs include bound property module=user-service

5. JSON Output Format
Fields:
  level: numeric severity (10 trace – 60 fatal)
  time: epoch milliseconds
  msg: message string
  pid: process id
  hostname: host name
Example:
  {"level":30,"time":1531171074631,"msg":"hello","pid":657,"hostname":"host"}

6. Development Formatting
Use pino-pretty module for readable CLI output:
Options:
  --colorize: boolean
  --translateTime: format string (e.g. 'yyyy-mm-dd HH:MM:ss')

7. Transports & Log Processing
Invoke pino.transport API in worker thread:
  const transport = require('pino').transport({ targets: [{ target: 'pino-pretty' }] })
  const logger = require('pino')({ level: 'debug' }, transport)

8. Performance Metrics
Pino is typically over 5x faster than competing loggers (see Benchmarks).

9. Bundling Support
Pino exports are compatible with bundlers:
  webpack: no configuration needed
  esbuild: no configuration needed

## Supplementary Details
Default LoggerOptions:
  level: 'info'
  enabled: true
  prettyPrint: false
  base: { pid: process.pid, hostname: os.hostname() }
  timestamp: () => `,"time":${Date.now()}`
  serializers: { err: pino.stdSerializers.err, req: pino.stdSerializers.req, res: pino.stdSerializers.res }

pino.transport API:
  transport(options: { targets: Array<{ target: string; level?: string; options?: any }> }): DestinationStream

pino-pretty CLI options:
  --colorize (default false)
  --translateTime (default false)
  --ignore (comma-separated keys)

Bundling:
  import pino from 'pino'
  const logger = pino()
  bundle via webpack or esbuild without additional loader

## Reference Details
Function Signature:
  declare function pino<Options extends LoggerOptions = LoggerOptions>(opts?: Options, stream?: NodeJS.WritableStream): Logger<Options>

Interface LoggerOptions {
  level?: string         // default 'info'
  enabled?: boolean      // default true
  prettyPrint?: boolean  // default false
  base?: object|null     // default { pid, hostname }
  timestamp?: () => string // default epoch ms
  serializers?: { [key: string]: (val: any) => any }
  redact?: { paths: string[], censor?: string, remove?: boolean }
  formatters?: {
    level?: (label: string, number: number) => object
    log?: (obj: any) => any
    bindings?: (bindings: any) => any
  }
}

Class Logger<Options> {
  level: number
  levelVal: number
  child<Child extends object>(bindings: Child, options?: Partial<Options>): Logger<Options & Child>
  trace(msg: string, ...args: any[]): void
  debug(msg: string, ...args: any[]): void
  info(msg: string, ...args: any[]): void
  warn(msg: string, ...args: any[]): void
  error(msg: string, ...args: any[]): void
  fatal(msg: string, ...args: any[]): void
}

Example Code:
  import pino from 'pino'
  const logger = pino({ level: 'debug' })
  logger.debug('init', { port: 3000 })

Transport Pattern:
  import pino from 'pino'
  const transport = pino.transport({ targets: [ { target: 'pino/file', level: 'info', options: { destination: './logs/app.log' } } ] })
  const logger = pino({ level: 'info' }, transport)

Best Practices:
  Offload heavy processing to transports
  Use child loggers to scope context
  Redact sensitive fields via redact.paths
  Use structured JSON for machine parsing

Troubleshooting:
  Check event loop lag:
    node --perf-basic-prof app.js
  Confirm transport worker is running:
    ps aux | grep pino
  Validate JSON output:
    logger.info({ user: 'alice' }, 'login')
    // expect {"level":30,...,"user":"alice","msg":"login"}

## Information Dense Extract
pino(opts?: LoggerOptions, stream?: WritableStream): Logger | level default 'info' | methods trace|debug|info|warn|error|fatal(msg:string,...any):void | logger.child(bindings:object):Logger adds bound fields | JSON output fields level,time,msg,pid,hostname + bindings | install npm install pino / yarn add pino | dev format via pino-pretty CLI (--colorize, --translateTime) | transport offload via pino.transport({targets:[{target,level,options}]}) run in worker thread | performance >5x faster | bundlable with webpack/esbuild

## Sanitised Extract
Table of Contents:
1. Installation
2. Initialization
3. Logging Methods
4. Child Loggers
5. JSON Output Format
6. Development Formatting
7. Transports & Log Processing
8. Performance Metrics
9. Bundling Support

1. Installation
Commands:
  npm install pino
  yarn add pino
Link for v6:
  https://github.com/pinojs/pino/tree/v6.x

2. Initialization
Code:
  const logger = require('pino')({ level: 'info' })
Defaults:
  level: 'info'
  base: { pid, hostname }
  timestamp: millisecond epoch

3. Logging Methods
Signatures:
  logger.info(msg: string, ...args: any[]): void
  logger.error(msg: string, ...args: any[]): void
  logger.warn(msg: string, ...args: any[]): void
  logger.debug(msg: string, ...args: any[]): void
  logger.trace(msg: string, ...args: any[]): void
  logger.fatal(msg: string, ...args: any[]): void

4. Child Loggers
Code:
  const child = logger.child({ module: 'user-service' })
  child.info('action completed')
Effect:
  subsequent logs include bound property module=user-service

5. JSON Output Format
Fields:
  level: numeric severity (10 trace  60 fatal)
  time: epoch milliseconds
  msg: message string
  pid: process id
  hostname: host name
Example:
  {'level':30,'time':1531171074631,'msg':'hello','pid':657,'hostname':'host'}

6. Development Formatting
Use pino-pretty module for readable CLI output:
Options:
  --colorize: boolean
  --translateTime: format string (e.g. 'yyyy-mm-dd HH:MM:ss')

7. Transports & Log Processing
Invoke pino.transport API in worker thread:
  const transport = require('pino').transport({ targets: [{ target: 'pino-pretty' }] })
  const logger = require('pino')({ level: 'debug' }, transport)

8. Performance Metrics
Pino is typically over 5x faster than competing loggers (see Benchmarks).

9. Bundling Support
Pino exports are compatible with bundlers:
  webpack: no configuration needed
  esbuild: no configuration needed

## Original Source
Observability: Logging & Metrics
https://github.com/pinojs/pino

## Digest of PINO_LOGGER

# Pino Logger

Retrieved: 2024-06-01
Source: https://github.com/pinojs/pino (Data Size: 611447 bytes)

## Installation

Using NPM:
$ npm install pino

Using YARN:
$ yarn add pino

For v6 compatibility:
Refer to https://github.com/pinojs/pino/tree/v6.x

## Basic Usage

const logger = require('pino')()

logger.info('hello world')

const child = logger.child({ a: 'property' })
child.info('hello child!')

Produces:
{"level":30,"time":1531171074631,"msg":"hello world","pid":657,"hostname":"Davids-MBP-3.fritz.box"}
{"level":30,"time":1531171082399,"msg":"hello child!","pid":657,"hostname":"Davids-MBP-3.fritz.box","a":"property"}

## Development Formatting (pino-pretty)

Use the pino-pretty module to format logs during development:

CLI example:
node app.js | pino-pretty --colorize --translateTime 'yyyy-mm-dd HH:MM:ss'

## Transports & Log Processing

Due to Node's single-threaded event loop, run transports in a separate process or worker thread using the pino.transport API to avoid blocking the event loop.

## Performance & Overhead

Pino achieves low overhead logging, often over 5x faster than alternatives. See the Benchmarks document for detailed comparisons.

## Bundling Support

Pino can be bundled with webpack or esbuild. See the Bundling document for configuration details.

## Attribution
- Source: Observability: Logging & Metrics
- URL: https://github.com/pinojs/pino
- License: MIT License
- Crawl Date: 2025-05-12T03:36:38.736Z
- Data Size: 611447 bytes
- Links Found: 5263

## Retrieved
2025-05-12
