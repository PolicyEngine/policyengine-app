## Introduction

The Times [reported](https://www.thetimes.com/uk/politics/article/rachel-reeves-budget-watchdog-raise-income-tax-plan-sr2wd8mp7) that Chancellor Rachel Reeves informed the Office for Budget Responsibility on November 6 that she planned to increase the basic and higher income tax rates by 2 percentage points (from 20% to 22% and from 40% to 42%), reduce National Insurance contributions from 8% to 6%, and extend the income tax threshold freeze to 2029-30. The Financial Times subsequently [reported](https://www.thetimes.com/uk/politics/article/rachel-reeves-ditches-tax-raid-doctors-lawyers-f8hbbn7s3) that Reeves did not include the income tax and National Insurance changes in her November 13 submission to the OBR, ahead of the November 26 Autumn Budget. Together, the first two reforms would raise net revenue of £6.9 billion in 2026-27: workers would face partially offsetting changes (lower National Insurance, higher income tax), while pensioners and landlords would pay only the income tax increase. The threshold freeze would raise revenue through fiscal drag as inflation pushes more income into higher tax brackets.

This analysis examines each reform option using PolicyEngine's microsimulation model to assess their potential impacts on government revenue, household finances, and poverty rates. We model the reforms individually to understand their effects on different income groups and the overall economy.

## Budgetary impact

Table 1 shows the budgetary impact of each reform across fiscal years 2026-27 through 2029-30. Reducing the National Insurance rate from 8% to 6% would cost [£11.7 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) in 2026-27, while increasing the basic and higher income tax rates by 2 percentage points would raise [£18.6 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) in 2026-27. Extending the threshold freeze to 2029-30 would raise [£3.5 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) in 2028-29, when thresholds would otherwise be unfrozen after the existing freeze through 2027-28.

**Table 1: Budgetary impact by reform (£ billions)**

| Reform                                            | 2026-27                                                                                                                                                                    | 2027-28 | 2028-29                                                                                                                               | 2029-30 |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| NI rate reduction (8% to 6%)                      | [-11.7](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1)                                    | -12.0   | -12.3                                                                                                                                 | -12.7   |
| Income tax increase (basic and higher rates +2pp) | [18.6](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1)                                     | 19.3    | 19.9                                                                                                                                  | 20.6    |
| Threshold freeze extension                        | 0.0                                                                                                                                                                        | 0.0     | [3.5](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) | 7.2     |
| Combined                                          | [6.9](https://legacy.policyengine.org/uk/policy?focus=policyOutput.budgetaryImpact&reform=94911&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=false&simYears=5) | 7.3     | 11.3                                                                                                                                  | 15.5    |

The options were submitted amid an estimated [£30 billion](https://www.thetimes.com/uk/politics/article/rachel-reeves-budget-watchdog-raise-income-tax-plan-sr2wd8mp7) gap in public finances following a downgrade in productivity forecasts by the Office for Budget Responsibility. The combined package of income tax increases and National Insurance reductions would have raised £6.9 billion in 2026-27, rising to £15.5 billion by 2029-30, while the threshold freeze extension would have contributed additional revenue in later years.

## Distributional impact

### National Insurance rate reduction (8% to 6%)

Figure 1 shows the relative change in household income by income decile from reducing the National Insurance rate from 8% to 6% in 2026-27. Higher-income deciles experience larger percentage increases, with deciles 8 and 9 each gaining 1.1% in household income, while the lowest income decile gains 0.1%.

**Figure 1: Change in household income by income decile from National Insurance rate reduction, 2026-27**

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0.001, 0.002, 0.003, 0.005, 0.007, 0.008, 0.010, 0.011, 0.011, 0.006],
      "type": "bar",
      "marker": {
        "color": "#2C6496",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Change: +%{y:.1%}<extra></extra>",
      "text": ["+0.1%", "+0.2%", "+0.3%", "+0.5%", "+0.7%", "+0.8%", "+1.0%", "+1.1%", "+1.1%", "+0.6%"],
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
      "tickvals": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

### Income tax rate increase (basic and higher rates +2pp)

Figure 2 shows the relative change in household income by income decile from increasing the basic and higher income tax rates by 2 percentage points in 2026-27. All income deciles experience decreases in household income, with deciles 8 and 9 seeing the largest reductions of 1.5% to 1.6%, while the lowest income decile decreases by 0.2%.

**Figure 2: Change in household income by income decile from basic and higher rate income tax increase, 2026-27**

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [-0.002, -0.004, -0.004, -0.006, -0.009, -0.011, -0.013, -0.015, -0.016, -0.015],
      "type": "bar",
      "marker": {
        "color": "#616161",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Change: %{y:.1%}<extra></extra>",
      "text": ["-0.2%", "-0.4%", "-0.4%", "-0.6%", "-0.9%", "-1.1%", "-1.3%", "-1.5%", "-1.6%", "-1.5%"],
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
      "tickvals": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
      "tickformat": ".1%",
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

### Threshold freeze extension

Figure 3 shows the relative change in household income by income decile from extending the threshold freeze to 2029-30. All income deciles experience decreases in household income, with decile 9 seeing the largest reduction of 0.32%, while the lowest income decile decreases by 0.08%.

**Figure 3: Change in household income by income decile from threshold freeze extension, 2028-29**

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [-0.0008, -0.0013, -0.0014, -0.0016, -0.0018, -0.0020, -0.0022, -0.0027, -0.0032, -0.0021],
      "type": "bar",
      "marker": {
        "color": "#616161",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Change: %{y:.2%}<extra></extra>",
      "text": ["-0.08%", "-0.13%", "-0.14%", "-0.16%", "-0.18%", "-0.20%", "-0.22%", "-0.27%", "-0.32%", "-0.21%"],
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
      "tickvals": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
      "tickformat": ".2%",
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

## Winners and losers

### National Insurance rate reduction (8% to 6%)

Figure 4 shows the distribution of income changes from reducing the National Insurance rate. Across the population, 3% gain more than 5% in income, 60% gain less than 5%, and 37% experience no change. The share gaining income ranges from 17% in the lowest decile to 85% in decile 9.

**Figure 4: Population share by income change from National Insurance rate reduction, 2026-27**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [3, 3, 6, 6, 5, 3, 2, 3, 1, 2, 2],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#2C6496"},
      "text": ["3%", "", "6%", "6%", "5%", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [60, 79, 79, 73, 76, 71, 64, 57, 45, 38, 15],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#C5D3E8"},
      "text": ["60%", "79%", "79%", "73%", "76%", "71%", "64%", "57%", "45%", "38%", "15%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [37, 18, 15, 21, 19, 26, 34, 40, 54, 60, 83],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#F0F0F0"},
      "text": ["37%", "18%", "15%", "21%", "19%", "26%", "34%", "40%", "54%", "60%", "83%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#A0A0A0"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#616161"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x}%<extra></extra>"
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
      "ticksuffix": "%",
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
      "tickvals": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
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

### Income tax rate increase (basic and higher rates +2pp)

Figure 5 shows the distribution of income changes from increasing the basic and higher income tax rates. Across the population, 26% experience no change, 64% lose less than 5%, and 10% lose more than 5%. The share losing more than 5% ranges from 4% in the lowest decile to 31% in the highest decile.

**Figure 5: Population share by income change from basic and higher rate income tax increase, 2026-27**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#2C6496"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#C5D3E8"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [26, 6, 10, 13, 11, 15, 19, 26, 35, 47, 77],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#F0F0F0"},
      "text": ["26%", "6%", "10%", "13%", "11%", "15%", "19%", "26%", "35%", "47%", "77%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [64, 63, 74, 72, 80, 79, 77, 67, 62, 49, 19],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#A0A0A0"},
      "text": ["64%", "63%", "74%", "72%", "80%", "79%", "77%", "67%", "62%", "49%", "19%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [10, 31, 16, 15, 9, 6, 4, 6, 3, 4, 4],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#616161"},
      "text": ["10%", "31%", "16%", "15%", "9%", "6%", "", "6%", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x}%<extra></extra>"
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
      "ticksuffix": "%",
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
      "tickvals": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
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

### Threshold freeze extension

Figure 6 shows the distribution of income changes from extending the threshold freeze. Across the population, 20% experience no change, 77% lose less than 5%, and 3% lose more than 5%. The share experiencing income loss ranges from 28% in the lowest decile to 93% in decile 9.

**Figure 6: Population share by income change from threshold freeze extension, 2026-27**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#2C6496"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#C5D3E8"},
      "text": ["", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [20, 7, 1, 4, 4, 8, 14, 26, 27, 40, 72],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#F0F0F0"},
      "text": ["20%", "7%", "", "", "", "8%", "14%", "26%", "27%", "40%", "72%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [77, 90, 96, 92, 92, 90, 84, 71, 70, 58, 27],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#A0A0A0"},
      "text": ["77%", "90%", "96%", "92%", "92%", "90%", "84%", "71%", "70%", "58%", "27%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [3, 3, 3, 4, 4, 2, 2, 3, 3, 2, 1],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#616161"},
      "text": ["3%", "3%", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x}%<extra></extra>"
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
      "ticksuffix": "%",
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
      "tickvals": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
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

Table 2 shows the change in overall poverty rate for each reform in 2026-27. Reducing the National Insurance rate from 8% to 6% would reduce the overall poverty rate by [0.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) in 2026-27. Increasing the basic and higher income tax rates by 2 percentage points would raise the overall poverty rate by [1.7%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94910&region=uk&timePeriod=2026&baseline=1) in 2026-27. Extending the threshold freeze to 2029-30 would raise the overall poverty rate by [0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) in 2028-29.

**Table 2: Poverty impact by reform**

| Reform                                            | Change in poverty rate |
| ------------------------------------------------- | ---------------------- |
| NI rate reduction (8% to 6%)                      | -0.2%                  |
| Income tax increase (basic and higher rates +2pp) | 1.7%                   |
| Threshold freeze extension                        | 0.3%                   |

## Inequality impact

The three reforms show minimal change in the Gini index, with the National Insurance rate reduction producing a [0.1%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) increase, the income tax increase producing a [0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94910&region=uk&timePeriod=2026&baseline=1) decrease, and the threshold freeze extension having [no impact](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) on income inequality.

## Conclusion

Increasing the basic and higher income tax rates by 2 percentage points would raise £18.6 billion in 2026-27 but increase poverty by 1.7% and reduce the Gini index by 0.3%, while reducing National Insurance from 8% to 6% would cost £11.7 billion and reduce poverty by 0.2%. Extending the threshold freeze to 2029-30 would raise £3.5 billion in 2028-29 and increase poverty by 0.3%.
