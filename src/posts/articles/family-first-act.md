The Family First Act (FFA) reforms several provisions beginning in 2026, following the Tax Cuts and Jobs Act’s expiration:

![](https://cdn-images-1.medium.com/max/2236/1*LhW-I6WQIaQsnqgVll5-xw.png)

## Child Tax Credit (CTC)

The FFA would expand the CTC from $1,000 to $4,200 (up to age five) and $3,000 (age six to 17), up to six children per filer. It phases in from $0 to $20,000 of modified adjusted gross income (the CTC also phases in under current law). It also phases out at 5% for filers with income over $200,000 ($400,000 joint), as it is for 2018–2025 under the Tax Cuts and Jobs Act (TCJA); this is scheduled to revert to $75,000 ($110,000 joint) in 2026.

## Pregnant mother’s credit

The FFA includes a pregnant mother’s credit, providing up to $2,800 for each newborn child which is phased-in for earnings until $10,000.

## Reform the Earned Income Tax Credit (EITC)

The FFA consolidates the EITC structure from eight household types (single/joint and 0/1/2/3+ children) to four (single/joint and 0/1+ children). It phases in at 7.65% for households without children (as current law does) and 34% for households with children (as current law does for households with one child). It phases out at 10% for households without children (compared to 7.65% today) and 25% for households with children (compared to 15.98% for households with one child, or 21.06% for households with two or more children today).

Table 2: EITC reform parameters[^1]
[^1]: Italicized parameters are derived from other parameters.

![](https://cdn-images-1.medium.com/max/3008/1*8GKkbgodYVZspHO6a-Fo3A.png)

## Repeal head of household filing status

The FFA repeals head of household filing status, which increases tax thresholds for single parents.

## Repeal dependent exemptions

TCJA repealed all personal and dependent exemptions from 2018 to 2025. Starting in 2026, FFA will continue the TCJA’s dependent exemption (leaving personal exemptions intact), which would otherwise return at [$5,300 in 2026](https://www.law.cornell.edu/uscode/text/26/151#d_5_A).

## Repeal child portion of the Child and Dependent Care Credit (CDCC)

Under the FFA, the CDCC will only apply for childcare expenses which are incurred for dependents over the age of 18 who are incapable of self care due to disability. Currently, the credit can be claimed for a portion of expenses for household and dependent care services incurred for dependents under the age of thirteen.

## Cap the state and local tax (SALT) deduction

The $10,000 cap on itemized deductions for state and local taxes, introduced in the TCJA, is scheduled to be lifted in 2026. The FFA would extend this provision.

## Household impacts

Using the PolicyEngine US household calculator and Python package, we have examined the impact of the proposed reform on different household compositions.

Looking at single parent and married households with and without childcare expenses, we find that single households face income reductions of up to $10,000 at income levels of $300,000-$400,000 depending on the number of children. Married households experience a positive impact for earnings up to $400,000, peaking at around +$4,000-$5,000, until dropping near zero at incomes above $600,000. For both household types, the presence of more children increases the income due to the expanded CTC.

![](https://cdn-images-1.medium.com/max/2656/0*lKs_ij6_V1sEyJdU)

Due to the CDCC repeal, the presence of $10,000 of childcare expenses decreases net income by a maximum of $3,000. Married households experience a continuous positive impact for earnings up to $420,000 before declining, while single households experience a steeper decline in impact as earnings increase. This steeper decline can be attributed to changes in the earned income tax credit, which aims to reduce potential marriage penalties in the current structure.

When considering a single parent household of two children, aged five and ten with $30,000 of employment income in Utah, the FFA would increase the total net income by [$1,853](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=73466&region=enhanced_us&timePeriod=2026&baseline=2&household=48565). This is due to a:

- $5,395 CTC increase

- $1,688 EITC reduction

- $338 Utah EITC reduction

- $1,854 tax increase before credits, due to the repeal of dependent exemptions and head of household filing status

This household will experience a [varying positive net income effect](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=73466&region=enhanced_us&timePeriod=2026&baseline=2&household=48565) for earnings up to $188,000 after which their net income will decrease gradually to a maximum negative impact of about $5,900 at $350,000 of income.

![](https://cdn-images-1.medium.com/max/3200/0*x8MiEDhoh0QJu5gI)

Due to the interaction of multiple credit programs as well as deductions and filing status changes, the reform [alters marginal tax rates](https://policyengine.org/us/household?focus=householdOutput.mtr&reform=73466&region=enhanced_us&timePeriod=2026&baseline=2&household=48792) from between -30 and +29 percentage points, with most fluctuations occurring at earnings levels below $50,000.

![](https://cdn-images-1.medium.com/max/3200/0*karwlvhwpukVHknG)

## National impacts

To estimate the economic effects, we apply the PolicyEngine US 1.172.0 microsimulation model and our [Enhanced Current Population Survey](https://policyengine.org/us/research/enhanced-cps-beta), comparing against current law (assuming TCJA expires). We do not include any behavioral responses.[^2]

[^2]: While we assume full CTC takeup, we assume partial EITC takeup based on [this](https://www.taxpayeradvocate.irs.gov/wp-content/uploads/2020/08/JRC20_Volume3.pdf#page=62) report.

## Budgetary impacts

In 2026, we project that the FFA would raise [$24.3 billion](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=73465&region=enhanced_us&timePeriod=2026&baseline=2) in revenue, increasing federal revenues by a total of $20.4 billion. The CTC reform costs $171.3 billion (we include the pregnant mother’s credit in the CTC bar); however, the FFA’s consolidations and the retention of the $10,000 SALT cap in 2026 raises $195.6 billion creating a positive budgetary impact.[^3]

[^3]: Analysis conducted in [this](https://github.com/PolicyEngine/analysis-notebooks/tree/main/us/family_first_act) public GitHub repository using the policyengine-us Python package.

![](https://cdn-images-1.medium.com/max/2648/0*xLHsQ1vndE71mOCv)

From 2026 to 2034, we project the FFA would raise $534.7 billion. The annual budgetary surplus will increase each year until 2034. Considering only the federal budgetary impact, the FFA would raise $493.72 over the entire budget window.

![](https://cdn-images-1.medium.com/max/5028/1*0gzNJjwZm96oFVFpGBpzfg.png)

![](https://cdn-images-1.medium.com/max/2640/0*mwlUL3jthCnKvis8)

State revenues would increase by $3.9 billion in 2026 under the FFA, partially due to states matching the federal EITC and CTC under available state tax credits.

## Distributional impacts

The Family First Act would [increase the net income](https://policyengine.org/us/policy?focus=policyOutput.winnersAndLosers.incomeDecile&reform=73466&region=enhanced_us&timePeriod=2026&baseline=2) of 36% of the population, with those in the ninth decile most likely to experience an increase in household income (47%)[^4]. Additionally, it would reduce the income of 16% of people, disproportionately those in the top income decile (49%).

[^4]: The distributional impacts include impacts from State tax changes such as the Utah EITC which matches the federal credit by 20% in 2026.

![](https://cdn-images-1.medium.com/max/3200/0*f-gK9uscrzd-5170)

## Poverty and inequality impacts

Our analysis finds that the FFA would [reduce the poverty rate](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&reform=73466&region=enhanced_us&timePeriod=2026&baseline=2) by 5.9% (1.5 percentage point reduction in the Supplemental Poverty Measure) in 2026. It would reduce child poverty by 10.7% and senior and working age adult poverty by 0.8% and 4.8% respectively, while reducing deep poverty by [2.1%.](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.deep.byAge&reform=73466&region=enhanced_us&timePeriod=2026&baseline=2)

![](https://cdn-images-1.medium.com/max/3200/0*Xp698QhswZMUp5u6)

The reform would also reduce the Gini index of income inequality by [1.4%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=73466&region=enhanced_us&timePeriod=2026&baseline=2) in 2026, with the share of net income held by the top 1% falling by 3.1%.

## Conclusion

Congressman Blake Moore’s Family First Act proposes changes to an array of tax policies in the United States. Key reforms include restructuring the Earned Income Tax Credit, introducing a newly tiered Child Tax Credit system, modifying the CDCC as well as the SALT deduction, and eliminating head of household filing status and the dependent exemption. Our projections suggest the FFA would raise $534.7 billion over the 2025–2034 budget window with revenues increasing annually. The reform increases net income for 36% of the population, reducing overall poverty rates by 5.9% and child poverty by 10.7%.
