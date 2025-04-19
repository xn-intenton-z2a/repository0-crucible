# SELF_IMPROVEMENT

## Overview
This feature leverages the existing OpenAI dependency to enable the agent to analyze its own performance metrics and memory log details to provide actionable suggestions for improving its behavior. When the CLI is run with the flag `--self-improve`, the system gathers memory statistics and (if configured) queries the OpenAI API to generate a brief improvement report. This report could include recommendations such as optimizing command sequences, adjusting memory limits, or user-specific advice based on patterns observed in recent runs.

## Implementation Details
- **CLI Flag:**
  - Introduce a new flag `--self-improve` in `src/lib/main.js` to trigger self-improvement analysis.

- **Memory Analysis:**
  - Leverage existing memory log data (e.g., count of entries, frequency stats, timestamps) to compose a summary string.

- **OpenAI API Integration:**
  - Use the `openai` package to call the completions endpoint. Construct a prompt that includes the memory log summary and asks for improvement suggestions.
  - The code should use an async IIFE to handle the API call. In case the API key is not set or the call fails, output a fallback message with the local diagnostics data.

- **Source File Changes:**
  - In `src/lib/main.js`, after the existing flag handling blocks, add a block similar to:
    ```js
    if (args.includes("--self-improve")) {
      (async () => {
        // Gather basic memory log statistics
        const logCount = memoryLog.length;
        const frequency = {};
        memoryLog.forEach(entry => {
          if (Array.isArray(entry.args)) {
            entry.args.forEach(arg => {
              frequency[arg] = (frequency[arg] || 0) + 1;
            });
          }
        });
        let mostFrequent = 'N/A';
        let maxFreq = 0;
        for (const key in frequency) {
          if (frequency[key] > maxFreq) {
            maxFreq = frequency[key];
            mostFrequent = key;
          }
        }
        const summary = `Memory Log Count: ${logCount}. Most frequent argument: ${mostFrequent}`;

        // Check for API key
        if (!process.env.OPENAI_API_KEY) {
          console.error("OPENAI_API_KEY not set. Self-improvement feature cannot be executed.");
          return;
        }

        // Call OpenAI Completion API
        try {
          const { Configuration, OpenAIApi } = await import('openai');
          const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });
          const openai = new OpenAIApi(configuration);

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Analyze the following memory log summary and provide suggestions for self-improvement:\n${summary}\nSuggestions:`,
            max_tokens: 50,
            temperature: 0.5
          });
          const suggestion = completion.data.choices[0].text.trim();
          console.log(JSON.stringify({
            summary,
            suggestion
          }));
        } catch (error) {
          console.error("Error generating self-improvement suggestions:", error);
        }
      })();
      return;
    }
    ```

- **Test File Changes:**
  - In `tests/unit/main.test.js`, add tests to simulate the `--self-improve` flag. These tests should mock the OpenAI API call (using Vitest’s mocking capabilities) and verify that the output includes both the summary and a suggestion string.

## Testing and Documentation
- **Unit Tests:**
  - Add a new test block to `tests/unit/main.test.js` to ensure that when the CLI is invoked with `--self-improve`, it returns output containing keys such as `summary` and `suggestion`.

- **README Updates:**
  - In `README.md`, under the Features section, add a bullet point:
    - **Self-Improvement:** When run with `--self-improve`, the agent analyzes its memory log and queries the OpenAI API to provide improvement suggestions, helping optimize future command executions.

## Long-Term Direction
The self-improvement feature is the first step towards a learning agent. Future iterations could:
- Automatically adjust settings based on feedback (e.g., adjusting memory limits when performance degrades).
- Integrate more detailed analytics (e.g., execution durations, error rates) into the improvement prompt.
- Support periodic self-assessments running in the background with scheduled invocations.
