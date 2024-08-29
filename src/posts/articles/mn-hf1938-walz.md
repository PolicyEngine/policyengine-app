In March 2023, Minnesota Governor Tim Walz signed into law [HF1938](https://www.revisor.mn.gov/bills/text.php?number=HF1938&version=4&session=ls93&session_year=2023&session_number=0&format=pdf), a tax reform bill that modifies several aspects of the state’s tax code. The legislation introduces changes to family tax credits, retirement benefit subtractions, and deductions for high-income taxpayers.

PolicyEngine’s static microsimulation results for 2023 project that HF1938’s individual income tax provisions:

- Cost $444 million

- Reduced poverty by 2% and child poverty by 9%

- Increased net income for 22% and reduced net income for 4% of Minnesotans

- Lowered the Gini index of income inequality by 0.9%

This report describes provisions of HF1938, illustrates the impacts with hypothetical households, and summarizes projected Minnesota-wide impacts.

[_See the Minnesota impacts_](https://policyengine.org/us/policy?reform=2&focus=policyOutput.policyBreakdown&region=mn&timePeriod=2023&baseline=63889&household=46737)

[_See how HF1938 would affect your own household_](https://policyengine.org/us/household?reform=2&focus=intro&region=mn&timePeriod=2023&baseline=63889)

# Provisions of HF1938

HF1938 expanded low-income tax credits, adjusted retirement income subtractions, and reduced standard and itemized deductions for high-income filers. It also included several provisions PolicyEngine does not currently model, including property tax adjustments as well as education tax credit.

## Working Families Tax Credit

The new law introduces a combined Child and Working Family Tax Credit, replacing the previous Working Family Credit (which resembled the federal Earned Income Tax Credit) and adding a new child tax credit (CTC) component:

| Credit Impacts           | Working Family Credit (2022)                                                                                                                                              | Child and Working Family (2023)                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maximum Amount**       | No children: $295.23 <br> One child: $1,183 <br> Two children: $2,283 <br> Three or more children: $2,647                                                                 | $1,750 per child qualifying for the federal CTC <br> $350 per family <br> Additional credit for dependent children not eligible for the federal CTC: <br> 1 Child: $925 <br> 2 Children: $2,100 <br> 3 or more Children: $2,500 |
| **Earnings Requirement** | Full credit phases in with earnings                                                                                                                                       | Family component phases in with earnings                                                                                                                                                                                        |
| **Reduction Start**      | Single / Married <br> No children: $9,240 / $15,430 <br> One child: $24,110 / $30,290 <br> Two children: $28,590 / $34,770 <br> Three or more children: $28,900 / $35,090 | Single: $29,500 <br> Married: $35,000                                                                                                                                                                                           |
| **Reduction Rate**       | No children: 2% <br> One child: 6% <br> Two or more children: 10.5%                                                                                                       | Main rate: 12% <br> Additional rate for dependent children not eligible for the federal CTC: 9%                                                                                                                                 |

## Introduces Retirement Benefits Subtraction for Public Sector Pensions

- Subtracts up to $12,500 ($25,000 married) in public sector pension benefits from state adjusted gross income

- Phases out at 5% of income above $78,000 ($100,000 married)

## Expands Social Security Subtraction

- Increased the maximum amount of Social Security benefits subtracted from state adjusted gross income from $4,020 to $4,560 ($5,150 to $5,840 married)

- Increased reduction thresholds from $61,080 to $69,250 ($78,180 to $88,630 married)

- Maintains $40,000 phase-out window (10% per $4,000 income above the threshold)

## Expands Child and Dependent Care Credit (CDCC)

- Made married filing separately filers eligible for the state CDCC

## Further Reduces Standard and Itemized Deductions for High Income Filers

- Adds two new reductions to standard and itemized deductions for high-income filers, atop the existing reduction equal to 3% of income above $110,325 ($220,650 married): 10% of income over $304,970 and 80% of income over $1,000,000

# Household Impacts

## Child and Working Family Credit

The new Child and Working Family Tax Credit provides up to $3,385 to eligible Minnesota households. For instance, a single parent with two children (ages 10 and 5) earning $30,000 now receives an additional [$1,656](https://policyengine.org/us/household?reform=2&focus=householdOutput.netIncome&region=mn&timePeriod=2023&baseline=63889&household=46721) in refundable credits under the new structure.

The following graph shows how the reform affects a married couple with two children as well as for a single parent:[^1]

[^1]: I created this figure with [this code](https://github.com/PolicyEngine/analysis-notebooks/blob/main/us/states/mn/hf1938/mn_hf1938_wftc.ipynb). Other figures are from the PolicyEngine web app.

**Figure 1: Credit amount comparison of the Working Family Credit and the new Child and Working Family Credit on a couple and single parent of two (10 and 5) (2023)**

![](https://cdn-images-1.medium.com/max/2660/0*NTzfwwf6k2PVGxpq)

Looking at the [net impact](https://policyengine.org/us/household?reform=2&focus=householdOutput.earnings&region=mn&timePeriod=2024&baseline=63834&household=46680), this household could receive up to an additional $3,500 due to the removal of the general earnings requirements for the Child Tax Credit component. The impact gradually reduces as the previous Working Family Credit phases in and spikes once more due to the delayed reduction start.

**Figure 2: Net income impact of the Minnesota Bill HF1938 on a single parent of two (10 and 5) with earnings up to $100k (2023)**

![](https://cdn-images-1.medium.com/max/3200/0*GJSskNDoNTqey6n8)

The credit change also impacts [marginal tax rates](https://policyengine.org/us/household?reform=2&focus=householdOutput.mtr&region=mn&timePeriod=2024&baseline=63834&household=46680) for the given family. The marginal tax rates increase by as much as 12 percentage points for earnings between $50,000 and $62,000.

**Figure 3: Marginal Tax Rate changes under the Minnesota Bill HF1938 on a single parent of two (10 and 5) (2023)**

![](https://cdn-images-1.medium.com/max/3200/0*eSBqpQM51uN6veYk)

## Reduced Standard Deduction

Zooming out, we can see that the reform reduces [this household’s](https://policyengine.org/us/household?reform=2&focus=householdOutput.earnings&region=mn&timePeriod=2024&baseline=63834&household=46745) standard deduction for earnings between $310,000 and $775,000.

**Figure 4: How Minnesota Bill HF1938 (2023) affects a joint filer’s standard deduction**

![](https://cdn-images-1.medium.com/max/3200/0*2DLAosGOytyh8SuP)

Accordingly, the reform increases this household’s taxes by as much as $966, for earnings of $445,000.

**Figure 5: Net income impact of the Minnesota Bill HF1938 on a single parent of two (10 and 5) with earnings up to $800k (2023)**

![](https://cdn-images-1.medium.com/max/3200/0*6dlFo_YMTdbifJui)

## Social Security and public pension subtractions

To illustrate the changes to the subtractions for Social Security benefits public pensions, consider an individual receiving $25,000 in public pensions (for example, from teaching in public schools) and $20,000 in Social Security benefits. These are both roughly average values. This individual would pay up to $1,500 less in [income tax](https://policyengine.org/us/household?reform=2&focus=householdOutput.netIncome&region=mn&timePeriod=2023&baseline=63889&household=46737) due to the newly introduced public retirement income subtraction and the adjusted social security income subtraction.

**Figure 6: Impact of the new subtraction structure under the Minnesota Bill HF1938 on a senior with $25k of public retirement income and $20k of social security retirement income (2023)**

![](https://cdn-images-1.medium.com/max/3200/0*ExCR_GL_u6VfJ3oj)

# Microsimulation Results

PolicyEngine’s US microsimulation model (version 1.57.1), run over the indexed 2022 Current Population Survey March Supplement for 2023, reveals several key impacts of HF1938’s individual income tax provisions:

- Costs [$444 million](https://policyengine.org/us/policy?reform=2&focus=policyOutput.policyBreakdown&region=mn&timePeriod=2023&baseline=63889)

- Lowers Minnesota’s Supplemental Poverty Measure by 1.9%, including [9.4%](https://policyengine.org/us/policy?reform=2&focus=policyOutput.povertyImpact.regular.byAge&region=mn&timePeriod=2023&baseline=63889) for children and [45.6%](https://policyengine.org/us/policy?reform=2&focus=policyOutput.povertyImpact.deep.byAge&region=mn&timePeriod=2023&baseline=63889) for deep child poverty

- Reduces income inequality in Minnesota: the Gini index falls [0.8%](https://policyengine.org/us/policy?reform=2&focus=policyOutput.inequalityImpact&region=mn&timePeriod=2023&baseline=63889&household=46737), while the net income share held by the top 1% and 10% each fall 0.2%

[22%](https://policyengine.org/us/policy?reform=2&focus=policyOutput.winnersAndLosers.incomeDecile&region=mn&timePeriod=2023&baseline=63889) of residents will experience an increase in their after-tax income due to these changes, including 35% of those in the bottom income decile. Conversely, 4% of residents will see a reduction in their after-tax income, including 38% of those in the top income decile.

**Figure 7: Winners and Losers from the Minnesota Bill HF1938 by Decile (2023)**

![](https://cdn-images-1.medium.com/max/3200/0*nI9I5cjBOwe0Ijwl)

These results assume no behavioral responses.

# Conclusion

The Minnesota tax reform bill HF1938 introduces changes to the state’s tax structure, particularly in areas of family tax credits, retirement benefits, and deductions for high-income earners.

The microsimulation results suggest that these reforms will reduce inequality and poverty, especially among children. The changes in tax credits and deductions create a mixed effect across income levels, with a majority of residents seeing increased after-tax income, while a smaller percentage, primarily in higher income brackets, experience reductions.
