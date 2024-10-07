On July 31st, [former President Donald Trump announced](https://www.cnn.com/2024/08/01/politics/social-security-benefits-tax-trump/index.html) his intention to exempt Social Security benefits from income taxation if he were elected president. Currently, the US taxes a percentage of Social Security benefits above certain thresholds. Exempting these benefits from taxation would reduce the tax liability of some American households while decreasing federal revenues. Using PolicyEngine, we have analyzed former President Trump’s proposal and estimated its effects on specific family compositions as well as its greater impact on the federal budget and income distribution.

Key results (static):

- Costs $1.4 trillion from 2025 to 2034

- Benefits 17% of Americans in 2025

- Affects poverty, inequality and labor supply anywhere between 0.02% and 2.3% in 2025, depending on the specific measure.

[_Try our personalized calculator:_](https://policyengine.org/us/household?focus=intro&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2) See how exempting Social Security benefits would affect your household.

## How Social Security Benefits are Taxed Today

Calculating the taxation of Social Security benefits for a household involves a [few steps](https://www-origin.ssa.gov/benefits/retirement/planner/taxes.html). First, Social Security recipients must determine their “combined income”. Combined income is defined as the sum of an individual’s adjusted gross income (AGI), nontaxable interest and half of their Social Security benefits. If a recipient’s combined income exceeds certain thresholds, the US taxes a portion of their benefits and directs the revenues to Social Security Old-Age and Survivors Insurance and Disability Insurance (OASI and DI) and Medicare Hospital Insurance (HI) Trust Funds. Specifically:

1. If combined income is under $25,000 ($32,000 for joint filers), Social Security benefits are not taxed.

1. If combined income exceeds these thresholds, 50% of an individual’s Social Security benefits are taxable, with the revenue directed towards the OASI and DI Trust Funds.

1. If combined income exceeds $34,000 ($44,000 for joint filers), an additional 35% of benefits are subjected to taxation with the revenue allocated to the Medicare HI Trust Fund.

In 2023, these taxes comprised [4.3%](https://www.ssa.gov/OACT/TR/2024/tr2024.pdf) and [8.4%](https://www.cms.gov/oact/tr/2024) of the Social Security and Medicare HI Trust Funds, respectively, with payroll taxes comprising 90.3% and 88.4%.

Rather than have all Social Security payments be fully taxable, this structure only makes a portion of the benefits subject to federal income taxes. [The graph below](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=67048&region=enhanced_us&timePeriod=2025&baseline=2&household=46100) compares the current structure of Social Security benefit taxation (baseline) to a scenario where Social Security benefits are fully taxable (reform) for a single adult with $24,000 in annual payments.

![](https://cdn-images-1.medium.com/max/2000/0*ZDiST4Okq1xEuALf)

As displayed in the graph above, the current structure results in lower-income beneficiaries not being subject to any income tax on their Social Security benefits, with at least 15% of an individual’s benefits remaining non-taxable. In the example above, a single retired adult who receives $2,000 a month from Social Security ([around the average benefit](https://faq.ssa.gov/en-us/Topic/article/KA-01903#:~:text=Views:,most%20convenient%20way%20to%20apply.)) does not face any income taxation as their combined income of $12,000 falls below the $25,000 threshold. This person pays [$705](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=2&region=enhanced_us&timePeriod=2025&baseline=67048&household=46100) less in taxes compared to if Social Security benefits were fully taxable. A married couple where one spouse also receives $2,000 a month from Social Security but the other continues to work earning $70,000 [saves $432](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=2&region=enhanced_us&timePeriod=2025&baseline=67048&household=47870) due to the current structure. If they earned $150,000, the household would have a [$792](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=2&region=enhanced_us&timePeriod=2025&baseline=67048&household=47942) reduction in their income taxes.

## Household Impacts

Let’s examine the effect of exempting Social Security benefits from taxation on the previous households. Because the single retired adult does not face any taxation under the current structure, making all benefits non-taxable would [leave their net income unchanged](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=46100). However, the family with $70,000 in earnings would [reduce their tax liability by $2,448](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=47869), while the household earning $150,000 in addition to their Social Security benefits would [gain $4,488](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=47942). [The graph below](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=47942) shows how net income changes for the two married households as their earnings increase assuming Social Security benefits become non-taxable.

![](https://cdn-images-1.medium.com/max/2000/0*ugkw_zWAcbafI0gZ)

Table 1 shows how the net income of the three households would change if Social Security benefits were made taxable or non-taxable.

**Table 1: Net Income Impact for Households Under Different Social Security Taxation Schemes**

| Household Type (All Have $24,000 in Social Security Benefits) | If Social Security Benefits Were Fully Taxable | If Social Security Benefits Were Non-Taxable |
| ------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| Single, No Earnings                                           | -$705                                          | $0                                           |
| Married, $70,000 in Earnings                                  | -$432                                          | $2,448                                       |
| Married, $150,000 in Earnings                                 | -$792                                          | $4,488                                       |

## Microsimulation Results

To estimate the effect across the country, we set both the [50% and 85% taxable rates to 0%](https://policyengine.org/us/policy?focus=gov.irs.social_security.taxability.rate.base&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=47734) in the PolicyEngine web app, thereby eliminating any income taxation on Social Security benefits. The nationwide impact of this proposal using our microsimulation model is as follows:

## Budgetary Impact

We at PolicyEngine project making Social Security benefits non-taxable to [cost the federal government $98.9 billion in 2025](https://policyengine.org/us/policy?focus=policyOutput.budgetaryImpact.overall&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=47942), assuming no behavioral responses. Additionally, the reform will cost state and local governments $2.9 billion, due to how some states tie their AGI to the federal AGI. When [considering behavioral responses](https://policyengine.org/us/policy?focus=policyOutput.budgetaryImpact.overall&reform=67174&region=enhanced_us&timePeriod=2025&baseline=2&household=47942) (applying elasticities used by the Congressional Budget Office), the federal cost of the proposal in 2025 falls slightly to $97.8 billion due to a positive substitution effect (workers responding to a lower marginal tax rate), partially offset by a negative income effect; overall work hours and earnings are projected to rise by 0.02% and 0.04%, respectively.

Over the next ten years (tax years 2025 to 2034), exempting Social Security benefits from income taxation would cost the federal government a total of $1.4 trillion using static modeling. The Medicare HI Trust Fund would see its revenue decrease by $587.7 billion, while the Social Security Trust Funds would lose the remaining $834.9 billion.[^trust-fund-split] Eliminating income taxes on Social Security benefits would [increase Social Security’s shortfall and put Medicare HI into a deficit](https://www.ssa.gov/OACT/TRSUM/index.html), thus accelerating each of their trust funds’ insolvency dates; for instance, the $40.8 billion impact on the Medicaid HI Trust Fund in 2025 exceeds the $25 billion projected surplus for 2024.

[^trust-fund-split]: To calculate the revenue loss of each trust fund, we first set the additional taxable rate for Social Security benefits [from 85% to 50%](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=67180&region=enhanced_us&timePeriod=2025&baseline=2). This change simulates the revenue lost for the Medicare HI Trust Fund. We then subtracted this amount from the total federal revenue loss to calculate the impact on the Social Security Trust Funds. See the [Social Security](https://www.ssa.gov/OACT/TR/2024/tr2024.pdf) and [Medicare HI](https://www.cms.gov/oact/tr/2024) Trust Fund reports for benchmarks.

**Table 2: Annual Federal Budgetary Impact for Exempting Social Security Benefits from Income Tax**

| Year    | Total Federal Budget Impact (billions $) | Social Security Trust Funds Impact (billions $) | Medicare HI Trust Fund Impact (billions $) |
| ------- | ---------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| 2025    | -98.9                                    | -58.1                                           | -40.8                                      |
| 2026    | -122.6                                   | -72.3                                           | -50.3                                      |
| 2027    | -128.7                                   | -75.6                                           | -53.1                                      |
| 2028    | -134.0                                   | -78.7                                           | -55.3                                      |
| 2029    | -139.9                                   | -82.2                                           | -57.7                                      |
| 2030    | -146.3                                   | -85.9                                           | -60.4                                      |
| 2031    | -152.9                                   | -89.8                                           | -63.1                                      |
| 2032    | -159.5                                   | -93.7                                           | -65.8                                      |
| 2033    | -166.3                                   | -97.3                                           | -69.0                                      |
| 2034    | -173.5                                   | -101.3                                          | -72.2                                      |
| 2025-34 | -1,422.6                                 | -834.9                                          | -587.7                                     |

Our federal cost estimate falls between projections from the [Tax Foundation ](https://taxfoundation.org/research/all/federal/donald-trump-tax-plan-2024/)(lower) and the [Committee for a Responsible Federal Budget](https://www.crfb.org/blogs/donald-trumps-suggestion-end-taxation-social-security-benefits) (higher) over a ten-year period. The CRFB used data from the Congressional Budget Office and Social Security Trustees.

**Table 3: Comparison of Federal Budgetary Impact Estimates**

| Organization             | Estimate (in billions $) |
| ------------------------ | ------------------------ |
| PolicyEngine (Static)    | -1,422.6                 |
| Tax Foundation (Static)  | -1,196.9                 |
| Tax Foundation (Dynamic) | -1,180.6                 |
| CRFB (CBO)               | -1,600.0                 |
| CRFB (Trustees)          | -1,800.0                 |

## Income Distribution 2025

Under the proposal, 17% of Americans would see their net incomes increase, disproportionately in the top half of the income distribution.

![](https://cdn-images-1.medium.com/max/2000/0*2PqZGSYLcwAkYXWn)

The average benefit for all households is $670 for 2025. However, the ninth and tenth income deciles would receive an average benefit of $1,653 and $1,908, respectively, while the bottom two deciles would see their net incomes rise by less than $100.

![](https://cdn-images-1.medium.com/max/2000/0*cUWrmb9Nfu3HZmml)

Exempting Social Security benefits from income taxes would reduce the overall Supplemental Poverty Measure by [0.2%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=47734) and lower senior poverty by 2.3%. Finally, the effect on income inequality would be mixed, as the proposal would [increase the Gini index by 0.1%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=67049&region=enhanced_us&timePeriod=2025&baseline=2&household=47734), raise the top decile’s net income share by 1.3% but reduce the top percentile’s share of net income by 0.2%.

## Conclusion

Exempting Social Security benefits from taxation would increase the net income of American households while reducing revenues by $1.4 trillion over the next ten years, accelerating the insolvency dates of the Social Security and Medicare Trust Funds. While the reform’s dollar impact rises with income, only 1.6% of the tax benefits would accrue to the bottom two deciles while 45.5% of the benefits would flow to the top 20% of households. The proposal would impact poverty, inequality and labor supply, overall affecting any of the relevant measures by 2.3% or less.

As policymakers consider this proposal and others, tools like PolicyEngine can provide valuable insights into the potential impacts on various household compositions and the greater economy. We invite you to read [additional analyses](https://policyengine.org/us/research) from our contributors and use [PolicyEngine](https://policyengine.org/us) to calculate your taxes/benefits and design your own policy reforms.
