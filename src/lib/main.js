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
  
  // Determine if JSON and regex flags are provided
  const jsonFlag = args.includes("--json");
  const regexFlag = args.includes("--regex");

  // Remove the '--query', '--verbose', '--json', and '--regex' flags from the arguments
  const filteredArgs = args.filter(arg => !["--query", "--verbose", "--json", "--regex"].includes(arg));
  
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
    console.log(JSON.stringify({ searchTerms, filters, regex: regexFlag }, null, 2));
    return;
  }

  let prefix = "";
  if (regexFlag) {
    prefix = "with regex ";
  }

  if (Object.keys(filters).length > 0 && searchTerms.length > 0) {
    console.log(`Querying OWL ontologies ${prefix}for: ${searchTerms.join(" ")} with filters: ${JSON.stringify(filters)}`);
  } else if (Object.keys(filters).length > 0) {
    console.log(`Querying OWL ontologies ${prefix}with filters: ${JSON.stringify(filters)}`);
  } else if (searchTerms.length > 0) {
    console.log(`Querying OWL ontologies ${prefix}for: ${searchTerms.join(" ")}`);
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
 * Merges new ontology data with persisted ontology data. (New Feature)
 * Merges capitals from a persisted ontology (if provided via --persist flag) with new ontology data.
 * The merging is done by taking the union of the capitals arrays using the city name as a unique key.
 * If a duplicate city exists, new data overrides the persisted data.
 * If the --out flag is provided, the merged ontology is persisted to the specified file.
 * @param {string[]} args - Command line arguments
 */
export function mergePersist(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in mergePersist. Received args: " + JSON.stringify(args));
  }
  
  // Retrieve persisted ontology if provided via --persist flag
  const persistIndex = args.indexOf("--persist");
  let persistedOntology = { type: "owl", capitals: [] };
  if (persistIndex !== -1 && args.length > persistIndex + 1) {
    const filePath = args[persistIndex + 1];
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        persistedOntology = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error("Error reading persisted ontology file:", error);
    }
  }
  
  // Simulate new ontology data (dummy updated ontology)
  const newOntology = {
    type: "owl",
    capitals: [
      { city: "Paris", country: "France" },
      { city: "Berlin", country: "Germany" },
      { city: "Tokyo", country: "Japan" }
    ]
  };
  
  // Merge capitals arrays using city as unique key; new data overrides old entries
  const mergedCapitals = {};
  [persistedOntology.capitals, newOntology.capitals].forEach(capitalsArr => {
    capitalsArr.forEach(cityObj => {
      mergedCapitals[cityObj.city] = cityObj;
    });
  });
  const mergedOntology = { type: "owl", capitals: Object.values(mergedCapitals) };

  // Output the merged ontology
  console.log(JSON.stringify(mergedOntology, null, 2));

  // Check for '--out' flag to persist the merged ontology
  const outIndex = args.indexOf("--out");
  if (outIndex !== -1 && args.length > outIndex + 1) {
    const outPath = args[outIndex + 1];
    try {
      fs.writeFileSync(outPath, JSON.stringify(mergedOntology, null, 2));
      console.log(`Merged ontology persisted to file: ${outPath}`);
    } catch (error) {
      console.error("Error writing merged ontology to file:", error);
    }
  }
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
  --query [args]         Query OWL ontologies. Append search terms or key=value filters. Add --json for structured JSON output. Use --regex to treat search terms as regular expressions.
  --crawl                Crawl data from public sources.
  --capital-cities       Generate an OWL ontology for capital cities.
  --serve                Start the Express REST API server.
  --build-intermediate   Build an intermediate OWL ontology without Zod validation.
  --build-enhanced       Build an enhanced OWL ontology with Zod validation. Optionally, use --persist <filePath> to save the output.
  --refresh              Refresh and merge persistent OWL ontology data (placeholder implementation).
  --merge-persist        Merge new ontology data with persisted ontology data. Use --persist <filePath> to load persisted data (defaults to empty) and --out <filePath> to write the merged ontology to a file.
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
  } else if (args.includes("--merge-persist")) {
    mergePersist(args);
  } else {
    main(args);
  }
}
