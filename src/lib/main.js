#!/usr/bin/env node

// NOTE: This file is maintained in part by an automated LLM-driven regeneration pipeline for repository0-crucible.
// The automated system updates this file based on defined CI/CD triggers and the contributing guidelines. Avoid manual changes that conflict with these protocols.

import { fileURLToPath } from "url";
import fs from "fs";

// Plugin Manager Implementation integrated into main.js for repository0-crucible
const plugins = [];

// Global variable for custom NaN handler
let customNaNHandler = null;

// Configurable flags for handling 'NaN'
let useNativeNanConfig = false;
let useStrictNan = false;

/**
 * Register a new plugin
 * @param {Function} plugin - A plugin function to register
 */
export function registerPlugin(plugin) {
  plugins.push(plugin);
}

/**
 * Retrieve the list of registered plugins
 * @returns {Function[]} - Array of plugin functions
 */
export function getPlugins() {
  return plugins;
}

/**
 * Execute all registered plugins sequentially
 * @param {Array} data - The data to process
 * @returns {Array} - The processed data
 */
export function executePlugins(data) {
  return plugins.reduce((currentData, plugin) => plugin(currentData), data);
}

/**
 * Register a custom handler for converting 'NaN'.
 * The handler should be a function that accepts the normalized version of the original string and returns the desired conversion.
 * @param {Function|null} handler
 */
export function registerNaNHandler(handler) {
  customNaNHandler = handler;
}

/**
 * Determines if the provided string represents a variant of 'NaN'.
 * It standardizes the input by trimming and applying Unicode Normalization Form KC (NFKC), and comparing in a case-insensitive manner.
 * This method supports extended Unicode variants such as 'ＮａＮ'.
 *
 * @param {string} str
 * @returns {boolean}
 */
function isNaNInput(str) {
  return str.trim().normalize("NFKC").toLowerCase() === "nan";
}

/**
 * Converts a CLI argument to its appropriate type.
 *
 * Special Handling includes:
 * - JSON Conversion: Strings that start with '{' or '[' are parsed as JSON when valid.
 * - Boolean values (case-insensitive) are converted to booleans.
 * - ISO 8601 date strings are converted to Date objects if valid.
 * - Numeric strings are converted to numbers when applicable.
 * - If none apply, the trimmed string is returned.
 *
 * @param {string} arg - The CLI argument
 * @returns {string|boolean|number|Date|Object|Array}
 */
function convertArg(arg) {
  const trimmed = arg.trim();

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      // Fall through to other conversion methods if JSON parsing fails
    }
  }

  const lower = trimmed.toLowerCase();
  if (lower === "true") return true;
  if (lower === "false") return false;

  const iso8601Regex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2}))?$/;
  if (iso8601Regex.test(trimmed)) {
    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) return date;
  }

  const num = Number(trimmed);
  if (trimmed !== "" && !isNaN(num)) return num;

  return trimmed;
}

/**
 * Helper function to process 'NaN' conversion based on the current configuration and flags.
 * Uses the trimmed input and its Unicode normalized form for decisions.
 *
 * Behavior:
 * - Default: Preserves the original input string (even if normalized form differs).
 * - Native Mode (--native-nan): Converts any recognized 'NaN' variant (including Unicode variants) to numeric NaN.
 * - Strict Mode (--strict-nan): Throws an error if a 'NaN' input is encountered and no custom handler is registered.
 * - Custom Handler: If registered via CLI flag (--custom-nan), repository config, or environment variable, uses the custom replacement.
 *
 * @param {string} originalStr - The original input string (already trimmed)
 * @returns {{converted: any, conversionMethod: string}}
 */
function processNaNConversion(originalStr) {
  const normalized = originalStr.trim().normalize("NFKC");

  if (customNaNHandler && typeof customNaNHandler === "function") {
    if (useStrictNan) {
      console.info("Strict NaN mode active: using custom NaN handler.");
    }
    try {
      const handledValue = customNaNHandler(normalized);
      return { converted: handledValue, conversionMethod: "custom" };
    } catch (e) {
      throw new Error(`Error in custom NaN handler: ${e.message}`);
    }
  } else if (useStrictNan) {
    throw new Error(`Strict NaN mode error: encountered 'NaN' input without a custom handler. Input was: '${originalStr}'`);
  } else if (useNativeNanConfig) {
    return { converted: NaN, conversionMethod: "native" };
  } else {
    return { converted: originalStr, conversionMethod: "default" };
  }
}

/**
 * Main function for the CLI.
 * Processes CLI arguments using conversion logic and plugin integration.
 * Handles NaN conversion based on the following rules:
 *   - Default: Any variant of 'NaN' (including Unicode variants such as 'ＮａＮ') is preserved as the original string.
 *   - --native-nan: Converts recognized 'NaN' variants to numeric NaN.
 *   - --strict-nan: In strict mode, throws an error if a 'NaN' input is encountered without a custom handler.
 *   - --custom-nan: Registers an inline custom handler to replace 'NaN' with the provided value.
 *   - --debug-nan: Outputs detailed debug information for each NaN conversion instance.
 *   - --trace-plugins: Outputs detailed trace logs for each plugin transformation when plugins are enabled.
 *
 * Additionally, supports custom configuration via .repositoryConfig.json and the CUSTOM_NAN environment variable.
 *
 * Examples:
 *   node src/lib/main.js NaN 100
 *       Uses default behavior, leaving 'NaN' as a string.
 *   node src/lib/main.js --native-nan NaN 100
 *       Converts 'NaN' (and variants like 'ＮａＮ') to numeric NaN.
 *   node src/lib/main.js --strict-nan NaN 100
 *       Throws an error if no custom handler is registered.
 *   node src/lib/main.js --custom-nan customReplacement NaN 100
 *       Replaces 'NaN' with 'customReplacement'.
 *
 * @param {string[]} args - CLI arguments
 */
export function main(args = []) {
  if (args.includes("--dump-config")) {
    let repoConfig = {};
    try {
      if (fs.existsSync(".repositoryConfig.json")) {
        const configContent = fs.readFileSync(".repositoryConfig.json", { encoding: "utf-8" });
        repoConfig = JSON.parse(configContent);
      }
    } catch (error) {
      repoConfig = {};
    }
    const effectiveNativeNan = args.includes("--native-nan") || repoConfig.nativeNan === true || process.env.NATIVE_NAN === "true";
    const effectiveStrictNan = args.includes("--strict-nan") || repoConfig.strictNan === true || process.env.STRICT_NAN === "true";
    let effectiveCustomNan = null;
    const customNanIndex = args.indexOf("--custom-nan");
    if (customNanIndex !== -1 && args.length > customNanIndex + 1 && args[customNanIndex + 1].trim().normalize("NFKC").toLowerCase() !== "nan") {
      effectiveCustomNan = args[customNanIndex + 1];
    } else if (typeof repoConfig.customNan === "string" && repoConfig.customNan.trim() !== "") {
      effectiveCustomNan = repoConfig.customNan;
    }
    const pluginsList = getPlugins().map(fn => fn.name || "anonymous");
    console.log(JSON.stringify({
      nativeNan: effectiveNativeNan,
      strictNan: effectiveStrictNan,
      customNan: effectiveCustomNan,
      plugins: pluginsList
    }));
    return;
  }

  let configNativeNan = false;
  let configStrictNan = false;
  try {
    if (fs.existsSync(".repositoryConfig.json")) {
      const configContent = fs.readFileSync(".repositoryConfig.json", { encoding: "utf-8" });
      const config = JSON.parse(configContent);
      configNativeNan = config.nativeNan === true;
      configStrictNan = config.strictNan === true;
      if (config.customNan && typeof config.customNan === "string" && config.customNan.trim() !== "") {
        registerNaNHandler(() => config.customNan);
      }
    }
  } catch (error) {
    configNativeNan = false;
    configStrictNan = false;
  }

  if (!args.includes("--dump-config") && !customNaNHandler && process.env.CUSTOM_NAN && typeof process.env.CUSTOM_NAN === "string" && process.env.CUSTOM_NAN.trim() !== "" && process.env.CUSTOM_NAN.trim().normalize("NFKC").toLowerCase() !== "nan") {
    registerNaNHandler(() => process.env.CUSTOM_NAN);
  }

  const nativeNanFlag = args.includes("--native-nan");
  useNativeNanConfig = nativeNanFlag || configNativeNan || process.env.NATIVE_NAN === "true";

  const strictNanFlag = args.includes("--strict-nan");
  useStrictNan = strictNanFlag || configStrictNan || process.env.STRICT_NAN === "true";

  const debugNanFlag = args.includes("--debug-nan");
  const tracePluginsFlag = args.includes("--trace-plugins");

  const customNanIndex = args.indexOf("--custom-nan");
  if (customNanIndex !== -1) {
    if (args.length > customNanIndex + 1 && args[customNanIndex + 1].trim().normalize("NFKC").toLowerCase() !== "nan") {
      const customNanValue = args[customNanIndex + 1];
      registerNaNHandler(() => customNanValue);
    } else {
      throw new Error("The --custom-nan flag requires a non-'NaN' replacement value immediately following the flag.");
    }
  }

  const processedArgs = [];
  for (let i = 0; i < args.length; i++) {
    if (["--use-plugins", "--native-nan", "--strict-nan", "--debug-nan", "--trace-plugins", "--dump-config"].includes(args[i])) continue;
    if (args[i] === "--custom-nan") { i++; continue; }
    processedArgs.push(args[i]);
  }

  const convertedArgs = [];
  const debugDetails = [];
  for (let i = 0; i < processedArgs.length; i++) {
    const arg = processedArgs[i];
    const trimmed = arg.trim();
    if (isNaNInput(trimmed)) {
      const normalized = trimmed.normalize("NFKC");
      const { converted, conversionMethod } = processNaNConversion(trimmed);
      convertedArgs.push(converted);
      if (debugNanFlag) {
        debugDetails.push({ raw: arg, normalized, converted, conversionMethod });
      }
    } else {
      convertedArgs.push(convertArg(arg));
    }
  }

  let finalData = convertedArgs;
  let pluginTrace;
  if (args.includes("--use-plugins") && getPlugins().length > 0) {
    if (tracePluginsFlag) {
      pluginTrace = [];
      let intermediate = convertedArgs;
      getPlugins().forEach((plugin, index) => {
        intermediate = plugin(intermediate);
        pluginTrace.push({ pluginIndex: index, result: intermediate });
      });
      finalData = intermediate;
    } else {
      finalData = executePlugins(convertedArgs);
    }
  }

  const finalLog = { message: "Run with", data: finalData };
  if (debugNanFlag) {
    finalLog.debugNan = debugDetails;
  }
  if (tracePluginsFlag && pluginTrace) {
    finalLog.pluginTrace = pluginTrace;
  }

  console.log(JSON.stringify(finalLog, (key, value) => {
    if (typeof value === "number") {
      if (Number.isNaN(value)) return "___native_NaN___";
      if (value === Infinity) return "___Infinity___";
      if (value === -Infinity) return "___-Infinity___";
    }
    return value;
  }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
