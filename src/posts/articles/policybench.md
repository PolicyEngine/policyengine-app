People increasingly ask AI models to help them understand their taxes and benefits. We built PolicyBench to measure a concrete question underneath that: can a frontier model compute a household's taxes and benefits from the prompt alone — no tools, no lookups, one structured answer?

[PolicyBench](https://policybench.org) gives each model the same household description and asks for every scored tax and benefit output plus a short explanation, with no tool use, and scores the answers against PolicyEngine-US.

# The setup

PolicyBench evaluates 13 frontier models on 100 US households drawn from PolicyEngine's populace microdata, across 18 tax and benefit outputs per household, for tax year 2026. The headline metric is the within-1% hit rate: the share of outputs a model gets within 1% of PolicyEngine's value.

We lead with within-1% rather than exact match because 84% of the reference outputs are exact zeros, since most households are not eligible for most programs. A model that always answered zero would score 84% on exact match without performing any calculation, so within-1% measures accuracy on the positive cases, where rule comprehension is tested.

# The results

GPT-5.5 ranks first, with 82.6% of outputs within 1% of PolicyEngine's value. The highest-scoring model still misses 17.4% of outputs. The second through ninth models fall between 76.9% and 79.1%; GPT-5.4 nano scores lowest, at 63.2%.

The newest model does not score highest. Claude Opus 4.8 scores 73.8% and ranks 10th of 13, below Claude Opus 4.7 at 78.3%, which ranks 4th.

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

# What models miss

Models identify when a program does not apply more accurately than they compute the positive amounts. Multi-step income tax, federal and state, is the lowest-scoring output: getting it right requires selecting the correct income concepts, exclusions, thresholds, and sequencing before any final subtraction.

# Auditing the errors

We reviewed every one of the 3,300 wrong cells by hand. All 3,300 were model errors; none were PolicyEngine reference errors.

# The data and code are open

PolicyBench includes a live leaderboard, a scenario explorer that exposes every prompt and every PolicyEngine reference output, and a [full paper](https://policybench.org/paper) documenting the method, scoring, and uncertainty. Because PolicyEngine is an open, deterministic calculator, it can serve as a reusable, open reference for evaluating AI on tax and benefit tasks.

Explore the benchmark at [policybench.org](https://policybench.org) and read the [paper](https://policybench.org/paper).
