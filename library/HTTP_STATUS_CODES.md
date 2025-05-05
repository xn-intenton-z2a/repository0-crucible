# HTTP_STATUS_CODES

## Crawl Summary
Registry of all standardized HTTP status codes as of 2024-11-13. Codes grouped by class: 1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error. Each entry lists numeric value, reason phrase, RFC reference. Unassigned ranges explicitly marked. Includes temporary and obsolete codes.

## Normalised Extract
Table of Contents
1 Status Code Categories
2 Complete Status Code List
3 Sending Responses in Node.js HTTP Module
4 Setting Status in Express.js
5 Custom Reason Phrases
6 Client-side Handling Patterns
7 Troubleshooting via curl

1 Status Code Categories
1xx: Informational 2xx: Success 3xx: Redirection 4xx: Client Error 5xx: Server Error

2 Complete Status Code List
1xx 100 Continue;101 Switching Protocols;102 Processing;103 Early Hints;104 Upload Resumption Supported;105-199 Unassigned
2xx 200 OK;201 Created;202 Accepted;203 Non-Authoritative Information;204 No Content;205 Reset Content;206 Partial Content;207 Multi-Status;208 Already Reported;209-225 Unassigned;226 IM Used;227-299 Unassigned
3xx 300 Multiple Choices;301 Moved Permanently;302 Found;303 See Other;304 Not Modified;305 Use Proxy;306 Unused;307 Temporary Redirect;308 Permanent Redirect;309-399 Unassigned
4xx 400 Bad Request;401 Unauthorized;402 Payment Required;403 Forbidden;404 Not Found;405 Method Not Allowed;406 Not Acceptable;407 Proxy Authentication Required;408 Request Timeout;409 Conflict;410 Gone;411 Length Required;412 Precondition Failed;413 Content Too Large;414 URI Too Long;415 Unsupported Media Type;416 Range Not Satisfiable;417 Expectation Failed;418 Unused;419-420 Unassigned;421 Misdirected Request;422 Unprocessable Content;423 Locked;424 Failed Dependency;425 Too Early;426 Upgrade Required;427 Unassigned;428 Precondition Required;429 Too Many Requests;430 Unassigned;431 Request Header Fields Too Large;432-450 Unassigned;451 Unavailable For Legal Reasons;452-499 Unassigned
5xx 500 Internal Server Error;501 Not Implemented;502 Bad Gateway;503 Service Unavailable;504 Gateway Timeout;505 HTTP Version Not Supported;506 Variant Also Negotiates;507 Insufficient Storage;508 Loop Detected;509 Unassigned;510 Not Extended;511 Network Authentication Required;512-599 Unassigned

3 Sending Responses in Node.js HTTP Module
http.createServer((req,res)=>{res.statusCode=CODE;res.statusMessage="PHRASE";res.setHeader('Content-Type','text/plain');res.end('BODY');});

4 Setting Status in Express.js
Response.status(code:Number): Response
Response.statusMessage: string setter
res.status(code).send(body)
res.redirect(status, url)

5 Custom Reason Phrases
res.statusMessage='Custom Text'
res.writeHead(code,'Text')

6 Client-side Handling Patterns
fetch(url).then(resp=>{if(!resp.ok)throw new Error(resp.status+ ' '+ resp.statusText);return resp.json();});

7 Troubleshooting via curl
curl -i -X METHOD https://host/path
Expect 'HTTP/1.1 CODE PHRASE' in response header


## Supplementary Details
Status code integer values 100–599. Reason phrases must not exceed 70 characters. Node.js defaults: statusMessage auto-derived from code; override via res.statusMessage. Express sets 'X-Powered-By: Express' by default; can disable. HTTP module writeHead(code, message, headers) sets code and phrase. fetch API maps status to response.status and response.statusText. Setting strict status class handling: treat 2xx as success; 4xx-5xx as errors. Concurrency: include Connection: keep-alive for persistent connections.

## Reference Details
Node.js HTTP Module
ServerResponse.statusCode: Number default 200; assign before writeHead or end.
ServerResponse.statusMessage: String default from STATUS_CODES[statusCode]; assign before end.
writeHead(statusCode:Number, statusMessage?:String, headers?:Object): void
end([data:String|Buffer],[encoding:String],[callback:Function]): void

Express.js
interface Response {
  status(code: number): this;
  statusMessage: string;
  send(body?: any): this;
  json(body: any): this;
  redirect(url: string): this;
  redirect(status: number, url: string): this;
}

Example Express implementation:
app.get('/resource',(req,res)=>{
  if(!found) return res.status(404).send('Not found');
  res.status(200).json(data);
});

Best Practices
Always set Content-Type. Use 204 with no body. For redirects, use 301/302 correctly. For rate limiting, return 429 with Retry-After header: res.set('Retry-After','120'). status(429).

Troubleshooting
Command: curl -i http://localhost:3000/api
Output:
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Check mismatched statusMessage by inspecting response.statusText in client.

## Information Dense Extract
100 Continue;101 Switching Protocols;102 Processing;103 Early Hints;104 Upload Resumption Supported;105-199 unassigned;200 OK;201 Created;202 Accepted;203 NonAuthInfo;204 No Content;205 Reset Content;206 Partial Content;207 Multi-Status;208 Already Reported;209-225 unassigned;226 IM Used;227-299 unassigned;300 Multiple Choices;301 Moved Permanently;302 Found;303 See Other;304 Not Modified;305 Use Proxy;306 Unused;307 Temporary Redirect;308 Permanent Redirect;309-399 unassigned;400 Bad Request;401 Unauthorized;402 Payment Required;403 Forbidden;404 Not Found;405 Method Not Allowed;406 Not Acceptable;407 ProxyAuthRequired;408 Request Timeout;409 Conflict;410 Gone;411 Length Required;412 Precondition Failed;413 Content Too Large;414 URI Too Long;415 Unsupported Media Type;416 Range Not Satisfiable;417 Expectation Failed;418 Unused;419-420 unassigned;421 Misdirected Request;422 Unprocessable Content;423 Locked;424 Failed Dependency;425 Too Early;426 Upgrade Required;427 unassigned;428 Precondition Required;429 Too Many Requests;430 unassigned;431 ReqHeaderFieldsTooLarge;432-450 unassigned;451 UnavailForLegalReasons;452-499 unassigned;500 InternalServerError;501 NotImplemented;502 BadGateway;503 ServiceUnavailable;504 GatewayTimeout;505 HTTPVersionNotSupported;506 VariantAlsoNegotiates;507 InsufficientStorage;508 LoopDetected;509 unassigned;510 NotExtended;511 NetworkAuthRequired;512-599 unassigned;Node.js: res.statusCode=code;res.statusMessage=phrase;res.writeHead(code,phrase,headers);Express: res.status(code).send(body);res.json(body);res.redirect(status,url);fetch: response.status,response.statusText;curl -i METHOD URL expects HTTP/1.1 code phrase

## Sanitised Extract
Table of Contents
1 Status Code Categories
2 Complete Status Code List
3 Sending Responses in Node.js HTTP Module
4 Setting Status in Express.js
5 Custom Reason Phrases
6 Client-side Handling Patterns
7 Troubleshooting via curl

1 Status Code Categories
1xx: Informational 2xx: Success 3xx: Redirection 4xx: Client Error 5xx: Server Error

2 Complete Status Code List
1xx 100 Continue;101 Switching Protocols;102 Processing;103 Early Hints;104 Upload Resumption Supported;105-199 Unassigned
2xx 200 OK;201 Created;202 Accepted;203 Non-Authoritative Information;204 No Content;205 Reset Content;206 Partial Content;207 Multi-Status;208 Already Reported;209-225 Unassigned;226 IM Used;227-299 Unassigned
3xx 300 Multiple Choices;301 Moved Permanently;302 Found;303 See Other;304 Not Modified;305 Use Proxy;306 Unused;307 Temporary Redirect;308 Permanent Redirect;309-399 Unassigned
4xx 400 Bad Request;401 Unauthorized;402 Payment Required;403 Forbidden;404 Not Found;405 Method Not Allowed;406 Not Acceptable;407 Proxy Authentication Required;408 Request Timeout;409 Conflict;410 Gone;411 Length Required;412 Precondition Failed;413 Content Too Large;414 URI Too Long;415 Unsupported Media Type;416 Range Not Satisfiable;417 Expectation Failed;418 Unused;419-420 Unassigned;421 Misdirected Request;422 Unprocessable Content;423 Locked;424 Failed Dependency;425 Too Early;426 Upgrade Required;427 Unassigned;428 Precondition Required;429 Too Many Requests;430 Unassigned;431 Request Header Fields Too Large;432-450 Unassigned;451 Unavailable For Legal Reasons;452-499 Unassigned
5xx 500 Internal Server Error;501 Not Implemented;502 Bad Gateway;503 Service Unavailable;504 Gateway Timeout;505 HTTP Version Not Supported;506 Variant Also Negotiates;507 Insufficient Storage;508 Loop Detected;509 Unassigned;510 Not Extended;511 Network Authentication Required;512-599 Unassigned

3 Sending Responses in Node.js HTTP Module
http.createServer((req,res)=>{res.statusCode=CODE;res.statusMessage='PHRASE';res.setHeader('Content-Type','text/plain');res.end('BODY');});

4 Setting Status in Express.js
Response.status(code:Number): Response
Response.statusMessage: string setter
res.status(code).send(body)
res.redirect(status, url)

5 Custom Reason Phrases
res.statusMessage='Custom Text'
res.writeHead(code,'Text')

6 Client-side Handling Patterns
fetch(url).then(resp=>{if(!resp.ok)throw new Error(resp.status+ ' '+ resp.statusText);return resp.json();});

7 Troubleshooting via curl
curl -i -X METHOD https://host/path
Expect 'HTTP/1.1 CODE PHRASE' in response header

## Original Source
IANA HTTP Status Codes Registry
https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

## Digest of HTTP_STATUS_CODES

# HTTP Status Codes Registry

Last Updated: 2024-11-13
Retrieved: 2024-06-xx
Data Size: 4 856 148 bytes

## 1xx Informational

100 Continue (RFC9110 Sec. 15.2.1)
101 Switching Protocols (RFC9110 Sec. 15.2.2)
102 Processing (RFC2518)
103 Early Hints (RFC8297)
104 Upload Resumption Supported (TEMPORARY) (draft-ietf-httpbis-resumable-upload-05)
105-199 Unassigned

## 2xx Success

200 OK (RFC9110 Sec. 15.3.1)
201 Created (RFC9110 Sec. 15.3.2)
202 Accepted (RFC9110 Sec. 15.3.3)
203 Non-Authoritative Information (RFC9110 Sec. 15.3.4)
204 No Content (RFC9110 Sec. 15.3.5)
205 Reset Content (RFC9110 Sec. 15.3.6)
206 Partial Content (RFC9110 Sec. 15.3.7)
207 Multi-Status (RFC4918)
208 Already Reported (RFC5842)
209-225 Unassigned
226 IM Used (RFC3229)
227-299 Unassigned

## 3xx Redirection

300 Multiple Choices (RFC9110 Sec. 15.4.1)
301 Moved Permanently (RFC9110 Sec. 15.4.2)
302 Found (RFC9110 Sec. 15.4.3)
303 See Other (RFC9110 Sec. 15.4.4)
304 Not Modified (RFC9110 Sec. 15.4.5)
305 Use Proxy (RFC9110 Sec. 15.4.6)
306 (Unused) (RFC9110 Sec. 15.4.7)
307 Temporary Redirect (RFC9110 Sec. 15.4.8)
308 Permanent Redirect (RFC9110 Sec. 15.4.9)
309-399 Unassigned

## 4xx Client Error

400 Bad Request (RFC9110 Sec. 15.5.1)
401 Unauthorized (RFC9110 Sec. 15.5.2)
402 Payment Required (RFC9110 Sec. 15.5.3)
403 Forbidden (RFC9110 Sec. 15.5.4)
404 Not Found (RFC9110 Sec. 15.5.5)
405 Method Not Allowed (RFC9110 Sec. 15.5.6)
406 Not Acceptable (RFC9110 Sec. 15.5.7)
407 Proxy Authentication Required (RFC9110 Sec. 15.5.8)
408 Request Timeout (RFC9110 Sec. 15.5.9)
409 Conflict (RFC9110 Sec. 15.5.10)
410 Gone (RFC9110 Sec. 15.5.11)
411 Length Required (RFC9110 Sec. 15.5.12)
412 Precondition Failed (RFC9110 Sec. 15.5.13)
413 Content Too Large (RFC9110 Sec. 15.5.14)
414 URI Too Long (RFC9110 Sec. 15.5.15)
415 Unsupported Media Type (RFC9110 Sec. 15.5.16)
416 Range Not Satisfiable (RFC9110 Sec. 15.5.17)
417 Expectation Failed (RFC9110 Sec. 15.5.18)
418 (Unused) (RFC9110 Sec. 15.5.19)
419-420 Unassigned
421 Misdirected Request (RFC9110 Sec. 15.5.20)
422 Unprocessable Content (RFC9110 Sec. 15.5.21)
423 Locked (RFC4918)
424 Failed Dependency (RFC4918)
425 Too Early (RFC8470)
426 Upgrade Required (RFC9110 Sec. 15.5.22)
427 Unassigned
428 Precondition Required (RFC6585)
429 Too Many Requests (RFC6585)
430 Unassigned
431 Request Header Fields Too Large (RFC6585)
432-450 Unassigned
451 Unavailable For Legal Reasons (RFC7725)
452-499 Unassigned

## 5xx Server Error

500 Internal Server Error (RFC9110 Sec. 15.6.1)
501 Not Implemented (RFC9110 Sec. 15.6.2)
502 Bad Gateway (RFC9110 Sec. 15.6.3)
503 Service Unavailable (RFC9110 Sec. 15.6.4)
504 Gateway Timeout (RFC9110 Sec. 15.6.5)
505 HTTP Version Not Supported (RFC9110 Sec. 15.6.6)
506 Variant Also Negotiates (RFC2295)
507 Insufficient Storage (RFC4918)
508 Loop Detected (RFC5842)
509 Unassigned
510 Not Extended (OBSOLETED) (RFC2774)
511 Network Authentication Required (RFC6585)
512-599 Unassigned

## Attribution
- Source: IANA HTTP Status Codes Registry
- URL: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
- License: Public Domain
- Crawl Date: 2025-05-05T04:50:25.254Z
- Data Size: 4856148 bytes
- Links Found: 27452

## Retrieved
2025-05-05
