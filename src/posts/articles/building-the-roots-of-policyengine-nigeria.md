In February, at Code for Africa’s [Hacky New Year](https://democracylab.org/events/hackynewyear2023) event, our team tackled the task of developing a prototype for [PolicyEngine Nigeria](http://policyengine.org/ng).

In the US, UK, and Canada, users can visit [policyengine.org](http://policyengine.org/) and input their household details or policy reforms to calculate the effects of taxes and benefits using the rules applicable to their jurisdiction. Thanks to our global, open-source code infrastructure and our modern, standardised framework, expanding functionality for countries like Nigeria primarily involves understanding and implementing legislation without reworking the user interface.

In this blog post, we provide a step-by-step tutorial on using the app and showcase its features.

## Walkthrough

First, to see the impact of tax-benefit policy on a household, choose “Calculate my household income” from the homepage ([policyengine.org/ng](http://policyengine.org/ng)) to start the questionnaire.

Next, provide information about your marital status, number of children, their ages, and employment incomes.

After entering your data, the app shows a breakdown of your disposable income, including market income, taxes, and benefits. We currently only model Nigeria’s personal income tax.

- Market income: Total income from non-government sources (e.g., employment or dividend income).

- Tax: Government programs reducing your net income, such as personal income tax. PolicyEngine models Nigeria’s core rate structure, consolidated relief allowance, tax-exempt threshold, and minimum tax.

- Benefits: Government payments or subsidies received, like child benefits or tax credits. PolicyEngine Nigeria does not currently model any benefits.

Consider an [individual with ₦1,000,000 earnings](https://policyengine.org/ng/household?focus=householdOutput.netIncome&household=30071) ($2,170 USD, roughly Nigeria’s GDP per capita). We calculate that they would owe ₦54,000 in tax.

![](https://cdn-images-1.medium.com/max/2880/1*5eZFVJ3FzpYAs1tm1plkzQ.png)

You can also view how your household’s income would change with [varying income levels](https://policyengine.org/ng/household?focus=householdOutput.earnings&household=30071). Select “Varying your earnings” in the bottom left to display a chart showing how different outcomes (e.g., net income or tax) change with income.

![](https://cdn-images-1.medium.com/max/2952/1*vVrsRE_X7Av6b8WhJ3PVxg.png)

[Marginal tax rates](https://policyengine.org/ng/household?focus=householdOutput.mtr&household=30071), or the percentage of each marginal income increase taken by the government through taxes or withdrawn benefits, are often important to households. Select this option in the bottom left to see a chart displaying both your current marginal tax rate and how it varies with income. Nigeria’s tax system applies mostly monotonically increasing marginal tax rates, except for a spike around ₦30,000 due to a tax-free allowance.

![](https://cdn-images-1.medium.com/max/2928/1*yFs72UiWOqai3SnxdO5noQ.png)

From here, you can edit your household to view different results. Alternatively, you can explore how policy reform affects the results above.

## Altering the rules

Choose “Create a policy reform” to enter the policy view of the app, where you can examine all the parameters used to calculate tax-benefit outcomes.

![](https://cdn-images-1.medium.com/max/2868/1*KhRcSC7c1h-Hwpa-9EhrQw.png)

Let’s test a sample reform: go to Tax, choose the Consolidated relief allowance (similar to the standard deduction in the US or the personal allowance in the UK), and [set this parameter to zero](https://policyengine.org/ng/policy?focus=gov.tax.consolidated_relief_allowance.flat&household=30071&region=ng&timePeriod=2023&baseline=4&reform=10868).

![](https://cdn-images-1.medium.com/max/2920/1*upfrLm5jqoGzeFdf39cjEw.png)

Now click “Calculate my household impact.” You will return to the household page, where you can observe the [₦30,000 tax increase](https://policyengine.org/ng/household?focus=householdOutput.netIncome&household=30071&region=ng&timePeriod=2023&baseline=4&reform=10868) for the household we initially created. Go back to the [earnings variation](https://policyengine.org/ng/household?focus=householdOutput.earnings&household=30071&region=ng&timePeriod=2023&baseline=4&reform=10868) or [marginal tax rate](https://policyengine.org/ng/household?focus=householdOutput.mtr&household=30071&region=ng&timePeriod=2023&baseline=4&reform=10868) charts to see how the policy reform’s impact changes with different income levels.

![](https://cdn-images-1.medium.com/max/2884/1*bBgewQXh0sTsi-dkUQuzkg.png)

## Give it a try

You can follow the same examples at [policyengine.org/ng](http://policyengine.org/ng) or experiment with your own household or reform ideas. We’re excited to expand PolicyEngine to more countries and compute public policy impact worldwide. If you or your organisation have questions or collaboration suggestions, please don’t hesitate to contact us.

Thanks to Sakina Salem for research assistance during the hackathon.
