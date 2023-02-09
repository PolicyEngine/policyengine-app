*Credit: DALL-E 2*

In Tuesday’s State of the Union speech, President Joe Biden called to expand the Child Tax Credit. What is the Child Tax Credit, how might it affect you, and what impact does PolicyEngine estimate it has on society? This blog post covers the bases.

## What is the Child Tax Credit?

The Clinton administration introduced the Child Tax Credit (CTC) in 1997 as a partially refundable credit. That is, some tax filers, including those with no federal tax liability, could claim a portion of the credit. The refundable portion of the credit, known as the Additional Child Tax Credit, phased in with income. The full credit value reduced tax liability towards zero, but higher-income earners phased out of the credit.

The 2017 Tax Cuts and Jobs Act expanded the CTC by:

1. Doubling the maximum credit amount to $2,000 per child

1. Increasing the refundable portion

1. Extending the phase-out threshold

1. Limiting the credit for children and dependents without Social Security numbers

The Joint Committee on Taxation [estimated](https://www.jct.gov/publications/2017/jcx-67-17/) that these reforms cost $544 billion from 2018 to 2027, or 37% of the $1.5 trillion net cost of the Tax Cuts and Jobs Act over that period.

For the 2021 tax year only, the American Rescue Plan Act further expanded the CTC in several ways. ARPA:

1. Extended eligibility to 17-year-olds

1. Raised the maximum amount from $2,000 per child to $3,600 for children under age 6 and $3,000 for children aged 6 to 17; this higher amount is available to parents with income below $75,000 (single) or $150,000 (married)

1. Made the credit fully refundable

1. Prepaid half the expected 2021 credit on a monthly basis, beginning in July 2021

Other than ARPA, the CTC structure has not changed since 2018, aside from some parameters increasing with inflation (though the law fixes the maximum credit value at $2,000).

## How does the Child Tax Credit affect individual households?

We can compute the impact of the Child Tax Credit in PolicyEngine by first [abolishing the Child Tax Credit](https://policyengine.org/us/policy?focus=gov.abolitions.ctc&reform=3318&region=us&timePeriod=2023&baseline=3318), and then swapping the baseline and reform. This tells us the impact of introducing the CTC compared to a baseline where it doesn’t exist, and we can use it for both individual and society-wide analysis.

Consider a [married filer with one child and $250,000 wages](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962) in 2023. They would receive the full $2,000 CTC.

If we [vary their earnings](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962), we can see how the partial refundability effectively phases the CTC in with income, and how it phases out with income as well.

![](https://cdn-images-1.medium.com/max/2836/0*KLgJ76doY6WE95Lt)

Correspondingly, the [CTC lowers this filer’s marginal tax rates](https://policyengine.org/us/household?focus=householdOutput.mtr&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962) in the phase-in earnings region, and raises marginal tax rates in the phase-out region.

![](https://cdn-images-1.medium.com/max/3200/0*MYcUq_rSgMsHu1o9)

To see how the Child Tax Credit affects your own finances and work incentives, [enter your own household information](https://policyengine.org/us/household?focus=intro&region=us&timePeriod=2023&baseline=3318&reform=2) and PolicyEngine will produce these personalized analytics.

## How does the Child Tax Credit impact society?

We can compute the impact of the Child Tax Credit in PolicyEngine by first abolishing the Child Tax Credit, and then swapping the baseline and reform. This tells us the impact of introducing the CTC compared to a baseline where it doesn’t exist. I showed how to design it below, but you can skip to the impact [here](http://localhost:3000/us/policy?focus=policyOutput.netIncome&reform=2&region=us&timePeriod=2023&baseline=3318).

In 2023, we estimate that the [Child Tax Credit costs $109.9 billion](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=2&region=us&timePeriod=2023&baseline=3318). As context, the Tax Policy Center estimated in September 2021 that the CTC would cost [$126.3 billion in calendar year 2023](https://www.taxpolicycenter.org/model-estimates/tax-benefits-child-tax-credit-september-2021/t21-0223-tax-expenditure-child-tax).

Among the bottom 90% of households, the [CTC increases with income on average](https://policyengine.org/us/policy?focus=policyOutput.decileAverageImpact&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962), due both to the partial refundability and higher income households having more children. The top income decile has a lower benefit as the credit phases out for high income filers.

![](https://cdn-images-1.medium.com/max/3200/0*EOZKSyWudaW5avqG)

[As a percentage of net income](https://policyengine.org/us/policy?focus=policyOutput.decileRelativeImpact&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962), the Child Tax Credit has the largest benefit for the fourth income decile.

![](https://cdn-images-1.medium.com/max/3200/0*0zeQPrJ9p_mki-gM)

[45% of Americans benefit from the Child Tax Credit.](https://policyengine.org/us/policy?focus=policyOutput.intraDecileImpact&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962) For 30% of the population, the CTC increases household net income by at least 5%, disproportionately those in the fourth through sixth income deciles.

![](https://cdn-images-1.medium.com/max/3200/0*wEG9Brxqq8ITG327)

[Without the Child Tax Credit](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962), we estimate that the poverty rate would be 14.4% rather than 14.1%, and that the child poverty rate would be 9.6% instead of 8.9%. That is, we project that the current CTC cuts poverty 2.1% and child poverty 6.9%.

![](https://cdn-images-1.medium.com/max/3200/0*WWSTQpJ4f_zu8eMh)

The [CTC reduces the deep poverty rate](https://policyengine.org/us/policy?focus=policyOutput.deepPovertyImpact&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962) — the population share with income below half their Supplemental Poverty Measure threshold — by less than 0.1%.

![](https://cdn-images-1.medium.com/max/3200/0*IW-FLe4tzpb46cbn)

The [CTC also reduces income inequality](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962) using our three measures, for example cutting the Gini index by 1.1%.

![](https://cdn-images-1.medium.com/max/3200/0*6H6JJlR5ouBqY3-c)

The [CTC reduces the prevalence and severity of cliffs by 1.0% and 0.7%](https://policyengine.org/us/policy?focus=policyOutput.cliffImpact&reform=2&region=us&timePeriod=2023&baseline=3318&household=2962), respectively. Cliffs occur when people who earn more have a lower net income due to taxes and withdrawn benefits. The CTC’s partial refundability lowers marginal tax rates, while its phase-out increases marginal tax rates; since low-income families disproportionately face cliffs, the marginal tax rate reductions at the low end reduce cliffs. [Read our full explainer on cliffs here.](https://policyengine.org/us/blog/how-would-reforms-affect-cliffs-c390fffcfdf7)

![](https://cdn-images-1.medium.com/max/3200/0*dfD9j_Hng5cTIAQH)

You can view these analytics for any US state using the drop-down menu in the right panel. For example, in Pennsylvania, the Child Tax Credit [provides an aggregate $3.8 billion](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=2&region=pa&timePeriod=2023&baseline=3318) in benefits, [reduces child poverty 6.7%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact&reform=2&region=pa&timePeriod=2023&baseline=3318), and [lowers the Gini index by 1.0%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=2&region=pa&timePeriod=2023&baseline=3318).

In conclusion, PolicyEngine provides a variety of analytics on the Child Tax Credit (CTC). Individuals can navigate the partially-refundable structure to estimate how it affects them, and explore different earnings scenarios. Those interested in broader effects can view our estimates of the CTC’s cost and distributional impacts, such as the degree to which it reduces poverty, inequality, and cliffs across the US and individual states. As policymakers explore CTC reforms, and households continue to seek information on it, we will continue to provide personalized and [increasingly accurate](https://policyengine.org/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis) analytics on the policy’s impact.
