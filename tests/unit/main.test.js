/* eslint-disable sonarjs/no-ignored-exceptions, no-unused-vars, prettier/prettier */
import { describe, test, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import * as mainModule from '../../src/lib/main.js';

// Force dummy endpoint responses in tests
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
  getChangeLog,
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
  analyzeOntology,
  optimizeOntology,
  transformOntologyToJSONLD,
  normalizeOntology,
  // Extended functions
  extendOntologyMetadata,
  recordOntologyHistory,
  commitOntologyChange,
  getOntologySummary,
  mergeAndNormalizeOntologies
} = mainModule;

const ontologyPath = path.resolve(process.cwd(), 'ontology.json');
const backupPath = path.resolve(process.cwd(), 'ontology-backup.json');

import https from 'https';

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
    expect(version).toBe('0.0.19');
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

  test('main with --detailed-build returns detailed ontology with stats', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const detailed = await main(['--detailed-build']);
    expect(spy).toHaveBeenCalledWith('Detailed Ontology built:', detailed);
    expect(detailed).toHaveProperty('stats');
    expect(detailed.stats).toHaveProperty('titleLength');
    expect(detailed.stats).toHaveProperty('conceptCount');
    spy.mockRestore();
  });

  test('main with --serve calls serveWebInterface', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--serve']);
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Web server running on port/));
    spy.mockRestore();
  });

  test('main with --diagnostics calls diagnostics', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--diagnostics']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Diagnostics:'));
    spy.mockRestore();
  });

  test('main with --integrate returns integrated ontology', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const integrated = await main(['--integrate']);
    expect(spy).toHaveBeenCalledWith('Ontology integrated:', integrated);
    expect(integrated).toHaveProperty('integrated', true);
    spy.mockRestore();
  });

  test('main with --crawl returns crawled data', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const crawled = await main(['--crawl']);
    expect(spy).toHaveBeenCalledWith('Public data crawled:', crawled);
    expect(crawled).toHaveProperty('source', 'PublicDataSource');
    spy.mockRestore();
  });

  test('main with --export exports the ontology to XML', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const xml = await main(['--export']);
    expect(xml).toContain('<ontology>');
    expect(xml).toContain('<title>Sample Ontology</title>');
    spy.mockRestore();
  });

  test('main with --import imports ontology from XML', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const imported = await main(['--import']);
    expect(imported).toHaveProperty('title');
    spy.mockRestore();
  });

  test('main with --sync synchronizes the ontology', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const synced = await main(['--sync']);
    expect(synced).toHaveProperty('synced', true);
    expect(synced).toHaveProperty('syncedAt');
    spy.mockRestore();
  });

  test('main with --backup creates a backup of the ontology file', async () => {
    const ontology = buildOntology();
    persistOntology(ontology);
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const backupResult = await main(['--backup']);
    expect(backupResult).toHaveProperty('success', true);
    expect(fs.existsSync(backupPath)).toBe(true);
    spy.mockRestore();
  });

  test('main with --update updates the ontology title', async () => {
    const newTitle = 'Custom Updated Title';
    const result = await main(['--update', newTitle]);
    expect(result.title).toBe(newTitle);
  });

  test('main with --clear deletes the ontology file if exists', async () => {
    const ontology = buildOntology();
    persistOntology(ontology);
    expect(fs.existsSync(ontologyPath)).toBe(true);
    const result = await main(['--clear']);
    expect(fs.existsSync(ontologyPath)).toBe(false);
  });

  test('main with --enhance returns enhanced ontology', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const enhanced = await main(['--enhance']);
    expect(spy).toHaveBeenCalledWith('Enhanced ontology:', enhanced);
    expect(enhanced).toHaveProperty('model');
    expect(enhanced.model).toHaveProperty('description');
    expect(enhanced.model).toHaveProperty('version', '1.0');
    spy.mockRestore();
  });

  test('main with --wrap returns wrapped ontology models', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const wrapped = await main(['--wrap']);
    expect(wrapped).toHaveProperty('wrapped', true);
    expect(wrapped).toHaveProperty('basic');
    expect(wrapped).toHaveProperty('enhanced');
    spy.mockRestore();
  });

  test('main with --wrap-extended returns extended wrapped ontology models', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const extendedWrapped = await main(['--wrap-extended']);
    expect(extendedWrapped).toHaveProperty('aggregated', true);
    expect(extendedWrapped).toHaveProperty('modelCount', 6);
    spy.mockRestore();
  });

  test('main with --report returns ontology report', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const report = await main(['--report']);
    expect(report).toHaveProperty('title');
    expect(report).toHaveProperty('summary');
    expect(report).toHaveProperty('analysis');
    spy.mockRestore();
  });

  test('main with --list-endpoints returns extended endpoint list', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const endpoints = await main(['--list-endpoints']);
    expect(Array.isArray(endpoints)).toBe(true);
    expect(endpoints.length).toBe(18);
    spy.mockRestore();
  });

  test('main with --fetch-extended returns data from extended endpoints', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const extendedData = await main(['--fetch-extended']);
    expect(Array.isArray(extendedData)).toBe(true);
    spy.mockRestore();
  });

  test('main with --advanced-analysis returns advanced analysis report', async () => {
    const result = await main(['--advanced-analysis']);
    expect(result).toHaveProperty('advanced', true);
    expect(result).toHaveProperty('additionalMetrics');
    expect(result.additionalMetrics).toHaveProperty('medianConceptLength');
  });

  test('main with --wrap-all returns aggregated ontology with advanced metrics', async () => {
    const result = await main(['--wrap-all']);
    expect(result).toHaveProperty('totalModels', 4);
    expect(result).toHaveProperty('advanced', true);
  });

  test('--cleanup command removes duplicate ontology concepts', async () => {
    const result = await main(['--cleanup']);
    expect(result.concepts.sort()).toEqual(['Concept1', 'Concept2', 'Concept3'].sort());
  });

  test('--auto-commit returns automated commit message', async () => {
    const msg = await main(['--auto-commit']);
    expect(msg).toMatch(/^Automated commit on/);
  });

  test('--combine-models returns combined ontology models', async () => {
    const merged = await main(['--combine-models']);
    expect(merged).toHaveProperty('merged', true);
  });

  test('--refresh-details returns updated ontology description', async () => {
    const result = await main(['--refresh-details']);
    expect(result).toHaveProperty('description', 'Refreshed ontology with additional details.');
  });

  test('--extend-concepts adds new concepts', async () => {
    const result = await main(['--extend-concepts']);
    expect(result.concepts).toContain('ExtendedConcept1');
    expect(result.concepts).toContain('ExtendedConcept2');
  });

  test('--fetch-retry returns data with retry', async () => {
    const result = await main(['--fetch-retry']);
    expect(result).toHaveProperty('data', 'retry data');
  });

  test('--changelog returns change log', async () => {
    const result = await main(['--changelog']);
    expect(result).toBe('Change log content');
  });

  test('--extend-details returns extended ontology details', async () => {
    const result = await main(['--extend-details']);
    expect(result).toHaveProperty('details', 'Extended details');
  });

  test('--wrap-simple returns simple wrapped ontology models', async () => {
    const result = await main(['--wrap-simple']);
    expect(result).toHaveProperty('simpleWrapped', true);
  });

  test('--wrap-comprehensive returns comprehensive wrapped ontology models', async () => {
    const result = await main(['--wrap-comprehensive']);
    expect(result).toHaveProperty('comprehensiveWrapped', true);
  });

  test('--wrap-random returns random wrapped ontology model', async () => {
    const result = await main(['--wrap-random']);
    expect(result).toHaveProperty('randomWrapped', true);
  });

  test('--clean-transform returns cleaned and transformed ontology', async () => {
    const result = await main(['--clean-transform']);
    expect(result).toHaveProperty('cleaned', true);
    expect(result).toHaveProperty('transformed', true);
  });

  test('--fetch-additional returns additional endpoint data', async () => {
    const result = await main(['--fetch-additional']);
    expect(Array.isArray(result)).toBe(true);
    result.forEach(item => {
      expect(item).toHaveProperty('error');
    });
  });

  test('--combine-metrics returns combined ontology metrics', async () => {
    const result = await main(['--combine-metrics']);
    expect(result).toHaveProperty('conceptCount', 3);
  });

  test('--update-tracking returns ontology with tracking info', async () => {
    const result = await main(['--update-tracking']);
    expect(result).toHaveProperty('tracking');
    expect(result.tracking).toHaveProperty('note', 'Tracking updated via CLI');
  });

  test('main with --wrap-advanced returns advanced wrapped ontology models', async () => {
    const result = await main(['--wrap-advanced']);
    expect(result).toHaveProperty('advancedWrapper', true);
    expect(result).toHaveProperty('basic');
    expect(result).toHaveProperty('advanced');
  });

  test('main with --wrap-merged returns merged wrapped ontology models', async () => {
    const result = await main(['--wrap-merged']);
    expect(result).toHaveProperty('mergedWrapper', true);
    expect(result).toHaveProperty('merged');
    expect(result).toHaveProperty('report');
  });

  test('--wrap-json returns json wrapped ontology models', async () => {
    const result = await main(['--wrap-json']);
    expect(result).toHaveProperty('jsonWrapped', true);
    expect(result.models).toEqual(['Basic', 'Enhanced', 'Integrated']);
  });

  test('--wrap-custom returns custom wrapped ontology models with default order', async () => {
    const result = await main(['--wrap-custom']);
    expect(result).toHaveProperty('customWrapped', true);
    expect(result.order).toBe('asc');
  });

  test('--wrap-custom returns custom wrapped ontology models with provided order', async () => {
    const result = await main(['--wrap-custom', 'desc']);
    expect(result).toHaveProperty('customWrapped', true);
    expect(result.order).toBe('desc');
  });

  test('main with --analyze returns analysis result', async () => {
    const result = await main(['--analyze']);
    expect(result).toHaveProperty('analysis');
    expect(result).toHaveProperty('timestamp');
  });

  test('main with --optimize returns optimized ontology', async () => {
    const result = await main(['--optimize']);
    expect(result).toHaveProperty('optimized', true);
  });

  test('main with --transform returns JSON-LD transformed ontology', async () => {
    const result = await main(['--transform']);
    expect(result).toHaveProperty('@context', 'http://schema.org');
    expect(result).toHaveProperty('title', 'Sample Ontology');
  });

  test('main with --normalize returns normalized ontology', async () => {
    const result = await main(['--normalize']);
    expect(result.concepts.sort()).toEqual(['Concept1','Concept2','Concept3'].sort());
  });
});

// Additional tests for extended functions

describe('Additional Extended Functions', () => {
  test('extendOntologyMetadata attaches new metadata to ontology', () => {
    const ontology = buildOntology();
    const metadata = { author: 'Test Author' };
    const extended = extendOntologyMetadata(ontology, metadata);
    expect(extended).toHaveProperty('author', 'Test Author');
  });

  test('recordOntologyHistory returns history record with note', () => {
    const note = 'History entry';
    const record = recordOntologyHistory(note);
    expect(record).toHaveProperty('note', note);
    expect(record).toHaveProperty('timestamp');
  });

  test('commitOntologyChange returns formatted commit message', () => {
    const note = 'Test Commit';
    const msg = commitOntologyChange(note);
    expect(msg).toContain(note);
    expect(msg).toContain('Commit:');
  });

  test('getOntologySummary returns summary of ontology', () => {
    const ontology = buildOntology();
    const summary = getOntologySummary(ontology);
    expect(summary.title).toBe(ontology.title);
    expect(summary.conceptCount).toBe(ontology.concepts.length);
    expect(summary.summary).toContain(ontology.title);
  });

  test('mergeAndNormalizeOntologies merges multiple ontologies and normalizes the result', () => {
    const ont1 = { title: 'Ont1', concepts: ['A', 'B'] };
    const ont2 = { title: 'Ont2', concepts: ['B', 'C'] };
    const merged = mergeAndNormalizeOntologies(ont1, ont2);
    expect(merged).toHaveProperty('merged', true);
    expect(merged.concepts.sort()).toEqual(['A', 'B', 'C'].sort());
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
