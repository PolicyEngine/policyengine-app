On July 29th, Senator Josh Hawley [introduced](https://www.hawley.senate.gov/wp-content/uploads/2025/07/Hawley-American-Worker-Rebate-Act-Bill-Text.pdf) the American Worker Rebate Act (AWRA) of 2025. The legislation would send a "tariff rebate" of at least $600 per person to households below certain income thresholds and with a valid Social Security Number (SSN).[^1] We at PolicyEngine have analyzed this bill and determined its impact on American households and the overall economy.

Our microsimulation model, assuming no changes to economic conditions, projects these impacts:

- Estimated federal cost of $141 billion

- Would benefit 80% of U.S. residents

- Projected to reduce the Supplemental Poverty Measure by 6.9%

- Expected to reduce the Gini index of inequality by 1.1%

_Use PolicyEngine to [view the full results](https://legacy.policyengine.org/us/policy?focus=policyOutput.policyBreakdown&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462) or calculate the [effect on your household](https://legacy.policyengine.org/us/household?focus=intro&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462)._

## How the rebate works

The American Worker Rebate Act of 2025 follows a similar structure to the economic impact payments (commonly known as "stimulus checks") disbursed in 2020 and 2021. Families would receive direct payments in 2026 based on their 2024 tax return (or 2023 if that information is unavailable). For our analysis, we simulate over the tax year 2024 and assume every tax unit filed a return that year.

The head of each household must have a valid SSN in order for their tax unit to be eligible for any benefits. For married couples, both spouses must have an SSN, unless one is in the armed services. In this case, only one spouse needs an SSN.[^2] Children without a valid SSN cannot receive individual payments, but this does not disqualify the rest of the tax unit from receiving benefits.

Eligible households receive the full payment if their adjusted gross income (AGI) falls below $112,500 for head-of-household filers, $150,000 for joint filers, and $75,000 for all other filing statuses. Payments are reduced by $5 for every $100 of income above these thresholds. The base rebate is $600 per person; however, if total tariff revenue generates more than $600 per capita nationwide, the rebate amount would be increased to match this higher figure. We use the $600 rebate value for our analysis.

## Household impacts

Let's examine how the AWRA's tariff rebates could affect a hypothetical U.S. family. A married couple in Florida with two children earning $100,000 would receive the [full $2,400 rebate](https://legacy.policyengine.org/us/household?focus=householdOutput.netIncome&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462&household=55185) in 2026, assuming all family members have valid SSNs. However, if one parent does not meet the SSN requirement and does not qualify for the armed services exception, the entire household is ineligible and [receives no benefit](https://legacy.policyengine.org/us/household?focus=householdOutput.netIncome&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462&household=55186). If one child lacks a valid SSN, the household still qualifies [for $1,800](https://legacy.policyengine.org/us/household?focus=householdOutput.netIncome&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462&household=55197), the full amount minus $600 for the ineligible child.

Additionally, if household earnings were to rise to $160,000, then the $2,400 benefit would [fall to $1,900](https://legacy.policyengine.org/us/household?focus=householdOutput.netIncome&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462&household=55199) as the rebate phaseout would now apply. The entire benefit would phase out once the household's AGI [reaches $198,000](https://legacy.policyengine.org/us/household?focus=householdOutput.netIncome&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462&household=55200).[^3] Table 1 summarizes the benefit amounts for each household scenario.

**Table 1: Summary of Household Impacts for a Married Couple with Two Children**

| Earnings | Both Adults Have Valid SSNs? | Children Have Valid SSN? | Rebate Amount |
| -------- | ---------------------------- | ------------------------ | ------------- |
| $100,000 | Yes                          | Yes                      | $2,400        |
| $100,000 | No                           | Yes                      | $0            |
| $100,000 | Yes                          | Only one child           | $1,800        |
| $160,000 | Yes                          | Yes                      | $1,900        |
| $198,000 | Yes                          | Yes                      | $0            |

Figure 1 displays how net income varies as employment income rises from $0 to $200,000 for the examined tax unit. The household receives the $2,400 tariff rebate until reaching $150,000, when the phase-out begins. Reducing by 5%, the rebate falls to zero at $198,000 of AGI, leaving net income unchanged above this point.

**Figure 1: Net Income by Household Income for a Married Couple with Two Children**

![](https://cdn-images-1.medium.com/max/2000/0*hnuDJEzEZ3ozxnWR)

Figure 2 shows how the AWRA alters the household's marginal tax rates. The household would see its marginal tax rates rise from 29.7% to 34.7% once its AGI reaches $150,000 and 5% phase-out applies. Once AGI reaches $198,000 and the rebate is fully phased out, their change in marginal tax rates reverts to 23.4%, the current value under the baseline.

**Figure 2: Household Marginal Tax Rates for a Married Couple with Two Children Under the AWRA**

![](https://cdn-images-1.medium.com/max/2000/0*V2roDkUrDQB1zWNI)

## Microsimulation results

Using data from tax year 2024, the American Worker Rebate Act of 2025 [would cost $141.3 billion](https://legacy.policyengine.org/us/policy?focus=policyOutput.budgetaryImpact.overall&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462), according to PolicyEngine's static modeling. Due to interactions with state tax codes, the AWRA would also raise $58.9 million in state and local tax revenue.

The legislation would [raise the net income of 80.3%](https://legacy.policyengine.org/us/policy?focus=policyOutput.winnersAndLosers.incomeDecile&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462) of residents in the U.S, though the degree to which they benefit varies by income decile. Overall, 30% of residents would experience a gain of more than 5% of their net income, including 93% of those in the lowest income decile. In the top income decile, 41% of residents would see a gain (all amounting to less than 5% in their net income).

**Figure 3: Winners of the AWRA's Tariff Rebates**

![](https://cdn-images-1.medium.com/max/2000/0*uFiy--rmBE7w_6L-)

The [average household benefit](https://legacy.policyengine.org/us/policy?focus=policyOutput.distributionalImpact.incomeDecile.average&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462) of the AWRA would be $973. The decile experiencing the largest gain is the seventh ($1,273), while the tenth would benefit the least with an average benefit of $469. This is due to the phaseout of the rebates.

**Figure 4: Average Benefit of the AWRA's Tariff Rebates**

![](https://cdn-images-1.medium.com/max/2000/0*bIQjYwzSnpQLt6Iw)

We project the AWRA to [lower poverty](https://legacy.policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462), as defined by the Supplemental Poverty Measure, by 6.9%, with seniors seeing the largest reduction at 11.7%. Deep poverty would [fall by 7.5%](https://legacy.policyengine.org/us/policy?focus=policyOutput.povertyImpact.deep.byAge&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462), including a 15.2% reduction in deep child poverty.

**Figure 5: Poverty Impact of the AWRA' Tariff Rebates**

![](https://cdn-images-1.medium.com/max/2000/0*qSsl1Vo4_4slkDjA)

The proposed legislation would also [lower the Gini index of inequality](https://legacy.policyengine.org/us/policy?focus=policyOutput.inequalityImpact&region=us&timePeriod=2024&baseline=2&dataset=enhanced_cps&reform=89462) by 1.07%, and lower the share of net income held by the top 10% and 1% households by 0.8% and 0.84%, respectively.

## Conclusion

The American Worker Rebate Act of 2025 would send direct payments to qualifying families, which would cost $141.3 billion, using data from tax year 2024. The tariff rebates would provide an average benefit of $973 to households, with those in the seventh decile experiencing the largest gain. The bill is expected to reduce the Supplemental Poverty Measure by 6.9% and lower the Gini index of income inequality by 1.07%.

As policymakers evaluate reforms such as these, analytical tools like PolicyEngine offer critical insights into the impacts on diverse household compositions and the broader economy.

We invite you to explore our [additional analyses](https://legacy.policyengine.org/us/research) and use [PolicyEngine](https://legacy.policyengine.org/us) to calculate your own tax benefits or design custom policy reforms.

[^1]: Qualifying persons include the head and spouse of the household and any CTC-qualifying children. Adult dependents are not eligible for payments.

[^2]: Our analysis does not include the armed services exemption. We assume that if a head or spouse does not have a valid SSN, their tax unit is ineligible for the rebates.

[^3]: The rebate phases out at 5% above the joint income threshold for the examined household. At $160,000, the household rebate value falls by $500 since their AGI is $10,000 over the limit (5% of $10,000 is $500). At $198,000 of AGI, their rebate falls to zero (5% of $48,000 is $2,400).
