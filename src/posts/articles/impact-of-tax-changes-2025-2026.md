Four tax reforms will take effect in April 2025. Using the PolicyEngine UK tax-benefit microsimulation model, we analysed these reforms, which will increase taxes by an average of £1,112 per household.

This analysis, requested and [published](https://insider.iea.org.uk/p/new-analysis-the-cost-of-tax-hikes) by the Institute for Economic Affairs, featured in the Daily Mail's [front-page article](https://www.dailymail.co.uk/news/article-14548907/Labours-tax-raids-cost-families-week.html) on the 28th March 2025, in two [Express](https://www.express.co.uk/news/politics/2034186/rachel-reeves-tax-increase-cost) [articles](https://www.express.co.uk/finance/personalfinance/2034211/rachel-reevesl-tax-hikes-cost-british-families), and two [other](https://www.dorsetecho.co.uk/news/25047728.tax-hikes-will-cost-british-families-1-000-per-year-average/) [outlets](https://londonlovesbusiness.com/labours-tax-hikes-will-cost-british-families-over-1000-per-year-on-average/).

## Policy changes

The April 2025 tax reforms introduce several changes to the UK tax system:

* Stamp Duty Land Tax nil-rate thresholds will be set at £300,000 (from £425,000) for first-time buyers and £125,000 (from £250,000) for subsequent purchases. These thresholds determine the property value at which SDLT begins to apply. First-time buyers maintain a higher threshold than subsequent purchasers under this reform.
* Employer's National Insurance rate will change to 15% with the secondary threshold set to £96.14 (from £175) per week. We assume that the employer NI changes will be passed on to employees at 40% in 2025, 50% in 2026, 60% in 2027, and 70% in 2028-2029, with the remainder split between business owners and prices.
* Capital Gains Tax rates will change to 18% (from 10%) for basic rate taxpayers and 24% (from 20%) for both higher and additional rate taxpayers. CGT applies to profits from the sale of assets that have increased in value, with various exemptions including primary residences.
* Council Tax will increase by 5% on average from 2024.

## Economic impacts

We estimate the following revenue impacts for these reforms in 2025/26 (Table 1). For each tax, we include its static revenue impact. This assumes that individuals do not adjust their behaviour in response, representing simply the impact of the change in policy on existing households.

| Reform | 2025 static revenue (£ million) | Average per household (£) |
| --- | --- | --- |
| Stamp duty: lower first home nil-rate threshold from 425,000 to 300,000 | 150 | 5 |
| Stamp duty: lower primary residence nil-rate threshold from 250,000 to 125,000 | 1,200 | 43 |
| Capital Gains Tax: raise rates to 18% and 24% | 4,200 | 150 |
| Council tax: raise by 5% | 2,700 | 96 |
| Employer National Insurance: raise rate from 13.8% to 15% and lower threshold | 22,900 | 818 |
| Total | 31,150 | 1,112 |

Figure 1 shows the impact of these reforms on average in each household income decile. The highest decile net income falls by £2,729, and the lowest decile £796.

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [795.84883536, 325.08976524, 487.85810195, 498.32366299, 689.42730422, 721.42864146, 838.68582024, 1256.92339977, 1194.14636316, 2729.16649335],
      "type": "bar",
      "marker": {
        "color": "#2C6496"
      },
      "name": "Average tax impact (£)",
      "text": ["£796", "£325", "£488", "£498", "£689", "£721", "£839", "£1,257", "£1,194", "£2,729"],
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
        "text": "Average tax rise: £1,112",
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
      "y": [422, 488.28339084, 500.51197414, 506, 528.27238854, 534, 555, 582, 585, 597.01471204, 636.92043734, 718.19725616],
      "type": "bar",
      "marker": {
        "color": "#2C6496"
      },
      "name": "",
      "text": ["£422", "£488", "£501", "£506", "£528", "£534", "£555", "£582", "£585", "£597", "£637", "£718"],
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

## Conclusion

These reforms represent a significant change to the UK tax system, with projected revenue of over £31 billion in 2025/26. The distributional analysis shows that while all income groups face increased tax burdens, the monetary impact is strongly progressive, with the highest income households facing the largest increases.

The regional analysis highlights geographical variations, with London facing the highest median tax rise (£718), followed by the West Midlands (£637) and the East of England (£597). The East Midlands faces the lowest increase (£422), followed by Yorkshire (£488) and the North West (£501).

The change to employer National Insurance contributes most significantly to the overall tax increase, accounting for approximately 73% of the total revenue raised. This suggests that labor market impacts may be an important consideration when evaluating these reforms.

These results provide estimates of the static impacts without considering potential behavioral responses, which could somewhat reduce the overall revenue raised. Further analysis incorporating dynamic effects would provide additional insight into the longer-term impacts of these tax changes.
