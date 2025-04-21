# WINSTON

## Crawl Summary
Winston is a configurable Node.js logging library. It supports multiple transports, customizable formats (json, simple, colorize, timestamp, printf), and logging levels (RFC5424 and npm). Core API includes winston.createLogger(options) with parameters: level, levels, format, transports, exitOnError, and silent. It provides methods such as log(), info(), debug(), error(), and supports dynamic transport manipulation (add, remove, clear, configure). Exception and rejection handling are integrated, and child loggers can be created with metadata overrides.

## Normalised Extract
## Table of Contents
1. Motivation
2. Quick Start
3. Logger Creation & Configuration
4. Logging Methods
5. Dynamic Transport Management
6. Custom Formats & String Interpolation
7. Logging Levels
8. Transports & Custom Transports
9. Exception & Rejection Handling
10. Profiling, Querying & Streaming
11. Best Practices & Troubleshooting

---

### 1. Motivation
- Universal logger with support for multiple transports
- Decoupled formatting, level handling, and storage

### 2. Quick Start
- Use `winston.createLogger({ ... })` to instantiate logger
- Example with File and Console transports

### 3. Logger Creation & Configuration
- API: `winston.createLogger(options)`
- Options include:
  - level: 'info' (default, filters messages)
  - levels: winston.config.npm.levels
  - format: e.g. `winston.format.json()`
  - transports: Array of transport instances
  - exitOnError: true/false
  - silent: false

### 4. Logging Methods
- Generic: `logger.log({ level, message })`
- Convenience: `logger.info(), logger.error(), etc.`

### 5. Dynamic Transport Management
- Methods: `add()`, `remove()`, `clear()`, `configure()`
- Example to reconfigure using `logger.configure({ transports: [...] })`

### 6. Custom Formats & String Interpolation
- Custom formats via `winston.format.printf` and `winston.format.combine`
- Enable interpolation with `winston.format.splat()`
- Filter out messages using custom format functions

### 7. Logging Levels
- Built-in levels: npm and syslog
- Custom levels can be defined and colors added via `winston.addColors()`

### 8. Transports & Custom Transports
- Predefined transports: File, Console, Http, etc.
- Custom transport defined by extending `winston-transport` and implementing a log() method

### 9. Exception & Rejection Handling
- Configure exception handling using:
  - `exceptionHandlers` option or `.exceptions.handle(transport)`
- Configure rejection handling similarly via `rejectionHandlers` or `.rejections.handle(transport)`

### 10. Profiling, Querying & Streaming
- Use `logger.profile('label')` to measure durations
- Query logs using `logger.query(options, callback)`
- Stream logs with `winston.stream({ start: -1 }).on('log', callback)`

### 11. Best Practices & Troubleshooting
- Always add at least one transport to prevent memory issues
- Check NODE_ENV for production optimizations
- Use dynamic level adjustments for debugging


## Supplementary Details
### Detailed Specifications & Implementation Steps

1. Logger Creation:
- API: `winston.createLogger(options)`
  - Options Object:
    - level: string (default: 'info')
    - levels: object (default: winston.config.npm.levels)
    - format: Format instance (default: winston.format.json())
    - transports: Array of transport instances (default: [])
    - exitOnError: boolean (default: true) // If false, exceptions don't exit
    - silent: boolean (default: false) // Suppresses all logs

2. Transports Configuration:
- File Transport Example:
  ```js
  new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: winston.format.json()
  })
  ```
- Console Transport Example with colorize:
  ```js
  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
  ```

3. Custom Transport Implementation:
- Extend winston-transport:
  ```js
  const Transport = require('winston-transport');

  class YourCustomTransport extends Transport {
    constructor(opts) {
      super(opts);
      // Custom initialization
    }

    log(info, callback) {
      setImmediate(() => this.emit('logged', info));
      // Write log data to custom destination
      callback();
    }
  }
  module.exports = YourCustomTransport;
  ```

4. Exception & Rejection Handling:
- Exception Handling:
  ```js
  const logger = winston.createLogger({
    transports: [ new winston.transports.File({ filename: 'combined.log' }) ],
    exceptionHandlers: [ new winston.transports.File({ filename: 'exceptions.log' }) ]
  });
  ```
- Rejection Handling:
  ```js
  logger.rejections.handle(new winston.transports.File({ filename: 'rejections.log' }));
  ```

5. Best Practices:
- Always include a transport for production, avoid default logger with no transports.
- Use dynamic transport level changes:
  ```js
  const fileTransport = new winston.transports.File({ filename: 'combined.log', level: 'error' });
  logger.add(fileTransport);
  fileTransport.level = 'info';
  ```
- Use custom formatting for enhanced readability and debugging.


## Reference Details
### Complete API Specifications & Code Examples

#### 1. Logger Creation API
- **Method:** `winston.createLogger(options)`
- **Parameters:**
  - options: {
      level: string,             // e.g. 'info'
      levels: object,            // e.g. winston.config.npm.levels
      format: Format,            // e.g. winston.format.json()
      transports: Transport[],   // Array of transport instances
      exitOnError: boolean,      // true by default
      silent: boolean            // false by default
    }
- **Return Type:** Logger instance with methods: log(), info(), error(), warn(), debug(), etc.

**Example:**
```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
  exitOnError: true,
  silent: false
});
```

#### 2. Logging Methods
- **Generic Log:**
```js
logger.log({ level: 'info', message: 'Log message' });
```
- **Convenience Methods:**
```js
logger.info('Info level log');
logger.error('Error level log');
```

#### 3. Transport APIs
- **Console Transport:**
```js
new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  )
});
```
- **File Transport:**
```js
new winston.transports.File({
  filename: 'combined.log',
  level: 'info',
  format: winston.format.json()
});
```
- **Custom Transport Example:** (see supplementary details above)

#### 4. Exception & Rejections Handling
- **Exception Handling:**
```js
logger.exceptions.handle(new winston.transports.File({ filename: 'exceptions.log' }));
```
- **Rejections Handling:**
```js
logger.rejections.handle(new winston.transports.File({ filename: 'rejections.log' }));
```

#### 5. Dynamic Configuration & Child Loggers
- **Reconfiguration:**
```js
logger.configure({
  level: 'verbose',
  transports: [ new DailyRotateFile(opts) ]
});
```
- **Child Logger:**
```js
const childLogger = logger.child({ requestId: '451' });
```

#### 6. Troubleshooting Procedures
- **Check Transports:**
  - Command: `console.log(logger.transports);`
  - Expected Output: Array of transport instances with properties `filename`, `level`, etc.
- **Dynamic Level Update:**
  - Command:
    ```js
    const fileTransport = logger.transports.find(t => t.filename === 'combined.log');
    fileTransport.level = 'info';
    ```
  - Expected Output: Logger now logs at updated level.
- **Error Handling:**
  - Listen for 'error' events:
    ```js
    logger.on('error', (err) => { console.error('Logger error:', err); });
    ```

This detailed specification provides developers with all the necessary API details, method signatures, code examples, and troubleshooting steps to implement and customize Winston logging in their projects.


## Original Source
Winston Logging Documentation
https://github.com/winstonjs/winston

## Digest of WINSTON

# Winston Logging Documentation

**Retrieved:** 2023-10-06

## Motivation

Winston is a universal logging library for Node.js that supports multiple transports. Each logger can have several transports configured at different levels. Typical use cases include logging errors to a persistent location (e.g., a file or database) and informational logs to the console.

## Quick Start

Create your logger using `winston.createLogger` with minimal configuration:

```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## Usage

### Creating a Logger

**Method:** `winston.createLogger(options)`

**Options:**
- `level` (default: `'info'`): Minimum level to log.
- `levels` (default: `winston.config.npm.levels`): Log level priorities.
- `format` (default: `winston.format.json()`): Format for log messages.
- `transports` (default: `[]`): Array of transport mechanism instances.
- `exitOnError` (default: `true`): If false, exceptions do not call process.exit().
- `silent` (default: `false`): If true, suppress all logs.

### Logging Methods

Logger provides convenience methods based on defined levels:

```js
logger.log({ level: 'info', message: 'Hello distributed log files!' });
logger.info('Hello again distributed logs');
```

### Dynamic Transport Management

You can add or remove transports after creation:

```js
const consoleTransport = new winston.transports.Console();
const fileTransport = new winston.transports.File({ filename: 'combined.log' });

logger.clear()       // Remove all transports
      .add(consoleTransport)
      .add(fileTransport)
      .remove(consoleTransport);
```

### Reconfiguring Logger

Replace current transports using `configure`:

```js
const DailyRotateFile = require('winston-daily-rotate-file');
logger.configure({
  level: 'verbose',
  transports: [ new DailyRotateFile(opts) ]
});
```

### Creating Child Loggers

Child loggers inherit parent's configuration and add metadata:

```js
const childLogger = logger.child({ requestId: '451' });
```

## Logging Details

### Logging Levels

Winston supports RFC5424 and npm logging levels:

**RFC5424 Example:**
```js
const syslogLevels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
};
```

**NPM Levels (default):**
```js
const npmLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
```

Log messages use these methods:

```js
logger.error('Error message');
logger.warn('Warning message');
logger.info('Info message');
logger.debug('Debug message');
```

### Formats

Built-in formats available via `winston.format` include JSON, simple, colorize, timestamp, label, and printf.

**Example custom format using printf:**

```js
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [new winston.transports.Console()]
});
```

### String Interpolation & Filtering

Enable string interpolation using `format.splat()`:

```js
logger.log('info', 'test message %s', 'string data');
```

Filtering can be implemented by returning a falsey value in custom formats:

```js
const ignorePrivate = winston.format((info) => {
  return info.private ? false : info;
})();

const logger = winston.createLogger({
  format: winston.format.combine(
    ignorePrivate,
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});
```

### Transports

Multiple transports can log concurrently. Each transport can have its own level and format:

```js
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.json()
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});
```

#### Custom Transports

Implement custom transports by extending `winston-transport`:

```js
const Transport = require('winston-transport');

class YourCustomTransport extends Transport {
  constructor(opts) {
    super(opts);
    // Initialize custom options
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    // Write log to remote service
    callback();
  }
}

module.exports = YourCustomTransport;
```

### Exceptions and Rejections

**Exceptions:**

```js
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'combined.log' })],
  exceptionHandlers: [new winston.transports.File({ filename: 'exceptions.log' })]
});

// Alternatively:
logger.exceptions.handle(new winston.transports.File({ filename: 'exceptions.log' }));
```

**Rejections:**

```js
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'combined.log' })],
  rejectionHandlers: [new winston.transports.File({ filename: 'rejections.log' })]
});

logger.rejections.handle(new winston.transports.File({ filename: 'rejections.log' }));
```

## Troubleshooting & Best Practices

- **High Memory Usage:** Ensure default logger is provided with transports.
- **Console Logging in Production:** Use environment checks before adding Console transport.
- **Dynamic Log Level Change:** Update `transport.level` for active transports to change log behavior at runtime.

## Attribution and Data Size

- **Crawled Data Size:** 784903 bytes
- **Links Found:** 5711
- **Source:** https://github.com/winstonjs/winston
- **License:** MIT


## Attribution
- Source: Winston Logging Documentation
- URL: https://github.com/winstonjs/winston
- License: Unknown
- Crawl Date: 2025-04-21T07:46:20.788Z
- Data Size: 784903 bytes
- Links Found: 5711

## Retrieved
2025-04-21
