import { describe, test, expect } from 'vitest';
import { spawnSync, spawn } from 'child_process';
import { mkdtempSync, writeFileSync, readFileSync, unlinkSync, existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import os from 'os';
import http from 'http';

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
    const result = spawnSync('node', [cliPath, '--export-owl', inputFile], { encoding: 'utf-8' });
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
    const result = spawnSync('node', [cliPath, '--export-owl', inputFile, outputFile], { encoding: 'utf-8' });
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
    const result = spawnSync('node', [cliPath, '--export-xml', inputFile], { encoding: 'utf-8' });
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
    const result = spawnSync('node', [cliPath, '--export-xml', inputFile, outputFile], { encoding: 'utf-8' });
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
    const result = spawnSync('node', [cliPath, '--build-enhanced'], { encoding: 'utf-8', env: { ...process.env, NODE_ENV: 'test' }, timeout: 5000 });
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

  test('--diff flag outputs differences when ontologies differ', () => {
    clearLogFile();
    const ontology1 = {
      name: 'OntologyA',
      version: '1.0',
      classes: ['Class1', 'Class2'],
      properties: { propA: 'valueA', propB: 'valueB' }
    };
    const ontology2 = {
      name: 'OntologyB',
      version: '2.0',
      classes: ['Class2', 'Class3'],
      properties: { propA: 'valueA_modified', propC: 'valueC' }
    };
    const file1 = join(tempDir, 'diff1.json');
    const file2 = join(tempDir, 'diff2.json');
    writeFileSync(file1, JSON.stringify(ontology1, null, 2), { encoding: 'utf-8' });
    writeFileSync(file2, JSON.stringify(ontology2, null, 2), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--diff', file1, file2], { encoding: 'utf-8' });
    const diffOutput = JSON.parse(result.stdout);
    expect(diffOutput).toHaveProperty('name');
    expect(diffOutput.name).toEqual({ from: 'OntologyA', to: 'OntologyB' });
    expect(diffOutput).toHaveProperty('version');
    expect(diffOutput.version).toEqual({ from: '1.0', to: '2.0' });
    expect(diffOutput).toHaveProperty('classes');
    expect(diffOutput.classes).toHaveProperty('added');
    expect(diffOutput.classes).toHaveProperty('removed');
    expect(diffOutput.classes.added).toContain('Class3');
    expect(diffOutput.classes.removed).toContain('Class1');
    expect(diffOutput).toHaveProperty('properties');
    expect(diffOutput.properties).toHaveProperty('added');
    expect(diffOutput.properties).toHaveProperty('removed');
    expect(diffOutput.properties).toHaveProperty('modified');
    unlinkSync(file1);
    unlinkSync(file2);
    const logContent = readLogFile();
    expect(logContent).toContain('--diff');
  });

  test('--diff flag outputs "No differences found" when ontologies are identical', () => {
    clearLogFile();
    const ontology = {
      name: 'SameOntology',
      version: '1.0',
      classes: ['Class1', 'Class2'],
      properties: { propA: 'valueA' }
    };
    const file1 = join(tempDir, 'same1.json');
    const file2 = join(tempDir, 'same2.json');
    writeFileSync(file1, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
    writeFileSync(file2, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
    const result = spawnSync('node', [cliPath, '--diff', file1, file2], { encoding: 'utf-8' });
    const diffOutput = JSON.parse(result.stdout);
    expect(diffOutput).toHaveProperty('message', 'No differences found');
    unlinkSync(file1);
    unlinkSync(file2);
    const logContent = readLogFile();
    expect(logContent).toContain('--diff');
  });
});

// REST API Endpoint Tests

describe('REST API Endpoints', () => {
  test('GET /health returns healthy status', (done) => {
    const serverProcess = spawn('node', [cliPath, '--serve'], { stdio: 'pipe', env: process.env });
    // Wait briefly for server to start
    setTimeout(() => {
      http.get('http://localhost:3000/health', (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          const json = JSON.parse(data);
          expect(json.status).toBe('ok');
          serverProcess.kill();
          done();
        });
      }).on('error', (err) => {
        serverProcess.kill();
        done(err);
      });
    }, 500);
  });

  test('POST /ontology/build returns build triggered message', (done) => {
    const serverProcess = spawn('node', [cliPath, '--serve'], { stdio: 'pipe', env: process.env });
    setTimeout(() => {
      const options = {
        hostname: 'localhost',
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
          const json = JSON.parse(data);
          expect(json.message).toBe('Ontology build triggered');
          serverProcess.kill();
          done();
        });
      });
      req.on('error', (err) => {
        serverProcess.kill();
        done(err);
      });
      req.end();
    }, 500);
  });

  test('GET /ontology/read returns dummy ontology', (done) => {
    const serverProcess = spawn('node', [cliPath, '--serve'], { stdio: 'pipe', env: process.env });
    setTimeout(() => {
      http.get('http://localhost:3000/ontology/read', (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          const json = JSON.parse(data);
          expect(json).toHaveProperty('name', 'Dummy Ontology');
          serverProcess.kill();
          done();
        });
      }).on('error', (err) => {
        serverProcess.kill();
        done(err);
      });
    }, 500);
  });

  test('POST /ontology/merge returns merged ontology', (done) => {
    const serverProcess = spawn('node', [cliPath, '--serve'], { stdio: 'pipe', env: process.env });
    setTimeout(() => {
      const options = {
        hostname: 'localhost',
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
          const json = JSON.parse(data);
          expect(json).toHaveProperty('message', 'Ontologies merged');
          expect(json.merged).toHaveProperty('name');
          serverProcess.kill();
          done();
        });
      });
      const payload = JSON.stringify([
        { name: 'Ontology1', version: '1.0', classes: ['A'], properties: { p: 'a' } },
        { name: 'Ontology2', version: '1.0', classes: ['B'], properties: { q: 'b' } }
      ]);
      req.on('error', (err) => {
        serverProcess.kill();
        done(err);
      });
      req.write(payload);
      req.end();
    }, 500);
  });
});

// Interactive Mode Auto-Completion Tests

describe('Interactive Mode Auto-Completion', () => {
  test('provides base command suggestions when no ontology is loaded', () => {
    const [completions, line] = interactiveCompleter(null, '');
    expect(completions).toEqual(expect.arrayContaining(['load', 'show', 'list-classes', 'help', 'exit']))
  });

  test('provides ontology class suggestions when ontology is loaded', () => {
    const ontology = { classes: ['Person', 'Animal'] };
    const [completions, line] = interactiveCompleter(ontology, 'P');
    expect(completions).toEqual(expect.arrayContaining(['Person']))
  });
});

// New tests for enhanced --fetch command

describe('--fetch Command Enhanced Functionality', () => {
  test('--fetch falls back to dummy ontology when FETCH_URL is not set', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--fetch'], { encoding: 'utf-8', timeout: 5000 });
    const output = JSON.parse(result.stdout);
    expect(output).toHaveProperty('name', 'Fetched Ontology');
    expect(output).toHaveProperty('version', 'fetched-1.0');
    const logContent = readLogFile();
    expect(logContent).toContain('--fetch');
  });

  test('--fetch retrieves ontology from a dynamic public API when FETCH_URL is set', (done) => {
    // Create a temporary HTTP server to simulate a public API
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
      const result = spawnSync('node', [cliPath, '--fetch'], { encoding: 'utf-8', env, timeout: 5000 });
      const output = JSON.parse(result.stdout);
      expect(output).toHaveProperty('name', 'Dynamic Ontology');
      expect(output).toHaveProperty('version', 'dynamic-123');
      apiServer.close();
      done();
    });
  });
});
