#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import { createServer } from "http";

// Helper function to escape XML special characters
function escapeXML(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
}

// Simulate crawling public data sources and transforming them into an OWL ontology represented as a JSON object
export function crawlDataSources() {
  return {
    "owl:ontology": {
      source: "public",
      description: "Simulated crawling of public data sources",
      data: [
        { id: 1, info: "Sample data entry" }
      ]
    }
  };
}

export let serverInstance = null;

export async function main(args = process.argv.slice(2)) {
  // Handle '--version' option to output package version
  const versionIndex = args.indexOf("--version");
  if (versionIndex !== -1) {
    try {
      // Assuming package.json is located in the current working directory
      const packagePath = process.cwd() + "/package.json";
      const packageContent = fs.readFileSync(packagePath, "utf-8");
      const packageJson = JSON.parse(packageContent);
      console.log(JSON.stringify({ version: packageJson.version }, null, 2));
    } catch (err) {
      console.log(JSON.stringify({ error: "Error reading package.json: " + err.message }));
    }
    return;
  }

  // Handle '--help' option to output usage instructions
  const helpIndex = args.indexOf("--help");
  if (helpIndex !== -1) {
    const helpMessage = {
      usage: "node src/lib/main.js [options]",
      options: {
        "--help": "Display this help message",
        "--diagnostics": "Output diagnostic information about the current environment",
        "--data-sources": "Output a hard-coded list of public data source URLs",
        "--crawl": "Simulate crawling of public data sources and output an OWL ontology in JSON format",
        "--transform": "Transform a JSON string into an OWL ontology structure",
        "--query-owl": "Query the OWL ontology with an optional query parameter",
        "--save-ontology": "Save the generated ontology to a file (optionally specify filename)",
        "--merge-persist": "Merge two ontology files and save the merged result to a file",
        "--filter-data": "Filter ontology data based on key-value pairs",
        "--validate-ontology": "Validate the structure of an ontology JSON file",
        "--live-crawl": "Retrieve live data from https://api.publicapis.org/entries and output an OWL ontology in JSON format",
        "--ontology-info": "Read an ontology JSON file and output a summary with source, description, total data entries, and optional timestamp",
        "--serve": "Start an HTTP server on port 3000 that serves the OWL ontology at the '/ontology' endpoint",
        "--capital-cities": "Output a sample OWL ontology of capital cities",
        "--refresh": "Re-crawl public data sources, attach a current timestamp, and output the refreshed ontology JSON",
        "--build-intermediate": "Simulate intermediate processing of ontology data with intermediate output",
        "--build-enhanced": "Simulate advanced processing of ontology data with enhanced output",
        "--export-rdf": "Export the generated ontology as RDF/XML",
        "--export-turtle": "Export the generated ontology in Turtle (TTL) format",
        "--export-jsonld": "Export the generated ontology as JSON-LD"
      }
    };
    console.log(JSON.stringify(helpMessage, null, 2));
    return;
  }

  // Handle '--diagnostics' option to output environment diagnostic information
  const diagnosticsIndex = args.indexOf("--diagnostics");
  if (diagnosticsIndex !== -1) {
    const diagnostics = {
      nodeVersion: process.version,
      platform: process.platform,
      currentWorkingDirectory: process.cwd()
    };
    console.log(JSON.stringify(diagnostics));
    return;
  }

  // Handle '--live-crawl' option: fetch live data from a public API
  const liveCrawlIndex = args.indexOf("--live-crawl");
  if (liveCrawlIndex !== -1) {
    try {
      const response = await fetch("https://api.publicapis.org/entries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      const entry = (Array.isArray(jsonResponse.entries) && jsonResponse.entries.length) ? jsonResponse.entries[0] : {};
      const liveOntology = {
        "owl:ontology": {
          source: "live",
          description: "Live crawl from https://api.publicapis.org/entries",
          data: [entry]
        }
      };
      console.log(JSON.stringify(liveOntology, null, 2));
    } catch (err) {
      console.log(JSON.stringify({ error: "Error fetching live data: " + err.message }));
    }
    return;
  }

  // Handle '--data-sources' option to output a hard-coded list of public data source URLs
  const dataSourcesIndex = args.indexOf("--data-sources");
  if (dataSourcesIndex !== -1) {
    const dataSources = ["https://example.com/api1", "https://example.com/api2"]; 
    console.log(JSON.stringify({ dataSources }));
    return;
  }

  // Handle '--save-ontology' option to persist the generated ontology to a file
  const saveOntologyIndex = args.indexOf("--save-ontology");
  if (saveOntologyIndex !== -1) {
    const targetFilename = (args[saveOntologyIndex + 1] && !args[saveOntologyIndex + 1].startsWith("--")) ? args[saveOntologyIndex + 1] : "ontology.json";
    const ontology = crawlDataSources();
    fs.writeFileSync(targetFilename, JSON.stringify(ontology, null, 2));
    console.log(JSON.stringify({ result: "Ontology saved to " + targetFilename }));
    return;
  }

  // Check for '--crawl' option to simulate data crawling and OWL ontology generation
  const crawlIndex = args.indexOf("--crawl");
  if (crawlIndex !== -1) {
    console.log(JSON.stringify(crawlDataSources()));
    return;
  }

  // Handle '--transform' option for JSON-to-OWL transformation
  const transformIndex = args.indexOf("--transform");
  if (transformIndex !== -1) {
    const jsonInput = args[transformIndex + 1];
    let transformedOutput;
    if (jsonInput) {
      try {
        const parsed = JSON.parse(jsonInput);
        transformedOutput = { "owl:transformed": parsed };
      } catch (err) {
        transformedOutput = { result: "Default OWL transformation output" };
      }
    } else {
      transformedOutput = { result: "Default OWL transformation output" };
    }
    console.log(JSON.stringify(transformedOutput));
    return;
  }

  // Handle '--query-owl' option
  const queryIndex = args.indexOf("--query-owl");
  if (queryIndex !== -1) {
    const queryParam = args[queryIndex + 1];
    if (queryParam && !queryParam.startsWith("--")) {
      console.log(JSON.stringify({ result: `OWL query output for query: ${queryParam}` }));
    } else {
      console.log(JSON.stringify({ result: "Sample OWL query output" }));
    }
    return;
  }

  // Handle '--refresh' option for re-crawling and refreshing ontology with a current timestamp
  const refreshIndex = args.indexOf("--refresh");
  if (refreshIndex !== -1) {
    const ontology = crawlDataSources();
    ontology["owl:ontology"].timestamp = new Date().toISOString();
    console.log(JSON.stringify(ontology, null, 2));
    return;
  }

  // Handle '--build-intermediate' option for intermediate processing step
  const buildIntermediateIndex = args.indexOf("--build-intermediate");
  if (buildIntermediateIndex !== -1) {
    const ontology = crawlDataSources();
    ontology["owl:ontology"].intermediate = true;
    console.log(JSON.stringify(ontology, null, 2));
    return;
  }

  // Handle '--merge-persist' option for merging two ontology files
  const mergePersistIndex = args.indexOf("--merge-persist");
  if (mergePersistIndex !== -1) {
    if (args.length <= mergePersistIndex + 2) {
      console.log(JSON.stringify({ error: "Error: Insufficient arguments for merge-persist. Two ontology file paths required." }));
      return;
    }
    try {
      const file1Path = args[mergePersistIndex + 1];
      const file2Path = args[mergePersistIndex + 2];
      const outputPath = (args[mergePersistIndex + 3] && !args[mergePersistIndex + 3].startsWith("--")) ? args[mergePersistIndex + 3] : "merged-ontology.json";
      const file1Content = fs.readFileSync(file1Path, "utf-8");
      const file2Content = fs.readFileSync(file2Path, "utf-8");
      const ontology1 = JSON.parse(file1Content);
      const ontology2 = JSON.parse(file2Content);
      if (!ontology1["owl:ontology"] || !ontology2["owl:ontology"]) {
        console.log(JSON.stringify({ error: "Error: One or both input files do not contain 'owl:ontology' property." }));
        return;
      }
      const ont1 = ontology1["owl:ontology"];
      const ont2 = ontology2["owl:ontology"];
      const mergedOntology = {
        "owl:ontology": {
          source: `${ont1.source || "unknown"}; ${ont2.source || "unknown"}`,
          description: `Merged ontology: ${ont1.description || ""} | ${ont2.description || ""}`,
          data: [...(ont1.data || []), ...(ont2.data || [])]
        }
      };
      fs.writeFileSync(outputPath, JSON.stringify(mergedOntology, null, 2));
      console.log(JSON.stringify({ result: "Ontology merged and saved to " + outputPath }));
    } catch (err) {
      console.log(JSON.stringify({ error: "Error: " + err.message }));
    }
    return;
  }

  // Handle '--filter-data' option for filtering ontology data based on key-value pairs
  const filterIndex = args.indexOf("--filter-data");
  if (filterIndex !== -1) {
    const keyParam = args[filterIndex + 1];
    const valueParam = args[filterIndex + 2];
    if (!keyParam) {
      console.log(JSON.stringify({ error: "Error: Missing filter key parameter for --filter-data" }));
      return;
    }
    if (!valueParam) {
      console.log(JSON.stringify({ error: "Error: Missing filter value parameter for --filter-data" }));
      return;
    }
    const ontology = crawlDataSources();
    if (!ontology["owl:ontology"] || !Array.isArray(ontology["owl:ontology"].data)) {
      console.log(JSON.stringify({ error: "Error: Ontology data is missing or not in expected format." }));
      return;
    }
    const filteredData = ontology["owl:ontology"].data.filter(entry => entry[keyParam] === valueParam);
    const filteredOntology = {
      "owl:ontology": {
        ...ontology["owl:ontology"],
        data: filteredData
      }
    };
    console.log(JSON.stringify(filteredOntology));
    return;
  }

  // Handle '--validate-ontology' option for validating OWL ontology JSON file
  const validateIndex = args.indexOf("--validate-ontology");
  if (validateIndex !== -1) {
    const filePath = args[validateIndex + 1];
    if (!filePath || filePath.startsWith("--")) {
      console.log(JSON.stringify({ error: "Error: Missing ontology file path argument for --validate-ontology" }));
      return;
    }
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileContent);
      if (!parsed["owl:ontology"] || typeof parsed["owl:ontology"] !== "object") {
        console.log(JSON.stringify({ error: "Error: Ontology JSON does not contain a valid 'owl:ontology' property." }));
        return;
      }
      const ontology = parsed["owl:ontology"];
      if (typeof ontology.source !== "string") {
        console.log(JSON.stringify({ error: "Error: 'source' property must be a string." }));
        return;
      }
      if (typeof ontology.description !== "string") {
        console.log(JSON.stringify({ error: "Error: 'description' property must be a string." }));
        return;
      }
      if (!Array.isArray(ontology.data)) {
        console.log(JSON.stringify({ error: "Error: 'data' property must be an array." }));
        return;
      }
      console.log(JSON.stringify({ result: "Ontology structure is valid" }));
    } catch (err) {
      console.log(JSON.stringify({ error: "Error: " + err.message }));
    }
    return;
  }

  // Handle '--ontology-info' option for summarizing ontology metadata
  const ontologyInfoIndex = args.indexOf("--ontology-info");
  if (ontologyInfoIndex !== -1) {
    const filePath = args[ontologyInfoIndex + 1];
    if (!filePath || filePath.startsWith("--")) {
      console.log(JSON.stringify({ error: "Error: Missing ontology file path argument for --ontology-info" }));
      return;
    }
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileContent);
      if (!parsed["owl:ontology"] || typeof parsed["owl:ontology"] !== "object") {
        console.log(JSON.stringify({ error: "Error: Ontology JSON does not contain a valid 'owl:ontology' property." }));
        return;
      }
      const ontology = parsed["owl:ontology"];
      if (typeof ontology.source !== "string" || typeof ontology.description !== "string" || !Array.isArray(ontology.data)) {
        console.log(JSON.stringify({ error: "Error: Ontology file does not have valid source, description or data properties." }));
        return;
      }
      const summary = {
        ontologyInfo: {
          source: ontology.source,
          description: ontology.description,
          totalDataEntries: ontology.data.length
        }
      };
      if (ontology.timestamp) {
        summary.ontologyInfo.timestamp = ontology.timestamp;
      }
      console.log(JSON.stringify(summary));
    } catch (err) {
      console.log(JSON.stringify({ error: "Error: " + err.message }));
    }
    return;
  }

  // Handle '--capital-cities' option to output a sample OWL ontology of capital cities
  if (args.indexOf("--capital-cities") !== -1) {
    const capitalOntology = {
      capitalCities: [
        { name: "Washington D.C.", country: "USA" },
        { name: "London", country: "UK" },
        { name: "Tokyo", country: "Japan" }
      ]
    };
    console.log(JSON.stringify(capitalOntology, null, 2));
    return;
  }

  // Handle '--serve' option to start an HTTP server
  const serveIndex = args.indexOf("--serve");
  if (serveIndex !== -1) {
    serverInstance = createServer((req, res) => {
      if (req.method === "GET" && req.url === "/ontology") {
        const ontology = crawlDataSources();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(ontology, null, 2));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Endpoint not found" }));
      }
    });
    serverInstance.listen(3000, () => {
      console.log("Server started on port 3000");
    });
    return;
  }

  // Handle '--build-enhanced' option for advanced OWL ontology generation
  const buildEnhancedIndex = args.indexOf("--build-enhanced");
  if (buildEnhancedIndex !== -1) {
    const ontology = crawlDataSources();
    ontology["owl:ontology"].enhanced = true;
    console.log(JSON.stringify(ontology, null, 2));
    return;
  }

  // Handle '--export-rdf' option to export ontology as RDF/XML
  const exportRdfIndex = args.indexOf("--export-rdf");
  if (exportRdfIndex !== -1) {
    const ontology = crawlDataSources()["owl:ontology"];
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    let rdfOutput = xmlHeader + "\n";
    rdfOutput += `<owl:Ontology>\n`;
    rdfOutput += `  <source>${escapeXML(ontology.source)}</source>\n`;
    rdfOutput += `  <description>${escapeXML(ontology.description)}</description>\n`;
    rdfOutput += `  <data>\n`;
    if (Array.isArray(ontology.data)) {
      ontology.data.forEach(item => {
        rdfOutput += `    <entry>\n`;
        Object.keys(item).forEach(key => {
          rdfOutput += `      <${key}>${escapeXML(String(item[key]))}</${key}>\n`;
        });
        rdfOutput += `    </entry>\n`;
      });
    }
    rdfOutput += `  </data>\n`;
    rdfOutput += `</owl:Ontology>`;
    console.log(rdfOutput);
    return;
  }

  // Handle '--export-turtle' option to export ontology as Turtle (TTL)
  const exportTurtleIndex = args.indexOf("--export-turtle");
  if (exportTurtleIndex !== -1) {
    const ontology = crawlDataSources()["owl:ontology"];
    let turtleOutput = "@prefix ex: <http://example.com/> .\n\n";
    turtleOutput += "ex:Ontology {\n";
    turtleOutput += `  ex:source "${escapeXML(ontology.source)}" ;\n`;
    turtleOutput += `  ex:description "${escapeXML(ontology.description)}" ;\n`;
    if (Array.isArray(ontology.data) && ontology.data.length > 0) {
      turtleOutput += "  ex:data [\n";
      ontology.data.forEach((item, index) => {
        turtleOutput += "    [\n";
        const keys = Object.keys(item);
        keys.forEach((key, i) => {
          turtleOutput += `      ex:${key} "${escapeXML(String(item[key]))}"`;
          turtleOutput += (i < keys.length - 1 ? " ;\n" : "\n");
        });
        turtleOutput += "    ]";
        turtleOutput += (index < ontology.data.length - 1 ? " ,\n" : "\n");
      });
      turtleOutput += "  ]\n";
    }
    turtleOutput += "}";
    console.log(turtleOutput);
    return;
  }

  // Handle '--export-jsonld' option to export ontology as JSON-LD
  const exportJsonldIndex = args.indexOf("--export-jsonld");
  if (exportJsonldIndex !== -1) {
    const ontology = crawlDataSources()["owl:ontology"];
    const jsonld = {
      "@context": {
        "source": "http://example.com/source",
        "description": "http://example.com/description",
        "data": "http://example.com/data"
      },
      "@type": "Ontology",
      "source": ontology.source,
      "description": ontology.description,
      "data": ontology.data
    };
    console.log(JSON.stringify(jsonld, null, 2));
    return;
  }

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  (async () => {
    await main(args);
  })();
}
