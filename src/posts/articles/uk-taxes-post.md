## Introduction

This post provides an overview of how taxes are modelled in PolicyEngine UK. It details both existing taxes in the UK tax system and proposed/contributed taxes that are simulated within our platform. Each tax component is linked to its specific implementation in the codebase, making this document a technical reference for understanding how tax calculations are performed in the PolicyEngine UK microsimulation model.

The post is organised into three main sections. First, we explain direct taxes (income tax, national insurance, and capital gains tax), which are collected directly from individuals and businesses. Next, we cover indirect taxes (VAT and fuel duty) which are embedded in the prices of goods and services. Finally, we explore both existing property and land taxes (including stamp duty variations across UK nations, business rates, and council tax) and contributed/proposed taxes (such as carbon tax, wealth tax, land value tax, and others) that are modelled in PolicyEngine but not currently implemented in the UK.

The table below summarises key metrics for each tax in the UK system, comparing PolicyEngine's revenue estimates with official OBR forecasts, and showing the percentage of the population affected by each tax. In the following sections, we dive deeper into each of these taxes, examining their structure, implementation, and distributional impact across income groups.

| Program | PolicyEngine revenue estimate £billion (2025) | OBR revenue estimate (2025-26) | PolicyEngine affected population estimate % (2025)
|--------|-------------------------------------|-------------------------------|-------------------------------|
| Income tax | [307.5](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79847) | [328.7](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/income-tax/) | 80.2 |
| National Insurance | [148.1](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=70645&region=uk&timePeriod=2025&baseline=79825) | [198.8](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/national-insurance-contributions-nics/) | 67.5 |
| Capital gains tax | [17.3](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79852)  | [16.2](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/capital-gains-tax/) | 3.5 |
| VAT | [198.6](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79853)  | [182.1](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/vat/) | 99.5 |
| Fuel duty | [28.3](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79854) | [27.3](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/fuel-duties/)  | 36.1 |
| Stamp duty land tax | [11.4](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79870)  | [15.1](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/property-transaction-taxes/) (all property transaction taxes) | 38.8 |
| Land and buildings transaction tax | [0.7](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80006) | Included in above | 3.3 |
| Land transaction tax | [0.4](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80023) | Included in above | 2.4 |
| Business rates | [31.7](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80029) | [27.8](https://www.gov.uk/government/statistics/national-non-domestic-rates-collected-by-councils-in-england-forecast-2025-to-2026/national-non-domestic-rates-collected-by-councils-in-england-forecast-for-2025-to-2026#:~:text=Local%20authorities%20estimate%20the%20non,scheme%20are%20taken%20into%20consideration.) (England only) | 55.9 |

## Direct taxes

Direct taxes are collected from individuals and businesses based on income, profits or gains. The three main direct taxes in the UK system—income tax, National Insurance, and capital gains tax—work together to tax different forms of income and wealth accrual. Our projections in this section are underpinned by data from the UK's Family Resources Survey (FRS) and the Survey of Personal Incomes (SPI), with validation against official HMRC statistics. In this post, all estimates provided are static estimates. PolicyEngine models behavioral responses to policy changes as well.

### Income tax

HMRC administers this tax using a band system with different rates for certain income types, implemented in PolicyEngine via the [`income_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/income_tax.py) variable.

- **Standard income tax components**
  These are the main rate bands that determine tax payments on different portions of income. The UK uses a system where portions of income are taxed at different rates.

  - **Basic rate**: Applied to taxable income between the personal allowance and higher rate threshold at a rate of 20% for 2025, calculated in PolicyEngine as [`basic_rate_earned_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_liability/basic_rate_earned_income_tax.py).
  - **Higher rate**: Applied to taxable income between the higher rate threshold (£37,700 above personal allowance in 2025) and additional rate threshold at a rate of 40% for 2025, calculated in PolicyEngine as [`higher_rate_earned_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_liability/higher_rate_earned_income_tax.py).
  - **Additional rate**: Applied to taxable income over the additional rate threshold (£125,140 in 2025) at a rate of 45% for 2025, calculated in PolicyEngine as [`add_rate_earned_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_liability/add_rate_earned_income_tax.py).

- **Income tax bases**
  These represent the different sources of income subject to income tax in the UK. Each type has specific rules about deductions, allowances and sometimes different tax rates.

  - **Employment income**: Income from employment, including salaries, wages, bonuses and employment benefits. This income type is taxed through the PAYE system and represented by the [`taxable_employment_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_employment_income.py) variable.
  - **Self-employment income**: Income from self-employment, freelance work or running a business as a sole trader. Self-employed individuals pay income tax on profits after business expenses, calculated as [`taxable_self_employment_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_self_employment_income.py).
  - **Pension income**: Income from state pensions, workplace pensions and private pensions, calculated as [`taxable_pension_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_pension_income.py) in PolicyEngine.
  - **Property income**: Income from renting out property, after deducting allowable expenses. This includes rental from UK and overseas properties owned by UK residents, calculated as [`taxable_property_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_property_income.py).
  - **Dividend income**: Income from company dividends, taxed at lower rates than other income (8.75% basic rate, 33.75% higher rate, and 39.35% additional rate for 2025). A dividend allowance of £500 for 2025 applies before dividend tax rates, with taxable amounts calculated as [`taxable_dividend_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_dividend_income.py).
  - **Savings interest income**: Interest earned on savings accounts, bonds and other interest-bearing investments. The personal savings allowance permits taxpayers to earn some interest tax-free, with eligible starter rate income calculated as [`savings_starter_rate_income`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_savings_income/savings_starter_rate_income.py).
  - **Miscellaneous income**: Other taxable income including royalties, trust income and casual earnings, calculated as [`taxable_miscellaneous_income`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_miscellaneous_income.py).
  - **Social security income**: Some state benefits are taxable, such as jobseeker's allowance and carer's allowance. Many benefits are non-taxable, including universal credit and personal independence payment. PolicyEngine calculates this as [`taxable_social_security_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_social_security_income.py).

- **Allowances and reliefs**
  These are amounts that can be earned tax-free or deductions that reduce taxable income, defined by various parameters and calculated as part of [`allowances`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/allowances).

  - **Personal allowance**: The amount of income that can be earned before paying income tax, set at £12,570 in 2025. This is reduced when income exceeds a threshold, disappearing completely at higher incomes, set in [`allowances`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/allowances) and used in calculating each person's overall [`allowances`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/allowances/allowances.py).
  - **Marriage allowance**: Allows a spouse or civil partner to transfer a percentage of their personal allowance. Only available when the higher earner is a basic rate taxpayer and the lower earner has unused allowance, calculated as [`marriage_allowance`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/allowances/marriage_allowance.py).
  - **Dividend allowance**: Tax-free allowance for dividend income set at £500 in 2025, defined by the `dividend_allowance` parameter in [`dividend_allowance.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/income_tax/allowances/dividend_allowance.yaml).
  - **Trading allowance**: A tax-free allowance set at £1,000 for 2025 for self-employed individuals with small amounts of trading income. Claiming this prevents deduction of business expenses from income, set through the `trading_allowance` parameter in [`trading_allowance.yaml`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/income_tax/allowances).
  - **Property allowance**: A tax-free allowance set at £1,000 for 2025 for individuals with small amounts of property income, determined by the `property_allowance` parameter in [`property_allowance.yaml`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/income_tax/allowances).
  - **Tax-free savings income**: The personal savings allowance permits taxpayers to earn some interest tax-free. For 2025, the allowance is £1,000 for basic rate taxpayers, £500 for higher rate taxpayers, and £0 for additional rate taxpayers. This is calculated in the savings income bracketization process in [`bracketized_savings_income`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_savings_income/) with specific rates applied to [`savings_starter_rate_income`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_savings_income/savings_starter_rate_income.py).
  - **Loss relief**: Allows business or property losses to be offset against other income to reduce tax, calculated as [`loss_relief`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/reliefs/loss_relief.py).
  - **Capital allowances**: Tax relief for businesses on the cost of purchasing assets used in the business. These allow businesses to deduct the cost of machinery, equipment and vehicles from taxable profits, calculated as [`capital_allowances`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/reliefs/capital_allowances.py).

- **Income tax charges**
  These are tax charges that withdraw benefits or allowances in specific circumstances, implemented in [`variables/gov/hmrc/income_tax/charges`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/charges/).

  - **Child benefit high income tax charge (HITC)**: A tax charge on high earners who or whose partner receives child benefit. Child benefit rates in 2025 are £26.04 per week for the eldest child and £17.24 per week for each additional child. The HITC withdraws this benefit when income exceeds a threshold, with full withdrawal at a higher threshold, calculated as [`child_benefit_hitc`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/charges/child_benefit_hitc.py).

PolicyEngine estimates that abolishing income tax would raise government revenue by [£307.5 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79847) in 2025. The Office for Budget Responsibility (OBR) estimates that income tax revenue for 2025-26 is [£328.7 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/income-tax/). The following figure shows the distributional impact of this reform.

```plotly
{
  "data": [
    {
      "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "y": [-2.4, -5.1, -5.4, -8.1, -8.2, -12.3, -12.5, -16.6, -18.3, -28.2],
      "type": "bar",
      "marker": {
        "color": "#616161"
      },
      "name": "Change in household income (%)",
      "text": ["-2.4%", "-5.1%", "-5.4%", "-8.1%", "-8.2%", "-12.3%", "-12.5%", "-16.6%", "-18.3%", "-28.2%"],
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
      "text": "Distributional impact of income tax by income decile",
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
      "range": [-30, 0],
      "dtick": 5,
      "tickvals": [0, -5, -10, -15, -20, -25, -30],
      "ticktext": ["0.0%", "-5.0%", "-10.0%", "-15.0%", "-20.0%", "-25.0%", "-30.0%"],
      "gridwidth": 1,
      "gridcolor": "#e0e0e0"
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
    "plot_bgcolor": "white",
    "paper_bgcolor": "white"
  }
}
```

### National Insurance

National Insurance operates alongside income tax and funds state benefits and the NHS.
National Insurance consists of contributions paid by employees, employers and the self-employed, with overall liability calculated as [`national_insurance`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/national_insurance.py).

- **Class 1** (Employees and employers)
  These are contributions paid on employee earnings above the primary threshold.

  - **Primary contributions (employees)**: Paid by employees at 8% on earnings between the primary threshold (£241.73 per week in 2025) and upper earnings limit, with a lower rate above the upper limit. This is deducted via the PAYE system alongside income tax, calculated as [`ni_class_1_employee_primary`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_1/ni_class_1_employee_primary.py).
  - **Secondary contributions (employers)**: Paid by employers at a flat rate on employee earnings above the secondary threshold. This represents a cost for employers and affects employment costs, calculated as [`ni_class_1_employer`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_1/ni_class_1_employer.py).
  - **Additional rate contributions**: A rate of National Insurance applied to high earners. This ensures contributions continue on higher incomes, calculated as [`ni_class_1_employee_additional`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_1/ni_class_1_employee_additional.py).

- **Class 2** (Self-employed - flat rate)
  A flat weekly rate paid by self-employed people with profits above the small profits threshold, calculated as [`ni_class_2`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_2/ni_class_2.py).
- **Class 3** (Voluntary contributions)
  Optional contributions people can make to fill gaps in their National Insurance record, calculated as [`ni_class_3`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_3/ni_class_3.py).
- **Class 4** (Self-employed - percentage-based)
  Percentage-based contributions paid by self-employed people on their profits. They function similar to income tax with different rates applied to different profit levels, calculated as [`ni_class_4`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_4/ni_class_4.py).

  - **Main rate**: Paid on self-employed profits between the lower profits limit and upper profits limit, calculated as [`ni_class_4_main`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_4/ni_class_4_main.py).
  - **Additional rate**: Paid on self-employed profits above the upper profits limit, calculated as [`ni_class_4_maximum`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_4/ni_class_4_maximum.py).

PolicyEngine estimates that abolishing National Insurance would raise government revenue by [£148.1 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79825) in 2025. The Office for Budget Responsibility (OBR) estimates that National Insurance contributions for 2025-26 are [£198.8 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/national-insurance-contributions-nics/). The following figure shows the distributional impact of this reform.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [-0.5, -0.8, -2.0, -4.5, -5.0, -8.6, -9.2, -10.9, -12.1, -9.3],
     "type": "bar",
     "marker": {
       "color": "#616161"
     },
     "name": "Change in household income (%)",
     "text": ["-0.5%", "-0.8%", "-2.0%", "-4.5%", "-5.0%", "-8.6%", "-9.2%", "-10.9%", "-12.1%", "-9.3%"],
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
     "text": "Distributional impact of National Insurance by income decile",
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
     "range": [-14, 0],
     "tickvals": [0, -2, -4, -6, -8, -10, -12, -14],
     "ticktext": ["0.0%", "-2.0%", "-4.0%", "-6.0%", "-8.0%", "-10.0%", "-12.0%", "-14.0%"],
     "gridwidth": 1,
     "gridcolor": "#e0e0e0"
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
   "plot_bgcolor": "white",
   "paper_bgcolor": "white"
 }
}
```

### Capital gains tax

Capital gains tax applies to profits from asset sales, unlike income tax and National Insurance which apply to earnings.
Capital gains tax is charged on the profit when selling or disposing of an asset that has increased in value. It applies to most assets including investments, second properties and business assets, but not main residences, calculated as [`capital_gains_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/capital_gains_tax/capital_gains_tax.py).

- **Basic rate (10%)**: Applied to gains for basic rate taxpayers on most assets (18% on residential property for 2025). The applicable rate depends on the taxpayer's income tax band and the asset type, defined by the [`basic_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/cgt/basic_rate.yaml) parameter.
- **Higher rate (20%)**: Applied to gains for higher and additional rate taxpayers (28% on residential property for 2025), defined by the [`higher_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/cgt/higher_rate.yaml) parameter.
- **Annual exempt amount**: A tax-free allowance for capital gains set at £3,000 in 2025, defined by the [`annual_exempt_amount`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/cgt/annual_exempt_amount.yaml) parameter.

PolicyEngine estimates that abolishing capital gains tax would raise government revenue by [£17.3 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79852) in 2025. The Office for Budget Responsibility (OBR) estimates that capital gains tax revenue for 2025-26 is [£16.2 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/capital-gains-tax/). The following figure shows the distributional impact of this reform.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [-0.0, -0.0, -0.0, -0.0, -0.0, -0.1, -0.1, -0.1, -0.2, -4.2],
     "type": "bar",
     "marker": {
       "color": "#616161"
     },
     "name": "Change in household income (%)",
     "text": ["-0.0%", "-0.0%", "-0.0%", "-0.0%", "-0.0%", "-0.1%", "-0.1%", "-0.1%", "-0.2%", "-4.2%"],
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
     "text": "Distributional impact of capital gains tax by income decile",
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
     "range": [-4.5, 0],
     "tickvals": [0, -0.5, -1.0, -1.5, -2.0, -2.5, -3.0, -3.5, -4.0, -4.5],
     "ticktext": ["0.0%", "-0.5%", "-1.0%", "-1.5%", "-2.0%", "-2.5%", "-3.0%", "-3.5%", "-4.0%", "-4.5%"],
     "gridwidth": 1,
     "gridcolor": "#e0e0e0"
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
   "plot_bgcolor": "white",
   "paper_bgcolor": "white"
 }
}
```

### Council tax/domestic rates

Residential properties are subject to council tax, except in Northern Ireland which uses domestic rates.
Council tax is a local tax on domestic properties in England, Scotland and Wales, funding local services. In PolicyEngine, we apply the reported amounts from the Family Resources Survey data. Northern Ireland uses a rates system based on rental values rather than the banded approach of council tax, calculated as [`domestic_rates`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/local_authorities/domestic_rates.py).

## Indirect taxes

Indirect taxes are collected by intermediaries and passed to the government. They form part of the price of goods and services that consumers pay. Our indirect tax simulations rely on consumption data imputed to the Family Resources Survey dataset, calibrated to match aggregate statistics from HMRC and other government sources. In this post, all estimates provided are static estimates.

### Value added tax (VAT)

VAT generates revenue for the UK government.
VAT is a consumption tax placed on products and services at each stage where value is added, calculated in PolicyEngine as [`vat`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/vat.py).

- **Standard rate (20%)**: Applied to most goods and services in the UK in 2025, defined by the [`standard_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/vat/standard_rate.yaml) parameter.
- **Reduced rate (5%)**: Applied to certain goods and services including domestic fuel and children's car seats in 2025, defined by the [`reduced_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/vat/reduced_rate.yaml) parameter.

PolicyEngine estimates that abolishing value added tax (VAT) would raise government revenue by [£198.6 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79853) in 2025. The Office for Budget Responsibility (OBR) estimates that VAT revenue for 2025-26 is [£182.1 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/vat/). The following figure shows the distributional impact of this reform.

```plotly
{
 "data": [
   {
     "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
     "y": [-11.4, -10.1, -10.8, -12.3, -9.2, -9.9, -9.3, -12.2, -11.0, -13.1],
     "type": "bar",
     "marker": {
       "color": "#616161"
     },
     "name": "Change in household income (%)",
     "text": ["-11.4%", "-10.1%", "-10.8%", "-12.3%", "-9.2%", "-9.9%", "-9.3%", "-12.2%", "-11.0%", "-13.1%"],
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
     "text": "Distributional impact of VAT by income decile",
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
     "range": [-14, 0],
     "tickvals": [0, -2, -4, -6, -8, -10, -12, -14],
     "ticktext": ["0.0%", "-2.0%", "-4.0%", "-6.0%", "-8.0%", "-10.0%", "-12.0%", "-14.0%"],
     "gridwidth": 1,
     "gridcolor": "#e0e0e0"
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
   "plot_bgcolor": "white",
   "paper_bgcolor": "white"
 }
}
```

### Fuel duty

The UK applies excise duties to specific products, including fuels.
Fuel duty is an excise tax charged on purchases of petrol, diesel and other fuels for vehicles or heating, calculated as [`fuel_duty`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/fuel_duty/fuel_duty.py).

- **Petrol and diesel rates**: Set at £0.5795 per litre for both petrol and diesel in 2025, defined by the [`petrol_and_diesel`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/fuel_duty/petrol_and_diesel.yaml) parameter.

PolicyEngine estimates that abolishing fuel duty would raise government revenue by [£28.3 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79854) in 2025. The Office for Budget Responsibility (OBR) estimates that fuel duty revenue for 2025-26 is [£27.3 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/fuel-duties/). The following figure shows the distributional impact of this reform.

```plotly
{
"data": [
  {
    "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    "y": [-11.4, -10.3, -10.6, -12.0, -9.5, -9.6, -9.2, -12.3, -10.7, -13.0],
    "type": "bar",
    "marker": {
      "color": "#616161"
    },
    "name": "Change in household income (%)",
    "text": ["-11.4%", "-10.3%", "-10.6%", "-12.0%", "-9.5%", "-9.6%", "-9.2%", "-12.3%", "-10.7%", "-13.0%"],
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
    "text": "Distributional impact of fuel duty by income decile",
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
    "range": [-14, 0],
    "tickvals": [0, -2, -4, -6, -8, -10, -12, -14],
    "ticktext": ["0.0%", "-2.0%", "-4.0%", "-6.0%", "-8.0%", "-10.0%", "-12.0%", "-14.0%"],
    "gridwidth": 1,
    "gridcolor": "#e0e0e0"
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
  "plot_bgcolor": "white",
  "paper_bgcolor": "white"
}
}
```

## Property and land taxes

The UK tax system includes taxes on property ownership, occupation and transactions. These taxes vary by nation and property type. Our property tax simulations use property values from the Family Resources Survey enhanced with housing market data and transaction patterns. Property transaction taxes (SDLT, LBTT, LTT) are modeled assuming a 4.5% annual property turnover rate. All estimates in this section are static estimates that do not reflect potential changes in property ownership or transaction behavior due to tax changes.

The Office for Budget Responsibility (OBR) estimates that revenue from property transaction taxes, including Stamp Duty Land Tax (SDLT), Land and Buildings Transaction Tax (LBTT), and Land Transaction Tax (LTT), for 2025-26 is [£15.1 billion](https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/property-transaction-taxes/).

### Stamp duty land tax (SDLT) - England & Northern Ireland

SDLT is a tax paid when purchasing property over certain price thresholds in England and Northern Ireland, calculated as [`stamp_duty_land_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/stamp_duty_land_tax.py). In PolicyEgine, the calculation splits into residential and non-residential components for both purchases and rentals. For residential properties, tax rates vary based on purchase type (first-time vs. subsequent, main vs. additional residence), with bracket taxation applying higher rates only to portions above each threshold. Additional properties face surcharges when exceeding minimum thresholds. Rental agreements are taxed on the net present value of rent. Corporate transactions distribute tax burden to households based on shareholding percentages and statistical revenue values. Expected revenue is calculated using a 4.5% annual property turnover rate, representing the estimated percentage of property value changing hands yearly.

- **Residential property**
  These rates apply to homes and residential properties with different structures for different buyer types, defined in [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/).

  - **Main residence rates (including first-time buyer relief)**: Standard rates apply in bands from the nil-rate band (£0) to portions over the highest threshold. For 2025, thresholds are £0, £125,000, £250,000, £925,000, and £1,500,000, with corresponding rates of 0%, 2%, 5%, 10%, and 12%. First-time buyers receive relief with higher nil-rate thresholds and reduced rates up to a maximum property value, defined in property-specific rate files within [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/).
  - **Additional property surcharge**: An extra percentage of SDLT is charged on additional residential properties over a threshold, defined in the surcharge parameters within [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/).
  - **Rental agreements**: SDLT applies to the net present value of rent over the lease term when exceeding a threshold, defined by residential rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/rent.yaml).

- **Non-residential property**
  These apply to commercial property purchases like shops, offices and agricultural land, defined in [`non_residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/non_residential/).

  - **Purchase rates**: Rates apply in bands from the nil-rate band to portions over higher thresholds, defined by non-residential purchase parameters in [`purchase.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/non_residential/purchase.yaml).
  - **Rental agreements**: SDLT applies to the net present value of commercial lease rent above a threshold, defined by non-residential rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/non_residential/rent.yaml).

PolicyEngine estimates that abolishing stamp duty would raise government revenue by [£11.4 billion](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79870) in 2025. The following figure shows the distributional impact of this reform.

```plotly
{
"data": [
  {
    "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    "y": [-3.3, -0.5, -0.7, -0.6, -0.4, -0.5, -0.4, -0.8, -0.4, -0.7],
    "type": "bar",
    "marker": {
      "color": "#616161"
    },
    "name": "Change in household income (%)",
    "text": ["-3.3%", "-0.5%", "-0.7%", "-0.6%", "-0.4%", "-0.5%", "-0.4%", "-0.8%", "-0.4%", "-0.7%"],
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
    "text": "Distributional impact of stamp duty by income decile",
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
    "range": [-3.5, 0],
    "tickvals": [0, -0.5, -1.0, -1.5, -2.0, -2.5, -3.0, -3.5],
    "ticktext": ["0.0%", "-0.5%", "-1.0%", "-1.5%", "-2.0%", "-2.5%", "-3.0%", "-3.5%"],
    "gridwidth": 1,
    "gridcolor": "#e0e0e0"
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
  "plot_bgcolor": "white",
  "paper_bgcolor": "white"
}
}
```

### Land and buildings transaction tax (LBTT) - Scotland

Scotland uses a different property transaction tax than England and Northern Ireland. Land and Buildings Transaction Tax (LBTT) is Scotland's equivalent to SDLT, applying to property and land transactions in Scotland, calculated as [`lbtt`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/revenue_scotland/lbtt.py). PolicyEngine implements Scotland-specific rate schedules with brackets, differentiating between first-time buyers and standard purchases. Additional property transactions incur both standard tax plus a percentage-based surcharge on the entire property value, creating a higher effective rate on second homes. Rental agreements use net present value calculation, taxing only the difference between previous and current cumulative rent. The tax applies exclusively to Scottish residents through a country code filter. Expected revenue is calculated using a 4.5% annual property turnover rate, representing the estimated percentage of total residential property value changing hands yearly. Non-residential transactions use separate rate schedules for both purchases and rental agreements.

- **Residential property**
  Scotland's residential property transaction tax applies to home purchases with specific rates, defined in [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/).

  - **Standard rates**: Rates apply in bands with thresholds at £0, £145,000, £250,000, £325,000, and £750,000 for 2025, with corresponding rates of 0%, 2%, 5%, 10%, and 12%, defined by the [`rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/rate.yaml) parameter.
  - **First-time buyer relief**: First-time buyers pay no LBTT up to a higher threshold than standard purchases, defined by the [`first_time_buyer_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/first_time_buyer_rate.yaml) parameter.
  - **Additional dwelling supplement**: A surcharge applies to additional residential properties over a threshold, defined by the [`additional_residence_surcharge`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/additional_residence_surcharge.yaml) parameter.
  - **Rental agreements**: LBTT applies to the net present value of residential lease rent above a threshold, defined by the rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/rent.yaml).

- **Non-residential property**
  These apply to commercial property transactions in Scotland with distinct rates, defined in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/non_residential.yaml).

  - **Purchase rates**: Rates apply in bands from the nil-rate band to portions over higher thresholds, defined by specific band parameters in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/non_residential.yaml).
  - **Rental agreements**: LBTT applies to the net present value of commercial lease rent above a threshold, defined by specific rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/rent.yaml).

PolicyEngine estimates that abolishing land and buildings transaction tax would raise government revenue by [£669.0 million](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80006) in 2025. The following figure shows the distributional impact of this reform.

```plotly
{
"data": [
  {
    "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    "y": [-0.07, -0.03, -0.06, -0.04, -0.02, -0.03, -0.10, -0.04, -0.05, -0.02],
    "type": "bar",
    "marker": {
      "color": "#616161"
    },
    "name": "Change in household income (%)",
    "text": ["-0.07%", "-0.03%", "-0.06%", "-0.04%", "-0.02%", "-0.03%", "-0.10%", "-0.04%", "-0.05%", "-0.02%"],
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
    "text": "Distributional impact of land and buildings transaction tax by income decile",
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
    "range": [-0.12, 0],
    "tickvals": [0, -0.02, -0.04, -0.06, -0.08, -0.10, -0.12],
    "ticktext": ["0.00%", "-0.02%", "-0.04%", "-0.06%", "-0.08%", "-0.10%", "-0.12%"],
    "gridwidth": 1,
    "gridcolor": "#e0e0e0"
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
  "plot_bgcolor": "white",
  "paper_bgcolor": "white"
}
}
```

### Land transaction tax (LTT) - Wales

Wales has its own property transaction tax system. Land Transaction Tax (LTT) is Wales' equivalent to SDLT, applying to property and land transactions in Wales, calculated as [`land_transaction_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/wra/land_transaction_tax.py). LTT implements separate calculation pathways for primary residences and higher-rate properties, each with distinct progressive bracket structures. Unlike SDLT and LBTT implementations, no specific first-time buyer relief appears in the LTT coding structure. The tax applies to both property purchases and rental agreements, with rental calculations using an incremental approach on net present values. Geographic restriction ensures only Welsh households face LTT liability through country code comparison. Non-residential transactions use separate rate schedules for both purchases and rentals. Expected revenue is calculated by applying a 4.5% annual property turnover rate to the whole property stock, representing the estimated percentage of total residential property value changing hands yearly.

- **Residential property**
  Wales' residential property transaction tax applies to home purchases with its own rate structure, defined in [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/residential/).

  - **Primary residence rates**: Rates apply in bands with thresholds at £0, £180,000, £250,000, £400,000, £750,000, and £1,500,000 for 2025, with corresponding rates of 0%, 3.5%, 5%, 7.5%, 10%, and 12%, defined by the [`primary`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/residential/primary.yaml) parameter.
  - **Higher rates for additional properties**: A surcharge applies to purchases of additional residential properties, defined by the [`higher_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/residential/higher_rate.yaml) parameter.
  - **Rental agreements**: LTT applies to the net present value of residential lease rent above thresholds, defined by specific rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/rent.yaml).

- **Non-residential property**
  These apply to commercial property purchases and leases in Wales with specific rates, defined in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/non_residential.yaml).

  - **Purchase rates**: Rates apply in bands from the nil-rate band to portions over higher thresholds, defined by specific band parameters in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/non_residential.yaml).
  - **Rental agreements**: LTT applies to the net present value of commercial lease rent with threshold and rate structures, defined by specific rental parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/rent.yaml).

PolicyEngine estimates that abolishing land transaction tax would raise government revenue by [£388.3 million](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80023) in 2025. The following figure shows the distributional impact of this reform.

```plotly
{
"data": [
  {
    "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    "y": [-0.10, -0.03, -0.02, -0.02, -0.02, -0.02, -0.02, -0.03, -0.02, -0.02],
    "type": "bar",
    "marker": {
      "color": "#616161"
    },
    "name": "Change in household income (%)",
    "text": ["-0.10%", "-0.03%", "-0.02%", "-0.02%", "-0.02%", "-0.02%", "-0.02%", "-0.03%", "-0.02%", "-0.02%"],
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
    "text": "Distributional impact of land transaction tax by income decile",
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
    "range": [-0.12, 0],
    "tickvals": [0, -0.02, -0.04, -0.06, -0.08, -0.10, -0.12],
    "ticktext": ["0.00%", "-0.02%", "-0.04%", "-0.06%", "-0.08%", "-0.10%", "-0.12%"],
    "gridwidth": 1,
    "gridcolor": "#e0e0e0"
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
  "plot_bgcolor": "white",
  "paper_bgcolor": "white"
}
}
```

### Business rates

The UK imposes annual taxes on property occupation, including business rates for non-domestic properties like shops, offices, and factories. At PolicyEngine, the calculation of business rates follows a multi-step process that varies by nation. First, a property is given a rateable value reflecting its estimated annual rental value in the open market, which is then multiplied by an annual multiplier set by the central government to calculate the [`business_rates`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/business_rates.py). Business rates are set by central government but collected by local authorities. The economic incidence of business rates is represented by distributing the total revenue burden based on households' corporate wealth holdings, reflecting the assumption that business rates are ultimately paid by shareholders through reduced returns on investments.

- **Corporate tax on non-domestic properties**: Calculated as a percentage (the multiplier) of a property's assessed rateable value, defined in business rates statistics parameters in [`statistics.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/business_rates/statistics.yaml).
- **Regional variation (England, Scotland, Wales, Northern Ireland)**: Each nation sets its own multipliers and relief schemes, creating regional differences, defined in region-specific sections within [`statistics.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/business_rates/statistics.yaml).

PolicyEngine estimates that abolishing business rates would raise government revenue by [£31.7 billion](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80029) in 2025. The UK government estimates that local authorities in England collect [£27.8 billion](https://www.gov.uk/government/statistics/national-non-domestic-rates-collected-by-councils-in-england-forecast-2025-to-2026/national-non-domestic-rates-collected-by-councils-in-england-forecast-for-2025-to-2026#:~:text=Local%20authorities%20estimate%20the%20non,scheme%20are%20taken%20into%20consideration.) in business rates revenue for the financial year 2025-2026. The following figure shows the distributional impact of this reform.

```plotly
{
  "data": [
    {
      "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "y": [-0.038, -0.039, -0.023, -0.027, -0.012, -0.018, -0.014, -0.028, -0.013, -0.012],
      "type": "bar",
      "marker": {
        "color": "#616161"
      },
      "name": "Change in household income (%)",
      "text": ["-3.8%", "-3.9%", "-2.3%", "-2.7%", "-1.2%", "-1.8%", "-1.4%", "-2.8%", "-1.3%", "-1.2%"],
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
      "text": "Distributional impact of business rates by income decile",
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
      "range": [-0.04, 0],
      "dtick": 0.005
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
    "plot_bgcolor": "white",
    "paper_bgcolor": "white"
  }
}
```

## Contributed/proposed taxes

Beyond modelling the existing UK tax system, PolicyEngine also includes several proposed taxes that are not currently implemented. These allow users to explore potential policy reforms and understand their distributional and revenue implications. Our simulations of proposed taxes use a combination of existing Family Resources Survey data enhanced with wealth, consumption, and carbon emissions data from sources including the Wealth and Assets Survey and national environmental accounts. In this post, all estimates for these proposed taxes are static estimates.

### Carbon tax

Carbon taxes can be used to price emissions and influence production and consumption patterns.
A carbon tax is a levy on carbon emissions required to produce goods and services, calculated in PolicyEngine as [`carbon_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/carbon_tax.py).

- **Per-ton CO2 emission tax**: A fixed monetary amount charged per ton of carbon dioxide equivalent emitted, defined by the carbon tax rate parameter in [`carbon_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/carbon_tax.yaml).

- **Consumer and corporate incidence modelling**: PolicyEngine models how the tax burden would be shared between consumers and producers in the [`carbon_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/carbon_tax.py) variable implementation.
- **Applied to carbon consumption**: The tax applies to the carbon footprint of household consumption across categories, using household carbon intensity variables in [`carbon.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/household/consumption/carbon.py).

### Wealth tax

A wealth tax would apply to the total value of an individual's assets, calculated as [`wealth_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/wealth_tax.py).

- **Annual tax on total household wealth**: A percentage tax applied to a household's total net wealth above a threshold, defined by wealth tax rate parameters in [`wealth_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/wealth_tax.yaml).
- **Progressive rate structure based on wealth brackets**: Higher tax rates would apply to larger wealth holdings, similar to income tax bands, defined by wealth tax bracket parameters in [`wealth_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/wealth_tax.yaml).

#### Non-primary residence wealth tax

Some wealth tax proposals exempt the main residence from taxation.
This is a targeted wealth tax that would exempt one's main residence but tax other assets, calculated as [`non_primary_residence_wealth_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/cec/non_primary_residence_wealth_tax.py).

- **Wealth tax that exempts main residence**: Applies only to assets beyond a household's primary home, defined by wealth tax exemption parameters in [`non_primary_residence_wealth_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/cec/non_primary_residence_wealth_tax.yaml).
- **Applied to all other wealth including secondary properties, financial assets, etc.**: Would capture investment properties, shares, bonds, business assets and other wealth forms through the non-primary wealth components in [`non_primary_residence_wealth_tax.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/cec/non_primary_residence_wealth_tax.py).

### Land value tax (LVT)

Land value tax focuses on the value of land itself, not the buildings or improvements on it.
Land value tax is a levy on the unimproved value of land, disregarding buildings or other improvements, calculated as [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py).

- **Tax on land value separate from improvements**: Only the underlying land value is taxed, not buildings or developments on the land. This differs from council tax and business rates, which tax the combined property value, defined by land value tax rate parameters in [`land_value_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/land_value_tax.yaml).
- LVT includes the following components:
  - **General land value tax**: A base rate applied to all land values regardless of use or ownership type. This would capture land value derived from location and public infrastructure, included in the [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py) calculation.
  - **Household land value tax**: A rate applied specifically to land under residential use. This could replace council tax with a system not dependent on outdated valuations, included in the residential component of [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py).
  - **Corporate land value tax**: A rate applied to commercially used land. This could replace or supplement business rates, potentially reducing business investment distortions, included in the commercial component of [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py).

### Private school VAT

The UK government has introduced [VAT on private school fees](https://commonslibrary.parliament.uk/research-briefings/cbp-10125/) from January 1, 2025, ending the previous exemption for private education, calculated in [`private_school_vat.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/labour/private_school_vat.py) in PolicyEngine. This policy change applies the standard 20% VAT rate to private school fees that were historically exempt from VAT as part of the general exemption for educational services.

- **VAT applied to private school fees**: The standard VAT rate would apply to fees currently exempt as educational services, defined by private school VAT rate parameters in [`private_school_vat.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/labour/private_school_vat.yaml).
- **Modelling by household income**: PolicyEngine models which household income groups would bear the burden of this tax in the [`private_school_vat`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/labour/private_school_vat.py) implementation.
- **Adjusts for actual private school attendance rates**: The model accounts for varying private school attendance rates across income groups using the [`private_school_attendance_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/labour/private_school_vat.py) parameter.

PolicyEngine models the current UK tax system and potential reforms, with tax impacts presented by income decile. Users can analyse how changes to taxes affect government revenue and household incomes.
