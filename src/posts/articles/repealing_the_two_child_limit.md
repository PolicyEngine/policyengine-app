_[See the full, customisable impacts on PolicyEngine
here.](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=18304&region=uk&timePeriod=2023&baseline=1)_

## Summary

Introduced in 2017, the two-child limit in Universal Credit restricted
parents from receiving financial support for more than two children
(with children born before 2017 exempt). Using the PolicyEngine
microsimulation model, we estimate that [repealing it would cost £1.8
billion in
2023](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=18304&region=uk&timePeriod=2023&baseline=1),
rising to £2.8 billion in 2025 as non-exempt age cohorts replace exempt
children. The repeal would also lower absolute child poverty before
housing costs by 310,000 this year.

While the Cameron-led Conservative government introduced the two-child
limit, last month, Labour Party leader Sir Keir Starmer [confirmed that
a Labour government would keep the
policy](https://www.theguardian.com/politics/2023/jul/16/labour-keep-two-child-benefit-cap-says-keir-starmer)
due to the cost of repealing it.

In this analysis, we examine how the policy currently affects
households, and use PolicyEngine to estimate the distributional and
poverty impacts of both full and partial repeals proposed by the Child
Poverty Action Group and the Fabian Society. We also attempt to
reproduce claims made using other microsimulation models. The
[open-source code powering the custom analyses in this report can be
found
here](https://gist.github.com/nikhilwoodruff/447d86032ff481bdeb1e35aeeb3ea18c).

[**_See how repealing the two-child limit would affect your household
here._**](https://policyengine.org/uk/household?focus=intro&reform=7226&region=uk&timePeriod=2023&baseline=1)

# How the policy affects households

Households claiming Universal Credit, or the legacy Child Tax Credit,
currently do not receive additional benefits for their third or
subsequent children. With benefit levels recently uprated as of April
2023, the two-child limit reduces benefits by up to £2,935 per child
(lowered with increased parental earnings as the family reduces their
Universal Credit entitlement). The cap applies regardless of whether a
household is in or out of work, but its impact changes with earnings due
to the normal Universal Credit taper.

Figure 1 shows the impact of removing the two-child limit under a range
of employment incomes for a single parent family. The gains are highest
(and equal) for families under around £30,000 in employment income,
after which point the taper rate begins to reclaim the extra benefit
value. For a single parent with 5 children, this value will not be
reduced to zero before more than £60,000 in earnings.

![A graph with numbers and lines Description automatically
generated](/images/posts/repealing_the_two_child_limit/hh_impact.png)

_Figure 1: the impact of removing the UC child limit on net income for a
single parent by number of children and employment income. Note: this
does not incorporate housing costs, which would extend the phase-out
region to the right._

## Repealing the cap

The most straightforward way to repeal the cap is to remove it entirely,
at a cost of £1.8bn in 2023. [^1] This net cost rises over time due to
age cohort transitions: with each year, the minimum age required to be
exempt under the 2017 transitional protection rule increases.[^2]

Under a full abolition, we estimate that the number of children in
absolute poverty before housing costs would fall by 255,000 in 2023
(relative, after housing costs child poverty would fall by 162,000). The
overall absolute, before housing costs poverty rate for all individuals
would fall by 0.7 percentage points, bringing just under 450,000 people
out of absolute poverty.

Table 1 shows a range of other estimates made by the Child Poverty
Action Group using the UKMOD microsimulation model, and PolicyEngine's
replications for comparison. The appendix contains more details about
the reasons PolicyEngine's microsimulation modelling differs from other
estimates.

| Estimate                                                      | CPAG/UKMOD | PolicyEngine | Difference | Relative |
| ------------------------------------------------------------- | ---------- | ------------ | ---------- | -------- |
| Net cost                                                      | £1.3bn     | £1.8bn       | +£500m     | +38%     |
| Child poverty reduction (relative, AHC)                       | 250,000    | 162,000      | -88,000    | -35%     |
| Children in affected households                               | 1,500,000  | 1,780,000    | +280,000   | +19%     |
| Children benefitting but remaining in poverty (relative, AHC) | 850,000    | 1,320,000    | +470,000   | +55%     |

_Table 1: comparisons between CPAG's UKMOD-based modelling results and
PolicyEngine's replications_ _for 2023._

## Alternative repeal methods

The Fabian Society's 2021 report _"Going with the grain"_ proposes
instead repealing the two-child limit for families with a parent who
meets one of the following conditions:

- Having employment or self-employment income

- Receiving disability benefits

- Having a child aged two or under

We estimate this partial abolition would cost £1.3 billion in 2023,
saving £500m compared to the full repeal. The Fabian Society modelling,
based on the IPPR tax-transfer model, projected that the number of
households hit by the two-child limit would fall by 94% from 790,000 to
75,000. This projection assumes a full roll-out of the policy as it
would be in 2035, where the transitional protection rule does not occur.

PolicyEngine estimates in 2023 that 333,000 households are affected by
the two-child limit (close to [estimates by the House of Commons Library
in April 2021 that 317,500 families were
affected](https://commonslibrary.parliament.uk/research-briefings/cbp-9301/)),
and that this would fall by 302,000 to 31,000 (a reduction of 93%, close
to the Fabian Society estimate).

## Conclusion

PolicyEngine's modelling largely aligns with the findings from other
microsimulation models but finds around 30% lower net costs and poverty
impacts than CPAG.

Funding proposals also feature in the discussion around the two-child
limit. Tom Clark, fellow at the Joseph Rowntree Foundation, [pointed to
a 1p increase in the higher rate of income tax as a possible
option](https://twitter.com/prospect_clark/status/1680875250542575618?s=20).
Given our higher net cost estimate for the two-child limit repeal, we
estimate this would leave £470m deficit (distributional impacts shown in
Figure 2).

![A graph of a graph showing the amount of income decile Description
automatically generated](/images/posts/repealing_the_two_child_limit/decile_chart.png)

_Figure 2: [the distributional impacts of funding the two-child limit
repeal with a 1p higher rate
increase.](https://policyengine.org/uk/policy?focus=policyOutput.decileRelativeImpact&reform=18067&region=uk&timePeriod=2023&baseline=1)_

PolicyEngine's microsimulation modelling is completely open-source. [See
the full analysis for the repeal on PolicyEngine
here.](https://policyengine.org/uk/policy?focus=policyOutput.decileRelativeImpact&reform=7226&region=uk&timePeriod=2023&baseline=1)
If you have feedback or questions on the results in this report, please
do [get in touch](mailto:hello@policyengine.org).

## Appendix: reconciling administrative and survey data

When first estimating the impacts of this reform, we used our Family Resources Survey-based
microdata and reached impacts of lower magnitude. However,
administrative statistics suggested that the true impacts may in fact be
larger, so we extended our data enhancement process to repair the
specific biases remaining present in the FRS under the guidance of the
administrative statistics.

Microsimulation models based on survey microdata often reach estimates
differing from administrative data, due to sampling or measurement bias
in the data collection process. PolicyEngine applies a calibration
process to adjust for this as much as possible by both imputing missing
income data and reweighting households to repair consistency with
administrative totals.

To illustrate, take the following example (based on completely
hypothetical characteristics).

| Household               | Total income | Original weight | Calibrated weight |
| ----------------------- | ------------ | --------------- | ----------------- |
| High-earner             | £80,000      | 2m              | 5m                |
| Low-earner              | £25,000      | 25m             | 22m               |
| Original survey total   | £785bn       | 27m             | 27m               |
| Administrative total    | £950bn       | 27m             |                   |
| Calibrated survey total | £950bn       | 27m             |                   |

By adjusting survey weights, we can shift the distributions of survey
variables to reconcile them with more trusted administrative data. This
requires collecting as many administrative statistics as possible, and
calibrating as closely as possible to them all, together. In the example
above, it was possible to match exactly, but this often isn't possible
in practice because we are operating on a survey, and not a census.

A key learning point in this report was the government's [administrative
statistics on households affected by the two-child
limit](https://www.gov.uk/government/statistics/universal-credit-and-child-tax-credit-claimants-statistics-related-to-the-policy-to-provide-support-for-a-maximum-of-2-children-april-2023/universal-credit-and-child-tax-credit-claimants-statistics-related-to-the-policy-to-provide-support-for-a-maximum-of-two-children-april-2023).
Using benefit administrative databases, the Department for Work and
Pensions estimated that in April 2023 around 1.5 million children lived
in households meeting two conditions:

- The household claims Universal Credit or the Child Tax Credit.

- The household does not receive a child element for at least one
  child.

Our initial model estimate was lower than this (around £1.3m children),
largely due to biases in the Family Resources Survey not fully countered
by our data enhancement process (although we included child counts and
Universal Credit caseloads in our calibration function, we did not
include this specific intersection).

To correct this underestimate, we recalibrated the survey microdata,
applying an extra penalty to the algorithm for deviating from:

- The number of households affected by the UC and CTC two-child
  limits, respectively.

- The number of children living in UC- and CTC-claiming households
  with 3, 4, and 5-plus children, respectively.

Figure 3 shows how this process operates for the first of these
parameters. Note that PolicyEngine still carries out this process for
the other 2,000+ statistics we target, ensuring that the model weights
do not over-calibrate towards this new set of statistical targets.

![A graph of a graph Description automatically
generated](/images/posts/repealing_the_two_child_limit/calibration.png)

_Figure 3: An example of PolicyEngine's calibration process, in which
survey weights are adjusted to shift the FRS projection of UC-claiming,
child limit-affected households towards the administrative estimate._

PolicyEngine now reproduces this 1.5m statistic. However, what we
subsequently found suggests that the 1.5m figure is an underestimate of
the true number of children affected by the reform. Because the
administrative data does not include households brought into eligibility
by reforms, it cannot include households who are not currently eligible
for Universal Credit but would be under an abolition of the two-child
limit.[^3] These households are represented by points on the diagonal
slope in Figure 1.

We estimate 200,000 children fall into this category, bringing the
number of children living in households affected by the two-child limit
to 1.7 million.

[^1]:
    Our cost estimate of £1.8bn is 38% higher than the widely-reported
    £1.3bn [estimate by the Child Poverty Action
    Group](https://cpag.org.uk/sites/default/files/files/policypost/CPAG_Budget_Submission_March_2023.pdf),
    drawn from the UKMOD microsimulation model. PolicyEngine [applies
    machine learning-based algorithms to survey
    microdata](https://policyengine.org/uk/blog/how-machine-learning-tools-make-policyengine-more-accurate)
    to counter measurement and sampling bias present in the input data,
    which could explain some of the disparity.

[^2]:
    For example, in 2019 only children aged below two could be
    affected. This age of exemption increases until 2035, at which point
    no children can be exempt under the transitional protection rule.

[^3]:
    Administrative data might in practice include a small number of
    these households, because households whose income fluctuations mean
    they move along the edge of entitlement might stay on administrative
    databases.
