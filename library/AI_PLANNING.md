# AI_PLANNING

## Crawl Summary
The crawled content provides explicit technical specifications for AI planning including complete PDDL language versions and examples. It details PDDL 1.2 domain and problem file structures, action definitions, predicates, logical operators (and, or, not, imply, forall, exists), durative actions for PDDL2.1, derived predicates and timed initial literals for PDDL2.2, soft constraints for PDDL3.0, and processes/events for PDDL+. Technical command line examples for executing planners are provided along with exact code examples for domain and problem files.

## Normalised Extract
# Table of Contents
1. Introduction
2. PDDL Overview
   - PDDL 1.2
   - PDDL 2.1
   - PDDL 2.2
   - PDDL 3.0
   - PDDL+
3. Domain Specification
   - Domain File Structure
   - Detailed Example
4. Problem Specification
   - Problem File Structure
   - Detailed Example
5. Action and Logical Constructs
   - Action Example (BUILD-WALL)
   - Logical Operators (and, or, not, imply, forall, exists)
6. Command Line Execution
   - Execution Syntax Examples
7. Attribution & Data Details

---

## 1. Introduction
Extracted technical content focusing on AI planning and PDDL with exact code examples for domain and problem definitions.

## 2. PDDL Overview
- **PDDL 1.2:** Uses predicate logic for state definitions.
- **PDDL 2.1:** Introduces durative actions with time (duration parameter) and numeric fluents.
- **PDDL 2.2:** Adds derived predicates and timed initial literals for delayed facts.
- **PDDL 3.0:** Introduces soft constraints with preferences and cost metrics.
- **PDDL+:** Models processes (continuous change) and events (instantaneous changes).

## 3. Domain Specification
### Domain File Structure
A domain file defines universal problem aspects:
- Domain name
- Extends clause (optional)
- Requirements (e.g. :strips, :typing)
- Types and subtypes
- Constants (if any)
- Predicates with typed parameters
- Timeless predicates
- Actions with parameter, preconditions, and effects
- Axioms for derived predicates

### Detailed Example
```
(define
    (domain construction)
    (:extends building)
    (:requirements :strips :typing)
    (:types
        site material - object
        bricks cables windows - material
    )
    (:constants mainsite - site)
    (:predicates
        (walls-built ?s - site)
        (windows-fitted ?s - site)
        (foundations-set ?s - site)
        (cables-installed ?s - site)
        (site-built ?s - site)
        (on-site ?m - material ?s - site)
        (material-used ?m - material)
    )
    (:timeless (foundations-set mainsite))
    (:action BUILD-WALL
        :parameters (?s - site ?b - bricks)
        :precondition (and
            (on-site ?b ?s)
            (foundations-set ?s)
            (not (walls-built ?s))
            (not (material-used ?b))
        )
        :effect (and
            (walls-built ?s)
            (material-used ?b)
        )
    )
    (:axiom
        :vars (?s - site)
        :context (and
            (walls-built ?s)
            (windows-fitted ?s)
            (cables-installed ?s)
        )
        :implies (site-built ?s)
    )
)
```

## 4. Problem Specification
### Problem File Structure
A problem file specifies:
- The problem name
- The associated domain
- Objects (with types) present in the instance
- The initial state setup
- The goal state definition

### Detailed Example
```
(define
    (problem buildingahouse)
    (:domain construction)
    (:objects
        s1 - site
        b - bricks
        w - windows
        c - cables
    )
    (:init
        (on-site b s1)
        (on-site c s1)
        (on-site w s1)
    )
    (:goal (and
            (walls-built s1)
            (cables-installed s1)
            (windows-fitted s1)
        )
    )
)
```

## 5. Action and Logical Constructs
### Action Example: BUILD-WALL
```
(:action BUILD-WALL
    :parameters (?s - site ?b - bricks)
    :precondition (and
        (on-site ?b ?s)
        (foundations-set ?s)
        (not (walls-built ?s))
        (not (material-used ?b))
    )
    :effect (and
        (walls-built ?s)
        (material-used ?b)
    )
)
```

### Logical Operators
- **and:** `(and (predicate1) (predicate2))`
- **or:** `(or (predicate1) (predicate2))`
- **not:** `(not (predicate))`
- **imply:** `(imply (antecedent) (consequent))`
- **forall:** 
  ```
  (forall (?b - bricks)
      (not (material-used ?b))
  )
  ```
- **exists:** 
  ```
  (exists (?c - bricks)
      (not (material-used ?c))
  )
  ```

## 6. Command Line Execution
Execute planners using command line:

```
./<planner> <domain> <problem>
```
or
```
./<planner> -o <domain> -f <problem>
```

Tools may auto-detect plan output using regex patterns (e.g. Eviscerator).

## 7. Attribution & Data Details
- **URL:** https://planning.wiki/
- **Data Size:** 1944938 bytes
- **Links Found:** 4858
- **Contributors:** Adam Green, Benjamin Jacob Reji, ChrisE2018, Christian Muise, Enrico Scala, Felipe Meneguzzi, Francisco Martin Rico, Henry Stairs, Jan Dolejsi, Mau Magnaguagno, Jonathan Mounty


## Supplementary Details
## Detailed Supplementary Specifications

### PDDL Domain and Problem Setup
- **Domain Name:** Must match both domain and problem files to ensure compatibility.
- **Requirements:** Use ':strips' and ':typing' for basic PDDL 1.2 compliance. Other requirements can include :adl, :equality, etc., depending on planner support.
- **Types:** Define using `(:types <type> - object)` syntax. Subtyping can be implemented as `<subtype> - <supertype>`.
- **Constants:** Use `(:constants name - type)`; typical default is mainsite.
- **Predicates:** Must list all predicates with typed parameters. E.g., (walls-built ?s - site).

### Action Implementation Steps
1. Define action with `:action <name>`, set parameters with type definitions.
2. Specify preconditions using logical combinations (and, not, etc.).
3. Define effects similarly with assignment of predicate truth values.

Example Implementation:
```
(:action BUILD-WALL
    :parameters (?s - site ?b - bricks)
    :precondition (and
        (on-site ?b ?s)
        (foundations-set ?s)
        (not (walls-built ?s))
        (not (material-used ?b))
    )
    :effect (and
        (walls-built ?s)
        (material-used ?b)
    )
)
```

### Command Line & Configuration Options
- **Execution Syntax:** Ensure domain file and problem file are passed correctly.
- **Example:**
  - `./planner domain.pddl problem.pddl`
  - `./planner -o domain.pddl -f problem.pddl`
- **Debugging Tips:** Run planners with verbose flag (commonly `-v`) to see detailed search process and plan generation.

### Best Practices
- Always verify that the domain name in the domain file matches the :domain attribute in the problem file.
- Include complete set of predicates to avoid mismatches during planning.
- Test individual actions in isolation using custom test problems.

### Troubleshooting Procedures
1. **Mismatch Error:** Verify the consistency of type declarations between domain and problem files.
2. **Action Precondition Fails:** Insert trace logging (if supported) by running with `-v` flag; observe which predicates are not satisfied.
3. **Compilation Issues:** For planners built from source, ensure dependencies are installed (e.g., on Linux use `make` and check GCC version). 
   - Example command output: `gcc --version` should return GCC 7.5 or higher.
4. **Runtime Failures:** Check command syntax: use `./planner -o domain.pddl -f problem.pddl` to ensure proper parsing.


## Reference Details
## Complete API Specifications & SDK Method Signatures (PDDL as a DSL)

### Domain File API
- **Method Signature:** There is no function call but the structure must follow:
  - Domain Definition: `(define (domain <name>) ... )`
  - Requirements: `(:requirements :strips :typing [other requirements])`
  - Types: `(:types type1 type2 - object; subtype - type)`
  - Constants: `(:constants constantName - type)`
  - Predicates: `(:predicates (predicateName ?arg - type) ...)`
  - Actions: 
    ```
    (:action ACTION_NAME
        :parameters (?arg1 - type1 ?arg2 - type2 ...)
        :precondition (<logical_expression>)
        :effect (<logical_expression>)
    )
    ```
  - Axioms: 
    ```
    (:axiom
        :vars (?var - type)
        :context (<logical_expression>)
        :implies (<logical_expression>)
    )
    ```

### Problem File API
- **Method Signature:** Structure must follow:
  - Problem Definition: `(define (problem <name>) (:domain <domainName>) ... )`
  - Objects: `(:objects obj1 - type1 obj2 - type2 ...)`
  - Init: `(:init (predicate arg1 arg2 ...))`
  - Goal: `(:goal (and (predicate arg1 ...) ...))`

### Full Code Examples

**Domain Example:**
```
(define
    (domain construction)
    (:extends building)
    (:requirements :strips :typing)
    (:types
        site material - object
        bricks cables windows - material
    )
    (:constants mainsite - site)
    (:predicates
        (walls-built ?s - site)
        (windows-fitted ?s - site)
        (foundations-set ?s - site)
        (cables-installed ?s - site)
        (site-built ?s - site)
        (on-site ?m - material ?s - site)
        (material-used ?m - material)
    )
    (:timeless (foundations-set mainsite))
    (:action BUILD-WALL
        :parameters (?s - site ?b - bricks)
        :precondition (and
            (on-site ?b ?s)
            (foundations-set ?s)
            (not (walls-built ?s))
            (not (material-used ?b))
        )
        :effect (and
            (walls-built ?s)
            (material-used ?b)
        )
    )
    (:axiom
        :vars (?s - site)
        :context (and
            (walls-built ?s)
            (windows-fitted ?s)
            (cables-installed ?s)
        )
        :implies (site-built ?s)
    )
)
```

**Problem Example:**
```
(define
    (problem buildingahouse)
    (:domain construction)
    (:objects
        s1 - site
        b - bricks
        w - windows
        c - cables
    )
    (:init
        (on-site b s1)
        (on-site c s1)
        (on-site w s1)
    )
    (:goal (and
            (walls-built s1)
            (cables-installed s1)
            (windows-fitted s1)
        )
    )
)
```

### Implementation Patterns
- **Step 1:** Define domain and list all elements.
- **Step 2:** Write corresponding problem file linking to the domain.
- **Step 3:** Run planner using command line syntax.

### Configuration Options
- Planner invocation flags (example):
  - `-o <domain file>` specifies the domain.
  - `-f <problem file>` specifies the problem.
  - `-v` for verbose output.

### Best Practices & Troubleshooting
- Always verify type consistency and domain names.
- Use verbose mode (`-v`) to diagnose unmet preconditions.
- Validate PDDL files with available validators (e.g., VAL for plan checking).
- For compilation issues in source-based planners, check dependency versions with commands like:
  - `gcc --version` (Expect GCC >= 7.5)
  - `make clean && make`

This detailed technical reference is intended to be used directly by developers implementing or troubleshooting AI planning systems using PDDL.


## Original Source
Automated Planning in AI
https://planning.wiki/

## Digest of AI_PLANNING

# AI_PLANNING DOCUMENT

**Retrieved:** 2023-10-27
**Data Size:** 1944938 bytes

---

# Introduction
This document contains the complete technical details extracted directly from the Automated Planning in AI crawl result (https://planning.wiki/). It covers the specifications of the Planning Domain Definition Language (PDDL), including the various versions like PDDL 1.2, PDDL2.1, PDDL2.2, PDDL3.0, and PDDL+. Full code examples of domain and problem files are provided, alongside detailed explanations of actions, predicates, and logical operators. 

# PDDL Overview

- **PDDL 1.2:** Based on STRIPS; defines objects, predicates, and actions.
- **PDDL 2.1:** Introduces durative actions with time and numeric fluents.
- **PDDL 2.2:** Adds derived predicates and timed initial literals.
- **PDDL 3.0:** Introduces soft constraints with cost assignments for preferences.
- **PDDL+:** Adds processes and events to model uncontrollable changes.

# PDDL Domain Specification

A domain file in PDDL 1.2 example:

```
(define
    (domain construction)
    (:extends building)
    (:requirements :strips :typing)
    (:types
        site material - object
        bricks cables windows - material
    )
    (:constants mainsite - site)

    (:predicates
        (walls-built ?s - site)
        (windows-fitted ?s - site)
        (foundations-set ?s - site)
        (cables-installed ?s - site)
        (site-built ?s - site)
        (on-site ?m - material ?s - site)
        (material-used ?m - material)
    )

    (:timeless (foundations-set mainsite))

    (:action BUILD-WALL
        :parameters (?s - site ?b - bricks)
        :precondition (and
            (on-site ?b ?s)
            (foundations-set ?s)
            (not (walls-built ?s))
            (not (material-used ?b))
        )
        :effect (and
            (walls-built ?s)
            (material-used ?b)
        )
    )

    (:axiom
        :vars (?s - site)
        :context (and
            (walls-built ?s)
            (windows-fitted ?s)
            (cables-installed ?s)
        )
        :implies (site-built ?s)
    )
    ; Additional actions omitted for brevity
)
```

# PDDL Problem Specification

A sample problem file in PDDL 1.2:

```
(define
    (problem buildingahouse)
    (:domain construction)
    (:objects
        s1 - site
        b - bricks
        w - windows
        c - cables
    )
    (:init
        (on-site b s1)
        (on-site c s1)
        (on-site w s1)
    )
    (:goal (and
            (walls-built s1)
            (cables-installed s1)
            (windows-fitted s1)
        )
    )
)
```

# PDDL Action & Logical Constructs

## Actions

Actions define state transformations. Example:

```
(:action BUILD-WALL
    :parameters (?s - site ?b - bricks)
    :precondition (and
        (on-site ?b ?s)
        (foundations-set ?s)
        (not (walls-built ?s))
        (not (material-used ?b))
    )
    :effect (and
        (walls-built ?s)
        (material-used ?b)
    )
)
```

## Logical Expressions

- **and:** `(and (predicate1) (predicate2) ...)`
- **or:** `(or (predicate1) (predicate2) ...)`
- **not:** `(not (predicate))`
- **imply:** `(imply (antecedent) (consequent))`
- **forall:** 
  ```
  (forall (?b - bricks)
      (not (material-used ?b))
  )
  ```
- **exists:** 
  ```
  (exists (?c - bricks)
      (not (material-used ?c))
  )
  ```

# Command Line Usage for Planners

Most AI planners are executed via the command line. Two common syntaxes:

```
./<planner> <domain> <problem>
```

```
./<planner> -o <domain> -f <problem>
```

Planners may output additional debugging and plan feedback, and tools like Eviscerator use regex to parse plan outputs.

# Attribution

- Crawled URL: https://planning.wiki/
- Data Size: 1944938 bytes
- Contributors include Adam Green, Benjamin Jacob Reji, ChrisE2018, Christian Muise, Enrico Scala, Felipe Meneguzzi, and others.


## Attribution
- Source: Automated Planning in AI
- URL: https://planning.wiki/
- License: License: CC BY-NC
- Crawl Date: 2025-04-21T04:49:45.258Z
- Data Size: 1944938 bytes
- Links Found: 4858

## Retrieved
2025-04-21
