When policy analysts predict the effects of tax and benefit reforms, they often turn to microsimulation. By combining a rules engine with representative survey or administrative datasets, microsimulation supports intricate policy analysis at a detailed household level. Think TurboTax, but for hundreds of thousands of households at once, and over a range of policy rule scenarios. This technology is at the heart of tax-benefit analysis around the world—including PolicyEngine's.

Microsimulation's first ingredient is a robust rules engine. Here, PolicyEngine is well proven, with a detailed federal income tax model, state income tax models complete and [validated](https://github.com/PolicyEngine/policyengine-us/issues/993) against [NBER's TAXSIM](https://www.nber.org/research/data/taxsim) in nearly every state, and benefit program models powering [multiple benefit](myfriendben.org) [navigation apps](imaginela.org/social-benefit) via our API, we provide comprehensive, well-tested rules for most major programs affecting Americans' pocket books.

Today, we're beta-launching a significant upgrade to the second ingredient. Since [December 2022](https://policyengine.org/us/blog/enhancing-the-current-population-survey-for-policy-analysis), we've been building an enhanced open dataset for more accurate microsimulation. While other prominent analysts also enhance microdata, we're taking a different approach that leverages the best of modern data science to support our broad scope of taxes and benefits, at the federal, state and local levels. By starting with the (openly available) Current Population Survey and integrating non-identifiable information from tax records, we are also introducing the first open alternative to restricted tax microdata for microsimulation.

This blog post lays out our approach, results from our validation dashboard, and our plans to further advance the field. To see the data in action, see our new report on the Tax Relief for American Families and Workers Act, also out today as the first analysis using our new data. We've also included information on how to use this free, open-source dataset in your own work, either via the PolicyEngine web app or locally.

## Motivation

PolicyEngine's broad policy scope creates special opportunities and challenges for microdata. Federal tax analysts like the Joint Committee on Taxation and the Tax Foundation have generally focused on data to support federal tax reform. Here, open resources like [Quantria Strategies' technical documentation](https://quantria.com/assets/img/TechnicalDocumentationV4-2.pdf) and the [Policy Simulation Library's open-source Tax-Data project](https://pslmodels.github.io/taxdata/) have served an essential role, documenting and demonstrating how to calibrate datasets of tax returns to best represent the national landscape, and how to construct and integrate nonfilers from surveys to capture reforms that could make them liable for tax or eligible for refundable credits.

Adding benefit programs and state taxes to the model, and reporting on other outcomes like poverty, requires a different approach. Tax returns lack the detailed person-level characteristics, hierarchical data structures, and information on benefits needed to capture the impacts of these programs. For example, Maryland limits its state Child Tax Credit to children under six, or those under age 17 with a disability—an intersection of signals not available in tax returns.

After introducing this approach to microdata enhancement to PolicyEngine UK [over two years ago](https://policyengine.org/uk/research/how-machine-learning-tools-make-policyengine-more-accurate), we've refined it and adapted it to the (much more complex) US context. We're excited to have it ready for use and further advances.

## Methodology

We construct our enhanced data, which we call the Enhanced Current Population Survey, or ECPS, from three sources:

1. [_Current Population Survey March Supplement (CPS)._](https://www.census.gov/data/datasets/time-series/demo/cps/cps-asec.html) The CPS is a monthly nationwide survey that estimates unemployment rates and other key monthly indicators. Each March, the Census Bureau expands the sample and set of questions, to collect more information on the prior year among respondents. The March Supplement, also called the Annual Social and Economic Supplement (ASEC), powers reports such as official poverty estimates. Census releases the microdata and its results each September, so the latest currently available represents calendar year 2022. The data is hierarchical, with entities for people, families, tax filing units, households, and "SPM units", referring to the Supplemental Poverty Measure and representing groups of cohabitating individuals who share resources. The 2022 ASEC includes 146,133 people across 88,978 households.
2. [_Internal Revenue Service Public Use File (PUF)._](https://www.irs.gov/statistics/soi-tax-stats-individual-public-use-microdata-files) The IRS makes a flat dataset with information on a sample of tax returns available to researchers who pay a fee and agree not to distribute the data. The most recent PUF represents tax year 2015, with [179 characteristics for 207,696 records](https://drive.google.com/file/d/17_SeKv9cmWJW-blALlSgl53yg3UUYzHE/view?usp=sharing), statistically altered to avoid disclosure. From 2016 forward, the IRS will instead release a [synthetic PUF, in partnership with the Urban Institute](https://www.urban.org/research/publication/synthetic-supplemental-public-use-file-low-income-information-return-data-methodology-utility-and-privacy-implications).
3. _Administrative totals._ For instance, the total US population, income tax revenue, dividends, SNAP benefits, and so on. We collect these from historical sources and Congressional Budget Office (CBO) forecasts.

Our procedure maps to the above sequence. As shown in Figure 1, we first "age" the CPS and PUF to the current year (e.g., by growing PUF wages by the average growth of wages since 2015), then incorporate information from the PUF onto the CPS (while also preserving the original CPS), and finally reweighting the data.This contrasts to the standard approach among tax analysts: similarly age the CPS and PUF, but use the PUF as a base file, append nonfilers from the CPS, then reweight.

![Figure 1: PolicyEngine's data flow to create PUF-enhanced CPS file](/images/posts/enhanced_cps_beta/data_hierarchy.png)

Specifically, here are our steps:

1. Prepare PUF for training:
   1. Select common variables: demographics, filing status, number of child dependents, and number of other dependents (NB: IRS caps dependent counts at 3 in PUF).
   2. Impute PUF demographics from the 119,675 records with demographics to all 207,696 PUF records using quantile regression forests.
2. Create PUF-structured CPS file: 3. Aggregate CPS to tax unit to create a dataset with all common variables (includes transformations like capping dependent counts at 3). 4. Impute PUF variables to PUF-structured CPS file using quantile regression forests. 5. Break down the PUF-imputed CPS tax unit file by person. 6. Attach other CPS characteristics to the PUF-structure. 7. Stack the PUF-based CPS with the original.
3. Reweight with gradient descent: 8. Calculate the deviation between the dataset's aggregates and administrative totals for each target (population, income component, benefit participation, etc.) 9. Construct a "loss function" that condenses these individual deviations into a single metric 10. Apply gradient descent to iteratively adjust the household weights to minimize the loss function

We've built a new open-source Python package, [survey-enhance](https://policyengine.github.io/survey-enhance/), to streamline the usage of quantile regression forests for integration and gradient descent for reweighting. We have also submitted a [paper](https://github.com/nikhilwoodruff/survey-enhance/blob/main/docs/paper/project_paper.pdf) to the International Journal of Microsimulation describing the methodology in greater detail (in the UK context), and comparing it to standard methods. For instance, we show in a [holdout experiment](https://colab.research.google.com/drive/1E8F7S1Uvfw_3PmpS226Sl1LWV5NBi0CE) that quantile regression forests significantly outperform statistical matching for data integration, and also show that the gradient descent approach outperforms percentile matching when correcting surveys for high-income representation.

## Results

We've assessed our approach chiefly by comparing aggregates against administrative totals. We sum each of our 93x targets in the aged PUF, aged CPS, and ECPS, in 2022 to 2025 (applying our rules engine for computed targets). In almost every target, the ECPS performs best, coming within one percent of every target.

To see how our totals compare, explore our [interactive dashboard](https://policyengine-us-calibration-validation.streamlit.app/) (screenshot below).

![PolicyEngine's calibration dashboard](/images/posts/enhanced_cps_beta/dashboard.png)

We have additionally compared results from reforms, and we will launch a similar dashboard with those comparisons in the future.

## How you can use it

You can use the ECPS in the PolicyEngine web app, in the policyengine-us Python package, or by downloading files.

To use the ECPS in the PolicyEngine web app, run a microsimulation as normal, and then toggle the _Use Enhanced CPS_ switch in the right panel, or bottom on mobile. We will make this the default option after we exit beta, as it has been in PolicyEngine UK since we introduced the enhanced data.

![Enhanced CPS switch](/images/posts/enhanced_cps_beta/app_screenshot.png)

To use the ECPS in the policyengine-us Python package, specify it in the Microsimulation call as follows, then use it as you would otherwise.

```python

ecps = Microsimulation(dataset="enhanced_cps_2022")

```

To download the ECPS, visit the [release page](https://github.com/PolicyEngine/policyengine-us/releases/tag/enhanced-cps-2022) and download the h5 file.

## Future development

We've received valuable feedback from many in the economics community throughout the development process, and consider this launch only the beginning. Our plans for future development fall into three broad categories:

1. _More targets and validation._ As of this writing, we have [39 open issues related to calibration](https://github.com/PolicyEngine/policyengine-us/issues?q=is%3Aissue+is%3Aopen+label%3Acalibration), ranging from adding targets to better aligning our definitions to available targets.
2. _Comparison to other models._ For instance, we are currently working with the [Policy Simulation Library](pslmodels.org) to validate this dataset against their PUF-based [TaxData](https://github.com/PSLmodels/taxdata) project. We are also collecting estimates from other analysts, such as the Joint Committee on Taxation, Congressional Budget Office, Tax Policy Center, and ITEP, to compare projected results of reforms.
3. _Finer geographic detail._ Having calibrated our data to the US as a whole, we are equipped to replicate the process for smaller geographies. We will avoid the issues of small sample sizes by reweighting the full nationwide dataset to each local area's administrative targets—starting at the state level, then Congressional district and ultimately state legislative district or other locales.

We are setting new standards in policy simulations and evidence-based policymaking by enhancing the CPS with IRS tax records and reweighting. Our ongoing innovation and transparency align with PolicyEngine's mission to compute the impact of public policy accurately and objectively.
