#!/usr/bin/env node

// NOTE: This file is maintained in part by an automated LLM-driven regeneration pipeline for repository0-crucible.
// The automated system updates this file based on defined CI/CD triggers and the contributing guidelines. Avoid manual changes that conflict with these protocols.

import { fileURLToPath } from "url";
import fs from "fs";
import { performance } from "perf_hooks";

// Plugin Manager Implementation integrated into main.js for repository0-crucible
const plugins = [];

// Global variable for custom NaN handler
let customNaNHandler = null;

// Global configuration flags for handling 'NaN'
let useNativeNanConfig = false;
let useStrictNan = false;

// Global debug flag for NaN diagnostic logging
// It will be set in main when --debug-nan flag is provided

// Configuration file watcher
let configWatcher = null;

// Cache for NaN conversion results to optimize repeated processing in bulk
// The cache now uses a normalized (trim + NFKC + lowercase) value as the key
const nanConversionCache = new Map();

/**
 * Normalize a string by trimming and applying Unicode Normalization Form KC (NFKC).
 * @param {string} value
 * @returns {string}
 */
function normalizeValue(value) {
  return value.trim().normalize("NFKC");
}

/**
 * Custom replacer for JSON.stringify to handle special numeric values.
 * @param {string} key
 * @param {any} value
 * @returns {any}
 */
function nanReplacer(key, value) {
  if (typeof value === "number") {
    if (Number.isNaN(value)) return "___native_NaN___";
    if (value === Infinity) return "___Infinity___";
    if (value === -Infinity) return "___-Infinity___";
  }
  return value;
}

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
 * The handler can be synchronous or asynchronous. If asynchronous, it should return a Promise.
 * @param {Function|null} handler
 */
export function registerNaNHandler(handler) {
  customNaNHandler = handler;
}

/**
 * Determines if the provided string represents a variant of 'NaN'.
 * It standardizes the input by using normalizeValue and comparing in a case-insensitive manner.
 * Supports extended Unicode variants such as 'ＮａＮ'.
 *
 * @param {string} str
 * @returns {boolean}
 */
function isNaNInput(str) {
  return normalizeValue(str).toLowerCase() === "nan";
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
 * Internal function to process 'NaN' conversion without caching.
 * @param {string} originalStr - The original input string
 * @returns {Promise<{converted: any, conversionMethod: string}>
 */
async function processNaNConversionInternal(originalStr) {
  const trimmed = originalStr.trim();
  const normalized = normalizeValue(originalStr);
  const normalizedLower = normalized.toLowerCase();

  if (globalThis.DEBUG_NAN) {
    console.debug(
      JSON.stringify({ event: "processNaNConversion_start", input: originalStr, trimmed, normalized }, nanReplacer),
    );
  }

  if (normalizedLower !== "nan") {
    const result = { converted: convertArg(originalStr), conversionMethod: "default" };
    if (globalThis.DEBUG_NAN) {
      console.debug(JSON.stringify({ event: "processNaNConversion_default", input: originalStr, result }, nanReplacer));
    }
    return result;
  }

  let result;
  if (customNaNHandler && typeof customNaNHandler === "function") {
    if (useStrictNan) {
      console.info("Strict NaN mode active: using custom NaN handler.");
    }
    try {
      let handledValue = customNaNHandler(normalized);
      if (handledValue && typeof handledValue.then === "function") {
        handledValue = await handledValue;
      }
      result = { converted: handledValue, conversionMethod: "custom" };
      if (globalThis.DEBUG_NAN) {
        console.debug(
          JSON.stringify({ event: "processNaNConversion_custom", input: originalStr, result }, nanReplacer),
        );
      }
    } catch (e) {
      if (globalThis.DEBUG_NAN) {
        console.debug(
          JSON.stringify(
            { event: "processNaNConversion_custom_error", input: originalStr, error: e.message },
            nanReplacer,
          ),
        );
      }
      throw new Error(`Error in custom NaN handler: ${e.message}`);
    }
  } else if (useStrictNan) {
    const errorMsg = `Strict NaN mode error: encountered 'NaN' input without a registered custom handler. To resolve this, please register a custom NaN handler using the '--custom-nan <value>' flag, update your .repositoryConfig.json with a valid "customNan" value, or set the CUSTOM_NAN environment variable. Input was: '${originalStr}'`;
    if (globalThis.DEBUG_NAN) {
      console.debug(
        JSON.stringify({ event: "processNaNConversion_strict", input: originalStr, error: errorMsg }, nanReplacer),
      );
    }
    throw new Error(errorMsg);
  } else if (useNativeNanConfig) {
    result = { converted: NaN, conversionMethod: "native" };
    if (globalThis.DEBUG_NAN) {
      console.debug(JSON.stringify({ event: "processNaNConversion_native", input: originalStr, result }, nanReplacer));
    }
  } else {
    result = { converted: convertArg(originalStr), conversionMethod: "default" };
    if (globalThis.DEBUG_NAN) {
      console.debug(
        JSON.stringify({ event: "processNaNConversion_fallback", input: originalStr, result }, nanReplacer),
      );
    }
  }
  return result;
}

/**
 * Processes 'NaN' conversion with caching to optimize repeated identical inputs.
 * The caching key is based on the normalized (trimmed, NFKC, lowercase) value to ensure consistency across Unicode variants.
 * @param {string} originalStr
 * @returns {Promise<{converted: any, conversionMethod: string}>
 */
async function processNaNConversion(originalStr) {
  const normalizedKey = normalizeValue(originalStr).toLowerCase();
  if (nanConversionCache.has(normalizedKey)) {
    const cachedResult = nanConversionCache.get(normalizedKey);
    if (globalThis.DEBUG_NAN) {
      console.debug(
        JSON.stringify(
          { event: "processNaNConversion_cache_hit", input: originalStr, normalizedKey, result: cachedResult },
          nanReplacer,
        ),
      );
    }
    return cachedResult;
  }
  const result = await processNaNConversionInternal(originalStr);
  nanConversionCache.set(normalizedKey, result);
  return result;
}

/**
 * Resolves the effective NaN handling configuration based on a defined precedence:
 * 1. CLI flags
 * 2. Repository configuration file (.repositoryConfig.json)
 * 3. Environment variables
 * 4. Default behavior
 *
 * @param {string[]} args - The CLI arguments
 * @returns {object} - The resolved configuration
 */
function resolveNaNConfig(args) {
  let effectiveNativeNan = false;
  let effectiveStrictNan = false;
  let effectiveCustomNan = null;

  // CLI flags take highest precedence
  if (args.includes("--native-nan")) {
    effectiveNativeNan = true;
  }
  if (args.includes("--strict-nan")) {
    effectiveStrictNan = true;
  }
  const customIndex = args.indexOf("--custom-nan");
  if (customIndex !== -1) {
    if (
      args.length > customIndex + 1 &&
      args[customIndex + 1].trim() !== "NaN" &&
      args[customIndex + 1].trim().toLowerCase() !== "nan" &&
      args[customIndex + 1].trim() !== "NAN"
    ) {
      effectiveCustomNan = args[customIndex + 1];
    } else {
      throw new Error("The --custom-nan flag requires a non-'NaN' replacement value immediately following the flag.");
    }
  }

  // Repository configuration file
  let repoConfig = {};
  if (fs.existsSync(".repositoryConfig.json")) {
    try {
      repoConfig = JSON.parse(fs.readFileSync(".repositoryConfig.json", { encoding: "utf-8" }));
    } catch (error) {
      repoConfig = {};
    }
  }
  if (!effectiveNativeNan && repoConfig.nativeNan === true) {
    effectiveNativeNan = true;
  }
  if (!effectiveStrictNan && repoConfig.strictNan === true) {
    effectiveStrictNan = true;
  }
  if (
    effectiveCustomNan === null &&
    typeof repoConfig.customNan === "string" &&
    repoConfig.customNan.trim() !== "NaN" &&
    repoConfig.customNan.trim().toLowerCase() !== "nan" &&
    repoConfig.customNan.trim() !== "NAN"
  ) {
    effectiveCustomNan = repoConfig.customNan;
  }

  // Environment variables
  if (!effectiveNativeNan && process.env.NATIVE_NAN === "true") {
    effectiveNativeNan = true;
  }
  if (!effectiveStrictNan && process.env.STRICT_NAN === "true") {
    effectiveStrictNan = true;
  }
  if (
    effectiveCustomNan === null &&
    process.env.CUSTOM_NAN &&
    process.env.CUSTOM_NAN.trim() !== "NaN" &&
    process.env.CUSTOM_NAN.trim().toLowerCase() !== "nan" &&
    process.env.CUSTOM_NAN.trim() !== "NAN"
  ) {
    effectiveCustomNan = process.env.CUSTOM_NAN;
  }

  return { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan };
}

/**
 * Dynamically updates the global NaN configuration from repository config and environment variables.
 * This enables the tool to refresh its configuration at runtime without a restart.
 */
function updateGlobalNaNConfig() {
  const { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan } = resolveNaNConfig([]);
  useNativeNanConfig = effectiveNativeNan;
  useStrictNan = effectiveStrictNan;
  if (effectiveCustomNan !== null && effectiveCustomNan !== undefined) {
    registerNaNHandler(() => effectiveCustomNan);
  } else {
    registerNaNHandler(null);
  }
  console.info("Dynamic configuration refresh applied", { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan });
}

/**
 * Starts a watcher on .repositoryConfig.json to dynamically refresh NaN configuration when changes occur.
 */
function startConfigWatcher() {
  try {
    fs.accessSync(".repositoryConfig.json", fs.constants.F_OK);
  } catch (err) {
    fs.writeFileSync(".repositoryConfig.json", "{}");
  }
  try {
    configWatcher = fs.watch(".repositoryConfig.json", (eventType) => {
      if (eventType === "change") {
        updateGlobalNaNConfig();
      }
    });
    console.info("Started configuration file watcher for dynamic configuration refresh.");
  } catch (err) {
    console.info("Config watcher could not be started: " + err.message);
  }
}

/**
 * Main function for the CLI.
 * Processes CLI arguments using conversion logic and plugin integration.
 * Handles NaN conversion with prioritized configuration from CLI, configuration file, environment variables, and supports dynamic refresh.
 *
 * @param {string[]} args - CLI arguments
 */
export async function main(args = []) {
  // Clear the NaN conversion cache for each run
  nanConversionCache.clear();

  // Benchmark mode: perform performance testing for bulk NaN processing
  if (args.includes("--benchmark")) {
    const bulkCount = 10000;
    const bulkArgs = [];
    for (let i = 0; i < bulkCount; i++) {
      const r = Math.random();
      if (r < 0.5) {
        bulkArgs.push("NaN");
      } else if (r < 0.75) {
        bulkArgs.push("42");
      } else {
        bulkArgs.push("true");
      }
    }
    console.info("Starting benchmark with caching enabled");
    const startTime = performance.now();
    const resultsEnabled = [];
    for (const arg of bulkArgs) {
      if (normalizeValue(arg).toLowerCase() === "nan") {
        resultsEnabled.push(await processNaNConversion(arg));
      } else {
        resultsEnabled.push(convertArg(arg));
      }
    }
    const durationEnabled = performance.now() - startTime;

    console.info("Starting benchmark with caching disabled");
    const startTimeDisabled = performance.now();
    const resultsDisabled = [];
    for (const arg of bulkArgs) {
      if (normalizeValue(arg).toLowerCase() === "nan") {
        // Replicating processNaNConversion without using cache
        const res = await processNaNConversionInternal(arg);
        resultsDisabled.push(res);
      } else {
        resultsDisabled.push(convertArg(arg));
      }
    }
    const durationDisabled = performance.now() - startTimeDisabled;

    console.log(
      JSON.stringify(
        { benchmark: { count: bulkCount, cachingEnabled: durationEnabled, cachingDisabled: durationDisabled } },
        nanReplacer,
      ),
    );
    return;
  }

  // Reset configuration flags for each run.
  useNativeNanConfig = false;
  useStrictNan = false;
  const preservedCustomHandler = customNaNHandler;

  const { effectiveNativeNan, effectiveStrictNan, effectiveCustomNan } = resolveNaNConfig(args || []);
  useNativeNanConfig = effectiveNativeNan;
  useStrictNan = effectiveStrictNan;

  if (args.includes("--custom-nan")) {
    const customIndex = args.indexOf("--custom-nan");
    if (
      args.length > customIndex + 1 &&
      args[customIndex + 1].trim() !== "NaN" &&
      args[customIndex + 1].trim().toLowerCase() !== "nan" &&
      args[customIndex + 1].trim() !== "NAN"
    ) {
      registerNaNHandler(() => args[customIndex + 1]);
    } else {
      throw new Error("The --custom-nan flag requires a non-'NaN' replacement value immediately following the flag.");
    }
  } else if (preservedCustomHandler && typeof preservedCustomHandler === "function") {
    registerNaNHandler(preservedCustomHandler);
  } else if (effectiveCustomNan !== null && effectiveCustomNan !== undefined) {
    registerNaNHandler(() => effectiveCustomNan);
  } else {
    registerNaNHandler(null);
  }

  // Set global debug flag for enhanced diagnostic logging if --debug-nan is provided
  const debugNanFlag = args.includes("--debug-nan");
  globalThis.DEBUG_NAN = debugNanFlag;

  // If refresh-config flag is provided, update configuration dynamically
  if (args.includes("--refresh-config")) {
    updateGlobalNaNConfig();
  }

  // Dump configuration if requested
  if (args.includes("--dump-config")) {
    const configDump = {
      nativeNan: useNativeNanConfig,
      strictNan: useStrictNan,
      customNan: customNaNHandler ? customNaNHandler() : null,
      plugins: getPlugins().map((fn) => fn.name || "anonymous"),
    };
    console.log(JSON.stringify(configDump, nanReplacer));
    return;
  }

  // If serving mode is enabled, start configuration watcher for dynamic updates
  if (args.includes("--serve")) {
    if (!configWatcher) {
      startConfigWatcher();
    }
  }

  // Remove configuration flags from arguments before processing
  const processedArgs = [];
  for (let i = 0; i < args.length; i++) {
    if (
      [
        "--use-plugins",
        "--native-nan",
        "--strict-nan",
        "--debug-nan",
        "--trace-plugins",
        "--dump-config",
        "--serve",
        "--refresh-config",
      ].includes(args[i])
    )
      continue;
    if (args[i] === "--custom-nan") {
      i++;
      continue;
    }
    processedArgs.push(args[i]);
  }

  const convertedArgs = [];
  const debugDetails = [];
  for (let i = 0; i < processedArgs.length; i++) {
    const arg = processedArgs[i];
    // Use normalization for NaN check to support Unicode variants
    if (normalizeValue(arg).toLowerCase() === "nan") {
      const { converted, conversionMethod } = await processNaNConversion(arg);
      convertedArgs.push(converted);
      if (debugNanFlag) {
        debugDetails.push({
          raw: arg,
          normalized: normalizeValue(arg),
          converted,
          conversionMethod,
        });
      }
    } else {
      convertedArgs.push(convertArg(arg));
    }
  }

  let finalData = convertedArgs;
  let pluginTrace;
  if (args.includes("--use-plugins") && getPlugins().length > 0) {
    if (args.includes("--trace-plugins")) {
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
  if (pluginTrace) {
    finalLog.pluginTrace = pluginTrace;
  }

  console.log(JSON.stringify(finalLog, nanReplacer));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
