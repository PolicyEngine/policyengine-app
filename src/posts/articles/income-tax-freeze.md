_Credit: HM Treasury_

[See the full impacts on PolicyEngine here in 2028](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=68997&region=uk&timePeriod=2028&baseline=1) and [2029](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=68997&region=uk&timePeriod=2029&baseline=1).

The Resolution Foundation on Monday 17th March [proposed](https://www.resolutionfoundation.org/press-releases/chancellor-needs-take-action-to-balance-the-books/) extending the freeze on the income tax personal allowance and higher rate threshold for an additional two years. This policy would raise over £12 billion in tax revenue and would affect taxpayers across all income groups.

## The reforms

Currently, the personal allowance (£12,570) and higher rate threshold (£50,270) are frozen until 2028. The proposed extension would maintain these thresholds at their current levels until 2030, representing a seven-year freeze since they were last uprated in 2021.

### Taxpayer band changes

Our analysis shows the following changes in taxpayer bands due to the extended freeze:

- **Basic rate taxpayers**: By 2029, an estimated 640,000 additional people would become basic rate taxpayers who otherwise would have remained below the personal allowance threshold.
- **Higher rate taxpayers**: Approximately 906,000 additional people would move from basic rate to higher rate taxpayers by 2029.
- **Additional rate taxpayers**: The counts of additional rate taxpayers are not affected by the threshold freeze.

These shifts would occur primarily in England, Wales and Northern Ireland, as Scotland sets its own income tax thresholds.

## Methodology notes

We model the proposed extension of the freeze from April 2028 to April 2030 using the fiscal year 2029-30 for our analysis. Our projections account for expected inflation and wage growth, following OBR forecasts.

## UK impacts

Using PolicyEngine's open-source model, we estimate both the budgetary and distributional impacts of extending the freeze.

### Budgetary impact

We project that extending the income tax threshold freeze would raise approximately £12.2 billion over the two additional years:

| Fiscal year   | 2028-29 | 2029-30 | Total |
| ------------- | ------- | ------- | ----- |
| Revenue (£bn) | 4.0     | 8.2     | 12.2  |

### Distributional impacts

The extension of the freeze would affect taxpayers across the income distribution. Our analysis shows households in the ninth, seventh, and eighth income deciles would experience the largest proportional reductions in net income (-0.66%, -0.58%, and -0.57% respectively).

```plotly
{
  "data": [
    {
      "x": ["Bottom", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "Top"],
      "y": [-0.31, -0.34, -0.29, -0.40, -0.41, -0.48, -0.58, -0.57, -0.66, -0.35],
      "type": "bar",
      "marker": {
        "color": "#616161"
      },
      "name": "Change in net income (%)",
      "text": ["-0.31%", "-0.34%", "-0.29%", "-0.40%", "-0.41%", "-0.48%", "-0.58%", "-0.57%", "-0.66%", "-0.35%"],
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
      "text": "Income tax threshold freeze to 2030: Change in net income by income decile",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "yaxis": {
      "title": "Change in net income (%)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": ",.1%",
      "automargin": true
    },
    "xaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      }
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

```plotly
{
  "data": [
    {
      "x": ["Basic rate taxpayers", "Higher rate taxpayers", "Additional rate taxpayers"],
      "y": [0.64, 0.91, 0],
      "type": "bar",
      "marker": {
        "color": "#2C6496"
      },
      "name": "Additional taxpayers by 2030 (millions)",
      "text": ["0.64m", "0.91m", "0m"],
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
      "text": "Income tax threshold freeze to 2030: Additional taxpayers by tax band",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "yaxis": {
      "title": "Additional taxpayers (millions)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "automargin": true
    },
    "xaxis": {
      "title": "Taxpayer band",
      "titlefont": {
        "family": "Roboto Serif"
      }
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

Higher-income households lose more in monetary terms, while the proportional impact varies across the income distribution. Our analysis shows impacts of -0.66% in the ninth income decile, -0.58% in the seventh decile, and -0.57% in the eighth decile, reflecting the dual effect of freezing both the personal allowance and higher rate threshold.

We estimate that 82% of UK households would be affected by the extension, with the impact concentrated among those in employment. Households primarily relying on benefits rather than earnings would see less impact from the freeze.

The reform would reduce the Gini coefficient by 0.07% and increase poverty rates by 0.17% (from 12.20% to 12.23%).

Working-age singles and couples without children would face larger proportional reductions in income, as these groups more commonly have taxable incomes above the personal allowance.
