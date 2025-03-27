This post provides an overview of how benefits are modelled in PolicyEngine UK. It details both existing benefits in the UK welfare system and how they are simulated within our platform. Each benefit component is linked to its specific implementation in the codebase, making this a technical reference for understanding how benefit calculations are performed in the PolicyEngine UK microsimulation model.

This post is structured by benefit types to better illustrate how different elements of the system work together. We begin with means-tested benefits—Universal Credit, legacy benefits, and pension-age benefits—which provide support based on household income and savings. We then explore non-means-tested benefits that are provided based on specific circumstances regardless of income, such as disability benefits and child benefits. Finally, we examine childcare support programmes and cost of living measures implemented to address specific economic challenges in the UK.

## Means-tested benefits

Means-tested benefits form the core safety net of the UK welfare system, providing targeted support to those on low incomes. These benefits are awarded based on household income, savings, and circumstances, with payments reducing as income increases. The means testing creates a progressive system where those with the lowest incomes receive the most support.

### Universal Credit

Universal Credit represents the most significant welfare reform in recent decades, introduced to replace six legacy benefits for working-age people. Implemented in PolicyEngine through [`universal_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/universal_credit.py), this integrated benefit combines support for basic living costs, housing, children, disabilities, and work incentives into a single monthly payment.

- **Standard allowance**
  This forms the basic element of Universal Credit that all eligible claimants receive, varying by age and household composition.
  
  - **Single claimant**: Amount for single adults, with higher rates for those 25 and over, calculated as part of [`uc_standard_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/standard_allowance/uc_standard_allowance.py).
  - **Joint claimants**: Amount for couples, with higher rates for couples where either is 25 or over, also calculated in [`uc_standard_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/standard_allowance/uc_standard_allowance.py).

- **Additional elements**
  Beyond the standard allowance, Universal Credit provides extra amounts based on household circumstances, recognising additional needs for certain groups.
  
  - **Child element**: Additional amount for children, with higher rates for first/only child born before April 2017, and limitations based on the two-child limit policy, calculated in [`uc_child_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/child_element/uc_child_element.py).
  - **Disabled child addition**: Extra amount for children with disabilities, with standard and enhanced rates, included in [`uc_disability_elements.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/disability_element/uc_disability_elements.py).
  - **Limited capability for work element**: For adults with health conditions affecting ability to work, calculated as part of [`uc_disability_elements.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/disability_element/uc_disability_elements.py).
  - **Carer element**: For those providing significant care (35+ hours per week) to someone receiving specific disability benefits, calculated in [`uc_carer_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/carer_element/uc_carer_element.py).
  - **Childcare costs element**: Covers up to 85% of eligible childcare costs for working parents, up to maximum amounts, calculated in [`uc_childcare_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/childcare_element/uc_childcare_element.py).

- **Housing costs element**
  Housing support is a crucial component of Universal Credit, with amounts varying by tenure type and location to reflect diverse housing markets across the UK.
  
  - **Rented accommodation**: Covers eligible rent up to Local Housing Allowance rates for private renters or actual rent for social housing tenants, with deductions for non-dependants, calculated in [`uc_housing_costs_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/housing_costs_element/uc_housing_costs_element.py).
  - **Mortgage interest**: Support for homeowners in the form of loans rather than payments, also calculated in [`uc_housing_costs_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/housing_costs_element/uc_housing_costs_element.py).

- **Work allowances and taper rate**
  A key feature of Universal Credit is its design to improve work incentives through work allowances and a single taper rate.
  
  - **Work allowances**: Amounts that can be earned before Universal Credit starts to be reduced, with higher allowances for those with children or limited capability for work, calculated in [`uc_work_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/work_allowance/uc_work_allowance.py).
  - **Taper rate**: Percentage reduction in Universal Credit for each pound earned above work allowances, implemented in [`uc_income_reduction.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/income/uc_income_reduction.py).

- **Benefit cap**
  As a fiscal control measure, Universal Credit is subject to the benefit cap, which limits the total benefits a household can receive.
  
  - The cap has higher limits in London and exemptions for working households or those with disabilities, applied in [`universal_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/universal_credit.py).

### Legacy benefits

While Universal Credit continues its rollout, many households still receive "legacy benefits"—the six benefits that Universal Credit is replacing. These remain significant parts of the welfare landscape due to transitional protection and ongoing migration.

#### Housing Benefit

For those not receiving Universal Credit, Housing Benefit provides essential support with rental costs, calculated in [`housing_benefit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/housing_benefit.py).

The amount is determined through a complex calculation involving:
- **Eligible rent**: Maximum rent considered, limited by Local Housing Allowance for private renters
- **Applicable amount**: Amount deemed necessary for basic living costs based on household circumstances
- **Income assessment**: Benefit reduced by a percentage of income above the applicable amount
- **Non-dependant deductions**: Reductions for other adults in the household who are expected to contribute

Unlike Universal Credit's integrated approach, Housing Benefit addresses only housing costs, with separate benefits needed for other living expenses.

#### Tax Credits

Tax Credits have been a major component of in-work support and assistance for families with children since their introduction in the early 2000s. The system, calculated in [`tax_credits.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/tax_credits.py), consists of two elements:

- **Child Tax Credit (CTC)**
  A crucial source of support for families with children regardless of employment status.
  
  - **Family element**: Basic amount for families with at least one child
  - **Child element**: Amount for each child, subject to the two-child limit for children born after April 2017
  - **Disability elements**: Additional amounts for disabled children

- **Working Tax Credit (WTC)**
  Targeted support for those in low-paid work, with various elements reflecting different needs.
  
  - **Basic element**: Amount for any eligible working household
  - **Couple/lone parent element**: Additional amount based on family structure
  - **30-hour element**: Extra for those working at least 30 hours weekly
  - **Disability element**: Additional amount for workers with disabilities
  - **Severe disability element**: Extra for those with severe disabilities
  - **Childcare element**: Up to 70% of eligible childcare costs

Both CTC and WTC employ a unique tapering system where WTC is reduced first as income rises, followed by CTC, creating a progressive withdrawal as family income increases.

#### Income-based Jobseeker's Allowance (JSA)

Income-based JSA provides financial support for unemployed people actively seeking work, calculated in [`JSA_income.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/JSA_income.py).

The benefit incorporates:
- **Personal allowances**: Basic amounts based on age and whether claiming as single person or couple
- **Premiums**: Additional amounts for specific circumstances (family, disability, etc.)
- **Income assessment**: Benefit reduced based on income and savings

Unlike Universal Credit, JSA maintains a stronger conditionality regime with claimants needing to attend regular meetings and demonstrate active job seeking behaviour.

#### Income-related Employment and Support Allowance (ESA)

For those unable to work due to illness or disability, income-related ESA offers financial support, calculated in [`ESA_income.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/ESA_income.py).

The benefit structure includes:
- **Personal allowances**: Basic amounts similar to JSA
- **Components**: Additional payments depending on whether in work-related activity group or support group
- **Premiums**: Extra amounts for specific circumstances

The Work Capability Assessment determines which group claimants are placed in, with the support group receiving higher payments due to more severe limitations on ability to work.

#### Income Support

As one of the oldest means-tested benefits, Income Support provides a general safety net for those not expected to seek work, calculated in [`income_support.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/income_support.py).

Key features include:
- **Personal allowances**: Basic amounts based on age and circumstances
- **Premiums**: Additional amounts for specific circumstances
- **Income assessment**: Benefit reduced based on income and savings

Income Support primarily serves lone parents with young children, carers, and some people with disabilities who are not expected to look for work.

### Pension-age benefits

The means-tested benefit system differentiates between working-age and pension-age households, with specific benefits for older citizens.

#### Pension Credit

Pension Credit ensures a minimum income level for pensioners, addressing poverty among older citizens. Calculated in [`pension_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/pension_credit.py), it comprises two distinct elements:

- **Guarantee Credit**
  The primary component that tops up weekly income to a guaranteed minimum level.
  
  - **Standard minimum guarantee**: Basic amount for singles or couples
  - **Additional amounts**: Extra for severe disability, caring responsibilities, and housing costs
  - **Income assessment**: Benefit equals the difference between the applicable guarantee and assessed income

- **Savings Credit**
  An additional element rewarding those who have saved for retirement, only available to those who reached State Pension age before April 2016.
  
  - **Maximum amount**: Cap on potential Savings Credit
  - **Threshold**: Minimum qualifying income
  - **Calculation**: Percentage of income between threshold and a higher limit, less a reduction based on income above the guarantee level

Pension Credit serves as a gateway to other benefits for pensioners, with receipt often qualifying households for additional support such as free TV licences for over-75s and Cold Weather Payments.

## Non-means-tested benefits

Moving away from income-based support, non-means-tested benefits address specific needs or circumstances regardless of household income. These benefits recognise additional costs or needs that aren't necessarily correlated with income levels.

### Disability and health benefits

These benefits acknowledge the additional costs associated with disability or long-term health conditions, which exist regardless of income level.

#### Personal Independence Payment (PIP)

Introduced to replace Disability Living Allowance for working-age people, PIP provides support for those with long-term health conditions or disabilities. Calculated in [`pip.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/pip.py), it consists of two components:

- **Daily living component**
  Financial assistance for everyday tasks, awarded at two rates:
  
  - **Standard rate**: For those needing some help with daily activities
  - **Enhanced rate**: For those needing more substantial help

- **Mobility component**
  Support for mobility needs, also awarded at two rates:
  
  - **Standard rate**: For those who have some mobility issues
  - **Enhanced rate**: For those with more severe mobility problems

Unlike means-tested benefits, PIP is based entirely on the impact of a person's condition on their daily life, determined through a structured assessment process rather than medical diagnosis alone.

#### Disability Living Allowance (DLA)

While PIP has replaced DLA for most working-age claimants, DLA continues for children and some protected adults. Calculated in [`dla.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/dla.py), it has a similar but not identical structure to PIP:

- **Care component**
  Help with personal care needs, awarded at three rates:
  
  - **Lowest rate**: For those needing some help part of the day
  - **Middle rate**: For those needing frequent help during the day or supervision at night
  - **Highest rate**: For those needing help throughout both day and night

- **Mobility component**
  Help with getting around, awarded at two rates:
  
  - **Lower rate**: For those who can walk but need guidance or supervision
  - **Higher rate**: For those who cannot walk or have severe difficulty walking

DLA for children focuses on comparing the child's needs to those of children of the same age without disabilities, acknowledging developmental differences.

#### Attendance Allowance

For older people with care needs, Attendance Allowance provides support without a mobility component. Calculated in [`attendance_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/attendance_allowance.py), it offers:

- **Lower rate**: For those needing frequent help during the day or supervision at night
- **Higher rate**: For those needing help throughout both day and night, or who are terminally ill

Unlike PIP and DLA, Attendance Allowance has no mobility component, focusing exclusively on care needs for those who develop disabilities after reaching pension age.

#### Carer's Allowance

Recognising the vital role of unpaid carers, Carer's Allowance provides financial support for those providing substantial care. Calculated in [`carers_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/carers_allowance.py), it provides:

- **Standard rate**: Fixed weekly amount
- **Earnings limit**: Benefit reduced if earnings exceed a threshold
- **Care requirement**: Must provide at least 35 hours of care per week to someone receiving certain disability benefits

Carer's Allowance creates a linked system with disability benefits, where eligibility depends on the cared-for person receiving a qualifying disability benefit.

#### Industrial Injuries Disablement Benefit (IIDB)

Acknowledging workplace-related disabilities, IIDB provides compensation for those injured or made ill through work. Calculated in [`IIDB.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/IIDB.py), it offers:

- **Variable rates**: Amount depends on severity of disablement, assessed on a percentage scale
- **Supplements**: Additional amounts for specific conditions or care needs

This no-fault benefit doesn't require proving employer negligence, providing support regardless of how the workplace injury or illness occurred.

### Child benefits

Support for families with children represents a significant element of the UK's benefit system, with universal elements alongside means-tested components.

#### Child Benefit

As the main universal benefit for families, Child Benefit provides regular payments for each child. Calculated in [`child_benefit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/child_benefit.py), it offers:

- **First child rate**: Higher amount for eldest or only child
- **Additional child rate**: Lower amount for each subsequent child

The universality of Child Benefit has been modified by the High Income Child Benefit Charge, which effectively withdraws the benefit through the tax system for individuals with income over £50,000, with complete withdrawal at £60,000. This creates a hybrid system that maintains universal payment while recouping costs from higher earners.

### Retirement benefits

Beyond means-tested support like Pension Credit, the UK provides non-means-tested benefits for older citizens based on contributions and age.

#### State Pension

As the foundational retirement benefit, State Pension provides regular payments based on National Insurance contributions. Calculated in [`state_pension.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/state_pension.py), it has two systems depending on when a person reached State Pension age:

- **New State Pension**
  For those reaching State Pension age on or after April 6, 2016, using a simplified flat-rate approach.
  
  - **Full rate**: Amount for those with 35 qualifying years of National Insurance
  - **Reduced rate**: Proportionally reduced for those with fewer than 35 qualifying years (minimum 10 years required)

- **Basic State Pension**
  For those who reached State Pension age before April 6, 2016, using the older multi-component system.
  
  - **Full rate**: Amount for those with sufficient qualifying years
  - **Additional State Pension**: Extra amount based on earnings-related contributions
  - **Graduated Retirement Benefit**: For contributions between 1961 and 1975

Both systems use the "triple lock" for annual increases, raising pensions by the highest of inflation, earnings growth, or 2.5%.

#### Winter Fuel Payment

Addressing the specific heating needs of older people, Winter Fuel Payment provides annual support. Calculated in [`WFA.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/WFA.py), it offers:

- **Standard rate**: For households with someone of State Pension age
- **Higher rate**: For households with someone aged 80 or over
- **Shared payment**: Split where multiple eligible people share a household

In Scotland, this system has been replaced by the Pension Age Winter Heating Payment (PAWHP), calculated in [`pawhp.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/social_security_scotland/pawhp.py), demonstrating the increasing divergence in benefit systems across UK nations.

### Bereavement benefits

The loss of a partner can create significant financial hardship, which bereavement benefits aim to mitigate.

#### Bereavement Support Payment

Modernising previous bereavement benefits, Bereavement Support Payment provides short-term support following the death of a spouse or civil partner. Calculated in [`BSP.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/BSP.py), it consists of:

- **Initial lump sum**: Larger first payment to cover immediate costs
- **Monthly payments**: Continuing for 18 months to support adjustment
- **Higher rate**: For those with dependent children or who are pregnant

This time-limited approach replaced the previous Widowed Parent's Allowance and Bereavement Allowance, shifting focus to short-term adjustment rather than ongoing support.

### Employment-related benefits

Some benefits are specifically tied to employment status, providing support during periods of illness or parental leave.

#### Statutory Sick Pay

When employees are too ill to work, Statutory Sick Pay provides a basic income. Calculated in [`statutory_sick_pay.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/benefits/statutory_sick_pay.py), it offers:

- **Fixed weekly rate**: Standard amount for eligible employees
- **Duration**: Payable for up to 28 weeks
- **Qualifying conditions**: Must be ill for at least 4 consecutive days and have average weekly earnings above a minimum threshold

Unlike many benefits, SSP is paid by employers (although they can reclaim some costs), forming part of employment rights rather than the traditional benefit system.

#### Statutory Maternity Pay

Supporting women during pregnancy and early motherhood, Statutory Maternity Pay provides income during maternity leave. Calculated in [`statutory_maternity_pay.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/benefits/statutory_maternity_pay.py), it offers:

- **Higher rate**: 90% of average weekly earnings for first 6 weeks
- **Lower rate**: Fixed amount (or 90% of earnings if lower) for remaining 33 weeks
- **Qualifying conditions**: Must have been employed continuously for at least 26 weeks and meet minimum earnings threshold

Similar schemes exist for paternity, adoption, and shared parental leave, creating a comprehensive system of support for working parents.

## Childcare support

The high cost of childcare in the UK has led to the development of various support programmes, both universal and targeted, to help families manage these expenses while maintaining employment.

### Free childcare entitlements

Direct provision of free childcare hours forms a significant part of the UK's childcare strategy, with different entitlements based on age and circumstances.

#### Universal Childcare Entitlement

Providing a foundation of early education and childcare for all, the Universal Childcare Entitlement offers free hours regardless of parental income. Calculated in [`universal_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/universal_childcare_entitlement/universal_childcare_entitlement.py), it provides:

- **15 hours per week**: During term time (38 weeks per year) for all 3 and 4-year-olds

This universal offer recognises the value of early education for all children, regardless of family circumstances.

#### Extended Childcare Entitlement

Building on the universal offer, working parents can access additional hours. Calculated in [`extended_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/extended_childcare_entitlement.py), this provides:

- **Additional 15 hours**: On top of universal entitlement (30 hours total) for 3 and 4-year-olds with working parents
- **Income limits**: Parents must each earn equivalent of 16 hours at minimum wage but less than £100,000 per year

This policy aims to support parental employment by addressing the childcare barrier that can prevent parents, particularly mothers, from working.

#### Targeted Childcare Entitlement

Recognising the importance of early intervention for disadvantaged children, the Targeted Childcare Entitlement extends free childcare to younger children in low-income families. Calculated in [`targeted_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/targeted_childcare_entitlement.py), it offers:

- **15 hours per week**: During term time for 2-year-olds in families receiving qualifying benefits or with special circumstances

This targeted approach aims to narrow the developmental gap that can emerge between children from different socioeconomic backgrounds before formal schooling begins.

### Financial support for childcare

Beyond direct provision of free hours, financial assistance helps parents with the cost of childcare, particularly outside the free entitlement periods or ages.

#### Tax-Free Childcare

A relatively new addition to the childcare support landscape, Tax-Free Childcare provides a government top-up for childcare spending. Calculated in [`tax_free_childcare.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/tax_free_childcare/tax_free_childcare.py), it offers:

- **20% top-up**: Government adds £2 for every £8 parents pay for childcare
- **Annual limits**: Up to £2,000 per child per year (£4,000 for disabled children)
- **Eligibility**: For working parents of children under 12 (or 17 if disabled) who aren't receiving Tax Credits or Universal Credit

This scheme replaced the previous Childcare Vouchers system, aiming to provide more equitable support regardless of employer participation.

#### Study Childcare Entitlement

Supporting parents in education addresses both immediate needs and long-term poverty prevention. Calculated in [`study_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/study_childcare_entitlement/study_childcare_entitlement.py), various schemes include:

- **Care to Learn**: For parents under 20 in education
- **Childcare Grant**: For full-time higher education students with children
- **Discretionary Learner Support**: For those in further education facing financial hardship

These targeted programmes recognise the specific barriers to education faced by parents, particularly young parents and those seeking to improve their qualifications.

## Cost of living support

Recent economic challenges, particularly around energy costs, have led to the introduction of temporary measures to help households manage increased living costs.

### Energy Bills Support

With dramatic increases in energy prices, various programmes have been introduced to help households manage these essential costs.

#### Energy Bills Credit

Providing universal support regardless of income, the Energy Bills Credit offered direct discounts on electricity bills. Calculated as part of [`energy_bills_rebate.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/energy_bills_rebate.py), it featured:

- **Fixed amount**: Standard discount applied to all domestic electricity accounts

This universal approach ensured rapid delivery of support without the administrative burden of means testing.

#### Council Tax Rebate

Using the existing Council Tax system to target support, this one-off payment went to households in lower Council Tax bands. Calculated as part of [`energy_bills_rebate.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/energy_bills_rebate.py), it provided:

- **Fixed amount**: Standard payment to eligible households
- **Discretionary fund**: Additional support for vulnerable households outside eligible bands

This approach used property values as a proxy for household means, delivering support primarily to lower and middle-income areas.

#### Energy Price Cap Subsidy

Perhaps the most significant intervention was direct government subsidisation of energy prices. Calculated in [`energy_price_cap_subsidy.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/price_cap_subsidy/energy_price_cap_subsidy.py), this involved:

- **Price guarantee**: Government funding to keep consumer prices below market rates
- **Universal application**: Applied to all domestic energy consumers

This unprecedented intervention demonstrated the flexibility of welfare policy to respond to exceptional circumstances, though its universal nature meant significant costs to the public purse.

### Cost of Living Support Payment

Targeting support more precisely than universal energy measures, direct Cost of Living Support Payments went to vulnerable groups. Calculated in [`cost_of_living_support_payment.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/cost_of_living_support/cost_of_living_support_payment.py), these included:

- **Means-tested benefit payment**: For recipients of Universal Credit, Tax Credits, and other means-tested benefits
- **Disability payment**: For recipients of disability benefits
- **Pensioner payment**: For those eligible for Winter Fuel Payment

This multi-faceted approach recognised that different vulnerable groups face different challenges during cost of living crises, with some experiencing higher energy costs due to disability or age.

---

PolicyEngine models the current UK benefits system and potential reforms, with benefit impacts presented by income decile. Users can analyse how changes to benefits affect government expenditure and household incomes across the distribution, facilitating evidence-based policy development and advocacy.