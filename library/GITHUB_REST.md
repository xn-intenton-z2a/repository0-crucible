# GITHUB_REST

## Crawl Summary
The crawled content provides technical details on using the GitHub REST API, including authentication methods through GitHub CLI, Octokit.js, and curl. It details CLI usage in terminal and GitHub Actions, provides complete code examples for API requests (GET /repos/{owner}/{repo}/issues), outlines API versioning with the usage of the X-GitHub-Api-Version header, and describes breaking changes. Full code snippets and YAML configurations are provided alongside detailed steps for generating tokens for GitHub Apps.

## Normalised Extract
# Table of Contents
1. Authentication & GitHub CLI Usage
2. GitHub CLI in GitHub Actions
3. Using Octokit.js in JavaScript
4. Using curl for API Requests
5. API Versioning & Breaking Changes

## 1. Authentication & GitHub CLI Usage
- Command to login: `gh auth login`.
- Endpoint request: `gh api /octocat --method GET`.

## 2. GitHub CLI in GitHub Actions
- YAML sample for invoking API:
```yaml
on:
  workflow_dispatch:
jobs:
  use_api:
    runs-on: ubuntu-latest
    permissions:
      issues: read
    steps:
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh api https://api.github.com/repos/octocat/Spoon-Knife/issues
```
- GitHub App integration: Executing `actions/create-github-app-token@v1` to generate a token, then using it with gh api.

## 3. Using Octokit.js in JavaScript
- Install Octokit: `npm install octokit`
- Code snippet:
```javascript
import { Octokit } from "octokit";
const octokit = new Octokit({ 
  auth: 'YOUR-TOKEN'
});

// Example API call
await octokit.request("GET /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "Spoon-Knife",
});
```
- In GitHub Actions, use Node.js setup and pass TOKEN as an environment variable.

## 4. Using curl for API Requests
- Example command:
```shell
curl --request GET \
  --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
  --header "Accept: application/vnd.github+json" \
  --header "Authorization: Bearer YOUR-TOKEN"
```
- YAML integration example is provided for GitHub Actions.

## 5. API Versioning & Breaking Changes
- Use header to specify version:
```shell
curl --header "X-GitHub-Api-Version:2022-11-28" https://api.github.com/zen
```
- Breaking changes include removal/renaming of parameters, addition of required parameters, and changes in authentication. Version 2022-11-28 introduces date-based versioning without breaking changes.


## Supplementary Details
## Technical Specifications & Implementation Details

### GitHub CLI Authentication
- Command: `gh auth login`
- Options: Choose between GitHub.com or custom domain (e.g., octocorp.ghe.com)
- Protocol: HTTPS recommended so GitHub CLI auto-stores Git credentials.

### GitHub CLI API Request
- Syntax: `gh api <path> --method <HTTP_METHOD>`
- Example: `gh api /octocat --method GET`
- Use in GitHub Actions with environment variable GH_TOKEN and proper permissions.

### Octokit.js Integration
- Installation: `npm install octokit`
- Import: `import { Octokit } from "octokit";`
- Constructor: `const octokit = new Octokit({ auth: 'YOUR-TOKEN' });`
- API Request Signature:
  - Method: `octokit.request(method: string, parameters: object)`
  - Example:
    ```javascript
    await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "octocat",
      repo: "Spoon-Knife"
    });
    ```

### Curl Command for API Requests
- Basic syntax:
  - `curl --request GET --url "API_URL" --header "Accept: application/vnd.github+json" --header "Authorization: Bearer YOUR-TOKEN"`
- Use in Actions: Pass token via environment variables.

### API Versioning
- Header: `X-GitHub-Api-Version`
- Default version if omitted: 2022-11-28
- Example usage in curl: `curl --header "X-GitHub-Api-Version:2022-11-28" https://api.github.com/zen`

### GitHub App Authentication in Actions
- Use workflow step with `actions/create-github-app-token@v1`:
  - Parameters:
    - `app-id`: Your app identifier
    - `private-key`: RSA private key string including header and footer lines
- Token generated is valid for 60 minutes, then use with GH_TOKEN environment variable.

### YAML Workflow Best Practices
- Define permissions explicitly (e.g., issues: read)
- Use secrets for sensitive tokens
- Example workflow provided for both CLI and curl usage.



## Reference Details
## Complete API Specifications and Code Examples

### GitHub REST API Endpoint Example: Get Repository Issues

**HTTP Method:** GET
**Endpoint:** /repos/{owner}/{repo}/issues
**Parameters:**
- owner (string): Repository owner name
- repo (string): Repository name

**Response:**
- Returns JSON array of issues with properties such as title, body, and user details.

**Example using Octokit.js:**
```javascript
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
});

async function getIssues() {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "octocat",
      repo: "Spoon-Knife"
    });
    console.log(response.data);
  } catch (error) {
    console.error(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
  }
}

getIssues();
```

### GitHub CLI Example

**Command:**
```shell
gh auth login
gh api /octocat --method GET
```

**GitHub Actions YAML using CLI:**
```yaml
on:
  workflow_dispatch:
jobs:
  use_api:
    runs-on: ubuntu-latest
    permissions:
      issues: read
    steps:
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh api https://api.github.com/repos/octocat/Spoon-Knife/issues
```

### Curl Command Example

**Command:**
```shell
curl --request GET \
  --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
  --header "Accept: application/vnd.github+json" \
  --header "Authorization: Bearer YOUR-TOKEN"
```

**GitHub Actions YAML using curl:**
```yaml
on:
  workflow_dispatch:
jobs:
  use_api:
    runs-on: ubuntu-latest
    permissions:
      issues: read
    steps:
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          curl --request GET \
          --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
          --header "Accept: application/vnd.github+json" \
          --header "Authorization: Bearer $GH_TOKEN"
```

### API Versioning Example

**Specifying the API Version Header:**
```shell
curl --header "X-GitHub-Api-Version:2022-11-28" https://api.github.com/zen
```

### Troubleshooting Procedures
1. **Authentication Failures:**
   - Command: `gh auth status` to check for correct login.
   - For curl, ensure token is passed correctly in header.
2. **Rate Limit Exceeded:**
   - Check the HTTP response for rate limit headers and adjust usage.
3. **Version Mismatch:**
   - If receiving 400 errors, verify the `X-GitHub-Api-Version` header is set to a supported version.

### Detailed Steps for GitHub App Authentication in Actions
1. Store your GitHub App ID in a configuration variable (e.g., APP_ID).
2. Generate and store your app's RSA private key as a secret (e.g., APP_PEM) including header/footer.
3. Use the following YAML step:
```yaml
- name: Generate token
  id: generate-token
  uses: actions/create-github-app-token@v1
  with:
    app-id: ${{ vars.APP_ID }}
    private-key: ${{ secrets.APP_PEM }}
```
4. Use the generated token in subsequent steps:
```yaml
- name: Use API
  env:
    GH_TOKEN: ${{ steps.generate-token.outputs.token }}
  run: |
    gh api https://api.github.com/repos/octocat/Spoon-Knife/issues
```

This complete specification ensures developers can directly implement GitHub REST API integration with accurate commands, code examples, configuration details, and troubleshooting steps without needing external documentation.


## Original Source
GitHub REST API
https://docs.github.com/en/rest

## Digest of GITHUB_REST

# GitHub REST API Documentation Digest

**Retrieved On:** 2023-10-04

## Overview
The GitHub REST API documentation provides endpoints for creating integrations, retrieving data, and automating workflows. The documentation covers methods ranging from authentication, using GitHub CLI, Octokit.js integration, using curl commands, and best practice recommendations.

## Table of Contents
1. Authentication & GitHub CLI Usage
2. GitHub CLI in GitHub Actions
3. Using Octokit.js in JavaScript
4. Using curl for API Requests
5. API Versioning & Breaking Changes

## 1. Authentication & GitHub CLI Usage
- **Authentication via CLI:**
  - Command: `gh auth login`
  - Prompts to select GitHub.com or other host (e.g., octocorp.ghe.com).
  - On choosing HTTPS, GitHub CLI stores credentials for `git push`/`git pull`.
- **API Request Example using CLI:**
  - `gh api /octocat --method GET`

## 2. GitHub CLI in GitHub Actions
- **Workflow YAML Example:**
```yaml
on:
  workflow_dispatch:
jobs:
  use_api:
    runs-on: ubuntu-latest
    permissions:
      issues: read
    steps:
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh api https://api.github.com/repos/octocat/Spoon-Knife/issues
```
- **GitHub App Authentication:**
  - Use `actions/create-github-app-token@v1` step to generate token from app-id and private key secret.

## 3. Using Octokit.js in JavaScript
- **Installation:**
  - Command: `npm install octokit`
- **Import and Instance Creation:**
```javascript
import { Octokit } from "octokit";
const octokit = new Octokit({ 
  auth: 'YOUR-TOKEN'
});
```
- **API Request Example:**
```javascript
await octokit.request("GET /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "Spoon-Knife",
});
```
- **Using Octokit.js in GitHub Actions:**
  - Setup Node.js and install dependencies.
  - Environment variable TOKEN is passed (using GITHUB_TOKEN or generated token).
  - Sample script (.github/actions-scripts/use-the-api.mjs) provided below.

## 4. Using curl for API Requests
- **Basic curl Command Example:**
```shell
curl --request GET \
  --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
  --header "Accept: application/vnd.github+json" \
  --header "Authorization: Bearer YOUR-TOKEN"
```
- **Usage in GitHub Actions YAML:**
```yaml
on:
  workflow_dispatch:
jobs:
  use_api:
    runs-on: ubuntu-latest
    permissions:
      issues: read
    steps:
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          curl --request GET \
          --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
          --header "Accept: application/vnd.github+json" \
          --header "Authorization: Bearer $GH_TOKEN"
```

## 5. API Versioning & Breaking Changes
- **Specifying API Version:**
  - Use header: `X-GitHub-Api-Version:2022-11-28`
  - Example:
    ```shell
    curl --header "X-GitHub-Api-Version:2022-11-28" https://api.github.com/zen
    ```
- **Breaking Changes:**
  - Removal or renaming of parameters/fields
  - New required parameters
  - Changes in authentication requirements
  - Version 2022-11-28 is the first date-based version with no breaking changes.

## Attribution
- **Source URL:** https://docs.github.com/en/rest
- **Data Size:** 2327150 bytes
- **Links Found:** 16354


## Attribution
- Source: GitHub REST API
- URL: https://docs.github.com/en/rest
- License: License: Not specified
- Crawl Date: 2025-04-22T00:30:22.065Z
- Data Size: 2327150 bytes
- Links Found: 16354

## Retrieved
2025-04-22
