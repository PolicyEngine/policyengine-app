PolicyEngine has developed a new artificial intelligence feature that transforms complex tax and benefit calculations into clear, accessible explanations. This innovation emerged from our participation in the Georgetown Beeck Center’s [Policy2Code Challenge](https://digitalgovernmenthub.org/get-involved/policy2code/) with a central question: How can we help users better understand their tax and benefit eligibility?

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/fnuDyLKpt90" frameborder="0" allowfullscreen></iframe></center>

Users frequently encounter intricate calculations spanning multiple programs, each with distinct thresholds, phase-outs, and dependencies. Our solution combines PolicyEngine’s open-source rules engine with artificial intelligence to explain these calculations in plain language, building on our [previous work applying AI to policy analysis](https://policyengine.org/us/research/gpt-analysis).

# Technical architecture

The system integrates PolicyEngine’s tax-benefit rules with Anthropic’s Claude 3.5 Sonnet API. When calculating program amounts like the Child Tax Credit or Supplemental Security Income, PolicyEngine processes thousands of intermediate calculations involving household income, deductions, and other eligibility factors. Our new explanation system passes these complex intermediate calculations to the AI system, which generates natural language explanations.

For example, consider [a family of four in Connecticut](https://policyengine.org/us/household?focus=householdOutput.netIncome&household=50156) with a three-year-old child and $47,000 income. PolicyEngine calculates that they qualify for $475 in annual benefits from WIC, the Special Supplemental Nutrition Program for Women, Infants, and Children. Users can now click a tooltip followed by an “**Explain with AI ✨**” button to receive a comprehensive explanation of their eligibility and potential changes that could affect their benefit amount.

![](https://cdn-images-1.medium.com/max/2000/0*x0qcBrqb0Zapj8Ob)

The AI system analyzes both final outcomes and the intermediate calculations contributing to them. Many variables in PolicyEngine’s system involve dozens of intermediate steps, calculated at both monthly and annual levels. This new feature makes these calculation chains transparent and comprehensible.

# Applications and impact

This explanation tool serves diverse needs across the policy ecosystem. Whether you’re a household trying to understand your benefits, a professional analyzing complex policy interactions, or a researcher exploring program mechanics, the system breaks down intricate calculations into clear explanations.

Following PolicyEngine’s existing policy analysis framework, the explanations adapt to different audiences, ranging from simplified overviews to detailed technical analyses. This flexibility makes complex policy calculations accessible while preserving the depth needed for technical users.

# Development roadmap

Having launched this feature in the PolicyEngine web app, we will extend it to [API](https://policyengine.org/us/api) customers in Q1 2025. PolicyEngine welcomes feedback on improving accessibility across user groups as we continue development.

---

_Max Ghenis, Pavel Makarchuk, Rachel Lawrie, and Li-Heng Pan also contributed to this feature._
