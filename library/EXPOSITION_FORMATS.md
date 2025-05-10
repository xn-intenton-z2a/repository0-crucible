# EXPOSITION_FORMATS

## Crawl Summary
Inception April 2014; HTTP text-based exposition format; UTF-8, LF; Content-Type text/plain; version=0.0.4; optional gzip; line- oriented; HELP and TYPE directives; EBNF for samples; float values, NaN/+Inf/-Inf; timestamp ms since epoch; grouping rules; histogram and summary mapping (sum/count/buckets/quantiles); OpenMetrics superset (v2.23.0); Exemplars (v2.26.0 flag); Protobuf experimental flags (native-histograms, created-timestamp-zero-ingestion); legacy formats in client_model repo.

## Normalised Extract
Table of Contents
1 Basic Info
2 Text Format Specification
3 Sample Line EBNF
4 Grouping & Sorting
5 Histograms & Summaries Conventions
6 Text Format Example
7 OpenMetrics Text Format
8 Exemplars (Experimental)
9 Protobuf Format Flags
10 Historical Versions

1 Basic Info
Inception: April 2014
Supported in Prometheus ≥ 0.4.0
HTTP Transmission, UTF-8 encoding, LF line endings
Content-Type: text/plain; version=0.0.4
Optional gzip compression
Primitives: counter, gauge, histogram, summary, untyped

2 Text Format Specification
Lines separated by '\n'; last line must end with '\n'; empty lines ignored
Tokens separated by blanks/tabs; whitespace trimmed
Comments start with '#'; only HELP or TYPE directives processed

3 Sample Line EBNF
metric_name [ '{' label_name '=' '"' label_value '"' { ',' label_name '=' '"' label_value '"' } [ ',' ] '}' ] value [ timestamp ]
label_value escapes: '\\', '"', '\n'
value: Go ParseFloat syntax; NaN, +Inf, -Inf allowed
timestamp: int64 ms since epoch via Go ParseInt

4 Grouping & Sorting
Group by metric_name, directives (HELP/TYPE) first; unique label sets; reproducible sorting recommended

5 Histograms & Summaries Conventions
x_sum → sum sample
x_count → count sample
summary quantiles: x{quantile="q"}
histogram buckets: x_bucket{le="u"}; include le="+Inf"=x_count; ordered by u

6 Text Format Example
# HELP http_requests_total Total HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="post",code="200"} 1027 1395066363000
minimal_metric 12.47

7 OpenMetrics Text Format
Superset; v2.23.0; Content-Type application/openmetrics-text; version=1.0.0

8 Exemplars (Experimental)
Flag: --enable-feature=exemplar-storage (≥ 2.26.0)
Syntax: metric{...} value # {exemplar="<traceID>"}

9 Protobuf Format Flags
native-histograms (≥ 2.40.0)
created-timestamp-zero-ingestion (≥ 2.50.0)

10 Historical Versions
Legacy format in prometheus/client_model repo

## Supplementary Details
Content-Type negotiation: server sets 'Content-Type: text/plain; version=0.0.4; charset=UTF-8'.
Accept header optional; client uses GET /metrics.
Enable gzip: add 'Content-Encoding: gzip' header on response and compress payload.
Enable Exemplars: start Prometheus with '--enable-feature=exemplar-storage'.
Labels: ASCII alphanumeric, '_', ':'; first char [a-zA-Z_].
HELP escape: '\\'→'\\\\'; '\n'→'\\n'.
Value parsing: via Go strconv.ParseFloat(bitSize=64).
Timestamp parse: strconv.ParseInt(base=10, bitSize=64).
OpenMetrics Content-Type: 'application/openmetrics-text; version=1.0.0; charset=UTF-8'.
Protobuf endpoint: GET /metrics/protobuf when experimental features enabled.


## Reference Details
HTTP Exposition Endpoint
--
Request: GET /metrics
Response headers:
  Content-Type: text/plain; version=0.0.4; charset=UTF-8
  Content-Encoding: gzip (if enabled)
Status: 200

cURL Example:
  curl -H 'Accept: text/plain; version=0.0.4' http://localhost:9090/metrics

Best Practices
--
• Group metrics by type and label set for efficient ingestion.
• Include HELP and TYPE directives before samples.
• Sort metrics lexicographically by name and labels when cost permits.
• Always include le="+Inf" bucket for histograms.

Troubleshooting
--
Symptom: Missing TYPE lines lead to untyped metrics.
Check: Ensure '# TYPE <metric> <type>' appears before samples.

Symptom: Invalid label escapes.
Check: Backslashes and quotes must be escaped in HELP and sample lines.

Symptom: No metrics returned via curl.
Command: curl -v http://localhost:9090/metrics
Expect: HTTP/1.1 200 OK with correct Content-Type.


SDK Integration Pattern
--
1. Instrument code to collect values.
2. Expose '/metrics' HTTP handler returning exposition format.
3. Use client library to format samples per syntax.
4. Configure Prometheus scrape job targeting '/metrics'.


## Information Dense Extract
Prometheus text format: HTTP GET /metrics, Content-Type text/plain; version=0.0.4; UTF-8, LF. Lines: '\n'-terminated; blank ignored; tokens whitespace-delimited. Comments '#' only HELP/TYPE processed: HELP <name> <UTF-8 docstring> (escape \\ → \\\\, \n → \\n); TYPE <name> <counter|gauge|histogram|summary|untyped>. Sample: metric [ {k="v"…} ] value [timestamp ms]. value as Go ParseFloat; timestamp as Go ParseInt. Group HELP/TYPE then samples; unique metric+labels; optional sorting. Histogram: x_sum, x_count, x_bucket{le="…"}, include +Inf bucket; Summary: x{quantile="…"}, x_sum, x_count. OpenMetrics superset v1.0.0; exemplars via --enable-feature=exemplar-storage; protobuf flags native-histograms, created-timestamp-zero-ingestion. Troubleshoot via curl -v, verify directives and escapes.

## Sanitised Extract
Table of Contents
1 Basic Info
2 Text Format Specification
3 Sample Line EBNF
4 Grouping & Sorting
5 Histograms & Summaries Conventions
6 Text Format Example
7 OpenMetrics Text Format
8 Exemplars (Experimental)
9 Protobuf Format Flags
10 Historical Versions

1 Basic Info
Inception: April 2014
Supported in Prometheus  0.4.0
HTTP Transmission, UTF-8 encoding, LF line endings
Content-Type: text/plain; version=0.0.4
Optional gzip compression
Primitives: counter, gauge, histogram, summary, untyped

2 Text Format Specification
Lines separated by ''n'; last line must end with ''n'; empty lines ignored
Tokens separated by blanks/tabs; whitespace trimmed
Comments start with '#'; only HELP or TYPE directives processed

3 Sample Line EBNF
metric_name [ '{' label_name '=' ''' label_value ''' { ',' label_name '=' ''' label_value ''' } [ ',' ] '}' ] value [ timestamp ]
label_value escapes: '''', ''', ''n'
value: Go ParseFloat syntax; NaN, +Inf, -Inf allowed
timestamp: int64 ms since epoch via Go ParseInt

4 Grouping & Sorting
Group by metric_name, directives (HELP/TYPE) first; unique label sets; reproducible sorting recommended

5 Histograms & Summaries Conventions
x_sum  sum sample
x_count  count sample
summary quantiles: x{quantile='q'}
histogram buckets: x_bucket{le='u'}; include le='+Inf'=x_count; ordered by u

6 Text Format Example
# HELP http_requests_total Total HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method='post',code='200'} 1027 1395066363000
minimal_metric 12.47

7 OpenMetrics Text Format
Superset; v2.23.0; Content-Type application/openmetrics-text; version=1.0.0

8 Exemplars (Experimental)
Flag: --enable-feature=exemplar-storage ( 2.26.0)
Syntax: metric{...} value # {exemplar='<traceID>'}

9 Protobuf Format Flags
native-histograms ( 2.40.0)
created-timestamp-zero-ingestion ( 2.50.0)

10 Historical Versions
Legacy format in prometheus/client_model repo

## Original Source
Prometheus Exposition Format
https://prometheus.io/docs/instrumenting/exposition_formats/

## Digest of EXPOSITION_FORMATS

# Exposition Formats   
Date Retrieved: 2024-06-10

## Text-based Format – Basic Info

| Aspect                   | Value                                     |
|--------------------------|-------------------------------------------|
| Inception                | April 2014                                 |
| Prometheus Support       | >= 0.4.0                                   |
| Transmission             | HTTP                                       |
| Encoding                 | UTF-8, LF (\n) line endings               |
| HTTP Content-Type        | text/plain; version=0.0.4                  |
| HTTP Content-Encoding    | gzip (optional)                            |
| Primitives               | counter, gauge, histogram, summary, untyped |

## Text Format Specification

• Lines separated by '\n'; last line must end with '\n'. Empty lines ignored.
• Tokens separated by blanks/tabs; leading/trailing whitespace ignored.

### Comments, HELP, TYPE

• Lines starting with '#' ignored unless second token is HELP or TYPE.
• HELP <metric_name> <docstring>  
  – Docstring: UTF-8; escape '\\' as '\\\\', '\n' as '\\n'.  
  – One HELP per metric.
• TYPE <metric_name> <type>  
  – Type ∈ {counter,gauge,histogram,summary,untyped}.  
  – Must appear before samples; one TYPE per metric; default untyped.

### Sample Line Syntax (EBNF)

metric_name [ '{' label_name '=' '"' label_value '"' { ',' label_name '=' '"' label_value '"' } [ ',' ] '}' ] value [ timestamp ]

• metric_name, label_name follow Prometheus naming rules.
• label_value: escape '\\' → '\\\\', '"' → '\\"', '\n' → '\\n'.
• value: float per Go ParseFloat; NaN, +Inf, -Inf allowed.
• timestamp: int64 ms since epoch per Go ParseInt.

## Grouping & Sorting

• All lines for a metric grouped; HELP/TYPE first.
• Unique metric_name + label set per line; duplication = undefined.
• Sorting optional but recommended for reproducibility.

## Histograms & Summaries Conventions

For metric x:
• x_sum → cumulative sum sample.
• x_count → sample count.
• summary quantiles: x{quantile="q"} qvalue.
• histogram buckets: x_bucket{le="u"} count; must include le="+Inf" with count = x_count.
• Buckets/quantiles in increasing order of label value.

## Text Format Example

# HELP http_requests_total Total HTTP requests.  
# TYPE http_requests_total counter  
http_requests_total{method="post",code="200"} 1027 1395066363000  
http_requests_total{method="post",code="400"} 3 1395066363000

# Minimal:  
minimal_metric 12.47

## OpenMetrics Text Format

• Superset of Prometheus format.  
• Introduced in v2.23.0.  
• HTTP Content-Type: application/openmetrics-text; version=1.0.0.

## Exemplars (Experimental)

• Requires Prometheus ≥ 2.26.0 and --enable-feature=exemplar-storage.
• Sample: metric_name{le="..."} value # {exemplar="<traceID>"}

## Protobuf Format (Deprecated/Experimental)

• Original Protobuf deprecated in v2.0.  
• Experimental re-enable via feature flags:  
  – native-histograms (≥ 2.40.0)  
  – created-timestamp-zero-ingestion (≥ 2.50.0)

## Historical Versions

• Legacy Client Data Exposition Format in prometheus/client_model repo.



## Attribution
- Source: Prometheus Exposition Format
- URL: https://prometheus.io/docs/instrumenting/exposition_formats/
- License: License: CC-BY-4.0
- Crawl Date: 2025-05-10T03:59:37.289Z
- Data Size: 25035766 bytes
- Links Found: 28452

## Retrieved
2025-05-10
