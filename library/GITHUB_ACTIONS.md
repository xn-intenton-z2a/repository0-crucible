# GITHUB_ACTIONS

## Crawl Summary
GitHub Actions provides a YAML-based configuration for automating CI/CD workflows. Technical details include workflow YAML syntax, event triggers (push, fork, schedule, manual), job and step definitions, matrix strategy for job variations, caching mechanisms, secrets management, and usage of service containers for dependencies. Complete examples and code snippets are provided for setting up workflows, checking out code, listing files, and caching directories.

## Normalised Extract
## Table of Contents
1. Overview
2. Workflow Configuration
3. Events & Triggers
4. Jobs, Dependencies, and Sequential Execution
5. Actions Usage
6. Runners Specifications
7. Advanced Features
   - Matrix Strategy
   - Caching Dependencies
   - Secrets and Environment Variables
   - Service Containers
8. Workflow Templates & Reusability
9. Troubleshooting and Best Practices

---

### 1. Overview
GitHub Actions automates build, test, and deployment workflows via YAML files placed in `.github/workflows`. It supports events such as push, pull request, release, and manual triggers.

### 2. Workflow Configuration
Define workflows using YAML with mandatory keys:
- `name`: Name of the workflow.
- `on`: Trigger events (array or object format).
- `jobs`: Collection of jobs configured to run on specified runners.

### 3. Events & Triggers
Example: `on: [push]` triggers workflow on push events. Further configuration can include branch filters:

```yaml
on:
  push:
    branches:
      - main
```

### 4. Jobs, Dependencies, and Sequential Execution
Jobs are independent unless dependencies are specified using `needs`:

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Job 1"
  job2:
    needs: job1
    runs-on: ubuntu-latest
    steps:
      - run: echo "Job 2 after job1"
```

### 5. Actions Usage
Actions are reusable components. Example to checkout repository:

```yaml
- name: Check out repository code
  uses: actions/checkout@v4
```

### 6. Runners Specifications
Use `runs-on` to specify required runners such as `ubuntu-latest`, `windows-latest`, or custom labels:

```yaml
runs-on: [self-hosted, linux, x64]
```

### 7. Advanced Features
#### Matrix Strategy
Run jobs across different versions/environments:

```yaml
strategy:
  matrix:
    node: [14, 16]
```

#### Caching Dependencies
Cache dependencies to speed up workflows:

```yaml
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-build-${{ hashFiles('**/package-lock.json') }}
```

#### Secrets and Environment Variables
Inject secrets into workflows securely:

```yaml
- name: Retrieve secret
  env:
    my_secret: ${{ secrets.MY_SECRET }}
  run: echo $my_secret
```

#### Service Containers
Run ephemeral containers for services (e.g., PostgreSQL):

```yaml
services:
  postgres:
    image: postgres
```

### 8. Workflow Templates & Reusability
Preconfigured templates can be used from the GitHub Marketplace or the starter-workflows repository to speed up setup.

### 9. Troubleshooting and Best Practices
- Ensure workflow files are placed under `.github/workflows`.
- Validate YAML syntax using linters.
- Use `needs` to control job sequence.
- Avoid recursive triggers by configuring token usage appropriately.
- Check logs in GitHub Actions UI for detailed step outputs.

## Supplementary Details
### Supplementary Technical Specifications

1. **Workflow File Requirements:**
   - File path: `.github/workflows/<filename>.yml`
   - Must include at least one event trigger via the `on` key.

2. **Configuration Options:**
   - `runs-on`: Specifies runner type. Defaults like `ubuntu-latest` are provided.
   - `strategy.matrix`: Defines parameter arrays for multiple job runs. E.g., node versions: `[14, 16]`.
   - `needs`: Specifies job dependencies; if not defined, jobs run in parallel.
   - Secrets: Referenced as `${{ secrets.SECRET_NAME }}`, must be defined in repository settings.
   - Environment variables: Configured in the `env` block and accessible via shell.

3. **Implementation Steps for Creating a Workflow:**
   a. Create a new YAML file in `.github/workflows`.
   b. Define the `on` key for triggers (e.g. `push`).
   c. Define `jobs` and specify their `runs-on` and `steps`.
   d. Use the `actions/checkout` action to pull repository code.
   e. Implement additional steps like file listing (`ls ${{ github.workspace }}`) and echo commands.
   f. Commit the workflow to trigger its execution.

4. **Best Practices:**
   - Organize workflows by function (CI, deployment, testing).
   - Separate secrets from code by storing them in repository secrets.
   - Use matrix strategies to test multiple environments.
   - Utilize caching to reduce redundant downloads and installations.
   - Monitor job logs for output and investigate failing steps using detailed log commands.

5. **Troubleshooting Procedures:**
   - Check GitHub Actions run logs for step outputs and errors.
   - Validate YAML syntax using online parsers or local linters.
   - If jobs fail due to token authentication, switch from GITHUB_TOKEN to a Personal Access Token or GitHub App token as needed.
   - Use `echo` debugging: insert commands like `echo "Variable: ${{ variable }}"` in steps.
   - If caching fails, verify the cache key format and existence of target directories.

## Reference Details
### Complete API Specifications and Code Examples

#### Workflow YAML Structure
```yaml
# File: .github/workflows/github-actions-demo.yml
name: GitHub Actions Demo
run-name: "${{ github.actor }} is testing out GitHub Actions 🚀"
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 Triggered by: ${{ github.event_name }}"
      - run: echo "🐧 Running on OS: ${{ runner.os }}"
      - run: echo "🔎 Branch: ${{ github.ref }} | Repo: ${{ github.repository }}"
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "💡 Repository cloned."
      - name: List repository files
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 Job status: ${{ job.status }}"
```

#### Matrix Strategy Example
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
      - run: npm install
      - run: npm test
```

#### Caching Dependencies Example
```yaml
jobs:
  cache-example:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Cache node modules
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      - run: npm ci
```

#### Using Secrets Example
```yaml
jobs:
  secret-example:
    runs-on: ubuntu-latest
    steps:
      - name: Use Secret
        env:
          MY_SECRET: ${{ secrets.MY_SECRET }}
        run: |
          echo "The secret is $MY_SECRET"
```

#### Service Container Example
```yaml
jobs:
  container-job:
    runs-on: ubuntu-latest
    container: node:20-bookworm-slim
    services:
      postgres:
        image: postgres
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: 5432
```

#### Troubleshooting Commands
- **Validate YAML:**
  Command: `yamllint .github/workflows/github-actions-demo.yml`
- **View Logs:**
  Use GitHub Actions UI to expand each step log; expected outputs include echoed environment variables and command status.
- **Debugging:**
  Insert debugging commands such as `echo "Debug: ${{ variable }}"` to track variable values.

#### SDK Method Signatures (Contextual in GitHub Actions)
- Although GitHub Actions does not expose SDK method signatures in a traditional sense, actions like `actions/checkout` come with versioned releases (e.g., v4) and parameters documented on their Marketplace page.

---

These specifications are fully actionable by developers, offering exact code samples and configuration options needed to implement and troubleshoot GitHub Actions workflows.

## Original Source
GitHub Actions Documentation
https://docs.github.com/en/actions

## Digest of GITHUB_ACTIONS

# GitHub Actions Documentation

**Retrieved Date:** 2023-10-27

## Overview
GitHub Actions is a CI/CD platform enabling automation of build, test, and deployment pipelines. Workflows are defined in YAML files stored in the `.github/workflows` directory and can be triggered by events (push, pull request, schedule, repository_dispatch, etc.).

## Workflows
- **Definition:** YAML files specifying one or more jobs.
- **Key Elements:**
  - `on`: Event triggers (e.g., push, fork, schedule, manual)
  - `jobs`: Group of tasks to execute.
  - **Example Workflow File:**

```yaml
name: GitHub Actions Demo
run-name: "${{ github.actor }} is testing out GitHub Actions 🚀"
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 Branch: ${{ github.ref }}, Repository: ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "💡 Repository cloned to runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 Job status is ${{ job.status }}."
```

## Events & Triggers
- **Triggers:** `push`, `fork`, `issue`, `schedule`, etc.
- **Event Properties:** Each event passes contextual information (e.g., `github.event_name`, `github.ref`).

## Jobs and Steps
- **Job Definition:** A collection of steps executed on a runner.
- **Dependencies:** Use `needs` to define job order.

**Example:**

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - run: ./setup_server.sh
  build:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - run: ./build_server.sh
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: ./test_server.sh
```

## Actions
- **Definition:** Reusable extensions; can be custom or marketplace provided.
- **Usage Example:**

```yaml
- name: Check out repository code
  uses: actions/checkout@v4
```

## Runners
- **Types:** GitHub-hosted (Ubuntu, Windows, macOS) and self-hosted.
- **Configuration:** Specify using `runs-on` key. E.g., `runs-on: [self-hosted, linux, x64, gpu]` 

## Advanced Workflow Features
### Matrix Strategy
- **Purpose:** Execute job variations concurrently using variable combinations.

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

### Caching Dependencies
- **Example using npm cache:**

```yaml
- name: Cache node modules
  uses: actions/cache@v4
  env:
    cache-name: cache-node-modules
  with:
    path: ~/.npm
    key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-build-${{ env.cache-name }}-
```

### Secrets and Environment Variables
- **Setting Secret:** Use repository secrets and reference them as `${{ secrets.SECRET_NAME }}`.
- **Example:**

```yaml
- name: Retrieve secret
  env:
    super_secret: ${{ secrets.SUPERSECRET }}
  run: |
    echo "The secret is $super_secret"
```

### Service Containers
- **Usage:** Run ephemeral containers to provide services (e.g., PostgreSQL) for jobs.

```yaml
jobs:
  container-job:
    runs-on: ubuntu-latest
    container: node:20-bookworm-slim
    services:
      postgres:
        image: postgres
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: 5432
```

## Workflow Templates
- **Usage:** Preconfigured YAML templates based on project language/framework.
- **Location:** [`actions/starter-workflows`](https://github.com/actions/starter-workflows)

## Troubleshooting and Best Practices
- **Configuration Validation:** Ensure YAML files are in `.github/workflows`.
- **Environment Variables:** Test variable outputs using echo commands.
- **Job Dependencies:** Use `needs` to control execution flow and avoid parallel job conflicts.
- **Recursive Trigger Prevention:** Use correct token (avoid using GITHUB_TOKEN for triggering events to prevent loops).

---

**Attribution:** Data crawled from GitHub Actions Documentation (https://docs.github.com/en/actions)
**Data Size:** 988854 bytes

## Attribution
- Source: GitHub Actions Documentation
- URL: https://docs.github.com/en/actions
- License: License: Not specified
- Crawl Date: 2025-04-22T00:26:24.882Z
- Data Size: 988854 bytes
- Links Found: 16926

## Retrieved
2025-04-22
