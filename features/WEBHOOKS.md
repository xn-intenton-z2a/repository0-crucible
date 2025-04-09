# Webhooks

This feature introduces outbound webhook notification integration to our ontology service. In addition to the current WebSocket-based real-time notifications, external systems will now have the option to receive updates via HTTP POST requests. This allows integration with third-party services, monitoring tools, or custom endpoints that require immediate notifications on key ontology operations (refresh, merge, update).

## Overview

- **Dual Notification Channels:** Provide both internal (WebSocket) and external (webhook) notifications so that consuming services can integrate seamlessly.
- **Configurable Endpoints:** Users can specify one or more webhook URLs via environment variables (e.g., WEBHOOK_URL) to receive notifications.
- **Reliable Delivery:** Outbound notifications will use an asynchronous HTTP POST mechanism with basic retry logic for robustness.
- **Enhanced Logging:** Diagnostic logs will be emitted for webhook transmission attempts, helping troubleshoot failures and delivery status.

## Implementation Details

- **Trigger Points:** Integrate webhook calls into key operations such as ontology refresh, merge, and update. When these operations complete, a payload with updated ontology details (title, version, timestamp, and statusMessage) is sent to the specified webhook endpoint.
- **Configuration:** Allow configuration via environment variables or CLI flags:
  - `WEBHOOK_URL`: A comma-separated list of webhook endpoints.
  - Optionally, `WEBHOOK_RETRY_COUNT` and `WEBHOOK_RETRY_DELAY` can control retry behavior.
- **Error Handling:** On failure to deliver the webhook notification, the system will log the error for diagnostic purposes and attempt retries with exponential backoff.
- **Lightweight Addition:** The feature is implementable in a single source file and leverages existing logging and diagnostic infrastructure.

## Benefits and User Impact

- **Broader Integration:** Enables external systems to react to ontology updates without requiring clients to maintain a persistent WebSocket connection.
- **Simplified Monitoring:** Allows integration with incident management and monitoring services which prefer HTTP webhooks.
- **Resource Optimization:** Offloads notification delivery to a simple HTTP POST mechanism that is scalable and fault tolerant.
- **User Control:** Users can toggle webhook notifications independently via configuration, matching the mission of flexible live data integration.

## Usage Example

1. Set the environment variable:

   ```bash
   export WEBHOOK_URL="https://example.com/webhook,https://another-endpoint.com/hooks"
   ```

2. On performing operations like ontology refresh or update, the system will send a JSON payload (containing updatedOntologyTitle, version, timestamp, and statusMessage) via an HTTP POST request to each configured webhook URL.

3. Monitor the logs to verify delivery or troubleshoot using logged diagnostic data.

This feature enhances the real-time notification capabilities of the owl-builder, providing an additional integration path and aligning with the mission of delivering dynamic, live data-driven ontology management.