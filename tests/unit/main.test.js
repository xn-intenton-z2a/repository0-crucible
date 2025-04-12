import { describe, test, expect } from 'vitest';
import { exportGraphDB } from '../../src/lib/main.js';

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
