# TRAINER-ONLY — Tenant Ops UI incident guide

Do not distribute this file to learners. It contains the answer.

## 35-minute flow
- **0–5m, GitHub issue:** Open the primary incident issue. Ask learners to restate impact, trigger, and non-goals; do not name a cause.
- **5–12m, architecture:** Open `docs/architecture.md` in GitHub, then `src/App.jsx`, `src/hooks/useRunSearch.js`, and `src/api/runsApi.js` in VS Code. Trace filter → effect → API → table.
- **12–22m, source/test trace:** Inspect `useRunSearch.test.js`. Note ordinary tenant behavior is covered but no overlapping-request test exists. Ask what cleanup should do.
- **22–30m, merged PR comparison:** In GitHub, open merged PR 2 and compare its commit to its parent. Follow the changed hook symbol and reviewer comments; contrast PR 1 and PR 3 as distractors.
- **30–35m, browser:** Run `npm install && npm run dev`; Chrome → app → set Demo latency to Very slow. Select Northstar, then quickly Cedar (or search `claims`, then `ledger`). Network tab with Slow 3G shows overlapping requests and the earlier response painting last.

## Exact navigation
GitHub repo → Issues → primary incident → Architecture link/files → Pull requests → **Refactor deployment run search state** → Files changed → `src/hooks/useRunSearch.js`; VS Code symbol `useRunSearch`; Chrome DevTools Network, Preserve log, Slow 3G.

## Answer
Culprit: merged **PR 2 — Refactor deployment run search state** (`docs/prs/2-search-results-refactor.md`), commit on branch `feature/search-refactor`. Exact symbol: `useRunSearch` in `src/hooks/useRunSearch.js`. The refactor removed request identity/cancellation handling. Each effect starts a request, and every resolution calls `setState`; an older/slower response can therefore overwrite the latest response. The API is not returning wrong data.

## Reproduction
Use Very slow (3.5s), choose Northstar Health, immediately choose Cedar Finance. Observe Cedar briefly, then Northstar after its older request resolves (timing can be reversed depending on click order). Repeat with a query change. Network request parameters remain correct; completion order is not interaction order.

## Suggested findings report
Impact is stale deployment-run results in a multi-tenant dashboard after rapid filter changes, concentrated on slow networks. Evidence: overlapping requests with valid responses and reversed completion order. Root cause is missing latest-request guard/abort in `useRunSearch`. Fix with AbortController plus request generation (and ignore AbortError); add a deterministic out-of-order response test. No evidence of API outage or data corruption.
