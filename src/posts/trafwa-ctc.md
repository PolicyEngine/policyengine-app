When Politico [reported](https://twitter.com/ben_guggenheim/status/1745403401695908256) the bipartisan tax package on January 11, we provided the [first budgetary and distributional analysis](https://policyengine.org/us/research/wyden-smith-ctc) of its main Child Tax Credit (CTC) provisions, that day. Today, we’re expanding that analysis to reflect all CTC provisions in the [Tax Relief for American Families and Workers Act of 2024](https://www.finance.senate.gov/imo/media/doc/the_tax_relief_for_american_families_and_workers_act_of_2024_technical_summary.pdf) (TRAFWA), which Senate Finance Committee Chair Ron Wyden (D-OR) and House Ways and Means Committee Chair Jason Smith (R-MO) [announced on January 16](https://waysandmeans.house.gov/smith-wyden-announce-agreement-on-tax-framework-to-help-families-and-main-street-businesses/). The House [passed the bill](https://www.congress.gov/bill/118th-congress/house-bill/7024/all-actions) 357–70 on January 31, and it currently sits in the Senate.

From 2023 to 2025 — in our static model assuming full take-up — we project the TRAFWA’s CTC reforms would:

- Cost $40 billion

- Lower child poverty by 4.7% in 2023, rising to 9.5% in 2025

- Benefit 9% of the population in 2023, and about 40% in 2024–25

- Lower the Gini index of income inequality by 0.1% in 2023, rising to 0.3% in 2025

This report describes these results in more detail, both for individual households and society at large. We’ll show the [custom mini-app](https://policyengine.org/us/trafwa-ctc-calculator) we built to capture the multi-year effects of the bill on your own family. This is also the first analysis we’ve published using our Enhanced Current Population Survey, we’ve built to give everyone access to the most accurate tax-benefit microsimulation modeling available — learn more about our launch of this cutting-edge dataset [here](enhanced-cps-beta). We close with a comparison to the Joint Committee on Taxation’s results.

[**Click here**](../trafwa-ctc-calculator) to see how the Tax Relief for American Families and Workers Act would affect your own household’s Child Tax Credit.

## How the Tax Relief for American Workers and Families Act of 2024 Would Reform the Child Tax Credit

The United States provides the Child Tax Credit (CTC) in two parts: the nonrefundable CTC and the refundable Additional Child Tax Credit (ACTC). The Tax Cuts and Jobs Act of 2017 (TCJA) established the ACTC at $1,400 and set the core CTC at $2,000 per child. While the TCJA did not index the core CTC to inflation, it did index the ACTC, resulting in its rise to $1,600 by 2023 and $1,700 in 2024. The ACTC phases in at 15 cents per dollar of earnings in excess of $2,500.

The TRAFWA makes four changes to the CTC:

1. **Raising the ACTC, starting in 2023:** The maximum ACTC would rise from $1,600 to $1,800 in 2023, from $1,700 to $1,900 in 2024, and from $1,700 to the value of the full CTC in 2025. If inflation follows the Congressional Budget Office’s projections, the ACTC will rise to $2,100 in 2025 (see provision 4 below).

1. **Phasing in the ACTC with the number of children, starting in 2023:** The ACTC would phase in at 15 cents multiplied by the number of CTC-eligible children, for each dollar of earnings above $2,500.

1. **Calculating the ACTC from the greater of earnings in the current and prior year, starting in 2024:** Filers who earn more in 2023 than 2024 will be eligible for the ACTC based on 2023 earnings, and similarly for those who earn more in 2024 than 2025.

1. **Inflation-indexing the CTC, rounded down to the nearest $100, starting in 2024:** This will increase the CTC to $2,100 in 2024, and unless inflation significantly outpaces CBO projections, it will remain at $2,100 in 2025.

## Impact on a Household

In our [previous report](https://policyengine.org/us/research/wyden-smith-ctc), we showed how the TRAFWA would affect a single parent of two in 2023. That analysis still holds, so here we’ll show a more complex example: a married family with three children, in 2025, with $10,000 of earnings in 2024. This household would be affected by all TRAWFA CTC reforms: the refundability rise, phase-in rate, inflation adjustment, and lookback provision.

Before getting into the analytics, let’s plug this household into our [new TRAFWA calculator](https://policyengine.org/us/trafwa-ctc-calculator). This tool lets you plug in a few pieces of information to see how the bill would affect you (we don’t collect any personally identifiable information). Let’s suppose they earned $30,000 in 2023, $10,000 in 2024, and $0 in 2025.

![](https://cdn-images-1.medium.com/max/3200/0*-TiVkn4xxhEmM812)

After clicking **Calculate**, we can see that they gain $9,225 total. $7,950 of that comes in 2024 and 2025, largely due to the lookback provision, though they also gain from other provisions in each year.

![](https://cdn-images-1.medium.com/max/3200/0*iirHzRPbLja-E4Yk)

Now let’s return to the main app for deeper analytics. If this family has [no earned income in 2025](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=44823&region=us&timePeriod=2025&baseline=2&household=40256), they would be ineligible for any credit under current law. However, TRAFWA would make them eligible for an ACTC phasing in at 45% (15% times three children) of earnings in excess of $2,500, based on their $10,000 of 2024 earnings, up to a maximum of $6,300 ($2,100 for each of three children). That’s 45% of $7,500, or $3,375, which is below the cap.

TRAFWA would affect this family differently [depending on their earnings in 2025](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=44823&region=us&timePeriod=2025&baseline=2&household=40256). Under current law (gray), their ACTC phases in beginning at $2,500, up to a maximum of $5,100 when their earnings reach $36,500. Under TRAFWA, they receive $3,375 until their 2025 earnings exceed their 2024 earnings, at which point it phases in at 45% before reaching $6,300. The non-refundable CTC then displaces the ACTC at higher earnings in both scenarios.

![](https://cdn-images-1.medium.com/max/2940/0*fkV9Z2PdXtG6FUxI)

The [net effect](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=44823&region=us&timePeriod=2025&baseline=2&household=40256) is a gain of up to $4,200 at $16,500 earnings, stabilizing at $300 from the inflation adjustment only at $38,500 earnings.

![](https://cdn-images-1.medium.com/max/2912/0*1-gBRdTFzk20GBj1)

## Societal Impact

Using PolicyEngine US v0.717.0 project that the TRAFWA CTC would cost $39.8 billion over the three years, with the cost rising each year. Appendix A compares the cost by year and provision to the Joint Committee on Taxation. Here we otherwise focus on 2024 impacts; to see other years, you can click the links and change the year in the right menu.

In 2024, households in the third income decile benefit most on an [absolute](https://policyengine.org/us/policy?focus=policyOutput.decileAverageImpact&reform=44066&region=us&timePeriod=2023&baseline=2) basis, while those in the second decile benefit most on a [relative](https://policyengine.org/us/policy?reform=46315&focus=policyOutput.decileRelativeImpact&region=enhanced_us&timePeriod=2024&baseline=2) basis. They benefit more than lower income households who have fewer children and don’t meet the earnings requirement, and more than higher income households who take the non-refundable CTC instead.

![](https://cdn-images-1.medium.com/max/3200/0*KYmHcVBQHNKS2M8f)

These provisions would [benefit 40% of US residents](https://policyengine.org/us/policy?reform=46315&focus=policyOutput.intraDecileImpact&region=enhanced_us&timePeriod=2024&baseline=2) in 2024. 4% of Americans gain at least 5% of net income, disproportionately those in the bottom four deciles.

![](https://cdn-images-1.medium.com/max/3200/0*fCLAKxRJJbob4GOV)

The number of people with resources below the poverty line would fall 2.0%, disproportionately [children](https://policyengine.org/us/policy?reform=46315&focus=policyOutput.povertyImpact&region=enhanced_us&timePeriod=2024&baseline=2) (6.9%), [Blacks](https://policyengine.org/us/policy?reform=46315&focus=policyOutput.racialPovertyImpact&region=enhanced_us&timePeriod=2024&baseline=2) (3.6%), and [women](https://policyengine.org/us/policy?reform=46315&focus=policyOutput.genderPovertyImpact&region=enhanced_us&timePeriod=2024&baseline=2) (2.2%). We project that the bill would reduce the [number of children in poverty](https://colab.research.google.com/drive/1CApzPOg-qXbvYPdwmp0gIPK__kffixQH?authuser=1#scrollTo=OqtYayw8YNhu) by 345,000 in 2023, 573,000 in 2024, and 740,000 in 2025.[^1] Deep child poverty would [fall 6.1%](https://policyengine.org/us/policy?reform=46315&focus=policyOutput.deepPovertyImpact&region=enhanced_us&timePeriod=2024&baseline=2), and the Gini index of income inequality would [fall 0.25%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=44066&region=us&timePeriod=2023&baseline=2).

[^1]: The Center on Budget and Policy Priorities [forecasted](https://www.cbpp.org/research/federal-tax/about-16-million-children-in-low-income-families-would-gain-in-first-year-of) that "In the first year, the expansion would lift as many as 400,000 children above the poverty line. [...] When the expansion is fully in effect, it would lift some 500,000 or more children above the poverty line."

## Conclusion

As the Senate considers the Tax Relief for American Families and Workers Act, we present a new analysis into the budgetary, household, and distributional impacts it would generate. We do so using a new calculator, and a new dataset tuned for accurate policy forecasting, which we will continue to develop for greater accuracy in the future. Like all forecasts, ours carry uncertainty; for instance, our assumptions around full take-up and zero behavioral responses may not fully reflect reality, and future model enhancements will provide more flexible assumptions on these points.

To stay informed on our computational modeling of TRAFWA as it proceeds, analysis of new policies, and novel software to understand policy impacts, subscribe for our latest updates.

## Appendix A: Comparison to the Joint Committee on Taxation

The Joint Committee on Taxation expanded upon their official score in [this letter](https://chrissmith.house.gov/uploadedfiles/118-0673.pdf), which includes methodology and a provision-by-provision budgetary breakdown (they did not provide distributional impacts). They estimate the CTC provision cost $33.6 billion over the three years, while we estimate $39.8 billion, 18% higher.

As shown in the table below, major differences include:

1. PolicyEngine assumes the $2,000 CTC rises to $2,100 in 2024; JCT assumes 2025. This is based on [PolicyEngine’s research into the law and C-CPI-U values](https://github.com/PolicyEngine/policyengine-us/discussions/3726), and aligns with the Tax Foundation’s interpretation.

1. PolicyEngine finds a substantially larger impact of the lookback provision. We [build a panel from the 2018 and 2019 ASEC files](https://www2.census.gov/programs-surveys/cps/methodology/How%20To%20Link%20CPS%20Public%20Use%20Files.pdf), limiting to those who responded to employment and self-employment income questions, then build a quantile regression forests model to predict the distribution of prior-year earnings for each person in the CPS. This prediction algorithm adjusts the sampling distribution to match the total employment and self-employment income in the relevant year. Our model uses [these variables](https://github.com/PolicyEngine/policyengine-us/blob/1d3ca3ef54e2904a547a1e649b90979aaad0509a/policyengine_us/data/datasets/cps/enhanced_cps/enhanced_cps.py#L57-L71) as predictors.

| Provision            | 2023 (JCT) | 2023 (PE)                                                                                                                               | 2024 (JCT) | 2024 (PE)                                                                                                                                | 2025 (JCT) | 2025 (PE)                                                                                                                                | 2023-2025 (JCT) | 2023-2025 (PE) |
| :------------------- | ---------: | :-------------------------------------------------------------------------------------------------------------------------------------- | ---------: | :--------------------------------------------------------------------------------------------------------------------------------------- | ---------: | :--------------------------------------------------------------------------------------------------------------------------------------- | --------------: | -------------: |
| Per-child phase-in   |        5.5 | [4.2](https://policyengine.org/us/policy?reform=49823&baseline=2&timePeriod=2023&region=enhanced_us&focus=policyOutput.policyBreakdown) |          6 | [5.0](https://policyengine.org/us/policy?reform=49823&baseline=2&timePeriod=2024&region=enhanced_us&focus=policyOutput.policyBreakdown)  |        5.7 | [4.7](https://policyengine.org/us/policy?reform=49823&baseline=2&timePeriod=2025&region=enhanced_us&focus=policyOutput.policyBreakdown)  |            17.2 |           13.9 |
| Look-back            |          0 | [0.0](https://policyengine.org/us/policy?reform=49855&baseline=2&timePeriod=2023&region=enhanced_us&focus=policyOutput.policyBreakdown) |        0.8 | [3.7](https://policyengine.org/us/policy?reform=49855&baseline=2&timePeriod=2024&region=enhanced_us&focus=policyOutput.policyBreakdown)  |        0.7 | [4.5](https://policyengine.org/us/policy?reform=49855&baseline=2&timePeriod=2025&region=enhanced_us&focus=policyOutput.policyBreakdown)  |             1.5 |            8.2 |
| Refund-able increase |        2.7 | [1.7](https://policyengine.org/us/policy?reform=49861&baseline=2&timePeriod=2023&region=enhanced_us&focus=policyOutput.policyBreakdown) |        2.5 | [2.1](https://policyengine.org/us/policy?reform=49861&baseline=2&timePeriod=2024&region=enhanced_us&focus=policyOutput.policyBreakdown)  |        3.4 | [3.1](https://policyengine.org/us/policy?reform=49861&baseline=2&timePeriod=2025&region=enhanced_us&focus=policyOutput.policyBreakdown)  |             8.6 |            6.9 |
| Indexing CTC         |          0 | [0.0](https://policyengine.org/us/policy?reform=49862&baseline=2&timePeriod=2023&region=enhanced_us&focus=policyOutput.policyBreakdown) |        1.4 | [4.9](https://policyengine.org/us/policy?reform=49862&baseline=2&timePeriod=2024&region=enhanced_us&focus=policyOutput.policyBreakdown)  |        4.7 | [5.9](https://policyengine.org/us/policy?reform=49862&baseline=2&timePeriod=2025&region=enhanced_us&focus=policyOutput.policyBreakdown)  |             6.1 |           10.8 |
| Com-bined            |        8.2 | [5.9](https://policyengine.org/us/policy?reform=49862&baseline=2&timePeriod=2023&region=enhanced_us&focus=policyOutput.policyBreakdown) |       10.7 | [15.7](https://policyengine.org/us/policy?reform=49862&baseline=2&timePeriod=2024&region=enhanced_us&focus=policyOutput.policyBreakdown) |       14.7 | [18.2](https://policyengine.org/us/policy?reform=49862&baseline=2&timePeriod=2025&region=enhanced_us&focus=policyOutput.policyBreakdown) |            33.6 |           39.8 |

Our estimates may also differ due to different data, take-up assumptions (we assume full take-up, including of the lookback provision), and behavioral responses (though JCT said that they project minimal labor supply effects).

To contextualize the higher estimate of the lookback provision, we used the constructed 2018–19 ASEC panel to compare the ACTC amounts between 2018 and 2019 for the same filers. [We found](https://colab.research.google.com/drive/1NSYogO-uKBeSA7ECz0vDDURVX8LvJrso?usp=sharing) that the greater of 2018 and 2019 ACTC sums to 34% above the 2019 ACTC for filers in the panel (and with reported rather than imputed employment and self-employment incomes). Applying this to the total 2019 ACTC, this suggests that filers would have received an additional $8.3 billion in ACTC payments if they could choose the greater of their 2018 and 2019 payment, though this would have been partly offset by lower non-refundable CTC payments.

_Nikhil Woodruff, Pavel Makarchuk, and Riley Kotlus contributed to this report._
