As a US Senator in 2018, Vice President Kamala Harris introduced the [LIFT (Livable Incomes for Families Today) Act](https://www.congress.gov/bill/116th-congress/senate-bill/4/text), a refundable tax credit similar to the Earned Income Tax Credit. Then-Senator Harris also featured this proposal in her 2020 presidential campaign. Using PolicyEngine US v1.25.2 and the 2022 Enhanced Current Population Survey, we analyze the potential impacts of this reform if implemented in 2024. This analysis focuses solely on the Middle Class Tax Credit (MCTC) component of the LIFT Act, not addressing other provisions such as those related to the Tax Cuts and Jobs Act or a financial transactions tax.

# What is the LIFT Act?

The LIFT Act's Middle Class Tax Credit phases in with 100% of earnings up to a maximum amount, then phases out with adjusted gross income over a window. Harris established it with inflation-indexed values in 2019, which creates the following structure in 2024:

**Table 1: LIFT Act Middle Class Tax Credit parameters (2024)**

| Filing status     | Maximum amount | Phase-out start | Phase-out end |
| ----------------- | -------------- | --------------- | ------------- |
| Single            | $3,600         | $35,800         | $59,650       |
| Head of household | $3,600         | $71,600         | $95,450       |
| Joint             | $7,200         | $71,600         | $119,350      |

This structure is depicted below. You can also calculate how the LIFT Act would affect your own household with **[this calculator](https://policyengine.org/us/household?reform=61627&focus=intro&region=enhanced_us&timePeriod=2024&baseline=2)**.

![Figure 1: LIFT Act Middle Class Tax Credit by filing status and earnings level (2024)](/images/posts/lift-act/trapezoids.png)

# Static US Impact

[PolicyEngine estimates](https://policyengine.org/us/policy?reform=61632&focus=policyOutput.policyBreakdown&region=enhanced_us&timePeriod=2024&baseline=2) that the MCTC would, in 2024:

- Cost $411 billion
- Lower poverty by 25.4%, with larger reductions for children, Blacks, Hispanics, and men
- Reduce the Gini index of income inequality by 4.1%
- Benefit 68% of Americans

![Figure 2: Winners from the LIFT Act Middle Class Tax Credit by Decile (2024)](/images/posts/lift-act/winners.png)

While the earnings requirement reduces the share of individuals in the bottom decile who would benefit, those in the second through sixth deciles gain more than those in higher income households.

# US Impact Considering Behavioral Responses

PolicyEngine now supports behavioral responses: users can enter their own income and substitution elasticities, which govern how people work less when they have more income and are paid less on the margin, respectively. The MCTC would be expected to reduce work through the income effect, and both increase and reduce work through the substitution effect, as it reduces marginal tax rates by 100 percentage points in the phase-in and increases them by 15 percentage points in the phase-out.

Applying elasticities from the Congressional Budget Office, we project that the MCTC would [reduce hours worked by 1.1%](https://policyengine.org/us/policy?reform=61633&focus=policyOutput.laborSupplyImpact.hours&region=enhanced_us&timePeriod=2024&baseline=2) and [earnings by 0.9%](https://policyengine.org/us/policy?reform=61633&focus=policyOutput.laborSupplyImpact.earnings.overall.relative&region=enhanced_us&timePeriod=2024&baseline=2). Substitution effects (the phase-out) explain most of these reductions. As a result, the tax credit's cost would rise by 10% to [$450 billion](https://policyengine.org/us/policy?reform=61633&focus=policyOutput.budgetaryImpact.overall&region=enhanced_us&timePeriod=2024&baseline=2), though the poverty impact would remain essentially unchanged at 25%.

# Conclusion

The LIFT Act proposed by then-Senator Kamala Harris includes a Middle Class Tax Credit that would reduce poverty and inequality through over $400 billion in annual transfers if fully taken up. This exceeds contemporaneous cost estimates (see Table 2), likely due to faster than expected inflation since 2018, which mechanically expands the nominal cost of the program through higher maximums and phase-outs.

**Table 2: Comparison of LIFT Act Middle Class Tax Credit cost and poverty estimates**

| Organization                                 | Cost ($bn) | Poverty reduction (%) | Child Poverty reduction (%) | Estimate Year         | Notes                                                                                   |
| -------------------------------------------- | ---------- | --------------------- | --------------------------- | --------------------- | --------------------------------------------------------------------------------------- |
| CRFB                                         | 300        | -                     | -                           | Average over 10 years |                                                                                         |
| TPC                                          | 291        | -                     | -                           | 2024                  | Assumes partial take-up                                                                 |
| Tax Foundation                               | 276        | -                     | -                           | 2024                  | Static Revenue impact Estimate an average net income increase of 2.4% (PE assumes 3.2%) |
| Penn Wharton Budget Model                    | 317        | -                     | -                           | 2024                  |                                                                                         |
| ITEP                                         | 271        | -                     | -                           | 2020                  |                                                                                         |
| Columbia Center on Poverty and Social Policy | /          | 17.2                  | 25.7                        | 2019                  | Rounded values used for the calculation                                                 |
| PolicyEngine (static)                        | 411        | 25.4                  | 27.1                        | 2024                  |                                                                                         |
| PolicyEngine (dynamic)                       | 449        | 25.2                  | 27.0                        | 2024                  | CBO elasticities                                                                        |

Incorporating behavioral responses adds about 10% to the cost, due to about 1% less labor supply. This results from income effects and substitution effects for those in the phase-out range, though some low-income earners would be projected to work more due to substitution effects.

As Vice President Harris pursues her 2024 presidential campaign, she may balance her prior proposals like the LIFT Act with newer policies in [President Biden's budget](https://policyengine.org/us/research/biden-budget-2025). PolicyEngine stands ready to support evidence-based evaluation of potential reforms like these and those from across the political spectrum.
