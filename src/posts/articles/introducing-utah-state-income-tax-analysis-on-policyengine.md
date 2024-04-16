_Utah’s State Capitol. Credit: Ramon M._

Today, we are excited to announce the expansion of PolicyEngine to include the Utah State income tax code. This update enables users to simulate, and adjust tax policies in Utah on their own household or the State’s economy — from rates and credits to deductions and exemptions.

## Utah State’s income tax code

Utah has a main income tax rate of 4.85% (as of the 2022 tax year) that applies to all taxable income. The Utah income tax system allows a set of non-refundable tax credits, of which we model five:

- Utah taxpayer credit: an initial amount that phases out with income

- Utah EITC: 15% of the federal Earned Income Tax Credit

- Utah Social Security Benefits Credit (SSBC): a credit that effectively makes social security tax-exempt for filers under an income threshold, phasing out

- Utah retirement credit: an alternative to the Utah SSBC that provides a flat rate instead, phasing out earlier

- Utah at-home parent credit: $100 per child under 12 months, with income cutoffs for both the stay-at-home parent and the tax unit

These credits reduce the income tax liability for qualifying taxpayers, resulting in the overall tax schedule shown below.

![](https://cdn-images-1.medium.com/max/3152/0*f7_wm_N_NCceKF7l)

_Utah’s income tax, by household type and employment income._

## The Utah taxpayer credit

The taxpayer credit is calculated as a percentage of the sum of the taxpayer’s federal deductions and the Utah taxpayer credit personal exemption. The maximum taxpayer credit rate is 6%. In 2022, the Utah taxpayer credit personal exemption is $1,802. This exemption is added to the taxpayer’s federal standard or itemized deductions when calculating the taxpayer credit.

The taxpayer credit is subject to phase-out based on income levels and filing status. The credit reduces by a rate of 1.3% for each dollar of income above the phase-out threshold. In 2022, the phase-out thresholds for different filing statuses are as follows:

- Single: $15,548

- Married filing separately: $15,548

- Married filing jointly: $31,096

- Head of household: $23,322

- Qualifying widow(er): $31,096

## The Utah EITC

The Utah EITC is a flat percentage of the federal EITC, with no modifications to federal rules. In 2022, this percentage is 15%.

## The Utah Social Security Benefits Credit

This credit essentially exempts social security from Utah taxable income for filers with income below a filing-status-determined threshold, and phases the Utah tax on federally-taxable social security back in at a marginal rate of 2.5%. The phase-out thresholds for 2022 are:

- Single: $37,000

- Married filing separately: $31,000

- Married filing jointly: $62,000

- Head of household: $62,000

- Qualifying widow(er): $62,000

## The Utah retirement credit

The Utah retirement credit is an alternative to the Utah Social Security Benefits Credit (SSBC) and provides a flat rate credit for eligible taxpayers. To qualify for the Utah retirement credit, residents must have been born before 1952.

The maximum per-person value of the Utah retirement credit is $450. This credit is subject to phase-out based on modified adjusted gross income (AGI) levels and filing status. The phase-out rate is 2.5%. In 2022, the modified AGI phase-out thresholds for different filing statuses are as follows:

- Single: $25,000

- Married filing separately: $16,000

- Married filing jointly: $32,000

- Head of household: $32,000

- Qualifying widow(er): $32,000

Utah residents can claim only one of either the retirement credit or the social security benefits credit. It is assumed that they claim the one with the higher value. The Utah retirement credit is calculated using the taxpayer’s age, income, and filing status to determine eligibility and the appropriate phase-out reduction. If the retirement credit is refundable, it will be limited by the taxpayer’s income tax liability before credits, minus the Utah taxpayer credit and Utah EITC.

## The Utah at-home parent credit

Parents of children under 12 months can claim the at-home parent credit if:

- At least one of the parents has earned income below $3,000

- The adjusted gross income of the tax unit is less than $50,000

The value of the credit is $100 per qualifying child. The income cutoffs create a small [cliff effect](https://policyengine.org/us/blog/how-would-reforms-affect-cliffs)- any rise in income over either income limit imposes an instant $100 tax increase, regardless of the size of the rise in income.

## Marginal tax rates

The interaction of the flat tax rate and the taxpayer credit effectively creates a multi-rate tax schedule, with rates between 0% and 12% (and a cliff at $50,000 employment income due to the at-home parent credit).

![](https://cdn-images-1.medium.com/max/3152/0*t7JrT6OCDnGb611u)

_Marginal tax rates attributable to Utah’s income tax, by household type and income._

The integration of the Utah State income tax code into PolicyEngine allows users to gain a deeper understanding of the impact of tax policies on Utah residents. Users can now simulate different policy scenarios, assess the effects of proposed tax reforms, and delve into the details of Utah State income tax.

## Example reforms

Utah’s headline tax rate is currently 4.85%, but has seen reforms over recent years. Using PolicyEngine’s economic impact calculator, we can estimate the revenue impacts of small and large changes to the tax rate, shown below.

| **Tax rate** | **Tax rate change** | **Revenue impact** | **Average gain per household** | **PolicyEngine link**                                                                                                                    |
| ------------ | ------------------- | ------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 3.85%        | -1pp                | -$1.1bn            | $1,036                         | [See on PolicyEngine](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=10724&region=ut&timePeriod=2023&baseline=2) |
| 4.35%        | -0.5pp              | -$573m             | $518                           | [See on PolicyEngine](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=10723&region=ut&timePeriod=2023&baseline=2) |
| 4.75%        | -0.1pp              | -$115m             | $104                           | [See on PolicyEngine](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=10722&region=ut&timePeriod=2023&baseline=2) |
| **4.85%**    | **No change**       | **No change**      | **No change**                  | **Current law**                                                                                                                          |
| 4.95%        | +0.1pp              | +$115m             | -$104                          | [See on PolicyEngine](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=10613&region=ut&timePeriod=2023&baseline=2) |
| 5.35%        | +0.5pp              | +$572m             | $518                           | [See on PolicyEngine](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=10720&region=ut&timePeriod=2023&baseline=2) |
| 5.85%        | +1pp                | +$1.1bn            | $1,035                         | [See on PolicyEngine](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=10721&region=ut&timePeriod=2023&baseline=2) |

Because PolicyEngine uses a household survey, its revenue impacts are around a third lower than official estimates which use administrative tax datasets (which are less likely to miss out high-income filers). Our [planned data enhancement process](https://policyengine.org/us/blog/enhancing-the-current-population-survey-for-policy-analysis) will improve accuracy up to the level of administrative datasets later this year.

## Try it out

We invite you to explore the new Utah tax policies on PolicyEngine and see how they influence your tax situation or the broader population. Our team is dedicated to expanding the platform’s capabilities and delivering the most comprehensive tax policy analysis tool available. Keep an eye out for more updates and new features!
