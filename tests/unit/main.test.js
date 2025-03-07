import { describe, test, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import http from 'http';
import * as mainModule from '../../src/lib/main.js';

const {
  main,
  buildOntology,
  persistOntology,
  loadOntology,
  queryOntology,
  validateOntology,
  exportOntologyToXML,
  importOntologyFromXML,
  backupOntology,
  updateOntology,
  clearOntology,
  listAvailableEndpoints,
  fetchDataWithRetry,
  crawlOntologies,
  displayHelp,
  getVersion,
  listCommands,
  buildBasicOWLModel,
  buildAdvancedOWLModel,
  wrapOntologyModel,
  buildCustomOntology,
  extendOntologyConcepts
} = mainModule;

const ontologyPath = path.resolve(process.cwd(), 'ontology.json');
const backupPath = path.resolve(process.cwd(), 'ontology-backup.json');

// Helper to simulate network failure for fetchDataWithRetry
function simulateNetworkFailure(mod) {
  return function(url, callback) {
    const error = new Error('Network error');
    const req = {
      on: (event, handler) => {
        if (event === 'error') {
          handler(error);
        }
        return req;
      }
    };
    process.nextTick(() => {
      req.on('error', () => {});
    });
    return req;
  };
}

describe('Core Ontology Functions', () => {
  test('buildOntology returns public data ontology', () => {
    const ont = buildOntology();
    expect(ont).toHaveProperty('title', 'Public Data Ontology');
    expect(Array.isArray(ont.concepts)).toBe(true);
  });

  test('persistOntology writes file successfully', () => {
    const ontology = { title: 'Test Ontology', concepts: ['A'] };
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const result = persistOntology(ontology);
    expect(writeSpy).toHaveBeenCalledWith(ontologyPath, JSON.stringify(ontology, null, 2));
    expect(result).toEqual({ success: true });
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

  test('queryOntology returns matching concepts', () => {
    const ontology = { title: 'Public Data Ontology', concepts: ['Concept1', 'Concept2', 'ExtraConcept'] };
    const readSpy = vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(ontology, null, 2));
    const results = queryOntology('Extra');
    expect(results.results).toEqual(['ExtraConcept']);
    readSpy.mockRestore();
  });

  test('exportOntologyToXML returns valid XML string', () => {
    const ontology = { title: 'XML Ontology', concepts: [] };
    const xml = exportOntologyToXML(ontology);
    expect(xml).toContain('<ontology>');
    expect(xml).toContain('XML Ontology');
  });

  test('importOntologyFromXML parses XML correctly', () => {
    const sampleXML = `<ontology><title>Imported Ontology</title></ontology>`;
    const imported = importOntologyFromXML(sampleXML);
    expect(imported).toHaveProperty('title', 'Imported Ontology');
  });

  test('backupOntology writes backup file successfully', () => {
    const ontology = { title: 'Backup Test', concepts: ['B'] };
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(ontology, null, 2));
    const result = backupOntology();
    expect(writeSpy).toHaveBeenCalledWith(backupPath, JSON.stringify(ontology, null, 2));
    expect(result).toHaveProperty('success', true);
    writeSpy.mockRestore();
  });

  test('updateOntology returns updated ontology', () => {
    const newTitle = 'Updated Title';
    const updated = updateOntology(newTitle);
    expect(updated.title).toBe(newTitle);
  });

  test('clearOntology removes ontology file if exists', () => {
    const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    const unlinkSpy = vi.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
    const result = clearOntology();
    expect(unlinkSpy).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
    existsSpy.mockRestore();
    unlinkSpy.mockRestore();
  });

  test('clearOntology returns error when file does not exist', () => {
    const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = clearOntology();
    expect(result).toEqual({ success: false, error: 'Ontology file does not exist' });
    existsSpy.mockRestore();
  });
});

describe('Crawling Functionality', () => {
  test('crawlOntologies returns array of results with real data', async () => {
    const results = await crawlOntologies();
    expect(Array.isArray(results)).toBe(true);
    results.forEach(item => {
      expect(item).toHaveProperty('endpoint');
      if (!item.error) {
        expect(typeof item.data).toBe('string');
        expect(item.data.length).toBeGreaterThan(0);
        expect(item).toHaveProperty('owlContent', '<ontology><title>Public Data Ontology</title></ontology>');
      }
    });
  });

  test('fetchDataWithRetry rejects for invalid URL', async () => {
    const originalGet = http.get;
    http.get = simulateNetworkFailure(http);
    await expect(fetchDataWithRetry('http://invalid.url', 2)).rejects.toBeDefined();
    http.get = originalGet;
  });
});

describe('CLI and Main Function Tests', () => {
  test('main without args prints default message', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main([]);
    expect(spy).toHaveBeenCalledWith('Run with: []');
    spy.mockRestore();
  });

  test('main with --help prints help details', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--help']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Usage: node src/lib/main.js [options]'));
    spy.mockRestore();
  });

  test('main with --version returns version string', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const version = await main(['--version']);
    expect(spy).toHaveBeenCalledWith('Tool version:', version);
    expect(version).toBe(getVersion());
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
    expect(ontology).toHaveProperty('title', 'Public Data Ontology');
    spy.mockRestore();
  });

  test('main with --crawl returns crawl results', async () => {
    const result = await main(['--crawl']);
    expect(Array.isArray(result)).toBe(true);
  });

  test('main with --diagnostics returns remote crawl results', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const results = await main(['--diagnostics']);
    expect(Array.isArray(results)).toBe(true);
    results.forEach(item => {
      expect(item).toHaveProperty('endpoint');
    });
    spy.mockRestore();
  });

  test('main with --serve starts web server', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = await main(['--serve']);
    expect(result).toBe('Web server started');
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Web server started at http:\/\/localhost:\d+/));
    spy.mockRestore();
  });
});

describe('Ontology Model Wrappers', () => {
  test('buildBasicOWLModel returns a basic model', () => {
    const model = buildBasicOWLModel();
    expect(model).toHaveProperty('id', 'basic');
    expect(model).toHaveProperty('title', 'Basic OWL Ontology');
  });

  test('buildAdvancedOWLModel returns an advanced model', () => {
    const model = buildAdvancedOWLModel();
    expect(model).toHaveProperty('id', 'advanced');
    expect(model).toHaveProperty('classes');
    expect(Array.isArray(model.properties)).toBe(true);
  });

  test('wrapOntologyModel adds a timestamp and default title if missing', () => {
    const model = { someProp: 'value' };
    const wrapped = wrapOntologyModel(model);
    expect(wrapped).toHaveProperty('timestamp');
    expect(wrapped.title).toBe('Default Title');
  });
});

describe('Custom Ontology Functions', () => {
  test('buildCustomOntology returns a customized ontology', () => {
    const custom = { concepts: ['CustomConcept'] };
    const ont = buildCustomOntology(custom);
    expect(ont.customized).toBe(true);
    expect(ont.concepts).toContain('CustomConcept');
  });

  test('extendOntologyConcepts adds new concepts', () => {
    const base = { title: 'Public Data Ontology', concepts: ['Concept1'] };
    const extended = extendOntologyConcepts(base, ['NewConcept']);
    expect(extended.concepts).toContain('NewConcept');
  });
});
