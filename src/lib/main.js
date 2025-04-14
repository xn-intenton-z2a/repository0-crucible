#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";
import { z } from "zod";
import fs from "fs";

// Define Zod schema for ontology
const ontologySchema = z.object({
  type: z.literal("owl"),
  capitals: z.array(
    z.object({
      city: z.string(),
      country: z.string()
    })
  )
});

export function main(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in main. Received args: " + JSON.stringify(args));
  }
  // Filter out verbose flag for the primary output message
  const filteredArgs = args.filter(arg => arg !== "--verbose");
  console.log(`Run with: ${JSON.stringify(filteredArgs)}`);
}

export function query(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in query. Received args: " + JSON.stringify(args));
  }
  
  // Determine if JSON flag is provided
  const jsonFlag = args.includes("--json");
  
  // Remove the '--query', '--verbose', and '--json' flags from the arguments
  const filteredArgs = args.filter(arg => arg !== "--query" && arg !== "--verbose" && arg !== "--json");
  
  const filters = {};
  const searchTerms = [];

  filteredArgs.forEach(arg => {
    if (arg.includes("=")) {
      const parts = arg.split("=");
      if (parts.length === 2) {
        const [key, value] = parts;
        filters[key] = value;
      } else {
        searchTerms.push(arg);
      }
    } else {
      searchTerms.push(arg);
    }
  });

  if (jsonFlag) {
    console.log(JSON.stringify({ searchTerms, filters }, null, 2));
    return;
  }

  if (Object.keys(filters).length > 0 && searchTerms.length > 0) {
    console.log(`Querying OWL ontologies for: ${searchTerms.join(" ")} with filters: ${JSON.stringify(filters)}`);
  } else if (Object.keys(filters).length > 0) {
    console.log(`Querying OWL ontologies with filters: ${JSON.stringify(filters)}`);
  } else if (searchTerms.length > 0) {
    console.log(`Querying OWL ontologies for: ${searchTerms.join(" ")}`);
  } else {
    console.log("Querying OWL ontologies (Feature under development)");
  }
}

export function diagnostics(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in diagnostics. Received args: " + JSON.stringify(args));
  }
  console.log("System Diagnostics:");
  console.log(`Node.js version: ${process.version}`);
  // You can add more diagnostic information here if needed
}

export function crawlData(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in crawlData. Received args: " + JSON.stringify(args));
  }
  console.log("Crawling data from public sources...");
}

/**
 * Generates a dummy OWL ontology in JSON format representing capital cities.
 * @param {string[]} args - Command line arguments
 */
export function generateCapitalCitiesOwl(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in generateCapitalCitiesOwl. Received args: " + JSON.stringify(args));
  }
  const ontology = {
    type: "owl",
    capitals: [
      { city: "Washington, D.C.", country: "USA" },
      { city: "London", country: "UK" },
      { city: "Tokyo", country: "Japan" }
    ]
  };
  console.log(JSON.stringify(ontology, null, 2));
}

/**
 * Builds an intermediate version of the OWL ontology without Zod validation.
 * @param {string[]} args - Command line arguments
 */
export function buildIntermediateOntology(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in buildIntermediateOntology. Received args: " + JSON.stringify(args));
  }
  const ontology = {
    type: "owl",
    capitals: [
      { city: "Washington, D.C.", country: "USA" },
      { city: "London", country: "UK" },
      { city: "Tokyo", country: "Japan" }
    ]
  };
  console.log(`Intermediate ontology built: ${JSON.stringify(ontology, null, 2)}`);
}

/**
 * Starts an Express server that provides a REST API.
 * @param {string[]} args - Command line arguments
 * @returns {import('http').Server} The server instance.
 */
export function serve(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in serve. Received args: " + JSON.stringify(args));
  }
  const app = express();
  const port = process.env.PORT || 3000;
  app.get("/", (req, res) => {
    res.json({ message: "owl-builder REST API" });
  });
  const server = app.listen(port, () => {
    console.log(`REST API server running on port ${port}`);
  });
  return server;
}

/**
 * Builds an enhanced OWL ontology, validates it using Zod, and outputs the validated ontology.
 * If the --persist flag is provided along with a file path, the ontology is written to that file.
 * @param {string[]} args - Command line arguments
 */
export function buildEnhancedOntology(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in buildEnhancedOntology. Received args: " + JSON.stringify(args));
  }
  // Reuse the dummy ontology from generateCapitalCitiesOwl
  const ontology = {
    type: "owl",
    capitals: [
      { city: "Washington, D.C.", country: "USA" },
      { city: "London", country: "UK" },
      { city: "Tokyo", country: "Japan" }
    ]
  };
  
  // Validate ontology using Zod schema
  const result = ontologySchema.safeParse(ontology);
  
  // Check for persist flag
  const persistIndex = args.indexOf("--persist");
  let filePath = null;
  if (persistIndex !== -1 && args.length > persistIndex + 1) {
    filePath = args[persistIndex + 1];
  }
  
  if (result.success) {
    if (filePath) {
      fs.writeFileSync(filePath, JSON.stringify(ontology, null, 2));
      console.log(`Enhanced ontology built, validated and persisted to file: ${filePath}`);
    } else {
      console.log(`Enhanced ontology built and validated: ${JSON.stringify(ontology, null, 2)}`);
    }
  } else {
    console.error("Ontology validation failed:", result.error);
  }
}

/**
 * Refreshes and merges persistent OWL ontology data with newly crawled data.
 * @param {string[]} args - Command line arguments
 */
export function refresh(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in refresh. Received args: " + JSON.stringify(args));
  }
  // Simulate merging process with dummy updated ontology
  const updatedOntology = {
    type: "owl",
    capitals: [
      { city: "Paris", country: "France" },
      { city: "Berlin", country: "Germany" },
      { city: "Tokyo", country: "Japan" }
    ]
  };
  console.log(`Refreshed ontology: ${JSON.stringify(updatedOntology, null, 2)}`);
}

/**
 * Displays help information with usage instructions for the CLI tool.
 * @param {string[]} args - Command line arguments
 */
export function displayHelp(args) {
  console.log(`
Usage: node src/lib/main.js [command] [options]

Commands:
  --help                 Display this help message.
  --diagnostics          Display system diagnostic information.
  --query [args]         Query OWL ontologies. Append search terms or key=value filters. Add --json for structured JSON output.
  --crawl                Crawl data from public sources.
  --capital-cities       Generate an OWL ontology for capital cities.
  --serve                Start the Express REST API server.
  --build-intermediate   Build an intermediate OWL ontology without Zod validation.
  --build-enhanced       Build an enhanced OWL ontology with Zod validation. Optionally, use --persist <filePath> to save the output.
  --refresh              Refresh and merge persistent OWL ontology data (placeholder implementation).
  --verbose              Enable verbose debug logging.
`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    displayHelp(args);
  } else if (args.includes("--diagnostics")) {
    diagnostics(args);
  } else if (args.includes("--query")) {
    query(args);
  } else if (args.includes("--crawl")) {
    crawlData(args);
  } else if (args.includes("--capital-cities")) {
    generateCapitalCitiesOwl(args);
  } else if (args.includes("--serve")) {
    serve(args);
  } else if (args.includes("--build-intermediate")) {
    buildIntermediateOntology(args);
  } else if (args.includes("--build-enhanced")) {
    buildEnhancedOntology(args);
  } else if (args.includes("--refresh")) {
    refresh(args);
  } else {
    main(args);
  }
}
