People increasingly ask AI models to help them understand their taxes and benefits. We built PolicyBench to measure a concrete question underneath that: can a frontier model compute a household's taxes and benefits from the prompt alone — no tools, no lookups, one structured answer?

[PolicyBench](https://policybench.org) gives each model the same household description and asks for every scored tax and benefit output plus a short explanation, with no tool use, and scores the answers against PolicyEngine-US.

# The setup

PolicyBench evaluates 13 frontier models on 100 US households drawn from PolicyEngine's populace microdata, across 18 tax and benefit outputs per household, for tax year 2026.

The headline metric is exact match: the share of outputs where a model's value equals PolicyEngine's exactly — to the dollar for amounts, and the right decision for eligibility flags. It is the deployability bar, since a household filing taxes or claiming a benefit needs the right number, not a near one. The public leaderboard weights each output by its impact on household resources across the population, which keeps exact match informative even though the reference is zero-inflated: 84% of reference outputs are exact zeros, because most households are not eligible for most programs, so an unweighted exact rate would mostly measure how often a model answers zero. We report a within-1% hit rate alongside it as a near-miss-tolerant companion.

# GPT-5.5 leads

GPT-5.5 ranks first, matching PolicyEngine exactly on 80.3% of its outputs. The second through ninth models fall between 76.0% and 77.8%, and GPT-5.4 nano scores lowest, at 62.2%.

| Rank | Model                         | Exact | Within-1% |
| ---- | ----------------------------- | ----- | --------- |
| 1    | GPT-5.5                       | 80.3% | 82.6%     |
| 2    | Gemini 3.1 Pro Preview        | 77.8% | 78.3%     |
| 3    | Claude Opus 4.7               | 77.3% | 78.3%     |
| 4    | Grok 4.3                      | 77.2% | 79.1%     |
| 5    | Claude Sonnet 4.6             | 77.0% | 78.2%     |
| 6    | Gemini 3 Flash Preview        | 76.8% | 77.5%     |
| 7    | Gemini 3.5 Flash              | 76.1% | 76.9%     |
| 8    | Gemini 3.1 Flash Lite Preview | 76.0% | 77.9%     |
| 9    | Grok Build 0.1                | 76.0% | 77.0%     |
| 10   | Claude Opus 4.8               | 72.5% | 73.8%     |
| 11   | Claude Haiku 4.5              | 71.7% | 73.2%     |
| 12   | GPT-5.4 mini                  | 70.4% | 72.3%     |
| 13   | GPT-5.4 nano                  | 62.2% | 63.2%     |

# Amounts are harder than eligibility

The hardest outputs are the ones that require a multi-step dollar calculation. Federal and state income tax before credits are the lowest, at 47.1% and 53.3% exact: each requires selecting the right income concepts, applying exclusions and thresholds, and sequencing them correctly before arriving at a number. Payroll tax (68.2%) and SNAP (76.8%), a benefit paid as a computed amount, sit just above.

The highest-scoring outputs are eligibility flags and programs that are zero for most households. Medicare, CHIP, WIC, SSI, TANF, and school-meal outputs mostly exceed 95% exact. Part of that is that many are yes/no eligibility decisions rather than amounts; part is that most households do not qualify, and a correct "does not apply" is easier than a correct dollar figure.

So the divide is less taxes versus benefits than computed amounts versus eligibility. SNAP, a computed benefit, scores like the income taxes, while TANF and SSI — paid to a small share of households and zero for the rest — score above 96%. Models reliably decide whether a program applies; they are less reliable at computing how much.

# Auditing the errors

A benchmark is only as good as its reference. We reviewed by hand every cell where a model's answer was not an exact match — 3,300 in all. Every one was a model error; none was a PolicyEngine reference error.

# The data and code are open

PolicyBench includes a live leaderboard, a scenario explorer that exposes every prompt and every PolicyEngine reference output, and a [full paper](https://policybench.org/paper) documenting the method, scoring, and uncertainty. Because PolicyEngine is an open, deterministic calculator, it can serve as a reusable, open reference for evaluating AI on tax and benefit tasks.

Explore the benchmark at [policybench.org](https://policybench.org) and read the [paper](https://policybench.org/paper).
