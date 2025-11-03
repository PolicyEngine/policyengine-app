In March 2021, President Joe Biden signed into law the [American Rescue Plan Act ](https://www.congress.gov/bill/117th-congress/house-bill/1319), which temporarily enhanced premium tax credits for Affordable Care Act marketplace coverage. The [Inflation Reduction Act of 2022](https://www.congress.gov/bill/117th-congress/house-bill/5376/text) then extended these enhancements through December 31, 2025. On September 4, 14 representatives introduced H.R.5145, the [Bipartisan Premium Tax Credit Extension Act](https://www.congress.gov/bill/119th-congress/house-bill/5145), which would extend the enhanced subsidies through 2026. Additionally, Representative Rosa DeLauro (D-CT) introduced a [continuing resolution](https://www.congress.gov/bill/119th-congress/house-bill/5450) to extend current government funding levels through October 31, 2025, while permanently extending the enhanced subsidies.

In this report, we use the [PolicyEngine ACA microsimulation model](https://github.com/PolicyEngine/policyengine-us/blob/master/docs/gov/hhs/aca.md) to simulate extending the enhanced premium tax credits in 2026, showing their effects on archetypical households' net income and marginal tax rates.

_See how this reform would affect your household [here](https://legacy.policyengine.org/us/household?focus=intro&region=us&timePeriod=2025&baseline=2&reform=83726)_

## Background

The American Rescue Plan Act (ARPA), and then the Inflation Reduction Act (IRA), made two primary changes to the Premium Tax Credit (PTC) structure:

1. **Removed the 400% Federal Poverty Line income eligibility limit**: Pre-2021 law restricted PTCs to households with incomes at or below 400% of the federal poverty level. The enhancement extended eligibility to all income levels with a cap on premium contributions.

1. **Modified the applicable percentage table**: The enhancement reduced the percentage of income that households must contribute toward benchmark plan premiums across all income levels, as shown in Table 1.

**Table 1: Applicable-percentage schedule used to calculate Marketplace premium tax credits**

| Household Income (% FPL) | Premium Cap - Original Schedule | Premium Cap - Enhanced (2021-2025) |
| ------------------------ | ------------------------------- | ---------------------------------- |
| Under 133%               | 2.10%                           | 0%                                 |
| 133% to 150%             | 3.14% to 4.19%                  | 0% to 2%                           |
| 150% - <200%             | 4.19% to 6.60%                  | 0% to 2%                           |
| 200% - <250%             | 6.60% to 8.44%                  | 2% to 4%                           |
| 250% - <300%             | 8.44% to 9.96%                  | 4% to 6%                           |
| 300% - ≤400%             | 9.96%                           | 6% to 8.5%                         |
| >400%                    | Not eligible for PTC            | 8.5%                               |

## Household Impacts

Household impacts vary by state, age, and household composition, because the Affordable Care Act (ACA) sets subsidies based on the price of the Second Lowest Cost Silver Plan (SLCSP) in a given rating area (ordinarily a group of counties).

These examples represent opposite ends of ACA implementation across states. Texas demonstrates the simplest case: without Medicaid expansion, only federal PTCs apply, allowing us to isolate the impact of enhanced credit expiration. New York shows the most complex interactions: with Medicaid expansion, households navigate between Medicaid, the Children's Health Insurance Program (CHIP), and PTCs as income rises, with eligibility thresholds creating distinct coverage cliffs at different income levels.

## Example 1: 25 and 28 year old married couple in Austin, Texas

Because [Texas has not expanded Medicaid to the adult population](https://www.kff.org/status-of-state-medicaid-expansion-decisions/), this two-person household receives no healthcare benefits until their income reaches 138% of the federal poverty line ($29,187). Without children, they also do not qualify for CHIP. Table 2 below shows the PTC level at select levels of the poverty line.

**Table 2: Net Income Change for Texas Household**

| Percentage of the Federal Poverty Line | Income  | ACA PTC under Expiration | ACA PTC under Extension | Difference In Premium Tax Credit | Notes                        |
| -------------------------------------- | ------- | ------------------------ | ----------------------- | -------------------------------- | ---------------------------- |
| 138%                                   | $29,187 | $9,128                   | $10,090                 | $962                             | Lowest eligible income       |
| 300%                                   | $63,450 | $4,062                   | $6,283                  | $2,221                           | Enhanced subsidies           |
| 400%                                   | $84,600 | $0                       | $2,899                  | $2,899                           | Ineligible under current law |

Figure 1 shows these PTC values in 2026 under current law and extension of enhanced subsidies for income levels through $200,000. They would be eligible for a nonzero PTC at income of $84,600 under current law, and $119,162 under extension.

_Code for the Figures can be found [here](https://github.com/daphnehanse11/analysis-notebooks/blob/nyt-health/us/medicaid/aca_reform_households.ipynb)_

**Figure 1: Change in Healthcare Benefits Based on Household Earnings (2026) **

![](https://cdn-images-1.medium.com/max/2700/1*Kj67fxnHvs9m62xRSauF5Q.png)

Figure 2 shows the additional PTC resulting from extension, peaking at $2,899 at $84,600 income, the 400% income level where they lose eligibility under current law.

**Figure 2: Change in Net Income Including Health Benefits (2026)**

![](https://cdn-images-1.medium.com/max/2700/1*xm0-iuhMCvk5hFiicvFTtw.png)

Finally, Figure 3 shows the marginal tax rate (MTR) under each scenario. Extending the enhanced subsidies would reduce MTRs in the current phase-out range, since it phases out more slowly, while increasing them in the income range where they are ineligible under current law but still phasing out under extension.

_Note: The household faces a negative infinite MTR at 138% FPL, where they become eligible for the PTC in both scenarios, and a positive infinite MTR at 400% FPL under current law, where they become ineligible for the PTC._

**Figure 3: Change in Marginal Tax Rates Including Healthcare Benefits Based on Household Earnings (2026)**

![](https://cdn-images-1.medium.com/max/2700/1*xPYVAV4wuytKmLgqobh5Ww.png)

## Example 2: A family of 3 in New York with two 40 year old married parents and one 3 year old dependent

Because [New York expanded Medicaid to adults,](https://www.health.ny.gov/health_care/medicaid/publications/adm/13adm3.htm) this family's healthcare coverage varies by income level:

**Below 154% FPL ($41,041):** The entire family qualifies for Medicaid. We value this coverage at $16,480 based on New York's per-capita Medicaid costs for each enrollment group (adults and children). No PTC is available since they have Medicaid coverage.

**At 200% FPL ($53,300):** Parents remain on Medicaid ($12,930) while the child transitions to CHIP ($2,489). No PTC is available.

**At 300% FPL ($79,950):** Parents lose Medicaid eligibility. Under current law, the family receives $13,847 in PTCs (65% of their $21,442 benchmark premium). With the extension, PTCs increase to $16,645 (78% of premium). The child is still eligible for CHIP ($2,489).

**At 406% FPL ($111,000):** Current law eliminates all PTC support — the family pays the full premium. The child is no longer eligible for CHIP. The extension would provide $21,135 in PTCs for the entire family (57% of premium costs).

Table 3 below shows the households healthcare benefits at select levels of the poverty line.

**Table 3: Net Income Change for New York Household**

| Income   | Percentage of the Federal Poverty Line | ACA PTC under Expiration | ACA PTC under Extension | Medicaid Expenditure | CHIP Expenditure per Capita | Difference In Premium Tax Credit | Notes                                                |
| -------- | -------------------------------------- | ------------------------ | ----------------------- | -------------------- | --------------------------- | -------------------------------- | ---------------------------------------------------- |
| $41,100  | 154%                                   | $0                       | $0                      | $16,480              | $0                          | $0                               | Entire Family on Medicaid                            |
| $53,300  | 200%                                   | $0                       | $0                      | $12,930              | $2,489                      | $0                               | Child in CHIP                                        |
| $79,950  | 300%                                   | $13,847                  | $16,645                 | $0                   | $2,489                      | $2,798                           | Parents in ACA, Child in CHIP                        |
| $111,000 | 406%                                   | $0                       | $21,135                 | $0                   | $0                          | $21,135                          | Ineligible for any health benefits under current law |

Figure 4 shows these elements as a continuous function of earnings.

**Figure 4: Change in Healthcare Benefits Based on Household Earnings (2026)**

![](https://cdn-images-1.medium.com/max/2700/1*jsNet9bhFayg7EjtUgFm9w.png)

Figure 5 shows the additional PTC resulting from extension, and how it interacts with other healthcare benefits. The household's PTC peaks at 406% of the federal poverty level, when the child loses CHIP eligibility. They would be eligible for a nonzero PTC at income of $111,000 under current law and $359,000 under extension.

**Figure 5: Change in Healthcare Benefits Based on Household Earnings (2026)**

![](https://cdn-images-1.medium.com/max/2700/1*rG9ozTvBHduuihneLKwqEA.png)

Figure 6 shows the marginal tax rate (MTR) under each scenario. Extending the enhanced subsidies would reduce MTRs in the current phase-out range, while increasing them in the income range where they are ineligible under current law but still phasing out under extension. The family faces two high marginal tax rates under the baseline, one at 400% of the federal poverty level when the parents lose ACA eligibility, and the other at 405% of the federal poverty level when the child loses CHIP eligibility.

**Figure 6: Change in Marginal Tax Rates Including Healthcare Benefits Based on Household Earnings (2026)**

![](https://cdn-images-1.medium.com/max/2700/1*McWhTwfZGLE2H_7Gb0xxTQ.png)

## Conclusion

Extension of the enhanced premium tax credits beyond 2025 would increase subsidies across all eligible income levels and maintain eligibility for households above 400% of the federal poverty line. Our PolicyEngine microsimulation shows varying impacts by state and household composition: the Texas couple would gain $2,899 in annual credits at 400% FPL, while the New York family would gain $12,268 at 405% FPL.

In future reports, we will estimate the budgetary and distributional impacts of this and other ACA-related reform proposals.
