Maryland’s standard deduction lowers filers’ taxable income when they do not itemize deductions. The standard deduction is 15 percent of a filer’s adjusted gross income, bounded both above and below. For head of household, joint, and widow(er) filers, the minimum standard deduction is $3,100 and the maximum is $4,700. For single and married filing separately filers, the minimum deduction is $1,550, with a maximum of $2,350.

![](https://cdn-images-1.medium.com/max/5272/1*KJuvJ4_gO1gLkP36qqWjag.png)

Using PolicyEngine, we can compute the standard deduction’s impact. We’ll do this by comparing a policy regime without Maryland’s standard deduction to one with it.

## Defining the reform

From the Policy page, navigate to the Maryland > State income tax > Deductions > Standard section. Select the Baseline, and set the value of MD standard deduction as a percent of AGI to zero, as well as MD maximum standard deduction for each filing status using the dropdown menu. Finally, set Simulation > Geography to Maryland. This will produce [this reform link](https://policyengine.org/us/policy?md_standard_deduction_rate=15&md_min_standard_deduction_HEAD_OF_HOUSEHOLD=3100&md_min_standard_deduction_JOINT=3100&md_min_standard_deduction_SEPARATE=1550&md_min_standard_deduction_SINGLE=1550&baseline_md_standard_deduction_rate=0&baseline_md_min_standard_deduction_HEAD_OF_HOUSEHOLD=0&baseline_md_min_standard_deduction_JOINT=0&baseline_md_min_standard_deduction_SEPARATE=0&baseline_md_min_standard_deduction_SINGLE=0&baseline_state_specific=MD).

![](https://cdn-images-1.medium.com/max/3200/0*Tuukff7dXZRB__70)

By default, the Reform page will show the current value listed above.

![](https://cdn-images-1.medium.com/max/3200/0*T5b8HKRCyj9-LHGf)

## Population impact

Selecting Compute population impact shows [this link](https://policyengine.org/us/population-impact?md_standard_deduction_rate=15&md_min_standard_deduction_HEAD_OF_HOUSEHOLD=3100&md_min_standard_deduction_JOINT=3100&md_min_standard_deduction_SEPARATE=1550&md_min_standard_deduction_SINGLE=1550&md_min_standard_deduction_WIDOW=3100&baseline_md_standard_deduction_rate=0&baseline_md_min_standard_deduction_HEAD_OF_HOUSEHOLD=0&baseline_md_min_standard_deduction_JOINT=0&baseline_md_min_standard_deduction_SEPARATE=0&baseline_md_min_standard_deduction_SINGLE=0&baseline_md_min_standard_deduction_WIDOW=0&baseline_state_specific=MD). PolicyEngine estimates that Maryland’s standard deduction costs $417 million, benefits 90% of the population, has no effect on poverty, and slightly reduces income inequality.

![](https://cdn-images-1.medium.com/max/3200/0*eVayVbOocgUWZl0P)

While middle income deciles benefit more than higher income deciles, households in the bottom income decile are least likely to gain from the policy, since many have no taxable income. Households in the top income decile are least likely to benefit from the standard deduction, as they are more likely to itemize their deductions instead (Maryland allows federal itemized deductions).

![](https://cdn-images-1.medium.com/max/3200/0*2kGjmg6JRHYpCjpa)

## Impact on a single filer

Now let’s look at the impact of Maryland’s standard deduction on individual Maryland households. To see how to define a household, see our [post on the Oregon Earned Income Tax Credit](https://medium.com/policyengine/computing-your-oregon-earned-income-tax-credit-in-policyengine-d911ae29749d).

The standard deduction benefits single filers if they earn at least $13,590. Its net impact quickly rises to $112, and rises further to $129 if their income exceeds $152,100.

![](https://cdn-images-1.medium.com/max/3200/0*QknzNotM0mGUz1fF)

The standard deduction strictly lowers marginal tax rates, by between 0.2 and 0.7 percentage points in the relevant regions, except for the negative spike at the low end.

![](https://cdn-images-1.medium.com/max/3192/0*xzb5xyH3mopg94-l)

The sudden increase to net income (decrease to marginal tax rate) at $13,590 results from the [Poverty Line Credit](https://policyengine.github.io/policyengine-us//gov/states/md/tax/income/credits/poverty-line-credit.html), which creates a cliff at the [poverty line](https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines). By lowering the tax liability at that point, the standard deduction increases the benefit of the Poverty Line Credit.

![](https://cdn-images-1.medium.com/max/3200/0*hWlScrE0b95B9TBx)

[Repealing the Poverty Line Credit in the baseline and reform](https://policyengine.org/us/household?md_standard_deduction_rate=15&md_min_standard_deduction_HEAD_OF_HOUSEHOLD=3100&md_min_standard_deduction_JOINT=3100&md_min_standard_deduction_SEPARATE=1550&md_min_standard_deduction_SINGLE=1550&baseline_md_standard_deduction_rate=0&baseline_md_min_standard_deduction_HEAD_OF_HOUSEHOLD=0&baseline_md_min_standard_deduction_JOINT=0&baseline_md_min_standard_deduction_SEPARATE=0&baseline_md_min_standard_deduction_SINGLE=0&baseline_state_specific=MD&baseline_md_poverty_line_credit_rate=0) shows that standard deduction would have a smoother impact in the absence of the Poverty Line Credit.

![](https://cdn-images-1.medium.com/max/3200/0*gLk0c9ANp3KKOSBK)

## Impact on a family of four

For a family of four (married with two children) with $100,000 in employment income, the standard deduction lowers taxes by $223.

![](https://cdn-images-1.medium.com/max/3200/0*WXnAsrE2npPKKf-T)

Select Compute how earnings affect you to see how the standard deduction affects this household’s net income. Then select the Difference button to generate the below chart. The dip around $42,000 results from [Maryland’s earned income tax credit](https://policyengine.github.io/policyengine-us//gov/states/md/tax/income/credits/eitc.html), which is partially nonrefundable and therefore affected by tax liability.

![](https://cdn-images-1.medium.com/max/3200/0*S9bfltBYrvHgpMx-)

We can similarly see a smoother impact by repealing the Maryland EITC in the baseline and reform. Since the Poverty Line Credit fills in the EITC, we need to [repeal both](https://policyengine.org/us/household?md_standard_deduction_rate=15&md_min_standard_deduction_HEAD_OF_HOUSEHOLD=3100&md_min_standard_deduction_JOINT=3100&md_min_standard_deduction_SEPARATE=1550&md_min_standard_deduction_SINGLE=1550&baseline_md_standard_deduction_rate=0&baseline_md_min_standard_deduction_HEAD_OF_HOUSEHOLD=0&baseline_md_min_standard_deduction_JOINT=0&baseline_md_min_standard_deduction_SEPARATE=0&baseline_md_min_standard_deduction_SINGLE=0&baseline_state_specific=MD&baseline_md_non_single_childless_non_refundable_eitc_match=0&baseline_md_eitc_refundable_match=0&baseline_md_poverty_line_credit_rate=0).

![](https://cdn-images-1.medium.com/max/3200/0*fnz-UD2-g9iOg7dM)

Here we’ve shown the impact of Maryland’s standard deduction, including how it interacts with other tax programs. To compute the impact of other tax and benefit programs, try PolicyEngine US at [policyengine.org](https://policyengine.org/).
