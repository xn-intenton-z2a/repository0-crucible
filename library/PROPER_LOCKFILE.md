# PROPER_LOCKFILE

## Crawl Summary
Promise-based file locking API. Methods: lock, lockSync, check, checkSync, unlock, unlockSync. Options: stale ms, retries count or backoff, retryWait ms, realpath boolean, onCompromised callback. Defaults: stale 10000, retries 0, retryWait 100, realpath true. Acquire exclusive advisory locks via fcntl. Release via returned function. Handle stale locks automatically or via onCompromised. Troubleshoot by examining .lock files, handling EACCES/EPERM, and cleaning stale locks manually.

## Normalised Extract
Table of Contents
1 Installation
2 API Methods
3 Configuration Options
4 Lock Workflow
5 Unlock Workflow
6 Check Workflow
7 Error Codes
8 Troubleshooting

Installation
  • npm install proper-lockfile

API Methods
  lock filePath, options → Promise releaseFn
  lockSync filePath, options → releaseFn
  check filePath, options → Promise boolean
  checkSync filePath, options → boolean
  unlock filePath, options → Promise<void>
  unlockSync filePath, options → void

Configuration Options
  stale (ms) default 10000
  retries number or {retries, factor, minTimeout, maxTimeout} default 0
  retryWait (ms) default 100
  realpath boolean default true
  onCompromised callback default none

Lock Workflow
  call lock, await releaseFn, perform operations, call releaseFn in finally block

Unlock Workflow
  call unlock or releaseFn to close file descriptor and remove .lock file

Check Workflow
  call check to return true if lock file exists and not stale. stale threshold applies to file modification age

Error Codes
  ELOCKED lock held by another process
  ENOENT target file does not exist
  EPERM insufficient permissions

Troubleshooting
  list .lock files: ls *.lock
  view timestamps: stat targetfile.lock
  remove stale lock: rm targetfile.lock
  adjust stale option for long operations


## Supplementary Details
LockOptions object shape
  stale: number ms threshold for lock staleness. Default 10000
  retries: number | RetryOptions {retries, factor, minTimeout, maxTimeout}. Default 0, no retry
  retryWait: number ms between attempts. Default 100
  realpath: boolean resolve symlinks. Default true
  onCompromised: ()=>void invoked on detection of stale lock by another process

RetryOptions defaults
  retries: 3
  factor: 2
  minTimeout: 50 ms
  maxTimeout: 500 ms

Implementation steps
  1 Open or create lock file at filePath.lock
  2 Acquire exclusive advisory lock via fcntl
  3 Write process PID to lock file
  4 Close descriptor on release
  5 Remove lock file on release

Symlink handling
  realpath true resolves filePath to canonical path, ensures single lock per target

Collision detection
  stale threshold applied to lock file mtime. If exceeded and onCompromised provided, callback invoked, lock can be reclaimed


## Reference Details
async function lock(filePath: string, options?: {
  stale?: number
  retries?: number | {
    retries: number
    factor: number
    minTimeout: number
    maxTimeout: number
  }
  retryWait?: number
  realpath?: boolean
  onCompromised?: () => void
}): Promise<() => Promise<void>>

function lockSync(filePath: string, options?: sameOptions): () => void

async function check(filePath: string, options?: {stale?: number, realpath?: boolean}): Promise<boolean>

function checkSync(filePath: string, options?: sameOptions): boolean

async function unlock(filePath: string, options?: {realpath?: boolean}): Promise<void>

function unlockSync(filePath: string, options?: sameOptions): void

Example usage
const lockfile = require('proper-lockfile')
async function updateConfig() {
  const release = await lockfile.lock('/etc/app/config.json', {retries: {retries:5, factor:2, minTimeout:100, maxTimeout:1000}, onCompromised: ()=> process.exit(1)})
  try {
    // read, modify, write config
  } finally {
    await release()
  }
}

Best practices
  always invoke release in finally
  handle onCompromised to clean up or alert
  tune stale to operation duration plus buffer
  use realpath false for containers with bind mounts

Troubleshooting procedures
  1 Verify lock file presence: ls /etc/app/config.json.lock
  2 Inspect PID: head -1 /etc/app/config.json.lock
  3 Check age: stat -c %Y /etc/app/config.json.lock
  4 If stale > stale option, remove: rm /etc/app/config.json.lock
  5 Increase retries or stale threshold: options.retries > 0, options.stale >= operation ms


## Information Dense Extract
lock(filePath,options):Promise<release>; lockSync:release; check(filePath,options):Promise<boolean>; checkSync:boolean; unlock=filePath,options→Promise; unlockSync. Options: stale ms (default10000), retries count|{retries,factor,minTimeout,maxTimeout} (default0), retryWait ms(default100), realpath bool(defaulttrue), onCompromised callback. Acquire via fcntl, write PID, release closes descriptor and removes lock file. Handle ELOCKED, ENOENT, EPERM. Best practice call release in finally, react to onCompromised, tune stale and retries. Troubleshoot by listing and stat *.lock, remove stale locks manually, adjust options.

## Sanitised Extract
Table of Contents
1 Installation
2 API Methods
3 Configuration Options
4 Lock Workflow
5 Unlock Workflow
6 Check Workflow
7 Error Codes
8 Troubleshooting

Installation
   npm install proper-lockfile

API Methods
  lock filePath, options  Promise releaseFn
  lockSync filePath, options  releaseFn
  check filePath, options  Promise boolean
  checkSync filePath, options  boolean
  unlock filePath, options  Promise<void>
  unlockSync filePath, options  void

Configuration Options
  stale (ms) default 10000
  retries number or {retries, factor, minTimeout, maxTimeout} default 0
  retryWait (ms) default 100
  realpath boolean default true
  onCompromised callback default none

Lock Workflow
  call lock, await releaseFn, perform operations, call releaseFn in finally block

Unlock Workflow
  call unlock or releaseFn to close file descriptor and remove .lock file

Check Workflow
  call check to return true if lock file exists and not stale. stale threshold applies to file modification age

Error Codes
  ELOCKED lock held by another process
  ENOENT target file does not exist
  EPERM insufficient permissions

Troubleshooting
  list .lock files: ls *.lock
  view timestamps: stat targetfile.lock
  remove stale lock: rm targetfile.lock
  adjust stale option for long operations

## Original Source
Atomic File Writes & File Operations
https://github.com/moxystudio/proper-lockfile#readme

## Digest of PROPER_LOCKFILE

# proper-lockfile Readme (Retrieved 2024-06-15)

## Installation

npm install proper-lockfile

## Usage

### lock(filePath: string, options?: LockOptions): Promise<() => Promise<void>>
Acquire an advisory lock on filePath. Returns a function that, when called, releases the lock.

### lockSync(filePath: string, options?: LockOptions): () => void
Synchronous version of lock. Returns a function that releases the lock.

### check(filePath: string, options?: LockOptions): Promise<boolean>
Checks whether the file is currently locked. Resolves to true if locked, false otherwise.

### checkSync(filePath: string, options?: LockOptions): boolean
Synchronous version of check.

### unlock(filePath: string, options?: LockOptions): Promise<void>
Explicitly release lock that may have been acquired externally. Resolves once unlocked.

### unlockSync(filePath: string, options?: LockOptions): void
Synchronous version of unlock.

## LockOptions

- stale: number (default 10000) – maximum lock age in ms before considered stale.
- retries: number | RetryOptions (default 0) – number of retry attempts for acquiring a lock.
- retryWait: number (default 100) – wait time in ms between retries.
- realpath: boolean (default true) – resolve symlinks before locking.
- onCompromised: () => void – callback invoked when a lock is found to be compromised.

## Best Practices

Always call release in a finally block.  Handle onCompromised to react to stale-lock takeover.  Use retry options in high-concurrency environments.

## Troubleshooting

If lock acquisition hangs, inspect existing .lock files in target directory.  Remove stale lock files older than stale value:  rm targetfile.lock.  On EACCES or EPERM check file permissions and ensure process UID matches owner.


## Attribution
- Source: Atomic File Writes & File Operations
- URL: https://github.com/moxystudio/proper-lockfile#readme
- License: License: MIT
- Crawl Date: 2025-05-15T06:28:38.143Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-15
