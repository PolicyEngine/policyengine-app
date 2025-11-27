_Image credit: qualitycompanyformations_

## Introduction

Salary sacrifice arrangements allow employees to exchange part of their salary for non-cash benefits before tax and National Insurance are calculated. The Financial Times [reported](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95) that the government is considering capping the amount that can be put into pension salary sacrifice schemes at £2,000 annually without paying National Insurance. Above this threshold, standard NI rates would apply. UK government guidance [defines](https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye) salary sacrifice as an arrangement where an employee gives up the right to part of their cash pay, usually in return for a non-cash benefit.

HMRC's research [shows](https://www.gov.uk/government/publications/understanding-the-attitudes-and-behaviours-of-employers-towards-salary-sacrifice-for-pensions/understanding-the-attitudes-and-behaviours-of-employers-towards-salary-sacrifice-for-pensions) that salary sacrifice is widely used when it is available: in 2019, 30% of private-sector employees and 9% of public-sector employees in organisations offering salary sacrifice contributed to pensions through these arrangements.

The government announced this policy in the Autumn Budget 2025. The OBR estimates the cap would raise £4.9 billion (static) or £4.7 billion (post-behavioural) in 2029-30, when the policy takes effect. This analysis examines the cap's impact on households, government revenue, and income distribution.

### Data

This analysis uses salary sacrifice pension contribution data from the Family Resources Survey (FRS), enhanced through calibration to match administrative totals. PolicyEngine's microsimulation identifies 4.9 million workers with salary sacrifice pension contributions (15% of employees). Among these contributors, average annual contributions are £4,631. Total salary sacrifice contributions amount to £22.7 billion, consistent with external estimates based on NI relief costs. For more information on PolicyEngine's data methodology, see the [PolicyEngine UK data documentation](https://policyengine.github.io/policyengine-uk-data/).

### Assumptions

This analysis models the cap's effects under the following assumptions:

1. **Continued pension saving**: Employees currently using salary sacrifice maintain their desire to contribute the same total amount to pensions.

2. **Contribution redirection**: Contributions exceeding the £2,000 cap shift from salary sacrifice to regular employee pension contributions (which receive income tax relief but not National Insurance relief).

3. **Broad-based employer response**: Employers spread the increased National Insurance costs across all employees, maintaining cost neutrality. This is more defensible than assuming employers can target only affected workers, since if employers could identify and reduce compensation for specific individuals, those workers could simply restructure their benefits to avoid the targeting. With £13.8 billion in excess contributions generating £2.1 billion in additional employer NI (at 15%), this translates to a 0.16% reduction in employment income across all workers.

4. **No changes to other benefits**: Employer pension matching rates and other employment benefits remain unchanged.

## Household impact

Under current law, when an employee makes pension contributions through salary sacrifice, both the employee and employer save on National Insurance contributions on the sacrificed amount. As an example, consider an employee earning £50,000 who contributes £5,000 to their pension through salary sacrifice. The table below shows the tax calculation:

**Table 1: Current system - £50,000 earner with £5,000 pension contribution via salary sacrifice**

| Component                           | Amount      | Calculation               |
| :---------------------------------- | :---------- | :------------------------ |
| Gross salary                        | £50,000     |                           |
| Salary sacrifice                    | £5,000      |                           |
| Taxable salary                      | £45,000     | £50,000 - £5,000          |
| Employee NI (8% on £12,570-£45,000) | £2,594      | 8% × (£45,000 - £12,570)  |
| Employer NI (15% on above £9,100)   | £5,385      | 15% × (£45,000 - £9,100)  |
| Income tax (20% on £12,570-£45,000) | £6,486      | 20% × (£45,000 - £12,570) |
| **Take-home pay**                   | **£35,920** | £45,000 - £2,594 - £6,486 |

### Impact of the proposed cap

With the cap in place, an employee previously contributing £5,000 via salary sacrifice faces the following changes under the broad-based employer response: the £3,000 excess becomes taxable income, and the employee redirects it to regular employee pension contributions. The employer spreads its increased NI costs (0.058% of payroll) across all workers, resulting in a £29 reduction for this worker. The employee now pays NI on the £3,000 excess (£240 at 8%), reducing take-home pay from £35,920 to £35,651.

**Table 2: With £2,000 cap - £50,000 earner with broad-based employer response**

| Component                           | Amount      | Calculation                        |
| :---------------------------------- | :---------- | :--------------------------------- |
| Original gross salary               | £50,000     |                                    |
| Broad-based haircut (0.058%)        | £29         | 0.058% × £50,000                   |
| Adjusted gross salary               | £49,971     | £50,000 - £29                      |
| Salary sacrifice                    | £2,000      | Capped at £2,000                   |
| Taxable salary                      | £47,971     | £49,971 - £2,000                   |
| Employee pension contribution       | £3,000      | Full excess redirected             |
| Taxable income (for IT)             | £44,971     | £47,971 - £3,000                   |
| Employee NI (8% on £12,570-£47,971) | £2,832      | 8% × (£47,971 - £12,570)           |
| Income tax (20% on £12,570-£44,971) | £6,480      | 20% × (£44,971 - £12,570)          |
| **Take-home pay**                   | **£35,659** | £47,971 - £3,000 - £2,832 - £6,480 |
| **Total pension contribution**      | **£5,000**  | £2,000 + £3,000                    |

Under the broad-based model, the affected worker maintains their full £5,000 pension contribution, but pays £240 more in employee NI on the excess. Unaffected workers see a £17-£58 annual reduction depending on their salary.

## Government revenue impact

PolicyEngine's microsimulation estimates that 4.9 million people make pension contributions through salary sacrifice arrangements. Of these, 3.3 million (68%) would exceed the £2,000 cap.

Under baseline policy, total salary sacrifice contributions amount to £22.7 billion. With the cap in place, £13.8 billion in excess contributions would shift to regular employee pension contributions.

The policy is scheduled to take effect from April 2029. PolicyEngine estimates the cap would raise **£3.3 billion** in 2029-30 under our baseline assumptions (employers spread costs, employees maintain pension contributions), compared to the OBR's estimate of £4.9 billion (static) or £4.7 billion (post-behavioural). Revenue estimates vary significantly based on behavioural assumptions:

<iframe src="https://policyengine.github.io/uk-salary-sacrifice-analysis/revenue-by-year.html" width="100%" height="550" frameborder="0"></iframe>

PolicyEngine's baseline estimate of £3.3 billion is 32% below the OBR's static estimate of £4.9 billion. This reflects differences in behavioural assumptions: PolicyEngine's baseline assumes employees maintain their pension contributions (shifting excess to regular schemes) and employers spread costs across all workers, while the OBR's post-behavioural estimate of £4.7 billion may assume greater take-up of taxable cash.

## Distributional analysis

The cap is progressive: lower-income households are largely unaffected while higher earners bear the burden. This reflects both the concentration of salary sacrifice usage among higher earners and the tendency for high earners to contribute amounts exceeding the £2,000 cap.

<iframe src="https://policyengine.github.io/uk-salary-sacrifice-analysis/distributional-impact.html" width="100%" height="550" frameborder="0"></iframe>

Under the baseline scenario (employers spread costs, employees maintain pension contributions), the top income decile experiences an average 0.65% reduction in disposable income (£200/year), while lower deciles see minimal impact. Toggle between scenarios to see how different behavioural assumptions affect the distributional pattern.

## Conclusion

The cap would raise approximately £3.3 billion annually when it takes effect in April 2029, affecting 3.3 million workers who currently contribute above £2,000. This compares to the OBR's estimates of £4.9 billion (static) or £4.7 billion (post-behavioural).

The impact is progressive: higher earners experience larger reductions while lower-income households are largely unaffected.

## Appendix: Data construction methodology

The Family Resources Survey (FRS) does not directly identify which pension contributions are made via salary sacrifice arrangements. To construct this variable, we use the following methodology:

### Imputation approach

1. **Identify salary sacrifice respondents**: The FRS asks a subset of respondents whether their pension contributions are made through salary sacrifice. We use these responses as a training set.

2. **Predict salary sacrifice usage**: Using the subset of respondents who answered the salary sacrifice question, we train a model to predict salary sacrifice usage based on observable characteristics including employment income, pension contribution amounts, employer type, and other demographic factors.

3. **Impute for non-respondents**: We apply this model to impute salary sacrifice status for respondents who were not asked the question, generating a complete picture of salary sacrifice usage across the population.

### Calibration

After imputation, we calibrate the dataset using PolicyEngine's standard [reweighting methodology](https://policyengine.github.io/policyengine-uk-data/) to match administrative totals. This salary sacrifice-enhanced dataset is available alongside PolicyEngine's standard UK datasets for researchers who wish to analyse salary sacrifice reforms.

### Limitations

The imputation approach assumes that salary sacrifice usage patterns among non-respondents are similar to those among respondents with similar characteristics. If employers systematically offer salary sacrifice to workers with unobservable characteristics that differ from our predictors, our estimates may be biased. The difference between PolicyEngine's estimates and OBR figures likely reflects differences in behavioural assumptions about employer and employee responses to the cap.
