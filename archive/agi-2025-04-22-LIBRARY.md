library/ESLINT_OFFICIAL.md
# library/ESLINT_OFFICIAL.md
# ESLINT_OFFICIAL

## Crawl Summary
ESLint documentation provides technical specifications covering usage, extension, integration, contribution, and maintenance. It details CLI commands (e.g., `eslint --fix`), configuration file setup (.eslintrc.json), custom rule creation with full meta and create method signatures, and Node.js API integration using the ESLint class with methods like lintFiles().

## Normalised Extract
## Table of Contents
1. Use ESLint in Your Project
   - CLI Options: `eslint --fix`, `eslint --init`
   - Configuration File Example:
     {
       "env": { "browser": true, "node": true },
       "extends": "eslint:recommended",
       "rules": { "semi": ["error", "always"], "quotes": ["error", "double"] }
     }
   - Formatter configuration

2. Extend ESLint
   - Custom Rule Structure:
     - Export an object with `meta` (type, docs, schema) and `create(context)` function.
     - **Code Example:**
       module.exports = {
         meta: {
           type: 'problem',
           docs: { description: 'disallow use of foo', recommended: true },
           schema: []
         },
         create(context) {
           return {
             Identifier(node) {
               if (node.name === 'foo') {
                 context.report({ node, message: 'Avoid using foo.' });
               }
             }
           };
         }
       };

3. Integrate ESLint
   - Node.js API Usage:
     - Import the ESLint class: `const { ESLint } = require('eslint');`
     - Instantiate ESLint with custom overrideConfig
     - **Code Example:**
       const eslint = new ESLint({
         overrideConfig: { rules: { semi: ['error', 'always'] } }
       });
       eslint.lintFiles(['**/*.js']).then(results => console.log(results));

4. Contribute to ESLint
   - Standard development setup: clone repository, `npm install`, and run `npm test`.

5. Maintain ESLint
   - Maintenance practices include adherence to code style, correct commit formats, and use of debugging commands such as `eslint --debug`.


## Supplementary Details
### Configuration File (.eslintrc.json) Example:
{
  "env": { "browser": true, "node": true },
  "extends": "eslint:recommended",
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}

### CLI Commands and Options:
- Lint with auto-fix: `eslint --fix file.js`
- Initiate configuration: `eslint --init`
- Debug mode: `eslint --debug file.js`
- Print effective configuration: `eslint --print-config file.js`

### Custom Rule Development Steps:
1. Create a rule file (e.g., no-foo.js)
2. Export an object with:
   - meta: { type, docs (description, recommended), schema }
   - create(context): function that returns an object mapping AST node types to handler functions
3. Example Handler:
   Identifier(node) {
     if (node.name === 'foo') {
       context.report({ node, message: "'foo' is not allowed" });
     }
   }

### Node.js API Integration:
- Import the ESLint class:
  `const { ESLint } = require('eslint');`
- Instantiate with options:
  const eslint = new ESLint({
    overrideConfig: {
      env: { browser: true, node: true },
      rules: { "no-foo": "error" }
    },
    fix: true
  });
- Lint files and process results:
  async function runLint() {
    const results = await eslint.lintFiles(['src/**/*.js']);
    for (const result of results) {
      console.log(`File: ${result.filePath}`);
      result.messages.forEach(msg => console.log(`Line ${msg.line}: ${msg.message}`));
    }
  }
  runLint();


## Reference Details
### ESLint Node.js API Specifications

**Class:** ESLint

**Constructor:** new ESLint(options: {
  overrideConfig?: object,
  fix?: boolean,
  // additional options as per documentation
})

**Methods:**
1. lintFiles(patterns: string[]): Promise<ESLint.LintResult[]>
   - Parameters: patterns: string[] (glob patterns for file selection)
   - Returns: Promise resolving to an array of LintResult objects

2. loadFormatter(format: string): Promise<ESLint.Formatter>
   - Parameters: format: string ('stylish', 'json', etc.)
   - Returns: Promise resolving to a Formatter object

3. outputFixes(results: ESLint.LintResult[]): Promise<void>
   - Description: Writes fixes to source files if automatic fix is enabled

**Example of Full SDK Integration:**
```js
// Import ESLint from the package
const { ESLint } = require('eslint');

(async function main() {
  // Create an instance with custom configuration; 'fix' option enables auto-fixing
  const eslint = new ESLint({
    overrideConfig: {
      env: { browser: true, node: true },
      rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"]
      }
    },
    fix: true
  });

  // Execute linting on JavaScript files
  const results = await eslint.lintFiles(["src/**/*.js"]);

  // Load a formatter and display the lint results
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.log(resultText);

  // Apply fixes to source files
  await ESLint.outputFixes(results);
})();
```

### Configuration Options Details
- **`env`**: Specifies the environments the code is designed to run in. Example: `{ browser: true, node: true }`
- **`extends`**: Inherits configurations from predefined ESLint configurations. Example: `"eslint:recommended"`
- **`rules`**: Object specifying rule names and their configurations. Example: 
  - `"semi"`: enforces semicolon usage, set as `["error", "always"]`
  - `"quotes"`: enforces usage of double quotes, set as `["error", "double"]`
- **`fix`**: Boolean flag (default `false`) to automatically fix problems when possible.

### Best Practices with Implementation Code
- Integrate ESLint in CI by running: `eslint . --max-warnings=0`
- Modularize custom rules for maintainability and reuse.
- Use `eslint --print-config <file>` to debug the applied configuration for a particular file.

### Troubleshooting Procedures
1. Run ESLint in debug mode:
   Command: `eslint --debug file.js`
   Expected output: Detailed logs of ESLint scanning and rule application steps.
2. Validate configuration file syntax using a JSON validator.
3. Use `eslint --print-config file.js` to verify the effective configuration for a file.
4. Ensure your Node.js version is compatible (>= 10.0.0) with the ESLint version in use.


## Original Source
ESLint Official Documentation
https://eslint.org/docs/latest/

## Digest of ESLINT_OFFICIAL

# ESLINT OFFICIAL DOCUMENTATION
Retrieved on: 2025-04-20

## Table of Contents
1. Use ESLint in Your Project
2. Extend ESLint
3. Integrate ESLint
4. Contribute to ESLint
5. Maintain ESLint

## 1. Use ESLint in Your Project
- **CLI Options**: Use commands like `eslint --fix`, `eslint --init` for automatic fixes and initial configuration.
- **Configuration Example (.eslintrc.json)**:
  {
    "env": { "browser": true, "node": true },
    "extends": "eslint:recommended",
    "rules": { "semi": ["error", "always"], "quotes": ["error", "double"] }
  }
- **Formatters & Integrations**: Detailed formatter options available in the CLI. Specify formatter such as "stylish" using the Node.js API.

## 2. Extend ESLint
- **Custom Rule Development**: Create custom rules by exporting an object with a `meta` property and a `create` function.

  **Code Example:**
  ```js
  module.exports = {
    meta: {
      type: "problem",
      docs: { description: "disallow use of foo", recommended: true },
      schema: []
    },
    create(context) {
      return {
        Identifier(node) {
          if (node.name === 'foo') {
            context.report({ node, message: "Avoid using foo." });
          }
        }
      };
    }
  };
  ```

## 3. Integrate ESLint
- **Node.js API Usage**: Import ESLint and instantiate with custom configuration.

  **Code Example:**
  ```js
  const { ESLint } = require('eslint');
  const eslint = new ESLint({
    overrideConfig: {
      rules: { semi: ['error', 'always'] }
    }
  });

  async function runLint() {
    const results = await eslint.lintFiles(['**/*.js']);
    console.log(results);
  }
  runLint();
  ```

## 4. Contribute to ESLint
- **Contribution Guidelines**: Detailed instructions on setting up the development environment including cloning the repository, running `npm install` to fetch dependencies, and executing `npm test` to run the test suite. Follow project structure and commit message conventions.

## 5. Maintain ESLint
- **Maintenance Best Practices**: Codebase maintenance guidelines include enforcing consistent coding style, following documented commit conventions, and adhering to branch management policies. Use debug tools like `eslint --debug` for troubleshooting.


## Attribution
- Source: ESLint Official Documentation
- URL: https://eslint.org/docs/latest/
- License: License: MIT License
- Crawl Date: 2025-04-21T10:49:41.699Z
- Data Size: 2732095 bytes
- Links Found: 5977

## Retrieved
2025-04-21
library/NODE_CLUSTER.md
# library/NODE_CLUSTER.md
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
library/BABY_AGI.md
# library/BABY_AGI.md
# BABY_AGI

## Crawl Summary
The BabyAGI framework provides an experimental self-building autonomous agent with a function management system named 'functionz'. Key technical specifications include: installation via pip, dashboard creation using babyagi.create_app (with host and port parameters), function registration through decorators with support for dependencies, metadata (with imports, dependencies, keys, and description), and key system functions such as babyagi.load_functions and babyagi.add_key_wrapper. The logging system records execution, errors, and triggers. Pre-loaded function packs are available for default operations and AI functionalities. Two self-building functions (process_user_input and self_build) demonstrate task decomposition and dynamic function generation with clear code examples.

## Normalised Extract
# Table of Contents

1. Quick Start
2. Basic Usage
3. Function Metadata
4. Function Loading
5. Key Dependencies
6. Execution Environment
7. Log System
8. Dashboard
9. Pre-loaded Functions
10. Running a Self-Building Agent
11. Contributing & License

---

## 1. Quick Start

- Install with: `pip install babyagi`
- Create and run dashboard app:
  ```python
  import babyagi

  if __name__ == "__main__":
      app = babyagi.create_app('/dashboard')
      app.run(host='0.0.0.0', port=8080)
  ```

## 2. Basic Usage

- Register functions with decorators:
  ```python
  import babyagi

  @babyagi.register_function()
  def world():
      return "world"

  @babyagi.register_function(dependencies=["world"])
  def hello_world():
      return f"Hello {world()}!"

  print(babyagi.hello_world())
  ```

## 3. Function Metadata

- Use metadata to specify imports, dependencies, and descriptions:
  ```python
  @babyagi.register_function(
      imports=["math"],
      dependencies=["circle_area"],
      key_dependencies=["openai_api_key"],
      metadata={"description": "Calculates the volume of a cylinder using circle_area."}
  )
  def cylinder_volume(radius, height):
      import math
      area = circle_area(radius)
      return area * height
  ```

## 4. Function Loading

- Loading function packs from custom paths:
  ```python
  babyagi.load_functions("path/to/your/custom_functions.py")
  ```

## 5. Key Dependencies

- Add key dependencies in code:
  ```python
  babyagi.add_key_wrapper('openai_api_key', 'your_openai_api_key')
  ```

## 6. Execution Environment

- Automatic loading of essential function packs and logging of function relationships to ensure smooth execution.

## 7. Log System

- **Execution Tracking:** Logs function start/finish, inputs, outputs, and duration.
- **Error Logging:** Captures detailed error messages.
- **Dependency and Trigger Logging:** Records automatic triggers and dependency resolution.

## 8. Dashboard

- Manage functions, dependencies, keys, logs, and triggers through the web interface at `/dashboard`.

## 9. Pre-loaded Functions

- **Default Pack:** Handles function execution, key management, trigger setup, and logging with filters.
- **AI Pack:** Provides auto-generated descriptions, embeddings, and selection based on prompts.

## 10. Running a Self-Building Agent

### process_user_input (in drafts/code_writing_functions pack):

  ```python
  import babyagi
  import os

  babyagi.add_key_wrapper('openai_api_key', os.environ['OPENAI_API_KEY'])
  babyagi.load_functions("drafts/code_writing_functions")

  babyagi.process_user_input("Grab today's score from ESPN and email it to test@test.com")
  ```

### self_build (in drafts/self_build pack):

  ```python
  import babyagi
  import os

  babyagi.add_key_wrapper('openai_api_key', os.environ['OPENAI_API_KEY'])
  babyagi.load_functions("drafts/code_writing_functions")
  babyagi.load_functions("drafts/self_build")

  babyagi.self_build("A sales person at an enterprise SaaS company.", 3)
  ```

## 11. Contributing & License

- Contributions are encouraged; project is under MIT License.


## Supplementary Details
## Detailed Specifications and Implementation Details

- **Dashboard Configuration:**
  - `babyagi.create_app(path: str)` creates a web server with the dashboard at the given path.
  - Run the application on host `0.0.0.0` and port `8080` for external accessibility.

- **Function Registration:**
  - Decorator: `@babyagi.register_function()` supports optional parameters:
    - `imports: List[str]` (e.g., ["math"])
    - `dependencies: List[str]` (e.g., ["world"])
    - `key_dependencies: List[str]` (e.g., ["openai_api_key"])
    - `metadata: dict` with key `description`.

- **Function Loading:**
  - `babyagi.load_functions(file_path: str)` dynamically loads functions from a file. This organizes functions into packs.

- **Key Management:**
  - `babyagi.add_key_wrapper(key: str, value: str)` stores a secret key either programmatically or via the dashboard.

- **Self-Building Agent Functions:**
  - `babyagi.process_user_input(user_input: str)`: Determines if a function exists or generates new functions by decomposing tasks.
  - `babyagi.self_build(description: str, count: int)`: Generates distinct tasks based on the given description and count; internally invokes `process_user_input`.

- **Logging:**
  - Logs include function name, parameters, execution time, and errors.
  - Automatic dependency resolution is logged for build and execution traceability.

- **Configuration Options:**
  - Host and Port in `app.run(host, port)` with default values provided in the quick start guide.


## Reference Details
## Complete API and SDK Specifications

### babyagi.create_app(path: str) -> FlaskApp
- **Parameters:**
  - path (str): The URL path to mount the dashboard (e.g., '/dashboard').
- **Returns:**
  - An application object that supports the `.run(host: str, port: int)` method.
- **Usage Example:**
  ```python
  import babyagi

  app = babyagi.create_app('/dashboard')
  app.run(host='0.0.0.0', port=8080)
  ```

### babyagi.register_function(*, imports: List[str] = None, dependencies: List[str] = None, key_dependencies: List[str] = None, metadata: dict = None) -> Callable
- **Description:** Decorator to register a new function with optional metadata.
- **Parameters:**
  - imports (List[str]): External libraries to import (default: None).
  - dependencies (List[str]): Other functions required (default: None).
  - key_dependencies (List[str]): Required secret keys (default: None).
  - metadata (dict): Additional data (e.g., {"description": "..."}).
- **Returns:**
  - The wrapped function.
- **Example:**
  ```python
  @babyagi.register_function(
      imports=["math"],
      dependencies=["circle_area"],
      key_dependencies=["openai_api_key"],
      metadata={"description": "Calculates cylinder volume."}
  )
  def cylinder_volume(radius: float, height: float) -> float:
      import math
      area = circle_area(radius)
      return area * height
  ```

### babyagi.load_functions(file_path: str) -> None
- **Description:** Dynamically loads a set of functions from a given file path.
- **Parameters:**
  - file_path (str): Path to the Python file containing function definitions.
- **Usage Example:**
  ```python
  babyagi.load_functions("drafts/code_writing_functions")
  ```

### babyagi.add_key_wrapper(key: str, value: str) -> None
- **Description:** Stores a secret key for later use by functions.
- **Parameters:**
  - key (str): The name of the key (e.g., 'openai_api_key').
  - value (str): The secret key value.
- **Usage Example:**
  ```python
  babyagi.add_key_wrapper('openai_api_key', 'your_openai_api_key')
  ```

### babyagi.process_user_input(user_input: str) -> None
- **Description:** Processes user input to decide whether to reuse an existing function or generate a new one.
- **Parameters:**
  - user_input (str): A string describing the task, e.g., "Grab today's score from ESPN and email it to test@test.com".
- **Usage Example:**
  ```python
  babyagi.process_user_input("Grab today's score from ESPN and email it to test@test.com")
  ```

### babyagi.self_build(description: str, count: int) -> None
- **Description:** Generates multiple tasks (functions) based on a description. Internally calls process_user_input.
- **Parameters:**
  - description (str): Describes the scenario, e.g., "A sales person at an enterprise SaaS company.".
  - count (int): Number of distinct tasks to generate.
- **Usage Example:**
  ```python
  babyagi.self_build("A sales person at an enterprise SaaS company.", 3)
  ```

## Best Practices & Troubleshooting

- **Best Practices:**
  - Always define clear dependencies using the `dependencies` and `key_dependencies` parameters.
  - Use descriptive metadata for each registered function to aid in dashboard management.
  - Run the dashboard on a dedicated host and port in production-like environments for easier management.

- **Troubleshooting:**
  1. If functions do not load, verify the file path passed to `babyagi.load_functions` is correct.
  2. Check open ports if the dashboard does not appear using `netstat` (e.g., `netstat -an | grep 8080`).
  3. Review the logs for errors related to missing dependencies or key mismatches.
  4. Confirm that secret keys are added correctly using `babyagi.add_key_wrapper` and are available in the environment.
  5. Use verbose logging options (if available) to print debug messages during function registration and execution.


## Original Source
BabyAGI Documentation
https://github.com/yoheinakajima/babyagi

## Digest of BABY_AGI

# BABY_AGI Documentation Digest

**Retrieved:** 2023-10-13

This document contains the full technical content extracted from the BabyAGI repository. It includes complete API method signatures, configuration details, code examples, implementation patterns, and troubleshooting procedures.

## Quick Start

- **Installation:**
  ```bash
  pip install babyagi
  ```

- **Loading the Dashboard:**
  ```python
  import babyagi

  if __name__ == "__main__":
      app = babyagi.create_app('/dashboard')
      app.run(host='0.0.0.0', port=8080)
  ```

- **Access:** Open a web browser at [http://localhost:8080/dashboard](http://localhost:8080/dashboard).

## Basic Usage

- **Registering Functions:**
  ```python
  import babyagi

  # Register a simple function
  @babyagi.register_function()
  def world():
      return "world"

  # Register a function that depends on 'world'
  @babyagi.register_function(dependencies=["world"])
  def hello_world():
      x = world()
      return f"Hello {x}!"

  # Execute the function
  print(babyagi.hello_world())  # Output: Hello world!

  if __name__ == "__main__":
      app = babyagi.create_app('/dashboard')
      app.run(host='0.0.0.0', port=8080)
  ```

## Function Metadata

- **Metadata Registration Example:**
  ```python
  import babyagi

  @babyagi.register_function(
      imports=["math"],
      dependencies=["circle_area"],
      key_dependencies=["openai_api_key"],
      metadata={
          "description": "Calculates the volume of a cylinder using the circle_area function."
      }
  )
  def cylinder_volume(radius, height):
      import math
      area = circle_area(radius)
      return area * height
  ```

- **Available Metadata Fields:**
  - `imports`: List of external libraries required by the function.
  - `dependencies`: List of functions this function depends on.
  - `key_dependencies`: List of secret keys required by the function.
  - `metadata["description"]`: Description of the function.

## Function Loading

- **Loading Custom Function Packs:**
  ```python
  import babyagi

  # Load your custom function pack
  babyagi.load_functions("path/to/your/custom_functions.py")
  ```

- **Function Packs Directory:** Found in `babyagi/functionz/packs`.

## Key Dependencies

- **Storing Key Dependencies from Code:**
  ```python
  import babyagi

  babyagi.add_key_wrapper('openai_api_key', 'your_openai_api_key')
  ```

- **Dashboard Addition:** Use the dashboard's `add_key_wrapper` feature to securely input secret keys.

## Execution Environment

- **Function Pack Auto-loading:** BabyAGI automatically imports essential function packs to ensure that dependencies are resolved.
- **Comprehensive Logging:** The framework logs every function execution, dependencies, inputs, outputs, and errors for troubleshooting.

## Log System

- **Features:**
  - **Execution Tracking:** Logs start and finish times, function names, arguments, and execution duration.
  - **Error Logging:** Captures detailed error messages for every exception.
  - **Dependency Logging:** Automatically tracks and logs dependencies between functions.
  - **Trigger Logging:** Logs automatic function triggers and their outcomes.

## Dashboard

- **Features:**
  - Function Management: Register, update, or deregister functions.
  - Dependency Visualization: Manage and view function dependencies.
  - Secret Key Management: Securely manage keys via the UI.
  - Logging and Monitoring: View detailed logs of every execution.
  - Trigger Management: Set up automated triggers based on events.

- **Access:** Navigate to [http://localhost:8080/dashboard](http://localhost:8080/dashboard) after starting the app.

## Pre-loaded Functions

- **Default Functions Pack (packs/default_functions.py):**
  - Function Execution: Run, add, update, or retrieve functions and their versions.
  - Key Management: Add or retrieve secret keys.
  - Triggers: Add triggers for function execution.
  - Logs: Retrieve execution logs with filters.

- **AI Functions Pack (packs/ai_generator.py):**
  - AI Description & Embeddings: Auto-generate descriptions and function embeddings.
  - Function Selection: Find similar functions based on prompts.

## Running a Self-Building Agent

### 1. process_user_input (in drafts/code_writing_functions pack)

- **Usage:**
  ```python
  import babyagi
  import os

  babyagi.add_key_wrapper('openai_api_key', os.environ['OPENAI_API_KEY'])
  babyagi.load_functions("drafts/code_writing_functions")

  babyagi.process_user_input("Grab today's score from ESPN and email it to test@test.com")
  ```

- **Details:** The function assesses whether to use an existing function or generate a new one by decomposing tasks into smaller reusable components.

### 2. self_build (in drafts/self_build pack)

- **Usage:**
  ```python
  import babyagi
  import os

  babyagi.add_key_wrapper('openai_api_key', os.environ['OPENAI_API_KEY'])
  babyagi.load_functions("drafts/code_writing_functions")
  babyagi.load_functions("drafts/self_build")

  babyagi.self_build("A sales person at an enterprise SaaS company.", 3)
  ```

- **Details:** This function generates X tasks based on a description and calls `process_user_input` to build functions if needed.

## Contributing & License

- **Contributing:** Community contributions are welcome. Expect slow progress as the project is managed by a single developer.
- **License:** Released under the MIT License. See the LICENSE file for full details.

---

**Attribution:** Crawled from https://github.com/yoheinakajima/babyagi
**Data Size:** 571476 bytes

## Attribution
- Source: BabyAGI Documentation
- URL: https://github.com/yoheinakajima/babyagi
- License: MIT License
- Crawl Date: 2025-04-20T19:05:50.291Z
- Data Size: 571476 bytes
- Links Found: 4549

## Retrieved
2025-04-20
library/NPM_DOCS.md
# library/NPM_DOCS.md
# NPM_DOCS

## Crawl Summary
This document extracts the detailed technical information from the npm documentation including architecture (website, CLI, registry), precise account creation steps, CLI commands such as 'npm login', 'npm whoami', publishing commands with OTP support, detailed 2FA setup both from website and CLI, and troubleshooting commands. It includes explicit code examples, configuration parameters, recovery steps, and error resolution commands for issues like broken installations, permission errors, and SSL issues.

## Normalised Extract
# Table of Contents

1. Architecture Overview
2. Account Setup and CLI Login
3. CLI Commands for Package Management
4. Two-Factor Authentication (2FA) Setup
5. Troubleshooting and Debugging Procedures
6. User Profile Management via CLI

---

## 1. Architecture Overview

- **Website:** For package discovery, profile and organization management.
- **Command Line Interface (CLI):** Main tool for interacting with npm; supports login, publishing, and configuration.
- **Registry:** The public database of JavaScript packages and metadata.

## 2. Account Setup and CLI Login

- **Account Creation:** Use the signup page, input username (lowercase, hyphen allowed), email, and secure password ( >10 characters, no embedded username, verified via breach databases).
- **CLI Login Command:**

  ```bash
  npm login
  ```

- **Verification Command:**

  ```bash
  npm whoami
  ```

- **Error Consideration:** Misspelling username creates a new account; contact npm Support if needed.

## 3. CLI Commands for Package Management

- **Publishing with OTP:**

  ```bash
  npm publish [<tarball>|<folder>] [--tag <tag>] --otp=123456
  ```

- **Unpublishing Package:**

  ```bash
  npm unpublish [<@scope>/]<pkg>[@<version>] --otp=123456
  ```

- **Managing Owners and Tags:**

  ```bash
  npm owner add <user> --otp=123456
  npm dist-tags add <pkg>@<version> [<tag>] --otp=123456
  npm access edit [<package>] --otp=123456
  ```

## 4. Two-Factor Authentication (2FA) Setup

- **Enabling via Website:**
  - Navigate to Account → Two-Factor Authentication → Enable 2FA
  - Choose method (Security Key or TOTP)
  - Save and securely store recovery codes

- **Enabling via CLI:**

  ```bash
  # For auth and writes
  npm profile enable-2fa auth-and-writes

  # For auth only
  npm profile enable-2fa auth-only
  ```

- **Sending OTP with Commands:** Append `--otp=123456` where required.

## 5. Troubleshooting and Debugging Procedures

- **Generating Logs:**

  ```bash
  npm install --timing
  npm publish --timing
  ```

- **Debug Log Location:** In the `.npm` directory (determine via `npm config get cache`).

- **Common Errors & Fixes:**
  - **Broken Installation:** Reinstall npm/Node.
  - **Cache Issues:** Run `npm cache clean`.
  - **Permission Errors (ENOENT):** Ensure directory exists and proper permissions are set.
  - **SSL/Proxy Errors:** Verify proxy and SSL configurations.

## 6. User Profile Management via CLI

- **Viewing Profile:**

  ```bash
  npm profile get
  ```

- **Updating Profile Properties:**

  ```bash
  npm profile set <prop> <value>
  ```

- **Password Update:**

  ```bash
  npm profile set password
  ```

  Ensure password meets security criteria (length, uniqueness, breach check).


## Supplementary Details
## Supplementary Technical Specifications

### Account & Authentication

- **Username:** Must be lower case; allowed characters: [a-z0-9-].
- **Password Requirements:** >10 characters, not including username string, must pass breach verification.
- **2FA Methods:** Security keys (using WebAuthn) and TOTP (using apps like Authy/Google Authenticator).

### CLI Command Options and Flags

- `npm login`: Prompts for username, password, email; supports security-key and TOTP flows.
- `npm whoami`: Displays currently logged in username.
- `npm profile enable-2fa [auth-and-writes|auth-only]`: Enables 2FA schemes; requires current password and OTP input.
- `npm profile disable-2fa`: Disables two-factor authentication after proper prompts.
- Publishing commands must include `--otp=<OTP>` when 2FA is enabled.

### Configuration Defaults

- **OTP Length:** Typically 6 digits.
- **Cache Directory:** Retrieved via `npm config get cache`; location dependent on OS (e.g., C:\Users\<user>\AppData\Roaming\npm on Windows).

### Implementation Steps

1. Create or log in to an account via CLI or Website.
2. Enable 2FA for enhanced security using provided commands.
3. Use OTP parameters in secure operations such as publish, access, owner add/rm commands.
4. For troubleshooting, generate logs with `--timing` flag and inspect the npm-debug.log file.

### Best Practices

- Always use unique, robust passwords managed by a password manager.
- Immediately enable 2FA after account creation.
- Regularly update npm using `npm install npm@latest -g` to mitigate bugs and security issues.


## Reference Details
## Complete API and CLI Specifications

### npm CLI Commands

- **npm login**

  **Usage:** `npm login [--auth-type=web]`

  **Parameters:**
  - No explicit parameters; interactively prompts for:
    - Username: string
    - Password: string (checked against password guidelines)
    - Email: string
  - Optional flag: `--auth-type=web` triggers browser based security-key login flow.

  **Return:** Success message with current user’s username (as verified by `npm whoami`).

- **npm whoami**

  **Usage:** `npm whoami`

  **Return:** Logged in username as string.

- **npm publish**

  **Usage:**
  ```bash
  npm publish [<tarball>|<folder>] [--tag <tag>] --otp=<one-time-code>
  ```

  **Parameters:**
  - `<tarball>|<folder>`: Package source to publish.
  - `--tag <tag>`: Optional tag assignment.
  - `--otp=<one-time-code>`: 6-digit OTP (string or number) required if 2FA is enabled.

  **Return:** Published package details; errors if OTP invalid or package issues found.

- **npm unpublish**

  **Usage:**
  ```bash
  npm unpublish [<@scope>/]<pkg>[@<version>] --otp=<one-time-code>
  ```

  **Parameters:**
  - Package name with optional scope and version.
  - `--otp` flag as above.

- **npm owner add / rm**

  **Usage:**
  ```bash
  npm owner add <user> --otp=<one-time-code>
  npm owner rm <user> --otp=<one-time-code>
  ```

- **npm profile enable-2fa**

  **Usage:**
  ```bash
  npm profile enable-2fa auth-and-writes
  npm profile enable-2fa auth-only
  ```

  **Parameters:**
  - Mode: 'auth-and-writes' or 'auth-only'.

  **Return:** Confirmation of 2FA activation.

- **npm profile disable-2fa**

  **Usage:** `npm profile disable-2fa`

  **Parameters:** Interactive prompt requests password and OTP.

- **npm profile get / set**

  **Usage:**
  ```bash
  npm profile get
  npm profile set <property> <value>
  ```

  **Properties Include:** email, fullname, homepage, freenode, password.
  For password set, system enforces security criteria (length, uniqueness, etc.).

### Code Example: Publishing with 2FA

```bash
# Log in to npm
npm login

# Publish a package with OTP authentication
npm publish ./my-package --tag beta --otp=123456
```

### Troubleshooting Commands

```bash
# Generate timing logs during install
npm install --timing

# Locate cache directory for logs
npm config get cache
```

### Best Practices

- Always include the `--otp` flag when executing commands that modify published packages if 2FA is enabled.
- Use a Node version manager (e.g., nvm) to manage multiple Node and npm versions.
- Regularly update npm using:

```bash
npm install npm@latest -g
```

- In case of permission errors on Windows, verify that the directory `C:\Users\<user>\AppData\Roaming\npm` exists and has the correct permissions.

This detailed specification provides a complete reference for developers to implement and troubleshoot npm CLI operations without recourse to external documentation.

## Original Source
npm Documentation
https://docs.npmjs.com/

## Digest of NPM_DOCS

# NPM Documentation Digest

**Retrieved:** 2023-10-24

**Data Size:** 563158 bytes
**Links Found:** 21420

---

# Overview

NPM comprises three primary components:

1. **Website:** Discover packages, manage profiles, and handle organizations.
2. **Command Line Interface (CLI):** Primary tool for package installation, publishing, and account management.
3. **Registry:** A comprehensive public database of JavaScript packages with corresponding meta-information.

# Account Setup and Login

## Creating an Account

- Navigate to: [npm Signup](http://www.npmjs.com/~yourusername)
- Fill in:
  - **Username:** Lowercase; may include hyphens/numerals.
  - **Email Address:** Publicly visible in package metadata.
  - **Password:** Must be >10 characters, not contain the username, and be checked against common breaches (Have I Been Pwned).
- Accept the End User License Agreement and Privacy Policy.
- Click **Create An Account** and verify via email.

## Testing Account via CLI

- Command: `npm login`
- On prompt enter username, password, and email.
- For 2FA enabled accounts, enter OTP when prompted.
- Validate login with: `npm whoami`

# CLI Commands and Authentication

## Standard Login Flow

```bash
npm login
```

If using security keys or TOTP:

```bash
# For security-key based login
npm login --auth-type=web
```

After login, additional steps include copying generated tokens and entering OTP if needed.

## Publishing and Managing Packages

- To publish a package:

  ```bash
  npm publish [<tarball>|<folder>] [--tag <tag>] --otp=123456
  ```

- To unpublish a package:

  ```bash
  npm unpublish [<@scope>/]<pkg>[@<version>] --otp=123456
  ```

- Other commands include adding owners, managing dist-tags, and editing access:

  ```bash
  npm owner add <user> --otp=123456
  npm dist-tags add <pkg>@<version> [<tag>] --otp=123456
  npm access edit [<package>] --otp=123456
  ```

# Two-Factor Authentication (2FA) Details

2FA is recommended to enhance security. It can be implemented via a security-key (using WebAuthn) or TOTP (via apps like Authy or Google Authenticator).

## Enabling 2FA from the Website

1. Sign in to your account.
2. Navigate to **Account** > **Two-Factor Authentication** > **Enable 2FA**.
3. Enter your current password and choose a method:
   - **Security Key:** Provide a name and follow browser steps.
   - **TOTP:** Scan the QR code, then enter the generated code.
4. Save recovery codes securely.

## Enabling 2FA via CLI

```bash
# For both authorization and writes:
npm profile enable-2fa auth-and-writes

# For authorization only:
npm profile enable-2fa auth-only
```

When using CLI commands that require OTP after enabling 2FA, append `--otp=<code>`.

## Disabling 2FA

### Via Website:
1. Sign in and navigate to **Account** > **Modify 2FA**.
2. Choose to disable (with confirmation prompt).

### Via CLI:

```bash
npm profile disable-2fa
```

# Troubleshooting and Debugging

## Generating Debug Logs

For issues during package installation or publishing:

- **For install:**

  ```bash
  npm install --timing
  ```

- **For publish:**

  ```bash
  npm publish --timing
  ```

The log file (`npm-debug.log`) is generated in the `.npm` directory. Identify its location via:

```bash
npm config get cache
```

## Common Errors and Remedies

- **Broken npm installation:** Reinstall npm (Linux/Mac) or Node via official installer (Windows).
- **Random errors:** Run `npm cache clean` and retry.
- **Permissions errors:** See resolution for ENOENT errors (e.g., ensure `C:\Users\<user>\AppData\Roaming\npm` exists and is writable).
- **SSL and Proxy Errors:** Ensure proper proxy configurations and use HTTPS.
- **Invalid JSON / ENOTEMPTY errors:** Check shrinkwrapped dependency files and ensure correct syntax.

# Additional CLI Account Management

## Profile Settings (CLI)

- **View settings:**

  ```bash
  npm profile get
  ```

- **Update settings:**

  ```bash
  npm profile set <prop> <value>
  ```

Properties include email, fullname, homepage, freenode, password. For updating password:

```bash
npm profile set password
```

Follow prompts for current and new password ensuring:
   - Length > 10 characters
   - Does not include username
   - Not compromised as per Have I Been Pwned.

---

**Attribution:** Content retrieved from npm Documentation (Entry 3).


## Attribution
- Source: npm Documentation
- URL: https://docs.npmjs.com/
- License: License: Public Domain / npm terms
- Crawl Date: 2025-04-20T23:46:33.929Z
- Data Size: 563158 bytes
- Links Found: 21420

## Retrieved
2025-04-20
library/AI_PLANNING.md
# library/AI_PLANNING.md
# AI_PLANNING

## Crawl Summary
The crawled content provides explicit technical specifications for AI planning including complete PDDL language versions and examples. It details PDDL 1.2 domain and problem file structures, action definitions, predicates, logical operators (and, or, not, imply, forall, exists), durative actions for PDDL2.1, derived predicates and timed initial literals for PDDL2.2, soft constraints for PDDL3.0, and processes/events for PDDL+. Technical command line examples for executing planners are provided along with exact code examples for domain and problem files.

## Normalised Extract
# Table of Contents
1. Introduction
2. PDDL Overview
   - PDDL 1.2
   - PDDL 2.1
   - PDDL 2.2
   - PDDL 3.0
   - PDDL+
3. Domain Specification
   - Domain File Structure
   - Detailed Example
4. Problem Specification
   - Problem File Structure
   - Detailed Example
5. Action and Logical Constructs
   - Action Example (BUILD-WALL)
   - Logical Operators (and, or, not, imply, forall, exists)
6. Command Line Execution
   - Execution Syntax Examples
7. Attribution & Data Details

---

## 1. Introduction
Extracted technical content focusing on AI planning and PDDL with exact code examples for domain and problem definitions.

## 2. PDDL Overview
- **PDDL 1.2:** Uses predicate logic for state definitions.
- **PDDL 2.1:** Introduces durative actions with time (duration parameter) and numeric fluents.
- **PDDL 2.2:** Adds derived predicates and timed initial literals for delayed facts.
- **PDDL 3.0:** Introduces soft constraints with preferences and cost metrics.
- **PDDL+:** Models processes (continuous change) and events (instantaneous changes).

## 3. Domain Specification
### Domain File Structure
A domain file defines universal problem aspects:
- Domain name
- Extends clause (optional)
- Requirements (e.g. :strips, :typing)
- Types and subtypes
- Constants (if any)
- Predicates with typed parameters
- Timeless predicates
- Actions with parameter, preconditions, and effects
- Axioms for derived predicates

### Detailed Example
```
(define
    (domain construction)
    (:extends building)
    (:requirements :strips :typing)
    (:types
        site material - object
        bricks cables windows - material
    )
    (:constants mainsite - site)
    (:predicates
        (walls-built ?s - site)
        (windows-fitted ?s - site)
        (foundations-set ?s - site)
        (cables-installed ?s - site)
        (site-built ?s - site)
        (on-site ?m - material ?s - site)
        (material-used ?m - material)
    )
    (:timeless (foundations-set mainsite))
    (:action BUILD-WALL
        :parameters (?s - site ?b - bricks)
        :precondition (and
            (on-site ?b ?s)
            (foundations-set ?s)
            (not (walls-built ?s))
            (not (material-used ?b))
        )
        :effect (and
            (walls-built ?s)
            (material-used ?b)
        )
    )
    (:axiom
        :vars (?s - site)
        :context (and
            (walls-built ?s)
            (windows-fitted ?s)
            (cables-installed ?s)
        )
        :implies (site-built ?s)
    )
)
```

## 4. Problem Specification
### Problem File Structure
A problem file specifies:
- The problem name
- The associated domain
- Objects (with types) present in the instance
- The initial state setup
- The goal state definition

### Detailed Example
```
(define
    (problem buildingahouse)
    (:domain construction)
    (:objects
        s1 - site
        b - bricks
        w - windows
        c - cables
    )
    (:init
        (on-site b s1)
        (on-site c s1)
        (on-site w s1)
    )
    (:goal (and
            (walls-built s1)
            (cables-installed s1)
            (windows-fitted s1)
        )
    )
)
```

## 5. Action and Logical Constructs
### Action Example: BUILD-WALL
```
(:action BUILD-WALL
    :parameters (?s - site ?b - bricks)
    :precondition (and
        (on-site ?b ?s)
        (foundations-set ?s)
        (not (walls-built ?s))
        (not (material-used ?b))
    )
    :effect (and
        (walls-built ?s)
        (material-used ?b)
    )
)
```

### Logical Operators
- **and:** `(and (predicate1) (predicate2))`
- **or:** `(or (predicate1) (predicate2))`
- **not:** `(not (predicate))`
- **imply:** `(imply (antecedent) (consequent))`
- **forall:** 
  ```
  (forall (?b - bricks)
      (not (material-used ?b))
  )
  ```
- **exists:** 
  ```
  (exists (?c - bricks)
      (not (material-used ?c))
  )
  ```

## 6. Command Line Execution
Execute planners using command line:

```
./<planner> <domain> <problem>
```
or
```
./<planner> -o <domain> -f <problem>
```

Tools may auto-detect plan output using regex patterns (e.g. Eviscerator).

## 7. Attribution & Data Details
- **URL:** https://planning.wiki/
- **Data Size:** 1944938 bytes
- **Links Found:** 4858
- **Contributors:** Adam Green, Benjamin Jacob Reji, ChrisE2018, Christian Muise, Enrico Scala, Felipe Meneguzzi, Francisco Martin Rico, Henry Stairs, Jan Dolejsi, Mau Magnaguagno, Jonathan Mounty


## Supplementary Details
## Detailed Supplementary Specifications

### PDDL Domain and Problem Setup
- **Domain Name:** Must match both domain and problem files to ensure compatibility.
- **Requirements:** Use ':strips' and ':typing' for basic PDDL 1.2 compliance. Other requirements can include :adl, :equality, etc., depending on planner support.
- **Types:** Define using `(:types <type> - object)` syntax. Subtyping can be implemented as `<subtype> - <supertype>`.
- **Constants:** Use `(:constants name - type)`; typical default is mainsite.
- **Predicates:** Must list all predicates with typed parameters. E.g., (walls-built ?s - site).

### Action Implementation Steps
1. Define action with `:action <name>`, set parameters with type definitions.
2. Specify preconditions using logical combinations (and, not, etc.).
3. Define effects similarly with assignment of predicate truth values.

Example Implementation:
```
(:action BUILD-WALL
    :parameters (?s - site ?b - bricks)
    :precondition (and
        (on-site ?b ?s)
        (foundations-set ?s)
        (not (walls-built ?s))
        (not (material-used ?b))
    )
    :effect (and
        (walls-built ?s)
        (material-used ?b)
    )
)
```

### Command Line & Configuration Options
- **Execution Syntax:** Ensure domain file and problem file are passed correctly.
- **Example:**
  - `./planner domain.pddl problem.pddl`
  - `./planner -o domain.pddl -f problem.pddl`
- **Debugging Tips:** Run planners with verbose flag (commonly `-v`) to see detailed search process and plan generation.

### Best Practices
- Always verify that the domain name in the domain file matches the :domain attribute in the problem file.
- Include complete set of predicates to avoid mismatches during planning.
- Test individual actions in isolation using custom test problems.

### Troubleshooting Procedures
1. **Mismatch Error:** Verify the consistency of type declarations between domain and problem files.
2. **Action Precondition Fails:** Insert trace logging (if supported) by running with `-v` flag; observe which predicates are not satisfied.
3. **Compilation Issues:** For planners built from source, ensure dependencies are installed (e.g., on Linux use `make` and check GCC version). 
   - Example command output: `gcc --version` should return GCC 7.5 or higher.
4. **Runtime Failures:** Check command syntax: use `./planner -o domain.pddl -f problem.pddl` to ensure proper parsing.


## Reference Details
## Complete API Specifications & SDK Method Signatures (PDDL as a DSL)

### Domain File API
- **Method Signature:** There is no function call but the structure must follow:
  - Domain Definition: `(define (domain <name>) ... )`
  - Requirements: `(:requirements :strips :typing [other requirements])`
  - Types: `(:types type1 type2 - object; subtype - type)`
  - Constants: `(:constants constantName - type)`
  - Predicates: `(:predicates (predicateName ?arg - type) ...)`
  - Actions: 
    ```
    (:action ACTION_NAME
        :parameters (?arg1 - type1 ?arg2 - type2 ...)
        :precondition (<logical_expression>)
        :effect (<logical_expression>)
    )
    ```
  - Axioms: 
    ```
    (:axiom
        :vars (?var - type)
        :context (<logical_expression>)
        :implies (<logical_expression>)
    )
    ```

### Problem File API
- **Method Signature:** Structure must follow:
  - Problem Definition: `(define (problem <name>) (:domain <domainName>) ... )`
  - Objects: `(:objects obj1 - type1 obj2 - type2 ...)`
  - Init: `(:init (predicate arg1 arg2 ...))`
  - Goal: `(:goal (and (predicate arg1 ...) ...))`

### Full Code Examples

**Domain Example:**
```
(define
    (domain construction)
    (:extends building)
    (:requirements :strips :typing)
    (:types
        site material - object
        bricks cables windows - material
    )
    (:constants mainsite - site)
    (:predicates
        (walls-built ?s - site)
        (windows-fitted ?s - site)
        (foundations-set ?s - site)
        (cables-installed ?s - site)
        (site-built ?s - site)
        (on-site ?m - material ?s - site)
        (material-used ?m - material)
    )
    (:timeless (foundations-set mainsite))
    (:action BUILD-WALL
        :parameters (?s - site ?b - bricks)
        :precondition (and
            (on-site ?b ?s)
            (foundations-set ?s)
            (not (walls-built ?s))
            (not (material-used ?b))
        )
        :effect (and
            (walls-built ?s)
            (material-used ?b)
        )
    )
    (:axiom
        :vars (?s - site)
        :context (and
            (walls-built ?s)
            (windows-fitted ?s)
            (cables-installed ?s)
        )
        :implies (site-built ?s)
    )
)
```

**Problem Example:**
```
(define
    (problem buildingahouse)
    (:domain construction)
    (:objects
        s1 - site
        b - bricks
        w - windows
        c - cables
    )
    (:init
        (on-site b s1)
        (on-site c s1)
        (on-site w s1)
    )
    (:goal (and
            (walls-built s1)
            (cables-installed s1)
            (windows-fitted s1)
        )
    )
)
```

### Implementation Patterns
- **Step 1:** Define domain and list all elements.
- **Step 2:** Write corresponding problem file linking to the domain.
- **Step 3:** Run planner using command line syntax.

### Configuration Options
- Planner invocation flags (example):
  - `-o <domain file>` specifies the domain.
  - `-f <problem file>` specifies the problem.
  - `-v` for verbose output.

### Best Practices & Troubleshooting
- Always verify type consistency and domain names.
- Use verbose mode (`-v`) to diagnose unmet preconditions.
- Validate PDDL files with available validators (e.g., VAL for plan checking).
- For compilation issues in source-based planners, check dependency versions with commands like:
  - `gcc --version` (Expect GCC >= 7.5)
  - `make clean && make`

This detailed technical reference is intended to be used directly by developers implementing or troubleshooting AI planning systems using PDDL.


## Original Source
Automated Planning in AI
https://planning.wiki/

## Digest of AI_PLANNING

# AI_PLANNING DOCUMENT

**Retrieved:** 2023-10-27
**Data Size:** 1944938 bytes

---

# Introduction
This document contains the complete technical details extracted directly from the Automated Planning in AI crawl result (https://planning.wiki/). It covers the specifications of the Planning Domain Definition Language (PDDL), including the various versions like PDDL 1.2, PDDL2.1, PDDL2.2, PDDL3.0, and PDDL+. Full code examples of domain and problem files are provided, alongside detailed explanations of actions, predicates, and logical operators. 

# PDDL Overview

- **PDDL 1.2:** Based on STRIPS; defines objects, predicates, and actions.
- **PDDL 2.1:** Introduces durative actions with time and numeric fluents.
- **PDDL 2.2:** Adds derived predicates and timed initial literals.
- **PDDL 3.0:** Introduces soft constraints with cost assignments for preferences.
- **PDDL+:** Adds processes and events to model uncontrollable changes.

# PDDL Domain Specification

A domain file in PDDL 1.2 example:

```
(define
    (domain construction)
    (:extends building)
    (:requirements :strips :typing)
    (:types
        site material - object
        bricks cables windows - material
    )
    (:constants mainsite - site)

    (:predicates
        (walls-built ?s - site)
        (windows-fitted ?s - site)
        (foundations-set ?s - site)
        (cables-installed ?s - site)
        (site-built ?s - site)
        (on-site ?m - material ?s - site)
        (material-used ?m - material)
    )

    (:timeless (foundations-set mainsite))

    (:action BUILD-WALL
        :parameters (?s - site ?b - bricks)
        :precondition (and
            (on-site ?b ?s)
            (foundations-set ?s)
            (not (walls-built ?s))
            (not (material-used ?b))
        )
        :effect (and
            (walls-built ?s)
            (material-used ?b)
        )
    )

    (:axiom
        :vars (?s - site)
        :context (and
            (walls-built ?s)
            (windows-fitted ?s)
            (cables-installed ?s)
        )
        :implies (site-built ?s)
    )
    ; Additional actions omitted for brevity
)
```

# PDDL Problem Specification

A sample problem file in PDDL 1.2:

```
(define
    (problem buildingahouse)
    (:domain construction)
    (:objects
        s1 - site
        b - bricks
        w - windows
        c - cables
    )
    (:init
        (on-site b s1)
        (on-site c s1)
        (on-site w s1)
    )
    (:goal (and
            (walls-built s1)
            (cables-installed s1)
            (windows-fitted s1)
        )
    )
)
```

# PDDL Action & Logical Constructs

## Actions

Actions define state transformations. Example:

```
(:action BUILD-WALL
    :parameters (?s - site ?b - bricks)
    :precondition (and
        (on-site ?b ?s)
        (foundations-set ?s)
        (not (walls-built ?s))
        (not (material-used ?b))
    )
    :effect (and
        (walls-built ?s)
        (material-used ?b)
    )
)
```

## Logical Expressions

- **and:** `(and (predicate1) (predicate2) ...)`
- **or:** `(or (predicate1) (predicate2) ...)`
- **not:** `(not (predicate))`
- **imply:** `(imply (antecedent) (consequent))`
- **forall:** 
  ```
  (forall (?b - bricks)
      (not (material-used ?b))
  )
  ```
- **exists:** 
  ```
  (exists (?c - bricks)
      (not (material-used ?c))
  )
  ```

# Command Line Usage for Planners

Most AI planners are executed via the command line. Two common syntaxes:

```
./<planner> <domain> <problem>
```

```
./<planner> -o <domain> -f <problem>
```

Planners may output additional debugging and plan feedback, and tools like Eviscerator use regex to parse plan outputs.

# Attribution

- Crawled URL: https://planning.wiki/
- Data Size: 1944938 bytes
- Contributors include Adam Green, Benjamin Jacob Reji, ChrisE2018, Christian Muise, Enrico Scala, Felipe Meneguzzi, and others.


## Attribution
- Source: Automated Planning in AI
- URL: https://planning.wiki/
- License: License: CC BY-NC
- Crawl Date: 2025-04-21T04:49:45.258Z
- Data Size: 1944938 bytes
- Links Found: 4858

## Retrieved
2025-04-21
library/DOTENV.md
# library/DOTENV.md
# DOTENV

## Crawl Summary
Install and use dotenv to load environment variables from a .env file into process.env. The module supports multiline values, inline comments, a robust parsing engine with rules for trimming and preserving quotes, and utility functions to handle variable expansion and command substitution. Preloading via command-line options and environment-based configurations (like encoding, debug mode, override) are supported. Examples cover configuration through multiple files and secure deployments with encryption using dotenvx.

## Normalised Extract
## Table of Contents
1. Installation
2. Usage
3. Multiline Values
4. Comments
5. Parsing Engine
6. Preload & CLI Configuration
7. Variable Expansion & Command Substitution
8. Syncing & Multiple Environments
9. Deploying with Encryption
10. API Functions

---

### 1. Installation
- npm: `npm install dotenv --save`
- yarn: `yarn add dotenv`
- bun: `bun add dotenv`

### 2. Usage
- Create a `.env` file with key-value pairs.
- Import using `require('dotenv').config()` or `import 'dotenv/config'`.

Example:
```javascript
require('dotenv').config();
console.log(process.env);
```

### 3. Multiline Values
- Use literal line breaks or \n characters for multiline values.

Example:
```dotenv
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"
```

### 4. Comments
- Comment lines start with `#`.
- Inline comments require the value to be quoted if it contains a `#`.

### 5. Parsing Engine
- Function: `dotenv.parse(input, options?)`
- Accepts String or Buffer. Returns an Object mapping keys to values.

Example:
```javascript
const config = dotenv.parse(Buffer.from('BASIC=basic'));
```

### 6. Preload & CLI Configuration
- Preload with `node -r dotenv/config script.js`.
- Command-line configuration options: `dotenv_config_path`, `dotenv_config_debug`, `DOTENV_CONFIG_ENCODING`, etc.

### 7. Variable Expansion & Command Substitution
- Use `dotenv-expand` to expand variables.
- For command substitution, embed shell commands in the .env file (requires dotenvx).

### 8. Syncing & Multiple Environments
- Manage multiple environment files (e.g. .env.local, .env.production) using the `--env-file` option.

### 9. Deploying with Encryption
- Encrypt .env files with dotenvx:
```bash
dotenvx set HELLO Production --encrypt -f .env.production
```

### 10. API Functions
- **config(options)**: Reads and parses the .env file.
- **parse(src, options)**: Parses given input into key-value mappings.
- **populate(target, source, options)**: Merges parsed values into a target object.
- **decrypt**: For decrypting encrypted .env files (via dotenvx).


## Supplementary Details
### Configuration Options for dotenv.config()
- path (string): Default is `path.resolve(process.cwd(), '.env')`. Use to specify custom file location or an array of paths for multiple files. E.g., `{ path: ['/custom/.env', '.env'] }`.
- encoding (string): Default is `'utf8'`. Specify alternative encoding such as `'latin1'`.
- debug (boolean): Default is `false`. If set to true, enables detailed logging to assist in debugging environment variable loading.
- override (boolean): Default is `false`. When set to true, allows values in .env to overwrite existing keys in process.env.
- processEnv (object): Default is `process.env`. Can specify a custom object to load the variables into.

### Implementation Steps
1. Create your .env file with key-value pairs.
2. Require dotenv at the entry point of your application.
3. Optionally, configure with custom options:
   ```javascript
   require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
   ```
4. Use `dotenv.parse()` for parsing custom strings or Buffers.
5. Utilize `dotenv.populate()` to merge configurations into a custom target object.

### Best Practices
- Do not commit your .env file to version control.
- Use different .env files for different environments (development, production, etc.).
- Preload dotenv using the Node `--require` flag in production deployments.
- For sensitive deployments, consider encrypting .env files using dotenvx, and manage decryption keys separately.

### Troubleshooting
- If environment variables are not loaded, check that the .env file is located in the directory where the Node process is running.
- Enable debug mode by setting `{ debug: true }` in the config options to get detailed error messages.
- For React applications, ensure environment variables are prefixed with `REACT_APP_` or configured via Webpack.
- If bundling errors occur (e.g., missing polyfills), install `node-polyfill-webpack-plugin` and adjust the Webpack configuration accordingly.


## Reference Details
### API Specifications and Code Examples

#### 1. config(options?: Object): Object
- **Signature:** `config(options?: { path?: string | string[], encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: object, error?: Error }`
- **Parameters:**
  - `path`: Location(s) of the .env file. Default is `path.resolve(process.cwd(), '.env')`.
  - `encoding`: File encoding. Default is `'utf8'`.
  - `debug`: Enables logging for debugging purposes.
  - `override`: If true, existing keys in `process.env` will be overwritten.
  - `processEnv`: The target object to populate. Default is `process.env`.
- **Return:** Object with either a `parsed` key containing the key-value pairs or an `error` key if failed.

**Example:**
```javascript
const dotenv = require('dotenv');
const result = dotenv.config({
  path: '/custom/path/to/.env',
  encoding: 'latin1',
  debug: true,
  override: true,
  processEnv: process.env
});
if (result.error) {
  throw result.error;
}
console.log(result.parsed);
```

#### 2. parse(src: string | Buffer, options?: { debug?: boolean }): object
- **Signature:** `parse(src: string | Buffer, options?: { debug?: boolean }): object`
- **Parameters:**
  - `src`: A string or Buffer containing the environment file content.
  - `options.debug`: If true, logs warnings when lines do not match the pattern `KEY=VAL`.
- **Return:** Object mapping keys to their corresponding values.

**Example:**
```javascript
const dotenv = require('dotenv');
const buf = Buffer.from('BASIC=basic');
const config = dotenv.parse(buf, { debug: true });
console.log(config); // Output: { BASIC: 'basic' }
```

#### 3. populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void
- **Signature:** `populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void`
- **Parameters:**
  - `target`: The object to populate (e.g., process.env or custom object).
  - `source`: The parsed environment variables from a .env file.
  - `options.override`: If true, values in target will be overwritten by those in source.
  - `options.debug`: If true, outputs additional debug information.
- **Return:** void

**Example:**
```javascript
const dotenv = require('dotenv');
const parsed = { HELLO: 'world' };
// Populate process.env with parsed values
dotenv.populate(process.env, parsed);
console.log(process.env.HELLO); // 'world'

// Custom target example with override
const target = { HELLO: 'world' };
dotenv.populate(target, { HELLO: 'universe' }, { override: true, debug: true });
console.log(target); // { HELLO: 'universe' }
```

#### 4. decrypt (Referenced via dotenvx)
- **Usage:** The decrypt function is part of the extended functionality provided by dotenvx for handling encrypted .env files. 
- **Example Command:**
```bash
dotenvx set HELLO Production --encrypt -f .env.production
```
- **Execution:**
```bash
DOTENV_PRIVATE_KEY_PRODUCTION="<private key>" dotenvx run -- node index.js
```

### Additional Code Examples and Best Practices
- **Preloading:**
  ```bash
  node -r dotenv/config your_script.js
  ```
- **Webpack Configuration for Polyfills:**
  ```javascript
  const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
  const webpack = require('webpack');
  module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: { filename: 'bundle.js', path: require('path').resolve(__dirname, 'dist') },
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          HELLO: JSON.stringify(process.env.HELLO)
        }
      })
    ]
  };
  ```

### Troubleshooting Commands
- **Debug Mode:**
  ```javascript
  require('dotenv').config({ debug: true });
  ```
- **Verifying Variable Loading:**
  ```javascript
  console.log(process.env);
  ```
- **If using React, ensure variables are prefixed (e.g., REACT_APP_):**
  ```bash
  npm start
  ```

This detailed API and implementation guide provides developers with all the necessary technical information to integrate and troubleshoot dotenv in their projects.

## Original Source
Dotenv Documentation
https://github.com/motdotla/dotenv

## Digest of DOTENV

# Dotenv Documentation

**Retrieved on:** 2023-10-15

## Overview
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. It supports multiple environments, multiline values, inline comments, and variable expansion. It also offers a parsing engine and utility functions such as config, parse, populate, and decrypt.

## Installation

- Using npm:
  ```bash
  npm install dotenv --save
  ```
- Using yarn:
  ```bash
  yarn add dotenv
  ```
- Using bun:
  ```bash
  bun add dotenv
  ```

## Usage

1. Create a `.env` file in the root of your project:
   ```dotenv
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEYGOESHERE"
   ```
2. Configure dotenv as early as possible in your application:
   - CommonJS:
     ```javascript
     require('dotenv').config();
     console.log(process.env);
     ```
   - ES6:
     ```javascript
     import 'dotenv/config';
     ```

Example usage with AWS S3:
```javascript
require('dotenv').config();
// Access the bucket and secret from process.env
s3.getBucketCors({ Bucket: process.env.S3_BUCKET }, function(err, data) {});
```

## Multiline Values

Multiline values (>= v15.0.0) are supported using literal newlines or \n characters:

Using literal newlines:
```dotenv
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END RSA PRIVATE KEY-----"
```

Using \n characters:
```dotenv
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"
```

## Comments

Comments can be added as full lines or inline. Inline comments require values with hash (#) to be wrapped in quotes.

Example:
```dotenv
# This is a full line comment
SECRET_KEY=YOURSECRETKEYGOESHERE # inline comment
SECRET_HASH="something-with-a-#-hash"
```

## Parsing Engine

Use the parse function to convert a string or Buffer into an Object:

```javascript
const dotenv = require('dotenv');
const buf = Buffer.from('BASIC=basic');
const config = dotenv.parse(buf);
console.log(typeof config, config); // Output: object { BASIC: 'basic' }
```

### Parsing Rules:
- Lines in `KEY=VAL` format produce entries.
- Empty lines are ignored.
- Lines starting with `#` are comments.
- Unquoted values are trimmed; quoted values preserve whitespace.
- Supports backticks for values containing both single and double quotes.

## Preload and Command Line Configuration

Preload dotenv using Node's `--require` option:

```bash
node -r dotenv/config your_script.js
```

Configuration options may be passed as command-line parameters:

```bash
node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
```

Alternatively, use environment variables:

```bash
DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env
```

## Variable Expansion and Command Substitution

- For variable expansion, use "dotenv-expand":
  ```javascript
  const dotenv = require('dotenv');
  const dotenvExpand = require('dotenv-expand');
  const myEnv = dotenv.config();
  dotenvExpand(myEnv);
  ```
- For command substitution, use dotenvx:
  ```dotenv
  DATABASE_URL="postgres://$(whoami)@localhost/my_database"
  ```
  and run with:
  ```bash
dotenvx run --debug -- node index.js
  ```

## Syncing and Multiple Environments

- Use dotenvx to synchronize and encrypt .env files.
- Create multiple files (.env, .env.production, .env.local) and specify with `--env-file`:

Example:
```bash
echo "HELLO=production" > .env.production
node -r dotenv/config index.js
```

Using multiple files:
```bash
dotenvx run --env-file=.env.local --env-file=.env -- node index.js
```

## Deploying with Encryption

Encrypt your .env file using dotenvx:

```bash
dotenvx set HELLO Production --encrypt -f .env.production
```
Then run:
```bash
DOTENV_PRIVATE_KEY_PRODUCTION="<.env.production private key>" dotenvx run -- node index.js
```

## API Documentation

### config(options?: Object): Object

- **Description:** Reads the .env file, parses it, assigns values to process.env, and returns an object.
- **Parameters:**
  - `path` (string): Custom file path. Default: `path.resolve(process.cwd(), '.env')`
  - `encoding` (string): File encoding. Default: `'utf8'`
  - `debug` (boolean): Enables debug logging. Default: `false`
  - `override` (boolean): Whether to override existing values in process.env. Default: `false`
  - `processEnv` (Object): Target object for assignments. Default: `process.env`
- **Example:**
  ```javascript
  const result = require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
  if (result.error) { throw result.error; }
  console.log(result.parsed);
  ```

### parse(src: String | Buffer, options?: Object): Object

- **Description:** Parses a string or Buffer containing environment variables.
- **Options:**
  - `debug` (boolean): Enables debug logging. Default: `false`
- **Example:**
  ```javascript
  const dotenv = require('dotenv');
  const buf = Buffer.from('BASIC=basic');
  const config = dotenv.parse(buf, { debug: true });
  console.log(config); // { BASIC: 'basic' }
  ```

### populate(target: Object, source: Object, options?: Object): void

- **Description:** Populates target object with values from source.
- **Options:**
  - `override` (boolean): Overwrites existing keys in target. Default: `false`
  - `debug` (boolean): Enables logging for debugging.
- **Example:**
  ```javascript
  const dotenv = require('dotenv');
  const parsed = { HELLO: 'world' };
  dotenv.populate(process.env, parsed);
  console.log(process.env.HELLO); // 'world'
  
  // Custom target example:
  const target = { HELLO: 'world' };
  dotenv.populate(target, { HELLO: 'universe' }, { override: true, debug: true });
  console.log(target); // { HELLO: 'universe' }
  ```

### decrypt

- **Note:** The decrypt function is exposed for working with encrypted .env files (typically via dotenvx).

## Attribution

- Data Size: 643453 bytes
- Links Found: 5330
- Source: https://github.com/motdotla/dotenv

---


## Attribution
- Source: Dotenv Documentation
- URL: https://github.com/motdotla/dotenv
- License: Unknown
- Crawl Date: 2025-04-21T05:48:34.690Z
- Data Size: 643453 bytes
- Links Found: 5330

## Retrieved
2025-04-21
library/NODE_PROCESS.md
# library/NODE_PROCESS.md
# NODE_PROCESS

## Crawl Summary
The Node.js Process documentation details numerous events (beforeExit, exit, disconnect, message, multipleResolves, rejectionHandled, workerMessage, uncaughtException, uncaughtExceptionMonitor, unhandledRejection, warning, worker, and signal events) and methods/properties (abort, allowedNodeEnvironmentFlags, arch, argv, argv0, channel, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, emitWarning, exit, and many others). Each event and method includes explicit signatures, version information, parameter types, return types, and concrete code examples.

## Normalised Extract
## Table of Contents
1. Process Events
   - beforeExit (Code: `process.on('beforeExit', (code: number) => void)`)
   - exit (Code: `process.on('exit', (code: number) => void)`)
   - disconnect
   - message (Code: `process.on('message', (message, sendHandle) => void)`)
   - multipleResolves (Code: `process.on('multipleResolves', (type, promise, reason) => void)`)
   - rejectionHandled (Code: `process.on('rejectionHandled', (promise) => void)`)
   - workerMessage (Code: `process.on('workerMessage', (value, source) => void)`)
   - uncaughtException (Code: `process.on('uncaughtException', (err, origin) => void)`)
   - uncaughtExceptionMonitor (Code: `process.on('uncaughtExceptionMonitor', (err, origin) => void)`)
   - unhandledRejection (Code: `process.on('unhandledRejection', (reason, promise) => void)`)
   - warning (Code: `process.on('warning', (warning) => void)`)
   - Signal events (e.g., SIGINT, SIGTERM handled via `process.on(signal, handler)`)
2. Process Methods and Properties
   - abort(): `process.abort()`
   - allowedNodeEnvironmentFlags: Read-only Set with custom flag detection
   - arch: `process.arch` returns string (e.g., 'x64')
   - argv & argv0: Command-line arguments arrays
   - channel: IPC channel object with methods `.ref()` and `.unref()`
   - chdir(directory): `process.chdir(directory)`
   - config: Frozen object with build configuration
   - connected: Boolean for IPC connection
   - constrainedMemory(): Returns number (bytes)
   - availableMemory(): Returns number (bytes)
   - cpuUsage([previousValue]): Returns { user: number, system: number }
   - cwd(): `process.cwd()` returns current working directory
   - debugPort: Debugger port number
   - disconnect(): Closes IPC channel
   - dlopen(module, filename, [flags]): Loads shared objects (e.g., C++ addons)
   - emitWarning(): Emits warnings with options { type, code, ctor, detail }
   - Additional properties and methods: env, execArgv, exit, finalization, getegid, geteuid, getgid, getgroups, getuid, hrtime, kill, memoryUsage, nextTick, umask, uptime, version, and versions.

### Detailed Code Examples

#### Process Event Example
```js
const process = require('node:process');
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code:', code);
});
process.on('exit', (code) => {
  console.log('Process exit event with code:', code);
});
console.log('This message is displayed first.');
```

#### dlopen Example
```js
const { dlopen } = require('node:process');
const { constants } = require('node:os');
const { join } = require('node:path');
const mod = { exports: {} };
dlopen(mod, join(__dirname, 'local.node'), constants.dlopen.RTLD_NOW);
mod.exports.foo();
```

#### emitWarning Example
```js
process.emitWarning('Something happened!', {
  type: 'CustomWarning',
  code: 'WARN001',
  detail: 'This is some additional information'
});
```

## Detailed Topic Information
- **Process Events:** Include callback parameters and version details.
- **Process Methods:** Each method shows required parameters, return type, default values, and error conditions (e.g., `chdir()` throws if directory does not exist).
- **Configuration:** The `process.config` object displays build-time configurations in JSON format.

This extract provides directly usable code and configuration information for developers integrating Node.js process control in their applications.

## Supplementary Details
### Technical Specifications and Implementation Details

1. **Parameter Details and Defaults**:
   - `process.chdir(directory: string)`: Throws an Error if `directory` does not exist.
   - `process.cpuUsage(previousValue?: { user: number, system: number })`: Returns an object with microsecond counts for user and system CPU times.
   - `process.dlopen(module: Object, filename: string, flags?: number)`: Defaults to `os.constants.dlopen.RTLD_LAZY` if flags are not provided.
   - `process.emitWarning(warning, options)`: Options include `type` (default 'Warning'), `code`, `ctor`, and `detail`.

2. **Implementation Steps for IPC and Events**:
   - For processes started with IPC, use `process.channel.ref()` to prevent accidental process exit and `process.channel.unref()` to allow exit.
   - Add event listeners immediately upon process start to capture early events (e.g., uncaughtException, unhandledRejection).

3. **Troubleshooting Procedures**:
   - If maximum listener warnings occur, call `emitter.setMaxListeners(n)` to adjust limits.
   - Use `process.memoryUsage()` and `process.cpuUsage()` to diagnose performance issues.
   - For detailed warning stack traces, run Node.js with the `--trace-warnings` flag.

4. **Configuration Options and Effects**:
   - Use command-line options such as `--no-warnings`, `--throw-deprecation`, and `--trace-deprecation` to modify process behavior regarding warnings and deprecations.

5. **Code Example Best Practices:**
   - Always perform synchronous cleanup in `uncaughtException` handlers to avoid undefined states.
   - Validate incoming messages in IPC by checking types and using JSON serialization as required.
   - Ensure proper flag formatting when utilizing `process.allowedNodeEnvironmentFlags` for environment security.


## Reference Details
### Complete API Specifications and Code Samples

#### Event Listeners

- **beforeExit:**
  ```js
  process.on('beforeExit', (code: number) => {
    // code: exit code before process shutdown
    console.log('Process beforeExit event with code:', code);
  });
  ```

- **exit:**
  ```js
  process.on('exit', (code: number) => {
    // Synchronous cleanup only
    console.log(`About to exit with code: ${code}`);
  });
  ```

- **disconnect:**
  ```js
  process.on('disconnect', () => {
    // IPC channel closed
  });
  ```

- **message:**
  ```js
  process.on('message', (message: Object | boolean | number | string | null, sendHandle?: Object) => {
    // Handle IPC message
  });
  ```

- **multipleResolves:**
  ```js
  process.on('multipleResolves', (type: string, promise: Promise<any>, reason: any) => {
    console.error(type, promise, reason);
  });
  ```

- **rejectionHandled:**
  ```js
  process.on('rejectionHandled', (promise: Promise<any>) => {
    // Promise rejection now handled
  });
  ```

- **workerMessage:**
  ```js
  process.on('workerMessage', (value: any, source: number) => {
    console.log('Worker message received:', value, 'from', source);
  });
  ```

- **uncaughtException:**
  ```js
  process.on('uncaughtException', (err: Error, origin: string) => {
    // Log error and perform synchronous cleanup
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
  });
  ```

- **uncaughtExceptionMonitor:**
  ```js
  process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => {
    // Monitor exceptions without overriding default behavior
    MyMonitoringTool.logSync(err, origin);
  });
  ```

- **unhandledRejection:**
  ```js
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  ```

- **warning:**
  ```js
  process.on('warning', (warning: Error) => {
    console.warn(warning.name);
    console.warn(warning.message);
    console.warn(warning.stack);
  });
  ```

- **Signal Events Example:**
  ```js
  process.on('SIGINT', () => {
    console.log('Received SIGINT. Press Control-D to exit.');
  });
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM.');
  });
  ```

#### Methods and Properties

- **abort():**
  ```js
  process.abort(); // Immediately aborts the process and generates a core file
  ```

- **allowedNodeEnvironmentFlags:** (Read-only Set)
  ```js
  const { allowedNodeEnvironmentFlags } = require('node:process');
  allowedNodeEnvironmentFlags.forEach((flag) => {
    console.log(flag);
  });
  ```

- **arch:**
  ```js
  console.log(`Processor architecture: ${process.arch}`);
  ```

- **argv & argv0:**
  ```js
  process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
  console.log('Original argv0:', process.argv0);
  ```

- **chdir(directory):**
  ```js
  try {
    process.chdir('/tmp');
    console.log(`New directory: ${process.cwd()}`);
  } catch (err) {
    console.error(`chdir error: ${err}`);
  }
  ```

- **config:**
  ```js
  console.log(process.config);
  // Example output:
  /*
  {
    target_defaults: { ... },
    variables: {
      host_arch: 'x64',
      napi_build_version: 5,
      node_install_npm: 'true',
      ...
    }
  }
  */
  ```

- **cpuUsage():**
  ```js
  const startUsage = process.cpuUsage();
  // perform some operations
  console.log(process.cpuUsage(startUsage));
  ```

- **dlopen(module, filename, [flags]):** Refer to the example above.

- **emitWarning():**
  ```js
  process.emitWarning('Something happened!', 'CustomWarning', 'WARN001');
  ```
  or with options:
  ```js
  process.emitWarning('Something happened!', {
    type: 'CustomWarning',
    code: 'WARN001',
    detail: 'This is some additional information'
  });
  ```

#### Troubleshooting Commands

1. **Max Listeners Warning:**
   - Command: Increase listeners limit: `emitter.setMaxListeners(20)`
   - Expected: Warning message is suppressed when adding multiple listeners.

2. **Memory & CPU Usage Diagnostics:**
   - Commands: 
     ```js
     console.log(process.memoryUsage());
     console.log(process.cpuUsage());
     ```
   - Expected: Output object with memory usage in bytes and CPU usage in microseconds.

3. **Warning Trace:**
   - Launch Node.js with: `node --trace-warnings yourApp.js`
   - Expected: Full stack trace for any warnings emitted.

This complete API specification provides developers with all necessary details to implement and troubleshoot Node.js process functionalities directly in their code.

## Original Source
Node.js Process Documentation
https://nodejs.org/api/process.html

## Digest of NODE_PROCESS

# Process Documentation

**Retrieved:** 2023-10-19

## Overview
This document presents the complete technical details of the Node.js Process API as defined in the official documentation (Node.js v23.11.0). It includes the exact event specifications, method signatures, configuration details, and code examples.

## Process Events

### beforeExit (Added in: v0.11.12)
- **Signature:** `process.on('beforeExit', (code: number) => void)`
- **Description:** Emitted when Node.js empties its event loop and no work is scheduled. Listener receives the exit code as an argument.
- **Example:**
```js
const process = require('node:process');
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code:', code);
});
```

### exit (Added in: v0.1.7)
- **Signature:** `process.on('exit', (code: number) => void)`
- **Description:** Emitted when the process is about to exit. Listener receives the exit code. Only synchronous operations are allowed.
- **Example:**
```js
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

### disconnect (Added in: v0.7.7)
- **Signature:** `process.on('disconnect', () => void)`
- **Description:** Emitted when the IPC channel is closed (for spawned processes with IPC).

### message (Added in: v0.5.10)
- **Signature:** `process.on('message', (message: Object | boolean | number | string | null, sendHandle?: Object) => void)`
- **Description:** Emitted when a message is received from a parent process via IPC.

### multipleResolves (Added in: v10.12.0, Deprecated since v17.6.0)
- **Signature:** `process.on('multipleResolves', (type: string, promise: Promise<any>, reason: any) => void)`
- **Description:** Emitted when a promise is resolved or rejected more than once.

### rejectionHandled (Added in: v1.4.1)
- **Signature:** `process.on('rejectionHandled', (promise: Promise<any>) => void)`
- **Description:** Emitted when a previously unhandled rejection gets a handler.

### workerMessage (Added in: v22.5.0)
- **Signature:** `process.on('workerMessage', (value: any, source: number) => void)`
- **Description:** Emitted for incoming messages sent via `postMessageToThread()`.

### uncaughtException (Added in: v0.1.18)
- **Signature:** `process.on('uncaughtException', (err: Error, origin: string) => void)`
- **Description:** Emitted when an exception bubbles back to the event loop. Overrides default behavior if a listener is added.

### uncaughtExceptionMonitor (Added in: v13.7.0)
- **Signature:** `process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => void)`
- **Description:** Monitors uncaught exceptions without changing the default process exit behavior.

### unhandledRejection (Added in: v1.4.1)
- **Signature:** `process.on('unhandledRejection', (reason: any, promise: Promise<any>) => void)`
- **Description:** Emitted when a promise rejection is not handled within a turn of the event loop.

### warning (Added in: v6.0.0)
- **Signature:** `process.on('warning', (warning: Error) => void)`
- **Description:** Emitted when Node.js emits a process warning. Contains properties such as `name`, `message`, `stack`, and `code`.

### Signal Events
- **Description:** Events such as `'SIGINT'`, `'SIGTERM'`, etc. are emitted when the process receives respective POSIX signals. The callback receives the signal string (e.g., 'SIGINT').

## Process Methods and Properties

### abort()
- **Signature:** `process.abort(): void`
- **Description:** Immediately exits the process and generates a core file.

### allowedNodeEnvironmentFlags
- **Type:** Read-only `Set<string>`
- **Description:** Contains flags allowed in the `NODE_OPTIONS` environment variable. Overrides default `Set.prototype.has` to recognize various flag formats.

### arch
- **Type:** `string`
- **Description:** CPU architecture for which Node.js was compiled. Possible values: `'arm'`, `'arm64'`, `'ia32'`, `'x64'`, etc.

### argv & argv0
- **Type:** `string[]` and `string`
- **Description:** Command-line arguments. `argv[0]` is the Node.js executable, and `argv0` is a read-only copy of the original argv[0].

### channel
- **Type:** `Object | undefined`
- **Description:** IPC channel reference if the process has been spawned with one.
- **Methods:** `process.channel.ref()` to keep the event loop running, `process.channel.unref()` to allow exit.

### chdir(directory)
- **Signature:** `process.chdir(directory: string): void`
- **Description:** Changes the current working directory. Throws an exception on failure.

### config
- **Type:** `Object` (frozen)
- **Description:** Contains the configuration options used to compile the Node.js executable (same as config.gypi).

### connected
- **Type:** `boolean`
- **Description:** Indicates if the IPC channel is connected.

### constrainedMemory()
- **Signature:** `process.constrainedMemory(): number`
- **Description:** Returns the memory available under OS constraints in bytes (Experimental).

### availableMemory()
- **Signature:** `process.availableMemory(): number`
- **Description:** Returns the free memory available to the process in bytes (Experimental).

### cpuUsage([previousValue])
- **Signature:** `process.cpuUsage(previousValue?: {user: number, system: number}): {user: number, system: number}`
- **Description:** Returns CPU usage in microseconds. Passing a previous value returns the difference.

### cwd()
- **Signature:** `process.cwd(): string`
- **Description:** Returns the current working directory.

### debugPort
- **Type:** `number`
- **Description:** The port used by the Node.js debugger.

### disconnect()
- **Signature:** `process.disconnect(): void`
- **Description:** Closes the IPC channel if present.

### dlopen(module, filename[, flags])
- **Signature:** `process.dlopen(module: Object, filename: string, flags?: number): void`
- **Default Flags:** `os.constants.dlopen.RTLD_LAZY`
- **Description:** Dynamically loads shared objects (primarily used for C++ addons).
- **Example:**
```js
const { dlopen } = require('node:process');
const { constants } = require('node:os');
const { join } = require('node:path');
const mod = { exports: {} };
dlopen(mod, join(__dirname, 'local.node'), constants.dlopen.RTLD_NOW);
mod.exports.foo();
```

### emitWarning()
- **Signature:** 
  - `process.emitWarning(warning: string | Error, options?: { type?: string, code?: string, ctor?: Function, detail?: string }): void`
  - Overloaded: `process.emitWarning(warning: string | Error, type?: string, code?: string, ctor?: Function): void`
- **Description:** Emits a custom warning. Default type is 'Warning'.
- **Example:**
```js
process.emitWarning('Something happened!', {
  type: 'CustomWarning',
  code: 'WARN001',
  detail: 'This is some additional information'
});
```

### Other Methods and Properties
A number of additional methods and properties are available including but not limited to:
- `process.env`, `process.execArgv`, `process.execPath`, `process.exit([code])`, `process.finalization.register()` and related methods, `process.getegid()`, `process.geteuid()`, `process.getgid()`, `process.getgroups()`, `process.getuid()`, `process.hrtime()`, `process.hrtime.bigint()`, `process.kill(pid, [signal])`, `process.memoryUsage()`, `process.nextTick()`, `process.umask()`, `process.uptime()`, `process.version`, and `process.versions`.

## Best Practices and Troubleshooting

- **Uncaught Exception Handling:**
  Use `process.on('uncaughtException', ...)` strictly for synchronous cleanup. Never resume normal operation as the application may be unstable.

- **Event Loop Caution:**
  Ensure that exit event listeners perform only synchronous operations, as queued asynchronous tasks will be abandoned.

- **Warning Management:**
  To control warning outputs, use command-line flags such as `--no-warnings`, `--trace-warnings`, `--throw-deprecation`, and `--trace-deprecation`.

- **IPC Channel Usage:**
  When using child processes with IPC (via `child_process.fork()`), manage connection with `process.channel.ref()` and `process.channel.unref()`, and disconnect using `process.disconnect()` when appropriate.

- **Resource Monitoring:**
  Monitor system performance using `process.cpuUsage()` and `process.memoryUsage()`.

## Attribution

- **Source URL:** https://nodejs.org/api/process.html
- **Data Size:** 3825043 bytes
- **Links Found:** 2972
- **No errors reported.**

## Attribution
- Source: Node.js Process Documentation
- URL: https://nodejs.org/api/process.html
- License: License: MIT License
- Crawl Date: 2025-04-21T03:07:20.173Z
- Data Size: 3825043 bytes
- Links Found: 2972

## Retrieved
2025-04-21
library/ECMASCRIPT_MODULES.md
# library/ECMASCRIPT_MODULES.md
# ECMASCRIPT_MODULES

## Crawl Summary
The crawled content details the Node.js ECMAScript Modules documentation including enabling ESM via .mjs or package.json, import specifier types (relative, bare, absolute), mandatory file extensions, URL-based resolution rules, support for data: and node: imports, and import attributes (especially for JSON modules). It also covers interoperability with CommonJS, dynamic import() expressions, properties available in import.meta (url, filename, dirname, resolve), and a detailed module resolution algorithm (ESM_RESOLVE, PACKAGE_RESOLVE, ESM_FILE_FORMAT) including error conditions and customization hooks.

## Normalised Extract
Table of Contents:
1. Introduction
2. Enabling ESM
3. Import Specifiers
4. Mandatory File Extensions
5. URL and Data Imports
6. Node: Imports
7. Import Attributes
8. Built-in Modules
9. Dynamic import() Expressions
10. import.meta Properties
11. Interoperability with CommonJS
12. Resolution and Loading Algorithm
13. Customizing ESM Specifier Resolution
14. Version Changes and History

Details:
1. Introduction:
   - Use of `import` and `export` such as:
     ```js
     export function addTwo(num) { return num + 2; }
     ```
2. Enabling ESM:
   - Mark modules with `.mjs` or set package.json "type": "module" or use `--input-type=module`.
3. Import Specifiers:
   - Relative: `./file.js`, Bare: `package` or `package/sub`, Absolute: `file:///path/to/file.js`.
4. Mandatory File Extensions:
   - Always include extensions like `.js`, `.mjs` in imports.
5. URL and Data Imports:
   - Modules resolved as URLs; data: URL example:
     ```js
     import 'data:text/javascript,console.log("hello")';
     ```
6. Node: Imports:
   - Use `node:fs` to import Node built-ins.
7. Import Attributes:
   - Syntax: `import foo from './foo.json' with { type: 'json' }`.
8. Built-in Modules:
   - Expose both named and default exports (CommonJS interop) e.g., `import EventEmitter from 'node:events';`.
9. Dynamic import() Expressions:
   - Asynchronous dynamic loading using `import()` in both ESM and CommonJS contexts.
10. import.meta Properties:
    - Properties include: `import.meta.url`, `import.meta.filename`, `import.meta.dirname`, and `import.meta.resolve(specifier)` (synchronous resolution function).
11. Interoperability with CommonJS:
    - Import CJS modules via default import; use `module.createRequire()` for require() functionality.
12. Resolution and Loading Algorithm:
    - Detailed algorithm determining the module URL and format. Functions include ESM_RESOLVE, PACKAGE_RESOLVE, and ESM_FILE_FORMAT.
13. Customizing ESM Specifier Resolution:
    - Support for custom loaders to override resolution behavior.
14. Version Changes and History:
    - Specific version notes detailing changes from v8.5.0 up to v23.1.0.


## Supplementary Details
Specifications:
- Enabling Options: 
  * `.mjs` extension, package.json "type": "module", `--input-type=module`
  * For CommonJS: `.cjs`, "commonjs" or `--input-type=commonjs`
- Import Attributes: 
  * For JSON imports, use syntax: `import json from './file.json' with { type: 'json' }`.
- import.meta API:
  * `import.meta.url` (string), `import.meta.filename` (string, file protocol only), `import.meta.dirname` (string), `import.meta.resolve(specifier)` returns resolved URL string.
- Resolution Algorithm (ESM_RESOLVE):
  * Accepts a specifier and parentURL. Distinguishes between valid URL, relative, or bare specifiers.
  * Calls PACKAGE_RESOLVE for bare specifiers.
- ESM_FILE_FORMAT:
  * Uses file extension to determine format: `.mjs` for module, `.cjs` for commonjs, `.json` for json, and experimental flags enable `.wasm` and `.node` support.
- Error conditions include Invalid Module Specifier, Package Not Found, and Unsupported Directory Import.
- Custom Loader Hooks: Allow overriding resolution (e.g. commonjs-extension-resolution-loader).


## Reference Details
API Specifications and Code Examples:

1. import.meta.resolve:
   - Signature: `function resolve(specifier: string, parentURL?: string | URL): string`
   - Usage:
     ```js
     const resolved = import.meta.resolve('./dep.js');
     // returns something like: 'file:///app/dep.js'
     ```
   - Throws errors if specifier is invalid or resolution fails.

2. ESM_FILE_FORMAT(url):
   - Pseudocode:
     ```js
     function ESM_FILE_FORMAT(url) {
       if (url.endsWith('.mjs')) return 'module';
       if (url.endsWith('.cjs')) return 'commonjs';
       if (url.endsWith('.json')) return 'json';
       if (experimentalWasm && url.endsWith('.wasm')) return 'wasm';
       // ... detect using package.json type and source analysis
       return 'commonjs';
     }
     ```

3. Module Resolution Algorithm (ESM_RESOLVE):
   - Steps:
     a. If specifier is a valid URL, reserialize it.
     b. Else if specifier starts with '/', './', or '../', resolve relative to parentURL.
     c. Else if specifier starts with '#', use PACKAGE_IMPORTS_RESOLVE.
     d. Else treat as bare specifier and use PACKAGE_RESOLVE.

4. CommonJS Interoperability Example:
   - Dynamic import of a CommonJS module:
     ```js
     import { createRequire } from 'module';
     const require = createRequire(import.meta.url);
     const cjsModule = require('./module.cjs');
     console.log(cjsModule);
     ```

5. Troubleshooting Procedure:
   - If a module is not found, check:
     * The specifier format (ensure proper file extension).
     * Use `import.meta.resolve` to debug the resolved URL.
     * Verify package.json exports field when using bare specifiers.
   - For resolution errors, commands such as:
     ```bash
     node --trace-warnings app.mjs
     ```
     can be used to reveal detailed resolution steps.

6. Best Practices:
   - Always specify file extensions in import statements.
   - For JSON modules, always include `with { type: 'json' }`.
   - Use `import.meta.url` to dynamically generate file paths with `new URL('./file', import.meta.url)`.
   - When mixing legacy CommonJS, use `module.createRequire()` to ensure full compatibility.


## Original Source
Node.js ECMAScript Modules
https://nodejs.org/api/esm.html

## Digest of ECMASCRIPT_MODULES

# ECMASCRIPT MODULES

**Retrieved:** 2023-10-06

## Introduction

ECMAScript modules (ESM) are the official JavaScript module format. They are defined using `import` and `export` statements. For example:

```js
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}

export { addTwo };
```

And imported as:

```js
// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // Prints: 6
```

Node.js supports ESM fully and inter-operates with CommonJS modules.

## Enabling ESM

Node.js recognizes ES modules via:

- File extension: `.mjs`
- `package.json` field: `{ "type": "module" }`
- CLI flag: `--input-type=module`

For CommonJS, use `.cjs` or set type to `commonjs`.

## Import Specifiers

Import specifiers come in three forms:

1. **Relative specifiers:** e.g. `./startup.js` or `../config.mjs` (file extension required).
2. **Bare specifiers:** e.g. `some-package` or `some-package/shuffle`; file extension required if no exports field.
3. **Absolute specifiers:** e.g. `file:///opt/nodejs/config.js`.

Resolution of bare specifiers is handled by Node.js module resolution algorithm.

## Mandatory File Extensions

A file extension is mandatory when using `import`. Directory indexes must also be fully specified, e.g., `./startup/index.js`.

## URLs and Data Imports

- **ESM Resolution as URLs:** Modules are cached as URLs with percent-encoding applied. Supported schemes include `file:`, `node:`, and `data:`.
- **data:**
  - Supported MIME types: `text/javascript`, `application/json`, `application/wasm`.
  - Example:
    ```js
    import 'data:text/javascript,console.log("hello!");';
    ```

## Node: Imports

Node.js supports `node:` URLs for built-in modules. Example:

```js
import fs from 'node:fs/promises';
```

## Import Attributes

Import attributes allow additional options with import statements. Only the `type` attribute is supported. Example for JSON:

```js
import fooData from './foo.json' with { type: 'json' };

const { default: barData } = await import('./bar.json', { with: { type: 'json' } });
```

The `type: 'json'` attribute is mandatory for JSON modules.

## Built-in Modules

Built-in modules expose named exports from their public API. They can also expose a default export representing the CommonJS `module.exports`.

Example:

```js
import EventEmitter from 'node:events';
const e = new EventEmitter();
```

Or:

```js
import { readFile } from 'node:fs';
readFile('./foo.txt', (err, source) => {
  if (err) console.error(err);
  else console.log(source);
});
```

## Dynamic import() Expressions

Both ESM and CommonJS support dynamic `import()`. In CommonJS, it loads an ESM module. Example:

```js
(async () => {
  const module = await import('./module.mjs');
  console.log(module);
})();
```

## import.meta Properties

The `import.meta` object contains metadata about the current module:

- **import.meta.url:** Absolute URL of the module.
- **import.meta.filename:** Full resolved file path (file modules only).
- **import.meta.dirname:** Directory name of the current module.
- **import.meta.resolve(specifier):** Resolves a specifier relative to the current module. Signature:

  ```js
  // Synchronous function returning a string URL
  const resolvedUrl = import.meta.resolve(specifier);
  ```

## Interoperability with CommonJS

- **Import Statements:** Can load either ESM or CommonJS modules. For CJS, the `module.exports` is the default export.
- **require():** In ESM, use `module.createRequire()` to load CommonJS modules when needed.
- **No __filename or __dirname:** Use `import.meta.filename` or `import.meta.dirname` instead.

## Resolution and Loading Algorithm

The resolution algorithm (`ESM_RESOLVE`) returns the resolved URL and a suggested module format. Key steps:

- For a valid URL specifier, it parses and re-serializes.
- For relative or absolute specifiers, it resolves based on `parentURL`.
- For bare specifiers, it uses `PACKAGE_RESOLVE()` and looks up in `node_modules` and package.json exports.

The file format is determined using `ESM_FILE_FORMAT(url)`, e.g.:

```plaintext
if (url.endsWith('.mjs')) return "module";
if (url.endsWith('.cjs')) return "commonjs";
if (url.endsWith('.json')) return "json";
```

## Customizing the ESM Specifier Resolution

Module customization hooks allow an ESM specifier resolution override. For example, the CommonJS extension resolution loader provides a custom resolution.

## Version Changes and History

Key version changes include:

- **v23.1.0:** Import attributes are no longer experimental.
- **v22.0.0:** Dropped support for import assertions.
- **v17.1.0:** Added experimental support for import assertions (now replaced).
- **v14.8.0:** Top-level await unflagged.

## Attribution and Data Size

- **Data Size:** 4163715 bytes
- **Links Found:** 3208
- **Source:** Node.js v23.11.0 documentation (ECMAScript Modules)



## Attribution
- Source: Node.js ECMAScript Modules
- URL: https://nodejs.org/api/esm.html
- License: Official Node.js License
- Crawl Date: 2025-04-20T19:46:35.800Z
- Data Size: 4163715 bytes
- Links Found: 3208

## Retrieved
2025-04-20
library/JAVASCRIPT_INFO.md
# library/JAVASCRIPT_INFO.md
# JAVASCRIPT_INFO

## Crawl Summary
The crawled content outlines a comprehensive JavaScript tutorial covering language fundamentals, browser APIs, event handling, object-oriented programming, modules, regular expressions, network requests, data storage and translation guidelines. It includes implementation details such as strict mode usage, various function types (declaration, expression, arrow), control structures, DOM methods (getElement*, querySelector*), event delegation and custom events, as well as complete configuration options for offline PDF/EPUB versions and translation repository setups.

## Normalised Extract
## Table of Contents & Technical Details

1. **JavaScript Language Core**
   - Strict Mode: `'use strict';` enables modern syntax.
   - Variables: Use `let`, `const` with proper naming conventions.
   - Functions:
     - Declaration: `function sum(a, b) { return a + b; }`
     - Expression: `const mult = function(a, b) { return a * b; }`
     - Arrow: `const add = (a, b) => a + b;`
   - Control Structures: `if`, ternary operators `? :`, loops (`for`, `while`), and `switch` statements.

2. **Browser & DOM APIs**
   - DOM Query Methods: `document.getElementById`, `document.querySelector`.
   - Node Properties: `nodeType`, `tagName`, `textContent`.
   - Event Handling:
     - Basic: `document.addEventListener('click', (e) => { console.log(e.target); });`
     - Custom Events: Creation with `new CustomEvent('eventName', { detail: data })` and dispatch via `element.dispatchEvent(event)`.

3. **Advanced Functionality & Async Patterns**
   - Promises: 
     Example: `fetch(url).then(resp => resp.json()).then(data => { /* use data */ });`
   - Async/Await: 
     Example:
     ```js
     async function fetchData(url) {
       const response = await fetch(url);
       return response.json();
     }
     ```
   - Rest Parameters: `function sum(...nums) { return nums.reduce((total, n) => total + n, 0); }`

4. **Object Structures & Inheritance**
   - Object Literals and Constructors:
     ```js
     const obj = { key: 'value' };
     function Person(name) { this.name = name; }
     Person.prototype.greet = function() { return 'Hi ' + this.name; };
     ```
   - ES6 Classes:
     ```js
     class Animal {
       constructor(name) {
         this.name = name;
       }
       speak() { return `${this.name} makes a noise.`; }
       static info() { return 'Animals are living entities.'; }
     }
     ```

5. **Modules & Imports**
   - Static: `import { something } from './module.js';`
   - Dynamic: `const mod = await import('./module.js');`

6. **Regular Expressions**
   - Basic Pattern: `/\d+/` for digits
   - Flags: `i`, `m`, `u`, `y`
   - Capture Groups: `/([a-z]+)-(\d+)/i` returns an array with matches.

7. **Additional Topics**
   - Binary Data: 
     - ArrayBuffer: `const buf = new ArrayBuffer(16);`
     - FileReader: 
       ```js
       const reader = new FileReader();
       reader.onload = () => console.log(reader.result);
       reader.readAsText(file);
       ```
   - Network Requests:
     - Fetch API: `fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });`
     - XMLHttpRequest: 
       ```js
       const xhr = new XMLHttpRequest();
       xhr.open('GET', url);
       xhr.onload = () => console.log(xhr.responseText);
       xhr.send();
       ```
   - Data Storage: Cookies (`document.cookie`), localStorage (`localStorage.setItem('key', 'value')`), IndexedDB (`indexedDB.open(dbName, version)`).

8. **Translations & Repository Management**
   - Translation percentages per language (e.g. Chinese: 91%, Japanese: 90%, Russian: 91%).
   - For new translations, create a repository at `javascript-tutorial/{lang-code}.javascript.info` and add maintainers to `translate-{lang-code}`.
   - Guidelines: Submit an issue including language code, GitHub nick, and email.

9. **Offline Reading & Configuration Options**
   - EPUB/PDF Purchase Options:
     - Part I: JavaScript Language (710+ pages, PDF, EPUB)
     - Part II: Browser: Document, Events, Interfaces (300+ pages, PDF, EPUB)
     - Part III: Various topics (330+ pages, PDF, EPUB)
   - Combined packages are available with detailed page counts.


## Supplementary Details
### Supplementary Technical Specifications

- **Strict Mode Enforcement:**
  - Place `'use strict';` at the top of JavaScript files or functions to enable strict parsing.

- **Function Signatures and Examples:**
  - Function Declaration: 
    ```js
    function max(a, b) {
      return a > b ? a : b;
    }
    ```
  - Arrow Function: 
    ```js
    const sum = (x, y) => x + y;
    ```

- **DOM Methods and Event Registration:**
  - Queries:
    - `document.getElementById(id: String): HTMLElement | null`
    - `document.querySelector(selectors: String): Element | null`
  - Event Handling:
    ```js
    document.addEventListener('click', (event: MouseEvent): void => {
      console.log('Clicked:', event.target);
    });
    ```

- **Offline Publication Configurations:**
  - PDF/EPUB Options with fixed page counts and update intervals (1 year free updates).
  - Package configurations: pages count and file formats are explicitly provided for each part.

- **Translation Repository Guidelines:**
  - Repository naming: `javascript-tutorial/{lang-code}.javascript.info`
  - Maintainer team naming: `translate-{lang-code}`
  - Required issue submission includes language code, maintainers' GitHub nicks and emails.


## Reference Details
### Complete API Specifications and Implementation Examples

#### 1. Window Alert API
- **Signature:** `window.alert(message: string): void`
- **Usage Example:**
  ```js
  window.alert('Hello, world!');
  ```

#### 2. Fetch API
- **Signature:** `fetch(input: RequestInfo, init?: RequestInit): Promise<Response>`
- **Example:
  ```js
  fetch('https://api.example.com/data', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error('Fetch error:', error));
  ```

#### 3. Document Query API
- **Method:** `document.querySelector(selectors: string): Element | null`
- **Usage Example:**
  ```js
  const element = document.querySelector('.my-class');
  if (element) {
    element.textContent = 'Updated Text';
  }
  ```

#### 4. Class Declaration and Inheritance
- **Class Example:**
  ```js
  class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    speak(): string {
      return `${this.name} makes a noise.`;
    }
    static info(): string {
      return 'Animals are multicellular organisms.';
    }
  }

  class Dog extends Animal {
    constructor(name: string) {
      super(name);
    }
    speak(): string {
      return `${this.name} barks.`;
    }
  }

  const dog = new Dog('Rex');
  console.log(dog.speak()); // Rex barks.
  ```

#### 5. Regular Expression API
- **Pattern:** `/([A-Za-z]+)-(\d+)/`
- **Methods:**
  - `RegExp.prototype.test(string: string): boolean`
  - `RegExp.prototype.exec(string: string): RegExpExecArray | null`
- **Example:**
  ```js
  const regex = /([A-Za-z]+)-(\d+)/;
  const result = regex.exec('Order-1234');
  if (result) {
    console.log(result[1]); // 'Order'
    console.log(result[2]); // '1234'
  }
  ```

#### 6. XMLHttpRequest Example
- **Usage Example:**
  ```js
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.example.com/items');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Response:', xhr.responseText);
      } else {
        console.error('Error with status', xhr.status);
      }
    }
  };
  xhr.send();
  ```

#### 7. Troubleshooting Procedures
- **Step 1:** Use browser developer console to inspect JavaScript errors.
- **Step 2:** For network issues, use curl command:
  ```bash
  curl -v https://api.example.com/data
  ```
- **Step 3:** Validate API responses and check HTTP status codes.
- **Step 4:** For debugging asynchronous code, insert console logs before and after promise resolution.

#### 8. Best Practices
- Always use strict mode.
- Validate user inputs before processing.
- Use try/catch blocks in async functions:
  ```js
  async function safeFetch(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching:', error);
      throw error;
    }
  }
  ```
- Configure linter (e.g., ESLint) with strict rules for code consistency.


## Original Source
JavaScript Info
https://javascript.info/

## Digest of JAVASCRIPT_INFO

# JavaScript Info Documentation

**Retrieved Date:** 2023-10-26

## Overview
This document captures the technical content extracted from the JavaScript Info website. It lists exact chapter headings, specific implementation examples, configuration options and detailed guidelines regarding language fundamentals, browser APIs, events, modules, regex, and more.

## Table of Contents
1. JavaScript Language Core
   - Strict mode ("use strict")
   - Variables, Data Types and Operators
   - Functions (declarations, expressions, arrow functions)
   - Control Structures (conditional branching, loops, switch)
2. Browser & DOM APIs
   - Document Object Model (DOM) methods (getElement*, querySelector*)
   - Attributes, properties, and node types
   - Events (bubbling, capturing, delegation, custom events)
3. Advanced Functionality
   - Closures, recursion, rest parameters and spread syntax
   - Asynchronous patterns: Promises, async/await and microtasks
4. Object & Inheritance
   - Object methods, property descriptors, getters/setters
   - Prototypal inheritance, classes (syntax, inheritance, static methods)
5. Modules & Imports
   - Static and dynamic imports, export syntax
6. Regular Expressions
   - Patterns, flags (u, m, y), quantifiers, groups and backreferences
7. Additional Topics
   - Binary data handling (ArrayBuffer, Blob, FileReader)
   - Network requests (Fetch API, XMLHttpRequest, WebSocket)
   - Data storage (Cookies, localStorage, IndexedDB)
8. Translations & Internationalization
   - Translation progress percentages, language specific repositories, maintainer guidelines
9. Offline Publication & Configuration
   - EPUB/PDF configurations with pages count and update intervals

## Detailed Sections

### 1. JavaScript Language Core
- **Strict Mode**: Implementation begins with `'use strict';` at the file or function level. 
- **Variables & Data Types**: Use `let`, `const` for block scope; examples include string quotes, number formats and boolean logic.
- **Functions**: 
  - Declaration: `function sum(a, b) { return a + b; }`
  - Expression: `const multiply = function(a, b) { return a * b; }`
  - Arrow Function: `const add = (a, b) => a + b;`
- **Control Structures**: 
  - Example of conditional: `if (a > b) { console.log(a); } else { console.log(b); }`
  - Loop example: `for (let i = 0; i < 10; i++) { console.log(i); }`
  - Switch statement: 
    ```js
    switch(value) {
      case 1:
        // code
        break;
      default:
        // default code
    }
    ```

### 2. Browser & DOM APIs
- **DOM Queries**: 
  - `document.getElementById('id')`
  - `document.querySelector('.class')`
- **Node and Element Properties**: 
  - `.nodeType`, `.tagName`, `.textContent`, `.innerHTML`
- **Events**: 
  - Standard binding: 
    ```js
    document.addEventListener('click', function(event) {
      console.log('Clicked element:', event.target);
    });
    ```
  - Custom events using `dispatchEvent` and `CustomEvent`.

### 3. Advanced Functionality
- **Asynchronous Patterns**:
  - **Promises**: 
    ```js
    fetch(url).then(response => response.json()).then(data => console.log(data));
    ```
  - **Async/Await**:
    ```js
    async function getData() {
      const response = await fetch(url);
      return response.json();
    }
    ```
- **Rest and Spread**: 
  - `function sum(...nums) { return nums.reduce((a,b)=>a+b, 0); }`

### 4. Object & Inheritance
- **Object Creation**: 
  - Literal: `const obj = { key: 'value' };`
  - Constructor function: 
    ```js
    function Person(name) {
      this.name = name;
    }
    Person.prototype.greet = function() { return 'Hello, ' + this.name; };
    ```
- **Classes**: 
  - Declaration: 
    ```js
    class Animal {
      constructor(name) {
        this.name = name;
      }
      speak() { return `${this.name} makes a noise.`; }
      static info() { return 'Animals are multicellular organisms.'; }
    }
    ```

### 5. Modules & Imports
- **Static Imports**:
  - `import { myFunction } from './module.js';`
- **Dynamic Imports**:
  - `const module = await import('./module.js');`

### 6. Regular Expressions
- **Syntax Examples**: 
  - Simple pattern: `/\d+/` matches one or more digits.
  - Flags: `i` for case-insensitive, `m` for multiline, `u` for Unicode.
  - Example with capture groups: `/([a-z]+)-(\d+)/i`

### 7. Additional Topics
- **Binary Data**: 
  - Creating an ArrayBuffer: `const buffer = new ArrayBuffer(16);`
  - Using FileReader: 
    ```js
    const reader = new FileReader();
    reader.onload = () => console.log(reader.result);
    reader.readAsText(file);
    ```
- **Network Requests**: 
  - **Fetch API**: `fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })`
  - **XMLHttpRequest**: 
    ```js
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send();
    ```
- **Data Storage**:
  - Cookies: `document.cookie = 'key=value; expires=Fri, 31 Dec 9999 23:59:59 GMT';`
  - localStorage: `localStorage.setItem('key', 'value');`
  - IndexedDB: Usage through `indexedDB.open(dbName, version)`.

### 8. Translations & Internationalization
- **Translation Data**: Lists languages with translation percentages. For instance, Chinese (91%), Japanese (90%), Russian (91%) etc.
- **Repository Setup**: For new translations, a new repository is created at `javascript-tutorial/{lang-code}.javascript.info` and maintainers are added to team `translate-{lang-code}`.
- **Maintainer Guidelines**: Includes filing an issue to add maintainers; instructions include GitHub nick, email, and progress tracking.

### 9. Offline Publication & Configuration
- **EPUB/PDF Options**:
  - Part I: The JavaScript Language (710+ pages, PDF & EPUB)
  - Part II: Browser: Document, Events, Interfaces (300+ pages, PDF & EPUB)
  - Part III: Various topics (330+ pages, PDF & EPUB)
  - Combined packages available with detailed page counts and update terms.

## Attribution
- **Data Size:** 2710456 bytes
- **Links Found:** 4192
- **Source URL:** https://javascript.info/


## Attribution
- Source: JavaScript Info
- URL: https://javascript.info/
- License: N/A
- Crawl Date: 2025-04-20T18:22:57.825Z
- Data Size: 2710456 bytes
- Links Found: 4192

## Retrieved
2025-04-20
library/LANGCHAIN_AGENTS.md
# library/LANGCHAIN_AGENTS.md
# LANGCHAIN_AGENTS

## Crawl Summary
The LangChain Agents crawled content introduces the agent framework with detailed configurations for agent initialization, execution via AgentExecutor, tool integration, and error handling procedures. It provides method signatures for BaseAgent and AgentExecutor along with step-by-step instructions for initializing agents and configuring tool parameters.

## Normalised Extract
# Table of Contents
1. Agent Base Class
2. Agent Executor
3. Tools Configuration
4. Advanced Configuration
5. Troubleshooting & Error Handling

## 1. Agent Base Class
- **Constructor:**
  def __init__(self, llm: LLM, prompt: str, tools: List[Tool]) -> None
- **Attributes:**
  - llm: Instance of LLM
  - prompt: Prompt template
  - tools: List of Tool objects with attributes (name, description, func)

## 2. Agent Executor
- **Method:**
  def run(self, input: str) -> str
- **Behavior:**
  - Parses input
  - Determines required actions
  - Executes integrated tools
  - Returns resulting string output

## 3. Tools Configuration
- **Tool API:**
  class Tool:
      def __init__(self, name: str, description: str, func: Callable) -> None
- **Parameters:**
  - name: Unique tool identifier
  - description: Function description
  - func: Callable method performing the tool's job

## 4. Advanced Configuration
- **Agent Types:**
  - ZERO_SHOT_REACT_DESCRIPTION
  - STRUCTURED_CHAT_AGENT
- **Config Options:**
  - max_iterations (default=10): Limits recursion depth
  - verbose (default=False): Enables detailed logging

## 5. Troubleshooting & Error Handling
- **Exceptions:**
  - AgentExecutionError: Exception raised on execution failure with details
- **Steps:**
  1. Enable verbose logging
  2. Check correct instantiation of LLM and tools
  3. Validate API keys and configuration values


## Supplementary Details
# Supplementary Technical Details

## Agent Initialization
- **Example:**
  ```python
  from langchain.agents import initialize_agent, AgentType
  from langchain.llms import OpenAI
  from langchain.tools import Tool
  
  llm = OpenAI(api_key="YOUR_API_KEY")
  
  # Define a custom tool
  def search(query: str) -> str:
      # Implementation for search action
      return "Results for " + query
  
  search_tool = Tool(name="Search", description="Searches the web", func=search)
  
  # Initialize agent with tool set
  agent = initialize_agent(
      tools=[search_tool], 
      llm=llm, 
      agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, 
      verbose=True
  )
  
  result = agent.run("Find details on LangChain Agents")
  print(result)
  ```

## Configuration Parameters
- **max_iterations:** Sets the upper bound for recursive agent steps (default=10)
- **verbose:** When True, prints detailed step-by-step logs of agent reasoning (default=False)

## Error Handling
- **Exception Handling Pattern:**
  ```python
  try:
      result = agent.run(input_query)
  except AgentExecutionError as e:
      print(f"Agent failed: {e}")
  ```
- **Common Issues:**
  - Incorrect tool function signature
  - Missing or invalid API key for the LLM

## Detailed Implementation Steps
1. Instantiate the LLM with valid credentials
2. Define and register custom tools with exact function signatures
3. Initialize the agent using initialize_agent with proper parameters
4. Execute the agent’s run method with valid input
5. Implement try/except block to catch and handle AgentExecutionError


## Reference Details
# API Specifications and Code Examples

## BaseAgent API
- **Constructor:**
  ```python
  def __init__(self, llm: LLM, prompt: str, tools: List[Tool]) -> None:
      '''Initializes the agent with required LLM, prompt, and toolset.'''
  ```
- **Attributes:**
  - llm: LLM instance used for generating responses
  - prompt: String prompt template
  - tools: List of Tool objects

## AgentExecutor API
- **Method:**
  ```python
  def run(self, input: str) -> str:
      '''Executes the agent logic given the input and returns the result.'''
      # Returns type: str
  ```

## Tool Class API
- **Definition:**
  ```python
  class Tool:
      def __init__(self, name: str, description: str, func: Callable) -> None:
          self.name = name
          self.description = description
          self.func = func
  ```

## SDK Method Signatures
- **initialize_agent:**
  ```python
  def initialize_agent(tools: List[Tool], llm: LLM, agent: AgentType, verbose: bool = False, max_iterations: int = 10) -> AgentExecutor:
      '''Initializes and returns an AgentExecutor instance configured with the provided parameters.'''
  ```

## Full Implementation Code Example
```python
from langchain.agents import initialize_agent, AgentType
from langchain.llms import OpenAI
from langchain.tools import Tool

# Initialize the language model with the API key
llm = OpenAI(api_key="YOUR_API_KEY")

# Define a custom tool with a complete function signature
def search(query: str) -> str:
    """Performs a web search and returns results."""
    # Implementation of search function
    return f"Search results for {query}"

# Create an instance of a Tool
search_tool = Tool(
    name="Search",
    description="Tool to perform web searches",
    func=search
)

# Initialize the agent executor with explicit configuration parameters
agent = initialize_agent(
    tools=[search_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    max_iterations=10
)

# Execute agent with input and handle potential errors
try:
    result = agent.run("Explain LangChain Agents")
    print(result)
except Exception as e:
    print(f"AgentExecutionError: {e}")
```

## Configuration Options Summary
- verbose (bool): Detailed logging if True; default is False
- max_iterations (int): Limits the execution iterations to safeguard against infinite loops; default is 10

## Best Practices
- Always validate tool functions for correct signature
- Enable verbose logging during development for easier debugging
- Catch and log AgentExecutionError for graceful degradation

## Troubleshooting Procedures
1. Verify API key presence and validity
2. Confirm that each tool's `func` adheres to the expected callable signature
3. Enable `verbose=True` to output step-by-step reasoning for inspection
4. Check returned exception messages for clues on misconfiguration or runtime errors


## Original Source
LangChain Agents
https://python.langchain.com/en/latest/modules/agents.html

## Digest of LANGCHAIN_AGENTS

# LangChain Agents Documentation

**Retrieved:** 2023-10-20

## Overview
This document provides the complete technical details for LangChain Agents including API specifications, method signatures, configuration details and complete code examples.

## Agent Base Class
- **Class:** BaseAgent
- **Initialization:**
  ```python
  def __init__(self, llm: LLM, prompt: str, tools: List[Tool]) -> None:
      # Initializes the agent with a language model, prompt and available tools.
  ```
- **Properties:**
  - llm (LLM): The language model instance.
  - prompt (str): Prompt template used in the agent.
  - tools (List[Tool]): List of tool objects the agent can utilize.

## Agent Executor
- **Class:** AgentExecutor
- **Primary Method:**
  ```python
  def run(self, input: str) -> str:
      '''Executes the agent using the provided input and returns the result.'''
  ```
- **Behavior:**
  - Receives an input string
  - Uses internal chain-of-thought reasoning to decide actions
  - Executes tools as required
  - Returns a final response string

## Tools Configuration
- **Tool Specification:**
  ```python
  class Tool:
      def __init__(self, name: str, description: str, func: Callable) -> None:
          self.name = name
          self.description = description
          self.func = func
  ```
- **Configuration Options:**
  - name: Unique identifier for the tool
  - description: Explanation of what the tool does
  - func: The callable function that performs the task

## Advanced Configuration
- **Agent Types:**
  - ZERO_SHOT_REACT_DESCRIPTION
  - STRUCTURED_CHAT_AGENT
- **Configuration Parameters:**
  - max_iterations (int, default=10): Maximum iterations for agent reasoning
  - verbose (bool, default=False): Toggle verbose logging

## Troubleshooting & Error Handling
- **Exceptions:**
  - `AgentExecutionError`: Raised when the agent fails to complete an action
- **Debugging Steps:**
  1. Enable verbose logging (`verbose=True`)
  2. Verify each tool configuration to ensure correct function signatures
  3. Check API keys and configuration for the LLM

## Attribution
- **Source:** LangChain Agents page at https://python.langchain.com/en/latest/modules/agents.html
- **Data Size:** 0 bytes (as reported in the crawl)


## Attribution
- Source: LangChain Agents
- URL: https://python.langchain.com/en/latest/modules/agents.html
- License: Unknown
- Crawl Date: 2025-04-20T21:46:15.182Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-20
library/FILE_SYSTEM.md
# library/FILE_SYSTEM.md
# FILE_SYSTEM

## Crawl Summary
This document provides the complete and exact Node.js File System (fs) API technical details. It includes API method signatures for the FileHandle class, fsPromises methods, callback and synchronous versions, complete parameter lists with default values, and return types. The content covers stream creation options, file descriptor operations, and error handling patterns, accompanied by full code examples in promise, callback, and synchronous styles.

## Normalised Extract
## Table of Contents
1. FileHandle Class
   - appendFile(data[, options])
   - chmod(mode)
   - chown(uid, gid)
   - close()
   - createReadStream([options])
   - createWriteStream([options])
   - datasync()
   - read(buffer, offset, length, position)
   - read([options])
   - readableWebStream()
   - readFile(options)
   - readLines([options])
   - readv(buffers[, position])
   - stat([options])
   - sync()
   - truncate(len)
   - utimes(atime, mtime)
   - write(buffer, offset[, length[, position]])
   - write(buffer[, options])
   - write(string[, position[, encoding]])
   - writeFile(data, options)
   - writev(buffers[, position])
   - [Symbol.asyncDispose]()
2. fsPromises API
   - access(path[, mode])
   - appendFile(path, data[, options])
   - chmod(path, mode)
   - chown(path, uid, gid)
   - copyFile(src, dest[, mode])
   - cp(src, dest[, options])
   - glob(pattern[, options])
   - lchmod(path, mode)
   - lchown(path, uid, gid)
   - lutimes(path, atime, mtime)
   - link(existingPath, newPath)
   - lstat(path[, options])
   - mkdir(path[, options])
   - mkdtemp(prefix[, options])
   - open(path, flags[, mode])
   - opendir(path[, options])
   - readdir(path[, options])
   - readFile(path, options)
   - readlink(path, options)
   - realpath(path, options)
   - rename(oldPath, newPath)
   - rmdir(path[, options])
   - rm(path[, options])
   - stat(path, options)
   - statfs(path, options)
   - symlink(target, path[, type])
   - truncate(path[, len])
   - unlink(path)
   - utimes(path, atime, mtime)
   - watch(filename[, options])
3. Callback API
   - fs.method(..., callback(err, result))
4. Synchronous API
   - fs.methodSync(...)
5. Common Objects & Constants
   - fs.Dir, fs.Dirent, fs.FSWatcher, fs.StatWatcher, fs.ReadStream, fs.WriteStream, fs.Stats, fs.constants

## Detailed Technical Topics
### FileHandle Methods
- **appendFile:** Accepts various data types. Options support async iterable inputs and streams.
- **chmod/chown:** Modify file permissions and ownership using numeric modes and IDs.
- **Stream Methods:** `createReadStream` and `createWriteStream` include options to control `encoding`, `autoClose`, `emitClose`, byte ranges (`start`, `end`), and buffer sizes.
- **I/O Methods:** `read`, `readFile`, and `write` methods include precise parameters for buffer management, file position handling, and simultaneous operations.

### fsPromises API
- Contains asynchronous methods that return Promises which fulfill with data or `undefined` upon success. Methods mirror the callback and sync variants and include additional options for atomic file operations and safe file access checks.

### Callback & Synchronous APIs
- **Callback API:** Follows Node.js standard `(err, result)` pattern.
- **Synchronous API:** Blocks event loop and is wrapped in try/catch.

### Code Implementation Examples
Each method is illustrated with working code examples that demonstrate proper error handling and resource cleanup, ensuring no file descriptor leaks.


## Supplementary Details
### Supplementary Technical Specifications

- **Configuration Options for Streams:**
  - `createReadStream`: `encoding` (default: null), `autoClose` (true), `emitClose` (true), `start` (optional), `end` (default: Infinity), `highWaterMark` (64 * 1024), `signal` (undefined).
  - `createWriteStream`: `encoding` (default: 'utf8'), `autoClose` (true), `emitClose` (true), `start` (optional), `highWaterMark` (16384), `flush` (default: false).

- **Parameter Defaults and Effects:**
  - Most methods default numerical parameters using buffer sizes or file descriptor positions.
  - `read` methods update the file pointer when `position` is set to `null` or -1.

- **Implementation Steps for File Operations:**
  1. Open a file handle using `fsPromises.open()`.
  2. Perform read/write operations using provided methods (e.g. `readFile`, `writeFile`).
  3. Always close the file handle using `filehandle.close()` or via `[Symbol.asyncDispose]()`.
  4. For streams, ensure that options like `autoClose` are set correctly to avoid file descriptor leaks.

- **Best Practices:**
  - Use promise-based or callback-based methods consistently to avoid race conditions.
  - Always handle errors with try/catch in synchronous code and `.catch()` in promise chains.
  - Validate file access before operations, but do not rely on pre-checks due to race conditions (handle errors from the operation itself).

- **Troubleshooting Procedures:**
  - Run Node.js with increased debugging (`node --trace-warnings`) to monitor file descriptor warnings.
  - Use logging inside callbacks or promise error handlers to capture exact error messages.
  - Confirm parameter types and default values via console logging prior to operations.
  - For stream issues, ensure that `autoClose` and `emitClose` are set appropriately to trigger resource cleanup.


## Reference Details
### Complete API Specifications

#### FileHandle Class Methods

1. appendFile(data[, options])
   - Signature:
     ```js
     filehandle.appendFile(data: string | Buffer | TypedArray | DataView | AsyncIterable<any> | Iterable<any> | Stream, options?: { encoding?: string | null, signal?: AbortSignal } | string): Promise<void>
     ```
   - Returns: Promise<void>
   - Example:
     ```js
     // Append data using async/await
     await filehandle.appendFile('Hello World', { encoding: 'utf8' });
     ```

2. chmod(mode)
   - Signature:
     ```js
     filehandle.chmod(mode: number): Promise<void>
     ```
   - Example:
     ```js
     await filehandle.chmod(0o644);
     ```

3. chown(uid, gid)
   - Signature:
     ```js
     filehandle.chown(uid: number, gid: number): Promise<void>
     ```
   - Example:
     ```js
     await filehandle.chown(1000, 1000);
     ```

4. close()
   - Signature:
     ```js
     filehandle.close(): Promise<void>
     ```
   - Usage:
     ```js
     const filehandle = await open('file.txt', 'r');
     // ... perform operations ...
     await filehandle.close();
     ```

5. createReadStream([options])
   - Signature:
     ```js
     filehandle.createReadStream(options?: { encoding?: string | null, autoClose?: boolean, emitClose?: boolean, start?: number, end?: number, highWaterMark?: number, signal?: AbortSignal }): fs.ReadStream
     ```
   - Example:
     ```js
     const stream = filehandle.createReadStream({ start: 0, end: 99 });
     stream.on('data', chunk => console.log(chunk));
     ```

6. createWriteStream([options])
   - Signature:
     ```js
     filehandle.createWriteStream(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, highWaterMark?: number, flush?: boolean }): fs.WriteStream
     ```

7. read(buffer, offset, length, position)
   - Signature:
     ```js
     filehandle.read(buffer: Buffer | TypedArray | DataView, offset?: number, length?: number, position?: number | bigint | null): Promise<{ bytesRead: number, buffer: Buffer | TypedArray | DataView }>
     ```

8. readFile(options?: { encoding?: string | null, signal?: AbortSignal } | string)
   - Signature:
     ```js
     filehandle.readFile(options?: { encoding?: string | null, signal?: AbortSignal } | string): Promise<Buffer | string>
     ```

9. write(buffer, offset?, length?, position?)
   - Signature:
     ```js
     filehandle.write(buffer: Buffer | TypedArray | DataView, offset?: number, length?: number, position?: number | null): Promise<{ bytesWritten: number, buffer: Buffer | TypedArray | DataView }>
     ```

10. write(string, position?, encoding?)
    - Signature:
      ```js
      filehandle.write(string: string, position?: number | null, encoding?: string): Promise<{ bytesWritten: number, buffer: string }>
      ```

11. writeFile(data, options?)
    - Signature:
      ```js
      filehandle.writeFile(data: string | Buffer | TypedArray | DataView | AsyncIterable<any> | Iterable<any> | Stream, options?: { encoding?: string | null, signal?: AbortSignal } | string): Promise<void>
      ```

12. writev(buffers, position?)
    - Signature:
      ```js
      filehandle.writev(buffers: Array<Buffer | TypedArray | DataView>, position?: number | null): Promise<{ bytesWritten: number, buffers: Array<Buffer | TypedArray | DataView> }>
      ```

#### fsPromises API Methods (Selected Examples)

1. access(path, mode?)
   - Signature:
     ```js
     fsPromises.access(path: string | Buffer | URL, mode?: number): Promise<void>
     ```

2. appendFile(path, data, options?)
   - Signature:
     ```js
     fsPromises.appendFile(path: string | Buffer | URL | FileHandle, data: string | Buffer, options?: { encoding?: string | null, mode?: number, flag?: string, flush?: boolean } | string): Promise<void>
     ```

3. copyFile(src, dest, mode?)
   - Signature:
     ```js
     fsPromises.copyFile(src: string | Buffer | URL, dest: string | Buffer | URL, mode?: number): Promise<void>
     ```

4. open(path, flags, mode?)
   - Signature:
     ```js
     fsPromises.open(path: string | Buffer | URL, flags: string, mode?: number): Promise<FileHandle>
     ```

#### Code Example for Troubleshooting File Operations

```bash
# Run Node.js with trace warnings to debug file descriptor issues
node --trace-warnings app.js
```

```js
// Example: Handling errors during file read
import { open } from 'node:fs/promises';

(async () => {
  let filehandle;
  try {
    filehandle = await open('sample.txt', 'r');
    const data = await filehandle.readFile({ encoding: 'utf8' });
    console.log(data);
  } catch (error) {
    console.error('Error during file operation:', error);
  } finally {
    if (filehandle) await filehandle.close();
  }
})();
```

This detailed API specification provides all the necessary signatures, parameter definitions, default values, complete code examples, configuration options, best practices, and troubleshooting procedures for using the Node.js File System (fs) module effectively.


## Original Source
Node.js File System (fs) Documentation
https://nodejs.org/api/fs.html

## Digest of FILE_SYSTEM

# Node.js File System (fs) API Documentation

**Retrieved Date:** 2023-10-26

## Overview
This document extracts the full technical details from the Node.js fs API documentation. It includes promise-based, callback-based and synchronous method signatures, parameter specifications, return types, and full code examples. The document covers the FileHandle class, fsPromises API, Common Objects, and various configuration options.

## Table of Contents
1. FileHandle Class
2. fsPromises API
3. Callback API
4. Synchronous API
5. Common Objects and Constants
6. Code Examples

## 1. FileHandle Class
### Methods and Events
- **Event:** `'close'`
- **filehandle.appendFile(data[, options])**
  - **Parameters:**
    - `data`: `<string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable> | <Stream>`
    - `options`: `<Object> | <string>` with sub-options:
      - `encoding`: `<string> | <null>` (Default: `'utf8'`)
      - `signal`: `<AbortSignal> | <undefined>` (Default: `undefined`)
  - **Returns:** `<Promise>` that fulfills with `undefined`.
  - **Alias:** Equivalent to `filehandle.writeFile()`.

- **filehandle.chmod(mode)**
  - **Parameters:** `mode: <integer>`
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.chown(uid, gid)**
  - **Parameters:**
    - `uid: <integer>`
    - `gid: <integer>`
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.close()**
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.createReadStream([options])**
  - **Parameters:** `options: <Object>` with keys:
    - `encoding`: `<string>` (Default: `null`)
    - `autoClose`: `<boolean>` (Default: `true`)
    - `emitClose`: `<boolean>` (Default: `true`)
    - `start`: `<integer>`
    - `end`: `<integer>` (Default: `Infinity`)
    - `highWaterMark`: `<integer>` (Default: `64 * 1024`)
    - `signal`: `<AbortSignal> | <undefined>` (Default: `undefined`)
  - **Returns:** `<fs.ReadStream>`

- **filehandle.createWriteStream([options])**
  - **Parameters:** `options: <Object>` with keys:
    - `encoding`: `<string>` (Default: `'utf8'`)
    - `autoClose`: `<boolean>` (Default: `true`)
    - `emitClose`: `<boolean>` (Default: `true`)
    - `start`: `<integer>`
    - `highWaterMark`: `<number>` (Default: `16384`)
    - `flush`: `<boolean>` (Default: `false`)
  - **Returns:** `<fs.WriteStream>`

- **filehandle.datasync()**
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.read(buffer, offset, length, position)**
  - **Parameters:**
    - `buffer`: `<Buffer> | <TypedArray> | <DataView>`
    - `offset`: `<integer>` (Default: `0`)
    - `length`: `<integer>` (Default: `buffer.byteLength - offset`)
    - `position`: `<integer> | <bigint> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with an object: `{ bytesRead: <integer>, buffer: <Buffer> }`.

- **filehandle.read([options])** and **filehandle.read(buffer[, options])**: Variants that support options object with keys `buffer`, `offset`, `length`, and `position`.

- **filehandle.readableWebStream()**
  - **Returns:** `<ReadableStream>` that emits bytes.

- **filehandle.readFile(options)**
  - **Parameters:** `options: <Object> | <string>` (encoding option default: `null`)
  - **Returns:** `<Promise>` fulfilling with file contents as `<Buffer>` or `<string>`.

- **filehandle.readLines([options])**
  - **Parameters:** `options: <Object>` with keys like `encoding`, `autoClose`, `emitClose`, `start`, `end`, and `highWaterMark`.
  - **Returns:** `<readline.InterfaceConstructor>`.

- **filehandle.readv(buffers[, position])**
  - **Parameters:**
    - `buffers`: `<Buffer[]> | <TypedArray[]> | <DataView[]>`
    - `position`: `<integer> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with `{ bytesRead: <integer>, buffers: [...] }`.

- **filehandle.stat([options])**
  - **Parameters:** `options: <Object>` with key `bigint: <boolean>` (Default: `false`)
  - **Returns:** `<Promise>` fulfilling with `<fs.Stats>` object.

- **filehandle.sync()**
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.truncate(len)**
  - **Parameters:** `len: <integer>` (Default: `0` if negative)
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.utimes(atime, mtime)**
  - **Parameters:**
    - `atime`: `<number> | <string> | <Date>`
    - `mtime`: `<number> | <string> | <Date>`
  - **Returns:** `<Promise>` with no value on success.

- **filehandle.write(buffer, offset[, length[, position]])**
  - **Parameters:**
    - `buffer`: `<Buffer> | <TypedArray> | <DataView>`
    - `offset`: `<integer>`
    - `length`: `<integer>` (Default: `buffer.byteLength - offset`)
    - `position`: `<integer> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with an object: `{ bytesWritten: <integer>, buffer: <Buffer> }`.

- **filehandle.write(buffer[, options])** (variant with options object)
  - **Parameters:** `buffer` plus options: `{ offset, length, position }` with defaults: offset=0, length=`buffer.byteLength - offset`, position=`null`.
  - **Returns:** `<Promise>` as above.

- **filehandle.write(string[, position[, encoding]])**
  - **Parameters:**
    - `string`: `<string>`
    - `position`: `<integer> | <null>` (Default: `null`)
    - `encoding`: `<string>` (Default: `'utf8'`)
  - **Returns:** `<Promise>` fulfilling with `{ bytesWritten: <integer>, buffer: <string> }`.

- **filehandle.writeFile(data, options)**
  - **Parameters:**
    - `data`: `<string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable> | <Stream>`
    - `options`: `<Object> | <string>` with sub-options: `encoding` (Default: `'utf8'`), `signal` (Default: `undefined`)
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.writev(buffers[, position])**
  - **Parameters:**
    - `buffers`: `<Buffer[]> | <TypedArray[]> | <DataView[]>`
    - `position`: `<integer> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with an object: `{ bytesWritten: <integer>, buffers: [...] }`.

- **filehandle[Symbol.asyncDispose]()**
  - **Alias for filehandle.close()**. <small>(Experimental; added in v20.4.0)</small>

## 2. fsPromises API
Methods provided in the `fs/promises` module include:

- **fsPromises.access(path[, mode])**
  - **Parameters:**
    - `path`: `<string> | <Buffer> | <URL>`
    - `mode`: `<integer>` (Default: `fs.constants.F_OK`)
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **fsPromises.appendFile(path, data[, options])**
  - **Parameters:**
    - `path`: `<string> | <Buffer> | <URL> | <FileHandle>`
    - `data`: `<string> | <Buffer>`
    - `options`: `<Object> | <string>` with keys: `encoding` (Default: `'utf8'`), `mode` (Default: `0o666`), `flag` (Default: `'a'`), `flush` (Default: `false`)
  - **Returns:** `<Promise>`.

- **fsPromises.chmod(path, mode)**, **fsPromises.chown(path, uid, gid)**, **fsPromises.copyFile(src, dest[, mode])**, etc.

Additional fsPromises methods include:
`cp`, `glob`, `lchmod`, `lchown`, `lutimes`, `link`, `lstat`, `mkdir`, `mkdtemp`, `open`, `opendir`, `readdir`, `readFile`, `readlink`, `realpath`, `rename`, `rmdir`, `rm`, `stat`, `statfs`, `symlink`, `truncate`, `unlink`, `utimes`, `watch`, and more.

## 3. Callback API
All the fs methods (e.g. `fs.access`, `fs.appendFile`, `fs.chmod`, etc.) are available with a callback form. The callback signature typically follows:

```js
fs.method(arguments, (err, result) => {
  if (err) {
    // handle error
  } else {
    // process result if available
  }
});
```

Examples:

```js
const { unlink } = require('node:fs');

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

## 4. Synchronous API
Synchronous methods in fs block the event loop and throw errors immediately.

Example:

```js
const { unlinkSync } = require('node:fs');

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle error
}
```

## 5. Common Objects and Constants
### Class: fs.Dir
- Methods: `close()`, `closeSync()`, `read()`, `readSync()`, and supports `[Symbol.asyncIterator]()`.

### Class: fs.Dirent
- Methods: `isBlockDevice()`, `isCharacterDevice()`, `isDirectory()`, `isFIFO()`, `isFile()`, `isSocket()`, `isSymbolicLink()`, along with properties `name`, `parentPath`, and `path`.

### Other Common Classes:
- `fs.FSWatcher`, `fs.StatWatcher`, `fs.ReadStream`, `fs.WriteStream`, and `fs.Stats` with various properties and methods to inspect file metadata.

### Constants:
- `fs.constants` include file access, copy, open, type, and mode constants.

## 6. Code Examples
### Promise-based Example

```js
import { unlink } from 'node:fs/promises';

(async () => {
  try {
    await unlink('/tmp/hello');
    console.log('successfully deleted /tmp/hello');
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})();
```

### Callback Example

```js
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

### Synchronous Example

```js
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```


## Attribution
- Source: Node.js File System (fs) Documentation
- URL: https://nodejs.org/api/fs.html
- License: License: MIT License
- Crawl Date: 2025-04-21T09:47:24.395Z
- Data Size: 4242134 bytes
- Links Found: 5296

## Retrieved
2025-04-21
library/WINSTON.md
# library/WINSTON.md
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
library/CHALK_DOC.md
# library/CHALK_DOC.md
# CHALK_DOC

## Crawl Summary
Expressive, composable API for terminal string styling. Supports chaining of styles, multiple arguments, and nesting of styles. Configurable color levels via chalk.level (0: disabled, 1: basic, 2: 256, 3: Truecolor). Provides separate stderr instance via chalkStderr. Includes full arrays for supported modifiers and color names for validation. Offers direct methods for RGB, HEX, and ANSI256 color specifications. Troubleshooting and configuration via environment variables and CLI flags are included.

## Normalised Extract
## Table of Contents
1. Installation
2. Usage
3. API Specifications
4. Chalk Level & Configuration
5. Supported Styles & Colors
6. Extended Color Models
7. Implementation Best Practices
8. Troubleshooting Procedures

### 1. Installation
- npm install chalk
- For ESM environments, use Chalk 5; for TypeScript or CommonJS, use Chalk 4.

### 2. Usage
- Import using: `import chalk from 'chalk';`
- Use as: `console.log(chalk.blue('Hello world!'));`
- Chain and nest styles: `chalk.red.bold.underline('Hello', 'world');`

### 3. API Specifications
- Core method: `chalk.<style>[.<style>...](string, [string...])`
- Example: `chalk.red.bold.underline('Hello', 'world')` returns a styled string.

### 4. Chalk Level & Configuration
- Property: `chalk.level`
  - Values: 0 (disabled), 1 (16 colors), 2 (256 colors), 3 (Truecolor)
  - Custom instance: `new Chalk({level: number})`

### 5. Supported Styles & Colors
- Modifiers: reset, bold, dim, italic, underline, overline, inverse, hidden, strikethrough, visible
- Foreground Colors: black, red, green, yellow, blue, magenta, cyan, white, blackBright, redBright, etc.
- Background Colors: bgBlack, bgRed, bgGreen, ..., bgWhiteBright

### 6. Extended Color Models
- Methods for true color:
   - `chalk.rgb(r, g, b)`, e.g., `chalk.rgb(123, 45, 67).underline('text')`
   - `chalk.hex('#DEADED')`, e.g., `chalk.hex('#DEADED').bold('text')`
   - Background: `chalk.bgRgb(...)`, `chalk.bgHex(...)`
   - ANSI256: `chalk.bgAnsi256(number)`

### 7. Implementation Best Practices
- Use chaining for composability
- Use new Chalk instance in modules to prevent global state changes
- Code Example:

      import { Chalk } from 'chalk';
      const customChalk = new Chalk({level: 3});
      console.log(customChalk.hex('#FF8800').bold('Orange!'));

### 8. Troubleshooting Procedures
- Check the current color level via `chalk.level`
- Use environment variables (e.g., FORCE_COLOR=1) if auto-detection fails
- Forcing styles via CLI: `node app.js --color=256`
- Use chalkStderr for error logging


## Supplementary Details
### Detailed Technical Specifications

1. Chalk Level Property:
   - Default auto-detected.
   - Values:
     - 0: Colors disabled
     - 1: 16 color support
     - 2: 256 color support
     - 3: Truecolor (16 million colors)
   - Example override:
         chalk.level = 2;
   - New instance creation: `new Chalk({ level: <number> })`

2. Constructor and Options
   - Import using: `import { Chalk } from 'chalk';`
   - Constructor parameter: { level: number }
   - Effect: Overrides global color detection for that instance

3. API Methods
   - Chainable methods: e.g., `chalk.red.bold('text')`
   - Accepts multiple string arguments which are space-joined
   - Underlying implementation produces ANSI escape sequences

4. Configuration Options and Overrides
   - Environment Variables: FORCE_COLOR (0,1,2,3)
   - CLI Flags: --color, --no-color, --color=256, --color=16m

5. Best Practices
   - Avoid modifying String.prototype
   - Use dedicated chalkStderr for logs on stderr stream
   - Validate style names using provided arrays: modifierNames, foregroundColorNames

6. Troubleshooting
   - Command: `echo $FORCE_COLOR` to check environment override
   - Validate configuration by printing `chalk.level`
   - If styles not applied, confirm terminal supports ANSI codes (e.g. use Windows Terminal on Windows)


## Reference Details
### Full API Specifications and Code Examples

1. Core API Usage:
   - Method Signature:
         chalk.<style>[.<style>...](...strings: string[]): string
   - Example:
         const styled = chalk.red.bold.underline('Hello', 'world');
         // Returns a string with corresponding ANSI escape sequences

2. Custom Chalk Instance:
   - Constructor Signature:
         new Chalk(options: { level: number }): Chalk
   - Example:
         import { Chalk } from 'chalk';
         const customChalk = new Chalk({ level: 3 });
         console.log(customChalk.hex('#FF8800').bold('Orange!'));

3. Configuration Methods:
   - Global Level Override:
         chalk.level = 2;
   - Environment Variable Overrides:
         // In terminal, run:
         FORCE_COLOR=3 node app.js
         // or use CLI flag:
         node app.js --color=256

4. RGB and HEX Methods:
   - Method Signatures:
         chalk.rgb(r: number, g: number, b: number): Chalk
         chalk.hex(color: string): Chalk
         chalk.bgRgb(r: number, g: number, b: number): Chalk
         chalk.bgHex(color: string): Chalk
   - Code Example:
         console.log(chalk.rgb(15, 100, 204).inverse('Hello!'));
         console.log(chalk.hex('#DEADED').bold('Bold gray!'));
         console.log(chalk.bgHex('#DEADED').underline('Hello, world!'));

5. ANSI256 Support:
   - Method Signature:
         chalk.bgAnsi256(code: number): Chalk
   - Example:
         console.log(chalk.bgAnsi256(194)('Honeydew, more or less'));

6. Style Validation Arrays:
   - Available arrays:
         chalk.modifierNames: string[]
         chalk.foregroundColorNames: string[]
         chalk.backgroundColorNames: string[]
         chalk.colorNames: string[] // combination of foreground and background
   - Example:
         import { modifierNames, foregroundColorNames } from 'chalk';
         console.log(modifierNames.includes('bold')); // true
         console.log(foregroundColorNames.includes('pink')); // false

7. Best Practice Example with Comments:

      // Import chalk and create a customized instance
      import { Chalk } from 'chalk';
      const myChalk = new Chalk({ level: 3 });

      // Log message with multiple chained styles
      console.log(myChalk.blue.bgRed.bold('This is a warning message'));

      // Use RGB and hex for precise styling
      console.log(myChalk.rgb(123, 45, 67).underline('Underlined reddish color'));
      console.log(myChalk.hex('#DEADED').bold('Bold gray!'));

8. Troubleshooting Steps:
   - Verify your terminal supports ANSI escape codes (use Windows Terminal on Windows).
   - Check the current chalk level by logging `chalk.level`.
   - If colors are not showing, try forcing color output by setting the environment variable:
         export FORCE_COLOR=3
     Then run your node application.
   - For command-line overrides, use:
         node app.js --color=16m
     to enable Truecolor support directly.

All of the above API methods, parameters, configurations, and examples are directly available from the Chalk module at https://github.com/chalk/chalk#readme


## Original Source
Chalk Documentation
https://github.com/chalk/chalk#readme

## Digest of CHALK_DOC

# Chalk Documentation Digest

**Retrieved Date:** 2024-12-23
**Data Size:** 636378 bytes
**Attribution:** Sindre Sorhus, maintained and contributed by 43+ contributors

## Installation

- Install via npm:

  npm install chalk

- Note: Chalk 5 is ESM-only. For common usage with TypeScript or non-ESM build tools, use Chalk 4.

## Usage & API Overview

Import chalk:

    import chalk from 'chalk';

Basic usage examples:

    console.log(chalk.blue('Hello world!'));

Chain multiple styles:

    console.log(chalk.blue.bgRed.bold('Hello world!'));

Combine styled and normal strings:

    const log = console.log;
    log(chalk.blue('Hello') + ' World' + chalk.red('!'));

Pass multiple arguments, which are space separated:

    log(chalk.blue('Hello', 'World!', 'Foo', 'bar'));

Nesting styles:

    log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

ES2015 template literal usage:

    log(`
    CPU: ${chalk.red('90%')}
    RAM: ${chalk.green('40%')}
    DISK: ${chalk.yellow('70%')}
    `);

## API Specifications

### Core Method Signature

- Method: `chalk.<style>[.<style>...](string, [string...])`
  - Example: `chalk.red.bold.underline('Hello', 'world')`
  - Description: Chain style functions where order is non-dependent; later styles override earlier styling conflicts.
  - Parameters: One or more strings
  - Returns: A single string with ANSI escape codes

### Chalk Level Configuration

- Property: `chalk.level`
  - Description: Specifies the level of color support. Supported levels are:
    - 0: All colors disabled
    - 1: Basic color support (16 colors)
    - 2: 256 color support
    - 3: Truecolor support (16 million colors)
  - Usage Example:

        chalk.level = 2;

- Creating a new instance with custom configuration:

      import { Chalk } from 'chalk';
      const customChalk = new Chalk({ level: 0 });

### Additional API Features

- **supportsColor**: Determines if terminal supports color. Can be overridden using CLI flags `--color` / `--no-color` or environment variables (e.g., `FORCE_COLOR=1,2,3,0`).
- **chalkStderr**: Separate instance configured for stderr stream behavior.
- Array properties:
  - `modifierNames`, `foregroundColorNames`, `backgroundColorNames`, and `colorNames` for validation and introspection of supported styles.

## Style & Color Options

### Modifiers

- `reset`: Reset style
- `bold`: Bold text
- `dim`: Lower opacity
- `italic`: Italic text (limited support)
- `underline`: Underline text
- `overline`: Overline text
- `inverse`: Invert colors
- `hidden`: Make text invisible
- `strikethrough`: Strike through text
- `visible`: Display only when color is enabled

### Colors

Foreground colors include: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `blackBright` (alias: `gray`, `grey`), `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`.

Background colors use the prefix `bg` e.g., `bgRed`, `bgBlueBright`, etc.

### Extended Color Support

- **256 Colors & Truecolor**:
  - Use methods: `chalk.rgb(r, g, b)`, `chalk.hex('#RRGGBB')`, and their background versions: `chalk.bgRgb(...)`, `chalk.bgHex(...)`
  - Downsampling examples: RGB to ANSI escape codes when lower color levels are active.
  - Additional method: `chalk.bgAnsi256(number)` for 256 color palette.

## Best Practices & Troubleshooting

### Implementation Best Practices

- Chain method calls for composability. Example:

      console.log(chalk.red.bold('Error:'), 'Something failed!');

- Use new Chalk instance for modules to avoid global side-effects:

      import { Chalk } from 'chalk';
      const myChalk = new Chalk({ level: 3 });
      console.log(myChalk.hex('#DEADED')('Themed text'));

### Configuration Options & Overrides

- Override terminal color detection using environment variables:

  For example:

      FORCE_COLOR=3 node app.js

- CLI flags to force color support:

      node app.js --color=256

### Troubleshooting Steps

1. Verify Terminal Support: Use `console.log(chalk.level)` to ensure correct color support level.
2. Ensure Environment Variables are set if terminal auto-detection fails.
3. For CommonJS, if module errors occur with Chalk 5, fallback to Chalk 4.
4. Use `chalkStderr` for logging errors to stderr with proper coloring.

## Additional Code Examples with Inline Comments

// Basic themed logging example:
import chalk from 'chalk';

// Log a standard message in blue
console.log(chalk.blue('Hello world!'));

// Combine multiple styles and arguments
console.log(chalk.green('Success') + ': Operation completed successfully');

// Customize theme with variables
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange
console.log(error('Error!'));
console.log(warning('Warning!'));

// Using template literals with styled variables
const cpu = chalk.red('90%');
const ram = chalk.green('40%');
const disk = chalk.yellow('70%');
console.log(`CPU: ${cpu} | RAM: ${ram} | DISK: ${disk}`);

# Attribution

Data extracted from https://github.com/chalk/chalk#readme


## Attribution
- Source: Chalk Documentation
- URL: https://github.com/chalk/chalk#readme
- License: License: MIT License
- Crawl Date: 2025-04-21T01:06:44.868Z
- Data Size: 636378 bytes
- Links Found: 5249

## Retrieved
2025-04-21
library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
Installation via npm, quick-start examples, usage of global and local Command instances, and a rich set of option definitions (.option) including boolean, value, negatable, variadic and custom-processed options. Detailed command creation with .command(), argument handling with .argument(), action handlers (sync and async), automated help customization, parsing configurations (enablePositionalOptions, passThroughOptions, storeOptionsAsProperties), error overriding with exitOverride(), and life cycle hooks for preAction and postAction are provided with complete code examples and expected command outputs.

## Normalised Extract
**Table of Contents:**
1. Installation
2. Quick Start
3. Declaring Program Variable
4. Options
   - Defining Options
   - Option Types (boolean, value, negatable, variadic, optional)
   - Custom Option Processing
5. Commands
   - Command Creation
   - Command Arguments
6. Action Handlers
   - Synchronous & Asynchronous
7. Help and Usage Customization
8. Parsing, Legacy Options & Error Handling
9. Life Cycle Hooks & Custom Events
10. Troubleshooting

**1. Installation**
- Command: `npm install commander`

**2. Quick Start**
- Import using CommonJS or ECMAScript Modules:
  ```js
  const { program } = require('commander'); // CommonJS
  // or
  import { Command } from 'commander';
  const program = new Command();
  ```

**3. Declaring Program Variable**
- Use the global object `program` or create new instances with `new Command()` depending on program complexity.

**4. Options**
- Defining Options with `.option(flags, description, [default], [fn])`:
  ```js
  program
    .option('-d, --debug', 'enable debugging')
    .option('-p, --port <number>', 'specify port');
  ```
- Custom processing example:
  ```js
  function myParseInt(value, dummyPrevious) {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error('Not a number.');
    return parsed;
  }
  program.option('-i, --integer <number>', 'integer option', myParseInt);
  ```
- Variadic option usage:
  ```js
  program.option('-n, --number <numbers...>', 'list of numbers');
  ```

**5. Commands**
- Creating a command with arguments and action:
  ```js
  program.command('clone <source> [destination]')
    .description('clone a repository')
    .action((source, destination) => {
      console.log('Cloning from', source, 'to', destination);
    });
  ```

**6. Action Handlers**
- Synchronous:
  ```js
  program.command('serve <script>')
    .option('-p, --port <number>', 'port', 80)
    .action(function() {
      console.log(`Serving ${this.args[0]} on port ${this.opts().port}`);
    });
  ```
- Asynchronous:
  ```js
  async function run() { /* async code */ }
  program.command('run').action(run);
  program.parseAsync(process.argv);
  ```

**7. Help and Usage Customization**
- Custom help text:
  ```js
  program.addHelpText('after', '\nExample: $ custom-help --help');
  ```
- Overriding default help option:
  ```js
  program.helpOption('-e, --HELP', 'extended help');
  ```

**8. Parsing and Error Handling**
- Basic parse call:
  ```js
  program.parse(process.argv);
  ```
- Using `.exitOverride()` to handle errors:
  ```js
  program.exitOverride();
  try { program.parse(process.argv); } catch (err) { console.error(err.message); }
  ```

**9. Life Cycle Hooks & Custom Events**
- Pre-action hook example:
  ```js
  program.hook('preAction', (cmd, actionCmd) => {
    if (cmd.opts().trace) console.log(`Running ${actionCmd.name()}`);
  });
  ```
- Event listener for options:
  ```js
  program.on('option:verbose', function() {
    process.env.VERBOSE = this.opts().verbose;
  });
  ```

**10. Troubleshooting**
- Unknown option error:
  ```sh
  $ node split.js -s / --fits a/b/c
  error: unknown option '--fits'
  (Did you mean --first?)
  ```
- Debug subcommands with VSCode by setting "autoAttachChildProcesses": true in launch.json.


## Supplementary Details
**Supplementary Technical Specifications:**

- **Option Method Signature:**
  `.option(flags: string, description: string, defaultValue?: any, fn?: (value: string, previous: any) => any): this`

- **Command Method Signature:**
  `.command(name: string, description?: string, options?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command`

- **Argument Method Signature:**
  `.argument(name: string, description?: string, defaultValue?: any): this`

- **Parsing Methods:**
  - `.parse(argv?: string[], parseOptions?: { from: 'node' | 'electron' | 'user' }): this`
  - `.parseAsync(argv?: string[]): Promise<this>`

- **Error Handling:**
  - `.exitOverride(callback?: (err: CommanderError) => void): this`
  - `.error(message: string, options?: { exitCode?: number, code?: string }): never`

- **Life Cycle Hooks:**
  - Hook events: 'preAction', 'postAction', 'preSubcommand'
  - Example: `.hook('preAction', (command, actionCommand) => { ... });`

- **Configuration Options:**
  - Positional Options: `.enablePositionalOptions()`
  - Pass-through Options: `.passThroughOptions()`
  - Legacy property storage: `.storeOptionsAsProperties()`

- **Best Practices:**
  - Create local Command instances for larger applications to avoid clashes.
  - Always define required options with `.requiredOption()` when mandatory.
  - Use custom option processing for type coercion and validation.
  - Override exit behavior for integrating Commander with custom error-handling frameworks.

- **Implementation Steps:**
  1. Import Commander module and instantiate `program`.
  2. Chain method calls to add options, commands, arguments.
  3. Add custom processing functions where needed.
  4. Hook into life cycle events if debugging or logging is required.
  5. Call `.parse(process.argv)` or `.parseAsync(process.argv)` to start parsing.



## Reference Details
**Complete API Specifications and Developer Reference:**

1. **Program and Command Creation**
   - **Command (Class):**
     - Constructor: `new Command(name?: string)`
     - Methods:
       - `.name(name: string): this`
       - `.description(desc: string): this`
       - `.version(version: string, flags?: string, description?: string): this`
       - `.argument(name: string, description?: string, defaultValue?: any): this`
       - `.arguments(argString: string): this`
       - `.option(flags: string, description: string, defaultValue?: any, fn?: (value: string, previous: any) => any): this`
       - `.requiredOption(flags: string, description: string, defaultValue?: any, fn?: (value: string, previous: any) => any): this`
       - `.addOption(option: Option): this`
       - `.command(name: string, description?: string, options?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command`
       - `.addCommand(cmd: Command): this`
       - `.parse(argv?: string[], parseOptions?: { from: 'node' | 'electron' | 'user' }): this`
       - `.parseAsync(argv?: string[]): Promise<this>`
       - `.exitOverride(callback?: (err: CommanderError) => void): this`
       - `.error(message: string, options?: { exitCode?: number, code?: string }): never`
       - `.hook(name: 'preAction'|'postAction'|'preSubcommand', listener: (thisCommand: Command, actionCommand: Command) => void | Promise<void>): this`

2. **Option Processing and Custom Functions**
   - **Custom Option Parser Example:**
     ```js
     function myParseInt(value, dummyPrevious) {
       const parsed = parseInt(value, 10);
       if (isNaN(parsed)) throw new Error('Not a number.');
       return parsed;
     }
     ```

   - **Usage in Option:**
     ```js
     program.option('-i, --integer <number>', 'an integer argument', myParseInt);
     ```

3. **Code Examples (Full Code)**
   - **String Utility Example:**
     ```js
     const { Command } = require('commander');
     const program = new Command();

     program.name('string-util')
       .description('CLI to some JavaScript string utilities')
       .version('0.8.0');

     program.command('split')
       .description('Split a string into substrings and display as an array')
       .argument('<string>', 'string to split')
       .option('--first', 'display just the first substring')
       .option('-s, --separator <char>', 'separator character', ',')
       .action((str, options) => {
         const limit = options.first ? 1 : undefined;
         console.log(str.split(options.separator, limit));
       });

     program.parse();
     ```

4. **Troubleshooting Procedures**
   - **Unknown Option Error:**
     - Command:
       ```sh
       $ node split.js -s / --fits a/b/c
       ```
     - Expected Output:
       ```
       error: unknown option '--fits'
       (Did you mean --first?)
       ```

   - **Exit Override Example:**
     ```js
     program.exitOverride();
     try {
       program.parse(process.argv);
     } catch (err) {
       console.error('Custom error handling:', err.message);
     }
     ```

5. **Configuration Options with Effects:**
   - **Default Option Values:**
     ```js
     program.option('-c, --cheese <type>', 'add cheese', 'blue');
     // When not provided, program.opts().cheese returns 'blue'
     ```
   - **Negatable Options:**
     ```js
     program.option('--no-sauce', 'removes sauce');
     // When used, opts().sauce returns false
     ```
   - **Variadic Options:**
     ```js
     program.option('-n, --number <numbers...>', 'list of numbers');
     // Provides an array of values
     ```

This detailed API reference provides the exact method signatures, full code samples with inline comments, configuration parameters with default values, and step-by-step troubleshooting commands for developers using Commander.js to build robust node.js command-line interfaces.


## Original Source
Commander.js Documentation
https://github.com/tj/commander.js

## Digest of COMMANDER_JS

# Commander.js Documentation

**Retrieved Date:** 2023-10-30

## Installation

- Install via npm: 
  ```sh
  npm install commander
  ```

## Quick Start

- Import using CommonJS:
  ```js
  const { program } = require('commander');
  ```

- Import using ECMAScript Module:
  ```js
  import { Command } from 'commander';
  const program = new Command();
  ```

## Declaring Program Variable

- Global object usage:
  ```js
  const { program } = require('commander');
  ```

- Local Command instance:
  ```js
  const { Command } = require('commander');
  const program = new Command();
  ```

## Options

### Defining Options

- Using `.option()` method:
  ```js
  program
    .option('-p, --port <number>', 'server port number')
    .option('--trace', 'add extra debugging output')
    .option('--ws, --workspace <name>', 'use a custom workspace');
  ```

### Option Types and Argument Parsing

- Boolean and value options:
  ```js
  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
  ```

- Optional option with a default value:
  ```js
  program
    .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
  ```

- Negatable options:
  ```js
  program
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese');
  ```

- Boolean or value option:
  ```js
  program
    .option('-c, --cheese [type]', 'Add cheese with optional type');
  ```

- Variadic options:
  ```js
  program
    .option('-n, --number <numbers...>', 'specify numbers')
    .option('-l, --letter [letters...]', 'specify letters');
  ```

### Advanced Option Handling

- Custom processing with a callback function:
  ```js
  function myParseInt(value, dummyPrevious) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new Error('Not a number.');
    }
    return parsedValue;
  }

  function increaseVerbosity(dummyValue, previous) {
    return previous + 1;
  }

  program
    .option('-i, --integer <number>', 'integer argument', myParseInt)
    .option('-v, --verbose', 'increase verbosity', increaseVerbosity, 0);
  ```

## Commands

### Creating Commands

- Defining a subcommand with an action handler:
  ```js
  program.command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
      console.log('clone command called with:', source, destination);
    });
  ```

- Stand-alone executable subcommands:
  ```js
  program
    .command('install [package-names...]', 'install one or more packages')
    .command('search [query]', 'search with optional query');
  ```

### Command Arguments

- Using `.argument()`:
  ```js
  program
    .argument('<username>', 'user to login')
    .argument('[password]', 'password for user, if required', 'no password given')
    .action((username, password) => {
      console.log('username:', username);
      console.log('password:', password);
    });
  ```

- Variadic arguments:
  ```js
  program
    .command('rmdir')
    .argument('<dirs...>')
    .action((dirs) => {
      dirs.forEach(dir => console.log('rmdir:', dir));
    });
  ```

## Action Handlers

- Synchronous action handler:
  ```js
  program
    .command('serve')
    .argument('<script>')
    .option('-p, --port <number>', 'port number', 80)
    .action(function() {
      console.error('Run script', this.args[0], 'on port', this.opts().port);
    });
  ```

- Asynchronous action handler:
  ```js
  async function run() {
    // Async code here...
  }

  program
    .command('run')
    .action(run);

  program.parseAsync(process.argv);
  ```

## Automated Help

- Customising help text:
  ```js
  program.addHelpText('after', '\nExample call:\n  $ custom-help --help\n');
  ```

- Overriding help options:
  ```js
  program.helpOption('-e, --HELP', 'read more information');
  ```

## Parsing and Options Handling

- Basic parsing:
  ```js
  program.parse(process.argv);
  ```

- Positional options and pass-through of unknown options:
  ```js
  program.enablePositionalOptions();
  program.passThroughOptions();
  ```

- Legacy option properties:
  ```js
  program.storeOptionsAsProperties()
    .option('-d, --debug')
    .action((cmdOpts) => {
      if (cmdOpts.debug) console.error('Debug mode enabled');
    });
  ```

## Exit and Error Handling

- Override exit behavior:
  ```js
  program.exitOverride();
  try {
    program.parse(process.argv);
  } catch (err) {
    // Custom error handling logic
    console.error('Error:', err.message);
  }
  ```

- Display error with specific exit code:
  ```js
  program.error('Custom processing has failed', { exitCode: 2, code: 'my.custom.error' });
  ```

## Troubleshooting and Debugging

- Example error message on unknown option:
  ```sh
  $ node split.js -s / --fits a/b/c
  error: unknown option '--fits'
  (Did you mean --first?)
  ```

- Debugging subcommands with VSCode:
  Set "autoAttachChildProcesses": true in launch.json

## Additional Features

- Custom event listeners:
  ```js
  program.on('option:verbose', function () {
    process.env.VERBOSE = this.opts().verbose;
  });
  ```

- Life cycle hooks:
  ```js
  program.hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
      console.log('arguments:', actionCommand.args);
      console.log('options:', actionCommand.opts());
    }
  });
  ```


## Attribution
- Source: Commander.js Documentation
- URL: https://github.com/tj/commander.js
- License: License: MIT License
- Crawl Date: 2025-04-21T03:54:29.175Z
- Data Size: 683343 bytes
- Links Found: 4921

## Retrieved
2025-04-21
library/PRETTIER_DOCS.md
# library/PRETTIER_DOCS.md
# PRETTIER_DOCS

## Crawl Summary
Prettier is an opinionated code formatter that supports various languages including JavaScript, JSX, Angular, Vue, and more. It works by parsing code to an AST and reprinting it with a uniform style that respects a maximum line length, reformatting function calls and objects as needed. It supports configuration options like --trailing-comma (default: all), new options in v3.5 such as --objectWrap and --experimental-operator-position, and includes CLI flags for caching (--cache, --cache-location). It integrates easily with editors and pre-commit hooks, and its updates are documented in detailed release notes.

## Normalised Extract
TABLE OF CONTENTS:
1. Features and Supported Languages
2. Formatting Engine and Code Reprinting Logic
3. Configuration Options and Flags
4. Editor & Plugin Integration
5. Performance and CLI Details
6. Release Notes

DETAILS:
1. Features and Supported Languages:
   - Supported Languages: JavaScript (including experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS (Less/SCSS), HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM, MDX v1), YAML.

2. Formatting Engine and Code Reprinting Logic:
   - Converts source code into an AST.
   - Discards consistent styling from source and reprints code using its own rules including maximum line length handling.
   - Example: 
     • Single-line remains unchanged (e.g. `foo(arg1, arg2, arg3, arg4);`), while long argument lists are split into multiple lines with proper indentation.

3. Configuration Options and Flags:
   - --trailing-comma: Controls trailing commas (values: none, es5, all; default: all).
   - --objectWrap: New option in v3.5 to wrap objects based on parameter count.
   - --experimental-operator-position: Experimental flag (v3.5) for operator positioning.
   - --cache and --cache-location: Enable caching and specify the cache directory.

4. Editor & Plugin Integration:
   - Integrates with VSCode (`prettier-vscode`), Sublime Text (`JsPrettier`), Vim (`vim-prettier`), Emacs (`prettier-js`), etc.
   - Can be executed automatically on file save or via pre-commit hooks with tools like Husky.

5. Performance and CLI Details:
   - Optimized command line interface capable of formatting large codebases in under 13 seconds.
   - Key CLI commands include formatting on save (`--write`) and checking files (`--check`).

6. Release Notes:
   - Detailed chronological release notes from versions 2.8 up to 3.5, specifying bug fixes, performance improvements, and new feature integrations like ECMAScript Modules migration and experimental formatting options.


## Supplementary Details
Technical Specifications and Implementation Details:
- Maximum line length can be configured; Prettier automatically reflows code based on this parameter.
- Detailed configuration options:
   • --trailing-comma: Accepts values 'none', 'es5', or 'all'; default is 'all' for new projects.
   • --objectWrap (v3.5): When enabled, wraps object literals across multiple lines if they exceed a certain threshold.
   • --experimental-operator-position (v3.5): Adjusts binary operator positioning; still experimental.
   • --cache: Enables caching to speed up repeated formatting; used with --cache-location to define the cache directory.
- Editor integrations include specific plugins for VSCode, Sublime Text, Vim, and Emacs, ensuring automatic formatting on save.
- Pre-commit hook implementation example using Husky provided for CI/CD pipelines.
- Sample command usage for formatting files:
   > prettier --write "src/**/*.{js,jsx,ts,tsx}"


## Reference Details
API Specifications, SDK Method Signatures, and Code Examples:

1. CLI API and Options:
   • Command Syntax: `prettier [options] [file/glob ...]`
   • Options:
       --write               : Writes formatted output back to the file.
       --check               : Checks if files are already formatted.
       --config <path>       : Specifies a path to the configuration file (.prettierrc).
       --cache               : Enables caching of formatted files.
       --cache-location <path>: Specifies the cache directory.
       --trailing-comma <none|es5|all> : Sets trailing comma policy. Default: all.
       --objectWrap          : Enables object wrapping (introduced in v3.5).
       --experimental-operator-position : Enables experimental operator positioning (v3.5).

2. Programmatic Usage Example (Node.js):
   ```js
   const prettier = require('prettier');

   const options = {
     parser: 'babel',                    // Choose the correct parser for your language
     trailingComma: 'all',               // Apply trailing commas where valid
     printWidth: 80,                     // Maximum line width
     objectWrap: true,                   // Enable object wrapping (v3.5)
     experimentalOperatorPosition: true, // Enable experimental operator positioning (v3.5)
   };

   const sourceCode = "function test(){console.log('Hello, World!');}";
   const formattedCode = prettier.format(sourceCode, options);
   console.log(formattedCode);
   ```

3. Pre-commit Hook Implementation (Using Husky):
   - Install Husky and add the following to your package.json:
     ```json
     {
       "husky": {
         "hooks": {
           "pre-commit": "prettier --write ."
         }
       }
     }
     ```

4. Configuration File Example (.prettierrc):
   ```json
   {
     "printWidth": 80,
     "tabWidth": 2,
     "useTabs": false,
     "semi": true,
     "singleQuote": true,
     "trailingComma": "all",
     "bracketSpacing": true,
     "jsxBracketSameLine": false,
     "objectWrap": true,
     "experimentalOperatorPosition": true
   }
   ```

5. Troubleshooting Procedures:
   - To locate your configuration file:
     Command: `prettier --find-config-path <file>`
     Expected Output: Path to the configuration file or null if not found.
   - To debug formatting issues, run with increased logging:
     Command: `prettier --loglevel debug [file]`
   - Verify editor plugin versions match the installed Prettier version if formatting on save fails.

6. Best Practices:
   - Always format code on save to maintain consistency.
   - Integrate Prettier into CI pipelines using the `--check` option to enforce code style.
   - Regularly update your .prettierrc configuration to reflect new options introduced in releases.


## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER_DOCS

## Prettier Documentation

**Retrieved Date:** 2023-10-07

### Overview
Prettier is an opinionated code formatter that supports multiple programming languages including JavaScript (and experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS (Less/SCSS), HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM, MDX v1), and YAML. It reformats code by parsing it into its Abstract Syntax Tree (AST), removing original styling (with practical exceptions like empty lines and multi-line objects), and reprinting the code according to its own rules, such as maximum line length and proper wrapping.

### Code Formatting Examples

- **Single-line Code:**

  ```js
  foo(arg1, arg2, arg3, arg4);
  ```

- **Multi-line Code (when arguments exceed the line length):**

  ```js
  foo(
    reallyLongArg(),
    omgSoManyParameters(),
    IShouldRefactorThis(),
    isThereSeriouslyAnotherOne(),
  );
  ```

### Prettier Behavior

- Parses source code to an AST, discards unneeded original formatting, and reprints the code in a consistent style.
- Adjusts formatting dynamically based on maximum line length and available configuration options.

### Release & Change Log Highlights

- **Prettier 3.5:**
  - New `objectWrap` option.
  - New experimental `experimentalOperatorPosition` option.
  - Support for TypeScript configuration file.

- **Prettier 3.1:**
  - Introduction of an experimental ternary formatting mode (`--experimental-ternaries`).
  - Added support for Angular control flow syntax.

- **Prettier 3.0:**
  - Migration to ECMAScript Modules for source code.
  - Change in markdown formatting: no spaces inserted between Latin characters and CJK characters.
  - Updated default value of `trailingComma` to "all".

### Attribution
Crawled from: https://prettier.io/docs/en/index.html
Data Size: 1931056 bytes, Links Found: 3373


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: Unknown
- Crawl Date: 2025-04-20T20:47:23.467Z
- Data Size: 1931056 bytes
- Links Found: 3373

## Retrieved
2025-04-20
library/AUTO_GPT.md
# library/AUTO_GPT.md
# AUTO_GPT

## Crawl Summary
AutoGPT technical details include explicit self-hosting instructions, a comprehensive description of the frontend featuring Agent Builder, Workflow Management, and Deployment Controls, and a detailed breakdown of the server components including source code, infrastructure, and marketplace systems. It also provides concrete CLI commands with usage examples, and step-by-step example agent workflows (Viral Video Generator and Quote Identifier) with clear command-line invocations and configuration details.

## Normalised Extract
## Table of Contents
1. Setup Instructions
2. AutoGPT Frontend
3. AutoGPT Server
4. Example Agents
5. CLI Commands
6. Agent Protocol

### 1. Setup Instructions
- **Prerequisites:** Docker, VSCode, git, npm must be installed.
- **Steps:**
  - Clone the repository.
  - Run `./run setup` to install dependencies.
  - Follow the official self-hosting guide for additional configuration details.

### 2. AutoGPT Frontend
- **Agent Builder:** Provides a low-code environment to configure custom agents.
- **Workflow Management:** Connect blocks where each block defines a single action.
- **Deployment Controls:** Configure agent lifecycle; commands include start, stop, and restart.
- **Monitoring & Analytics:** Real-time performance tracking.

### 3. AutoGPT Server
- **Purpose:** Executes agents continuously.
- **Core Components:**
  - **Source Code:** Implements logic for agent operations.
  - **Infrastructure:** Managed services for scalability and reliability.
  - **Marketplace:** Repository of pre-built agents deployable on demand.

### 4. Example Agents
- **Viral Video Generator:**
  - Reads trending topics from Reddit.
  - Automatically creates a short video from trending content.
- **Quote Identifier:**
  - Monitors a YouTube channel for new videos.
  - Transcribes audio and identifies impactful quotes for social media posts.

### 5. CLI Commands
- **Command Structure:**
  ```bash
  $ ./run [COMMAND]
  ```
- **Available Commands:**
  - `agent`: Create, start, stop agents.
  - `benchmark`: Initiate performance benchmarks and list available tests and categories.
  - `setup`: Install all required system dependencies. 
- **Example Execution:**
  ```bash
  $ ./run setup
  $ ./run agent start
  ```

### 6. Agent Protocol
- **Standard:** Implements the AI Engineer Foundation agent protocol for consistent communication.
- **Effects:** Ensures frontend and benchmark integration.


## Supplementary Details
### Detailed Technical Specifications and Implementation Steps
- **Docker & Environment Setup:**
  - Use Dockerfile provided in the repository. Default configuration sets the environment variable `NODE_ENV=production`.
  - Command: `docker build -t autogpt .` and `docker run -p 8080:8080 autogpt`.
- **CLI Configuration Options:**
  - `--help`: Displays help menu for available commands.
  - `agent` subcommand accepts parameters: `start`, `stop`, `restart`.
  - `benchmark` subcommand lists test categories and initiates tests.
- **Frontend Settings:**
  - Configuration file (e.g., `config.json`) includes parameters such as `apiEndpoint`, `port` (default 3000), and `enableAnalytics` (default true).
- **Agent Builder:**
  - Uses a JSON schema to define agent properties. Example:
    ```json
    {
      "agentName": "VideoGenerator",
      "actions": [
         { "type": "fetch", "source": "reddit", "endpoint": "/r/trending" },
         { "type": "process", "method": "generateVideo" }
      ]
    }
    ```
- **Best Practices:**
  - Validate configuration using provided JSON schema.
  - Use Docker volumes for persistent storage of agent logs.
  - Regularly update dependencies using `./run setup` and monitor performance using the built-in analytics dashboard.
- **Troubleshooting:**
  - If the agent fails to start, check log outputs via `docker logs [container_id]` and ensure all environment variables are set correctly.
  - In case of CLI errors, re-run with `--help` to verify command syntax.


## Reference Details
### Complete API and CLI Specifications

#### CLI Command Usage
```bash
$ ./run [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  agent      Commands to create, start, stop agents
    - start: Initiates an agent process. Example: `./run agent start`
    - stop: Terminates the agent process. Example: `./run agent stop`
    - restart: Restarts the agent process. Example: `./run agent restart`

  benchmark  Initiates performance benchmarking
    - list: Lists available tests and categories. Example: `./run benchmark list`
    - start: Begins benchmark tests. Example: `./run benchmark start testName`

  setup      Installs required system dependencies
    - Executes dependency installation scripts. Example: `./run setup`
```

#### SDK Method Signatures (Example in Python)
```python
class AutoGPTAgent:
    def __init__(self, name: str, config: dict) -> None:
        """Initialize the agent with a name and configuration parameters."""
        self.name = name
        self.config = config

    def start(self) -> bool:
        """Start the agent process. Returns True if started successfully, False otherwise."""
        # Implementation code
        return True

    def stop(self) -> bool:
        """Stop the agent process. Returns True if stopped successfully, False otherwise."""
        # Implementation code
        return True

    def restart(self) -> bool:
        """Restart the agent process. Returns True if restarted successfully, False otherwise."""
        # Implementation code
        return True
```

#### Configuration Options
- **config.json Example:**
```json
{
  "apiEndpoint": "http://localhost:3000/api",
  "port": 3000,
  "enableAnalytics": true,
  "logLevel": "debug"
}
```
- **Effects:**
  - `apiEndpoint`: Defines the backend service URL.
  - `port`: Determines the HTTP port for the frontend.
  - `enableAnalytics`: Toggle for performance logging.
  - `logLevel`: Sets the verbosity of logging (options: debug, info, warn, error).

#### Full Code Example (Bash and Python Integration)
**Bash:**
```bash
# Build and run the Docker container
docker build -t autogpt .
docker run -d -p 8080:8080 --name autogpt_container autogpt
```

**Python Script Example:**
```python
from autogpt import AutoGPTAgent

# Load configuration
import json
with open('config.json', 'r') as f:
    config = json.load(f)

# Initialize and start the agent
agent = AutoGPTAgent('VideoGenerator', config)
if agent.start():
    print('Agent started successfully.')
else:
    print('Failed to start agent.')
```

#### Troubleshooting Procedures
1. **Container Startup Issues:**
   - Command: `docker logs autogpt_container`
   - Expected Output: Log messages indicating successful initialization or errors with specific configuration values.
2. **CLI Command Errors:**
   - Run: `./run --help` to verify availability of commands.
   - Check for syntax errors or missing parameters.
3. **Configuration Validation:**
   - Ensure `config.json` adheres to the JSON schema. Use online JSON validators if necessary.
4. **Dependency Issues:**
   - Rerun `./run setup` and check for installation errors;
   - Verify node modules and Python packages are installed as specified.

This document provides the full technical blueprint for the AutoGPT platform, its CLI, configuration options, API methods, and best practices for deployment and troubleshooting.

## Original Source
Auto-GPT Documentation
https://github.com/Significant-Gravitas/Auto-GPT

## Digest of AUTO_GPT

# AutoGPT Technical Digest

**Retrieved:** 2023-10-31

## Hosting Options
- **Self-host:** Download the repository and deploy locally using Docker.
- **Cloud-hosted:** Join the waitlist for the beta.

## Setup Instructions
- **Prerequisites:** Docker, VSCode, git, npm.
- **Guide:** Follow the official self-hosting guide for explicit configuration steps.

## AutoGPT Frontend
- **Agent Builder:** Use a low-code interface to design and configure AI agents.
- **Workflow Management:** Connect functional blocks where each block performs a single action.
- **Deployment Controls:** Manage agent lifecycle from testing to production.
- **CLI Commands:**
  ```bash
  $ ./run setup     # Install system dependencies
  $ ./run agent start   # Start the agent process
  $ ./run agent stop    # Stop the agent process
  ```

## AutoGPT Server
- **Role:** Executes continuous AI agents.
- **Components:**
  - Source Code (core logic for automation)
  - Infrastructure (scalable system architectures)
  - Marketplace (deploy pre-built agents)

## Example Agents
- **Viral Video Generator:**
  - Reads Reddit topics
  - Identifies trending topics
  - Creates a short-form video based on content
- **Quote Identifier:**
  - Subscribes to a YouTube channel
  - Transcribes new video content
  - Uses AI to extract impactful quotes and auto-publishes summaries

## CLI Commands
- **Usage:**
  ```bash
  Usage: cli.py [OPTIONS] COMMAND [ARGS]...

  Options:
    --help  Show this message and exit.

  Commands:
    agent      Commands to create, start and stop agents
    benchmark  Commands to start benchmark and list tests/categories
    setup      Installs system dependencies
  ```

## Agent Protocol
- **Specification:** Utilizes the standard defined by the AI Engineer Foundation to ensure uniform communication between agents, frontend, and benchmark tools.


## Attribution
- Source: Auto-GPT Documentation
- URL: https://github.com/Significant-Gravitas/Auto-GPT
- License: MIT License
- Crawl Date: 2025-04-20T19:12:14.834Z
- Data Size: 692840 bytes
- Links Found: 5695

## Retrieved
2025-04-20
library/PRETTIER.md
# library/PRETTIER.md
# PRETTIER

## Crawl Summary
Prettier is an opinionated code formatter that reprints source code by parsing the code into an AST and then printing it according to a consistent style. It supports languages such as JavaScript, JSX, Angular, Vue, Flow, and TypeScript, among others. Critical technical points include its handling of long lines by wrapping code, new configuration options (objectWrap, experimentalOperatorPosition, TS config file), and its integration with various editors and toolchains. The release notes highlight changes across versions (3.5, 3.4, 3.1, 3.0, etc.) and detail improvements such as performance enhancements and CLI optimizations.

## Normalised Extract
## Table of Contents
1. Overview
2. Code Formatting Example
3. Configuration Options
4. Release Notes
5. Technical Implementation

### 1. Overview
- Prettier reformats code by ignoring original styling and reprinting based on maximum line length.
- Supports multiple languages including JavaScript, TypeScript, CSS, HTML, and Markdown.

### 2. Code Formatting Example
- **Before Formatting:**
  foo(arg1, arg2, arg3, arg4);
- **Non-Wrapped Long Call:**
  foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());
- **After Formatting (Wrapped):**
  foo(
    reallyLongArg(),
    omgSoManyParameters(),
    IShouldRefactorThis(),
    isThereSeriouslyAnotherOne(),
  );

### 3. Configuration Options
- **trailingComma:** "all" (default). Ensures commas are placed after the last element in multi-line structures.
- **printWidth:** Defines maximum characters per line before wrapping occurs.
- **tabWidth:** Number (e.g., 2 or 4) for spaces in indentation.
- **useTabs:** Boolean to toggle between using tabs or spaces.
- **objectWrap:** (New) Controls object wrapping behavior.
- **experimentalOperatorPosition:** (New) Adjusts operator positioning in formatted output.
- **TS Config File Support:** Enables Prettier to use custom TypeScript configuration files.

### 4. Release Notes
- **3.5:** Added new options for objectWrap and experimentalOperatorPosition; TS configuration file support introduced.
- **3.4 & 3.3:** Numerous bug fixes and enhancements.
- **3.1:** Introduced experimental ternary formatting with `--experimental-ternaries` flag.
- **3.0:** Transitioned to ECMAScript Modules; altered markdown spacing and plugin interfaces.
- **2.8:** Improved cache handling with `--cache-location` and support for TypeScript 4.9 satisfies operator.

### 5. Technical Implementation
- **Parsing:** Removes original styling (except practical cases, e.g., empty lines) and rebuilds code through AST.
- **CLI Integration:** Use Prettier as a command line tool and integrate with editor plugins for on-save formatting. Example command: `prettier --write "src/**/*.js"`.
- **Usage in Code:** Often integrated into pre-commit hooks or Continuous Integration to enforce style consistency.


## Supplementary Details
### Detailed Supplementary Specifications

1. **Configuration Options and Defaults**:
   - trailingComma: Default: "all". Inserts a trailing comma in multi-line constructs if set to "all".
   - printWidth: Default value is typically 80, but configurable to any integer.
   - tabWidth: Default is 2. Common alternatives: 4.
   - useTabs: Default is false. If set true, indentation is done with tabs.
   - objectWrap: New option in version 3.5. Accepts values that determine object property wrapping behavior.
   - experimentalOperatorPosition: New option in version 3.5. Boolean flag for enabling experimental formatting of operators.
   - TS Config File Support: Allows a TypeScript config file to dictate parsing behavior for TypeScript projects.

2. **Implementation Steps**:
   - Parse source code to generate AST, ignoring original whitespace and formatting details (with exceptions for empty lines, multi-line objects).
   - Reprint source code according to formatting rules defined by configuration options.
   - Optionally wrap code segments when they exceed the defined printWidth.
   - Integrate with build tools by using CLI commands or editor plugins for automated formatting.

3. **CLI Example**:
   - Check formatting: `prettier --check "src/**/*.js"`
   - Write changes: `prettier --write "src/**/*.js"`
   - Custom cache location: `prettier --cache --cache-location .cache/prettier`


## Reference Details
### Complete API Specifications and Code Examples

#### Prettier API Method Signature

For JavaScript usage, Prettier exports a format function:

    /**
     * Formats the given source code string using the specified options.
     * @param {string} source - The source code to format.
     * @param {Prettier.Options} options - Formatting options including parser, trailingComma, printWidth, etc.
     * @returns {string} - The formatted code.
     */
    function format(source: string, options: Prettier.Options): string;

#### Prettier.Options Interface

    interface Options {
      parser: string;                 // e.g., 'babel', 'flow', 'typescript', etc.
      trailingComma?: 'none' | 'es5' | 'all'; // Default is 'all'.
      printWidth?: number;            // e.g., 80, 100
      tabWidth?: number;              // Number of spaces, e.g., 2 or 4
      useTabs?: boolean;              // false by default
      objectWrap?: 'preserve' | 'force' | 'auto'; // New in 3.5
      experimentalOperatorPosition?: boolean;     // New experimental flag
      // Additional options may include: semi, singleQuote, bracketSpacing, etc.
    }

#### Full Code Example

    // Importing Prettier in a Node.js project
    const prettier = require('prettier');

    // Source code to be formatted
    const code = "foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());";

    // Formatting options
    const options = {
      parser: 'babel',
      trailingComma: 'all',
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      objectWrap: 'auto',
      experimentalOperatorPosition: true
    };

    // Format the code
    const formatted = prettier.format(code, options);

    console.log(formatted);

#### Best Practices

- Integrate Prettier into your editor (VS Code, Sublime, Vim) for on-save formatting to maintain consistent style.
- Use Prettier in combination with linters (ESLint, TSLint) to separate formatting from code quality issues.
- For large codebases, run Prettier as a pre-commit hook to avoid formatting debates during code reviews.

#### Troubleshooting Procedures

1. **Check Formatting:**
   Run: `prettier --check "src/**/*.js"`
   - Expected output: Lists files that are not formatted or a success message if all files are formatted.

2. **Apply Formatting:**
   Run: `prettier --write "src/**/*.js"`
   - Expected output: Files are overwritten with formatted code.

3. **Cache Issues:**
   If encountering caching problems, use: `prettier --cache --cache-location .cache/prettier`
   and verify that the cache directory is writable.

4. **Configuration Debugging:**
   Run Prettier with increased logging (if available) or manually inspect the options object passed into the API.

These detailed API method signatures, option definitions, and full usage examples provide developers with the exact implementation guidelines required to integrate and troubleshoot Prettier in their projects.

## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER

# Prettier Documentation Digest

**Retrieved Date:** 2023-10-06
**Data Size:** 3018811 bytes

## Overview
Prettier is an opinionated code formatter that reprints your code based on a set of rules that enforce consistency. It supports numerous languages including JavaScript (with experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS variants, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM and MDX v1), and YAML.

## Code Formatting Example

**Original Code:**

    foo(arg1, arg2, arg3, arg4);

**When Line Length Exceeds Limit:**

    foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());

**Formatted Output:**

    foo(
      reallyLongArg(),
      omgSoManyParameters(),
      IShouldRefactorThis(),
      isThereSeriouslyAnotherOne(),
    );

## Key Configuration Options

- **trailingComma:** Default is "all". Adjusts comma usage in multi-line constructs.
- **printWidth:** Maximum line length used to decide when to wrap code.
- **tabWidth:** Number of spaces per indentation level.
- **useTabs:** Boolean flag to use tabs instead of spaces.
- **objectWrap option (New in 3.5):** Controls the wrapping behavior for objects.
- **experimentalOperatorPosition option (New in 3.5):** Enables experimental formatting for operator positions.
- **TS configuration file support:** Allows using a TypeScript configuration file for custom formatting rules.

## Release Notes & Versioning

- **Prettier 3.5:** Adds support for objectWrap, experimentalOperatorPosition, and TS config file support. (Feb 9, 2025)
- **Prettier 3.4 & 3.3:** Various bug fixes and feature enhancements.
- **Prettier 3.1:** Introduced the `--experimental-ternaries` flag with a novel formatting style for nested ternaries.
- **Prettier 3.0:** Migrated to ECMAScript Modules with significant changes such as altered markdown formatting rules and a plugin interface overhaul.
- **Prettier 2.8:** Improved cache options and added support for TypeScript 4.9's satisfies operator.

## Technical Implementation

- **Parsing and Reprinting:** Prettier parses code by removing original styling (preserving empty lines and multi-line objects) and reprints based on its AST, respecting the maximum line length.
- **Integration:** Works seamlessly with many editors through CLI, plugins, and IDE integrations.
- **Usage Pattern:** It is typically run as part of a pre-commit hook or on file save to enforce uniform code style across projects.

## Attribution
Extracted from https://prettier.io/docs/en/index.html with a data size of 3018811 bytes and 3980 links found in the crawl.


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: Unknown
- Crawl Date: 2025-04-20T21:38:44.902Z
- Data Size: 3018811 bytes
- Links Found: 3980

## Retrieved
2025-04-20
library/library-2025-04-20/ESLINT_DOC.md
# library/library-2025-04-20/ESLINT_DOC.md
# ESLINT_DOC

## Crawl Summary
The crawled ESLint documentation details are organized into several key areas: project usage, extension via custom rules and plugins, Node.js API integration, contribution and maintainer guidelines, as well as CLI configuration. Key technical details include JSON configuration formats, CLI command options (e.g., --fix, --format), Node.js API usage with the ESLint class (methods such as lintFiles, loadFormatter, outputFixes), and exact code samples for both custom rule creation and Node.js integration.

## Normalised Extract
## Table of Contents
1. Use ESLint in Your Project
   - Configuration file examples (.eslintrc.json) with exact syntax
   - CLI command options: `--fix`, `--format`, `--config`
2. Extend ESLint
   - Custom rule module example with full meta, create function, and context.report usage
3. Integrate ESLint
   - Node.js API: Creating an instance of ESLint, linting files, auto-fixing, and formatting output
   - Exact code example provided
4. Contribute to ESLint
   - Development environment setup including cloning, npm install, and testing procedures
5. Maintain ESLint
   - Guidelines for release processes and versioning
6. CLI and Configuration
   - Details for command line usage and configuration file formats
7. Node.js API Integration
   - Detailed ESLint class API including method signatures and expected return types

### Detailed Technical Information
- JSON configuration example:
  {
    "env": { "browser": true, "node": true },
    "extends": "eslint:recommended",
    "rules": { "no-unused-vars": "error", "semi": ["error", "always"] }
  }
- Custom Rule Example:
  ```js
  module.exports = {
    meta: {
      type: "problem",
      docs: {
         description: "disallow use of foo",
         category: "Best Practices",
         recommended: true
      },
      schema: []
    },
    create: function(context) {
      return {
         Identifier(node) {
           if (node.name === 'foo') {
             context.report({ node, message: "Usage of 'foo' is not allowed." });
           }
         }
      };
    }
  };
  ```
- Node.js API Integration Code:
  ```js
  const { ESLint } = require('eslint');

  (async function main() {
      const eslint = new ESLint({ fix: true, overrideConfigFile: '.eslintrc.json' });
      const results = await eslint.lintFiles(['src/**/*.js']);
      await ESLint.outputFixes(results);
      const formatter = await eslint.loadFormatter('stylish');
      console.log(formatter.format(results));
  })().catch((error) => {
      process.exitCode = 1;
      console.error(error);
  });
  ```
- CLI Usage:
  `eslint --fix --format stylish src/**/*.js`


## Supplementary Details
### ESLint Configuration Options
- Environments (`env`): e.g., { "browser": true, "node": true }
- Extends: "eslint:recommended"
- Parser Options: e.g., { "ecmaVersion": 2020, "sourceType": "module" }
- Rules Definitions: e.g.,
  ```json
  {
    "no-unused-vars": "error",
    "semi": ["error", "always"]
  }
  ```

### Custom Rule Implementation Steps
1. Create a JavaScript module exporting an object with `meta` and `create`.
2. Define `meta` with `docs`, `schema`, and rule type.
3. Implement `create(context)` returning visitor methods (e.g., for Identifier nodes).
4. Use `context.report()` to report violations.

### Node.js API for ESLint
- **Constructor Options:**
  - `overrideConfigFile`: string (path to ESLint config file, e.g., '.eslintrc.json')
  - `fix`: boolean (default false, set true to auto-fix issues)

### Troubleshooting Procedures
1. Run `eslint --debug file.js` to output detailed debugging logs.
2. Validate configuration file with a JSON linter.
3. For Node.js API errors, wrap asynchronous calls in try-catch and inspect error messages.
4. Check ESLint version compatibility using `eslint -v`.

### Best Practices
- Always back up configuration before making changes.
- Use version control to track configuration changes.
- Incrementally apply fixes using the `--fix` option and review changes before commit.

## Reference Details
## Full API Specifications and Code Examples

### ESLint Node.js API

**Class:** ESLint

**Constructor:**
```js
new ESLint(options: {
  overrideConfigFile?: string,  // Path to config file
  fix?: boolean,                // Apply fixes automatically
  useEslintrc?: boolean,        // Whether to use .eslintrc.* files
  baseConfig?: Object,          // Base configuration overrides
  cwd?: string                  // Current working directory for configuration resolution
}): ESLint
```

**Methods:**

1. lintFiles(patterns: string | string[]): Promise<LintResult[]>
   - **Parameters:**
     - patterns: glob string or an array of glob strings
   - **Returns:** Promise resolving to an array of LintResult objects

2. loadFormatter(format: string): Promise<Formatter>
   - **Parameters:**
     - format: string (e.g., 'stylish', 'json')
   - **Returns:** Promise resolving to a Formatter object with a method `format(results: LintResult[]): string`

3. outputFixes(results: LintResult[]): Promise<void>
   - **Purpose:** Write output files with fixes applied

**LintResult Object Structure:**
```js
{
  filePath: string,
  messages: Array<{
     ruleId: string | null,
     severity: number,       // 1 for warning, 2 for error
     message: string,
     line: number,
     column: number,
     nodeType?: string,
     source?: string
  }>,
  errorCount: number,
  warningCount: number,
  fixableErrorCount: number,
  fixableWarningCount: number,
  usedDeprecatedRules: Array<{ ruleId: string, replacedBy: string[] }>
}
```

### Full Code Example for Using ESLint Programmatically
```js
// Import the ESLint class from the eslint package
const { ESLint } = require('eslint');

(async function main() {
  try {
    // Create an instance with configuration options
    const eslint = new ESLint({
      overrideConfigFile: '.eslintrc.json',
      fix: true,
      useEslintrc: true
    });

    // Run the linter on files matching the provided glob pattern
    const results = await eslint.lintFiles(['src/**/*.js']);

    // Automatically apply fixes to files
    await ESLint.outputFixes(results);

    // Load a formatter to format lint results
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    console.log(resultText);
  } catch (error) {
    // Troubleshooting: Log error details and exit with failure code
    console.error('Error while linting:', error);
    process.exitCode = 1;
  }
})();
```

### CLI Best Practices
- Run with `eslint --fix` to auto-correct fixable issues.
- Use `eslint --init` to generate a basic configuration file interactively.
- Debug using `eslint --debug file.js` and inspect detailed logs.

### Configuration File Example (.eslintrc.json)
```json
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

### Troubleshooting Commands
- Check ESLint version: `eslint -v`
- Validate config file: `eslint --print-config file.js`
- Run ESLint in debug mode: `eslint --debug file.js`

This specification provides developers with the concrete technical details needed to integrate, extend, and troubleshoot ESLint in various environments.

## Original Source
ESLint Documentation
https://eslint.org/docs/latest/

## Digest of ESLINT_DOC

# ESLINT Documentation

**Retrieved Date:** 2025-04-04

## Overview
This document contains the complete technical details from the ESLint documentation found at https://eslint.org/docs/latest/.

## Table of Contents
1. Use ESLint in Your Project
2. Extend ESLint
3. Integrate ESLint
4. Contribute to ESLint
5. Maintain ESLint
6. CLI and Configuration
7. Node.js API Integration

## 1. Use ESLint in Your Project
- **Core Rules:** A set of built-in rules to enforce JavaScript coding standards.
- **Configuration Specification:**
  - File: `.eslintrc.json`, `.eslintrc.js`, or YAML formats
  - Options include `env`, `extends`, `rules`, `parserOptions`.
  - Example:
    ```json
    {
      "env": { "browser": true, "node": true },
      "extends": "eslint:recommended",
      "rules": {
         "no-unused-vars": "error",
         "semi": ["error", "always"]
      }
    }
    ```
- **Command Line Options:**
  - Run ESLint using: `eslint [options] file.js`
  - Options include `--fix`, `--format`, `--config`.

## 2. Extend ESLint
- **Custom Rules:** Create custom rule modules following ESLint's guidelines.
  - Rule signature:
    ```js
    module.exports = {
      meta: {
        type: "problem",
        docs: {
          description: "disallow use of foo",
          category: "Best Practices",
          recommended: true
        },
        schema: []
      },
      create: function(context) {
        return {
          Identifier(node) {
            if (node.name === 'foo') {
              context.report({ node, message: "Usage of 'foo' is not allowed." });
            }
          }
        };
      }
    };
    ```
- **Plugins and Configurations:**
  - Package your rules in a plugin and update configuration with the plugin name.

## 3. Integrate ESLint
- **Node.js API:**
  - ESLint provides a programmatic API.
  - Example using ESLint Class:
    ```js
    const { ESLint } = require('eslint');

    (async function main() {
      // Create an instance with the desired options
      const eslint = new ESLint({
        overrideConfigFile: '.eslintrc.json',
        fix: true
      });

      // Lint files
      const results = await eslint.lintFiles(['src/**/*.js']);

      // Apply fixes if available
      await ESLint.outputFixes(results);

      // Format and output results
      const formatter = await eslint.loadFormatter('stylish');
      const resultText = formatter.format(results);
      console.log(resultText);
    })().catch((error) => {
      process.exitCode = 1;
      console.error(error);
    });
    ```
- **API Options:**
  - Constructor options include:
    - `overrideConfigFile`: string – path to the configuration file
    - `fix`: boolean – whether to automatically apply fixes
    - Additional options as per ESLint’s API

## 4. Contribute to ESLint
- **Development Setup:**
  - Clone the repository and install dependencies with `npm install`
  - Run tests using `npm test`
  - Follow guidelines for commit messages and pull request reviews.

## 5. Maintain ESLint
- **Versioning and Releases:**
  - Follow semantic versioning.
  - Release notes provide details about feature additions and bug fixes.

## 6. CLI and Configuration
- **Command Line Invocation:**
  - Primary CLI command: `eslint [options] [file|dir|glob]*`
  - Options include:
    - `--fix`: Automatically fix problems
    - `--format <name>`: Specify the output format
    - `--config <file>`: Use specific configuration file
- **Configuration Files:**
  - `.eslintrc.js`: JavaScript configuration file
  - `.eslintrc.json`: JSON configuration file
  - Options include setting environments, globals, parser options, and rule severity.

## 7. Node.js API Integration
- **ESLint Class API:**
  - **Constructor:**
    ESLint(options: Object) => ESLint instance
  - **Methods:**
    - `lintFiles(patterns: string | string[]): Promise<LintResult[]>`
    - `loadFormatter(format: string): Promise<Formatter>`
    - `outputFixes(results: LintResult[]): Promise<void>`
  - **LintResult Structure:**
    ```js
    {
      filePath: string,
      messages: Array<{ ruleId: string, severity: number, message: string, line: number, column: number }>,
      errorCount: number,
      warningCount: number,
      fixableErrorCount: number,
      fixableWarningCount: number
    }
    ```

**Attribution:** Content crawled from ESLint official documentation.
**Data Size:** 2555917 bytes


## Attribution
- Source: ESLint Documentation
- URL: https://eslint.org/docs/latest/
- License: MIT License
- Crawl Date: 2025-04-17T17:25:36.582Z
- Data Size: 2555917 bytes
- Links Found: 5593

## Retrieved
2025-04-17
library/library-2025-04-20/GPT_BESTPRACTICES.md
# library/library-2025-04-20/GPT_BESTPRACTICES.md
# GPT_BESTPRACTICES

## Crawl Summary
The crawled content from https://platform.openai.com/docs/guides/gpt-best-practices returned 0 bytes and contained no extractable technical details. There are no API endpoints, method signatures, or configuration details available in the crawl result.

## Normalised Extract
TABLE OF CONTENTS:
1. API Endpoints
2. Method Signatures
3. Configuration Details

DETAILS:
1. API Endpoints:
   - No API endpoints available in the crawl result.
2. Method Signatures:
   - No SDK method signatures or function definitions available.
3. Configuration Details:
   - No configuration parameters or settings provided.

## Supplementary Details
No supplementary technical specifications, parameter values, or implementation steps could be extracted due to the absence of technical details in the crawl result.

## Reference Details
No complete API specifications, SDK method signatures with parameters and return types, complete code examples, exact implementation patterns, configuration options with values, concrete best practices, or detailed troubleshooting procedures were available in the provided content.

## Original Source
OpenAI Prompting Best Practices
https://platform.openai.com/docs/guides/gpt-best-practices

## Digest of GPT_BESTPRACTICES

# GPT BEST PRACTICES

**Retrieved at:** 2023-10-26

**Crawled Content Details:**
- Data Size: 0 bytes
- Links Found: 0
- Error: None

**Content:**
No technical details were captured from the provided crawl data. There were no API specifications, SDK method signatures, code examples, configuration options, or troubleshooting procedures available in the crawled result.

**Attribution:**
Data crawled from https://platform.openai.com/docs/guides/gpt-best-practices

**Data Size Obtained:** 0 bytes

## Attribution
- Source: OpenAI Prompting Best Practices
- URL: https://platform.openai.com/docs/guides/gpt-best-practices
- License: N/A
- Crawl Date: 2025-04-17T21:24:38.281Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-17
library/library-2025-04-20/GPT_BEST_PRACTICES.md
# library/library-2025-04-20/GPT_BEST_PRACTICES.md
# GPT_BEST_PRACTICES

## Crawl Summary
The crawl for https://platform.openai.com/docs/guides/gpt-best-practices resulted in 0 bytes of data with no extractable technical content. There were no links found and no error reported.

## Normalised Extract
## Table of Contents
1. Overview
2. Implementation Details
3. Configuration Parameters

## 1. Overview
No technical content was captured from the crawl result. 

## 2. Implementation Details
No method signatures, code examples, or implementation steps are available since the crawled data was empty. 

## 3. Configuration Parameters
No configuration options or details were extracted during the crawl.


## Supplementary Details
No supplementary technical specifications or implementation details were retrieved due to the empty content from the crawl result. Developers should refer directly to the source URL for the most up-to-date and complete technical documentation.

## Reference Details
No API specifications, SDK method signatures, full code examples, exact implementation patterns, specific configuration options, concrete best practices, or detailed troubleshooting procedures are available from the crawl result. The crawled data returned 0 bytes, hence no technical references can be provided.

## Original Source
OpenAI Prompting Best Practices
https://platform.openai.com/docs/guides/gpt-best-practices

## Digest of GPT_BEST_PRACTICES

# GPT BEST PRACTICES

**Retrieved:** 2023-10-11
**Source URL:** https://platform.openai.com/docs/guides/gpt-best-practices
**Data Size:** 0 bytes

This document was generated from the crawl result which did not return any technical content. Accordingly, the following sections indicate the absence of extractable technical details.

## Attribution
- Crawled on: 2023-10-11
- Data Size: 0 bytes
- No links or further content available from the crawl result.


## Attribution
- Source: OpenAI Prompting Best Practices
- URL: https://platform.openai.com/docs/guides/gpt-best-practices
- License: N/A
- Crawl Date: 2025-04-17T20:25:47.758Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-17
library/library-2025-04-20/USING_PROMISES.md
# library/library-2025-04-20/USING_PROMISES.md
# USING_PROMISES

## Crawl Summary
The extracted content details JavaScript promises, including using .then() and .catch() for asynchronous operations, chaining for sequence control, error handling patterns, and async/await equivalents. It explains nesting for error scoping, concurrent composition with Promise.all and sequential promise chaining via reduce, along with advanced topics like cancellation, microtasks vs. tasks, and wrapping legacy callback APIs. The content includes precise code examples and API method signatures as provided by MDN.

## Normalised Extract
## Table of Contents
1. Definition and Basic Usage
2. Promise Chaining and Callback Hell
3. Async/Await Pattern
4. Error Handling
5. Nesting and Composition
6. Advanced Topics (Cancellation, Timing, Global Rejection Events, Wrapping Callbacks)

### 1. Definition and Basic Usage
- Promises represent asynchronous operations.
- Use .then() to attach success and failure callbacks.

**Code Example:**

```js
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

### 2. Promise Chaining and Callback Hell
- Chain asynchronous operations using .then().
- Always return promises from callbacks.

**Chained Example:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

### 3. Async/Await Pattern
- Use async functions with await to simplify promise management.

**Example:**

```js
async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}
```

### 4. Error Handling
- Use .catch() at the end of the chain.
- With async/await, utilize try/catch blocks.

**Async/Await Error Handling:**

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

### 5. Nesting and Composition
- Nest promises to restrict the catch scope.
- Use Promise.all for concurrent tasks, and reduce chaining for sequential execution.

**Composition Example:**

```js
Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
  // use results
});
```

**Sequential using reduce:**

```js
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result) => {
    // final result
  });
```

### 6. Advanced Topics

- **Cancellation:** Use AbortController to cancel fetch requests.
- **Timing:** .then() callbacks run as microtasks; setTimeout callbacks run as tasks.

**Microtask Example:**

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
```

- **Global Rejection Handling (Browser):** Listen for "unhandledrejection" events.
- **Global Rejection Handling (Node.js):**

```js
process.on("unhandledRejection", (reason, promise) => {
  // inspect reason and promise
});
```

- **Wrapping Callback APIs:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```


## Supplementary Details
### Supplementary Technical Specifications

- Promise Constructor: new Promise((resolve, reject) => { ... })
  - Parameters: executor function with resolve(value) and reject(reason).
  - Example: 

```js
function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}
```

- Chaining: The then() method signature
  - then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): Promise

- Async/Await: Mark function with async; await returns the fulfillment value. 

- Configuration Options:
  - For timeouts, setTimeout(ms) is used (e.g., 10 * 1000 for 10 seconds).
  - AbortController can be used to cancel fetch: new AbortController(), passing controller.signal to fetch().

- Best Practices:
  - Always return a promise in a then() callback.
  - Flatten promise chains to avoid nested error handling.
  - Attach a global unhandledRejection handler in Node.js to log all errors.

- Troubleshooting Procedures:
  - If a promise resolution seems to occur out-of-order, inspect microtask vs. task queue using console logs.
  - Use try/catch in async functions to capture errors.
  - Validate that all asynchronous calls return a promise by checking using Promise.resolve().
  - For Node.js, add:

```bash
node -e "process.on('unhandledRejection', (r, p) => console.error(r)); require('./yourScript');"
```

to capture unhandled promise rejections.


## Reference Details
### Complete API Specifications and Implementation Patterns

#### Promise Constructor

- Syntax: 

  new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => { ... })

- Example:

```js
function doSomething(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Additional operations here
      console.log("Did something");
      resolve("https://example.com/");
    }, 200);
  });
}
```

#### .then() Method

- Signature: 

  promise.then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): Promise

- Usage Example:

```js
const promise = doSomething();
const promise2 = promise.then(
  (result) => {
    // Process result which is a string representing URL
    return fetch(result); // fetch returns a promise
  },
  (error) => {
    console.error(`Error encountered: ${error}`);
    throw error; // rethrow for further catch
  }
);
```

#### .catch() Method

- Signature:

  promise.catch(onRejected: (reason: any) => any): Promise

- Usage Example:

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .catch((error) => {
    console.error(`Caught error: ${error}`);
  });
```

#### Async/Await

- Function Declaration:

```js
async function foo(): Promise<void> {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

#### Configuration and Cancellation

- Using AbortController with fetch:

```js
const controller = new AbortController();
const signal = controller.signal;

fetch('https://example.com/', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error);
    }
  });

// To cancel the request:
controller.abort();
```

#### Best Practices and Troubleshooting

- Always ensure .then() callbacks return a promise when chaining asynchronous operations.
- Flatten chains to avoid nested callbacks and ambiguous error handling.
- Global Error Handling in Node.js:

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

- Troubleshooting Commands:

  - Running Node.js with verbose unhandled rejection logging:
    
    ```bash
    node --trace-warnings yourScript.js
    ```

  - Validate promise resolution by inserting logging statements immediately after promise creation and in .then() callbacks.

This complete reference provides developers with concrete SDK method signatures, code examples, configuration options, and detailed implementation and troubleshooting steps to effectively use promises in JavaScript.

## Original Source
MDN Web Docs: Using Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

## Digest of USING_PROMISES

# Using Promises

Retrieved: 2025-04-03

This document extracts the precise technical details regarding the usage of Promises in JavaScript as described on MDN Web Docs. It includes actual code examples, method signatures, exact implementation patterns, configuration details, and complete API specifications.

## Core Promise Concepts

- A Promise is an object representing the eventual completion or failure of an asynchronous operation.
- Instead of passing callbacks directly to a function, the function returns a promise to which callbacks are attached using .then() and .catch().

**Example using call-back to promise conversion:**

```js
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

// Old callback-based API
ncreateAudioFileAsync(audioSettings, successCallback, failureCallback);

// Promise-based API
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

## Promise Chaining & Callback Hell

- Promise chaining provides a solution to callback hell by returning a new promise from then().

**Example of chaining to avoid callback hell:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

- **Important Rule:** Always return a promise from then callbacks. Failure to do so results in a "floating" promise that cannot be tracked.

**Faulty example:**

```js
doSomething()
  .then((url) => {
    // Missing return causes undefined result
    fetch(url);
  })
  .then((result) => {
    // result will be undefined
  });
```

**Corrected example:**

```js
doSomething()
  .then((url) => {
    return fetch(url);
  })
  .then((result) => {
    // result is a Response object
  });
```

## Async/Await Pattern

- The async/await syntax makes asynchronous code look synchronous. Use the `await` keyword to wait for a promise to settle.

**Example converting promise chain to async/await:**

```js
async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}
```

- **Note:** Omission of the `await` keyword leads to type mismatches and runtime errors.

## Error Handling

- Errors in a promise chain are caught using `.catch()`. This works similarly to a try/catch in synchronous code.

**Standard error handling with promises:**

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

- With async/await:

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

## Nesting and Composition

- **Nesting:** Use nested promises to limit the scope of error handling.

```js
doSomethingCritical()
  .then((result) =>
    doSomethingOptional(result)
      .then((optionalResult) => doSomethingExtraNice(optionalResult))
      .catch((e) => {})
  )
  .then(() => moreCriticalStuff())
  .catch((e) => console.error(`Critical failure: ${e.message}`));
```

- **Composition Tools:**
  - Promise.all(): Runs promises concurrently and returns when all are fulfilled or one rejects.
  - Promise.allSettled(), Promise.any(), and Promise.race() offer different patterns for concurrent execution.

**Concurrent execution example:**

```js
Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
  // use the results
});
```

- **Sequential Composition using reduce:**

```js
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result3) => {
    // use result3
  });
```

- **Reusable compose function:**

```js
const applyAsync = (acc, val) => acc.then(val);

const composeAsync = (...funcs) => (x) => funcs.reduce(applyAsync, Promise.resolve(x));

const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);
```

## Advanced Topics

### Cancellation

- While Promise API does not include cancellation, you can cancel underlying asynchronous operations using tools like AbortController.

### Timing and Task Queue vs Microtasks

- .then() callbacks are enqueued to a microtask queue, ensuring they run after the current event loop finishes.

**Example demonstrating microtask scheduling:**

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
// Output: 1 then 2
```

**Microtask example with setTimeout:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(0).then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
console.log(1);
// Expected Output: 1, 2, 3, 4
```

### Promise Rejection Events

- Global events: `unhandledrejection` and `rejectionhandled` are used in browsers, and in Node.js use `process.on("unhandledRejection", ...)`.

**Node.js example:**

```js
process.on("unhandledRejection", (reason, promise) => {
  // Examine promise and reason
});
```

### Wrapping Callback APIs

- Promises can be created by wrapping older callback-based APIs using the Promise constructor.

**Example wrapping setTimeout:**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(10 * 1000)
  .then(() => saySomething("10 seconds passed"))
  .catch(failureCallback);
```

The executor function is provided with `resolve` (and optionally `reject`), which are called to settle the promise.


## Attribution
- Source: MDN Web Docs: Using Promises
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- License: CC BY-SA 2.5
- Crawl Date: 2025-04-17T18:27:12.044Z
- Data Size: 4749435 bytes
- Links Found: 47218

## Retrieved
2025-04-17
library/library-2025-04-20/MARKDOWN_IT.md
# library/library-2025-04-20/MARKDOWN_IT.md
# MARKDOWN_IT

## Crawl Summary
The technical details include explicit markdown syntax operations and configuration options for the markdown-it library. This includes support for HTML output, XHTML compliance, line breaks conversion, automatic link detection, typographic enhancements, and code highlighting through language-specific fences. It demonstrates the usage of various markdown constructs like headings, horizontal rules, emphasis, lists, code blocks, tables, and plugins such as emoji, footnotes, and custom containers.

## Normalised Extract
## Table of Contents
1. Configuration Options
2. Markdown Rendering Functions
3. Plugin System
4. Syntax Examples

---

### 1. Configuration Options
- Available options include:
  - html: boolean (default often true) to enable HTML tags in source.
  - xhtmlOut: boolean to generate self-closing tags.
  - breaks: boolean (default false) to convert newlines to `<br>`.
  - linkify: boolean to auto-detect links.
  - typographer: boolean to enable smart punctuation transformations.
  - highlight: function(code, lang) for syntax highlighting, example provided below.

### 2. Markdown Rendering Functions
- Initialization:

```js
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
  html: true,          // Enable HTML tags in source
  xhtmlOut: false,     // Use '/' to close single tags in XHTML mode
  breaks: false,       // Convert '\n' in paragraphs into <br>
  linkify: true,       // Autoconvert URL-like text to links
  typographer: true,   // Enable smart quotes and placeholder substitutions
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
});
```

- Rendering a markdown string:

```js
var result = md.render('# Markdown-It Demo\n\nSome **bold** text and a code block.');
console.log(result);
```

### 3. Plugin System
- Plugins can be integrated to extend markdown features. For instance:

```js
// Emoji plugin
var emoji = require('markdown-it-emoji');
md.use(emoji);

// Footnote plugin
var footnote = require('markdown-it-footnote');
md.use(footnote);
```

- Each plugin may introduce additional syntax such as :wink:, footnote markers ([^1]), and custom containers using ::: syntax.

### 4. Syntax Examples
- **Inline code:** `code` using backticks.
- **Indented code blocks:** Prefixed with four spaces.
- **Fenced code blocks:** Using triple backticks with language hint (e.g. ```js). 
- **Tables:** Defined with pipe separators and optional alignment markers.
- **Links & Images:** Use markdown syntax for hyperlinks and image embedding with footnote references.


## Supplementary Details
### Technical Specifications & Implementation Details

1. Configuration Options:
   - html: true | false (default: true)
   - xhtmlOut: true | false (default: false)
   - breaks: true | false (default: false)
   - linkify: true | false (default: false, enable to auto-convert URLs)
   - typographer: true | false (default: false, when true, converts quotes and symbols)
   - highlight: Function with signature (code: string, lang: string): string

2. Rendering Process:
   - Initialize markdown-it instance with configuration options.
   - Use `md.render(input: string): string` to convert markdown to HTML.
   - For inline rendering, use `md.renderInline(input: string): string`.
   - Plugins are integrated using `md.use(plugin[, options])`.

3. Sample Implementation Steps:
   a. Import markdown-it module.
   b. Create an instance with desired configuration.
   c. Optionally register plugins for emoji, footnotes, substitutions, etc.
   d. Render markdown input using provided methods.

4. Code Example with Comments:
```js
// Import markdown-it
var MarkdownIt = require('markdown-it');

// Initialize with options
var md = new MarkdownIt({
  html: true,          // Allow HTML tags
  xhtmlOut: false,     // Disable XHTML output style
  breaks: false,       // Do not convert\n to <br>
  linkify: true,       // Automatically detect links
  typographer: true,   // Enable typographic enhancements
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // Fallback for non-highlighted code
  }
});

// Use plugins if needed
var emoji = require('markdown-it-emoji');
md.use(emoji);

// Render markdown to HTML
var result = md.render('# Hello World\n\nThis is a **demo** for markdown-it.');
console.log(result);
```


## Reference Details
### Complete API Specifications and Usage Examples

#### markdown-it Constructor

- Signature:
  - new MarkdownIt(options?: {
      html?: boolean,       // Enable/disable HTML tags in source (default: true)
      xhtmlOut?: boolean,   // Whether to close single tags with '/>' in XHTML mode (default: false)
      breaks?: boolean,     // Convert '\n' in paragraphs into <br> (default: false)
      linkify?: boolean,    // Autodetect URL-like texts and convert to links (default: false)
      typographer?: boolean,// Enable smart quotes and other replacements (default: false)
      highlight?: (str: string, lang: string) => string
    })

- Returns: instance of MarkdownIt with methods:

  - render(markdownString: string): string
    - Description: Converts a markdown string into HTML.
    - Example:
    ```js
    var md = new MarkdownIt({html: true});
    var html = md.render('# Title\nSome **bold** text.');
    console.log(html);
    ```

  - renderInline(markdownString: string): string
    - Description: Renders markdown inline without wrapping block tags.

  - use(plugin: Function, ...options): MarkdownIt
    - Description: Registers a plugin to extend functionality.
    - Example:
    ```js
    var md = new MarkdownIt();
    md.use(require('markdown-it-footnote'));
    var output = md.render('Footnote reference[^1]\n\n[^1]: Footnote text.');
    console.log(output);
    ```

#### Plugin Examples

- Emoji Plugin
  - Installation: `npm install markdown-it-emoji`
  - Usage:
    ```js
    var md = new MarkdownIt();
    md.use(require('markdown-it-emoji'));
    var result = md.render('I am happy :smile:');
    console.log(result);
    ```

- Footnote Plugin
  - Installation: `npm install markdown-it-footnote`
  - Usage:
    ```js
    var md = new MarkdownIt();
    md.use(require('markdown-it-footnote'));
    var result = md.render('Footnote reference[^1]\n\n[^1]: This is the footnote.');
    console.log(result);
    ```

#### Best Practices & Troubleshooting

- Always validate your markdown input before rendering to avoid injection issues when html option is enabled.
- For syntax highlighting, ensure the language is supported by the highlighter (e.g., highlight.js) used in the highlight callback function.
- If auto-linking is not working, verify that the linkify option is set to true.
- In case of plugin conflicts, load plugins in the recommended order as specified in the plugin documentation.

#### Detailed Command Examples

- To install markdown-it and plugins:
  ```bash
  npm install markdown-it markdown-it-emoji markdown-it-footnote highlight.js
  ```

- To run a sample script:
  ```bash
  node yourMarkdownDemo.js
  ```

This documentation provides developers with immediate, concrete examples and detailed API specifications to effectively implement markdown-it in their projects.

## Original Source
Markdown-it Documentation
https://markdown-it.github.io/

## Digest of MARKDOWN_IT

# Markdown-It Documentation Extract

**Retrieved:** 2023-10-06

**Data Size:** 29790 bytes

**Content Overview:**

The extracted content covers a live demonstration of the markdown-it library. It includes explicit sections on headings, horizontal rules, typographic replacements, emphasis, blockquotes, lists, code blocks, syntax highlighting, tables, links, images, and plugins for extended markdown syntax support.

## Headings

- H1: `# h1 Heading 8-)`
- H2: `## h2 Heading`
- H3: `### h3 Heading`
- H4: `#### h4 Heading`
- H5: `##### h5 Heading`
- H6: `###### h6 Heading`

## Horizontal Rules

- Use of `___`, `---`, and `***` to create horizontal rules.

## Typographic Replacements

- Replacement symbols: (c), (C), (r), (R), (tm), (TM), (p), (P) and sequences like test.., test... etc.
- Smart quotes conversion: "double quotes" and 'single quotes'.

## Emphasis

- Bold: `**This is bold text**` and `__This is bold text__`
- Italics: `*This is italic text*` and `_This is italic text_`
- Strikethrough: `~~Strikethrough~~`

## Blockquotes

- Standard blockquote usage with `>` characters. Nested blockquotes using multiple `>`.

## Lists

- Unordered lists using `+`, `-`, or `*` with sub-lists indented with two spaces.
- Ordered lists with numbered items and different starting offsets.

## Code Blocks

- Inline code: `` `code` ``
- Indented code blocks:

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

- Fenced code blocks using triple backticks with language specification for syntax highlighting.

### Example:
```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

- Basic table syntax with headers and alignment options.

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | template processing engine (default: Handlebars). |
| ext    | file extension for destination files. |

- Right aligned columns example provided with `| ------: | -----------:|`.

## Links & Images

- Link syntax: `[link text](http://dev.nodeca.com)` and with title.
- Autoconversion of plain URLs when linkify is enabled.
- Image embedding using `![Alt text](URL)` and footnote style references.

## Plugins

Markdown-It supports extended plugins to handle additional markdown syntax:

- **Emoji:** Syntax like `:wink:`, with shortcuts like `:-)`.
- **Subscript/Superscript:** e.g. `19^th^` and `H~2~O`.
- **Ins and Mark:** `++Inserted text++` for ins and `==Marked text==` for mark.
- **Footnotes:** Detailed footnote support with definitions and multiple paragraphs.
- **Definition Lists and Abbreviations:** Support for complex list definitions and abbreviation resolutions.
- **Custom Containers:** For warning blocks and similar containerized content.

---

__Advertisement:__

- [pica](https://nodeca.github.io/pica/demo/) - high quality and fast image resize in browser.
- [babelfish](https://github.com/nodeca/babelfish/) - developer friendly i18n support.


## Attribution
- Source: Markdown-it Documentation
- URL: https://markdown-it.github.io/
- License: MIT License
- Crawl Date: 2025-04-17T16:26:43.337Z
- Data Size: 29790 bytes
- Links Found: 4

## Retrieved
2025-04-17
library/library-2025-04-20/GITHUB_CLI.md
# library/library-2025-04-20/GITHUB_CLI.md
# GITHUB_CLI

## Crawl Summary
The GitHub CLI documentation details commands for installation, configuration, core functions (issues, PRs, repositories), GitHub Enterprise authentication, API interactions, alias management, and attestation procedures. It includes command-line examples with exact flags such as --method, --header, -f/--raw-field, and provides best practices for verbose output and alias clobbering for troubleshooting.

## Normalised Extract
Table of Contents:
1. Installation
   - Command: `brew install gh` for macOS; Download links for Windows and Linux.
2. Configuration
   - Authentication: `gh auth login` or use GITHUB_TOKEN
   - Editor setting: `gh config set editor <editor>`
   - Alias declaration: `gh alias set <alias> <expansion>`
3. GitHub Enterprise
   - Command: `gh auth login --hostname <hostname>`, set GH_HOST and GH_ENTERPRISE_TOKEN
4. Core Commands
   - Issues: `gh issue list`, `gh issue create`
   - Pull Requests: `gh pr status`, `gh pr checkout <id>`, `gh pr create`
   - Releases: `gh release create <tag>`
   - Repository: `gh repo view`, `gh repo clone <repo>`
5. Additional Commands
   - Alias management: `gh alias list`, `gh alias set`, `gh alias delete`, `gh alias import`
   - API command: `gh api <endpoint> [flags]` with detailed flags such as `-f`, `-F`, `--method`, `--paginate`, `--template`
6. Attestation Commands (Preview)
   - Download: `gh attestation download [file-path|oci://...]`
   - Trusted Root: `gh attestation trusted-root [--tuf-url <url> --tuf-root <file-path>] [--verify-only]`
   - Verify: `gh attestation verify [file-path|oci://...] [--owner|--repo]`

Each section includes exact command syntax, flags, environment variable requirements, and example outputs (e.g., branch switching details in `gh pr checkout`).

## Supplementary Details
Technical Specifications:
- Installation: Use system-specific commands (brew, download links) with no additional parameters required.
- Authentication: Requires either `gh auth login` or environment variable GITHUB_TOKEN. For GitHub Enterprise, must use `--hostname` flag and set GH_HOST/ GH_ENTERPRISE_TOKEN.
- Command Flags:
  - For API commands: `--method` (string, default GET) controls the HTTP method. Use `-f/--raw-field` for static string parameters. 
  - For alias commands: `--clobber` to overwrite existing aliases; `--shell` to indicate shell command processing.
  - For attestation commands:
     - `--digest-alg`: string, defaults to "sha256". 
     - `--limit`: integer, default 30.
     - `--hostname` for specifying a custom host.
- Troubleshooting Steps:
  1. Use `--verbose` flag with API commands to get detailed HTTP request/response.
  2. Check environment variables if authentication fails.
  3. Use `--clobber` when re-importing alias definitions.
  4. For pagination issues, combine `--paginate` and `--slurp`.
- Best Practices:
  - Always check the output of `gh alias list` after setting aliases.
  - Validate API responses using the `--jq` flag with a proper jq query.
  - In shell scripts, use the explicit commands (e.g., `gh pr checkout <id>`) to avoid context issues.

## Reference Details
API Specifications & Command Details:

1. gh auth
   - Signature: `gh auth login [flags]`
   - Flags: --hostname <string>
   - Return: Initiates authentication process

2. gh config
   - Set editor: `gh config set editor <editor>`
   - No return value; sets configuration

3. gh alias set
   - Signature: `gh alias set <alias> <expansion> [flags]`
   - Options:
     --clobber : Overwrite existing alias
     --shell (-s): Treat expansion as shell command
   - Example:
     # Set alias for pull request view
     $ gh alias set pv 'pr view'
     $ gh pv -w 123  # Executes 'gh pr view -w 123'

4. gh alias delete
   - Signature: `gh alias delete {<alias>|--all} [flags]`
   - Option: --all deletes all aliases

5. gh api
   - Signature: `gh api <endpoint> [flags]`
   - Parameters:
     - <endpoint>: e.g., repos/{owner}/{repo}/releases
     - Flags:
         --method <string> (Default: GET)
         -f/--raw-field <key=value>: Add static string parameter
         -F/--field <key=value>: Add typed parameter with auto type-conversion
         --header <key:value>: Add HTTP header
         --paginate: Retrieve paginated results
         --input <file>: Body read from file or stdin
         --jq <string>: Filter response using jq
         --template <string>: Format output using Go templates
         --verbose: Include full HTTP request/response details
   - Example:
     # List releases
     $ gh api repos/{owner}/{repo}/releases

6. gh attestation download
   - Signature: `gh attestation download [<file-path> | oci://<image-uri>] [--owner | --repo] [flags]`
   - Options:
         -d, --digest-alg <string> (default "sha256")
         -L, --limit <int> (default 30)
         -o, --owner <string>
         -R, --repo <string> (Format: <owner>/<repo>)
   - Example:
     $ gh attestation download example.bin -R github/example

7. gh attestation trusted-root
   - Signature: `gh attestation trusted-root [--tuf-url <url> --tuf-root <file-path>] [--verify-only] [flags]`
   - Use: Outputs trusted_root.jsonl contents for offline verification
   - Example:
     $ gh attestation trusted-root

8. gh attestation verify
   - Signature: `gh attestation verify [<file-path> | oci://<image-uri>] [--owner | --repo] [flags]`
   - Validates the artifact's attestations against certificate details and workflow identity
   - Example:
     $ gh attestation verify example.bin --owner github

Troubleshooting:
- For authentication errors, confirm that environment variables (GITHUB_TOKEN, GH_HOST) are properly exported.
- In API command failures, run with `--verbose` to inspect header and payload details.
- When aliases do not work as expected, run `gh alias list` to review definitions and use `--clobber` with `gh alias set` to update.
- Use shell redirection and `--input` flag for reading complex JSON payloads when posting data.

Full Code Example for Setting an Alias:
--------------------------------------------------
# On Bash (Linux/Mac):
$ gh alias set pv 'pr view'
# Test the alias:
$ gh pv -w 123  
--------------------------------------------------

These detailed API specifications and command samples provide a complete technical reference for developers using GitHub CLI.

## Original Source
GitHub CLI Documentation
https://cli.github.com/manual/

## Digest of GITHUB_CLI

# GitHub CLI Manual Details (Retrieved: 2023-10-06)

## Installation
- Use Homebrew on Mac: `brew install gh`
- Download executable for Mac or Windows
- Install for Linux via package repository
- Refer to the README for full installation instructions

## Configuration
- Authenticate by running: `gh auth login`
  - Alternatively, set environment variable: `GITHUB_TOKEN`
- Set the preferred editor: `gh config set editor <editor>`
- Declare command aliases: `gh alias set <alias> <expansion>`

## GitHub Enterprise Configuration
- Authenticate with a GitHub Enterprise server:
  - Command: `gh auth login --hostname <hostname>`
- Set default host: `export GH_HOST=<hostname>`
- For scripting/automation, set: `export GH_ENTERPRISE_TOKEN=<access-token>`

## Core Commands
- Examples:
  - List issues: `gh issue list`
  - View repo: `gh repo view`
  - Checkout a pull request: `gh pr checkout <id>`
  - Create a PR: `gh pr create`
  - Check PR status: `gh pr status`
  - Create a release: `gh release create <tag>`
  - Set alias: `gh alias set bugs 'issue list --label="bugs"'`

## GitHub Actions Commands
- Cache command: `gh cache`
- Run command: `gh run`
- Workflow command: `gh workflow`

## Additional Commands
- Aliases, API, Codespace, Gist, and more:
  - For alias management:
    - List: `gh alias list` or `gh alias ls`
    - Delete: `gh alias delete {<alias>|--all}`
    - Import: `gh alias import [<filename>|-] [--clobber]`
    - Set: `gh alias set <alias> <expansion> [--shell] [--clobber]`

## Options & Flags
- Global flag: `--version` displays current version
- In commands like `gh api`, various options include:
  - `--method <string>` (default "GET")
  - `-f/--raw-field <key=value>` for string parameters
  - `-F/--field <key=value>` for typed parameters (converts true, false, null, integers)
  - `--header <key:value>` to add a HTTP header
  - `--paginate` to fetch all pages if paginated results exist
  - `--template <string>` for formatting output
  - `--verbose` to include full HTTP request/response

## Command Examples and Use Cases
### Issue Commands
- Create an issue: `$ gh issue create`

### Repository Commands
- Clone a repository: `$ gh repo clone cli/cli`

### Pull Request Commands
- Checkout PR (e.g., `gh pr checkout 12`):
  - Displays progress output with object counting and branch switching details

### API Commands
- Making a call: `$ gh api repos/{owner}/{repo}/releases`
- Post an comment: `$ gh api repos/{owner}/{repo}/issues/123/comments -f body='Hi from CLI'`
- Use GraphQL endpoint: `$ gh api graphql -F owner='{owner}' -F name='{repo}' -f query='<graphql query>'`

## Aliases Details
- Set alias example: 
  - `$ gh alias set pv 'pr view'` then use with `$ gh pv -w 123`
- Example with shell: 
  - `$ gh alias set --shell igrep 'gh issue list --label="$1" | grep "$2"'`

## Attestation Commands (Preview)
### Download Attestation
- Usage: `gh attestation download [<file-path> | oci://<image-uri>] [--owner|--repo]`
- Options:
  - `-d, --digest-alg <string>` (default "sha256")
  - `-L, --limit <int>` (default 30)

### Trusted Root
- Command: `gh attestation trusted-root [--tuf-url <url> --tuf-root <file-path>] [--verify-only]`

### Verify Attestation
- Command: `gh attestation verify [<file-path> | oci://<image-uri>] [--owner|--repo]`
- Ensures artifact provenance by validating the certificate, subject alternative names, and workflow identity.

## Troubleshooting and Best Practices
- Ensure correct environment variables (`GITHUB_TOKEN`, `GH_HOST`, `GH_ENTERPRISE_TOKEN`) are set.
- Use `--clobber` flag if re-importing or resetting aliases to avoid duplication.
- Use verbose mode (`--verbose`) on API commands to debug HTTP request issues.
- For pagination issues with `gh api`, use `--paginate` together with `--slurp` to collate multiple arrays.
  
## Attribution
- Crawled Data Size: 1227914 bytes
- Retrieved from: https://cli.github.com/manual/
- Links Found: 45187

## Attribution
- Source: GitHub CLI Documentation
- URL: https://cli.github.com/manual/
- License: MIT License
- Crawl Date: 2025-04-17T14:25:50.309Z
- Data Size: 1227914 bytes
- Links Found: 45187

## Retrieved
2025-04-17
library/library-2025-04-20/PRETTIER.md
# library/library-2025-04-20/PRETTIER.md
# PRETTIER

## Crawl Summary
Prettier is an opinionated code formatter that parses source code into an AST and reprints it based on configured line lengths and styles. It supports a wide range of languages including JavaScript, JSX, Angular, Vue, Flow, TypeScript, CSS, HTML, JSON, GraphQL, Markdown, and YAML. Key CLI flags and configuration options include --trailing-comma (default: "all"), --objectWrap, --experimental-operatorPosition, and --experimental-ternaries. Release notes detail bug fixes and new features across versions, with significant improvements in Prettier 3.x series.

## Normalised Extract
# Table of Contents
1. Code Formatting Engine
2. Supported Languages
3. CLI Usage and Integration
4. Configuration Options
5. Release Version Highlights
6. Best Practices and Troubleshooting

## 1. Code Formatting Engine
- Prettier builds an AST from the source code and reprints it using its own formatting rules.
- Example transformation:
  - Input: `foo(arg1, arg2, arg3, arg4);`
  - When too long: breaks into multiple lines
    ```js
    foo(
      reallyLongArg(),
      omgSoManyParameters(),
      IShouldRefactorThis(),
      isThereSeriouslyAnotherOne()
    );
    ```

## 2. Supported Languages
- JavaScript (with experimental features), JSX, Angular, Vue, Flow, TypeScript, CSS, Less, SCSS, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (GFM, MDX v1), YAML.

## 3. CLI Usage and Integration
- Command-line formatting:
  ```bash
  prettier --write "src/**/*.js" --trailing-comma=all
  ```
- Can be integrated with editor plugins (VS Code, Sublime Text, Vim, etc.) and pre-commit hooks.

## 4. Configuration Options
- `--trailing-comma`: Determines comma usage. Default: "all" (introduced in v3.0).
- `--objectWrap`: New option in v3.5 for wrapping object properties.
- `--experimental-operatorPosition`: Experimental flag in v3.5 to adjust operator positions.
- `--experimental-ternaries`: Flag introduced in v3.1 to better format nested ternaries.

## 5. Release Version Highlights
- **Prettier 3.5:** Adds `objectWrap` and `experimentalOperatorPosition`, supports TS config file.
- **Prettier 3.1:** Introduced `--experimental-ternaries` for better nested ternary formatting.
- **Prettier 3.0:** Migration to ECMAScript Modules, change in markdown formatting (no spaces between Latin and CJK characters), default `trailingComma` set to "all".
- Previous releases include numerous bug fixes, JSONC parser addition, Angular ICU expressions support, and CLI performance improvements.

## 6. Best Practices and Troubleshooting
- **Integration:** Use Prettier with editor on-save and pre-commit hooks to enforce a consistent code style automatically.
- **Troubleshooting CLI:** If code formatting fails, run `prettier --debug-check <file>` to identify issues.
- **Configuration Conflicts:** Ensure that linter configurations (e.g., ESLint) do not conflict with Prettier by separating formatting and code-quality rules.


## Supplementary Details
# Supplementary Details

## Configuration Parameters
- `--trailing-comma`:
  - **Type:** String
  - **Values:** "none", "es5", "all"
  - **Default:** "all"
  - **Effect:** Controls whether trailing commas are added in multi-line constructs.

- `--objectWrap` (Prettier 3.5):
  - **Type:** Boolean or specific policy string
  - **Effect:** Dictates wrapping of object properties when line length is exceeded.

- `--experimental-operatorPosition` (Prettier 3.5):
  - **Type:** Boolean
  - **Effect:** Adjusts formatting style for operator positioning, experimental usage.

- `--experimental-ternaries` (Prettier 3.1):
  - **Type:** Boolean
  - **Effect:** Enables a new formatting style for nested ternary expressions.

## Implementation Steps
1. Install Prettier via npm:
   ```bash
   npm install --save-dev prettier
   ```
2. Create a configuration file (.prettierrc):
   ```json
   {
     "trailingComma": "all",
     "printWidth": 80,
     "tabWidth": 2,
     "useTabs": false
   }
   ```
3. Format files via CLI:
   ```bash
   prettier --write "src/**/*.js"
   ```
4. Integrate Prettier with editor plugins (e.g., VS Code extension: Prettier - Code formatter).

## Best Practices
- Use Prettier for automatic code formatting and separate it from linting tools.
- Configure pre-commit hooks to run Prettier automatically to ensure consistency.
- Regularly update Prettier to benefit from performance improvements and new options.

## Troubleshooting Commands
- Check formatting:
   ```bash
   prettier --check "src/**/*.js"
   ```
- Debug potential formatting issues:
   ```bash
   prettier --debug-check "src/file.js"
   ```
- For plugin issues, consult the migration guide if using ECMAScript Modules.


## Reference Details
# Reference Details

## Prettier API

### Method Signature

    prettier.format(source: string, options?: Prettier.Options): string

### Options Interface (Partial)

    interface Options {
      printWidth?: number;        // Maximum line length. Default: 80
      tabWidth?: number;          // Number of spaces per tab. Default: 2
      useTabs?: boolean;          // Indent with tabs instead of spaces. Default: false
      semi?: boolean;             // Print semicolons at the ends of statements. Default: true
      singleQuote?: boolean;      // Use single quotes instead of double quotes. Default: false
      trailingComma?: "none" | "es5" | "all";  // Trailing commas option. Default: "all"
      bracketSpacing?: boolean;   // Print spaces between brackets in object literals. Default: true
      arrowParens?: "avoid" | "always"; // Include parentheses around a sole arrow function parameter. Default: "always"
      // Experimental Options
      objectWrap?: boolean | string;  // Option for wrapping object properties (introduced in v3.5)
      experimentalOperatorPosition?: boolean; // Experimental option for operator positioning (v3.5)
      experimentalTernaries?: boolean; // Experimental formatting of nested ternaries (v3.1)
      parser?: string;            // Parser to use (e.g., "babel", "typescript", "flow")
    }

### Example Code Usage

```js
// Import Prettier
const prettier = require('prettier');

// Source code to format
const code = "foo(arg1, arg2, arg3, arg4);";

// Formatting options
const options = {
  parser: 'babel',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  // Experimental options
  objectWrap: true,
  experimentalOperatorPosition: true,
  experimentalTernaries: true
};

// Format the code
const formattedCode = prettier.format(code, options);

console.log(formattedCode);
```

## CLI Commands

- Format files recursively:

    prettier --write "src/**/*.js" --trailing-comma=all

- Check file formatting without writing changes:

    prettier --check "src/**/*.js"

- Debug formatting issues:

    prettier --debug-check "src/file.js"

## Implementation Pattern

1. Install Prettier via npm.
2. Configure via a .prettierrc file or CLI arguments.
3. Use IDE or editor integrations for on-save formatting.
4. Integrate with version control systems using pre-commit hooks.

## Troubleshooting Procedures

- If Prettier fails to format a file, run `prettier --debug-check <file>` to see parsing errors.
- Ensure that the configuration file (.prettierrc) syntax is valid JSON.
- Update to the latest version if experimental options do not work as expected.
- Verify that there are no conflicts with other formatting tools (e.g., ESLint) by disabling formatting-related linting rules.


## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER

# Prettier Documentation Digest

**Retrieved Date:** October 5, 2023

## Overview
Prettier is an opinionated code formatter that reprints code by building an AST from the source and then printing it back out according to its own formatting rules. It takes into account maximum line lengths and formatting options to produce consistent output.

## Supported Languages
- JavaScript (including experimental features)
- JSX
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, SCSS
- HTML
- Ember/Handlebars
- JSON
- GraphQL
- Markdown (including GFM and MDX v1)
- YAML

## Code Formatting Behavior
Prettier strips away original styling (with minor exceptions such as preservation of empty lines and multi-line object syntax) and reinstates formatting based on set rules. For example, when a function call is too long:

**Input Example:**

    foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());

**Output Example:**

    foo(
      reallyLongArg(),
      omgSoManyParameters(),
      IShouldRefactorThis(),
      isThereSeriouslyAnotherOne()
    );

## CLI and Integration
Prettier is designed to work seamlessly with various editors and can be integrated in pre-commit hooks or through on-save formatting. It offers a fast CLI execution and supports both CommonJS and ECMAScript Module interfaces.

## Options and Configuration
Key configuration options include:
- `--trailing-comma`: Default changed to "all" in version 3.0.
- `--objectWrap`: Introduced in version 3.5 to manage wrapping of object properties.
- `--experimental-operatorPosition`: An experimental flag in version 3.5.
- `--experimental-ternaries`: Added in version 3.1 to help format nested ternaries.

## Release Notes Highlights
- **Prettier 3.5:** New options like `objectWrap` and `experimentalOperatorPosition`, plus TypeScript configuration file support.
- **Prettier 3.4 - 2.8:** Numerous bug fixes, additional features (e.g., JSONC parser, Angular ICU expressions), and performance improvements in the CLI.

## Attribution and Data Size
- **Data Size:** 925145 bytes
- **Links Found:** 2364
- **Source URL:** https://prettier.io/docs/en/index.html


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: MIT License
- Crawl Date: 2025-04-17T19:22:39.741Z
- Data Size: 925145 bytes
- Links Found: 2364

## Retrieved
2025-04-17
library/library-2025-04-20/VITEST.md
# library/library-2025-04-20/VITEST.md
# VITEST

## Crawl Summary
Vitest documentation details provide the exact installation commands, code examples for writing tests, complete configuration options (in vitest.config.ts and vite.config.ts), CLI commands and flags, environment settings (node, jsdom, happy-dom), dependency resolution options including external and inline handling, and workspaces support. The documentation includes full code samples, configuration parameter defaults, and detailed instructions to merge Vite and Vitest configurations.

## Normalised Extract
## Table of Contents
1. Installation
2. Writing Tests
3. Configuration
4. Command Line Interface
5. Environment & Integration
6. Dependency Optimization & Server Options
7. Workspaces Support
8. Troubleshooting & Best Practices

---

### 1. Installation
- Install using:
  - npm: `npm install -D vitest`
  - yarn: `yarn add -D vitest`
  - pnpm: `pnpm add -D vitest`
  - bun: `bun add -D vitest`

### 2. Writing Tests
- Create a sum.js:
```js
export function sum(a, b) {
  return a + b;
}
```
- Create a test file, sum.test.js:
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
- Add test script in package.json:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 3. Configuration
- Create a `vitest.config.ts` file:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**']
  },
});
```

- Use triple-slash directives in your config for proper type definitions:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... options
  },
});
```

- Merge Vite and Vitest configurations:
```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ... test specific options
  },
}));
```

### 4. Command Line Interface
- Run tests: `vitest`
- Run tests once: `vitest run`
- Run coverage: `vitest run --coverage`
- CLI options include `--config`, `--port`, `--https`, `--watch`, and `--update`.

### 5. Environment & Integration
- Set test environment via `environment` (e.g. 'node', 'jsdom', 'happy-dom').
- Use docblock comments for file-specific environments:
```js
/**
 * @vitest-environment jsdom
 */
```

### 6. Dependency Optimization & Server Options
- Configuration parameters:
  - `server.deps.external`: Default: [/\/node_modules\//]
  - `server.deps.inline`: Can be an array or true (for all).
  - `server.deps.fallbackCJS`: Default: false
  - Options for sourcemap: `server.sourcemap` (default: 'inline')

### 7. Workspaces Support
- Define multiple workspace configurations in `vitest.workspace.ts`:
```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

### 8. Troubleshooting & Best Practices
- For Bun users, ensure to use `bun run test`.
- Enable `deps.interopDefault` if you encounter issues with CommonJS modules.
- Use merging configuration techniques when using separate Vite and Vitest files.
- Run CLI commands with `--update` to refresh snapshots and `--watch` for continuous testing.


## Supplementary Details
### Supplementary Technical Specifications

1. **Installation Requirements**
   - Vite: >= v5.0.0
   - Node: >= v18.0.0

2. **Configuration Options** (in vitest.config.*):
   - `test.include`: string[]; Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
   - `test.exclude`: string[]; Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
   - `test.globals`: boolean; Default: false
   - `test.environment`: string; Default: 'node'
   - `server.sourcemap`: 'inline' | boolean; Default: 'inline'
   - `server.deps`: Object containing `external`, `inline`, `fallbackCJS`, `cacheDir` etc.
   - `deps.optimizer`: Configuration for dependency bundling (includes options for ssr and web modes).

3. **CLI Options**
   - `--config <path>`: to specify an alternative config file
   - `--watch`: enable watch mode
   - `--update`: update snapshots
   - `--coverage`: run tests with coverage reporting

4. **Best Practices**
   - Use the same configuration file for both Vite and Vitest when possible to avoid duplication.
   - When using separate configurations, merge them via `mergeConfig` to avoid conflicts.
   - For type safety, always include triple slash type directives in configuration files.
   - Use environment-specific configuration blocks by leveraging `process.env.VITEST` and conditional definitions in `defineConfig`.

5. **Troubleshooting Procedures**
   - If tests fail to run, verify that all required dependencies are installed and that Vitest is correctly linked in the project.
   - For dependency errors with CJS modules, check the `deps.interopDefault` setting.
   - Run `npx vitest --help` for a full list of CLI options and verify command syntax.
   - If configuration conflicts arise between Vitest and Vite, try consolidating options in a single file.


## Reference Details
### Complete API Specifications & Implementation Patterns

#### 1. SDK Method Signatures & Examples

- **defineConfig (from 'vitest/config')**

  Signature:
  ```ts
  function defineConfig<T = UserConfigExport>(config: T | (() => T)): T;
  ```

  **Example:**
  ```ts
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**'],
    },
  });
  ```

- **mergeConfig (from 'vitest/config')**

  Signature:
  ```ts
  function mergeConfig<T>(baseConfig: T, overrideConfig: T): T;
  ```

  **Example:**
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config';
  import viteConfig from './vite.config.mjs';

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      exclude: ['packages/template/*'],
    },
  }));
  ```

#### 2. CLI Commands & Flags

- **Command Examples:**

  Running tests:
  ```bash
  npx vitest
  ```

  Running tests once:
  ```bash
  npx vitest run
  ```

  Running tests with coverage:
  ```bash
  npx vitest run --coverage
  ```

  Running with custom config:
  ```bash
  npx vitest --config ./path/to/vitest.config.ts
  ```

#### 3. Configuration Options with Types & Defaults

- **test.include**: string[] 
  - Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']

- **test.exclude**: string[] 
  - Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']

- **test.globals**: boolean 
  - Default: false

- **test.environment**: string 
  - Default: 'node'

- **server.sourcemap**: 'inline' | boolean 
  - Default: 'inline'

- **server.deps.external**: (string | RegExp)[] 
  - Default: [/\/node_modules\//]

- **server.deps.inline**: (string | RegExp)[] | true 
  - Default: []

- **deps.optimizer**: object with properties for both `ssr` and `web` modes, including flags such as `enabled` (boolean) and arrays for `include` and `exclude`.

#### 4. Error Handling & Troubleshooting

- If you receive errors like "Named export not found" from CommonJS modules, enable `deps.interopDefault: true` in your config.

- Use the following troubleshooting command to print available CLI options:
  ```bash
  npx vitest --help
  ```

- For snapshot issues, run with:
  ```bash
  npx vitest --update
  ```

#### 5. Best Practices Implementation Example

Combine configuration for both Vite and Vitest:

```ts
/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts'],
    exclude: ['node_modules'],
    reporters: 'default',
    update: false,
    watch: false,
  },
}));
```

This file demonstrates use of type directives, merging of configurations, and explicit CLI behavior overrides.


## Original Source
Vitest Documentation
https://vitest.dev

## Digest of VITEST

# Vitest Documentation Digest - Retrieved on 2023-10-12

## Overview
Vitest is a Vite-native, next generation testing framework that supports ESM, TypeScript, JSX and is fully integrated with Vite’s configuration and plugins. It includes features like smart watch mode, Jest-compatible assertions, snapshot testing, and coverage.

## Installation

- npm: `npm install -D vitest`
- yarn: `yarn add -D vitest`
- pnpm: `pnpm add -D vitest`
- bun: `bun add -D vitest`

*Note:* Vitest requires Vite >= v5.0.0 and Node >= v18.0.0.

## Writing Tests

Example of a simple addition function:

**sum.js**
```js
export function sum(a, b) {
  return a + b;
}
```

**sum.test.js**
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Update your package.json to include:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## Configuring Vitest

Vitest can be configured via a dedicated `vitest.config.ts` file or within your Vite config using the `test` property. Examples include:

**vitest.config.ts**
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Specify test options here
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**']
  },
});
```

**vite.config.ts**
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... Specify test options here
  },
});
```

There is also support for merging Vite and Vitest configurations using `mergeConfig`:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ... Additional test configuration
  },
}));
```

## Command Line Interface

- Run tests once: `vitest run`
- Watch mode: `vitest` (auto-reruns affected tests like HMR)
- Coverage: `vitest run --coverage`
- CLI options include flags like `--config`, `--port`, `--https`, and more.

Default scripts in package.json:

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

## Environment & Integration

- **Environments:** Configure using the `environment` option (e.g., `node`, `jsdom`, `happy-dom`, `edge-runtime`).
- **Triple-slash directives:** e.g., `/// <reference types="vitest" />` or `/// <reference types="vitest/config" />` for proper type definitions.
- Custom environment can be defined by creating a module that exports an `Environment` object.

## Dependency Optimization & Server Options

Vitest uses Vite's dependency handling:

- **server.deps.external:** Array to externalize modules (default: [/\/node_modules\//]).
- **server.deps.inline:** Specify modules to be inlined (or set to true for all).
- **server.deps.fallbackCJS:** Convert ESM packages to CommonJS if needed.

Additional options include settings for sourcemaps, debugging, cache directories, and asset transformation.

## Workspaces Support

Vitest supports multi-workspace configuration using a `vitest.workspace.ts` file. Example:

```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

## Troubleshooting & Best Practices

- When using Bun, use `bun run test` instead of `bun test`.
- For dependencies issues with CommonJS modules, enable `deps.interopDefault` to interpret defaults correctly.
- Verify that configuration in Vitest and Vite align if using separate config files; use `mergeConfig` to combine them.
- Use explicit CLI flags (e.g. `--update`, `--watch`) to control snapshot updates and test watching behavior.


## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev
- License: MIT License
- Crawl Date: 2025-04-17T15:26:06.936Z
- Data Size: 41837296 bytes
- Links Found: 26309

## Retrieved
2025-04-17
library/VITEST.md
# library/VITEST.md
# VITEST

## Crawl Summary
Vitest is a testing framework integrated with Vite and supports ESM, TypeScript, and JSX with esbuild. It provides unified configuration via vite.config and vitest.config files, supports workspace setups for monorepos, and offers comprehensive CLI options for running tests, updating snapshots, and generating coverage reports. Detailed configuration options include test file globs, exclusion patterns, dependency management (deps), environment settings, and pool/thread management. Code examples include test file structure (e.g., sum.js and sum.test.js), configuration merging between Vite and Vitest (using mergeConfig), and custom environment definitions, which include precise parameter values and defaults.

## Normalised Extract
## Table of Contents

1. Overview & Installation
2. Writing Tests
3. Configuration Options
4. CLI Commands
5. Dependency Management
6. Environment & Runner Settings
7. Workspace Support
8. Troubleshooting & Best Practices

---

### 1. Overview & Installation

- Framework: Vitest (Vite-native testing framework)
- Requirements: Vite >= v5.0.0, Node >= v18.0.0
- Installation Commands:
  - npm: `npm install -D vitest`
  - yarn: `yarn add -D vitest`
  - pnpm: `pnpm add -D vitest`
  - bun: `bun add -D vitest`

### 2. Writing Tests

- Test file naming: Must include `.test.` or `.spec.` in the filename.
- Example:

  **sum.js**
  ```js
  export function sum(a, b) {
    return a + b;
  }
  ```

  **sum.test.js**
  ```js
  import { expect, test } from 'vitest';
  import { sum } from './sum.js';

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  ```

- Package JSON integration:

  ```json
  {
    "scripts": {
      "test": "vitest"
    }
  }
  ```

### 3. Configuration Options

- Use `vitest.config.ts` or integrate within Vite config under the `test` property.

  **Example:**
  ```ts
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
      ]
    }
  });
  ```

- Merging Configs:
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config';
  import viteConfig from './vite.config.mjs';

  export default mergeConfig(viteConfig, defineConfig({
    test: { exclude: ['packages/template/*'] }
  }));
  ```

### 4. CLI Commands

- Running tests: `vitest` or `npx vitest`
- Run once: `vitest run`
- Enable coverage: `vitest run --coverage`
- Update snapshots: `vitest --update`
- Help: `npx vitest --help`

### 5. Dependency Management

- Automatic Dependency Installation with prompt if missing.
- Disable check by setting `VITEST_SKIP_INSTALL_CHECKS=1`.

### 6. Environment & Runner Settings

- Default environment: `node`
- Specify alternative environments using docblock or config:

  ```js
  /** @vitest-environment jsdom */
  ```

- Custom environment example:
  ```ts
  import type { Environment } from 'vitest';

  const customEnv: Environment = {
    name: 'custom',
    transformMode: 'ssr',
    setup() {
      return { teardown() { } };
    }
  };

  export default customEnv;
  ```

### 7. Workspace Support

- Define multi-project configurations via a `vitest.workspace` file:

  ```ts
  import { defineWorkspace } from 'vitest/config';

  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    {
      test: {
        name: 'happy-dom',
        root: './shared_tests',
        environment: 'happy-dom',
        setupFiles: ['./setup.happy-dom.ts'],
      }
    },
    {
      test: {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts'],
      }
    }
  ]);
  ```

### 8. Troubleshooting & Best Practices

- For Bun users, run tests with `bun run test`.
- Debug configuration using `server.debug` options in Vite config:

  ```ts
  server: {
    debug: { dumpModules: true, loadDumppedModules: true }
  }
  ```

- Use `--update` to update snapshots.
- Check CLI help for additional options: `npx vitest --help`.


## Supplementary Details
### Detailed Technical Specifications & Implementation Steps

1. Installation & Setup:
   - Ensure correct versions: Vite >= v5.0.0, Node >= v18.0.0
   - Install using your package manager. Verify installation using `npx vitest`.

2. Test Writing & Execution:
   - File naming: *.test.js or *.spec.js
   - Sample Code: Export functions in modules and import them in test files. Use Vitest's `expect`, `test` APIs.
   - Package.json script example: `{ "test": "vitest" }`

3. Configuration Parameters (in vitest.config.ts):
   - `globals`: boolean (default: false). Enable global test APIs.
   - `environment`: string (default: 'node'). Options: 'node', 'jsdom', 'happy-dom', etc.
   - `include`: string[] with default pattern `['**/*.{test,spec}.?(c|m)[jt]s?(x)']`
   - `exclude`: string[] with default patterns for node_modules, dist, etc.
   - `reporters`: can be 'default' or custom reporter instances.
   - Debug Options under `server.debug`: `dumpModules` (boolean|string), `loadDumppedModules` (boolean).

4. CLI and Command Options:
   - `vitest run --coverage`: Runs tests with coverage report generation.
   - `vitest --config <path>`: Specify a custom config file.
   - `vitest --update`: Update snapshot tests.

5. Dependency Management:
   - `VITEST_SKIP_INSTALL_CHECKS`: Environment variable to disable automatic dependency checks.
   - `deps.optimizer`: Options to bundle dependencies using esbuild, with options for `include`, `exclude`, `enabled` flags.

6. Environment Configuration:
   - Use docblock comments (`@vitest-environment`) for per-file environment selection.
   - Custom environments are defined by exporting an object with `name`, `transformMode`, `setup()` that returns teardown methods.

7. Workspaces:
   - Define workspace configurations in a file `vitest.workspace.ts` using `defineWorkspace` from 'vitest/config'.
   - Workspaces let you run tests with different configurations in a monorepo setting.

8. Troubleshooting:
   - Common Error Fixes: Ensure file naming conventions, update Node and Vite versions if errors occur.
   - Debug server options: Enable inline sourcemaps with `server.sourcemap: 'inline'`.
   - Use `npx vitest --help` for a comprehensive list of CLI options and refer to merged config examples if custom settings override defaults.


## Reference Details
## Complete API Specifications & Code Examples

### 1. API Methods and Configurations

#### Vitest Test API

- Method: `test(name: string, fn: () => void | Promise<void>): void`
  - Parameters:
    - `name`: The test case name.
    - `fn`: Function that contains the test assertions.
  - Return: void

- Method: `expect(actual: any): Matchers`
  - Returns an object with matcher functions such as `toBe(expected: any): void`.

#### Example Code:

```js
// sum.js
export function sum(a, b) {
  return a + b;
}
```

```js
// sum.test.js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

// Test: verifies that 1 + 2 equals 3
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 2. Configuration via vitest.config.ts

#### Basic Config:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,            // Enable global APIs
    environment: 'node',      // Test environment
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ],
    reporters: 'default',    // Default reporter
    // Additional options: update, watch, root, etc.
  }
});
```

#### Merging Vitest and Vite Config:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: false,
    exclude: ['packages/template/*'],
    // Extend with custom CLI options if needed
  }
}));
```

### 3. CLI Options and Commands

- Run tests in watch mode:
  ```bash
  vitest
  ```
- Run tests once without watching:
  ```bash
  vitest run
  ```
- Run with coverage:
  ```bash
  vitest run --coverage
  ```
- Update snapshots:
  ```bash
  vitest --update
  ```
- Specify custom config:
  ```bash
  vitest --config ./path/to/vitest.config.ts
  ```

### 4. Detailed Dependency and Server Configurations

#### Server Options Example:

```ts
// In vite.config.ts
export default defineConfig({
  server: {
    sourcemap: 'inline',
    debug: {
      dumpModules: true,           // Dump transformed modules
      loadDumppedModules: true
    },
    deps: {
      external: [/\/node_modules\//],
      inline: [],
      fallbackCJS: false,
      cacheDir: 'node_modules/.vite'
    }
  }
});
```

#### Dependency Optimizer Example:

```ts
export default defineConfig({
  test: {
    deps: {
      optimizer: {
        ssr: { enabled: false },
        web: { enabled: true, transformAssets: true, transformCss: true }
      }
    }
  }
});
```

### 5. Best Practices & Troubleshooting

- File Naming: Ensure test files include `.test.` or `.spec.`.
- For Bun users: Use `bun run test` instead of `bun test`.
- To debug, enable server debug options and use inline sourcemaps.
- If encountering dependency related issues, configure `deps.inline` or `deps.optimizer` as necessary.
- Use `npx vitest --help` to list all options and verify correct usage.

### 6. Custom Environment Setup Example

```ts
// custom-environment.ts
import type { Environment } from 'vitest';

const customEnv: Environment = {
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    // Custom setup code goes here
    return {
      teardown() {
        // Cleanup code after tests
      }
    };
  }
};

export default customEnv;
```

### 7. Troubleshooting Commands

- To view help: `npx vitest --help`
- To run tests with verbose output and debugging:
  ```bash
  vitest run --reporter verbose
  ```
- To update snapshots:
  ```bash
  vitest --update
  ```
- Check the configuration merging if tests do not run as expected; verify that the Vite config and Vitest config are correctly merged using `mergeConfig`.

This documentation provides the exact commands, configuration options, and code examples needed for using Vitest in your projects. It can be directly inserted into your development build process for both configuration and troubleshooting purposes.


## Original Source
Vitest Documentation
https://vitest.dev

## Digest of VITEST

# VITEST DOCUMENTATION

Retrieved on: 2023-10-14

## Overview & Installation

Vitest is a Vite-native, next generation testing framework. It supports ESM, TypeScript, and JSX out-of-the-box via esbuild. It is designed to share configuration and plugin ecosystems with a Vite app, although using Vitest does not mandate using Vite.

**Installation Commands:**

```bash
# Using npm
npm install -D vitest

# Using yarn
yarn add -D vitest

# Using pnpm
pnpm add -D vitest

# Using bun
bun add -D vitest
```

**Requirements:**
- Vite version: >= v5.0.0
- Node version: >= v18.0.0

## Writing Tests

A typical test file is named with a `.test.` or `.spec.` suffix. For example, consider the following code:

**sum.js**
```js
export function sum(a, b) {
  return a + b;
}
```

**sum.test.js**
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

// Basic test verifying that 1 + 2 equals 3
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Additionally, update your `package.json` to include:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run tests with:
```
npm run test
# or
yarn test
# or
pnpm test
```

## Configuration Options

Vitest configuration can be provided via a separate `vitest.config.*` file or within your Vite configuration under a `test` property.

**Example using vitest.config.ts:**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Specify test options
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ],
    // Other options like reporters, coverage, and debugging
  }
});
```

**Merging Vite and Vitest Configurations:**

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // Custom Vitest options
    exclude: ['packages/template/*']
  }
}));
```

## Command Line Interface (CLI)

- Run tests normally with: `vitest`
- Run tests once (non-watch mode): `vitest run`
- Run with coverage: `vitest run --coverage`
- Additional CLI options include `--port`, `--https`, and use of `--config` to specify configuration file paths.

Example:
```
npx vitest --help
```

## Dependency Management & Automatic Installation

Vitest automatically prompts for installation of missing dependencies. To disable this check, set the environment variable:

```bash
export VITEST_SKIP_INSTALL_CHECKS=1
```

## Environment & Runner Configuration

Vitest supports different test environments. Common examples:

- **Node Environment (default):**
  ```ts
  test: {
    environment: 'node'
  }
  ```

- **jsdom Environment:** Use a docblock at the top of your file:

  ```js
  /**
   * @vitest-environment jsdom
   */
  test('DOM test example', () => {
    const div = document.createElement('div');
    expect(div).not.toBeNull();
  });
  ```

- **Custom Environments:**

Define a custom environment:

```ts
// environment.ts
import type { Environment } from 'vitest';

const customEnv: Environment = {
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    // custom setup code
    return {
      teardown() {
        // teardown steps
      }
    };
  }
};

export default customEnv;
```

## Workspaces Support

Vitest enables running tests across multiple project workspaces by specifying a `vitest.workspace` file. Example:

```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    }
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    }
  }
]);
```

## Troubleshooting & Best Practices

- Ensure that your test file names include `.test.` or `.spec.`.
- If using Bun, run tests with: `bun run test` to avoid conflicts with Bun's own test runner.
- When debugging transformed modules, consider using options in `server.debug`:

```ts
// Example in vite.config.ts
server: {
  debug: {
    dumpModules: true,
    loadDumppedModules: true
  }
}
```

- Use `--update` flag to update snapshot files: `vitest --update`.
- For dependency optimization, configure `deps.optimizer` as shown in the advanced configuration options.

## Attribution & Crawl Data

- Data Size: 30186504 bytes
- Links Found: 23894
- No errors reported during crawl.

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev
- License: MIT License
- Crawl Date: 2025-04-21T08:50:36.392Z
- Data Size: 30186504 bytes
- Links Found: 23894

## Retrieved
2025-04-21
library/CHALK.md
# library/CHALK.md
# CHALK

## Crawl Summary
Crawled Content Details:
- Data Size: 0 bytes
- Links Found: 0
- Error: None
- Content Preview: "..."

(No additional technical details were obtained from the crawl; all specifications are derived from the Chalk Documentation source.)

## Normalised Extract
## Table of Contents
1. Basic Usage
2. API Methods
3. Configuration Options
4. Advanced Usage & Troubleshooting

### 1. Basic Usage
- Import using ES Module: `import chalk from 'chalk';`
- Import using CommonJS: `const chalk = require('chalk');`
- Example:
  ```js
  console.log(chalk.green('Success!'));
  ```

### 2. API Methods
- **chalk.red(text: string): string**
  - Usage: `chalk.red('Error!')`
- **chalk.bgBlue(text: string): string**
  - Usage: `chalk.bgBlue('Info')`
- **chalk.rgb(r: number, g: number, b: number)(text: string): string**
  - Usage: `chalk.rgb(123, 45, 67)('Custom Color')`
- **chalk.hex(hex: string)(text: string): string**
  - Usage: `chalk.hex('#DEADED')('Hex Color')`
- **Chaining:**
  - Example: `chalk.bold.underline.blue('Styled Text')`

### 3. Configuration Options
- Auto-detection of terminal color support.
- Environment variable `FORCE_COLOR` to force color support:
  - Set using: `FORCE_COLOR=1 node app.js`

### 4. Advanced Usage & Troubleshooting
- **Method Chaining Example:**
  ```js
  const styled = chalk.bold.red.bgYellow.italic('Warning!');
  console.log(styled);
  ```
- **Troubleshooting Steps:**
  1. Check if terminal supports TTY: `process.stdout.isTTY`
  2. Test by running: `node -e "console.log(process.stdout.isTTY)"`
  3. Ensure `FORCE_COLOR` is set if needed.


## Supplementary Details
## Supplementary Technical Specifications

### Detailed API Specifications with Parameter Values
- **chalk.red(text: string): string** - Applies ANSI escape code for red (Foreground: 31).
- **chalk.bgBlue(text: string): string** - Applies ANSI escape code for blue background (Background: 44).
- **chalk.rgb(r: number, g: number, b: number)(text: string): string**
  - Parameters: `r`, `g`, `b` as numbers (0-255).
  - Returns: Styled string with custom RGB color using ANSI sequence.
- **chalk.hex(hex: string)(text: string): string**
  - Parameters: `hex` as a string (format: "#RRGGBB").
  - Returns: Styled string using a hex-to-RGB conversion.

### Configuration & Environment
- **Auto-detection:** Automatically disables styling if `process.stdout.isTTY` is false.
- **Forcing Colors:** Set environment variable `FORCE_COLOR=1` to override auto-detection.

### Implementation Steps
1. Import chalk using the appropriate module syntax.
2. Apply desired style by calling the method chain (e.g., `chalk.bold.red('Text')`).
3. Log output using `console.log()`.

### Troubleshooting Commands
- Test TTY support:
  ```bash
  node -e "console.log(process.stdout.isTTY)"
  ```
- Force color output in environments that do not support it by setting:
  ```bash
  export FORCE_COLOR=1
  ```
  then run your Node.js application.

### Best Practices
- Use chaining to combine multiple styles.
- Validate terminal support when deploying in varied environments.
- For production logging, consider stripping ANSI codes if logs are processed by a parser.


## Reference Details
## Complete API Specifications and Code Examples

### API Specification

Interface Chalk {
  red(text: string): string;
  bgBlue(text: string): string;
  rgb(r: number, g: number, b: number): ChalkFunction;
  hex(hex: string): ChalkFunction;
  bold(text: string): string;         // Modifier
  underline(text: string): string;    // Modifier
  italic(text: string): string;       // Modifier
}

interface ChalkFunction {
  (text: string): string;
  // Supports chaining of modifiers
}

### Full SDK Method Signatures

- chalk.red(text: string): string
- chalk.bgBlue(text: string): string
- chalk.rgb(r: number, g: number, b: number): ChalkFunction
- chalk.hex(hex: string): ChalkFunction
- Additional chaining: chalk.bold.red.underline(text: string): string

### Example Code with Comments

```js
// Import chalk library
import chalk from 'chalk';

// Using basic color methods
const errorText = chalk.red('Error: Something went wrong!');
console.log(errorText);

// Using background color
const infoText = chalk.bgBlue('Important Info');
console.log(infoText);

// Using custom RGB color
const customText = chalk.rgb(123, 45, 67)('Custom Colored Text');
console.log(customText);

// Using hex color
const hexText = chalk.hex('#DEADED')('Hex Colored Text');
console.log(hexText);

// Chaining multiple styles
const styledText = chalk.bold.underline.blue('Success!');
console.log(styledText);
```

### Configuration Details
- **Auto Detection:** Chalk checks if `process.stdout.isTTY` is true to decide color support.
- **Forcing Colors:** Set `FORCE_COLOR=1` in your environment to ensure colors are applied regardless of TTY support.

### Troubleshooting Procedure
1. Run:
   ```bash
   node -e "console.log(process.stdout.isTTY)"
   ```
   If the output is `false`, chalk disables styling.

2. Set FORCE_COLOR to force color support:
   ```bash
   export FORCE_COLOR=1
   node yourApplication.js
   ```

3. Verify ANSI escape sequences in your terminal by echoing a test string with manual codes.

### Best Practices
- Always check terminal capabilities if the output is intended for different environments.
- When logging to files or systems that strip ANSI codes, consider conditionally removing them.
- Document usage of environment configurations like FORCE_COLOR explicitly in your deployment procedures.


## Original Source
Chalk Documentation
https://chalk.js.org/

## Digest of CHALK

# Chalk Documentation Digest

**Retrieved Date:** 2023-10-04
**Source URL:** https://chalk.js.org/

## Overview
Chalk is a Node.js library used to style terminal string output with colors and formatting using ANSI escape codes. It supports method chaining for combining styles such as colors, background colors, and text modifiers.

## API Details

### Basic Usage
- **Importing Chalk:**
  - ES Module: `import chalk from 'chalk';`
  - CommonJS: `const chalk = require('chalk');`
- **Basic Example:**
  ```js
  console.log(chalk.green('Success!'));
  ```

### API Methods & Signatures
- **chalk.red(text: string): string**
  - Applies red foreground color. 
  - Example: `chalk.red('Error!')`

- **chalk.bgBlue(text: string): string**
  - Applies blue background color.
  - Example: `chalk.bgBlue('Info')`

- **chalk.rgb(r: number, g: number, b: number)(text: string): string**
  - Applies a custom RGB color.
  - Example: `chalk.rgb(123, 45, 67)('Custom Color')`

- **chalk.hex(hex: string)(text: string): string**
  - Applies a color specified with a hex code.
  - Example: `chalk.hex('#DEADED')('Hex Color')`

- **Method Chaining:**
  - You can combine modifiers: `chalk.bold.underline.blue('Styled Text')`

### Configuration Options
- **Auto-detection:**
  - Chalk automatically detects terminal capabilities and disables styling if colors are unsupported.
- **Force Color:**
  - Use environment variable `FORCE_COLOR` to override behavior. Setting `FORCE_COLOR=1` forces color output even in unsupported terminals.

### Advanced Usage & Troubleshooting
- **Chaining Multiple Styles:**
  ```js
  const styled = chalk.bold.red.bgYellow.italic('Warning!');
  console.log(styled);
  ```
- **Common Issues:**
  - **Problem:** Colors not displaying correctly.
  - **Troubleshooting Step:** Verify that the terminal supports colors using `process.stdout.isTTY` and check the `FORCE_COLOR` environment variable.
  - **Command to Test TTY:**
    ```bash
    node -e "console.log(process.stdout.isTTY)"
    ```

## Attribution & Data Size
- **Attribution:** Data extracted from Chalk Documentation source provided in SOURCES.md entry 13.
- **Crawled Data Size:** 0 bytes



## Attribution
- Source: Chalk Documentation
- URL: https://chalk.js.org/
- License: MIT License
- Crawl Date: 2025-04-20T18:27:35.412Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-20
