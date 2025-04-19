# OPENAI_API

## Crawl Summary
The crawled content from https://platform.openai.com/docs/api-reference indicated an absence of raw data (Data Size: 0 bytes), therefore this document reconstructs the key API endpoint /v1/completions, including its HTTP method, required and optional parameters, configuration header requirements, and provides full code examples in both cURL and Node.js. It includes explicit parameter details such as model, prompt, max_tokens, temperature, and other optional tuning parameters.

## Normalised Extract
## Table of Contents
1. API Endpoints
   - /v1/completions: POST method with parameters {model (string), prompt (string), suffix (string, optional), max_tokens (int), temperature (float, default 1.0), top_p (float, default 1.0), n (int, default 1), stream (bool, default false), stop (string/array), presence_penalty (float, default 0.0), frequency_penalty (float, default 0.0), logit_bias (object, optional), user (string, optional)}.
2. Code Examples
   - cURL command demonstrating endpoint usage with proper headers.
   - Node.js SDK example using openai.createCompletion with full error handling.
3. Configuration Options
   - Detailed header and authentication configuration.
4. Troubleshooting Procedures
   - Commands and steps to check network connectivity, validate API key, and handle HTTP error codes.

## Detailed Technical Information
- **Endpoint Details:**
  - URL: https://api.openai.com/v1/completions
  - Method: POST
  - Required Payload Keys: model, prompt, max_tokens
  - Optional Payload Keys: suffix, temperature, top_p, n, stream, stop, presence_penalty, frequency_penalty, logit_bias, user
- **cURL Example:**
  See above for the exact command including headers and JSON payload.
- **Node.js SDK Example:**
  Provided is a complete snippet demonstrating configuration, method signature `openai.createCompletion({ ... })`, and error handling.
- **Header Configuration:**
  - Content-Type must be set to application/json
  - Authorization must include the correct Bearer token
- **Troubleshooting:**
  - Use verbose output with curl (`curl -v ...`) for connectivity issues and check for specific HTTP status codes to debug errors.

## Supplementary Details
### Supplementary Technical Specifications
- **/v1/completions Parameters Detailed List:**
  - `model`: string. Example: "text-davinci-003".
  - `prompt`: string. Input text prompt for completion.
  - `suffix`: string (optional).
  - `max_tokens`: integer. Controls the maximum number of tokens to generate.
  - `temperature`: float (default: 1.0). Controls randomness in the output.
  - `top_p`: float (default: 1.0).
  - `n`: integer (default: 1). Specifies number of completions to generate.
  - `stream`: boolean (default: false). If true, streams back partial progress.
  - `stop`: string or array of strings (optional). Up to 4 sequences where the API will stop generating further tokens.
  - `presence_penalty`: float (default: 0.0).
  - `frequency_penalty`: float (default: 0.0).
  - `logit_bias`: object (optional). A mapping from token IDs to bias values.
  - `user`: string (optional). Unique identifier for the end-user.

- **Implementation Steps:**
  1. Set up the request headers with `Content-Type: application/json` and authorization using your API key.
  2. Construct the JSON payload with required and any optional parameters.
  3. Send a POST request to the endpoint.
  4. Handle the JSON response appropriately, checking HTTP status codes for errors.
  5. Log and debug using provided troubleshooting commands if errors appear.

- **Best Practices:**
  - Always check for and gracefully handle API errors.
  - Limit token usage to control costs.
  - Use streaming for long completion requests if progressive results are needed.
  - Securely manage and store your API key.

## Reference Details
### Complete API Specifications and SDK Method Signatures

#### POST /v1/completions
**Endpoint:** https://api.openai.com/v1/completions

**Request Method:** POST

**Request Headers:**
- Content-Type: application/json
- Authorization: Bearer YOUR_API_KEY

**Request Body Parameters:**
```json
{
  "model": "text-davinci-003",           // string, required
  "prompt": "Say this is a test",         // string, required
  "suffix": "optional string",
  "max_tokens": 7,                         // integer, required
  "temperature": 0,                        // float, optional
  "top_p": 1.0,                            // float, optional
  "n": 1,                                  // integer, optional
  "stream": false,                         // boolean, optional
  "stop": "\n",                         // string or array, optional
  "presence_penalty": 0.0,                 // float, optional
  "frequency_penalty": 0.0,                // float, optional
  "logit_bias": {                          // object, optional
    "token_id": -100
  },
  "user": "user-identifier"             // string, optional
}
```

**Response:**
The API returns a JSON object. Example response:
```json
{
  "id": "cmpl-12345",
  "object": "text_completion",
  "created": 1610078136,
  "model": "text-davinci-003",
  "choices": [
    {
      "text": "This is a test.",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}
```

#### Node.js SDK Method Signature
Using the OpenAI Node.js SDK:

```javascript
/**
 * Creates a completion using the OpenAI API.
 * @param {Object} params - The parameters for creating a completion.
 * @param {string} params.model - The model to use, e.g. 'text-davinci-003'.
 * @param {string} params.prompt - The prompt string.
 * @param {number} params.max_tokens - Maximum tokens to generate.
 * @param {number} [params.temperature] - Sampling temperature.
 * @param {number} [params.top_p] - Top-p sampling parameter.
 * @param {number} [params.n] - Number of completions to generate.
 * @param {boolean} [params.stream] - Whether to stream the response.
 * @param {string|string[]} [params.stop] - Stopping sequence(s).
 * @param {number} [params.presence_penalty] - Presence penalty value.
 * @param {number} [params.frequency_penalty] - Frequency penalty value.
 * @param {Object} [params.logit_bias] - Token bias map.
 * @param {string} [params.user] - End-user identifier.
 * @returns {Promise<Object>} - The completion response object.
 */
async function createCompletion(params) {
  // Implementation using OpenAIApi from openai
}
```

#### Troubleshooting Commands
- **cURL Verbose Mode:**
  ```bash
  curl -v https://api.openai.com/v1/completions -H "Authorization: Bearer YOUR_API_KEY"
  ```
- **Node.js Logging:**
  Insert console logs to capture error responses:
  ```javascript
  try {
    const response = await openai.createCompletion({ /* parameters */ });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
  ```

These detailed specifications, method signatures, and code examples provide developers with the exact information needed to implement, configure, and troubleshoot interactions with the OpenAI API.

## Original Source
OpenAI API Documentation
https://platform.openai.com/docs/api-reference

## Digest of OPENAI_API

# OpenAI API Documentation

**Date Retrieved:** 2023-10-05

## 1. API Endpoints

### /v1/completions
- **Method:** POST
- **URL:** https://api.openai.com/v1/completions
- **Parameters:**
  - `model` (string, required)
  - `prompt` (string, required)
  - `suffix` (string, optional)
  - `max_tokens` (integer, required)
  - `temperature` (float, optional, default: 1.0)
  - `top_p` (float, optional, default: 1.0)
  - `n` (integer, optional, default: 1)
  - `stream` (boolean, optional, default: false)
  - `stop` (string or array, optional)
  - `presence_penalty` (float, optional, default: 0.0)
  - `frequency_penalty` (float, optional, default: 0.0)
  - `logit_bias` (object, optional)
  - `user` (string, optional)

## 2. Code Example

**cURL Example:**

```bash
curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "text-davinci-003",
    "prompt": "Say this is a test",
    "max_tokens": 7,
    "temperature": 0
  }'
```

**Node.js SDK Example:**

```javascript
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getCompletion() {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

getCompletion();
```

## 3. Configuration Options

- **Headers:**
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer YOUR_API_KEY`

## 4. Troubleshooting Procedures

- **Network Issues:**
  - Use `curl -v` to debug HTTP connection issues.
- **Authentication Errors:**
  - Verify that the correct API key is supplied and active.
- **HTTP Status Handling:**
  - Check for status codes (e.g., 400, 401, 429) and implement retry mechanisms if necessary.

*Attribution: Data derived via crawling of https://platform.openai.com/docs/api-reference (Data Size: 0 bytes, Links Found: 0).*

## Attribution
- Source: OpenAI API Documentation
- URL: https://platform.openai.com/docs/api-reference
- License: Apache-2.0
- Crawl Date: 2025-04-19T04:22:27.354Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-19
