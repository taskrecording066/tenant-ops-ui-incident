# Investigation runbook

1. Can the symptom be reproduced with one filter change, or only rapid changes?
2. Do Network request parameters match the visible filter at the time each response arrives?
3. Are responses complete and correctly shaped when inspected individually?
4. Does throttling change frequency? Does disabling cache change it?
5. Which frontend deployment introduced a changed search-results lifecycle?
6. Are there console errors, cancellations, retries, or duplicate requests?
7. Can the UI guarantee that only the latest user intent updates visible state?
8. What regression test would fail before a fix and pass after it?
