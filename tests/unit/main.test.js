import { describe, test, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { mkdtempSync, writeFileSync, readFileSync, unlinkSync, existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import os from 'os';

// Import the interactiveCompleter helper for testing auto-completion
import { interactiveCompleter } from '../../src/lib/main.js';

// Path to the CLI entry point
const cliPath = join(process.cwd(), 'src', 'lib', 'main.js');
const packageJsonPath = join(process.cwd(), 'package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, { encoding: 'utf-8' }));

// Create a temporary directory for test files
const tempDir = mkdtempSync(join(os.tmpdir(), 'cli-e2e-'));

// Helper function to clear logs file before test
function clearLogFile() {
  const logFilePath = join(process.cwd(), 'logs', 'cli.log');
  if (existsSync(logFilePath)) {
    rmSync(logFilePath, { force: true });
  }
}

// Helper function to read log file content
function readLogFile() {
  const logFilePath = join(process.cwd(), 'logs', 'cli.log');
  if (existsSync(logFilePath)) {
    return readFileSync(logFilePath, { encoding: 'utf-8' });
  }
  return '';
}

// Helper function to clear ontologies directory
function clearOntologiesDir() {
  const ontDir = join(process.cwd(), 'ontologies');
  if (existsSync(ontDir)) {
    const files = require('fs').readdirSync(ontDir);
    for (const file of files) {
      rmSync(join(ontDir, file), { force: true });
    }
  }
}


describe('End-to-End CLI Integration Tests - Modular Commands', () => {
  test('--help flag displays usage information', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--help'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('--version');
    expect(result.stdout).toContain('Using DEFAULT_TIMEOUT:');
    const logContent = readLogFile();
    expect(logContent).toContain('--help');
  });

  test('--version flag outputs package version', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--version'], { encoding: 'utf-8' });
    expect(result.stdout.trim()).toBe(pkg.version);
    const logContent = readLogFile();
    expect(logContent).toContain('--version');
  });

  test('--read flag loads ontology and outputs confirmation', () => {
    clearLogFile();
    const dummyOntology = {
      name: 'TestOntology',
      version: '0.0.1',
      classes: ['TestClass'],
      properties: { testProp: 'testValue' }
    };
    const ontologyFile = join(tempDir, 'ontology.json');
    writeFileSync(ontologyFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--read', ontologyFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Ontology loaded:');
    const logContent = readLogFile();
    expect(logContent).toContain('--read');
    unlinkSync(ontologyFile);
  });

  test('--read flag fails validation for invalid ontology structure', () => {
    clearLogFile();
    const invalidOntology = { name: 123, version: '1.0', classes: 'not-an-array', properties: {} };
    const ontologyFile = join(tempDir, 'invalidOntology.json');
    writeFileSync(ontologyFile, JSON.stringify(invalidOntology), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--read', ontologyFile], { encoding: 'utf-8' });
    expect(result.stderr).toContain('LOG_ERR_ONTOLOGY_VALIDATE');
    unlinkSync(ontologyFile);
  });

  test('--persist flag writes dummy ontology to file when no custom ontology is provided', () => {
    clearLogFile();
    const outputFile = join(tempDir, 'persisted.json');
    const result = spawnSync('node', [cliPath, '--persist', outputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Ontology persisted to');
    const persisted = JSON.parse(readFileSync(outputFile, { encoding: 'utf-8' }));
    expect(persisted).toHaveProperty('name', 'Dummy Ontology');
    const logContent = readLogFile();
    expect(logContent).toContain('--persist');
    unlinkSync(outputFile);
  });

  test('--persist flag writes custom ontology from JSON string when provided', () => {
    clearLogFile();
    const outputFile = join(tempDir, 'customPersisted.json');
    const customOntology = {
      name: 'Custom Ontology',
      version: '2.0.0',
      classes: ['CustomClass'],
      properties: { customProp: 'customValue' }
    };
    const args = [cliPath, '--persist', outputFile, '--ontology', JSON.stringify(customOntology)];
    const result = spawnSync('node', args, { encoding: 'utf-8' });
    expect(result.stdout).toContain('Ontology persisted to');
    const persisted = JSON.parse(readFileSync(outputFile, { encoding: 'utf-8' }));
    expect(persisted).toEqual(customOntology);
    const logContent = readLogFile();
    expect(logContent).toContain('--persist');
    unlinkSync(outputFile);
  });

  test('--persist flag reads custom ontology from file when provided', () => {
    clearLogFile();
    const ontologyInputFile = join(tempDir, 'inputOntology.json');
    const outputFile = join(tempDir, 'customFilePersisted.json');
    const customOntology = {
      name: 'File Ontology',
      version: '3.0.0',
      classes: ['FileClass'],
      properties: { fileProp: 'fileValue' }
    };
    writeFileSync(ontologyInputFile, JSON.stringify(customOntology, null, 2), { encoding: 'utf-8' });
    const args = [cliPath, '--persist', outputFile, '--ontology', ontologyInputFile];
    const result = spawnSync('node', args, { encoding: 'utf-8' });
    expect(result.stdout).toContain('Ontology persisted to');
    const persisted = JSON.parse(readFileSync(outputFile, { encoding: 'utf-8' }));
    expect(persisted).toEqual(customOntology);
    const logContent = readLogFile();
    expect(logContent).toContain('--persist');
    unlinkSync(ontologyInputFile);
    unlinkSync(outputFile);
  });

  test('--persist flag fails gracefully with invalid custom ontology JSON string', () => {
    clearLogFile();
    const outputFile = join(tempDir, 'invalidPersisted.json');
    const invalidJSON = '{ invalid json }';
    const args = [cliPath, '--persist', outputFile, '--ontology', invalidJSON];
    const result = spawnSync('node', args, { encoding: 'utf-8' });
    expect(result.stderr).toContain('LOG_ERR_PERSIST_PARSE');
    const logContent = readLogFile();
    expect(logContent).toContain('--persist');
  });

  test('--export-graphdb flag exports GraphDB format to stdout', () => {
    clearLogFile();
    const dummyOntology = {
      name: 'GraphOntology',
      version: '1.0',
      classes: ['GraphClass'],
      properties: { graphProp: 'graphValue' }
    };
    const inputFile = join(tempDir, 'graphOntology.json');
    writeFileSync(inputFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--export-graphdb', inputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('GraphDB exporter output:');
    const logContent = readLogFile();
    expect(logContent).toContain('--export-graphdb');
    unlinkSync(inputFile);
  });

  test('--export-graphdb flag writes output to file if provided', () => {
    clearLogFile();
    const dummyOntology = {
      name: 'GraphOntology',
      version: '1.0',
      classes: ['GraphClass'],
      properties: { graphProp: 'graphValue' }
    };
    const inputFile = join(tempDir, 'graphOntology2.json');
    const outputFile = join(tempDir, 'graphOutput.json');
    writeFileSync(inputFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--export-graphdb', inputFile, outputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('GraphDB exporter output written to');
    const outputContent = readFileSync(outputFile, { encoding: 'utf-8' });
    expect(outputContent).toContain('nodes');
    const logContent = readLogFile();
    expect(logContent).toContain('--export-graphdb');
    unlinkSync(inputFile);
    unlinkSync(outputFile);
  });

  test('--merge-persist flag merges two ontologies and writes output', () => {
    clearLogFile();
    const ontology1 = {
      name: 'MergeOne',
      version: '1.0',
      classes: ['A', 'B'],
      properties: { prop1: 'value1', common: 'one' }
    };
    const ontology2 = {
      name: 'MergeTwo',
      version: '2.0',
      classes: ['B', 'C'],
      properties: { prop2: 'value2', common: 'two' }
    };
    const file1 = join(tempDir, 'merge1.json');
    const file2 = join(tempDir, 'merge2.json');
    const outputFile = join(tempDir, 'merged.json');
    writeFileSync(file1, JSON.stringify(ontology1, null, 2), { encoding: 'utf-8' });
    writeFileSync(file2, JSON.stringify(ontology2, null, 2), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--merge-persist', file1, file2, outputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Merged ontology persisted to');
    const merged = JSON.parse(readFileSync(outputFile, { encoding: 'utf-8' }));
    expect(merged.name).toBe('MergeOne & MergeTwo');
    expect(merged.classes.sort()).toEqual(['A', 'B', 'C'].sort());
    expect(merged.properties).toEqual({ prop1: 'value1', prop2: 'value2', common: 'two' });
    const logContent = readLogFile();
    expect(logContent).toContain('--merge-persist');
    unlinkSync(file1);
    unlinkSync(file2);
    unlinkSync(outputFile);
  });

  test('--refresh flag clears logs and outputs confirmation', () => {
    const logDir = join(process.cwd(), 'logs');
    const logFilePath = join(logDir, 'cli.log');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }
    writeFileSync(logFilePath, 'dummy log content\n', { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--refresh'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('System state refreshed');
    const logContent = readLogFile();
    expect(logContent).toContain('--refresh');
    expect(logContent).not.toContain('dummy log content');
  });

  test('--build-intermediate flag processes intermediate build', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--build-intermediate'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Intermediate build processed');
    const logContent = readLogFile();
    expect(logContent).toContain('--build-intermediate');
  });

  test('--build-enhanced flag processes enhanced build with public API data', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--build-enhanced'], { encoding: 'utf-8', timeout: 5000 });
    const output = JSON.parse(result.stdout);
    expect(output).toHaveProperty('name', 'Enhanced Ontology');
    const logContent = readLogFile();
    expect(logContent).toContain('--build-enhanced');
  });

  test('--serve flag launches and stops the HTTP server', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--serve'], { encoding: 'utf-8', timeout: 5000 });
    expect(result.stdout).toContain('Server started on port');
    expect(result.stdout).toContain('Server stopped');
    const logContent = readLogFile();
    expect(logContent).toContain('--serve');
  });

  // New tests for --query command
  describe('--query command tests', () => {
    test('returns matching results when search term is found', () => {
      clearLogFile();
      const ontology = {
        name: 'SearchOntology',
        version: '1.0',
        classes: ['Alpha', 'Beta'],
        properties: { description: 'This ontology is for testing', note: 'Important data' }
      };
      const ontologyFile = join(tempDir, 'searchOntology.json');
      writeFileSync(ontologyFile, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
      // Search term that matches name and a class
      const searchTerm = 'search';
      const result = spawnSync('node', [cliPath, '--query', ontologyFile, searchTerm], { encoding: 'utf-8' });
      const output = JSON.parse(result.stdout);
      expect(output).toHaveProperty('name', 'SearchOntology');
      unlinkSync(ontologyFile);
      const logContent = readLogFile();
      expect(logContent).toContain('--query');
    });

    test('returns no matches found when search term is absent', () => {
      clearLogFile();
      const ontology = {
        name: 'AnotherOntology',
        version: '1.0',
        classes: ['Gamma', 'Delta'],
        properties: { info: 'Sample' }
      };
      const ontologyFile = join(tempDir, 'noMatchOntology.json');
      writeFileSync(ontologyFile, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
      const searchTerm = 'nonexistent';
      const result = spawnSync('node', [cliPath, '--query', ontologyFile, searchTerm], { encoding: 'utf-8' });
      const output = JSON.parse(result.stdout);
      expect(output).toHaveProperty('message', 'No matches found');
      unlinkSync(ontologyFile);
    });

    test('handles invalid ontology file gracefully', () => {
      clearLogFile();
      const invalidOntology = { name: 123, version: '1.0', classes: 'not-an-array', properties: {} };
      const ontologyFile = join(tempDir, 'invalidQueryOntology.json');
      writeFileSync(ontologyFile, JSON.stringify(invalidOntology), { encoding: 'utf-8' });
      const searchTerm = 'test';
      const result = spawnSync('node', [cliPath, '--query', ontologyFile, searchTerm], { encoding: 'utf-8' });
      expect(result.stderr).toContain('LOG_ERR_ONTOLOGY_VALIDATE');
      unlinkSync(ontologyFile);
    });

    test('returns matching results using regex when --regex flag is provided', () => {
      clearLogFile();
      const ontology = {
        name: 'RegexOntology',
        version: '1.0',
        classes: ['AlphaClass', 'BetaClass'],
        properties: { info: 'Contains numbers 12345', note: 'Sample note' }
      };
      const ontologyFile = join(tempDir, 'regexOntology.json');
      writeFileSync(ontologyFile, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
      const regexPattern = '^RegexOntology$';
      const result = spawnSync('node', [cliPath, '--query', ontologyFile, regexPattern, '--regex'], { encoding: 'utf-8' });
      const output = JSON.parse(result.stdout);
      expect(output).toHaveProperty('name', 'RegexOntology');
      const logContent = readLogFile();
      expect(logContent).toContain('--query');
      unlinkSync(ontologyFile);
    });

    test('handles invalid regex pattern when --regex flag is provided', () => {
      clearLogFile();
      const ontology = {
        name: 'InvalidRegexOntology',
        version: '1.0',
        classes: ['Gamma'],
        properties: { key: 'value' }
      };
      const ontologyFile = join(tempDir, 'invalidRegexOntology.json');
      writeFileSync(ontologyFile, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
      const invalidPattern = '(unclosed';
      const result = spawnSync('node', [cliPath, '--query', ontologyFile, invalidPattern, '--regex'], { encoding: 'utf-8' });
      expect(result.stderr).toContain('LOG_ERR_INVALID_REGEX');
      unlinkSync(ontologyFile);
    });

  });
});

describe('Interactive Mode Auto-Completion', () => {
  test('provides base command suggestions when no ontology is loaded', () => {
    const [completions, line] = interactiveCompleter(null, '');
    expect(completions).toEqual(expect.arrayContaining(['load', 'show', 'list-classes', 'help', 'exit']));
  });

  test('provides ontology class suggestions when ontology is loaded', () => {
    const ontology = { classes: ['Person', 'Animal'] };
    const [completions, line] = interactiveCompleter(ontology, 'P');
    expect(completions).toEqual(expect.arrayContaining(['Person']));
  });
});
