## Introduction

Chancellor Rachel Reeves is [expected](https://www.theguardian.com/society/2025/sep/30/rachel-reeves-lift-two-child-benefit-cap-november-budget) to lift the two-child benefit cap in the November 2025 Budget. The cap, introduced in 2017, prevents parents from claiming Universal Credit or Child Tax Credit for more than two children born after April 2017. The policy affected [1.5 million](https://www.gov.uk/government/statistics/universal-credit-and-child-tax-credit-claimants-statistics-related-to-the-policy-to-provide-support-for-a-maximum-of-2-children-april-2023) children in the UK in April 2023. Treasury officials are exploring alternatives to a complete removal of the cap.

In this analysis, we examine the impact of removing the two-child limit on government spending, poverty rates, and household incomes across the income distribution.

## Household impact

The reform would increase Universal Credit or Child Tax Credit payments for affected families by removing the restriction on child elements. For a sample household of two parents with three children aged 3, 5, and 7 in 2026, Figure 1 [shows](https://policyengine.org/uk/household?focus=householdOutput.earnings&reform=93219&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=true&household=56008) how household net income changes across different employment income levels.

**Figure 1: Household net income by employment income**

![](/images/posts/two-child-limit/hh-impact.png)

At lower income ranges, the reform delivers larger increases in household net income due to higher Universal Credit entitlements when the two-child limit is removed. As employment income rises, Universal Credit tapers off under both scenarios, reducing the relative benefit of the reform.

## Budgetary impact

PolicyEngine estimates that removing the two-child limit would cost £2.7 billion in 2026, rising to £3.0 billion by 2029. The cost increases over time as more children are born after April 2017, when the cap was introduced, making fewer families eligible for transitional protection.

| Year                                                                                                                            | Cost         |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| [2026](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=93219&region=uk&timePeriod=2026&baseline=1) | £2.7 billion |
| [2027](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=93219&region=uk&timePeriod=2027&baseline=1) | £2.9 billion |
| [2028](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=93219&region=uk&timePeriod=2028&baseline=1) | £3.0 billion |
| [2029](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=93219&region=uk&timePeriod=2029&baseline=1) | £3.0 billion |

The Institute for Fiscal Studies estimates the cost at [£3.4 billion](https://www.dailyrecord.co.uk/news/politics/rachel-reeves-decision-axe-two-35993258), while the Institute for Public Policy Research estimates [£3.2 billion](https://www.independent.co.uk/news/uk/politics/two-child-benefit-cap-bridget-phillipson-labour-b2836482.html) in 2026.

## Distributional impact

By income decile, removing the two-child limit would provide the largest relative benefits to lower-income households, as shown in Figure 2. The lowest income decile would see household income rise by 1.4%, while the second decile would see a 1.3% increase.

**Figure 2: Change in household income by income decile, 2026**

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0.014328061696749907, 0.012677732494263927, 0.00604738540565023, 0.0031272796123411033, 0.0003271022742684365, 0.000312217381484109, 0.00021320237605410955, 9.079103413170756e-8, 0, 0],
      "type": "bar",
      "marker": {
        "color": "#2C6496",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Change: +%{y:.1%}<extra></extra>",
      "text": ["+1.4%", "+1.3%", "+0.6%", "+0.3%", "+0.0%", "+0.0%", "+0.0%", "+0.0%", "+0.0%", "+0.0%"],
      "textposition": "inside",
      "textfont": {
        "family": "Roboto Serif",
        "size": 14,
        "color": "white"
      }
    }
  ],
  "layout": {
    "xaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1
    },
    "yaxis": {
      "title": "Relative change in household income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": "+.1%",
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1
    },
    "height": 500,
    "margin": {
      "l": 80,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "images": [
      {
        "source": "https://policyengine.org/images/logos/policyengine/blue.png",
        "x": 1,
        "y": -0.15,
        "xref": "paper",
        "yref": "paper",
        "sizex": 0.15,
        "sizey": 0.15,
        "xanchor": "right",
        "yanchor": "bottom"
      }
    ]
  }
}
```

### Winners and losers

Figure 3 shows that 4.6% of the population would see income gains from removing the two-child limit, with the largest share of winners concentrated in the lowest income deciles. The lowest income decile sees 11% of households gain income, with 10.5% gaining more than 5% and 0.6% gaining less than 5%. The second decile sees 14.8% gain, with 14.2% gaining more than 5%.

**Figure 3: Population share by income change, 2026**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [4.2, 10.5, 14.2, 9.9, 5.6, 0.9, 0.4, 0.7, 0.0, 0.0, 0.0],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#2C6496"},
      "text": ["4%", "11%", "14%", "10%", "6%", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0.2, 0.6, 0.5, 0.1, 0.0, 0.0, 1.2, 0.0, 0.0, 0.0, 0.0],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#C5D3E8"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [95.5, 88.9, 85.2, 90.0, 94.4, 99.1, 98.4, 99.3, 100.0, 100.0, 100.0],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#F0F0F0"},
      "text": ["96%", "89%", "85%", "90%", "94%", "99%", "98%", "99%", "100%", "100%", "100%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#A0A0A0"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#616161"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x:.1f}%<extra></extra>"
    }
  ],
  "layout": {
    "barmode": "stack",
    "xaxis": {
      "title": "Population share",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": ".0%",
      "tickvals": [0, 20, 40, 60, 80, 100],
      "range": [0, 105],
      "showgrid": false
    },
    "yaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "autorange": "reversed",
      "showgrid": false
    },
    "height": 500,
    "margin": {
      "l": 80,
      "r": 200,
      "b": 80,
      "t": 100,
      "pad": 4
    },
    "legend": {
      "x": 1.02,
      "y": 0.5,
      "xanchor": "left",
      "yanchor": "middle",
      "font": {
        "family": "Roboto Serif",
        "size": 12
      },
      "title": {
        "text": "Change in income",
        "font": {
          "family": "Roboto Serif",
          "size": 13
        }
      }
    },
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa",
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
    ]
  }
}
```

## Poverty impact

By age group, removing the two-child limit would reduce poverty rates most for children across all years. The child poverty rate would fall by 16.2% in 2026 and by 16.4% in 2029, while the overall poverty rate would decline by 7.1% in 2026 and by 7.4% in 2029.

| Year                                                                                                                          | Children | All   |
| ----------------------------------------------------------------------------------------------------------------------------- | -------- | ----- |
| [2026](https://policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=93219&region=uk&timePeriod=2026&baseline=1) | -16.2%   | -7.1% |
| [2027](https://policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=93219&region=uk&timePeriod=2027&baseline=1) | -17.7%   | -7.9% |
| [2028](https://policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=93219&region=uk&timePeriod=2028&baseline=1) | -16.9%   | -7.6% |
| [2029](https://policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=93219&region=uk&timePeriod=2029&baseline=1) | -16.4%   | -7.4% |

## Inequality impact

Removing the two-child limit in 2026 would reduce income inequality. The Gini index would fall by 0.6%, while the top 10% income share would decrease by 0.1% and the top 1% income share would decline by 0.1%.

| Metric                                                                                                                                    | Change |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [Gini index](https://policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=93219&region=uk&timePeriod=2026&baseline=1)    | -0.6%  |
| [Top 10% share](https://policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=93219&region=uk&timePeriod=2026&baseline=1) | -0.1%  |
| [Top 1% share](https://policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=93219&region=uk&timePeriod=2026&baseline=1)  | -0.1%  |

## Geographic impact

The impact of removing the two-child limit [varies](https://policyengine.org/uk/policy?focus=policyOutput.constituencies.relative&reform=93219&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=true&household=56008) across parliamentary constituencies, as shown in Figure 4.

**Figure 4: Geographic distribution of relative income change by parliamentary constituency**

![](/images/posts/two-child-limit/map-impact.png)

The constituencies experiencing the largest relative income gains include Bradford East, Birmingham Hodge Hill and Solihull North, Bradford South, Luton North, and Birmingham Hall Green and Moseley. The constituencies with the smallest gains include South Down, Lagan Valley, Upper Bann, Glasgow East, and Cities of London and Westminster.

### Winners and losers by parliamentary constituency

As shown in Figure 5, 559 constituencies (86%) would see income gains of less than 5%, while 91 (14%) would see no change. By nation: 516 English constituencies gain (95%), 21 Scottish (37%), 19 Welsh (59%), and 3 Northern Irish (17%).

**Figure 5: Constituency distribution by region, 2026**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#2C6496"},
      "showlegend": false,
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [86.0, 95.0, 59.4, 36.8, 16.7],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#C5D3E8"},
      "text": ["559", "516", "19", "21", "3"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 12},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{customdata} constituencies (%{x:.1f}%)<extra></extra>",
      "customdata": [559, 516, 19, 21, 3]
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [14.0, 5.0, 40.6, 63.2, 83.3],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#F0F0F0"},
      "text": ["91", "27", "13", "36", "15"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 12},
      "hovertemplate": "%{y}<br>No change: %{customdata} constituencies (%{x:.1f}%)<extra></extra>",
      "customdata": [91, 27, 13, 36, 15]
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#A0A0A0"},
      "showlegend": false,
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#5A5A5A"},
      "showlegend": false,
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x:.1f}%<extra></extra>"
    }
  ],
  "layout": {
    "barmode": "stack",
    "xaxis": {
      "title": "Constituency share",
      "titlefont": {"family": "Roboto Serif"},
      "tickfont": {"family": "Roboto Serif"},
      "tickformat": ".0%",
      "showgrid": false,
      "range": [0, 105]
    },
    "yaxis": {
      "titlefont": {"family": "Roboto Serif"},
      "tickfont": {"family": "Roboto Serif"}
    },
    "legend": {
      "title": {"text": "Change in income", "font": {"family": "Roboto Serif"}},
      "font": {"family": "Roboto Serif"},
      "x": 1.02,
      "y": 1,
      "xanchor": "left",
      "yanchor": "top"
    },
    "height": 400,
    "margin": {"l": 140, "r": 200, "b": 100, "t": 100, "pad": 4},
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa",
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
    ]
  }
}
```

## Conclusion

Removing the two-child benefit limit would cost £2.7 billion in 2026, rising to £3.0 billion by 2029. The reform would reduce child poverty by 16.2% and overall poverty by 7.1% in 2026. 559 parliamentary constituencies (86%) would see income gains of less than 5%.

We invite you to explore the [PolicyEngine webapp](https://policyengine.org/) to model your own customised reforms.
