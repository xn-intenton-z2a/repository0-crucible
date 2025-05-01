# BLOCK_API

## Crawl Summary
POST to /w/api.php action=block supports required parameters: user (user|IP|#ID), token (CSRF), optional id (integer), expiry (string duration or timestamp, default never), reason (string), flags boolean: anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial; additional parameters watchlistexpiry (timestamp), tags (pipe list), pagerestrictions (pipe list max10), namespacerestrictions (pipe list or *), actionrestrictions (pipe list); format=json

## Normalised Extract
Table of Contents
1 Endpoint and Method
2 Authentication and Token Retrieval
3 Parameter Reference
4 Example Requests

1 Endpoint and Method
URL: https://www.wikidata.org/w/api.php
Method: POST

2 Authentication and Token Retrieval
GET https://www.wikidata.org/w/api.php?action=query&meta=tokens&type=csrf&format=json
Response: {
  query: { tokens: { csrftoken: "TOKEN_VALUE" } }
}
Include token_value in POST requests as token parameter.

3 Parameter Reference
action: block (fixed)
user: user string specifying username IP or #ID. Required.
id: integer block entry ID to modify.
expiry: string relative duration or ISO8601 timestamp. Default never.
reason: string block log comment.
anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial: flags set by including parameter name with empty value.
watchlistexpiry: ISO8601 timestamp.
tags: pipe separated tags. Allowed values see tag list documentation.
pagerestrictions: pipe separated page titles, max10.
namespacerestrictions: pipe separated namespace ids or *. 
actionrestrictions: pipe separated action names.
token: CSRF token string. Required.
format: json (default).

4 Example Requests
POST body urlencoded
  action=block&user=192.0.2.5&expiry=3 days&reason=First strike&token=ABC123
POST body urlencoded
  action=block&user=Vandal&expiry=never&reason=Vandalism&nocreate=&autoblock=&noemail=&token=ABC123

## Supplementary Details
Implementation Steps
1 Retrieve CSRF token via query meta tokens type csrf.
2 Compose POST request with Content-Type: application/x-www-form-urlencoded.
3 Include required parameters action, user, token and optional parameters as needed.
4 Send request. Expect HTTP 200 with JSON response.
5 On error code badtoken retrieve new token and retry.

Configuration Options
Content-Type: application/x-www-form-urlencoded or application/json with body as JSON.
Timeout: 30s recommended.
Retries: up to 3 on transient server errors (HTTP 5xx).
Redirects: follow by default.

Error Handling
missingtoken or badtoken: fetch new CSRF token.
invaliduser or cantblockself: validate user parameter.
toomanyrequests: implement backoff and respect rate limit headers.

Dependencies
Works with any HTTP client supporting POST and URL encoding.


## Reference Details
API Endpoint: https://www.wikidata.org/w/api.php
HTTP Method: POST

Request Parameters
- action (string) Required. Value must be block.
- format (string) Optional. Default json.
- user (string) Required. Username, IP, or user ID (#ID).
- id (integer) Optional. Block entry ID to modify.
- expiry (string) Optional. Default never. Relative (e.g. 2 weeks) or absolute ISO8601.
- reason (string) Optional. Default empty.
- anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial (boolean flags). Set by including parameter name.
- watchlistexpiry (string) Optional. ISO8601 timestamp.
- tags (string) Optional. Pipe separated tag identifiers.
- pagerestrictions (string) Optional. Pipe separated page titles max10.
- namespacerestrictions (string) Optional. Pipe separated namespace IDs or *.
- actionrestrictions (string) Optional. Pipe separated actions create move thanks upload.
- token (string) Required. CSRF token.

Response Fields
- batchcomplete (string)
- blocked (object)
  - user (string) blocked username or IP
  - type (string) global or partial
  - id (integer) block entry id
  - expiry (string) expiry timestamp or duration
  - reason (string) block reason

SDK Method Signatures
JavaScript (Node fetch)
async function blockUser({user, token, expiry = 'never', reason = '', flags = {}}) {
  const url = 'https://www.wikidata.org/w/api.php';
  const params = new URLSearchParams({action: 'block', format: 'json', user, expiry, reason, token});
  Object.keys(flags).forEach(flag => { if (flags[flag]) params.append(flag, ''); });
  const res = await fetch(url, {method: 'POST', body: params, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  const json = await res.json();
  return json.blocked;
}

Python (requests)
def block_user(session, user, token, expiry='never', reason='', **flags):
    url = 'https://www.wikidata.org/w/api.php'
    data = {'action': 'block', 'format': 'json', 'user': user, 'expiry': expiry, 'reason': reason, 'token': token}
    for flag, val in flags.items():
        if val: data[flag] = ''
    resp = session.post(url, data=data, timeout=30)
    resp.raise_for_status()
    return resp.json().get('blocked')

Best Practices
- Always fetch fresh CSRF token before write.
- Minimize scope by using flags only when necessary.
- Validate expiry formats.
- Handle rate limit responses with exponential backoff.

Troubleshooting
Curl example and expected output:
$ curl -s -X POST -d action=block -d user=Vandal -d expiry=never -d reason=Test -d token=ABC123 https://www.wikidata.org/w/api.php
{"batchcomplete":"","blocked":{"user":"Vandal","type":"global","id":456,"expiry":"infinite","reason":"Test"}}
Error Codes
- badtoken: CSRF token missing or invalid. Retrieve new token.
- invaliduser: user parameter invalid. Check spelling or format.
- missingparam: required parameter not provided.
- toomanyrequests: rate limit exceeded, retry later.


## Information Dense Extract
POST https://www.wikidata.org/w/api.php?action=block&format=json Required: user string expiry string token string Optional flags: anononly nocreate autoblock noemail hidename allowusertalk reblock newblock watchuser partial Optional lists: tags pageRestrictions nameSpaceRestrictions actionRestrictions watchListExpiry id integer Example: curl -X POST -d action=block -d user=User -d expiry="3 days" -d token=TOKEN https://www.wikidata.org/w/api.php

## Sanitised Extract
Table of Contents
1 Endpoint and Method
2 Authentication and Token Retrieval
3 Parameter Reference
4 Example Requests

1 Endpoint and Method
URL: https://www.wikidata.org/w/api.php
Method: POST

2 Authentication and Token Retrieval
GET https://www.wikidata.org/w/api.php?action=query&meta=tokens&type=csrf&format=json
Response: {
  query: { tokens: { csrftoken: 'TOKEN_VALUE' } }
}
Include token_value in POST requests as token parameter.

3 Parameter Reference
action: block (fixed)
user: user string specifying username IP or #ID. Required.
id: integer block entry ID to modify.
expiry: string relative duration or ISO8601 timestamp. Default never.
reason: string block log comment.
anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial: flags set by including parameter name with empty value.
watchlistexpiry: ISO8601 timestamp.
tags: pipe separated tags. Allowed values see tag list documentation.
pagerestrictions: pipe separated page titles, max10.
namespacerestrictions: pipe separated namespace ids or *. 
actionrestrictions: pipe separated action names.
token: CSRF token string. Required.
format: json (default).

4 Example Requests
POST body urlencoded
  action=block&user=192.0.2.5&expiry=3 days&reason=First strike&token=ABC123
POST body urlencoded
  action=block&user=Vandal&expiry=never&reason=Vandalism&nocreate=&autoblock=&noemail=&token=ABC123

## Original Source
Wikidata REST API
https://www.wikidata.org/w/api.php

## Digest of BLOCK_API

# Block API Module
Source MediaWiki License GPL-2.0-or-later
Check to block a user or IP address via the MediaWiki action API

# Endpoint
https://www.wikidata.org/w/api.php
Method: POST (only accepts POST requests for write operations)

# Parameters
id             Type: integer        The existing block entry ID to modify. Optional when modifying a specific block.
user           Type: user           Username, IP address, temporary user, IP range or user ID (#ID). Required.
expiry         Type: string         Expiry timestamp or duration. Relative (e.g. 5 months, 2 weeks, 3 days) or absolute (e.g. 2014-09-18T12:34:56Z). Keywords infinite, indefinite, never for no expiry. Default: never.
reason         Type: string         Block log reason. Default: empty.
anononly       Type: boolean        Block anonymous users only. Use value yes or empty flag. Default: unset.
nocreate       Type: boolean        Prevent account creation by blocked IP. Use flag. Default: unset.
autoblock      Type: boolean        Also block last used IP and subsequent addresses. Use flag. Default: unset.
noemail        Type: boolean        Prevent sending email through wiki. Requires blockemail right. Use flag. Default: unset.
hidename       Type: boolean        Hide blocked name in log. Requires hideuser right. Use flag. Default: unset.
allowusertalk  Type: boolean        Allow blocked user to edit own talk page (depends on wgBlockAllowsUTEdit). Use flag. Default: unset.
reblock        Type: boolean        Overwrite existing single block. Fails if multiple blocks. Use flag. Default: unset.
newblock       Type: boolean        Always create a new block even if existing. Use flag. Default: unset.
watchuser      Type: boolean        Watch the user and talk pages. Use flag. Default: unset.
watchlistexpiry Type: expiry         Timestamp for watchlist expiry. Omit to leave unchanged.
tags           Type: list           Pipe-separated list of tag identifiers. See tag value list. Default: none.
partial        Type: boolean        Restrict block to specific pages or namespaces. Use flag. Default: unset.
pagerestrictions       Type: list   Pipe-separated list of page titles (must exist). Max 10 values. Only with partial.
namespacerestrictions Type: list    Pipe-separated list of namespace IDs or '*' for all. Only with partial.
actionrestrictions    Type: list    Pipe-separated list of actions to block (create, move, thanks, upload). Only with partial.
token          Type: string        CSRF token obtained via action=query&meta=tokens&type=csrf. Required.
format         Type: string        Response format. Default: json.

# Examples
Block IP address 192.0.2.5 for three days with reason
POST https://www.wikidata.org/w/api.php
  action=block
  user=192.0.2.5
  expiry=3 days
  reason=First strike
  token=123ABC

Block user Vandal indefinitely, prevent account creation and email
POST https://www.wikidata.org/w/api.php
  action=block
  user=Vandal
  expiry=never
  reason=Vandalism
  nocreate=
  autoblock=
  noemail=
  token=123ABC

## Attribution
- Source: Wikidata REST API
- URL: https://www.wikidata.org/w/api.php
- License: Public Domain
- Crawl Date: 2025-05-01T11:45:48.287Z
- Data Size: 838618 bytes
- Links Found: 1578

## Retrieved
2025-05-01
