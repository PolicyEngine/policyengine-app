The [PolicyEngine US app](http://policyengine.org/us) uses a microsimulation model to compute the impact of custom tax and benefit reforms on the Current Population Survey (CPS). While the CPS is widely used for policy analysis, it contains inaccuracies that can impact the accuracy of policy simulations.

In 2023, we will enhance the CPS by integrating it with IRS tax records and reweighting it to minimize deviations from administrative aggregates. This enhanced dataset will be used in the PolicyEngine microsimulation app and will also be made available as an open resource for other policy research.

_We’re grateful to Dylan Hirsch-Shell for supporting this project._

## Why is the CPS inaccurate?

The Census Bureau and the Bureau of Labor Statistics run the CPS monthly. Each March, they ask deeper questions on households’ activity in the prior calendar year, in the Annual Social and Economic Supplement (ASEC). We use the CPS ASEC (which we refer to as the CPS) for our policy simulations, as do many other analysts; for example, the Census Bureau uses it to produce their [annual poverty report](https://www.census.gov/library/publications/2022/demo/p60-277.html). However, the CPS has several limitations that can impact its accuracy:

- It undercaptures benefits and tax credits, leading to underestimated impacts on certain populations. For example, [CPS respondents under-report SNAP (Supplemental Nutrition Assistance Program) benefits by about a third.](https://www.census.gov/content/dam/Census/library/working-papers/2011/demo/SEHSD-WP2012-01.pdf)

- It [top-codes income variables above $1 million](https://www.census.gov/content/dam/Census/library/working-papers/2019/demo/sehsd-wp2019-18.pdf), which can distort the income distribution and impact policy simulations.

- With only 100,000 households, the CPS can produce volatile estimates when broken down by subpopulations, especially at the state level.

- It lacks some important information, such as assets, that can impact taxes and benefits.

- The CPS is based on data that is 1–2 years old and is not extrapolated to predict future policy impacts.

These limitations can reduce the accuracy and usefulness of the CPS for policy simulations and other research. For example, CPS-based projections will tend to underestimate the budgetary impacts of reforming SNAP or instituting a tax on top earners, and will be unable to estimate the impacts of wealth taxes or reforms to asset limits in benefit programs.

## Our plan to enhance the CPS

To address these issues, we plan to integrate several household datasets and tune them to more closely match administrative totals. This process will involve the following steps:

1. Import the CPS and replace reported taxes and benefits with computed amounts from our microsimulation model.

1. Duplicate the CPS, remove income variables, and replace them with imputed values from [IRS tax records](https://www.irs.gov/statistics/soi-tax-stats-individual-public-use-microdata-files) using our open-source [synthimpute](https://github.com/PolicyEngine/synthimpute) software for machine learning-based quantile regression.

1. Develop a loss metric based on the differences between the survey’s aggregates and true aggregates published by the government.

1. [Use gradient descent](https://blog.policyengine.org/how-machine-learning-tools-make-policyengine-more-accurate-17af859cdd97) to adjust the household survey weights in the duplicated CPS and minimize the loss.

1. Integrate the reweighted CPS-IRS dataset with the Survey of Consumer Finances and Consumer Expenditure Survey to create a comprehensive household dataset, also with synthimpute .

1. Repeat steps 3 and 4 for each subnational area (state, congressional district, state legislative district, etc.) to produce weights for those areas.

The diagram below characterizes this procedure ([see it in higher quality here](https://docs.google.com/drawings/d/1B3EqL43W-Rfbultr6fGMqURtYSiuzg-Y3PkW2vT5lxs/preview)).

![](https://cdn-images-1.medium.com/max/3200/0*KU357kXuoE888uTy)

We have successfully implemented steps 1–5 in the UK, where our loss function has 2,664 elements.¹ While we have not yet created separate weights for each UK region, we include region-specific targets (like the CPS, the UK household survey has region identifiers).

In the US, we have completed step 1, and also made progress importing the Survey of Consumer Finances and Consumer Expenditure Survey to our data format.

## Why our approach will work

We’ve grounded our algorithm in theory and empirics to maximize accuracy.

My 2018 paper, [“Quantile regression, from linear models to trees to deep learning”](https://towardsdatascience.com/quantile-regression-from-linear-models-to-trees-to-deep-learning-af3738b527c3), compared the performance of several quantile regression techniques using holdout sets. To my knowledge, this was the first instance of such a benchmarking study, and in it I found that random forests outperformed most other models. In [follow-up research with Deepak Singh](https://colab.research.google.com/drive/1E8F7S1Uvfw_3PmpS226Sl1LWV5NBi0CE), we found again that random forests outperformed other models, and that matching — perhaps the most common data fusion method for economic microsimulation — performed _worse_ than any others.

![](https://cdn-images-1.medium.com/max/2556/0*ToiaXsYBexc9tD_H)

This result aligns with the theory underpinning each method. By finding the nearest donor record, matching routines are almost built to overfit, while random forests are architected to avoid overfitting.² Overfitting matters because data fusion is not a linking problem, it is an out-of-sample prediction problem: none of the records in the PUF are in the CPS, and vice versa. We aim to predict the conditional distribution of variables using companion datasets, reflecting the uncertainty in these predictions.

Our reweighting routine also carries theoretical advantages over the state of the art. Institutions like the Census Bureau assign initial weights using a small number of covariates, without intending to correct for sampling bias in outcomes like food assistance participation. Analysts sometimes adjust these weights to consider more outcomes using nonlinear programming, which runs until all constraints are satisfied (e.g., each income category is within 5% of the true values). Gradient descent improves upon nonlinear programming by continuing the search: rather than merely looking for an acceptable solution, it finds an optimum after hundreds of searches (“epochs”). And because gradient descent powers deep learning models, computer scientists have built tools to make it run smoothly and quickly.

Since reweighting is also a prediction problem, we evaluate our method on holdout sets of metrics to avoid overfitting. My colleague Nikhil Woodruff has shown that our approach here [substantially improves accuracy](https://blog.policyengine.org/how-machine-learning-tools-make-policyengine-more-accurate-17af859cdd97) in the UK context, both against the original data and other microsimulation models.

![](https://cdn-images-1.medium.com/max/3200/0*Cr-l3U_V97HvNbi3)

Our UK documentation includes [evaluations that update each time we change the model](https://policyengine.github.io/policyengine-uk//model/validation.html). While we’re confident in the benefits of our two novel contributions to microsimulation data enhancement — fusing datasets with random forests-based quantile regression, and reweighting with gradient descent — we will continue experimenting with new methods and sharing our performance as the literature develops.

The CPS already produces useful projections for some policy reforms, such as national tax programs that affect the bulk of the income distribution. Our experience in the UK suggests that our data enhancement procedure can make it even more useful; we expect to cut errors by 90% for assessing more targeted policies, and also to be able to model reforms we don’t currently support, like the [newly-passed Massachusetts millionaire tax](https://www.cnbc.com/2022/11/10/what-the-millionaire-tax-in-massachusetts-means-for-the-wealthy.html).

By enhancing the CPS with IRS tax records and reweighting it to minimize deviations from administrative aggregates, we can significantly improve the accuracy of policy simulations and contribute to a more evidence-based policymaking process. We look forward to bringing these enhancements to the US and making our enhanced dataset available as an open resource for other policy research.

¹ The UK equivalents of the CPS and IRS tax records are the Family Resources Survey and Survey of Personal Incomes, respectively. Our code for enhancing UK microdata is in [this folder](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/data/datasets/frs/enhanced) within the policyengine-uk GitHub repo.

² While we expect that deep neural networks could outperform random forests with tuning, we’ve adopted random forests for their simplicity and high baseline performance.
