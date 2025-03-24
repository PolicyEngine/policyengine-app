HM Treasury pilots PolicyEngine UK for tax-benefit microsimulation

The UK's HM Treasury has explored using PolicyEngine UK as a potential supplement to their existing tax-benefit models, marking a significant milestone in the recognition of PolicyEngine's accuracy and utility at the highest levels of government.

According to a [recently published Algorithmic Transparency Record](https://www.gov.uk/algorithmic-transparency-records/hmt-modelling-policy-engine) from December 17, 2024, HM Treasury's Personal Tax, Welfare and Pensions team conducted a beta/pilot evaluation of PolicyEngine UK to assess its capabilities in microsimulating tax and benefit policy changes.

The Treasury record notes that PolicyEngine UK "uses machine learning and gradient descent methods to tackle two key sources of error in household survey data typically used for modelling tax and welfare policies: under-sampling of certain demographics of households or individuals, and measurement errors such as underreporting of income and benefits."

HM Treasury explored the scope for "making greater use of this model for advising policymakers on the impact of tax and welfare measures on households, supplementing the existing models used for this (such the Intra-Governmental Tax and Benefit Microsimulation model – IGOTM)."

Media coverage of this pilot appeared in [The Times](https://www.thetimes.co.uk/uk/politics/article/how-civil-servants-really-use-ai-from-lesson-plans-to-recruitment-k8nzghbn8), which noted that "The Treasury is using the technology to more accurately measure how changes to national insurance, income tax and universal credit would affect different groups. It is believed that the tool, PolicyEngine, can more accurately predict the outcome of ministers' decisions and is expected to be used mostly in budget periods." The Guardian also [mentioned](https://www.theguardian.com/technology/2024/dec/17/amazon-hosted-ai-tool-for-uk-military-recruitment-carries-risk-of-data-breach) PolicyEngine in its coverage of the government's AI tools initiatives.

The Treasury's review of PolicyEngine highlighted several features, including:

- Combining multiple years of Family Resources Survey data for increased robustness
- Using Survey of Personal Incomes (SPI) imputation with random forest models to address income measurement errors
- Employing gradient descent reweighting to minimize loss between survey aggregates and target statistics
- Imputing additional variables using multiple data sources including the Wealth and Assets Survey and Living Costs and Food Survey
- Using microsimulation to uprate policies to target years

This comes not long after the [December 2024 announcement](/uk/research/posts/uk-nuffield-grant) that PolicyEngine received a £251,296 grant from the Nuffield Foundation to enhance our UK tax-benefit microsimulation model. The Nuffield-funded project will significantly expand PolicyEngine UK's capabilities, including:

- Creating representative micro-datasets for each local authority and constituency
- Integrating childcare subsidies and major public service spending
- Developing validation tools comparing PolicyEngine outputs to other microsimulation models
- Implementing user-centric design improvements with AI capabilities

The Treasury's assessment included risk considerations as part of their evaluation process. As noted in their transparency record, potential risks like "Erroneous Operation of the Code" would be mitigated through "thorough review and testing" involving both technical and policy teams - a common approach for any model implementation in government settings.

These developments represent significant recognition of PolicyEngine's open-source approach to tax-benefit microsimulation and our mission to democratize economic policy analysis tools.