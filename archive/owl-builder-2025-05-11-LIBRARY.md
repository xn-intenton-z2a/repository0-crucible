library/PINO_LOGGER.md
# library/PINO_LOGGER.md
# PINO_LOGGER

## Crawl Summary
Install via npm or yarn. Instantiate logger: pino(options, [destination|transport]). Core methods: logger.{trace, debug, info, warn, error, fatal}. Child loggers via logger.child(object). Transports run in worker threads: pino.transport API accepts targets array with target modules and options. Pretty printing through pino-pretty CLI or transport with options: colorize, translateTime, ignore, singleLine. Configuration schema: level, timestamp, base, redact. Asynchronous I/O recommended via pino.destination or pino.transport. Bundling support via browser.js entry.

## Normalised Extract
Table of Contents:
1. Installation
2. Logger Initialization
3. Logging Methods
4. Child Loggers
5. Transports
6. Pretty Printing Configuration
7. Configuration Schema
8. Asynchronous Logging
9. Bundling Support

1. Installation
npm install pino

2. Logger Initialization
const pino = require('pino')
const logger = pino({ level: 'info', timestamp: true })

3. Logging Methods
logger.trace(msg: string, obj?: object)
logger.debug(msg: string, obj?: object)
logger.info(msg: string, obj?: object)
logger.warn(msg: string, obj?: object)
logger.error(msg: string, error?: Error)
logger.fatal(msg: string, obj?: object)

4. Child Loggers
logger.child(bindings: object) returns a new Logger where every log includes the bindings

5. Transports
pino.transport({
  targets: [
    { target: 'module-name', options: {...}, level: 'info' }
  ]
})

6. Pretty Printing Configuration
Module: pino-pretty
Options:
  colorize: boolean = false
  translateTime: boolean|string = false
  ignore: string = ''
  singleLine: boolean = false

7. Configuration Schema
Options object fields:
  level: 'trace'|'debug'|'info'|'warn'|'error'|'fatal' (default 'info')
  timestamp: boolean|()=>number (default true)
  base: object|null (default { pid: process.pid, hostname: os.hostname() })
  redact: string[] | { paths: string[], censor: string } (default [])

8. Asynchronous Logging
Use pino.destination(path: string, options?: object) to create a non-blocking stream.
Use transports to offload processing: pino.transport API runs in worker threads.

9. Bundling Support
Import the browser build in bundlers:
  require('pino/browser')
Ensure alias for browser.js in webpack/esbuild config.

## Supplementary Details
Parameter Values:
level default 'info'; accepted levels: trace, debug, info, warn, error, fatal
timestamp default true; can be custom function returning epochMillis
base default { pid, hostname }
redact supports nested paths with dot notation; censor default '[Redacted]'
Implementation Steps:
1. npm install pino pino-pretty
2. Create logger instance with desired options
3. For production, offload transports via worker threads
4. Configure pino-pretty in dev environment
5. Bundle with webpack: add alias { pino: 'pino/browser' }
6. Integrate with frameworks by replacing console


## Reference Details
API: pino(options?: LoggerOptions, stream?: DestinationStream|TransportStream) : Logger

Interfaces:
interface LoggerOptions {
  level?: 'trace'|'debug'|'info'|'warn'|'error'|'fatal'
  timestamp?: boolean|(() => number)
  base?: object|null
  redact?: string[]|{ paths: string[]; censor?: string }
}

interface Logger {
  trace(message: string, ...args: any[]): void
  debug(message: string, ...args: any[]): void
  info(message: string, ...args: any[]): void
  warn(message: string, ...args: any[]): void
  error(message: string|Error, ...args: any[]): void
  fatal(message: string|Error, ...args: any[]): void
  child(bindings: object): Logger
}

pino.transport(opts: TransportOptions) : DestinationStream
interface TransportOptions {
  targets: Array<{ target: string; level?: string; options?: object }>
}

pino.destination(file: string, options?: { sync?: boolean; minLength?: number; }) : DestinationStream

pino-pretty CLI usage:
pino-pretty --colorize --translateTime 'yyyy-mm-dd HH:MM:ss.l o' --ignore 'pid,hostname'

Best Practices:
const loggerProd = pino({ level: 'info', base: null, timestamp: () => `,

## Information Dense Extract
install:pino via npm; init:const logger=pino({level, timestamp}); methods:trace,debug,info,warn,error,fatal; child:logger.child({}); transports:pino.transport({targets:[{target,level,options:{}}]}); destination:pino.destination(path,{sync:false,minLength:4096}); pretty:pino-pretty options:colorize,bool,translateTime,ignore,singleLine; config schema:level,timestamp,base,redact; async logging:use transport or destination; bundling:alias to pino/browser; debugging:use --level debug and inspect output; troubleshoot: check backpressure in streams, monitor event 'error' on destination; CLI commands:pkill node to reset worker threads; expected output: JSON lines with level,time,msg,pid,hostname

## Sanitised Extract
Table of Contents:
1. Installation
2. Logger Initialization
3. Logging Methods
4. Child Loggers
5. Transports
6. Pretty Printing Configuration
7. Configuration Schema
8. Asynchronous Logging
9. Bundling Support

1. Installation
npm install pino

2. Logger Initialization
const pino = require('pino')
const logger = pino({ level: 'info', timestamp: true })

3. Logging Methods
logger.trace(msg: string, obj?: object)
logger.debug(msg: string, obj?: object)
logger.info(msg: string, obj?: object)
logger.warn(msg: string, obj?: object)
logger.error(msg: string, error?: Error)
logger.fatal(msg: string, obj?: object)

4. Child Loggers
logger.child(bindings: object) returns a new Logger where every log includes the bindings

5. Transports
pino.transport({
  targets: [
    { target: 'module-name', options: {...}, level: 'info' }
  ]
})

6. Pretty Printing Configuration
Module: pino-pretty
Options:
  colorize: boolean = false
  translateTime: boolean|string = false
  ignore: string = ''
  singleLine: boolean = false

7. Configuration Schema
Options object fields:
  level: 'trace'|'debug'|'info'|'warn'|'error'|'fatal' (default 'info')
  timestamp: boolean|()=>number (default true)
  base: object|null (default { pid: process.pid, hostname: os.hostname() })
  redact: string[] | { paths: string[], censor: string } (default [])

8. Asynchronous Logging
Use pino.destination(path: string, options?: object) to create a non-blocking stream.
Use transports to offload processing: pino.transport API runs in worker threads.

9. Bundling Support
Import the browser build in bundlers:
  require('pino/browser')
Ensure alias for browser.js in webpack/esbuild config.

## Original Source
Observability: Logging & Metrics
https://github.com/pinojs/pino

## Digest of PINO_LOGGER

# Pino Logger Technical Digest

Date Retrieved: 2024-06-01
Data Size: 611527 bytes

# Installation

npm install pino@latest

# Usage

const pino = require('pino')  
const logger = pino({ level: 'info', timestamp: true })  
logger.info('hello world')  
const child = logger.child({ a: 'property' })  
child.info('hello child!')

# Transports

const transport = pino.transport({  
  targets: [  
    {  
      target: 'pino-pretty',  
      options: { colorize: true, translateTime: 'yyyy-mm-dd HH:MM:ss.l o' }  
    }  
  ]  
})
const loggerWithTransport = pino( { level: 'debug' }, transport )

# Pretty Printing (pino-pretty)

Options:  
-- colorize: boolean (default false)  
-- ignore: string (comma-separated keys)  
-- translateTime: string or boolean (false)  
-- singleLine: boolean (false)

# Child Logger API

logger.child(bindings: object) : Logger

# Configuration Options

{
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  timestamp: boolean | (()=>number),
  base: object | null,
  redact: string[] | { paths: string[], censor: string }
}

# Asynchronous Logging

Use pino.destination and pino.transport to offload I/O to worker threads.

# Bundling Support

Import pino in webpack or esbuild; ensure browser.js is used for browser targets.


## Attribution
- Source: Observability: Logging & Metrics
- URL: https://github.com/pinojs/pino
- License: MIT License
- Crawl Date: 2025-05-11T15:26:17.822Z
- Data Size: 611527 bytes
- Links Found: 5296

## Retrieved
2025-05-11
