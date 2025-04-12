import { describe, test, expect } from 'vitest';
import { main } from '@src/lib/main.js';
import { readOntology, persistOntology } from '@src/lib/persistence.js';
import { existsSync, unlinkSync, writeFileSync } from 'fs';

// Tests for main module

describe('Main Module Import', () => {
  test('should be non-null', () => {
    expect(main).not.toBeNull();
  });
});

describe('Default Demo Output', () => {
  test('should terminate without error', () => {
    // Reset process.argv to simulate CLI without commands
    process.argv = ['node', 'src/lib/main.js'];
    main([]);
  });
});

// Tests for persistence functions

describe('Persistence Module', () => {
  const tempFilePath = './temp_ontology_test.json';
  const dummyOntology = { test: 'data', value: 123 };

  afterEach(() => {
    if (existsSync(tempFilePath)) {
      unlinkSync(tempFilePath);
    }
  });

  test('persistOntology writes correct JSON to file', () => {
    persistOntology(dummyOntology, tempFilePath);
    expect(existsSync(tempFilePath)).toBe(true);
    const fileContent = require('fs').readFileSync(tempFilePath, { encoding: 'utf-8' });
    const parsed = JSON.parse(fileContent);
    expect(parsed).toEqual(dummyOntology);
  });

  test('readOntology reads and parses JSON from file correctly', () => {
    const content = JSON.stringify(dummyOntology, null, 2);
    writeFileSync(tempFilePath, content, { encoding: 'utf-8' });
    const ontology = readOntology(tempFilePath);
    expect(ontology).toEqual(dummyOntology);
  });

  test('readOntology throws error for non-existent file', () => {
    expect(() => readOntology('non_existent_file.json')).toThrow();
  });

  test('readOntology throws error for invalid JSON content', () => {
    writeFileSync(tempFilePath, "invalid json", { encoding: 'utf-8' });
    expect(() => readOntology(tempFilePath)).toThrow();
  });
});
