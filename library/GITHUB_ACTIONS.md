# GITHUB_ACTIONS

## Crawl Summary
GitHub Actions documentation provides detailed specifications for workflow YAML configuration including events, jobs, actions, runners, and advanced features such as matrix builds, caching, and service containers. It includes precise YAML examples and configuration details that can be directly used in CI/CD pipelines.

## Normalised Extract
## Table of Contents
1. Workflows
2. Events
3. Jobs
4. Actions
5. Runners
6. Workflow Templates
7. Advanced Features

---

### 1. Workflows
- **Definition:** Automated processes defined in YAML files.
- **Location:** `.github/workflows`
- **Key Elements:** `name`, `on`, `jobs`
- **Example Workflow:**
```yaml
name: GitHub Actions Demo
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Triggered by ${{ github.event_name }} event."
      - name: Check out repository code
        uses: actions/checkout@v4
```

### 2. Events
- **Definition:** Events that trigger workflow runs.
- **Examples:** `push`, `pull_request`, `fork`, `issues`, `schedule`
- **Event Filtering:** Use filters under event keys.
- **Example:**
```yaml
on:
  push:
    branches:
      - main
```

### 3. Jobs
- **Definition:** A set of steps executed on a specified runner.
- **Parameters:** `runs-on`, `needs`
- **Example:**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building application..."
```

### 4. Actions
- **Definition:** Reusable code units for performing specific tasks.
- **Usage Example:**
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

### 5. Runners
- **Definition:** Servers or VMs that execute jobs.
- **Types:** GitHub-hosted (e.g., `ubuntu-latest`), Self-hosted
- **Configuration Example:**
```yaml
runs-on: ubuntu-latest
```

### 6. Workflow Templates
- **Definition:** Prebuilt YAML templates to kickstart workflows.
- **Usage:** Access through GitHub UI and customize as necessary.

### 7. Advanced Features
- **Matrix Builds:** Run jobs with multiple variable values:
```yaml
strategy:
  matrix:
    node: [14, 16]
```
- **Caching:** Improve speed by caching dependencies:
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```
- **Service Containers:** Deploy ephemeral containers:
```yaml
services:
  postgres:
    image: postgres
```


## Supplementary Details
### Technical Specifications and Implementation Details

1. **Workflow File Requirements**:
   - Must reside in `.github/workflows`.
   - File extension: `.yml` or `.yaml`.

2. **Event Triggers**:
   - Syntax: `on: [event1, event2]` or detailed YAML mapping for filtering events.
   - Example with branch filter:
     ```yaml
     on:
       push:
         branches: [ main ]
     ```

3. **Job Dependencies**:
   - Jobs run in parallel unless specified using the `needs` keyword.
   - Example:
     ```yaml
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - run: ./build.sh
       test:
         needs: build
         runs-on: ubuntu-latest
         steps:
           - run: ./test.sh
     ```

4. **Matrix Strategy**:
   - Define a matrix under strategy to run jobs with different parameters.
   - Example:
     ```yaml
     strategy:
       matrix:
         node: [14, 16]
     ```

5. **Caching**:
   - Use `actions/cache@v4` to cache directories like `~/.npm`.
   - Key generation often uses environment variables and file hashes:
     ```yaml
     - uses: actions/cache@v4
       with:
         path: ~/.npm
         key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
     ```

6. **Service Containers**:
   - Define containers under the `services` key to run databases or caches alongside your job.
   - Example:
     ```yaml
     services:
       postgres:
         image: postgres
     ```

7. **Secrets and Environment Variables**:
   - Secrets are referenced as `${{ secrets.SECRET_NAME }}` and passed to jobs via `env`.
   - Example:
     ```yaml
     env:
       MY_SECRET: ${{ secrets.MY_SECRET }}
     ```

8. **Best Practices**:
   - Store sensitive data in GitHub Secrets.
   - Use matrix builds to test across different environments.
   - Cache dependencies to speed up workflow execution.
   - Limit job scope by breaking down workflows into dependent jobs with the `needs` keyword.

9. **Troubleshooting Procedures**:
   - Check run logs via the GitHub Actions UI.
   - Expand individual steps to view detailed logs.
   - For caching issues, verify the cache key and restore keys are correctly configured.
   - Use the `echo` command in steps to output environment variables for debugging.
   - Example debugging step:
     ```yaml
     - run: echo "Current branch: ${{ github.ref }}"
     ```


## Reference Details
### Complete API Specifications and Implementation Patterns

#### Workflow YAML Specification
- **File Location:** `.github/workflows/<workflow_name>.yml`
- **Mandatory Fields:**
  - `name`: String, identifies the workflow.
  - `on`: Array or mapping of events triggering the workflow.
  - `jobs`: Object where keys are job identifiers and values are job configurations.

#### Job Object Specification
- **Parameters:**
  - `runs-on`: String or array specifying runner label(s).
  - `needs`: Optional, string or array specifying job dependencies.
  - `steps`: Array of step objects.

#### Step Object Specification
- **Types of Steps:**
  - Shell command steps:
    ```yaml
    - run: "command to execute"
    ```
  - Action steps:
    ```yaml
    - name: Action Name
      uses: <action>@<version>
    ```

#### Full YAML Code Example with Comments
```yaml
# File: .github/workflows/github-actions-demo.yml
name: GitHub Actions Demo
# 'run-name' defines a dynamic name for each run
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀

# Trigger workflow on push events
on: [push]

jobs:
  Explore-GitHub-Actions:
    # Use the latest Ubuntu runner provided by GitHub
    runs-on: ubuntu-latest
    steps:
      # Log the triggering event
      - run: echo "🎉 Triggered by ${{ github.event_name }}"
      # Log runner OS
      - run: echo "🐧 Running on ${{ runner.os }}"
      # Log branch and repository details
      - run: echo "Branch: ${{ github.ref }}, Repository: ${{ github.repository }}"
      # Use the checkout action to clone the repository
      - name: Check out code
        uses: actions/checkout@v4
      # List the files in the repository workspace
      - name: List repository files
        run: |
          ls ${{ github.workspace }}
      # Final status log
      - run: echo "Job status: ${{ job.status }}"
```

#### SDK Method Signatures and Parameters (Example for actions/checkout)
- **Action:** actions/checkout@v4
- **Parameters:**
  - `ref` (optional, string): The branch or commit to check out. Default: current ref.
  - `repository` (optional, string): Repository to check out. Default: current repository.
  - `token` (optional, string): GitHub token for authentication.

#### Configuration Options
- **Runner Selection:**
  - `ubuntu-latest`, `windows-latest`, `macos-latest` are predefined labels.
- **Matrix Example Configuration:**
  ```yaml
  strategy:
    matrix:
      node: [14, 16]
  ```
- **Caching Options:**
  - `path`: Directory to cache (e.g., `~/.npm`)
  - `key`: Unique key, commonly generated with file hashes.

#### Best Practices with Implementation Code
- **Use Secrets:**
  ```yaml
  env:
    MY_SECRET: ${{ secrets.MY_SECRET }}
  ```
- **Define Dependencies to Control Job Order:**
  ```yaml
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - run: ./build.sh
    test:
      needs: build
      runs-on: ubuntu-latest
      steps:
        - run: ./test.sh
  ```

#### Troubleshooting Commands and Expected Outputs
- **View Logs:** Navigate to the Actions tab on GitHub and select the workflow run. Expand individual jobs and steps.
- **Debugging Output:** Insert diagnostic echo commands, for example:
  ```yaml
  - run: echo "Debug: Branch is ${{ github.ref }}"
  ```
- **Cache Verification:** If cache miss occurs, verify the key output in the logs. Expected output should indicate cache hit or miss along with the generated key.

This complete specification allows developers to implement, configure, and troubleshoot GitHub Actions workflows directly.


## Original Source
GitHub Actions Documentation
https://docs.github.com/en/actions

## Digest of GITHUB_ACTIONS

# GitHub Actions Documentation

**Retrieved on:** 2023-10-04

## Overview
GitHub Actions is a CI/CD platform that automates build, test, and deployment pipelines directly in your GitHub repository. Workflows are defined as YAML files stored in the `.github/workflows` directory and are triggered by events like push, pull_request, schedule, or manually via workflow_dispatch.

## Workflow Structure
A workflow file consists of: 
- **Event triggers**: defined using the `on:` key.
- **Jobs**: a collection of steps that run on a specified runner.
- **Steps**: individual scripts or actions executed sequentially within a job.

### Example Workflow YAML
```yaml
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."
```

## Table of Contents
1. Workflows
2. Events
3. Jobs
4. Actions
5. Runners
6. Workflow Templates
7. Advanced Workflow Features

## 1. Workflows
**Definition:** A workflow is a configurable automated process. 
**Location:** Must be stored in `.github/workflows`.
**Key Elements:**
- `name`: Label for the workflow.
- `on`: List of events that trigger the workflow (e.g., `push`, `pull_request`, `schedule`).
- `jobs`: Contains one or more jobs.

## 2. Events
**Definition:** Events trigger workflows. 
**Examples:**
- `push`: Triggers on pushes to any branch.
- `fork`: Triggers when someone forks the repository.
- Other events: `issues`, `release`, `repository_dispatch`.

**Usage:**
```yaml
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize]
```

## 3. Jobs
**Definition:** A job is a set of steps that run sequentially on the same runner.

**Configuration Options:**
- `runs-on`: Specifies the runner type (e.g., `ubuntu-latest`, `windows-latest`, `macos-latest`).
- `needs`: Define job dependencies.

**Example:**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Testing..."
```

## 4. Actions
**Definition:** Actions are reusable units of code, either provided by GitHub or custom-built, to simplify workflow tasks.

**Usage Example:**
```yaml
- name: Check out repository code
  uses: actions/checkout@v4
```

## 5. Runners
**Definition:** Runners are the virtual machine or server instances where workflow jobs execute.

**Types:**
- GitHub-hosted runners (Ubuntu, Windows, macOS).
- Self-hosted runners for custom environments.

**Configuration:**
```yaml
runs-on: ubuntu-latest
```

## 6. Workflow Templates
**Definition:** Preconfigured YAML workflows provided by GitHub to jumpstart CI/CD implementations.

**Example usage:**
Access through GitHub Actions UI and customize parameters such as environment variables and secrets.

## 7. Advanced Workflow Features
**Matrix Strategy:** Run a single job against multiple configuration variables.

**Example:**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [14, 16]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
```

**Caching Dependencies:** Using actions like `actions/cache@v4` to store dependency folders.
```yaml
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

**Service Containers:** Define ephemeral containers for databases.
```yaml
jobs:
  container-job:
    runs-on: ubuntu-latest
    container: node:20-bookworm-slim
    services:
      postgres:
        image: postgres
    steps:
      - name: Check out repository code
        uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Connect to PostgreSQL
        run: node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: 5432
```


## Attribution
- Source: GitHub Actions Documentation
- URL: https://docs.github.com/en/actions
- License: License: Not specified
- Crawl Date: 2025-04-22T01:05:24.997Z
- Data Size: 945573 bytes
- Links Found: 16588

## Retrieved
2025-04-22
