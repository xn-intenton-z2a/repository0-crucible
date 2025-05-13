# Overview

Provide sample PNG convergence and benchmark charts and embed them directly in the README documentation so users can immediately see example outputs without running the tool themselves.

# Implementation

1. CLI Extension
   • Extend the CLI to accept a new boolean flag --embed-sample-charts.  
   • When this flag is passed, generate two example charts using existing charting logic:  
     – Sample convergence chart with default parameters (digits=5, algorithm=leibniz).  
     – Sample benchmark chart comparing durationMs across all algorithms at digits=5.  
   • Write the generated PNG buffers to docs/images/sample-convergence.png and docs/images/sample-benchmark.png, creating the docs/images directory if it does not exist.  
   • After writing, print to console the file paths of the embedded images and exit.

2. Script Addition
   • In package.json add a new script "generate-sample-charts" that invokes the CLI with --embed-sample-charts.

# Testing

1. Unit Tests
   • In tests/unit/main.test.js, mock fs and canvas to verify that writeFileSync is called twice with the correct output paths.  
   • Test that when main is called with ["--embed-sample-charts"], it logs the two output paths and exits without error.

# Documentation

1. README.md Update
   • Under Features, add a **Sample Charts** section.  
   • Embed the generated images using markdown image syntax:  
     ![Sample Convergence Chart](docs/images/sample-convergence.png)  
     ![Sample Benchmark Chart](docs/images/sample-benchmark.png)  
2. Usage
   • Document the new npm script to regenerate sample charts and instructions on how to update the embedded images.