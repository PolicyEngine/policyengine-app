_Image credit: birminghammail_

## Introduction

This analysis compares PolicyEngine's poverty estimates against official figures for 2023/24 using the Family Resources Survey (FRS). To understand the differences, we first describe how official statistics are produced.

### Official methodology

The Department for Work and Pensions (DWP) [produces](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2024) official poverty statistics through the Households Below Average Income (HBAI) series. The methodology uses the Family Resources Survey with enhancements including replacing high earners' incomes with HMRC tax data, applying CALMAR calibration weighting to match Census totals, and adjusting benefit amounts using administrative records. Poverty is measured as relative (60% of median income) and absolute (2010/11 threshold uprated by inflation), both before and after housing costs.

### PolicyEngine methodology

PolicyEngine [uses](https://www.gov.uk/government/collections/family-resources-survey--2) two versions of the Family Resources Survey data. The standard FRS [uses](https://policyengine.github.io/policyengine-uk-data/) data as collected by the Office for National Statistics, applying the original FRS household weights without additional calibration, with income components extracted directly from survey responses and benefits used as reported without administrative data adjustments. The Enhanced FRS [incorporates](https://github.com/PolicyEngine/policyengine-uk-data/blob/24c1bd6fabe91b05da652cdb4776e25c01927e50/policyengine_uk_data/datasets/create_datasets.py) additional data sources and adjustments, reweighting survey responses to match external benchmarks from HMRC tax records and DWP benefit statistics, and replacing or supplementing survey-reported income with administrative data where available, particularly for benefits, tax credits, and pension income.

Both approaches calculate relative and absolute poverty thresholds using the same definitions as official statistics, measuring household income both before and after housing costs. The following sections present poverty rate comparisons for the total population and by age group, followed by an analysis of the methodological factors explaining the differences[^1].

## Overall poverty rates

The table below compares PolicyEngine's [estimates](https://gist.github.com/vahid-ahmadi/9dc430e29742788dc084f3ef457903e1) with official [DWP figures](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2024) for 2023/24:

| Measure                | Official (HBAI) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | --------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 17.23%          | 18.39%          | 16.95%          | +1.16pp                    | -0.28pp                    |
| Relative poverty (AHC) | 21.10%          | 23.18%          | 21.13%          | +2.08pp                    | +0.03pp                    |
| Absolute poverty (BHC) | 15.00%          | 16.13%          | 12.26%          | +1.13pp                    | -2.74pp                    |
| Absolute poverty (AHC) | 18.26%          | 19.47%          | 17.16%          | +1.21pp                    | -1.10pp                    |

_BHC = Before Housing Costs, AHC = After Housing Costs_

The total population is 67.51 million in official HBAI, 68.23 million in standard FRS, and 68.01 million in Enhanced FRS. Standard FRS estimates run +1.13pp to +2.08pp higher than official figures, with AHC poverty showing larger deviations than BHC. Enhanced FRS matches official relative poverty closely but diverges on absolute poverty.

## Poverty rates by age group

The tables below break down poverty rates by age group.

### Children

The table below shows poverty rates for children:

| Measure                | Official (HBAI) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | --------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 23.19%          | 25.17%          | 23.40%          | +1.98pp                    | +0.21pp                    |
| Relative poverty (AHC) | 30.52%          | 34.03%          | 30.36%          | +3.51pp                    | -0.16pp                    |
| Absolute poverty (BHC) | 19.99%          | 22.08%          | 17.58%          | +2.09pp                    | -2.41pp                    |
| Absolute poverty (AHC) | 26.39%          | 29.11%          | 24.44%          | +2.72pp                    | -1.95pp                    |

The children population is 14.59 million in official HBAI, 14.58 million in standard FRS, and 14.31 million in Enhanced FRS. Children show the highest poverty rates and largest deviations, with standard FRS estimates +1.98pp to +3.51pp higher than official figures. Enhanced FRS reduces these deviations to +0.21pp to -2.41pp.

### Working-age adults (16-64)

The table below shows poverty rates for working-age adults:

| Measure                | Official (HBAI) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | --------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 14.69%          | 15.83%          | 16.28%          | +1.14pp                    | +1.59pp                    |
| Relative poverty (AHC) | 19.35%          | 21.40%          | 21.26%          | +2.05pp                    | +1.91pp                    |
| Absolute poverty (BHC) | 12.94%          | 13.93%          | 11.54%          | +0.99pp                    | -1.40pp                    |
| Absolute poverty (AHC) | 16.85%          | 18.59%          | 18.01%          | +1.74pp                    | +1.16pp                    |

The working-age adult population is 40.87 million in official HBAI, 42.29 million in standard FRS, and 43.62 million in Enhanced FRS. Standard FRS deviations range from +0.99pp to +2.05pp, with larger AHC gaps reflecting Housing Benefit under-reporting among renters. Enhanced FRS deviations range from -1.40pp to +1.91pp.

### Pensioners (State Pension age and over)

The table below shows poverty rates for pensioners:

| Measure                | Official (HBAI) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | --------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 18.64%          | 19.97%          | 12.71%          | +1.33pp                    | -5.93pp                    |
| Relative poverty (AHC) | 15.66%          | 18.09%          | 10.84%          | +2.43pp                    | -4.82pp                    |
| Absolute poverty (BHC) | 15.96%          | 17.30%          | 8.96%           | +1.34pp                    | -7.00pp                    |
| Absolute poverty (AHC) | 13.16%          | 12.55%          | 6.18%           | -0.61pp                    | -6.98pp                    |

The pensioner population is 12.06 million in official HBAI, 12.17 million in standard FRS, and 10.86 million in Enhanced FRS. Standard FRS deviations range from -0.61pp to +2.43pp. Enhanced FRS deviations range from -7.00pp to -4.82pp, with all measures showing lower poverty rates than official statistics.

## Methodological differences

Both [official HBAI](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2024/households-below-average-income-an-analysis-of-the-uk-income-distribution-fye-1995-to-fye-2024) and PolicyEngine use the same Family Resources Survey data, but process it differently. The following sections explain the key methodological factors that produce the observed differences.

### 1. Survey of Personal Incomes adjustment for high earners

Official HBAI [replaces](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023/households-below-average-income-series-quality-and-methodology-information-report-fye-2023) high earners' incomes with HMRC tax data through the Survey of Personal Incomes adjustment (above £361,200 for working-age adults or £107,800 for pensioners). This raises median household income and the poverty threshold, reducing the number classified as poor. PolicyEngine does not have access to HMRC data and uses survey-reported incomes for all households.

### 2. Survey weighting and grossing methodology

Official HBAI uses [CALMAR](https://www.gov.uk/government/publications/initial-review-of-the-family-resources-survey-weighting-scheme/initial-review-of-the-family-resources-survey-weighting-scheme) calibration weighting to match Census population totals across age, sex, region, household type, and tenure. PolicyEngine's standard FRS uses original FRS weights without calibration, producing a population estimate of 68.23 million versus official 67.51 million. Enhanced FRS reweights to match HMRC and DWP administrative data. Different weights alter which household types are weighted up or down.

### 3. Benefit measurement

Official HBAI adjusts benefit amounts using DWP administrative records, though the methodology is not publicly documented. PolicyEngine's standard FRS uses benefit amounts as reported in the survey. Enhanced FRS incorporates HMRC and DWP administrative data. These different approaches produce different household income estimates, affecting measured poverty rates for households receiving means-tested benefits like Universal Credit and Housing Benefit.

### 4. Housing costs and Housing Benefit measurement

Both methods define housing costs identically but face Housing Benefit under-reporting in the FRS. Official HBAI [adjusts](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023/households-below-average-income-series-quality-and-methodology-information-report-fye-2023) Housing Benefit using DWP administrative records. PolicyEngine's standard FRS uses reported Housing Benefit without adjustment. Under-reporting means net housing costs appear higher in PolicyEngine, lowering income after housing costs and raising AHC poverty.

### 5. Children-specific income components

Official HBAI [assigns](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023/households-below-average-income-series-quality-and-methodology-information-report-fye-2023) cash-equivalent values to in-kind benefits like free school meals and childcare, and may adjust Child Benefit using administrative data. PolicyEngine's standard FRS calculates benefits from survey data using legislative rules without administrative adjustments.

### 6. Enhanced FRS pensioner poverty adjustments

Administrative data adjustments may better capture pension income from multiple sources where survey self-reporting is less accurate. The Enhanced FRS pensioner population is 10.86 million versus 12.17 million in standard FRS and 12.06 million official, indicating reweighting adjustments affect age distribution.

## Conclusion

This analysis compared PolicyEngine's poverty estimates against official HBAI statistics for 2023/24 using both standard and Enhanced FRS data. Standard FRS deviations range from +0.99pp to +3.51pp across all measures and demographic groups, with AHC poverty showing larger deviations than BHC. The largest differences are for child poverty AHC measures.

[^1]: Official statistics from DWP Households Below Average Income (HBAI) Tables 1.3a, 1.3b, 1.4a, 1.4b, 1.5a, 1.5b, 1.6a, and 1.6b.
