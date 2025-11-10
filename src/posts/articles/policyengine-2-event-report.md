On November 3, 2025, PolicyEngine hosted an event at Central Hall Westminster in London to showcase PolicyEngine 2.0 and explore the future of public policy analysis. The afternoon brought together policymakers, researchers, and practitioners to examine how technology and AI are reshaping evidence-based policymaking. [View the presentation slides](https://policyengine.github.io/policyengine-uk-event-2025/).

## Event overview

The event featured presentations from PolicyEngine's team and external speakers, covering technical capabilities, real-world applications, and future directions for the platform. Supported by the Nuffield Foundation, the gathering demonstrated PolicyEngine's expanding role in UK policy analysis.

## PolicyEngine's journey and vision

Max Ghenis, Founder and CEO of PolicyEngine, opened the event by tracing PolicyEngine's evolution from its origins at the UBI Centre in 2020 to its establishment as an independent nonprofit in 2021. Key milestones included early UK policy scoring demonstrations, US expansion in March 2022, development of economic simulation with representative datasets, and the launch of multiple access surfaces including the Python package and AI summarisation in 2023.

Adoption has grown across organisations including the Green Party, Centre for Policy Studies, NIESR, IEA, Social Market Foundation, Liberal Democrats, and UK in a Changing Europe. In March 2025, HM Treasury began piloting PolicyEngine UK. The Nuffield Foundation's grant supports expansion with childcare integration, public services modelling, local datasets, validation dashboards, and AI-enhanced design.

## Technology and AI infrastructure

Nikhil Woodruff, Co-founder, CTO and UK Country Director, demonstrated how PolicyEngine applies artificial intelligence and modern software architecture for UK policy analysis. Built on OpenFisca-Core, the platform processes policy simulations in real-time. The AI-powered explanation system, launched in 2024, translates tax and benefit calculations into clear language. Machine learning addresses data limitations, particularly the Family Resources Survey's undersampling of higher-income households, while maintaining efficiency across millions of policy configurations.

## Model scope and capabilities

Vahid Ahmadi, UK Research Associate, presented PolicyEngine UK's modelling scope, covering tax and benefit rules from income tax and National Insurance to Universal Credit, Council Tax support, and childcare programmes. The platform maintains current policy while enabling simulation of hypothetical reforms through its OpenFisca-based architecture.

Data enhancement capabilities address under-sampling and measurement errors through machine learning. Using random forest imputation and gradient descent reweighting, PolicyEngine fuses the Family Resources Survey with the Wealth and Assets Survey and Living Costs and Food Survey. Behavioural response modelling captures labour supply and capital gains tax effects. For Capital Gains Tax analysis, behavioural modelling projected lower five-year revenue than static analysis.

## Local area analysis

Nikhil Woodruff and Ben Ogorek, Senior Data Scientist, presented PolicyEngine's local area modelling framework, estimating tax and benefit policy impacts at the parliamentary constituency and local authority level. The system reweights Family Resources Survey data to match administrative statistics from HMRC, ONS, ASHE, and the House of Commons Library, using gradient-based optimisation across 11,000 targets covering income, age, and employment patterns.

The [interactive dashboard](https://uk-local-areas-dashboard-578039519715.us-central1.run.app/) enables MPs to understand constituency-specific effects and helps local authorities assess benefit changes. PolicyEngine US builds upon this infrastructure by cloning households for each local area rather than reweighting, revealing programme participation patterns at the congressional district level. The underlying software will be made available for usage beyond PolicyEngine. PolicyEngine plans to incorporate this approach into UK data in 2026.

## User experience design

Biniam Gebre, Co-Founder of Citizen Codex, and MaSara Myers, Creative Director of Citizen Codex, presented the user experience research behind PolicyEngine 2.0. Through interviews with policymakers, researchers, journalists, and citizens, they gathered insights about needs and pain points. These insights shaped design decisions, from information architecture to visual design, ensuring microsimulation results are both accurate and comprehensible. The speakers showcased design patterns for distributional analysis, budget impacts, and household-level effects.

## Platform demonstration

Anthony Volk, Software Engineer, demonstrated the redesigned PolicyEngine 2.0 platform. The new interface clarifies the separation of PolicyEngine's fundamental concepts: policies, households, and dynamics, and integrates these into simulations and reports. Users can easily save and view past versions of each element to combine into novel insights.

## Applications in practice

### NIESR's living standards review

Max Mosley, Senior Economist at the New Economics Foundation and formerly at NIESR, [presented](https://docs.google.com/presentation/d/1qSPVxdCdz9kIP5O4YWVw7kfQR5jzCu9y/edit?usp=sharing&ouid=106351675150319968795&rtpof=true&sd=true) how PolicyEngine supported NIESR's [UK Living Standards Review 2025](https://niesr.ac.uk/publications/uk-living-standards-review-2025?type=report). PolicyEngine enabled NIESR to analyse policy interventions, particularly poverty reduction measures. Analysis compared cost per person lifted from poverty of policies such as removing the two-child limit. PolicyEngine's accessibility improved the efficiency of NIESR's analysis and communication of findings.

### Carbon dividend analysis

Malcolm Torry, formerly at the Basic Income Earth Network and London School of Economics, [presented](https://docs.google.com/presentation/d/19yRatNQKqzKwT5v1HlCtpHjksXRBGddb/edit?usp=sharing&ouid=106351675150319968795&rtpof=true&sd=true) PolicyEngine's application to [carbon tax and dividend proposals](/uk/research/uk-carbon-tax-dividend), where carbon tax revenue funds unconditional payments. Two scenarios were analysed: a £100 per tonne tax funding £18.60 per week dividends, and a £200 per tonne tax funding £37.40 per week. While both scenarios redistribute from higher-income to lower-income households, some households on lower incomes would experience losses. Microsimulation shows precisely which households gain and lose under different approaches.

### VAT analysis with firm microdata

Vahid Ahmadi [presented](https://uk-vatlab-app1j7s6o-policy-engine.vercel.app/) PolicyEngine's firm-level microsimulation for VAT policy, analysing threshold changes between £70,000 and £120,000 for 2026-27. Using synthetic firm microdata calibrated to ONS and HMRC statistics, the model captures firms by industry, turnover, employees, and VAT liability.

PolicyEngine's estimates deviate an average of 12.3% from HMRC projections. Raising the threshold to £100,000 would remove 48,000 firms from VAT registration and reduce revenue by £371 million, while a £70,000 threshold would add 109,000 firms and generate £642 million.

### US policy analysis tools

David Trimmer, Policy Research Fellow, and Daphne Hansell, Research Associate, demonstrated PolicyEngine US's household-level analysis tools through two recent applications.

Trimmer presented the [household-by-household interactive](https://policyengine.github.io/obbba-household-by-household/) for the One Big Beautiful Bill Act (OBBBA), which allows users to explore the legislation's effects on over 40,000 representative households using PolicyEngine's Enhanced Current Population Survey data. The interactive's "Get Random Household" function reveals how the same policy affects different families across America's diverse population, with each household weighted by population representation.

Hansell demonstrated a tool for simulating the extension of enhanced premium tax credits, which expire after 2025. The tool shows how different extension scenarios affect health insurance subsidy impacts at the individual household level. These tools make policy impacts tangible by showing real effects on specific family types rather than aggregate statistics alone.

## Panel discussion on evidence-based policymaking

Max Ghenis moderated a panel discussion with Arun Advani, Director of CenTax and Professor of Economics at the University of Warwick, and Anvar Sarygulov, Research Grants and Programmes Manager at the Nuffield Foundation, exploring the evolving landscape of evidence-based policymaking. The conversation examined how open models, administrative data, and artificial intelligence are reshaping policy analysis, bringing together perspectives from academic research, philanthropy, and open-source tool development.

## AI roadmap

Max Ghenis and Nikhil Woodruff presented PolicyEngine's AI roadmap across three pillars: building software, improving models, and augmenting software.

For building software, they announced the beta launch of the [policyengine-claude plugin](https://github.com/policyengine/policyengine-claude), providing custom commands, specialised agents, and domain knowledge for PolicyEngine development. They demonstrated a scientific approach to rules-as-code automation: creating golden pull requests with manually verified code, using AI to generate implementations from policy descriptions, then iteratively adjusting prompts to maximise alignment between AI-produced and golden code.

The team demonstrated multi-agent workflows for policy research, building on Vahid Ahmadi's [Testing multi-agent AI workflows for policy research](/uk/research/multi-agent-workflows-policy-research). The demonstration showed specialised agents handling data fetching, Python script writing, and report generation. For standard distributional analyses calculating poverty rates and decile-level impacts, the agents produced output matching manual approaches while maintaining PolicyEngine's writing standards. Complex benefit programme interactions requiring understanding of coordination logic between multiple programmes remain challenging for agents. The team positions these workflows as handling routine policy updates where analysis structure stays constant, allowing human researchers to focus on questions requiring policy expertise.

For improving models, two priorities were presented: continuing US local area modelling work with enhanced calibration methods while transferring these to UK constituencies and local authorities, and exploring synthetic panel generation to enable lifetime programme simulation (such as US Social Security solvency) where current cross-sectional survey data provides only snapshots.

For augmenting software, they previewed PolicyEngine App v2's natural language capabilities: LLM extraction to pull relevant insights from the database based on natural language queries, and flexible visualisations to present insights through adaptive charts on an extensible report canvas. The presentation concluded with reflections on AI's potential to enable policy analysis that is more comprehensive, accurate, and accessible, balanced against challenges as AI transforms society through changing income patterns and creating new demands for policy research aligned with societal values.

## Looking ahead

The event demonstrated PolicyEngine's technical capabilities and growing adoption across policy research, think tanks, and government. With integration of AI technologies, PolicyEngine aims to expand access to policy analysis while maintaining accuracy and transparency in its modelling approach.
