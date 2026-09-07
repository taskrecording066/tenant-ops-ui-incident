# PR 9 — Add reusable tenant filter label

**Description:** Extract the tenant selector into a reusable, explicitly
labelled component while preserving the existing filter behavior.

**Changed files:** `src/App.jsx`, `src/components/TenantFilterLabel.jsx`,
`src/components/TenantFilterLabel.test.jsx`.

**Review:** Accessibility review approved the explicit combobox label and
focused component test. No request or API lifecycle changes were intended.

**Risk assessment:** Low; presentational component extraction only.

**Merge commit:** `e1fa8f9`
