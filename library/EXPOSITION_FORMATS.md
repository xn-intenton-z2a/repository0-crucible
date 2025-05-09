# EXPOSITION_FORMATS

## Crawl Summary
Inception April 2014; Prometheus ≥0.4.0; HTTP GET; UTF-8+LF; Content-Type text/plain; version=0.0.4; optional gzip. Line format: LF-terminated, whitespace-insensitive. # HELP and # TYPE syntax. Sample EBNF: metric_name{labels} value [timestamp]. label_value escapes: \\, \" , \n. value via Go ParseFloat, supports NaN,+Inf,-Inf. timestamp int64 ms epoch. Group by metric, unique name+labels. Histograms: x_bucket{le}, x_sum, x_count, le="+Inf" last. Summaries: x{quantile}, x_sum, x_count. OpenMetrics since v2.23.0. Exemplars:{--enable-feature=exemplar-storage} in v2.26.0. Protobuf feature flags: native-histograms(2.40.0), created-timestamp-zero-ingestion(2.50.0).

## Normalised Extract
Table of Contents
 1 Basic Info
 2 HTTP Transmission
 3 Encoding & Content-Type
 4 Line Format Rules
 5 HELP & TYPE Lines
 6 Sample Syntax
 7 Label Value Escaping
 8 Value & Timestamp Types
 9 Grouping & Sorting
 10 Histogram Conventions
 11 Summary Conventions
 12 OpenMetrics Text Format
 13 Exemplars Feature
 14 Protobuf Exposition Flags

1 Basic Info
 Inception: April 2014
 Supported: Prometheus ≥0.4.0

2 HTTP Transmission
 Method: GET
 Path: user-defined (commonly /metrics)

3 Encoding & Content-Type
 Encoding: UTF-8, LF endings
 Required Header: Content-Type: text/plain; version=0.0.4
 Optional Header: Content-Encoding: gzip

4 Line Format Rules
 Lines end with LF. Final LF required.
 Split tokens with spaces or tabs. Ignore leading/trailing whitespace.
 Empty lines ignored.

5 HELP & TYPE Lines
 HELP syntax: # HELP <metric_name> <docstring>
  Escape in docstring: \\ for backslash, \n for newline
 TYPE syntax: # TYPE <metric_name> <type>
  Types: counter, gauge, histogram, summary, untyped
  Must appear before samples. Default=untyped

6 Sample Syntax
 EBNF: metric_name [ {labels} ] value [ timestamp ]
 Labels block: {name="value",...}

7 Label Value Escaping
 Backslash: \\
 Double-quote: \"
 Newline: \n

8 Value & Timestamp Types
 Value: float per Go ParseFloat; supports NaN,+Inf,-Inf
 Timestamp: int64 ms since 1970-01-01 UTC; Go ParseInt

9 Grouping & Sorting
 Group by metric_name; HELP and TYPE first
 Unique name+label combos required
 Sorting deterministic but optional

10 Histogram Conventions
 For histogram x:
  x_bucket{le="y"} count
  x_sum value
  x_count count
 Include le="+Inf"=x_count
 Buckets sorted by le ascending

11 Summary Conventions
 For summary x:
  x{quantile="y"} value
  x_sum value
  x_count count
 Quantiles sorted by y ascending

12 OpenMetrics Text Format
 Version: ≥2.23.0
 Same syntax plus metric-family boundary markers

13 Exemplars Feature
 Enable in ≥2.26.0 with flag --enable-feature=exemplar-storage

14 Protobuf Exposition Flags
 native-histograms (2.40.0)
 created-timestamp-zero-ingestion (2.50.0)

## Supplementary Details
Parameter Defaults and Effects
- Content-Type default version fallback: latest text format
- gzip encoding reduces payload size

Implementation Steps to Expose Metrics
1 Create HTTP handler at /metrics
2 Set Header Content-Type: text/plain; version=0.0.4
3 Optionally compress with gzip
4 Write HELP and TYPE lines per metric
5 Emit sample lines per syntax
6 Ensure final LF
7 For histograms/summaries follow conventions
8 Deploy server

Exemplar Enablement
- CLI flag: --enable-feature=exemplar-storage (requires v2.26.0+)

Protobuf Reenablement
- Add flags during startup:
  --enable-feature=native-histograms
  --enable-feature=created-timestamp-zero-ingestion

Label Escaping Implementation
 Use string replace: 
  s = strings.ReplaceAll(s, "\\", "\\\\")
  s = strings.ReplaceAll(s, "\n", "\\n")
  s = strings.ReplaceAll(s, "\"", "\\\"")

## Reference Details
Go HTTP Handler Example
```go
func metricsHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain; version=0.0.4")
    if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
        w.Header().Set("Content-Encoding", "gzip")
        gz := gzip.NewWriter(w)
        defer gz.Close()
        w = gzipResponseWriter{Writer: gz, ResponseWriter: w}
    }
    // HELP and TYPE
    fmt.Fprintf(w, "# HELP http_requests_total Total HTTP requests.\n")
    fmt.Fprintf(w, "# TYPE http_requests_total counter\n")
    // Samples
    fmt.Fprintf(w, "http_requests_total{method=\"GET\",code=\"200\"} 1027 %d\n", time.Now().UnixMilli())
}
```

CLI Configuration Options
- --web.listen-address=string (default ":9090"): address to listen on
- --web.telemetry-path=string (default "/metrics"): path under which to expose metrics
- --enable-feature=string: enable experimental features

Best Practices
- Always terminate output with LF
- Group metrics by type
- Use consistent bucket boundaries
- Escape label keys/values properly

Troubleshooting Commands
1 Verify endpoint:
   curl -v localhost:9090/metrics
   Expect HTTP/1.1 200 OK, Content-Type header, LF-terminated body
2 Check for missing TYPE lines:
   grep "^http_.*" metrics.txt | sort
3 Validate escaping:
   echo "# HELP" | grep "\\n" 


## Information Dense Extract
Inception:2014;Prometheus≥0.4.0;HTTP GET;UTF-8+LF;Content-Type:text/plain;version=0.0.4;gzip optional;Line rules:LF-terminated,token space/tab,ignore whitespace;HELP:#HELP<metric> <doc>;TYPE:#TYPE<metric> <counter|gauge|histogram|summary|untyped>;Sample syntax:metric_name{labels} value [timestamp];label_value escape:\\,\",\n;value:Go Float Parse;timestamp:int64 ms epoch;Group by metric,unique labels;Histogram:x_bucket{le="y"},x_sum,x_count;le="+Inf" last;Summary:x{quantile="y"},x_sum,x_count;OpenMetrics≥2.23.0;Exemplars:--enable-feature=exemplar-storage v2.26.0+;Protobuf flags:native-histograms(2.40.0),created-timestamp-zero-ingestion(2.50.0)

## Sanitised Extract
Table of Contents
 1 Basic Info
 2 HTTP Transmission
 3 Encoding & Content-Type
 4 Line Format Rules
 5 HELP & TYPE Lines
 6 Sample Syntax
 7 Label Value Escaping
 8 Value & Timestamp Types
 9 Grouping & Sorting
 10 Histogram Conventions
 11 Summary Conventions
 12 OpenMetrics Text Format
 13 Exemplars Feature
 14 Protobuf Exposition Flags

1 Basic Info
 Inception: April 2014
 Supported: Prometheus 0.4.0

2 HTTP Transmission
 Method: GET
 Path: user-defined (commonly /metrics)

3 Encoding & Content-Type
 Encoding: UTF-8, LF endings
 Required Header: Content-Type: text/plain; version=0.0.4
 Optional Header: Content-Encoding: gzip

4 Line Format Rules
 Lines end with LF. Final LF required.
 Split tokens with spaces or tabs. Ignore leading/trailing whitespace.
 Empty lines ignored.

5 HELP & TYPE Lines
 HELP syntax: # HELP <metric_name> <docstring>
  Escape in docstring: '' for backslash, 'n for newline
 TYPE syntax: # TYPE <metric_name> <type>
  Types: counter, gauge, histogram, summary, untyped
  Must appear before samples. Default=untyped

6 Sample Syntax
 EBNF: metric_name [ {labels} ] value [ timestamp ]
 Labels block: {name='value',...}

7 Label Value Escaping
 Backslash: ''
 Double-quote: ''
 Newline: 'n

8 Value & Timestamp Types
 Value: float per Go ParseFloat; supports NaN,+Inf,-Inf
 Timestamp: int64 ms since 1970-01-01 UTC; Go ParseInt

9 Grouping & Sorting
 Group by metric_name; HELP and TYPE first
 Unique name+label combos required
 Sorting deterministic but optional

10 Histogram Conventions
 For histogram x:
  x_bucket{le='y'} count
  x_sum value
  x_count count
 Include le='+Inf'=x_count
 Buckets sorted by le ascending

11 Summary Conventions
 For summary x:
  x{quantile='y'} value
  x_sum value
  x_count count
 Quantiles sorted by y ascending

12 OpenMetrics Text Format
 Version: 2.23.0
 Same syntax plus metric-family boundary markers

13 Exemplars Feature
 Enable in 2.26.0 with flag --enable-feature=exemplar-storage

14 Protobuf Exposition Flags
 native-histograms (2.40.0)
 created-timestamp-zero-ingestion (2.50.0)

## Original Source
Prometheus Exposition Formats
https://prometheus.io/docs/instrumenting/exposition_formats/

## Digest of EXPOSITION_FORMATS

# Prometheus Exposition Formats

## Basic Info

- Inception: April 2014
- Supported in Prometheus version >= 0.4.0
- Transmission: HTTP GET
- Encoding: UTF-8 with LF (\n) line endings
- HTTP Content-Type: text/plain; version=0.0.4 (absent version defaults to latest)
- Optional HTTP Content-Encoding: gzip

## Text Format Details

- Line oriented: lines separated by LF, final line must end in LF
- Tokens separated by spaces or tabs (at least one to prevent merging)
- Leading/trailing whitespace ignored

### Comments, HELP, TYPE Lines

- Lines starting with '#' ignored except when second token is HELP or TYPE
- HELP syntax: `# HELP <metric_name> <docstring>`
  - Backslash and LF in docstring escaped as `\\` and `\n`
- TYPE syntax: `# TYPE <metric_name> <type>` where type ∈ {counter, gauge, histogram, summary, untyped}
  - Must precede any sample for that metric
  - Default type: untyped

### Sample Line Syntax (EBNF)

metric_name ["{" label_name "=" '"' label_value '"' {"," label_name "=" '"' label_value '"'} [","] "}"] value [timestamp]

- label_value: UTF-8, escape `\\`, `\"`, `\n`
- value: Go ParseFloat valid, supports NaN, +Inf, -Inf
- timestamp: int64 ms since epoch, Go ParseInt

## Grouping and Sorting

- All lines for one metric grouped; HELP and TYPE first
- Unique metric_name+labels combination per sample
- Sorting recommended but not required

## Histograms and Summaries Conventions

- Histogram x: produce x_bucket{le="y"}, x_sum, x_count
  - Must include bucket le="+Inf" equal to x_count
  - Buckets sorted by le
- Summary x: produce x{quantile="y"}, x_sum, x_count
  - Quantiles sorted by quantile

## OpenMetrics Text Format

- Standardized on top of Prometheus text format since v2.23.0

## Exemplars (Experimental)

- Version ≥ v2.26.0, enable with `--enable-feature=exemplar-storage`

## Protobuf Format (Experimental)

- Deprecated in 2.0, reintroduced via feature flags:
  - native-histograms: 2.40.0
  - created-timestamp-zero-ingestion: 2.50.0

## Historical Versions

- Legacy Client Data Exposition Format in prometheus/client_model repository (current Protobuf with native histograms)

_Retrieved: 2025-04-05_
Data Size: 17302386 bytes
Attribution: Prometheus Authors 2014–2025

## Attribution
- Source: Prometheus Exposition Formats
- URL: https://prometheus.io/docs/instrumenting/exposition_formats/
- License: Unknown
- Crawl Date: 2025-05-09T23:57:45.396Z
- Data Size: 17302386 bytes
- Links Found: 17634

## Retrieved
2025-05-09
