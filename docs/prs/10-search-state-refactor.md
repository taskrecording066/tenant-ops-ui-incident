# PR 10 — Refactor deployment run search state

**Description:** Normalize query input in the deployment-run search hook and
consolidate loading/error transitions. Preserve ordinary tenant and query
coverage while simplifying the hook implementation.

**Changed files:** `src/hooks/useRunSearch.js`,
`src/hooks/useRunSearch.test.js`.

**Review:** @frontend-platform reviewed the lifecycle changes. QA verified
ordinary filtering and the existing test suite; no overlapping-response test
was added in this release.

**Risk assessment:** Medium; asynchronous completion behavior should be
validated under rapid filter changes.

**Merge commit:** `fff2ca8`; source commit `7277110`
