_See the Autumn Statement 2023 on PolicyEngine [here](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=37636&region=uk&timePeriod=2024&baseline=1)._

Today, the Chancellor of the Exchequer Jeremy Hunt delivered the annual [Autumn Statement](https://assets.publishing.service.gov.uk/media/655d0a83544aea000dfb321d/Autumn_Statement_2023_Policy_Costings_-_Final.pdf), in which he announced several tax and benefit reforms, including two to National Insurance Contributions (NICs):

- Lowering the main rate of Class 1 (employee) NICs by 2p
- Lowering the main rate of Class 4 (self-employed) NICs by 1p
- Abolishing Class 2 NICs

In this post, we'll use PolicyEngine to estimate the budgetary, distributional and poverty impacts of these reforms.

_See how the combined reforms would affect your own household using our [personalised calculator](https://policyengine.org/uk/household?focus=intro&reform=37636&region=uk&timePeriod=2023&baseline=1)_

## Autumn Budget 2023 reforms

The Autumn Budget included reforms to National Insurance and benefit uprating, which we have modelled in our baseline and as a reform, respectively. It also includes other reforms absent from the PolicyEngine model, and notably omits previously speculated reforms.

### National Insurance

Chancellor Hunt announced three reforms to National Insurance:

- [Lowering Employee (Class 1) NICs by 2p](https://assets.publishing.service.gov.uk/media/655d0a83544aea000dfb321d/Autumn_Statement_2023_Policy_Costings_-_Final.pdf#page=9), from 12% to 10%, from 6 January 2024
- [Lowering Self-Employed (Class 4) NICs by 1p](https://assets.publishing.service.gov.uk/media/655d0a83544aea000dfb321d/Autumn_Statement_2023_Policy_Costings_-_Final.pdf#page=10), from 9% to 8%, from April 2024
- [Abolishing Class 2 NICs](https://assets.publishing.service.gov.uk/media/655d0a83544aea000dfb321d/Autumn_Statement_2023_Policy_Costings_-_Final.pdf#page=11), a £3.15 per week levy on self-employed people's profits above £12,570, from April 2024

This aligns in part with [The Times's report last night](https://www.thetimes.co.uk/article/national-living-wage-rise-jeremy-hunt-autumn-statement-j9f0pssxw) that Hunt would lower the main NIC rates (Class 1 and 4) by 1p; the report did not mention the Class 2 NICs.

In modelling these NIC reforms, we assume they all take effect on 1 January 2024, and evaluate their impact over calendar year 2024. In the future, we intend to model the true mid-year effective dates of policies like these.

### Benefit uprating

Hunt also announced uprating benefits by inflation. While the Times reported last night that he would do this, [Christians against Poverty](https://capuk.org/news-and-blog/what-will-be-in-the-autumn-statement) and [others](https://www.theguardian.com/society/2023/nov/15/jeremy-hunt-urged-not-to-use-sharp-fall-in-inflation-to-squeeze-benefits) had previously reported that they may rise by less. Historically, the government has often but not always uprated benefits with inflation.

Specifically, the State Pension will rise by 8.5%, the pace of earnings growth. State Pension is uprated by the triple lock, which guarantees that the payment level increases by the highest of inflation, average earnings growth, or 2.5%.

Non-State Pension benefits will rise by 6.7%, the inflation rate as measured by the difference in the Consumer Price Index (CPI) from September 2022 to September 2023.

In its [Autumn Statement 2023 Policy Costings document](https://assets.publishing.service.gov.uk/media/655d0a83544aea000dfb321d/Autumn_Statement_2023_Policy_Costings_-_Final.pdf#page=64), HM Treasury defines its _Default indexation assumed in the baseline_ as above. Since HM Treasury treats these announcements as following defaults rather than reforms, we follow suit and have only updated the baseline.

Compared to a counterfactual where benefits are not uprated at all, we estimate that this set of upratings will [cost £5.9 billion in 2024](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&timePeriod=2024&region=uk&reform=1&baseline=37721).

### Other reforms

Hunt also announced a number of other reforms not modelled in PolicyEngine, including a freeze on alcohol duty, additional business tax breaks, investment in AI and manufacturing, and a rise in the minimum wage.

He notably did _not_ announce reforms that outlets had previously reported he was considering, such as lowering the basic rate of Income Tax from 20p to 19p ([the Financial Times](https://www.ft.com/content/aafea716-30d5-4518-98fe-169f6995173e)) or cutting Stamp Duty and Inheritance tax ([The Times](https://www.thetimes.co.uk/article/autumn-statement-2023-predictions-jeremy-hunt-budget-tax-cuts-03sms6x82)).

## Household impacts of NIC cuts

For a [single person with only employment income](https://policyengine.org/uk/household?focus=householdOutput.earnings&reform=37636&region=uk&timePeriod=2023&baseline=1&household=32608), this reform produces a benefit if they earn at least £12,570. It would produce the maximum benefit of £377 if they earn at least £50,500.

![Figure 1: Impact of cutting 2p from NI rates on a single person](https://user-images.githubusercontent.com/6076111/285001945-5d30d660-75c5-4fcd-9651-9b2fccab300a.png)

These reforms lower marginal tax rates for individuals earning within that region by 2 percentage points.

![Figure 2: Impact of cutting 2p from NI rates on a single person's marginal tax rates](https://user-images.githubusercontent.com/6076111/285002391-620c0fa8-7a39-4bd5-a68f-c0afa987d029.png)

_See how the National Insurance cuts would affect your own household using our [personalised calculator](https://policyengine.org/uk/household?focus=intro&reform=37636&region=uk&timePeriod=2023&baseline=1)._

## Societal impact of NIC cuts

Applying the PolicyEngine microsimulation model, we can estimate the impact of these reforms on the UK's budget, distributional outcomes, and poverty. We assume the NIC reforms take effect on 1 January 2024, and evaluate their impact over calendar year 2024.

### Budgetary impacts

Our microsimulation model projects that this NI cut will [cost £10.5 billion](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=37636&region=uk&timePeriod=2024&baseline=1) in 2024.

Our estimates exceed those from HM Treasury by about 12%, disproportionately due to Class 4 NICs. This largely results from our static model, compared to HM Treasury's behavioural responses, which assume that earnings will rise in response to lower tax rates. However, unlike HM Treasury, we also model the impact on benefits, which lowers our cost estimate: as benefits are calculated on post-tax income, tax cuts reduce benefits payments.

| Reform                             | HM Treasury | PolicyEngine | Relative difference | PolicyEngine link                                                                                                           |
| ---------------------------------- | ----------- | ------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Lower Class 1 NICs from 12% to 10% | 8.72        | 9.69         | 11.2%               | [#28973](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=28973&region=uk&timePeriod=2024&baseline=1) |
| Lower Class 4 NICs from 9% to 8%   | 0.35        | 0.44         | 26.9%               | [#37642](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=37642&region=uk&timePeriod=2024&baseline=1) |
| Abolish Class 2 NICs               | 0.38        | 0.41         | 8.8%                | [#37665](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=37665&region=uk&timePeriod=2024&baseline=1) |
| Total                              | 9.44        | 10.54        | 11.7%               | [#37636](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=37636&region=uk&timePeriod=2024&baseline=1) |

### Distributional impacts

Households in the bottom income decile would [gain an average of £12](https://policyengine.org/uk/policy?focus=policyOutput.decileAverageImpact&reform=37636&region=uk&timePeriod=2024&baseline=1), while those in the top decile would gain an average of £1,067.

![Figure 3: Relative impact by income decile of Autumn Budget NI reforms](https://user-images.githubusercontent.com/6076111/284982468-181d24ac-ff5c-498b-95eb-35a1311af7bb.png)

As a result of the reform, [66% of the population](https://policyengine.org/uk/policy?focus=policyOutput.intraDecileImpact&reform=37636&region=uk&timePeriod=2024&baseline=1) would see their household net income rise, disproportionately those in higher-income households: around 90% of the top three deciles benefit, compared to around 25% of the bottom three.

![Figure 4: Percentage of individuals gaining from Autumn Budget NI reforms, by income decile](https://user-images.githubusercontent.com/6076111/284982567-35937f5f-a82a-44e0-8a11-fb651413519b.png)

The reform has a [small, ambiguous effect on income inequality](https://policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=37636&region=uk&timePeriod=2024&baseline=1): while the Gini index rises by 0.4%, the top 1% share of income falls by 0.4%. It [does not affect cliffs](https://policyengine.org/uk/policy?focus=policyOutput.cliffImpact&reform=37636&region=uk&timePeriod=2024&baseline=1). Absolute, before-housing-costs [poverty falls by 0.5%](https://policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=37636&region=uk&timePeriod=2024&baseline=1), or around 60,000 individuals.

## Conclusion

In summary, PolicyEngine estimates the Autumn Budget 2023's National Insurance reforms will cost £10.5 billion in 2024, and will benefit two in three Britons, disproportionately those in higher-income households. We project a small, ambiguous effect on income inequality, and a 0.5% poverty reduction. We invite readers to use our [personalised calculator](https://policyengine.org/uk/household?focus=intro&reform=37636&region=uk&timePeriod=2023&baseline=1) to estimate the impact on their own household, and to follow our work for more analyses of current tax and benefit policies.
