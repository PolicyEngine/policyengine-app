New UK Prime Minister Liz Truss last week announced that the [energy bill price cap will remain at £2,500](https://helpforhouseholds.campaign.gov.uk/help-with-your-bills/) for the typical household until 2024, rather than rising as planned. The government will compensate energy companies for the difference.

[PolicyEngine now models this reform](https://policyengine.org/uk/population-impact/treasury/energy-price-guarantee) as a household transfer, as well as any customisable price cap change by quarter. We estimate that Truss’s plan will cost £50 billion over the next year and cut poverty 20%. Higher income households benefit less on a percentage basis and more on an absolute pound basis, and the policy disproportionately reduces senior poverty.

This blog post explains our methodology and dives deeper into the results. For an analysis of the policy itself, see [our article published by UK in a Changing Europe](https://ukandeu.ac.uk/energy-subsidy/).

## How PolicyEngine models the energy price cap

PolicyEngine models price cap reforms as a transfer equal to the reduction in energy expenditures against the baseline, holding consumption constant.

As an example, consider what Ofgem calls the “typical household” — one with 12,000 kWh in annual consumption. Before today’s announcement, [Cornwall Insights forecasted](https://www.cornwall-insight.com/cornwall-insight-release-final-predictions-for-octobers-price-cap/) that they would have faced an energy price cap rising to an average of about £4,600 over the next year. The £2,500 cap therefore amounts to a £2,100 annual transfer.

Households vary in their energy consumption, and PolicyEngine models this heterogeneity by fusing the Living Costs and Food Survey to our enhanced Family Resources Survey, using our [synthimpute](https://github.com/policyengine/synthimpute) machine learning software. For each household in our dataset, we estimate the annual energy consumption, and accordingly, their expenditure under the pre- and post-Truss energy cap schedules. The program’s cost equals the total difference between these figures.

Like all PolicyEngine results, the price cap assumes no behavioural responses; that is, we assume households’ lower energy prices do not affect energy usage.

## Impacts of Liz Truss’s energy bill price cap

PolicyEngine now allows users to change the energy bill price caps in each of the coming four quarters. We’ve now set each of these to £2,500, per the policy reform. [Setting the baseline values back to their projections estimates Liz Truss’s cap](https://policyengine.org/uk/policy/treasury/energy-price-guarantee).

The distributional impact is progressive in relative terms: lower deciles see a higher percent increase to net income than higher deciles, from 14% to 2%. At the same time, the nominal increases are larger for higher-income households (from £1,400 to £2,400). This is largely due to the fact that energy consumption makes up a larger percentage of low-income budgets than it does for high-income households.

![*Change to net income by income decile under the price cap subsidy.*](https://cdn-images-1.medium.com/max/2156/0*zd856MutdKoSspHu)Change to net income by income decile under the price cap subsidy.

Poverty also falls by 20%, compared to the counterfactual scenario with no action taken. The impact is strongest among seniors, who see a 35% reduction in the poverty rate. Deep poverty, the share of people living at under half the poverty line, falls by 28%.

![*Change to poverty rates by age group under the EPG.*](https://cdn-images-1.medium.com/max/2194/0*WQK8LyHm6Ge52UiX)Change to poverty rates by age group under the EPG.

Multiple measures of inequality also fall. The Gini index of income inequality falls 3%, and the top-ten and top-one percent shares of income fall by 2% and 3%, respectively.

The reforms are based on energy usage, not income, so they avoid changing marginal tax rates.

To compare against other levels at which to fix the price cap, [see the reform on PolicyEngine](https://policyengine.org/uk/policy/treasury/energy-price-guarantee).
