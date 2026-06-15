People increasingly ask AI models to help them understand their taxes and benefits. We built PolicyBench to measure a concrete question underneath that: can a frontier model compute a household's taxes and benefits from the prompt alone — no tools, no lookups, one structured answer?

[PolicyBench](https://policybench.org) gives each model the same household description and asks for every scored tax and benefit output plus a short explanation, with no tool use, and scores the answers against PolicyEngine-US.

# The setup

PolicyBench evaluates 13 frontier models on 100 US households drawn from PolicyEngine's populace microdata, across 18 tax and benefit outputs per household, for tax year 2026.

The headline metric is the within-1% hit rate: the share of outputs a model gets within 1% of PolicyEngine's value. We use within-1% rather than exact match because 84% of the reference outputs are exact zeros, since most households are not eligible for most programs. A model that always answered zero would score 84% on exact match without computing anything, so within-1% measures accuracy on the cases that require an actual calculation.

# GPT-5.5 leads

GPT-5.5 ranks first, with 82.6% of outputs within 1% of PolicyEngine's value. The second through ninth models fall between 76.9% and 79.1%, and GPT-5.4 nano scores lowest, at 63.2%.

| Rank | Model                         | Within-1% |
| ---- | ----------------------------- | --------- |
| 1    | GPT-5.5                       | 82.6%     |
| 2    | Grok 4.3                      | 79.1%     |
| 3    | Gemini 3.1 Pro Preview        | 78.3%     |
| 4    | Claude Opus 4.7               | 78.3%     |
| 5    | Claude Sonnet 4.6             | 78.2%     |
| 6    | Gemini 3.1 Flash Lite Preview | 77.9%     |
| 7    | Gemini 3 Flash Preview        | 77.5%     |
| 8    | Grok Build 0.1                | 77.0%     |
| 9    | Gemini 3.5 Flash              | 76.9%     |
| 10   | Claude Opus 4.8               | 73.8%     |
| 11   | Claude Haiku 4.5              | 73.2%     |
| 12   | GPT-5.4 mini                  | 72.3%     |
| 13   | GPT-5.4 nano                  | 63.2%     |

# Taxes are harder than benefits

The clearest pattern in the results is the split between taxes and benefits. Across all 13 models, 93.7% of benefit outputs land within 1% of PolicyEngine, against 76.8% of tax outputs.

Income tax drives the gap. Federal and state income tax before credits score around 52% within 1%, the lowest of any output, because each is a multi-step dollar calculation: the model has to select the right income concepts, apply exclusions and thresholds, and sequence them correctly before arriving at a number. Payroll tax, at 72.5%, sits in between.

Benefit eligibility is where models do best. Medicare, WIC, SSI, TANF, and school-meal eligibility mostly clear 90% within 1%. Part of that is that many of these outputs are yes/no eligibility flags rather than amounts, and part is that most households are not eligible — a correct "does not apply" is easier than a correct dollar figure.

The exception clarifies the pattern: SNAP, a benefit paid as a computed amount, scores 77.5%, closer to the tax outputs than to the eligibility flags. The divide is less about taxes versus benefits as categories and more about computed amounts versus eligibility. Models are reliable at deciding whether a program applies and less reliable at computing how much.

# Auditing the errors

A benchmark is only as good as its reference. We reviewed every one of the 3,300 wrong cells by hand. All 3,300 were model errors; none were PolicyEngine reference errors.

# The data and code are open

PolicyBench includes a live leaderboard, a scenario explorer that exposes every prompt and every PolicyEngine reference output, and a [full paper](https://policybench.org/paper) documenting the method, scoring, and uncertainty. Because PolicyEngine is an open, deterministic calculator, it can serve as a reusable, open reference for evaluating AI on tax and benefit tasks.

Explore the benchmark at [policybench.org](https://policybench.org) and read the [paper](https://policybench.org/paper).
