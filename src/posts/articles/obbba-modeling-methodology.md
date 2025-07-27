At PolicyEngine, we strive to provide transparent and accurate modeling of major policy changes. The One Big Beautiful Bill Act (OBBBA), signed into law on July 4, 2025, represents one of the most comprehensive tax and spending reforms in recent history. This report explains how PolicyEngine models the OBBBA, including the policy provisions we capture, our data sources, and calibration methodology.

## Overview

PolicyEngine's OBBBA modeling captures the major tax provisions and benefit program changes while calibrating to Congressional Budget Office (CBO) projections. Our approach leverages detailed microsimulation at the household level to project both individual and economy-wide impacts.

## Policy provisions modeled

### Tax provisions

PolicyEngine models all major individual income tax provisions of the OBBBA:

- **TCJA extension**: Permanent extension of the 2017 Tax Cuts and Jobs Act individual tax rates (12%, 22%, 24%, 32%, 37%), increased standard deduction, and elimination of personal exemptions
- **Child Tax Credit changes**: $2,000 base amount with $1,800 refundability cap for 2026, with new SSN requirements that restrict eligibility
- **Senior standard deduction**: Additional $6,000 deduction for taxpayers age 65 and over (2025-2028)
- **Tips and overtime exemptions**: Exemption of up to $25,000 of tip income and overtime wages from income tax (2025-2028)
- **Auto loan interest deduction**: Deduction of up to $10,000 of interest on qualifying vehicle loans (2025-2028)
- **SALT deduction changes**: Increase in the state and local tax deduction cap to $40,000 for taxpayers earning under $500,000 (reverting to $10,000 after 5 years)
- **Qualified Business Income Deduction**: Increased from 20% to 23% with modified phase-out thresholds

### Benefit program changes

The OBBBA implements significant changes to safety net programs:

- **Medicaid work requirements**: Adults eligible through ACA expansion must meet work and reporting requirements
- **SNAP work requirements**: Enhanced requirements for able-bodied adults without dependents
- **ACA premium tax credit changes**: Non-extension of enhanced subsidies that were set to expire

## Data sources

### Enhanced Current Population Survey

PolicyEngine uses the Enhanced CPS as our primary data source. This dataset builds on the Census Bureau's Current Population Survey by:

- **Income imputation**: We impute tip income using a quantile random forest model trained on the Survey of Income and Program Participation (SIPP), which contains detailed tip income data from employer reports
- **Overtime income**: We calculate overtime premiums based on hours worked, occupation categories, and Fair Labor Standards Act eligibility
- **Immigration status**: We implement the ASEC Undocumented Algorithm to impute SSN card types, critical for modeling CTC eligibility under the new SSN requirements

### Tax data integration

While we use the IRS Public Use File for certain tax modeling components, we note that:

- Mortgage interest deduction remains imputed from the PUF without modification
- We do not model estate tax or corporate tax provisions
- Capital gains and dividend income follow SOI-calibrated fractions

## Calibration methodology

### Program take-up rates

PolicyEngine calibrates benefit program take-up rates to match CBO's coverage loss projections:

- **SNAP take-up**: 77.5% (2026-2028) to align with projected enrollment reductions
- **Medicaid take-up**: 92.0% (2026-2028) to match CBO's 10.5 million coverage loss estimate
- **ACA take-up**: 65.5% (2026-2028) reflecting marketplace enrollment changes

These calibrated rates ensure our microsimulation produces aggregate impacts consistent with official estimates while maintaining household-level accuracy.

### Revenue calibration

Our model projects federal revenue changes that align with CBO estimates:

- Individual income tax provisions: -$3.8 trillion over 10 years
- Coverage-related savings: +$1.02 trillion from Medicaid/CHIP reductions
- Net fiscal impact: Approximately $3.0-4.1 trillion added to the debt

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

- **Parameter files**: Located in `policyengine_us/parameters/gov/contrib/reconciliation/`
- **Reform definitions**: Consolidated in `obbba-scatter/data/reforms.py`
- **Visualization**: Interactive household-by-household calculator at [policyengine.org/us/research/obbba-scatter](https://policyengine.org/us/research/obbba-scatter)

## Conclusion

PolicyEngine's OBBBA modeling provides comprehensive analysis of the law's major provisions while acknowledging areas where data or scope limitations prevent full modeling. By calibrating to CBO projections while maintaining detailed household-level simulation, we offer both accuracy and transparency in understanding this landmark legislation's impacts.

For researchers and policymakers seeking to understand specific provisions or household impacts, our open-source implementation allows full inspection of modeling choices and assumptions. We continue to refine our modeling as new data and analyses become available.
