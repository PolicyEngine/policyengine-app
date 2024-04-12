On Monday, Scott Winship, senior fellow and the director of the Center on Opportunity and Social Mobility at the American Enterprise Institute, published [“Reforming the EITC to Reduce Single Parenthood and Ease Work-Family Balance”](https://ifstudies.org/blog/reforming-the-eitc-to-reduce-single-parenthood-and-ease-work-family-balance) for the Institute for Family Studies. The blog proposed a set of reforms to the Earned Income Tax Credit, most notably basing eligibility on individual rather than joint earnings for married earners. It would also limit EITC eligibility to filers with combined income below $100,000. This report reviews the individual, budgetary, and distributional impacts of that reform using PolicyEngine.

[**_See how an individualized EITC would affect you._**](https://policyengine.org/us/household?focus=intro&reform=17331&region=us&timePeriod=2023&baseline=2)

## EITC marriage incentives

The Earned Income Tax Credit is a refundable tax credit based, as all other federal income tax programs are, on a filer’s total income, including the combined income of spouses for joint filers. The credit increases with the number of children (up to three), phases in with respect to total earned income, and phases out with respect to adjusted gross income.

The structure of the EITC can create a marriage penalty for some people. A marriage penalty occurs when a couple’s total tax bill as a result of getting married exceeds what it would be if they were single and filing individually. As Winship notes:

> Consider an unmarried couple, in which one partner with two children makes $20,000 per year and the other (childless) partner makes $30,000 per year. Under current policy, while they remain unmarried, the parent gets a $6,604 EITC benefit, so their combined income is $56,604. If they get married, their EITC drops to $1,991 because the couple’s income is relatively high and the benefit phases out. They are worse off by $4,613.

PolicyEngine confirms these results, and also provides total net income after taxes and benefits. Table 1 illustrates how this penalty would work for a couple in Texas.

**Table 1: EITC and net income for a sample household under current law**

| Household                                                                                                                         | EITC   | Net income |
| --------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------- |
| [Single parent of two, $20,000 earnings](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=32119)   | $6,604 | $35,073    |
| [Single person, no kids, $30,000 earnings](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=32120) | $0     | $25,987    |
| Total if unmarried                                                                                                                | $6,604 | $61,060    |
| [Married parents of two, $50,000 earnings](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=32121) | $1,998 | $51,600    |
| Marriage penalty                                                                                                                  | $4,606 | $9,460     |

The EITC therefore contributes about half of the total marriage penalty faced by this couple, with other tax and benefit provisions contributing the other half. If they marry, they will lose $9,460, or 15% of their net income if unmarried.

## Individualizing the EITC

Winship proposes basing the EITC on individual earnings to reduce these marriage penalties. Specifically, his proposal applies the same EITC structure to married individuals, based on their number of kids and treating them as married, but phasing it in and out with respect to individual earnings. He also limits the credit to filers with combined adjusted gross income below $100,000.

Returning to the previous household (if married), they would see their EITC rise by $10,816. As a result, they would now face a marriage bonus of $1,356 (2%), including a $6,210 marriage bonus from the EITC, most of which is offset by a marriage penalty from other tax and benefit programs.

**Table 2: EITC and net income for a sample household under Winship’s individualized EITC**

| Household                                                                                                                                                                           | EITC    | Net income |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------- |
| [Single parent of two, $20,000 earnings](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=32119&region=us&timePeriod=2023&baseline=2&reform=17331)   | $6,604  | $35,073    |
| [Single person, no kids, $30,000 earnings](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=32120&region=us&timePeriod=2023&baseline=2&reform=17331) | $0      | $25,987    |
| Total if unmarried                                                                                                                                                                  | $6,604  | $61,060    |
| [Married parents of two, $50,000 earnings](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=32121&region=us&timePeriod=2023&baseline=2&reform=17331) | $12,814 | $62,416    |
| Marriage penalty                                                                                                                                                                    | -$6,210 | -$1,356    |

We can also examine the “shape” of the reform by [varying the head’s earnings](https://policyengine.org/us/household?focus=householdOutput.earnings&reform=17331&region=us&timePeriod=2023&baseline=2&household=32055), holding the spouse’s earnings constant at $20,000.

Under current law (gray), the head starts on the “plateau” of the EITC due to their spouse’s earnings. As they earn more, they get no additional EITC, and then it phases out. In the reform (blue), their spouse’s EITC is constant, and their own EITC stacks atop it until it fully phases around $59,000 earnings. When the head earns $80,000, they hit the $100,000 AGI cap, and both the head and spouse lose their EITC, creating a [cliff](https://policyengine.org/us/blog/how-would-reforms-affect-cliffs).

![](https://cdn-images-1.medium.com/max/3040/0*0EhFGZyfMcDJ5bi5)

The difference between these lines indicates the net effect of the reform. For someone with two children whose spouse earns $20,000, the reform would provide the maximum benefit of $10,816 if they earn between $28,500 and $39,500.

![](https://cdn-images-1.medium.com/max/3048/0*z_QMwgr6-SHd1oU5)

## Nationwide impacts

PolicyEngine’s microsimulation model estimates budgetary and distributional impacts of policy reforms. The model runs over the Current Population Survey and is static: it does not assume any behavioral effects with respect to labor supply, marriage, child development, fertility, economic growth, or other factors. The model finds that Winship’s reform would:

- [Cost $38.2 billion in 2023](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=17331&region=us&timePeriod=2023&baseline=2)

- [Benefit 13% of the population](https://policyengine.org/us/policy?focus=policyOutput.intraDecileImpact&reform=17331&region=us&timePeriod=2023&baseline=2)

- [Lower poverty by 0.7% and child poverty by 1.3%](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact&reform=17331&region=us&timePeriod=2023&baseline=2), [disproportionately among Hispanic Americans](https://policyengine.org/us/policy?focus=policyOutput.racialPovertyImpact&reform=17331&region=us&timePeriod=2023&baseline=2)

- [Lower deep poverty by 0.4% and deep child poverty by 0.6%](https://policyengine.org/us/policy?focus=policyOutput.deepPovertyImpact&reform=17331&region=us&timePeriod=2023&baseline=2)

- [Lower the Gini index of income inequality by 0.7%](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&reform=17331&region=us&timePeriod=2023&baseline=2)

- [Increase the share of households facing cliffs by 16%](https://policyengine.org/us/policy?focus=policyOutput.cliffImpact&reform=17331&region=us&timePeriod=2023&baseline=2)[^1]

[^1]: Winship shared with me that he intended for legislative staff to shift the cliff to a phase-out.

[Households in the fifth income decile](https://policyengine.org/us/policy?focus=policyOutput.decileRelativeImpact&reform=17331&region=us&timePeriod=2023&baseline=2) would gain the largest share of their income, at 1.4%.

![](https://cdn-images-1.medium.com/max/3200/0*dt4R1nm9QxO11v28)

[The reform would benefit 13% of Americans](https://policyengine.org/us/policy?focus=policyOutput.intraDecileImpact&reform=17331&region=us&timePeriod=2023&baseline=2), and 8% of Americans would see their net income rise at least 5% (dark green). Gains are most concentrated in the fifth income decile, 29% of whom would benefit.

![](https://cdn-images-1.medium.com/max/3200/0*gSnAHg8M-S9Hxhv1)

## Differences from Winship’s initial (now revised) estimate

When Winship first released his blog post, he estimated that the reform would cost $155 billion from 2024 to 2033, citing his colleague Bodi Yang. Yang produced this estimate in a [notebook](https://github.com/bodiyang/EITC-reform/blob/cbd79625b2fad708b8dbfc8768bcc73135ec1007/eitc_reform.ipynb) that estimated a $13.2 billion cost in 2023, allowing for a direct comparison to PolicyEngine, which currently estimates impacts in 2023 only.[^2] After we successfully investigated the discrepancy between this figure and our higher one, he revised the post and [credited us](https://twitter.com/swinshi/status/1678746851330105345) for the research. We found the issue subtle and the case study instructive.

[^2]: Winship and Yang did not report distributional impacts.

To produce this cost estimate, Winship ran the open source Tax-Calculator microsimulation model over the IRS Public Use File (PUF). As a sample of tax returns, analysts generally regard the PUF as a more accurate source of income data than the CPS — and we are currently [incorporating that information into our data](https://policyengine.org/us/blog/enhancing-the-current-population-survey-for-policy-analysis). However, the PUF lacks information on each spouse’s earnings, since filers only need to report the combined total on tax forms. To fill this gap, the Tax-Calculator project determines the average split of income between filer and spouse from the CPS, and applies that equally to PUF records.

PolicyEngine instead uses the CPS directly, where respondents report the income of each person separately. As a result, we capture the diversity of couples with respect to spousal earnings splits. Because this reform disproportionately affects those with large earnings differences between spouses, this difference is material. We believe our $38 billion estimate is more accurate, because it uses income splits directly from the Current Population Survey (CPS).

We shared our findings with Winship the day he released the report, and the next day he corrected it to use the Tax-Calculator CPS data, crediting our find. Winship now reports a $395 billion cost from 2024 to 2033, and Yang’s notebook shows a $43 billion cost in 2023.

This instance taught three lessons in our view:

1. **Open source models facilitate better policy analysis.** We were only able to diagnose the discrepancy because the [Tax-Calculator](https://github.com/PSLmodels/Tax-Calculator/blob/master/taxcalc/calcfunctions.py#L2327) and [Tax-Data](https://github.com/PSLmodels/taxdata/blob/master/taxdata/puf/finalprep.py#L219) code are publicly available on GitHub, as was AEI analyst Bodi Yang’s [code](https://github.com/bodiyang/EITC-reform/tree/main) that produced the estimates. Those who have identified opportunities to improve our own open source software have improved our policy analysis as well.

1. **The Current Population Survey outperforms the IRS Public Use File for some policy questions.** We use the CPS to capture personal relationships within a household, benefit receipt, poverty, and other factors absent from the sample of tax returns in the IRS Public Use File. This comes at a cost: the CPS truncates income more than the PUF, has more measurement error, and lacks some characteristics like specific deductions. We will address those deficiencies by [integrating the datasets](https://policyengine.org/us/blog/enhancing-the-current-population-survey-for-policy-analysis) later this year, but in the meantime, this analysis revealed a particular research question where the CPS can outperform the PUF.

1. **Stochastic imputations produce more realistic data.** If Tax-Data applied a stochastic technique, such as [quantile regression](https://towardsdatascience.com/quantile-regression-from-linear-models-to-trees-to-deep-learning-af3738b527c3), it would have produced greater spread of the spousal earnings share, compared to the constant approach. When we integrate PUF information into the CPS, we will do so using the [survey-enhance](https://github.com/PolicyEngine/survey-enhance) software package we developed to combine the accuracy of machine learning with the stochasticity of quantile regression ([here’s our working paper](https://github.com/PolicyEngine/survey-enhance/blob/main/docs/paper/project_paper.pdf)).

Scott Winship’s EITC reform proposal would directionally achieve its goal of reducing marriage penalties — even shifting some into marriage bonuses — though we have yet to estimate the aggregate impact on marriage incentives. It would also cost about $40 billion in 2023, reduce poverty and inequality, and make cliffs more prevalent.

We’re grateful to Winship and Yang for their collaborative spirit in identifying and resolving a subtle data issue that resulted in significant deviations across datasets, and look forward to further collaborations with open source models to improve the quality and reproducibility of policy analysis.
