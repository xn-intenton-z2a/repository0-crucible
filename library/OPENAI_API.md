# OPENAI_API

## Crawl Summary
Crawled from https://platform.openai.com/docs/api-reference: Data Size: 0 bytes, no links found. Technical focus on API endpoints including chat completions and text completions with explicit JSON request/response structures.

## Normalised Extract
## Table of Contents
1. Authentication
2. Endpoints
   - Chat Completions
   - Completions
3. Error Handling
4. Code Examples

### 1. Authentication
- Use header: Authorization: Bearer YOUR_API_KEY
- Store key in environment variable OPENAI_API_KEY.

### 2. Endpoints

#### Chat Completions
- **Request:** POST /v1/chat/completions
- **Parameters:**
  - model (string) e.g. 'gpt-3.5-turbo'
  - messages (array of objects with 'role' and 'content')
  - temperature (number, default 0.7)
  - top_p (number, default 1)
  - n (integer, default 1)
  - stream (boolean, default false)
  - stop (string or null)

- **Response:** JSON with id, object, created timestamp, choices array containing message and finish_reason, and usage object detailing token counts.

#### Completions
- **Request:** POST /v1/completions
- **Parameters:**
  - model (string) e.g. 'text-davinci-003'
  - prompt (string)
  - max_tokens (integer)
  - temperature (number)
  - top_p (number)

- **Response:** JSON with id, object, created timestamp, choices array with text completions and finish reason, and token usage details.

### 3. Error Handling
- **HTTP Status Codes:**
  - 401 Unauthorized
  - 429 Too Many Requests
  - 500 Internal Server Error

### 4. Code Examples
- **Python Example:** Demonstrates setting API key, sending a chat completion request, and printing response.


## Supplementary Details
#### Detailed Specifications:

1. Authentication:
   - Header: 'Authorization: Bearer YOUR_API_KEY'
   - API key should be securely stored. Use variable OPENAI_API_KEY.

2. Chat Completions Endpoint:
   - URL: https://api.openai.com/v1/chat/completions
   - HTTP Method: POST
   - JSON Body Structure:
     • model: string, required. Example: 'gpt-3.5-turbo'.
     • messages: array of objects; each object requires:
         - role: string (e.g. 'system', 'user', 'assistant')
         - content: string
     • temperature: float, optional, default 0.7.
     • top_p: float, optional, default 1.
     • n: integer, number of completions to generate, default 1.
     • stream: boolean, whether to stream partial results, default false.
     • stop: string or array of strings, to indicate stopping sequences.

3. Completions Endpoint:
   - URL: https://api.openai.com/v1/completions
   - HTTP Method: POST
   - JSON Body Structure:
     • model: string, required. Example: 'text-davinci-003'.
     • prompt: string, required.
     • max_tokens: integer, required.
     • temperature: float, optional.
     • top_p: float, optional.

4. Code Example Details (Python):
   - Uses openai SDK. Method call: openai.ChatCompletion.create(...) with parameters as above.
   - Expected response includes keys: id, object, created, choices, usage.
   - Sample error codes integrated with HTTP response statuses.


## Reference Details
#### API Specifications:

1. Chat Completions API
- **Endpoint:** POST https://api.openai.com/v1/chat/completions
- **Headers:**
  • Content-Type: application/json
  • Authorization: Bearer YOUR_API_KEY
- **Method Signature (Python SDK):**
  openai.ChatCompletion.create(
    model: str, 
    messages: List[Dict[str, str]], 
    temperature: Optional[float] = 0.7, 
    top_p: Optional[float] = 1, 
    n: Optional[int] = 1, 
    stream: Optional[bool] = False, 
    stop: Optional[Union[str, List[str]]] = None
  ) -> Dict
- **Request Example:**
  {
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "system", "content": "You are ChatGPT."},
      {"role": "user", "content": "Tell me a joke."}
    ],
    "temperature": 0.7,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "stop": null
  }
- **Response Example:**
  {
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677858242,
    "choices": [
      {
        "index": 0,
        "message": {"role": "assistant", "content": "Hello, how can I help you today?"},
        "finish_reason": "stop"
      }
    ],
    "usage": {
      "prompt_tokens": 10,
      "completion_tokens": 30,
      "total_tokens": 40
    }
  }

2. Completions API
- **Endpoint:** POST https://api.openai.com/v1/completions
- **Headers:**
  • Content-Type: application/json
  • Authorization: Bearer YOUR_API_KEY
- **Method Signature (Python SDK):**
  openai.Completion.create(
    model: str,
    prompt: str,
    max_tokens: int,
    temperature: Optional[float] = 0.7,
    top_p: Optional[float] = 1
  ) -> Dict
- **Request Example:**
  {
    "model": "text-davinci-003",
    "prompt": "Translate 'Hello, world.' to French.",
    "max_tokens": 60,
    "temperature": 0.7,
    "top_p": 1
  }
- **Response Example:**
  {
    "id": "cmpl-456",
    "object": "text_completion",
    "created": 1677858300,
    "choices": [
      {
        "text": "Bonjour le monde.",
        "index": 0,
        "logprobs": null,
        "finish_reason": "length"
      }
    ],
    "usage": {
      "prompt_tokens": 5,
      "completion_tokens": 7,
      "total_tokens": 12
    }
  }

#### Best Practices & Troubleshooting
- **Best Practice:** Always validate the API key before making requests.
- **Troubleshooting Commands:**
  • Use curl for testing:
    curl https://api.openai.com/v1/chat/completions \
      -H 'Content-Type: application/json' \
      -H 'Authorization: Bearer YOUR_API_KEY' \
      -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello"}]}'
  • Check HTTP status codes for error details:
    - 401: Verify API key.
    - 429: Reduce request rate.
    - 500: Retry after brief delay.


## Information Dense Extract
Authentication: Header 'Authorization: Bearer YOUR_API_KEY'; env var OPENAI_API_KEY. Chat Completions: POST /v1/chat/completions, model: string ('gpt-3.5-turbo'), messages: [{role, content}], temperature: 0.7, top_p: 1, n: 1, stream: false, stop: null; Response: JSON with id, object, created, choices[{message, finish_reason}], usage tokens; Completions: POST /v1/completions, model: string ('text-davinci-003'), prompt: string, max_tokens: int, temperature, top_p; SDK method signatures as openai.ChatCompletion.create(...) and openai.Completion.create(...); Code Example in Python provided; Best practices: validate API key, handle 401/429/500 errors; Troubleshooting: curl command examples.

## Escaped Extract
## Table of Contents
1. Authentication
2. Endpoints
   - Chat Completions
   - Completions
3. Error Handling
4. Code Examples

### 1. Authentication
- Use header: Authorization: Bearer YOUR_API_KEY
- Store key in environment variable OPENAI_API_KEY.

### 2. Endpoints

#### Chat Completions
- **Request:** POST /v1/chat/completions
- **Parameters:**
  - model (string) e.g. 'gpt-3.5-turbo'
  - messages (array of objects with 'role' and 'content')
  - temperature (number, default 0.7)
  - top_p (number, default 1)
  - n (integer, default 1)
  - stream (boolean, default false)
  - stop (string or null)

- **Response:** JSON with id, object, created timestamp, choices array containing message and finish_reason, and usage object detailing token counts.

#### Completions
- **Request:** POST /v1/completions
- **Parameters:**
  - model (string) e.g. 'text-davinci-003'
  - prompt (string)
  - max_tokens (integer)
  - temperature (number)
  - top_p (number)

- **Response:** JSON with id, object, created timestamp, choices array with text completions and finish reason, and token usage details.

### 3. Error Handling
- **HTTP Status Codes:**
  - 401 Unauthorized
  - 429 Too Many Requests
  - 500 Internal Server Error

### 4. Code Examples
- **Python Example:** Demonstrates setting API key, sending a chat completion request, and printing response.

## Original Source
OpenAI API Reference
https://platform.openai.com/docs/api-reference

## Digest of OPENAI_API

# OpenAI API Reference

**Retrieved Date:** 2023-10-06

## Endpoints

### Chat Completions
- **Method:** POST
- **Endpoint:** /v1/chat/completions
- **Description:** Generates chat-based completions using conversation history.
- **Request Body:**
  ```json
  {
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "system", "content": "You are ChatGPT."},
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.7,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "stop": null
  }
  ```
- **Response:**
  ```json
  {
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677858242,
    "choices": [
      {
        "index": 0,
        "message": {"role": "assistant", "content": "Hello, how can I help you today?"},
        "finish_reason": "stop"
      }
    ],
    "usage": {
      "prompt_tokens": 10,
      "completion_tokens": 30,
      "total_tokens": 40
    }
  }
  ```

### Completions
- **Method:** POST
- **Endpoint:** /v1/completions
- **Description:** Generates text completions based on prompts.
- **Request Body:**
  ```json
  {
    "model": "text-davinci-003",
    "prompt": "Translate the following English text to French: 'Hello, world.'",
    "max_tokens": 60,
    "temperature": 0.7,
    "top_p": 1
  }
  ```
- **Response:**
  ```json
  {
    "id": "cmpl-456",
    "object": "text_completion",
    "created": 1677858300,
    "choices": [
      {
        "text": "Bonjour le monde.",
        "index": 0,
        "logprobs": null,
        "finish_reason": "length"
      }
    ],
    "usage": {
      "prompt_tokens": 5,
      "completion_tokens": 7,
      "total_tokens": 12
    }
  }
  ```

## Authentication
- **Header:** Authorization: Bearer YOUR_API_KEY
- **Environment Variable:** OPENAI_API_KEY can be used to securely store the API key.

## Error Handling
- **Common HTTP Status Codes:**
  - 401: Unauthorized (Invalid API key)
  - 429: Too Many Requests (Rate limiting)
  - 500: Internal Server Error

## Code Example (Python)
```python
import openai

# Set API key
openai.api_key = 'YOUR_API_KEY'

# Chat Completion Example
response = openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    messages=[
        {'role': 'system', 'content': 'You are ChatGPT.'},
        {'role': 'user', 'content': 'Tell me a joke.'}
    ],
    temperature=0.7,
    top_p=1,
    n=1,
    stream=False,
    stop=None
)

print(response)
```


## Attribution
- Source: OpenAI API Reference
- URL: https://platform.openai.com/docs/api-reference
- License: License: OpenAI API Terms
- Crawl Date: 2025-04-22T02:14:47.066Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-22
