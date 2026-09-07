# PR 2 — Refactor deployment run search state

**Description:** Simplify search-result loading into a reusable hook, reduce duplicated state transitions, and standardize loading/error presentation.

**Changed files:** `src/hooks/useRunSearch.js`, `src/App.jsx`, `src/hooks/useRunSearch.test.js`.

**Review:** @frontend-platform approved the hook extraction. @qa noted ordinary tenant filtering coverage. Reviewer question: “Should rapid changes be covered under slow network?” The thread was marked follow-up and not blocking. Approval history: one approval, CI green, merged by release manager.

**Risk assessment:** Medium; async state lifecycle changed while API contract remained unchanged. Publicly observed behavior looked correct under normal response timing.
