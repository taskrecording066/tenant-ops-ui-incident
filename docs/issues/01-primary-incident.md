# Incident: deployment runs can briefly show an unexpected filter

**Impact:** Operations users report that the run table occasionally shows another tenant or search result after changing filters quickly. Reports are intermittent and more common on slow connections.

**Timeline:** First reports followed the latest dashboard frontend release. API availability and normal single-filter searches appear healthy.

**Investigation asks:** Can we reproduce with throttling? Do request parameters and response bodies remain correct? Is the issue browser-specific? Link evidence and timestamps here; do not assume a backend fault.
