At PolicyEngine, we strive to provide transparent and accurate modeling of major policy changes. The One Big Beautiful Bill Act (OBBBA), signed into law on July 4, 2025, represents one of the most comprehensive tax and spending reforms in recent history. This report explains how PolicyEngine models the OBBBA, including the policy provisions we capture, our data sources, and calibration methodology.

## Overview

PolicyEngine's OBBBA modeling captures the major tax provisions and benefit program changes while calibrating to Congressional Budget Office (CBO) projections. Our approach leverages detailed microsimulation at the household level to project both individual and economy-wide impacts.

## Policy provisions modeled

### Tax provisions

PolicyEngine models the OBBBA's comprehensive individual income tax changes, which go beyond a simple TCJA extension:

**Core rate and deduction changes**:

- **Tax rates**: Permanent extension of TCJA rates (12%, 22%, 24%, 32%, 37%)
- **Standard deduction**: Increased to $32,600 for joint filers in 2026 (higher than TCJA's $30,300)
- **Personal exemptions**: Remain eliminated
- **Alternative Minimum Tax**: Higher exemption amounts ($139,000 for joint filers) with modified phase-out rates
- **Itemized deduction limitation**: New income-based limitations on itemized deductions (Pease limitation was repealed by TCJA)

**Credit modifications**:

- **Child Tax Credit**: $2,200 base amount with $1,700 refundability cap for 2026 (not $1,800 as in TCJA), rising to $1,800 in 2027-2028, with new SSN requirements
- **Senior standard deduction**: Additional $6,000 deduction for taxpayers age 65 and over (2025-2028)
- **Child and Dependent Care Credit**: Enhanced maximum credit and two-tier phase-down structure

**New deductions and exemptions**:

- **Tips and overtime**: Exemption of up to $25,000 of tip income and overtime wages from income tax (2025-2028), phasing out at higher incomes
- **Auto loan interest**: Deduction of up to $10,000 of interest on qualifying vehicle loans (2025-2028)
- **SALT deduction**: Increased cap to $40,000 for taxpayers earning under $500,000, reverting to $10,000 in 2030

**Business provisions**:

- **Qualified Business Income Deduction**: Maintained at 20% (not increased to 23%) with minimum $400 deduction for qualifying businesses

### Benefit program changes

The OBBBA implements significant changes to safety net programs:

- **Medicaid work requirements**: Adults eligible through ACA expansion must meet work and reporting requirements
- **SNAP work requirements**: Enhanced requirements for able-bodied adults without dependents
- **ACA premium tax credit changes**: Non-extension of enhanced subsidies that were set to expire

## Comprehensive modeling approach

### State and local tax integration

PolicyEngine maintains a complete model of state and local income taxes for all 50 states and DC. This enables:

- **Accurate SALT deduction calculations**: Our state tax models calculate the exact state and local tax liabilities that feed into the federal SALT deduction
- **Mechanical effects on state taxes**: Many states begin with federal adjusted gross income or taxable income as their starting point. The OBBBA's new deductions (tips, overtime, auto loan interest) automatically flow through to reduce state tax liabilities in these states
- **Interaction effects**: Changes to federal itemized deductions affect state taxes in states that conform to federal itemization rules

### Integrated benefit program modeling

PolicyEngine models the complete rules for major benefit programs, not just their take-up rates:

- **SNAP**: Full eligibility determination based on income, assets, household composition, and work requirements
- **Medicaid/CHIP**: State-specific eligibility pathways including expansion status, income limits, and categorical eligibility
- **ACA subsidies**: Premium tax credit calculations based on income, family size, and local benchmark premiums

This integrated approach captures important interactions:

- Federal tax changes affect modified adjusted gross income (MAGI) used for ACA and Medicaid eligibility
- Work requirements interact with existing categorical eligibility rules
- Benefit cliffs and phase-outs combine with tax provisions to create complex marginal rate effects

## Data sources

### Enhanced Current Population Survey

PolicyEngine uses the Enhanced CPS as our primary data source. This dataset builds on the Census Bureau's Current Population Survey through several imputation models:

**Tip income imputation**: We train a quantile random forest model on the Survey of Income and Program Participation (SIPP), which contains employer-reported tip income.[^2] The model uses:

- Employment income
- Age
- Number of children under 18
- Number of children under 6

**Overtime income**: We calculate overtime premiums using:[^3]

- Hours worked per week from CPS
- Occupation codes to determine Fair Labor Standards Act exemption status
- Base employment income to derive hourly rates
- Standard time-and-a-half (1.5x) premium for hours over 40

**Auto loan interest**: We impute from the Survey of Consumer Finances using predictors:[^4]

- Age and state
- Household size and number of children
- Employment, interest/dividend, and Social Security/pension income
- The model imputes net worth, auto loan balance, and auto loan interest simultaneously

**Immigration status**: We implement the [ASEC Undocumented Algorithm (Ryan 2022)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4662801), which uses a process-of-elimination approach.[^5] The algorithm examines 14 conditions including:

- Arrival year (pre-1982 for IRCA amnesty eligibility)
- Receipt of federal programs (Medicare, Social Security, SSI)
- Government employment or military service
- Other legal status indicators

Those not meeting any condition are assigned SSN card type "NONE" (likely undocumented), calibrated to match external estimates (13 million for 2024-2025)

### Tax data integration

While we use the IRS Public Use File for certain tax modeling components, we note that:

- Mortgage interest deduction remains imputed from the PUF without modification
- We do not model estate tax or corporate tax provisions
- Capital gains and dividend income follow SOI-calibrated fractions

## Calibration methodology

### Program take-up rates

PolicyEngine's approach to modeling OBBBA's coverage impacts involves adjusting program take-up rates from their baseline values:

| Program | Baseline Take-up[^6] | OBBBA Take-up (2026-2028)[^7] | Change |
|---------|---------------------|-------------------------------|---------|
| SNAP | 82.0% | 77.5% | -4.5pp |
| Medicaid | 93.0% | 92.0% | -1.0pp |
| ACA | 67.2% | 65.5% | -1.7pp |

These adjustments reflect CBO's projected coverage losses due to work requirements and administrative changes. However, the actual impact on enrollment is more complex than these raw percentages suggest. PolicyEngine first calibrates household weights to match baseline program enrollment, then applies the adjusted take-up rates. This two-stage process means the effective enrollment changes may differ from the simple percentage point differences shown above, but produces aggregate impacts consistent with CBO's estimates of 10.5 million Medicaid coverage losses and corresponding SNAP enrollment reductions.

### Alignment with projections

PolicyEngine's modeling focuses on the individual income tax provisions and their interactions with benefit programs. Our [analysis of the reconciliation bill's tax provisions](/us/research/final-2025-reconciliation-tax) projects a $3.8 trillion reduction in federal revenues from 2026 to 2035 compared to current law.

While we model the eligibility changes for programs like Medicaid and SNAP through our calibrated take-up rates, we do not directly model the full fiscal impact of coverage losses. The Congressional Budget Office has separately estimated that the OBBBA will reduce federal spending on Medicaid and CHIP by $1.02 trillion through coverage reductions.[^1]

## Modeling limitations

Several provisions of the OBBBA are not captured in our current modeling:

- **Estate tax changes**: Not modeled due to data limitations
- **Corporate tax provisions**: Outside the scope of individual microsimulation
- **Immigration enforcement**: Indirect effects on population and workforce not modeled
- **State fiscal impacts**: Secondary effects on state budgets not captured
- **Provider tax changes**: Medicaid provider tax moratorium effects not modeled

## Validation

We validate our modeling through several approaches:

1. **Aggregate comparisons**: Total revenue and spending changes match CBO projections within reasonable bounds
2. **Distributional analysis**: Income decile impacts align with independent analyses
3. **Edge case testing**: Specific household scenarios tested against hand calculations
4. **State-level validation**: Coverage losses by state compared to KFF allocations of CBO estimates

## Technical implementation

The OBBBA reforms are implemented across PolicyEngine's infrastructure:

- **Parameter files**: Located in [`policyengine_us/parameters/gov/contrib/reconciliation/`](https://github.com/PolicyEngine/policyengine-us/tree/master/policyengine_us/parameters/gov/contrib/reconciliation)
- **Reform definitions**: Consolidated in [`obbba-scatter/data/reforms.py`](https://github.com/PolicyEngine/obbba-scatter/blob/main/data/reforms.py)
- **Visualization**: Interactive [household-by-household calculator](/us/research/obbba-scatter)

## Conclusion

PolicyEngine's OBBBA modeling provides comprehensive analysis of the law's major provisions while acknowledging areas where data or scope limitations prevent full modeling. By calibrating to CBO projections while maintaining detailed household-level simulation, we offer both accuracy and transparency in understanding this landmark legislation's impacts.

For researchers and policymakers seeking to understand specific provisions or household impacts, our open-source implementation allows full inspection of modeling choices and assumptions. We continue to refine our modeling as new data and analyses become available.

---

[^1]: Center for American Progress, ["The Truth About the One Big Beautiful Bill Act's Cuts to Medicaid and Medicare"](https://www.americanprogress.org/article/the-truth-about-the-one-big-beautiful-bill-acts-cuts-to-medicaid-and-medicare/), July 2025. See also KFF's [state-by-state allocation](https://www.kff.org/medicaid/issue-brief/allocating-cbos-estimates-of-federal-medicaid-spending-reductions-across-the-states-enacted-reconciliation-package/) of CBO's estimates.

[^2]: Implementation in [`policyengine_us_data/datasets/sipp/sipp.py`](https://github.com/PolicyEngine/policyengine-us-data/blob/master/policyengine_us_data/datasets/sipp/sipp.py#L39-L71) and [`policyengine_us_data/datasets/cps/cps.py`](https://github.com/PolicyEngine/policyengine-us-data/blob/master/policyengine_us_data/datasets/cps/cps.py#L1219-L1233).

[^3]: Overtime calculation in [`policyengine_us/variables/household/income/person/fsla_overtime_premium.py`](https://github.com/PolicyEngine/policyengine-us/blob/master/policyengine_us/variables/household/income/person/fsla_overtime_premium.py) and occupation mapping in [`policyengine_us_data/datasets/cps/cps.py`](https://github.com/PolicyEngine/policyengine-us-data/blob/master/policyengine_us_data/datasets/cps/cps.py#L1236-L1273).

[^4]: Auto loan imputation in [`policyengine_us_data/datasets/cps/cps.py`](https://github.com/PolicyEngine/policyengine-us-data/blob/master/policyengine_us_data/datasets/cps/cps.py#L1275-L1356).

[^5]: Full SSN status imputation implementation in [`policyengine_us_data/datasets/cps/cps.py`](https://github.com/PolicyEngine/policyengine-us-data/blob/master/policyengine_us_data/datasets/cps/cps.py#L1407-L1686) and detailed documentation in the [SSN statuses imputation notebook](https://github.com/PolicyEngine/policyengine-us-data/blob/master/docs/SSN_statuses_imputation.ipynb).

[^6]: Baseline take-up rates from PolicyEngine parameters: [SNAP](https://github.com/PolicyEngine/policyengine-us/blob/master/policyengine_us/parameters/gov/usda/snap/takeup_rate.yaml), [Medicaid](https://github.com/PolicyEngine/policyengine-us/blob/master/policyengine_us/parameters/gov/hhs/medicaid/takeup_rate.yaml), [ACA](https://github.com/PolicyEngine/policyengine-us/blob/master/policyengine_us/parameters/gov/aca/takeup_rate.yaml).

[^7]: OBBBA take-up adjustments in [`obbba-scatter/data/reforms.py`](https://github.com/PolicyEngine/obbba-scatter/blob/main/data/reforms.py#L535-L570).
