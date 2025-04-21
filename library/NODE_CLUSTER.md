# NODE_CLUSTER

## Crawl Summary
The Node.js Cluster module provides a robust API for forking processes, managing worker lifecycles, and distributing incoming connections. Key technical points include detailed worker methods (disconnect, kill, send, isConnected, isDead), worker properties (id, exitedAfterDisconnect, process), and cluster-wide methods (fork, disconnect, setupMaster/Primary), complete with event handlers for 'disconnect', 'exit', 'listening', 'message', and 'online'. The round-robin and direct handle distribution mechanisms are explained, along with exact method signatures and code examples demonstrating message passing and graceful shutdown procedures.

## Normalised Extract
## Table of Contents
1. Worker Object
2. Worker Methods
3. Worker Events
4. Cluster Methods & Properties
5. Code Examples

## 1. Worker Object
- worker.id: <integer> - Unique identifier, used as key in cluster.workers.
- worker.process: <ChildProcess> - The child process returned by child_process.fork().
- worker.exitedAfterDisconnect: <boolean> - True if worker exited via disconnect.

## 2. Worker Methods
- worker.disconnect(): Returns a reference to the worker. Closes all server connections and disconnects IPC.
- worker.isConnected(): Returns boolean indicating IPC connectivity.
- worker.isDead(): Returns boolean if the worker process has terminated.
- worker.kill(signal?: string): Kills the worker, default signal 'SIGTERM'.
- worker.send(message: Object, sendHandle?: any, options?: { keepOpen?: boolean }, callback?: Function): Sends IPC message, returns boolean.

## 3. Worker Events
- 'disconnect': Emitted when a worker disconnects from the IPC channel.
- 'error': Emitted on process errors, follows child_process.fork() error events.
- 'exit': Provides exit code and signal. Use to restart workers if necessary.
- 'listening': Emitted with an address object { address, port, addressType } when a worker starts listening.
- 'message': Emitted when the worker receives a message via IPC.
- 'online': Emitted when a worker is online.
- 'fork': Emitted when a new worker is forked.
- 'setup': Emitted on calling setupMaster/Primary with the settings object.

## 4. Cluster Methods & Properties
- cluster.fork(env?: Object): Spawns a new worker process with optional environment settings.
- cluster.disconnect(callback?: Function): Disconnects all workers gracefully.
- cluster.setupMaster(settings?: Object): Configures default options (exec, args, cwd, silent, stdio, uid, gid, inspectPort, windowsHide).
- cluster.isPrimary / cluster.isWorker: Booleans determining process type.
- cluster.schedulingPolicy: Can be set to cluster.SCHED_RR or cluster.SCHED_NONE.
- cluster.settings: Contains the settings used during fork.
- cluster.worker: Provides a reference to the current worker (only in worker processes).
- cluster.workers: A hash storing active workers by their id.

## 5. Code Examples

Include examples for basic setup, message passing, and graceful shutdown using disconnect and kill. The examples include all necessary parameters and method usages as demonstrated in the detailed digest section.

## Supplementary Details
### Exact Parameter Values and Configuration Options
- **worker.kill(signal?: string)**: Default signal is 'SIGTERM'.
- **worker.send(message, sendHandle, options, callback)**:
   * options: { keepOpen: boolean } where default is false.
- **cluster.setupMaster(settings)** supports:
   * exec: String (default: process.argv[1])
   * args: Array of strings (default: process.argv.slice(2))
   * cwd: String (inherits from parent process if not provided)
   * silent: Boolean (default: false)
   * stdio: Array (must include 'ipc' entry)
   * uid, gid: Numbers for permissions
   * inspectPort: Number | Function (worker inspector port)
   * windowsHide: Boolean (default: false)

### Implementation Steps
1. Check if process is primary using `cluster.isPrimary`.
2. Fork workers using `cluster.fork()` in a loop based on CPU count.
3. Attach event handlers for 'exit', 'message', and 'listening' on worker instances.
4. In workers, create server objects and optionally call `process.send()` to communicate to the primary process.
5. For shutdown: In primary, trigger `worker.disconnect()` and setup a timeout to call `worker.kill()` if disconnect does not complete.

### Configuration Effects
- Setting schedulingPolicy to SCHED_RR enforces round-robin distribution on supported OS.
- Modifying cluster.settings via setupMaster affects the behavior of subsequently forked workers only.


## Reference Details
## Complete API Specifications

### Worker Methods

1. worker.disconnect()
   - **Signature:** `worker.disconnect(): cluster.Worker`
   - **Behavior:** Closes listening servers, waits for their 'close' events, then disconnects IPC. Sets property `exitedAfterDisconnect = true` upon exit.

2. worker.isConnected()
   - **Signature:** `worker.isConnected(): boolean`
   - **Return:** True if IPC channel is active.

3. worker.isDead()
   - **Signature:** `worker.isDead(): boolean`
   - **Return:** True if process has terminated.

4. worker.kill([signal])
   - **Signature:** `worker.kill(signal?: string): void`
   - **Default:** signal = 'SIGTERM'
   - **Behavior:** Kills worker process without waiting for graceful disconnect; equivalent to `worker.process.kill(signal)`.

5. worker.send(message, [sendHandle, options, callback])
   - **Signature:** `worker.send(message: Object, sendHandle?: any, options?: { keepOpen?: boolean }, callback?: Function): boolean`
   - **Details:** Options: `{ keepOpen: false }` by default. Sends message via IPC channel.

### Cluster Methods

1. cluster.fork([env])
   - **Signature:** `cluster.fork(env?: Object): cluster.Worker`
   - **Parameters:** `env` Optional object containing environment variables to merge with process.env for worker creation.

2. cluster.disconnect([callback])
   - **Signature:** `cluster.disconnect(callback?: Function): void`
   - **Behavior:** Calls `.disconnect()` for each worker and once all workers are disconnected, executes callback.

3. cluster.setupMaster([settings])
   - **Signature:** `cluster.setupMaster(settings?: {
         exec?: string,
         args?: string[],
         cwd?: string,
         silent?: boolean,
         stdio?: any[],
         uid?: number,
         gid?: number,
         inspectPort?: number | (() => number),
         windowsHide?: boolean
   }): void`
   - **Default Values:**
         exec: process.argv[1]
         args: process.argv.slice(2)
         silent: false
         stdio: Inherit parent's stdio with ipc inserted
         windowsHide: false

4. Key Properties:
   - **cluster.isPrimary:** boolean (true if primary)
   - **cluster.isWorker:** boolean (true if worker)
   - **cluster.schedulingPolicy:** Can be set via environment variable NODE_CLUSTER_SCHED_POLICY with values 'rr' or 'none'.
   - **cluster.settings:** Object containing current settings (execArgv, exec, args, cwd, serialization, silent, stdio, uid, gid, inspectPort, windowsHide).
   - **cluster.worker:** Reference to the current worker (only in worker context).
   - **cluster.workers:** Hash of worker objects keyed by worker.id.

### Full Code Example with Comments

```javascript
// Primary process code
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    // Listen for messages from worker
    worker.on('message', (msg) => {
      if (msg.cmd === 'notifyRequest') {
        console.log('Request notification received from worker');
      }
    });

    // Restart worker on exit
    worker.on('exit', (code, signal) => {
      console.log(`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`);
      // Optionally fork a new worker
      cluster.fork();
    });
  }

} else {
  // Worker process: Create HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
    // Notify primary process
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
  console.log(`Worker ${process.pid} started`);
}
```

### Troubleshooting Procedures

1. **Worker Not Responding:**
   - Command: `ps aux | grep node` to check worker process status.
   - If worker is hung, use `worker.kill('SIGTERM')` from the primary or manually kill via process ID.

2. **Port Binding Errors:**
   - Ensure no other process is using port 8000. Use `lsof -i :8000` to verify.
   - Restart the cluster after freeing the port.

3. **IPC Communication Failures:**
   - Check for broken pipes using logging in the 'disconnect' event.
   - Validate that messages are structured as expected (e.g., contain a `cmd` attribute).

4. **Unbalanced Connection Distribution:**
   - Verify the scheduling policy via `cluster.schedulingPolicy`. For round-robin, ensure it is set to `cluster.SCHED_RR`.
   - On Windows, note that named pipes are not supported for worker connections.


## Original Source
Node.js Cluster Documentation
https://nodejs.org/api/cluster.html

## Digest of NODE_CLUSTER

# Node.js Cluster Documentation

**Retrieved Date:** 2023-10-26

---

## Overview

The Node.js Cluster module allows creation of child processes that share the same server port, enabling workload distribution among multiple processes. It employs child_process.fork() and IPC for communication between the primary and worker processes.

---

## How It Works

- **Forking:** Primary process spawns workers using `cluster.fork()`.
- **Connection Handling:** There are two strategies:
  1. **Round-robin:** Primary process listens and distributes incoming connections in a round-robin fashion.
  2. **Direct Handling:** Primary creates the socket and passes it to workers, but may lead to unbalanced loads.
- **Graceful Shutdown:** Workers can disconnect using `worker.disconnect()`, set `exitedAfterDisconnect`, and then gracefully exit once existing connections are closed.
- **Process Resilience:** If workers die, the primary can spawn new workers.

---

## Table of Contents

1. [Worker Object](#worker-object)
2. [Worker Methods](#worker-methods)
3. [Worker Events](#worker-events)
4. [Cluster Methods & Properties](#cluster-methods--properties)
5. [Code Examples](#code-examples)

---

## Worker Object

- **worker.id**: <integer> - Unique identifier for each worker. Indexed in `cluster.workers`.
- **worker.process**: <ChildProcess> - The child process instance returned by `child_process.fork()`.
- **worker.exitedAfterDisconnect**: <boolean> - Indicates if the worker exited due to a voluntary disconnect.

---

## Worker Methods

- **worker.disconnect()**
  - **Signature:** `worker.disconnect(): cluster.Worker`
  - **Description:** Closes servers, waits for 'close' events, disconnects IPC, and sets `exitedAfterDisconnect`.

- **worker.isConnected()**
  - **Signature:** `worker.isConnected(): boolean`
  - **Description:** Returns `true` if the worker’s IPC channel is connected; otherwise, `false`.

- **worker.isDead()**
  - **Signature:** `worker.isDead(): boolean`
  - **Description:** Returns `true` if the worker’s process has terminated.

- **worker.kill([signal])**
  - **Signature:** `worker.kill(signal?: string): void`
  - **Default:** signal is `'SIGTERM'`
  - **Description:** Kills the worker by disconnecting and then sending the specified signal. Also aliased as `worker.destroy()`.

- **worker.send(message, [sendHandle, options, callback])**
  - **Signature:** `worker.send(message: Object, sendHandle?: any, options?: { keepOpen?: boolean }, callback?: Function): boolean`
  - **Description:** Sends a message via IPC. Options include `keepOpen` for net.Socket handling (default `false`).

---

## Worker Events

- **'disconnect'**
  - **Emitted When:** Worker’s IPC channel disconnects. Can be used to detect cleanup or long-lived connections.

- **'error'**
  - **Emitted When:** Child process errors occur. Similar to `child_process.fork()` errors.

- **'exit'**
  - **Emitted When:** Worker process exits. Provides exit `code` and `signal`.

- **'listening'**
  - **Emitted When:** Worker is listening on a server socket. Provides an `address` object `{ address, port, addressType }`.

- **'message'**
  - **Emitted When:** A message is received from either primary or worker via IPC.

- **'online'**
  - **Emitted When:** Worker signals that it is up and running (only emitted in the primary process).

- **'fork'**
  - **Emitted When:** A worker is forked. Useful for initialization logic.

- **'setup'**
  - **Emitted When:** `cluster.setupPrimary()` is called; provides the settings object.

---

## Cluster Methods & Properties

- **cluster.fork([env])**
  - **Signature:** `cluster.fork(env?: Object): cluster.Worker`
  - **Description:** Spawns a new worker process. Accepts environment key/value pairs.

- **cluster.disconnect([callback])**
  - **Signature:** `cluster.disconnect(callback?: Function): void`
  - **Description:** Disconnects all workers. Executes callback once done.

- **cluster.setupMaster([settings])** / **cluster.setupPrimary([settings])**
  - **Signature:** `cluster.setupMaster(settings?: Object): void`
  - **Description:** Configures worker spawning defaults such as `exec`, `args`, `cwd`, `silent`, `stdio`, `uid`, `gid`, `inspectPort`, `windowsHide`.

- **cluster.isPrimary** / **cluster.isWorker**
  - **Type:** `<boolean>`
  - **Description:** Determines if the process is the primary (master) or a worker.

- **cluster.schedulingPolicy**
  - **Values:** `cluster.SCHED_RR` (default on most OS except Windows) or `cluster.SCHED_NONE`.
  - **Description:** Sets connection distribution policy.

- **cluster.settings**
  - **Type:** `<Object>`
  - **Description:** Contains current settings including `execArgv`, `exec`, `args`, `cwd`, `serialization`, `silent`, `stdio`, `uid`, `gid`, `inspectPort`, and `windowsHide`.

- **cluster.worker**
  - **Description:** Reference to the current worker object (only in worker processes).

- **cluster.workers**
  - **Description:** A hash of active worker objects, keyed by the worker id.

---

## Code Examples

### Example 1: Basic Cluster Setup

```javascript
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, code: ${code} signal: ${signal}`);
  });

} else {
  // Workers share any TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

### Example 2: Message Passing between Primary and Worker

```javascript
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

if (cluster.isPrimary) {
  let numReqs = 0;

  setInterval(() => {
    console.log(`Total HTTP requests: ${numReqs}`);
  }, 1000);

  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.on('message', messageHandler);
  }

} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');

    // Notify primary process
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
```

### Example 3: Graceful Shutdown with Disconnect

```javascript
if (cluster.isPrimary) {
  const worker = cluster.fork();
  let timeout;

  worker.on('listening', (address) => {
    // Initiate shutdown
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(() => {
      worker.kill('SIGTERM');
    }, 2000);
  });

  worker.on('disconnect', () => {
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {
  const net = require('node:net');
  const server = net.createServer((socket) => {
    // handle long-lived connection
  });

  server.listen(8000);

  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      // perform graceful shutdown steps
    }
  });
}
```


## Attribution
- Source: Node.js Cluster Documentation
- URL: https://nodejs.org/api/cluster.html
- License: Unknown
- Crawl Date: 2025-04-21T06:51:40.899Z
- Data Size: 3584142 bytes
- Links Found: 3039

## Retrieved
2025-04-21
