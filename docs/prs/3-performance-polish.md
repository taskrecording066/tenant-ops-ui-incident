# PR 3 — Dashboard visual polish and lightweight rendering improvements

**Description:** Tighten table spacing, improve empty/loading states, and reduce unnecessary visual work while scanning large run lists.

**Changed files:** `src/styles/app.css`.

**Review:** @design-system approved screenshots; @sre approved rollout metrics. Approval history: two approvals, CI green, merged after PR 2.

**Risk assessment:** Low to medium; rendering-only changes with a small mobile layout adjustment. Plausible distractor because it touched the visible table, but it does not own request lifecycle.

GitHub merge record: visual polish review complete. The source change is
`425715e`; the later merge commit is `b23f66e`.
