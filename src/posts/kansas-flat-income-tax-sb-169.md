Following the [Kansas state house passing](https://fastdemocracy.com/bill-search/ks/2023-2024/bills/KSB00009649/) [Senate Bill 169](http://www.kslegislature.org/li/b2023_24/measures/documents/sb169_02_0000.pdf) last week, Governor Laura Kelly today [vetoed](https://www.kcur.org/news/2023-04-24/kansas-governor-vetoes-huge-a-tax-relief-plan-saying-its-flat-tax-favors-the-rich) the tax reform legislation. SB169 would have replaced its three-bracket income tax to a single 5.25% rate, making it the sixth state to enact legislation [converting to a flat income tax structure](https://taxfoundation.org/flat-tax-state-income-tax-reform/). The bill also has provisions that affect corporate, sales, property, and bank taxes, as well as several exemptions, deductions, and credits.

This post examines the details of these reforms and [PolicyEngine’s forecasted impacts](https://policyengine.org/us/policy?focus=policyOutput.netIncome&region=ks&timePeriod=2023&baseline=2&reform=8918) of implementing SB 169 in the current tax year.

[See how SB 169 would affect your household with PolicyEngine’s personalized calculator.](https://policyengine.org/us/household?focus=intro&region=ks&timePeriod=2023&baseline=2&reform=8918)

## How would SB169 change Kansas’s tax system, and how much does PolicyEngine model?

SB169 would enact nine changes to the tax system. Below we list them, and also note the extent to which PolicyEngine models them.

1. **Flatten the current graduated-rate income tax,** which currently reaches 5.7%, to 5.25% on income above $5,225 (single) and $12,300 (joint).
*Fully modeled.*

1. **Increase the standard deduction for single filers** from $3,500 to $4,000.
*Fully modeled.*

1. **Inflation-adjust the standard deduction** in future years for all filers.
*Not applicable to PolicyEngine’s one-year model.*

1. **Eliminate the nonrefundable Food Sales Tax credit,** which would otherwise end in 2025.
*Fully modeled.*

1. **Eliminate the sales tax on unprepared food.** *PolicyEngine does not model sales taxes. Note however that food purchased with Supplemental Nutrition Assistance Program benefits (food stamps) are already [exempt from sales taxes](https://ask.usda.gov/s/article/Can-sales-tax-be-charged-on-items-I-bought-with-Supplemental-Nutrition-Assistance-Program-benefits#:~:text=Information&text=No%2C%20retailers%20cannot%20charge%20sales,Assistance%20Program%20(SNAP)%20benefits.).*

1. **Expand the income tax exemption for Social Security benefits:** Under current law, Kansans whose total adjusted gross income is $75,000 or less are exempt from taxes on their social security benefits, while those above this threshold are fully taxed. Instead, SB169 would gradually phase out the subtraction for Social Security benefits between $75,000 and $100,000 of adjusted gross income.
*PolicyEngine models the existing exemption, but this reform amends the structure of the exemption in a way that the app cannot model. We therefore exclude it from this analysis, though invite analysts to model it in our Python package.*

1. **Decrease the normal tax rate for corporations.** *Not modeled.*

1. **Raise the exemption ceiling for residential property taxes.** *Not modeled.*

1. **Reduce the tax rate on banks.** *Not modeled.*

PolicyEngine’s limitations may result in our understating the net income benefits to Kansans and the state revenue losses from implementing SB169. Beyond the policies we do not model, our reliance on the Current Population Survey creates inaccuracies that we [intend to remedy later this year](https://policyengine.org/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis).

## How would SB169 affect individual households?

To explore the effect of SB169 on individuals, we will examine three different sample households: a single 55-year-old, a family of four, and a 70-year-old who receives Social Security.

For an able-bodied single 55-year-old with no dependents, the bill would [increase their net income](https://policyengine.org/us/household?focus=householdOutput.earnings&region=ks&timePeriod=2023&baseline=2&reform=8918&household=30049) if they earn less than $16,500 annually or greater than $30,000 annually. Between these two earnings levels, SB169 causes losses of up to $100 of net income due to the bill eliminating the [food sales tax credit](https://www.kansas.gov/kdor/webfile/help/modal-food-sales-credit-details.html#:~:text=The%20amount%20of%20credit%20is,exemption%20for%20Head%20of%20Household).) (FSTC) that currently applies to those with an adjusted gross income (AGI) below $30,615.

We must reiterate that our model does not include eliminating the food sales tax, which may counteract some of these losses. A single individual with no dependents earning more than $17,676 annually is [not eligible for SNAP](https://content.dcf.ks.gov/EES/KEESM/Appendix/F-2_FA_Standards.pdf) in Kansas, so their expenditures on unprepared food are [currently taxed](https://www.ksrevenue.gov/pub1223.html) at 4%. SB169 would eliminate this tax, so our model may overstate the net income losses for such individuals earning between $17,676-$30,615 of AGI.

With that in mind, the chart below shows our projected [change in net income](https://policyengine.org/us/household?focus=householdOutput.earnings&region=ks&timePeriod=2023&baseline=2&reform=8918&household=30049) for a Kansan with these characteristics at different earning levels.

![](https://cdn-images-1.medium.com/max/2000/1*zs4irO8pZV0D55TycVH9Qw.png)

The sudden spike above $30,000 occurs when they are no longer eligible for the FSTC, so SB169 would lower their income tax rate without causing them to lose these benefits. Net income gains continue to increase linearly above $35,500 as the bill reduces the rate for individuals in the top marginal tax bracket from 5.7% to 5.25%.

Currently, a 55-year-old with no dependents between $18,500-$19,500 of AGI faces an effective marginal tax rate greater than 100%, meaning their net income actually declines as their earnings increase. Under SB169, this cliff would extend to $20,000 of AGI, as shown by the chart below.

![](https://cdn-images-1.medium.com/max/2000/1*qd_RP_kweLSuNuyKTCEoDw.png)

The following chart shows the [percentage point change in marginal tax rates](https://policyengine.org/us/household?focus=householdOutput.mtr&region=ks&timePeriod=2023&baseline=2&reform=8918&household=30049) for these individuals at different income levels. The difference stabilizes above $36,000 of AGI, reflecting the tax decrease for higher earners who experience no changes to their state benefits.

![](https://cdn-images-1.medium.com/max/2000/1*gNvnldVmUxMrndZqNToFag.png)

Next, we will consider the impacts of SB169 on a 40-year-old married individual with two children. As shown by the next chart, the bill would [increase or cause no change](https://policyengine.org/us/household?focus=householdOutput.earnings&region=ks&timePeriod=2023&baseline=2&reform=8918&household=30065) to their net income at all earnings levels. Up to $20,000 of AGI, the bill would have no effect, and if they earn more, they would benefit. (The flat value between $47,000-$77,000 is slightly positive, though close to 0).

![](https://cdn-images-1.medium.com/max/2000/1*sqd7AEEDFippG852CY5UWA.png)

However, SB169 would slightly extend a cliff between $39,00-$47,500 for families with these characteristics and leave a second cliff between $55,500-$59,000 intact. This results from the increased marginal tax rates it would create in that earnings range.

![](https://cdn-images-1.medium.com/max/2000/1*4ur6n5R3osxEQzMQEvX7Gw.png)

Next, we will consider the [projected changes in net income](https://policyengine.org/us/household?focus=householdOutput.earnings&region=ks&timePeriod=2023&baseline=2&reform=8918&household=30070) for a single 70-year-old with no dependents. These effects are almost identical in shape and magnitude to those for a single 55-year-old, as shown by the chart below. This is because we do not model SB169’s expansion of the income tax exemption for Social Security benefits, which would benefit seniors between $75,000-$100,000 of AGI.

![](https://cdn-images-1.medium.com/max/2000/1*FCRNnAdNG9MScT9JbFl8wQ.png)

## How would SB169 affect Kansas as a whole?

To simulate the state-wide impacts of SB169 in 2023, navigate to ‘compute the impact of policy reforms’ from PolicyEngine’s homepage, click on ‘find an existing policy,’ select ‘[Kansas SB169 2023](https://policyengine.org/us/policy?focus=gov&region=ks&timePeriod=2023&baseline=2&reform=8918)’ from the dropdown box, and choose Kansas from the list of states. According to this model, the reform would cost the state [approximately $240 million in lost tax revenue](https://policyengine.org/us/policy?focus=policyOutput.netIncome&region=ks&timePeriod=2023&baseline=2&reform=8918) and increase the average household’s [net income by $201](https://policyengine.org/us/policy?focus=policyOutput.decileAverageImpact&region=ks&timePeriod=2023&baseline=2&reform=8918).

![](https://cdn-images-1.medium.com/max/2000/1*QztrXJyJb8iTD3FFKs2-dQ.png)

[In percentage terms](https://policyengine.org/us/policy?focus=policyOutput.decileRelativeImpact&region=ks&timePeriod=2023&baseline=2&reform=8918), the average change in disposable income also increases for higher earners, ranging from +0.1% for the lowest income decile to +0.5% for the highest income decile.

![](https://cdn-images-1.medium.com/max/2000/1*NzJrJ3JSoAOpWG0kKQ5Gqw.png)

Those benefits would [accrue to households comprising 67%](https://policyengine.org/us/policy?focus=policyOutput.intraDecileImpact&region=ks&timePeriod=2023&baseline=2&reform=8918) of Kansas’s population. Yet, 0.6% of Kansans would lose out due to SB169, all in the bottom three income deciles. This is likely because the bill eliminates the FSTC. (Again, keep in that our model does not include eliminating the food sales tax itself, which, depending on SNAP eligibility, may counteract some of these losses).

![](https://cdn-images-1.medium.com/max/2000/1*kfhRjwqmheqozjEzJXtwbg.png)

Despite causing gains in net income for many individuals, the bill would not affect [the poverty rate](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact&region=ks&timePeriod=2023&baseline=2&reform=8918) or [deep poverty rate](https://policyengine.org/us/policy?focus=policyOutput.deepPovertyImpact&region=ks&timePeriod=2023&baseline=2&reform=8918) in Kansas. Additionally, although the share of income earned by the top 10% and 1% of earners [will increase due to SB169](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=8918&region=ks&timePeriod=2023&baseline=2), the Gini index — a measure of income inequality — will remain unchanged.

![](https://cdn-images-1.medium.com/max/2000/1*d5H7vilV23Ha9r3I-0Yk-w.png)

Lastly, the bill would make cliffs [more prevalent](https://policyengine.org/us/policy?focus=policyOutput.cliffImpact&reform=8918&region=ks&timePeriod=2023&baseline=2). The cliff rate — the share of households whose net income would fall if each adult earned an additional $2,000 — would rise 15.8% from 1.7% to 2%. And the cliff gap — the sum of losses incurred by households on a cliff — would increase by 3.6% from $50.5 million to $52.3 million.

![](https://cdn-images-1.medium.com/max/2000/1*ECyeIZGQEBxzqkylYLWxGQ.png)

As demonstrated when we considered specific individuals, the bill increases marginal tax rates in particular earning ranges in ways that interact with the phaseout of benefits like SNAP and the FSTC to cause these cliffs.

If enacted, SB169 would replace Kansas’s progressive tax system with a flat income tax rate of 5.25% and alter several other tax provisions. According to PolicyEngine’s model of a subset of income tax provisions, the reform would result in a revenue loss of around $240 million for the state while increasing the average household’s net income by $201, with people in higher income deciles gaining the most.

We forecast that 0.6% of Kansans would experience losses due to SB169 eliminating the Food Sales Tax Credit, primarily in the bottom three income deciles. However, our model does not account for eliminating the food sales tax, which may offset these losses for some individuals.

The bill would not impact Kansas’s poverty or deep poverty rates, and though the share of income earned by the wealthiest citizens would increase, the Gini index would remain unchanged. Lastly, the reform would make income cliffs more prevalent, with the cliff rate rising by 15.8% and the cliff gap increasing by 3.6%.

As policymakers and Kansans weigh the benefits and drawbacks of this reform, it is essential to consider these impacts and their broader implications for the state’s tax and benefits system.
