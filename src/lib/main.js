#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, appendFileSync } from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import command handlers from dedicated modules
import handleHelp from '../commands/help.js';
import handleVersion from '../commands/version.js';
import handleRead from '../commands/read.js';
import handlePersist from '../commands/persist.js';
import handleExportGraphDB from '../commands/exportGraphDB.js';
import handleMergePersist from '../commands/mergePersist.js';
import handleDiagnostics from '../commands/diagnostics.js';
import handleRefresh from '../commands/refresh.js';
import handleDefault from '../commands/default.js';

// Utility: Log command execution to logs/cli.log
function logCommand(commandFlag) {
  const logDir = join(process.cwd(), 'logs');
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
  const logFile = join(logDir, 'cli.log');
  const logEntry = JSON.stringify({ timestamp: new Date().toISOString(), command: commandFlag });
  appendFileSync(logFile, logEntry + "\n", { encoding: 'utf-8' });
}

// Utility: Get validated DEFAULT_TIMEOUT with explicit handling for NaN and non-finite values
function getDefaultTimeout() {
  const rawTimeout = process.env.DEFAULT_TIMEOUT;
  const timeoutValue = Number(rawTimeout);
  if (isNaN(timeoutValue)) {
    console.error("DEFAULT_TIMEOUT is NaN; using default value of 5000");
    return 5000;
  }
  if (!isFinite(timeoutValue)) {
    console.error("DEFAULT_TIMEOUT not set; using default value of 5000 (invalid input: " + rawTimeout + ")");
    return 5000;
  }
  return timeoutValue;
}

// Command dispatcher using modular command handlers
function dispatchCommand(args) {
  if (args.includes('--diagnostics')) {
    return handleDiagnostics(args, { logCommand, getDefaultTimeout });
  }
  if (args.includes('--refresh')) {
    return handleRefresh(args, { logCommand });
  }
  if (args.includes('--version')) {
    return handleVersion(args, { logCommand });
  }
  if (args.includes('--read')) {
    return handleRead(args, { logCommand });
  }
  if (args.includes('--persist')) {
    return handlePersist(args, { logCommand });
  }
  if (args.includes('--export-graphdb')) {
    return handleExportGraphDB(args, { logCommand });
  }
  if (args.includes('--merge-persist')) {
    return handleMergePersist(args, { logCommand });
  }
  if (args.includes('--help') || args.length === 0) {
    return handleHelp(args, { logCommand, getDefaultTimeout });
  }
  return handleDefault(args, { logCommand });
}

// Main function
function main() {
  const args = process.argv.slice(2);
  dispatchCommand(args);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { dispatchCommand, main };