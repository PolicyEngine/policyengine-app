[The Times reported yesterday](https://www.thetimes.co.uk/article/liz-truss-to-cut-stamp-duty-in-push-for-prosperity-qrh5nxbcd) that Prime Minister Liz Truss will announce plans to cut Stamp Duty this week. PolicyEngine now supports custom reforms to Stamp Duty and its devolved equivalents, so you can compute the impact of potential cuts or your preferred Stamp Duty reform. We will post estimates of Truss’s cut when she announces it.

## What is Stamp Duty?

HMRC levies the Stamp Duty Land Tax, often just called Stamp Duty, as a tax on property transfers in England and Northern Ireland. Similarly, the Welsh Revenue Authority levies the Land Transaction Tax, and Revenue Scotland levies the Land and Buildings Transaction Tax, though the policies differ in their parameters and rules.

## How does PolicyEngine model Stamp Duty?

PolicyEngine’s core microsimulation runs off an enhanced version of the Family Resources Survey, a household survey that captures household structure, income, and benefits. Just as we impute energy consumption from the Living Costs and Food Survey to [estimate energy price cap reforms](https://blog.policyengine.org/prime-minister-liz-trusss-energy-bill-price-cap-cfcfbd7b4dec), we impute assets from the Wealth and Assets Survey to estimate Stamp Duty and other asset-based policies. Specifically, we impute the value of a household’s primary and other residences, and whether their primary residence was their first home. We also impute their corporate wealth to model their share of non-residential stamp duty burdens.

Our imputation process automatically calibrates the imputation to match the true value of properties. Our [synthimpute](https://github.com/PSLmodels/synthimpute) machine learning software ensures we impute realistic conditional values that also add up to the true aggregates.

To match the Stamp Duty aggregates, we then assign each household in the survey data a chance of transferring their property in a given year. This effectively gives homeowners a slice of their total Stamp Duty each year based on the expected duration between transfers.

After assigning this expected Stamp Duty (and devolved equivalents) in the baseline, we recompute it based on the policy reform, and assign any difference as a change to the household’s income in the year. That change drives distributional charts, including poverty impacts.

## What kinds of Stamp Duty reforms does PolicyEngine support?

Any! We’ve added switches to abolish each of the three Stamp Duty policies, as well as detailed parameters for each policy. For example, here’s one screen of controls for Stamp Duty on first homes:

![Stamp duty parameters on PolicyEngine.](https://cdn-images-1.medium.com/max/3200/0*irKUYKfN1VVZ4hwL)_Stamp duty parameters on PolicyEngine._

Here are some examples of Stamp Duty reforms you can compute in PolicyEngine:

- [Repeal all three policies
  ](https://policyengine.org/uk/population-impact?abolish_sdlt=1&abolish_ltt=1&abolish_lbtt=1)£16.2 billion cost in 2022

- [Double Stamp Duty’s first home value exemption from £500,000 to £1,000,000
  ](https://policyengine.org/uk/population-impact?sdlt_first_time_buyer_value_limit=1000000)£95 million cost in 2022

- [Set the rate to a flat 2% on-first primary homes
  ](https://policyengine.org/uk/population-impact?abolish_lbtt=1&sdlt_on_non_first_home_1_rate=2&sdlt_on_non_first_home_3_rate=2&sdlt_on_non_first_home_4_rate=2&sdlt_on_non_first_home_5_rate=2&ltt_on_secondary_residences_1_rate=2&ltt_on_secondary_residences_2_rate=2&ltt_on_secondary_residences_3_rate=2&ltt_on_secondary_residences_4_rate=2&ltt_on_secondary_residences_5_rate=2&ltt_on_secondary_residences_6_rate=2&lbtt_on_residential_property_1_rate=2&lbtt_on_residential_property_3_rate=2&lbtt_on_residential_property_4_rate=2&lbtt_on_residential_property_5_rate=2)£3.7 billion cost in 2022

## Exploring the results

To see how each reform affects the UK, click on ‘Compute population impact’ (or navigate to the ‘UK impact’ tab). From there, you can see all the standard outputs: budgetary impacts, changes to poverty rates, and distributional impacts.

### Changes to poverty rates

Our poverty definition follows the standard methodology defined by the Households Below Average Income statistical release (the official poverty measure), with income defined as net household income before housing costs and the poverty line uprated by inflation. PolicyEngine assigns any reduction in expected liabilities to an increased net income, which can bring households above the poverty line. However, it’s worth noting that HBAI technically doesn’t deduct stamp duties, so the HBAI publication wouldn’t be affected by policy reforms.

### Distributional impacts

PolicyEngine shows the average gains by income and wealth decile, and these will often differ. For example, a cut in stamp duties is often regressive by income deciles and progressive by wealth deciles: this is fundamentally because income doesn’t correlate perfectly with wealth (consider a pensioner with low income, who owns their own house, or a young graduate with student loans and a high-paying job). You can use the buttons underneath each distributional impact chart to see different angles here — relative or absolute income changes, by income or by wealth deciles.

How would you reform Stamp Duty? [Tweet it at us](http://twitter.com/thepolicyengine) with a PolicyEngine reform, or describe it and we’ll run it through the model for you!
