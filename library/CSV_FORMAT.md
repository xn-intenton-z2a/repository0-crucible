# CSV_FORMAT

## Crawl Summary
Records delimited by CRLF; optional header line matching field count; fields separated by comma; fields containing CRLF, comma, or DQUOTE must be enclosed in DQUOTE; embedded DQUOTE escaped by doubling; ABNF grammar defines file, header, record, field; MIME type text/csv registered with optional charset and header parameters.

## Normalised Extract
Table of Contents:
1. Record Delimiter
2. Header Line
3. Field Separation
4. Field Enclosure & Escape
5. MIME Parameters
6. ABNF Grammar

1. Record Delimiter
   • Terminator: CRLF (0x0D 0x0A)
   • Last record may omit CRLF

2. Header Line
   • Optional first line with same format as records
   • Field count constant across file
   • Indicated by header=present or header=absent

3. Field Separation
   • Delimiter: comma (0x2C)
   • Spaces significant
   • No comma after final field

4. Field Enclosure & Escape
   • Unescaped fields: only TEXTDATA (0x20-21,0x23-2B,0x2D-7E)
   • Escaped field: DQUOTE ... DQUOTE
     – Allowed content: TEXTDATA, COMMA, CR, LF, 2DQUOTE
     – Embedded quote: represented as two DQUOTE
   • Examples:
     – "a,b" → field contains comma
     – "a\n b" → field contains CRLF
     – "a""b" → field contains quote

5. MIME Parameters
   • charset: default US-ASCII; any IANA text charset
   • header: present | absent; absence requires implementor default
   • encoding: CRLF as per RFC2046; implementations may vary

6. ABNF Grammar
   • file, header, record, name, field, escaped, non-escaped
   • Definitions for COMMA, CR, LF, CRLF, DQUOTE, TEXTDATA

## Supplementary Details
Parameter Values:
- CR: 0x0D
- LF: 0x0A
- COMMA: 0x2C
- DQUOTE: 0x22
- TEXTDATA: 0x20-21, 0x23-2B, 0x2D-7E

MIME Parameters and Defaults:
- charset: US-ASCII (default); values e.g. UTF-8, ISO-8859-1
- header: absent (default); valid values present, absent

Implementation Steps:
1. Read input in binary or text preserving CRLF.
2. Split on CRLF sequence, handling missing final CRLF.
3. For each line, scan fields:
   a. If starts DQUOTE, read until closing DQUOTE, interpreting "" as ".
   b. Else read until comma.
4. Trim nothing; spaces preserved.
5. Emit array of fields; verify uniform length or raise error.
6. If header=present, extract first record as keys.

Concrete Examples:
- Line: ""a,b"","c""d""
  Fields: ["a,b", "c""d"]
- Line: a,b,c
  Fields: ["a","b","c"]

## Reference Details
MIME Type Registration (RFC 4180):
- media type: text/csv
- parameters:
   • charset=US-ASCII | IANA-text; default US-ASCII
   • header=present | absent
- per RFC2046, line breaks = CRLF
- file extension .csv
- no magic number

ABNF Grammar (repeat from Detailed Digest)

Parsing Best Practices:
- Conservative parsing: accept lone LF, stray CR before LF.
- Reject records with mismatched quote count.
- Stream parse to handle large files; use state machine.

Troubleshooting Procedures:
1. Identify unbalanced quotes:
   $ awk -F '"' '{ if (NR%2==0) print NR }' file.csv
2. Detect inconsistent field count:
   $ awk -F',' '{ print NF }' file.csv | uniq -c
3. Validate CRLF usage:
   $ grep -UPO '\r(?!\n)' file.csv
4. Convert lone LF to CRLF:
   $ sed -e 's/\([^]\)\n/\1\r\n/g' input.csv > fixed.csv

## Information Dense Extract
Record=CRLF-delimited lines; optional header with same field count; delimiter=comma; fields: TEXTDATA or DQUOTE-escaped containing comma,CRLF,DQUOTE; embedded DQUOTE=2DQUOTE; CR=0x0D LF=0x0A COMMA=0x2C DQUOTE=0x22 TEXTDATA=0x20-21/0x23-2B/0x2D-7E. ABNF: file=[header CRLF] record*(CRLF record)[CRLF], field=escaped/non-escaped, escaped=DQUOTE*(TEXTDATA/COMMA/CR/LF/2DQUOTE)DQUOTE. MIME text/csv; params charset=IANA-text default US-ASCII; header=present|absent. Implement: split on CRLF, parse fields by state machine, preserve spaces, handle escapes. Troubleshoot with awk/sed/grep to find unbalanced quotes, inconsistent fields, lone LFs.

## Sanitised Extract
Table of Contents:
1. Record Delimiter
2. Header Line
3. Field Separation
4. Field Enclosure & Escape
5. MIME Parameters
6. ABNF Grammar

1. Record Delimiter
    Terminator: CRLF (0x0D 0x0A)
    Last record may omit CRLF

2. Header Line
    Optional first line with same format as records
    Field count constant across file
    Indicated by header=present or header=absent

3. Field Separation
    Delimiter: comma (0x2C)
    Spaces significant
    No comma after final field

4. Field Enclosure & Escape
    Unescaped fields: only TEXTDATA (0x20-21,0x23-2B,0x2D-7E)
    Escaped field: DQUOTE ... DQUOTE
      Allowed content: TEXTDATA, COMMA, CR, LF, 2DQUOTE
      Embedded quote: represented as two DQUOTE
    Examples:
      'a,b'  field contains comma
      'a'n b'  field contains CRLF
      'a''b'  field contains quote

5. MIME Parameters
    charset: default US-ASCII; any IANA text charset
    header: present | absent; absence requires implementor default
    encoding: CRLF as per RFC2046; implementations may vary

6. ABNF Grammar
    file, header, record, name, field, escaped, non-escaped
    Definitions for COMMA, CR, LF, CRLF, DQUOTE, TEXTDATA

## Original Source
Data Serialization & Templating
https://tools.ietf.org/html/rfc4180

## Digest of CSV_FORMAT

# Definition of CSV Format

1. Each record on a separate line terminated by CRLF (0x0D 0x0A).
   - Example: aaa,bbb,ccc␍␊

2. Last record may omit terminating CRLF.
   - Example: zzz,yyy,xxx (no CRLF)

3. Optional header line as first record; indicated by "header" MIME parameter.
   - Field count in header matches all subsequent records.
   - Example: field1,field2,field3␍␊

4. Fields separated by comma (0x2C). Spaces are part of field data.
   - No trailing comma after last field.
   - Example: aaa,bbb,ccc

5. Field enclosure:
   - Unenclosed fields must not contain double quotes (0x22).
   - Enclose fields containing CRLF, comma, or double quote in double quotes.
   - Escape embedded quotes by doubling them ("" becomes one quote).
   - Examples:
     • "aaa","b CRLF
       bb","ccc"␍␊
     • "aaa","b""bb","ccc"

# MIME Type Registration (text/csv)

- Type: text
- Subtype: csv
- Required parameters: none
- Optional parameters:
  • charset: IANA text character set (default US-ASCII)
  • header: present | absent
- Encoding: uses CRLF for line breaks; other line break values may occur in practice.
- File extension: .csv
- Magic number: none
- IANA registered October 2005

# ABNF Grammar

```
file = [ header CRLF ] record *( CRLF record ) [ CRLF ]
header = name *( COMMA name )
record = field *( COMMA field )
name = field
field = escaped / non-escaped
escaped = DQUOTE *( TEXTDATA / COMMA / CR / LF / 2DQUOTE ) DQUOTE
non-escaped = *TEXTDATA
COMMA = %x2C
CR = %x0D
LF = %x0A
CRLF = CR LF
DQUOTE = %x22
TEXTDATA = %x20-21 / %x23-2B / %x2D-7E
```

## Attribution
- Source: Data Serialization & Templating
- URL: https://tools.ietf.org/html/rfc4180
- License: License: MIT
- Crawl Date: 2025-05-15T18:28:15.156Z
- Data Size: 843502 bytes
- Links Found: 1116

## Retrieved
2025-05-15
