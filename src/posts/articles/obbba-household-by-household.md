Today, we're launching a new interactive tool that reveals the household-level impacts of the One Big Beautiful Bill Act (H.R.1), enabling Americans to explore how this major tax reform would affect families across different income levels, household compositions, and states.

The [OBBBA Household by Household tool](https://policyengine.org/us/obbba-household-by-household) provides unprecedented transparency into one of the most significant tax reform proposals in recent years, complementing our existing [OBBBA Household Explorer](https://policyengine.org/us/research/introducing-obbba-household-explorer) with new capabilities for systematic analysis.

## Understanding household-level impacts

The One Big Beautiful Bill Act represents a comprehensive overhaul of the US tax system, including extensions of the 2017 Tax Cuts and Jobs Act provisions, modifications to the state and local tax (SALT) deduction, and changes to various credits and deductions. While aggregate analyses show the bill would reduce federal revenues by trillions over the budget window, the household-level effects vary dramatically based on individual circumstances.

Our new tool addresses this complexity by allowing users to:

- **Explore impacts by state**: See how households in your state would be affected differently due to varying state tax structures and SALT deduction interactions
- **Analyze by income level**: Understand how the reforms affect households across the income distribution, from low-income families to high earners
- **Compare household types**: Examine differences between single filers, married couples, families with children, and other household compositions
- **Visualize net changes**: See dollar and percentage changes in after-tax income with clear, interactive visualizations

## Key features

### State-specific analysis

The tool recognizes that federal tax reforms don't affect all states equally. States with high income and property taxes see different impacts from SALT deduction changes than states with lower tax burdens. Users can select any state to see localized impact estimates that account for these variations.

### Household composition scenarios

Not all households are alike. The tool provides pre-configured scenarios for common household types:

- Single adults with and without children
- Married couples with varying numbers of dependents
- Retirees with different income sources
- Self-employed individuals

Each scenario shows how specific provisions of H.R.1—from the expanded standard deduction to modified child tax credit rules—combine to affect that household's tax liability.

### Interactive comparisons

Users can modify household characteristics in real-time to see how changes affect outcomes:

- Adjust income levels to find cliff effects or phase-outs
- Add or remove dependents to see the impact of child-related provisions
- Toggle between filing statuses to understand marriage penalties or bonuses
- Modify deductions to see the interaction with SALT cap changes

## Technical implementation

The tool leverages PolicyEngine's microsimulation infrastructure, applying H.R.1's provisions to representative households while accounting for:

- **Current law baseline**: All calculations compare H.R.1 to existing tax law as it would apply in each year
- **Interaction effects**: The model captures how different provisions interact, such as how SALT deduction changes affect the value of itemizing
- **State tax coupling**: Where state tax codes reference federal provisions, the tool models these downstream effects
- **Dynamic household responses**: While not modeling behavioral changes, the tool shows static impacts that help users understand potential incentives

## Methodology and data

The household-level calculations use the same validated tax logic that powers our population-wide analyses, ensuring consistency between individual and aggregate estimates. The tool:

- Implements all major provisions of H.R.1 as specified in the legislative text
- Uses current tax parameters updated through the latest IRS guidance
- Applies state-specific tax rules for all 50 states plus DC
- Validates results against published distributional tables where available

## Access and availability

The OBBBA Household by Household tool is freely available at [policyengine.org/us/obbba-household-by-household](https://policyengine.org/us/obbba-household-by-household). No registration is required, and all calculations happen in real-time using our API.

For developers and researchers, the underlying calculations are accessible via our open-source Python package:

```python
from policyengine_us import Simulation

# Create a household simulation
sim = Simulation(
    situation={
        "households": {
            "household": {
                "state_name": "CA",
                "members": ["head", "spouse", "child1", "child2"]
            }
        },
        "people": {
            "head": {"age": 40, "employment_income": 75000},
            "spouse": {"age": 38, "employment_income": 50000},
            "child1": {"age": 10},
            "child2": {"age": 8}
        }
    },
    reform="https://policyengine.org/us/reforms/72"  # H.R.1 reform ID
)

# Calculate impact
baseline_income = sim.calculate("household_net_income", 2025)
sim.reform = reform
reform_income = sim.calculate("household_net_income", 2025)
impact = reform_income - baseline_income
```

## Understanding your results

When using the tool, keep in mind:

- Results show **static impacts**—they don't account for potential behavioral responses like changes in work, savings, or investment decisions
- **Federal focus**—while state tax interactions are modeled where applicable, the primary analysis centers on federal tax changes
- **Current law baseline**—impacts are relative to existing law, including scheduled expirations and inflations adjustments
- **Point-in-time analysis**—results show impacts for specific years, not lifetime effects

## Complementary resources

This household-level tool complements our other OBBBA analysis resources:

- [OBBBA Household Explorer](https://policyengine.org/us/research/introducing-obbba-household-explorer): Our original interactive calculator for custom household scenarios
- [Reconciliation Tax Analysis](https://policyengine.org/us/research/final-2025-reconciliation-tax): Detailed breakdown of revenue and distributional impacts
- [Manager's Amendment Analysis](https://policyengine.org/us/research/managers-amendment-to-hr1): Updates reflecting recent legislative modifications

## Conclusion

The OBBBA Household by Household tool democratizes access to sophisticated tax policy analysis, enabling anyone to understand how major reforms would affect families like theirs. By providing transparent, detailed, and interactive analysis, we aim to inform the public debate around this significant legislation.

As Congress continues to develop and refine tax reform proposals, we'll update the tool to reflect the latest legislative text and amendments. We welcome feedback on the tool's functionality and suggestions for additional features that would enhance its usefulness for understanding tax policy impacts.

For questions about the tool or our methodology, please [contact us](mailto:hello@policyengine.org) or explore our [open-source code](https://github.com/PolicyEngine/policyengine-app) on GitHub.
