Today, as tax season closes, PolicyEngine is thrilled to announce the beta launch of state income tax modeling for all 50 states and Washington D.C. This significant milestone expands our existing suite of policy analysis tools, which already includes a comprehensive model of federal income taxes and benefit programs like the Supplemental Nutrition Assistance Program and Supplemental Security Income.

## What this means for our users

With this launch, anyone can now use PolicyEngine’s free, open-source platform to:

1. Enter their household information and estimate their state income taxes, along with federal taxes and benefit amounts.

1. Access free analytics, such as how net income and marginal tax rates change with respect to earnings.

1. Design customizable policy reforms for state income taxes and estimate the impact on households and society, including changes to the budget, poverty rates by age, race, and gender, income inequality, the distribution of benefits and costs, and impacts by income decile.

This launch represents a critical step towards our full launch later this year, which will include further enhancements such as:

1. Full validation against the[ National Bureau of Economic Research’s TAXSIM model](https://taxsim.nber.org/feenberg-coutts.pdf) for all states and tax years. We already validate PolicyEngine against TAXSIM for hundreds of thousands of tax units in each state and match to the penny for the [vast majority of cases](https://github.com/PolicyEngine/policyengine-us/issues/993) (for the 2021 tax year, TAXSIM’s latest). We’re grateful to be collaborating with Daniel Feenberg, TAXSIM’s creator, and a PolicyEngine advisory board member, to improve both models for the benefit of all users.

1. Adding more recent tax law, including legislation that defines tax rules for 2024 and beyond, as well as future-dated legal changes and inflation adjustments.

1. Allowing users to model how federal reforms affect state taxes, such as states that match a percentage of the federal Earned Income Tax Credit.

1. Incorporating this into our federal model of the state and local tax (SALT) deduction by imputing property taxes, the other element of this hotly-debated policy. This means we’ll be able to model real state income tax policies into SALT analysis, rather than reported amounts from prior years’ data.[^1]

[^1]: Currently, for the purposes of the SALT deduction and baseline net income in US simulations, we use state income tax as the Census Bureau calculates it from the Current Population Survey March Supplement, indexed for inflation.

Looking ahead, we also aspire to extend our [recently beta-launched microdata enhancement](https://policyengine.org/us/research/enhanced-cps-beta) to the state level, further improving the accuracy of state impact estimates for both state and federal reforms. We are actively seeking financial support to make this vision a reality.

To see examples of how to make the most of these new features, check out our state-specific launch posts for [New Mexico](https://policyengine.org/us/research/new-mexico-income-tax-launch), [Utah](https://policyengine.org/us/research/introducing-utah-state-income-tax-analysis-on-policyengine), [California](https://policyengine.org/us/research/california-income-tax), [Kansas](https://policyengine.org/us/research/kansas-income-tax), [New York](https://policyengine.org/us/research/policyengine-launches-in-new-york-state), and [Washington](https://policyengine.org/us/research/policyengine-launches-in-washington-state).

At PolicyEngine, we remain committed to setting new standards in policy simulations and evidence-based policymaking. By providing a powerful, transparent, and accessible platform for public policy analysis, we aim to empower policymakers, researchers, advocates, and the general public to better understand the impacts of tax and benefit policies.

We would like to extend our heartfelt gratitude to our incredible team of [over 100 open-source contributors](https://github.com/PolicyEngine/policyengine-us/graphs/contributors) who have made this milestone possible. Their tireless efforts and commitment to our mission have been instrumental in bringing PolicyEngine to where it is today.

Stay tuned for more exciting developments as we continue to expand and refine our tools. Together, we can build a more informed and engaged society, one policy at a time.
