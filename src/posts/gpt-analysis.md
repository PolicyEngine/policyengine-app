Just two weeks ago, we [unveiled our ChatGPT integration](https://policyengine.org/us/blog/2023-03-17-automate-policy-analysis-with-policy-engines-new-chatgpt-integration), which allowed users to generate policy analysis by adjusting parameters in PolicyEngine and interacting with [OpenAI’s chatbot](http://chat.openai.com). Shortly after, OpenAI granted us access to the [GPT-4 API](https://openai.com/product/gpt-4), and we’ve been hard at work finding the best ways to harness its power to enhance PolicyEngine’s capabilities.

Today, we’re excited to launch our revamped **Analysis** product. Now, when you design or retrieve a policy reform in PolicyEngine, you can choose from three levels of policy knowledge and generate a comprehensive report that combines AI-generated computational content with interactive charts. Our goal is to provide a more engaging, personalized experience for our users. Here’s a look at how it works and what you can expect.

## How it works

PolicyEngine now comes with built-in GPT-4 integration, automatically generating a GPT-4 prompt to evaluate policy reform impacts. Users can access this analysis in the “Analysis” tab within the policy editor, with content tailored to their selected audience mode. This accommodates different levels of expertise and background knowledge.

Our new audience modes include:

* **ELI5:** Explain Like I’m 5 — For users who prefer simple language and basic explanations.

* **Normal:** For policy analysts with some background in economics and policy.

* **Wonk:** For seasoned policy analysts who prefer concise, technical language.

These modes allow users to customize the analysis based on their target audience, making the generated content more accessible and relevant.

![](https://cdn-images-1.medium.com/max/2700/0*Ni8xmhYDez5lQdlV)

Once you’ve chosen a mode, you can generate a report. GPT-4 weaves a narrative from our results, and we incorporate our interactive charts to automatically describe the policy reform using computationally precise natural language.

![](https://cdn-images-1.medium.com/max/3200/0*odCcFVHAA5i20GvK)

## A comparison of ELI5, Normal, and Wonk modes

In our mission to make public policy more personal and accessible, PolicyEngine now offers three audience modes for our built-in GPT-4 integration: ELI5, Normal, and Wonk. These modes cater to varying degrees of familiarity with policy analysis, giving users an instant, customized policy analysis experience.

To better illustrate the differences between the modes, here are some quotes from each, applied to [President Biden’s proposal to restore the American Rescue Plan Act’s Earned Income Tax Credit expansion](https://policyengine.org/us/blog/2023-03-27-restoring-arpa-eitc):

**ELI5:** “The ‘Restoring the ARPA EITC’ policy helps people with lower incomes get more money from the government. It makes it easier for younger and older people to get this help and gives them more money. This change costs the government about $9.8 billion and helps reduce poverty a little bit.”

**Normal:** “The ‘Restoring the ARPA EITC’ policy reform increases the Earned Income Tax Credit for childless taxpayers, resulting in a total budgetary impact of -$9.8 billion. It leads to a decrease in poverty rates and a slight reduction in income inequality, benefiting lower-income deciles more significantly than higher-income deciles.”

**Wonk:** “The hypothetical tax-benefit policy reform ‘Restoring the ARPA EITC’ alters EITC parameters, yielding a -$9.8 billion budgetary impact. This reform reduces poverty rates and produces a negligible decrease in income inequality, with the most considerable relative income increases observed in the first and second deciles.”

By offering these three audience modes, we aim to make policy analysis more accessible to a wider range of users, from those with limited policy knowledge to seasoned policy analysts. You can explore examples of each mode in the appendix of this post, and choose the one that best suits your needs or the needs of your target audience when creating reforms in the future.

## Embracing AI innovation

At PolicyEngine, we’re constantly seeking innovative ways to utilize AI to make public policy more accessible and personal. Our latest GPT-4 integration and audience modes are just the beginning. We are committed to leveraging the power of AI to further enhance our tools, enabling better policy understanding and decision-making for researchers, policymakers, and advocates alike.

## Conclusion

PolicyEngine’s integrated GPT-4 capabilities and new audience modes offer instant personalized policy analysis, transforming the way users interact with and engage in policy evaluation. By providing a seamless, customized experience, we aim to empower users in their pursuit of better policy understanding and more informed decision-making. Give it a try today and experience the advantages of AI-powered policy analysis for yourself!

## Examples

Each applies to the reform to [restore the ARPA EITC](https://policyengine.org/us/blog/2023-03-27-restoring-arpa-eitc).

## ELI5

The proposed policy reform, called “Restoring the ARPA EITC,” is for the year 2023 in the United States. It makes several changes to the current law:

The maximum age for people without children to get support from the government (called EITC) is raised from 64 to 100 years old.

The minimum age for the same group is lowered from 25 to 19 years old.

The maximum amount of money given by EITC is increased from $600 to $1,502.

The rate at which the EITC amount increases as people earn more money is doubled from 7.65% to 15.3%.

The rate at which the EITC amount decreases as people earn even more money is also doubled from 7.65% to 15.3%.

The point at which the EITC amount starts decreasing is raised from $9,800 to $11,610.

These changes were analyzed using a computer program called PolicyEngine US v0.259.0 and data from the 2021 Current Population Survey March Supplement. The analysis showed that this policy reform would cost the government around $9.8 billion.

When looking at how people’s incomes change because of this reform, we can see that those with lower incomes benefit more. For example, people in the lowest 10% of incomes gain an average of $106, while those in the highest 10% gain an average of $31. {{decileRelativeImpact}}

The policy reform also has a small impact on poverty, which is a measure of how many people are living with not enough money to meet their basic needs. The overall poverty rate decreases slightly from 6.8% to 6.7%. The biggest change is seen among adults (people aged 18–64), with the poverty rate decreasing from 6.9% to 6.7%. {{povertyImpact}}

Inequality, which is a measure of how unevenly money is distributed among people, is also slightly affected by this policy reform. The Gini coefficient, a number used to measure inequality (with 0 being perfect equality and 1 being complete inequality), decreases slightly from 0.394 to 0.394. The share of income held by the top 10% and top 1% of households also decreases a little. {{inequalityImpact}}

In simpler terms, this policy reform helps people with lower incomes by giving them more financial support from the government. It has a small impact on reducing poverty and making the distribution of money more equal among people.

## Normal

The hypothetical tax-benefit policy reform, Restoring the ARPA EITC, involves several changes to the current Earned Income Tax Credit (EITC) parameters for 2023 in the US. The provisions of the reform include:

The maximum age for childless EITC eligibility is increased from 64 to 100.

The minimum age for childless EITC eligibility is decreased from 25 to 19.

The maximum EITC amount for childless filers is increased from $600 to $1,502.

The EITC phase-in rate for childless filers is doubled from 7.65% to 15.3%.

The EITC phase-out rate for childless filers is also doubled from 7.65% to 15.3%.

The EITC phase-out starting point for childless filers is increased from $9,800 to $11,610.

Using PolicyEngine US v0.259.0 and the 2021 Current Population Survey March Supplement microdata, we can analyze the impacts of these changes.

The reform results in a total budgetary impact of -$9.8 billion, with tax revenues decreasing by $9.8 billion and no change in benefit spending.

Looking at income deciles, the reform’s effects are as follows:

{{decileRelativeImpact}}

The first decile sees an average income increase of $106, or 0.66%.

The second decile sees an average income increase of $119, or 0.36%.

The third decile sees an average income increase of $96, or 0.21%.

The fourth decile sees an average income increase of $71, or 0.12%.

The fifth decile sees an average income increase of $55, or 0.08%.

The sixth decile sees an average income increase of $61, or 0.07%.

The seventh decile sees an average income increase of $50, or 0.05%.

The eighth decile sees an average income increase of $41, or 0.03%.

The ninth decile sees an average income increase of $41, or 0.03%.

The tenth decile sees an average income increase of $31, or 0.01%.

In terms of poverty impacts, the reform has the following effects:

{{povertyImpact}}

The overall poverty rate, measured by the Supplemental Poverty Measure, decreases from 6.8% to 6.7%.

The adult poverty rate decreases from 6.9% to 6.7%.

The child poverty rate decreases from 5.9% to 5.9%.

The senior poverty rate decreases from 7.7% to 7.6%.

For deep poverty rates:

The overall deep poverty rate decreases from 1.8% to 1.8%.

The adult deep poverty rate decreases from 2.0% to 2.0%.

The child deep poverty rate remains at 1.2%.

The senior deep poverty rate remains at 1.7%.

When comparing the baseline and reform poverty and deep poverty rates by gender, the reform leads to relative decreases in poverty rates for both females (from 7.1% to 7.0%) and males (from 6.5% to 6.4%). The deep poverty rates also decrease for both females (from 1.8% to 1.8%) and males (from 1.8% to 1.8%).

Regarding inequality metrics, the reform has the following effects:

{{inequalityImpact}}

The Gini coefficient of income inequality decreases slightly from 0.3944 to 0.3938.

The share of income held by the top 10% of households decreases slightly from 30.4% to 30.4%.

The share of income held by the top 1% of households remains nearly constant at 7.5%.

Overall, the Restoring the ARPA EITC reform leads to a decrease in poverty rates and a slight reduction in income inequality. The reform impacts lower-income deciles more significantly than higher-income deciles, with the most considerable relative income increases observed in the first and second deciles.

## Wonk

The hypothetical tax-benefit policy reform for 2023 in the US, known as “Restoring the ARPA EITC,” includes several changes to the Earned Income Tax Credit (EITC) parameters. The impacts described below are based on PolicyEngine US v0.259.0 and the 2021 Current Population Survey March Supplement microdata. The following provisions detail the changes from the baseline to the reform values:

The maximum age for childless EITC eligibility is increased from 64 to 100.

The minimum age for childless EITC eligibility is reduced from 25 to 19.

The maximum EITC amount for childless taxpayers is raised from $600 to $1,502.

The phase-in rate for childless taxpayers is increased from 7.65% to 15.3%.

The phase-out rate for childless taxpayers is increased from 7.65% to 15.3%.

The phase-out start for childless taxpayers is raised from $9,800 to $11,610.

The reform has a total budgetary impact of -$9.8 billion, resulting from a -$9.8 billion decrease in tax revenues and no change to benefit spending.

Regarding income deciles, the {{decileRelativeImpact}} shows that the reform leads to an income gain for 11.2% of the first decile and a gain for 9.5% of the second decile. The reform has no negative income impact, and 88.8% of households experience no change in income.

Poverty impacts, measured using the Supplemental Poverty Measure, show the following relative changes: {{povertyImpact}}

Adult poverty rate decreases from 6.9% to 6.7%.

Overall poverty rate decreases from 6.8% to 6.7%.

Child poverty rate decreases from 5.9% to 5.9%.

Senior poverty rate decreases from 7.7% to 7.6%.

The deep poverty rates, also measured using the Supplemental Poverty Measure, show the following relative changes:

Adult deep poverty rate decreases from 2.0% to 2.0%.

Overall deep poverty rate decreases from 1.8% to 1.8%.

Child deep poverty rate remains at 1.2%.

Senior deep poverty rate remains at 1.7%.

The reform has the following effects on poverty and deep poverty rates by gender:

Female poverty rate decreases from 7.1% to 7.0%.

Male poverty rate decreases from 6.5% to 6.4%.

Female deep poverty rate decreases from 1.8% to 1.8%.

Male deep poverty rate remains at 1.8%.

Inequality impacts are as follows: {{inequalityImpact}}

Gini coefficient of income inequality slightly decreases from 0.394 to 0.394.

Share of income held by the top 10% of households decreases from 30.4% to 30.4%.

Share held by the top 1% remains at 7.5%.
