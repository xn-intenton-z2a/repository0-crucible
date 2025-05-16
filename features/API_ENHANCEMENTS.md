# Overview

Extend the existing HTTP API to support CSV response format for the /pi and /pi/data endpoints while preserving JSON as the default response. This enhancement enables users to request results and convergence data in a text-based CSV format for integration with spreadsheet tools and data pipelines.

# Implementation

1. Query Parameter
   • In the ApiParamsSchema, introduce an optional `format` parameter with allowed values `json` and `csv`. Default to `json`.

2. CSV Response for /pi Endpoint
   • After computing π value (and diagnostics when requested), inspect the `format` parameter.  
   • If `format` is `csv`, set response header `Content-Type` to `text/csv`.  
   • Build a CSV string with a header row containing: algorithm,digits,samples,level,maxIterations,errorTolerance,result,durationMs  
   • Append a single data row with corresponding values.  
   • Send the CSV string as the response body.

3. CSV Response for /pi/data Endpoint
   • In the `/pi/data` handler, inspect `format`.  
   • If `format` is `csv`, set `Content-Type` to `text/csv`.  
   • Output a header row: index,approximation,error  
   • For each data point, append a new line with comma-separated values.  
   • Return the complete CSV text.

4. JSON Fallback
   • If `format` is `json` or any other case, retain existing JSON response behavior for both endpoints.

# Testing

1. Add tests in `tests/unit/server.test.js`:
   • GET `/pi?format=csv` should return status 200, header `Content-Type: text/csv`, and a CSV body with the correct header and a single data row matching the default digits and algorithm values.
   • GET `/pi/data?format=csv&digits=2&algorithm=leibniz` should return status 200, header `Content-Type: text/csv`, and CSV rows beginning with `index,approximation,error` followed by multiple data lines.
   • Invalid `format` value (e.g., `format=xml`) should return 400 with JSON body `{ errors: [...] }`.

# Documentation

1. `docs/USAGE.md`:
   • Under **REST Endpoints**, update **GET /pi** and **GET /pi/data** sections to document the `format` query parameter and provide examples:
     ```bash
     curl "http://localhost:3000/pi?format=csv"
     curl "http://localhost:3000/pi/data?format=csv&digits=2&algorithm=leibniz"
     ```

2. `README.md`:
   • In the **Features** list under **API Enhancements**, note CSV response support for the `/pi` and `/pi/data` endpoints and show a curl example.