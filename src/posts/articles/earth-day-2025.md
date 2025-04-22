At PolicyEngine, our work centers on providing open and transparent tools for public policy analysis. While many analyses focus on tax and benefit programs, energy policies also have significant individual and societal effects that warrant examination.

I discussed PolicyEngine's capabilities in this area at the most recent [Open Sustainability Policy Summit](https://opensource.engineering.jhu.edu/), hosted by Johns Hopkins and LF Energy. You can watch the talk below:

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/af8Y5J_jLO0" frameborder="0" allowfullscreen></iframe></center>

As I described (slides available [here](https://docs.google.com/presentation/d/1pAXVClSU1Ws7tcrpHFinGTdeHLsrZWJo_tQWmEzjXXk/preview)), our open-source platform allows users to explore the quantitative impacts of various policies, including those related to energy. Here's an overview of PolicyEngine's relevant features:

### Modeling the Individual Impacts of Energy Policies

Energy policies can affect household budgets in numerous ways. PolicyEngine uses microsimulation modeling to estimate these effects. The platform can analyze:

- **Carbon Pricing:** In the UK, we can model hypothetical policies like a [carbon tax](https://policyengine.org/uk/research/how-policyengine-estimates-the-effects-of-uk-carbon-taxes) paired with a dividend. Our UK model demonstrated the distributional effects of pairing a £100/tonne carbon tax with an £18/week universal dividend, showing potential outcomes across income and wealth levels.
- **Energy Assistance Programs:** In some US states, we model programs like the Low Income Home Energy Assistance Program (LIHEAP). For example, we can simulate Michigan's Home Heating Credit to show how benefits change based on income and heating costs, revealing implicit subsidy rates.
- **Energy Price Regulations:** We have modeled policies like the [UK's Energy Price Guarantee](https://policyengine.org/uk/research/projected-impact-of-the-uks-extended-energy-price-guarantee), which capped household energy costs.
- **Clean Energy Incentives:** We analyze individual tax credits, such as the Clean Vehicle Credit from the Inflation Reduction Act (IRA), including eligibility rules and income interactions. You can read my [2022 UBI Center report](https://www.ubicenter.org/ira-ev-credit-cliff) for a demonstration.
- **Implicit Subsidies:** We can identify energy-related components in other programs, like the SNAP utility expense deduction.
- **State & Local Programs:** We incorporate state-specific policies, such as California's low-income electricity discounts (CARE and FERA).

### An Open, Integrated Platform

Our capabilities are built on a foundation of openness and specific data techniques:

- **Open Source:** Our entire platform – from the front-end interface to the underlying rules engine and APIs – is free and open source, available on [GitHub](https://github.com/PolicyEngine). We leverage and contribute to the broader open-source community.
- **Data Integration:** We use techniques, including machine learning, to integrate diverse datasets (like income surveys and consumption data) to provide a detailed view of policy impacts.
- **Tools:**
  - **Individuals:** Calculate estimated taxes and benefits under current law.
  - **Analysts:** Design custom policy reforms, adjusting parameters or introducing new policies.
  - **Impact Analysis:** Compute the personalized impact of reforms on specific households and estimate the broader societal effects on metrics like poverty and inequality using microsimulation.
  - **API Access:** Third parties can build custom applications using our API.

### Future Directions in Energy & Climate Modeling

We are continuously expanding our capabilities. As discussed in the presentation, future directions include:

- **Broadening Scope:** Modeling more LIHEAP programs across the US and incorporating state-specific rules for IRA rebates.
- **Deeper Data:** Integrating more detailed utility expense data into our US models.
- **Dynamic Modeling:** Working towards integration with dynamic macroeconomic models (like OG-USA).
- **Energy & Emissions:** Exploring the integration of dedicated energy models to estimate the potential impact of policies on emissions.
- **Enhanced UX:** Improving the user experience and expanding our API for developers.
- **AI Integration:** Developing AI-powered tools, like chatbots, for policy analysis.

### Learn More

Understanding the economic and distributional effects of energy policy involves dissecting complex interactions. PolicyEngine provides transparent, accessible tools for this analysis. Explore our platform and contribute to our open-source project. Visit [PolicyEngine US](https://policyengine.org/us) and [PolicyEngine UK](https://policyengine.org/uk) to learn more.
