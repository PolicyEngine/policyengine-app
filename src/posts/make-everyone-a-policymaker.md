# Make Everyone a Policymaker

Today we’re (re)launching PolicyEngine to give the public unprecedented insight into the tax and benefit system.

Do you know how much money you make? No, not the amount in your employment contract — how much you get to take home. What about how that would change if you took some time off, or if you got a raise? How about if your favorite (or least favorite) politician got to enact the policies they talked about on the campaign trail? Or if your government enacted _your own_ policy ideas?

Developed countries collect a [third of GDP in taxes](https://www.oecd.org/tax/tax-policy/revenue-statistics-highlights-brochure.pdf) — up from a quarter in 1965 — and they spend [about a third](https://www.oecd.org/els/soc/OECD2020-Social-Expenditure-SOCX-Update.pdf) of that tax revenue on cash benefits. Taxation and provision of public benefits arguably constitute the most impactful responsibilities of governments. But amid debates over designing these multi-trillion-dollar tax and benefit systems, policymakers and policy modelers have limited tools for evaluating their proposals. The public rarely sees how reforms would affect their own household. Many people have difficulty navigating even existing systems, which often include [absurdly complex](https://www.youtube.com/watch?v=HLIH7ukbE2I) benefit programs for low-income people.

## Our vision

We envision a more inclusive, evidence-based future for tax and benefit policy. A future where people of all income levels can plan their finances with a clear understanding of their tax liabilities and benefit eligibility, and how these would change with their circumstances.

Further, we envision that inclusive, evidence-based future for *policymaking. *A future where policymakers, academics, think tanks, candidates, and the public can share a common conversation around policy reforms. Where a country’s top elected official evaluates their policy idea with the same tools as the high school student learning about tax and benefit systems for the first time. Where everyone can see the impact of policy proposals on both their country and themselves. We envision a more participatory, democratic future where anyone can explore anyone else’s policy ideas with the rigor currently reserved for exclusive policy analysis shops.

Today, we’re taking a step towards that future by launching PolicyEngine. PolicyEngine is the world’s first product that allows anyone to reform the tax and benefit system and see how it would affect society and their own household. We’re currently live in the UK at [policyengine.org](http://policyengine.org) and we’re working on bringing it to other countries, especially the US. Here’s a video of how it works:

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/nTIzJ-mzkno" frameborder="0" allowfullscreen></iframe></center>

## How we got here

We’re Max and Nikhil, and we come to PolicyEngine from the intersection of technology, economic policy, and data science. Max worked as a data scientist at Google for several years before getting a graduate degree in economics and starting an economic policy think tank. Nikhil is trained as a computer scientist and worked as a data scientist in fintech before joining Max’s think tank. We share a passion for equitable, efficient tax and benefit policy, and a belief that technology can shine a light on the opportunities to improve those policies.

We created the first version of PolicyEngine while working at that think tank: the [UBI Center](http://ubicenter.org), which researches universal basic income policies. UBI is a simple policy, but its high cost generally requires reforms to the rest of the tax and benefit system. We sought to expand the UBI Center’s analysis from the US (where Max lives) to the UK (where Nikhil lives), but there was no open source model of the UK tax and benefit system — so we created it. There was also no web app to interact with a model of the UK system, so we created that too.

![A UBI Center report on [funding universal basic income by reforming the UK personal tax allowance](https://www.ubicenter.org/personal-allowance) used the [open-source microsimulation model](https://github.com/PolicyEngine/openfisca-uk) that powers PolicyEngine.](https://cdn-images-1.medium.com/max/3164/0*u2MatZNQhvAplTLa)_A UBI Center report on [funding universal basic income by reforming the UK personal tax allowance](https://www.ubicenter.org/personal-allowance) used the [open-source microsimulation model](https://github.com/PolicyEngine/openfisca-uk) that powers PolicyEngine._

By the time we built something useful enough to analyse UBI policies (we used our model to write [five quantitative reports](https://www.ubicenter.org/tag/uk/) since May), we realised it was useful enough to analyse any tax and benefit reform. So, six weeks after we [beta-launched PolicyEngine as a UBI Center product](https://www.ubicenter.org/introducing-policyengine), we’re re-launching independently from the UBI Center. We’ve also made a bunch of improvements since that beta launch, from a new user interface to more robust validation to more intuitive charts to a wider array of policy controls.

We’re grateful to users and UBI Center colleagues who have explored PolicyEngine in this period and provided us feedback, and to UK [modellers](https://www.iser.essex.ac.uk/files/projects/UKMOD/EUROMOD_country_report.pdf) and [agencies](https://ukdataservice.ac.uk/) that provide data and information helping us build our model. We’re especially excited to strengthen our relationship with the [Policy Simulation Library](http://pslmodels.org) by joining the [PSL Foundation](http://psl-foundation.org) as a fiscally sponsored project. We’ve worked with PSL for years and aspire to the impact of their open source policy analysis tools, especially their apps for estimating [household-level](https://compute.studio/PSLmodels/Tax-Cruncher/), [US-wide](https://compute.studio/PSLmodels/Tax-Brain), and [macroeconomic](https://compute.studio/PSLmodels/OG-USA) impacts of US tax reforms. Finally, we’re indebted to the superb work of the [OpenFisca](http://openfisca.org) development team based out of the French government, which created the microsimulation framework underlying PolicyEngine.

## What’s next

Partners and the public have already found PolicyEngine useful for understanding real-world reforms and exploring new policy directions. Here are a few examples:

- We and Charles Bauman at the UBI Center produced the first report to integrate PolicyEngine, on [funding universal basic income from a land value tax](https://www.ubicenter.org/uk-lvt).

- PolicyEngine estimates that [equalising Child Benefit rates between first-born and subsequent children](https://uk.policyengine.org/population-impact?CB_additional=21.15) would cost £1.7bn per year and cut child poverty by 4%.

- PolicyEngine estimates that [repealing the personal tax allowance](https://uk.policyengine.org/population-impact?personal_allowance=0) would raise 102 billion per year, and affect middle-income households more than low- and upper-income ones.

- The UBI Lab Network embedded our household calculator to their [Resilience UBI proposal](https://www.ubilabnetwork.org/resilience-ubi), showing visitors a personalised impact.

We’re excited to see these use cases, though we recognise we have a ways to go before fulfilling our full vision. To make PolicyEngine a platform for tax and benefit analysis from government to citizenry, we’re planning a few enhancements in the coming months:

- Branded policies, as demonstrated by the universal basic income parameters within the UBI Center drop-down. If you’re with a political party or think tank that would like to show your policy on our front page, please reach out to us.

- A simpler, feed-oriented user interface to explore policies.

- PolicyEngine US, and then other countries.

If you’d like to financially support our work, you can [make a donation through the PSL Foundation](https://opencollective.com/psl) (please email [contact@policyengine.org](mailto:contact@policyengine.org) to ensure your donation is properly routed). We also welcome technical contributions through GitHub (we’re entirely open source), as well as any other feedback or ideas via [contact@policyengine.org](mailto:contact@policyengine.org). To stay up to date, you can [sign up for our newsletter](https://mailchi.mp/7b89fef927ca/general) and follow us on [Twitter](http://twitter.com/thepolicyengine), [Facebook](http://facebook.com/thepolicyengine), [LinkedIn](https://linkedin.com/company/thepolicyengine), and [Instagram](http://instagram.com/policyengine).

Thank you for joining us on our journey toward better public policy.

Max Ghenis and Nikhil Woodruff
[PolicyEngine](http://policyengine.org) co-founders

![](https://cdn-images-1.medium.com/max/2000/1*sKPTtD2QzO5FZQNdyRP-YQ.png)
