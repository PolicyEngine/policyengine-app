# v1 (policyengine-app) PR closure drafts — FOR LEAD REVIEW BEFORE POSTING

Context: policyengine.org is served by `policyengine-app-v2` (cutover 2026-03-30; v1 now at legacy.policyengine.org). This repo is being archived.

**Already closed by the wind-down sweep (courteous notes posted):**
- Dependabot: #2844, #2843, #2840, #2839, #2838, #2837 (6)
- Mine: #2846 (URI fix — re-landed as app-v2 #1090)

**Below: 23 PRs left OPEN for the lead to review before closing** (15 community + 8 other MaxGhenis content/tooling). Each has a one-line summary, a re-land assessment, and a ready-to-post closure note. **Nothing here has been closed or commented.**

A shared closure note works for most; per-PR notes are given where the content may warrant re-landing on v2.

---

## Standard closure note (reusable for tooling / v1-specific / obsolete PRs)

> Thank you for this contribution. Closing as part of the `policyengine-app` (v1) wind-down: policyengine.org is now served by [`policyengine-app-v2`](https://github.com/PolicyEngine/policyengine-app-v2), and this repository is being archived, so changes merged here would not reach the live site.
>
> If this is still relevant, please consider re-opening it against [`policyengine-app-v2`](https://github.com/PolicyEngine/policyengine-app-v2) — we'd welcome it there. Apologies that this sat open through the migration.

---

## Community PRs (15) — DO NOT CLOSE without lead sign-off

| # | Author | Summary | State | Re-land? | Suggested note |
|---|--------|---------|-------|----------|----------------|
| #2829 | vahid-ahmadi | Use British spelling for UK LSR parameter paths | MERGEABLE | Maybe — check if v2 uses same param paths | Standard note; add: "v2 may have already normalized these paths — worth a quick check before re-filing." |
| #2782 | konaspandana017 | Add UK Childcare report fixes | MERGEABLE | Maybe (report content) | Standard note. |
| #2733 | harnish7576 | Replace hardcoded API URL with env variable | MERGEABLE | No — v1 infra; v2 already uses env-based config | Standard note. |
| #2728 | nikhilwoodruff | Update README.md (1 line) | MERGEABLE | No | Standard note (internal author — lead may just close). |
| #2720 | Swetna | Update scrolling logic for developer tools | MERGEABLE | Maybe (if dev-tools view exists in v2) | Standard note. |
| #2718 | costasford | Ensure data.json generated before tests run | MERGEABLE | No — v1 build/test plumbing | Standard note. |
| #2686 | SongmingFan123 | Remove career page + references | MERGEABLE | No — v2 has no career page (already absent) | Standard note; add: "v2 already omits the career page, so this is resolved there." |
| #2679 | v-lerie | Make "County name" a searchable component (US) | MERGEABLE | Maybe — verify v2 report builder region search | Standard note. |
| #2672 | v-lerie | Set benefit increases to negative in net revenue table | MERGEABLE | Maybe — verify v2 net-revenue table sign handling | Standard note; add: "If v2's revenue table still shows this, please re-file — sounds like a real display bug." |
| #2624 | nadamakram | Add simulation queue position display (fixes #2104) | MERGEABLE | Depends — does v2 have a queue UI? | Standard note. |
| #2618 | v-lerie | Fix user profile page error | MERGEABLE | Maybe — verify v2 profile page | Standard note. |
| #2577 | nikhilwoodruff | Add winter fuel allowance post | CONFLICTING | **Likely already on v2** ("Extending the Winter Fuel Allowance" exists) | Standard note; add: "v2 already has a Winter Fuel Allowance post, so this is likely superseded." |
| #2536 | nikhilwoodruff | Add report on 2023 childcare expansion | CONFLICTING | **Yes — no v2 equivalent found** | Post-specific note (below). |
| #2510 | fudgemasterultra | API URL (#2493) | MERGEABLE | No — v1 infra | Standard note. |
| #824 | nikhilwoodruff | Add NI report (2023) | CONFLICTING | **No — superseded** by newer v2 NI posts | Standard note; add: "This 2023 draft is superseded by v2's current NI reform posts." |

## Other MaxGhenis PRs (8) — content/tooling; lead's call

| # | Summary | State | Re-land? | Suggested note |
|---|---------|-------|----------|----------------|
| #2832 | Add always-visible version badge on simulation result pages | MERGEABLE | **Has v2 equivalent** — app-v2 #940 ("Preserve and use resolved model/data provenance") | Note: "Superseded by the v2 provenance work in app-v2#940; closing here." Also close paired issues #2831/#2830 (see issue triage). |
| #2825 | Add policyengine-claude plugin auto-install | MERGEABLE | No — v1 repo tooling | Standard note. |
| #2816 | Update teal profile logo to high-res | MERGEABLE | No — v2 has its own teal assets | Standard note. |
| #2784 | Update blog-post-reviewer agent docs | CONFLICTING | No — v1 repo docs | Standard note. |
| #2780 | Plugin auto-install + blog workflow docs | MERGEABLE | No — v1 repo tooling | Standard note. |
| #2739 | Blog: How we used Claude Code to apply for PBIF | CONFLICTING | **Yes — no v2 equivalent found** | Post-specific note (below). |
| #2717 | Add Users page showcasing user organizations (+8283 lines, 21 files) | MERGEABLE | Maybe — sizeable feature; does v2 want a Users page? | Note: "Large feature; if a Users/organizations page is wanted on v2, this is the reference implementation to port." |
| #2706 | Blog: OBBBA modeling methodology | CONFLICTING | Maybe — v2 has OBBBA Household Explorer + Manager's Amendment posts but not this methodology explainer | Post-specific note (below). |

---

## Post-specific closure notes (blog/content PRs worth re-landing)

**#2536 (2023 childcare expansion report) and #2739 (PBIF/Claude Code post) — no v2 equivalent:**

> Thank you for this post. Closing here as part of the `policyengine-app` (v1) wind-down — the site now runs on [`policyengine-app-v2`](https://github.com/PolicyEngine/policyengine-app-v2), where research posts live under `app/src/data/posts/` and render at `/{country}/research/{slug}`.
>
> I don't see an equivalent post on v2 yet, so this content is worth re-landing there (the same way the PolicyBench launch post was migrated). If you'd like, re-open it against app-v2 with the markdown moved into `app/src/data/posts/articles/` plus a `posts.json` entry, and we'll get it published.

**#2706 (OBBBA modeling methodology):**

> Thanks for this. Closing here (v1 wind-down; site now on [`policyengine-app-v2`](https://github.com/PolicyEngine/policyengine-app-v2)). v2 already has OBBBA coverage (the OBBBA Household Explorer post and the Manager's Amendment post) — if the methodology explainer still adds something those don't cover, please re-land it on app-v2 under `app/src/data/posts/`.
