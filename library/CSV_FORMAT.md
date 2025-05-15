# CSV_FORMAT

## Crawl Summary
Records on separate lines delimited by CRLF. Optional header line matching record format, indicated by header parameter (present|absent). Fields separated by comma, fixed count, spaces significant. Fields optionally enclosed in double-quotes. Fields with CRLF, comma, or quotes must be quoted; embedded quotes doubled. ABNF grammar defines file, header, record, field, escaped/non-escaped. MIME type text/csv registered with optional charset, header parameters, CRLF encoding, .csv extension.

## Normalised Extract
Table of Contents
1. Record Delimitation
2. Header Line
3. Field Separation
4. Field Enclosure and Quoting
5. Escaping Rules
6. ABNF Grammar
7. MIME Type Registration

1. Record Delimitation
Each record ends with CRLF (\r\n). Last record may omit final CRLF.

2. Header Line
Optional first line with same comma-separated format. Controlled by header present|absent parameter.

3. Field Separation
Fields separated by comma (0x2C). No trailing comma after final field. All lines must have same number of fields. Spaces are part of field data.

4. Field Enclosure and Quoting
Fields may be enclosed in double-quote (0x22). Unquoted fields cannot contain quotes. Fields containing CRLF, comma, or quotes must be quoted.

5. Escaping Rules
Within quoted field, each internal double-quote must be represented as two consecutive double-quote characters.

6. ABNF Grammar
file    = [header CRLF] record *(CRLF record) [CRLF]
header  = name *(COMMA name)
record  = field *(COMMA field)
field   = (escaped / non-escaped)
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA

7. MIME Type Registration
media-type: text/csv
optional parameters: charset=IANA-text (default US-ASCII), header=present|absent
line break encoding: CRLF
file extension: .csv

## Supplementary Details
Parameter: charset
- Valid values: US-ASCII, UTF-8, ISO-8859-1, ... (IANA text charsets)
- Default: US-ASCII

Parameter: header
- Values: present, absent
- Default: absent (implementor-defined if omitted)

File extension: .csv
MIME type: text/csv
Line break: CRLF
Encoding considerations: use CRLF; accept LF or CR only when interoperating
Security: sanitize fields before embedding in applications; guard against buffer overruns
Interoperability: implement robust parser accepting optional presence of header; trim unquoted trailing spaces not recommended

## Reference Details
MIME Media Type Registration text/csv
Parameters:
- charset: token (IANA text charsets), default US-ASCII
- header: "present" | "absent"; implementors must decide default when absent
Encoding: lines terminated by 0x0D 0x0A (CRLF)
File extension: .csv; no magic number

ABNF Definitions:
CR = %x0D; LF = %x0A; COMMA = %x2C; DQUOTE = %x22; TEXTDATA = %x20-21 / %x23-2B / %x2D-7E
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA

Concrete Parsing Pattern (pseudocode):
Initialize empty list of records
For each character in input:
  If at start of record, read until CRLF, respecting quoted spans
  Split record on commas outside quotes
  For each field:
    If field starts and ends with DQUOTE, remove outer quotes, replace "" with " inside
Verify number of fields consistent across records

Troubleshooting Commands:
Check inconsistent field counts:
awk -F',' 'NR==1{n=NF} NF!=n{print "Line " NR " has " NF " fields"}' file.csv
Normalize line endings to CRLF:
dos2unix -ascii file.csv; unix2dos file.csv

Best Practices:
- Always quote fields containing delimiter, quotes, or line breaks
- Use header parameter to explicitly declare header presence
- Validate field counts programmatically before ingestion

## Information Dense Extract
Records: CRLF-delimited lines; optional header matching record format; fields separated by comma; spaces part of data; no trailing comma; fields optionally quoted with "; quoted fields for values containing comma, CRLF, "; inside quoted, use double " to escape; ABNF grammar provided; MIME type text/csv with optional charset=IANA-text (default US-ASCII), header=present|absent; CRLF encoding; extension .csv; parser must enforce consistent field count; best practice: conservative parsing, liberal production.

## Sanitised Extract
Table of Contents
1. Record Delimitation
2. Header Line
3. Field Separation
4. Field Enclosure and Quoting
5. Escaping Rules
6. ABNF Grammar
7. MIME Type Registration

1. Record Delimitation
Each record ends with CRLF ('r'n). Last record may omit final CRLF.

2. Header Line
Optional first line with same comma-separated format. Controlled by header present|absent parameter.

3. Field Separation
Fields separated by comma (0x2C). No trailing comma after final field. All lines must have same number of fields. Spaces are part of field data.

4. Field Enclosure and Quoting
Fields may be enclosed in double-quote (0x22). Unquoted fields cannot contain quotes. Fields containing CRLF, comma, or quotes must be quoted.

5. Escaping Rules
Within quoted field, each internal double-quote must be represented as two consecutive double-quote characters.

6. ABNF Grammar
file    = [header CRLF] record *(CRLF record) [CRLF]
header  = name *(COMMA name)
record  = field *(COMMA field)
field   = (escaped / non-escaped)
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA

7. MIME Type Registration
media-type: text/csv
optional parameters: charset=IANA-text (default US-ASCII), header=present|absent
line break encoding: CRLF
file extension: .csv

## Original Source
Data Serialization & Templating
https://tools.ietf.org/html/rfc4180

## Digest of CSV_FORMAT

# Introduction

Specification of Comma-Separated Values (CSV) files, formal registration of MIME type text/csv.

# Definition of the CSV Format

1. Records: one per line, delimited by CRLF (\r\n).
   Example:
   aaa,bbb,ccc CRLF
   zzz,yyy,xxx CRLF

2. Last record: may lack trailing CRLF.

3. Optional header line with same format as records, indicated by header parameter.
   Example:
   field1,field2,field3 CRLF
   aaa,bbb,ccc CRLF

4. Fields separated by commas; all lines same field count; spaces significant; no trailing comma after last field.

5. Quoting: optional double-quote enclosure. Unquoted fields must not contain quotes.
   Example: “aaa”,“bbb”,“ccc” CRLF

6. Fields with CRLF, commas or quotes must be quoted.
   Example:
   "a","b CRLF
   b","c" CRLF

7. Inside quoted field, double-quote escaped by doubling.
   Example: "a","b""b","c"

# ABNF Grammar

file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
name = field
field = (escaped / non-escaped)
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA = %x2C
CR = %x0D
LF = %x0A
CRLF = CR LF
DQUOTE = %x22
TEXTDATA = %x20-21 / %x23-2B / %x2D-7E

# MIME Type Registration (text/csv)

Media Type Name: text
Subtype: csv
Required Parameters: none
Optional Parameters:
- charset: IANA text charsets (default US-ASCII)
- header: present | absent

Encoding: CRLF for line breaks
File Extension: .csv
Macintosh Type Code: TEXT

# Security, Interoperability

Security: passive text; risk of buffer overruns via malicious data
Interoperability: be conservative in accept, liberal in produce; treat header param per implementation


## Attribution
- Source: Data Serialization & Templating
- URL: https://tools.ietf.org/html/rfc4180
- License: License: MIT
- Crawl Date: 2025-05-15T12:29:33.841Z
- Data Size: 1314478 bytes
- Links Found: 1269

## Retrieved
2025-05-15
