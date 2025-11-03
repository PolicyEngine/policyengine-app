Following the Senate's July 1st passage of the One Big Beautiful Bill Act (OBBBA), we're launching the [**OBBBA Household Explorer**](../obbba-household-explorer) — an interactive dashboard that shows how this reconciliation bill would affect individual households across America.

[**_Explore Households with our new tool here._**](../obbba-household-explorer)

## What the tool does

The OBBBA Household Explorer allows users to explore the bill’s impacts on over 40,000 representative households from PolicyEngine’s [Enhanced Current Population Survey](https://legacy.policyengine.org/us/research/enhanced-cps-beta) (CPS) dataset. This dataset integrates and calibrates multiple data sources using machine learning techniques — the same foundation that powers PolicyEngine’s simulations of policy effects on poverty, inequality, and government budgets, when paired with our comprehensive model of federal, state, and local income tax and benefit programs.

The OBBBA extends provisions of the 2017 Tax Cuts and Jobs Act set to expire at the end of 2025, while introducing new elements including:

- Tax exemptions for tip and overtime income

- Modifications to the Child Tax Credit

- Changes to the SALT deduction cap

- Cuts to SNAP, Medicaid, and Affordable Care Act Premium Tax Credits

By capturing these and more as of 2026, we show the breadth of the bills’ impacts on households that collectively represent the nation.

## Examples

To illustrate the tool’s capabilities, let’s explore two households. While both are couples around 60 years old, varying attributes and analysis configurations shows how results vary.

### Couple in Montana, Senate bill against current law

First consider household **#66994**, a couple in Montana, ages 53 and 61, with $214,850 income.

![Screenshot of OBBBA Household Explorer interface showing household selection screen with filters set to Random Shuffle method and household #66994 selected](https://cdn-images-1.medium.com/max/3200/0*femrvCx4TOJ3ea_3)

Comparing the Senate bill to current law, they would gain $13,577, paying $11,831 less in federal tax and $1,746 less in state tax.

![Financial impact breakdown table showing: Market Income $214,850, Federal Taxes -$11,831 (-24.5%), State Taxes -$1,746 (-16.0%), Benefits $0 (0.0%), Net Income $13,577 (+4.8%)](https://cdn-images-1.medium.com/max/3200/0*_xZhF7_TUE_RT5Eh)

That $13,577 gain results from reforms to the tax brackets, standard deduction, qualified business income deduction, and overtime income exemption, less a $2,332 loss from the repeal of exemptions.

![Waterfall chart titled "Impact of Senate OBBBA Against Current Law by Provision on Net Income" showing baseline net income of $118,311, increases from tax rate reform ($4,754), standard deduction reform ($4,515), QBID reform ($3,125), overtime income exempt ($3,514), offset by exemption reform (-$2,332), resulting in final net income of $131,888](https://cdn-images-1.medium.com/max/3200/0*42RcvRHuC_8TJdD2)

We can also select state taxes to explore the $1,746 gain, finding that it results from the standard deduction reform. Beginning in 2024, Montana adopted the federal standard deduction by statute. PolicyEngine's [TAXSIM](http://taxsim.nber.org)-validated tax model captures these interactions between federal and state policy.

![Waterfall chart titled "Impact of Senate OBBBA Against Current Law by Provision on State Taxes" showing baseline state taxes of $10,620, with a $1,746 reduction from standard deduction reform, resulting in final state taxes of $8,874](https://cdn-images-1.medium.com/max/3200/0*PmdWaNAceYNyVgMW)

### Couple in Georgia, House bill against current policy

Next let's consider household **#43826**, a Georgia couple with $71,820 income.

![Screenshot of OBBBA Household Explorer interface showing household attributes for Georgia couple, including state GA, household size 2, marital status married, and market income $71,820](https://cdn-images-1.medium.com/max/3200/0*0tcLOTIau2vDApZe)

This household would pay $1,023 less in federal tax, while losing $1,971 in benefits, for a net loss of $947.

![Financial impact breakdown table showing: Baseline Value $71,820, Absolute Change -$947, % Change -1.4%, with details showing Market Income $71,820, Federal Taxes -$1,023 (-24.5%), State Taxes $0 (-10.0%), Benefits -$1,971 (-18.0%), Net Income -$947 (-1.4%)](https://cdn-images-1.medium.com/max/3200/0*038Eb7mHdWpDA3Kg)

Like the Montana couple, this couple benefits from the standard deduction reform and overtime exemption.

![Waterfall chart titled "Impact of House OBBBA Against Current Policy by Provision on Federal Taxes" showing baseline federal taxes of $4,176, with reductions from standard deduction reform ($521) and overtime income exempt ($502), resulting in final federal taxes of $3,153](https://cdn-images-1.medium.com/max/3200/0*y8DvE7OXLVAZvd7R)

However, they lose $1,971 in Affordable Care Act Premium Tax Credits, whose enhancements (which are part of current policy) expire at the end of 2025.

![Waterfall chart titled "Impact of House OBBBA Against Current Policy by Provision on Benefits" showing baseline benefits of $7,981, with a $1,971 reduction from ACA Enhanced Subsidies Reform, resulting in final benefits of $6,010](https://cdn-images-1.medium.com/max/3200/0*QZQGbe-JhdRw7ifM)

PolicyEngine counts premium tax credits as benefits since they are subsidized premiums throughout the year. Our rules engine calculates these credits to the dollar. Additionally, our rules engine calculates the dollar impacts of households modeled to lose SNAP and Medicaid access, per projections from the Congressional Budget Office.

## Key features

To go beyond these examples (and household **#118944** for this report’s cover image), you can leverage the tool’s full set of features.

### 🎲 Quick exploration

The **Get Random Household** button lets you instantly explore impacts across America’s diverse population. Each click reveals a different household, weighted by population representation — allowing rapid exploration of how impacts vary by circumstance.

### 📊 Comprehensive analysis

The tool analyzes impacts on:

- **Federal taxes**: Changes from tax rate adjustments, deductions, and credits

- **State taxes**: How federal changes affect state income tax liability

- **Benefits**: Changes to programs like SNAP, Medicaid, and ACA subsidies

- **Net income**: Combined effect on take-home pay

### 🔍 Detailed filtering

Find households similar to your situation by:

- State

- Income level

- Marital status

- Number of dependents

- Age of household head

- Household weight (population representation)

### 📈 Provision-by-provision breakdown

Interactive waterfall charts show exactly how each reform component contributes to the total impact:

- Tax rate changes

- Standard deduction modifications

- Child Tax Credit changes

- SALT cap adjustments

- AMT reforms

- Tip and overtime exemptions

- Over a dozen other provisions

### Multiple baselines and versions

Users can compare impacts against:

- **Current law baseline**: What happens if TCJA provisions expire

- **Current policy baseline**: What happens if TCJA provisions are extended

And analyze both:

- **House version**: Passed May 22, 2025

- **Senate version**: Passed July 1, 2025

### Representative data you can trust

The tool uses PolicyEngine’s Enhanced CPS dataset, which represents the full diversity of American households. This allows exploration of impacts across different:

- Geographic regions

- Income levels

- Family structures

- Employment situations

- Benefit receipt patterns

Whether examining a restaurant worker benefiting from tip exemptions, a family affected by Child Tax Credit changes, or a household navigating SALT cap modifications, the tool provides detailed impact analysis.

## Get started

The OBBBA Household Explorer is available now at [**policyengine.org/us/obbba-household-explorer**](../obbba-household-explorer).

Start exploring by:

1. Using the **Get Random Household** button to quickly survey diverse impacts

1. Applying filters to find households similar to yours

1. Selecting specific household IDs for detailed analysis

1. Finding “interesting cases” — households with the largest positive or negative impacts

As Congress continues to debate the final form of this legislation, the OBBBA Household Explorer provides a window into how these policy changes would affect real American households.
