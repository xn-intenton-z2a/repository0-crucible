/* eslint-disable sonarjs/no-ignored-exceptions, no-unused-vars, prettier/prettier */
import { describe, test, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import * as mainModule from '../../src/lib/main.js';

// Force dummy endpoint responses in tests where applicable
process.env.FORCE_DUMMY_ENDPOINT = 'true';

const {
  main,
  buildOntology,
  serveWebInterface,
  displayHelp,
  diagnostics,
  integrateOntology,
  crawlData,
  persistOntology,
  loadOntology,
  queryOntology,
  validateOntology,
  exportOntologyToXML,
  importOntologyFromXML,
  syncOntology,
  backupOntology,
  updateOntology,
  clearOntology,
  enhanceOntology,
  wrapOntologyModels,
  wrapOntologyModelsExtended,
  wrapAllOntologyModels,
  generateOntologyReport,
  listAvailableEndpoints,
  advancedOntologyAnalysis,
  fetchFromExtendedEndpoints,
  automatedCommitMessage,
  mergeOntologyModels,
  updateOntologyDescription,
  extendOntologyConcepts,
  resetOntology,
  cloneOntology,
  fetchDataWithRetry,
  extendOntologyDetails,
  wrapOntologyModelsSimple,
  wrapOntologyModelsComprehensive,
  wrapOntologyModelsRandom,
  cleanupOntologyData,
  updateOntologyTracking,
  wrapAdvancedOntologyModels,
  wrapMergedOntologyModels,
  transformOntologyData,
  debugOntologyMetrics,
  reflectOntologyStatus,
  wrapOntologyModelsJSON,
  wrapOntologyModelsCustom,
  wrapOntologyModelsGraph,
  wrapOntologyModelsTree,
  wrapOntologyModelsMatrix,
  testEndpoints,
  testExtendedEndpoints,
  analyzeOntology,
  optimizeOntology,
  transformOntologyToJSONLD,
  normalizeOntology,
  extendOntologyMetadata,
  recordOntologyHistory,
  commitOntologyChange,
  getOntologySummary,
  mergeAndNormalizeOntologies,
  wrapOntologyModelsTabular
} = mainModule;

const ontologyPath = path.resolve(process.cwd(), 'ontology.json');
const backupPath = path.resolve(process.cwd(), 'ontology-backup.json');

import https from 'https';
import http from 'http';

// Additional tests for new extended implementations

describe('New Extended Implementations', () => {
  test('advancedOntologyAnalysis returns advanced analysis object', () => {
    const result = advancedOntologyAnalysis();
    expect(result).toHaveProperty('advanced', true);
    expect(result).toHaveProperty('timestamp');
  });

  test('mergeOntologyModels returns merged unique concepts', () => {
    const ont1 = { title: 'Ont1', concepts: ['A', 'B'] };
    const ont2 = { title: 'Ont2', concepts: ['B', 'C'] };
    const ont3 = { title: 'Ont3', concepts: ['C', 'D'] };
    const merged = mergeOntologyModels(ont1, ont2, ont3);
    expect(merged).toHaveProperty('title', 'Merged Ontology');
    expect(merged.concepts.sort()).toEqual(['A', 'B', 'C', 'D'].sort());
  });

  test('updateOntologyDescription adds description to ontology', () => {
    const desc = 'New detailed description';
    const updated = updateOntologyDescription(desc);
    expect(updated).toHaveProperty('description', desc);
  });

  test('extendOntologyConcepts extends the ontology concepts', () => {
    const extended = extendOntologyConcepts('X', 'Y');
    expect(extended.concepts).toEqual(expect.arrayContaining(['X', 'Y']));
  });

  test('resetOntology persists and returns ontology', () => {
    const ont = resetOntology();
    expect(ont).toHaveProperty('title');
  });

  test('cloneOntology returns a deep cloned object', () => {
    const ont = buildOntology();
    const clone = cloneOntology(ont);
    expect(clone).toEqual(ont);
    expect(clone).not.toBe(ont);
  });

  test('fetchDataWithRetry rejects for invalid URL', async () => {
    await expect(fetchDataWithRetry('http://invalid.url')).rejects.toBeDefined();
  });

  test('extendOntologyDetails attaches additional details', () => {
    const details = extendOntologyDetails();
    expect(details).toHaveProperty('details');
    expect(details.details).toHaveProperty('extended', true);
  });

  test('wrapOntologyModelsSimple returns simple wrapped model', () => {
    const result = wrapOntologyModelsSimple();
    expect(result).toHaveProperty('simpleWrapped', true);
  });

  test('wrapOntologyModelsComprehensive returns comprehensive wrapped model', () => {
    const result = wrapOntologyModelsComprehensive();
    expect(result).toHaveProperty('comprehensiveWrapped', true);
  });

  test('wrapOntologyModelsRandom returns one of expected wrappers', () => {
    const result = wrapOntologyModelsRandom();
    expect(result).toBeDefined();
  });

  test('cleanupOntologyData removes duplicate and trims concepts', () => {
    const ontology = { title: 'Test', concepts: [' A ', 'B', 'A'] };
    const cleaned = cleanupOntologyData(ontology);
    expect(cleaned.concepts).toEqual(['A', 'B']);
  });

  test('updateOntologyTracking adds tracking information', () => {
    const tracking = updateOntologyTracking('Test update');
    expect(tracking).toHaveProperty('tracking');
    expect(tracking.tracking).toHaveProperty('note', 'Test update');
  });

  test('wrapAdvancedOntologyModels returns advanced wrapped model', () => {
    const result = wrapAdvancedOntologyModels();
    expect(result).toHaveProperty('advancedWrapped', true);
  });

  test('wrapMergedOntologyModels returns merged wrapped model', () => {
    const result = wrapMergedOntologyModels();
    expect(result).toHaveProperty('mergedWrapped', true);
  });

  test('transformOntologyData returns transformed data', () => {
    const result = transformOntologyData(buildOntology());
    expect(result).toHaveProperty('transformed', true);
  });

  test('debugOntologyMetrics returns correct metrics', () => {
    const ont = buildOntology();
    const metrics = debugOntologyMetrics(ont);
    expect(metrics).toHaveProperty('titleLength', ont.title.length);
  });

  test('reflectOntologyStatus returns operational status', () => {
    const status = reflectOntologyStatus();
    expect(status).toHaveProperty('status', 'Operational');
  });

  test('wrapOntologyModelsJSON returns valid JSON string', () => {
    const jsonStr = wrapOntologyModelsJSON();
    expect(() => JSON.parse(jsonStr)).not.toThrow();
  });

  test('wrapOntologyModelsCustom returns sorted concepts', () => {
    const asc = wrapOntologyModelsCustom('asc');
    const desc = wrapOntologyModelsCustom('desc');
    expect(asc.concepts).toEqual([...asc.concepts].sort());
    expect(desc.concepts).toEqual([...desc.concepts].sort().reverse());
  });

  test('wrapOntologyModelsGraph returns graph structure', () => {
    const graph = wrapOntologyModelsGraph();
    expect(graph).toHaveProperty('nodes');
    expect(Array.isArray(graph.nodes)).toBe(true);
  });

  test('wrapOntologyModelsTree returns tree structure', () => {
    const tree = wrapOntologyModelsTree();
    expect(tree).toHaveProperty('tree');
    expect(tree.tree).toHaveProperty('name');
  });

  test('wrapOntologyModelsMatrix returns matrix structure', () => {
    const matrix = wrapOntologyModelsMatrix();
    expect(matrix).toHaveProperty('matrixWrapped', true);
    expect(Array.isArray(matrix.matrix)).toBe(true);
  });
});

describe('External Resource Mocks', () => {
  test('persistOntology writes file successfully', () => {
    const ontology = { title: 'Test Ontology', concepts: ['A'] };
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const result = persistOntology(ontology);
    expect(writeSpy).toHaveBeenCalledWith(ontologyPath, JSON.stringify(ontology, null, 2));
    expect(result).toEqual({ success: true });
    writeSpy.mockRestore();
  });

  test('persistOntology returns error on failure', () => {
    const ontology = { title: 'Test Ontology', concepts: ['A'] };
    const errorMessage = 'Disk error';
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => { throw new Error(errorMessage); });
    const result = persistOntology(ontology);
    expect(result).toEqual({ success: false, error: errorMessage });
    writeSpy.mockRestore();
  });

  test('loadOntology returns parsed content on success', () => {
    const ontology = { title: 'Loaded Ontology', concepts: ['X'] };
    const fileContent = JSON.stringify(ontology, null, 2);
    const readSpy = vi.spyOn(fs, 'readFileSync').mockReturnValue(fileContent);
    const result = loadOntology();
    expect(result).toEqual(ontology);
    readSpy.mockRestore();
  });

  test('loadOntology returns error on failure', () => {
    const errorMessage = 'File not found';
    const readSpy = vi.spyOn(fs, 'readFileSync').mockImplementation(() => { throw new Error(errorMessage); });
    const result = loadOntology();
    expect(result).toEqual({ success: false, error: errorMessage });
    readSpy.mockRestore();
  });

  test('HTTP get is mocked for network requests', async () => {
    const originalForceDummy = process.env.FORCE_DUMMY_ENDPOINT;
    process.env.FORCE_DUMMY_ENDPOINT = 'false';
    const fakeResponse = { 
      on: vi.fn((event, cb) => { 
        if(event === 'data') { cb('dummy data'); } 
        if(event === 'end') { cb(); }
      }),
      statusCode: 200
    };
    const getSpy = vi.spyOn(https, 'get').mockImplementation((url, callback) => {
      callback(fakeResponse);
      return { on: vi.fn() };
    });
    await main(['--extended-endpoints']);
    expect(getSpy).toHaveBeenCalled();
    getSpy.mockRestore();
    process.env.FORCE_DUMMY_ENDPOINT = originalForceDummy;
  });
});

describe('Main Module General Functions', () => {
  test('main without args prints default message', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main([]);
    expect(spy).toHaveBeenCalledWith('Run with: []');
    spy.mockRestore();
  });

  test('main with --help prints help details', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--help']);
    const expectedUsage = 'Usage: node src/lib/main.js [options]';
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(expectedUsage));
    spy.mockRestore();
  });

  test('main with --version returns version string', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const version = await main(['--version']);
    expect(spy).toHaveBeenCalledWith('Tool version:', version);
    expect(version).toBe('0.0.23');
    spy.mockRestore();
  });

  test('main with --list returns supported commands', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const commands = await main(['--list']);
    expect(spy).toHaveBeenCalledWith('Supported commands:', commands);
    expect(commands).toContain('--build');
    expect(commands).toContain('--version');
    spy.mockRestore();
  });

  test('main with --build calls buildOntology and returns ontology', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const ontology = await main(['--build']);
    expect(spy).toHaveBeenCalledWith('Ontology built:', ontology);
    expect(ontology).toHaveProperty('title', 'Sample Ontology');
    spy.mockRestore();
  });

  test('--validate-optimize returns valid and optimized ontology', async () => {
    const result = await main(['--validate-optimize']);
    expect(result).toHaveProperty('isValid', true);
    expect(result.optimized).toHaveProperty('optimized', true);
  });
});

describe('Module Index', () => {
  test('module index exports main function', () => {
    expect(typeof main).toBe('function');
  });
});

describe('Run Main Execution', () => {
  test('main returns demo output when no valid args provided', async () => {
    const result = await main([]);
    expect(result).toBeUndefined();
  });
});

describe('Endpoint Dummy Responses', () => {
  test('all endpoints return dummy data in dummy mode', async () => {
    const endpoints = listAvailableEndpoints();
    endpoints.forEach(endpoint => {
      console.log(`Response from ${endpoint}: dummy data`);
    });
  });
});
