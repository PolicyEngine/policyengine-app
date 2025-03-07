On January 21, 2025, New York Governor Kathy Hochul [unveiled her budget](https://www.budget.ny.gov/pubs/press/2025/fy26-executive-budget.html) for Fiscal Year 2026, including three provisions PolicyEngine can simulate:

- Introducing “inflation rebates” that would provide $300 to single filers with earnings of $150,000 or less and $500 for joint filers at $300,000 or below.

- Increasing the Empire State Child Credit (ESCC) to $1,000 for children under the age of 4 and to $500 for children 4 to 16.

- Cutting the first five tax brackets’ rates [by 0.2](https://www.governor.ny.gov/sites/default/files/2025-01/FY2026-Executive-Budget-Briefing-Book.pdf#page=37) percentage points over two years.

Using PolicyEngine’s household calculator and microsimulation capabilities, we can project the effects of these proposals on individual families as well as the impacts on New York’s budget, statewide income distribution, and poverty rates.

## Background

### Inflation Rebates

The proposed inflation rebates would function as fully refundable tax credits as they would provide direct payments to households that have filed their taxes. The rebates’ value and income limit depend on filing status, as displayed in Table 1. Households above the limits would not receive the rebates, creating an income cliff. These payments would only be active for 2025.

**Table 1: Inflation Rebate Value and Income Limit by Filing Status**

| Filing Status                               | Rebate Amount | Income Limit |
| ------------------------------------------- | ------------- | ------------ |
| Single and Head of Household                | $300          | $150,000     |
| Married Filing Jointly and Surviving Spouse | $500          | $300,000     |
| Married Filing Separately                   | $250          | $150,000     |

### Empire State Child Credit

In addition to the increase in the value of the ESCC, the maximum credit amount would also be extended to families with low incomes. Currently, a single parent with annual earnings of $5,000 or less receives only $100. Between $5,000 and $10,000, the ESCC phases into its current maximum of $330. Hochul’s proposal would eliminate the earnings requirement, allowing this single parent to receive the full credit. For tax year 2025, children under the age of 4 would see their credit increase from $330 to $1,000. Children between 4 and 16 would still receive $330, until 2026 when their credit is increased to $500. The current phase-out structure of the ESCC would remain, though the credit would no longer be coupled to the pre-TCJA federal CTC.

**Figure 1: ESCC Expansion for a Single Parent of 3 or 6 in 2025 and 2026 vs Baseline**

![](https://cdn-images-1.medium.com/max/2652/0*OHmEv_nybbouJJ0L)

### Income Tax Cuts

Finally, Governor Hochul would decrease the tax rate for New York state’s first five income tax brackets by 0.1% in 2025 and 2026. The rates under current law and the proposed cuts can be seen in Table 2 below.

**Table 2: Current Tax Rates and Proposed Cuts in 2025 and 2026**

| Tax Year | Tax Rate 1 | Tax Rate 2 | Tax Rate 3 | Tax Rate 4 | Tax Rate 5 |
| -------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| 2024     | 4.0%       | 4.5%       | 5.25%      | 5.5%       | 6.0%       |
| 2025     | 3.9%       | 4.4%       | 5.15%      | 5.4%       | 5.9%       |
| 2026     | 3.8%       | 4.3%       | 5.05%      | 5.3%       | 5.8%       |

In addition to several other proposals, Governor Hochul also included an extension of the Temporary PIT High Income Surcharge from 2028 to 2032. We have limited this analysis to three provisions that have been discussed.

## Household Impacts

These three policies affect various family compositions across New York state. Let’s examine several examples to understand their impact on each household’s net income.

A non-earning single parent of a 6-year-old child is eligible for a $300 inflation rebate in 2025. Additionally, their ESCC increases by $230 as the minimum earning requirement is eliminated, making their allotment climb from $100 to $330. As they have no taxable income, they are unaffected by the income tax cuts, resulting in a change in net income of $530. In 2026, they no longer receive the inflation rebate, but their ESCC goes from $100 to $500, increasing their net income by $400.

For the same household composition but with an annual income of $50,000, they also receive the full $300 inflation rebate in 2025, as their income falls well below the $150,000 threshold. While they are already eligible for the maximum ESCC amount under current law, they benefit from the income tax cuts, which provide an additional $38 in tax relief. This results in a total increase in net income of $338 for 2025. In 2026, they see their ESCC increase by $170 as the credit for children aged 4–16 rises to $500, and they receive $76 in tax cuts, bringing their total benefit to $246.

A single parent with two children earning $160,000 exceeds the income threshold for the inflation rebate in 2025, making them ineligible for that benefit. Their income level also places them above the ESCC phase-out, so they receive no additional benefit from its expansion. However, they would see a $147 reduction in their tax liability for 2025. In 2026, their tax savings and net income will double to $294.

A married couple with three children earning $250,000 qualifies for the full $500 inflation rebate in 2025, as their income falls below the $300,000 joint filer threshold. While their income level excludes them from additional ESCC benefits, they receive $231 from the tax rate reductions, totaling $731 in increased net income for 2025. In 2026, without the inflation rebate, their benefit comes exclusively from the income tax cuts, providing $462 in tax relief.

If this married couple’s income grows to $310,000, they would exceed the joint filer threshold for the inflation rebate in 2025, receiving no benefit from this program. However, their benefit from the tax rate reductions would increase to $291 in 2025. In 2026, their tax liability would drop by $461, resulting in a gain in net income.[^1]

Tables 3 and 4 summarize the changes in each program and net income for each examined household for 2025 and 2026.

**Table 3: Change in Net Income Based on Household Composition (2025)**

| Martial Status | Number of Children | Annual Income | Inflation Rebate | ESCC Change | Income Tax Cut | Total Change in Net Income                                                                                                                       |
| -------------- | ------------------ | ------------- | ---------------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Single         | 1                  | $0            | $300             | $230        | $0             | [+$530](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=49692&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Single         | 1                  | $50,000       | $300             | $0          | $38            | [+$338](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51379&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Single         | 2                  | $160,000      | $0               | $0          | $147           | [+$147](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51399&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Married        | 3                  | $250,000      | $500             | $0          | $231           | [+$731](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51446&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Married        | 3                  | $310,000      | $0               | $0          | $291           | [+$291](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51448&region=ny&timePeriod=2025&baseline=2&reform=75827) |

**Table 4: Change in Net Income Based on Household Composition (2026)**

| Martial Status | Number of Children | Annual Income | ESCC Change | Income Tax Cut | Total Change in Net Income                                                                                                                       |
| -------------- | ------------------ | ------------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Single         | 1                  | $0            | $400        | $0             | [+$400](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51394&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Single         | 1                  | $50,000       | $170        | $76            | [+$246](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51451&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Single         | 2                  | $160,000      | $0          | $294           | [+$294](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51453&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Married        | 3                  | $250,000      | $0          | $462           | [+$462](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51456&region=ny&timePeriod=2025&baseline=2&reform=75827) |
| Married        | 3                  | $310,000      | $0          | $461           | [+$461](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=51457&region=ny&timePeriod=2025&baseline=2&reform=75827) |

Figures 2 through 5 display the changes in net income and marginal tax rates for a single parent of two children, ages 3 and 6, (household example 3) based on their annual income (ranging from $0 to $500,000) in 2025 and 2026.

**Figure 2: Change in Net Income for a Single Parent of Two Children, Ages 3 and 6, Based on Household Earnings (2025)**

![](https://cdn-images-1.medium.com/max/2000/0*h1H9hpX5PfEzHzSb)

**Figure 3: Change in Marginal Tax Rate for a Single Parent of Two Children, Ages 3 and 6, Based on Household Earnings (2025)**

![](https://cdn-images-1.medium.com/max/2000/0*fzBpoO3oPSeJoSZC)

**Figure 4: Change in Net Income for a Single Parent of Two Children, Ages 3 and 6, Based on Household Earnings (2026)**

![](https://cdn-images-1.medium.com/max/2000/0*OXwTC8-pGO99qcaA)

**Figure 5: Change in Marginal Tax Rate for a Single Parent of Two Children, Ages 3 and 6, Based on Household Earnings (2026)**

![](https://cdn-images-1.medium.com/max/2000/0*2gN3Eji94v58il0F)

## Statewide Impacts 2025

For tax year 2025, PolicyEngine projects that these reforms would:

- [Cost $4.8 billion](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76580), with the following breakdown:

  - Inflation Rebates: [$3.7 billion](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=76266&region=ny&timePeriod=2025&baseline=2)[^2]

  - ESCC expansion: [$481 million](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=76581&region=ny&timePeriod=2025&baseline=2)

  - Income tax cuts: [$623 million](https://policyengine.org/us/policy?focus=policyOutput.budgetaryImpact.overall&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76590)

- Lower the state’s Supplemental Poverty Measure by 5.2%

- Reduce the Gini index of income inequality by 0.67%

- [Increase net income for 99.4%](https://policyengine.org/us/policy?focus=policyOutput.winnersAndLosers.incomeDecile&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76580) of New York residents (all but 6% of those in the top decile), including an increase of 5% of net income for 51% of those in the bottom decile

These use PolicyEngine’s microsimulation capabilities through 3 years of pooled data (2021–2023) from the Current Population Survey (CPS), aged to the current year.

**Figure 6: Winners of Hochul’s Tax Proposals (2025)**

![](https://cdn-images-1.medium.com/max/2000/0*3OEHXel8uNfoA62E)

The reform provides an average of [$611 per household in 2025](https://policyengine.org/us/policy?focus=policyOutput.distributionalImpact.incomeDecile.average&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76580), varying based on income decile.[^3] Households in the ninth income bracket would receive $781, the highest average benefit of any decile. Though the first decile’s average benefit is the lowest at $404, it represents a [2.5% gain in net income](https://policyengine.org/us/policy?focus=policyOutput.distributionalImpact.incomeDecile.relative&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76580) for households, the largest percentage of any decile.

**Figure 7: Average Benefit Based on Household Income Decile (2025)**

![](https://cdn-images-1.medium.com/max/2000/0*fvsjuJ247XGUaeju)

In 2025, these proposals would [reduce poverty by 5.2%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76580) when applying the Supplemental Poverty Measure. The poverty reduction would disproportionally affect children as the child poverty rate would also decrease by 6.4%. Deep poverty and deep child poverty would [drop by 5.0% and 7.3%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.deep.byAge&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76580), respectively.

**Figure 8: Poverty Impact (2025)**

![](https://cdn-images-1.medium.com/max/2000/0*MYtaUAsZ0X6QzbO2)

Finally, the tax reforms would [decrease income inequality](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&household=51448&region=ny&timePeriod=2025&baseline=2&reform=76580), lowering the state’s Gini index by 0.67% while also reducing the share of income held by the top 10% and 1% of households.

## Statewide Impacts 2026

For tax year 2026, PolicyEngine projects that these reforms would:

- Cost [$2.1 billion](https://policyengine.org/us/policy?focus=policyOutput.budgetaryImpact.overall&household=51448&region=ny&timePeriod=2026&baseline=2&reform=76580), with the following breakdown:

  - ESCC expansion: [$821 million](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=76581&region=ny&timePeriod=2026&baseline=2)

  - Income tax cuts: [$1.3 billion](https://policyengine.org/us/policy?focus=policyOutput.budgetaryImpact.overall&household=51448&region=ny&timePeriod=2026&baseline=2&reform=76590)[^4]

- Increase net income for 83.5% of New York residents

- Lower the state’s Supplemental Poverty Measure by 2.5%

- Reduce the Gini index of income inequality by 0.24%

While both the ESCC expansion and income tax cuts provide more tax benefits to the New York population than they did in 2025, the expiration of the inflation rebates results in a lower impact in every major measurement for 2026. The reform [benefits 83.5%](https://policyengine.org/us/policy?focus=policyOutput.winnersAndLosers.incomeDecile&household=51448&region=ny&timePeriod=2026&baseline=2&reform=76580) of residents in 2025, down from 99.4% in 2025. While 92% or more residents in the top half of the income distribution are net beneficiaries in 2026, 31% in the bottom income decile would see their net incomes increase; the remaining 69% would be unaffected.

**Figure 9: Winners of Hochul’s Tax Proposals (2026)**

![](https://cdn-images-1.medium.com/max/2000/0*rEnFxmyVpTrT0N9l)

The reform provides [$252 on average](https://policyengine.org/us/policy?focus=policyOutput.distributionalImpact.incomeDecile.average&household=51448&region=ny&timePeriod=2026&baseline=2&reform=76580) per household. While the range of average benefit by decile in 2025 was $404 to $781 (first to ninth decile), the 2026 range is $65 to $557 (first and tenth decile). As the inflation rebates expire and income tax cuts double, higher-income households would gain a larger share of the overall tax benefits as they have higher tax liabilities than lower-income families.

**Figure 10: Average Benefit Based on Household Income Decile**

![](https://cdn-images-1.medium.com/max/2000/0*RREj76K4gSO-yu2y)

In 2026, the reform would [reduce poverty by 2.5%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&household=51448&region=ny&timePeriod=2026&baseline=2&reform=76580), down from 5.5% in 2025. However, it would lower child poverty more, from 6.4% in 2025 to 7.4% in 2026, likely due to the expansion of the ESCC. Deep poverty and deep child poverty impacts fall from 2025, [settling at 1.6% and 5.5%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.deep.byAge&household=51448&region=ny&timePeriod=2026&baseline=2&reform=76580), respectively.

**Figure 11: Poverty Impact (2025)**

![](https://cdn-images-1.medium.com/max/2000/0*5yY5SWB9W7PPe5s0)

Income inequality [would decrease](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&household=51448&region=ny&timePeriod=2026&baseline=2&reform=76580) as it did in 2025. However, each inequality impact would be lower, including the Gini index (0.67% to 0.24%).

## Conclusion

Governor Hochul’s major tax proposals would send one-time inflation rebates to New York residents, expand the Empire State Child Credit to $1,000 for children under 4 and to $500 for all other eligible children, and reduce the first five state income tax brackets by 0.2 percentage points over two years. In 2025, these reforms would reduce state revenue by $4.8 billion. The combined impact of the tax provisions would affect 99.4% of New Yorkers, providing an average household benefit of $611. These changes would also lower poverty by 5.2% and child poverty by 6.4%.

The impact of these proposals would shrink in 2026. The total cost would amount to $2.1 billion, as ESCC increases to $500 for children aged 4–16 and income tax rates decrease by an additional 0.1 percentage point, while the inflation rebates expire. These changes would reduce poverty by 2.0% and child poverty by 5.6% while increasing net income for 83.5% of New Yorkers.

As policymakers evaluate reforms such as these, analytical tools like PolicyEngine offer critical insights into the impacts on diverse household compositions and the broader economy.

We invite you to explore our [additional analyses](https://policyengine.org/us/research) and use [PolicyEngine](https://policyengine.org/us) to calculate your own tax benefits or design custom policy reforms.

## Appendix A: Impact Summary of Major Tax Proposals for 2025 and 2026

| Year     | Reform            | Cost ($ millions) | Percentage of Net Beneficiaries | Poverty Impact | Deep Poverty Impact | Inequality Impact |
| -------- | ----------------- | ----------------- | ------------------------------- | -------------- | ------------------- | ----------------- |
| 2025     | Inflation Rebates | 3,716             | 94.0%                           | -4.0%          | -2.8%               | -0.53%            |
| 2025     | ESCC Expansion    | 481               | 15.1%                           | -1.3%          | -1.5%               | -0.16%            |
| 2025     | Income Tax Cuts   | 623               | 68.3%                           | -0.2%          | 0%                  | +0.02%            |
| **2025** | **Total Impact**  | **4,820**         | **99.4%**                       | **-5.2%**      | **-5.0%**           | **-0.67%**        |
| 2026     | ESCC Expansion    | 821               | 31.1%                           | -2.3%          | -1.6%               | -0.27%            |
| 2026     | Income Tax Cuts   | 1,311             | 77.7%                           | 0%             | 0%                  | +0.03%            |
| **2026** | **Total Impact**  | **2,132**         | **83.5%**                       | **-2.0%**      | **-1.6%**           | **-0.24%**        |

[^1]: Once New York households reach a specific annual income, their state tax liability exceeds the value of the federal standard deduction, making itemizing their deductions (specifically claiming the State and Local Tax Deduction) more valuable. However, the alternative minimum tax effectively caps the SALT deduction’s value once the household reaches a certain income.

[^2]: We assume full take up for the inflation rebates (i.e., every filer under the income limits filed taxes in 2023 and is therefore eligible for the refund). This explains why PolicyEngine’s estimate of the inflation rebates is higher than one found in the Executive Budget ($3.0 million).

[^3]: PolicyEngine sorts households into deciles by baseline net income, with boundaries set nationally rather than within states.

[^4]: While the reduction of New York’s income taxes in 2026 would lower state revenues by $1.3 billion, it would also raise federal revenue. Currently, New Yorkers can report their state income tax liability to reduce their federal taxes when claiming the State and Local Tax Deduction. Since New Yorkers will have a lower state income tax liability under the reform, their federal tax owed will increase, thus increasing federal revenue by $128.9 million in 2026.
