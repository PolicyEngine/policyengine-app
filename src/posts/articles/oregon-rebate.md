_Disclaimer: The Gerald Huff Fund for Humanity has provided financial support to both PolicyEngine and the Oregon Rebate campaign._

This November, Oregon voters will vote on [Measure 118](<https://ballotpedia.org/Oregon_Measure_118,_Corporate_Tax_Revenue_Rebate_for_Residents_Initiative_(2024)>), the Corporate Tax Revenue Rebate for Residents Initiative. According to Ballotpedia, the ballot measure, broadly known as the _Oregon Rebate_, would operate by "increasing the corporate minimum tax on sales exceeding $25 million by 3%, removing the minimum tax cap, and distributing increased revenue to Oregon residents who spend more than 200 days in the state."

If it passes, the measure would provide its first payments in early 2026, structured as either a refundable tax credit for the 2025 tax year, or as a payment for nonfilers. Oregon's Legislative Revenue Office projected that these first payments would amount to $1,160 for each person (regardless of age), followed by $1,605 in 2027 and $1,686 in 2028\.

Using the PolicyEngine microsimulation model, we have projected the impact of this bill on poverty in each year, under four scenarios spanning the federal taxability of the payments and the incidence of the tax. Overall we find that the policy would reduce poverty by between 20% and 36% overall depending on the scenario and year, with larger effects for children and in later years. We do not model behavioral or macroeconomic effects of the policy, either resulting from the payments or from the tax.

# Analysis

Should the Oregon Rebate pass, the first payments, estimated at $1,160, will arrive in early 2026\. Since tax filers will receive them as a refundable credit, the Census Bureau would count them toward 2025 net resources when determining the Supplemental Poverty Measure. If the payments had no other effects on income or the economy, and if the federal government did not tax them, PolicyEngine estimates that it would reduce Oregon's poverty rate 24%, from 10.0% to 7.6%. Child poverty would fall 33%, from 8.5% to 5.7%, while adult poverty would fall 22.4%.

Three other factors could affect these results:

1. The payments could affect households' taxes or benefits.
2. Households could bear some or all of the tax that funds the payments.
3. The taxes and/or payments could affect the broader economy.

We modeled the first two of these factors.

## Federal taxability

Regarding taxes or benefits, the Oregon Rebate's similarity to the Alaska Permanent Fund Dividend suggests parallels. In 1982, Alaska established a universal annual payment that has [ranged](https://pfd.alaska.gov/Division-Info/summary-of-dividend-applications-payments) from $331 to $3,284 per person. In neither case is state income tax an issue: Alaska has none, and the Oregon ballot measure exempts it. And in neither case are benefit programs directly affected: both states reserve a "hold harmless fund" for households whose benefits (e.g., the [Supplemental Nutrition Assistance Program](https://alaskalawhelp.org/resource/snapfood-stamps)) fall as a result of the payment counting as income for means tests.

However, the IRS has required Alaskans to enter the permanent fund dividends on their federal tax returns. In recent years, Alaska has bundled a non-taxable "one-time energy relief payment" with the taxable dividend payments; for example, the 2024 payment combines a $1,312 dividend with $390 in energy relief. Depending on the IRS's view of the Oregon Rebate structure, the payments may or may not be federally taxable.

Most households near the poverty line face low tax rates. As a result, PolicyEngine does not project that the taxability will affect the poverty impact in 2025, though it reduces the poverty impact by 5% in 2026 and 2027\.

## Tax burden

The Oregon Rebate is funded by a gross receipts tax on corporations with over $25 million in Oregon sales. Such a tax could affect Oregonians through various mechanisms including higher prices, lower wages, lower employment, and lower investment income.

While PolicyEngine does not currently model the burden of corporate taxes like these, we approximated it as a flat tax on adjusted gross income, calibrated to match the expenditure on the rebate. To fund the rebates, we projected Oregon would need to levy flat taxes of 1.98% in 2025, 2.53% in 2026, and 2.55% in 2027\.

Adding such a flat tax to the simulation reduces the Oregon Rebate's poverty impact by about 10% across years.

## Macroeconomic effects

Using its [Oregon Tax Incidence Model](https://www.oregonlegislature.gov/lro/Documents/rr2-01otim_finalreport.pdf), a computable general equilibrium model of the Oregon economy, the Oregon Legislative Revenue Office [estimated](https://www.oregonlegislature.gov/lro/Documents/IP%2017%20Report.pdf) that the Oregon Rebate would contract the economy and increase prices by 2030\. Compared to current law, they projected personal income to fall 0.71%, population to fall 0.05%, employment to fall 0.99%, wages to fall 0.05%, and prices to rise 1.3%.

PolicyEngine does not currently consider macroeconomic effects such as these in its modeling.

## Results

[The following dashboard](https://oregon-rebate.streamlit.app) summarizes the Oregon Rebate's poverty impact by age group and year, across a two-by-two of scenarios around federal taxability and whether the tax burden is allocated to households as a flat income tax. The results are "static" and do not account for potential macroeconomic effects.

<div
  style={{
    display: "flex",
    justifyContent: "center",
  }}
>
  <iframe
    src="https://oregon-rebate.streamlit.app?embedded=true"
    title="Oregon Rebate Impact on Poverty"
    height="1040"
    width="1000"
    style={{ overflow: "hidden" }}
  />
</div>

You can view these impacts in the PolicyEngine app, which also calculates outcomes like inequality, at the links in this table:

| Federally taxable | Flat tax funded | 2025                                                                                                                                        | 2026                                                                                                                                        | 2027                                                                                                                                        |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| No                | No              | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=64228&region=or&timePeriod=2025&baseline=2)             | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=64228&region=or&timePeriod=2026&baseline=2)             | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=64228&region=or&timePeriod=2027&baseline=2)             |
| No                | Yes             | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=66621&region=or&timePeriod=2025&baseline=2)             | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=66621&region=or&timePeriod=2026&baseline=2)             | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=66621&region=or&timePeriod=2027&baseline=2)             |
| Yes               | No              | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=64682&region=or&timePeriod=2025&baseline=2)             | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=64682&region=or&timePeriod=2026&baseline=2)             | [Link](https://policyengine.org/us/policy?focus=policyOutput.policyBreakdown&reform=64682&region=or&timePeriod=2027&baseline=2)             |
| Yes               | Yes             | [Link](https://policyengine.org/us/policy?focus=gov.contrib.ubi_center.flat_tax.rate.agi&reform=66617&region=or&timePeriod=2025&baseline=2) | [Link](https://policyengine.org/us/policy?focus=gov.contrib.ubi_center.flat_tax.rate.agi&reform=66617&region=or&timePeriod=2026&baseline=2) | [Link](https://policyengine.org/us/policy?focus=gov.contrib.ubi_center.flat_tax.rate.agi&reform=66617&region=or&timePeriod=2027&baseline=2) |

# Methodology

We produced this analysis with the PolicyEngine US microsimulation model v1.103.0. PolicyEngine's state-level microsimulation model applies the most recent three years of the Current Population Survey March Supplement—2021 to 2023—the same data used by the Census Bureau to estimate the Supplemental Poverty Measure by state. Across the three years, this data included 2,619 households in Oregon.

PolicyEngine then "ages" various characteristics of the microdata based on projections from government agencies like the Congressional Budget Office. For example, we age wages and salaries according to projected earnings growth, and poverty thresholds by projected inflation.

Finally, we estimate taxes and benefits based on the PolicyEngine model of federal and state tax and benefit rules. This model includes federal and state income taxes, including future-dated changes such as the expiration of the Tax Cuts and Jobs Act in 2026, as well as benefit programs like the Supplemental Nutrition Assistance Program and Supplemental Security Income. Here we apply state-specific rules and index policy parameters based on projected index changes (generally inflation). We also model the take-up rate of benefits like SNAP and SSI.

While the Census Bureau relies on the CPS for poverty reporting, and various organizations use it for poverty analysis, the CPS has limitations that affect this analysis. For example, high incomes are "top-coded" (truncated), benefits and some income sources are under-reported, and the distribution of income diverges from administrative sources. PolicyEngine [addresses these shortcomings](https://policyengine.org/us/research/enhanced-cps-beta) in national analyses by integrating tax records and calibrating to hundreds of statistics, but has not yet done so for state-level estimates. Correcting the data may change the baseline poverty rates and other distributional measures that may affect the projected impact of the Oregon Rebate on poverty.

_The Oregon Rebate campaign previously cited earlier estimates from the PolicyEngine web app. We have since updated our model, incorporating new Census data released in September 2024, adding two more years of data, imputing rent and property tax data from the American Community Survey for the SNAP excess shelter deduction, and assigning SNAP take-up rates._
