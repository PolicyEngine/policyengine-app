Since we [beta-launched PolicyEngine US in March](https://blog.policyengine.org/policyengine-comes-stateside-cef88b122e48), we’ve been working on two major new features: (a) state taxes and benefits, and (b) microdata for population-level analysis. We’re thrilled to share that we’ve launched an initial version of the latter. When you create a custom tax and benefit reform, you can now see the impact beyond a single household, zooming out to the US-wide impacts on poverty, inequality, and the budget.

## Case study: the End Child Poverty Act

As a case study, consider the [End Child Poverty Act](https://www.congress.gov/bill/117th-congress/house-bill/6598?s=1&r=4) (ECPA), which Representatives Rashida Tlaib (D-MA) and Mondaire Jones (D-NY) introduced in February 2022. This bill replaces the Child Tax Credit and Earned Income Tax Credit with a universal child allowance, an adult dependent credit, and a filer credit. [You can see a simulation of the End Child Poverty Act’s impact in PolicyEngine US here.](https://policyengine.org/us/population-impact?abolish_eitc=1&end_child_poverty_act_adult_dependent_credit_amount=600&end_child_poverty_act_filer_credit_amount_HEAD_OF_HOUSEHOLD=600&end_child_poverty_act_filer_credit_amount_JOINT=1200&end_child_poverty_act_filer_credit_amount_SEPARATE=600&end_child_poverty_act_filer_credit_amount_SINGLE=600&end_child_poverty_act_filer_credit_amount_WIDOW=600&end_child_poverty_act_filer_credit_phase_out_start_HEAD_OF_HOUSEHOLD=20000&end_child_poverty_act_filer_credit_phase_out_start_JOINT=40000&end_child_poverty_act_filer_credit_phase_out_start_SEPARATE=20000&end_child_poverty_act_filer_credit_phase_out_start_SINGLE=20000&end_child_poverty_act_filer_credit_phase_out_start_WIDOW=20000&end_child_poverty_act_filer_credit_phase_out_rate=5&young_child_bi=4716&older_child_bi_age=19&abolish_non_refundable_ctc=1&abolish_refundable_ctc=1&young_adult_bi_age=20)

The Population Impact page starts with a disclaimer about the data (see the *Caveats *section of this post below), as well as some high-level measures of the reform’s impact.

![](https://cdn-images-1.medium.com/max/3200/0*FjhnllD4qmxZ7VU5)

Next is a breakdown of the budgetary impact, showing that the ECPA’s $242 billion net cost comprises $347 billion in benefit outlays, less $104 billion in tax revenues (in this case, repealed tax credits).

![](https://cdn-images-1.medium.com/max/3200/0*_X7ok61wCzUpisU9)

Next, we show the impact on poverty by age group, using the [Supplemental Poverty Measure](https://www.census.gov/topics/income-poverty/supplemental-poverty-measure.html). You can also toggle the switch to view the impact on deep poverty, the population share whose household income is less than half their poverty threshold.

![](https://cdn-images-1.medium.com/max/3200/0*U1_M0nGig_uxktg7)

We then show a common distributional chart: the average impact by income decile. Switch from relative to absolute to see the impact in dollars rather than a percent of the decile’s initial net income (after taxes and benefits).

![](https://cdn-images-1.medium.com/max/3200/0*gCvfQcPo2JBtnOe1)

While the above chart shows the average change, reforms rarely affect everyone in each decile equally. The following chart breaks down the members of each income decile based on whether the reform strongly increases or decreases their net income (5% or more), mildly increases or decreases their net income (less than 5%), or does not affect them.

![](https://cdn-images-1.medium.com/max/3200/0*m-KnmZb9JsxYuCt5)

Finally, the Population Impact screen shows how the reform affects three measures of income inequality: the [Gini index](https://en.wikipedia.org/wiki/Gini_coefficient), a broad statistical measure; the share of net income held by the top 10%; and the share of net income held by the top 1%.

![](https://cdn-images-1.medium.com/max/3200/0*GkAw2gWXxfWf2T3R)

You can also see the [End Child Poverty Act’s impact on Massachusetts](https://policyengine.org/us/population-impact?abolish_eitc=1&end_child_poverty_act_adult_dependent_credit_amount=600&end_child_poverty_act_filer_credit_amount_HEAD_OF_HOUSEHOLD=600&end_child_poverty_act_filer_credit_amount_JOINT=1200&end_child_poverty_act_filer_credit_amount_SEPARATE=600&end_child_poverty_act_filer_credit_amount_SINGLE=600&end_child_poverty_act_filer_credit_amount_WIDOW=600&end_child_poverty_act_filer_credit_phase_out_start_HEAD_OF_HOUSEHOLD=20000&end_child_poverty_act_filer_credit_phase_out_start_JOINT=40000&end_child_poverty_act_filer_credit_phase_out_start_SEPARATE=20000&end_child_poverty_act_filer_credit_phase_out_start_SINGLE=20000&end_child_poverty_act_filer_credit_phase_out_start_WIDOW=20000&end_child_poverty_act_filer_credit_phase_out_rate=5&young_child_bi=4716&older_child_bi_age=19&abolish_non_refundable_ctc=1&abolish_refundable_ctc=1&young_adult_bi_age=20&baseline_state_specific=MA) by selecting Massachusetts from the _Simulation > Geography_ page on the Policy screen. We’ll add more states to that drop-down as we implement more state income tax systems.

\*Note: Our nationwide estimates of policy reforms keep state income taxes fixed at the values CPS respondents report. We simulate state income taxes only for state-specific analyses. The ECPA leaves some people worse off in the Massachusetts analysis because it repeals the EITC, which Massachusetts partially matches in its tax code.\

As always, users can view the reform’s personalized impact by selecting the [_Your household_ tab](https://policyengine.org/us/household?abolish_eitc=1&end_child_poverty_act_adult_dependent_credit_amount=600&end_child_poverty_act_filer_credit_amount_HEAD_OF_HOUSEHOLD=600&end_child_poverty_act_filer_credit_amount_JOINT=1200&end_child_poverty_act_filer_credit_amount_SEPARATE=600&end_child_poverty_act_filer_credit_amount_SINGLE=600&end_child_poverty_act_filer_credit_amount_WIDOW=600&end_child_poverty_act_filer_credit_phase_out_start_HEAD_OF_HOUSEHOLD=20000&end_child_poverty_act_filer_credit_phase_out_start_JOINT=40000&end_child_poverty_act_filer_credit_phase_out_start_SEPARATE=20000&end_child_poverty_act_filer_credit_phase_out_start_SINGLE=20000&end_child_poverty_act_filer_credit_phase_out_start_WIDOW=20000&end_child_poverty_act_filer_credit_phase_out_rate=5&young_child_bi=4716&older_child_bi_age=19&abolish_non_refundable_ctc=1&abolish_refundable_ctc=1&young_adult_bi_age=20) at the top.

## Caveats

The PolicyEngine US Population Impact page uses the 2020 Current Population Survey (CPS) March Supplement, a representative household survey that powers many tax and benefit microsimulation analyses. The CPS covers many topics, from household structure and demographics to income and benefit receipt, but it has several drawbacks when it comes to microsimulation:

- Truncated incomes. The CPS truncates high incomes for privacy. This means that PolicyEngine US will underestimate the magnitude of tax reforms affecting high earners.

- Underestimated benefits. Aggregate benefits in the CPS fall short of administrative totals. We recalculate benefits from current rules for households that reported receiving them, which shrinks the gap, but PolicyEngine US still underestimates the magnitude of benefit reforms.

- 2020 data, 2022 policy. The latest CPS reflects households’ activity throughout calendar year 2020. PolicyEngine US currently applies 2022 tax and benefit policy to household information from 2020, which further underestimates incomes.

- Lack of detail for more specific income types. For example, the CPS asks about total capital gains, so we currently assume that all are long-term.

- Small sample sizes at the state level. The. For example, we currently have Massachusetts tax and benefit policy.

## Next steps

We are partnering with the [Center for Growth and Opportunity](http://thecgo.org) to enhance the CPS data in OpenFisca US. In the coming months, we will address the aforementioned shortcomings with five sets of improvements:

1. Impute missing data from other datasets. For example, we will impute filers’ short-term share of capital gains from the IRS Public Use File and household assets (which affect benefit eligibility) from the Survey of Consumer Finances, using our [synthimpute](https://github.com/policyengine/synthimpute) machine learning software.

1. Augment income with synthetic imputations from the IRS Public Use File (PUF). The PUF is a restricted dataset containing a sample of scrubbed tax records. We will replicate tax units in the CPS and replace income data with imputed values from the PUF, preserving privacy while capturing the true distribution of income — especially at the high end.

1. Extrapolate data. We will apply government projections of earnings, prices, and population to extrapolate survey datasets, which often lag by a year or more, to the current year and over the ten-year budget window.

1. Reweight the data to better match administrative totals. [As we’ve done in PolicyEngine UK](https://blog.policyengine.org/how-machine-learning-tools-make-policyengine-more-accurate-17af859cdd97), we will ingest administrative totals across various dimensions — income, demographics, taxes, and benefits — and apply gradient descent to minimize the discrepancies against these targets. This step follows our stacking of the CPS atop the PUF-imputed CPS, allowing the optimizer to select and weigh the types of data sources that best model the US population and economy.

1. Create enhanced datasets for each state. We will apply the above gradient descent methodology to the full CPS in each state, evening out the raw CPS’s volatile state-level estimates.

We’re excited to see what our users discover about the tax and benefit system by exploring this major new feature, and we can’t wait to make it even more accurate with these enhancements soon.
