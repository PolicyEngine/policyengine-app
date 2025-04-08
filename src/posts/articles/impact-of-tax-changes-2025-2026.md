Four tax reforms will take effect in April 2025. Using the PolicyEngine UK tax-benefit microsimulation model, we analysed these reforms, which will increase taxes by an average of £1,133 per household.[^1]

[^1]: A previous version of this analysis assumed a 5% increase in average Council Tax rates by using the central Government's figure for the change in the average Band D rate. This version uses the 6.1% rise in the average Council Tax rate for all households from the same source.

This analysis, requested and [published](https://insider.iea.org.uk/p/new-analysis-the-cost-of-tax-hikes) by the Institute for Economic Affairs, featured in the Daily Mail's [front-page article](https://www.dailymail.co.uk/news/article-14548907/Labours-tax-raids-cost-families-week.html) on the 28th March 2025, in two [Express](https://www.express.co.uk/news/politics/2034186/rachel-reeves-tax-increase-cost) [articles](https://www.express.co.uk/finance/personalfinance/2034211/rachel-reevesl-tax-hikes-cost-british-families), and two [other](https://www.dorsetecho.co.uk/news/25047728.tax-hikes-will-cost-british-families-1-000-per-year-average/) [outlets](https://londonlovesbusiness.com/labours-tax-hikes-will-cost-british-families-over-1000-per-year-on-average/).

## Policy changes

From a combination of temporary reforms expiring and new tax reforms taking effect:

- The Government will [allow](https://www.legislation.gov.uk/ukpga/2023/2/section/1) **Stamp Duty Land Tax** nil-rate thresholds to expire to £300,000 (from £425,000) for first-time buyers and £125,000 (from £250,000) for subsequent purchases. These thresholds determine the property value at which SDLT begins to apply. First-time buyers maintain a higher threshold than subsequent purchasers under this reform. This reform is the result of an expiry of a Stamp Duty Land Tax cut announced by then-Chancellor Jeremy Hunt in the Autumn Budget 2023 (expiring 31 March 2025).
- The Government will [set](https://bills.parliament.uk/bills/3888) **Employer's National Insurance** rate will [change](https://policyengine.org/uk/research/autumn-budget-24-employer-ni) to 15% with the secondary threshold set to £96.14 (from £175) per week. We assume that the employer NI changes will be passed on to employees at 40% in 2025, 50% in 2026, 60% in 2027, and 70% in 2028-2029, with the remainder split between business owners and prices. This reform was announced in the Autumn Budget 2024 and takes effect in April 2025.
- The Government will [set](https://www.legislation.gov.uk/ukpga/2025/8/section/7/enacted) **Capital Gains Tax** rates to [change](https://policyengine.org/uk/research/cgt-autumn-budget) to 18% (from 10%) for basic rate taxpayers and 24% (from 20%) for both higher and additional rate taxpayers. CGT applies to profits from the sale of assets that have increased in value, with various exemptions including primary residences. This reform was in effect from the time of the Autumn Budget, but 2025/26 is the first full tax year of its implementation.
- Local authorities will [increase](https://www.gov.uk/government/statistics/council-tax-levels-set-by-local-authorities-in-england-2025-to-2026/council-tax-levels-set-by-local-authorities-in-england-2025-to-2026#average-council-tax-per-dwelling) **Council Tax** by 6.1% on average from 2024\. This is set by local authorities. These reforms have been announced by councils over the last year.

## Economic impacts

We estimate the following revenue impacts for these reforms in 2025/26 (Table 1). For each tax, we include its _static_ revenue impact. This assumes that individuals do not adjust their behaviour in response, representing simply the impact of the change in policy on existing households.

| Reform                                                                         | 2025 static revenue (£ million)                                                                                                                            | Average per household (£) |
| :----------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ |
| Stamp duty: lower first home nil-rate threshold from 425,000 to 300,000        | [150](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&baseline=80444&timePeriod=2025&region=uk)                             | 5                         |
| Stamp duty: lower primary residence nil-rate threshold from 250,000 to 125,000 | [1,200](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&baseline=80446&timePeriod=2025&region=uk)                           | 43                        |
| Capital Gains Tax: raise rates to 18% and 24%                                  | [4,200](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=69732&region=uk&timePeriod=2025&baseline=1)                           | 150                       |
| Council tax: raise by 5%                                                       | 3,300                                                                                                                                                      | 117                       |
| National Insurance: raise employer rate from 13.8% to 15% and lower threshold  | [22,900](https://policyengine.org/uk/policy?reform=69728&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=1&uk_local_areas_beta=true) | 818                       |
| Total                                                                          | 31,750                                                                                                                                                     | 1,133                     |

Table 1

Figure 1 shows the impact of these reforms on average in each household income decile. The highest decile’s household net income falls by £2,754, and the lowest decile £808.

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [ 808.18109906,  337.65213832,  502.01936568,  512.77910125, 706.03858044,  739.14927632,  857.23415948, 1277.30351396, 1216.44446509, 2754.27755076],
      "type": "bar",
      "marker": {
        "color": "#2C6496"
      },
      "name": "Average tax impact (£)",
      "text": ["£808", "£338", "£502", "£513", "£706", "£739", "£857", "£1,277", "£1,216", "£2,754"],
      "textposition": "auto",
      "insidetextfont": {
        "family": "Roboto Serif",
        "color": "white",
        "size": 10
      }
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 1: Impact of tax changes by household income decile (2025-2026)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "yaxis": {
      "title": "Average annual tax rise (£)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "automargin": true
    },
    "xaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickvals": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "ticktext": ["Bottom", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "Top"]
    },
    "height": 500,
    "margin": {
      "l": 50,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "shapes": [
      {
        "type": "line",
        "x0": 0,
        "x1": 1,
        "xref": "paper",
        "y0": 1112,
        "y1": 1112,
        "line": {
          "color": "#616161",
          "width": 3,
          "dash": "dash"
        }
      }
    ],
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine UK",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#616161"
        }
      },
      {
        "x": 0.5,
        "y": 1162,
        "xref": "paper",
        "yref": "y",
        "text": "Average tax rise: £1,133",
        "showarrow": true,
        "arrowhead": 2,
        "arrowcolor": "#616161",
        "arrowwidth": 2,
        "font": {
          "size": 14,
          "family": "Roboto Serif"
        }
      }
    ],
    "images": [
      {
        "source": "/logo512.png",
        "x": 1,
        "y": -0.20,
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

Figure 2 shows the median tax rise by region.

```plotly
{
  "data": [
    {
      "x": ["East Midlands", "Yorkshire", "North West", "Northern Ireland", "North East", "Scotland", "South West", "South East", "Wales", "East of England", "West Midlands", "London"],
      "y": [443.62034872, 501.48537701, 506, 518, 534, 546.28424586, 577.93172372, 596.88370954, 603.39425731, 615.97669004, 656.42562248, 747],
      "type": "bar",
      "marker": {
        "color": "#2C6496"
      },
      "name": "",
      "text": ["£444", "£501", "£506", "£518", "£534", "£546", "£578", "£597", "£603", "£616", "£656", "£747"],
      "textposition": "auto",
      "insidetextfont": {
        "family": "Roboto Serif",
        "color": "white",
        "size": 10
      },
      "hovertemplate": "x=%{x}<br>y=%{y}<br>text=%{text}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 2: Median tax rise by region (2025-2026)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "yaxis": {
      "title": "Median annual tax rise (£)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "automargin": true
    },
    "xaxis": {
      "title": "Region",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickangle": 45
    },
    "height": 500,
    "margin": {
      "l": 50,
      "r": 50,
      "b": 150,
      "t": 100,
      "pad": 4
    },
    "annotations": [
      {
        "x": 1,
        "y": -0.4,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine UK",
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
        "y": -0.35,
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
