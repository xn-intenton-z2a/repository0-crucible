#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

// Simulated function that crawls data from public sources.
async function crawlData() {
  console.log("Crawling data from public data sources...");
  // In a real implementation, data would be fetched and processed here.
}

// Function to display OWL compliant JSON representation of capital cities.
// Accepts an optional filter for country name.
function displayCapitalCities(countryFilter = null) {
  const capitals = [
    { country: "United States", capital: "Washington D.C." },
    { country: "Canada", capital: "Ottawa" },
    { country: "United Kingdom", capital: "London" },
    { country: "France", capital: "Paris" },
    { country: "Germany", capital: "Berlin" },
    { country: "Australia", capital: "Canberra" },
    { country: "India", capital: "New Delhi" },
    { country: "Japan", capital: "Tokyo" },
    { country: "Brazil", capital: "Brasília" },
    { country: "South Africa", capital: "Pretoria" }
  ];
  
  let filteredCapitals = capitals;
  if (countryFilter) {
    filteredCapitals = capitals.filter(entry => entry.country.toLowerCase() === countryFilter.toLowerCase());
  }
  const owlCompliance = {
    owl: "ontology",
    type: "capital-cities",
    data: filteredCapitals
  };
  console.log(JSON.stringify(owlCompliance));
}

// Helper function to handle the '--version' flag.
async function handleVersion() {
  try {
    // Dynamically import package.json with JSON assertion to get version info.
    const pkgModule = await import("../../package.json", { assert: { type: "json" } });
    const pkg = pkgModule.default || pkgModule;
    console.log(pkg.version);
  } catch (err) {
    console.error("Error reading version:", err);
    process.exit(1);
  }
}

// Helper function to handle the '--version-details' flag.
async function handleVersionDetails() {
  try {
    const pkgModule = await import("../../package.json", { assert: { type: "json" } });
    const pkg = pkgModule.default || pkgModule;
    const output = {
      version: pkg.version,
      name: pkg.name,
      description: pkg.description
    };
    if (pkg.repository) {
      output.repository = pkg.repository;
    }
    console.log(JSON.stringify(output));
  } catch (err) {
    console.error("Error reading version details:", err);
    process.exit(1);
  }
}

// Helper function to handle the '--help' flag.
function handleHelp() {
  const helpMessage = `
CLI Help:
Usage: node src/lib/main.js [options]

Options:
  --help             Display detailed help information.
  --version          Display current version information.
  --version-details  Display detailed version metadata as JSON (includes name and description).
  --diagnostics      Display runtime diagnostics information.
  --crawl            Simulate crawling public data sources for JSON data.
  --capital-cities   Output an OWL compliant JSON representation of capital cities.
                     Optional: use --country=CountryName to filter by a specific country.
  --query-owl        Simulate querying an OWL ontology and return sample JSON data.

Examples:
  node src/lib/main.js --help
  node src/lib/main.js --version-details
  node src/lib/main.js --capital-cities --country=Canada
`;
  console.log(helpMessage.trim());
}

// Helper function to handle the '--crawl' flag.
async function handleCrawl() {
  await crawlData();
}

// Enhanced helper function to handle the '--diagnostics' flag.
function handleDiagnostics() {
  console.log("Diagnostics: All systems are operational");
  const diagnostics = {
    version: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  };
  console.log(JSON.stringify(diagnostics));
}

// Helper function to handle the '--capital-cities' flag.
// It checks for an optional '--country=CountryName' in the args.
function handleCapitalCities(args) {
  let countryFilter = null;
  args.forEach(arg => {
    if (arg.startsWith("--country=")) {
      countryFilter = arg.split("=")[1].trim();
    }
  });
  displayCapitalCities(countryFilter);
}

// Helper function to handle the '--query-owl' flag.
function handleQueryOwl() {
  console.log(JSON.stringify({
    result: "Sample OWL query response",
    data: []
  }));
}

export async function main(args) {
  // Mapping of CLI flags to their respective handler functions.
  const flagHandlers = [
    { flag: "--query-owl", handler: () => handleQueryOwl() },
    { flag: "--version-details", handler: () => handleVersionDetails() },
    { flag: "--version", handler: () => handleVersion() },
    { flag: "--help", handler: () => handleHelp() },
    { flag: "--crawl", handler: () => handleCrawl() },
    { flag: "--diagnostics", handler: () => handleDiagnostics() },
    { flag: "--capital-cities", handler: () => handleCapitalCities(args) }
  ];

  // Iterate over flag handlers and execute the one matching the argument.
  for (const { flag, handler } of flagHandlers) {
    if (args.includes(flag)) {
      await handler();
      return;
    }
  }

  // Default output when no recognized flag is provided.
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// If the script is executed directly, process the CLI arguments.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
