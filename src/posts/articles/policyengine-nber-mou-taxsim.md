We're excited to announce that PolicyEngine has partnered with the [National Bureau of Economic Research (NBER)](https://nber.org) to ensure researchers worldwide continue to have access to critical tax microsimulation tools. Through our [memorandum of understanding](https://drive.google.com/file/d/1V5TJk7C01CLYP_FXUZTmHEdLk-WCV4WN/view?usp=sharing), we're building an open-source emulator of [TAXSIM](https://taxsim.nber.org), NBER's tax calculator that has powered academic research and government policy analysis for nearly five decades.

## Why TAXSIM matters

Since the 1970s, TAXSIM has set the gold standard for tax microsimulation. Daniel Feenberg, NBER's IT Director, created and maintains this tool that enables groundbreaking research on everything from tax reform impacts to income inequality. [Over 1,200 papers](https://scholar.google.com/scholar?cites=14430205938320153579&as_sdt=20000005&sciodt=0,21&hl=en) have applied TAXSIM, based on citations of the [Feenberg and Coutts (1993)](https://taxsim.nber.org/feenberg-coutts.pdf) paper that introduces the model. Beyond academic citations, major think tanks rely on TAXSIM — researchers at Brookings [use it extensively](https://www.brookings.edu/research/simulating-income-tax-liabilities-in-the-survey-of-consumer-finances/) to analyze tax policy impacts. Federal agencies also depend on TAXSIM: the Bureau of Labor Statistics [uses it for the Consumer Expenditure Survey](https://www.bls.gov/opub/mlr/2015/article/improving-data-quality-in-ce-with-taxsim.htm), and the Census Bureau has evaluated it for the Supplemental Poverty Measure.

TAXSIM35, the current version, accepts 35 input variables covering demographics, labor income, capital income, deductions, and credits. It calculates not just federal and state tax liabilities but also taxable income, specific credits, payroll taxes, and other detailed tax components. With coverage of federal tax law from 1960 to present and state tax laws from 1977 onward, TAXSIM helps researchers understand exactly how tax changes affect real families across six decades of American tax policy.

## Our collaboration with NBER

We're working directly with Daniel Feenberg and James Poterba, President and CEO of NBER, to build the next generation of tax microsimulation tools. This MOU formalizes the validation work we've been doing against TAXSIM for over three years while building state tax models across the country. Dr. Feenberg also serves as an external mentor through our [NSF POSE Phase I grant](https://legacy.policyengine.org/us/research/nsf-pose-phase-1-grant), helping us build a robust open-source ecosystem for policy analysis.

Our partnership ensures that:

- Researchers maintain uninterrupted access to tax microsimulation capabilities
- The tool evolves with modern features while preserving backward compatibility
- The codebase becomes open-source, enabling community contributions and transparency

## What we're building

We're developing the TAXSIM emulator as a fully open-source project on [GitHub](https://github.com/PolicyEngine/policyengine-taxsim). The emulator leverages PolicyEngine's existing US federal and state tax calculator to replicate TAXSIM's functionality.

**Key features of the emulator:**

- Full compatibility with TAXSIM's existing input and output formats
- Open-source codebase for transparency and community contributions
- Built on PolicyEngine's validated state and federal tax models from 2021 onward
- Integration with TAXSIM to provide a unified interface across all years (1960-present)
- A new dashboard for comparing results across thousands of tax scenarios

Both organizations rigorously validate the emulator to ensure it matches TAXSIM's outputs exactly. Dr. Feenberg provides technical guidance throughout the development process, ensuring we capture every detail that makes TAXSIM so valuable to the research community.

Through this detailed validation process, we've already identified opportunities to improve how both TAXSIM and PolicyEngine encode complex tax laws — not just at the federal level, but across all 50 states and DC. This collaboration strengthens both tools, ensuring researchers get the most accurate tax calculations possible.

## The path forward

Our organizations designed a smooth transition plan. The integrated system will combine TAXSIM and the PolicyEngine-based emulator, allowing researchers to use a familiar interface for any year from 1960 to present. Behind the scenes, the system will route calculations to TAXSIM for historical years and to the open-source emulator for recent years (2021 onward).

We aim to launch this integrated tool later this year, along with a dashboard that will allow users to compare results across thousands of tax scenarios. Researchers will experience no disruption — they'll continue using the same interface while gaining access to open-source capabilities for recent tax years.

## What this means for the research community

This partnership goes beyond maintaining existing tools — we're expanding access to rigorous policy analysis. Making tax microsimulation open-source and adding modern features allows us to:

- Enable more researchers to contribute to and validate the codebase
- Help new researchers learn and use these tools more easily
- Ensure these capabilities remain available for decades to come
- Create opportunities for innovation in tax policy analysis

We're honored to work with NBER to carry forward Dr. Feenberg's decades of work on TAXSIM. Together, we're ensuring that the next generation of researchers and policymakers have even better tools to understand how tax policies affect families across the income spectrum.

Stay tuned for updates as we continue development. If you're interested in contributing or have questions about the project, visit our [GitHub repository](https://github.com/PolicyEngine/policyengine-taxsim) or reach out to us directly.
