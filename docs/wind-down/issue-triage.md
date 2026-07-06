# policyengine-app (v1) open-issue triage — wind-down verdict gate

READ-ONLY triage of all open issues on the DEPRECATED `PolicyEngine/policyengine-app` (v1) repo. v1 no longer deploys to any user-facing surface; policyengine.org is served by `PolicyEngine/policyengine-app-v2` (Next.js). No issue was modified, closed, commented, or labeled.

## Summary

- **Total open v1 issues:** 394
- **KEEP-REFILE** (still-live v2 concern, no v2 equivalent — re-file on v2): **8**
- **KEEP-HAS-V2-EQUIV** (still-live, already tracked on v2): **5**
- **CLOSE-STALE** (bulk-closeable): **377**
- **CLOSE-DUPLICATE** (duplicates another v1 issue): **4**
- **Check:** 8+5+377+4 = **394** = 394 ✓

## KEEP-REFILE (re-file on policyengine-app-v2)

| # | title | created | why still live on v2 |
|---|-------|---------|----------------------|
| 2833 | Result session persistence: 'I came back later and it wasn't there' (Tara Watson) | 2026-04-21 | Results/reports evaporating between browser sessions is a first-order product concern that survives into v2's report model. v2 has a user dashboard (#54) and report-sharing URLs (#580) but no issue covering cross-session result persistence specifically. Distinct from provenance (#940) and TRACE cite-flow. |
| 2650 | JCT-style distributional table | 2025-07-06 | Distributional/decile output is a core economy-wide report surface in v2; a JCT-style distributional table is a net-new output-format feature with no v2 equivalent. |
| 2630 | When entering a value, the start period seems to default to 2025, even if another year is selected as the start | 2025-07-01 | Policy parameter setter with multi-year date entry exists in v2 (#86/#228/#498). This specific start-period-defaults-to-2025 bug is a live data-entry defect not captured by any v2 issue. |
| 2604 | Make "County name" a searchable component | 2025-06-10 | Geographic/county input UX applies to v2's household + geography flow (#621/#657/#1044). A searchable county selector has no v2 equivalent. |
| 2575 | Add dataframe-generating code to Reproduce in Python segment | 2025-05-26 | Reproducibility tab exists in v2 (referenced in #940). Adding dataframe-generating snippets is an enhancement to that surface; no v2 equivalent. |
| 2527 | App does not display all possible variables in "Varying your earnings" | 2025-05-13 | Earnings-variation (household output) is a v2 feature; which variables are selectable is a functional/metadata gap (not v1 pixel rendering) that plausibly persists. No v2 equivalent. |
| 2481 | Clarify that UK impacts are all fiscal years, not calendar years | 2025-04-08 | Budget/impact view exists in v2; the fiscal-vs-calendar-year clarification is a live copy/labeling concern on that surface. Distinct from #999 (federal/state split). No v2 equivalent. |
| 2069 | Add button to index to inflation | 2024-10-01 | Parameter editor exists in v2; an 'index to inflation' convenience action is a net-new param-editor feature with no v2 equivalent. |

## KEEP-HAS-V2-EQUIV (already tracked on v2 — close v1, no re-file needed)

| # | title | v2 equivalent | note |
|---|-------|---------------|------|
| 2845 | Reproduce-in-Python still generates archived policyengine-us-data URIs; should emit the populace default | v2 #1079 | v1 body itself states #1079 covers v2 for the archived policyengine-us-data URI in Reproduce-in-Python. v2 #1079 (+ fix PR #1090) handle the dataset-URI replacement. |
| 2831 | Always-visible version badge on every simulation result (non-TRACE) | v2 #940 | Always-visible version badge (non-TRACE) is the provenance-identification surface. Companion to #2830; both map to v2 #940. |
| 2830 | 'Cite this result' button, version badge, and shareable TRO permalinks | v2 #940 | 'Cite this result' + version badge + shareable permalinks = the resolved model/data provenance surface; v2 #940 is its v2 home. |
| 2798 | It is possible to create breaking policies | v2 #364 | Creating a duplicate-of-current-law policy via an empty param edit is the exact scenario in v2 #364 ('I can create a policy that is a duplicate of current law' via Add param). |
| 2661 | US 10 year impact includes state tax in federal budget | v2 #999 | Federal budget erroneously including state tax = the federal-vs-state fiscal attribution that v2 #999 implements in the budget view. |

## CLOSE-DUPLICATE (duplicates another v1 issue)

| # | title | created | duplicate of |
|---|-------|---------|--------------|
| 2110 | Convert Infinity input slide menu into popover menu | 2024-10-18 | v1 #2107 |
| 2105 | Add tests for infinite value display | 2024-10-17 | v1 #2107 |
| 2006 | Conversion action for profile signup | 2024-09-04 | v1 #2007 |
| 1552 | Add some sort of linting rule for `console.log` statements and move relevant logs to `console.debug` | 2024-04-03 | v1 #1665 |

## CLOSE-STALE (bulk-close)

377 issues. Shared rationale: pre-cutover v1 issues on a frozen, no-longer-deployed codebase — the feature/screen was removed, redesigned, or rebuilt from scratch in the v2 Next.js app, or the item is a content/build task not tied to live v2 product behavior. Grouped by creation year, then by category. Every number is listed.

**Category legend:**  `blog/content` = content task; v2 has its own research/blog pipeline  ·  `GPT/AI-analysis era` = GPT-plugin / on-page AI analysis; feature removed  ·  `v1 build/tooling/refactor` = v1 build/lint/test/dependency work; v1 code frozen  ·  `v1 API-explorer/Streamlit/dev-docs` = v1 API explorer / Streamlit / dev docs; redesigned or removed  ·  `v1 param-editor internals` = v1 parameter-editor internals; param setter rebuilt in v2  ·  `v1 Reproduce-in-Python specifics` = v1 Reproduce-in-Python detail; v2 reproducibility tab rebuilt  ·  `v1 chart/plotly rendering` = v1 chart rendering artifact; charts rebuilt in v2 (react-plotly removed)  ·  `v1 household-calc/profile UI` = v1 household-calculator / profile UI; rebuilt in v2 household+report flow  ·  `v1 site-chrome/marketing UI` = v1 site chrome / marketing UI; v2 website is a fresh Next.js build  ·  `v1 sim-queue/infra plumbing` = v1 sim-queue / infra plumbing; v2 uses API v2 + new infra  ·  `pre-cutover v1 UI/feature` = pre-cutover v1 UI/feature; predates v2 or no longer applicable

### 2025 (67)

- **pre-cutover v1 UI/feature** (21): #2738, #2727, #2678, #2675, #2671, #2662, #2636, #2601, #2571, #2548, #2547, #2493, #2482, #2442, #2422, #2414, #2364, #2352, #2339, #2300, #2289
- **v1 household-calc/profile UI** (13): #2760, #2716, #2687, #2677, #2665, #2656, #2589, #2554, #2534, #2474, #2448, #2418, #2302
- **blog/content** (13): #2724, #2705, #2683, #2670, #2660, #2659, #2654, #2619, #2535, #2516, #2459, #2376, #2363
- **v1 API-explorer/Streamlit/dev-docs** (6): #2638, #2522, #2489, #2486, #2475, #2329
- **v1 chart/plotly rendering** (5): #2729, #2626, #2610, #2574, #2529
- **v1 sim-queue/infra plumbing** (3): #2625, #2616, #2323
- **v1 Reproduce-in-Python specifics** (3): #2541, #2434, #2353
- **v1 build/tooling/refactor** (2): #2711, #2710
- **v1 param-editor internals** (1): #2674

### 2024 (198)

- **pre-cutover v1 UI/feature** (53): #2206, #2167, #2164, #2157, #2126, #2115, #2098, #2090, #2078, #2060, #2015, #2007, #1972, #1960, #1938, #1876, #1806, #1692, #1691, #1688, #1674, #1671, #1658, #1594, #1563, #1536, #1518, #1485, #1457, #1429, #1426, #1407, #1384, #1371, #1370, #1345, #1344, #1343, #1331, #1290, #1287, #1276, #1224, #1216, #1215, #1213, #1198, #1197, #1191, #1188, #1180, #1140, #1135
- **v1 household-calc/profile UI** (41): #2282, #2256, #2225, #2104, #2089, #2088, #2053, #2050, #2008, #2005, #1996, #1957, #1942, #1894, #1881, #1840, #1834, #1812, #1808, #1807, #1805, #1657, #1654, #1650, #1601, #1596, #1570, #1567, #1510, #1486, #1473, #1314, #1313, #1299, #1282, #1264, #1260, #1235, #1230, #1226, #1210
- **v1 build/tooling/refactor** (33): #2220, #2205, #2201, #2174, #2162, #2124, #2117, #2075, #2074, #2059, #1991, #1981, #1928, #1810, #1714, #1665, #1652, #1490, #1479, #1477, #1402, #1363, #1353, #1330, #1300, #1181, #1177, #1176, #1175, #1174, #1173, #1172, #1171
- **v1 chart/plotly rendering** (25): #1886, #1885, #1867, #1860, #1826, #1789, #1672, #1519, #1508, #1491, #1467, #1463, #1448, #1372, #1369, #1365, #1364, #1362, #1332, #1315, #1223, #1211, #1206, #1205, #1152
- **v1 param-editor internals** (13): #2107, #2051, #1949, #1940, #1887, #1861, #1741, #1729, #1728, #1727, #1525, #1520, #1360
- **blog/content** (9): #2275, #2265, #2251, #2061, #1946, #1900, #1603, #1559, #1321
- **v1 Reproduce-in-Python specifics** (8): #2202, #2092, #2004, #2002, #1566, #1494, #1447, #1438
- **v1 API-explorer/Streamlit/dev-docs** (6): #2267, #2132, #2032, #1695, #1582, #1413
- **GPT/AI-analysis era** (5): #2077, #1934, #1472, #1101, #1100
- **v1 site-chrome/marketing UI** (4): #2272, #2128, #1719, #1110
- **v1 sim-queue/infra plumbing** (1): #2127

### 2023 (93)

- **pre-cutover v1 UI/feature** (21): #1070, #989, #972, #904, #898, #889, #887, #829, #823, #745, #621, #615, #512, #511, #452, #419, #322, #256, #149, #146, #138
- **v1 household-calc/profile UI** (21): #1033, #998, #990, #965, #964, #920, #919, #915, #888, #841, #763, #716, #562, #410, #367, #354, #200, #197, #176, #163, #139
- **v1 chart/plotly rendering** (18): #1079, #1049, #1047, #1032, #1015, #985, #966, #862, #840, #591, #583, #577, #356, #317, #285, #272, #244, #174
- **blog/content** (9): #448, #442, #284, #283, #282, #281, #280, #257, #162
- **GPT/AI-analysis era** (7): #614, #424, #416, #415, #406, #405, #388
- **v1 build/tooling/refactor** (5): #895, #857, #764, #714, #471
- **v1 site-chrome/marketing UI** (4): #883, #860, #723, #159
- **v1 API-explorer/Streamlit/dev-docs** (3): #725, #246, #245
- **v1 Reproduce-in-Python specifics** (3): #721, #325, #263
- **v1 param-editor internals** (2): #273, #243

### 2022 (19)

- **pre-cutover v1 UI/feature** (6): #153, #152, #109, #101, #48, #27
- **v1 chart/plotly rendering** (4): #126, #106, #95, #61
- **v1 household-calc/profile UI** (3): #81, #71, #26
- **v1 param-editor internals** (3): #111, #46, #39
- **v1 site-chrome/marketing UI** (2): #122, #51
- **v1 build/tooling/refactor** (1): #118

## Full verdict index (all 394, ascending) — for diff against the 394

| # | verdict | created | labels |
|---|---------|---------|--------|
| 26 | CLOSE-STALE | 2022-12-07 | good first issue |
| 27 | CLOSE-STALE | 2022-12-07 | good first issue |
| 39 | CLOSE-STALE | 2022-12-07 | - |
| 46 | CLOSE-STALE | 2022-12-08 | - |
| 48 | CLOSE-STALE | 2022-12-10 | - |
| 51 | CLOSE-STALE | 2022-12-12 | - |
| 61 | CLOSE-STALE | 2022-12-16 | - |
| 71 | CLOSE-STALE | 2022-12-17 | - |
| 81 | CLOSE-STALE | 2022-12-18 | - |
| 95 | CLOSE-STALE | 2022-08-30 | - |
| 101 | CLOSE-STALE | 2022-12-26 | - |
| 106 | CLOSE-STALE | 2022-12-27 | charts |
| 109 | CLOSE-STALE | 2022-12-27 | - |
| 111 | CLOSE-STALE | 2022-12-27 | - |
| 118 | CLOSE-STALE | 2022-12-28 | good first issue |
| 122 | CLOSE-STALE | 2022-12-29 | - |
| 126 | CLOSE-STALE | 2022-12-29 | - |
| 138 | CLOSE-STALE | 2023-01-05 | - |
| 139 | CLOSE-STALE | 2023-01-05 | - |
| 146 | CLOSE-STALE | 2023-01-08 | - |
| 149 | CLOSE-STALE | 2023-01-09 | - |
| 152 | CLOSE-STALE | 2022-02-04 | - |
| 153 | CLOSE-STALE | 2022-02-04 | - |
| 159 | CLOSE-STALE | 2023-01-12 | - |
| 162 | CLOSE-STALE | 2023-01-12 | - |
| 163 | CLOSE-STALE | 2023-01-12 | - |
| 174 | CLOSE-STALE | 2023-01-18 | good first issue |
| 176 | CLOSE-STALE | 2023-01-20 | - |
| 197 | CLOSE-STALE | 2023-02-01 | - |
| 200 | CLOSE-STALE | 2023-02-01 | - |
| 243 | CLOSE-STALE | 2023-02-12 | - |
| 244 | CLOSE-STALE | 2023-02-12 | - |
| 245 | CLOSE-STALE | 2023-02-14 | bug |
| 246 | CLOSE-STALE | 2023-02-14 | bug |
| 256 | CLOSE-STALE | 2023-02-16 | - |
| 257 | CLOSE-STALE | 2023-02-17 | - |
| 263 | CLOSE-STALE | 2023-02-23 | - |
| 272 | CLOSE-STALE | 2023-02-25 | - |
| 273 | CLOSE-STALE | 2023-02-27 | help wanted |
| 280 | CLOSE-STALE | 2023-02-28 | us,blog |
| 281 | CLOSE-STALE | 2023-02-28 | us,blog |
| 282 | CLOSE-STALE | 2023-02-28 | us,blog |
| 283 | CLOSE-STALE | 2023-02-28 | uk,blog |
| 284 | CLOSE-STALE | 2023-02-28 | blog |
| 285 | CLOSE-STALE | 2023-03-02 | - |
| 317 | CLOSE-STALE | 2023-03-13 | - |
| 322 | CLOSE-STALE | 2023-03-14 | good first issue |
| 325 | CLOSE-STALE | 2023-03-15 | bug |
| 354 | CLOSE-STALE | 2023-03-22 | - |
| 356 | CLOSE-STALE | 2023-03-23 | help wanted |
| 367 | CLOSE-STALE | 2023-03-24 | - |
| 388 | CLOSE-STALE | 2023-03-28 | gpt |
| 405 | CLOSE-STALE | 2023-03-29 | gpt |
| 406 | CLOSE-STALE | 2023-03-29 | gpt |
| 410 | CLOSE-STALE | 2023-03-29 | - |
| 415 | CLOSE-STALE | 2023-03-29 | gpt |
| 416 | CLOSE-STALE | 2023-03-30 | gpt |
| 419 | CLOSE-STALE | 2023-03-31 | - |
| 424 | CLOSE-STALE | 2023-04-01 | gpt |
| 442 | CLOSE-STALE | 2023-04-07 | - |
| 448 | CLOSE-STALE | 2023-04-09 | blog |
| 452 | CLOSE-STALE | 2023-04-10 | - |
| 471 | CLOSE-STALE | 2023-04-18 | - |
| 511 | CLOSE-STALE | 2023-05-02 | good first issue |
| 512 | CLOSE-STALE | 2023-05-02 | good first issue |
| 562 | CLOSE-STALE | 2023-05-30 | good first issue |
| 577 | CLOSE-STALE | 2023-06-09 | us |
| 583 | CLOSE-STALE | 2023-06-19 | uk,charts |
| 591 | CLOSE-STALE | 2023-07-02 | charts |
| 614 | CLOSE-STALE | 2023-07-17 | uk,gpt |
| 615 | CLOSE-STALE | 2023-07-17 | - |
| 621 | CLOSE-STALE | 2023-07-20 | - |
| 714 | CLOSE-STALE | 2023-08-30 | enhancement |
| 716 | CLOSE-STALE | 2023-09-08 | - |
| 721 | CLOSE-STALE | 2023-09-26 | us |
| 723 | CLOSE-STALE | 2023-09-27 | - |
| 725 | CLOSE-STALE | 2023-09-27 | redesign |
| 745 | CLOSE-STALE | 2023-10-18 | - |
| 763 | CLOSE-STALE | 2023-10-21 | - |
| 764 | CLOSE-STALE | 2023-10-21 | - |
| 823 | CLOSE-STALE | 2023-10-28 | - |
| 829 | CLOSE-STALE | 2023-11-01 | us |
| 840 | CLOSE-STALE | 2023-11-17 | - |
| 841 | CLOSE-STALE | 2023-11-17 | - |
| 857 | CLOSE-STALE | 2023-11-22 | - |
| 860 | CLOSE-STALE | 2023-11-22 | - |
| 862 | CLOSE-STALE | 2023-11-22 | - |
| 883 | CLOSE-STALE | 2023-11-23 | - |
| 887 | CLOSE-STALE | 2023-11-23 | - |
| 888 | CLOSE-STALE | 2023-11-23 | - |
| 889 | CLOSE-STALE | 2023-11-23 | - |
| 895 | CLOSE-STALE | 2023-11-25 | - |
| 898 | CLOSE-STALE | 2023-11-26 | - |
| 904 | CLOSE-STALE | 2023-11-27 | - |
| 915 | CLOSE-STALE | 2023-11-28 | - |
| 919 | CLOSE-STALE | 2023-11-29 | - |
| 920 | CLOSE-STALE | 2023-11-29 | - |
| 964 | CLOSE-STALE | 2023-12-14 | - |
| 965 | CLOSE-STALE | 2023-12-14 | - |
| 966 | CLOSE-STALE | 2023-12-14 | - |
| 972 | CLOSE-STALE | 2023-12-16 | - |
| 985 | CLOSE-STALE | 2023-12-19 | - |
| 989 | CLOSE-STALE | 2023-12-19 | tests |
| 990 | CLOSE-STALE | 2023-12-20 | - |
| 998 | CLOSE-STALE | 2023-12-21 | - |
| 1015 | CLOSE-STALE | 2023-12-25 | charts |
| 1032 | CLOSE-STALE | 2023-12-27 | - |
| 1033 | CLOSE-STALE | 2023-12-27 | - |
| 1047 | CLOSE-STALE | 2023-12-28 | - |
| 1049 | CLOSE-STALE | 2023-12-28 | charts |
| 1070 | CLOSE-STALE | 2023-12-30 | - |
| 1079 | CLOSE-STALE | 2023-12-31 | bug |
| 1100 | CLOSE-STALE | 2024-01-03 | - |
| 1101 | CLOSE-STALE | 2024-01-03 | gpt |
| 1110 | CLOSE-STALE | 2024-01-05 | - |
| 1135 | CLOSE-STALE | 2024-01-09 | - |
| 1140 | CLOSE-STALE | 2024-01-09 | - |
| 1152 | CLOSE-STALE | 2024-01-11 | charts |
| 1171 | CLOSE-STALE | 2024-01-12 | code-health |
| 1172 | CLOSE-STALE | 2024-01-12 | code-health |
| 1173 | CLOSE-STALE | 2024-01-12 | code-health |
| 1174 | CLOSE-STALE | 2024-01-12 | code-health |
| 1175 | CLOSE-STALE | 2024-01-12 | code-health |
| 1176 | CLOSE-STALE | 2024-01-12 | code-health |
| 1177 | CLOSE-STALE | 2024-01-12 | code-health |
| 1180 | CLOSE-STALE | 2024-01-12 | - |
| 1181 | CLOSE-STALE | 2024-01-12 | - |
| 1188 | CLOSE-STALE | 2024-01-15 | - |
| 1191 | CLOSE-STALE | 2024-01-15 | - |
| 1197 | CLOSE-STALE | 2024-01-16 | - |
| 1198 | CLOSE-STALE | 2024-01-16 | - |
| 1205 | CLOSE-STALE | 2024-01-17 | - |
| 1206 | CLOSE-STALE | 2024-01-17 | - |
| 1210 | CLOSE-STALE | 2024-01-17 | - |
| 1211 | CLOSE-STALE | 2024-01-17 | bug |
| 1213 | CLOSE-STALE | 2024-01-18 | - |
| 1215 | CLOSE-STALE | 2024-01-18 | - |
| 1216 | CLOSE-STALE | 2024-01-19 | - |
| 1223 | CLOSE-STALE | 2024-01-19 | - |
| 1224 | CLOSE-STALE | 2024-01-19 | - |
| 1226 | CLOSE-STALE | 2024-01-19 | - |
| 1230 | CLOSE-STALE | 2024-01-19 | - |
| 1235 | CLOSE-STALE | 2024-01-19 | - |
| 1260 | CLOSE-STALE | 2024-01-23 | - |
| 1264 | CLOSE-STALE | 2024-01-23 | - |
| 1276 | CLOSE-STALE | 2024-01-24 | - |
| 1282 | CLOSE-STALE | 2024-01-24 | - |
| 1287 | CLOSE-STALE | 2024-01-27 | - |
| 1290 | CLOSE-STALE | 2024-01-29 | - |
| 1299 | CLOSE-STALE | 2024-01-31 | - |
| 1300 | CLOSE-STALE | 2024-01-31 | - |
| 1313 | CLOSE-STALE | 2024-02-02 | - |
| 1314 | CLOSE-STALE | 2024-02-02 | - |
| 1315 | CLOSE-STALE | 2024-02-02 | charts |
| 1321 | CLOSE-STALE | 2024-02-04 | blog |
| 1330 | CLOSE-STALE | 2024-02-06 | - |
| 1331 | CLOSE-STALE | 2024-02-06 | - |
| 1332 | CLOSE-STALE | 2024-02-07 | - |
| 1343 | CLOSE-STALE | 2024-02-12 | - |
| 1344 | CLOSE-STALE | 2024-02-12 | - |
| 1345 | CLOSE-STALE | 2024-02-12 | - |
| 1353 | CLOSE-STALE | 2024-02-13 | - |
| 1360 | CLOSE-STALE | 2024-02-15 | - |
| 1362 | CLOSE-STALE | 2024-02-15 | charts |
| 1363 | CLOSE-STALE | 2024-02-15 | - |
| 1364 | CLOSE-STALE | 2024-02-15 | charts |
| 1365 | CLOSE-STALE | 2024-02-15 | charts |
| 1369 | CLOSE-STALE | 2024-02-17 | - |
| 1370 | CLOSE-STALE | 2024-02-19 | - |
| 1371 | CLOSE-STALE | 2024-02-19 | - |
| 1372 | CLOSE-STALE | 2024-02-19 | - |
| 1384 | CLOSE-STALE | 2024-02-21 | - |
| 1402 | CLOSE-STALE | 2024-02-22 | - |
| 1407 | CLOSE-STALE | 2024-02-23 | - |
| 1413 | CLOSE-STALE | 2024-02-23 | - |
| 1426 | CLOSE-STALE | 2024-02-28 | - |
| 1429 | CLOSE-STALE | 2024-02-29 | DMP 2024 |
| 1438 | CLOSE-STALE | 2024-03-04 | - |
| 1447 | CLOSE-STALE | 2024-03-04 | - |
| 1448 | CLOSE-STALE | 2024-03-04 | - |
| 1457 | CLOSE-STALE | 2024-03-07 | - |
| 1463 | CLOSE-STALE | 2024-03-07 | - |
| 1467 | CLOSE-STALE | 2024-03-08 | - |
| 1472 | CLOSE-STALE | 2024-03-15 | gpt |
| 1473 | CLOSE-STALE | 2024-03-16 | - |
| 1477 | CLOSE-STALE | 2024-03-18 | - |
| 1479 | CLOSE-STALE | 2024-03-18 | - |
| 1485 | CLOSE-STALE | 2024-03-19 | - |
| 1486 | CLOSE-STALE | 2024-03-19 | - |
| 1490 | CLOSE-STALE | 2024-03-21 | - |
| 1491 | CLOSE-STALE | 2024-03-22 | - |
| 1494 | CLOSE-STALE | 2024-03-24 | - |
| 1508 | CLOSE-STALE | 2024-03-26 | - |
| 1510 | CLOSE-STALE | 2024-03-27 | - |
| 1518 | CLOSE-STALE | 2024-03-28 | - |
| 1519 | CLOSE-STALE | 2024-03-28 | - |
| 1520 | CLOSE-STALE | 2024-03-28 | - |
| 1525 | CLOSE-STALE | 2024-03-29 | - |
| 1536 | CLOSE-STALE | 2024-04-02 | - |
| 1552 | CLOSE-DUPLICATE →v1#1665 | 2024-04-03 | - |
| 1559 | CLOSE-STALE | 2024-04-04 | - |
| 1563 | CLOSE-STALE | 2024-04-04 | - |
| 1566 | CLOSE-STALE | 2024-04-04 | - |
| 1567 | CLOSE-STALE | 2024-04-04 | - |
| 1570 | CLOSE-STALE | 2024-04-05 | - |
| 1582 | CLOSE-STALE | 2024-04-09 | - |
| 1594 | CLOSE-STALE | 2024-04-12 | - |
| 1596 | CLOSE-STALE | 2024-04-12 | - |
| 1601 | CLOSE-STALE | 2024-04-12 | - |
| 1603 | CLOSE-STALE | 2024-04-14 | blog |
| 1650 | CLOSE-STALE | 2024-04-27 | - |
| 1652 | CLOSE-STALE | 2024-04-29 | - |
| 1654 | CLOSE-STALE | 2024-04-29 | - |
| 1657 | CLOSE-STALE | 2024-04-29 | - |
| 1658 | CLOSE-STALE | 2024-04-29 | - |
| 1665 | CLOSE-STALE | 2024-04-30 | - |
| 1671 | CLOSE-STALE | 2024-04-30 | enhancement |
| 1672 | CLOSE-STALE | 2024-04-30 | - |
| 1674 | CLOSE-STALE | 2024-04-30 | - |
| 1688 | CLOSE-STALE | 2024-05-02 | - |
| 1691 | CLOSE-STALE | 2024-05-02 | good first issue |
| 1692 | CLOSE-STALE | 2024-05-02 | - |
| 1695 | CLOSE-STALE | 2024-05-02 | - |
| 1714 | CLOSE-STALE | 2024-05-06 | enhancement |
| 1719 | CLOSE-STALE | 2024-05-06 | - |
| 1727 | CLOSE-STALE | 2024-05-08 | - |
| 1728 | CLOSE-STALE | 2024-05-08 | - |
| 1729 | CLOSE-STALE | 2024-05-08 | - |
| 1741 | CLOSE-STALE | 2024-05-08 | - |
| 1789 | CLOSE-STALE | 2024-05-17 | - |
| 1805 | CLOSE-STALE | 2024-05-23 | - |
| 1806 | CLOSE-STALE | 2024-05-23 | - |
| 1807 | CLOSE-STALE | 2024-05-23 | - |
| 1808 | CLOSE-STALE | 2024-05-23 | - |
| 1810 | CLOSE-STALE | 2024-05-23 | - |
| 1812 | CLOSE-STALE | 2024-05-23 | - |
| 1826 | CLOSE-STALE | 2024-05-27 | - |
| 1834 | CLOSE-STALE | 2024-05-28 | - |
| 1840 | CLOSE-STALE | 2024-05-30 | - |
| 1860 | CLOSE-STALE | 2024-06-09 | - |
| 1861 | CLOSE-STALE | 2024-06-10 | bug |
| 1867 | CLOSE-STALE | 2024-06-11 | - |
| 1876 | CLOSE-STALE | 2024-06-13 | - |
| 1881 | CLOSE-STALE | 2024-06-17 | - |
| 1885 | CLOSE-STALE | 2024-06-17 | - |
| 1886 | CLOSE-STALE | 2024-06-17 | - |
| 1887 | CLOSE-STALE | 2024-06-18 | - |
| 1894 | CLOSE-STALE | 2024-06-13 | - |
| 1900 | CLOSE-STALE | 2024-06-28 | uk,blog |
| 1928 | CLOSE-STALE | 2024-07-12 | - |
| 1934 | CLOSE-STALE | 2024-07-24 | - |
| 1938 | CLOSE-STALE | 2024-07-30 | bug |
| 1940 | CLOSE-STALE | 2024-07-30 | - |
| 1942 | CLOSE-STALE | 2024-07-31 | - |
| 1946 | CLOSE-STALE | 2024-08-07 | blog |
| 1949 | CLOSE-STALE | 2024-08-08 | enhancement |
| 1957 | CLOSE-STALE | 2024-08-12 | - |
| 1960 | CLOSE-STALE | 2024-08-12 | - |
| 1972 | CLOSE-STALE | 2024-08-16 | - |
| 1981 | CLOSE-STALE | 2024-08-18 | - |
| 1991 | CLOSE-STALE | 2024-08-22 | - |
| 1996 | CLOSE-STALE | 2024-08-31 | - |
| 2002 | CLOSE-STALE | 2024-09-02 | - |
| 2004 | CLOSE-STALE | 2024-09-03 | good first issue |
| 2005 | CLOSE-STALE | 2024-09-04 | - |
| 2006 | CLOSE-DUPLICATE →v1#2007 | 2024-09-04 | - |
| 2007 | CLOSE-STALE | 2024-09-04 | - |
| 2008 | CLOSE-STALE | 2024-09-04 | - |
| 2015 | CLOSE-STALE | 2024-09-16 | - |
| 2032 | CLOSE-STALE | 2024-09-25 | - |
| 2050 | CLOSE-STALE | 2024-09-29 | - |
| 2051 | CLOSE-STALE | 2024-09-30 | bug |
| 2053 | CLOSE-STALE | 2024-09-30 | - |
| 2059 | CLOSE-STALE | 2024-10-01 | - |
| 2060 | CLOSE-STALE | 2024-10-01 | - |
| 2061 | CLOSE-STALE | 2024-10-01 | - |
| 2069 | KEEP-REFILE | 2024-10-01 | enhancement |
| 2074 | CLOSE-STALE | 2024-10-04 | - |
| 2075 | CLOSE-STALE | 2024-10-04 | - |
| 2077 | CLOSE-STALE | 2024-10-07 | - |
| 2078 | CLOSE-STALE | 2024-10-07 | - |
| 2088 | CLOSE-STALE | 2024-10-08 | - |
| 2089 | CLOSE-STALE | 2024-10-08 | - |
| 2090 | CLOSE-STALE | 2024-10-09 | - |
| 2092 | CLOSE-STALE | 2024-10-10 | - |
| 2098 | CLOSE-STALE | 2024-10-14 | bug |
| 2104 | CLOSE-STALE | 2024-09-26 | enhancement,good first issue |
| 2105 | CLOSE-DUPLICATE →v1#2107 | 2024-10-17 | - |
| 2107 | CLOSE-STALE | 2024-10-17 | - |
| 2110 | CLOSE-DUPLICATE →v1#2107 | 2024-10-18 | - |
| 2115 | CLOSE-STALE | 2024-10-21 | - |
| 2117 | CLOSE-STALE | 2024-10-21 | - |
| 2124 | CLOSE-STALE | 2024-10-22 | - |
| 2126 | CLOSE-STALE | 2024-10-23 | bug |
| 2127 | CLOSE-STALE | 2024-10-23 | - |
| 2128 | CLOSE-STALE | 2024-10-23 | - |
| 2132 | CLOSE-STALE | 2024-10-24 | - |
| 2157 | CLOSE-STALE | 2024-10-30 | - |
| 2162 | CLOSE-STALE | 2024-10-30 | - |
| 2164 | CLOSE-STALE | 2024-10-30 | - |
| 2167 | CLOSE-STALE | 2024-10-31 | - |
| 2174 | CLOSE-STALE | 2024-10-31 | - |
| 2201 | CLOSE-STALE | 2024-11-08 | - |
| 2202 | CLOSE-STALE | 2024-11-08 | - |
| 2205 | CLOSE-STALE | 2024-11-11 | - |
| 2206 | CLOSE-STALE | 2024-11-14 | - |
| 2220 | CLOSE-STALE | 2024-11-21 | - |
| 2225 | CLOSE-STALE | 2024-11-22 | - |
| 2251 | CLOSE-STALE | 2024-12-15 | - |
| 2256 | CLOSE-STALE | 2024-12-18 | - |
| 2265 | CLOSE-STALE | 2024-12-20 | - |
| 2267 | CLOSE-STALE | 2024-12-23 | - |
| 2272 | CLOSE-STALE | 2024-12-27 | - |
| 2275 | CLOSE-STALE | 2024-12-27 | - |
| 2282 | CLOSE-STALE | 2024-12-30 | - |
| 2289 | CLOSE-STALE | 2025-01-02 | - |
| 2300 | CLOSE-STALE | 2025-01-15 | - |
| 2302 | CLOSE-STALE | 2025-01-17 | - |
| 2323 | CLOSE-STALE | 2025-01-24 | - |
| 2329 | CLOSE-STALE | 2025-01-31 | - |
| 2339 | CLOSE-STALE | 2025-02-04 | - |
| 2352 | CLOSE-STALE | 2025-02-11 | - |
| 2353 | CLOSE-STALE | 2025-02-11 | - |
| 2363 | CLOSE-STALE | 2025-02-18 | blog |
| 2364 | CLOSE-STALE | 2025-02-18 | - |
| 2376 | CLOSE-STALE | 2025-02-25 | blog |
| 2414 | CLOSE-STALE | 2025-03-14 | - |
| 2418 | CLOSE-STALE | 2025-03-17 | - |
| 2422 | CLOSE-STALE | 2025-03-19 | - |
| 2434 | CLOSE-STALE | 2025-03-23 | - |
| 2442 | CLOSE-STALE | 2025-03-25 | - |
| 2448 | CLOSE-STALE | 2025-03-28 | - |
| 2459 | CLOSE-STALE | 2025-04-01 | - |
| 2474 | CLOSE-STALE | 2025-04-03 | - |
| 2475 | CLOSE-STALE | 2025-04-04 | - |
| 2481 | KEEP-REFILE | 2025-04-08 | enhancement |
| 2482 | CLOSE-STALE | 2025-04-08 | - |
| 2486 | CLOSE-STALE | 2025-04-10 | - |
| 2489 | CLOSE-STALE | 2025-04-10 | - |
| 2493 | CLOSE-STALE | 2025-04-10 | - |
| 2516 | CLOSE-STALE | 2025-05-02 | documentation |
| 2522 | CLOSE-STALE | 2025-05-10 | - |
| 2527 | KEEP-REFILE | 2025-05-13 | - |
| 2529 | CLOSE-STALE | 2025-05-14 | - |
| 2534 | CLOSE-STALE | 2025-05-15 | - |
| 2535 | CLOSE-STALE | 2025-05-15 | - |
| 2541 | CLOSE-STALE | 2025-05-16 | bug |
| 2547 | CLOSE-STALE | 2025-05-19 | enhancement |
| 2548 | CLOSE-STALE | 2025-05-19 | - |
| 2554 | CLOSE-STALE | 2025-05-20 | - |
| 2571 | CLOSE-STALE | 2025-05-24 | - |
| 2574 | CLOSE-STALE | 2025-05-25 | - |
| 2575 | KEEP-REFILE | 2025-05-26 | enhancement |
| 2589 | CLOSE-STALE | 2025-05-30 | - |
| 2601 | CLOSE-STALE | 2025-06-08 | - |
| 2604 | KEEP-REFILE | 2025-06-10 | - |
| 2610 | CLOSE-STALE | 2025-06-12 | - |
| 2616 | CLOSE-STALE | 2025-06-17 | - |
| 2619 | CLOSE-STALE | 2025-06-23 | blog |
| 2625 | CLOSE-STALE | 2025-06-25 | bug |
| 2626 | CLOSE-STALE | 2025-06-26 | - |
| 2630 | KEEP-REFILE | 2025-07-01 | - |
| 2636 | CLOSE-STALE | 2025-07-01 | - |
| 2638 | CLOSE-STALE | 2025-07-03 | - |
| 2650 | KEEP-REFILE | 2025-07-06 | - |
| 2654 | CLOSE-STALE | 2025-07-07 | blog |
| 2656 | CLOSE-STALE | 2025-07-07 | - |
| 2659 | CLOSE-STALE | 2025-07-09 | - |
| 2660 | CLOSE-STALE | 2025-07-09 | blog |
| 2661 | KEEP-HAS-V2-EQUIV →v2#999 | 2025-07-11 | - |
| 2662 | CLOSE-STALE | 2025-07-12 | - |
| 2665 | CLOSE-STALE | 2025-07-14 | - |
| 2670 | CLOSE-STALE | 2025-07-14 | - |
| 2671 | CLOSE-STALE | 2025-07-14 | - |
| 2674 | CLOSE-STALE | 2025-07-16 | - |
| 2675 | CLOSE-STALE | 2025-07-16 | - |
| 2677 | CLOSE-STALE | 2025-07-16 | - |
| 2678 | CLOSE-STALE | 2025-07-16 | - |
| 2683 | CLOSE-STALE | 2025-07-17 | blog |
| 2687 | CLOSE-STALE | 2025-07-22 | - |
| 2705 | CLOSE-STALE | 2025-07-27 | - |
| 2710 | CLOSE-STALE | 2025-07-31 | - |
| 2711 | CLOSE-STALE | 2025-07-31 | - |
| 2716 | CLOSE-STALE | 2025-08-03 | - |
| 2724 | CLOSE-STALE | 2025-08-11 | - |
| 2727 | CLOSE-STALE | 2025-08-11 | - |
| 2729 | CLOSE-STALE | 2025-08-11 | - |
| 2738 | CLOSE-STALE | 2025-08-19 | - |
| 2760 | CLOSE-STALE | 2025-09-29 | - |
| 2798 | KEEP-HAS-V2-EQUIV →v2#364 | 2025-11-01 | - |
| 2830 | KEEP-HAS-V2-EQUIV →v2#940 | 2026-04-21 | - |
| 2831 | KEEP-HAS-V2-EQUIV →v2#940 | 2026-04-21 | - |
| 2833 | KEEP-REFILE | 2026-04-21 | - |
| 2845 | KEEP-HAS-V2-EQUIV →v2#1079 | 2026-07-06 | - |

**Final count:** 394 issues total — KEEP-REFILE 8, KEEP-HAS-V2-EQUIV 5, CLOSE-STALE 377, CLOSE-DUPLICATE 4. Sum = 394. All 394 accounted for.