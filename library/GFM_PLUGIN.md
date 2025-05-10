# GFM_PLUGIN

## Crawl Summary
Provides a markdown-it plugin that extends core parser with GitHub-Flavored Markdown features by registering parsing rules. Configure via GithubOptions to enable autolinks, user mentions, emoji shortcodes, strikethrough, tables, task lists, and wiki links. Plugin signature: function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void. Options default to false. Install via npm or yarn and apply with md.use().

## Normalised Extract
Table of Contents
1 Installation
2 Usage
3 API Signature
4 Options Reference
5 Implementation Pattern
6 Troubleshooting

1 Installation
   npm install markdown-it markdown-it-github --save
   yarn add markdown-it markdown-it-github

2 Usage
   const md = new MarkdownIt({ html: true, linkify: false, typographer: false })
     .use(MarkdownItGithub, options)
   md.render(source)

3 API Signature
   function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void
   interface GithubOptions {
     exclude?: RegExp[]
     autolink?: boolean
     userMention?: boolean
     emoji?: boolean
     strikethrough?: boolean
     tables?: boolean
     taskLists?: boolean
     wikiLink?: boolean
   }

4 Options Reference
   exclude: RegExp[] = []
   autolink: boolean = false
   userMention: boolean = false
   emoji: boolean = false
   strikethrough: boolean = false
   tables: boolean = false
   taskLists: boolean = false
   wikiLink: boolean = false

5 Implementation Pattern
   1. Import MarkdownIt and plugin
   2. Initialize MarkdownIt with base config
   3. Apply plugin via .use(MarkdownItGithub, options)
   4. Call md.render() on input text

6 Troubleshooting
   - Tables not parsed: enable tables option
   - Mentions not linked: enable userMention
   - Emojis missing: enable emoji or include fallback
   - Task lists static: ensure correct syntax - [ ] / - [x]


## Supplementary Details
Compatibility: Node.js >=10, markdown-it >=12. Requires UTF-8 environment for emoji. No external runtime dependencies beyond markdown-it. Ensure html option in MarkdownIt set as needed. Plugin preserves existing rules and only adds GFM ones. Rule precedence: runs after core rules. Can disable individual rules via exclude array. Optimize performance by enabling only required features.

## Reference Details
API:
  Function: MarkdownItGithub
    Parameters:
      md: MarkdownIt instance
      options?: GithubOptions
    Returns: void

GithubOptions:
  exclude?: RegExp[]          Disable specific parsing rules by RegExp matching rule names
  autolink?: boolean          Default false; when true, bare URLs are auto-linked
  userMention?: boolean       Default false; when true, @username becomes <a href="/username">@username</a>
  emoji?: boolean             Default false; when true, :emoji: replaced with Unicode emoji
  strikethrough?: boolean     Default false; when true, ~~text~~ renders <s>text</s>
  tables?: boolean            Default false; when true, GFM tables render <table>...
  taskLists?: boolean         Default false; when true, - [ ] <li class="task-list-item"> renders checkbox
  wikiLink?: boolean          Default false; when true, [[Page]] becomes <a href="/wiki/Page">Page</a>

Full Example:
```js
const md = require('markdown-it')({ html: true })
  .use(require('markdown-it-github'), {
    autolink: true,
    userMention: true,
    emoji: true,
    strikethrough: true,
    tables: true,
    taskLists: true,
    wikiLink: false
  });
const out = md.render(`Hello @octocat :rocket:`);
console.log(out);
```

Best Practices:
- Enable only needed features to minimize parser overhead.
- Use exclude to disable default core rules when overriding behavior.
- Sanitize user input when html: true.
- Combine with markdown-it-abbr or markdown-it-footnote for extended capabilities.

Troubleshooting:
Command: node example.js
Expected: <p>Hello <a href="/octocat">@octocat</a> 🚀</p>
If output escapes emoji, verify environment supports Unicode or include polyfill.
If tables remain literal, check plugin order: markdown-it-table must be applied before markdown-it-github if using custom table plugin.


## Information Dense Extract
markdown-it-github plugin extends markdown-it parser: signature MarkdownItGithub(md,options). Options: exclude(RegExp[]=[]), autolink(false), userMention(false), emoji(false), strikethrough(false), tables(false), taskLists(false), wikiLink(false). Install via npm. Usage: md.use(MarkdownItGithub,{autolink:true,userMention:true,emoji:true,strikethrough:true,tables:true,taskLists:true}). Full code examples in referenceDetails. Requires markdown-it>=12, Node.js>=10, UTF-8. Troubleshoot by verifying option flags and syntax. Best practice: enable minimal feature set, sanitize html input, use exclude to customize rule application.

## Sanitised Extract
Table of Contents
1 Installation
2 Usage
3 API Signature
4 Options Reference
5 Implementation Pattern
6 Troubleshooting

1 Installation
   npm install markdown-it markdown-it-github --save
   yarn add markdown-it markdown-it-github

2 Usage
   const md = new MarkdownIt({ html: true, linkify: false, typographer: false })
     .use(MarkdownItGithub, options)
   md.render(source)

3 API Signature
   function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void
   interface GithubOptions {
     exclude?: RegExp[]
     autolink?: boolean
     userMention?: boolean
     emoji?: boolean
     strikethrough?: boolean
     tables?: boolean
     taskLists?: boolean
     wikiLink?: boolean
   }

4 Options Reference
   exclude: RegExp[] = []
   autolink: boolean = false
   userMention: boolean = false
   emoji: boolean = false
   strikethrough: boolean = false
   tables: boolean = false
   taskLists: boolean = false
   wikiLink: boolean = false

5 Implementation Pattern
   1. Import MarkdownIt and plugin
   2. Initialize MarkdownIt with base config
   3. Apply plugin via .use(MarkdownItGithub, options)
   4. Call md.render() on input text

6 Troubleshooting
   - Tables not parsed: enable tables option
   - Mentions not linked: enable userMention
   - Emojis missing: enable emoji or include fallback
   - Task lists static: ensure correct syntax - [ ] / - [x]

## Original Source
Markdown-it and GitHub Flavored Markdown Plugin
https://github.com/markdown-it-github/markdown-it-github#readme

## Digest of GFM_PLUGIN

# GFM Plugin for markdown-it

## Installation

Install the plugin and its peer dependency:

```bash
npm install markdown-it markdown-it-github --save
# or with yarn
yarn add markdown-it markdown-it-github
```

## Usage

Import, configure and render Markdown with GitHub Flavored extensions:

```js
const MarkdownIt = require('markdown-it');
const MarkdownItGithub = require('markdown-it-github');

const md = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: false
})
.use(MarkdownItGithub, {
  autolink: true,
  userMention: true,
  emoji: true,
  strikethrough: true,
  tables: true,
  taskLists: true,
  wikiLink: false
});

const input = `# Title

Hello @user, this is ~~deleted~~ text with :smile: and a task list:

- [ ] item one
- [x] item two

| A | B |
| - | - |
| 1 | 2 |
`;

console.log(md.render(input));
```

## API Signature

```ts
import type { MarkdownIt } from 'markdown-it';

export interface GithubOptions {
  exclude?: RegExp[];      // list of rules to disable
  autolink?: boolean;      // convert bare URLs to links (default: false)
  userMention?: boolean;   // render @username as link to /username (default: false)
  emoji?: boolean;         // enable emoji shortcuts (default: false)
  strikethrough?: boolean; // enable ~~strike~~ (default: false)
  tables?: boolean;        // enable GFM tables (default: false)
  taskLists?: boolean;     // enable GFM task lists (default: false)
  wikiLink?: boolean;      // enable [[WikiLinks]] (default: false)
}

export function MarkdownItGithub(md: MarkdownIt, options?: GithubOptions): void;
```

## Configuration Details

| Option        | Type       | Default | Effect                                     |
|---------------|------------|---------|--------------------------------------------|
| exclude       | RegExp[]   | []      | Disable matching rules                     |
| autolink      | boolean    | false   | Turn bare URLs into clickable anchors      |
| userMention   | boolean    | false   | Convert @username into GitHub profile link |
| emoji         | boolean    | false   | Replace :emoji: codes with Unicode emojis  |
| strikethrough | boolean    | false   | Render ~~text~~ as strikethrough           |
| tables        | boolean    | false   | Parse and render GFM-style tables          |
| taskLists     | boolean    | false   | Convert - [ ] and - [x] into checkboxes     |
| wikiLink      | boolean    | false   | Convert [[PageName]] into wiki links      |

## Implementation Pattern

1. Instantiate MarkdownIt with base options.
2. Apply plugin via `.use()`.
3. Pass `options` object to enable desired GFM features.
4. Call `md.render()` on source string.

## Troubleshooting

- If tables render as code blocks, ensure `tables: true` in plugin options and disable code indent detection in base config.
- For unmapped emojis, verify Node environment supports Unicode, or include `markdown-it-emoji` as fallback.
- Task lists not rendering: confirm input has space after bracket: `- [ ]` or `- [x]`.

> Retrieved on: 2024-06-24


## Attribution
- Source: Markdown-it and GitHub Flavored Markdown Plugin
- URL: https://github.com/markdown-it-github/markdown-it-github#readme
- License: License: MIT
- Crawl Date: 2025-05-10T07:57:56.572Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
