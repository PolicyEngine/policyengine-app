_Image credit: birminghammail_

## Introduction

This analysis compares PolicyEngine's poverty estimates against official figures for 2023/24 using the Family Resources Survey (FRS). To understand the differences, we first describe how official statistics are produced.

### Official methodology

The Department for Work and Pensions (DWP) [produces](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2024) official poverty statistics through the Households Below Average Income (HBAI) series. The methodology uses the Family Resources Survey with enhancements including replacing high earners' incomes with HMRC tax data, applying CALMAR calibration weighting to match Census totals, and adjusting benefit amounts using administrative records. Poverty is measured as relative (60% of median income) and absolute (2010/11 threshold uprated by inflation), both before and after housing costs.

### PolicyEngine methodology

PolicyEngine [uses](https://www.gov.uk/government/collections/family-resources-survey--2) two versions of the Family Resources Survey data. The standard FRS [uses](https://policyengine.github.io/policyengine-uk-data/) data as collected by the Office for National Statistics, applying the original FRS household weights without additional calibration, with income components extracted directly from survey responses and benefits used as reported without administrative data adjustments. The Enhanced FRS [incorporates](https://github.com/PolicyEngine/policyengine-uk-data/blob/24c1bd6fabe91b05da652cdb4776e25c01927e50/policyengine_uk_data/datasets/create_datasets.py) additional data sources and adjustments, reweighting survey responses to match external benchmarks from HMRC tax records and DWP benefit statistics, and replacing or supplementing survey-reported income with administrative data where available, particularly for benefits, tax credits, and pension income.

Both approaches calculate relative and absolute poverty thresholds using the same definitions as official statistics, measuring household income both before and after housing costs. The following sections present poverty rate comparisons for the total population and by age group, followed by an analysis of the methodological factors explaining the differences[^1].

## Overall poverty rates

The table below compares PolicyEngine's [estimates](https://gist.github.com/vahid-ahmadi/c8bb92c92a3b3a5f42eff36e26b7b7a9) with official [DWP figures](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2024) for 2023/24:

| Measure                | Official (DWP) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | -------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 17.2%          | 18.0%           | 16.6%           | +0.8pp                     | -0.6pp                     |
| Relative poverty (AHC) | 21.1%          | 22.9%           | 20.7%           | +1.8pp                     | -0.4pp                     |
| Absolute poverty (BHC) | 15.0%          | 17.2%           | 12.8%           | +2.2pp                     | -2.2pp                     |
| Absolute poverty (AHC) | 18.3%          | 20.5%           | 17.9%           | +2.2pp                     | -0.4pp                     |

_BHC = Before Housing Costs, AHC = After Housing Costs_

The total population is 67.5 million in the DWP figures, 67.5 million in the standard FRS, and 67.3 million in the Enhanced FRS. The standard FRS estimates run +0.8pp to +2.2pp higher than official figures, with AHC poverty showing larger deviations than BHC. The Enhanced FRS matches official relative poverty closely but diverges on absolute poverty.

## Poverty rates by age group

The tables below break down poverty rates by age group.

### Children

The table below shows poverty rates for children:

| Measure                | Official (DWP) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | -------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 23.2%          | 24.6%           | 22.7%           | +1.4pp                     | -0.5pp                     |
| Relative poverty (AHC) | 30.5%          | 33.5%           | 29.5%           | +3.0pp                     | -1.0pp                     |
| Absolute poverty (BHC) | 20.0%          | 23.6%           | 17.9%           | +3.6pp                     | -2.1pp                     |
| Absolute poverty (AHC) | 26.4%          | 30.2%           | 25.4%           | +3.8pp                     | -1.0pp                     |

The children population is 14.6 million in the DWP figures, 14.4 million in the standard FRS, and 14.2 million in the Enhanced FRS. Children show the highest poverty rates and largest deviations, with the standard FRS estimates +1.4pp to +3.8pp higher than official figures. The Enhanced FRS reduces these deviations to -0.5pp to -2.1pp.

### Working-age adults (16-64)

The table below shows poverty rates for working-age adults:

| Measure                | Official (DWP) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | -------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 14.7%          | 15.7%           | 16.1%           | +1.0pp                     | +1.4pp                     |
| Relative poverty (AHC) | 19.4%          | 21.2%           | 21.0%           | +1.9pp                     | +1.6pp                     |
| Absolute poverty (BHC) | 12.9%          | 15.1%           | 12.2%           | +2.1pp                     | -0.8pp                     |
| Absolute poverty (AHC) | 16.9%          | 19.2%           | 18.6%           | +2.4pp                     | +1.7pp                     |

The working-age adult population is 40.9 million in the DWP figures, 41.8 million in the standard FRS, and 43.2 million in the Enhanced FRS. The standard FRS deviations range from +1.0pp to +2.4pp, with larger AHC gaps reflecting Housing Benefit under-reporting among renters. The Enhanced FRS deviations range from -0.8pp to +1.7pp.

### Pensioners (State Pension age and over)

The table below shows poverty rates for pensioners:

| Measure                | Official (DWP) | PE Standard FRS | PE Enhanced FRS | PE Standard FRS - Official | PE Enhanced FRS - Official |
| ---------------------- | -------------- | --------------- | --------------- | -------------------------- | -------------------------- |
| Relative poverty (BHC) | 18.6%          | 19.1%           | 12.1%           | +0.5pp                     | -6.6pp                     |
| Relative poverty (AHC) | 15.7%          | 17.8%           | 10.5%           | +2.2pp                     | -5.2pp                     |
| Absolute poverty (BHC) | 16.0%          | 18.0%           | 9.4%            | +2.0pp                     | -6.6pp                     |
| Absolute poverty (AHC) | 13.2%          | 14.6%           | 7.4%            | +1.5pp                     | -5.8pp                     |

The pensioner population is 12.1 million in the DWP figures, 12.0 million in the standard FRS, and 10.8 million in the Enhanced FRS. The standard FRS deviations range from +0.5pp to +2.2pp. The Enhanced FRS deviations range from -6.6pp to -5.2pp, with all measures showing lower poverty rates than official statistics.

## Methodological differences

The DWP and PolicyEngine use the same Family Resources Survey data, but process it differently. The following sections explain the key methodological factors that produce the observed differences.

### 1. Survey of Personal Incomes adjustment for high earners

The DWP [replaces](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023/households-below-average-income-series-quality-and-methodology-information-report-fye-2023) high earners' incomes with HMRC tax data through the Survey of Personal Incomes adjustment (above £361,200 for working-age adults or £107,800 for pensioners). This raises median household income and the poverty threshold, reducing the number classified as poor. PolicyEngine does not have access to HMRC data and uses survey-reported incomes for all households.

### 2. Survey weighting and grossing methodology

The DWP uses [CALMAR](https://www.gov.uk/government/publications/initial-review-of-the-family-resources-survey-weighting-scheme/initial-review-of-the-family-resources-survey-weighting-scheme) calibration weighting to match Census population totals across age, sex, region, household type, and tenure. PolicyEngine's standard FRS uses original FRS weights without calibration, producing a population estimate of 67.5 million matching official figures. The Enhanced FRS reweights to match HMRC and DWP administrative data. Different weights alter which household types are weighted up or down.

### 3. Benefit measurement

The DWP adjusts benefit amounts using administrative records, though the methodology is not publicly documented. PolicyEngine's standard FRS uses benefit amounts as reported in the survey. The Enhanced FRS incorporates HMRC and DWP administrative data. These different approaches produce different household income estimates, affecting measured poverty rates for households receiving means-tested benefits like Universal Credit and Housing Benefit.

### 4. Housing costs and Housing Benefit measurement

Both methods define housing costs identically but face Housing Benefit under-reporting in the FRS. The DWP [adjusts](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023/households-below-average-income-series-quality-and-methodology-information-report-fye-2023) Housing Benefit using administrative records. PolicyEngine's standard FRS uses reported Housing Benefit without adjustment. Under-reporting means net housing costs appear higher in PolicyEngine, lowering income after housing costs and raising AHC poverty.

### 5. Children-specific income components

The DWP [assigns](https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023/households-below-average-income-series-quality-and-methodology-information-report-fye-2023) cash-equivalent values to in-kind benefits like free school meals and childcare, and may adjust Child Benefit using administrative data. PolicyEngine's standard FRS calculates benefits from survey data using legislative rules without administrative adjustments.

### 6. Enhanced FRS pensioner poverty adjustments

Administrative data adjustments may better capture pension income from multiple sources where survey self-reporting is less accurate. The Enhanced FRS pensioner population is 10.8 million versus 12.0 million in the standard FRS and 12.1 million official, indicating reweighting adjustments affect age distribution.

## Conclusion

This analysis compared PolicyEngine's poverty estimates against the DWP statistics for 2023/24 using both standard and Enhanced FRS data. The standard FRS deviations range from +0.5pp to +3.8pp across all measures and demographic groups, with AHC poverty showing larger deviations than BHC. The largest differences are for child poverty AHC measures.

[^1]: Official statistics from DWP Households Below Average Income (HBAI) Tables 1.3a, 1.3b, 1.4a, 1.4b, 1.5a, 1.5b, 1.6a, and 1.6b.
