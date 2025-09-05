We're excited to announce that PolicyEngine has partnered with the [National Bureau of Economic Research (NBER)](https://nber.org) to ensure researchers worldwide continue to have access to critical tax microsimulation tools. Through our [memorandum of understanding](https://drive.google.com/file/d/1V5TJk7C01CLYP_FXUZTmHEdLk-WCV4WN/view?usp=sharing), we're building an open-source emulator of [TAXSIM](https://taxsim.nber.org), NBER's tax calculator that has powered academic research and government policy analysis for nearly five decades.

## Why TAXSIM matters

Since the 1970s, TAXSIM has set the gold standard for tax microsimulation. Daniel Feenberg, NBER's IT Director, created and maintains this tool that enables groundbreaking research on everything from tax reform impacts to income inequality. [Over 1,200 papers](https://scholar.google.com/scholar?cites=14430205938320153579&as_sdt=20000005&sciodt=0,21&hl=en) have applied TAXSIM, based on citations of the [Feenberg and Coutts (1993)](https://taxsim.nber.org/feenberg-coutts.pdf) paper that introduces the model. Government agencies including the Congressional Budget Office, the Joint Committee on Taxation, and state revenue departments rely on TAXSIM for policy analysis.

TAXSIM calculates federal and state tax liabilities for households across different years and policy scenarios, helping researchers understand exactly how tax changes affect real families. This consistency and reliability make it a cornerstone of evidence-based policymaking.

## Our collaboration with NBER

We're working directly with Daniel Feenberg and James Poterba, President and CEO of NBER, to build the next generation of tax microsimulation tools. This MOU formalizes the validation work we've been doing against TAXSIM for over three years while building state tax models across the country. Dr. Feenberg also serves as an external mentor through our [NSF POSE Phase I grant](https://policyengine.org/us/research/nsf-pose-phase-1-grant), helping us build a robust open-source ecosystem for policy analysis.

Our partnership ensures that:

- Researchers maintain uninterrupted access to tax microsimulation capabilities
- The tool evolves with modern features while preserving backward compatibility
- The codebase becomes open-source, enabling community contributions and transparency

## What we're building

We're developing the TAXSIM emulator as a fully open-source project on [GitHub](https://github.com/PolicyEngine/policyengine-taxsim). The emulator leverages PolicyEngine's existing US federal and state tax calculator to replicate TAXSIM's functionality.

**Key features of the emulator:**

- Full compatibility with TAXSIM's existing input and output formats
- Open-source codebase for transparency and community contributions
- Built on PolicyEngine's validated state and federal tax models
- Continued access to tax calculations from 1960 to present
- A new dashboard for comparing results across thousands of tax scenarios

Both organizations rigorously validate the emulator to ensure it matches TAXSIM's outputs exactly. Dr. Feenberg provides technical guidance throughout the development process, ensuring we capture every detail that makes TAXSIM so valuable to the research community.

Through this detailed validation process, we've already identified opportunities to improve how both TAXSIM and PolicyEngine encode complex tax laws — not just at the federal level, but across all 50 states and DC. This collaboration strengthens both tools, ensuring researchers get the most accurate tax calculations possible.

## The path forward

Our organizations designed a smooth transition plan. Initially, taxsim.nber.org will host the integrated tool, with TAXSIM continuing its current operations through at least the 2024 tax year. We'll ensure researchers experience no disruption in their work.

We aim to launch the emulator later this year, along with a dashboard that will allow users to compare results across thousands of tax scenarios, providing researchers with an open-source alternative that maintains full compatibility with their existing TAXSIM-based workflows.

## What this means for the research community

This partnership goes beyond maintaining existing tools — we're expanding access to rigorous policy analysis. Making tax microsimulation open-source and adding modern features allows us to:

- Enable more researchers to contribute to and validate the codebase
- Help new researchers learn and use these tools more easily
- Ensure these capabilities remain available for decades to come
- Create opportunities for innovation in tax policy analysis

We're honored to work with NBER to carry forward Dr. Feenberg's decades of work on TAXSIM. Together, we're ensuring that the next generation of researchers and policymakers have even better tools to understand how tax policies affect families across the income spectrum.

Stay tuned for updates as we continue development. If you're interested in contributing or have questions about the project, visit our [GitHub repository](https://github.com/PolicyEngine/policyengine-taxsim) or reach out to us directly.
