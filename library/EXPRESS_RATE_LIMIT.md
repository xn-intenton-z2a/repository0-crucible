# EXPRESS_RATE_LIMIT

## Crawl Summary
Basic rate-limiting middleware for Express. rateLimit(options) ⇒ Express.RequestHandler. Options: windowMs (ms), limit (count|fn), message (string|json|fn), statusCode (default 429), handler, legacyHeaders, standardHeaders, keyGenerator, skip, store (MemoryStore or custom), passOnStoreError, requestPropertyName, skipSuccessfulRequests, skipFailedRequests, requestWasSuccessful, validate. Built-in memory store and external stores via store option. Usage: import rateLimit, configure options, app.use(limiter).

## Normalised Extract
Table of Contents:
1 Installation
2 Middleware Initialization
3 Configuration Options
4 Data Store Integration
5 Applying Middleware

1 Installation
npm install express-rate-limit

2 Middleware Initialization
import { rateLimit } from 'express-rate-limit'
const limiter = rateLimit(options)

3 Configuration Options
windowMs: number (ms)
limit: number or (req)=>number
message: string, object or (req,res)=>string|object
statusCode: number (default 429)
handler: (req,res,next,options)=>void
legacyHeaders: boolean (default true)
standardHeaders: 'draft-6' | 'draft-7' | 'draft-8'
keyGenerator: (req,res)=>string
skip: (req,res)=>boolean
store: Store implementation (default memory)
passOnStoreError: boolean (default false)
requestPropertyName: string (default 'rateLimit')
skipSuccessfulRequests: boolean
skipFailedRequests: boolean
requestWasSuccessful: (res)=>boolean
validate: boolean or object

4 Data Store Integration
Built-in MemoryStore
To use Redis: npm install rate-limit-redis ioredis
const RedisStore = require('rate-limit-redis')
const redisClient = new Redis({host,port})
store: new RedisStore({ sendCommand: (...args)=>redisClient.call(...args) })

5 Applying Middleware
app.use(rateLimit({windowMs:60000,limit:100}))
Add limiter per route: app.use('/api', limiter)



## Supplementary Details
Default values:
windowMs: 600000 (10 minutes)
limit: 5
message: 'Too many requests, please try again later.'
statusCode: 429
legacyHeaders: true
standardHeaders: undefined
keyGenerator: (req)=>req.ip
skip: ()=>false
passOnStoreError: false
requestPropertyName: 'rateLimit'
skipSuccessfulRequests: false
skipFailedRequests: false
requestWasSuccessful: res.statusCode < 400
validate: true

Implementation Steps:
1. Install package: npm install express-rate-limit
2. Import and configure limiter
3. (Optional) Install and configure external store
4. Use limiter globally or per-route
5. Access rate limit info via req.rateLimit



## Reference Details
Function Signature:
function rateLimit(options: RateLimitOptions): Express.RequestHandler

Type RateLimitOptions {
  windowMs: number;
  delayAfter?: number;
  delayMs?: number;
  max?: number | ((req: Request, res: Response) => number);
  message?: string | object | ((req: Request, res: Response) => string | object);
  statusCode?: number;
  standardHeaders?: 'draft-6' | 'draft-7' | 'draft-8';
  legacyHeaders?: boolean;
  handler?: (req: Request, res: Response, next: NextFunction, options: RateLimitOptions) => void;
  keyGenerator?: (req: Request, res: Response) => string;
  skip?: (req: Request, res: Response) => boolean;
  store?: Store;
  passOnStoreError?: boolean;
  requestPropertyName?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  requestWasSuccessful?: (res: Response) => boolean;
  validate?: boolean | { statusCode?: boolean; legacyHeaders?: boolean; standardHeaders?: boolean; message?: boolean; }}

Store Interface:
interface Store {
  incr(key: string, cb: (err: Error | null, hits: number, resetTime: number) => void): void;
  decrement?(key: string): void;
  resetKey(key: string): void;
}

Example Code:
```js
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 60000,
  max: (req) => req.user ? 1000 : 10,
  message: { error: 'Rate limit exceeded' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: (req) => req.ip === '127.0.0.1',
  handler: (req,res) => res.status(429).json({error:'Blocked'}),
});

app.use('/api/', limiter);
```

Best Practices:
- Use different limiters per route group.
- Configure skip based on authentication or IP whitelist.
- Persist counters in Redis in clustered environments.

Troubleshooting:
Command: curl -I http://localhost:3000/
Expected headers:
RateLimit-Limit: 100
RateLimit-Remaining: 99
RateLimit-Reset: <timestamp>
On store error: set passOnStoreError:true and simulate disconnect.


## Information Dense Extract
rateLimit(options)⇒Express middleware. Options: windowMs ms, max count|fn, message string|object|fn, statusCode 429, handler fn(req,res,next,opts), standardHeaders draft-6|7|8, legacyHeaders bool, keyGenerator(req)=>string, skip(req)=>bool, store Store interface (incr,resetKey), passOnStoreError bool, requestPropertyName string, skipSuccessfulRequests bool, skipFailedRequests bool, requestWasSuccessful(res)=>bool, validate bool|object. Default memory store; external via store option (RedisStore,new RedisStore({sendCommand:…})). Usage: import, configure options, app.use(limiter) or per-route. Access req.rateLimit.{limit,remaining,reset}. Troubleshoot: inspect headers, console.log(req.rateLimit), enable passOnStoreError for store errors.

## Sanitised Extract
Table of Contents:
1 Installation
2 Middleware Initialization
3 Configuration Options
4 Data Store Integration
5 Applying Middleware

1 Installation
npm install express-rate-limit

2 Middleware Initialization
import { rateLimit } from 'express-rate-limit'
const limiter = rateLimit(options)

3 Configuration Options
windowMs: number (ms)
limit: number or (req)=>number
message: string, object or (req,res)=>string|object
statusCode: number (default 429)
handler: (req,res,next,options)=>void
legacyHeaders: boolean (default true)
standardHeaders: 'draft-6' | 'draft-7' | 'draft-8'
keyGenerator: (req,res)=>string
skip: (req,res)=>boolean
store: Store implementation (default memory)
passOnStoreError: boolean (default false)
requestPropertyName: string (default 'rateLimit')
skipSuccessfulRequests: boolean
skipFailedRequests: boolean
requestWasSuccessful: (res)=>boolean
validate: boolean or object

4 Data Store Integration
Built-in MemoryStore
To use Redis: npm install rate-limit-redis ioredis
const RedisStore = require('rate-limit-redis')
const redisClient = new Redis({host,port})
store: new RedisStore({ sendCommand: (...args)=>redisClient.call(...args) })

5 Applying Middleware
app.use(rateLimit({windowMs:60000,limit:100}))
Add limiter per route: app.use('/api', limiter)

## Original Source
Express.js & Middleware
https://github.com/nfriedly/express-rate-limit

## Digest of EXPRESS_RATE_LIMIT

# express-rate-limit

## Usage

```js
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // allow 100 requests per windowMs per IP
  standardHeaders: 'draft-8', // enable `RateLimit` header (draft-7/draft-8)
  legacyHeaders: false      // disable `X-RateLimit-*` headers
})

app.use(limiter)
```

## Configuration Options

| Option                | Type                         | Default       | Description                                                            |
|-----------------------|------------------------------|---------------|------------------------------------------------------------------------|
| windowMs              | number                       | 600000        | Time frame for counting requests in milliseconds                       |
| limit                 | number \| (req)⇒number            | 5             | Max number of requests per window per IP                              |
| message               | string \| object \| fn      | 'Too many requests, please try again later.' | Response sent when limit exceeded                                |
| statusCode            | number                       | 429           | HTTP status code returned when limit is exceeded                       |
| handler               | (req,res,next,options)⇒void  | undefined     | Custom callback instead of default response                            |
| legacyHeaders         | boolean                      | true          | Enable `X-RateLimit-*` headers                                          |
| standardHeaders       | 'draft-6'\|'draft-7'\|'draft-8' | undefined | Enable standardized RateLimit header draft version                     |
| keyGenerator          | (req,res)⇒string             | ip address    | Function to generate key for storing hits                              |
| skip                  | (req,res)⇒boolean            | ()⇒false       | Function to skip rate limiting for specific requests                   |
| store                 | Store                        | MemoryStore   | Custom store implementing in-memory or external datastore              |
| passOnStoreError      | boolean                      | false         | On store error, allow requests when true, otherwise block             |
| requestPropertyName   | string                       | 'rateLimit'   | Name of property added to req object containing rate limit info        |
| skipSuccessfulRequests| boolean                      | false         | Do not count successful 1xx–3xx responses                              |
| skipFailedRequests    | boolean                      | false         | Do not count failed 4xx–5xx responses                                  |
| requestWasSuccessful  | (res)⇒boolean                | res.statusCode<400 | Determine success for skipSuccessfulRequests and skipFailedRequests |
| validate              | boolean \| object           | true          | Enable built-in validation of options                                  |

## Data Stores

Built-in memory store; supports external stores via `store` option:

- RedisStore: `npm install rate-limit-redis`
- MemcachedStore: `npm install rate-limit-memcached`

### Example: Redis Store

```js
import { rateLimit } from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import Redis from 'ioredis'

const redisClient = new Redis({ host: '127.0.0.1', port: 6379 })
const limiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.call(...args) }),
  windowMs: 60000,
  limit: 10
})
app.use(limiter)
```

## Troubleshooting

- Ensure `windowMs` and `limit` are set to expected units.
- If using external store, verify connectivity and credentials.
- Enable `passOnStoreError: true` to allow traffic on store failures during testing.
- To debug hits: add `console.log(req.rateLimit)` in middleware.


## Attribution
- Source: Express.js & Middleware
- URL: https://github.com/nfriedly/express-rate-limit
- License: License: MIT
- Crawl Date: 2025-05-13T06:29:42.906Z
- Data Size: 554013 bytes
- Links Found: 4816

## Retrieved
2025-05-13
