Public policies change incentives and behaviours. When governments introduce or modify policies, individuals respond by adjusting their decisions. Workers may change their work hours,[^1] investors might shift when they realise gains,[^2] and businesses often adapt their practices in response.[^3] The static analysis fails to capture how individuals adjust their economic decisions when facing new incentives.  
This report presents how PolicyEngine currently models three key behavioural responses to policy changes :

1. Income effects on labour supply
2. Substitution effects on labour supply
3. Capital gains tax responses

To model these responses, we apply _elasticities,_ which quantify the magnitude of the response: larger elasticities indicate stronger behavioural responses, while smaller ones suggest more limited adjustments. PolicyEngine empowers users to set their own elasticities, while we apply our best guesses in our reports. This review describes these responses and our selected elasticities.

## Labour supply

PolicyEngine models how individuals adjust their earnings through income and substitution effects. For example, one might work less if they have more income (they purchase leisure with income effects), or if they take home less for an additional hour of work (they substitute leisure over consumption at the margin).

### The income elasticity

When people become richer, they might choose to work less. The income elasticity measures this behaviour \- how much work changes when net income changes after taxes and transfers.

By default, PolicyEngine applies the [Congressional Budget Office (CBO)](https://www.cbo.gov/sites/default/files/112th-congress-2011-2012/reports/43674-laborsupplyfiscalpolicy.pdf#page=4)’s central estimate of a **\-0.05** income elasticity, meaning a 10% rise in net income leads to a 0.5% drop in work. The [Office of Budget Responsibility](https://obr.uk/docs/dlm_uploads/NICS-Cut-Impact-on-Labour-Supply-Note.pdf#page=7) also applies a \-0.05 income elasticity for single mothers and men who are not single fathers, while applying elasticities between \-0.037 and \-0.185 for married or cohabitating women and lone parents, depending on the age of the youngest child.

### The substitution elasticity

People work partly based on how much they keep from each extra hour of work. The substitution elasticity measures how work changes when this reward changes. For example, higher tax rates or steeper benefit phase-outs mean keeping less from each additional hour, which might lead to less overtime or part-time work. By default, PolicyEngine applies the [Congressional Budget Office (CBO)](https://www.cbo.gov/sites/default/files/112th-congress-2011-2012/reports/43674-laborsupplyfiscalpolicy.pdf#page=4)’s central elasticity averaged over primary earners, which is **0.25**, meaning people work 2.5% less when they keep 10% less from each extra hour after taxes and transfers.  
Unlike the [OBR](https://obr.uk/docs/dlm_uploads/NICS-Cut-Impact-on-Labour-Supply-Note.pdf), which separately models extensive margins (participation) and intensive margins (hours worked), PolicyEngine follows CBO in using single elasticities that combine both responses. The OBR's intensive margin elasticities vary by demographic group, ranging from 0.094 to 0.439. PolicyEngine plans to add separate extensive margin responses in future versions, which will require estimating potential wages for individuals currently out of the labour force.

### An illustrative example

To understand how these elasticities work, consider a worker earning £30,000 per year. This worker currently faces a marginal tax rate of [28%](https://policyengine.org/uk/household?focus=householdOutput.netIncome&household=49381) (combining income tax and National Insurance) and takes home [£24,961](https://policyengine.org/uk/household?focus=householdOutput.netIncome&household=49381) after taxes and transfers. At the current tax rates, this worker's net-of-tax wage rate is 72% of her gross wage. Now imagine a new policy that increases basic income tax by 1p (from 20% to 21%). In this case, PolicyEngine calculates that this new policy decreases her net income by [£175](https://policyengine.org/uk/household?focus=householdOutput.netIncome&reform=53461&region=uk&timePeriod=2025&baseline=1&household=49381).

For this worker earning £14.42 per hour (£30,000/2,080 hours), the take-home pay per extra hour drops from £10.38 to £10.21 under the new policy – a 1.6% decrease. Using PolicyEngine's central estimates, we calculate two effects:

1. Substitution effect: Workers reduce hours by 0.25% for each 1% decrease in wages. A 1.6% wage decrease leads to a 0.4% reduction in hours (1.6% × 0.25).
2. Income effect: Workers increase hours by 0.05% for each 1% drop in income. The £175 decrease represents a 0.7% drop in take-home pay (£175/£24,961), leading to a 0.035% increase in hours (0.7% × \-0.05).

The net effect combines these responses: 0.4% decrease minus 0.035% increase equals a 0.365% decrease. Given the baseline of £30,000 earnings and 2,080 hours, this translates to a predicted 7 fewer work hours and £109 less earnings per year.

## Capital gains elasticity

When tax rates on investment gains change, people adjust when they sell their investments,[^4] how much they invest, and how they structure their investments. The capital gains elasticity measures this effect. While conceptually similar to the substitution effect for labour supply (measured with respect to the net-of-tax marginal wage), economists generally represent the capital gains elasticity as the percent change in capital gains with respect to a 1p change in the capital gains tax rate. It therefore has the opposite sign of substitution elasticity.

We have not identified any UK-specific studies on capital gains elasticities, so PolicyEngine relies on US research evidence. US studies distinguish between permanent elasticities (long-term responses to sustained tax changes) and transitory elasticities (temporary responses as people time their sales around tax changes). Dowd and McClelland (2019)[^5] found an overall elasticity of \-0.79 examining US federal and state tax returns from 1999-2008. Earlier work by Auten and Clotfelter (1982)[^6] found a permanent elasticity of \-0.37 and a higher transitory elasticity of \-1.05.  
PolicyEngine uses an elasticity of **\-0.7** as a default amount for the UK context, reflecting our belief that UK capital gains respond less to policy change than US capital gains do. Several factors drive this difference: the US has more tax-advantaged investment vehicles, more generous real estate tax treatment,[^7] a more active trading culture,[^8][^9] and the ability to relocate investments across state tax jurisdictions to minimise combined state and federal liabilities.[^10] The UK's unified tax system and fewer tax-advantaged accounts suggest a smaller response to tax changes. Users can adjust this default elasticity in their analysis.

## How PolicyEngine models behavioural responses

By default, the PolicyEngine web app assumes no behavioural responses. When users specify nonzero elasticities, it adds behavioural responses to its tax-benefit calculations. For each simulated reform, the model first computes the effects of policy changes on income and tax rates. Then, it estimates three behavioural changes: how total income changes affect work, how marginal tax changes affect work hours, and how tax rates influence investment timing. Because each person’s earnings can affect household net income differently, we calculate marginal tax rates with respect to each of the top three earners, and apply each of their labour supply responses, separately. Finally, we recalculate taxes and benefits following the earnings and capital gains change.

## Comparing static and dynamic analysis

Here we demonstrate how incorporating behavioural responses affects policy analysis by examining a tax reform proposed by the UK government in October 2024: change to Capital Gains Tax. For a detailed analysis of this and other reforms proposed in the Autumn Budget, see [PolicyEngine's reform impact analysis](https://policyengine.org/uk/research/autumn-budget-2024-policy-choices).

In estimating the impacts of this reform, we model how individuals with capital gains respond to changes in their marginal tax rate. The table below compares the five-year revenue impacts under both static and dynamic scenarios.

| Reform                                          | Static revenue impact | Dynamic revenue impact | Relative change |
| :---------------------------------------------- | :-------------------- | :--------------------- | :-------------- |
| Basic rate to 18% Higher/additional rate to 24% | 21.5                  | 10.1                   | \-53%           |

## Conclusion

In this report, we present how PolicyEngine models three behavioural responses:

1. **Income effect for labour supply: \-0.05 elasticity** (a 10% increase to net income reduces work hours by 0.5%)
2. **Substitution effect for labour supply: 0.25 elasticity** (a 10% increase to the net marginal wage increases work hours by 2.5%)
3. **Capital gains response: \-0.7 elasticity** (a 10% increase in the marginal tax rate with respect to capital gains reduces capital gains by 7%)

While this report focuses on these three core elasticities, PolicyEngine is expanding its behavioural modelling capabilities. For instance, we developed responses to [employer National Insurance contributions](https://policyengine.org/uk/research/autumn-budget-24-employer-ni), indicating the extent to which employers pass on the burden to lower wages. Using the CGT reform as an example demonstrates the importance of these behavioural responses. PolicyEngine's flexibility allows users to adjust behavioural response assumptions such as labour elasticities and capital gains elasticity to analyse the impact of public policies.

[^1]: Chetty, R., Guren, A., Manoli, D., & Weber, A. (2011). Are Micro and Macro Labor Supply Elasticities Consistent? A Review of Evidence on the Intensive and Extensive Margins. American Economic Review, 101(3), 471–475.

[^2]: Saez, E., Slemrod, J., & Giertz, S. H. (2012). The Elasticity of Taxable Income with Respect to Marginal Tax Rates: A Critical Review. Journal of Economic Literature, 50(1), 3-50.

[^3]: Feldstein, M., Behavioural Responses to Taxation: Lessons from the Tax Reform Act of 1986, American Economic Review, 1995\.

[^4]: Burman, Leonard E., and William C. Randolph. "Measuring permanent responses to capital-gains tax changes in panel data." The American Economic Review (1994): 794-809.

[^5]: Dowd, Tim, and Robert McClelland. 2019\. "The Bunching of Capital Gains Realizations." National Tax Journal 72(2): 323-358.

[^6]: Auten, Gerald, and Charles Clotfelter. 1982\. "Permanent versus Transitory Tax Effects and the Realization of Capital Gains." Quarterly Journal of Economics 97(4): 613-632.

[^7]: U.S. Congress, House Committee on Financial Services, _The Future of Housing in America: A Comparison of the United Kingdom and United States Models of Affordable Housing_, hearing, 114th Congress, 2nd session, May 12, 2016\.

[^8]: Odean, T. (1999). Do investors trade too much? _American Economic Review_, 89(5), 1279-1298.

[^9]: Financial Expert. (n.d.). [A summary of the differences between UK and US investors](https://www.financial-expert.co.uk/differences-between-uk-and-us-investors/).

[^10]: [Tax Policy Center (2023)](https://taxpolicycenter.org/briefing-book/how-do-us-taxes-compare-internationally)
