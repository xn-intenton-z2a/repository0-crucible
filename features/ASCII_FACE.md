# Purpose
Enhance the existing ASCII face output feature to support batch generation of faces for richer emotional feedback in scripts or pipelines.

# Implementation Details
1. Parse count flag  
   • Add numeric option count (alias c) to minimist configuration with default value 1.  
   • Ensure flags object includes count option alongside ascii-face and help.
2. Validate count  
   • Accept only positive integers.  
   • If count is zero, negative, or not an integer, output the help message and return without error.
3. Generate faces  
   • In main(), when ascii-face mode is active, loop from 1 to count.  
   • Call getRandomFace() each iteration and print each result on its own console line.  
   • Preserve existing single-face behavior when count is 1.
4. Help message update  
   • Include --count (-c) in helpMessage with description and default value.
   • Add examples illustrating multiple face requests.

# CLI Interface Examples
- node src/lib/main.js --ascii-face --count 3  
  Outputs three random ASCII faces, one per line.
- node src/lib/main.js --ascii-face -c 5  
  Outputs five random ASCII faces.
- node src/lib/main.js --ascii-face  
  Outputs one random ASCII face (default count).

# Testing
1. Unit tests in tests/unit/main.test.js  
   • Default invocation prints exactly one face.  
   • --ascii-face --count N prints N faces and console.log called N times.  
   • Alias -c works identically to --count.  
   • Invalid count values (zero, negative, non-integer) trigger help output.
2. CLI integration in tests/e2e/cli.test.js  
   • Simulate node CLI with --ascii-face --count 4 and assert four lines of output belonging to asciiFaces.

# Documentation
- Update README.md to describe --count flag under Features and Usage.  
- Update docs/USAGE.md to include examples for multiple faces.  
- Note count parameter in the API for future programmatic calls and library usage.