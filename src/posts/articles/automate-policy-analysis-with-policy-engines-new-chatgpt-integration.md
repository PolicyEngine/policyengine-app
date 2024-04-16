_A man sits in (an artist’s impression of) Parliament Square with a laptop. Credit: Midjourney v4._

OpenAI recently [released](https://openai.com/research/gpt-4) its advanced language model, GPT-4, which demonstrates remarkable human-like performance in complex tasks such as [exams](https://www.scientificamerican.com/article/what-the-new-gpt-4-ai-can-do/). ChatGPT with GPT-3.5 has aided in several of our recent blog posts, and we used it extensively in this blog post with GPT-4. But with today’s release, PolicyEngine uses OpenAI technology for more than blog posts: users can now access GPT prompts directly from our web app.

## Introducing the PolicyEngine-ChatGPT integration

PolicyEngine aims to offer tools for understanding policy reforms’ economic impacts. We’re thrilled to introduce our integration with OpenAI’s ChatGPT, designed to improve policy analysis by producing detailed reports based on PolicyEngine’s web app results.

## How it works

PolicyEngine now auto-generates a ChatGPT prompt when evaluating policy reform impacts, requesting an economic impact analysis in a blog post format. Access it in the economic impact menu within the policy editor. The prompt includes:

1. Affected parameters’ details (including baselines)

1. Quantitative economic impact results (used in charts on other pages)

PolicyEngine provides style guidance (replaceable with your own), which includes instructions for clarity, plain English, and detailed explanations.

![](https://cdn-images-1.medium.com/max/3200/0*EUDaRFkzMdaz-8Az)

_Screenshot of the analysis prompt generator._

The screenshot demonstrates an example policy reform prompt ([restoring the American Rescue Plan Act’s Earned Income Tax Credit expansion](http://policyengine.org/us/policy?focus=policyOutput.prompt&reform=6524&region=us&timePeriod=2023&baseline=2)). ChatGPT’s unmodified analysis is provided at the end of the post.

Utilizing GPT-4’s capabilities, we hope this integration streamlines policy analysis for researchers, allowing faster iteration. Both GPT-4 (available through [ChatGPT Plus](https://openai.com/blog/chatgpt-plus)) and GPT-3.5 (available on the [free ChatGPT tier](http://chat.openai.com/)) provide clear summaries. We’ve found that GPT-4 offers more clear and accurate results compared to GPT-3.5, although both deliver good outcomes. An example of GPT-3.5’s summary is available below for comparison.

## Conclusion

The PolicyEngine-ChatGPT integration aims to revolutionize policy analysis by combining the powerful capabilities of GPT-4 with PolicyEngine’s intuitive web app. By offering users a streamlined experience, we hope to empower researchers, policymakers, and advocates in their quest for better policy understanding and decision-making. Whether you choose to use GPT-4 or GPT-3.5, the integration will provide valuable insights and analysis, making the policy evaluation process more efficient and accessible.

## Restoring the ARPA EITC: ChatGPT’s commentary (GPT-4)

The “Restoring the ARPA EITC” policy reform aims to change several provisions of the Earned Income Tax Credit (EITC) for the year 2023. This analysis is based on PolicyEngine US v0.243.0 and the 2021 Current Population Survey March Supplement microdata.

First, the reform raises the maximum EITC amount for childless filers from $560 to $1,502. Second, the phase-in and phase-out rates for childless filers are set to 15.3%, up from 7.65%. The phase-in rate is the rate at which the EITC increases as a taxpayer’s earnings rise, while the phase-out rate determines how quickly the credit is reduced as income increases beyond a certain point. Third, the reform raises the income threshold at which the phase-out begins for childless filers from $9,160 to $11,610. Fourth, it lowers the minimum eligibility age for childless filers from 25 to 19 years old and removes the maximum age limit. Lastly, the reform allows separate filers to be eligible for the EITC, a provision that was not present under current law.

The total budgetary impact of the reform is a decrease of $10.4 billion in tax revenue, with no impact on benefit spending.

In terms of income distribution, the average income increases across all income deciles, with the largest increase occurring in the second-lowest decile at $127.53. The relative change in income is highest for the lowest decile at 0.79% and decreases as income decile increases, with the smallest change of 0.01% in the highest decile.

The Supplemental Poverty Measure indicates that the reform reduces the overall poverty rate from 9.6% to 9.4%. Poverty rates decrease for adults (9.8% to 9.5%), children (8.4% to 8.3%), and seniors (10.5% to 10.4%). The deep poverty rates, which refer to individuals living at less than 50% of the poverty threshold, also decline slightly for adults (from 3.9% to 3.8%) and seniors (from 2.6% to 2.5%), while remaining unchanged for children at 2.1%. The reform results in a small decrease in deep poverty rates for both females (3.2% to 3.1%) and males (3.3% to 3.2%), while reducing poverty rates for females (10.0% to 9.9%) and males (9.2% to 8.9%).

Lastly, the reform has a minimal impact on income inequality. The Gini coefficient, which measures income inequality, decreases slightly from 0.4139 to 0.4132. The share of income held by the top 10% of households decreases marginally from 31.6% to 31.5%, and the share held by the top 1% remains relatively stable at 7.8%.

## Restoring the ARPA EITC: ChatGPT’s commentary (GPT-3.5)

The Restoring the ARPA EITC policy reform is designed to change certain provisions of tax and benefit policies for the year 2023. The reform includes several specific provisions, as described below:

- The maximum age for childless EITC eligibility will be increased to 100 years old.

- The minimum age for childless EITC eligibility will be decreased to 19 years old.

- Separate filers will no longer be eligible for the EITC.

- The maximum amount of the EITC will be $1,502.

- The phase-in rate for the EITC will be 15.3%.

- The phase-out rate for the EITC will be 15.3%.

- The phase-out starting point for the EITC will be $11,610.

According to the PolicyEngine microsimulation model, the Restoring the ARPA EITC policy reform will have a budgetary impact of -$10.4 billion, meaning it will decrease tax revenues and benefit spending by that amount. This reform is expected to affect income levels across different deciles, with 3.2% of all households experiencing a gain of more than 5%, and 8.5% of all households experiencing a gain of less than 5%. No households are expected to experience a loss of income.

When examining income changes by decile, the average income gain ranges from $30 to $128, with the largest gains going to those in the second decile. The relative income changes are very small, ranging from 0.0001% to 0.0079%.

The poverty rates for different age groups are expected to change slightly due to the policy reform. The adult poverty rate is expected to decrease from 9.8% to 9.5%, the all-age poverty rate is expected to decrease from 9.6% to 9.4%, the child poverty rate is expected to decrease from 8.4% to 8.3%, and the senior poverty rate is expected to decrease from 10.5% to 10.4%. Similarly, the deep poverty rates for different age groups are expected to decrease slightly.

The policy reform is expected to have a small impact on gender-based poverty rates. The poverty rate for females is expected to decrease from 10.0% to 9.9%, while the poverty rate for males is expected to decrease from 9.2% to 9.0%. The deep poverty rate for females is expected to decrease slightly from 3.2% to 3.2%, while the deep poverty rate for males is expected to decrease slightly from 3.3% to 3.2%.

The policy reform is not expected to significantly impact income inequality. The Gini coefficient of income inequality is expected to decrease slightly from 0.414 to 0.413, the share of income held by the top 10% of households is expected to decrease slightly from 31.6% to 31.6%, and the share held by the top 1% is expected to decrease slightly from 7.8% to 7.8%.
