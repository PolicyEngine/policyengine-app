Last week, the Biden Administration [announced its budget](https://www.whitehouse.gov/omb/briefing-room/2023/03/09/fact-sheet-the-presidents-budget-for-fiscal-year-2024/) for the 2024 fiscal year. The proposal “calls on the Congress to make the Earned Income Tax Credit expansion for childless workers permanent, which would help pull low-paid workers out of poverty.”

The president’s announcement refers to the expansion of the Earned Income Tax Credit (EITC) temporarily enacted by the American Rescue Plan Act (ARPA) in 2021, which has since expired. This report describes ARPA’s EITC expansion for childless workers and PolicyEngine’s projected impacts of restoring it today.

## What is the Earned Income Tax Credit?

The EITC is a federal tax credit for low- and moderate-income working individuals and families, [originally signed into law](https://sgp.fas.org/crs/misc/R44825.pdf) by President Ford in 1975 and made permanent by President Carter in 1978. The US [limits the EITC](https://www.taxpolicycenter.org/briefing-book/what-earned-income-tax-credit) to filers with earned income, allotting recipients a credit equaling a percentage of earnings up to a certain maximum. The rate and maximum credit vary by family size, with larger credits for families with more children.

A critical feature of the EITC is that it is a “refundable” credit — meaning that if the value of the credit exceeds taxes owed, the taxpayer receives the excess as a refund. It also phases in and out gradually. The credit amount increases as earned income increases, reaches a maximum, and then decreases as earned income exceeds the phase-out threshold.

Historically, the EITC did not support childless workers. That changed with the Omnibus Budget Reconciliation Act of 1993, which created a new credit formula that included low-income workers without qualifying children. In 2021, the American Rescue Plan [further expanded the EITC](https://www.cbpp.org/research/federal-tax/year-end-tax-policy-priority-expand-the-child-tax-credit-for-the-19-million) for workers without qualifying children. That change — which the Biden administration wants to make permanent — expired at the end of 2021.

## What are the current impacts of the childless EITC?

For each individual, the IRS [determines the value of the EITC](https://www.irs.gov/pub/irs-drop/rp-22-38.pdf) by earned income — which includes wages, salaries, and self-employment income. For workers without children in tax year 2023, the EITC provides a credit of 7.65% of earned income with a maximum credit of $600. The phaseout begins when annual income exceeds $9,800 and terminates when income reaches $17,640. To view this graphically, see the chart below from [this PolicyEngine page](https://policyengine.org/us/household?focus=householdOutput.earnings&household=14695) that displays the credit amount received by a single individual without children at different levels of earned income.

![](https://cdn-images-1.medium.com/max/3076/0*PKoG8QuJtyyrVTe5)

Correspondingly, such an individual faces a spike in their marginal tax rate between $17,500 and $19,000 of employment income when the EITC completely phases out. To model the impact of the childless EITC on marginal tax rates in PolicyEngine, visit [this page](https://policyengine.org/us/household?focus=householdOutput.mtr&household=14695).

To compute the macro impact of the childless EITC using PolicyEngine, [compare current law against abolishing it](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=2&region=us&timePeriod=2023&baseline=6525). According to this simulation, [the childless EITC costs](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=2&region=us&timePeriod=2023&baseline=6525) $2.3 billion. This represents 5.4% of our [projected total EITC cost](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=2&region=us&timePeriod=2023&baseline=5331) of $42.7bn. However, this figure falls 38.8% below the [JCT estimate of the program](https://www.jct.gov/publications/2022/jcx-22-22/), $69.8bn, which likely stems from the CPS under-capturing low-income households. [We will enhance the CPS data later this year](https://policyengine.org/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis), which should more closely align this estimate to administrative totals.

Additionally, we project that the childless EITC [reduces the poverty rate](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact&reform=2&region=us&timePeriod=2023&baseline=6525) by 0.6% and [the deep poverty rate](https://policyengine.org/us/policy?focus=policyOutput.deepPovertyImpact&reform=2&region=us&timePeriod=2023&baseline=6525) by 0.8%, and [increases the average household’s net income](https://policyengine.org/us/policy?focus=policyOutput.decileAverageImpact&reform=2&region=us&timePeriod=2023&baseline=6525) by $17. The childless EITC disproportionately benefits lower-income workers, but due to the small absolute impact, it [reduces income inequality](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=2&region=us&timePeriod=2023&baseline=6525) by less than 0.1%.

## How did the ARPA expand the childless EITC?

In 2021, ARPA made the following changes to the EITC for childless workers:

1. Lowered the applicable minimum age from 25 to 19

1. Eliminated the maximum age (previously 65)

1. Raised the maximum credit amount from $560[^1] to $1,502

1. Raised the phase-in and phase-out rates from 7.65% to 15.3%

1. Raised the income threshold at which the phase-out begins from $5,280[^2] to $11,610

1. Allowed separate filers in the same household to be eligible for the EITC

[^1]: The value of $600 mentioned in the previous section is the inflation-adjusted figure for 2023.

[^2]: Today’s inflation-adjusted value is $9,800.

## Limitations of PolicyEngine’s EITC model

Before assessing PolicyEngine’s projected impacts of restoring these changes, it is necessary to note the limitations and assumptions of our model.

First, we do not model the full complexity of the modified minimum age, which contained exceptions for students, homeless youth, and former foster youth.[^3] Our forecast assumes that the minimum age is 19 for all childless workers.

[^3]: The minimum age for “[specified students](https://www.law.cornell.edu/definitions/uscode.php?width=840&height=800&iframe=true&def_id=26-USC-2036225077-1503094078&term_occur=999&term_src=title:26:subtitle:A:chapter:1:subchapter:A:part:IV:subpart:C:section:32)” was only lowered to 24, and the minimum age for both “[qualified former foster youth](https://www.law.cornell.edu/definitions/uscode.php?width=840&height=800&iframe=true&def_id=26-USC-488059477-1503094078&term_occur=999&term_src=title:26:subtitle:A:chapter:1:subchapter:A:part:IV:subpart:C:section:32)” and “[qualified homeless youth](https://www.law.cornell.edu/definitions/uscode.php?width=840&height=800&iframe=true&def_id=26-USC-1746670673-1503094078&term_occur=999&term_src=title:26:subtitle:A:chapter:1:subchapter:A:part:IV:subpart:C:section:32)” was lowered further to 18.

Second, our values for the maximum credit amount and income phase-out threshold are taken directly from ARPA itself, which did not contain inflation adjustments (as the provisions expired in the same fiscal year). Restoration of the ARPA EITC expansion would plausibly adjust these values for inflation; accordingly, our model’s projections may understate the impacts of reinstating these changes today.

As discussed above, we follow the CPS data’s understatement of low-income tax credits like the EITC.

## How would restoring the ARPA childless EITC expansion affect the US?

To compute the population-level impacts of restoring ARPA’s EITC expansion, click on ‘find an existing policy’ and select ‘[Restoring the ARPA EITC](https://policyengine.org/us/policy?focus=gov&region=us&timePeriod=2023&baseline=2&reform=6524).’ According to this model, the reform [would cost $10.4bn](https://policyengine.org/us/policy?focus=policyOutput.netIncome&region=us&timePeriod=2023&baseline=2&reform=6524) in 2023 and [increase the average household’s net income by $79](https://policyengine.org/us/policy?focus=policyOutput.decileAverageImpact&region=us&timePeriod=2023&baseline=2&reform=6524). Because filers living in the same household can qualify for the EITC, all income deciles would experience a rise in average net income.

![](https://cdn-images-1.medium.com/max/3200/0*ONBi9tKp9KU5r430)

However, in percentage terms, the policy would provide [more significant benefits to lower-income deciles](https://policyengine.org/us/policy?focus=policyOutput.decileRelativeImpact&region=us&timePeriod=2023&baseline=2&reform=6524). The relative change in income is highest for the lowest decile at 0.79% and decreases as the income decile increases.

![](https://cdn-images-1.medium.com/max/3200/0*L3XIeQX8BmRApiXG)

These benefits would [affect households comprising 12% of the population](https://policyengine.org/us/policy?focus=policyOutput.intraDecileImpact&region=us&timePeriod=2023&baseline=2&reform=6524). For 3.2% of Americans, the policy would cause net incomes to rise by more than 5% — disproportionately those in the bottom four deciles.

![](https://cdn-images-1.medium.com/max/2744/0*xmfrxZWnWHnjFULM)

Our model of the Supplemental Poverty Measure indicates that the reform [reduces the overall poverty rate](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact&region=us&timePeriod=2023&baseline=2&reform=6524) from 9.6% to 9.4%, a 2% decline.

Unsurprisingly, the most significant poverty reduction would be for working-age adults, as the expanded credits would accrue directly to employed adults without children. However, the child poverty rate would decline as well. This is likely due to adults living in households with children — but who are not themselves parents — newly qualifying for the EITC under the ARPA expansion. Additionally, the poverty rate for seniors would decline by 0.8%, likely due to ARPA eliminating the maximum age requirement.

![](https://cdn-images-1.medium.com/max/2704/0*6vdoNuRsqVxry6Sw)

The expansion would also [lower deep poverty](https://policyengine.org/us/policy?focus=policyOutput.deepPovertyImpact&region=us&timePeriod=2023&baseline=2&reform=6524) — the population share below half their Supplemental Poverty Measure threshold — by 0.9%. Again with the most significant reduction for working-age adults.

![](https://cdn-images-1.medium.com/max/2636/0*9n6R0cOgRIp8M_83)

The reductions in [poverty](https://policyengine.org/us/policy?focus=policyOutput.genderPovertyImpact&region=us&timePeriod=2023&baseline=2&reform=6524) and [deep poverty](https://policyengine.org/us/policy?focus=policyOutput.genderDeepPovertyImpact&region=us&timePeriod=2023&baseline=2&reform=6524) from restoring ARPA’s childless EITC expansion would be slightly larger for males than females.

![](https://cdn-images-1.medium.com/max/2640/0*0R00fQj5KFC1CeDP)

For men and women, the reform cuts deep poverty by about half as much as it cuts poverty.

![](https://cdn-images-1.medium.com/max/2752/0*LBdDOM9LeUG_w_OQ)

Additionally, the reform would [reduce income inequality](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&region=us&timePeriod=2023&baseline=2&reform=6524), but only slightly. The Gini coefficient — a measure of income inequality — would decrease from 0.414 to 0.413. The share of income held by the top decile of households would fall from 31.6% to 31.5%, and the share held by the top 1% would remain stable at 7.8%.

Lastly, restoring the ARPA EITC would make “cliffs” (a.k.a. [benefit cliffs or welfare cliffs](https://policyengine.org/us/blog/2023-02-02-how-would-reforms-affect-cliffs)) [more prevalent](https://policyengine.org/us/policy?focus=policyOutput.cliffImpact&region=us&timePeriod=2023&baseline=2&reform=6524). The cliff rate — the share of households whose net income would fall if each adult earned an additional $2,000 — would remain unchanged. However, the cliff gap — the sum of the losses incurred by all households on a cliff — would increase by 0.4%.

The Biden administration has proposed making ARPA’s EITC expansion for childless workers permanent to “help pull low-paid workers out of poverty.”

We predict that restoring the ARPA expansion in 2023 would reduce the poverty rate by 2.0% and the deep poverty rate by 0.9% while increasing the average net income of households in the lowest three deciles by over $100.

While there are limitations to PolicyEngine’s EITC model, it provides a valuable tool for assessing the potential impacts of this policy change. The expansion would benefit lower-income workers and would, in fact, pull some of them out of poverty.
