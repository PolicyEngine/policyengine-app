## Introduction

This post provides an overview of how benefits are modelled in PolicyEngine UK. It details both existing benefits in the UK welfare system and their specific implementation within our microsimulation platform. Each benefit component is linked to its specific implementation in the codebase, making this post a technical reference for understanding how benefits calculations are performed in the PolicyEngine UK microsimulation model.

The post is organised into two main sections. First, we examine means-tested benefits (Universal Credit, legacy benefits, and pension-age benefits), which provide support based on household income and savings. Second, we explore non-means-tested benefits (disability benefits, child benefits, and retirement benefits) that are provided based on specific circumstances regardless of income.

The table below summarises key metrics for each benefit in the UK system, showing PolicyEngine's implementation and the specific values for 2024-25.

| Programme | PolicyEngine implementation | Key rates (2024-25) |
|---------|---------------------------|-------------------|
| Universal Credit | Calculated using maximum entitlement minus income reduction, with benefit cap applied | Standard allowance: £311.68/month (single under 25), £393.45/month (single over 25), £489.23/month (couple both under 25), £617.60/month (couple with at least one over 25); Work allowance: £404/month (with housing), £673/month (without housing); Taper rate: 55% |
| Pension Credit | Sum of Guarantee Credit and Savings Credit, with 70% takeup rate | Minimum guarantee: £218.15/week (singles), £332.95/week (couples); Savings Credit threshold: £189.80/week (singles), £301.22/week (couples) |
| Personal Independence Payment | Sum of daily living and mobility components | Daily living component: £108.55/week (enhanced), £72.65/week (standard); Mobility component: £75.75/week (enhanced), £28.70/week (standard) |
| Disability Living Allowance | Sum of self-care and mobility components | Self-care component: £108.55/week (higher), £72.65/week (middle), £28.70/week (lower); Mobility component: £75.75/week (higher), £28.70/week (lower) |
| Attendance Allowance | Weekly rate multiplied by weeks in year | Higher rate: £108.55/week, Lower rate: £72.65/week |
| Tax-Free Childcare | 20% contribution of childcare costs | Maximum contribution: £2,000/year per standard child, £4,000/year per disabled child |
| Universal Childcare Entitlement | Free childcare hours × funding rate | 570 hours per year for 3-4 year olds; Funding rate (3+): £5.88/hour |
| Extended Childcare Entitlement | Weekly hours × funding rate × weeks | Hours: 15-30 hours/week depending on age; Funding rates: £11.22/hour (under 2), £8.28/hour (age 2), £5.88/hour (age 3+) |

## Means-tested benefits

Means-tested benefits provide targeted support to those on low incomes. These benefits are awarded based on household income, savings, and circumstances, with payments reducing as income increases. The term "means-testing" refers to the assessment of a claimant's financial resources to determine eligibility and payment amount. Our implementation of means-tested benefits accounts for the interaction between different income sources, capital limits, and household composition.

### Universal Credit

Universal Credit is a means-tested benefit introduced to replace six legacy benefits for working-age people, implemented in the [`universal_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/universal_credit.py) file. This consolidated approach aims to simplify the benefits system and improve work incentives by providing a single payment that adjusts as income changes.

Our calculation methodology first determines a household's maximum entitlement by adding together various elements based on household circumstances, then reduces this amount based on income (applying the taper rate) and finally applies a benefit cap if necessary. This progressive reduction, known as the "taper," is designed to ensure that claimants are always financially better off when increasing their earnings.

- **Standard allowance**
  This forms the basic element of Universal Credit that all eligible claimants receive, calculated in the [`uc_standard_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/standard_allowance/uc_standard_allowance.py) file. The amount varies by age and whether claiming as an individual or couple. For 2024-25, a single person under 25 receives £311.68 per month, while a single person over 25 receives £393.45 per month. Couples where both members are under 25 receive £489.23 per month, while couples with at least one member over 25 receive £617.60 per month. The methodology identifies the claimant type (single or couple, age categories) and assigns the appropriate monthly rate, which is then annualised for our calculations.

- **Child element**
  Additional amounts for children are calculated in the [`uc_child_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/child_element/uc_child_element.py) file. The first child born before April 2017 receives a higher amount of £333.33 per month, while other children receive £287.92 per month. The two-child limit, introduced in April 2017, restricts support to the first two children in most cases, unless exemptions apply (such as multiple births or non-consensual conception). Our methodology identifies each eligible child in the household, determines whether the higher rate applies, applies the two-child limit where relevant, and sums the resulting entitlements.

- **Housing costs element**
  Housing support is calculated in the [`uc_housing_costs_element.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/housing_costs_element/uc_housing_costs_element.py) file. For social housing tenants, the eligible housing costs typically match the full rent. For private rentals, the amount is capped by Local Housing Allowance (LHA) rates for the area, which vary based on location and property size requirements. The final amount is reduced by any non-dependent deductions for other adults in the household. Our calculation applies the appropriate caps based on household composition and geographical location, simulating the real-world application of LHA rates and non-dependent deductions.

- **Work allowances and taper rate**
  These determine how Universal Credit is reduced as earnings increase. Work allowances are calculated in the [`uc_work_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/work_allowance/uc_work_allowance.py) file. For 2024-25, the work allowance is £404 per month for those with housing support and £673 per month for those without housing support included in their Universal Credit. The taper rate (implemented in [`uc_income_reduction.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/income/uc_income_reduction.py)) is set at 55%, meaning Universal Credit is reduced by 55 pence for each pound earned above any applicable work allowance. Our methodology first determines if the household qualifies for a work allowance (based on having children or limited capability for work), applies the appropriate allowance, and then calculates the reduction using the taper rate applied to net income after the work allowance.

- **Benefit cap**
  A maximum limit on total benefit income is applied to Universal Credit, with higher rates for London residents and exemptions for households with significant earnings or disability benefits. The benefit cap methodology checks whether the household is exempt (based on earnings or qualifying benefits) and, if not, applies the appropriate cap based on household composition and location.

### Legacy benefits

While Universal Credit continues its rollout, many households still receive "legacy benefits" that Universal Credit is replacing. These remain in place due to transitional protection and ongoing migration. Legacy benefits are a set of six different benefits that served specific needs before Universal Credit was introduced. Our model accounts for the phased transition between these systems, allowing users to analyse scenarios under different implementation timelines.

#### Housing Benefit

Housing Benefit supports rental costs for those not receiving Universal Credit, calculated in the [`housing_benefit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/housing_benefit.py) file. The amount is based on eligible rent (capped by Local Housing Allowance for private rentals), reduced by 65% of income above the "applicable amount" (the amount deemed necessary for basic living costs). Further reductions apply for non-dependent adults living in the household. Different parameters apply for working-age versus pension-age claimants.

Our methodology calculates Housing Benefit by:
1. Determining the eligible rent (applying the LHA cap for private rentals)
2. Calculating the applicable amount (the minimum income level for basic needs)
3. Assessing the household's applicable income
4. Reducing the benefit by 65% of any income above the applicable amount
5. Applying non-dependent deductions where relevant

The applicable income is calculated in [`housing_benefit_applicable_income.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/applicable_income/housing_benefit_applicable_income.py), with disregards for certain income types. These disregards include partial earnings disregards (higher for lone parents), full disregards for specific benefits like Personal Independence Payment, and partial disregards for pension contributions and childcare costs.

Non-dependent deductions are calculated in [`housing_benefit_non_dep_deductions.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/non_dep_deduction/housing_benefit_non_dep_deductions.py). A non-dependent is an adult who lives with the claimant (such as an adult child or parent) and is expected to contribute to housing costs. The deduction amount varies based on the non-dependent's income and circumstances.

#### Tax Credits

Tax Credits provide support to families with children and working people on low incomes, calculated in the [`tax_credits.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/tax_credits.py) file. The system consists of two elements: Child Tax Credit and Working Tax Credit, which can be claimed separately or together depending on circumstances.

Our methodology for Tax Credits:
1. Calculates the maximum entitlement for both Child Tax Credit and Working Tax Credit
2. Determines the relevant income threshold (different for those claiming both credits versus Child Tax Credit only)
3. Reduces the entitlement by 41% of income above the threshold, withdrawing Working Tax Credit first, then Child Tax Credit
4. Applies a minimum payment threshold (awards below this amount are not paid)

- **Child Tax Credit (CTC)**
  Support for families with children regardless of employment status. Components include a family element (£570 per year) and a child element (£3,455 per year per child), subject to the two-child limit. Additional amounts are paid for disabled children. The family element is a flat rate paid to families with at least one qualifying child, while the child element is paid for each eligible child (subject to the two-child limit for children born after April 2017).

- **Working Tax Credit (WTC)**
  Support for those in low-paid work. Components include a basic element (£2,435 per year), additional elements for couples or lone parents, a 30-hour element for those working at least 30 hours weekly, and a childcare element covering up to 70% of eligible costs. The basic element is paid to everyone who qualifies for Working Tax Credit, with additional amounts based on household composition and working hours. The childcare element supports working parents with childcare costs up to a maximum of £175 per week for one child or £300 per week for two or more children.

Tax Credits are reduced at a rate of 41% when income exceeds the threshold (£7,455 for WTC+CTC claims and £18,725 for CTC-only claims in 2024-25). This means that for every £1 of income above the threshold, Tax Credits are reduced by 41p.

### Pension-age benefits

#### Pension Credit

Pension Credit ensures a minimum income level for pensioners, calculated in the [`pension_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/pension_credit.py) file. The benefit consists of two parts: Guarantee Credit and Savings Credit. A takeup probability of 70% is applied to model the fact that not all eligible pensioners claim the benefit. Takeup rates represent the proportion of eligible individuals who actually claim a benefit, and our model incorporates this real-world factor to produce more accurate aggregate estimates.

Our methodology for Pension Credit:
1. Determines if the household contains at least one person of State Pension age
2. Calculates Guarantee Credit entitlement
3. Calculates Savings Credit entitlement (if applicable)
4. Combines the two components
5. Applies the takeup probability to model real-world claiming behaviour

- **Guarantee Credit**
  Tops up weekly income to a guaranteed minimum level, calculated in [`guarantee_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/guarantee_credit/guarantee_credit.py). For 2024-25, the standard minimum guarantee is £218.15 per week for singles and £332.95 per week for couples. Additional amounts are added for severe disability, caring responsibilities, and dependent children. The methodology calculates the difference between the applicable minimum guarantee (including any additional amounts) and the claimant's assessed income, paying the shortfall as Guarantee Credit.

- **Savings Credit**
  Provides extra support for those with modest savings or income above the basic State Pension level, calculated in [`savings_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/savings_credit/savings_credit.py). It's only available to those who reached State Pension age before April 2016, reflecting a policy change that restricted this component for newer pensioners. For 2024-25, the income threshold is £189.80 per week for singles and £301.22 per week for couples. The amount increases at a rate of 60% of income above the threshold, then decreases at 40% of income above the minimum guarantee level.

  The calculation methodology:
  1. Checks if the claimant reached State Pension age before April 2016
  2. Determines the relevant income for Savings Credit calculation (excluding certain income types)
  3. Calculates the maximum possible Savings Credit as 60% of the difference between the minimum guarantee and the threshold
  4. Awards Savings Credit at 60% of income above the threshold, up to the maximum
  5. Reduces the award by 40% of income above the minimum guarantee

## Non-means-tested benefits

Non-means-tested benefits address specific needs or circumstances regardless of household income. Unlike means-tested benefits, these payments do not reduce as income increases, making them particularly important for those with additional costs related to disability, childcare, or other circumstances. Our methodology for non-means-tested benefits focuses on identifying eligibility based on specific characteristics or needs rather than financial resources.

### Disability and health benefits

Disability and health benefits provide support for the additional costs associated with disability or long-term health conditions. These benefits recognise that disabled people often face higher living costs for specialised equipment, care, and travel. Our model identifies eligibility based on reported disability status and severity from survey data, alongside information about care needs and mobility restrictions.

#### Personal Independence Payment (PIP)

PIP supports those with long-term health conditions or disabilities, calculated in the [`pip.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/pip.py) file. The benefit has two components: daily living and mobility. Each component can be paid at a standard or enhanced rate depending on needs assessment. PIP replaced Disability Living Allowance for working-age adults and uses a points-based assessment system to determine eligibility and rate.

Our PIP methodology:
1. Identifies individuals with disabilities in the dataset
2. Assigns daily living and mobility components based on reported needs
3. Applies the appropriate rate for each component
4. Combines the components to determine the total PIP award

The daily living component is calculated in [`daily_living.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/daily_living.py) and the mobility component in [`mobility.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/mobility.py). For 2024-25, the daily living component is £108.55 per week at the enhanced rate and £72.65 per week at the standard rate. The mobility component is £75.75 per week at the enhanced rate and £28.70 per week at the standard rate. The annual amount is calculated by multiplying the weekly rates by 52.

#### Disability Living Allowance (DLA)

DLA continues for children and some protected adults, calculated in the [`dla.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/dla.py) file. Similar to PIP, it has two components: self-care (equivalent to PIP's daily living) and mobility. DLA for children remains in place, while most working-age adults have been migrated to PIP. Some adults who received DLA before PIP was introduced remain on the benefit under transitional protection.

Our DLA methodology:
1. Identifies eligible children and protected adults in the dataset
2. Assigns self-care component based on care needs (with three possible rates)
3. Assigns mobility component based on mobility needs (with two possible rates)
4. Combines the components to determine the total DLA award

The self-care component is calculated in [`self_care.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/self_care.py) and the mobility component in [`mobility.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/mobility.py). For 2024-25, the self-care component has three possible rates: higher (£108.55 per week), middle (£72.65 per week), and lower (£28.70 per week). The mobility component has two rates: higher (£75.75 per week) and lower (£28.70 per week). The annual amount is calculated by multiplying the weekly rates by 52.

#### Attendance Allowance

Attendance Allowance supports older people with care needs, calculated in the [`attendance_allowance.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/attendance_allowance.py) file. It's paid at two rates depending on the level of care needed. Attendance Allowance is available to those who became disabled after reaching State Pension age, as they cannot claim PIP or DLA for the first time after this age.

Our Attendance Allowance methodology:
1. Identifies individuals over State Pension age with care needs
2. Determines the appropriate rate based on daytime and/or night-time care requirements
3. Assigns the weekly rate and annualises the amount

For 2024-25, the higher rate is £108.55 per week and the lower rate is £72.65 per week. The higher rate applies to those needing care both day and night, or those who are terminally ill. The lower rate applies to those needing care either during the day or at night. The annual amount is calculated by multiplying the weekly rate by 52.

All three disability benefits are uprated annually using the Consumer Price Index (CPI). This ensures that benefit rates maintain their real value against inflation, protecting the purchasing power of disabled recipients.

### Child benefits

#### Child Benefit

Child Benefit provides regular payments for families with children, calculated in the [`child_benefit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/child_benefit.py) file. It is paid for children under 16, or under 20 if they remain in approved education or training. Unlike means-tested benefits, Child Benefit is paid at a flat rate regardless of income, though high earners may have part or all of it reclaimed through the tax system.

Our Child Benefit methodology:
1. Identifies eligible children in each household
2. Applies the higher rate for the eldest (or only) eligible child
3. Applies the standard rate for additional eligible children
4. Calculates the High Income Child Benefit Charge (HITC) if applicable
5. Determines the net Child Benefit after the HITC

For 2024-25, the rate is £26.04 per week for the first child and £17.24 per week for each additional child. These weekly rates are multiplied by 52 to produce annual amounts.

The High Income Child Benefit Charge (HITC) effectively withdraws this benefit when individual income exceeds £50,000, with complete withdrawal at £60,000. This charge is calculated as part of the income tax system in [`child_benefit_hitc.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/charges/child_benefit_hitc.py) and increases proportionally with income within this range. For each £100 of income above £50,000, 1% of the Child Benefit is reclaimed through the tax system.

### Retirement benefits

#### State Pension

State Pension provides regular payments based on National Insurance contributions, calculated in the [`state_pension.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/state_pension.py) file. Unlike means-tested benefits for pensioners like Pension Credit, State Pension is based on National Insurance contribution history rather than current financial circumstances.

Our State Pension methodology:
1. Determines if the individual has reached State Pension age
2. Identifies which State Pension system applies (pre or post April 2016)
3. Calculates entitlement based on National Insurance contributions
4. Applies the appropriate rates based on the system

There are two systems depending on when the person reached State Pension age:

- **New State Pension**
  For those reaching State Pension age on or after April 6, 2016, implemented in the [`new_state_pension`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/dwp/state_pension/new_state_pension/) parameters. The full rate for 2024-25 is £221.20 per week, reduced proportionally for those with fewer than 35 qualifying years of National Insurance contributions (minimum 10 years required). Our calculation multiplies the full rate by the fraction of qualifying years divided by 35, with a minimum threshold of 10 qualifying years.

- **Basic State Pension**
  For those who reached State Pension age before April 6, 2016, implemented in the [`basic_state_pension`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/dwp/state_pension/basic_state_pension/) parameters. The full rate for 2024-25 is £169.50 per week, plus Additional State Pension based on earnings-related contributions. The Basic State Pension requires 30 qualifying years for a full pension, with a proportional reduction for those with fewer years.

Both systems use the "triple lock" for annual increases, defined in [`triple_lock`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/dwp/state_pension/triple_lock/), raising pensions by the highest of inflation, earnings growth, or the fixed rate of 2.5%. Our model implements this by comparing the three potential uprating mechanisms and applying the highest increase each year.

#### Winter Fuel Payment

Winter Fuel Payment provides annual support for older people with heating costs, calculated in the [`WFA.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/WFA.py) file. It is an annual tax-free payment made to eligible pensioners to help with winter heating costs.

Our Winter Fuel Payment methodology:
1. Identifies households with members of eligible age
2. Determines the appropriate payment rate based on age and household composition
3. Assigns the annual payment amount

For 2024-25, households with someone aged 66-79 receive £200, while households with someone aged 80 or over receive £300. In multi-pensioner households, the payment is allocated to ensure no household gets more than the maximum entitlement.

In Scotland, this has been replaced by the Pension Age Winter Heating Payment (PAWHP), calculated in the [`pawhp.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/social_security_scotland/pawhp.py) file, with similar rate structure. This reflects the devolution of certain benefits to the Scottish government, which has implemented its own version of the payment with similar eligibility criteria and rates.

### Childcare support

The UK offers multiple childcare support programmes, each targeting different age groups and family circumstances. These initiatives aim to make childcare more affordable and support parental employment. Our methodology models the interaction between these various support mechanisms, accounting for different eligibility criteria and payment structures.

#### Tax-Free Childcare

Tax-Free Childcare provides a government top-up for childcare spending, calculated in the [`tax_free_childcare.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/tax_free_childcare/tax_free_childcare.py) file. This scheme operates through an online account where parents pay in money for childcare, and the government adds a top-up.

Our Tax-Free Childcare methodology:
1. Identifies households with eligible children
2. Checks income conditions and work requirements for parents
3. Calculates childcare expenses and the corresponding government contribution
4. Applies the maximum contribution cap per child

The government contributes 20% of childcare costs, effectively adding £2 for every £8 spent by parents. The maximum annual contribution is £2,000 per standard child and £4,000 per disabled child. This 20% rate effectively provides relief equivalent to the basic rate of income tax.

Eligibility criteria include age requirements (children under 12, or under 17 if disabled), income conditions (quarterly income above minimum wage × 16 hours/week × 13 weeks but below £100,000 per year adjusted net income), and work requirements (both parents must generally be working, with exceptions for disability). These conditions are implemented in [`tax_free_childcare_meets_income_requirements.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/tax_free_childcare/conditions/tax_free_childcare_meets_income_requirements.py) and [`tax_free_childcare_work_condition.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/tax_free_childcare/conditions/tax_free_childcare_work_condition.py).

#### Universal Childcare Entitlement

The Universal Childcare Entitlement offers free childcare hours for all children aged 3-4 years old, calculated in the [`universal_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/universal_childcare_entitlement/universal_childcare_entitlement.py) file. This is available to all children regardless of parental income or work status.

Our Universal Childcare Entitlement methodology:
1. Identifies children aged 3-4 years old
2. Applies the standard entitlement of 570 hours per year
3. Calculates the monetary value using the applicable funding rate

The entitlement provides 570 hours per year (equivalent to 15 hours per week over 38 weeks), funded at a rate of £5.88 per hour for children aged 3 and over (as of April 2024). This produces an annual value of £3,351.60 per eligible child, which is counted as income-in-kind rather than cash support.

Eligibility is determined in [`universal_childcare_entitlement_eligible.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/universal_childcare_entitlement/universal_childcare_entitlement_eligible.py), which identifies children in the qualifying age range.

#### Extended Childcare Entitlement

The Extended Childcare Entitlement provides additional hours for working parents, calculated in the [`extended_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/extended_childcare_entitlement.py) file. This extends the universal offer for working parents, providing an additional 15 hours per week for 3-4 year olds and, from 2024, beginning to extend provision to younger children.

Our Extended Childcare Entitlement methodology:
1. Identifies children in eligible age ranges
2. Checks parental work and income conditions
3. Applies the appropriate hourly entitlement based on child age
4. Calculates the monetary value using age-specific funding rates

The entitlement varies by child age:
- 9-23 months: 15 hours/week (increasing to 30 hours in 2026)
- 2 years: 15 hours/week (increasing to 30 hours in 2026)
- 3-4 years: 30 hours/week (which includes the universal 15 hours plus an additional 15 hours)

The funding rates vary by age: £11.22 per hour for children under 2, £8.28 per hour for 2-year-olds, and £5.88 per hour for children aged 3 and over (as of April 2024). These different rates reflect the higher staffing requirements and costs for caring for younger children. Eligibility includes income and work conditions similar to Tax-Free Childcare, implemented in [`extended_childcare_entitlement_meets_income_requirements.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/conditions/extended_childcare_entitlement_meets_income_requirements.py) and [`extended_childcare_entitlement_work_condition.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/conditions/extended_childcare_entitlement_work_condition.py).

#### Targeted Childcare Entitlement

The Targeted Childcare Entitlement provides free childcare for 2-year-olds in lower income families, calculated in the [`targeted_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/targeted_childcare_entitlement.py) file. This extends provision to younger children in households with lower incomes, supporting child development and parental employment opportunities.

Our Targeted Childcare Entitlement methodology:
1. Identifies children aged 2 years old
2. Checks if the family receives qualifying benefits or meets income criteria
3. Applies the standard entitlement of 570 hours per year
4. Calculates the monetary value using the 2-year-old funding rate

It offers 570 hours per year (15 hours per week over 38 weeks), funded at a rate of £8.28 per hour (as of April 2024). This produces an annual value of £4,719.60 per eligible child.

Eligibility includes receiving qualifying benefits or meeting income criteria: income below £16,190 per year for Tax Credit recipients (implemented in [`meets_tax_credit_criteria_for_targeted_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/meets_tax_credit_criteria_for_targeted_childcare_entitlement.py)) or earned income below £15,400 per year for Universal Credit recipients (implemented in [`meets_universal_credit_criteria_for_targeted_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/meets_universal_credit_criteria_for_targeted_childcare_entitlement.py)).

### Cost of living support

In response to rising inflation and energy costs, the UK government introduced several temporary measures to support households. These one-off or time-limited measures were targeted at different groups, with particular focus on those on lower incomes and vulnerable households. Our model includes these temporary interventions, allowing analysis of their distributional impact during the period they were active.

#### Energy Bills Support

Several programmes have been introduced to help households with energy costs:

- **Energy Bills Credit**: Provided £400 per household as monthly reductions on electricity bills from October 2022 to March 2023, calculated in the [`energy_bills_credit.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/energy_bills_credit.py) file. This universal support was applied automatically to all domestic electricity accounts, spread across six monthly instalments.

- **Council Tax Rebate**: Provided £150 per household in Council Tax bands A-D in England (with equivalent schemes in devolved nations), calculated in the [`council_tax_rebate.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/council_tax_rebate.py) file. This targeted support to properties in lower-value bands, as these households were deemed more likely to be affected by rising energy costs.

- **Energy Price Guarantee**: Limited average household energy bills to £2,500 per year for a typical household (later adjusted), implemented in the [`energy_price_cap_subsidy.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/price_cap_subsidy/energy_price_cap_subsidy.py) file. This intervention directly limited unit prices for gas and electricity, with the government subsidising energy suppliers for the difference between the guaranteed price and market rates.

#### Cost of Living Support Payment

One-off payments for vulnerable groups, calculated in the [`cost_of_living_support_payment.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/cost_of_living_support/cost_of_living_support_payment.py) file. For 2022-23, this included:
- £650 for recipients of means-tested benefits (paid in two instalments)
- £150 for recipients of disability benefits
- £300 for those eligible for Winter Fuel Payment

These payments were made automatically to eligible recipients without requiring an application, targeting support to those on lower incomes and with additional needs who were likely to be more vulnerable to rising living costs.

PolicyEngine models the current UK benefits system and potential reforms, enabling users to analyse how changes to benefits affect government expenditure and household incomes across different demographic groups. The detailed implementation of each benefit component allows for precise modelling of existing policies and exploration of hypothetical reforms, supporting evidence-based policy development and evaluation.