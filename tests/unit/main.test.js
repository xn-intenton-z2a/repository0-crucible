import { describe, test, expect } from 'vitest';
import { spawnSync, spawn } from 'child_process';
import { mkdtempSync, writeFileSync, readFileSync, unlinkSync, existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import os from 'os';
import http from 'http';
import WebSocket from 'ws';

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

// Helper function to clear history file before test
function clearHistoryFile() {
  const historyFilePath = join(process.cwd(), 'logs', 'cli_history.txt');
  if (existsSync(historyFilePath)) {
    rmSync(historyFilePath, { force: true });
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

// Helper function to read history file content
function readHistoryFile() {
  const historyFilePath = join(process.cwd(), 'logs', 'cli_history.txt');
  if (existsSync(historyFilePath)) {
    return readFileSync(historyFilePath, { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, [cliPath, '--help'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('--version');
    expect(result.stdout).toContain('Using DEFAULT_TIMEOUT:');
    const logContent = readLogFile();
    expect(logContent).toContain('--help');
  });

  test('--version flag outputs package version', () => {
    clearLogFile();
    const result = spawnSync(process.execPath, [cliPath, '--version'], { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, [cliPath, '--read', ontologyFile], { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, [cliPath, '--read', ontologyFile], { encoding: 'utf-8' });
    expect(result.stderr).toContain('LOG_ERR_ONTOLOGY_VALIDATE');
    unlinkSync(ontologyFile);
  });

  test('--persist flag writes dummy ontology to file when no custom ontology is provided', () => {
    clearLogFile();
    const outputFile = join(tempDir, 'persisted.json');
    const result = spawnSync(process.execPath, [cliPath, '--persist', outputFile], { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, args, { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, args, { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, args, { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, [cliPath, '--export-graphdb', inputFile], { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, [cliPath, '--export-graphdb', inputFile, outputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('GraphDB exporter output written to');
    const outputContent = readFileSync(outputFile, { encoding: 'utf-8' });
    expect(outputContent).toContain('nodes');
    const logContent = readLogFile();
    expect(logContent).toContain('--export-graphdb');
    unlinkSync(inputFile);
    unlinkSync(outputFile);
  });

  test('--export-owl flag exports OWL/Turtle format to STDOUT', () => {
    clearLogFile();
    const dummyOntology = {
      name: 'OwlOntology',
      version: '1.0',
      classes: ['OwlClass'],
      properties: { owlProp: 'owlValue' }
    };
    const inputFile = join(tempDir, 'owlOntology.json');
    writeFileSync(inputFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync(process.execPath, [cliPath, '--export-owl', inputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('@prefix owl: <http://www.w3.org/2002/07/owl#>');
    expect(result.stdout).toContain('a owl:Ontology');
    const logContent = readLogFile();
    expect(logContent).toContain('--export-owl');
    unlinkSync(inputFile);
  });

  test('--export-owl flag writes output to file if provided', () => {
    clearLogFile();
    const dummyOntology = {
      name: 'OwlOntologyFile',
      version: '1.0',
      classes: ['OwlClassFile'],
      properties: { owlPropFile: 'owlValueFile' }
    };
    const inputFile = join(tempDir, 'owlOntologyFile.json');
    const outputFile = join(tempDir, 'owlOutput.ttl');
    writeFileSync(inputFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync(process.execPath, [cliPath, '--export-owl', inputFile, outputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('OWL/Turtle exporter output written to');
    const outputContent = readFileSync(outputFile, { encoding: 'utf-8' });
    expect(outputContent).toContain('@prefix owl: <http://www.w3.org/2002/07/owl#>');
    const logContent = readLogFile();
    expect(logContent).toContain('--export-owl');
    unlinkSync(inputFile);
    unlinkSync(outputFile);
  });

  test('--export-xml flag exports RDF/XML format to STDOUT', () => {
    clearLogFile();
    const dummyOntology = {
      name: 'XMLOntology',
      version: '1.0',
      classes: ['XMLClass'],
      properties: { xmlProp: 'xmlValue' }
    };
    const inputFile = join(tempDir, 'xmlOntology.json');
    writeFileSync(inputFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync(process.execPath, [cliPath, '--export-xml', inputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('<?xml version="1.0"?>');
    expect(result.stdout).toContain('owl:Ontology');
    const logContent = readLogFile();
    expect(logContent).toContain('--export-xml');
    unlinkSync(inputFile);
  });

  test('--export-xml flag writes RDF/XML to file if provided', () => {
    clearLogFile();
    const dummyOntology = {
      name: 'XMLOntologyFile',
      version: '1.0',
      classes: ['XMLClassFile'],
      properties: { xmlPropFile: 'xmlValueFile' }
    };
    const inputFile = join(tempDir, 'xmlOntologyFile.json');
    const outputFile = join(tempDir, 'xmlOutput.xml');
    writeFileSync(inputFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync(process.execPath, [cliPath, '--export-xml', inputFile, outputFile], { encoding: 'utf-8' });
    expect(result.stdout).toContain('RDF/XML exporter output written to');
    const outputContent = readFileSync(outputFile, { encoding: 'utf-8' });
    expect(outputContent).toContain('<?xml version="1.0"?>');
    const logContent = readLogFile();
    expect(logContent).toContain('--export-xml');
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
    const result = spawnSync(process.execPath, [cliPath, '--merge-persist', file1, file2, outputFile], { encoding: 'utf-8' });
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
    const result = spawnSync(process.execPath, [cliPath, '--refresh'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('System state refreshed');
    const logContent = readLogFile();
    expect(logContent).toContain('--refresh');
    expect(logContent).not.toContain('dummy log content');
  });

  test('--build-intermediate flag processes intermediate build', () => {
    clearLogFile();
    const result = spawnSync(process.execPath, [cliPath, '--build-intermediate'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Intermediate build processed');
    const logContent = readLogFile();
    expect(logContent).toContain('--build-intermediate');
  });

  test('--build-enhanced flag processes enhanced build with public API data', () => {
    clearLogFile();
    const result = spawnSync(process.execPath, [cliPath, '--build-enhanced'], { encoding: 'utf-8', env: { ...process.env, NODE_ENV: 'test' }, timeout: 5000 });
    const output = JSON.parse(result.stdout);
    expect(output).toHaveProperty('name', 'Enhanced Ontology');
    const logContent = readLogFile();
    expect(logContent).toContain('--build-enhanced');
  });

  test('--serve flag launches and stops the HTTP server', async () => {
    clearLogFile();
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [cliPath, '--serve'], { encoding: 'utf-8', env: { ...process.env, NODE_ENV: 'test' } });
      let output = '';
      child.stdout.on('data', (data) => { output += data; });
      child.on('close', (code) => {
        try {
          expect(output).toContain('Server started on port');
          expect(output).toContain('Server stopped');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  });

  test('GET /health returns healthy status', async () => {
    await new Promise((resolve, reject) => {
      const serverProcess = spawn(process.execPath, [cliPath, '--serve'], { stdio: 'pipe', env: { ...process.env, NODE_ENV: 'test' } });
      setTimeout(() => {
        http.get('http://127.0.0.1:3000/health', (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              expect(json.status).toBe('ok');
              serverProcess.kill();
              resolve();
            } catch (err) {
              serverProcess.kill();
              reject(err);
            }
          });
        }).on('error', (err) => {
          serverProcess.kill();
          reject(err);
        });
      }, 500);
    });
  });

  test('POST /ontology/build returns build triggered message', async () => {
    await new Promise((resolve, reject) => {
      const serverProcess = spawn(process.execPath, [cliPath, '--serve'], { stdio: 'pipe', env: { ...process.env, NODE_ENV: 'test' } });
      setTimeout(() => {
        const options = {
          hostname: '127.0.0.1',
          port: 3000,
          path: '/ontology/build',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              expect(json.message).toBe('Ontology build triggered');
              serverProcess.kill();
              resolve();
            } catch (err) {
              serverProcess.kill();
              reject(err);
            }
          });
        });
        req.on('error', (err) => {
          serverProcess.kill();
          reject(err);
        });
        req.end();
      }, 500);
    });
  });

  test('GET /ontology/read returns dummy ontology', async () => {
    await new Promise((resolve, reject) => {
      const serverProcess = spawn(process.execPath, [cliPath, '--serve'], { stdio: 'pipe', env: { ...process.env, NODE_ENV: 'test' } });
      setTimeout(() => {
        http.get('http://127.0.0.1:3000/ontology/read', (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              expect(json).toHaveProperty('name', 'Dummy Ontology');
              serverProcess.kill();
              resolve();
            } catch (err) {
              serverProcess.kill();
              reject(err);
            }
          });
        }).on('error', (err) => {
          serverProcess.kill();
          reject(err);
        });
      }, 500);
    });
  });

  test('POST /ontology/merge returns merged ontology', async () => {
    await new Promise((resolve, reject) => {
      const serverProcess = spawn(process.execPath, [cliPath, '--serve'], { stdio: 'pipe', env: { ...process.env, NODE_ENV: 'test' } });
      setTimeout(() => {
        const options = {
          hostname: '127.0.0.1',
          port: 3000,
          path: '/ontology/merge',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              expect(json).toHaveProperty('message', 'Ontologies merged');
              expect(json.merged).toHaveProperty('name');
              serverProcess.kill();
              resolve();
            } catch (err) {
              serverProcess.kill();
              reject(err);
            }
          });
        });
        const payload = JSON.stringify([
          { name: 'Ontology1', version: '1.0', classes: ['A'], properties: { p: 'a' } },
          { name: 'Ontology2', version: '1.0', classes: ['B'], properties: { q: 'b' } }
        ]);
        req.on('error', (err) => {
          serverProcess.kill();
          reject(err);
        });
        req.write(payload);
        req.end();
      }, 500);
    });
  });

  test('Interactive Mode Editing Commands and Persistent History', async () => {
    clearHistoryFile();
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [cliPath, '--interactive'], { stdio: ['pipe', 'pipe', 'pipe'], env: { NODE_ENV: 'test' } });
      let output = '';
      child.stdout.on('data', (data) => { output += data.toString(); });

      const dummyOntology = {
        name: 'InteractiveTest',
        version: '1.0',
        classes: ['InitialClass'],
        properties: { initialProp: 'initial' }
      };
      const ontologyFile = join(tempDir, 'interactiveOntology.json');
      writeFileSync(ontologyFile, JSON.stringify(dummyOntology, null, 2), { encoding: 'utf-8' });
      const commands = [
        `load ${ontologyFile}\n`,
        'add-class Biology\n',
        'remove-class InitialClass\n',
        'add-property creator John_Doe\n',
        'update-property version 2.0\n',
        'remove-property initialProp\n',
        'show\n',
        'exit\n'
      ];
      commands.forEach(cmd => child.stdin.write(cmd));
      child.stdin.end();
      child.on('close', (code) => {
        try {
          expect(output).toContain("Ontology 'InteractiveTest' loaded successfully.");
          expect(output).toContain("Class 'Biology' added.");
          expect(output).toContain("Class 'InitialClass' removed.");
          expect(output).toContain("Property 'creator' added with value 'John_Doe'.");
          expect(output).toContain("Property 'version' updated to '2.0'.");
          expect(output).toContain("Property 'initialProp' removed.");
          expect(output).toContain('Loaded Ontology:');
          // Check persistent history file
          const historyContent = readHistoryFile();
          expect(historyContent).toContain('load');
          expect(historyContent).toContain('add-class');
          expect(historyContent).toContain('remove-class');
          expect(historyContent).toContain('add-property');
          expect(historyContent).toContain('update-property');
          expect(historyContent).toContain('remove-property');
          unlinkSync(ontologyFile);
          resolve();
        } catch (err) {
          unlinkSync(ontologyFile);
          reject(err);
        }
      });
    });
  }, 15000);

  test('--build-ontology builds ontology from default when no input file provided', () => {
    clearLogFile();
    const result = spawnSync(process.execPath, [cliPath, '--build-ontology'], { encoding: 'utf-8' });
    const output = JSON.parse(result.stdout);
    expect(output).toHaveProperty('name', 'Built Ontology');
    expect(output).toHaveProperty('built', true);
    const logContent = readLogFile();
    expect(logContent).toContain('--build-ontology');
  });

  test('--build-ontology builds ontology from input file when provided', () => {
    clearLogFile();
    const inputOntology = {
      name: 'Input Ontology',
      version: '0.5',
      classes: ['X'],
      properties: { keyX: 'valueX' }
    };
    const inputFile = join(tempDir, 'inputBuild.json');
    writeFileSync(inputFile, JSON.stringify(inputOntology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync(process.execPath, [cliPath, '--build-ontology', inputFile], { encoding: 'utf-8' });
    const output = JSON.parse(result.stdout);
    expect(output).toHaveProperty('name', 'Input Ontology');
    expect(output).toHaveProperty('built', true);
    unlinkSync(inputFile);
  });

  test('--merge-ontology merges two ontologies and outputs result to stdout', () => {
    clearLogFile();
    const ontology1 = {
      name: 'MergeTest1',
      version: '1.1',
      classes: ['A', 'B'],
      properties: { prop1: 'val1' }
    };
    const ontology2 = {
      name: 'MergeTest2',
      version: '1.2',
      classes: ['B', 'C'],
      properties: { prop2: 'val2' }
    };
    const file1 = join(tempDir, 'mergeTest1.json');
    const file2 = join(tempDir, 'mergeTest2.json');
    writeFileSync(file1, JSON.stringify(ontology1, null, 2), { encoding: 'utf-8' });
    writeFileSync(file2, JSON.stringify(ontology2, null, 2), { encoding: 'utf-8' });
    const result = spawnSync(process.execPath, [cliPath, '--merge-ontology', file1, file2], { encoding: 'utf-8' });
    const merged = JSON.parse(result.stdout);
    expect(merged.name).toBe('MergeTest1 & MergeTest2');
    expect(merged.classes.sort()).toEqual(['A', 'B', 'C'].sort());
    unlinkSync(file1);
    unlinkSync(file2);
  });

  test('--query-ontology returns query results based on search term', () => {
    clearLogFile();
    const ontology = {
      name: 'QueryOntology',
      version: '2.0',
      classes: ['Alpha', 'Beta'],
      properties: { key1: 'value1', key2: 'searchValue' }
    };
    const ontologyFile = join(tempDir, 'queryOntology.json');
    writeFileSync(ontologyFile, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync(process.execPath, [cliPath, '--query-ontology', ontologyFile, 'search'], { encoding: 'utf-8' });
    const output = JSON.parse(result.stdout);
    expect(output).toHaveProperty('propertyKeys');
    unlinkSync(ontologyFile);
  });
});

describe('Interactive Mode Auto-Completion', () => {
  test('provides base command suggestions when no ontology is loaded', () => {
    const [completions, line] = interactiveCompleter(null, '');
    expect(completions).toEqual(expect.arrayContaining(['load', 'show', 'list-classes', 'help', 'exit', 'add-class', 'remove-class', 'add-property', 'update-property', 'remove-property']))
  });

  test('provides ontology class suggestions when ontology is loaded', () => {
    const ontology = { classes: ['Person', 'Animal'] };
    const [completions, line] = interactiveCompleter(ontology, 'P');
    expect(completions).toEqual(expect.arrayContaining(['Person']))
  });
});

describe('--fetch Command Enhanced Functionality', () => {
  test('--fetch falls back to dummy ontology when FETCH_URL is not set', () => {
    clearLogFile();
    const result = spawnSync(process.execPath, [cliPath, '--fetch'], { encoding: 'utf-8', timeout: 5000 });
    const output = JSON.parse(result.stdout);
    expect(output).toHaveProperty('name', 'Fetched Ontology');
    expect(output).toHaveProperty('version', 'fetched-1.0');
    const logContent = readLogFile();
    expect(logContent).toContain('--fetch');
  });

  test('--fetch retrieves ontology from a dynamic public API when FETCH_URL is set', async () => {
    await new Promise((resolve, reject) => {
      const testData = {
        name: 'Dynamic Ontology',
        version: 'dynamic-123',
        classes: ['DynamicClass'],
        properties: { dynamicProp: 'dynamicValue' }
      };
      const apiServer = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(testData));
      });
      apiServer.listen(0, () => {
        const port = apiServer.address().port;
        const fetchUrl = `http://127.0.0.1:${port}`;
        const env = { ...process.env, FETCH_URL: fetchUrl };
        const child = spawn(process.execPath, [cliPath, '--fetch'], { encoding: 'utf-8', env, timeout: 5000 });
        let output = '';
        child.stdout.on('data', data => { output += data; });
        child.on('close', () => {
          try {
            const parsed = JSON.parse(output);
            expect(parsed).toHaveProperty('name', 'Dynamic Ontology');
            expect(parsed).toHaveProperty('version', 'dynamic-123');
            apiServer.close();
            resolve();
          } catch (err) {
            apiServer.close();
            reject(err);
          }
        });
      });
    });
  });
});

describe('WebSocket Notifications', () => {
  test('receives test notification on /ontology/notify endpoint', async () => {
    await new Promise((resolve, reject) => {
      const serverProcess = spawn(process.execPath, [cliPath, '--serve'], { stdio: 'pipe', env: { ...process.env, NODE_ENV: 'test' } });
      let serverOutput = '';
      serverProcess.stdout.on('data', (data) => { serverOutput += data.toString(); });
      // Wait for server to start
      setTimeout(() => {
        const ws = new WebSocket('ws://127.0.0.1:3000');
        ws.on('open', () => {
          // Trigger test notification via HTTP
          http.get('http://127.0.0.1:3000/ontology/notify', (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
              // Wait for WS message
            });
          }).on('error', (err) => { reject(err); });
        });
        ws.on('message', (message) => {
          try {
            const notif = JSON.parse(message);
            expect(notif).toHaveProperty('event', 'testNotification');
            expect(notif.payload).toHaveProperty('info', 'Test');
            ws.close();
            serverProcess.kill();
            resolve();
          } catch (e) {
            ws.close();
            serverProcess.kill();
            reject(e);
          }
        });
      }, 500);
    });
  });
});
