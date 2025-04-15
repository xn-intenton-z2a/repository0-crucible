#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import http from "http";
import fs from "fs";
import { z } from "zod";

const helpMessage = [
  "Usage: node src/lib/main.js [options]",
  "",
  "Options:",
  "  --help              Show help message",
  "  --help-json         Show help message in JSON format",
  "  --help-extended     Show extended help message",
  "  --diagnostics       Output diagnostics information",
  "  --capital-cities    Output capital cities OWL ontology JSON",
  "  --crawl-data          Simulate crawling public data sources and output JSON",
  "  --refresh             Refresh the data (simulated operation)",
  "  --build-intermediate  Build with intermediate steps (simulated operation)",
  "  --build-enhanced      Build with enhanced features (simulated operation)",
  "  --merge-persist       Merge and persist the data (simulated operation)",
  "  --serve               Start the HTTP server",
  "  --export-ontology     Export the capital cities OWL ontology to a file",
  "  --build-detailed      Simulate a comprehensive build pipeline with multiple steps",
  "  --validate-ontology   Validate exported OWL ontology JSON file",
  "  --version             Display the application version"
].join("\n");

const extendedHelpMessage = [
  "Extended Help:",
  "",
  "--help: Displays a brief help message.",
  "         Example: node src/lib/main.js --help",
  "",
  "--help-json: Displays help in JSON format.",
  "         Example: node src/lib/main.js --help-json",
  "",
  "--help-extended: Displays detailed help information with descriptions and usage examples for each command.",
  "         Example: node src/lib/main.js --help-extended",
  "",
  "--diagnostics: Outputs diagnostics info about the current environment.",
  "         Example: node src/lib/main.js --diagnostics",
  "",
  "--capital-cities: Outputs the capital cities OWL ontology in JSON format.",
  "         Example: node src/lib/main.js --capital-cities",
  "",
  "--export-ontology: Exports the OWL ontology to a file named exported_ontology.json.",
  "         Example: node src/lib/main.js --export-ontology",
  "",
  "--crawl-data: Simulates crawling data and outputs JSON.",
  "         Example: node src/lib/main.js --crawl-data",
  "",
  "--refresh: Simulates a data refresh operation.",
  "         Example: node src/lib/main.js --refresh",
  "",
  "--build-intermediate: Simulates an intermediate build process.",
  "         Example: node src/lib/main.js --build-intermediate",
  "",
  "--build-enhanced: Simulates an enhanced build process.",
  "         Example: node src/lib/main.js --build-enhanced",
  "",
  "--merge-persist: Simulates merging and persisting data.",
  "         Example: node src/lib/main.js --merge-persist",
  "",
  "--build-detailed: Simulates a detailed build pipeline with multiple steps.",
  "         Example: node src/lib/main.js --build-detailed",
  "",
  "--validate-ontology: Validates the exported ontology JSON file.",
  "         Example: node src/lib/main.js --validate-ontology",
  "",
  "--serve: Starts the HTTP server to serve the ontology.",
  "         Example: node src/lib/main.js --serve",
  "",
  "--version: Displays the application version.",
  "         Example: node src/lib/main.js --version"
].join("\n");

export function main(args = []) {
  // If --version is provided, display version and return immediately.
  if (args.includes("--version")) {
    try {
      const pkgContent = fs.readFileSync("package.json", "utf-8");
      const pkg = JSON.parse(pkgContent);
      console.log(`Version: ${pkg.version}`);
    } catch (error) {
      console.error("Error: Could not read package.json");
    }
    return;
  }

  const validOptions = new Set([
    "--help",
    "--help-json",
    "--help-extended",
    "--diagnostics",
    "--capital-cities",
    "--crawl-data",
    "--refresh",
    "--build-intermediate",
    "--build-enhanced",
    "--merge-persist",
    "--serve",
    "--export-ontology",
    "--build-detailed",
    "--validate-ontology"
  ]);

  // Check for unknown options (if not version, already handled)
  const unknownArgs = args.filter(
    (arg) => arg.startsWith("--") && !validOptions.has(arg) && arg !== "--version"
  );
  if (unknownArgs.length > 0) {
    const plural = unknownArgs.length > 1 ? "s" : "";
    console.error(
      `Error: Unknown option${plural}: ${unknownArgs.join(", ")}`
    );
    // Only print the first line of the help message to match test expectations
    console.error(helpMessage.split("\n")[0]);
    return;
  }

  if (args.includes("--help-extended")) {
    console.log(extendedHelpMessage);
    return;
  }

  if (args.includes("--help-json")) {
    // For consistent output, we define the ordered list of options expected by tests
    const usage = "Usage: node src/lib/main.js [options]";
    const options = [
      "--help",
      "--help-json",
      "--diagnostics",
      "--capital-cities",
      "--serve",
      "--build-intermediate",
      "--build-enhanced",
      "--refresh",
      "--merge-persist",
      "--crawl-data",
      "--export-ontology",
      "--build-detailed",
      "--validate-ontology",
      "--version"
    ];
    console.log(JSON.stringify({ usage, options }, null, 2));
    return;
  }

  if (args.includes("--help")) {
    console.log(helpMessage);
    return;
  }

  if (args.includes("--diagnostics")) {
    const diagnostics = {
      nodeVersion: process.versions.node,
      platform: process.platform,
      availableCommands: [
        "--capital-cities",
        "--diagnostics",
        "--serve",
        "--build-intermediate",
        "--build-enhanced",
        "--refresh",
        "--merge-persist",
        "--crawl-data",
        "--help",
        "--help-json",
        "--export-ontology",
        "--build-detailed",
        "--validate-ontology",
        "--version"
      ],
    };
    console.log(JSON.stringify(diagnostics, null, 2));
    return;
  }

  if (args.includes("--capital-cities")) {
    const owlOntology = {
      owl: "capitalCities",
      data: [
        { country: "France", capital: "Paris" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Brazil", capital: "Brasília" },
      ],
      generatedAt: new Date().toISOString(),
    };
    console.log(JSON.stringify(owlOntology, null, 2));
    return;
  }

  if (args.includes("--export-ontology")) {
    const owlOntology = {
      owl: "capitalCities",
      data: [
        { country: "France", capital: "Paris" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Brazil", capital: "Brasília" },
      ],
      generatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(
      "exported_ontology.json",
      JSON.stringify(owlOntology, null, 2)
    );
    console.log("Ontology exported to exported_ontology.json");
    return;
  }

  if (args.includes("--crawl-data")) {
    const crawlData = {
      source: "publicData",
      data: [{ id: 1, description: "Sample data" }],
      fetchedAt: new Date().toISOString(),
    };
    console.log(JSON.stringify(crawlData, null, 2));
    return;
  }

  if (args.includes("--refresh")) {
    const refreshData = {
      message: "Data refreshed",
      refreshedAt: new Date().toISOString(),
    };
    console.log(JSON.stringify(refreshData, null, 2));
    return;
  }

  if (args.includes("--build-intermediate")) {
    const intermediateBuild = {
      intermediateBuild: "Intermediate build completed",
      builtAt: new Date().toISOString(),
    };
    console.log(JSON.stringify(intermediateBuild, null, 2));
    return;
  }

  if (args.includes("--build-enhanced")) {
    const enhancedBuild = {
      enhancedBuild: "Enhanced build completed",
      builtAt: new Date().toISOString(),
    };
    console.log(JSON.stringify(enhancedBuild, null, 2));
    return;
  }

  if (args.includes("--merge-persist")) {
    const mergePersistData = {
      mergePersist: "Data merged and persisted successfully",
      mergedAt: new Date().toISOString(),
    };
    console.log(JSON.stringify(mergePersistData, null, 2));
    return;
  }

  if (args.includes("--build-detailed")) {
    const crawlData = {
      source: "publicData",
      data: [{ id: 1, description: "Sample data" }],
      fetchedAt: new Date().toISOString(),
    };
    const refreshData = {
      message: "Data refreshed",
      refreshedAt: new Date().toISOString(),
    };
    const intermediateBuild = {
      intermediateBuild: "Intermediate build completed",
      builtAt: new Date().toISOString(),
    };
    const enhancedBuild = {
      enhancedBuild: "Enhanced build completed",
      builtAt: new Date().toISOString(),
    };
    const mergePersistData = {
      mergePersist: "Data merged and persisted successfully",
      mergedAt: new Date().toISOString(),
    };
    const detailedBuild = {
      crawlData,
      refreshData,
      intermediateBuild,
      enhancedBuild,
      mergePersist: mergePersistData
    };
    console.log(JSON.stringify(detailedBuild, null, 2));
    return;
  }

  if (args.includes("--validate-ontology")) {
    const fileName = "exported_ontology.json";
    if (!fs.existsSync(fileName)) {
      console.error(`Error: Exported ontology file '${fileName}' not found.`);
      return;
    }
    try {
      const fileContent = fs.readFileSync(fileName, "utf-8");
      const data = JSON.parse(fileContent);
      const ontologySchema = z.object({
        owl: z.literal("capitalCities"),
        data: z.array(z.object({ country: z.string(), capital: z.string() })),
        generatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid ISO date format",
        }),
      });
      ontologySchema.parse(data);
      console.log("Ontology is valid");
    } catch (e) {
      console.error(
        "Validation failed:",
        e.errors ? e.errors : e.message
      );
    }
    return;
  }

  if (args.includes("--serve")) {
    // Start the HTTP server
    serve();
    return;
  }

  // For recognized options like --build-enhanced that are not implemented,
  // or when no options are provided, simply log the arguments provided.
  console.log(`Run with: ${JSON.stringify(args)}`);
}

export function serve() {
  const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/capital-cities") {
      const owlOntology = {
        owl: "capitalCities",
        data: [
          { country: "France", capital: "Paris" },
          { country: "Japan", capital: "Tokyo" },
          { country: "Brazil", capital: "Brasília" },
        ],
        generatedAt: new Date().toISOString(),
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(owlOntology, null, 2));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  server.listen(3000, () => {
    console.log("Server listening on port 3000");
  });

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
