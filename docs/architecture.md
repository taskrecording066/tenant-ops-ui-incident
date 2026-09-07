# Frontend architecture

`App` owns filter controls and derives a stable filter object. `useRunSearch` translates filters into asynchronous API calls and exposes `{runs, loading, error}`. `runsApi` simulates a remote deployment-runs endpoint over fixture data and accepts a controllable latency. `RunTable` is a presentational table.

Data flow: filter control → `App` state → `useRunSearch` effect → `fetchRuns` → hook state → `RunTable`. There is no server, router, cache, or global store. The boundary intentionally resembles a small production query hook so request lifecycle behavior can be inspected in VS Code.
