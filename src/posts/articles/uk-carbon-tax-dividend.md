_Image credit: UK Trade and Business Commission_

## Introduction

This report examines how carbon tax and dividend policies would affect UK households under two scenarios: £100 and £200 per tonne of CO2. We analyse how carbon prices impact household incomes when all tax revenue is returned as equal dividends to every resident.

In this policy experiment, the government applies carbon taxes at £100 and £200 per tonne of CO2 equivalent, generating revenue based on emissions and consumption patterns. We calculate average household net income under baseline conditions (no carbon tax) and reform conditions (with carbon tax). The government redistributes all tax revenue as equal per-person dividends to UK residents. We categorise household income changes by gain and loss thresholds and analyse distributional effects across income deciles.

## Carbon tax revenue

The following table presents the total revenue generated from carbon taxation under each scenario in 2026-27:

| Carbon tax rate | Total revenue                                                                                                                                    | Dividend amount (per person per week) |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| £100/tonne      | [£67.3 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=75542&region=uk&timePeriod=2026&baseline=1)  | £19                                   |
| £200/tonne      | [£134.6 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92939&region=uk&timePeriod=2026&baseline=1) | £37                                   |

The Department for Environment, Food & Rural Affairs [reports](https://www.gov.uk/government/statistics/uks-carbon-footprint/carbon-footprint-for-the-uk-and-england-to-2022) greenhouse gas emissions associated with consumption in 2022 at 740 MtCO2e. At the rate of £100/tonne, the revenue estimation in 2022 would be £74 billion.

For the following analysis, we assume that revenue generated from the carbon tax is redistributed amongst people at a flat rate per person as a carbon dividend.

## Distributional analysis

This section examines how carbon dividend policies affect households across the income distribution, showing relative changes in household income by income decile. Figures 1 and 2 show the percentage change in household income by income decile for each scenario in 2026-27:

### £100/tonne carbon dividend:

**Figure 1**: Change in household income by income decile

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0.047, 0.026, 0.013, 0.013, 0.016, 0.009, -0.001, -0.010, -0.014, -0.018],
      "type": "bar",
      "marker": {
        "color": ["#2C6496", "#2C6496", "#2C6496", "#2C6496", "#2C6496", "#2C6496", "#A0A0A0", "#A0A0A0", "#A0A0A0", "#A0A0A0"]
      },
      "text": ["+4.7%", "+2.6%", "+1.3%", "+1.3%", "+1.6%", "+0.9%", "-0.1%", "-1.0%", "-1.4%", "-1.8%"],
      "textposition": "outside",
      "textfont": {
        "color": "black",
        "size": 12,
        "family": "Roboto Serif"
      },
      "hovertemplate": "Decile %{x}<br>Change: %{y:+.1%}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickvals": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "showgrid": false
    },
    "yaxis": {
      "title": "Relative change in household income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": "+.0%",
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1,
      "zeroline": true,
      "zerolinecolor": "#000000",
      "zerolinewidth": 1,
      "range": [-0.025, 0.055]
    },
    "height": 500,
    "margin": {
      "l": 80,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa",
    "showlegend": false,
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
    ]
  }
}
```

### £200/tonne carbon dividend:

**Figure 2**: Change in household income by income decile

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0.095, 0.051, 0.027, 0.026, 0.032, 0.019, -0.001, -0.019, -0.027, -0.035],
      "type": "bar",
      "marker": {
        "color": ["#2C6496", "#2C6496", "#2C6496", "#2C6496", "#2C6496", "#2C6496", "#A0A0A0", "#A0A0A0", "#A0A0A0", "#A0A0A0"]
      },
      "text": ["+9.5%", "+5.1%", "+2.7%", "+2.6%", "+3.2%", "+1.9%", "-0.1%", "-1.9%", "-2.7%", "-3.5%"],
      "textposition": "outside",
      "textfont": {
        "color": "black",
        "size": 12,
        "family": "Roboto Serif"
      },
      "hovertemplate": "Decile %{x}<br>Change: %{y:+.1%}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Income decile",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickvals": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "showgrid": false
    },
    "yaxis": {
      "title": "Relative change in household income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": "+.0%",
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1,
      "zeroline": true,
      "zerolinecolor": "#000000",
      "zerolinewidth": 1,
      "range": [-0.05, 0.11]
    },
    "height": 500,
    "margin": {
      "l": 80,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa",
    "showlegend": false,
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
    ]
  }
}
```

As shown in Figures 1 and 2, income deciles 1-6 consistently gain from the carbon dividend policy across both scenarios. The magnitude of gains decreases with income level, with decile 1 households seeing the largest improvements. Income deciles 8-10 experience net losses. The £200/tonne rate approximately doubles both the gains for lower deciles and losses for higher deciles compared to the £100/tonne rate.

## Winner-loser analysis

This section analyses the population distribution across different income change categories, showing what proportion of households gain or lose under each scenario. At both levels, 71% of UK residents would benefit financially on a net basis, while 28% would pay more in the carbon tax than they receive in the dividend. Figures 3 and 4 display the distribution of households by income change category for each scenario in 2026-27:

### £100/tonne carbon dividend:

**Figure 3**: Distribution of households by income change

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [42.1, 77.4, 68.6, 61.2, 52.2, 52.9, 46.8, 31.0, 21.3, 7.8, 1.6],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#2C6496"},
      "text": ["42%", "77%", "69%", "61%", "52%", "53%", "47%", "31%", "21%", "8%", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [29.4, 7.8, 12.3, 14.4, 24.4, 29.8, 27.2, 36.5, 40.0, 50.5, 51.5],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#C5D3E8"},
      "text": ["29%", "8%", "12%", "14%", "24%", "30%", "27%", "37%", "40%", "50%", "52%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [0.7, 0.6, 0.1, 0.7, 0.2, 0.4, 0.7, 0.7, 0.5, 1.0, 1.5],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#F0F0F0"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [11.1, 1.8, 6.5, 8.5, 11.5, 6.8, 10.2, 14.2, 10.8, 19.7, 20.8],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#A0A0A0"},
      "text": ["11%", "", "7%", "9%", "12%", "7%", "10%", "14%", "11%", "20%", "21%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [16.7, 12.3, 12.4, 15.2, 11.6, 10.0, 15.1, 17.5, 27.3, 21.1, 24.5],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#5A5A5A"},
      "text": ["17%", "12%", "12%", "15%", "12%", "10%", "15%", "18%", "27%", "21%", "24%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x:.1f}%<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "",
      "font": {"family": "Roboto Serif", "size": 16},
      "x": 0,
      "xanchor": "left"
    },
    "barmode": "stack",
    "xaxis": {
      "title": "Population share",
      "titlefont": {"family": "Roboto Serif"},
      "tickfont": {"family": "Roboto Serif"},
      "ticksuffix": "%",
      "range": [0, 100],
      "showgrid": false
    },
    "yaxis": {
      "title": "Income decile",
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
    "height": 500,
    "margin": {"l": 60, "r": 200, "b": 100, "t": 100, "pad": 4},
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa",
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine",
        "showarrow": false,
        "font": {"family": "Roboto Serif", "size": 10, "color": "#616161"}
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
    ]
  }
}
```

### £200/tonne carbon dividend:

**Figure 4**: Distribution of households by income change

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [60.3, 82.0, 74.1, 71.8, 67.8, 76.1, 64.6, 57.2, 51.3, 38.3, 19.6],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#2C6496"},
      "text": ["60%", "82%", "74%", "72%", "68%", "76%", "65%", "57%", "51%", "38%", "20%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [11.4, 3.7, 6.8, 4.1, 8.9, 6.9, 9.6, 10.4, 10.1, 20.1, 33.7],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#C5D3E8"},
      "text": ["11%", "4%", "7%", "4%", "9%", "7%", "10%", "10%", "10%", "20%", "34%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [0.4, 0.2, 0.1, 0.3, 0.1, 0.1, 0.5, 0.6, 0.2, 0.8, 1.4],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#F0F0F0"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [6.7, 0.9, 3.2, 4.8, 8.6, 4.0, 5.6, 7.5, 7.0, 12.8, 12.4],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#A0A0A0"},
      "text": ["7%", "", "3%", "5%", "9%", "4%", "6%", "7%", "7%", "13%", "12%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x:.1f}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [21.2, 13.2, 15.8, 19.0, 14.5, 12.9, 19.7, 24.2, 31.3, 28.0, 33.0],
      "y": ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "marker": {"color": "#5A5A5A"},
      "text": ["21%", "13%", "16%", "19%", "15%", "13%", "20%", "24%", "31%", "28%", "33%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x:.1f}%<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "",
      "font": {"family": "Roboto Serif", "size": 16},
      "x": 0,
      "xanchor": "left"
    },
    "barmode": "stack",
    "xaxis": {
      "title": "Population share",
      "titlefont": {"family": "Roboto Serif"},
      "tickfont": {"family": "Roboto Serif"},
      "ticksuffix": "%",
      "range": [0, 100],
      "showgrid": false
    },
    "yaxis": {
      "title": "Income decile",
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
    "height": 500,
    "margin": {"l": 60, "r": 200, "b": 100, "t": 100, "pad": 4},
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa",
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine",
        "showarrow": false,
        "font": {"family": "Roboto Serif", "size": 10, "color": "#616161"}
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
    ]
  }
}
```

As illustrated in Figures 3 and 4, the distribution indicates that lower income deciles have a higher proportion of households gaining more than 5%, while higher income deciles are more likely to experience losses.

## Poverty impact analysis

This section examines how carbon dividend policies affect poverty rates across different demographic groups. Poverty is measured as absolute before housing costs. The following table shows the relative change in poverty rates by demographic group for each scenario in 2026-27:

| Demographic group  | £100/tonne                                                                                                                               | £200/tonne                                                                                                                               |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Children           | [\-0.5%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92873&region=uk&timePeriod=2026&baseline=1) | [\-0.7%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92996&region=uk&timePeriod=2026&baseline=1) |
| Working-age adults | [\-0.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92873&region=uk&timePeriod=2026&baseline=1) | [\-0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92996&region=uk&timePeriod=2026&baseline=1) |
| Seniors            | [\-0.6%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92873&region=uk&timePeriod=2026&baseline=1) | [\-0.6%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92996&region=uk&timePeriod=2026&baseline=1) |
| All populations    | [\-0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92873&region=uk&timePeriod=2026&baseline=1) | [\-0.5%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92996&region=uk&timePeriod=2026&baseline=1) |

The carbon dividend policy shows poverty-reducing effects across all demographic groups, with the largest improvements for children at £200/tonne (-0.7%). The £200/tonne rate produces more poverty reduction.

## Inequality impact analysis

This section analyses how carbon dividend policies affect income inequality using standard inequality measures. The following table presents the relative change in inequality measures for each scenario in 2026-27:

| Inequality measure | £100/tonne                                                                                                                               | £200/tonne                                                                                                                               |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Gini index         | [\-0.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92873&region=uk&timePeriod=2026&baseline=1) | [\+0.4%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92996&region=uk&timePeriod=2026&baseline=1) |
| Top 10% share      | [\-1.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92873&region=uk&timePeriod=2026&baseline=1) | [\-1.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92996&region=uk&timePeriod=2026&baseline=1) |
| Top 1% share       | [\-0.7%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92873&region=uk&timePeriod=2026&baseline=1) | [\-1.1%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=92996&region=uk&timePeriod=2026&baseline=1) |

The analysis shows that the Gini coefficient decreases by 0.2% at £100/tonne but increases by 0.4% at £200/tonne. The income share of the top 10% and top 1% declines under both scenarios.

## Constituency-level analysis

This section presents a geographical analysis of how carbon dividend policies affect different UK constituencies. Figures 5-8 illustrate the distribution of income changes across UK constituencies for each scenario in 2026-27.

### £100/tonne carbon dividend:

The £100/tonne carbon dividend [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.constituencies.relative&reform=92873&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=true) geographically concentrated benefits, with urban constituencies experiencing the largest gains.

**Figure 5**: £100/tonne carbon dividend constituency map

![](/images/posts/uk-carbon-tax/carbon-tax-100.png)

The regional breakdown shows that England benefits most from the £100/tonne carbon dividend, while Wales faces losses across all constituencies.

**Figure 6**: Constituency distribution by region

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
      "x": [40.8, 45.1, 0, 22.8, 38.9],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#C5D3E8"},
      "text": ["265", "245", "", "13", "7"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 12},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{customdata} constituencies (%{x:.1f}%)<extra></extra>",
      "customdata": [265, 245, 0, 13, 7]
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [20.0, 20.1, 0, 29.8, 22.2],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#F0F0F0"},
      "text": ["130", "109", "", "17", "4"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 12},
      "hovertemplate": "%{y}<br>No change: %{customdata} constituencies (%{x:.1f}%)<extra></extra>",
      "customdata": [130, 109, 0, 17, 4]
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [39.2, 34.8, 100, 47.4, 38.9],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#A0A0A0"},
      "text": ["255", "189", "32", "27", "7"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 12},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{customdata} constituencies (%{x:.1f}%)<extra></extra>",
      "customdata": [255, 189, 32, 27, 7]
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
    "title": {
      "text": "",
      "font": {"family": "Roboto Serif", "size": 16},
      "x": 0,
      "xanchor": "left"
    },
    "barmode": "stack",
    "xaxis": {
      "title": "Constituency share",
      "titlefont": {"family": "Roboto Serif"},
      "tickfont": {"family": "Roboto Serif"},
      "ticksuffix": "%",
      "showgrid": false,
      "range": [0, 100]
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
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine",
        "showarrow": false,
        "font": {"family": "Roboto Serif", "size": 10, "color": "#616161"}
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
    ]
  }
}
```

### £200/tonne carbon dividend:

The higher carbon tax rate [amplifies](https://legacy.policyengine.org/uk/policy?focus=policyOutput.constituencies.relative&reform=92996&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=true) the geographical patterns, with more constituencies experiencing gains.

**Figure 7**: £200/tonne carbon dividend constituency map

![](/images/posts/uk-carbon-tax/carbon-tax-200.png)

At the £200/tonne rate, 294 constituencies gain compared to 265 at the £100/tonne rate, with 60 constituencies showing no change.

**Figure 8**: Constituency distribution by region

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
      "x": [45.2, 49.5, 0, 31.6, 38.9],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#C5D3E8"},
      "text": ["294", "269", "", "18", "7"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 12},
      "hovertemplate": "%{y}<br>Gain less than 5%: 294 constituencies (%{x:.1f}%)<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [9.2, 9.6, 0, 14.0, 0],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#F0F0F0"},
      "text": ["60", "52", "", "8", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 12},
      "hovertemplate": "%{y}<br>No change: 60 constituencies (%{x:.1f}%)<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [45.5, 40.9, 100, 54.4, 61.1],
      "y": ["All", "England", "Wales", "Scotland", "Northern Ireland"],
      "marker": {"color": "#A0A0A0"},
      "text": ["296", "222", "32", "31", "11"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 12},
      "hovertemplate": "%{y}<br>Loss less than 5%: 296 constituencies (%{x:.1f}%)<extra></extra>"
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
    "title": {
      "text": "",
      "font": {"family": "Roboto Serif", "size": 16},
      "x": 0,
      "xanchor": "left"
    },
    "barmode": "stack",
    "xaxis": {
      "title": "Constituency share",
      "titlefont": {"family": "Roboto Serif"},
      "tickfont": {"family": "Roboto Serif"},
      "ticksuffix": "%",
      "showgrid": false,
      "range": [0, 100]
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
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: PolicyEngine",
        "showarrow": false,
        "font": {"family": "Roboto Serif", "size": 10, "color": "#616161"}
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
    ]
  }
}
```

The constituency analysis shown in Figures 5-8 reveals geographical variation in policy impacts. Wales consistently shows negative impacts, with all 32 constituencies experiencing losses in both scenarios. England shows the greatest number of benefiting constituencies, with 245 gaining at £100/tonne and 269 gaining at £200/tonne. Scotland shows mixed results with 13-18 constituencies gaining, while Northern Ireland has 7 constituencies gaining under both scenarios.

### Areas with largest gains and losses

The constituencies experiencing the largest gains (as a share of net income) include urban areas such as Birmingham Ladywood, Bradford West, Bradford East, Nottingham East, and Leeds South. Conversely, constituencies in Wales and affluent areas face the largest losses (as a share of net income), including Monmouthshire, Cardiff North, and Vale of Glamorgan. This geographical variation reflects differences in local income distributions and carbon consumption patterns across UK constituencies.

## Conclusion

Our analysis shows that carbon dividend policies would benefit approximately 71% of UK residents across both £100/tonne and £200/tonne scenarios in 2026-27. The £100/tonne rate would reduce poverty by 0.3% overall, while the £200/tonne rate would reduce poverty by 0.5% overall.

Lower-income households in deciles 1-6 would see net income gains under both scenarios, while higher-income households in deciles 8-10 would experience net losses. The geographic distribution reveals 265 constituencies gaining at £100/tonne and 294 at £200/tonne in 2026-27.

We invite you to explore the [PolicyEngine webapp](https://legacy.policyengine.org/) to model your own customised carbon tax and dividend reforms.
