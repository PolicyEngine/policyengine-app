The Times [reports](https://www.thetimes.com/uk/politics/article/rachel-reeves-to-increase-national-insurance-employers-nhs-cfr73kh2g) that the UK government has scrapped [previously](https://www.bbc.co.uk/news/articles/cly4leklk3qo)\-[reported](https://www.reuters.com/world/uk/uk-employers-sound-alarm-over-possible-social-security-hike-2024-10-15/) plans to levy NICs on employers' contributions to workers’ pensions. This report examines the potential impacts using PolicyEngine's microsimulation model, considering the effect on income tax and benefits if employers respond by reducing wages. We find that it would have raised about £18 billion per year if employers pass on the full cost to prices, or £10 billion if they pass it on entirely to workers immediately.

# The proposal

According to the BBC and others, the Chancellor considered removing the current exemption for employer pension contributions from employer NICs. Currently, employers are liable for NICs on employee compensation, but not on employer contributions to pension schemes. HMRC estimates that this relief [cost](https://www.gov.uk/government/statistics/main-tax-expenditures-and-structural-reliefs) £15.4bn in FY 2022-23.

# Economic impact

We modelled two scenarios bookmarking the range of potential impacts:

1\. Static assumption: no changes occur in employment incomes. Employers pay the additional NICs they are liable for. We assume that the increased employer NIC costs are passed on to prices uniformly.  
2\. Fixed employer cost assumption: employers immediately keep total employment costs fixed by reducing wages such that the new wage plus employer NICs liability is equal to the prior total. There is no extra employer cost to distribute.

## Household example

To illustrate the second approach, the table below shows the calculated impacts of the reform on a worker with a £40,000 annual salary and £4,000 in employer pension contributions.

| Variable                             | Current law | No wage change | Fixed employer cost | No wage change \- current law | Fixed employer cost \- current law |
| :----------------------------------- | :---------- | :------------- | :------------------ | :---------------------------- | :--------------------------------- |
| Wages                                | £40,000     | £40,000        | £39,515             | £0                            | \-£485                             |
| Employer pension contribution        | £4,000      | £4,000         | £4,000              | £0                            | £0                                 |
| Employer NI on wages                 | £4,245      | £4,245         | £4,178              | £0                            | \-£67                              |
| Employer NI on pension contributions | £0          | £552           | £552                | £552                          | £552                               |
| Employer cost                        | £48,245     | £48,797        | £48,245             | £552                          | £0                                 |
| Employee tax                         | £7,839      | £7,839         | £7,703              | £0                            | \-£136                             |
| Total taxes                          | £12,084     | £12,636        | £12,433             | £552                          | £349                               |

Under the ‘no wage change’ assumption, the government receives an extra £552 from the employer. We allocate this tax burden to individuals according to consumption, under the assumption that firms pass on employer NICs in higher prices.

Under the ‘fixed employment cost’ assumption, the government receives £552 from the employer, who has paid for it by reducing the worker’s wages £485 and therefore reducing the rest of their employer NI liability by £67. And additionally, the employee now pays £136 less in Income Tax and employee National Insurance because of their lower salary. Overall, the government now nets out £349 from these changes, which is 37% lower than if the employer had passed on the costs by (successfully) raising prices.

## Economy

We apply this logic to all of the roughly 100,000 households in our representative microdata, aggregating the changes in tax liabilities and benefit entitlements. Under the static model, we estimate that revenues rise by around £18 billion per year, raising £90 billion over five years.

| Year        | Revenue impact (employer NICs) | Revenue impact (other) | Revenue impact                                                                                                                  | Wages |
| :---------- | :----------------------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :---- |
| 2025        | 17.2                           | 0                      | [17.2](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69356&region=uk&timePeriod=2025&baseline=1) | 0     |
| 2026        | 17.7                           | 0                      | [17.7](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69356&region=uk&timePeriod=2026&baseline=1) | 0     |
| 2027        | 18.1                           | 0                      | [18.1](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69356&region=uk&timePeriod=2027&baseline=1) | 0     |
| 2028        | 18.4                           | 0                      | [18.4](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69356&region=uk&timePeriod=2028&baseline=1) | 0     |
| 2029        | 18.9                           | 0                      | [18.9](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69356&region=uk&timePeriod=2029&baseline=1) | 0     |
| **2025-29** | **90.3**                       | **0**                  | **90.3**                                                                                                                        | **0** |

If employers pass on NICs in the form of reduced wages, we estimate that employer NIC revenues rise by around £15 billion per year, but are offset by on average £5 billion per year in personal tax liabilities and benefit entitlements as a result of the (average) £15 billion in wage reductions.

Overall, this raises £9.6 billion in 2025, totalling £50 billion over five years.

| Year        | Revenue impact (Employer NICs) | Revenue impact (other) | Revenue impact                                                                                                                  | Wages      |
| :---------- | :----------------------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------- |
| 2025        | 15.1                           | \-5.5                  | [9.6](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69355&region=uk&timePeriod=2025&baseline=1)  | \-15.2     |
| 2026        | 15.6                           | \-5.8                  | [9.8](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69355&region=uk&timePeriod=2026&baseline=1)  | \-15.7     |
| 2027        | 15.9                           | \-6.0                  | [9.9](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69355&region=uk&timePeriod=2027&baseline=1)  | \-16.0     |
| 2028        | 16.2                           | \-6.1                  | [10.1](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69355&region=uk&timePeriod=2028&baseline=1) | \-16.3     |
| 2029        | 16.6                           | \-6.3                  | [10.3](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69355&region=uk&timePeriod=2029&baseline=1) | \-16.7     |
| **2025-29** | **79.4**                       | **\-29.7**             | **49.7**                                                                                                                        | **\-79.9** |

## Employee pass-through sensitivity

Our assumption that employers pass on some fraction of the increased payroll costs is based upon [economic](https://www.cbo.gov/system/files/2021-06/57089-Payroll-Taxes.pdf) [research](https://www.sciencedirect.com/science/article/pii/S0047272718300926) suggesting that employers often pass on the cost of increased payroll taxes to employees through lower wages or reduced hiring. Our model can vary this assumption: for example, we could assume that employers reduce wages by 50% of the distance to the fixed-cost wage, or any other fraction. The chart below shows the resultant budgetary impacts in FY 2025 under five simulated employee incidence shares: 0%, 25%, 50%, 75% and 100%. As expected, this effect is effectively linear. Revenue impacts decrease as employee incidence increases, because lower incomes push up costs by increasing benefit spending and decreasing tax liabilities.

![](/images/posts/autumn-budget-2024-employer-nic-pension-contributions/revenue-impact-of-increasing-employer-ni-by-employee-incidence.png)

# Conclusion

The potential change to levy employer NICs on pension contributions could increase government revenue, but the actual impact depends on how employers respond. If employers absorb the cost or pass it on to prices, the revenue gain could be as high as £18 billion per year. However, if employers respond by reducing wages, the net revenue gain could fall 45% to around £10 billion per year, due to offsetting effects on personal taxes and benefits.
