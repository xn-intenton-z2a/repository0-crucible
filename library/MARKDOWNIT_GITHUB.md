# MARKDOWNIT_GITHUB

## Crawl Summary
Provides GitHub Flavored Markdown support for markdown-it. Plugin adds parsing for @mentions, #issues, #PRs, commit SHAs, gists using default regex patterns and URL templates. Initialize via md.use(require('markdown-it-github'), options). Core options: repo (owner/repo), userUrl, issueUrl, prUrl, commitUrl, gistUrl, shorthand (true), patternSuffix. Default patterns: /(^|\s|>)@.../, /(\b[0-9a-f]{7,40}\b)/ etc. Troubleshooting: disable linkify, use patternSuffix, supply repo for correct URL generation.

## Normalised Extract
Table of Contents
1 Installation
2 Usage
3 Options
4 Reference Patterns
5 Example
6 Troubleshooting

1 Installation
   npm install markdown-it-github

2 Usage
   const md = require('markdown-it')({ linkify: true });
   md.use(require('markdown-it-github'), options);

3 Options
   repo: string;   format "owner/repo"; required for issue/PR/commit linking
   userUrl: string; default https://github.com/%s; @mention URL template
   issueUrl: string; default https://github.com/%s/issues/%s; issue link template
   prUrl: string; default https://github.com/%s/pull/%s; PR link template
   commitUrl: string; default https://github.com/%s/commit/%s; commit SHA link template
   gistUrl: string; default https://gist.github.com/%s; gist link template
   shorthand: boolean; default true; enable shorthand # references
   patternSuffix: string; default ""; suffix to isolate patterns

4 Reference Patterns
   Mention regex: (?:^|\s|>)@([a-zA-Z0-9-_]+)
   Issue regex: (?:^|\s|>)#([0-9]+)
   Commit regex: \b[0-9a-f]{7,40}\b
   Gist regex:   \b[0-9a-f]{32}\b

5 Example
       const md = require('markdown-it')({ linkify: false });
       md.use(require('markdown-it-github'), { repo: 'owner/repo', shorthand: true });
       md.render('Fixes #45, ref commit abcdef1, mention @user');

6 Troubleshooting
   - If mentions not rendered: initialize MarkdownIt with linkify:false
   - If patterns conflict: set patternSuffix to a unique identifier
   - If links broken in SSR: ensure full absolute URLs in templates or provide repo option

## Supplementary Details
repo must match /^[^/]+\/[^
]+$/; userUrl template must include %s placeholder; issueUrl and prUrl templates must include two %s placeholders in order [repo, issue/PR number]; commitUrl must include two %s placeholders [repo, SHA]; gistUrl must include single %s for gist ID. patternSuffix is appended to each regex group to avoid matching conflicts. Plugin order: apply after core rules but before custom renderers. To disable built-in autolinks for issues, set shorthand:false. For full commit SHA linking, ensure SHA length ≥7. In SSR environments, preload base URL via options rather than environment variables.

## Reference Details
API Signature:
function githubPlugin(md: MarkdownIt, options?: GitHubPluginOptions): void

interface GitHubPluginOptions {
  repo?: string;          // required for #, PR and commit linking, format "owner/repo"
  userUrl?: string;       // default "https://github.com/%s"
  issueUrl?: string;      // default "https://github.com/%s/issues/%s"
  prUrl?: string;         // default "https://github.com/%s/pull/%s"
  commitUrl?: string;     // default "https://github.com/%s/commit/%s"
  gistUrl?: string;       // default "https://gist.github.com/%s"
  shorthand?: boolean;    // default true
  patternSuffix?: string; // default ""
}

Implementation Pattern:
1 Initialize MarkdownIt: const md = new MarkdownIt({ linkify: false, html: true, breaks: true });
2 Use plugin: md.use(githubPlugin, { repo: 'owner/repo', shorthand: true, patternSuffix: '_g' });
3 Render content: const html = md.render(input);

Example Code:
const MarkdownIt = require('markdown-it');
const github = require('markdown-it-github');
const md = new MarkdownIt({ linkify: false })
  .use(github, {
    repo: 'octo-org/octo-repo',
    userUrl: 'https://github.com/%s',
    shorthand: true,
    patternSuffix: '_gh'
  });

console.log(md.render('@octocat closed issue #99 in commit d34db33f1'));

Best Practices:
- Always disable linkify when using this plugin to prevent conflict with markdown-it autolinks.
- Provide repo option to enable issue, PR and commit linking.
- Use patternSuffix when combining with other mention or reference plugins.
- Chain plugin after custom code fence and emoji plugins to preserve syntax highlighting.

Troubleshooting Procedures:
1. Verify plugin applied: md.plugins.githubPlugin must exist.
2. Test regex patterns: new RegExp(pattern.source) on sample strings.
3. If issues not linked: confirm issueUrl includes two %s placeholders or repo is defined.
4. For missing commit links: ensure SHA length ≥7; adjust regex or pass full length via options.
5. Run: console.log(md.options) to inspect resolved userUrl, issueUrl etc.

## Information Dense Extract
plugin(md:MarkdownIt,options?:GitHubPluginOptions):void; default options: {userUrl:"https://github.com/%s",issueUrl:"https://github.com/%s/issues/%s",prUrl:"https://github.com/%s/pull/%s",commitUrl:"https://github.com/%s/commit/%s",gistUrl:"https://gist.github.com/%s",shorthand:true,patternSuffix:""}; regex patterns: mention/(?:^|\s|>)@([\w-]+)/g,issue/(?:^|\s|>)#(\d+)/g,commit/\b[0-9a-f]{7,40}\b/g,gist/\b[0-9a-f]{32}\b/g; usage: md=new MarkdownIt({linkify:false}).use(githubPlugin,{repo:"owner/repo",patternSuffix:"_gh"}); render: md.render(input); best practices: disable linkify, set repo, apply after code fence and emoji, use patternSuffix for conflict; troubleshooting: inspect md.plugins.githubPlugin, verify resolved URL templates, test regex on sample text.

## Sanitised Extract
Table of Contents
1 Installation
2 Usage
3 Options
4 Reference Patterns
5 Example
6 Troubleshooting

1 Installation
   npm install markdown-it-github

2 Usage
   const md = require('markdown-it')({ linkify: true });
   md.use(require('markdown-it-github'), options);

3 Options
   repo: string;   format 'owner/repo'; required for issue/PR/commit linking
   userUrl: string; default https://github.com/%s; @mention URL template
   issueUrl: string; default https://github.com/%s/issues/%s; issue link template
   prUrl: string; default https://github.com/%s/pull/%s; PR link template
   commitUrl: string; default https://github.com/%s/commit/%s; commit SHA link template
   gistUrl: string; default https://gist.github.com/%s; gist link template
   shorthand: boolean; default true; enable shorthand # references
   patternSuffix: string; default ''; suffix to isolate patterns

4 Reference Patterns
   Mention regex: (?:^|'s|>)@([a-zA-Z0-9-_]+)
   Issue regex: (?:^|'s|>)#([0-9]+)
   Commit regex: 'b[0-9a-f]{7,40}'b
   Gist regex:   'b[0-9a-f]{32}'b

5 Example
       const md = require('markdown-it')({ linkify: false });
       md.use(require('markdown-it-github'), { repo: 'owner/repo', shorthand: true });
       md.render('Fixes #45, ref commit abcdef1, mention @user');

6 Troubleshooting
   - If mentions not rendered: initialize MarkdownIt with linkify:false
   - If patterns conflict: set patternSuffix to a unique identifier
   - If links broken in SSR: ensure full absolute URLs in templates or provide repo option

## Original Source
Markdown-It Parser and Plugins
https://github.com/markdown-it/github

## Digest of MARKDOWNIT_GITHUB

# markdown-it-github (Retrieved 2024-06-28)

## Installation

npm install markdown-it-github

## Usage

const MarkdownIt = require('markdown-it');
const github = require('markdown-it-github');
const md = new MarkdownIt({ linkify: true })
  .use(github, options);

## Options

| Option        | Type             | Default                                | Description                                              |
| ------------- | ---------------- | -------------------------------------- | -------------------------------------------------------- |
| repo          | string           | —                                      | GitHub repository in "owner/repo" format                |
| userUrl       | string template  | "https://github.com/%s"              | URL template for @mention links                          |
| issueUrl      | string template  | "https://github.com/%s/issues/%s"    | URL template for #issue references                       |
| prUrl         | string template  | "https://github.com/%s/pull/%s"      | URL template for pull request references                 |
| commitUrl     | string template  | "https://github.com/%s/commit/%s"    | URL template for commit SHA references                   |
| gistUrl       | string template  | "https://gist.github.com/%s"          | URL template for gist references                         |
| shorthand     | boolean          | true                                   | Enable shorthand references for issues and PRs           |
| patternSuffix | string           | ""                                     | Suffix appended to all regex patterns to prevent overlap |

## Reference Patterns

- Mention: /(^|\s|>)@([a-zA-Z0-9-_]+)/g
- Issue:   /(^|\s|>)#([0-9]+)/g
- Commit:  /\b[0-9a-f]{7,40}\b/g
- Gist:    /\b[0-9a-f]{32}\b/g

## Example

```js
const MarkdownIt = require('markdown-it');
const github = require('markdown-it-github');
const md = new MarkdownIt({ linkify: false })
  .use(github, {
    repo: 'owner/repo',
    userUrl: 'https://github.com/%s',
    shorthand: true
  });

console.log(md.render('Issue #123, commit abcdef1, user @octocat'));
```

## Troubleshooting

1. Mentions not rendered: ensure MarkdownIt linkify option is set to false when initializing.
2. Regex collision with other plugins: set `patternSuffix` to a unique string to isolate patterns.
3. Broken links in server-side rendering: verify that `repo` option is provided or that custom URL templates include full protocol.

## Attribution

Source: https://github.com/markdown-it/github
Data Size: 0 bytes

## Attribution
- Source: Markdown-It Parser and Plugins
- URL: https://github.com/markdown-it/github
- License: License: MIT
- Crawl Date: 2025-05-10T06:28:46.888Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
