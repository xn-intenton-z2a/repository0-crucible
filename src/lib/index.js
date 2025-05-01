// src/lib/index.js

export default undefined;

/**
 * Generate a JSON-LD OWL ontology document from input data.
 * @param {object} data - keys are term names, values are term properties
 * @param {object} options - { ontologyIri: string, baseIri?: string }
 * @returns {Promise<object>} JSON-LD document
 */
export async function generateOntology(data, options) {
  const { ontologyIri, baseIri } = options || {};
  if (!ontologyIri) {
    throw new Error("Missing ontologyIri option");
  }
  const context = {
    owl: "http://www.w3.org/2002/07/owl#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  };
  if (baseIri) {
    context["@base"] = baseIri;
  }
  const graph = [];
  for (const term in data) {
    const node = {
      "@id": `${ontologyIri}#${term}`,
      ...data[term],
    };
    graph.push(node);
  }
  return {
    "@context": context,
    "@id": ontologyIri,
    "@graph": graph,
  };
}
