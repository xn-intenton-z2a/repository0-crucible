// Entry point index exporting default undefined for module-index tests
export default undefined;

// Expose the generic SPARQL query API and programmatic functions
export { queryOntologies, listSources, refreshSources, buildIntermediate, buildEnhanced, main } from "./main.js";
