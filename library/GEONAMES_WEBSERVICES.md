# GEONAMES_WEBSERVICES

## Crawl Summary
Authentication: every request must include `username`. Register account and enable via confirmation link.
Rate Limits: 10 000 daily, 1 000 hourly credits per `username`, 1 credit per request, HTTP 503 on exceed.
Endpoints: REST GET at `api.geonames.org` (HTTP) or `secure.geonames.org` (HTTPS); append `JSON` to path for JSON output; default XML.
Common Params: `username`(required), `style`(SHORT|MEDIUM|LONG|FULL; default MEDIUM), `charset`(UTF-8), `maxRows`, `lat`,`lng`,`radius`.
Postal Code Search: `/postalCodeSearch`, filters by `postalcode`, `placename`, supports wildcards and bounding box.
Reverse Geocoding: `/findNearbyPostalCodes`, `/findNearbyPlaceName`, `/findNearby`, `/extendedFindNearby`.
Country Data: `/postalCodeCountryInfo`, `/countryInfo`, `/countryCode`, `/countrySubdivision`.
Geospatial: `/ocean`, `/neighbourhood`, `/srtm1`,`/srtm3`,`/astergdem`,`/gtopo30`,`/timezone`.
Restrictions: CA/IE/MT partial codes, AR 4-digit codes, BR major codes only.

## Normalised Extract
Table of Contents:
1. Authentication
2. Rate Limits
3. Secure and JSON Endpoints
4. Common Parameters
5. Postal Code Restrictions
6. Postal Code Search Endpoint
7. Reverse Geocoding Endpoints
8. Country Information Endpoints
9. Geospatial and Elevation Endpoints
10. Timezone Endpoint

1. Authentication
  username: string, required. Register account, confirm email.

2. Rate Limits
  dailyCredits: int = 10000 per username
  hourlyCredits: int = 1000 per username
  creditPerRequest: 1
  onLimitExceeded: HTTP 503 + error payload

3. Secure and JSON Endpoints
  hostHTTP: api.geonames.org
  hostHTTPS: secure.geonames.org
  outputXML: /endpoint
  outputJSON: /endpointJSON
  charset: UTF-8 URL encoding required

4. Common Parameters
  style: enum {SHORT,MEDIUM,LONG,FULL}, default MEDIUM
  charset: string, default UTF-8
  maxRows: integer, default varies
  lat,lng: float (WGS84)
  radius: float (km)

5. Postal Code Restrictions
  CA, IE, MT: only initial letters
  AR: 4-digit codes
  BR: codes ending 000 only

6. Postal Code Search Endpoint
  HTTP GET /postalCodeSearch
  Required: postalcode or placename
  Optional: postalcode_startsWith, placename_startsWith, country (ISO-3166, repeatable), countryBias, operator (AND|OR, default AND), east,west,north,south
  Response: list of postal codes with place name, countryCode, adminName, lat, lng, distance

7. Reverse Geocoding Endpoints
  - findNearbyPostalCodes: /findNearbyPostalCodes
     params: lat,lng or postalcode,country; radius, maxRows, style, localCountry, isReduced
  - findNearbyPlaceName: /findNearbyPlaceName
     params: lat,lng, lang, radius, maxRows, style, localCountry, cities filter
  - findNearby: /findNearby
     params: lat,lng, featureClass, featureCode[], radius, maxRows, style, localCountry
  - extendedFindNearby: /extendedFindNearby
     params: lat,lng

8. Country Information Endpoints
  - postalCodeCountryInfo: /postalCodeCountryInfo
  - countryInfo: /countryInfo, params: country[], lang
  - countryCode: /countryCode, params: lat,lng, type(xml|JSON), lang, radius
  - countrySubdivision: /countrySubdivision, params: lat,lng, lang, level, radius, maxRows

9. Geospatial and Elevation Endpoints
  - ocean: /ocean, params: lat,lng, radius
  - neighbourhood: /neighbourhood, params: lat,lng
  - srtm1: /srtm1, params: lat,lng or lists lats[], lngs[]
  - srtm3: /srtm3, same as srtm1
  - astergdem: /astergdem, same pattern
  - gtopo30: /gtopo30, params: lat,lng

10. Timezone Endpoint
  GET /timezone
  params: lat,lng, radius, lang, date
  response: countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, dstOffset


## Supplementary Details
Secure Endpoint Configuration:
  - Use HTTPS by directing requests to secure.geonames.org
  - No change to path or parameters when switching to HTTPS

URL Encoding:
  - All string parameters must be UTF-8 URL-encoded (spaces → %20, accents → %C3%A9, etc.)

JSON vs XML:
  - Default response: XML
  - For JSON: call `<endpoint>JSON` and set `Accept: application/json`

Client Integration Patterns:
  - Browser: use JSON endpoints to avoid CORS XML issues
  - Server: choose XML or JSON based on toolchain

Error Handling Steps:
  1. Check HTTP status; non-200 indicates transport error
  2. Check response body for `<status><message>...` or JSON `status` object
  3. On limit breach, catch HTTP 503 and implement exponential backoff

Registration Workflow:
  1. POST no payload; visit registration URL
  2. Confirm via email link
  3. Enable WebService on account page


## Reference Details
### Common HTTP Request
ingetRequest(endpoint, params) {
  baseURL = 'https://api.geonames.org';
  url = baseURL + endpoint;
  query = '?' + Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  return fetch(url + query).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  });
}

### postalCodeSearch
HTTP GET https://api.geonames.org/postalCodeSearch
Parameters:
  postalcode: string, required if placename not set
  placename: string, required if postalcode not set
  postalcode_startsWith: string, optional
  placename_startsWith: string, optional
  country: ISO-3166 code, optional, repeatable
  countryBias: string, optional
  operator: enum {AND,OR}, default AND
  maxRows: integer, default 10
  style: enum {SHORT,MEDIUM,LONG,FULL}, default MEDIUM
  charset: string, default UTF-8
  isReduced: boolean, default false
  east,west,north,south: float bounding box, optional
Response Types:
  XML: `<geonames><code>…</code>…</geonames>`
  JSON: `{"geonames":[{postalcode,name,countryCode,adminName1,lat,lng,...}]}`
Example (curl):
  curl "https://api.geonames.org/postalCodeSearchJSON?postalcode=9011&maxRows=10&username=demo"

### findNearbyPostalCodes
HTTP GET https://api.geonames.org/findNearbyPostalCodes
Parameters (lat/lng mode):
  lat,lng: float required
  radius: float km, default 5
  maxRows: integer, default 5
  style: enum, default MEDIUM
  country: ISO-3166, optional
  localCountry: boolean, default false
  isReduced: boolean, default true on commercial servers
Parameters (postalcode mode):
  postalcode: string
  country: ISO-3166
  radius,maxRows,style same as above
Returns: list sorted by distance, XML or JSON structure

### findNearbyPlaceName
HTTP GET /findNearbyPlaceName
Parameters: lat,lng; lang; radius; maxRows; style; localCountry; cities filter {cities1000,cities5000,cities15000}
Response: nearest populated place (featureClass=P)

### countryInfo
HTTP GET /countryInfo
Parameters: country (code), lang
Response: list of country records: countryCode, countryName, capital, population, areaInSqKm, bbox
CSV variant: /countryInfoCSV

### countryCode
HTTP GET /countryCode
Parameters: lat,lng; type(xml|JSON); lang; radius
Response XML: `<countryCode>US</countryCode><countryName>United States</countryName>`
JSON: `{"countryCode":"US","countryName":"United States"}`

### countrySubdivision
HTTP GET /countrySubdivision
Parameters: lat,lng; lang; level; radius; maxRows
Response: administrative subdivisions with code and name

### ocean
HTTP GET /ocean
Parameters: lat,lng; radius
Response: `<ocean>Atlantic Ocean</ocean>` or JSON

### neighbourhood
HTTP GET /neighbourhood
Parameters: lat,lng
Response: `<neighbourhood>Upper West Side</neighbourhood>`

### Elevation Services (srtm1, srtm3, astergdem, gtopo30)
HTTP GET /{srtm1|srtm3|astergdem|gtopo30}
Parameters: lat,lng or lists lats[],lngs[]; username; GET or POST allowed
Response: single integer per point. No-data flagged as -32768 or -9999
Limits: free server max 20 points; premium 2000 points

### timezone
HTTP GET /timezone
Parameters: lat,lng; radius; lang; date (YYYY-MM-DD)
Response JSON: {countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, dstOffset}

### Implementation Best Practices
- Use JSON endpoints in browser to avoid XML/CORS issues
- Back off and retry on HTTP 503
- Cache static endpoints (countryInfo, postalCodeCountryInfo)
- Batch elevation requests when possible

### Troubleshooting Commands
- Verbose HTTP: `curl -v "https://api.geonames.org/countryInfo?username=demo"`
- Check rate limit errors: look for HTTP 503 and `<status><message>daily limit` or JSON `{status:{message}}`


## Information Dense Extract
username(required); dailyCredits=10000,hourlyCredits=1000; host=api.geonames.org or secure.geonames.org; default output=XML, JSON=endpointJSON;
commonParams={style:[SHORT,MEDIUM,LONG,FULL]=MEDIUM,charset=UTF-8,maxRows,varies,lat:float,lng:float,radius:float};
postalCodeSearch GET /postalCodeSearch?postalcode=string|placename=string&[,postalcode_startsWith,placename_startsWith,country=ISO-3166+,countryBias,operator=[AND|OR],east,west,north,south];
findNearbyPostalCodes GET /findNearbyPostalCodes?lat=float&lng=float or postalcode=string&country=ISO-3166[,radius,maxRows,style,localCountry,isReduced];
findNearbyPlaceName GET /findNearbyPlaceName?lat,lng,lang,radius,maxRows,style,localCountry,citiesFilter;
countryInfo GET /countryInfo?username&[country=ISO-3166+,lang];
countryCode GET /countryCode?lat,lng[,type=xml|JSON,lang,radius];
countrySubdivision GET /countrySubdivision?lat,lng[,lang,level,radius,maxRows];
ocean GET /ocean?lat,lng; neighbourhood GET /neighbourhood?lat,lng;
elevation GET /{srtm1|srtm3|astergdem|gtopo30}?lat,lng or lats[],lngs[]; pointsLimit free=20,premium=2000;
timezone GET /timezone?lat,lng[,radius,lang,date]; responses include offsets,sunrise/sunset; errors=HTTP503+{status.message}.

## Sanitised Extract
Table of Contents:
1. Authentication
2. Rate Limits
3. Secure and JSON Endpoints
4. Common Parameters
5. Postal Code Restrictions
6. Postal Code Search Endpoint
7. Reverse Geocoding Endpoints
8. Country Information Endpoints
9. Geospatial and Elevation Endpoints
10. Timezone Endpoint

1. Authentication
  username: string, required. Register account, confirm email.

2. Rate Limits
  dailyCredits: int = 10000 per username
  hourlyCredits: int = 1000 per username
  creditPerRequest: 1
  onLimitExceeded: HTTP 503 + error payload

3. Secure and JSON Endpoints
  hostHTTP: api.geonames.org
  hostHTTPS: secure.geonames.org
  outputXML: /endpoint
  outputJSON: /endpointJSON
  charset: UTF-8 URL encoding required

4. Common Parameters
  style: enum {SHORT,MEDIUM,LONG,FULL}, default MEDIUM
  charset: string, default UTF-8
  maxRows: integer, default varies
  lat,lng: float (WGS84)
  radius: float (km)

5. Postal Code Restrictions
  CA, IE, MT: only initial letters
  AR: 4-digit codes
  BR: codes ending 000 only

6. Postal Code Search Endpoint
  HTTP GET /postalCodeSearch
  Required: postalcode or placename
  Optional: postalcode_startsWith, placename_startsWith, country (ISO-3166, repeatable), countryBias, operator (AND|OR, default AND), east,west,north,south
  Response: list of postal codes with place name, countryCode, adminName, lat, lng, distance

7. Reverse Geocoding Endpoints
  - findNearbyPostalCodes: /findNearbyPostalCodes
     params: lat,lng or postalcode,country; radius, maxRows, style, localCountry, isReduced
  - findNearbyPlaceName: /findNearbyPlaceName
     params: lat,lng, lang, radius, maxRows, style, localCountry, cities filter
  - findNearby: /findNearby
     params: lat,lng, featureClass, featureCode[], radius, maxRows, style, localCountry
  - extendedFindNearby: /extendedFindNearby
     params: lat,lng

8. Country Information Endpoints
  - postalCodeCountryInfo: /postalCodeCountryInfo
  - countryInfo: /countryInfo, params: country[], lang
  - countryCode: /countryCode, params: lat,lng, type(xml|JSON), lang, radius
  - countrySubdivision: /countrySubdivision, params: lat,lng, lang, level, radius, maxRows

9. Geospatial and Elevation Endpoints
  - ocean: /ocean, params: lat,lng, radius
  - neighbourhood: /neighbourhood, params: lat,lng
  - srtm1: /srtm1, params: lat,lng or lists lats[], lngs[]
  - srtm3: /srtm3, same as srtm1
  - astergdem: /astergdem, same pattern
  - gtopo30: /gtopo30, params: lat,lng

10. Timezone Endpoint
  GET /timezone
  params: lat,lng, radius, lang, date
  response: countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, dstOffset

## Original Source
GeoNames Web Services
http://www.geonames.org/export/ws-overview.html

## Digest of GEONAMES_WEBSERVICES

# GeoNames Web Services

Retrieved: 2024-07-04
Data Size: 831367 bytes
Source Contact: info@geonames.org

## Authentication
All REST endpoints require a `username` query parameter. Register at http://www.geonames.org/login, confirm by email, then enable on your account page.

## Rate Limits and Credits
- Daily limit: 10 000 credits per `username`.
- Hourly limit: 1 000 credits per `username`.
- Each request consumes 1 credit; on limit breach the service responds with HTTP 503 and an error payload.

## Secure Endpoint
Switch host from `api.geonames.org` to `secure.geonames.org` for HTTPS.

## JSON vs XML
- Append `JSON` to the endpoint path for JSON output (e.g. `/postalCodeSearchJSON`).
- Default output is XML.
- Always URL-encode parameters using UTF-8.

## Common Query Parameters
- `username` (string, required)
- `style` (enum: SHORT, MEDIUM, LONG, FULL; default = MEDIUM)
- `charset` (string; default = UTF-8)
- `maxRows` (integer; default varies by service)
- `lat`, `lng` (float; WGS84)
- `radius` (float; kilometers)

## Postal Code Restrictions
- CA, IE, MT: only initial letters of full codes
- AR: 4-digit codes only
- BR: codes ending “000” only

## Key Endpoints

### postalCodeSearch
**URL**  GET `/postalCodeSearch?postalcode={string}&username={string}[…]&maxRows={int}&style={enum}`
Returns postal code data by code or place name. US first result uses area shape; others use centroid.

### findNearbyPostalCodes
**URL**  GET `/findNearbyPostalCodes?lat={float}&lng={float}&username={string}[…]&radius={float}&maxRows={int}`
Reverse-geocoding via coordinates or postal code; sorted by distance.

### findNearbyPlaceName
**URL**  GET `/findNearbyPlaceName?lat={float}&lng={float}&username={string}[…]&lang={string}&radius={float}&maxRows={int}`
Closest populated place (featureClass = P).

### countryInfo
**URL**  GET `/countryInfo?username={string}[&country={ISO-3166}][&lang={string}]`
Returns capital, population, area, bounding box.

### countryCode
**URL**  GET `/countryCode?lat={float}&lng={float}&username={string}[&type={xml|JSON}][&radius={float}]`
ISO code (+ country name if `type=xml`).

### countrySubdivision
**URL**  GET `/countrySubdivision?lat={float}&lng={float}&username={string}[&lang={string}][&level={int}][&radius={float}][&maxRows={int}]`
Returns adm division names and codes.

### ocean
**URL**  GET `/ocean?lat={float}&lng={float}&username={string}`
Returns ocean or sea name.

### neighbourhood
**URL**  GET `/neighbourhood?lat={float}&lng={float}&username={string}`
Returns US neighbourhood (Zillow cc-by-sa).

### srtm1 / srtm3 / astergdem / gtopo30
**URL**  GET `/{service}?lat={float}&lng={float}&username={string}[&lats={list}&lngs={list}]`
Returns elevation (integer meters; masked as –32768 or –9999 for no data).

### timezone
**URL**  GET `/timezone?lat={float}&lng={float}&username={string}[&radius={float}][&lang={string}][&date={YYYY-MM-DD}]`
Returns raw and DST offsets, local time, sunrise/sunset.


## Attribution
- Source: GeoNames Web Services
- URL: http://www.geonames.org/export/ws-overview.html
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Crawl Date: 2025-05-02T20:02:28.667Z
- Data Size: 831367 bytes
- Links Found: 3002

## Retrieved
2025-05-02
