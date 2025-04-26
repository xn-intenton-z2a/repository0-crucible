#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

/**
 * Generate a JSON-LD OWL ontology for world capital cities.
 * @returns {object} JSON-LD document
 */
export function generateCapitalCitiesOntology() {
  const context = {
    "@vocab": "http://example.org/ontology#",
    "owl": "http://www.w3.org/2002/07/owl#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  };
  const graph = [
    { "@id": "Country", "@type": "owl:Class" },
    { "@id": "hasCapital", "@type": "rdf:Property" }
  ];
  const data = [
    { country: "France", capital: "Paris" },
    { country: "Germany", capital: "Berlin" },
    { country: "Italy", capital: "Rome" }
  ];
  data.forEach(({ country, capital }) => {
    graph.push({
      "@id": country,
      "@type": "Country",
      "hasCapital": capital
    });
  });
  return { "@context": context, "@graph": graph };
}

/**
 * Main entry point for CLI or programmatic usage.
 * @param {string[]} args CLI arguments array
 */
export function main(args) {
  if (args && args.includes("--capital-cities")) {
    const ontology = generateCapitalCitiesOntology();
    console.log(JSON.stringify(ontology, null, 2));
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// CLI invocation
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
