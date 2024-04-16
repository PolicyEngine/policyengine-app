_We’re grateful to the [**Gerald Huff Fund for Humanity**](https://fundforhumanity.org/), which funded the development of this PolicyEngine feature and report._

Today we’ve added New Mexico income taxes to PolicyEngine, enabling any New Mexican to estimate their own income taxes, as well as to design a state tax policy reform and see how it affects their household and the state overall. Here we describe New Mexico’s tax system and show it in action.

## New Mexico’s income tax

New Mexico uses a progressive tax system on individual income, meaning the tax rate increases with higher income, peaking at 5.9%. To calculate this rate, New Mexico subtracts certain deductions and exemptions from gross income, such as for dependents, medical expenses, Social Security benefits, low- and middle-income earners, blind and aged filers, and people who are 100 years or older. New Mexico additionally follows the federal rules for standard and itemized deductions.

New Mexico also provides several rebates and refundable income tax credits:

- **Earned Income Tax Credit:** 25% of the federal EITC, also including filers age 18–24 without children

- **Child and Dependent Care Credit:** Up to 40% of the federal CDCC

- **Child Tax Credit:** Up to $600 per child

- **Unreimbursed Medical Care Expense Credit:** Up to $2,800 per filer

- **Low income comprehensive tax rebate:** Up to $730 per filer

- **Property tax rebate:** Up to $250 per filer

- **Rebates for 2021 only:** Up to $2,500 per filer ($500 main, $1,000 additional, $1,000 supplemental)

PolicyEngine now models these rules from 2021 to 2023 (as available).

## Example household

To illustrate the New Mexico income tax, consider a single parent with two children, paying $1,000 per month in rent and $500 per month in childcare. If they earn $30,000, they will pay no state income tax and [receive $2,127 from four refundable tax credits](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=33113).

![](https://cdn-images-1.medium.com/max/2948/0*GfIZU3Qdmhw82mfM)

This filer would have negative [net state tax liability](https://policyengine.org/us/household?focus=householdOutput.earnings&household=33113) if they earn $50,000 or less.

![](https://cdn-images-1.medium.com/max/3104/0*l58k4e3xc5HUKbBZ)

To show the effect of the state’s income taxes on marginal tax rates, we can abolish New Mexico income taxes (separately as before refundable credits and refundable credits) and swap the baseline and reform. From there, view the [marginal tax rate chart](https://policyengine.org/us/household?focus=householdOutput.mtr&household=33113&region=us&timePeriod=2023&baseline=22176&reform=2) and select _Difference_.

![](https://cdn-images-1.medium.com/max/3076/0*wC8StujJOgS34Kj4)

As the filer earns up to $15,000 or so, their state tax credits and rebates phase in, reducing their marginal tax rate by about 10 percentage points. As they phase out up to $55,000 income, the state creates additional marginal tax rates of 10 to 15 percentage points, before it stabilizes around the statutory rate of 5 to 6 percent.

## Aggregate impact of New Mexico state income taxes

Simulating over the 2021 Current Population Survey, and reversing the abolition of New Mexico taxes, we can estimate the impact of New Mexico’s state income taxes. PolicyEngine estimates that the full system:

- [Raises $1.3 billion per year](https://policyengine.org/us/policy?focus=policyOutput.netIncome&reform=2&region=nm&timePeriod=2023&baseline=22000)

- [Benefits 41% of New Mexicans](https://policyengine.org/us/policy?focus=policyOutput.intraDecileImpact&household=32970&region=nm&timePeriod=2023&baseline=21992&reform=2), including 96% of those in the bottom income decile and 0% in the top income decile

- Lowers the Gini index of [income inequality](https://policyengine.org/us/policy?focus=policyOutput.inequalityImpact&household=32970&region=nm&timePeriod=2023&baseline=21992&reform=2) by 3.6%

- Has no discernible impact on [poverty](https://policyengine.org/us/policy?focus=policyOutput.povertyImpact&reform=2&region=nm&timePeriod=2023&baseline=22000) or [cliffs](https://policyengine.org/us/policy?focus=policyOutput.cliffImpact&reform=2&region=nm&timePeriod=2023&baseline=22000)

![](https://cdn-images-1.medium.com/max/3064/1*mT4JTaCi2c6PT1eIG69epg.png)

These estimates may not align with official government figures, given inaccuracies and gaps in the Current Population Survey. For instance, the CPS does not capture incomes above $1 million, which could deflate tax revenues, though it also does not capture rent or property tax, which could work in the opposite direction via New Mexico’s property tax rebate. We are currently working to [fill these gaps with modern data analytics](https://policyengine.org/us/blog/enhancing-the-current-population-survey-for-policy-analysis).

## Try it out

Delve into the updated tax policies in New Mexico on PolicyEngine and discover how these changes could alter your tax situation or impact the wider community. Our dedicated team constantly improves the platform to provide the most comprehensive tool for tax policy analysis. Don’t miss out on future updates and novel features!

And remember, PolicyEngine is completely free and open source. That means you can easily share your findings with others or even contribute to our project. We encourage you to share your insights, spark discussions, or give feedback on your experience. Your participation helps make PolicyEngine even better. Let’s work together to make tax policy understanding accessible to all!
