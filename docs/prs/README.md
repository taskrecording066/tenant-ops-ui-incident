# Public exercise PR index

This index describes the release window used by the incident exercise. It is
kept separate from GitHub's historical pull requests so old training artifacts
cannot be mistaken for the code that is deployed on `main`.

## Relevant release window

| PR | Title | Role |
| --- | --- | --- |
| #4 | Correct PR history artifacts | Removes the stale documentation-only PR description and establishes this index. |
| #5 | Add reusable tenant filter label | Safe accessibility/UI distractor; no async request lifecycle changes. |
| #6 | Refactor deployment run search state | Incident-introducing change; see the private trainer guide for investigation details. |

The source of truth for changed files is each pull request's Files changed
tab and the merge commits. Historical PR #2 is retained by GitHub and is not
part of this release window.
