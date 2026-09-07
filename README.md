# Tenant Ops UI Incident Exercise

A frontend-only incident investigation exercise for a multi-tenant deployment operations dashboard. During rapid filter changes, some users intermittently see a result set that does not match their latest selection, especially on slower networks. The behavior began after a recent frontend deployment.

This repository is designed for a 35-minute investigation using GitHub web, VS Code, and Chrome DevTools/browser. The app uses an in-memory API with adjustable demo latency so the behavior can be reproduced locally.

## Run locally

```bash
npm install
npm run dev
```
Open the printed localhost URL. Use **Demo latency** and change Tenant/Search quickly. Chrome DevTools Network throttling can add another layer of realism.

## Repository map
- `src/components` UI boundaries and table rendering
- `src/hooks` async view state
- `src/api` simulated API client
- `src/fixtures` tenant and run data
- `docs/` architecture, telemetry, runbook, issues, and PR descriptions

## Validation
`npm test` and `npm run build` are the main checks.
