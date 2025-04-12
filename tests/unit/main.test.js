import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { exportGraphDB, mergeOntologies, main } from '../../src/lib/main.js';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';


describe('GraphDB Exporter Module', () => {
  test('should export ontology with classes and properties correctly', () => {
    const ontology = {
      name: 'Test Ontology',
      version: '2.0',
      classes: ['Class1', 'Class2'],
      properties: { propA: 'valueA' }
    };
    const result = exportGraphDB(ontology);
    expect(result).toHaveProperty('nodes');
    expect(result).toHaveProperty('edges');

    const ontologyNode = result.nodes.find(node => node.id === 'ontology');
    expect(ontologyNode).toBeDefined();
    expect(ontologyNode.label).toBe('Test Ontology');
    
    const classNodes = result.nodes.filter(node => node.id.startsWith('class_'));
    expect(classNodes.length).toBe(2);

    const propertyNode = result.nodes.find(node => node.id === 'prop_propA');
    expect(propertyNode).toBeDefined();
    expect(propertyNode.value).toBe('valueA');
  });

  test('should handle ontology without classes and properties', () => {
    const ontology = { name: 'Empty Ontology', version: '1.0' };
    const result = exportGraphDB(ontology);
    const ontologyNode = result.nodes.find(node => node.id === 'ontology');
    expect(ontologyNode).toBeDefined();
    
    // No additional nodes or edges should exist
    const otherNodes = result.nodes.filter(node => node.id !== 'ontology');
    expect(otherNodes.length).toBe(0);
    expect(result.edges.length).toBe(0);
  });
});

describe('Ontology Merge Functionality', () => {
  test('mergeOntologies should correctly merge ontologies', () => {
    const ontology1 = {
      name: 'OntologyOne',
      version: '1.0',
      classes: ['Class1', 'Class2'],
      properties: { propA: 'valueA', common: 'fromOne' }
    };
    const ontology2 = {
      name: 'OntologyTwo',
      version: '2.0',
      classes: ['Class2', 'Class3'],
      properties: { propB: 'valueB', common: 'fromTwo' }
    };
    const merged = mergeOntologies(ontology1, ontology2);
    expect(merged.name).toBe('OntologyOne & OntologyTwo');
    // version from ontology1 is chosen if available
    expect(merged.version).toBe('1.0');
    expect(merged.classes.sort()).toEqual(['Class1', 'Class2', 'Class3'].sort());
    expect(merged.properties).toEqual({ propA: 'valueA', propB: 'valueB', common: 'fromTwo' });
  });

  test('CLI merge persist option merges files correctly', () => {
    const tempDir = './tests';
    const file1 = join(tempDir, 'temp_ontology1.json');
    const file2 = join(tempDir, 'temp_ontology2.json');
    const outputFile = join(tempDir, 'temp_merged_ontology.json');

    const ontology1 = {
      name: 'OntologyOne',
      version: '1.0',
      classes: ['ClassA', 'ClassB'],
      properties: { key1: 'value1', common: 'one' }
    };
    const ontology2 = {
      name: 'OntologyTwo',
      version: '2.0',
      classes: ['ClassB', 'ClassC'],
      properties: { key2: 'value2', common: 'two' }
    };

    writeFileSync(file1, JSON.stringify(ontology1, null, 2), { encoding: 'utf-8' });
    writeFileSync(file2, JSON.stringify(ontology2, null, 2), { encoding: 'utf-8' });

    // Capture console output
    let consoleOutput = '';
    const originalConsoleLog = console.log;
    console.log = (msg) => { consoleOutput += msg; };

    // Simulate CLI call
    main(['--merge-persist', file1, file2, outputFile]);

    // Restore console.log
    console.log = originalConsoleLog;

    const mergedContent = JSON.parse(readFileSync(outputFile, { encoding: 'utf-8' }));
    expect(mergedContent.name).toBe('OntologyOne & OntologyTwo');
    expect(mergedContent.classes.sort()).toEqual(['ClassA', 'ClassB', 'ClassC'].sort());
    expect(mergedContent.properties).toEqual({ key1: 'value1', key2: 'value2', common: 'two' });

    // Clean up temporary files
    unlinkSync(file1);
    unlinkSync(file2);
    unlinkSync(outputFile);
  });
});
