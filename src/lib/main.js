#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import * as fs from "node:fs/promises";
import { z } from "zod";
import { generateOntology } from "./index.js";

/**
 * Main entrypoint for CLI
 * @param {string[]} [args] CLI arguments (excluding node and script path)
 * @returns {Promise<number>} exit code (0 for success, 1 for error)
 */
export async function main(args) {
  const cliArgs = args ?? process.argv.slice(2);

  if (cliArgs.includes("--diagnostics")) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const pkgPath = join(__dirname, "..", "..", "package.json");
      const pkgContent = readFileSync(pkgPath, "utf-8");
      const pkg = JSON.parse(pkgContent);
      const diagnostic = {
        packageVersion: pkg.version,
        nodeVersion: process.version,
        platform: process.platform,
        dependencies: pkg.dependencies,
      };
      console.log(JSON.stringify(diagnostic, null, 2));
      return 0;
    } catch (error) {
      console.error(`Error reading package.json: ${error.message}`);
      return 1;
    }
  }

  const [subcommand, ...restArgs] = cliArgs;

  if (subcommand === "convert") {
    // Parse flags
    const argObj = {};
    for (let i = 0; i < restArgs.length; i++) {
      const arg = restArgs[i];
      if (arg.startsWith("--")) {
        const key = arg.slice(2);
        const value = restArgs[i + 1];
        argObj[key] = value;
        i++;
      }
    }
    const schema = z.object({
      input: z.string().nonempty(),
      "ontology-iri": z.string().nonempty(),
      "base-iri": z.string().optional(),
      output: z.string().optional(),
    });
    const parse = schema.safeParse(argObj);
    if (!parse.success) {
      console.error(
        `Error: ${parse.error.errors.map((e) => e.message).join(", ")}`
      );
      return 1;
    }
    const { input, "ontology-iri": ontologyIri, "base-iri": baseIri, output } =
      parse.data;
    try {
      const fileContent = await fs.readFile(input, "utf-8");
      const data = JSON.parse(fileContent);
      const ontology = await generateOntology(data, {
        ontologyIri,
        baseIri,
      });
      const serialized = JSON.stringify(ontology, null, 2);
      if (output) {
        await fs.writeFile(output, serialized, "utf-8");
      } else {
        console.log(serialized);
      }
      return 0;
    } catch (error) {
      console.error(`Error during conversion: ${error.message}`);
      return 1;
    }
  }

  // Placeholder for other subcommands
  console.log(`Run with: ${JSON.stringify(cliArgs)}`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().then((code) => process.exit(code));
}
