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
      country: z.string(),
    }),
  ),
});

export function main(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in main. Received args: " + JSON.stringify(args));
  }
  // Filter out verbose flag for the primary output message
  const filteredArgs = args.filter((arg) => arg !== "--verbose");
  console.log(`Run with: ${JSON.stringify(filteredArgs)}`);
}

export function query(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in query. Received args: " + JSON.stringify(args));
  }

  // Determine if JSON, regex, fuzzy and ignore-case flags are provided
  const jsonFlag = args.includes("--json");
  const regexFlag = args.includes("--regex");
  const fuzzyFlag = args.includes("--fuzzy");
  const ignoreCaseFlag = args.includes("--ignore-case");

  // Remove the '--query', '--verbose', '--json', '--regex', '--fuzzy', and '--ignore-case' flags from the arguments
  const filteredArgs = args.filter(
    (arg) => !["--query", "--verbose", "--json", "--regex", "--fuzzy", "--ignore-case"].includes(arg),
  );

  const filters = {};
  const searchTerms = [];

  filteredArgs.forEach((arg) => {
    if (arg.includes("=")) {
      const parts = arg.split("=");
      if (parts.length === 2) {
        let [key, value] = parts;
        if (ignoreCaseFlag) {
          key = key.toLowerCase();
          value = value.toLowerCase();
        }
        filters[key] = value;
      } else {
        searchTerms.push(ignoreCaseFlag ? arg.toLowerCase() : arg);
      }
    } else {
      searchTerms.push(ignoreCaseFlag ? arg.toLowerCase() : arg);
    }
  });

  if (jsonFlag) {
    const resultObj = { searchTerms, filters, regex: regexFlag, fuzzy: fuzzyFlag };
    console.log(JSON.stringify(resultObj, null, 2));
    return;
  }

  const flags = [];
  if (regexFlag) flags.push("regex");
  if (fuzzyFlag) flags.push("fuzzy search");
  const prefix = flags.length > 0 ? "with " + flags.join(" and ") + " " : "";

  if (Object.keys(filters).length > 0 && searchTerms.length > 0) {
    console.log(
      `Querying OWL ontologies ${prefix}for: ${searchTerms.join(" ")} with filters: ${JSON.stringify(filters)}`,
    );
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

  if (args.includes("--json")) {
    const diag = {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
    };
    console.log(JSON.stringify(diag, null, 2));
    return;
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
  // Check for '--simulate' flag
  if (args.includes("--simulate")) {
    const simulatedData = {
      data: [
        { city: "SimCity", country: "SimCountry" },
        { city: "Testopolis", country: "Testland" },
      ],
    };
    console.log(JSON.stringify(simulatedData, null, 2));
  } else {
    console.log("Crawling data from public sources...");
  }
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
      { city: "Tokyo", country: "Japan" },
    ],
  };
  // If '--sort' flag is present, sort the capitals array alphabetically by city name
  if (args.includes("--sort")) {
    ontology.capitals.sort((a, b) => a.city.localeCompare(b.city));
  }
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
      { city: "Tokyo", country: "Japan" },
    ],
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
 * Also supports exporting the ontology in CSV format when --export-csv flag is provided.
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
      { city: "Tokyo", country: "Japan" },
    ],
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
    // Check if CSV export is requested
    if (args.includes("--export-csv")) {
      const header = "city,country";
      const rows = ontology.capitals.map((capital) => `${capital.city},${capital.country}`);
      const csv = [header, ...rows].join("\n");
      if (filePath) {
        fs.writeFileSync(filePath, csv);
        console.log(`Enhanced ontology built, validated and persisted to CSV file: ${filePath}`);
      } else {
        console.log(csv);
      }
    } else {
      if (filePath) {
        fs.writeFileSync(filePath, JSON.stringify(ontology, null, 2));
        console.log(`Enhanced ontology built, validated and persisted to file: ${filePath}`);
      } else {
        console.log(`Enhanced ontology built and validated: ${JSON.stringify(ontology, null, 2)}`);
      }
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
      { city: "Tokyo", country: "Japan" },
    ],
  };
  console.log(`Refreshed ontology: ${JSON.stringify(updatedOntology, null, 2)}`);
}

/**
 * Merges new ontology data with persisted ontology data. (New Feature)
 * Merges capitals from a persisted ontology (if provided via --persist flag) with new ontology data.
 * The merging is done by taking the union of the capitals arrays using the city name as a unique key.
 * If a duplicate city exists, new data overrides the persisted data unless the --prefer-old flag is used.
 * If the --out flag is provided, the merged ontology is persisted to the specified file.
 * Additionally, if the --sort-merged flag is provided, the capitals array will be sorted alphabetically by city.
 * @param {string[]} args - Command line arguments
 */
export function mergePersist(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in mergePersist. Received args: " + JSON.stringify(args));
  }

  // Check for --prefer-old flag
  const preferOld = args.includes("--prefer-old");

  // Retrieve persisted ontology if provided via --persist flag
  const persistIndex = args.indexOf("--persist");
  let persistedOntology = { type: "owl", capitals: [] };
  let filePath = null;
  if (persistIndex !== -1 && args.length > persistIndex + 1) {
    filePath = args[persistIndex + 1];
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        try {
          persistedOntology = JSON.parse(fileContent);
        } catch (parseError) {
          console.error(`Invalid JSON in persisted ontology file at ${filePath}: ${parseError.message}`);
        }
      } else {
        console.error(`Persisted ontology file not found at path: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error reading persisted ontology file at ${filePath}: ${error.message}`);
    }
  }

  // Simulate new ontology data (dummy updated ontology)
  const newOntology = {
    type: "owl",
    capitals: [
      { city: "Paris", country: "France" },
      { city: "Berlin", country: "Germany" },
      { city: "Tokyo", country: "Japan" },
    ],
  };

  // Merge capitals arrays using city as unique key
  const mergedCapitals = {};
  if (preferOld) {
    // Retain persisted data if duplicate exists
    persistedOntology.capitals.forEach((cityObj) => {
      mergedCapitals[cityObj.city] = cityObj;
    });
    newOntology.capitals.forEach((cityObj) => {
      if (!mergedCapitals.hasOwnProperty(cityObj.city)) {
        mergedCapitals[cityObj.city] = cityObj;
      }
    });
  } else {
    // Default behavior: new data overrides old
    [persistedOntology.capitals, newOntology.capitals].forEach((capitalsArr) => {
      capitalsArr.forEach((cityObj) => {
        mergedCapitals[cityObj.city] = cityObj;
      });
    });
  }

  const mergedOntology = { type: "owl", capitals: Object.values(mergedCapitals) };

  // If --sort-merged flag is provided, sort the merged capitals alphabetically by city
  if (args.includes("--sort-merged")) {
    mergedOntology.capitals.sort((a, b) => a.city.localeCompare(b.city));
  }

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
 * Validates an ontology JSON file against the predefined Zod schema.
 * If the --validate flag is provided followed by a file path, it reads and validates the file.
 * Logs a confirmation message on success or error details on failure.
 * @param {string[]} args - Command line arguments
 */
export function validateOntology(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in validateOntology. Received args: " + JSON.stringify(args));
  }
  const validateIndex = args.indexOf("--validate");
  let filePath = null;
  if (validateIndex !== -1 && args.length > validateIndex + 1) {
    filePath = args[validateIndex + 1];
  } else {
    console.error("No file path provided for --validate");
    return;
  }
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(fileContent);
    const result = ontologySchema.safeParse(parsed);
    if (result.success) {
      console.log(`Ontology validation successful: ${filePath} conforms to the schema.`);
    } else {
      console.error("Ontology validation failed:", result.error.errors);
    }
  } catch (error) {
    console.error("Error reading or parsing file:", error.message);
  }
}

/**
 * Adds a new capital to the OWL ontology. Expects key=value pairs for 'city' and 'country'.
 * If the --persist flag is provided with a file path, it reads the existing ontology (or initializes a new one)
 * and appends the new capital. Otherwise, logs the updated ontology.
 * @param {string[]} args - Command line arguments
 */
export function addCapital(args) {
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose mode enabled in addCapital. Received args: " + JSON.stringify(args));
  }
  // Filter out flags
  const filteredArgs = args.filter(
    (arg) => !["--add-capital", "--verbose", "--persist"].includes(arg) && !arg.startsWith("--persist"),
  );

  const capitalData = {};
  filteredArgs.forEach((arg) => {
    if (arg.includes("=")) {
      const [key, value] = arg.split("=");
      capitalData[key] = value;
    }
  });

  if (!capitalData.city || !capitalData.country) {
    console.error("Error: Both 'city' and 'country' must be provided.");
    return;
  }

  let ontology = { type: "owl", capitals: [] };
  const persistIndex = args.indexOf("--persist");
  let filePath = null;
  if (persistIndex !== -1 && args.length > persistIndex + 1) {
    filePath = args[persistIndex + 1];
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        try {
          ontology = JSON.parse(fileContent);
        } catch (e) {
          console.error(`Invalid JSON in persisted ontology file at ${filePath}: ${e.message}`);
          return;
        }
      } else {
        // File does not exist; use a new ontology
      }
    } catch (error) {
      console.error(`Error reading persisted ontology file at ${filePath}: ${error.message}`);
      return;
    }
  }

  // Append new capital
  ontology.capitals.push({ city: capitalData.city, country: capitalData.country });

  if (filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(ontology, null, 2));
      console.log(`Updated ontology persisted to file: ${filePath}`);
    } catch (error) {
      console.error("Error writing updated ontology to file:", error);
    }
  } else {
    console.log(JSON.stringify(ontology, null, 2));
  }
}

/**
 * Displays help information with usage instructions for the CLI tool.
 * @param {string[]} args - Command line arguments
 */
export function displayHelp(args) {
  const helpText = `
Usage: node src/lib/main.js [command] [options]

Core Features:
  - main: Default execution of the CLI tool.
  - query: Query OWL ontologies with options such as --json, --regex, --fuzzy, and now --ignore-case for case-insensitive searches.
  - diagnostics: Output system diagnostics in human-readable or JSON format.
  - crawl: Crawl data from public sources (use --simulate for simulated data).
  - capital-cities: Generate an OWL ontology for capital cities (use --sort to sort the capitals alphabetically by city name).
  - serve: Start the REST API server.
  - build-intermediate: Build a basic OWL ontology without Zod validation.
  - build-enhanced: Build an enhanced OWL ontology with Zod validation; supports --persist and --export-csv options.
  - refresh: Refresh and merge ontology data (Feature under development).
  - merge-persist: Merge persisted ontology data with new data; supports --prefer-old, --sort-merged, and --out options.
  - validate: Validate an ontology JSON file against a predefined schema.
  - add-capital: Add a new capital to the ontology.
  - help: Display this help message.

Commands:
  --help                 Display this help message.
  --diagnostics          Display system diagnostic information. Use --json for JSON output.
  --query [args]         Query OWL ontologies. Append search terms or key=value filters. Add --json for structured JSON output.
                         Use --regex to treat search terms as regular expressions, --fuzzy for fuzzy matching, and --ignore-case for case-insensitive search.
  --crawl                Crawl data from public sources. Use --simulate to output simulated crawled data.
  --capital-cities       Generate an OWL ontology for capital cities. Use --sort to output capitals sorted alphabetically by city name.
  --serve                Start the Express REST API server.
  --build-intermediate   Build an intermediate OWL ontology without Zod validation.
  --build-enhanced       Build an enhanced OWL ontology with Zod validation. Optionally, use --persist <filePath> to save the output.
                         Add --export-csv with --build-enhanced to output a CSV representation of capitals.
  --refresh              Refresh and merge persistent OWL ontology data (placeholder implementation).
  --merge-persist        Merge new ontology data with persisted ontology data. Use --persist <filePath> to load persisted data (defaults to empty), and --out <filePath> to write the merged ontology to a file.
                         Add --prefer-old to retain persisted data when duplicates exist. Use --sort-merged to sort capitals alphabetically by city after merging.
  --validate <filePath>  Validate an ontology JSON file against the schema and output the result.
  --add-capital          Append a new capital to the ontology. Provide key=value pairs for city and country. Optionally, use --persist <filePath> to save the updated ontology.
  --verbose              Enable verbose debug logging.

`;
  console.log(helpText);
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
  } else if (args.includes("--validate")) {
    validateOntology(args);
  } else if (args.includes("--add-capital")) {
    addCapital(args);
  } else {
    main(args);
  }
}
