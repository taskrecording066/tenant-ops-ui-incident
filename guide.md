# TRAINER-ONLY — Tenant Ops UI incident guide

Do not distribute this file to learners. It contains the answer.

## 35-minute flow
- **0–5m, GitHub issue:** Open the primary incident issue. Ask learners to restate impact, trigger, and non-goals; do not name a cause.
- **5–12m, architecture:** Open `docs/architecture.md` in GitHub, then `src/App.jsx`, `src/hooks/useRunSearch.js`, and `src/api/runsApi.js` in VS Code. Trace filter → effect → API → table.
- **12–22m, source/test trace:** Inspect `useRunSearch.test.js`. Note ordinary tenant behavior is covered but no overlapping-request test exists. Ask what cleanup should do.
- **22–30m, merged PR comparison:** In GitHub, open merged PR 2 and compare its commit to its parent. Follow the changed hook symbol and reviewer comments; contrast PR 1 and PR 3 as distractors.
- **30–35m, browser:** Run `npm install && npm run dev`; Chrome → app → set Demo latency to **Race demo · controlled**. Select Northstar Health, then quickly Cedar Finance. Network shows two valid requests; Cedar returns first, then the older Northstar response paints last.

## Exact navigation
GitHub repo → Issues → primary incident → Architecture link/files → Pull requests → **Refactor deployment run search state** → Files changed → `src/hooks/useRunSearch.js`; VS Code symbol `useRunSearch`; Chrome DevTools Network, Preserve log, Slow 3G.

## Answer
Culprit: merged **PR 2 — Refactor deployment run search state** (`docs/prs/2-search-results-refactor.md`), commit on branch `feature/search-refactor`. Exact symbol: `useRunSearch` in `src/hooks/useRunSearch.js`. The refactor removed request identity/cancellation handling. Each effect starts a request, and every resolution calls `setState`; an older/slower response can therefore overwrite the latest response. The API is not returning wrong data.

## Reproduction
Use **Race demo · controlled**, choose Northstar Health, then immediately choose Cedar Finance. Cedar returns after about 180ms, while the earlier Northstar request returns after about 1.8s and paints last. The table should finish showing Northstar even though Cedar is the selected tenant. Network request parameters remain correct; completion order is not interaction order. If the first request has already settled, reset by selecting All tenants, then repeat Northstar → Cedar.

## Suggested findings report
Impact is stale deployment-run results in a multi-tenant dashboard after rapid filter changes, concentrated on slow networks. Evidence: overlapping requests with valid responses and reversed completion order. Root cause is missing latest-request guard/abort in `useRunSearch`. Fix with AbortController plus request generation (and ignore AbortError); add a deterministic out-of-order response test. No evidence of API outage or data corruption.

## Facilitator setup and troubleshooting

- Prerequisites: Node 20+, Chrome, VS Code, and access to the GitHub repository.
- Before the session: run `npm install`, verify `npm test`, and confirm `npm run dev` serves the dashboard.
- Expected initial screen: six deployment runs, API health at 99.98%, and the latency control set to Normal.
- If the table is empty, wait for the initial request to finish before changing filters.
- If the race does not reproduce, select All tenants, choose Race demo again, then perform Northstar Health → Cedar Finance within one second.
- Chrome DevTools is useful evidence, but the controlled latency mode is sufficient even without network throttling.
- The exercise should end with a short findings report naming impact, evidence, suspect PR, root cause, and remediation.

## Debrief rubric

Score each area as demonstrated or missing:

1. **Scoping:** distinguishes UI symptom from API availability and data correctness.
2. **Flow tracing:** follows App → useRunSearch → fetchRuns → RunTable.
3. **History analysis:** compares all three merged PRs and identifies PR 2 from the changed lifecycle behavior.
4. **Runtime evidence:** demonstrates overlapping valid requests and reversed completion order.
5. **Engineering judgment:** proposes cancellation/request-generation protection and a regression test.
