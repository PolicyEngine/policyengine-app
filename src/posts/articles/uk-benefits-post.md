## Introduction

This post provides an overview of how PolicyEngine UK models benefits. It details benefits in the UK welfare system and their implementation within the PolicyEngine microsimulation. Each benefit component links to its specific implementation in the codebase, making this post a technical reference for understanding how the PolicyEngine UK microsimulation model performs benefits calculations.

Table 1 below summarises metrics for each benefit in the UK system, comparing PolicyEngine's 2025-26 fiscal year expenditure projections with those from the government (such as the Office for Budget Responsibility) and showing the percentage difference between them. While PolicyEngine models interactions from instituting or repealing tax and benefit programmes, this chart shows only the direct expenditure for each benefit for consistency with government reports.

**Table 1: Summary of UK benefit expenditure estimates for 2025 (£ billions)**

| Programme                     | PolicyEngine estimate 2025 (£bn)                                                                                                | OBR estimate 2025-26 (£bn)                                                                                                                                             | PolicyEngine affected population estimate 2025 (%) |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Universal Credit              | 79.4                                                                                                                            | [77.4](https://www.gov.uk/government/publications/benefit-expenditure-and-caseload-tables-2024)                                                                        | 21.8                                               |
| Housing Benefit               | [7.6](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80663)  | [11.6](https://www.gov.uk/government/publications/benefit-expenditure-and-caseload-tables-2024)                                                                        | 2.9                                                |
| Tax Credits                   | [<1.0](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80677) | [<1.0](https://www.gov.uk/government/publications/benefit-expenditure-and-caseload-tables-2024)                                                                        | 0.1                                                |
| Pension Credit                | [7.4](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80685)  | [6.0](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-pensioner-benefits/)                                                                | 3.6                                                |
| Personal Independence Payment | [30.6](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80686) | [28.7](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/)                                                              | 10.3                                               |
| Disability Living Allowance   | [9.3](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80689)  | [7.5](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/)                                                               | 4.5                                                |
| Attendance Allowance          | [10.2](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80692) | [8.0](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/)                                                               | 3.9                                                |
| Child Benefit                 | [12.3](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80696) | [12.5](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-child-benefit/#:~:text=Child%20benefit%20is%20a%20cash,the%20UK%20in%202023%2D24.) | 31.3                                               |
| Winter Fuel Payment           | [<1.0](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80702) | [<1.0](https://www.gov.uk/government/publications/benefit-expenditure-and-caseload-tables-2024)                                                                        | 2.7                                                |

Below, Table 2 presents a comparison of UK childcare programme costs, showing PolicyEngine's expenditure estimates for 2025 alongside both previous year estimates and official government projections.

**Table 2: Summary of UK childcare Programmes expenditure estimates (£ billions)**

| Programme           | PolicyEngine estimate 2025 (£bn)                                                                                                                        | PolicyEngine estimate 2024 (£bn)                                                                                                                        | Government report 2024 (£bn)                                                                                  | PolicyEngine affected population estimate 2025 (%) |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Tax-free childcare  | [0.7](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=82972)                          | [0.6](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2024&baseline=83892)                          | [0.6](https://www.gov.uk/government/statistics/tax-free-childcare-statistics-september-2024)                  | 2.8                                                |
| Extended childcare  | [4.4](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80613&uk_local_areas_beta=true) | [2.6](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2024&baseline=83897&uk_local_areas_beta=true) | [2.5](https://skillsfunding.service.gov.uk/view-latest-funding/national-funding-allocations/DSG/2024-to-2025) | 4.3                                                |
| Universal childcare | [1.8](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=82975)                          | [1.6](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2024&baseline=83887)                          | [1.7](https://skillsfunding.service.gov.uk/view-latest-funding/national-funding-allocations/DSG/2024-to-2025) | 2.6                                                |
| Targeted childcare  | [0.5](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=82974)                          | [0.5](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2024&baseline=83888)                          | [0.6](https://skillsfunding.service.gov.uk/view-latest-funding/national-funding-allocations/DSG/2024-to-2025) | 0.5                                                |

The post organizes into two main sections. First, we examine means-tested benefits (Universal Credit, legacy benefits, and pension-age benefits), which provide support based on household income and savings. Second, we explore non-means-tested benefits (disability benefits, child benefits, and retirement benefits) that specific circumstances determine regardless of income. For each benefit, we explain the eligibility criteria, calculation methodology, and distributional impact across income groups.

## Means-tested benefits

The government awards means-tested benefits based on household income, savings, and circumstances, with payments reducing as income increases. The term 'means-testing' refers to the assessment of a claimant's financial resources to determine eligibility and payment amount. Our implementation of means-tested benefits accounts for the interaction between different income sources, capital limits, and household composition.

### Universal Credit

[Universal Credit](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/universal_credit.py) is a means-tested benefit introduced to replace six legacy benefits for working-age people. Our calculation methodology for Universal Credit works by first determining a household's maximum entitlement by adding together various elements based on household circumstances, then reducing this amount based on income (applying the taper rate), and finally applying a benefit cap if necessary.

- **[Standard allowance](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/standard_allowance/uc_standard_allowance.py)**: This forms the basic element of Universal Credit that all eligible claimants receive. The amount varies by age and whether claiming as an individual or couple. For 2025, a single person under 25 receives £311.68 per month, while a single person over 25 receives £393.45 per month. Couples where both members are under 25 receive £489.23 per month, while couples with at least one member over 25 receive £617.60 per month.

- **[Child element](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/child_element/uc_child_element.py)**: For 2025, the first child born before April 2017 receives a higher amount of £333.33 per month, while other children receive £287.92 per month. The two-child limit, introduced in April 2017, restricts support to the first two children in most cases, unless exemptions apply (such as multiple births or non-consensual conception). Our methodology identifies each eligible child in the household, determines whether the higher rate applies, applies the two-child limit where relevant, and sums the resulting entitlements.

- **[Housing costs element](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/housing_costs_element/uc_housing_costs_element.py)**: For social housing tenants, the eligible housing costs match the full rent. For private rentals, the amount is capped by Local Housing Allowance (LHA) rates for the area, which vary based on location and property size requirements. The final amount is reduced by any non-dependent deductions for other adults in the household. Our calculation applies the appropriate caps based on household composition and geographical location, simulating the real-world application of LHA rates and non-dependent deductions.

- **[Work allowances](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/work_allowance/uc_work_allowance.py) and [taper rate](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/universal_credit/income/uc_income_reduction.py)**: These determine how Universal Credit is reduced as earnings increase. For 2025, the work allowance is £404 per month for those with housing support and £673 per month for those without housing support included in their Universal Credit. The taper rate is set at 55%, meaning Universal Credit is reduced by 55 pence for each pound earned above any applicable work allowance. Our methodology first determines if the household qualifies for a work allowance (based on having children or limited capability for work) and then calculates the reduction using the taper rate applied to net income after the work allowance.

- **Benefit cap**: A maximum limit on total benefit income is applied to Universal Credit, with higher rates for London residents and exemptions for households with significant earnings or disability benefits. The benefit cap methodology checks whether the household is exempt (based on earnings or qualifying benefits) and, if not, applies the appropriate cap based on household composition and location.

PolicyEngine projects that Universal Credit will cost £79.4 billion in 2025, 2.6% more than the UK government's estimate of [£77.4 billion](https://www.gov.uk/government/publications/benefit-expenditure-and-caseload-tables-2024) for 2025-2026. The following figure shows the distributional impact of this programme.

```plotly
{
  "data": [
    {
      "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "y": [39.6, 12.6, 12.6, 8.2, 1.9, 1.3, 0.7, 0.7, 0.3, 0.1],
      "type": "bar",
      "marker": {
        "color": "#2E5984"
      },
      "name": "Change in household income (%)",
      "text": ["+39.6%", "+12.6%", "+12.6%", "+8.2%", "+1.9%", "+1.3%", "+0.7%", "+0.7%", "+0.3%", "+0.1%"],
      "textposition": "inside",
      "insidetextfont": {
        "family": "Roboto Serif",
        "color": "white",
        "size": 10
      }
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 1: Distributional impact of Universal Credit by income decile",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "yaxis": {
      "title": "Relative change in household income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": ",.0%",
      "automargin": true,
      "range": [0, 42],
      "dtick": 5,
      "tickvals": [0, 5, 10, 15, 20, 25, 30, 35, 40],
      "ticktext": ["+0%", "+5%", "+10%", "+15%", "+20%", "+25%", "+30%", "+35%", "+40%"]
    },
    "xaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickmode": "array",
      "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    "height": 500,
    "margin": {
      "l": 50,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#616161"
        }
      }
    ],
    "images": [
      {
        "source": "/logo512.png",
        "x": 1,
        "y": -0.18,
        "xref": "paper",
        "yref": "paper",
        "sizex": 0.1,
        "sizey": 0.1,
        "xanchor": "right",
        "yanchor": "bottom"
      }
    ],
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

### Housing Benefit

[Housing Benefit](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/housing_benefit.py) provides payments for rental costs for those not receiving Universal Credit. The amount is based on eligible rent (capped by Local Housing Allowance for private rentals), reduced by 65% of income above the applicable amount. Further reductions apply for non-dependent adults living in the household. The system applies different parameters for working-age versus pension-age claimants. The Department for Work and Pensions aims to move all working-age Housing Benefit claimants to Universal Credit by [March 2026](<(https://www.gov.uk/guidance/move-to-universal-credit-if-you-get-a-migration-notice-letter)>).

The applicable income [disregards](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/applicable_income/housing_benefit_applicable_income.py) for certain income types. These disregards include partial earnings disregards (higher for lone parents), full disregards for specific benefits like Personal Independence Payment, and partial disregards for pension contributions and childcare costs.

The non-dependent deductions amount [varies](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/housing_benefit/non_dep_deduction/housing_benefit_non_dep_deductions.py) based on the non-dependent's income and circumstances. A non-dependent is an adult who lives with the claimant (such as an adult child or parent) who should contribute to housing costs.

PolicyEngine projects that Housing Benefit will cost [£7.6 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80663) in 2025, 34.5% less than the UK government's estimate of [£11.6 billion](https://www.gov.uk/government/publications/benefit-expenditure-and-caseload-tables-2024) for 2025-2026. The following figure shows the distributional impact of this programme.

```plotly
{
  "data": [
    {
      "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "y": [8.5, 1.4, 1.0, 0.2, 0.0, 0.0, 0.0, 0.0, -0.0, 0.0],
      "type": "bar",
      "marker": {
        "color": "#2E5984"
      },
      "name": "Change in household income (%)",
      "text": ["+8.5%", "+1.4%", "+1.0%", "+0.2%", "+0.0%", "+0.0%", "+0.0%", "+0.0%", "-0.0%", "+0.0%"],
      "textposition": "inside",
      "insidetextfont": {
        "family": "Roboto Serif",
        "color": "white",
        "size": 10
      }
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 2: Distributional impact of Housing Benefit by income decile",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "yaxis": {
      "title": "Relative change in household income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": ",.1%",
      "automargin": true,
      "range": [0, 9],
      "dtick": 1,
      "tickvals": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      "ticktext": ["+0.0%", "+1.0%", "+2.0%", "+3.0%", "+4.0%", "+5.0%", "+6.0%", "+7.0%", "+8.0%"]
    },
    "xaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickmode": "array",
      "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    "height": 500,
    "margin": {
      "l": 50,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#616161"
        }
      }
    ],
    "images": [
      {
        "source": "/logo512.png",
        "x": 1,
        "y": -0.18,
        "xref": "paper",
        "yref": "paper",
        "sizex": 0.1,
        "sizey": 0.1,
        "xanchor": "right",
        "yanchor": "bottom"
      }
    ],
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

### Tax Credits

[Tax Credits](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/tax_credits.py) offer financial assistance to families with children and working people on low incomes. The system consists of two elements: Child Tax Credit and Working Tax Credit, which can be claimed separately or together depending on circumstances. HMRC ended all tax credit payments in [April 2025](https://www.gov.uk/tax-credits-have-ended) and instructed claimants to apply for Universal Credit or Pension Credit to continue receiving support. We calculate Tax Credits using the following methodology:

1. Calculating the maximum entitlement for both Child Tax Credit and Working Tax Credit
2. Determining the relevant income threshold (different for those claiming both credits versus Child Tax Credit only)
3. Reducing the entitlement by 41% of income above the threshold, withdrawing Working Tax Credit first, then Child Tax Credit
4. Applying a minimum payment threshold (awards below this amount are not paid)

The Tax Credits system consists of two main components, which we explain in detail below:

- **Child Tax Credit (CTC)**: Payments for families with children regardless of employment status. In 2025, components include a family element (£570 per year) and a child element (£3,455 per year per child), subject to the two-child limit. Additional amounts are paid for disabled children. The family element is a flat rate paid to families with at least one qualifying child, while the child element is paid for each eligible child (subject to the two-child limit for children born after April 2017).

- **Working Tax Credit (WTC)**: Financial assistance for those in low-paid work. For 2025, components include a basic element (£2,435 per year), additional elements for couples or lone parents, a 30-hour element for those working at least 30 hours weekly, and a childcare element covering up to 70% of eligible costs. The basic element is paid to everyone who qualifies for Working Tax Credit, with additional amounts based on household composition and working hours. The childcare element provides funding for working parents with childcare costs up to a maximum of £175 per week for one child, or £300 per week for two or more children.

Tax Credits are reduced at a rate of 41% when income exceeds the threshold (£7,455 for WTC+CTC claims and £18,725 for CTC-only claims in 2025). This means that for every £1 of income above the threshold, Tax Credits are reduced by 41p.

PolicyEngine projects that Tax Credits will cost less than [£1 billion](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80677) in 2025, in line with the UK government's estimate of less than £1 billion for 2025-2026.

### Pension Credit

Pension Credit [ensures](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/pension_credit.py) a minimum income level for pensioners. The benefit consists of two parts: Guarantee Credit and Savings Credit. A takeup probability of 70% is applied to model the fact that not all eligible pensioners claim the benefit. Takeup rates represent the proportion of eligible individuals who actually claim a benefit, and our model incorporates this real-world factor to produce more accurate aggregate estimates. We calculate Pension Credit using the following methodology:

1. Determining if the household contains at least one person of State Pension age
2. Calculating Guarantee Credit entitlement
3. Calculating Savings Credit entitlement (if applicable)
4. Combining the two components
5. Applying the takeup probability to model real-world claiming behaviour

Pension Credit consists of two main components, which we explain in detail below:

- **Guarantee Credit**: It [tops up](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/guarantee_credit/guarantee_credit.py) weekly income to a guaranteed minimum level. For 2025, the standard minimum guarantee is £218.15 per week for singles and £332.95 per week for couples. Additional amounts are added for severe disability, caring responsibilities, and dependent children. The methodology calculates the difference between the applicable minimum guarantee (including any additional amounts) and the claimant's assessed income, paying the shortfall as Guarantee Credit.

- **Savings Credit**: It [provides](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pension_credit/savings_credit/savings_credit.py) additional payments for those with modest savings or income above the basic State Pension level. It's only available to those who reached State Pension age before April 2016. For 2025, the income threshold is £189.80 per week for singles and £301.22 per week for couples. The amount increases at a rate of 60% of income above the threshold, then decreases at 40% of income above the minimum guarantee level. We calculate Savings Credit using the following methodology:

  1. Checking if the claimant reached State Pension age before April 2016
  2. Determining the relevant income for Savings Credit calculation (excluding certain income types)
  3. Calculating the maximum possible Savings Credit as 60% of the difference between the minimum guarantee and the threshold
  4. Awarding Savings Credit at 60% of income above the threshold, up to the maximum
  5. Reducing the award by 40% of income above the minimum guarantee

PolicyEngine projects that Pension Credit will cost [£7.4 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80685) in 2025, 23.3% more than the UK government's estimate of [£6.0 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-pensioner-benefits/) for 2025-2026. The following figure shows the distributional impact of this programme.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [3.3, 1.2, 1.6, 1.0, 0.2, 0.1, 0.0, 0.2, 0.0, 0.0],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+3.3%", "+1.2%", "+1.6%", "+1.0%", "+0.2%", "+0.1%", "+0.0%", "+0.2%", "+0.0%", "+0.0%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure 3: Distributional impact of Pension Credit by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.1%",
     "automargin": true,
     "range": [0, 3.5],
     "dtick": 0.5,
     "tickvals": [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
     "ticktext": ["+0.0%", "+0.5%", "+1.0%", "+1.5%", "+2.0%", "+2.5%", "+3.0%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

## Non-means-tested benefits

Non-means-tested benefits address specific needs or circumstances regardless of household income. Unlike means-tested benefits, these payments do not reduce as income increases. Our methodology for non-means-tested benefits focuses on identifying eligibility based on specific characteristics or needs rather than financial resources. In the following sections, we explain the different non-means-tested programmes and how we model each of them in detail.

### Personal Independence Payment (PIP)

PIP [provides](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/pip.py) financial assistance for those with long-term health conditions or disabilities. The benefit has two components: daily living and mobility. The government pays each component at a standard or enhanced rate depending on needs assessment. PIP replaced Disability Living Allowance for working-age adults and uses a points-based assessment system to determine eligibility and rate. We calculate PIP using the following methodology:

1. Identifying individuals with disabilities in the dataset
2. Assigning daily living and mobility components based on reported needs
3. Applying the appropriate rate for each component
4. Combining the components to determine the total PIP award

For 2025, the [daily living](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/daily_living.py) component is £108.55 per week at the enhanced rate and £72.65 per week at the standard rate. The [mobility](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/pip/mobility.py) component is £75.75 per week at the enhanced rate and £28.70 per week at the standard rate.

PolicyEngine projects that Personal Independence Payment will cost [£30.6 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80686) in 2025, 6.6% more than the UK government's estimate of [£28.7 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/) for 2025-2026. The following figure shows the distributional impact of this programme.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [16.7, 3.1, 4.8, 6.0, 1.7, 0.7, 0.5, 0.2, 0.3, 0.1],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+16.7%", "+3.1%", "+4.8%", "+6.0%", "+1.7%", "+0.7%", "+0.5%", "+0.2%", "+0.3%", "+0.1%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure 4: Distributional impact of PIP by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.1%",
     "automargin": true,
     "range": [0, 17.5],
     "dtick": 2,
     "tickvals": [0, 2, 4, 6, 8, 10, 12, 14, 16],
     "ticktext": ["+0.0%", "+2.0%", "+4.0%", "+6.0%", "+8.0%", "+10.0%", "+12.0%", "+14.0%", "+16.0%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### Disability Living Allowance (DLA)

Similar to PIP, [DLA](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/dla.py) has two components: self-care (equivalent to PIP's daily living) and mobility. DLA for children remains in place, while most working-age adults have been migrated to PIP. Some adults who received DLA before PIP was introduced remain on the benefit under transitional protection. We calculate DLA using the following methodology:

1. Identifying eligible children and protected adults in the dataset
2. Assigning self-care component by using a three-tier system (higher, middle, or lower rate) depending on the level of care required
3. Assigning mobility component by using a two-tier system (higher or lower rate) depending on the severity of mobility limitations, then matching to the applicable bracket and applying the rate for that bracket
4. Combining the components to determine the total DLA award

For 2025, the [self-care](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/self_care.py) component has three possible rates: higher (£108.55 per week), middle (£72.65 per week), and lower (£28.70 per week). The [mobility](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/dla/mobility.py) component has two rates: higher (£75.75 per week) and lower (£28.70 per week). We calculate the annual amount by multiplying the weekly rates by 52.

PolicyEngine projects that Disability Living Allowance will cost [£9.3 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80689) in 2025, 24.0% more than the UK government's estimate of [£7.5 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/) for 2025-2026. The following figure shows the distributional impact of this programme.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [3.8, 1.4, 2.0, 1.3, 0.9, 0.3, 0.1, 0.1, 0.1, 0.0],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+3.8%", "+1.4%", "+2.0%", "+1.3%", "+0.9%", "+0.3%", "+0.1%", "+0.1%", "+0.1%", "+0.0%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure 5: Distributional impact of DLA by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.1%",
     "automargin": true,
     "range": [0, 4.0],
     "dtick": 0.5,
     "tickvals": [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5],
     "ticktext": ["+0.0%", "+0.5%", "+1.0%", "+1.5%", "+2.0%", "+2.5%", "+3.0%", "+3.5%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### Attendance Allowance

[Attendance Allowance](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/attendance_allowance.py) is paid at two rates depending on the level of care needed. Attendance Allowance is available to those who became disabled after reaching State Pension age, as they cannot claim PIP or DLA for the first time after this age. We calculate Attendance Allowance using the following methodology:

1. Identifying individuals over State Pension age with care needs
2. Determining the appropriate rate based on daytime and/or night-time care requirements
3. Assigning the weekly rate and annualising the amount

For 2025, the higher rate is £108.55 per week and the lower rate is £72.65 per week. The higher rate applies to those needing care both day and night, or those who are ill. The lower rate applies to those needing care either during the day or at night. We calculate the annual amount by multiplying the weekly rate by 52. The government uprates all three disability benefits annually using the Consumer Price Index (CPI). This ensures that benefit rates maintain their real value against inflation, protecting the purchasing power of disabled recipients.

PolicyEngine projects that Attendance Allowance will cost [£10.2 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80692) in 2025, 27.5% more than the UK government's estimate of [£8.0 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/) for 2025-2026. The following figure shows the distributional impact of this programme.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [5.6, 2.9, 1.7, 1.1, 0.1, 0.1, 0.2, 0.0, 0.0, 0.0],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+5.6%", "+2.9%", "+1.7%", "+1.1%", "+0.1%", "+0.1%", "+0.2%", "+0.0%", "+0.0%", "+0.0%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure 6: Distributional impact of Attendance Allowance by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.1%",
     "automargin": true,
     "range": [0, 6.0],
     "dtick": 1,
     "tickvals": [0.0, 1.0, 2.0, 3.0, 4.0, 5.0],
     "ticktext": ["+0.0%", "+1.0%", "+2.0%", "+3.0%", "+4.0%", "+5.0%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### Child Benefit

The government pays [Child Benefit](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/child_benefit.py) for children under 16, or under 20 if they remain in approved education or training. Unlike means-tested benefits, Child Benefit is paid at a flat rate regardless of income. For 2025, the rate is £26.04 per week for the first child and £17.24 per week for each additional child. We calculate Child Benefit using the following methodology:

1. Identifying eligible children in each household
2. Applying the higher rate for the eldest (or only) eligible child
3. Applying the standard rate for additional eligible children
4. Calculating the High Income Child Benefit Charge (HITC) if applicable
5. Determining the net Child Benefit after the HITC

The [High Income Child Benefit Charge (HITC)](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/charges/child_benefit_hitc.py) effectively withdraws this benefit when individual income exceeds £50,000, with complete withdrawal at £60,000. It increases proportionally with income within this range. For each £100 of income above £50,000, 1% of the Child Benefit is reclaimed through the tax system.

PolicyEngine projects that Child Benefit will cost [£12.3 billion](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80696) in 2025, 1.6% less than the UK government's estimate of [£12.5 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-child-benefit/#:~:text=Child%20benefit%20is%20a%20cash,the%20UK%20in%202023%2D24.) for 2025-2026. The following figure shows the distributional impact of this programme.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [1.5, 0.8, 0.9, 1.1, 1.3, 1.2, 0.8, 0.8, 0.7, 0.2],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+1.5%", "+0.8%", "+0.9%", "+1.1%", "+1.3%", "+1.2%", "+0.8%", "+0.8%", "+0.7%", "+0.2%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure 7: Distributional impact of Child Benefit by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.1%",
     "automargin": true,
     "range": [0, 1.6],
     "dtick": 0.2,
     "tickvals": [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4],
     "ticktext": ["+0.0%", "+0.2%", "+0.4%", "+0.6%", "+0.8%", "+1.0%", "+1.2%", "+1.4%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### State Pension

Unlike means-tested benefits for pensioners like Pension Credit, [State Pension](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/state_pension.py) is based on National Insurance contribution history rather than current financial circumstances. We calculate State Pension using the following methodology:

1. Determining if the individual has reached State Pension age
2. Identifying which State Pension system applies (pre or post April 2016)
3. Calculating entitlement based on National Insurance contributions
4. Applying the appropriate rates based on the system

There are two systems depending on when the person reached State Pension age:

- **[New State Pension](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/dwp/state_pension/new_state_pension/)**: For those reaching State Pension age on or after April 6, 2016. For 2025, the full rate is £221.20 per week, reduced proportionally for those with fewer than 35 qualifying years of National Insurance contributions (minimum 10 years required). The calculation multiplies the full rate by the fraction of qualifying years divided by 35, with a minimum threshold of 10 qualifying years.

- **[Basic State Pension](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/dwp/state_pension/basic_state_pension/)**: For those who reached State Pension age before April 6, 2016. For 2025, the full rate is £169.50 per week, plus Additional State Pension based on earnings-related contributions. The Basic State Pension requires 30 qualifying years for a full pension, with a proportional reduction for those with fewer years.

Both systems [use](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/dwp/state_pension/triple_lock/) the triple lock for annual increases, raising pensions by the highest of inflation, earnings growth, or the fixed rate of 2.5%. The model implements this by comparing the three potential uprating mechanisms and applying the highest increase each year.

### Winter Fuel Payment

Winter Fuel Payment [provides](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dwp/WFA.py) annual financial payment for older people with heating costs. We calculate Winter Fuel Payment using the following methodology:

1. Identifying households with members of eligible age
2. Determining the appropriate payment rate based on age and household composition
3. Assigning the annual payment amount

For 2025, households with someone aged 66-79 receive £200, while households with someone aged 80 or over receive £300. In multi-pensioner households, the payment is allocated to ensure no household gets more than the maximum entitlement.

In Scotland, the Pension Age Winter Heating Payment (PAWHP) has [replaced](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/social_security_scotland/pawhp.py) this benefit, with similar rate structure. This reflects the devolution of certain benefits to the Scottish government, which has implemented its own version of the payment with similar eligibility criteria and rates.

PolicyEngine projects that Winter Fuel Payment will cost less than [£1 billion](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80702) in 2025, in line with the UK government's estimate of less than £1 billion for 2025-2026.

### Tax-free childcare

Tax-free childcare [provides](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/tax_free_childcare/tax_free_childcare.py) a government top-up for childcare spending. This scheme operates through an online account where parents pay in money for childcare, and the government adds a top-up. We calculate tax-free childcare using the following methodology:

1. Identifying households with eligible children
2. Checking income conditions and work requirements for parents
3. Calculating childcare expenses and the corresponding government contribution
4. Applying the maximum contribution cap per child

For 2025, the government contributes 20% of childcare costs, effectively adding £2 for every £8 parents spend. The maximum annual contribution is £2,000 per standard child and £4,000 per disabled child. This 20% rate effectively provides relief equivalent to the basic rate of income tax.

Eligibility criteria include age requirements (children under 12, or under 17 if disabled), income conditions (quarterly income above minimum wage × 16 hours/week × 13 weeks but below £100,000 per year adjusted net income), and work requirements (both parents must generally be working, with exceptions for disability).

PolicyEngine projects that tax-free childcare will cost [£0.6 billion](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2024&baseline=83892) in 2024, in line with the UK government's estimate of [£0.6 billion](https://www.gov.uk/government/statistics/tax-free-childcare-statistics-september-2024) for 2024.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [0.000, 0.010, 0.010, 0.020, 0.030, 0.040, 0.060, 0.090, 0.100, 0.020],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+0.00%", "+0.01%", "+0.01%", "+0.02%", "+0.03%", "+0.04%", "+0.06%", "+0.09%", "+0.10%", "+0.02%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure 8: Distributional impact of TFC by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.3%",
     "automargin": true,
     "range": [0, 0.12],
     "dtick": 0.02,
     "tickvals": [0, 0.02, 0.04, 0.06, 0.08, 0.10],
     "ticktext": ["+0.000%", "+0.020%", "+0.040%", "+0.060%", "+0.080%", "+0.100%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### Universal childcare entitlement

The universal childcare entitlement [offers](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/universal_childcare_entitlement/universal_childcare_entitlement.py) free childcare hours for all children aged 3-4 years old. This is available to all children regardless of parental income or work status. We calculate universal childcare entitlement using the following methodology:

1. Identifying children aged [3-4 years old](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/universal_childcare_entitlement/universal_childcare_entitlement_eligible.py)
2. Applying the standard entitlement of 570 hours per year
3. Calculating the monetary value using the applicable funding rate

For 2025, the entitlement provides 570 hours per year (equivalent to 15 hours per week over 38 weeks), with funding at a rate of £5.88 per hour for children aged 3 and over. This produces an annual value of £3,351.60 per eligible child, which counts as income-in-kind rather than cash payment.

PolicyEngine projects that universal childcare entitlement will cost [£1.6 billion](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2024&baseline=83887) in 2024, 5.9% less than the UK government's estimate of [£1.7 billion](https://skillsfunding.service.gov.uk/view-latest-funding/national-funding-allocations/DSG/2024-to-2025) for 2024.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [0.5, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+0.5%", "+0.2%", "+0.2%", "+0.2%", "+0.1%", "+0.1%", "+0.1%", "+0.0%", "+0.1%", "+0.1%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Distributional impact of universal childcare by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.2%",
     "automargin": true,
     "range": [0, 0.55],
     "dtick": 0.1,
     "tickvals": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5],
     "ticktext": ["+0.00%", "+0.10%", "+0.20%", "+0.30%", "+0.40%", "+0.50%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: POLICY ENGINE",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### Extended childcare entitlement

The extended childcare entitlement [provides](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/extended_childcare_entitlement/extended_childcare_entitlement.py) additional hours for working parents. This extends the universal offer for working parents, providing an additional 15 hours per week for 3-4 year olds and, from 2024, beginning to extend provision to younger children. We calculate extended childcare entitlement using the following methodology:

1. Identifying children in eligible age ranges
2. Checking parental work and income conditions
3. Applying the appropriate hourly entitlement based on child age
4. Calculating the monetary value using age-specific funding rates

The entitlement varies by child age in 2025:

- 9-23 months: 15 hours/week (increasing to 30 hours in 2026)
- 2 years: 15 hours/week (increasing to 30 hours in 2026)
- 3-4 years: 30 hours/week (which includes the universal 15 hours plus an additional 15 hours)

The funding rates vary by age: £11.22 per hour for children under 2, £8.28 per hour for 2-year-olds, and £5.88 per hour for children aged 3 and over. These different rates reflect the higher staffing requirements and costs of caring for younger children.

PolicyEngine projects that extended childcare entitlement will cost [£2.6 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2024&baseline=83897&uk_local_areas_beta=true) in 2024, 4.0% more than the UK government's estimate of [£2.5 billion](https://skillsfunding.service.gov.uk/view-latest-funding/national-funding-allocations/DSG/2024-to-2025) for 2024.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [0.1, 0.1, 0.1, 0.3, 0.3, 0.4, 0.2, 0.3, 0.2, 0.0],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+0.1%", "+0.1%", "+0.1%", "+0.3%", "+0.3%", "+0.4%", "+0.2%", "+0.3%", "+0.2%", "+0.0%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure: Distributional impact of extended childcare by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.1%",
     "automargin": true,
     "range": [0, 0.5],
     "dtick": 0.1,
     "tickvals": [0.0, 0.1, 0.2, 0.3, 0.4],
     "ticktext": ["+0.0%", "+0.1%", "+0.2%", "+0.3%", "+0.4%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### Targeted childcare entitlement

The targeted childcare entitlement [provides](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/targeted_childcare_entitlement/targeted_childcare_entitlement.py) free childcare for 2-year-olds in lower income families. We calculate targeted childcare entitlement using the following methodology:

1. Identifying children aged 2 years old
2. Checking if the family receives qualifying benefits or meets income criteria
3. Applying the standard entitlement of 570 hours per year
4. Calculating the monetary value using the 2-year-old funding rate

For 2025, it offers 570 hours per year (15 hours per week over 38 weeks), funded at a rate of £8.28 per hour. This produces an annual value of £4,719.60 per eligible child. Eligibility includes receiving qualifying benefits or meeting income criteria: income below £16,190 per year for Tax Credit recipients or earned income below £15,400 per year for Universal Credit recipients.

PolicyEngine projects that targeted childcare entitlement will cost [£0.5 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2024&baseline=83888) in 2024, in line with the UK government's estimate of [£0.6 billion](https://skillsfunding.service.gov.uk/view-latest-funding/national-funding-allocations/DSG/2024-to-2025) for 2024.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [0.5, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0],
     "type": "bar",
     "marker": {
       "color": "#2E5984"
     },
     "name": "Change in household income (%)",
     "text": ["+0.5%", "+0.1%", "+0.1%", "+0.1%", "+0.1%", "+0.0%", "+0.0%", "+0.0%", "+0.0%", "+0.0%"],
     "textposition": "inside",
     "insidetextfont": {
       "family": "Roboto Serif",
       "color": "white",
       "size": 10
     }
   }
 ],
 "layout": {
   "title": {
     "text": "Figure: Distributional impact of targeted chidlcare by income decile",
     "font": {
       "family": "Roboto Serif",
       "size": 16
     },
     "x": 0,
     "xanchor": "left"
   },
   "yaxis": {
     "title": "Relative change in household income",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickfont": {
       "family": "Roboto Serif"
     },
     "tickformat": ",.1%",
     "automargin": true,
     "range": [0, 0.6],
     "dtick": 0.1,
     "tickvals": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5],
     "ticktext": ["+0.0%", "+0.1%", "+0.2%", "+0.3%", "+0.4%", "+0.5%"]
   },
   "xaxis": {
     "title": "Income decile",
     "titlefont": {
       "family": "Roboto Serif"
     },
     "tickmode": "array",
     "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "ticktext": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
   },
   "height": 500,
   "margin": {
     "l": 50,
     "r": 50,
     "b": 100,
     "t": 100,
     "pad": 4
   },
   "annotations": [
     {
       "x": 1,
       "y": -0.25,
       "xref": "paper",
       "yref": "paper",
       "text": "Source: PolicyEngine",
       "showarrow": false,
       "font": {
         "family": "Roboto Serif",
         "size": 10,
         "color": "#616161"
       }
     }
   ],
   "images": [
     {
       "source": "/logo512.png",
       "x": 1,
       "y": -0.18,
       "xref": "paper",
       "yref": "paper",
       "sizex": 0.1,
       "sizey": 0.1,
       "xanchor": "right",
       "yanchor": "bottom"
     }
   ],
   "plot_bgcolor": "#ebf2fa",
   "paper_bgcolor": "#ebf2fa"
 }
}
```

### Care to Learn

The [Care to Learn](<(https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/study_childcare_entitlement/study_childcare_entitlement.py)>), offers funding for young parents in education for childcare costs. We calculate Care to Learn using the following methodology:

1. Identifying eligible young parents (under 20 years old)
2. Verifying they are in non-tertiary education (not university or higher education)
3. Checking if they live in England and are not apprentices
4. Calculating the monetary value based on regional rates (London vs outside London)

For 2025, the scheme offers weekly payments of up to £195 per week for those living in London and £180 per week for those living outside London. The scheme multiplies this weekly amount by the number of weeks in a year to determine the annual value, making it worth up to £10,140 per year for London residents and £9,360 per year for those outside London.

[Eligibility](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/dfe/care_to_learn) is that the claimant is a parent under 20 years old, living in England, has children, is in eligible education (not higher education), and is not an apprentice.

### Energy Bills Support

The government has introduced several programmes to support households' energy costs:

- **[Energy Bills Credit](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/energy_bills_credit.py)**: Provided £400 per household as monthly reductions on electricity bills from October 2022 to March 2023. This universal support was applied automatically to all domestic electricity accounts, spread across six monthly instalments.The government concluded the scheme in [March 2024](https://www.gov.uk/guidance/energy-bills-discount-scheme) and did not extend it beyond the winter period.

- **[Council Tax Rebate](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/energy_bills_rebate/council_tax_rebate.py)**: Provided £150 per household in Council Tax bands A-D in England (with equivalent schemes in devolved nations). Local authorities delivered the payments between April and September 2022, and the scheme officially closed in [November 2022](https://www.gov.uk/guidance/council-tax-rebate-factsheet).

- **[Energy Price Guarantee](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/price_cap_subsidy/energy_price_cap_subsidy.py)**: Limited average household energy bills to £2,500 per year for a typical household. This intervention directly limited unit prices for gas and electricity, with the government subsidising energy suppliers for the difference between the guaranteed price and market rates. The government ended the scheme in [June 2023](https://www.gov.uk/government/publications/energy-bills-support/energy-price-guarantee-up-until-30-june-2023).

### Cost of Living Support Payment

[Cost of Living Support Payment](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/treasury/cost_of_living_support/cost_of_living_support_payment.py) is a one-off payments for vulnerable groups. For 2022-23, this included:

- £650 for recipients of means-tested benefits (paid in two instalments)
- £150 for recipients of disability benefits
- £300 for those eligible for Winter Fuel Payment

## Conclusion

PolicyEngine models the current UK benefits system and potential reforms, presenting distributional impacts by income decile. Users can analyse how benefit changes affect household incomes, government budgets, and behavioural responses such as labour supply. The model accounts for how benefit design influences household decisions and economic outcomes. We invite you to explore these policy effects on the PolicyEngine interface.
