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
