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
