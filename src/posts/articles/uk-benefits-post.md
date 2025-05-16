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

#### Gross salary vs take-home pay at the household level

To show the impact of TFC on household finances, we start with an example of a [single-earner household](https://policyengine.org/uk/household?focus=householdOutput.earnings&reform=73038&region=uk&timePeriod=2025&baseline=76821&household=51616) with one child aged 3. These households become eligible for TFC when earning at least [£9,516 annually](https://www.gov.uk/tax-free-childcare) for those aged 21 or over. The benefit continues until £100,000, where eligibility ends, creating a decline in take-home pay. This creates a divergence between those receiving and not receiving TFC at higher income levels, as shown in the figure below.

```plotly
{"data":[{"hovertemplate":"Scenario=With TFC\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"With TFC","line":{"color":"#1F77B4","dash":"dash"},"marker":{"symbol":"circle"},"mode":"lines","name":"With TFC","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[12969.0,21619.0,21769.0,21919.0,22069.0,22219.0,22369.0,22519.0,22669.0,22819.0,22969.0,23119.0,23269.0,23419.0,23569.0,23719.0,23869.0,24019.0,24169.0,24319.0,24469.0,24619.0,24769.0,24919.0,25069.0,25219.0,25369.0,25519.0,25669.0,25819.0,25969.0,26119.0,26269.0,26419.0,26569.0,26719.0,26869.0,27019.0,27169.0,27319.0,27469.0,27619.0,27769.0,27919.0,28069.0,28219.0,28369.0,28519.0,28669.0,28819.0,28969.0,29119.0,29269.0,29419.0,29569.0,29696.0,29763.0,29831.0,29898.0,29966.0,30033.0,30101.0,30168.0,30236.0,30303.0,30371.0,30438.0,30506.0,34032.0,34100.0,34167.0,34235.0,34302.0,34370.0,34437.0,34505.0,34572.0,34640.0,34707.0,34775.0,34842.0,34910.0,34977.0,35045.0,35108.0,35157.0,35205.0,35254.0,35303.0,35351.0,35400.0,35448.0,35497.0,35546.0,35594.0,35643.0,35691.0,35740.0,35789.0,35837.0,35886.0,35934.0,35983.0,36032.0,36080.0,36129.0,36177.0,36226.0,36275.0,36323.0,36372.0,36420.0,36469.0,36518.0,36566.0,36615.0,36663.0,36712.0,36761.0,36809.0,36858.0,36906.0,36955.0,37004.0,37052.0,37101.0,37149.0,37198.0,37247.0,37295.0,37344.0,37392.0,37441.0,37490.0,37538.0,37587.0,37635.0,37684.0,37733.0,37781.0,37830.0,37878.0,37927.0,37976.0,38024.0,38073.0,38121.0,38170.0,38219.0,38267.0,38316.0,38364.0,38413.0,38462.0,38510.0,38559.0,38607.0,38656.0,38705.0,38753.0,38802.0,38850.0,38899.0,38948.0,38996.0,39045.0,39093.0,39142.0,39191.0,39239.0,39288.0,39336.0,39385.0,39434.0,39482.0,39531.0,39579.0,39628.0,39677.0,39725.0,39774.0,39822.0,39871.0,39920.0,39968.0,40017.0,40065.0,40114.0,40163.0,40211.0,40260.0,40308.0,40357.0,40406.0,40454.0,40503.0,40551.0,40600.0,40649.0,40697.0,40746.0,40794.0,40843.0,40892.0,40940.0,40989.0,41037.0,41086.0,41135.0,41183.0,41232.0,41280.0,41329.0,41378.0,41426.0,41475.0,41523.0,41572.0,41621.0,41669.0,41718.0,41766.0,41815.0,41864.0,41912.0,41961.0,42009.0,42058.0,42107.0,42155.0,42204.0,42252.0,42301.0,42350.0,42398.0,42447.0,42495.0,42544.0,42593.0,42641.0,42690.0,42738.0,42787.0,42836.0,42884.0,42933.0,42981.0,43030.0,43079.0,43127.0,43176.0,43224.0,43273.0,43322.0,43370.0,43419.0,43467.0,43516.0,43565.0,43613.0,43662.0,43710.0,43759.0,43808.0,43856.0,43905.0,43953.0,44002.0,44051.0,44099.0,44148.0,44196.0,44245.0,44294.0,44342.0,44391.0,44439.0,44488.0,44537.0,44585.0,44634.0,44682.0,44731.0,44780.0,44828.0,44877.0,44925.0,44974.0,45023.0,45071.0,45120.0,45168.0,45217.0,45266.0,45314.0,45363.0,45411.0,45460.0,45509.0,45557.0,45606.0,45654.0,45703.0,45752.0,45800.0,45849.0,45897.0,45946.0,45995.0,46043.0,46092.0,46140.0,46189.0,46238.0,46286.0,46335.0,46383.0,46432.0,46481.0,46529.0,46578.0,46626.0,46675.0,46724.0,46772.0,46821.0,46869.0,48948.0,49056.0,49164.0,49272.0,49380.0,49488.0,49596.0,49704.0,49812.0,49902.0,49989.0,50076.0,50164.0,50251.0,50338.0,50425.0,50512.0,50600.0,50687.0,50774.0,50861.0,50949.0,51036.0,51123.0,51210.0,51297.0,51385.0,51472.0,51559.0,51646.0,51734.0,51821.0,51908.0,51995.0,52082.0,52170.0,52257.0,52344.0,52431.0,52519.0,52606.0,52693.0,52780.0,52868.0,52955.0,53042.0,53129.0,53216.0,53304.0,53391.0,53478.0,53565.0,53653.0,53740.0,53827.0,53914.0,54001.0,54089.0,54176.0,54263.0,54350.0,54438.0,54525.0,54612.0,54699.0,54786.0,54874.0,54961.0,55048.0,55135.0,55223.0,55310.0,55397.0,55484.0,55561.0,55638.0,55715.0,55793.0,55870.0,55947.0,56024.0,56101.0,56178.0,56255.0,56332.0,56409.0,56486.0,56563.0,56640.0,56717.0,56794.0,56872.0,56949.0,57026.0,57103.0,57180.0,57257.0,57334.0,57411.0,57488.0,57565.0,57642.0,57719.0,57796.0,57873.0,57950.0,58028.0,58105.0,58182.0,58259.0,58336.0,58413.0,58490.0,58567.0,58644.0,58721.0,58798.0,58875.0,58952.0,59029.0,59107.0,59184.0,59261.0,59338.0,59415.0,59492.0,59569.0,59646.0,59723.0,59800.0,59877.0,59954.0,60031.0,60108.0,60185.0,60263.0,60340.0,60417.0,60494.0,60571.0,60648.0,60725.0,60802.0,60879.0,60956.0,61033.0,61110.0,61187.0,61264.0,61342.0,61419.0,61496.0,61573.0,61650.0,61727.0,61804.0,61881.0,61958.0,62035.0,62112.0,62189.0,62266.0,62343.0,62421.0,62498.0,62575.0,62652.0,62729.0,62806.0,62883.0,62960.0,63037.0,63114.0,63191.0,63268.0,63345.0,63422.0,63499.0,63577.0,63654.0,63731.0,63808.0,63885.0,63962.0,64039.0,64116.0,64193.0,64270.0,64347.0,64424.0,64501.0,64578.0,64656.0,64733.0,64810.0,64887.0,64964.0,65041.0,65118.0,65195.0,65272.0,65349.0,65426.0,65503.0,65580.0,65657.0,65734.0,65818.0,65906.0,65993.0,66080.0,66167.0,66254.0,66342.0,66429.0,66516.0,66603.0,66691.0,66778.0,66865.0,66952.0,67039.0,67127.0,67214.0,67301.0,67388.0,67476.0,67563.0,67650.0,67737.0,67824.0,67912.0,67999.0,68086.0,68173.0,68261.0,68348.0,68435.0,68522.0,68610.0,68697.0,68784.0,68871.0,68958.0,69046.0,69133.0,69220.0,69307.0,69395.0,69482.0,69569.0,69656.0,69743.0,69831.0,69918.0,70005.0,70092.0,70180.0,70267.0,70354.0,70441.0,70528.0,70616.0,70703.0,70790.0,70877.0,70965.0,71052.0,71139.0,71226.0,71314.0,71401.0,71488.0,71575.0,71662.0,71750.0,71837.0,71924.0,72011.0,72099.0,72186.0,72273.0,72360.0,72447.0,72535.0,72622.0,72709.0,72796.0,72884.0,72971.0,73058.0,73145.0,73232.0,73320.0,73407.0,73494.0,73581.0,73669.0,73756.0,73843.0,73930.0,74017.0,74105.0,74192.0,74279.0,74366.0,74454.0,74541.0,74628.0,74715.0,74802.0,74890.0,74977.0,75064.0,75151.0,75239.0,75326.0,75413.0,75500.0,75588.0,75675.0,75762.0,75849.0,75936.0,76024.0,76111.0,76198.0,76285.0,76373.0,76460.0,76547.0,76634.0,76721.0,76809.0,76896.0,76983.0,77070.0,77158.0,77245.0,77332.0,71951.0,72008.0,72065.0,72122.0,72180.0,72237.0,72294.0,72351.0,72408.0,72466.0,72523.0,72580.0,72637.0,72695.0,72752.0,72809.0,72866.0,72923.0,72981.0,73038.0,73095.0,73152.0,73210.0,73267.0,73324.0,73381.0,73439.0,73496.0,73553.0,73610.0,73667.0,73725.0,73782.0,73839.0,73896.0,73954.0,74011.0,74068.0,74125.0,74182.0,74240.0,74297.0,74354.0,74411.0,74469.0,74526.0,74583.0,74640.0,74697.0,74755.0,74812.0,74869.0,74926.0,74984.0,75041.0,75098.0,75155.0,75212.0,75270.0,75327.0,75384.0,75441.0,75499.0,75556.0,75613.0,75670.0,75728.0,75785.0,75842.0,75899.0,75956.0,76014.0,76071.0,76128.0,76185.0,76243.0,76300.0,76357.0,76414.0,76471.0,76529.0,76586.0,76643.0,76700.0,76758.0,76815.0,76872.0,76929.0,76986.0,77044.0,77101.0,77158.0,77215.0,77273.0,77330.0,77387.0,77444.0,77501.0,77559.0,77616.0,77673.0,77730.0,77788.0,77845.0,77902.0,77959.0,78017.0,78074.0,78131.0,78188.0,78245.0,78303.0,78360.0,78417.0,78474.0,78532.0,78589.0,78646.0,78703.0,78760.0,78818.0,78875.0,78932.0,78989.0,79047.0,79104.0,79161.0,79218.0,79275.0,79333.0,79390.0,79447.0,79504.0,79562.0,79619.0,79676.0,79733.0,79790.0,79848.0,79905.0,79962.0,80019.0,80077.0,80134.0,80191.0,80248.0,80306.0,80363.0,80420.0,80477.0,80534.0,80592.0,80649.0,80706.0,80763.0,80821.0,80878.0,80935.0,80992.0,81049.0,81107.0,81164.0,81221.0,81278.0,81336.0,81393.0,81450.0,81507.0,81581.0,81661.0,81740.0,81820.0,81900.0,81980.0,82059.0,82139.0,82219.0,82298.0,82378.0,82458.0,82538.0,82617.0,82697.0,82777.0,82857.0,82936.0,83016.0,83096.0,83175.0,83255.0,83335.0,83415.0,83494.0,83574.0,83654.0,83734.0,83813.0,83893.0,83973.0,84052.0,84132.0,84212.0,84292.0,84371.0,84451.0,84531.0,84611.0,84690.0,84770.0,84850.0,84929.0,85009.0,85089.0,85169.0,85248.0,85328.0,85408.0,85487.0,85567.0,85647.0,85727.0,85806.0,85886.0,85966.0,86046.0,86125.0,86205.0,86285.0,86364.0,86444.0,86524.0,86604.0,86683.0,86763.0,86843.0,86923.0,87002.0,87082.0,87162.0,87241.0,87321.0,87401.0,87481.0,87560.0,87640.0,87720.0,87800.0,87879.0,87959.0,88039.0,88118.0,88198.0,88278.0,88358.0,88437.0,88517.0,88597.0,88676.0,88756.0,88836.0,88916.0,88995.0,89075.0,89155.0,89235.0,89314.0,89394.0,89474.0,89553.0,89633.0,89713.0,89793.0,89872.0,89952.0,90032.0,90112.0,90191.0,90271.0,90351.0,90430.0,90510.0,90590.0,90670.0,90749.0,90829.0,90909.0,90989.0,91068.0,91148.0,91228.0,91307.0,91387.0,91467.0,91547.0,91626.0,91706.0,91786.0,91865.0,91945.0,92025.0,92105.0,92184.0,92264.0,92344.0,92424.0,92503.0,92583.0,92663.0,92742.0,92822.0,92902.0,92982.0,93061.0,93141.0,93221.0,93301.0,93380.0,93460.0,93540.0,93619.0,93699.0,93779.0,93859.0,93938.0,94018.0,94098.0,94178.0,94257.0,94337.0,94417.0,94496.0,94576.0,94656.0,94736.0],"yaxis":"y","type":"scattergl"},{"hovertemplate":"Scenario=Without TFC\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"Without TFC","line":{"color":"#808080","dash":"solid"},"marker":{"symbol":"circle"},"mode":"lines","name":"Without TFC","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[12969.0,21619.0,21769.0,21919.0,22069.0,22219.0,22369.0,22519.0,22669.0,22819.0,22969.0,23119.0,23269.0,23419.0,23569.0,23719.0,23869.0,24019.0,24169.0,24319.0,24469.0,24619.0,24769.0,24919.0,25069.0,25219.0,25369.0,25519.0,25669.0,25819.0,25969.0,26119.0,26269.0,26419.0,26569.0,26719.0,26869.0,27019.0,27169.0,27319.0,27469.0,27619.0,27769.0,27919.0,28069.0,28219.0,28369.0,28519.0,28669.0,28819.0,28969.0,29119.0,29269.0,29419.0,29569.0,29696.0,29763.0,29831.0,29898.0,29966.0,30033.0,30101.0,30168.0,30236.0,30303.0,30371.0,30438.0,30506.0,34032.0,34100.0,34167.0,34235.0,34302.0,34370.0,34437.0,34505.0,34572.0,34640.0,34707.0,34775.0,34842.0,34910.0,34977.0,35045.0,35108.0,35157.0,35205.0,35254.0,35303.0,35351.0,35400.0,35448.0,35497.0,35546.0,35594.0,35643.0,35691.0,35740.0,35789.0,35837.0,35886.0,35934.0,35983.0,36032.0,36080.0,36129.0,36177.0,36226.0,36275.0,36323.0,36372.0,36420.0,36469.0,36518.0,36566.0,36615.0,36663.0,36712.0,36761.0,36809.0,36858.0,36906.0,36955.0,37004.0,37052.0,37101.0,37149.0,37198.0,37247.0,37295.0,37344.0,37392.0,37441.0,37490.0,37538.0,37587.0,37635.0,37684.0,37733.0,37781.0,37830.0,37878.0,37927.0,37976.0,38024.0,38073.0,38121.0,38170.0,38219.0,38267.0,38316.0,38364.0,38413.0,38462.0,38510.0,38559.0,38607.0,38656.0,38705.0,38753.0,38802.0,38850.0,38899.0,38948.0,38996.0,39045.0,39093.0,39142.0,39191.0,39239.0,39288.0,39336.0,39385.0,39434.0,39482.0,39531.0,39579.0,39628.0,39677.0,39725.0,39774.0,39822.0,39871.0,39920.0,39968.0,40017.0,40065.0,40114.0,40163.0,40211.0,40260.0,40308.0,40357.0,40406.0,40454.0,40503.0,40551.0,40600.0,40649.0,40697.0,40746.0,40794.0,40843.0,40892.0,40940.0,40989.0,41037.0,41086.0,41135.0,41183.0,41232.0,41280.0,41329.0,41378.0,41426.0,41475.0,41523.0,41572.0,41621.0,41669.0,41718.0,41766.0,41815.0,41864.0,41912.0,41961.0,42009.0,42058.0,42107.0,42155.0,42204.0,42252.0,42301.0,42350.0,42398.0,42447.0,42495.0,42544.0,42593.0,42641.0,42690.0,42738.0,42787.0,42836.0,42884.0,42933.0,42981.0,43030.0,43079.0,43127.0,43176.0,43224.0,43273.0,43322.0,43370.0,43419.0,43467.0,43516.0,43565.0,43613.0,43662.0,43710.0,43759.0,43808.0,43856.0,43905.0,43953.0,44002.0,44051.0,44099.0,44148.0,44196.0,44245.0,44294.0,44342.0,44391.0,44439.0,44488.0,44537.0,44585.0,44634.0,44682.0,44731.0,44780.0,44828.0,44877.0,44925.0,44974.0,45023.0,45071.0,45120.0,45168.0,45217.0,45266.0,45314.0,45363.0,45411.0,45460.0,45509.0,45557.0,45606.0,45654.0,45703.0,45752.0,45800.0,45849.0,45897.0,45946.0,45995.0,46043.0,46092.0,46140.0,46189.0,46238.0,46286.0,46335.0,46383.0,46432.0,46481.0,46529.0,46578.0,46626.0,46675.0,46724.0,46772.0,46821.0,46869.0,46948.0,47056.0,47164.0,47272.0,47380.0,47488.0,47596.0,47704.0,47812.0,47902.0,47989.0,48076.0,48164.0,48251.0,48338.0,48425.0,48512.0,48600.0,48687.0,48774.0,48861.0,48949.0,49036.0,49123.0,49210.0,49297.0,49385.0,49472.0,49559.0,49646.0,49734.0,49821.0,49908.0,49995.0,50082.0,50170.0,50257.0,50344.0,50431.0,50519.0,50606.0,50693.0,50780.0,50868.0,50955.0,51042.0,51129.0,51216.0,51304.0,51391.0,51478.0,51565.0,51653.0,51740.0,51827.0,51914.0,52001.0,52089.0,52176.0,52263.0,52350.0,52438.0,52525.0,52612.0,52699.0,52786.0,52874.0,52961.0,53048.0,53135.0,53223.0,53310.0,53397.0,53484.0,53561.0,53638.0,53715.0,53793.0,53870.0,53947.0,54024.0,54101.0,54178.0,54255.0,54332.0,54409.0,54486.0,54563.0,54640.0,54717.0,54794.0,54872.0,54949.0,55026.0,55103.0,55180.0,55257.0,55334.0,55411.0,55488.0,55565.0,55642.0,55719.0,55796.0,55873.0,55950.0,56028.0,56105.0,56182.0,56259.0,56336.0,56413.0,56490.0,56567.0,56644.0,56721.0,56798.0,56875.0,56952.0,57029.0,57107.0,57184.0,57261.0,57338.0,57415.0,57492.0,57569.0,57646.0,57723.0,57800.0,57877.0,57954.0,58031.0,58108.0,58185.0,58263.0,58340.0,58417.0,58494.0,58571.0,58648.0,58725.0,58802.0,58879.0,58956.0,59033.0,59110.0,59187.0,59264.0,59342.0,59419.0,59496.0,59573.0,59650.0,59727.0,59804.0,59881.0,59958.0,60035.0,60112.0,60189.0,60266.0,60343.0,60421.0,60498.0,60575.0,60652.0,60729.0,60806.0,60883.0,60960.0,61037.0,61114.0,61191.0,61268.0,61345.0,61422.0,61499.0,61577.0,61654.0,61731.0,61808.0,61885.0,61962.0,62039.0,62116.0,62193.0,62270.0,62347.0,62424.0,62501.0,62578.0,62656.0,62733.0,62810.0,62887.0,62964.0,63041.0,63118.0,63195.0,63272.0,63349.0,63426.0,63503.0,63580.0,63657.0,63734.0,63818.0,63906.0,63993.0,64080.0,64167.0,64254.0,64342.0,64429.0,64516.0,64603.0,64691.0,64778.0,64865.0,64952.0,65039.0,65127.0,65214.0,65301.0,65388.0,65476.0,65563.0,65650.0,65737.0,65824.0,65912.0,65999.0,66086.0,66173.0,66261.0,66348.0,66435.0,66522.0,66610.0,66697.0,66784.0,66871.0,66958.0,67046.0,67133.0,67220.0,67307.0,67395.0,67482.0,67569.0,67656.0,67743.0,67831.0,67918.0,68005.0,68092.0,68180.0,68267.0,68354.0,68441.0,68528.0,68616.0,68703.0,68790.0,68877.0,68965.0,69052.0,69139.0,69226.0,69314.0,69401.0,69488.0,69575.0,69662.0,69750.0,69837.0,69924.0,70011.0,70099.0,70186.0,70273.0,70360.0,70447.0,70535.0,70622.0,70709.0,70796.0,70884.0,70971.0,71058.0,71145.0,71232.0,71320.0,71407.0,71494.0,71581.0,71669.0,71756.0,71843.0,71930.0,72017.0,72105.0,72192.0,72279.0,72366.0,72454.0,72541.0,72628.0,72715.0,72802.0,72890.0,72977.0,73064.0,73151.0,73239.0,73326.0,73413.0,73500.0,73588.0,73675.0,73762.0,73849.0,73936.0,74024.0,74111.0,74198.0,74285.0,74373.0,74460.0,74547.0,74634.0,74721.0,74809.0,74896.0,74983.0,75070.0,75158.0,75245.0,75332.0,71951.0,72008.0,72065.0,72122.0,72180.0,72237.0,72294.0,72351.0,72408.0,72466.0,72523.0,72580.0,72637.0,72695.0,72752.0,72809.0,72866.0,72923.0,72981.0,73038.0,73095.0,73152.0,73210.0,73267.0,73324.0,73381.0,73439.0,73496.0,73553.0,73610.0,73667.0,73725.0,73782.0,73839.0,73896.0,73954.0,74011.0,74068.0,74125.0,74182.0,74240.0,74297.0,74354.0,74411.0,74469.0,74526.0,74583.0,74640.0,74697.0,74755.0,74812.0,74869.0,74926.0,74984.0,75041.0,75098.0,75155.0,75212.0,75270.0,75327.0,75384.0,75441.0,75499.0,75556.0,75613.0,75670.0,75728.0,75785.0,75842.0,75899.0,75956.0,76014.0,76071.0,76128.0,76185.0,76243.0,76300.0,76357.0,76414.0,76471.0,76529.0,76586.0,76643.0,76700.0,76758.0,76815.0,76872.0,76929.0,76986.0,77044.0,77101.0,77158.0,77215.0,77273.0,77330.0,77387.0,77444.0,77501.0,77559.0,77616.0,77673.0,77730.0,77788.0,77845.0,77902.0,77959.0,78017.0,78074.0,78131.0,78188.0,78245.0,78303.0,78360.0,78417.0,78474.0,78532.0,78589.0,78646.0,78703.0,78760.0,78818.0,78875.0,78932.0,78989.0,79047.0,79104.0,79161.0,79218.0,79275.0,79333.0,79390.0,79447.0,79504.0,79562.0,79619.0,79676.0,79733.0,79790.0,79848.0,79905.0,79962.0,80019.0,80077.0,80134.0,80191.0,80248.0,80306.0,80363.0,80420.0,80477.0,80534.0,80592.0,80649.0,80706.0,80763.0,80821.0,80878.0,80935.0,80992.0,81049.0,81107.0,81164.0,81221.0,81278.0,81336.0,81393.0,81450.0,81507.0,81581.0,81661.0,81740.0,81820.0,81900.0,81980.0,82059.0,82139.0,82219.0,82298.0,82378.0,82458.0,82538.0,82617.0,82697.0,82777.0,82857.0,82936.0,83016.0,83096.0,83175.0,83255.0,83335.0,83415.0,83494.0,83574.0,83654.0,83734.0,83813.0,83893.0,83973.0,84052.0,84132.0,84212.0,84292.0,84371.0,84451.0,84531.0,84611.0,84690.0,84770.0,84850.0,84929.0,85009.0,85089.0,85169.0,85248.0,85328.0,85408.0,85487.0,85567.0,85647.0,85727.0,85806.0,85886.0,85966.0,86046.0,86125.0,86205.0,86285.0,86364.0,86444.0,86524.0,86604.0,86683.0,86763.0,86843.0,86923.0,87002.0,87082.0,87162.0,87241.0,87321.0,87401.0,87481.0,87560.0,87640.0,87720.0,87800.0,87879.0,87959.0,88039.0,88118.0,88198.0,88278.0,88358.0,88437.0,88517.0,88597.0,88676.0,88756.0,88836.0,88916.0,88995.0,89075.0,89155.0,89235.0,89314.0,89394.0,89474.0,89553.0,89633.0,89713.0,89793.0,89872.0,89952.0,90032.0,90112.0,90191.0,90271.0,90351.0,90430.0,90510.0,90590.0,90670.0,90749.0,90829.0,90909.0,90989.0,91068.0,91148.0,91228.0,91307.0,91387.0,91467.0,91547.0,91626.0,91706.0,91786.0,91865.0,91945.0,92025.0,92105.0,92184.0,92264.0,92344.0,92424.0,92503.0,92583.0,92663.0,92742.0,92822.0,92902.0,92982.0,93061.0,93141.0,93221.0,93301.0,93380.0,93460.0,93540.0,93619.0,93699.0,93779.0,93859.0,93938.0,94018.0,94098.0,94178.0,94257.0,94337.0,94417.0,94496.0,94576.0,94656.0,94736.0],"yaxis":"y","type":"scattergl"}],"layout":{"template":{"data":{"barpolar":[{"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"type":"carpet"}],"choropleth":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"choropleth"}],"contourcarpet":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"contourcarpet"}],"contour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"contour"}],"heatmapgl":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmapgl"}],"heatmap":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmap"}],"histogram2dcontour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2dcontour"}],"histogram2d":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2d"}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"mesh3d":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"mesh3d"}],"parcoords":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"parcoords"}],"pie":[{"automargin":true,"type":"pie"}],"scatter3d":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatter3d"}],"scattercarpet":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattercarpet"}],"scattergeo":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergeo"}],"scattergl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergl"}],"scattermapbox":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattermapbox"}],"scatterpolargl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolargl"}],"scatterpolar":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolar"}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"scatterternary":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterternary"}],"surface":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"surface"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}]},"layout":{"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"autotypenumbers":"strict","coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]],"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]},"colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"geo":{"bgcolor":"white","lakecolor":"white","landcolor":"white","showlakes":true,"showland":true,"subunitcolor":"#C8D4E3"},"hoverlabel":{"align":"left"},"hovermode":"closest","mapbox":{"style":"light"},"paper_bgcolor":"white","plot_bgcolor":"white","polar":{"angularaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""},"bgcolor":"white","radialaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""}},"scene":{"xaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"yaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"zaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"ternary":{"aaxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"baxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"bgcolor":"white","caxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""}},"title":{"x":0.05},"xaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2},"yaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Household head employment income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{"text":"Household net income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"legend":{"title":{"text":"Scenario"},"tracegroupgap":0},"margin":{"t":120,"b":120,"l":120,"r":120},"font":{"family":"Roboto Serif","color":"black"},"height":600,"width":800,"plot_bgcolor":"#F4F4F4","paper_bgcolor":"#F4F4F4","images":[{"sizex":0.15,"sizey":0.15,"source":"https:\u002f\u002fraw.githubusercontent.com\u002fPolicyEngine\u002fpolicyengine-app\u002fmaster\u002fsrc\u002fimages\u002flogos\u002fpolicyengine\u002fblue.png","x":1.1,"xanchor":"right","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"annotations":[{"showarrow":false,"text":"Source: PolicyEngine UK tax-benefit microsimulation model","x":0,"xanchor":"left","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"modebar":{"bgcolor":"#F4F4F4","color":"#F4F4F4","activecolor":"#F4F4F4"},"uniformtext":{"mode":"hide","minsize":12},"title":{"text":""}}}
```

This decline at £100,000 creates an earnings dead zone, which is the width of the difference area in the chart where the sudden loss of TFC benefits affects household finances. At this threshold, families experience a cliff effect as they transition from receiving childcare support to losing it entirely.

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

#### Gross salary vs take-home pay at the household level

To show the impact of universal childcare entitlement on household finances, we start with an example of a [single-earner household](https://policyengine.org/uk/household?reform=1&focus=householdOutput.earnings&region=uk&timePeriod=2025&baseline=82975&household=53312) with one child aged 3. TFC and universal childcare cannot be combined at the same time. Figure below shows household net income based on head employment income.

```plotly
{"data":[{"hovertemplate":"Scenario=With universal childcare\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"With universal childcare","line":{"color":"#1F77B4","dash":"dash"},"marker":{"symbol":"circle"},"mode":"lines","name":"With universal childcare","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[12969.0,21619.0,21769.0,21919.0,22069.0,22219.0,22369.0,22519.0,22669.0,22819.0,22969.0,23119.0,23269.0,23419.0,23569.0,23719.0,23869.0,24019.0,24169.0,24319.0,24469.0,24619.0,24769.0,24919.0,25069.0,25219.0,25369.0,25519.0,25669.0,25819.0,25969.0,26119.0,26269.0,26419.0,26569.0,26719.0,26869.0,27019.0,27169.0,27319.0,27469.0,27619.0,27769.0,27919.0,28069.0,28219.0,28369.0,28519.0,28669.0,28819.0,28969.0,29119.0,29269.0,29419.0,29569.0,29696.0,29763.0,29831.0,29898.0,29966.0,30033.0,30101.0,30168.0,30236.0,30303.0,30371.0,30438.0,30506.0,34032.0,34100.0,34167.0,34235.0,34302.0,34370.0,34437.0,34505.0,34572.0,34640.0,34707.0,34775.0,34842.0,34910.0,34977.0,35045.0,35108.0,35157.0,35205.0,35254.0,35303.0,35351.0,35400.0,35448.0,35497.0,35546.0,35594.0,35643.0,35691.0,35740.0,35789.0,35837.0,35886.0,35934.0,35983.0,36032.0,36080.0,36129.0,36177.0,36226.0,36275.0,36323.0,36372.0,36420.0,36469.0,36518.0,36566.0,36615.0,36663.0,36712.0,36761.0,36809.0,36858.0,36906.0,36955.0,37004.0,37052.0,37101.0,37149.0,37198.0,37247.0,37295.0,37344.0,37392.0,37441.0,37490.0,37538.0,37587.0,37635.0,37684.0,37733.0,37781.0,37830.0,37878.0,37927.0,37976.0,38024.0,38073.0,38121.0,38170.0,38219.0,38267.0,38316.0,38364.0,38413.0,38462.0,38510.0,38559.0,38607.0,38656.0,38705.0,38753.0,38802.0,38850.0,38899.0,38948.0,38996.0,39045.0,39093.0,39142.0,39191.0,39239.0,39288.0,39336.0,39385.0,39434.0,39482.0,39531.0,39579.0,39628.0,39677.0,39725.0,39774.0,39822.0,39871.0,39920.0,39968.0,40017.0,40065.0,40114.0,40163.0,40211.0,40260.0,40308.0,40357.0,40406.0,40454.0,40503.0,40551.0,40600.0,40649.0,40697.0,40746.0,40794.0,40843.0,40892.0,40940.0,40989.0,41037.0,41086.0,41135.0,41183.0,41232.0,41280.0,41329.0,41378.0,41426.0,41475.0,41523.0,41572.0,41621.0,41669.0,41718.0,41766.0,41815.0,41864.0,41912.0,41961.0,42009.0,42058.0,42107.0,42155.0,42204.0,42252.0,42301.0,42350.0,42398.0,42447.0,42495.0,42544.0,42593.0,42641.0,42690.0,42738.0,42787.0,42836.0,42884.0,42933.0,42981.0,43030.0,43079.0,43127.0,43176.0,43224.0,43273.0,43322.0,43370.0,43419.0,43467.0,43516.0,43565.0,43613.0,43662.0,43710.0,43759.0,43808.0,43856.0,43905.0,43953.0,44002.0,44051.0,44099.0,44148.0,44196.0,44245.0,44294.0,44342.0,44391.0,44439.0,44488.0,44537.0,44585.0,44634.0,44682.0,44731.0,44780.0,44828.0,44877.0,44925.0,44974.0,45023.0,45071.0,45120.0,45168.0,45217.0,45266.0,45314.0,45363.0,45411.0,45460.0,45509.0,45557.0,45606.0,45654.0,45703.0,45752.0,45800.0,45849.0,45897.0,45946.0,45995.0,46043.0,46092.0,46140.0,46189.0,46238.0,46286.0,46335.0,46383.0,46432.0,46481.0,46529.0,46578.0,46626.0,46675.0,46724.0,46772.0,46821.0,46869.0,48948.0,49056.0,49164.0,49272.0,49380.0,49488.0,49596.0,49704.0,49812.0,49902.0,49989.0,50076.0,50164.0,50251.0,50338.0,50425.0,50512.0,50600.0,50687.0,50774.0,50861.0,50949.0,51036.0,51123.0,51210.0,51297.0,51385.0,51472.0,51559.0,51646.0,51734.0,51821.0,51908.0,51995.0,52082.0,52170.0,52257.0,52344.0,52431.0,52519.0,52606.0,52693.0,52780.0,52868.0,52955.0,53042.0,53129.0,53216.0,53304.0,53391.0,53478.0,53565.0,53653.0,53740.0,53827.0,53914.0,54001.0,54089.0,54176.0,54263.0,54350.0,54438.0,54525.0,54612.0,54699.0,54786.0,54874.0,54961.0,55048.0,55135.0,55223.0,55310.0,55397.0,55484.0,55561.0,55638.0,55715.0,55793.0,55870.0,55947.0,56024.0,56101.0,56178.0,56255.0,56332.0,56409.0,56486.0,56563.0,56640.0,56717.0,56794.0,56872.0,56949.0,57026.0,57103.0,57180.0,57257.0,57334.0,57411.0,57488.0,57565.0,57642.0,57719.0,57796.0,57873.0,57950.0,58028.0,58105.0,58182.0,58259.0,58336.0,58413.0,58490.0,58567.0,58644.0,58721.0,58798.0,58875.0,58952.0,59029.0,59107.0,59184.0,59261.0,59338.0,59415.0,59492.0,59569.0,59646.0,59723.0,59800.0,59877.0,59954.0,60031.0,60108.0,60185.0,60263.0,60340.0,60417.0,60494.0,60571.0,60648.0,60725.0,60802.0,60879.0,60956.0,61033.0,61110.0,61187.0,61264.0,61342.0,61419.0,61496.0,61573.0,61650.0,61727.0,61804.0,61881.0,61958.0,62035.0,62112.0,62189.0,62266.0,62343.0,62421.0,62498.0,62575.0,62652.0,62729.0,62806.0,62883.0,62960.0,63037.0,63114.0,63191.0,63268.0,63345.0,63422.0,63499.0,63577.0,63654.0,63731.0,63808.0,63885.0,63962.0,64039.0,64116.0,64193.0,64270.0,64347.0,64424.0,64501.0,64578.0,64656.0,64733.0,64810.0,64887.0,64964.0,65041.0,65118.0,65195.0,65272.0,65349.0,65426.0,65503.0,65580.0,65657.0,65734.0,65818.0,65906.0,65993.0,66080.0,66167.0,66254.0,66342.0,66429.0,66516.0,66603.0,66691.0,66778.0,66865.0,66952.0,67039.0,67127.0,67214.0,67301.0,67388.0,67476.0,67563.0,67650.0,67737.0,67824.0,67912.0,67999.0,68086.0,68173.0,68261.0,68348.0,68435.0,68522.0,68610.0,68697.0,68784.0,68871.0,68958.0,69046.0,69133.0,69220.0,69307.0,69395.0,69482.0,69569.0,69656.0,69743.0,69831.0,69918.0,70005.0,70092.0,70180.0,70267.0,70354.0,70441.0,70528.0,70616.0,70703.0,70790.0,70877.0,70965.0,71052.0,71139.0,71226.0,71314.0,71401.0,71488.0,71575.0,71662.0,71750.0,71837.0,71924.0,72011.0,72099.0,72186.0,72273.0,72360.0,72447.0,72535.0,72622.0,72709.0,72796.0,72884.0,72971.0,73058.0,73145.0,73232.0,73320.0,73407.0,73494.0,73581.0,73669.0,73756.0,73843.0,73930.0,74017.0,74105.0,74192.0,74279.0,74366.0,74454.0,74541.0,74628.0,74715.0,74802.0,74890.0,74977.0,75064.0,75151.0,75239.0,75326.0,75413.0,75500.0,75588.0,75675.0,75762.0,75849.0,75936.0,76024.0,76111.0,76198.0,76285.0,76373.0,76460.0,76547.0,76634.0,76721.0,76809.0,76896.0,76983.0,77070.0,77158.0,77245.0,77332.0,71951.0,72008.0,72065.0,72122.0,72180.0,72237.0,72294.0,72351.0,72408.0,72466.0,72523.0,72580.0,72637.0,72695.0,72752.0,72809.0,72866.0,72923.0,72981.0,73038.0,73095.0,73152.0,73210.0,73267.0,73324.0,73381.0,73439.0,73496.0,73553.0,73610.0,73667.0,73725.0,73782.0,73839.0,73896.0,73954.0,74011.0,74068.0,74125.0,74182.0,74240.0,74297.0,74354.0,74411.0,74469.0,74526.0,74583.0,74640.0,74697.0,74755.0,74812.0,74869.0,74926.0,74984.0,75041.0,75098.0,75155.0,75212.0,75270.0,75327.0,75384.0,75441.0,75499.0,75556.0,75613.0,75670.0,75728.0,75785.0,75842.0,75899.0,75956.0,76014.0,76071.0,76128.0,76185.0,76243.0,76300.0,76357.0,76414.0,76471.0,76529.0,76586.0,76643.0,76700.0,76758.0,76815.0,76872.0,76929.0,76986.0,77044.0,77101.0,77158.0,77215.0,77273.0,77330.0,77387.0,77444.0,77501.0,77559.0,77616.0,77673.0,77730.0,77788.0,77845.0,77902.0,77959.0,78017.0,78074.0,78131.0,78188.0,78245.0,78303.0,78360.0,78417.0,78474.0,78532.0,78589.0,78646.0,78703.0,78760.0,78818.0,78875.0,78932.0,78989.0,79047.0,79104.0,79161.0,79218.0,79275.0,79333.0,79390.0,79447.0,79504.0,79562.0,79619.0,79676.0,79733.0,79790.0,79848.0,79905.0,79962.0,80019.0,80077.0,80134.0,80191.0,80248.0,80306.0,80363.0,80420.0,80477.0,80534.0,80592.0,80649.0,80706.0,80763.0,80821.0,80878.0,80935.0,80992.0,81049.0,81107.0,81164.0,81221.0,81278.0,81336.0,81393.0,81450.0,81507.0,81581.0,81661.0,81740.0,81820.0,81900.0,81980.0,82059.0,82139.0,82219.0,82298.0,82378.0,82458.0,82538.0,82617.0,82697.0,82777.0,82857.0,82936.0,83016.0,83096.0,83175.0,83255.0,83335.0,83415.0,83494.0,83574.0,83654.0,83734.0,83813.0,83893.0,83973.0,84052.0,84132.0,84212.0,84292.0,84371.0,84451.0,84531.0,84611.0,84690.0,84770.0,84850.0,84929.0,85009.0,85089.0,85169.0,85248.0,85328.0,85408.0,85487.0,85567.0,85647.0,85727.0,85806.0,85886.0,85966.0,86046.0,86125.0,86205.0,86285.0,86364.0,86444.0,86524.0,86604.0,86683.0,86763.0,86843.0,86923.0,87002.0,87082.0,87162.0,87241.0,87321.0,87401.0,87481.0,87560.0,87640.0,87720.0,87800.0,87879.0,87959.0,88039.0,88118.0,88198.0,88278.0,88358.0,88437.0,88517.0,88597.0,88676.0,88756.0,88836.0,88916.0,88995.0,89075.0,89155.0,89235.0,89314.0,89394.0,89474.0,89553.0,89633.0,89713.0,89793.0,89872.0,89952.0,90032.0,90112.0,90191.0,90271.0,90351.0,90430.0,90510.0,90590.0,90670.0,90749.0,90829.0,90909.0,90989.0,91068.0,91148.0,91228.0,91307.0,91387.0,91467.0,91547.0,91626.0,91706.0,91786.0,91865.0,91945.0,92025.0,92105.0,92184.0,92264.0,92344.0,92424.0,92503.0,92583.0,92663.0,92742.0,92822.0,92902.0,92982.0,93061.0,93141.0,93221.0,93301.0,93380.0,93460.0,93540.0,93619.0,93699.0,93779.0,93859.0,93938.0,94018.0,94098.0,94178.0,94257.0,94337.0,94417.0,94496.0,94576.0,94656.0,94736.0],"yaxis":"y","type":"scattergl"},{"hovertemplate":"Scenario=Without universal childcare\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"Without universal childcare","line":{"color":"#808080","dash":"solid"},"marker":{"symbol":"circle"},"mode":"lines","name":"Without universal childcare","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[9510.0,18160.0,18310.0,18460.0,18610.0,18760.0,18910.0,19060.0,19210.0,19360.0,19510.0,19660.0,19810.0,19960.0,20110.0,20260.0,20410.0,20560.0,20710.0,20860.0,21010.0,21160.0,21310.0,21460.0,21610.0,21760.0,21910.0,22060.0,22210.0,22360.0,22510.0,22660.0,22810.0,22960.0,23110.0,23260.0,23410.0,23560.0,23710.0,23860.0,24010.0,24160.0,24310.0,24460.0,24610.0,24760.0,24910.0,25060.0,25210.0,25360.0,25510.0,25660.0,25810.0,25960.0,26110.0,26237.0,26305.0,26372.0,26440.0,26507.0,26575.0,26642.0,26710.0,26777.0,26845.0,26912.0,26980.0,27047.0,34032.0,34100.0,34167.0,34235.0,34302.0,34370.0,34437.0,34505.0,34572.0,34640.0,34707.0,34775.0,34842.0,34910.0,34977.0,35045.0,35108.0,35157.0,35205.0,35254.0,35303.0,35351.0,35400.0,35448.0,35497.0,35546.0,35594.0,35643.0,35691.0,35740.0,35789.0,35837.0,35886.0,35934.0,35983.0,36032.0,36080.0,36129.0,36177.0,36226.0,36275.0,36323.0,36372.0,36420.0,36469.0,36518.0,36566.0,36615.0,36663.0,36712.0,36761.0,36809.0,36858.0,36906.0,36955.0,37004.0,37052.0,37101.0,37149.0,37198.0,37247.0,37295.0,37344.0,37392.0,37441.0,37490.0,37538.0,37587.0,37635.0,37684.0,37733.0,37781.0,37830.0,37878.0,37927.0,37976.0,38024.0,38073.0,38121.0,38170.0,38219.0,38267.0,38316.0,38364.0,38413.0,38462.0,38510.0,38559.0,38607.0,38656.0,38705.0,38753.0,38802.0,38850.0,38899.0,38948.0,38996.0,39045.0,39093.0,39142.0,39191.0,39239.0,39288.0,39336.0,39385.0,39434.0,39482.0,39531.0,39579.0,39628.0,39677.0,39725.0,39774.0,39822.0,39871.0,39920.0,39968.0,40017.0,40065.0,40114.0,40163.0,40211.0,40260.0,40308.0,40357.0,40406.0,40454.0,40503.0,40551.0,40600.0,40649.0,40697.0,40746.0,40794.0,40843.0,40892.0,40940.0,40989.0,41037.0,41086.0,41135.0,41183.0,41232.0,41280.0,41329.0,41378.0,41426.0,41475.0,41523.0,41572.0,41621.0,41669.0,41718.0,41766.0,41815.0,41864.0,41912.0,41961.0,42009.0,42058.0,42107.0,42155.0,42204.0,42252.0,42301.0,42350.0,42398.0,42447.0,42495.0,42544.0,42593.0,42641.0,42690.0,42738.0,42787.0,42836.0,42884.0,42933.0,42981.0,43030.0,43079.0,43127.0,43176.0,43224.0,43273.0,43322.0,43370.0,43419.0,43467.0,43516.0,43565.0,43613.0,43662.0,43710.0,43759.0,43808.0,43856.0,43905.0,43953.0,44002.0,44051.0,44099.0,44148.0,44196.0,44245.0,44294.0,44342.0,44391.0,44439.0,44488.0,44537.0,44585.0,44634.0,44682.0,44731.0,44780.0,44828.0,44877.0,44925.0,44974.0,45023.0,45071.0,45120.0,45168.0,45217.0,45266.0,45314.0,45363.0,45411.0,45460.0,45509.0,45557.0,45606.0,45654.0,45703.0,45752.0,45800.0,45849.0,45897.0,45946.0,45995.0,46043.0,46092.0,46140.0,46189.0,46238.0,46286.0,46335.0,46383.0,46432.0,46481.0,46529.0,46578.0,46626.0,46675.0,46724.0,46772.0,46821.0,46869.0,48948.0,49056.0,49164.0,49272.0,49380.0,49488.0,49596.0,49704.0,49812.0,49902.0,49989.0,50076.0,50164.0,50251.0,50338.0,50425.0,50512.0,50600.0,50687.0,50774.0,50861.0,50949.0,51036.0,51123.0,51210.0,51297.0,51385.0,51472.0,51559.0,51646.0,51734.0,51821.0,51908.0,51995.0,52082.0,52170.0,52257.0,52344.0,52431.0,52519.0,52606.0,52693.0,52780.0,52868.0,52955.0,53042.0,53129.0,53216.0,53304.0,53391.0,53478.0,53565.0,53653.0,53740.0,53827.0,53914.0,54001.0,54089.0,54176.0,54263.0,54350.0,54438.0,54525.0,54612.0,54699.0,54786.0,54874.0,54961.0,55048.0,55135.0,55223.0,55310.0,55397.0,55484.0,55561.0,55638.0,55715.0,55793.0,55870.0,55947.0,56024.0,56101.0,56178.0,56255.0,56332.0,56409.0,56486.0,56563.0,56640.0,56717.0,56794.0,56872.0,56949.0,57026.0,57103.0,57180.0,57257.0,57334.0,57411.0,57488.0,57565.0,57642.0,57719.0,57796.0,57873.0,57950.0,58028.0,58105.0,58182.0,58259.0,58336.0,58413.0,58490.0,58567.0,58644.0,58721.0,58798.0,58875.0,58952.0,59029.0,59107.0,59184.0,59261.0,59338.0,59415.0,59492.0,59569.0,59646.0,59723.0,59800.0,59877.0,59954.0,60031.0,60108.0,60185.0,60263.0,60340.0,60417.0,60494.0,60571.0,60648.0,60725.0,60802.0,60879.0,60956.0,61033.0,61110.0,61187.0,61264.0,61342.0,61419.0,61496.0,61573.0,61650.0,61727.0,61804.0,61881.0,61958.0,62035.0,62112.0,62189.0,62266.0,62343.0,62421.0,62498.0,62575.0,62652.0,62729.0,62806.0,62883.0,62960.0,63037.0,63114.0,63191.0,63268.0,63345.0,63422.0,63499.0,63577.0,63654.0,63731.0,63808.0,63885.0,63962.0,64039.0,64116.0,64193.0,64270.0,64347.0,64424.0,64501.0,64578.0,64656.0,64733.0,64810.0,64887.0,64964.0,65041.0,65118.0,65195.0,65272.0,65349.0,65426.0,65503.0,65580.0,65657.0,65734.0,65818.0,65906.0,65993.0,66080.0,66167.0,66254.0,66342.0,66429.0,66516.0,66603.0,66691.0,66778.0,66865.0,66952.0,67039.0,67127.0,67214.0,67301.0,67388.0,67476.0,67563.0,67650.0,67737.0,67824.0,67912.0,67999.0,68086.0,68173.0,68261.0,68348.0,68435.0,68522.0,68610.0,68697.0,68784.0,68871.0,68958.0,69046.0,69133.0,69220.0,69307.0,69395.0,69482.0,69569.0,69656.0,69743.0,69831.0,69918.0,70005.0,70092.0,70180.0,70267.0,70354.0,70441.0,70528.0,70616.0,70703.0,70790.0,70877.0,70965.0,71052.0,71139.0,71226.0,71314.0,71401.0,71488.0,71575.0,71662.0,71750.0,71837.0,71924.0,72011.0,72099.0,72186.0,72273.0,72360.0,72447.0,72535.0,72622.0,72709.0,72796.0,72884.0,72971.0,73058.0,73145.0,73232.0,73320.0,73407.0,73494.0,73581.0,73669.0,73756.0,73843.0,73930.0,74017.0,74105.0,74192.0,74279.0,74366.0,74454.0,74541.0,74628.0,74715.0,74802.0,74890.0,74977.0,75064.0,75151.0,75239.0,75326.0,75413.0,75500.0,75588.0,75675.0,75762.0,75849.0,75936.0,76024.0,76111.0,76198.0,76285.0,76373.0,76460.0,76547.0,76634.0,76721.0,76809.0,76896.0,76983.0,77070.0,77158.0,77245.0,77332.0,68492.0,68549.0,68607.0,68664.0,68721.0,68778.0,68835.0,68893.0,68950.0,69007.0,69064.0,69122.0,69179.0,69236.0,69293.0,69350.0,69408.0,69465.0,69522.0,69579.0,69637.0,69694.0,69751.0,69808.0,69865.0,69923.0,69980.0,70037.0,70094.0,70152.0,70209.0,70266.0,70323.0,70380.0,70438.0,70495.0,70552.0,70609.0,70667.0,70724.0,70781.0,70838.0,70896.0,70953.0,71010.0,71067.0,71124.0,71182.0,71239.0,71296.0,71353.0,71411.0,71468.0,71525.0,71582.0,71639.0,71697.0,71754.0,71811.0,71868.0,71926.0,71983.0,72040.0,72097.0,72154.0,72212.0,72269.0,72326.0,72383.0,72441.0,72498.0,72555.0,72612.0,72670.0,72727.0,72784.0,72841.0,72898.0,72956.0,73013.0,73070.0,73127.0,73185.0,73242.0,73299.0,73356.0,73413.0,73471.0,73528.0,73585.0,73642.0,73700.0,73757.0,73814.0,73871.0,73928.0,73986.0,74043.0,74100.0,74157.0,74215.0,74272.0,74329.0,74386.0,74443.0,74501.0,74558.0,74615.0,74672.0,74730.0,74787.0,74844.0,74901.0,74958.0,75016.0,75073.0,75130.0,75187.0,75245.0,75302.0,75359.0,75416.0,75474.0,75531.0,75588.0,75645.0,75702.0,75760.0,75817.0,75874.0,75931.0,75989.0,76046.0,76103.0,76160.0,76217.0,76275.0,76332.0,76389.0,76446.0,76504.0,76561.0,76618.0,76675.0,76732.0,76790.0,76847.0,76904.0,76961.0,77019.0,77076.0,77133.0,77190.0,77248.0,77305.0,77362.0,77419.0,77476.0,77534.0,77591.0,77648.0,77705.0,77763.0,77820.0,77877.0,77934.0,77991.0,78049.0,78122.0,78202.0,78282.0,78362.0,78441.0,78521.0,78601.0,78680.0,78760.0,78840.0,78920.0,78999.0,79079.0,79159.0,79239.0,79318.0,79398.0,79478.0,79557.0,79637.0,79717.0,79797.0,79876.0,79956.0,80036.0,80116.0,80195.0,80275.0,80355.0,80434.0,80514.0,80594.0,80674.0,80753.0,80833.0,80913.0,80992.0,81072.0,81152.0,81232.0,81311.0,81391.0,81471.0,81551.0,81630.0,81710.0,81790.0,81869.0,81949.0,82029.0,82109.0,82188.0,82268.0,82348.0,82428.0,82507.0,82587.0,82667.0,82746.0,82826.0,82906.0,82986.0,83065.0,83145.0,83225.0,83304.0,83384.0,83464.0,83544.0,83623.0,83703.0,83783.0,83863.0,83942.0,84022.0,84102.0,84181.0,84261.0,84341.0,84421.0,84500.0,84580.0,84660.0,84740.0,84819.0,84899.0,84979.0,85058.0,85138.0,85218.0,85298.0,85377.0,85457.0,85537.0,85617.0,85696.0,85776.0,85856.0,85935.0,86015.0,86095.0,86175.0,86254.0,86334.0,86414.0,86494.0,86573.0,86653.0,86733.0,86812.0,86892.0,86972.0,87052.0,87131.0,87211.0,87291.0,87370.0,87450.0,87530.0,87610.0,87689.0,87769.0,87849.0,87929.0,88008.0,88088.0,88168.0,88247.0,88327.0,88407.0,88487.0,88566.0,88646.0,88726.0,88806.0,88885.0,88965.0,89045.0,89124.0,89204.0,89284.0,89364.0,89443.0,89523.0,89603.0,89682.0,89762.0,89842.0,89922.0,90001.0,90081.0,90161.0,90241.0,90320.0,90400.0,90480.0,90559.0,90639.0,90719.0,90799.0,90878.0,90958.0,91038.0,91118.0,91197.0,91277.0],"yaxis":"y","type":"scattergl"}],"layout":{"template":{"data":{"barpolar":[{"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"type":"carpet"}],"choropleth":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"choropleth"}],"contourcarpet":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"contourcarpet"}],"contour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"contour"}],"heatmapgl":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmapgl"}],"heatmap":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmap"}],"histogram2dcontour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2dcontour"}],"histogram2d":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2d"}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"mesh3d":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"mesh3d"}],"parcoords":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"parcoords"}],"pie":[{"automargin":true,"type":"pie"}],"scatter3d":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatter3d"}],"scattercarpet":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattercarpet"}],"scattergeo":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergeo"}],"scattergl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergl"}],"scattermapbox":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattermapbox"}],"scatterpolargl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolargl"}],"scatterpolar":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolar"}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"scatterternary":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterternary"}],"surface":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"surface"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}]},"layout":{"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"autotypenumbers":"strict","coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]],"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]},"colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"geo":{"bgcolor":"white","lakecolor":"white","landcolor":"white","showlakes":true,"showland":true,"subunitcolor":"#C8D4E3"},"hoverlabel":{"align":"left"},"hovermode":"closest","mapbox":{"style":"light"},"paper_bgcolor":"white","plot_bgcolor":"white","polar":{"angularaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""},"bgcolor":"white","radialaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""}},"scene":{"xaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"yaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"zaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"ternary":{"aaxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"baxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"bgcolor":"white","caxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""}},"title":{"x":0.05},"xaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2},"yaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Household head employment income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{"text":"Household net income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"legend":{"title":{"text":"Scenario"},"tracegroupgap":0},"margin":{"t":120,"b":120,"l":120,"r":120},"font":{"family":"Roboto Serif","color":"black"},"height":600,"width":800,"plot_bgcolor":"#F4F4F4","paper_bgcolor":"#F4F4F4","images":[{"sizex":0.15,"sizey":0.15,"source":"https:\u002f\u002fraw.githubusercontent.com\u002fPolicyEngine\u002fpolicyengine-app\u002fmaster\u002fsrc\u002fimages\u002flogos\u002fpolicyengine\u002fblue.png","x":1.1,"xanchor":"right","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"annotations":[{"showarrow":false,"text":"Source: PolicyEngine UK microsimulation model","x":0,"xanchor":"left","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"modebar":{"bgcolor":"#F4F4F4","color":"#F4F4F4","activecolor":"#F4F4F4"},"uniformtext":{"mode":"hide","minsize":12},"title":{"text":""}}}
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

#### Gross salary vs take-home pay at the household level

To show the impact of extended childcare entitlement on household finances, we start with an example of a [single-earner household](https://policyengine.org/uk/household?focus=householdOutput.earnings&reform=1&region=uk&timePeriod=2025&baseline=80613&household=53312) with one child aged 3. These households become eligible for extended childcare when earning at least [£9,516 annually](https://www.gov.uk/free-childcare-if-working/check-youre-eligible) for those aged 21 or over. The benefit continues until £100,000, where eligibility ends, creating a decline in take-home pay. This creates a divergence between those receiving and not receiving extended childcare at higher income levels, as shown in the figure below.

```plotly
{"data":[{"hovertemplate":"Scenario=With extended childcare\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"With extended childcare","line":{"color":"#1F77B4","dash":"dash"},"marker":{"symbol":"circle"},"mode":"lines","name":"With extended childcare","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[12969.0,21619.0,21769.0,21919.0,22069.0,22219.0,22369.0,22519.0,22669.0,22819.0,22969.0,23119.0,23269.0,23419.0,23569.0,23719.0,23869.0,24019.0,24169.0,24319.0,24469.0,24619.0,24769.0,24919.0,25069.0,25219.0,25369.0,25519.0,25669.0,25819.0,25969.0,26119.0,26269.0,26419.0,26569.0,26719.0,26869.0,27019.0,27169.0,27319.0,27469.0,27619.0,27769.0,27919.0,28069.0,28219.0,28369.0,28519.0,28669.0,28819.0,28969.0,29119.0,29269.0,29419.0,29569.0,29696.0,29763.0,29831.0,29898.0,29966.0,30033.0,30101.0,30168.0,30236.0,30303.0,30371.0,30438.0,30506.0,34032.0,34100.0,34167.0,34235.0,34302.0,34370.0,34437.0,34505.0,34572.0,34640.0,34707.0,34775.0,34842.0,34910.0,34977.0,35045.0,35108.0,35157.0,35205.0,35254.0,35303.0,35351.0,35400.0,35448.0,35497.0,35546.0,35594.0,35643.0,35691.0,35740.0,35789.0,35837.0,35886.0,35934.0,35983.0,36032.0,36080.0,36129.0,36177.0,36226.0,36275.0,36323.0,36372.0,36420.0,36469.0,36518.0,36566.0,36615.0,36663.0,36712.0,36761.0,36809.0,36858.0,36906.0,36955.0,37004.0,37052.0,37101.0,37149.0,37198.0,37247.0,37295.0,37344.0,37392.0,37441.0,37490.0,37538.0,37587.0,37635.0,37684.0,37733.0,37781.0,37830.0,37878.0,37927.0,37976.0,38024.0,38073.0,38121.0,38170.0,38219.0,38267.0,38316.0,38364.0,38413.0,38462.0,38510.0,38559.0,38607.0,38656.0,38705.0,38753.0,38802.0,38850.0,38899.0,38948.0,38996.0,39045.0,39093.0,39142.0,39191.0,39239.0,39288.0,39336.0,39385.0,39434.0,39482.0,39531.0,39579.0,39628.0,39677.0,39725.0,39774.0,39822.0,39871.0,39920.0,39968.0,40017.0,40065.0,40114.0,40163.0,40211.0,40260.0,40308.0,40357.0,40406.0,40454.0,40503.0,40551.0,40600.0,40649.0,40697.0,40746.0,40794.0,40843.0,40892.0,40940.0,40989.0,41037.0,41086.0,41135.0,41183.0,41232.0,41280.0,41329.0,41378.0,41426.0,41475.0,41523.0,41572.0,41621.0,41669.0,41718.0,41766.0,41815.0,41864.0,41912.0,41961.0,42009.0,42058.0,42107.0,42155.0,42204.0,42252.0,42301.0,42350.0,42398.0,42447.0,42495.0,42544.0,42593.0,42641.0,42690.0,42738.0,42787.0,42836.0,42884.0,42933.0,42981.0,43030.0,43079.0,43127.0,43176.0,43224.0,43273.0,43322.0,43370.0,43419.0,43467.0,43516.0,43565.0,43613.0,43662.0,43710.0,43759.0,43808.0,43856.0,43905.0,43953.0,44002.0,44051.0,44099.0,44148.0,44196.0,44245.0,44294.0,44342.0,44391.0,44439.0,44488.0,44537.0,44585.0,44634.0,44682.0,44731.0,44780.0,44828.0,44877.0,44925.0,44974.0,45023.0,45071.0,45120.0,45168.0,45217.0,45266.0,45314.0,45363.0,45411.0,45460.0,45509.0,45557.0,45606.0,45654.0,45703.0,45752.0,45800.0,45849.0,45897.0,45946.0,45995.0,46043.0,46092.0,46140.0,46189.0,46238.0,46286.0,46335.0,46383.0,46432.0,46481.0,46529.0,46578.0,46626.0,46675.0,46724.0,46772.0,46821.0,46869.0,48948.0,49056.0,49164.0,49272.0,49380.0,49488.0,49596.0,49704.0,49812.0,49902.0,49989.0,50076.0,50164.0,50251.0,50338.0,50425.0,50512.0,50600.0,50687.0,50774.0,50861.0,50949.0,51036.0,51123.0,51210.0,51297.0,51385.0,51472.0,51559.0,51646.0,51734.0,51821.0,51908.0,51995.0,52082.0,52170.0,52257.0,52344.0,52431.0,52519.0,52606.0,52693.0,52780.0,52868.0,52955.0,53042.0,53129.0,53216.0,53304.0,53391.0,53478.0,53565.0,53653.0,53740.0,53827.0,53914.0,54001.0,54089.0,54176.0,54263.0,54350.0,54438.0,54525.0,54612.0,54699.0,54786.0,54874.0,54961.0,55048.0,55135.0,55223.0,55310.0,55397.0,55484.0,55561.0,55638.0,55715.0,55793.0,55870.0,55947.0,56024.0,56101.0,56178.0,56255.0,56332.0,56409.0,56486.0,56563.0,56640.0,56717.0,56794.0,56872.0,56949.0,57026.0,57103.0,57180.0,57257.0,57334.0,57411.0,57488.0,57565.0,57642.0,57719.0,57796.0,57873.0,57950.0,58028.0,58105.0,58182.0,58259.0,58336.0,58413.0,58490.0,58567.0,58644.0,58721.0,58798.0,58875.0,58952.0,59029.0,59107.0,59184.0,59261.0,59338.0,59415.0,59492.0,59569.0,59646.0,59723.0,59800.0,59877.0,59954.0,60031.0,60108.0,60185.0,60263.0,60340.0,60417.0,60494.0,60571.0,60648.0,60725.0,60802.0,60879.0,60956.0,61033.0,61110.0,61187.0,61264.0,61342.0,61419.0,61496.0,61573.0,61650.0,61727.0,61804.0,61881.0,61958.0,62035.0,62112.0,62189.0,62266.0,62343.0,62421.0,62498.0,62575.0,62652.0,62729.0,62806.0,62883.0,62960.0,63037.0,63114.0,63191.0,63268.0,63345.0,63422.0,63499.0,63577.0,63654.0,63731.0,63808.0,63885.0,63962.0,64039.0,64116.0,64193.0,64270.0,64347.0,64424.0,64501.0,64578.0,64656.0,64733.0,64810.0,64887.0,64964.0,65041.0,65118.0,65195.0,65272.0,65349.0,65426.0,65503.0,65580.0,65657.0,65734.0,65818.0,65906.0,65993.0,66080.0,66167.0,66254.0,66342.0,66429.0,66516.0,66603.0,66691.0,66778.0,66865.0,66952.0,67039.0,67127.0,67214.0,67301.0,67388.0,67476.0,67563.0,67650.0,67737.0,67824.0,67912.0,67999.0,68086.0,68173.0,68261.0,68348.0,68435.0,68522.0,68610.0,68697.0,68784.0,68871.0,68958.0,69046.0,69133.0,69220.0,69307.0,69395.0,69482.0,69569.0,69656.0,69743.0,69831.0,69918.0,70005.0,70092.0,70180.0,70267.0,70354.0,70441.0,70528.0,70616.0,70703.0,70790.0,70877.0,70965.0,71052.0,71139.0,71226.0,71314.0,71401.0,71488.0,71575.0,71662.0,71750.0,71837.0,71924.0,72011.0,72099.0,72186.0,72273.0,72360.0,72447.0,72535.0,72622.0,72709.0,72796.0,72884.0,72971.0,73058.0,73145.0,73232.0,73320.0,73407.0,73494.0,73581.0,73669.0,73756.0,73843.0,73930.0,74017.0,74105.0,74192.0,74279.0,74366.0,74454.0,74541.0,74628.0,74715.0,74802.0,74890.0,74977.0,75064.0,75151.0,75239.0,75326.0,75413.0,75500.0,75588.0,75675.0,75762.0,75849.0,75936.0,76024.0,76111.0,76198.0,76285.0,76373.0,76460.0,76547.0,76634.0,76721.0,76809.0,76896.0,76983.0,77070.0,77158.0,77245.0,77332.0,71951.0,72008.0,72065.0,72122.0,72180.0,72237.0,72294.0,72351.0,72408.0,72466.0,72523.0,72580.0,72637.0,72695.0,72752.0,72809.0,72866.0,72923.0,72981.0,73038.0,73095.0,73152.0,73210.0,73267.0,73324.0,73381.0,73439.0,73496.0,73553.0,73610.0,73667.0,73725.0,73782.0,73839.0,73896.0,73954.0,74011.0,74068.0,74125.0,74182.0,74240.0,74297.0,74354.0,74411.0,74469.0,74526.0,74583.0,74640.0,74697.0,74755.0,74812.0,74869.0,74926.0,74984.0,75041.0,75098.0,75155.0,75212.0,75270.0,75327.0,75384.0,75441.0,75499.0,75556.0,75613.0,75670.0,75728.0,75785.0,75842.0,75899.0,75956.0,76014.0,76071.0,76128.0,76185.0,76243.0,76300.0,76357.0,76414.0,76471.0,76529.0,76586.0,76643.0,76700.0,76758.0,76815.0,76872.0,76929.0,76986.0,77044.0,77101.0,77158.0,77215.0,77273.0,77330.0,77387.0,77444.0,77501.0,77559.0,77616.0,77673.0,77730.0,77788.0,77845.0,77902.0,77959.0,78017.0,78074.0,78131.0,78188.0,78245.0,78303.0,78360.0,78417.0,78474.0,78532.0,78589.0,78646.0,78703.0,78760.0,78818.0,78875.0,78932.0,78989.0,79047.0,79104.0,79161.0,79218.0,79275.0,79333.0,79390.0,79447.0,79504.0,79562.0,79619.0,79676.0,79733.0,79790.0,79848.0,79905.0,79962.0,80019.0,80077.0,80134.0,80191.0,80248.0,80306.0,80363.0,80420.0,80477.0,80534.0,80592.0,80649.0,80706.0,80763.0,80821.0,80878.0,80935.0,80992.0,81049.0,81107.0,81164.0,81221.0,81278.0,81336.0,81393.0,81450.0,81507.0,81581.0,81661.0,81740.0,81820.0,81900.0,81980.0,82059.0,82139.0,82219.0,82298.0,82378.0,82458.0,82538.0,82617.0,82697.0,82777.0,82857.0,82936.0,83016.0,83096.0,83175.0,83255.0,83335.0,83415.0,83494.0,83574.0,83654.0,83734.0,83813.0,83893.0,83973.0,84052.0,84132.0,84212.0,84292.0,84371.0,84451.0,84531.0,84611.0,84690.0,84770.0,84850.0,84929.0,85009.0,85089.0,85169.0,85248.0,85328.0,85408.0,85487.0,85567.0,85647.0,85727.0,85806.0,85886.0,85966.0,86046.0,86125.0,86205.0,86285.0,86364.0,86444.0,86524.0,86604.0,86683.0,86763.0,86843.0,86923.0,87002.0,87082.0,87162.0,87241.0,87321.0,87401.0,87481.0,87560.0,87640.0,87720.0,87800.0,87879.0,87959.0,88039.0,88118.0,88198.0,88278.0,88358.0,88437.0,88517.0,88597.0,88676.0,88756.0,88836.0,88916.0,88995.0,89075.0,89155.0,89235.0,89314.0,89394.0,89474.0,89553.0,89633.0,89713.0,89793.0,89872.0,89952.0,90032.0,90112.0,90191.0,90271.0,90351.0,90430.0,90510.0,90590.0,90670.0,90749.0,90829.0,90909.0,90989.0,91068.0,91148.0,91228.0,91307.0,91387.0,91467.0,91547.0,91626.0,91706.0,91786.0,91865.0,91945.0,92025.0,92105.0,92184.0,92264.0,92344.0,92424.0,92503.0,92583.0,92663.0,92742.0,92822.0,92902.0,92982.0,93061.0,93141.0,93221.0,93301.0,93380.0,93460.0,93540.0,93619.0,93699.0,93779.0,93859.0,93938.0,94018.0,94098.0,94178.0,94257.0,94337.0,94417.0,94496.0,94576.0,94656.0,94736.0],"yaxis":"y","type":"scattergl"},{"hovertemplate":"Scenario=Without extended childcare\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"Without extended childcare","line":{"color":"#808080","dash":"solid"},"marker":{"symbol":"circle"},"mode":"lines","name":"Without extended childcare","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[12969.0,21619.0,21769.0,21919.0,22069.0,22219.0,22369.0,22519.0,22669.0,22819.0,22969.0,23119.0,23269.0,23419.0,23569.0,23719.0,23869.0,24019.0,24169.0,24319.0,24469.0,24619.0,24769.0,24919.0,25069.0,25219.0,25369.0,25519.0,25669.0,25819.0,25969.0,26119.0,26269.0,26419.0,26569.0,26719.0,26869.0,27019.0,27169.0,27319.0,27469.0,27619.0,27769.0,27919.0,28069.0,28219.0,28369.0,28519.0,28669.0,28819.0,28969.0,29119.0,29269.0,29419.0,29569.0,29696.0,29763.0,29831.0,29898.0,29966.0,30033.0,30101.0,30168.0,30236.0,30303.0,30371.0,30438.0,30506.0,27115.0,27182.0,27250.0,27317.0,27385.0,27452.0,27520.0,27587.0,27655.0,27722.0,27790.0,27857.0,27925.0,27992.0,28060.0,28127.0,28191.0,28240.0,28288.0,28337.0,28386.0,28434.0,28483.0,28531.0,28580.0,28628.0,28677.0,28726.0,28774.0,28823.0,28872.0,28920.0,28969.0,29017.0,29066.0,29114.0,29163.0,29212.0,29260.0,29309.0,29357.0,29406.0,29455.0,29503.0,29552.0,29600.0,29649.0,29698.0,29746.0,29795.0,29843.0,29892.0,29941.0,29989.0,30038.0,30086.0,30135.0,30184.0,30232.0,30281.0,30329.0,30378.0,30427.0,30475.0,30524.0,30572.0,30621.0,30670.0,30718.0,30767.0,30815.0,30864.0,30913.0,30961.0,31010.0,31058.0,31107.0,31156.0,31204.0,31253.0,31301.0,31350.0,31399.0,31447.0,31496.0,31544.0,31593.0,31642.0,31690.0,31739.0,31787.0,31836.0,31885.0,31933.0,31982.0,32030.0,32079.0,32128.0,32176.0,32225.0,32273.0,32322.0,32371.0,32419.0,32468.0,32516.0,32565.0,32614.0,32662.0,32711.0,32759.0,32808.0,32857.0,32905.0,32954.0,33002.0,33051.0,33100.0,33148.0,33197.0,33246.0,33294.0,33343.0,33391.0,33440.0,33488.0,33537.0,33586.0,33634.0,33683.0,33732.0,33780.0,33829.0,33877.0,33926.0,33974.0,34023.0,34072.0,34120.0,34169.0,34218.0,34266.0,34315.0,34363.0,34412.0,34460.0,34509.0,34558.0,34606.0,34655.0,34704.0,34752.0,34801.0,34849.0,34898.0,34946.0,34995.0,35044.0,35092.0,35141.0,35190.0,35238.0,35287.0,35335.0,35384.0,35432.0,35481.0,35530.0,35578.0,35627.0,35676.0,35724.0,35773.0,35821.0,35870.0,35918.0,35967.0,36016.0,36064.0,36113.0,36162.0,36210.0,36259.0,36307.0,36356.0,36404.0,36453.0,36502.0,36550.0,36599.0,36648.0,36696.0,36745.0,36793.0,36842.0,36890.0,36939.0,36988.0,37036.0,37085.0,37134.0,37182.0,37231.0,37279.0,37328.0,37376.0,37425.0,37474.0,37522.0,37571.0,37620.0,37668.0,37717.0,37765.0,37814.0,37862.0,37911.0,37960.0,38008.0,38057.0,38106.0,38154.0,38203.0,38251.0,38300.0,38348.0,38397.0,38446.0,38494.0,38543.0,38592.0,38640.0,38689.0,38737.0,38786.0,38834.0,38883.0,38932.0,38980.0,39029.0,39078.0,39126.0,39175.0,39223.0,39272.0,39320.0,39369.0,39418.0,39466.0,39515.0,39564.0,39612.0,39661.0,39709.0,39758.0,39806.0,39855.0,39904.0,39952.0,42031.0,42139.0,42247.0,42355.0,42463.0,42571.0,42679.0,42787.0,42895.0,42985.0,43072.0,43159.0,43246.0,43334.0,43421.0,43508.0,43595.0,43682.0,43770.0,43857.0,43944.0,44031.0,44119.0,44206.0,44293.0,44380.0,44467.0,44555.0,44642.0,44729.0,44816.0,44904.0,44991.0,45078.0,45165.0,45253.0,45340.0,45427.0,45514.0,45601.0,45689.0,45776.0,45863.0,45950.0,46038.0,46125.0,46212.0,46299.0,46386.0,46474.0,46561.0,46648.0,46735.0,46823.0,46910.0,46997.0,47084.0,47171.0,47259.0,47346.0,47433.0,47520.0,47608.0,47695.0,47782.0,47869.0,47956.0,48044.0,48131.0,48218.0,48305.0,48393.0,48480.0,48567.0,48644.0,48721.0,48798.0,48875.0,48952.0,49029.0,49107.0,49184.0,49261.0,49338.0,49415.0,49492.0,49569.0,49646.0,49723.0,49800.0,49877.0,49954.0,50031.0,50108.0,50186.0,50263.0,50340.0,50417.0,50494.0,50571.0,50648.0,50725.0,50802.0,50879.0,50956.0,51033.0,51110.0,51187.0,51264.0,51342.0,51419.0,51496.0,51573.0,51650.0,51727.0,51804.0,51881.0,51958.0,52035.0,52112.0,52189.0,52266.0,52343.0,52421.0,52498.0,52575.0,52652.0,52729.0,52806.0,52883.0,52960.0,53037.0,53114.0,53191.0,53268.0,53345.0,53422.0,53500.0,53577.0,53654.0,53731.0,53808.0,53885.0,53962.0,54039.0,54116.0,54193.0,54270.0,54347.0,54424.0,54501.0,54578.0,54656.0,54733.0,54810.0,54887.0,54964.0,55041.0,55118.0,55195.0,55272.0,55349.0,55426.0,55503.0,55580.0,55657.0,55735.0,55812.0,55889.0,55966.0,56043.0,56120.0,56197.0,56274.0,56351.0,56428.0,56505.0,56582.0,56659.0,56736.0,56814.0,56891.0,56968.0,57045.0,57122.0,57199.0,57276.0,57353.0,57430.0,57507.0,57584.0,57661.0,57738.0,57815.0,57892.0,57970.0,58047.0,58124.0,58201.0,58278.0,58355.0,58432.0,58509.0,58586.0,58663.0,58740.0,58817.0,58901.0,58988.0,59076.0,59163.0,59250.0,59337.0,59424.0,59512.0,59599.0,59686.0,59773.0,59861.0,59948.0,60035.0,60122.0,60210.0,60297.0,60384.0,60471.0,60558.0,60646.0,60733.0,60820.0,60907.0,60995.0,61082.0,61169.0,61256.0,61343.0,61431.0,61518.0,61605.0,61692.0,61780.0,61867.0,61954.0,62041.0,62128.0,62216.0,62303.0,62390.0,62477.0,62565.0,62652.0,62739.0,62826.0,62913.0,63001.0,63088.0,63175.0,63262.0,63350.0,63437.0,63524.0,63611.0,63699.0,63786.0,63873.0,63960.0,64047.0,64135.0,64222.0,64309.0,64396.0,64484.0,64571.0,64658.0,64745.0,64832.0,64920.0,65007.0,65094.0,65181.0,65269.0,65356.0,65443.0,65530.0,65617.0,65705.0,65792.0,65879.0,65966.0,66054.0,66141.0,66228.0,66315.0,66402.0,66490.0,66577.0,66664.0,66751.0,66839.0,66926.0,67013.0,67100.0,67188.0,67275.0,67362.0,67449.0,67536.0,67624.0,67711.0,67798.0,67885.0,67973.0,68060.0,68147.0,68234.0,68321.0,68409.0,68496.0,68583.0,68670.0,68758.0,68845.0,68932.0,69019.0,69106.0,69194.0,69281.0,69368.0,69455.0,69543.0,69630.0,69717.0,69804.0,69891.0,69979.0,70066.0,70153.0,70240.0,70328.0,70415.0,71951.0,72008.0,72065.0,72122.0,72180.0,72237.0,72294.0,72351.0,72408.0,72466.0,72523.0,72580.0,72637.0,72695.0,72752.0,72809.0,72866.0,72923.0,72981.0,73038.0,73095.0,73152.0,73210.0,73267.0,73324.0,73381.0,73439.0,73496.0,73553.0,73610.0,73667.0,73725.0,73782.0,73839.0,73896.0,73954.0,74011.0,74068.0,74125.0,74182.0,74240.0,74297.0,74354.0,74411.0,74469.0,74526.0,74583.0,74640.0,74697.0,74755.0,74812.0,74869.0,74926.0,74984.0,75041.0,75098.0,75155.0,75212.0,75270.0,75327.0,75384.0,75441.0,75499.0,75556.0,75613.0,75670.0,75728.0,75785.0,75842.0,75899.0,75956.0,76014.0,76071.0,76128.0,76185.0,76243.0,76300.0,76357.0,76414.0,76471.0,76529.0,76586.0,76643.0,76700.0,76758.0,76815.0,76872.0,76929.0,76986.0,77044.0,77101.0,77158.0,77215.0,77273.0,77330.0,77387.0,77444.0,77501.0,77559.0,77616.0,77673.0,77730.0,77788.0,77845.0,77902.0,77959.0,78017.0,78074.0,78131.0,78188.0,78245.0,78303.0,78360.0,78417.0,78474.0,78532.0,78589.0,78646.0,78703.0,78760.0,78818.0,78875.0,78932.0,78989.0,79047.0,79104.0,79161.0,79218.0,79275.0,79333.0,79390.0,79447.0,79504.0,79562.0,79619.0,79676.0,79733.0,79790.0,79848.0,79905.0,79962.0,80019.0,80077.0,80134.0,80191.0,80248.0,80306.0,80363.0,80420.0,80477.0,80534.0,80592.0,80649.0,80706.0,80763.0,80821.0,80878.0,80935.0,80992.0,81049.0,81107.0,81164.0,81221.0,81278.0,81336.0,81393.0,81450.0,81507.0,81581.0,81661.0,81740.0,81820.0,81900.0,81980.0,82059.0,82139.0,82219.0,82298.0,82378.0,82458.0,82538.0,82617.0,82697.0,82777.0,82857.0,82936.0,83016.0,83096.0,83175.0,83255.0,83335.0,83415.0,83494.0,83574.0,83654.0,83734.0,83813.0,83893.0,83973.0,84052.0,84132.0,84212.0,84292.0,84371.0,84451.0,84531.0,84611.0,84690.0,84770.0,84850.0,84929.0,85009.0,85089.0,85169.0,85248.0,85328.0,85408.0,85487.0,85567.0,85647.0,85727.0,85806.0,85886.0,85966.0,86046.0,86125.0,86205.0,86285.0,86364.0,86444.0,86524.0,86604.0,86683.0,86763.0,86843.0,86923.0,87002.0,87082.0,87162.0,87241.0,87321.0,87401.0,87481.0,87560.0,87640.0,87720.0,87800.0,87879.0,87959.0,88039.0,88118.0,88198.0,88278.0,88358.0,88437.0,88517.0,88597.0,88676.0,88756.0,88836.0,88916.0,88995.0,89075.0,89155.0,89235.0,89314.0,89394.0,89474.0,89553.0,89633.0,89713.0,89793.0,89872.0,89952.0,90032.0,90112.0,90191.0,90271.0,90351.0,90430.0,90510.0,90590.0,90670.0,90749.0,90829.0,90909.0,90989.0,91068.0,91148.0,91228.0,91307.0,91387.0,91467.0,91547.0,91626.0,91706.0,91786.0,91865.0,91945.0,92025.0,92105.0,92184.0,92264.0,92344.0,92424.0,92503.0,92583.0,92663.0,92742.0,92822.0,92902.0,92982.0,93061.0,93141.0,93221.0,93301.0,93380.0,93460.0,93540.0,93619.0,93699.0,93779.0,93859.0,93938.0,94018.0,94098.0,94178.0,94257.0,94337.0,94417.0,94496.0,94576.0,94656.0,94736.0],"yaxis":"y","type":"scattergl"}],"layout":{"template":{"data":{"barpolar":[{"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"type":"carpet"}],"choropleth":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"choropleth"}],"contourcarpet":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"contourcarpet"}],"contour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"contour"}],"heatmapgl":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmapgl"}],"heatmap":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmap"}],"histogram2dcontour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2dcontour"}],"histogram2d":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2d"}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"mesh3d":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"mesh3d"}],"parcoords":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"parcoords"}],"pie":[{"automargin":true,"type":"pie"}],"scatter3d":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatter3d"}],"scattercarpet":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattercarpet"}],"scattergeo":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergeo"}],"scattergl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergl"}],"scattermapbox":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattermapbox"}],"scatterpolargl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolargl"}],"scatterpolar":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolar"}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"scatterternary":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterternary"}],"surface":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"surface"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}]},"layout":{"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"autotypenumbers":"strict","coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]],"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]},"colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"geo":{"bgcolor":"white","lakecolor":"white","landcolor":"white","showlakes":true,"showland":true,"subunitcolor":"#C8D4E3"},"hoverlabel":{"align":"left"},"hovermode":"closest","mapbox":{"style":"light"},"paper_bgcolor":"white","plot_bgcolor":"white","polar":{"angularaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""},"bgcolor":"white","radialaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""}},"scene":{"xaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"yaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"zaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"ternary":{"aaxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"baxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"bgcolor":"white","caxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""}},"title":{"x":0.05},"xaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2},"yaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Household head employment income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{"text":"Household net income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"legend":{"title":{"text":"Scenario"},"tracegroupgap":0},"margin":{"t":120,"b":120,"l":120,"r":120},"font":{"family":"Roboto Serif","color":"black"},"height":600,"width":800,"plot_bgcolor":"#F4F4F4","paper_bgcolor":"#F4F4F4","images":[{"sizex":0.15,"sizey":0.15,"source":"https:\u002f\u002fraw.githubusercontent.com\u002fPolicyEngine\u002fpolicyengine-app\u002fmaster\u002fsrc\u002fimages\u002flogos\u002fpolicyengine\u002fblue.png","x":1.1,"xanchor":"right","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"annotations":[{"showarrow":false,"text":"Source: PolicyEngine UK microsimulation model","x":0,"xanchor":"left","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"modebar":{"bgcolor":"#F4F4F4","color":"#F4F4F4","activecolor":"#F4F4F4"},"uniformtext":{"mode":"hide","minsize":12},"title":{"text":""}}}
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

#### Gross salary vs take-home pay at the household level

To show the impact of targeted childcare entitlement on household finances, we start with an example of a [single-earner household](https://policyengine.org/uk/household?focus=householdOutput.earnings&reform=1&region=uk&timePeriod=2025&baseline=82974&household=53310) with one child aged 2. Figure below shows household net income based on head employment income.

```plotly
{"data":[{"hovertemplate":"Scenario=With targeted childcare\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"With targeted childcare","line":{"color":"#1F77B4","dash":"dash"},"marker":{"symbol":"circle"},"mode":"lines","name":"With targeted childcare","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[14381.0,23031.0,23181.0,23331.0,23481.0,23631.0,23781.0,23931.0,24081.0,24231.0,24381.0,24531.0,24681.0,24831.0,24981.0,25131.0,25281.0,25431.0,25581.0,25731.0,25881.0,26031.0,26181.0,26331.0,26481.0,26631.0,26781.0,26931.0,27081.0,27231.0,27381.0,27531.0,27681.0,27831.0,27981.0,28131.0,28281.0,28431.0,28581.0,28731.0,28881.0,29031.0,29181.0,29331.0,29481.0,29631.0,29781.0,29931.0,30081.0,30231.0,30381.0,30531.0,30681.0,30831.0,30981.0,31108.0,31175.0,31243.0,31310.0,31378.0,31445.0,31513.0,31580.0,31648.0,31715.0,31783.0,31850.0,31918.0,31985.0,32053.0,32120.0,32188.0,32255.0,32323.0,32390.0,32458.0,32525.0,32593.0,32660.0,32728.0,32795.0,32863.0,32930.0,32998.0,33061.0,33110.0,33159.0,33207.0,33256.0,33304.0,33353.0,33402.0,33450.0,33499.0,33547.0,33596.0,33645.0,33693.0,33742.0,33790.0,33839.0,33888.0,33936.0,33985.0,34033.0,34082.0,34131.0,34179.0,34228.0,34276.0,34325.0,34374.0,34422.0,34471.0,34519.0,34568.0,34617.0,34665.0,34714.0,34762.0,34811.0,34860.0,34908.0,34957.0,35005.0,35054.0,35103.0,35151.0,35200.0,35248.0,35297.0,35346.0,35394.0,35443.0,35491.0,35540.0,35589.0,35637.0,35686.0,35734.0,35783.0,35832.0,35880.0,35929.0,35977.0,36026.0,36075.0,36123.0,36172.0,36220.0,36269.0,36318.0,36366.0,36415.0,36463.0,36512.0,36561.0,36609.0,36658.0,36706.0,36755.0,36804.0,36852.0,36901.0,36949.0,36998.0,37047.0,37095.0,37144.0,37192.0,37241.0,37290.0,37338.0,37387.0,37435.0,37484.0,37533.0,37581.0,37630.0,37678.0,37727.0,37776.0,37824.0,37873.0,37921.0,37970.0,38019.0,38067.0,38116.0,38164.0,38213.0,38262.0,38310.0,38359.0,38407.0,38456.0,38505.0,38553.0,38602.0,38650.0,38699.0,38748.0,38796.0,38845.0,38893.0,38942.0,38991.0,39039.0,39088.0,39136.0,39185.0,39234.0,39282.0,39331.0,39379.0,39428.0,39477.0,39525.0,39574.0,39622.0,39671.0,39720.0,39768.0,39817.0,39865.0,39914.0,39963.0,40011.0,40060.0,40108.0,40157.0,40206.0,40254.0,40303.0,40351.0,40400.0,40449.0,40497.0,40546.0,40594.0,40643.0,40692.0,40740.0,40789.0,40837.0,40886.0,40935.0,40983.0,41032.0,41080.0,41129.0,41178.0,41226.0,41275.0,41323.0,41372.0,41421.0,41469.0,41518.0,41566.0,41615.0,41664.0,41712.0,41761.0,41809.0,41858.0,41907.0,41955.0,42004.0,42052.0,42101.0,42150.0,42198.0,42247.0,42295.0,42344.0,42393.0,42441.0,42490.0,42538.0,42587.0,42636.0,42684.0,42733.0,42781.0,42830.0,42879.0,42927.0,42976.0,43024.0,43073.0,43122.0,43170.0,43219.0,43267.0,43316.0,43365.0,43413.0,43462.0,43510.0,43559.0,43608.0,43656.0,43705.0,43753.0,43802.0,43851.0,43899.0,43948.0,43996.0,44045.0,44094.0,44142.0,44191.0,44239.0,44288.0,44337.0,44385.0,44434.0,44482.0,44531.0,44580.0,44628.0,44677.0,44725.0,44774.0,44823.0,46901.0,47009.0,47117.0,47225.0,47333.0,47441.0,47549.0,47657.0,47765.0,47855.0,47942.0,48029.0,48117.0,48204.0,48291.0,48378.0,48466.0,48553.0,48640.0,48727.0,48814.0,48902.0,48989.0,49076.0,49163.0,49251.0,49338.0,49425.0,49512.0,49599.0,49687.0,49774.0,49861.0,49948.0,50036.0,50123.0,50210.0,50297.0,50384.0,50472.0,50559.0,50646.0,50733.0,50821.0,50908.0,50995.0,51082.0,51169.0,51257.0,51344.0,51431.0,51518.0,51606.0,51693.0,51780.0,51867.0,51955.0,52042.0,52129.0,52216.0,52303.0,52391.0,52478.0,52565.0,52652.0,52740.0,52827.0,52914.0,53001.0,53088.0,53176.0,53263.0,53350.0,53437.0,53514.0,53591.0,53669.0,53746.0,53823.0,53900.0,53977.0,54054.0,54131.0,54208.0,54285.0,54362.0,54439.0,54516.0,54593.0,54670.0,54748.0,54825.0,54902.0,54979.0,55056.0,55133.0,55210.0,55287.0,55364.0,55441.0,55518.0,55595.0,55672.0,55749.0,55826.0,55904.0,55981.0,56058.0,56135.0,56212.0,56289.0,56366.0,56443.0,56520.0,56597.0,56674.0,56751.0,56828.0,56905.0,56983.0,57060.0,57137.0,57214.0,57291.0,57368.0,57445.0,57522.0,57599.0,57676.0,57753.0,57830.0,57907.0,57984.0,58062.0,58139.0,58216.0,58293.0,58370.0,58447.0,58524.0,58601.0,58678.0,58755.0,58832.0,58909.0,58986.0,59063.0,59140.0,59218.0,59295.0,59372.0,59449.0,59526.0,59603.0,59680.0,59757.0,59834.0,59911.0,59988.0,60065.0,60142.0,60219.0,60297.0,60374.0,60451.0,60528.0,60605.0,60682.0,60759.0,60836.0,60913.0,60990.0,61067.0,61144.0,61221.0,61298.0,61375.0,61453.0,61530.0,61607.0,61684.0,61761.0,61838.0,61915.0,61992.0,62069.0,62146.0,62223.0,62300.0,62377.0,62454.0,62532.0,62609.0,62686.0,62763.0,62840.0,62917.0,62994.0,63071.0,63148.0,63225.0,63302.0,63379.0,63456.0,63533.0,63610.0,63688.0,63771.0,63859.0,63946.0,64033.0,64120.0,64208.0,64295.0,64382.0,64469.0,64556.0,64644.0,64731.0,64818.0,64905.0,64993.0,65080.0,65167.0,65254.0,65341.0,65429.0,65516.0,65603.0,65690.0,65778.0,65865.0,65952.0,66039.0,66126.0,66214.0,66301.0,66388.0,66475.0,66563.0,66650.0,66737.0,66824.0,66912.0,66999.0,67086.0,67173.0,67260.0,67348.0,67435.0,67522.0,67609.0,67697.0,67784.0,67871.0,67958.0,68045.0,68133.0,68220.0,68307.0,68394.0,68482.0,68569.0,68656.0,68743.0,68830.0,68918.0,69005.0,69092.0,69179.0,69267.0,69354.0,69441.0,69528.0,69615.0,69703.0,69790.0,69877.0,69964.0,70052.0,70139.0,70226.0,70313.0,70401.0,70488.0,70575.0,70662.0,70749.0,70837.0,70924.0,71011.0,71098.0,71186.0,71273.0,71360.0,71447.0,71534.0,71622.0,71709.0,71796.0,71883.0,71971.0,72058.0,72145.0,72232.0,72319.0,72407.0,72494.0,72581.0,72668.0,72756.0,72843.0,72930.0,73017.0,73104.0,73192.0,73279.0,73366.0,73453.0,73541.0,73628.0,73715.0,73802.0,73890.0,73977.0,74064.0,74151.0,74238.0,74326.0,74413.0,74500.0,74587.0,74675.0,74762.0,74849.0,74936.0,75023.0,75111.0,75198.0,75285.0,68492.0,68549.0,68607.0,68664.0,68721.0,68778.0,68835.0,68893.0,68950.0,69007.0,69064.0,69122.0,69179.0,69236.0,69293.0,69350.0,69408.0,69465.0,69522.0,69579.0,69637.0,69694.0,69751.0,69808.0,69865.0,69923.0,69980.0,70037.0,70094.0,70152.0,70209.0,70266.0,70323.0,70380.0,70438.0,70495.0,70552.0,70609.0,70667.0,70724.0,70781.0,70838.0,70896.0,70953.0,71010.0,71067.0,71124.0,71182.0,71239.0,71296.0,71353.0,71411.0,71468.0,71525.0,71582.0,71639.0,71697.0,71754.0,71811.0,71868.0,71926.0,71983.0,72040.0,72097.0,72154.0,72212.0,72269.0,72326.0,72383.0,72441.0,72498.0,72555.0,72612.0,72670.0,72727.0,72784.0,72841.0,72898.0,72956.0,73013.0,73070.0,73127.0,73185.0,73242.0,73299.0,73356.0,73413.0,73471.0,73528.0,73585.0,73642.0,73700.0,73757.0,73814.0,73871.0,73928.0,73986.0,74043.0,74100.0,74157.0,74215.0,74272.0,74329.0,74386.0,74443.0,74501.0,74558.0,74615.0,74672.0,74730.0,74787.0,74844.0,74901.0,74958.0,75016.0,75073.0,75130.0,75187.0,75245.0,75302.0,75359.0,75416.0,75474.0,75531.0,75588.0,75645.0,75702.0,75760.0,75817.0,75874.0,75931.0,75989.0,76046.0,76103.0,76160.0,76217.0,76275.0,76332.0,76389.0,76446.0,76504.0,76561.0,76618.0,76675.0,76732.0,76790.0,76847.0,76904.0,76961.0,77019.0,77076.0,77133.0,77190.0,77248.0,77305.0,77362.0,77419.0,77476.0,77534.0,77591.0,77648.0,77705.0,77763.0,77820.0,77877.0,77934.0,77991.0,78049.0,78122.0,78202.0,78282.0,78362.0,78441.0,78521.0,78601.0,78680.0,78760.0,78840.0,78920.0,78999.0,79079.0,79159.0,79239.0,79318.0,79398.0,79478.0,79557.0,79637.0,79717.0,79797.0,79876.0,79956.0,80036.0,80116.0,80195.0,80275.0,80355.0,80434.0,80514.0,80594.0,80674.0,80753.0,80833.0,80913.0,80992.0,81072.0,81152.0,81232.0,81311.0,81391.0,81471.0,81551.0,81630.0,81710.0,81790.0,81869.0,81949.0,82029.0,82109.0,82188.0,82268.0,82348.0,82428.0,82507.0,82587.0,82667.0,82746.0,82826.0,82906.0,82986.0,83065.0,83145.0,83225.0,83304.0,83384.0,83464.0,83544.0,83623.0,83703.0,83783.0,83863.0,83942.0,84022.0,84102.0,84181.0,84261.0,84341.0,84421.0,84500.0,84580.0,84660.0,84740.0,84819.0,84899.0,84979.0,85058.0,85138.0,85218.0,85298.0,85377.0,85457.0,85537.0,85617.0,85696.0,85776.0,85856.0,85935.0,86015.0,86095.0,86175.0,86254.0,86334.0,86414.0,86494.0,86573.0,86653.0,86733.0,86812.0,86892.0,86972.0,87052.0,87131.0,87211.0,87291.0,87370.0,87450.0,87530.0,87610.0,87689.0,87769.0,87849.0,87929.0,88008.0,88088.0,88168.0,88247.0,88327.0,88407.0,88487.0,88566.0,88646.0,88726.0,88806.0,88885.0,88965.0,89045.0,89124.0,89204.0,89284.0,89364.0,89443.0,89523.0,89603.0,89682.0,89762.0,89842.0,89922.0,90001.0,90081.0,90161.0,90241.0,90320.0,90400.0,90480.0,90559.0,90639.0,90719.0,90799.0,90878.0,90958.0,91038.0,91118.0,91197.0,91277.0],"yaxis":"y","type":"scattergl"},{"hovertemplate":"Scenario=Without targeted childcare\u003cbr\u003eHousehold head employment income=%{x}\u003cbr\u003eHousehold net income=%{y}\u003cextra\u003e\u003c\u002fextra\u003e","legendgroup":"Without targeted childcare","line":{"color":"#808080","dash":"solid"},"marker":{"symbol":"circle"},"mode":"lines","name":"Without targeted childcare","showlegend":true,"x":[0.0,150.0,300.0,450.0,600.0,750.0,900.0,1050.0,1200.0,1350.0,1500.0,1650.0,1800.0,1950.0,2100.0,2250.0,2400.0,2550.0,2700.0,2850.0,3000.0,3150.0,3300.0,3450.0,3600.0,3750.0,3900.0,4050.0,4200.0,4350.0,4500.0,4650.0,4800.0,4950.0,5100.0,5250.0,5400.0,5550.0,5700.0,5850.0,6000.0,6150.0,6300.0,6450.0,6600.0,6750.0,6900.0,7050.0,7200.0,7350.0,7500.0,7650.0,7800.0,7950.0,8100.0,8250.0,8400.0,8550.0,8700.0,8850.0,9000.0,9150.0,9299.9990234375,9450.0,9600.0,9750.0,9900.0,10049.9990234375,10200.0,10350.0,10500.0,10650.0,10799.9990234375,10950.0,11100.0,11250.0,11400.0,11549.9990234375,11700.0,11850.0,12000.0,12150.0,12299.9990234375,12450.0,12600.0,12750.0,12900.0,13049.9990234375,13200.0,13350.0,13500.0,13650.0,13799.9990234375,13950.0,14100.0,14250.0,14400.0009765625,14550.0,14699.9990234375,14850.0009765625,15000.0,15150.0009765625,15300.0,15449.9990234375,15600.0009765625,15750.0,15900.0009765625,16050.0,16200.0009765625,16350.0009765625,16500.0,16650.0,16800.0,16950.001953125,17100.0,17250.0,17400.0,17550.0,17700.001953125,17850.0,18000.0,18150.0,18300.0,18450.001953125,18600.0,18750.0,18900.0,19050.0,19200.001953125,19350.0,19500.0,19650.0,19800.0,19950.001953125,20100.0,20250.0,20400.0,20550.0,20700.001953125,20850.0,21000.0,21150.0,21300.0,21450.001953125,21600.0,21750.0,21900.0,22050.0,22200.001953125,22350.0,22500.0,22650.0,22800.0,22950.001953125,23100.0,23250.0,23400.0,23550.0,23700.001953125,23850.0,24000.0,24150.0,24300.0,24450.001953125,24600.0,24750.0,24900.0,25050.0,25200.001953125,25350.0,25500.0,25650.0,25800.0,25950.001953125,26100.0,26250.0,26400.0,26550.0,26700.001953125,26850.0,27000.0,27150.0,27300.0,27450.001953125,27600.0,27750.0,27900.0,28050.0,28200.001953125,28350.0,28500.0,28650.0,28799.998046875,28950.001953125,29100.0,29250.0,29399.998046875,29549.998046875,29700.001953125,29850.0,30000.0,30149.998046875,30300.001953125,30450.001953125,30600.0,30750.0,30899.998046875,31050.001953125,31200.001953125,31350.0,31500.0,31649.998046875,31800.001953125,31950.001953125,32100.0,32250.0,32399.998046875,32550.001953125,32700.001953125,32850.0,33000.0,33150.0,33300.0,33450.0,33600.0,33750.0,33900.0,34050.0,34200.0,34350.0,34500.0,34650.0,34800.0,34950.0,35100.0,35250.0,35400.0,35550.0,35700.0,35850.0,36000.0,36150.0,36300.0,36450.0,36600.0,36750.0,36900.0,37050.0,37200.0,37350.0,37500.0,37650.0,37800.0,37950.0,38100.0,38250.0,38400.0,38550.0,38700.0,38850.0,39000.0,39150.0,39300.0,39450.0,39600.0,39750.0,39900.0,40050.0,40200.0,40350.0,40500.0,40650.0,40800.0,40950.0,41100.0,41250.0,41400.0,41550.0,41700.0,41850.0,42000.0,42150.0,42300.0,42450.0,42600.0,42750.0,42900.0,43050.0,43200.0,43350.0,43500.0,43650.0,43800.0,43950.0,44100.0,44250.0,44400.0,44550.0,44700.0,44850.0,45000.0,45150.0,45300.0,45450.0,45600.0,45750.0,45900.0,46050.0,46200.0,46350.0,46500.0,46650.0,46800.0,46950.0,47100.0,47250.0,47400.0,47550.0,47700.0,47850.0,48000.0,48150.0,48300.0,48450.0,48600.0,48750.0,48900.0,49050.0,49200.0,49350.0,49500.0,49650.0,49800.0,49950.0,50100.0,50250.0,50400.0,50550.0,50700.0,50850.0,51000.0,51150.0,51300.0,51450.0,51600.0,51750.0,51900.0,52050.0,52200.0,52350.0,52500.0,52650.0,52800.0,52950.0,53100.0,53250.0,53400.0,53550.0,53700.0,53850.0,54000.0,54150.0,54300.0,54450.0,54600.0,54750.0,54900.0,55050.0,55200.0,55350.0,55500.0,55650.0,55800.0,55950.0,56100.0,56250.0,56400.0,56550.0,56700.0,56850.0,57000.0,57150.0,57300.0,57450.0,57599.99609375,57750.0,57899.99609375,58049.99609375,58200.0,58349.99609375,58500.0,58649.99609375,58799.99609375,58949.9921875,59099.99609375,59250.0,59399.99609375,59549.99609375,59699.9921875,59849.99609375,60000.0,60149.99609375,60299.99609375,60449.9921875,60599.99609375,60750.0,60899.99609375,61049.99609375,61199.9921875,61349.99609375,61500.0,61649.99609375,61799.99609375,61949.9921875,62099.99609375,62250.0,62399.99609375,62549.99609375,62699.9921875,62849.99609375,63000.0,63149.99609375,63299.99609375,63449.9921875,63599.99609375,63750.0,63899.99609375,64049.99609375,64199.9921875,64349.99609375,64500.0,64649.99609375,64799.99609375,64949.9921875,65099.99609375,65250.0,65399.99609375,65550.0,65699.9921875,65850.0,66000.0,66149.9921875,66300.0,66449.9921875,66600.0,66750.0,66899.9921875,67050.0,67199.9921875,67350.0,67500.0,67649.9921875,67800.0,67949.9921875,68100.0,68250.0,68399.9921875,68550.0,68699.9921875,68850.0,69000.0,69149.9921875,69300.0,69449.9921875,69600.0,69750.0,69899.9921875,70050.0,70199.9921875,70350.0,70500.0,70649.9921875,70800.0,70949.9921875,71100.0,71250.0,71399.9921875,71550.0,71699.9921875,71850.0,72000.0,72149.9921875,72300.0,72449.9921875,72600.0,72750.0,72899.9921875,73050.0,73199.9921875,73350.0,73500.0,73649.9921875,73800.0,73949.9921875,74100.0,74250.0,74399.9921875,74550.0,74699.9921875,74850.0,75000.0,75149.9921875,75300.0,75449.9921875,75600.0,75750.0,75899.9921875,76050.0,76199.9921875,76350.0,76500.0,76649.9921875,76800.0,76949.9921875,77100.0,77250.0,77399.9921875,77550.0,77699.9921875,77850.0,78000.0,78149.9921875,78300.0,78449.9921875,78600.0,78750.0,78899.9921875,79050.0,79199.9921875,79350.0,79500.0,79649.9921875,79800.0,79949.9921875,80100.0,80250.0,80399.9921875,80550.0,80699.9921875,80850.0,81000.0,81149.9921875,81300.0,81449.9921875,81600.0,81750.0,81899.9921875,82050.0,82199.9921875,82350.0,82500.0,82649.9921875,82800.0,82949.9921875,83100.0,83250.0,83399.9921875,83550.0,83699.9921875,83850.0,84000.0,84149.9921875,84300.0,84449.9921875,84600.0,84750.0,84899.9921875,85050.0,85199.9921875,85350.0,85500.0,85649.9921875,85800.0,85949.9921875,86100.0,86250.0,86399.9921875,86550.0,86699.9921875,86850.0,87000.0,87149.9921875,87300.0,87449.9921875,87600.0,87750.0,87899.9921875,88050.0,88199.9921875,88350.0,88500.0,88649.9921875,88800.0,88949.9921875,89100.0,89250.0,89399.9921875,89550.0,89699.9921875,89850.0,90000.0,90149.9921875,90300.0,90449.9921875,90600.0,90750.0,90899.9921875,91050.0,91199.9921875,91350.0,91500.0,91649.9921875,91800.0,91949.9921875,92100.0,92250.0,92399.9921875,92550.0,92699.9921875,92850.0,93000.0,93149.9921875,93300.0,93449.9921875,93600.0,93750.0,93899.9921875,94050.0,94199.9921875,94350.0,94500.0,94649.9921875,94800.0,94949.9921875,95100.0,95250.0,95399.9921875,95550.0,95699.9921875,95850.0,96000.0,96149.9921875,96300.0,96449.9921875,96600.0,96750.0,96899.9921875,97050.0,97199.9921875,97350.0,97500.0,97649.9921875,97800.0,97949.9921875,98100.0,98250.0,98399.9921875,98550.0,98699.9921875,98850.0,99000.0,99149.9921875,99300.0,99449.9921875,99600.0,99750.0,99899.9921875,100050.0,100199.9921875,100350.0,100500.0,100649.9921875,100800.0,100949.9921875,101100.0,101250.0,101399.9921875,101550.0,101699.9921875,101850.0,102000.0,102149.9921875,102300.0,102449.9921875,102600.0,102750.0,102899.9921875,103050.0,103199.9921875,103350.0,103500.0,103649.9921875,103800.0,103949.9921875,104100.0,104250.0,104399.9921875,104550.0,104699.9921875,104850.0,105000.0,105149.9921875,105300.0,105449.9921875,105600.0,105750.0,105899.9921875,106050.0,106199.9921875,106350.0,106500.0,106649.9921875,106800.0,106949.9921875,107100.0,107250.0,107399.9921875,107550.0,107699.9921875,107850.0,108000.0,108149.9921875,108300.0,108449.9921875,108600.0,108750.0,108899.9921875,109050.0,109199.9921875,109350.0,109500.0,109649.9921875,109800.0,109949.9921875,110100.0,110250.0,110399.9921875,110550.0,110699.9921875,110850.0,111000.0,111149.9921875,111300.0,111449.9921875,111600.0,111750.0,111899.9921875,112050.0,112199.9921875,112350.0,112500.0,112649.9921875,112800.0,112949.9921875,113100.0,113250.0,113399.9921875,113550.0,113699.9921875,113850.0,114000.0,114149.9921875,114300.0,114449.9921875,114600.0,114750.0,114899.9921875,115050.0,115199.9921875,115350.0,115500.0,115650.0,115800.0078125,115949.9921875,116099.9921875,116250.0,116400.0,116549.9921875,116699.9921875,116849.9921875,117000.0,117150.0,117299.9921875,117449.9921875,117599.9921875,117750.0,117900.0,118049.9921875,118199.9921875,118349.9921875,118500.0,118650.0,118799.9921875,118949.9921875,119099.9921875,119250.0,119400.0,119549.9921875,119699.9921875,119849.9921875,120000.0,120150.0,120299.9921875,120449.9921875,120599.9921875,120750.0,120900.0,121049.9921875,121199.9921875,121349.9921875,121500.0,121650.0,121799.9921875,121949.9921875,122099.9921875,122250.0,122400.0,122549.9921875,122699.9921875,122849.9921875,123000.0,123150.0,123299.9921875,123449.9921875,123599.9921875,123750.0,123900.0,124049.9921875,124199.9921875,124349.9921875,124500.0,124650.0,124799.9921875,124949.9921875,125099.9921875,125250.0,125400.0,125549.9921875,125699.9921875,125849.9921875,126000.0,126150.0,126299.9921875,126449.9921875,126599.9921875,126750.0,126900.0,127049.9921875,127199.9921875,127349.9921875,127500.0,127650.0,127799.9921875,127949.9921875,128099.9921875,128250.0,128400.0,128549.9921875,128699.9921875,128849.9921875,129000.0,129150.0,129299.9921875,129449.9921875,129599.9921875,129750.0,129900.0,130049.9921875,130199.9921875,130349.9921875,130500.0,130650.0,130799.9921875,130949.9921875,131100.0,131250.0,131400.0,131549.984375,131700.0,131850.0,132000.0,132150.0,132299.984375,132450.0,132600.0,132750.0,132900.0,133049.984375,133200.0,133350.0,133500.0,133650.0,133799.984375,133950.0,134100.0,134250.0,134400.0,134549.984375,134700.0,134850.0,135000.0,135150.0,135299.984375,135450.0,135600.0,135750.0,135900.0,136049.984375,136200.0,136350.0,136500.0,136650.0,136799.984375,136950.0,137100.0,137250.0,137400.0,137549.984375,137700.0,137850.0,138000.0,138150.0,138299.984375,138450.0,138600.0,138750.0,138900.0,139049.984375,139200.0,139350.0,139500.0,139650.0,139799.984375,139950.0,140100.0,140250.0,140400.0,140549.984375,140700.0,140850.0,141000.0,141150.0,141299.984375,141450.0,141600.0,141750.0,141900.0,142049.984375,142200.0,142350.0,142500.0,142650.0,142799.984375,142950.0,143100.0,143250.0,143400.0,143549.984375,143700.0,143850.0,144000.0,144150.0,144299.984375,144450.0,144600.0,144750.0,144900.0,145049.984375,145200.0,145350.0,145500.0,145650.0,145799.984375,145950.0,146100.0,146250.0,146400.0,146549.984375,146700.0,146850.0,147000.0,147150.0,147299.984375,147450.0,147600.0,147750.0,147900.0,148049.984375,148200.0,148350.0,148500.0,148650.0,148799.984375,148950.0,149100.0,149250.0,149400.0,149549.984375,149700.0,149850.0,150000.0],"xaxis":"x","y":[9510.0,18160.0,18310.0,18460.0,18610.0,18760.0,18910.0,19060.0,19210.0,19360.0,19510.0,19660.0,19810.0,19960.0,20110.0,20260.0,20410.0,20560.0,20710.0,20860.0,21010.0,21160.0,21310.0,21460.0,21610.0,21760.0,21910.0,22060.0,22210.0,22360.0,22510.0,22660.0,22810.0,22960.0,23110.0,23260.0,23410.0,23560.0,23710.0,23860.0,24010.0,24160.0,24310.0,24460.0,24610.0,24760.0,24910.0,25060.0,25210.0,25360.0,25510.0,25660.0,25810.0,25960.0,26110.0,26237.0,26305.0,26372.0,26440.0,26507.0,26575.0,26642.0,26710.0,26777.0,26845.0,26912.0,26980.0,27047.0,31985.0,32053.0,32120.0,32188.0,32255.0,32323.0,32390.0,32458.0,32525.0,32593.0,32660.0,32728.0,32795.0,32863.0,32930.0,32998.0,33061.0,33110.0,33159.0,33207.0,33256.0,33304.0,33353.0,33402.0,33450.0,33499.0,33547.0,33596.0,33645.0,33693.0,33742.0,33790.0,33839.0,33888.0,33936.0,33985.0,34033.0,34082.0,34131.0,34179.0,34228.0,34276.0,34325.0,34374.0,34422.0,34471.0,34519.0,34568.0,34617.0,34665.0,34714.0,34762.0,34811.0,34860.0,34908.0,34957.0,35005.0,35054.0,35103.0,35151.0,35200.0,35248.0,35297.0,35346.0,35394.0,35443.0,35491.0,35540.0,35589.0,35637.0,35686.0,35734.0,35783.0,35832.0,35880.0,35929.0,35977.0,36026.0,36075.0,36123.0,36172.0,36220.0,36269.0,36318.0,36366.0,36415.0,36463.0,36512.0,36561.0,36609.0,36658.0,36706.0,36755.0,36804.0,36852.0,36901.0,36949.0,36998.0,37047.0,37095.0,37144.0,37192.0,37241.0,37290.0,37338.0,37387.0,37435.0,37484.0,37533.0,37581.0,37630.0,37678.0,37727.0,37776.0,37824.0,37873.0,37921.0,37970.0,38019.0,38067.0,38116.0,38164.0,38213.0,38262.0,38310.0,38359.0,38407.0,38456.0,38505.0,38553.0,38602.0,38650.0,38699.0,38748.0,38796.0,38845.0,38893.0,38942.0,38991.0,39039.0,39088.0,39136.0,39185.0,39234.0,39282.0,39331.0,39379.0,39428.0,39477.0,39525.0,39574.0,39622.0,39671.0,39720.0,39768.0,39817.0,39865.0,39914.0,39963.0,40011.0,40060.0,40108.0,40157.0,40206.0,40254.0,40303.0,40351.0,40400.0,40449.0,40497.0,40546.0,40594.0,40643.0,40692.0,40740.0,40789.0,40837.0,40886.0,40935.0,40983.0,41032.0,41080.0,41129.0,41178.0,41226.0,41275.0,41323.0,41372.0,41421.0,41469.0,41518.0,41566.0,41615.0,41664.0,41712.0,41761.0,41809.0,41858.0,41907.0,41955.0,42004.0,42052.0,42101.0,42150.0,42198.0,42247.0,42295.0,42344.0,42393.0,42441.0,42490.0,42538.0,42587.0,42636.0,42684.0,42733.0,42781.0,42830.0,42879.0,42927.0,42976.0,43024.0,43073.0,43122.0,43170.0,43219.0,43267.0,43316.0,43365.0,43413.0,43462.0,43510.0,43559.0,43608.0,43656.0,43705.0,43753.0,43802.0,43851.0,43899.0,43948.0,43996.0,44045.0,44094.0,44142.0,44191.0,44239.0,44288.0,44337.0,44385.0,44434.0,44482.0,44531.0,44580.0,44628.0,44677.0,44725.0,44774.0,44823.0,46901.0,47009.0,47117.0,47225.0,47333.0,47441.0,47549.0,47657.0,47765.0,47855.0,47942.0,48029.0,48117.0,48204.0,48291.0,48378.0,48466.0,48553.0,48640.0,48727.0,48814.0,48902.0,48989.0,49076.0,49163.0,49251.0,49338.0,49425.0,49512.0,49599.0,49687.0,49774.0,49861.0,49948.0,50036.0,50123.0,50210.0,50297.0,50384.0,50472.0,50559.0,50646.0,50733.0,50821.0,50908.0,50995.0,51082.0,51169.0,51257.0,51344.0,51431.0,51518.0,51606.0,51693.0,51780.0,51867.0,51955.0,52042.0,52129.0,52216.0,52303.0,52391.0,52478.0,52565.0,52652.0,52740.0,52827.0,52914.0,53001.0,53088.0,53176.0,53263.0,53350.0,53437.0,53514.0,53591.0,53669.0,53746.0,53823.0,53900.0,53977.0,54054.0,54131.0,54208.0,54285.0,54362.0,54439.0,54516.0,54593.0,54670.0,54748.0,54825.0,54902.0,54979.0,55056.0,55133.0,55210.0,55287.0,55364.0,55441.0,55518.0,55595.0,55672.0,55749.0,55826.0,55904.0,55981.0,56058.0,56135.0,56212.0,56289.0,56366.0,56443.0,56520.0,56597.0,56674.0,56751.0,56828.0,56905.0,56983.0,57060.0,57137.0,57214.0,57291.0,57368.0,57445.0,57522.0,57599.0,57676.0,57753.0,57830.0,57907.0,57984.0,58062.0,58139.0,58216.0,58293.0,58370.0,58447.0,58524.0,58601.0,58678.0,58755.0,58832.0,58909.0,58986.0,59063.0,59140.0,59218.0,59295.0,59372.0,59449.0,59526.0,59603.0,59680.0,59757.0,59834.0,59911.0,59988.0,60065.0,60142.0,60219.0,60297.0,60374.0,60451.0,60528.0,60605.0,60682.0,60759.0,60836.0,60913.0,60990.0,61067.0,61144.0,61221.0,61298.0,61375.0,61453.0,61530.0,61607.0,61684.0,61761.0,61838.0,61915.0,61992.0,62069.0,62146.0,62223.0,62300.0,62377.0,62454.0,62532.0,62609.0,62686.0,62763.0,62840.0,62917.0,62994.0,63071.0,63148.0,63225.0,63302.0,63379.0,63456.0,63533.0,63610.0,63688.0,63771.0,63859.0,63946.0,64033.0,64120.0,64208.0,64295.0,64382.0,64469.0,64556.0,64644.0,64731.0,64818.0,64905.0,64993.0,65080.0,65167.0,65254.0,65341.0,65429.0,65516.0,65603.0,65690.0,65778.0,65865.0,65952.0,66039.0,66126.0,66214.0,66301.0,66388.0,66475.0,66563.0,66650.0,66737.0,66824.0,66912.0,66999.0,67086.0,67173.0,67260.0,67348.0,67435.0,67522.0,67609.0,67697.0,67784.0,67871.0,67958.0,68045.0,68133.0,68220.0,68307.0,68394.0,68482.0,68569.0,68656.0,68743.0,68830.0,68918.0,69005.0,69092.0,69179.0,69267.0,69354.0,69441.0,69528.0,69615.0,69703.0,69790.0,69877.0,69964.0,70052.0,70139.0,70226.0,70313.0,70401.0,70488.0,70575.0,70662.0,70749.0,70837.0,70924.0,71011.0,71098.0,71186.0,71273.0,71360.0,71447.0,71534.0,71622.0,71709.0,71796.0,71883.0,71971.0,72058.0,72145.0,72232.0,72319.0,72407.0,72494.0,72581.0,72668.0,72756.0,72843.0,72930.0,73017.0,73104.0,73192.0,73279.0,73366.0,73453.0,73541.0,73628.0,73715.0,73802.0,73890.0,73977.0,74064.0,74151.0,74238.0,74326.0,74413.0,74500.0,74587.0,74675.0,74762.0,74849.0,74936.0,75023.0,75111.0,75198.0,75285.0,68492.0,68549.0,68607.0,68664.0,68721.0,68778.0,68835.0,68893.0,68950.0,69007.0,69064.0,69122.0,69179.0,69236.0,69293.0,69350.0,69408.0,69465.0,69522.0,69579.0,69637.0,69694.0,69751.0,69808.0,69865.0,69923.0,69980.0,70037.0,70094.0,70152.0,70209.0,70266.0,70323.0,70380.0,70438.0,70495.0,70552.0,70609.0,70667.0,70724.0,70781.0,70838.0,70896.0,70953.0,71010.0,71067.0,71124.0,71182.0,71239.0,71296.0,71353.0,71411.0,71468.0,71525.0,71582.0,71639.0,71697.0,71754.0,71811.0,71868.0,71926.0,71983.0,72040.0,72097.0,72154.0,72212.0,72269.0,72326.0,72383.0,72441.0,72498.0,72555.0,72612.0,72670.0,72727.0,72784.0,72841.0,72898.0,72956.0,73013.0,73070.0,73127.0,73185.0,73242.0,73299.0,73356.0,73413.0,73471.0,73528.0,73585.0,73642.0,73700.0,73757.0,73814.0,73871.0,73928.0,73986.0,74043.0,74100.0,74157.0,74215.0,74272.0,74329.0,74386.0,74443.0,74501.0,74558.0,74615.0,74672.0,74730.0,74787.0,74844.0,74901.0,74958.0,75016.0,75073.0,75130.0,75187.0,75245.0,75302.0,75359.0,75416.0,75474.0,75531.0,75588.0,75645.0,75702.0,75760.0,75817.0,75874.0,75931.0,75989.0,76046.0,76103.0,76160.0,76217.0,76275.0,76332.0,76389.0,76446.0,76504.0,76561.0,76618.0,76675.0,76732.0,76790.0,76847.0,76904.0,76961.0,77019.0,77076.0,77133.0,77190.0,77248.0,77305.0,77362.0,77419.0,77476.0,77534.0,77591.0,77648.0,77705.0,77763.0,77820.0,77877.0,77934.0,77991.0,78049.0,78122.0,78202.0,78282.0,78362.0,78441.0,78521.0,78601.0,78680.0,78760.0,78840.0,78920.0,78999.0,79079.0,79159.0,79239.0,79318.0,79398.0,79478.0,79557.0,79637.0,79717.0,79797.0,79876.0,79956.0,80036.0,80116.0,80195.0,80275.0,80355.0,80434.0,80514.0,80594.0,80674.0,80753.0,80833.0,80913.0,80992.0,81072.0,81152.0,81232.0,81311.0,81391.0,81471.0,81551.0,81630.0,81710.0,81790.0,81869.0,81949.0,82029.0,82109.0,82188.0,82268.0,82348.0,82428.0,82507.0,82587.0,82667.0,82746.0,82826.0,82906.0,82986.0,83065.0,83145.0,83225.0,83304.0,83384.0,83464.0,83544.0,83623.0,83703.0,83783.0,83863.0,83942.0,84022.0,84102.0,84181.0,84261.0,84341.0,84421.0,84500.0,84580.0,84660.0,84740.0,84819.0,84899.0,84979.0,85058.0,85138.0,85218.0,85298.0,85377.0,85457.0,85537.0,85617.0,85696.0,85776.0,85856.0,85935.0,86015.0,86095.0,86175.0,86254.0,86334.0,86414.0,86494.0,86573.0,86653.0,86733.0,86812.0,86892.0,86972.0,87052.0,87131.0,87211.0,87291.0,87370.0,87450.0,87530.0,87610.0,87689.0,87769.0,87849.0,87929.0,88008.0,88088.0,88168.0,88247.0,88327.0,88407.0,88487.0,88566.0,88646.0,88726.0,88806.0,88885.0,88965.0,89045.0,89124.0,89204.0,89284.0,89364.0,89443.0,89523.0,89603.0,89682.0,89762.0,89842.0,89922.0,90001.0,90081.0,90161.0,90241.0,90320.0,90400.0,90480.0,90559.0,90639.0,90719.0,90799.0,90878.0,90958.0,91038.0,91118.0,91197.0,91277.0],"yaxis":"y","type":"scattergl"}],"layout":{"template":{"data":{"barpolar":[{"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"type":"carpet"}],"choropleth":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"choropleth"}],"contourcarpet":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"contourcarpet"}],"contour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"contour"}],"heatmapgl":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmapgl"}],"heatmap":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"heatmap"}],"histogram2dcontour":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2dcontour"}],"histogram2d":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"histogram2d"}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"mesh3d":[{"colorbar":{"outlinewidth":0,"ticks":""},"type":"mesh3d"}],"parcoords":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"parcoords"}],"pie":[{"automargin":true,"type":"pie"}],"scatter3d":[{"line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatter3d"}],"scattercarpet":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattercarpet"}],"scattergeo":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergeo"}],"scattergl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattergl"}],"scattermapbox":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scattermapbox"}],"scatterpolargl":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolargl"}],"scatterpolar":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterpolar"}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"scatterternary":[{"marker":{"colorbar":{"outlinewidth":0,"ticks":""}},"type":"scatterternary"}],"surface":[{"colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"type":"surface"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}]},"layout":{"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"autotypenumbers":"strict","coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]],"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]},"colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"geo":{"bgcolor":"white","lakecolor":"white","landcolor":"white","showlakes":true,"showland":true,"subunitcolor":"#C8D4E3"},"hoverlabel":{"align":"left"},"hovermode":"closest","mapbox":{"style":"light"},"paper_bgcolor":"white","plot_bgcolor":"white","polar":{"angularaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""},"bgcolor":"white","radialaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""}},"scene":{"xaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"yaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"},"zaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","gridwidth":2,"linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8"}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"ternary":{"aaxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"baxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"bgcolor":"white","caxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""}},"title":{"x":0.05},"xaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2},"yaxis":{"automargin":true,"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","zerolinewidth":2}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Household head employment income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{"text":"Household net income"},"gridcolor":"lightgray","zerolinecolor":"#F4F4F4","ticksuffix":"","tickprefix":"\u00a3","tickformat":",","showgrid":true},"legend":{"title":{"text":"Scenario"},"tracegroupgap":0},"margin":{"t":120,"b":120,"l":120,"r":120},"font":{"family":"Roboto Serif","color":"black"},"height":600,"width":800,"plot_bgcolor":"#F4F4F4","paper_bgcolor":"#F4F4F4","images":[{"sizex":0.15,"sizey":0.15,"source":"https:\u002f\u002fraw.githubusercontent.com\u002fPolicyEngine\u002fpolicyengine-app\u002fmaster\u002fsrc\u002fimages\u002flogos\u002fpolicyengine\u002fblue.png","x":1.1,"xanchor":"right","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"annotations":[{"showarrow":false,"text":"Source: PolicyEngine UK microsimulation model","x":0,"xanchor":"left","xref":"paper","y":-0.2,"yanchor":"bottom","yref":"paper"}],"modebar":{"bgcolor":"#F4F4F4","color":"#F4F4F4","activecolor":"#F4F4F4"},"uniformtext":{"mode":"hide","minsize":12},"title":{"text":""}}}
```

### Care to Learn

The [Care to Learn](<(https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/dfe/study_childcare_entitlement/study_childcare_entitlement.py)>), offers funding for young parents in education for childcare costs. We calculate Care to Learn using the following methodology:

1. Identifying eligible young parents (under 20 years old)
2. Verifying they are in non-tertiary education (not university or higher education)
3. Checking if they live in England and are not apprentices
4. Calculating the monetary value based on regional rates (London vs outside London)

For 2025, the scheme offers weekly payments of up to £195 per week for those living in London and £180 per week for those living outside London. The scheme multiplies this weekly amount by the number of weeks in a year to determine the annual value, making it worth up to £10,140 per year for London residents and £9,360 per year for those outside London.

[Eligibility](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/dfe/care_to_learn) is that the claimant is a parent under 20 years old, living in England, has children, is in eligible education (not higher education), and is not an apprentice.

Due to the absence of relevant cases in the Family Resources Survey, we are unable to estimate the economic impact of this programme. Nevertheless, the programme is implemented and can be used to calculate benefits in the household section of PolicyEngine UK.

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
