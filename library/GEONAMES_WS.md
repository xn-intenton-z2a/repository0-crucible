# GEONAMES_WS

## Crawl Summary
Detailed parameter lists, endpoints and defaults for GeoNames REST webservices: authentication, usage limits, format selection, global parameters (type,style,maxRows,lang). Postal code services: postalCodeSearch, postalCodeLookupJSON, findNearbyPostalCodes, postalCodeCountryInfo. Reverse geocoding: findNearbyPlaceName, findNearby, extendedFindNearby. Feature: get, children, hierarchy, siblings, neighbours. Country services: countryInfo, countryCode, countrySubdivision. Ocean/neighbourhood. Elevation: srtm1, srtm3, astergdem, gtopo30. Timezone: timezone with offsets.

## Normalised Extract
Table of Contents 1 Authentication 2 Request Essentials 3 Global Parameters 4 Postal Code Services 5 Reverse Geocoding 6 Feature Services 7 Country Services 8 Ocean & Neighbourhood 9 Elevation Services 10 Timezone Service

1 Authentication Mandatory username parameter; register account; 10,000 credits/day, 1,000/hour free; secure endpoint https://secure.geonames.org

2 Request Essentials Method GET/POST; response XML or JSON; URL encode string parameters

3 Global Parameters type=xml|JSON; style=SHORT|MEDIUM|LONG|FULL (default MEDIUM); maxRows=int; lang=ISO-639-1

4 Postal Code Services
4.1 postalCodeSearch endpoint: /postalCodeSearch
 parameters: postalcode,placename,postalcode_startsWith,placename_startsWith,country (repeatable),countryBias,maxRows (default10),operator=AND|OR,isReduced=true|false,east,west,north,south
 response fields: postalcode,placename,lat,lng,countryCode,adminName1,adminCode1,distance

4.2 postalCodeLookupJSON endpoint: /postalCodeLookupJSON
 parameters: postalcode,country,maxRows=20,charset=UTF-8,callback
 response: JSON array sorted postalcode,placename

4.3 findNearbyPostalCodes endpoint: /findNearbyPostalCodes
 parameters: lat,lng OR postalcode,country; radius=30km free|160km premium; maxRows=5 free|2500 premium; style,localCountry,isReduced
 response: sorted by distance

4.4 postalCodeCountryInfo endpoint: /postalCodeCountryInfo
 parameter: none
 response: list of country codes

5 Reverse Geocoding
5.1 findNearbyPlaceName endpoint: /findNearbyPlaceName
 parameters: lat,lng,lang,radius,maxRows=10,style,localCountry,cities=cities1000|cities5000|cities15000
 response: nearest populated place

5.2 findNearby endpoint: /findNearby
 parameters: lat,lng,featureClass,featureCode (repeat/exclude),radius,maxRows,style,localCountry

5.3 extendedFindNearby endpoint: /extendedFindNearby
 parameters: lat,lng
 response: combined address/hierarchy/ocean

6 Feature Services
6.1 get endpoint: /get
 parameters: geonameId,lang,style
6.2 children/hierarchy/siblings/neighbours endpoints: respective paths with geonameId

7 Country Services
7.1 countryInfo endpoint: /countryInfo
 parameters: country (repeatable),lang
 response: capital,population,area,bbox

7.2 countryCode endpoint: /countryCode
 parameters: lat,lng,type=xml|JSON,text default,lang,radius

7.3 countrySubdivision endpoint: /countrySubdivision
 parameters: lat,lng,lang,radius,level,maxRows

8 Ocean & Neighbourhood
8.1 ocean endpoint: /ocean
 parameters: lat,lng,radius
8.2 neighbourhood endpoint: /neighbourhood
 parameters: lat,lng

9 Elevation Services Use GET/POST; multiple points via lats,lngs (max20 free|2000 premium)
9.1 srtm1 endpoint: /srtm1 returns elevation m or -32768
9.2 srtm3 endpoint: /srtm3 returns elevation m or -32768
9.3 astergdem endpoint: /astergdem returns elevation m or -32768
9.4 gtopo30 endpoint: /gtopo30 returns elevation m or -9999

10 Timezone Service
10.1 timezone endpoint: /timezone
 parameters: lat,lng,radius,lang,date
 response: countryCode,countryName,timezoneId,time,sunrise,sunset,rawOffset,gmtOffset,dstOffset

## Supplementary Details
Authentication: call any endpoint with ?username={YOUR_USERNAME}; register at http://www.geonames.org/login
Rate limits: 10,000 requests per day, 1,000 per hour free; exception thrown on limit exceed
JSON vs XML: set type=JSON or use ...JSON endpoint suffix
URL: https://api.geonames.org or secure.geonames.org
Use POST for bodies >2000 chars
Parameter encoding: UTF-8 URL-encoded
Commercial differs: default isReduced true, radius and maxRows limits increased
Examples: GET /postalCodeSearch?postalcode=9011&maxRows=10&username=demo
GET /findNearbyPostalCodesJSON?lat=47&lng=9&username=demo


## Reference Details
API Endpoints and Parameters

postalCodeSearch
GET https://api.geonames.org/postalCodeSearch?postalcode={string}&placename={string}&postalcode_startsWith={string}&placename_startsWith={string}&country={ISO-3166}&countryBias={ISO-3166}&maxRows={int}&operator={AND|OR}&isReduced={true|false}&east={float}&west={float}&north={float}&south={float}&username={string}&type={xml|JSON}&style={SHORT|MEDIUM|LONG|FULL}
Response XML <code> or JSON { }

postalCodeLookupJSON
GET https://api.geonames.org/postalCodeLookupJSON?postalcode={string}&country={ISO-3166}&maxRows={int}&charset={UTF-8}&callback={function}&username={string}
Response JSON array of objects {postalcode,placename,lat,lng,countryCode,adminName1,adminCode1}

findNearbyPostalCodes
GET https://api.geonames.org/findNearbyPostalCodes?lat={float}&lng={float}&postalcode={string}&country={ISO-3166}&radius={float}&maxRows={int}&style={SHORT|MEDIUM|LONG|FULL}&localCountry={true|false}&isReduced={true|false}&username={string}&type={xml|JSON}
Response sorted by distance

get (feature)
GET https://api.geonames.org/get?geonameId={int}&lang={ISO-639-1}&style={SHORT|MEDIUM|LONG|FULL}&username={string}&type={xml|JSON}
Response: <geoname> id,name,lat,lng,countryCode,adminCode1,adminName1,featureClass,featureCode,elevation,population,continent,timezone, modificationDate

countryInfo
GET https://api.geonames.org/countryInfo?country={ISO-3166}&lang={ISO-639-1}&username={string}&type={xml|JSON}
Response fields: countryCode,countryName,capital,population,areaInSqKm,bBoxWest,bBoxNorth,bBoxEast,bBoxSouth,isoAlpha3,continent,currencyCode

timezone
GET https://api.geonames.org/timezone?lat={float}&lng={float}&radius={float}&lang={ISO-639-1}&date={yyyy-MM-dd}&username={string}&type={xml|JSON}
Response: countryCode,countryName,timezoneId,time,sunrise,sunset,rawOffset,gmtOffset,dstOffset

SDK Usage Patterns (Java example)
GeoNamesClient client = new GeoNamesClient("username");
List<PostalCode> codes = client.postalCodeSearch("9011", null, 10, false);
// method signature: List<PostalCode> postalCodeSearch(String postalcode, String country, int maxRows, boolean isReduced)

Configuration Options
client.setEndpoint("https://secure.geonames.org");
client.setStyle(Style.FULL);
client.setMaxRows(100);

Best Practices
Always URL-encode placename and query parameters;
Use JSON endpoints for browser; avoid demo username in production;
Implement exponential backoff on 10,000 limit exception;
Cache countryInfo results for static data;
Use premium subscription for radius>30km or >500 results.

Troubleshooting
Error: "daily limit exceeded" => check credits via countryInfo; rotate usernames or upgrade.
Error: HTTP 401 => invalid or unconfirmed username; verify registration link.
Error: HTTP 400 => malformed URL or missing required parameter; inspect query string.
Error: XML parser exception in browser => switch to JSON endpoint; ensure CORS support.
Expected Output Example
GET /findNearbyPostalCodes?lat=47&lng=9&username=user =>
{
  "postalCodes": [
    {"postalcode":"9000","placename":"St. Gallen", "lat":47.4215,"lng":9.3767,"countryCode":"CH","adminName1":"St. Gallen","distance":0.0},...
  ]
}

## Information Dense Extract
username required; 10k/day,1k/h free; endpoints suffix JSON for JSON; type param for xml/JSON; style SHORT|MEDIUM|LONG|FULL; maxRows int; lang ISO-639-1; curl GET https://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=yourUser; params: postalcode,placename,country,countryBias,operator,postalcode_startsWith,placename_startsWith,isReduced,east,west,north,south; findNearbyPostalCodes: lat,lng OR postalcode,country; radius 30km free,160km premium; maxRows 5 free,2500 premium; postalCodeLookupJSON:maxRows,charset,callback; findNearbyPlaceName: lat,lng,lang,radius,maxRows,cities; findNearby: lat,lng,featureClass,featureCode,exclude featureCode,localCountry; extendedFindNearby: lat,lng; get: geonameId; children,hierarchy,siblings,neighbours: geonameId; countryInfo: country,lang; countryCode: lat,lng,type,lang,radius; countrySubdivision: lat,lng,lang,radius,level,maxRows; ocean: lat,lng,radius; neighbourhood: lat,lng; srtm1,srtm3,astergdem,gtopo30: lat,lng||lists via lats,lngs; timezone: lat,lng,radius,lang,date; responses include fields per service; demo user only for samples; use your own account; secure endpoint https://secure.geonames.org; URL encode strings; JSON for cross-domain; handle rate-limit exceptions; premium SLA available.

## Sanitised Extract
Table of Contents 1 Authentication 2 Request Essentials 3 Global Parameters 4 Postal Code Services 5 Reverse Geocoding 6 Feature Services 7 Country Services 8 Ocean & Neighbourhood 9 Elevation Services 10 Timezone Service

1 Authentication Mandatory username parameter; register account; 10,000 credits/day, 1,000/hour free; secure endpoint https://secure.geonames.org

2 Request Essentials Method GET/POST; response XML or JSON; URL encode string parameters

3 Global Parameters type=xml|JSON; style=SHORT|MEDIUM|LONG|FULL (default MEDIUM); maxRows=int; lang=ISO-639-1

4 Postal Code Services
4.1 postalCodeSearch endpoint: /postalCodeSearch
 parameters: postalcode,placename,postalcode_startsWith,placename_startsWith,country (repeatable),countryBias,maxRows (default10),operator=AND|OR,isReduced=true|false,east,west,north,south
 response fields: postalcode,placename,lat,lng,countryCode,adminName1,adminCode1,distance

4.2 postalCodeLookupJSON endpoint: /postalCodeLookupJSON
 parameters: postalcode,country,maxRows=20,charset=UTF-8,callback
 response: JSON array sorted postalcode,placename

4.3 findNearbyPostalCodes endpoint: /findNearbyPostalCodes
 parameters: lat,lng OR postalcode,country; radius=30km free|160km premium; maxRows=5 free|2500 premium; style,localCountry,isReduced
 response: sorted by distance

4.4 postalCodeCountryInfo endpoint: /postalCodeCountryInfo
 parameter: none
 response: list of country codes

5 Reverse Geocoding
5.1 findNearbyPlaceName endpoint: /findNearbyPlaceName
 parameters: lat,lng,lang,radius,maxRows=10,style,localCountry,cities=cities1000|cities5000|cities15000
 response: nearest populated place

5.2 findNearby endpoint: /findNearby
 parameters: lat,lng,featureClass,featureCode (repeat/exclude),radius,maxRows,style,localCountry

5.3 extendedFindNearby endpoint: /extendedFindNearby
 parameters: lat,lng
 response: combined address/hierarchy/ocean

6 Feature Services
6.1 get endpoint: /get
 parameters: geonameId,lang,style
6.2 children/hierarchy/siblings/neighbours endpoints: respective paths with geonameId

7 Country Services
7.1 countryInfo endpoint: /countryInfo
 parameters: country (repeatable),lang
 response: capital,population,area,bbox

7.2 countryCode endpoint: /countryCode
 parameters: lat,lng,type=xml|JSON,text default,lang,radius

7.3 countrySubdivision endpoint: /countrySubdivision
 parameters: lat,lng,lang,radius,level,maxRows

8 Ocean & Neighbourhood
8.1 ocean endpoint: /ocean
 parameters: lat,lng,radius
8.2 neighbourhood endpoint: /neighbourhood
 parameters: lat,lng

9 Elevation Services Use GET/POST; multiple points via lats,lngs (max20 free|2000 premium)
9.1 srtm1 endpoint: /srtm1 returns elevation m or -32768
9.2 srtm3 endpoint: /srtm3 returns elevation m or -32768
9.3 astergdem endpoint: /astergdem returns elevation m or -32768
9.4 gtopo30 endpoint: /gtopo30 returns elevation m or -9999

10 Timezone Service
10.1 timezone endpoint: /timezone
 parameters: lat,lng,radius,lang,date
 response: countryCode,countryName,timezoneId,time,sunrise,sunset,rawOffset,gmtOffset,dstOffset

## Original Source
GeoNames Web Services
https://www.geonames.org/export/ws-overview.html

## Digest of GEONAMES_WS

# GeoNames Web Services Documentation

Retrieved: 2024-06-18

## 1. Authentication and Usage Limits
- Mandatory parameter: username (string, URL-encoded)
- Demo account: limited to sample links only; create your own via registration
- Daily credits per username: 10,000 free, 1,000/hour free; premium SLA available
- Secure endpoint: https://secure.geonames.org

## 2. Request Essentials
- Method: GET or POST
- Accept: XML or JSON (use JSON for browser-based JavaScript)
- URL encoding: required for string parameters containing spaces/special characters

## 3. Global Parameters
- type: xml | JSON (sets response format)
- style: SHORT, MEDIUM, LONG, FULL (default MEDIUM)
- maxRows: integer (default varies per service)
- lang: ISO-639-1 code (default en)

## 4. Postal Code Webservices

### 4.1 postalCodeSearch
Endpoint: /postalCodeSearch?postalcode={code}&username={u}&[options]
Parameters:
  postalcode (string) or placename (string) required
  placename_startsWith (string)
  postalcode_startsWith (string)
  country (ISO-3166 code), may repeat
  countryBias (ISO-3166 code)
  maxRows (int, default 10)
  operator (AND|OR, default AND)
  isReduced (true|false, default false free, true commercial)
  east, west, north, south (float bounding box)
Response: list of postal codes with fields: postalcode, placename, lat, lng, country code, adminName1, adminCode1, distance

### 4.2 postalCodeLookupJSON
Endpoint: /postalCodeLookupJSON?postalcode={code}&country={C}&username={u}&[maxRows]&[charset]&[callback]
Response: JSON array sorted by postalcode,placename

### 4.3 findNearbyPostalCodes
Endpoint: /findNearbyPostalCodes?lat={lat}&lng={lng}&username={u}&[radius]&[maxRows]&[style]&[country]&[localCountry]&[isReduced]
or: postalcode & country & radius & maxRows
Defaults: radius 30km free, 160km premium; maxRows 5 free, 2500 premium
Response: XML/JSON sorted by distance; Canada FSAs

### 4.4 postalCodeCountryInfo
Endpoint: /postalCodeCountryInfo?username={u}
Response: list of country codes with available postal code geocoding

## 5. Reverse Geocoding Services

### 5.1 findNearbyPlaceName
Endpoint: /findNearbyPlaceName?lat={lat}&lng={lng}&username={u}&[lang]&[radius]&[maxRows]&[style]&[localCountry]&[cities]
cities filter: cities1000|cities5000|cities15000
Response: nearest populated place with distance km

### 5.2 findNearby
Endpoint: /findNearby?lat={lat}&lng={lng}&username={u}&[featureClass]&[featureCode]&[radius]&[maxRows]&[style]&[localCountry]
Use multiple featureCode, exclude with !=
Response: list of toponyms

### 5.3 extendedFindNearby
Endpoint: /extendedFindNearby?lat={lat}&lng={lng}&username={u}
Response: combined services: address in US, hierarchy otherwise, ocean for oceans

## 6. Feature Services

### 6.1 get
Endpoint: /get?geonameId={id}&username={u}&[lang]&[style]
Response: full feature attributes

### 6.2 children, hierarchy, siblings, neighbours
Endpoints: /children?geonameId=..., /hierarchy?geonameId=..., /siblings?geonameId=..., /neighbours?geonameId=...
Responses: XML/JSON lists of features

## 7. Country and Administrative Services

### 7.1 countryInfo
Endpoint: /countryInfo?username={u}&[country]&[lang]
Response: capital, population, area, bounding box

### 7.2 countryCode
Endpoint: /countryCode?lat={lat}&lng={lng}&username={u}&[type]&[lang]&[radius]
type xml|JSON, default text; radius buffer km for coastal areas
Response: iso country code and name

### 7.3 countrySubdivision
Endpoint: /countrySubdivision?lat={lat}&lng={lng}&username={u}&[lang]&[radius]&[level]&[maxRows]
Response: administrative subdivisions

## 8. Ocean and Neighbourhood

### 8.1 ocean
Endpoint: /ocean?lat={lat}&lng={lng}&username={u}&[radius]
Response: ocean/sea name

### 8.2 neighbourhood
Endpoint: /neighbourhood?lat={lat}&lng={lng}&username={u}
Response: US neighbourhood

## 9. Elevation Services

Common: lat,lng, request method GET/POST, list of points via lats & lngs (max 20 free, 2000 premium)

### 9.1 srtm1
 Endpoint: /srtm1?lat=...&lng=... => elevation m or -32768 no data

### 9.2 srtm3
 Endpoint: /srtm3?lat=...&lng=... => elevation m or -32768

### 9.3 astergdem
 Endpoint: /astergdem?lat=...&lng=... => elevation m or -32768

### 9.4 gtopo30
 Endpoint: /gtopo30?lat=...&lng=... => elevation m or -9999

## 10. Timezone Service

### 10.1 timezone
Endpoint: /timezone?lat={lat}&lng={lng}&username={u}&[radius]&[lang]&[date]
Response fields: countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, gmtOffset(deprecated), dstOffset(deprecated)


## Attribution
- Source: GeoNames Web Services
- URL: https://www.geonames.org/export/ws-overview.html
- License: License
- Crawl Date: 2025-04-26T19:47:18.301Z
- Data Size: 908018 bytes
- Links Found: 3295

## Retrieved
2025-04-26
