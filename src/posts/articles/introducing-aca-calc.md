The enhanced Affordable Care Act premium tax credits are set to expire at the end of 2025. We're launching [**ACA-Calc**](../aca-calc) — an interactive calculator that estimates premium tax credits for individual households.

[**_Calculate your household's premium tax credits here._**](../aca-calc)

## What the tool does

ACA-Calc allows users to estimate Affordable Care Act premium tax credits for any household configuration. The tool calculates subsidies under the enhanced schedule (the subsidies enacted through the American Rescue Plan Act and extended through 2025) and the original schedule (the subsidy levels that would apply if enhancements expire). The tool shows side-by-side comparisons of how the two policy scenarios affect household premiums and subsidy eligibility.

## Example

Consider a married couple in West Virginia, ages 60 and 64, with no dependents and an annual household income of $63,450.

Their base Second Lowest Cost Silver Plan is $49,687 per year ($4,141 per month).

Under the enhanced schedule (2026 with IRA), they would receive $45,880 in annual premium tax credits. Under the original schedule (2026 after expiration), they would receive $43,659 in annual premium tax credits.

When the IRA enhancements expire, their premium tax credits would decrease by $2,221 per year ($185 per month).

**Healthcare Assistance by Household Income showing premium tax credits with and without IRA enhancements**

![](/images/posts/aca-calc-chart.png)

## Key features

The calculator accepts detailed household information including location (state and county for accurate benchmark premium data), household Modified Adjusted Gross Income, family composition (number and ages of household members), and filing status (single or married).

Users can compare outcomes across two scenarios: the enhanced schedule (current law through 2025) and the original schedule (pre-2021 baseline if enhancements expire).

For each scenario, the tool displays the annual premium tax credit (total subsidy amount), monthly premium tax credit (subsidy divided across 12 months), premium percentage cap (maximum premium as percentage of income), benchmark premium (second-lowest-cost Silver plan in your area), and required contribution (amount paid toward premiums).

The tool provides instant recalculation as you adjust household income levels, number of household members, ages of family members, and geographic location. ACA-Calc includes benchmark premium data for all counties across the United States.

## How it works

The calculator implements the ACA premium tax credit formula using PolicyEngine's validated rules engine. First, it determines household size and income relative to the Federal Poverty Line. Next, it looks up the benchmark premium (second-lowest-cost Silver plan) for your county. The calculator then calculates the applicable percentage from the premium cap schedule and computes your required contribution as that percentage of income. Finally, it subtracts your contribution from the benchmark premium to determine the credit amount.

The tool applies the same calculation methods used in PolicyEngine's full microsimulation model, which has been validated against official sources including Internal Revenue Service data.

## Policy context

The enhanced premium tax credits are set to expire at the end of 2025. The Congressional Budget Office estimates that if the enhancements expire, marketplace enrollment would decrease by approximately 3.4 million people.

For households purchasing coverage through ACA marketplaces, the difference between the enhanced and original subsidy schedules affects annual subsidy amounts, premium contribution requirements as a percentage of income, and subsidy eligibility thresholds.

## Get started

ACA-Calc is available at [**policyengine.org/us/aca-calc**](../aca-calc). To use the calculator, enter your household's basic information (state, county, income, size), review your premium tax credit under each schedule, compare the enhanced versus original subsidy amounts, and adjust household parameters to see how credits change.
