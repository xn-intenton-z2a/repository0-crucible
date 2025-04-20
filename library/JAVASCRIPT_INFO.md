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
