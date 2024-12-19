_We’re grateful to [Arnold Ventures](https://www.arnoldventures.org/) for supporting this model enhancement and research._

When faced with new public policies, Americans adjust their economic behaviors. These policy changes – whether at the federal or state level – set off chain reactions across society. Workers [modify their working hours](https://www.aeaweb.org/articles?id=10.1257/aer.101.3.471), investors change [when to realize their gains](https://www.aeaweb.org/articles?id=10.1257/jel.50.1.3), and businesses [reshape their practices](https://www.jstor.org/stable/2117913). Looking at policies through a static lens misses these dynamic human responses to changing incentives. PolicyEngine US incorporates two fundamental behavioral responses to policy changes, which we explain in this report:

1. Income effects on labor supply
2. Substitution effects on labor supply

How do we measure behavioral responses to policy changes? The key lies in _elasticities_, which measure how people respond to policy changes. A larger elasticity signals a stronger behavioral shift, while a smaller one indicates more modest adjustments. PolicyEngine US lets users quickly apply elasticities from the Congressional Budget Office or set their own. This report describes these responses and how they affect results in our microsimulation model.

## How income and substitution effects affect labor supply

In PolicyEngine US, we model how Americans adjust their work hours through two key mechanisms: income and substitution effects. Income effects show how people might choose more leisure time when their income increases. Substitution effects capture how workers respond when their take-home pay for extra hours changes.

### Income elasticity

How do people adjust their work hours when they become better off? The income elasticity measures this behavior, quantifying how Americans modify their work patterns when their take-home pay changes through taxes and transfers. Following the [Congressional Budget Office (CBO)](https://www.cbo.gov/sites/default/files/112th-congress-2011-2012/reports/43674-laborsupplyfiscalpolicy.pdf#page=4)'s central estimate, PolicyEngine US sets the default income elasticity at **\-0.05**. In practical terms, a 10% increase in after-tax income results in an average of 0.5% decrease in work.

### Substitution elasticity

How much people work often depends on their take-home pay per extra hour. The substitution elasticity measures this relationship \- how work habits change when the reward for additional hours shifts. For instance, when higher tax rates or steeper benefit phase-outs reduce the pay from extra hours, workers might cut back on overtime or reduce part-time hours. PolicyEngine US implements the [Congressional Budget Office](https://www.cbo.gov/sites/default/files/112th-congress-2011-2012/reports/43674-laborsupplyfiscalpolicy.pdf#page=4)'s heterogeneous substitution elasticities, which vary by income level. The elasticities range from 0.31 for the lowest income decile to 0.22 for the highest deciles among primary earners, with secondary earners at 0.32. This means when workers in the lowest income decile keep 10% less of their earnings from each additional hour, they typically reduce their work by 3.1%, while higher-income workers reduce their work by 2.2%. The full range of elasticities by income group is shown in the table below.

![](/images/posts/us-behavioral-response/elasticities.png)

## A practical example

To see how these elasticities work in practice, let's examine how a Massachusetts worker earning $50,000 annually would respond to a potential increase in the state income tax rate from 5% to 6%:

| Measure                  | [Baseline](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=49486) | [Reform](https://policyengine.org/us/household?focus=householdOutput.netIncome&region=ma&timePeriod=2025&baseline=2&reform=70814&mode=full&household=49486)  | Difference      |
| :----------------------- | :------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| Hourly wage              | $25.00                                                                                            | $25.00                                                                                                                                                       | \-              |
| Annual hours             | 2,000                                                                                             | 2,000                                                                                                                                                        | \-              |
| Annual Earnings          | $50,000                                                                                           | $50,000                                                                                                                                                      | \-              |
| State Income Tax Rate    | 5%                                                                                                | 6%                                                                                                                                                           | \+1pp           |
| Net income               | [$40,034](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=49486)  | [$39,598](https://policyengine.org/us/household?focus=householdOutput.netIncome&region=ma&timePeriod=2025&baseline=2&reform=70814&mode=full&household=49486) | \-$436 (1.09%)  |
| Marginal Tax Rate        | 24.7%                                                                                             | 25.7%                                                                                                                                                        | \+1pp           |
| Net Marginal Hourly Wage | $18.83                                                                                            | $18.58                                                                                                                                                       | \-$0.25 (-1.3%) |

Our Massachusetts worker earns $25.00 per hour, working 2,000 hours annually for $50,000 total earnings. Their net income changes from $40,034 to $39,598 due to an increase in state income tax from 5% to 6%. This $436 reduction represents a 1.09% drop in their current net income ($436 / $40,034 \= 0.0109 \= 1.09%). The percentage differs from the 1pp tax rate increase because the tax applies to gross income while the percentage change is relative to net income, which is lower due to taxes and deductions.

Under the policy change, their net marginal hourly wage would fall from $18.83 to $18.58; this $0.25 drop is 1% of their $25 nominal wage and represents a 1.3% fall in their net marginal wage. It's important to note that the change in net income (-1.09%) is smaller than the 1% increase in the state tax rate due to several factors:

- The standard deduction reduces taxable income before the tax rate is applied
- The tax increase only affects state taxes, not federal taxes or other deductions
- The percentage change is calculated against total take-home pay, which includes all adjustments and deductions

To understand these calculations in detail, let's examine how this worker responds to the policy change. Applying the CBO's elasticities, this reform triggers two behavioral responses:

|     Effect type     |    Change in relative quantity     | Elasticity |   Change in hours worked   | Change in annual earnings  |
| :-----------------: | :--------------------------------: | :--------: | :------------------------: | :------------------------: |
| Substitution Effect | \-1.3% (drop in net marginal wage) |  0.25[^1]  |  \-0.325% (-1.3% × 0.25)   | \-$162.50 (-6.5 hrs × $25) |
|    Income Effect    |  \-1.09% (drop in take-home pay)   |   \-0.05   | \+0.054% (-1.09% × \-0.05) | \+$27.00 (+1.08 hrs × $25) |
|        Total        |                                    |            |          \-0.271%          |         \-$135.50          |

Combining these opposing effects \- the 0.325% decrease from substitution and the 0.054% increase from income \- yields a net reduction of 0.271% in work hours. For our Massachusetts worker, this translates to approximately 5.4 fewer work hours (0.271% of 2,000) and $135.5 less in earnings per year (5.4 hours × $25/hour).

While this example shows how behavioral responses affect an individual worker, we can use PolicyEngine's microsimulation to examine how these responses impact government revenues and distributional effects.

## Applying behavioral responses in PolicyEngine US

By default, PolicyEngine US operates with no behavioral responses. To activate behavioral responses, users can either:

1. Apply CBO’s behavioral responses with one click
2. Set their own elasticities using the same structure as the CBO’s (single income elasticity and substitution elasticities varying by income and primary/secondary)

The fastest way to apply behavioral responses is to toggle “Apply CBO behavioral responses" in the baseline policy section, as shown below.

![](/images/posts/us-behavioral-response/app1.png)

This sets each of the elasticities per CBO’s table. Alternatively, you can navigate to the Parameters tab and find the elasticity settings under _Simulation \> Labor supply responses_ as shown in Figure below.

![](/images/posts/us-behavioral-response/app2.png)

When users input any non-zero elasticities, the model incorporates behavioral responses into its tax-benefit calculations. For each policy reform simulation, the model first calculates how policy changes affect both income and tax rates. Then, it estimates two behavioral changes:

- How changes in total income influence work decisions
- How marginal tax changes affect work hours

Since each person's earnings can impact household net income differently, the model calculates marginal tax rates for each of the top three earners and applies their labor supply responses separately.

![](/images/posts/us-behavioral-response/reform-static.png)

After adjusting how much each worker earns, we apply the microsimulation model again to calculate their new taxes and benefits. For example, if elasticities imply that a reform will increase an earner’s labor supply (and they face a positive marginal tax rate), they will also pay more in tax after the final step.

## Macro effects of behavioral responses

To demonstrate how behavioral responses affect the broader fiscal impact, let's examine the revenue implications of raising the Massachusetts state income tax rate from 5% to 6%. [Applying CBO’s elasticities](https://policyengine.org/us/policy?focus=policyOutput.laborSupplyImpact.hours&reform=72611&region=ma&timePeriod=2025&baseline=2), we find that the reform would reduce hours worked by 0.24%. While the income effect raises employment by 1,700 full-time equivalents (since the tax lowers the net income of affected workers), the substitution effect lowers employment by 9,900 full-time equivalents (since affected workers see their net-of-tax wage rate fall), for a net effect of 8,200 FTEs.

![](/images/posts/us-behavioral-response/hours-worked.png)

In turn, [earnings fall 0.27%](https://policyengine.org/us/policy?focus=policyOutput.laborSupplyImpact.earnings.overall.relative&reform=72611&region=ma&timePeriod=2025&baseline=2); this exceeds the hours worked effect because low-income workers, who pay no state tax under current law due to various deductions, exemptions, and non-refundable credits, are unaffected by the reform. Extended visualizations show how these effects vary with income decile.

![](/images/posts/us-behavioral-response/earning.png)

Finally, the reduced earnings in turn reduce the revenue projection from [$3.6 billion](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=72337&region=ma&timePeriod=2025&baseline=2) without behavioral responses to [$3.2 billion](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=72338&region=ma&timePeriod=2025&baseline=2) with them (an 11% reduction). PolicyEngine estimates the effect of behavioral responses on other outcomes too; for example, without behavioral responses, the tax reform lowers the net income share held by the top 10% by [0.2%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=72337&region=ma&timePeriod=2025&baseline=2) without behavioral responses, but [0.3%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=72338&region=ma&timePeriod=2025&baseline=2) with them.

## Conclusion

In this report, we explain how PolicyEngine US models two key behavioral responses:

1. Income effect for labor supply  
   _Constant elasticity of \-0.05_
2. Substitution effect for labor supply  
   _Elasticity varying between 0.22 and 0.32 depending on income and whether the worker is primary or secondary within the household_

While we have focused on these two core elasticities, PolicyEngine US continues to expand its behavioral modeling capabilities; for example, we are now working on adding capital gains responses. The platform's flexibility allows users to customize behavioral response assumptions, including labor supply elasticities, enabling a more nuanced analysis of public policy impacts.

[^1]: The substitution elasticity varies across the income distribution. $50,000 in earnings places the worker at the [40th earnings percentile](https://github.com/PolicyEngine/policyengine-us/blob/31d7b3359dc3de2aa1523408be0f2b87d360e4a5/policyengine_us/variables/gov/simulation/labor_supply_response/labor_supply_response.py#L114), (barely) mapping to the fifth decile. Based on CBO's labor supply elasticity table, this corresponds to an elasticity of 0.25 for primary earners, meaning people in these deciles work 2.5% less when they keep 10% less from each additional hour after taxes and transfers.
