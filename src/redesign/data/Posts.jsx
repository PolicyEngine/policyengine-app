let posts = [
  {
    title: "PolicyEngine's 2022 year in review",
    description: "A year of launches, analysis, and building for the future.",
    date: "2022-12-30",
    tags: ["global", "impact"],
    filename: "policyengine-2022-year-in-review.md",
    image: "policyengine-2022-year-in-review.png",
    authors: ["max-ghenis"],
  },
  {
    title: "How machine learning tools make PolicyEngine more accurate",
    description:
      "Today, we’re launching new survey weights that cut deviations from administrative statistics by 97%.",
    date: "2022-03-07",
    tags: ["uk", "technical"],
    filename: "how-machine-learning-tools-make-policyengine-more-accurate.md",
    image: "how-machine-learning-tools-make-policyengine-more-accurate.png",
    authors: ["nikhil-woodruff"],
  },
  {
    title: "Enhancing the Current Population Survey for policy analysis",
    description:
      "We’ve used modern data science techniques to make PolicyEngine the UK’s most accurate microsimulation model. In 2023, we’ll do the same in the US.",
    date: "2022-12-28",
    tags: ["us", "technical"],
    filename: "enhancing-the-current-population-survey-for-policy-analysis.md",
    image: "enhancing-the-current-population-survey-for-policy-analysis.png",
    authors: ["max-ghenis"],
  },
  {
    title: "How charitable contributions affect Americans’ taxes",
    description:
      "PolicyEngine estimates the tax impact of your donations for free.",
    date: "2022-11-29",
    tags: ["us", "policy"],
    filename: "charitable-contributions.md",
    image: "charitable-contributions.png",
    authors: ["max-ghenis"],
  },
  {
    title: "Maryland's standard deduction",
    description:
      "PolicyEngine computes the program’s impact on Maryland and individual households.",
    date: "2022-11-22",
    tags: ["us", "policy"],
    filename: "maryland-standard-deduction.md",
    image: "maryland-standard-deduction.png",
    authors: ["kevin-foster"],
  },
  {
    title: "From OpenFisca to PolicyEngine",
    description:
      "OpenFisca has catapulted our progress, and now we’ve forked it into our own microsimulation framework.",
    date: "2022-11-10",
    tags: ["global", "technical"],
    filename: "from-openfisca-to-policyengine.md",
    image: "from-openfisca-to-policyengine.png",
    authors: ["nikhil-woodruff"],
  },
  {
    title: "Oregon’s Nonrefundable Exemption Credit",
    description:
      "PolicyEngine computes the program’s impact on Oregon and individual households.",
    date: "2022-11-04",
    tags: ["us", "policy"],
    filename: "oregons-nonrefundable-exemption-credit.md",
    image: "oregons-nonrefundable-exemption-credit.jpeg",
    authors: ["kevin-foster"],
  },
  {
    title: "Stamp duties in PolicyEngine UK",
    date: "2022-09-22",
    authors: ["nikhil-woodruff"],
    tags: ["uk", "technical"],
    description:
      "The Times reported yesterday that Prime Minister Liz Truss will announce plans to cut Stamp Duty this week. PolicyEngine now supports\u2026",
    filename: "stamp-duties-in-policyengine-uk.md",
    image: "stamp-duties-in-policyengine-uk.jpg",
  },
  {
    title: "Prime Minister Liz Truss\u2019s energy bill price cap",
    date: "2022-09-16",
    authors: ["max-ghenis"],
    tags: ["uk", "policy"],
    description: "See the impact in PolicyEngine.",
    filename: "prime-minister-liz-trusss-energy-bill-price-cap.md",
    image: "prime-minister-liz-trusss-energy-bill-price-cap.jpg",
  },
  {
    title: "Raising the marriage allowance from 10% to 100%",
    date: "2022-08-29",
    authors: ["nikhil-woodruff"],
    tags: ["uk", "policy"],
    description: "See the reform in PolicyEngine.",
    filename: "raising-the-marriage-allowance-from-10-to-100.md",
    image: "raising-the-marriage-allowance-from-10-to-100.jpg",
  },
  {
    title: "PolicyEngine launches in Washington state",
    date: "2022-08-10",
    authors: ["max-ghenis"],
    tags: ["us", "technical"],
    description:
      "Washingtonians can now compute the impacts of the Working Families Tax Credit and federal reforms.",
    filename: "policyengine-launches-in-washington-state.md",
    image: "policyengine-launches-in-washington-state.jpg",
  },
  {
    title:
      "Electric vehicle tax credits under current law and the Inflation Reduction Act",
    date: "2022-08-05",
    authors: ["max-ghenis"],
    tags: ["us", "policy"],
    description:
      "Use PolicyEngine US to analyze provisions of the potential reconciliation bill.",
    filename:
      "electric-vehicle-tax-credits-under-current-law-and-the-inflation-reduction-act.md",
    image:
      "electric-vehicle-tax-credits-under-current-law-and-the-inflation-reduction-act.jpg",
  },
  {
    title: "Rishi Sunak\u2019s proposal to cut the basic rate to 16 percent",
    date: "2022-08-01",
    authors: ["max-ghenis"],
    tags: ["uk", "policy"],
    description: "See the interactive simulation on PolicyEngine",
    filename: "rishi-sunaks-proposal-to-cut-the-basic-rate-to-16-percent.md",
    image: "rishi-sunaks-proposal-to-cut-the-basic-rate-to-16-percent.jpg",
  },
  {
    title: "The new PolicyEngine US Population Impact page",
    date: "2022-07-01",
    authors: ["max-ghenis"],
    tags: ["us", "technical"],
    description:
      "You design the policy. We compute the poverty, inequality, and budgetary impacts.",
    filename: "the-new-policyengine-us-population-impact-page.md",
    image: "the-new-policyengine-us-population-impact-page.jpg",
  },
  {
    title:
      "PolicyEngine at the BIG Conference and the Beeck Center\u2019s Rules as Code Demo Day",
    date: "2022-06-09",
    authors: ["max-ghenis"],
    tags: ["us", "impact"],
    description:
      "Register for the BIG Conference June 23\u201325 and the Rules as Code Demo Day June 28",
    filename:
      "policyengine-at-the-basic-income-guarantee-conference-and-the-beeck-centers-rules-as-code-demo-day.md",
    image:
      "policyengine-at-the-basic-income-guarantee-conference-and-the-beeck-centers-rules-as-code-demo-day.jpg",
  },
  {
    title: "Impact of the Chancellor\u2019s Cost of Living Support package",
    date: "2022-05-26",
    authors: ["max-ghenis"],
    tags: ["uk", "policy"],
    description: "See the analysis in PolicyEngine UK",
    filename: "impact-of-the-chancellors-cost-of-living-support-package.md",
    image: "impact-of-the-chancellors-cost-of-living-support-package.jpg",
  },
  {
    title: "How developers can explore the PolicyEngine API",
    date: "2022-04-29",
    authors: ["nikhil-woodruff"],
    tags: ["global", "technical"],
    description:
      "The UK API explorer and US API explorer describe variables and policy parameters in our models.",
    filename: "how-developers-can-explore-the-policyengine-api.md",
    image: "how-developers-can-explore-the-policyengine-api.jpg",
  },
  {
    title: "Make Everyone a Policymaker",
    date: "2021-10-15",
    authors: ["nikhil-woodruff"],
    tags: ["global", "impact"],
    description:
      "Today we’re (re)launching PolicyEngine to give the public unprecedented insight into the tax and benefit system.",
    filename: "make-everyone-a-policymaker.md",
    image: "make-everyone-a-policymaker.webp",
  },
  {
    title: "Analysing Autumn Budget Universal Credit reforms with PolicyEngine",
    date: "2021-10-30",
    authors: ["nikhil-woodruff"],
    tags: ["uk", "policy"],
    description:
      "See how the reform affects the UK population or your household.",
    filename:
      "analysing-autumn-budget-universal-credit-reforms-with-policyengine.md",
    image:
      "analysing-autumn-budget-universal-credit-reforms-with-policyengine.webp",
  },
  {
    title: "Income Tax cuts Rishi Sunak is reportedly considering",
    date: "2021-12-04",
    authors: ["max-ghenis"],
    tags: ["uk", "policy"],
    description:
      "Explore the basic rate and additional rate cuts in PolicyEngine.",
    filename: "income-tax-cuts-rishi-sunak-is-reportedly-considering.md",
    image: "income-tax-cuts-rishi-sunak-is-reportedly-considering.webp",
  },
  {
    title: "PolicyEngine’s 2021 year in review",
    date: "2021-12-29",
    authors: ["max-ghenis"],
    tags: ["global", "impact"],
    description:
      "PolicyEngine’s inaugural year was a substantial one for public policy.",
    filename: "policyengines-2021-year-in-review.md",
    image: "policyengines-2021-year-in-review.webp",
  },
  {
    title: "The Green Party Manifesto at PolicyFest",
    date: "2022-01-26",
    authors: ["nikhil-woodruff"],
    tags: ["uk", "policy"],
    description: "Explore the Green Party Manifesto on PolicyEngine.",
    filename: "the-green-party-manifesto-at-policyfest.md",
    image: "the-green-party-manifesto-at-policyfest.webp",
  },
  {
    title: "PolicyEngine arrives stateside",
    date: "2022-03-31",
    authors: ["max-ghenis"],
    tags: ["us", "impact"],
    description:
      "Today, we’re beta-launching PolicyEngine US and several other new features.",
    filename: "policyengine-comes-stateside.md",
    image: "policyengine-comes-stateside.webp",
  },
  {
    title: "How PolicyEngine estimates the effects of UK carbon taxes",
    date: "2022-04-23",
    authors: ["nikhil-woodruff"],
    tags: ["uk", "technical"],
    description:
      "By fusing datasets with machine learning, we empower anyone to integrate custom carbon taxes with other tax and benefit reforms.",
    filename: "how-policyengine-estimates-the-effects-of-uk-carbon-taxes.md",
    image: "how-policyengine-estimates-the-effects-of-uk-carbon-taxes.png",
  },
  {
    title: "Tax cuts in Prime Minister Truss’s Growth Plan 2022",
    date: "2022-09-23",
    authors: ["max-ghenis"],
    tags: ["uk", "policy"],
    description:
      "See the impact on the population and on your household in PolicyEngine UK.",
    filename: "tax-cuts-in-prime-minister-trusss-growth-plan.md",
    image: "tax-cuts-in-prime-minister-trusss-growth-plan.png",
  },
  {
    title:
      "How to simulate basic and guaranteed income policies in PolicyEngine US",
    date: "2022-09-27",
    authors: ["max-ghenis"],
    tags: ["us", "technical"],
    description:
      "From universal basic income to age-dependent means-tested payments, we’ve got you covered.",
    filename:
      "how-to-simulate-basic-and-guaranteed-income-policies-in-policyengine-us.md",
    image:
      "how-to-simulate-basic-and-guaranteed-income-policies-in-policyengine-us.png",
  },
  {
    title: "PolicyEngine launches in New York state",
    date: "2022-10-21",
    authors: ["max-ghenis"],
    tags: ["us", "policy"],
    description:
      "New Yorkers can now estimate their state income taxes alongside federal taxes and benefits — and change the rules, too.",
    filename: "policyengine-launches-in-new-york-state.md",
    image: "policyengine-launches-in-new-york-state.webp",
  },
  {
    title: "Computing your Oregon Earned Income Tax Credit in PolicyEngine",
    date: "2022-10-24",
    authors: ["kevin-foster"],
    tags: ["us", "policy"],
    description: "We walk you through it step by step.",
    filename: "computing-your-oregon-earned-income-tax-credit.md",
    image: "computing-your-oregon-earned-income-tax-credit.png",
  },
  {
    title:
      "Estimating your Supplemental Security Income benefits in PolicyEngine",
    date: "2022-10-28",
    authors: ["max-ghenis"],
    tags: ["us", "policy"],
    description:
      "Enter your household information, and our free web app will estimate your SSI — plus other taxes and benefits.",
    filename:
      "estimating-your-supplemental-security-income-benefits-in-policyengine.md",
    image:
      "estimating-your-supplemental-security-income-benefits-in-policyengine.webp",
  },
  {
    title: "Updating PolicyEngine to reflect SNAP reform in the omnibus bill",
    date: "2022-12-23",
    authors: ["max-ghenis"],
    tags: ["us", "technical"],
    description:
      "A step-by-step guide to syncing our code with the latest legislation.",
    filename:
      "updating-policyengine-to-reflect-snap-reform-in-the-omnibus-bill.md",
    image:
      "updating-policyengine-to-reflect-snap-reform-in-the-omnibus-bill.webp",
  },
  {
    title:
      "From idea to impact: scoring a policy reform on the new PolicyEngine UK",
    date: "2023-01-12",
    authors: ["nikhil-woodruff"],
    tags: ["uk", "technical"],
    description: "A walkthrough of the new app on a UK tax-benefit reform.",
    filename:
      "from-idea-to-impact-scoring-a-policy-reform-on-the-new-policyengine-uk.md",
    image:
      "from-idea-to-impact-scoring-a-policy-reform-on-the-new-policyengine-uk.png",
  },
  {
    title:
      "From idea to impact: scoring a policy reform on the new PolicyEngine US",
    date: "2023-01-12",
    authors: ["nikhil-woodruff"],
    tags: ["us", "technical"],
    description: "A walkthrough of the new app on a US tax-benefit reform.",
    filename:
      "from-idea-to-impact-scoring-a-policy-reform-on-the-new-policyengine-us.md",
    image:
      "from-idea-to-impact-scoring-a-policy-reform-on-the-new-policyengine-us.png",
  },
  {
    title: "The New PolicyEngine",
    date: "2023-01-12 00:00:01",
    authors: ["max-ghenis"],
    tags: ["us", "impact"],
    description:
      "We’re exiting beta with the most accessible tax and benefit model ever built.",
    filename: "us-the-new-policyengine.md",
    image: "us-the-new-policyengine.png",
  },
  {
    title: "The New PolicyEngine",
    date: "2023-01-12 00:00:01",
    authors: ["max-ghenis"],
    tags: ["uk", "impact"],
    description:
      "We’re taking economic policy to the next level with the most accessible tax and benefit model ever built.",
    filename: "uk-the-new-policyengine.md",
    image: "uk-the-new-policyengine.png",
  },
  {
    title: "How would reforms affect cliffs?",
    date: "2023-02-02 21:00:00",
    authors: ["max-ghenis", "nikhil-woodruff"],
    tags: ["us", "policy"],
    description:
      "We’ve added a new feature to the US version of PolicyEngine that lets you see how your reforms affect cliffs.",
    filename: "how-would-reforms-affect-cliffs.md",
    image: "how-would-reforms-affect-cliffs.png",
  },
  {
    title: "Reform UK’s Emergency Recovery Plan",
    description:
      "See the UK party’s proposed deficit-funded tax cuts in PolicyEngine",
    date: "2023-02-09 11:15:00",
    tags: ["uk", "policy"],
    filename: "reform-uks-emergency-recovery-plan.md",
    image: "reform-uks-emergency-recovery-plan.png",
    authors: ["nikhil-woodruff"],
  },
  {
    title: "The Child Tax Credit in 2023",
    description:
      "We review how the program works and compute its impact with PolicyEngine US.",
    date: "2023-02-09 00:00:00",
    tags: ["us", "policy"],
    filename: "the-child-tax-credit-in-2023.md",
    image: "the-child-tax-credit-in-2023.png",
    authors: ["max-ghenis"],
  },
  {
    title:
      "Restoration of the American Rescue Plan Act’s expanded Child Tax Credit",
    description:
      "PolicyEngine computes how the 2021 policy would affect Americans and America in 2023.",
    date: "2023-02-10 00:00:00",
    tags: ["us", "policy"],
    filename:
      "restoration-of-the-american-rescue-plan-acts-expanded-child-tax-credit.md",
    image:
      "restoration-of-the-american-rescue-plan-acts-expanded-child-tax-credit.png",
    authors: ["max-ghenis"],
  },
  {
    title: "OpenFisca wins Edge of Government’s Innovation Award",
    description: "The success of Rules as Code and its impact on citizens.",
    date: "2023-02-15 00:00:00",
    tags: ["global", "impact"],
    filename: "openfisca-wins-edge-of-government-innovation-award.md",
    image: "openfisca-wins-edge-of-government-innovation-award.jpeg",
    authors: ["max-ghenis"],
  },
  {
    title:
      "Massachusetts Governor Maura Healey’s FY 2024 Budget Recommendation",
    description:
      "PolicyEngine estimates the distributional impact of two provisions and the household impact of four provisions.",
    date: "2023-03-03 00:00:00",
    tags: ["us", "us-ma", "policy"],
    filename:
      "massachusetts-governor-maura-healeys-fy-2024-budget-recommendation.md",
    image:
      "massachusetts-governor-maura-healeys-fy-2024-budget-recommendation.webp",
    authors: ["max-ghenis", "nicholas-rodelo"],
  },
  {
    title: "The UK’s extended Energy Price Guarantee",
    description:
      "Analysis by PolicyEngine on the expected effects on income, poverty, and inequality.",
    date: "2023-03-05 07:30:00",
    tags: ["uk", "policy"],
    filename: "projected-impact-of-the-uks-extended-energy-price-guarantee.md",
    image: "projected-impact-of-the-uks-extended-energy-price-guarantee.png",
    authors: ["nikhil-woodruff", "max-ghenis"],
  },
  {
    title: "Breaking down poverty impacts by sex",
    description:
      "PolicyEngine estimates the impact of customizable policy reforms on poverty — overall, by age, and now by sex.",
    date: "2023-03-08 07:30:00",
    tags: ["us", "technical"],
    filename: "breaking-down-us-poverty-impacts-by-sex.md",
    image: "breaking-down-poverty-impacts-by-sex.png",
    authors: ["max-ghenis"],
  },
  {
    title: "Breaking down poverty impacts by sex",
    description:
      "PolicyEngine estimates the impact of customisable policy reforms on poverty — overall, by age, and now by sex.",
    date: "2023-03-08 07:30:00",
    tags: ["uk", "featured", "technical"],
    filename: "breaking-down-uk-poverty-impacts-by-sex.md",
    image: "breaking-down-poverty-impacts-by-sex.png",
    authors: ["nikhil-woodruff"],
  },
  {
    title: "Analysis of the Spring Budget 2023",
    description:
      "PolicyEngine analysis estimates the impact of the EPG extension and the fuel duty freeze.",
    date: "2023-03-15 18:10:00",
    tags: ["uk", "featured", "policy"],
    filename: "analysis-of-the-spring-budget-2023.md",
    image: "analysis-of-the-spring-budget-2023.jpeg",
    authors: ["nikhil-woodruff"],
  },
  {
    title:
      "Automate policy analysis with PolicyEngine’s new ChatGPT integration",
    description:
      "Score an economic impact in a few clicks. Write a report in one more.",
    date: "2023-03-17 11:00:00",
    tags: ["global", "technical"],
    filename:
      "automate-policy-analysis-with-policy-engines-new-chatgpt-integration.md",
    image:
      "automate-policy-analysis-with-policy-engines-new-chatgpt-integration.png",
    authors: ["nikhil-woodruff", "chat-gpt"],
  },
  {
    title: "Oregon's nonrefundable exemption credit: a closer look",
    description:
      "PolicyEngine computes the program's impact on Oregon and individual households.",
    date: "2023-03-15",
    tags: ["us", "policy"],
    filename: "oregons-nonrefundable-exemption-credit.md",
    image: "oregons-nonrefundable-exemption-credit.jpeg",
    authors: ["kevin-foster"],
  },
  {
    title: "How much should James Medlock donate to GiveDirectly?",
    description:
      "We built a mini-app with the policyengine-us Python package to crunch the implications of a Twitter bet.",
    date: "2023-03-23 01:00:00",
    tags: ["us", "technical"],
    filename: "medlock-donation-calculator.md",
    image: "medlock-donation-calculator.png",
    authors: ["max-ghenis", "nikhil-woodruff"],
  },
  {
    title:
      "FiscalSim and PolicyEngine: Emphasizing collaboration and open-source acknowledgment",
    description:
      "The Center for Growth and Opportunity launches FiscalSim, a US policy-computing web app drawing heavily from PolicyEngine’s work.",
    date: "2023-03-24 01:00:00",
    tags: ["us", "technical"],
    filename: "fiscalsim.md",
    image: "fiscalsim.png",
    authors: ["max-ghenis", "nikhil-woodruff"],
  },
  {
    title:
      "Restoring the American Rescue Plan's Earned Income Tax Credit Expansion",
    description:
      "We review how the expansion works and model its impact with PolicyEngine US.",
    date: "2023-03-27 01:00:00",
    tags: ["us", "policy"],
    filename: "restoring-arpa-eitc.md",
    image: "eitc.webp",
    authors: ["arthur-wright"],
  },
  {
    title: "Breaking down policy impacts by wealth decile",
    description: "Income isn’t everything.",
    date: "2023-03-28 09:00:00",
    tags: ["uk", "technical"],
    filename: "breaking-down-policy-impacts-by-wealth-decile.md",
    image: "breaking-down-policy-impacts-by-wealth-decile.png",
    authors: ["nikhil-woodruff"],
  },
  {
    title: "The District Child Tax Credit proposal",
    description:
      "Analysis of DC Councilmember Zachary Parker's new legislation.",
    date: "2023-04-02 09:00:00",
    tags: ["us", "us-dc", "policy"],
    filename: "district-child-tax-credit.md",
    image: "district-child-tax-credit.png",
    authors: ["max-ghenis"],
  },
  {
    title: "Announcing the addition of Kansas income tax to PolicyEngine",
    description:
      "We’ve expanded our tax calculator and customizable reform simulator to the Sunflower State.",
    date: "2023-04-03 09:00:00",
    tags: ["us", "us-ks", "policy"],
    filename: "kansas-income-tax.md",
    image: "kansas-income-tax.png",
    authors: ["max-ghenis"],
  },
  {
    title: "Revolutionizing policy analysis with AI",
    description:
      "Discover PolicyEngine’s new GPT-4 integration and audience modes.",
    date: "2023-04-03 16:00:00",
    tags: ["global", "technical"],
    filename: "gpt-analysis.md",
    image: "ai-analysis.png",
    authors: ["nikhil-woodruff", "chat-gpt"],
  },
  {
    title: "Introducing California income tax analysis on PolicyEngine",
    description:
      "Expanding our tax calculator and reform simulator capabilities to the most populous state.",
    date: "2023-04-07 09:00:00",
    tags: ["us", "us-ca", "policy"],
    filename: "california-income-tax.md",
    image: "california-income-tax.png",
    authors: ["max-ghenis"],
  },
  {
    title: "PolicyEngine adds New York Family Assistance (TANF) to US model",
    description:
      "Enhancing analysis of public policy impacts on needy families.",
    date: "2023-04-08 09:00:00",
    tags: ["us", "us-ny", "policy"],
    filename: "new-york-tanf.md",
    image: "new-york-tanf.png",
    authors: ["max-ghenis", "donglai-xu", "lin-tao"],
  },
  {
    title:
      "Analysis of the DC Financial Support for Families with Children Amendment Act",
    description:
      "Evaluating Councilmember Zachary Parker’s second Child Tax Credit proposal of 2023.",
    date: "2023-04-16 09:00:00",
    tags: ["us", "us-dc", "policy"],
    filename: "dc-financial-support-for-families-with-children.md",
    image: "dc-financial-support-for-families-with-children.png",
    authors: ["max-ghenis"],
  },
  {
    title: "Introducing Utah State Income Tax Analysis on PolicyEngine",
    description:
      "Expanding our tax calculator and reform simulator capabilities to the Beehive State.",
    date: "2023-04-17 09:00:00",
    tags: ["us", "us-ut", "policy"],
    filename: "introducing-utah-state-income-tax-analysis-on-policyengine.md",
    image: "introducing-utah-state-income-tax-analysis-on-policyengine.webp",
    authors: ["nikhil-woodruff"],
  },
  {
    title: "Building the roots of PolicyEngine Nigeria",
    description:
      "We’re expanding PolicyEngine’s reach by empowering Nigerians to understand personal income tax policies.",
    date: "2023-04-21 09:00:00",
    tags: ["ng", "technical"],
    filename: "building-the-roots-of-policyengine-nigeria.md",
    image: "building-the-roots-of-policyengine-nigeria.webp",
    authors: ["nikhil-woodruff", "max-ghenis"],
  },
  {
    title: "Kansas’s Flat Tax Proposal — SB169",
    description:
      "We review how the bill works and model its impact with PolicyEngine US.",
    date: "2023-04-23 09:00:00",
    tags: ["us", "us-ks", "policy"],
    filename: "kansas-flat-income-tax-sb-169.md",
    image: "kansas-flat-income-tax-sb-169.webp",
    authors: ["arthur-wright"],
  },
  {
    title:
      "Digital Public Goods Alliance recognizes PolicyEngine as a Digital Public Good",
    description:
      "The UN-endorsed initiative highlights PolicyEngine’s open source approach to supporting the Sustainable Development Goals.",
    date: "2023-04-26 09:00:00",
    tags: ["global", "impact", "featured"],
    filename:
      "digital-public-goods-alliance-recognizes-policyengine-as-a-digital-public-good.md",
    image:
      "digital-public-goods-alliance-recognizes-policyengine-as-a-digital-public-good.webp",
    authors: ["nikhil-woodruff"],
  },
  {
    title:
      "How PolicyEngine shaped the outcome of the $1 million bet James Medlock won today",
    description:
      "Our free tax calculator helped determine Balaji Srinivasan’s $500,000 payments to Medlock and GiveDirectly.",
    date: "2023-05-02 16:00:00",
    tags: ["us", "technical"],
    filename: "medlock-wins.md",
    image: "medlock-wins.png",
    authors: ["max-ghenis"],
  },
  {
    title: "Analysis of Guaranteed Income for the 21st Century",
    description:
      "The proposal from the New School and the Economic Security Project would lower poverty and inequality while expanding cliffs.",
    date: "2023-06-08 13:45:00",
    filename: "analysis-of-guaranteed-income-for-the-21st-century.md",
    tags: ["us", "featured", "policy"],
    image: "analysis-of-guaranteed-income-for-the-21st-century.jpg",
    authors: ["max-ghenis"],
  },
  {
    title: "Analysis of the Working Families Tax Cut Act",
    description:
      "How the proposal to increase the standard deduction would affect households and society.",
    date: "2023-06-08 20:00:00",
    filename: "malliotakis-steel-working-families-tax-cut-act.md",
    tags: ["us", "featured", "policy"],
    image: "malliotakis-steel-working-families-tax-credit-act.png",
    authors: ["max-ghenis", "nikhil-woodruff"],
  },
  {
    title: "Unveiling poverty impacts by race and ethnicity",
    description:
      "A new feature from PolicyEngine reveals how customizable tax and benefit reforms affect poverty rates for Black, White, Hispanic, and other Americans.",
    date: "2023-06-19 20:00:00",
    filename: "poverty-race-ethnicity.md",
    tags: ["us", "technical"],
    image: "poverty-race-ethnicity.jpg",
    authors: ["max-ghenis"],
  },
  {
    title: "Scott Winship’s individualized Earned Income Tax Credit proposal",
    description: "An analysis and note on the value of open-source models.",
    date: "2023-07-14 08:00:00",
    filename: "winship-individualized-eitc.md",
    tags: ["us", "policy", "featured"],
    image: "winship-individualized-eitc.jpg",
    authors: ["max-ghenis"],
  },
  {
    title: "Dive Into New Mexico’s Income Tax Analysis on PolicyEngine",
    description:
      "Expanding our tax calculator and reform simulator capabilities to the Land of Enchantment.",
    date: "2023-08-02 10:00:00",
    filename: "new-mexico-income-tax-launch.md",
    tags: ["us", "us-nm", "featured", "policy"],
    image: "new-mexico-income-tax-launch.png",
    authors: ["max-ghenis"],
  },
  {
    title: "Repealing the Universal Credit two-child limit",
    description:
      "How removing the limit of some benefits to two children would affect the UK in 2023.",
    date: "2023-08-07 16:00:00",
    filename: "repealing_the_two_child_limit.md",
    tags: ["uk"],
    image: "two_child_limit.png",
    authors: ["nikhil-woodruff"],
  },
].sort((a, b) => (a.date < b.date ? 1 : -1));

for (let post of posts) {
  post.slug = post.filename.substring(0, post.filename.indexOf("."));
}

const tags = posts.map((post) => post.tags);
const uniqueTags = [...new Set([].concat(...tags))].sort();

const locationTags = uniqueTags.filter((tag) =>
  ["us", "uk", "ng", "ca", "global"].some(
    (countryId) => tag.startsWith(countryId + "-") || tag === countryId,
  ),
);
const topicTags = uniqueTags
  .filter((tag) => !locationTags.includes(tag))
  .sort();

const topicLabels = {
  featured: "Featured",
  impact: "Impact",
  policy: "Policy analysis",
  technical: "Technical report",
};

const locationLabels = {
  us: "United States",
  uk: "United Kingdom",
  global: "Global",
  ng: "Nigeria",
  "us-dc": "District of Columbia, U.S.",
  "us-ak": "Alaska, U.S.",
  "us-al": "Alabama, U.S.",
  "us-ar": "Arkansas, U.S.",
  "us-az": "Arizona, U.S.",
  "us-ca": "California, U.S.",
  "us-co": "Colorado, U.S.",
  "us-ct": "Connecticut, U.S.",
  "us-de": "Delaware, U.S.",
  "us-fl": "Florida, U.S.",
  "us-ga": "Georgia, U.S.",
  "us-hi": "Hawaii, U.S.",
  "us-ia": "Iowa, U.S.",
  "us-id": "Idaho, U.S.",
  "us-il": "Illinois, U.S.",
  "us-in": "Indiana, U.S.",
  "us-ks": "Kansas, U.S.",
  "us-ky": "Kentucky, U.S.",
  "us-la": "Louisiana, U.S.",
  "us-ma": "Massachusetts, U.S.",
  "us-md": "Maryland, U.S.",
  "us-me": "Maine, U.S.",
  "us-mi": "Michigan, U.S.",
  "us-mn": "Minnesota, U.S.",
  "us-mo": "Missouri, U.S.",
  "us-ms": "Mississippi, U.S.",
  "us-mt": "Montana, U.S.",
  "us-nc": "North Carolina, U.S.",
  "us-nd": "North Dakota, U.S.",
  "us-ne": "Nebraska, U.S.",
  "us-nh": "New Hampshire, U.S.",
  "us-nj": "New Jersey, U.S.",
  "us-nm": "New Mexico, U.S.",
  "us-nv": "Nevada, U.S.",
  "us-ny": "New York, U.S.",
  "us-oh": "Ohio, U.S.",
  "us-ok": "Oklahoma, U.S.",
  "us-or": "Oregon, U.S.",
  "us-pa": "Pennsylvania, U.S.",
  "us-ri": "Rhode Island, U.S.",
  "us-sc": "South Carolina, U.S.",
  "us-sd": "South Dakota, U.S.",
  "us-tn": "Tennessee, U.S.",
  "us-tx": "Texas, U.S.",
  "us-ut": "Utah, U.S.",
  "us-va": "Virginia, U.S.",
  "us-vt": "Vermont, U.S.",
  "us-wa": "Washington, U.S.",
  "us-wi": "Wisconsin, U.S.",
  "us-wv": "West Virginia, U.S.",
  "us-wy": "Wyoming, U.S.",
};

export {
  posts,
  locationTags,
  uniqueTags,
  topicTags,
  locationLabels,
  topicLabels,
};
