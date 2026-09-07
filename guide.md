# TRAINER-ONLY — Tenant Ops UI incident guide

Do not distribute this file to learners. It contains the answer.

## Current exercise state

Repository: `https://github.com/taskrecording066/tenant-ops-ui-incident`  
Branch to inspect: `main` (clean, with the incident intentionally present).

The relevant release window is:

| PR | Title | Branch | Source commit | Merge commit |
| --- | --- | --- | --- | --- |
| [#8](https://github.com/taskrecording066/tenant-ops-ui-incident/pull/8) | Correct PR history artifacts | `remove-misleading-pr-metadata` | `56f1ebf` | `8ad9e8a` |
| [#9](https://github.com/taskrecording066/tenant-ops-ui-incident/pull/9) | Add reusable tenant filter label | `add-tenant-filter-label` | `675fec1` | `e1fa8f9` |
| [#10](https://github.com/taskrecording066/tenant-ops-ui-incident/pull/10) | Refactor deployment run search state | `refactor-search-state-lifecycle` | `7277110` | `fff2ca8` |

PR #10 is the culprit. Its exact source files are
`src/hooks/useRunSearch.js` (`normalizedFilters`, `useRunSearch`, and the
effect completion handlers) and `src/hooks/useRunSearch.test.js`. The hook
starts `fetchRuns` for every filter change, but has no `AbortController`,
request generation, or latest-request check before calling `setState`.
Consequently an older response can overwrite a newer one. The API is not
returning incorrect data.

PR #8 is corrective repository maintenance, not the incident cause. It
removes the misleading public `docs/prs/2-search-results-refactor.md` artifact
and adds the canonical public PR index; it does not rewrite or delete the
historical GitHub PR #2. Do not treat that old documentation artifact as the
cause. PR #9 is the safe distractor: it extracts
`src/components/TenantFilterLabel.jsx`, wires it in `src/App.jsx`, and adds a
focused component test. It does not change request timing or async state.

## 35-minute flow

1. **0–5m — Issue:** Open the primary incident issue. Ask for impact, trigger,
   and non-goals without naming a cause.
2. **5–12m — Trace:** Read `docs/architecture.md`, `src/App.jsx`,
   `src/hooks/useRunSearch.js`, and `src/api/runsApi.js`. Trace tenant/search
   state → effect → `fetchRuns` → `RunTable`.
3. **12–20m — Tests:** Read `src/hooks/useRunSearch.test.js`. Ordinary tenant
   and query paths are covered, but there is deliberately no out-of-order
   response assertion. Ask what effect cleanup should guarantee.
4. **20–28m — History:** Compare merged PRs #8, #9, and #10, their source
   commits, and Files changed. PR #10 is the only relevant async lifecycle
   change. Historical PRs #1–#3 remain visible distractors.
5. **28–35m — Browser:** Run the deterministic reproduction below and have
   learners write findings.

## Deterministic browser reproduction

Run `npm install && npm run dev`, open the printed local URL, and wait for the
initial table request. Set **Demo latency** to **Race demo · controlled**.
Select **Northstar Health**, then immediately select **Cedar Finance** (within
one second). The Cedar request returns in about 180ms; the earlier Northstar
request returns in about 1.8s and paints last. The selected tenant is Cedar
but the table finishes showing Northstar results.

In Chrome DevTools, enable Network → Preserve log. Both requests have valid
tenant parameters; their completion order is reversed. If the race does not
reproduce, select **All tenants**, reselect Race demo, and repeat. No network
throttling is required.

## Expected validation

From `main`, these commands should pass:

```bash
npm test
npm run build
```

The learner-facing suite intentionally remains green while omitting the
concurrency regression assertion. Do not fix the hook on `main`; remediation
would use cancellation plus a request-generation/latest-response guard and a
deterministic deferred-response test.

## Debrief and suggested findings report

Ask learners to report:

- **Impact:** stale deployment-run results after rapid tenant/search changes,
  especially on slow networks.
- **Evidence:** two valid overlapping requests, valid response payloads, and
  reversed completion order in the browser Network log.
- **Suspect:** merged PR #10, source commit `7277110` on
  `refactor-search-state-lifecycle`.
- **Root cause:** every asynchronous resolution calls `setState`; no
  cancellation or request identity protects the latest selection.
- **Non-causes:** API availability, API data correctness, PR #9's presentational
  extraction, and corrective PR #8's metadata cleanup.
- **Remediation:** AbortController plus request generation/latest-response
  protection, ignore `AbortError`, and add an out-of-order response test.

## Facilitator troubleshooting

Prerequisites are Node 20+, Chrome, VS Code, and repository access. The
expected initial screen has six deployment runs, API health at 99.98%, and
Normal latency. If the table is empty, wait for the initial request before
changing filters. End with a short findings report naming impact, evidence,
culprit, root cause, and remediation.
