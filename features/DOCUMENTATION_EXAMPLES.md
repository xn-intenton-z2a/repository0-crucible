# Documentation Examples with Embedded Charts

Provide example commands and embedded PNG images in documentation for convergence and benchmark chart features.

# Docs/USAGE.md Updates

Add example sections under Convergence Data Export and Benchmark Example. Include shell commands and embed sample PNG images.

Convergence Data Export Example

```bash
node src/lib/main.js --digits 5 --convergence-data data.json --chart chart.png
```

Embed sample convergence chart

![Convergence Chart Example](https://example.com/docs/convergence-sample.png)

Benchmark Example

```bash
node src/lib/main.js --benchmark --digits 2 --benchmark-chart perf.png
```

Embed sample benchmark chart

![Benchmark Chart Example](https://example.com/docs/benchmark-sample.png)

# README.md Updates

In Features list include inline thumbnails for convergence and benchmark charts:

- Convergence Data Export: thumbnail ![Convergence](https://example.com/docs/convergence-sample.png)
- Benchmark Chart Generation: thumbnail ![Benchmark](https://example.com/docs/benchmark-sample.png)