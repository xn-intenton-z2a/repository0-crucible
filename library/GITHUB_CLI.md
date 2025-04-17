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
