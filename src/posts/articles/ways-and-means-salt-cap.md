Earlier today, the Ways and Means Committee of the House of Representatives voted in favor of [“The One, Big, Beautiful Bill”,](https://waysandmeans.house.gov/wp-content/uploads/2025/05/SMITMO_017_xml.pdf) a suite of tax reforms that extends most provisions of the Tax Cuts and Jobs Act of 2017, while adding other reforms such as exempting tip and overtime income from taxes. Among its changes from TCJA is a higher limit on the state and local tax deduction, which is $10,000 under TCJA and uncapped after 2025 under current law. The bill caps the SALT deduction at $30,000 for taxpayers, phasing down to $10,000 for filers with income above $400,000.

We modeled the impact of this policy against a baseline with most other provisions of the Ways & Means Committee’s bill (see Appendix A).

Key results (static):

- Raises federal revenues by $937 billion from 2026 to 2035

- Reduces net income for 5.2% of Americans in 2026

- Increases the Supplemental Poverty Measure by 0.2%

- Lowers the Gini index of income inequality by 0.4%

_Use PolicyEngine to [view the full results](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps) or calculate the [effect on your household](https://policyengine.org/us/household?focus=intro&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps)._

## Summary of SALT Provisions

The SALT deduction is set to become uncapped starting in 2026 after being limited to $10,000 under the TCJA. Under the Ways and Means bill, the SALT deduction would be capped at $30,000 ($15,000 for separate filers). As Figure 1 shows, once adjusted gross income reaches $400,000 ($200,000 for separate filers), the limitation phases down at a 20% rate until reaching $10,000 ($5,000 for separate filers). This results in filers with AGI above $500,000 ($250,000 separate) facing the SALT cap floor.[^1]

[^1]: The Ways and Means bill also includes provisions that are meant to limit workarounds that states have implemented to avoid the SALT cap. We did not model these provisions in this analysis.

**Figure 1: SALT Cap Under Ways and Means Bill**

![](https://cdn-images-1.medium.com/max/3180/0*IUqgwWeJcKNFL00U)

## Household Impacts

As we are only comparing how the SALT deduction would affect households as a part of the full bill, only households that itemize their deductions and have state and local tax expenses would be affected. For example, a single adult in New York making $500,000 and $45,000 in property taxes would see a [reduction in their net income of $21,053](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps&household=53326) in 2026.[^2] Figure 2 displays how the single adult’s net income would change as their household earnings vary. While rising at certain points, net income generally falls as household income increases.

[^2]: This assumes a home price of $2,800,000 with an average property tax rate of 1.6%.

**Figure 2: Effect of the SALT Limitation on Net Income Based on Household Earnings for a Single Filer with $30,000+ in SALT (2026)**

![](https://cdn-images-1.medium.com/max/3196/0*1nGgDnLbZjpbceXY)

The introduction of the cap would affect the single adult’s marginal tax rates (MTRs) at various earnings levels, as shown in Figure 3. This reveals that, for instance, the phase-out beginning at $400,000 income increases the filer’s MTR by 7 percentage points. While the SALT cap phases out over the $400,000 to $500,000 income range, it only increases the MTR for the income range from $400,000 to $470,000, since the filer would take the $16,200 standard deduction once the SALT cap falls below this amount.

**Figure 3: Change in Marginal Tax Rates Based on Household Earnings for a Single Filer with $30,000+ in SALT (2026)**

![](https://cdn-images-1.medium.com/max/3200/0*2xwAC1TJdwR9oL27)

As a result of the SALT cap phase-out, the total marginal tax rate reaches 51.2% for earnings between $400,000 to $470,000.

**Figure 4: Marginal Tax Rates under the Baseline and with the SALT Deduction Limitation Based on Household Earnings for a Single Filer with $30,000+ in SALT (2026)**

![](https://cdn-images-1.medium.com/max/3160/0*U-tBlaGYbWVROR9k)

## Microsimulation Results

Using PolicyEngine’s static microsimulation model, we project that the $30,000 SALT cap would increase federal revenues by $937 billion over the next ten years (2026–2035).[^3] For comparison, the Joint Committee on Taxation [projected](https://www.jct.gov/publications/2025/jcx-22-25r/) that it would raise $916 billion from 2025–2034.

[^3]: We project that state tax revenues would increase by $2.1 billion over the budget window (2026-2035).

**Table 1: Annual Federal Budgetary Impact of the SALT Cap Under the W&M Bill**

|     Year      | Federal Budgetary Impact in billions of $ (Static) |
| :-----------: | :------------------------------------------------: |
|     2026      |                        72.0                        |
|     2027      |                        76.3                        |
|     2028      |                        80.0                        |
|     2029      |                        85.5                        |
|     2030      |                        89.9                        |
|     2031      |                        95.1                        |
|     2032      |                       100.4                        |
|     2033      |                       105.9                        |
|     2034      |                       112.8                        |
|     2035      |                       119.3                        |
| **2026-2035** |                     **937.2**                      |

The SALT cap would [reduce the net income of 5.2% of American residents](https://policyengine.org/us/policy?focus=policyOutput.winnersAndLosers.incomeDecile&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps) in 2026. The top income decile would see the greatest number of residents who are made worse off by the SALT cap.

**Figure 5: Distribution of the SALT Cap Under the W&M Bill (2026)**

![](https://cdn-images-1.medium.com/max/3200/0*bitAetgKi4pRc7eH)

Households in the top decile would pay an average of [$4,405 more](https://policyengine.org/us/policy?focus=policyOutput.distributionalImpact.incomeDecile.average&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps) in taxes, a larger amount than other deciles.

**Figure 6: Average Impact of the SALT Cap Under the W&M Bill (2026)**

![](https://cdn-images-1.medium.com/max/3200/0*FvD1qldxcKtrGUPm)

When it comes to poverty and inequality, the SALT cap would, in 2026:

- [Increase poverty](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps) (as defined by the Supplemental Poverty Measure) by 0.02%,

- Increase deep poverty and deep child poverty [by 0.06% and 0.11%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.deep.byAge&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps), respectively,

- Reduce the Gini index of inequality [by 0.4%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=84006&region=us&timePeriod=2026&baseline=84008&dataset=enhanced_cps), and the top 1%’s share of net income by 1.0%

## Conclusion

Conditional on other provisions in the Ways and Means Committee’s bill, we find that its SALT cap raises federal revenues by $937 billion over ten years, assuming no behavioral responses. Our projection exceeds JCT’s by 2.2%, though we score from 2026–2035 rather than 2025–2034. The limitation would reduce the after-tax incomes of 5% of the population in 2026, with households in the top income decile experiencing the greatest losses on an [absolute basis](https://policyengine.org/us/policy?focus=policyOutput.distributionalImpact.incomeDecile.average&reform=84044&region=us&timePeriod=2026&baseline=84050&dataset=enhanced_cps). The $30,000 cap is projected to increase poverty by 0.02%, while lowering the Gini index by 0.4%.

As policymakers evaluate reforms such as these, analytical tools like PolicyEngine offer critical insights into the impacts on diverse household compositions and the broader economy.

We invite you to explore our [additional analyses](https://policyengine.org/us/research) and use [PolicyEngine](https://policyengine.org/us) to calculate your own tax benefits or design custom policy reforms.

## Appendix A: Baseline Details

Our baseline includes most individual provisions in the Ways and Means bill, as shown in Table 2\.

**Table 2: Individual Tax Provisions Current Law vs. W\&M Bill**

|                 Individual Provisions                 | Current Law (2026)                                             | W\&M Bill (2026)                                     | In PolicyEngine Simulation |
| :---------------------------------------------------: | -------------------------------------------------------------- | ---------------------------------------------------- | -------------------------- |
|                       Tax Rates                       | 10%, 15%, 25%, 28%, 33%, 35%, and 39.6%                        | 10%, 12%, 22%, 24%, 32%, 35%, and 37%                | ✅                         |
|                     Tax Brackets                      | Revert to 2017 Thresholds (Indexed for Inflation Since 2017)\* | 2025 Thresholds (Indexed for Inflation for 2026)[^4] | ✅                         |
|           Personal and Dependent Exemption            | $5,300\*                                                       | $0                                                   | ✅                         |
|                    CTC Base Amount                    | $1,000                                                         | $2,000[^5]                                           | ✅                         |
|            CTC Temporary Boost (2025-2028)            | Inactive                                                       | $500                                                 | ✅                         |
|             CTC Maximum Refundable Amount             | $1,000                                                         | $1,700\*                                             | ✅                         |
|                  CTC Phase-in Start                   | $3,000                                                         | $2,500                                               | ✅                         |
|                  CTC Phase-out Start                  | $75,000/$110,000                                               | $200,000/$400,000                                    | ✅                         |
|                Adult Dependent Credit                 | $0                                                             | $500                                                 | ✅                         |
|               Standard Deduction Amount               | $8,300/$16,600\*                                               | $16,150/$32,300\*                                    | ✅                         |
|                 Estate Tax Exemption                  | \~$6,790,000                                                   | $15,000,000                                          | ✖️                         |
|            Mortgage Interest Deduction Cap            | $1,000,000                                                     | $750,000                                             | ✖️                         |
|              Casualty Expense Deduction               | Active                                                         | Inactive                                             | ✖️                         |
|                         Pease                         | Active                                                         | Inactive                                             | ✅                         |
|       Overall Limitation on Itemized Deduction        | Inactive                                                       | Active                                               | ✅                         |
|                 AMT Exemption Amount                  | $70,500/$109,700\*                                             | $89,400/$139,050\*                                   | ✅                         |
|                  AMT Phase-out Start                  | $156,700/$209,000\*                                            | $635,900/$1,271,850\*                                | ✅                         |
|                       QBID Rate                       | Inactive                                                       | 23%                                                  | ✅                         |
|      Alternative QBID Rate on Business Property       | Inactive                                                       | 2.5%                                                 | ✅                         |
|                QBID Rate on W-2 Wages                 | Inactive                                                       | 50%                                                  | ✅                         |
|          Alternative QBID Rate on W-2 Wages           | Inactive                                                       | 25%                                                  | ✅                         |
|            QBID Limitation Phase-in Amount            | Inactive                                                       | 75%                                                  | ✅                         |
|                 QBID Phase-out Start                  | Inactive                                                       | $200,300/$400,500\*                                  | ✅                         |
|           Tip income exemption (2025-2028)            | Inactive                                                       | Active                                               | ✅                         |
|         Overtime income exemption (2025-2028)         | Inactive                                                       | Active                                               | ✖️                         |
|       Auto loan interest deduction (2025-2028)        | Inactive                                                       | Active                                               | ✖️                         |
| Additional Standard Deduction for Seniors (2025-2028) | Inactive                                                       | Active                                               | ✅                         |
|  Charitable Deduction for Non-Itemizers (2025-2028)   | Inactive                                                       | Active                                               | ✅                         |

\*Indexed for Inflation

[^4]: The Ways and Means tax bill adjusts the year at which the 35% tax bracket is uprated changing it from 2017 to 2016, thereby raising the bracket threshold higher than previously.

[^5]: In 2029, the maximum value of the CTC would drop as the temporary $500 boost expires. However, since the CTC is adjusted for inflation afterwards using 2024 as the base year, the credit’s value would fall to $2,200 rather than $2,000. Additionally, we do not include the SSN changes to the CTC in this analysis, but plan to include the provision in future reports.
