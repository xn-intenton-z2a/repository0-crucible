import { describe, test, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { mkdtempSync, writeFileSync, readFileSync, unlinkSync, existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import os from 'os';

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

// Helper function to write dummy log content
function writeDummyLog() {
  const logDir = join(process.cwd(), 'logs');
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
  const logFilePath = join(logDir, 'cli.log');
  writeFileSync(logFilePath, 'dummy log content\n', { encoding: 'utf-8' });
}


describe('End-to-End CLI Integration Tests - Modular Commands', () => {
  test('--help flag displays usage information', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--help'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('--version');
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
    expect(result.stderr).toContain('Error parsing ontology JSON string');
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

  test('Environment variable DEFAULT_TIMEOUT fallback when non-numeric is provided', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--help'], {
      encoding: 'utf-8',
      env: { ...process.env, DEFAULT_TIMEOUT: 'not_a_number' }
    });
    expect(result.stdout).toContain('Using DEFAULT_TIMEOUT: 5000');
    expect(result.stderr).toContain('DEFAULT_TIMEOUT is NaN; using default value of 5000');
    const logContent = readLogFile();
    expect(logContent).toContain('--help');
  });

  test('Environment variable DEFAULT_TIMEOUT uses valid numeric value', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--help'], {
      encoding: 'utf-8',
      env: { ...process.env, DEFAULT_TIMEOUT: '3000' }
    });
    expect(result.stdout).toContain('Using DEFAULT_TIMEOUT: 3000');
    expect(result.stderr).not.toContain('DEFAULT_TIMEOUT is NaN');
    expect(result.stderr).not.toContain('DEFAULT_TIMEOUT not set');
    const logContent = readLogFile();
    expect(logContent).toContain('--help');
  });

  test('Environment variable DEFAULT_TIMEOUT fallback when Infinity is provided', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--help'], {
      encoding: 'utf-8',
      env: { ...process.env, DEFAULT_TIMEOUT: 'Infinity' }
    });
    expect(result.stdout).toContain('Using DEFAULT_TIMEOUT: 5000');
    expect(result.stderr).toContain('DEFAULT_TIMEOUT not set; using default value of 5000');
    const logContent = readLogFile();
    expect(logContent).toContain('--help');
  });

  test('Environment variable DEFAULT_TIMEOUT fallback when -Infinity is provided', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--help'], {
      encoding: 'utf-8',
      env: { ...process.env, DEFAULT_TIMEOUT: '-Infinity' }
    });
    expect(result.stdout).toContain('Using DEFAULT_TIMEOUT: 5000');
    expect(result.stderr).toContain('DEFAULT_TIMEOUT not set; using default value of 5000');
    const logContent = readLogFile();
    expect(logContent).toContain('--help');
  });

  test('Environment variable DEFAULT_TIMEOUT fallback when NaN is provided', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--help'], {
      encoding: 'utf-8',
      env: { ...process.env, DEFAULT_TIMEOUT: 'NaN' }
    });
    expect(result.stdout).toContain('Using DEFAULT_TIMEOUT: 5000');
    expect(result.stderr).toContain('DEFAULT_TIMEOUT is NaN; using default value of 5000');
    const logContent = readLogFile();
    expect(logContent).toContain('--help');
  });

  test('Invalid ontology structure fails validation in --read', () => {
    clearLogFile();
    const invalidOntology = { name: 123, version: "1.0", classes: "not-an-array", properties: {} };
    const ontologyFile = join(tempDir, 'invalidOntology.json');
    writeFileSync(ontologyFile, JSON.stringify(invalidOntology), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--read', ontologyFile], { encoding: 'utf-8' });
    expect(result.stderr).toContain('Ontology validation failed:');
    unlinkSync(ontologyFile);
  });

  test('--diagnostics flag outputs valid JSON diagnostic report', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--diagnostics'], { encoding: 'utf-8' });
    let diagnostics;
    expect(() => { diagnostics = JSON.parse(result.stdout); }).not.toThrow();
    expect(diagnostics).toHaveProperty('packageVersion');
    expect(diagnostics).toHaveProperty('environment');
    expect(diagnostics).toHaveProperty('system');
    expect(diagnostics).toHaveProperty('cliCommands');
    expect(diagnostics).toHaveProperty('processArgs');
    const logContent = readLogFile();
    expect(logContent).toContain('--diagnostics');
  });

  test('--refresh flag clears logs and outputs confirmation', () => {
    // Write dummy log content so we can verify it gets cleared
    const logDir = join(process.cwd(), 'logs');
    const logFilePath = join(logDir, 'cli.log');
    if (!existsSync(logDir)) {
      writeFileSync(logDir, '', { encoding: 'utf-8' });
    }
    writeFileSync(logFilePath, 'dummy log content\n', { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--refresh'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('System state refreshed');
    const logContent = readLogFile();
    expect(logContent).toContain('--refresh');
    expect(logContent).not.toContain('dummy log content');
  });
});
