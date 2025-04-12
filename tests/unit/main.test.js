import { describe, test, expect, beforeAll } from 'vitest';
import { spawnSync, spawn } from 'child_process';
import { mkdtempSync, writeFileSync, readFileSync, unlinkSync, existsSync, rmSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import os from 'os';
import http from 'http';

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

// Helper function to clear ontologies directory
function clearOntologiesDir() {
  const ontDir = join(process.cwd(), 'ontologies');
  if (existsSync(ontDir)) {
    const files = readdirSync(ontDir);
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
    // Intentionally create a file instead of directory to emulate pre-existing condition
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

  test('--build-intermediate flag processes intermediate build', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--build-intermediate'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Intermediate build processed');
    const logContent = readLogFile();
    expect(logContent).toContain('--build-intermediate');
  });

  test('--build-enhanced flag processes enhanced build', () => {
    clearLogFile();
    const result = spawnSync('node', [cliPath, '--build-enhanced'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Enhanced build processed');
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

});

// New tests for REST API endpoints for ontology CRUD operations

describe('REST API Endpoints', () => {
  // Before tests, clear ontologies directory
  beforeAll(() => {
    clearOntologiesDir();
  });

  test('CRUD operations on /ontology endpoint', (done) => {
    // Spawn the server using spawn (non-blocking) so we can make HTTP requests
    const serverProcess = spawn('node', [cliPath, '--serve'], { stdio: ['pipe', 'pipe', 'pipe'] });
    let serverOutput = '';
    serverProcess.stdout.on('data', (data) => {
      serverOutput += data.toString();
    });
    
    // Wait for the server to start
    setTimeout(() => {
      // 1. Test GET /diagnostics
      http.get('http://localhost:3000/diagnostics', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const diag = JSON.parse(data);
          expect(diag).toHaveProperty('packageVersion');
          
          // 2. Test GET /ontology (should be empty)
          http.get('http://localhost:3000/ontology', (res2) => {
            let data2 = '';
            res2.on('data', chunk => data2 += chunk);
            res2.on('end', () => {
              const ontList = JSON.parse(data2);
              expect(Array.isArray(ontList)).toBe(true);
              expect(ontList.length).toBe(0);
              
              // 3. Test POST /ontology
              const postData = JSON.stringify({
                name: 'New Ontology',
                version: '1.0',
                classes: ['Class1'],
                properties: { prop1: 'value1' }
              });
              const postOptions = {
                hostname: 'localhost',
                port: 3000,
                path: '/ontology',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': Buffer.byteLength(postData)
                }
              };
              const postReq = http.request(postOptions, (res3) => {
                let postResData = '';
                res3.on('data', chunk => postResData += chunk);
                res3.on('end', () => {
                  expect(res3.statusCode).toBe(201);
                  const postRes = JSON.parse(postResData);
                  expect(postRes).toHaveProperty('id');
                  const ontId = postRes.id;

                  // 4. Test GET /ontology again, should have one entry
                  http.get('http://localhost:3000/ontology', (res4) => {
                    let data4 = '';
                    res4.on('data', chunk => data4 += chunk);
                    res4.on('end', () => {
                      const ontList2 = JSON.parse(data4);
                      expect(ontList2.length).toBe(1);
                      expect(ontList2[0]).toHaveProperty('id', ontId);

                      // 5. Test PUT /ontology
                      const updatedOntology = {
                        id: ontId,
                        name: 'Updated Ontology',
                        version: '1.1',
                        classes: ['Class1', 'Class2'],
                        properties: { prop1: 'value1', prop2: 'value2' }
                      };
                      const putData = JSON.stringify(updatedOntology);
                      const putOptions = {
                        hostname: 'localhost',
                        port: 3000,
                        path: '/ontology',
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'Content-Length': Buffer.byteLength(putData)
                        }
                      };
                      const putReq = http.request(putOptions, (res5) => {
                        let putResData = '';
                        res5.on('data', chunk => putResData += chunk);
                        res5.on('end', () => {
                          expect(res5.statusCode).toBe(200);
                          const putRes = JSON.parse(putResData);
                          expect(putRes).toHaveProperty('id', ontId);

                          // 6. Test DELETE /ontology
                          http.get(`http://localhost:3000/ontology?id=${ontId}`, (res6) => {
                            let delData = '';
                            res6.on('data', chunk => delData += chunk);
                            res6.on('end', () => {
                              const delRes = JSON.parse(delData);
                              expect(res6.statusCode).toBe(200);
                              expect(delRes).toHaveProperty('id', ontId);

                              // 7. Final GET /ontology (should be empty again)
                              http.get('http://localhost:3000/ontology', (res7) => {
                                let data7 = '';
                                res7.on('data', chunk => data7 += chunk);
                                res7.on('end', () => {
                                  const finalList = JSON.parse(data7);
                                  expect(finalList.length).toBe(0);
                                  serverProcess.kill();
                                  done();
                                });
                              });
                            });
                          });
                        });
                      });
                      putReq.write(putData);
                      putReq.end();
                    });
                  });
                });
              });
              postReq.write(postData);
              postReq.end();
            });
          });
        });
      }, 500);
    }, 100);
  }, 10000);
});
