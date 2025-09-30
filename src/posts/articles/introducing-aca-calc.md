The enhanced Affordable Care Act premium tax credits are set to expire at the end of 2025. We're launching [**ACA-Calc**](https://policyengine.org/us/aca-calc) — an interactive calculator that estimates premium tax credits for individual households under different policy scenarios.

[**_Calculate your household's premium tax credits here._**](https://policyengine.org/us/aca-calc)

## What the tool does

ACA-Calc allows users to estimate Affordable Care Act premium tax credits for any household configuration. The tool calculates subsidies under:

- **Enhanced schedule**: The subsidies enacted through the American Rescue Plan Act and extended through 2025

- **Original schedule**: The subsidy levels that would apply if enhancements expire

The tool shows side-by-side comparisons of how the two policy scenarios affect household premiums and subsidy eligibility.

## Example

Consider a married couple in West Virginia, ages 60 and 64, with no dependents and an annual household income of $63,450.

Their base Second Lowest Cost Silver Plan is $49,687 per year ($4,141 per month).

Under the enhanced schedule (2026 with IRA), they would receive $45,880 in annual premium tax credits. Under the original schedule (2026 after expiration), they would receive $43,659 in annual premium tax credits.

When the IRA enhancements expire, their premium tax credits would decrease by $2,221 per year ($185 per month).

![](https://raw.githubusercontent.com/PolicyEngine/policyengine-app/master/src/images/posts/aca-calc-chart.png)

_Healthcare Assistance by Household Income showing premium tax credits with and without IRA enhancements_

## Key features

### Comprehensive household inputs

The calculator accepts detailed household information:

- **Location**: State and county (for accurate benchmark premium data)

- **Income**: Household Modified Adjusted Gross Income

- **Family composition**: Number and ages of household members

- **Filing status**: Single, married filing jointly, or head of household

### Multiple policy comparisons

Users can compare outcomes across two scenarios:

- **Enhanced schedule**: Current law through 2025

- **Original schedule**: Pre-2021 baseline if enhancements expire

### Detailed results

For each scenario, the tool displays:

- **Annual premium tax credit**: Total subsidy amount

- **Monthly premium tax credit**: Subsidy divided across 12 months

- **Premium percentage cap**: Maximum premium as percentage of income

- **Benchmark premium**: Second-lowest-cost Silver plan in your area

- **Required contribution**: Amount paid toward premiums

### Interactive analysis

The tool provides instant recalculation as you adjust:

- Household income levels

- Number of household members

- Ages of family members

- Geographic location

### Nationwide coverage

ACA-Calc includes benchmark premium data for all counties across the United States.

## How it works

The calculator implements the ACA premium tax credit formula using PolicyEngine's validated rules engine:

1. **Determines household size and income** relative to the Federal Poverty Line

2. **Looks up the benchmark premium** (second-lowest-cost Silver plan) for your county

3. **Calculates the applicable percentage** from the premium cap schedule

4. **Computes your required contribution** as that percentage of income

5. **Subtracts your contribution from the benchmark premium** to determine the credit amount

The tool applies the same calculation methods used in PolicyEngine's full microsimulation model, which has been validated against official sources including Internal Revenue Service data.

## Policy context

The enhanced premium tax credits are set to expire at the end of 2025. The Congressional Budget Office estimates that if the enhancements expire, marketplace enrollment would decrease by approximately 3.4 million people.

For households purchasing coverage through ACA marketplaces, the difference between the enhanced and original subsidy schedules affects:

- Annual subsidy amounts

- Premium contribution requirements as a percentage of income

- Subsidy eligibility thresholds

## Get started

ACA-Calc is available at [**policyengine.org/us/aca-calc**](https://policyengine.org/us/aca-calc).

To use the calculator:

1. Enter your household's basic information (state, county, income, size)

2. Review your premium tax credit under each schedule

3. Compare the enhanced versus original subsidy amounts

4. Adjust household parameters to see how credits change

5. Create custom policy scenarios
