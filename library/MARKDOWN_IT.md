# MARKDOWN_IT

## Crawl Summary
markdown-it v12.3.2 fully implements CommonMark + extensions.  Constructor: markdownit(preset?: 'commonmark'|'zero'|Options, options?: Options).  Default Options: html:false, xhtmlOut:false, breaks:false, langPrefix:'language-', linkify:false, typographer:false, quotes:'“”‘’', highlight:function(str,lang)->string returns ''.  Core Methods: render(src:string,env?:object)->string; renderInline(src:string,env?:object)->string; use(plugin:Function,...opts)->MarkdownIt; enable/disable(ruleName:string|string[])->MarkdownIt.  Plugin loading: md.use(plugin1,opts,...).  Syntax highlighting: override highlight option with callback to hljs.  Linkify: enable via linkify:true, configure via md.linkify.set({fuzzyEmail:false}).  Rule management: md.enable/disable.  Default rules in lib/rules_core, rules_block, rules_inline.  Benchmark: ~1500 ops/sec.  Enterprise via Tidelift.  Authors: Kocharin, Puzrin.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Initialization & Options
 3 Rendering API
 4 Plugin Integration
 5 Syntax Highlighting Setup
 6 Linkify Configuration
 7 Rule Management

1 Installation
 • Node.js: npm install markdown-it
 • Browser: include UMD bundle from jsDelivr or cdnjs

2 Initialization & Options
 • Signature: markdownit(presetOrOptions?, options?) returns MarkdownIt instance
 • Presets: 'commonmark', 'zero', 'default'
 • Options object fields and defaults:
    html: false
    xhtmlOut: false
    breaks: false
    langPrefix: 'language-'
    linkify: false
    typographer: false
    quotes: '“”‘’'
    highlight: function(str,lang) { return ''; }

3 Rendering API
 • render(src: string, env?: object) => string (full block rendering)
 • renderInline(src: string, env?: object) => string (inline rendering without paragraph tags)

4 Plugin Integration
 • Load plugin: md.use(pluginFunction, pluginOptions...)
 • Plugins receive markdown-it instance and options

5 Syntax Highlighting Setup
 • Provide highlight callback in options
 • Default wrapper omitted if return starts with '<pre'
 • Example using highlight.js: check language, apply hljs.highlight, return highlighted HTML or ''

6 Linkify Configuration
 • Enable with linkify: true
 • Access linkify-it instance via md.linkify
 • Configure with md.linkify.set({ fuzzyEmail: false })

7 Rule Management
 • Disable rules: md.disable(ruleNames)
 • Enable rules: md.enable(ruleNames)
 • Use array or single rule name



## Supplementary Details
Exact parameter values and steps:
 1. npm install markdown-it@12.3.2
 2. import or require:
    ES Module: import markdownit from 'markdown-it'
    CommonJS: const markdownit = require('markdown-it')
 3. Instantiate:
    const md = markdownit('commonmark')  // CommonMark strict
    const md = markdownit('zero')        // minimal feature set
    const md = markdownit({html:true,linkify:true,typographer:true})  // full features
 4. Render:
    md.render('# Title')               // returns '<h1>Title</h1>\n'
    md.renderInline('**bold**')       // returns '<strong>bold</strong>'
 5. Plugin load:
    md.use(require('markdown-it-footnote'))
    md.use(require('markdown-it-abbr'))
 6. Syntax highlighting:
    const md = markdownit({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return '<pre><code class="hljs">' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>'
        }
        return '<pre><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      }
    })
 7. Linkify:
    const md = markdownit({ linkify: true })
    md.linkify.set({ fuzzyLink: false, fuzzyEmail: false })
 8. Manage rules:
    md.disable(['image', 'html_block'])
    md.enable('html_block')
 9. Troubleshoot common issues:
    - No output: verify input string not empty and instance created
    - Plugins not applied: ensure md.use called before render
    - Highlighting errors: validate lang with hljs.getLanguage
    - Linkify not converting: enable linkify: true and call md.linkify.set
    - Rule config ignored: use correct rule names from parser_block and parser_inline


## Reference Details
Constructor:
  markdownit(presetOrOptions?: 'commonmark' | 'zero' | Options, options?: Options) => MarkdownIt

Options interface:
  interface Options {
    html?: boolean            // default false
    xhtmlOut?: boolean        // default false
    breaks?: boolean          // default false
    langPrefix?: string       // default 'language-'
    linkify?: boolean         // default false
    typographer?: boolean     // default false
    quotes?: string | [string, string, string, string]  // default '“”‘’'
    highlight?: (str: string, lang: string) => string   // returns escaped HTML or ''
  }

MarkdownIt methods:
  render(src: string, env?: object): string
    - Converts full markdown to HTML string with block wrappers

  renderInline(src: string, env?: object): string
    - Converts inline markdown without wrapping paragraphs

  use(plugin: (md: MarkdownIt, ...opts: any[]) => void, ...opts: any[]): this
    - Registers plugin; order matters

  enable(ruleNames: string | string[]): this
    - Activates one or multiple parsing rules

  disable(ruleNames: string | string[]): this
    - Deactivates one or multiple parsing rules

  set(options: Options): this
    - Updates instance options after creation

  linkify: LinkifyIt instance
    - Configure with linkify.set(opts: { fuzzyLink?: boolean; fuzzyEmail?: boolean })

Utility:
  md.utils.escapeHtml(str: string): string  // escapes HTML entities

Code Examples:
  // Full features
  import markdownit from 'markdown-it'
  import hljs from 'highlight.js'

  const md = markdownit({ html: true, linkify: true, typographer: true, highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code class="hljs">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
    }
    return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
  }})

  md.use(require('markdown-it-footnote'))
  md.use(require('markdown-it-abbr'))

  const html = md.render(`# Example`)

Best Practices:
  - Instantiate once and reuse for multiple renders
  - Preload and configure all plugins before first render
  - Provide highlighter that wraps output in <pre><code> to avoid external escaping
  - Disable unused rules to improve performance (e.g., md.disable(['footnote']))

Troubleshooting:
  1. Plugin not applied:
     Command: console.log(md.core.ruler.getRules('block'))
     Expected: array containing plugin rule name
  2. Highlight returning raw text:
     Ensure hljs.getLanguage(lang) returns true for given lang identifier
  3. Linkify not converting:
     Verify linkify:true in options and call md.linkify.set({ fuzzyEmail: false }) before render
  4. Incorrect HTML output:
     Run md.utils.escapeHtml on input to inspect unescaped characters


## Information Dense Extract
markdown-it@12.3.2: CommonMark+ extensions. Constructor markdownit(preset?: 'commonmark'|'zero'|Options, opts?: Options) => MarkdownIt. Default Options: html:false; xhtmlOut:false; breaks:false; langPrefix:'language-'; linkify:false; typographer:false; quotes:'“”‘’'; highlight:(str,lang)->string returns ''. Methods: render(src:string,env?:object)->string; renderInline(src:string,env?:object)->string; use(plugin,opts...)->this; enable(ruleNames)->this; disable(ruleNames)->this; set(opts)->this; utils.escapeHtml(str)->string; linkify.set({fuzzyLink?:boolean,fuzzyEmail?:boolean}). Plugin pattern: md.use(pluginFn,opts); Syntax Highlight: define highlight callback with hljs.highlight(str,{language,ignoreIllegals}); wrap returned HTML in <pre><code>. Linkify: require linkify:true in options; configure via md.linkify.set. Rule management: md.enable/md.disable with rule names array or string. Best practices: reuse instance, disable unused rules, preload plugins, wrap highlight output, escape raw HTML. Troubleshoot: inspect md.core.ruler.getRules('block'), validate hljs.getLanguage, confirm linkify options, use md.utils.escapeHtml for debugging.

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Initialization & Options
 3 Rendering API
 4 Plugin Integration
 5 Syntax Highlighting Setup
 6 Linkify Configuration
 7 Rule Management

1 Installation
  Node.js: npm install markdown-it
  Browser: include UMD bundle from jsDelivr or cdnjs

2 Initialization & Options
  Signature: markdownit(presetOrOptions?, options?) returns MarkdownIt instance
  Presets: 'commonmark', 'zero', 'default'
  Options object fields and defaults:
    html: false
    xhtmlOut: false
    breaks: false
    langPrefix: 'language-'
    linkify: false
    typographer: false
    quotes: ''
    highlight: function(str,lang) { return ''; }

3 Rendering API
  render(src: string, env?: object) => string (full block rendering)
  renderInline(src: string, env?: object) => string (inline rendering without paragraph tags)

4 Plugin Integration
  Load plugin: md.use(pluginFunction, pluginOptions...)
  Plugins receive markdown-it instance and options

5 Syntax Highlighting Setup
  Provide highlight callback in options
  Default wrapper omitted if return starts with '<pre'
  Example using highlight.js: check language, apply hljs.highlight, return highlighted HTML or ''

6 Linkify Configuration
  Enable with linkify: true
  Access linkify-it instance via md.linkify
  Configure with md.linkify.set({ fuzzyEmail: false })

7 Rule Management
  Disable rules: md.disable(ruleNames)
  Enable rules: md.enable(ruleNames)
  Use array or single rule name

## Original Source
markdown-it Parser
https://github.com/markdown-it/markdown-it#readme

## Digest of MARKDOWN_IT

# Retrieved on 2024-06-26

# Install

## Node.js
npm install markdown-it

## Browser (CDN)
Include UMD bundle from CDN:
<script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js"></script>

# Usage Examples

## Simple Rendering (Node.js ES Module)
import markdownit from 'markdown-it'
const md = markdownit()
const result = md.render('# markdown-it rulezz!')  # returns '<h1>markdown-it rulezz!</h1>\n'

## Inline Rendering
import markdownit from 'markdown-it'
const md = markdownit()
const resultInline = md.renderInline('__markdown-it__ rulezz!')  # returns '<strong>markdown-it</strong> rulezz!'

# Constructor & Options
**Signature:** markdownit(presetOrOptions?: 'commonmark' | 'zero' | Options, options?: Options) => MarkdownIt

**Options (defaults):**
  html:         false        # Enable HTML tags in source
  xhtmlOut:     false        # Close single tags with '/>' for CommonMark
  breaks:       false        # Convert '\n' in paragraphs into <br>
  langPrefix:   'language-'  # CSS class prefix for fenced code blocks
  linkify:      false        # Autoconvert URL-like text to links
  typographer:  false        # Enable replacements and smartquotes
  quotes:       '“”‘’'       # Quote pairs for typographer
  highlight:    function(str, lang) { return ''; }  # Highlight callback

# Plugins
Use any plugin that follows plugin(md: MarkdownIt, ...opts)

Example:
import markdownit from 'markdown-it'
import pluginContainer from 'markdown-it-container'
const md = markdownit().use(pluginContainer, 'warning')

# Syntax Highlighting
Set `highlight` option to override fenced code rendering:

import hljs from 'highlight.js'
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try { return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value } catch {} }
    return ''  # fall back to external escaping
  }
})

# Linkify Configuration
Enable URL autolinking via `linkify: true` then configure via md.linkify:

const md = markdownit({ linkify: true })
md.linkify.set({ fuzzyEmail: false })  # disable email linking

# Manage Rules
Enable or disable core parsing rules:

const md = markdownit()
md.disable(['link', 'image'])
md.enable('link')

# Core Rule Source Files
  lib/rules_core/replacements.mjs
  lib/rules_block/*.mjs
  lib/rules_inline/*.mjs

# API Methods
  render(src: string, env?: object) => string
  renderInline(src: string, env?: object) => string
  use(plugin: Function, ...opts: any[]) => MarkdownIt
  enable(ruleName: string | string[]) => MarkdownIt
  disable(ruleName: string | string[]) => MarkdownIt

# Benchmark Commands
npm run benchmark-deps
benchmark/benchmark.mjs readme

# Enterprise Support
Available via Tidelift Subscription for commercial maintenance

# Authors & References
Alex Kocharin (github/rlidwka)
Vitaly Puzrin (github/puzrin)
Big thanks to John MacFarlane and CommonMark project


## Attribution
- Source: markdown-it Parser
- URL: https://github.com/markdown-it/markdown-it#readme
- License: License: MIT
- Crawl Date: 2025-05-10T00:48:30.032Z
- Data Size: 618776 bytes
- Links Found: 5169

## Retrieved
2025-05-10
