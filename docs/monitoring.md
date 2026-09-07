# Browser telemetry observations

- Support reports: “results briefly revert” after changing tenant/search twice.
- Reports cluster on slower home Wi-Fi and mobile hotspots; fast office networks rarely reproduce it.
- Browser timings show overlapping requests for successive filter values; response durations range from 120ms to 3.5s in synthetic sessions.
- No material increase in API 5xx or client error rate. Initial page load and single searches look healthy.
- Affected browsers include current Chrome and Safari; network speed appears more predictive than browser family.

Plausible hypotheses include delayed responses arriving out of order, stale browser/cache data, a backend filter/data-shape issue, or a release/deployment inconsistency. Compare request parameters and response timing before narrowing the cause.
