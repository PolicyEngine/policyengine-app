## Introduction

Public policies change incentives and behaviours. When governments introduce or modify policies, individuals respond by adjusting their decisions. Workers may change their work hours,[^1] investors might shift when they realise gains,[^2] and businesses often adapt their practices in response.[^3] The static analysis fails to capture how individuals adjust their economic decisions when facing new incentives. This report presents how PolicyEngine currently models three key behavioural elasticities: income, substitution, and capital gains responses to policy changes to capture how individuals adjust their economic decisions in response to policy changes.

Elasticities measure these behavioural responses to policy changes. An elasticity quantifies how much behaviour changes in response to a policy change \- higher elasticities indicate stronger behavioural responses, while lower ones suggest more limited adjustments. PolicyEngine currently incorporates three key behavioural responses in its analysis: income elasticity (work changes from overall income shifts), substitution elasticity (work changes from marginal reward shifts), and capital gains elasticity (investment timing responses to tax changes).

## Labour supply

PolicyEngine models how individuals respond to work incentives by changing their employment income using two standard elasticities- the income and substitution elasticities.

### The income elasticity

When people become richer, they might choose to work less. The income elasticity measures this behaviour \- how much work changes when total income changes. This matters for policies like broad tax changes or new benefits that affect how much money people have overall. Without considering this response, policy analysis might get work patterns wrong after income changes. Following the [Congressional Budget Office (CBO)](https://www.cbo.gov/sites/default/files/112th-congress-2011-2012/reports/43674-laborsupplyfiscalpolicy.pdf#page=4), PolicyEngine uses an income elasticity of \-0.05 for the UK as a default elasticity, meaning a 10% rise in income leads to a small 0.5% drop in work.

### The substitution elasticity

People work partly based on how much they keep from each extra hour of work. The substitution elasticity measures how work changes when this reward changes. For example, higher tax rates mean keeping less from each additional hour, which might lead to less overtime or part-time work. This response is key for analysing tax brackets or benefits that reduce earnings. Following the [Congressional Budget Office (CBO)](https://www.cbo.gov/sites/default/files/112th-congress-2011-2012/reports/43674-laborsupplyfiscalpolicy.pdf#page=4), PolicyEngine uses a substitution elasticity of 0.25 as a default elasticity, meaning people work about 2.5% less when they keep 10% less from each extra hour.

## Capital gains elasticity

When tax rates on investment gains change, people adjust when they sell their investments[^4]. Capital gains elasticity measures this effect. Unlike work hours, which are often fixed, people can usually choose when to sell investments. When capital gains tax rates go up, many wait to sell until rates are lower again. This response strongly affects how much money tax changes raise. PolicyEngine uses a capital gains elasticity of \-0.7 as a default elasticity, reflecting that investment timing is quite sensitive to tax rates.

## How PolicyEngine models behavioural responses

By default, PolicyEngine’s model assumes no behavioural responses. PolicyEngine's model adds behavioural responses to its tax-benefit calculations. For each simulated reform, the model first computes the effects of policy changes on income and tax rates. Then, it estimates three types of behavioural changes: how total income changes affect work, how marginal tax changes affect work hours, and how tax rates influence investment timing. By comparing scenarios with and without these behavioural responses, the model provides more accurate predictions of how policies affect people and government budgets.

## Comparing static and dynamic analysis

This section shows how incorporating behavioural responses affects policy analysis. By comparing estimates with and without behavioural responses, we illustrate the importance of accounting for how individuals and businesses adapt their economic decisions in response to policy changes.

To demonstrate this comparison, we examine two tax reforms proposed by the UK government in October 2024: changes to Capital Gains Tax and employer National Insurance contributions. For a detailed analysis of these and other reforms proposed in the Autumn Budget, see [PolicyEngine's reform impact analysis](https://policyengine.org/uk/research/autumn-budget-2024-policy-choices). 

In estimating the impacts of these reforms, we model how individuals with capital gains respond to changes in their marginal tax rate and how employers respond to changes in their tax liability by adjusting employee wages. The table below compares the five-year revenue impacts under both static and dynamic scenarios.

| Reform | Static revenue impact	 | Dynamic revenue impact	 | Relative change |
| :---- | :---- | :---- | :---- |
| Levy employer pension NICs | 90.3 | 66.6 | \-26% |
| Raise CGT to 24%	 | 21.5 | 10.1 | \-53% |

## Conclusion

In this report, we present how PolicyEngine models behavioural responses through income, substitution, and capital gains elasticities to capture how individuals adjust their economic decisions to policy changes. Using recent UK tax reforms as examples, we demonstrate how incorporating these behavioural responses changes government revenue compared to static analysis.

[^1]:  Chetty, R., Guren, A., Manoli, D., & Weber, A. (2011). Are Micro and Macro Labor Supply Elasticities Consistent? A Review of Evidence on the Intensive and Extensive Margins. American Economic Review, 101(3), 471–475.

[^2]:  Saez, E., Slemrod, J., & Giertz, S. H. (2012). The Elasticity of Taxable Income with Respect to Marginal Tax Rates: A Critical Review. Journal of Economic Literature, 50(1), 3-50.

[^3]:  Feldstein, M., Behavioural Responses to Taxation: Lessons from the Tax Reform Act of 1986, American Economic Review, 1995\.

[^4]:  Agersnap, Ole, and Owen Zidar (2021). "The Tax Elasticity of Capital Gains and Revenue-Maximizing Rates." American Economic Review: Insights, vol. 3, no. 4, pp. 399–416.
