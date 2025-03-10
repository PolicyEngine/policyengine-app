The [Family Income Supplemental Credit (FISC) Act](https://golden.house.gov/sites/evo-subsites/golden.house.gov/files/evo-media-document/GoldenFISC.pdf), introduced by Representative Jared Golden (D-ME), would establish a new refundable tax credit for families with children of various ages. Using PolicyEngine’s household calculator and microsimulation capabilities, this analysis examines the specific effects of the FISC Act on individual families as well as its impact on the federal budget, income distribution, and poverty.

PolicyEngine projects that in 2026, the FISC Act would:

- Reduce federal tax revenue by $193 billion

- Increase net income for 37% of US residents

- Lower the Supplemental Poverty Measure by 9.2% and child poverty by 17.7%

## Background

The FISC Act would create a new refundable family income supplement credit with the following structure:

1. A monthly base credit amount of $400 per child under six or $250 per child over six or under eighteen years of age

1. An additional monthly $400 for pregnant mothers after the first five pregnancy months

1. A 20% marriage bonus, which is applied to the total monthly credit amount

The credit phases in linearly with earnings and phases out monthly by $16.67 for each $1,000 increment of adjusted gross income over $125,000 ($250,000 for joint filers).

This new credit’s cost is partially offset by the repeal of the existing Child Tax Credit.

## Household Impacts

Considering a married couple in Virginia with $40,000 of earnings and two children aged 3 and 10. Under the FISC Act, [household net income increases](https://policyengine.org/us/household?focus=householdOutput.netIncome&reform=76612&baseline=2&timePeriod=2026&region=us&dataset=enhanced_cps&household=51530) by $7,360. This household will receive a family income supplement credit of $9,360, receiving a base credit of $7,800 with a 20% marriage bonus. Simultaneously this household would lose their Child Tax Credit of $2,000, where $1,780 is refundable and $220 is non-refundable (the maximum per-child CTC falls from $2,000 in 2025 to $1,000 in 2026 under current law).

Figure 1 shows how this household’s experience [varies with net income](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=76612&baseline=2&timePeriod=2026&region=us&dataset=enhanced_cps&household=51530). The family income supplement credit phases in at a steeper rate than the current CTC, reaching the maximum amount at earnings of $9,400 while the CTC is fully phased-in at earnings levels of $17,000. Furthermore, the CTC fully phases out at earnings of $110,000 while the family income supplement credit does not start to phase out until $250,000 for joint filers.

**Figure 1: Household Net Income Impact of the FISC Act by Household Earnings**
![](https://cdn-images-1.medium.com/max/3200/0*9REG5tMXk4KVwCO9)

Figure 2. shows how the FISC Act alters the household’s marginal tax rates, with the steeper phase-in structure being reflected in the earnings up to $17,000.

**Figure 2: Change in Marginal Tax Rates based on Household Earnings**
![](https://cdn-images-1.medium.com/max/3200/0*0NTnOnqtdGX0tMlK)

The new credit amount varies with children’s ages while adding an additional pregnancy credit amount. Figure 3 shows the impacts of this credit on net income of a single parent with one child of varying ages. We currently lump four months of the $400 pregnancy credit in with 12 months of the $400 base credit for parents of newborns, applying the full $6,400 in the same year, though we [will improve this](https://github.com/PolicyEngine/policyengine-us/issues/5659).

**Figure 3: Change in Household Net Income Under the FISC Act based on Child Ages**
![](https://cdn-images-1.medium.com/max/2652/0*Ig7Df1rVH4pwHC5u)

## National Impacts

Using PolicyEngine’s microsimulation capabilities, and assuming no behavioral responses, we estimate the national impacts of the FISC Act in the 2026 fiscal year.

The FISC Act would reduce federal revenues by [$193.1 billion](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=76612&baseline=2&timePeriod=2026&region=us&dataset=enhanced_cps&household=51531) in 2026, or $1,293 per household. On average, households in the ninth income decile gain the most ($2,489), while those in the bottom decile gain the least ($390).

**Figure 4: Average Change in Net Income by Income Decile in 2026**
![](https://cdn-images-1.medium.com/max/3200/0*C1SnOSqPhLBgE1BZ)

**Table 1: 10-Year Budgetary Impact of the FISC Act**
| Tax Year | Static Impact ($bn) | Dynamic Impact ($bn) | 
| -------- | ------------------- | -------------------- | 
| 2026     | -193.1              | -217.4               |
| 2027     | -194.5              | -218.4               |
| 2028     | -195.5              | -219.7               |
| 2029     | -196.3              | -216.6               |
| 2030     | -197.0              | -219.2               |
| 2031     | -197.1              | -224.8               |
| 2032     | -196.3              | -227.4               |
| 2033     | -194.7              | -225.6               |
| 2034     | -193.1              | -227.6               |
| 2035     | -190.0              | -230.4               |
| Total    | -1,947.6            | -2,227.1             |


37% of US residents would gain: 50% of those in the sixth decile and 14% of those in the upper decile representing the extrema.

**Figure 5: Winners and Loosers of the FISC Act in 2026**
![](https://cdn-images-1.medium.com/max/3200/0*Vh2YnnLEIx8Tfhi9)

## Poverty Impact

The FISC Act would lower the nation’s Supplemental Poverty Measure by [9.2%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.regular.byAge&reform=76612&baseline=2&timePeriod=2026&region=us&dataset=enhanced_cps&household=51531) and child poverty by 17.7%. PolicyEngine projects the legislation would reduce deep poverty by [11.7%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact.deep.byAge&reform=76672&baseline=2&timePeriod=2026&region=us&dataset=enhanced_cps&household=51531).

**Figure 6: Change in Poverty in 2026**
![](https://cdn-images-1.medium.com/max/3200/0*iLhr0pdmo70LGE1t)

## Conclusion

Representative Golden’s FISC Act would replace the Child Tax Credit with a larger credit that varies with child age and marital status, and introduce a pregnancy credit. It would cost $193 billion in 2026, providing larger benefits to households in the middle of the income distribution than those in the top or bottom deciles. Without considering behavioral responses, it would reduce poverty and [income inequality](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=76612&baseline=2&timePeriod=2026&region=us&dataset=enhanced_cps&household=51531).

To explore how this policy would affect your household or to design your own reform, visit [PolicyEngine’s interactive tools](https://policyengine.org/us) and discover our broader collection of [policy analyses](https://policyengine.org/us/research).
