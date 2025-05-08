## Introduction

This report provides an analysis of childcare programmes in the UK, examining how they are modelled in PolicyEngine UK and their distributional impacts across different household types and income groups. Each programme component is linked to its implementation in the codebase, making this report a technical reference for understanding how childcare calculations are performed within the PolicyEngine UK microsimulation model.

The report is organised to explore the landscape of UK childcare programmes. We begin by examining the following programmes: tax-free childcare, the extended childcare entitlement, universal childcare entitlement, targeted childcare entitlement, and care to learn. For each programme, we provide details on eligibility criteria, implementation, and calculation methods. Finally, we explain our calibration methodology to ensure the model accurately reflects real-world participation and expenditure patterns.

## Tax-free childcare

[Tax-free childcare](https://www.gov.uk/tax-free-childcare?step-by-step-nav=d78aeaf6-1747-4d72-9619-f16efb4dd89d) is a government scheme administered by HM Revenue and Customs (HMRC) that provides funding for working families with childcare expenses. For every £8 paid into a childcare account, the government adds £2. The programme allocates up to £2,000 per year for each eligible child. For disabled children, this allocation increases to £4,000 per year.

### Eligibility requirements

#### Age criteria

Standard childcare funding extends until 1 September following [the child's 11th birthday](https://www.legislation.gov.uk/ukpga/2014/28/notes/division/6/4/1). For disabled children who receive disability benefits or are certified as blind/severely sight-impaired, funding continues until 1 September following their [16th birthday](https://www.legislation.gov.uk/ukpga/2014/28/notes/division/6/4/1).

#### Income requirements

The programme considers employment and self-employment income. The maximum adjusted net income allowed is [£100,000](https://www.legislation.gov.uk/uksi/2015/448/regulation/15#commentary-key-e27c923eee152accd495af8425536e29) per year for each partner. Minimum earnings requirements (per 3 months) vary by age:

| Age group            | Minimum earnings |
| :------------------- | :--------------- |
| 21+                  | £2,379           |
| 18-20                | £1,788           |
| Under 18/Apprentices | £1,331           |

#### Work status

Eligible individuals must be either employed, self-employed, or on qualifying leave (sick, annual, or shared parental leave). Non-working partners may still qualify if they receive any of these benefits: incapacity benefit, severe disablement allowance, carer's allowance, or contribution-based employment and support allowance.

#### Programme interactions

Tax-free childcare is compatible with the 15/30 hours free childcare programme, but cannot be [combined](https://www.legislation.gov.uk/ukdsi/2015/9780111127063) with working tax credit, child tax credit, universal credit, and childcare vouchers. In the following sections, we explain how PolicyEngine models the Tax-free childcare programme through parameter definitions and calculations.

### Implementation

The tax-free childcare programme is modelled through several interconnected components:

#### Age determination

We determine which children in the household are age-eligible for the programme, as Tax-free childcare is only available until specific age thresholds which is calculated by [`tax_free_childcare_child_age_eligible.py`](https://github.com/PolicyEngine/policyengine-uk/blob/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/hmrc/tax_free_childcare/conditions/tax_free_childcare_child_age_eligible.py). The following table shows examples of age determination for the programme:

| Child age | Is disabled | Is age eligible |
| :-------- | :---------- | :-------------- |
| 10        | False       | True            |
| 12        | False       | False           |
| 15        | True        | True            |

#### Income assessment

After identifying eligible children, we evaluate if the parents meet the income criteria, examining both minimum and maximum thresholds. The file [`tax_free_childcare_meets_income_requirements.py`](https://github.com/PolicyEngine/policyengine-uk/blob/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/hmrc/tax_free_childcare/conditions/tax_free_childcare_meets_income_requirements.py) calculates annual eligible income from countable sources, minimum threshold based on minimum wage and required hours, and compliance with income limits using adjusted net income. The following table shows examples of income assessment for the programme:

| Adult age | Quarterly earnings | Is over £100k | Is income eligible |
| :-------- | :----------------- | :------------ | :----------------- |
| 22        | £3,000             | False         | True               |
| 19        | £1,500             | False         | False              |
| 35        | £10,000            | True          | False              |

#### Programme compatibility

We check if the household receives any benefits that would make them ineligible for Tax-free childcare. In the file [`tax_free_childcare_program_eligible.py`](https://github.com/PolicyEngine/policyengine-uk/blob/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/hmrc/tax_free_childcare/conditions/tax_free_childcare_program_eligible.py), the system checks the person's benefit unit for disqualifying benefits. The following table shows examples of programme compatibility:

| Receives working tax credit | Receives child tax credit | Receives universal credit | Is eligible for the programme |
| :-------------------------- | :------------------------ | :------------------------ | :---------------------------- |
| False                       | False                     | False                     | True                          |
| True                        | False                     | False                     | False                         |
| False                       | True                      | False                     | False                         |

#### Work status

The programme requires parents to be working, with special provisions for couples where one partner has a disability which is calculated by [`tax_free_childcare_work_condition.py`](https://github.com/PolicyEngine/policyengine-uk/blob/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/hmrc/tax_free_childcare/conditions/tax_free_childcare_work_condition.py). The following table shows examples of work status requirements:

| Family composition | Is partner 1 working | Is partner 2 working | Is partner 2 disabled | Meets work condition |
| :----------------- | :------------------- | :------------------- | :-------------------- | :------------------- |
| Single             | True                 | N/A                  | N/A                   | True                 |
| Single             | False                | N/A                  | N/A                   | False                |
| Couple             | True                 | True                 | False                 | True                 |

#### Contribution calculation

For eligible households, we calculate the government contribution amount in [`tax_free_childcare.py`](https://github.com/PolicyEngine/policyengine-uk/tree/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/hmrc/tax_free_childcare). The following table shows examples of how the government contribution is calculated:

| Is eligible | Is child disabled | Annual childcare expense | Annual government contribution |
| :---------- | :---------------- | :----------------------- | :----------------------------- |
| True        | False             | £8,000                   | £2,000                         |
| True        | True              | £8,000                   | £4,000                         |
| False       | False             | £8,000                   | 0                              |

### Economic analysis

#### Gross salary vs take-home pay at the household level

To show the impact of TFC on household finances, we start with an example of a [single-earner household](https://policyengine.org/uk/household?focus=householdOutput.earnings&reform=73038&region=uk&timePeriod=2025&baseline=76821&household=51616) with one child aged 3. These households become eligible for TFC when earning at least [£9,516 annually](https://www.gov.uk/tax-free-childcare) for those aged 21 or over. The benefit continues until £100,000, where eligibility ends, creating a decline in take-home pay. This creates a divergence between those receiving and not receiving TFC at higher income levels, as shown in the figure below.

![](/images/posts/uk_childcare_report/gross_salary_tfc.png)

This decline at £100,000 creates an earnings dead zone, which is the width of the difference area in the chart where the sudden loss of TFC benefits affects household finances. At this threshold, families experience a cliff effect as they transition from receiving childcare support to losing it entirely.

#### Budgetary and distributional impacts

PolicyEngine projects that the UK government will spend £179.7 billion on Tax-free childcare in 2025, 9.6% less than the government's report of £198.8 billion. Figure below shows the distributional impact of this programme.

![](/images/posts/uk_childcare_report/gross_salary_tfc.png)

We estimate that TFC will benefit primarily upper-middle income households in 2025. The figure below shows gains are concentrated in deciles 8 and 9, while 95% of the population experiences no change in income.

![](/images/posts/uk_childcare_report/gross_salary_tfc.png)

#### Inequality impact

We estimate that TFC increases inequality, raising the Gini index by 0.1% while reducing the top 10% share by 0.3% and the top 1% share by 0.1%. This mixed impact occurs because TFC benefits are concentrated among upper-middle income households due to the work requirement and income limit.

#### Local area analysis

We estimate that TFC will raise net income (by more than 0.1%) on average in 62 Parliamentary constituencies in 2025. The map shows positive impacts distributed across the UK, with income gains of up to £60 per household shown in darker blue.

![](/images/posts/uk_childcare_report/gross_salary_tfc.png)

We estimate that TFC will raise net income on average in 62 parliamentary constituencies in 2025. The impact varies by nation, with 36 constituencies in England, 10 in Wales, and 16 in Northern Ireland seeing income gains, where we consider no change if the relative change is less than 0.1%.

![](/images/posts/uk_childcare_report/gross_salary_tfc.png)

## Extended childcare entitlement

[The extended childcare programme](https://www.gov.uk/check-eligible-free-childcare-if-youre-working?step-by-step-nav=f517cd57-3c18-4bb9-aa8b-1b907e279bf9), administered by the Department for Education (DfE), allocates different levels of hours based on the child's age. Children aged 9 months to 2 years receive 15 hours of free childcare per week, while children aged 3 to 4 years receive 30 hours of free childcare per week.

### Eligibility requirements

#### Work status

Eligible individuals must be either employed or about to start employment. Non-working partners may [qualify](https://www.legislation.gov.uk/uksi/2022/1134/regulation/11A) if they receive: incapacity benefit, severe disablement allowance, carer's allowance, limited capability for work benefit, or contribution-based employment and support allowance.

#### Income requirements

Minimum earnings thresholds (per 3 months) vary by age:

| Age group            | Minimum earnings |
| :------------------- | :--------------- |
| 21+                  | £2,379           |
| 18-20                | £1,788           |
| Under 18/Apprentices | £1,331           |

These thresholds are based on national minimum wage calculations for 16 hours per week. The adjusted net income must not exceed [£100,000](https://www.legislation.gov.uk/uksi/2015/448/regulation/15#commentary-key-e27c923eee152accd495af8425536e29) per year.

### Implementation

The extended childcare entitlement programme is modelled through several interconnected components:

#### Income assessment

We calculate total eligible income from specified sources and apply minimum wage thresholds based on work hours in [`extended_childcare_entitlement_meets_income_requirements.py`](https://github.com/PolicyEngine/policyengine-uk/tree/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/conditions). The following table shows examples of how hours entitlement varies by child age:

| Child age | Is compulsory school age | Weekly hours entitlement |
| :-------- | :----------------------- | :----------------------- |
| 1         | False                    | 15                       |
| 4         | False                    | 30                       |
| 5         | True                     | 0                        |

#### Work condition verification

The work condition is handled by [`extended_childcare_entitlement_work_condition.py`](https://github.com/PolicyEngine/policyengine-uk/tree/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/conditions). This component verifies employment status for all applicants and manages various family situations. For single parents, the system requires them to be working to qualify. For couples, either both partners must be working, or one must be working while the partner qualifies for disability benefits. The following table shows examples of how income eligibility is assessed:

| Adult age | Quarterly earnings | Is over £100k | Meets minimum earnings | Is income eligible |
| :-------- | :----------------- | :------------ | :--------------------- | :----------------- |
| 22        | £2,500             | False         | True                   | True               |
| 19        | £1,500             | False         | False                  | False              |
| 35        | £10,000            | True          | True                   | False              |

#### Entitlement calculation

The final calculations are performed in [`extended_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/tree/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement). This component determines the weekly hours based on the child's age and applies the appropriate funding rates to calculate the total annual entitlement value. The following table shows examples of entitlement calculation based on age and funding rates:

| Child age | Weekly hours | Funding rate | Annual entitlement |
| :-------- | :----------- | :----------- | :----------------- |
| 2         | 15           | £8.28        | £4,719.6           |
| 3         | 30           | £5.88        | £6,703.2           |

### Economic analysis

#### Budgetary and distributional impacts

PolicyEngine projects that the UK government will spend £212.4 billion on extended childcare entitlement in 2025, compared to a government-reported estimate of £198.5 billion.

Extended childcare entitlement increases income for households in deciles 3 to 7, with over 60% of the population receiving an income gain. The figure below shows the distribution of these changes across income groups.

#### Inequality impact

The Gini index decreases by 0.4%, the top 10% income share decreases by 0.6%, and the top 1% share decreases by 0.2%. Changes are largest in the middle of the distribution.

#### Local area analysis

Extended childcare entitlement increases net income (by more than 0.1%) in 202 parliamentary constituencies in 2025. The map below shows the distribution of these changes. Darker blue areas represent income gains of up to £95 per household.

## Universal childcare entitlement

[The universal childcare programme](https://www.gov.uk/help-with-childcare-costs/free-childcare-and-education-for-3-to-4-year-olds?step-by-step-nav=f237ec8e-e82c-4ffa-8fba-2a88a739783b), administered by the Department for Education (DfE), provides free childcare for all 3-4 year olds in England. Each eligible child receives 570 hours of free childcare annually, typically delivered as 15 hours per week across 38 weeks of the year. The free childcare must be delivered through an approved childcare provider. This programme applies to England only.

### Implementation

The universal childcare entitlement programme is implemented through several interconnected components:

#### Eligibility determination

Eligibility determination is implemented in [`universal_childcare_entitlement_eligible.py`](https://github.com/PolicyEngine/policyengine-uk/tree/20ed1a9d77a3307b3e2bc4a0986ec606ab7fead9/policyengine_uk/variables/gov/dfe/universal_childcare_entitlement). This component performs a series of checks to determine if a child qualifies for the universal childcare entitlement. It first verifies residence in England. It then checks that the child meets the minimum age requirement of [3 years](https://www.legislation.gov.uk/uksi/2016/1257/part/4/made). Finally, it ensures the child is below [compulsory school age](https://www.legislation.gov.uk/ukpga/2006/21/section/19). The following table shows examples of eligibility determination based on age criteria:

| Child age | Is under compulsory school age | Meets minimum age | Is age eligible |
| :-------- | :----------------------------- | :---------------- | :-------------- |
| 3         | True                           | True              | True            |
| 4         | True                           | True              | True            |
| 5         | False                          | True              | False           |

### Economic analysis

#### Budgetary and distributional impacts

PolicyEngine projects that the UK government will spend £212.4 billion on universal childcare entitlement in 2025, compared to a government-reported estimate of £198.5 billion.

Universal childcare entitlement increases income for households in deciles 3 to 7, with over 60% of the population receiving an income gain. The figure below shows the distribution of these changes across income groups.

#### Inequality impact

The Gini index decreases by 0.4%, the top 10% income share decreases by 0.6%, and the top 1% share decreases by 0.2%. Changes are largest in the middle of the distribution.

#### Local area analysis

Universal childcare entitlement increases net income (by more than 0.1%) in 202 parliamentary constituencies in 2025. The map below shows the distribution of these changes. Darker blue areas represent income gains of up to £95 per household.

## Targeted childcare entitlement

[The targeted childcare entitlement](https://www.gov.uk/help-with-childcare-costs/free-childcare-2-year-olds-claim-benefits?step-by-step-nav=f237ec8e-e82c-4ffa-8fba-2a88a739783b), administered by the Department for Education (DfE), provides 15 hours of free childcare per week for eligible [2-year-old](https://www.legislation.gov.uk/uksi/2014/2147/regulation/3/made) children. The entitlement totals [570 hours](https://www.legislation.gov.uk/uksi/2014/2147/regulation/4/made) annually and is delivered across 38 weeks.

### Implementation

The targeted childcare entitlement programme is implemented through several interconnected components:

#### Benefit-based eligibility assessment

The benefit-based eligibility assessment is managed in [`targeted_childcare_entitlement_eligible.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/targeted_childcare_entitlement_eligible.py). This component performs two critical checks: first, it confirms that the family resides in England, as the programme is only available to English residents; second, it verifies that the family receives at least one of the qualifying benefits defined in the [`qualifying_benefits.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/dfe/targeted_childcare_entitlement/qualifying_benefits.yaml) parameter file, which includes Income Support, Income-based JSA, Income-related ESA, and Pension Credit (Guarantee Credit).

#### Benefit eligibility

Benefit eligibility is implemented in separate files for different benefit programmes. This component performs two essential checks: it first [verifies](https://www.gov.uk/help-with-childcare-costs/free-childcare-2-year-olds) Universal Credit receipt by confirming that the benefit amount is greater than zero, and then it compares the family's earned income against the £15,400 annual threshold to determine if they qualify based on their income level.

#### Tax Credits criteria

The Tax Credits criteria evaluates eligibility for families receiving tax credits in two steps. First, it [checks](https://www.gov.uk/help-with-childcare-costs/free-childcare-2-year-olds) whether the family is receiving either Child Tax Credit or Working Tax Credit (or both), as either type of tax credit can potentially qualify them for the targeted childcare entitlement. Second, it compares the family's applicable income against the £16,190 annual threshold to determine if they meet the income requirements for this support. The following table demonstrates how tax credit criteria are assessed for targeted childcare entitlement:

| Tax Credit type    | Credit amount | Applicable income | Below £16,190 threshold | Meets TC criteria |
| :----------------- | :------------ | :---------------- | :---------------------- | :---------------- |
| Child Tax Credit   | £2,000        | £15,000           | Yes                     | Yes               |
| Working Tax Credit | £1,000        | £16,500           | No                      | No                |
| Both               | £3,000        | £14,000           | Yes                     | Yes               |
| None               | £0            | £10,000           | Yes                     | No                |

#### Entitlement calculation

The entitlement calculation is performed in [`targeted_childcare_entitlement.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/targeted_childcare_entitlement.py). This component first checks if the child's age is 2 years. For eligible children, it then applies the entitlement hours (570 annually, delivered as 15 hours per week for 38 weeks) defined in the parameters. Finally, it multiplies these hours by the appropriate funding rate based on the child's age, which is £8.28 per hour for 2-year-olds in 2024, to calculate the total monetary value of the entitlement. The following table shows how the annual entitlement is calculated based on eligibility, age, and rates:

| Child age | Eligible | Hours entitlement | Hourly rate | Annual entitlement |
| :-------- | :------- | :---------------- | :---------- | :----------------- |
| 1         | No       | 0                 | £11.22      | £0                 |
| 2         | Yes      | 570               | £8.28       | £4,719.60          |
| 3         | No       | 0                 | £5.88       | £0                 |

### Economic analysis

#### Budgetary and distributional impacts

PolicyEngine projects that the UK government will spend £212.4 billion on targeted childcare entitlement in 2025, compared to a government-reported estimate of £198.5 billion.

Targeted childcare entitlement increases income for households in deciles 3 to 7, with over 60% of the population receiving an income gain. The figure below shows the distribution of these changes across income groups.

#### Inequality impact

The Gini index decreases by 0.4%, the top 10% income share decreases by 0.6%, and the top 1% share decreases by 0.2%. Changes are largest in the middle of the distribution.

#### Local area analysis

Targeted childcare entitlement increases net income (by more than 0.1%) in 202 parliamentary constituencies in 2025. The map below shows the distribution of these changes. Darker blue areas represent income gains of up to £95 per household.

## Care to learn

[The care to learn](https://www.gov.uk/care-to-learn) scheme, administered by the Department for Education (DfE), provides funding for young parents under 20 who continue their education while caring for children. This programme covers childcare costs while the parent is in education or training. The entitlement amounts is [£180](https://researchbriefings.files.parliament.uk/documents/CBP-8054/CBP-8054.pdf#page=43) per week for childcare costs outside London and [£195](https://researchbriefings.files.parliament.uk/documents/CBP-8054/CBP-8054.pdf#page=43) per week for childcare costs in London.

### Implementation

The care to learn programme is modelled through several interconnected components:

#### Eligibility determination

Eligibility determination is implemented in `care_to_learn_eligible.py`. This component conducts a comprehensive assessment of several eligibility factors. The age requirements check ensures that the applicant's age is below the maximum threshold ([under 20 years](https://publications.parliament.uk/pa/cm200809/cmbills/055/en/09055x-c.htm#:~:text=160,childcare%20when%20securing%20these%20grants)).

For educational status, it ensures the person is not in higher education and confirms the person is not an apprentice. Finally, it verifies geographic eligibility by checking residence in England. The following table shows examples of eligibility determination for care to learn:

| Person age | Has children | Education type    | In England | Is eligible |
| ---------- | ------------ | ----------------- | ---------- | ----------- |
| 18         | No           | Further education | Yes        | No          |
| 18         | Yes          | Higher education  | Yes        | No          |
| 19         | Yes          | Apprenticeship    | Yes        | No          |

#### Entitlement calculation

The entitlement calculation is handled by `care_to_learn.py`. The calculation uses parameters to determine if the person lives in London and then applies the appropriate weekly rate based on their location. The following table shows the annual entitlement based on location:

| Location       | Weekly rate | Annual entitlement (52 weeks) |
| -------------- | ----------- | ----------------------------- |
| London         | £195        | £10,140                       |
| Outside London | £180        | £9,360                        |

## Data calibration

To align our model with real-world participation and expenditure patterns, we calibrate our enhanced FRS (Family Resources Survey) dataset by adding take-up rates to match official spending and caseload statistics for childcare programmes.

### Target data

Our calibration targets both aggregate spending and caseload figures for each programme for 2024:

| Programme           | Spending target (£ billions) | Caseload target (thousands) |
| :------------------ | :--------------------------- | :-------------------------- |
| Tax-free childcare  | 0.60                         | 660                         |
| Extended childcare  | 2.50                         | 740                         |
| Targeted childcare  | 0.60                         | 130                         |
| Universal childcare | 1.70                         | 490                         |

These targets are derived from official government data sources:

- The UK Government provides Tax-free childcare statistics through [Tax-free childcare statistics (September 2024)](https://www.gov.uk/government/statistics/tax-free-childcare-statistics-september-2024).
- The Department for Education publishes funding allocations for other childcare programmes in the [DfE national funding allocations (2024-2025)](https://skillsfunding.service.gov.uk/view-latest-funding/national-funding-allocations/DSG/2024-to-2025).

### Optimisation process

The calibration uses an optimisation process to find take-up rates that match our targets and is handled by the `takeup_rate.py` script. We define an objective function that measures the distance between simulated and target values for both spending and caseload metrics. Then we find the take-up rates that minimise this distance function, calibrating our model to match official statistics.

### Integration into the UK model

The optimised take-up rates are integrated into the Enhanced FRS dataset class in `enhanced_frs.py`. The current values used in the model are:

| Programme           | Take-up Rate |
| :------------------ | :----------- |
| Tax-free childcare  | 0.60         |
| Extended childcare  | 0.53         |
| Targeted childcare  | 0.63         |
| Universal childcare | 0.45         |

These rates determine which benefit units claim each childcare programme, producing representative aggregate statistics.
