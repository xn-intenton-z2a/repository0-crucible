#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import modular command handlers
import { handleRead } from './commands/read.js';
import { handlePersist } from './commands/persist.js';
import { handleExportGraphDB } from './commands/exportGraphDB.js';
import { handleMergePersist } from './commands/mergePersist.js';
import { handleVersion } from './commands/version.js';
import { handleDiagnostics } from './commands/diagnostics.js';
import { handleHelp } from './commands/help.js';
import { handleDefault } from './commands/default.js';

// Command dispatcher
function dispatchCommand(args) {
  if (args.includes('--diagnostics')) {
    handleDiagnostics(args);
    return;
  }
  if (args.includes('--version')) {
    handleVersion(args);
    return;
  }
  if (args.includes('--read')) {
    handleRead(args);
    return;
  }
  if (args.includes('--persist')) {
    handlePersist(args);
    return;
  }
  if (args.includes('--export-graphdb')) {
    handleExportGraphDB(args);
    return;
  }
  if (args.includes('--merge-persist')) {
    handleMergePersist(args);
    return;
  }
  if (args.includes('--help') || args.length === 0) {
    handleHelp(args);
    return;
  }
  handleDefault(args);
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
