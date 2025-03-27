This post provides an overview of how benefits are modelled in PolicyEngine UK. It details both existing benefits in the UK welfare system and how they are simulated within our platform. Each benefit component is linked to its specific implementation in the codebase, making this a technical reference for understanding how benefit calculations are performed in the PolicyEngine UK microsimulation model.

This post is structured by benefit types to better illustrate how different elements of the system work together. We begin with means-tested benefits—Universal Credit, legacy benefits, and pension-age benefits—which provide support based on household income and savings. We then explore non-means-tested benefits that are provided based on specific circumstances regardless of income, such as disability benefits and child benefits. Finally, we examine childcare support programmes and cost of living measures implemented in the UK.

## Means-tested benefits

Means-tested benefits provide targeted support to those on low incomes. These benefits are awarded based on household income, savings, and circumstances, with payments reducing as income increases. The means testing creates a system where those with the lowest incomes receive the most support.

### Universal Credit

Universal Credit is a means-tested benefit introduced to replace six legacy benefits for working-age people, implemented in PolicyEngine through [`universal_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/universal_credit.py). The benefit combines support for basic living costs, housing, children, disabilities, and work incentives into a single monthly payment.

- **Standard allowance**
  This forms the basic element of Universal Credit that all eligible claimants receive, varying by age and household composition.
  
  - **Single claimant**: Amount for single adults, with higher rates for those 25 and over, calculated as part of [`uc_standard_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/standard_allowance/uc_standard_allowance.py).
  - **Joint claimants**: Amount for couples, with higher rates for couples where either is 25 or over, also calculated in [`uc_standard_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/standard_allowance/uc_standard_allowance.py).

- **Additional elements**
  Beyond the standard allowance, Universal Credit provides extra amounts based on household circumstances.
  
  - **Child element**: Additional amount for children, with higher rates for first/only child born before April 2017, and limitations based on the two-child limit policy, calculated in [`uc_child_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/child_element/uc_child_element.py).
  - **Disabled child addition**: Extra amount for children with disabilities, with standard and enhanced rates, included in [`uc_disability_elements.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/disability_element/uc_disability_elements.py).
  - **Limited capability for work element**: For adults with health conditions affecting ability to work, calculated as part of [`uc_disability_elements.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/disability_element/uc_disability_elements.py).
  - **Carer element**: For those providing significant care (35+ hours per week) to someone receiving specific disability benefits, calculated in [`uc_carer_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/carer_element/uc_carer_element.py).
  - **Childcare costs element**: Covers up to 85% of eligible childcare costs for working parents, up to maximum amounts, calculated in [`uc_childcare_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/childcare_element/uc_childcare_element.py).

- **Housing costs element**
  Housing support within Universal Credit varies by tenure type and location.
  
  - **Rented accommodation**: Covers eligible rent up to Local Housing Allowance rates for private renters or actual rent for social housing tenants, with deductions for non-dependants, calculated in [`uc_housing_costs_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/housing_costs_element/uc_housing_costs_element.py).
  - **Mortgage interest**: Support for homeowners in the form of loans rather than payments, also calculated in [`uc_housing_costs_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/housing_costs_element/uc_housing_costs_element.py).

- **Work allowances and taper rate**
  These determine how Universal Credit is reduced as earnings increase.
  
  - **Work allowances**: Amounts that can be earned before Universal Credit starts to be reduced, with higher allowances for those with children or limited capability for work, calculated in [`uc_work_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/work_allowance/uc_work_allowance.py).
  - **Taper rate**: Percentage reduction in Universal Credit for each pound earned above work allowances, implemented in [`uc_income_reduction.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/income/uc_income_reduction.py).

- **Benefit cap**
  Universal Credit is subject to the benefit cap, which limits the total benefits a household can receive.
  
  - The cap has higher limits in London and exemptions for working households or those with disabilities, applied in [`universal_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/universal_credit.py).

### Legacy benefits

While Universal Credit continues its rollout, many households still receive "legacy benefits"—the six benefits that Universal Credit is replacing. These remain in place due to transitional protection and ongoing migration.

#### Housing Benefit

Housing Benefit provides support with rental costs for those not receiving Universal Credit, calculated in [`housing_benefit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/housing_benefit.py).

The amount is determined through a calculation involving:
- **Eligible rent**: Maximum rent considered, limited by Local Housing Allowance for private renters
- **Applicable amount**: Amount deemed necessary for basic living costs based on household circumstances
- **Income assessment**: Benefit reduced by a percentage of income above the applicable amount
- **Non-dependant deductions**: Reductions for other adults in the household who are expected to contribute

Unlike Universal Credit's integrated approach, Housing Benefit addresses only housing costs, with separate benefits needed for other living expenses.

#### Tax Credits

Tax Credits provide support to families with children and working people on low incomes. The system, calculated in [`tax_credits.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/tax_credits.py), consists of two elements:

- **Child Tax Credit (CTC)**
  Support for families with children regardless of employment status.
  
  - **Family element**: Basic amount for families with at least one child
  - **Child element**: Amount for each child, subject to the two-child limit for children born after April 2017
  - **Disability elements**: Additional amounts for disabled children

- **Working Tax Credit (WTC)**
  Support for those in low-paid work, with various elements reflecting different needs.
  
  - **Basic element**: Amount for any eligible working household
  - **Couple/lone parent element**: Additional amount based on family structure
  - **30-hour element**: Extra for those working at least 30 hours weekly
  - **Disability element**: Additional amount for workers with disabilities
  - **Severe disability element**: Extra for those with severe disabilities
  - **Childcare element**: Up to 70% of eligible childcare costs

Both CTC and WTC use a tapering system where WTC is reduced first as income rises, followed by CTC.

#### Income-based Jobseeker's Allowance (JSA)

Income-based JSA provides financial support for unemployed people seeking work, calculated in [`JSA_income.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/JSA_income.py).

The benefit incorporates:
- **Personal allowances**: Basic amounts based on age and whether claiming as single person or couple
- **Premiums**: Additional amounts for specific circumstances (family, disability, etc.)
- **Income assessment**: Benefit reduced based on income and savings
- **Work requirements**: Recipients must be available for and actively seeking work

JSA includes conditionality requirements with claimants attending regular meetings and demonstrating active job seeking.

#### Income-related Employment and Support Allowance (ESA)

For those unable to work due to illness or disability, income-related ESA offers financial support, calculated in [`ESA_income.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/ESA_income.py).

The benefit structure includes:
- **Personal allowances**: Basic amounts similar to JSA
- **Components**: Additional payments depending on whether in work-related activity group or support group
- **Premiums**: Extra amounts for specific circumstances
- **Income assessment**: Benefit reduced based on income and savings

The Work Capability Assessment determines which group claimants are placed in, with the support group receiving higher payments.

#### Income Support

Income Support provides a safety net for those not expected to seek work, calculated in [`income_support.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/income_support.py).

Key features include:
- **Personal allowances**: Basic amounts based on age and circumstances
- **Premiums**: Additional amounts for specific circumstances
- **Income assessment**: Benefit reduced based on income and savings

Income Support primarily serves lone parents with young children, carers, and some people with disabilities who are not expected to look for work.

### Pension-age benefits

The means-tested benefit system differentiates between working-age and pension-age households, with specific benefits for older citizens.

#### Pension Credit

Pension Credit ensures a minimum income level for pensioners. Calculated in [`pension_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/pension_credit.py), it comprises two elements:

- **Guarantee Credit**
  The primary component that tops up weekly income to a guaranteed minimum level.
  
  - **Standard minimum guarantee**: Basic amount for singles or couples
  - **Additional amounts**: Extra for severe disability, caring responsibilities, and housing costs
  - **Income assessment**: Benefit equals the difference between the applicable guarantee and assessed income

- **Savings Credit**
  An additional element for those who have saved for retirement, only available to those who reached State Pension age before April 2016.
  
  - **Maximum amount**: Cap on potential Savings Credit
  - **Threshold**: Minimum qualifying income
  - **Calculation**: Percentage of income between threshold and a higher limit, less a reduction based on income above the guarantee level

Pension Credit can serve as a gateway to other benefits for pensioners, with receipt often qualifying households for additional support such as free TV licences for over-75s.

## Non-means-tested benefits

Non-means-tested benefits address specific needs or circumstances regardless of household income. These benefits cover additional costs or needs that aren't necessarily related to income levels.

### Disability and health benefits

These benefits provide support for additional costs associated with disability or long-term health conditions.

#### Personal Independence Payment (PIP)

PIP provides support for those with long-term health conditions or disabilities. Calculated in [`pip.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/pip.py), it consists of two components:

- **Daily living component**
  Financial assistance for everyday tasks, awarded at two rates:
  
  - **Standard rate**: For those needing some help with daily activities
  - **Enhanced rate**: For those needing more substantial help

- **Mobility component**
  Support for mobility needs, also awarded at two rates:
  
  - **Standard rate**: For those who have some mobility issues
  - **Enhanced rate**: For those with more severe mobility problems

PIP is based on the impact of a person's condition on their daily life, determined through an assessment process rather than medical diagnosis alone.

#### Disability Living Allowance (DLA)

DLA continues for children and some protected adults. Calculated in [`dla.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/dla.py), it has a similar structure to PIP:

- **Care component**
  Help with personal care needs, awarded at three rates:
  
  - **Lowest rate**: For those needing some help part of the day
  - **Middle rate**: For those needing frequent help during the day or supervision at night
  - **Highest rate**: For those needing help throughout both day and night

- **Mobility component**
  Help with getting around, awarded at two rates:
  
  - **Lower rate**: For those who can walk but need guidance or supervision
  - **Higher rate**: For those who cannot walk or have severe difficulty walking

DLA for children compares the child's needs to those of children of the same age without disabilities.

#### Attendance Allowance

Attendance Allowance provides support for older people with care needs. Calculated in [`attendance_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/attendance_allowance.py), it offers:

- **Lower rate**: For those needing frequent help during the day or supervision at night
- **Higher rate**: For those needing help throughout both day and night, or who are terminally ill

Unlike PIP and DLA, Attendance Allowance has no mobility component, focusing on care needs for those who develop disabilities after reaching pension age.

#### Carer's Allowance

Carer's Allowance provides financial support for those providing substantial care. Calculated in [`carers_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/carers_allowance.py), it provides:

- **Standard rate**: Fixed weekly amount
- **Earnings limit**: Benefit reduced if earnings exceed a threshold
- **Care requirement**: Must provide at least 35 hours of care per week to someone receiving certain disability benefits

Carer's Allowance eligibility depends on the cared-for person receiving a qualifying disability benefit.

#### Industrial Injuries Disablement Benefit (IIDB)

IIDB provides compensation for those injured or made ill through work. Calculated in [`IIDB.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/IIDB.py), it offers:

- **Variable rates**: Amount depends on severity of disablement, assessed on a percentage scale
- **Supplements**: Additional amounts for specific conditions or care needs

This benefit doesn't require proving employer negligence, providing support regardless of how the workplace injury or illness occurred.

### Child benefits

Child benefits provide support for families with children.

#### Child Benefit

Child Benefit provides regular payments for each child. Calculated in [`child_benefit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/child_benefit.py), it offers:

- **First child rate**: Higher amount for eldest or only child
- **Additional child rate**: Lower amount for each subsequent child

The High Income Child Benefit Charge effectively withdraws the benefit through the tax system for individuals with income over £50,000, with complete withdrawal at £60,000.

### Retirement benefits

The UK provides several non-means-tested benefits for older citizens based on contributions and age.

#### State Pension

State Pension provides regular payments based on National Insurance contributions. Calculated in [`state_pension.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/state_pension.py), it has two systems:

- **New State Pension**
  For those reaching State Pension age on or after April 6, 2016.
  
  - **Full rate**: Amount for those with 35 qualifying years of National Insurance
  - **Reduced rate**: Proportionally reduced for those with fewer than 35 qualifying years (minimum 10 years required)

- **Basic State Pension**
  For those who reached State Pension age before April 6, 2016.
  
  - **Full rate**: Amount for those with sufficient qualifying years
  - **Additional State Pension**: Extra amount based on earnings-related contributions
  - **Graduated Retirement Benefit**: For contributions between 1961 and 1975

Both systems use the "triple lock" for annual increases, raising pensions by the highest of inflation, earnings growth, or 2.5%.

#### Winter Fuel Payment

Winter Fuel Payment provides annual support for older people with heating costs. Calculated in [`WFA.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/WFA.py), it offers:

- **Standard rate**: For households with someone of State Pension age
- **Higher rate**: For households with someone aged 80 or over
- **Shared payment**: Split where multiple eligible people share a household

In Scotland, this has been replaced by the Pension Age Winter Heating Payment (PAWHP), calculated in [`pawhp.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/social_security_scotland/pawhp.py).

### Bereavement benefits

Bereavement benefits provide financial support following the death of a partner.

#### Bereavement Support Payment

Bereavement Support Payment provides support following the death of a spouse or civil partner. Calculated in [`BSP.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/BSP.py), it consists of:

- **Initial lump sum**: Larger first payment to cover immediate costs
- **Monthly payments**: Continuing for 18 months to support adjustment
- **Higher rate**: For those with dependent children or who are pregnant

This replaced the previous Widowed Parent's Allowance and Bereavement Allowance, focusing on short-term adjustment rather than ongoing support.

### Employment-related benefits

Employment-related benefits provide support during periods of illness or parental leave.

#### Statutory Sick Pay

Statutory Sick Pay provides income for employees who are too ill to work. Calculated in [`statutory_sick_pay.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/benefits/statutory_sick_pay.py), it offers:

- **Fixed weekly rate**: Standard amount for eligible employees
- **Duration**: Payable for up to 28 weeks
- **Qualifying conditions**: Must be ill for at least 4 consecutive days and have average weekly earnings above a minimum threshold

SSP is paid by employers, forming part of employment rights rather than the traditional benefit system.

#### Statutory Maternity Pay

Statutory Maternity Pay provides income during maternity leave. Calculated in [`statutory_maternity_pay.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/benefits/statutory_maternity_pay.py), it offers:

- **Higher rate**: 90% of average weekly earnings for first 6 weeks
- **Lower rate**: Fixed amount (or 90% of earnings if lower) for remaining 33 weeks
- **Qualifying conditions**: Must have been employed continuously for at least 26 weeks and meet minimum earnings threshold

Similar schemes exist for paternity, adoption, and shared parental leave.

## Childcare support

The UK has several childcare support programmes for different age groups and family circumstances.

### Free childcare entitlements

Free childcare hours are provided through different entitlements based on age and circumstances.

#### Universal Childcare Entitlement

The Universal Childcare Entitlement offers free hours for all children of certain ages. Calculated in [`universal_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/universal_childcare_entitlement/universal_childcare_entitlement.py), it provides:

- **15 hours per week**: During term time (38 weeks per year) for all 3 and 4-year-olds

This is available regardless of parental income or work status.

#### Extended Childcare Entitlement

The Extended Childcare Entitlement provides additional hours for working parents. Calculated in [`extended_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/extended_childcare_entitlement.py), this provides:

- **Additional 15 hours**: On top of universal entitlement (30 hours total) for 3 and 4-year-olds with working parents
- **Income limits**: Parents must each earn equivalent of 16 hours at minimum wage but less than £100,000 per year

#### Targeted Childcare Entitlement

The Targeted Childcare Entitlement provides free childcare for younger children in certain circumstances. Calculated in [`targeted_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/targeted_childcare_entitlement.py), it offers:

- **15 hours per week**: During term time for 2-year-olds in families receiving qualifying benefits or with special circumstances

### Financial support for childcare

Financial assistance for childcare is available through several programmes.

#### Tax-Free Childcare

Tax-Free Childcare provides a government top-up for childcare spending. Calculated in [`tax_free_childcare.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/tax_free_childcare/tax_free_childcare.py), it offers:

- **20% top-up**: Government adds £2 for every £8 parents pay for childcare
- **Annual limits**: Up to £2,000 per child per year (£4,000 for disabled children)
- **Eligibility**: For working parents of children under 12 (or 17 if disabled) who aren't receiving Tax Credits or Universal Credit

#### Study Childcare Entitlement

Study Childcare Entitlement supports parents in education. Calculated in [`study_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/study_childcare_entitlement/study_childcare_entitlement.py), various schemes include:

- **Care to Learn**: For parents under 20 in education
- **Childcare Grant**: For full-time higher education students with children
- **Discretionary Learner Support**: For those in further education facing financial hardship

## Cost of living support

The UK has implemented measures to help households with increased living costs.

### Energy Bills Support

Several programmes have been introduced to help households with energy costs.

#### Energy Bills Credit

The Energy Bills Credit provided discounts on electricity bills. Calculated as part of [`energy_bills_rebate.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/energy_bills_rebate.py), it featured:

- **Fixed amount**: Standard discount applied to all domestic electricity accounts

#### Council Tax Rebate

The Council Tax Rebate provided one-off payments to households in lower Council Tax bands. Calculated as part of [`energy_bills_rebate.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/energy_bills_rebate.py), it provided:

- **Fixed amount**: Standard payment to eligible households
- **Discretionary fund**: Additional support for vulnerable households outside eligible bands

#### Energy Price Cap Subsidy

The Energy Price Cap Subsidy involved government subsidisation of energy prices. Calculated in [`energy_price_cap_subsidy.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/price_cap_subsidy/energy_price_cap_subsidy.py), this involved:

- **Price guarantee**: Government funding to keep consumer prices below market rates
- **Universal application**: Applied to all domestic energy consumers

### Cost of Living Support Payment

Cost of Living Support Payments were provided to specific groups. Calculated in [`cost_of_living_support_payment.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/cost_of_living_support/cost_of_living_support_payment.py), these included:

- **Means-tested benefit payment**: For recipients of Universal Credit, Tax Credits, and other means-tested benefits
- **Disability payment**: For recipients of disability benefits
- **Pensioner payment**: For those eligible for Winter Fuel Payment

PolicyEngine models the current UK benefits system and potential reforms, with benefit impacts presented by income decile. Users can analyse how changes to benefits affect government expenditure and household incomes.