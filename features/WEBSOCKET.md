# WEBSOCKET

This feature adds real-time notification capabilities to owl-builder via a WebSocket server integrated with the existing HTTP server. It broadcasts updates related to key ontology operations and diagnostic events to all connected clients.

## Overview

- **Real-time Communication:** Enables clients to receive instantaneous updates on ontology events (e.g., refresh, update, merge) and diagnostic messages.
- **Integrated with Ontology Service:** Works in tandem with the unified ontology service and diagnostics, ensuring that any change in the ontology is immediately pushed as a notification.
- **Unified Notification Format:** Sends a consistent JSON payload with fields such as `updatedOntologyTitle`, `version`, `timestamp`, and `statusMessage`.
- **Seamless Client Support:** Designed to support lightweight client connections without requiring additional server infrastructure.

## Implementation Details

- **WebSocket Server Integration:** Uses the existing `ws` module to initiate a WebSocket server on the same port as the HTTP server when started with the `--serve` flag.
- **Broadcast Mechanism:** Implements a broadcasting function that sends notification messages to all connected WebSocket clients whenever key ontology operations occur (e.g., after `refreshOntology`, `mergeAndPersistOntology`, or `updateOntology`).
- **Message Payload:** Standardizes messages to include:
  - `updatedOntologyTitle`: the current ontology title after the update
  - `version`: the current version of the tool
  - `timestamp`: ISO formatted timestamp
  - `statusMessage`: a descriptive update message
- **Test Coverage:** Includes unit tests confirming connection establishment and message receipt on ontology refresh events.

## Benefits

- **Enhanced User Experience:** Allows users and monitoring systems to receive live updates without the need to poll for changes.
- **Improved System Awareness:** Provides immediate feedback on critical operations, assisting in debugging and operational monitoring.
- **Mission Alignment:** Strengthens the real-time dynamics of owl-builder, aligning with its mission of constructing up-to-date OWL ontologies from live data.
