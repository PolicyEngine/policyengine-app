Vice President Harris proposes expanding the Earned Income Tax Credit (EITC) for filers without qualifying dependents. This analysis examines the proposal’s key aspects, potential impacts, and provides economic projections from PolicyEngine’s microsimulation model.

[**See the full impact in PolicyEngine**](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=67696&region=enhanced_us&timePeriod=2025&baseline=2&household=47732)

## The proposal

In her [economic plan](https://kamalaharris.com/wp-content/uploads/2024/09/Policy_Book_Economic-Opportunity.pdf#page=13), Harris proposes to restore the expanded Earned Income Tax Credit for workers without children to its level under the American Rescue Plan Act in 2021.

This would:

- Increase the phase-in and phase-out rates from 7.65% to 15.3%

- Lower the minimum age from 25 to 19 (or 24 for students)

- Remove the maximum age, currently 65

- Raise the maximum credit from $632 to $1,774 (adjusted from $1,502 in 2021 for inflation, and continuing to rise with inflation in future years)

These characterize the EITC policy as shown below.

| Year | Phase-in rate | Max credit | Phase-out start | Phase-out rate |
| ---- | ------------- | ---------- | --------------- | -------------- |
| 2025 | 15.3%         | $1,774     | $13,706         | 15.3%          |
| 2026 | 15.3%         | $1,815     | $14,022         | 15.3%          |
| 2027 | 15.3%         | $1,852     | $14,306         | 15.3%          |
| 2028 | 15.3%         | $1,888     | $14,582         | 15.3%          |
| 2029 | 15.3%         | $1,924     | $14,858         | 15.3%          |
| 2030 | 15.3%         | $1,962     | $15,150         | 15.3%          |
| 2031 | 15.3%         | $2,001     | $15,450         | 15.3%          |
| 2032 | 15.3%         | $2,041     | $15,758         | 15.3%          |
| 2033 | 15.3%         | $2,082     | $16,074         | 15.3%          |
| 2034 | 15.3%         | $2,124     | $16,398         | 15.3%          |

Single filers between $8,000 and $37,000 would see their net incomes increase due to this policy change.

![](https://cdn-images-1.medium.com/max/3044/0*rozC7JqH_bOzaUD_)

For more examples of the policy’s household impacts, see our [2023 article](https://policyengine.org/us/research/restoring-arpa-eitc) on the ARPA EITC expansion. That article’s estimates preceded our [Enhanced Current Population Survey](https://policyengine.org/us/research/enhanced-cps-beta) launch.

## Nationwide impacts

Based on [static microsimulation modeling](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=67696&region=enhanced_us&timePeriod=2025&baseline=2&household=47732) with PolicyEngine US (version 1.103.0), we project the following economic impacts for 2025.

### Cost

Here we estimate the ten-year costs, both with and without behavioral responses, and compare against other scorekeepers.

#### Static

Assuming no behavioral responses, we project that the EITC expansion will cost the federal government $14.3 billion in 2025. Due to state and local EITC matches, it will also cost state and local governments $1.6 billion.

Over the [ten-year budget window](https://colab.research.google.com/drive/1uf-gmlWPDCasV6KP68M2165wGLqjDf8m#scrollTo=fKBzuOkw9i8n), this amounts to $143.7 billion.

| Year    | Federal cost (billions $) |
| ------- | ------------------------- |
| 2025    | 14.3                      |
| 2026    | 14.4                      |
| 2027    | 14.7                      |
| 2028    | 14.6                      |
| 2029    | 14.5                      |
| 2030    | 14.4                      |
| 2031    | 14.3                      |
| 2032    | 14.2                      |
| 2033    | 14.2                      |
| 2034    | 14.1                      |
| 2025-34 | 143.7                     |

#### Dynamic

Incorporating elasticities of labor supply used by the Congressional Budget Office increases the reform's cost. [In 2025](https://policyengine.org/us/policy?focus=policyOutput.laborSupplyImpact.hours&reform=67706&region=enhanced_us&timePeriod=2025&baseline=2):

- Hours worked falls by 0.27%, or 411,000 full-time equivalent jobs

- Total earnings fall by 0.09%, or $11.7 billion

- The federal budgetary cost rises 38% to $19.7 billion, including $2.1 billion in spending on benefit programs like the Supplemental Nutrition Assistance Program (SNAP)

Applying these elasticities over the full budget window increases our cost estimate by 40%, from $143.7 billion to $200.9 billion.

| Year    | Federal cost (billions $) |
| ------- | ------------------------- |
| 2025    | 19.7                      |
| 2026    | 20.2                      |
| 2027    | 20.2                      |
| 2028    | 20.4                      |
| 2029    | 20.4                      |
| 2030    | 20.1                      |
| 2031    | 19.8                      |
| 2032    | 20.2                      |
| 2033    | 20.0                      |
| 2034    | 19.9                      |
| 2025-34 | 200.9                     |

#### Comparison to other analysts

The Office of Management and Budget estimated the cost of restoring the ARPA EITC when President Biden released his 2025 budget, which included the provision. The Tax Foundation and Penn Wharton Budget Model have also estimated the proposal’s cost. PolicyEngine projects higher costs than these other organizations when considering behavioral responses, as they have.

| Organization                                                                                                                                               | Cost, 2025-2034 ($ billions) | Notes                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------- |
| PolicyEngine (static)                                                                                                                                      | 144                          |                            |
| PolicyEngine (behavioral responses)                                                                                                                        | 201                          | CBO elasticities           |
| [Office of Management and Budget](https://www.whitehouse.gov/wp-content/uploads/2024/03/budget_fy2025.pdf#page=150)                                        | 163                          |                            |
| [Tax Foundation](https://taxfoundation.org/research/all/federal/kamala-harris-tax-plan-2024/)                                                              | 160                          | Does not include nonfilers |
| [Penn Wharton Budget Model](https://budgetmodel.wharton.upenn.edu/estimates/2024/8/20/harris-campaign-revenue-effects-of-ctc-eitc-and-aca-premium-subsidy) | 126                          |                            |

PolicyEngine’s Enhanced CPS data is calibrated to be consistent with EITC payment statistics. For this policy score, we added statistical calibration over EITC returns and dollar amounts by tax filer child counts, which account for [non-take-up](https://www.taxpayeradvocate.irs.gov/wp-content/uploads/2020/08/JRC20_Volume3.pdf#page=62).

Our higher cost may partly owe to our accounting of benefit programs like SNAP; for example, if a worker is in the EITC phase-out earnings range, the reform will increase their marginal tax rate. We would then simulate their earnings to fall, in accord with CBO assumptions. At a lower earnings level, the person may be eligible for additional SNAP benefits. Our rules engine accounts for that additional cost, while some other organizations only account for federal costs via taxes.

## Distributional impacts

The PolicyEngine microsimulation model supports distributional analysis by decile, as well as poverty and inequality. Unlike cost, other organizations have not provided distributional impacts for us to compare against.

### By decile

The average household [sees](https://policyengine.org/us/policy?focus=policyOutput.distributionalImpact.incomeDecile.relative&reform=67064&region=enhanced_us&timePeriod=2025&baseline=2&household=47732) an increase in net income of $109, between federal, state, and local EITCs, while households in the bottom two deciles gain the most on a relative basis.

![](https://cdn-images-1.medium.com/max/3152/0*r6VvrLKiMIAkn9jx)

12% of the population benefits, and 5% gain more than 5% of their prior net income. Under one percent of households lose income due to their state EITC match being more generous for demographically-ineligible EITC households than the expanded EITC is.

![](https://cdn-images-1.medium.com/max/3200/0*s42zWiiXqimZLITE)

### Poverty

We [estimate](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&reform=67696&region=enhanced_us&timePeriod=2025&baseline=2) that the expanded EITC would reduce the poverty rate by 1.3% (0.4 percentage points), or about 1 million people. Child poverty falls less than 0.1% because some children live in households with workers who file separately to them.

### Inequality

The Gini index of income inequality also [falls](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=67696&region=enhanced_us&timePeriod=2025&baseline=2) by 0.2%, and the top-10 and top-1 percent shares of income fall by around 0.1%.

![](https://cdn-images-1.medium.com/max/3196/0*AeI48oVouiLsbEg-)

## Key findings

The PolicyEngine static microsimulation model projects the following:

1. Expanding the Earned Income Tax Credit to its level from 2021 would cost $144 billion over the 2025–2034 budget window on a static basis, or $201 billion with labor supply responses (per CBO).

2. The proposal disproportionately benefits lower-income households, both in terms of relative impacts on net income and population share gaining.

3. Overall poverty falls 0.4 percentage points, with the largest impact on people aged 18 to 64.

4. Income inequality, as measured by the Gini coefficient, falls 0.2% .
