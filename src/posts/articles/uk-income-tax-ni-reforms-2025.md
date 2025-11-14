## Introduction

Chancellor Rachel Reeves [submitted](https://www.thetimes.com/uk/politics/article/rachel-reeves-budget-watchdog-raise-income-tax-plan-sr2wd8mp7) plans to the Office for Budget Responsibility involving three potential tax reforms: [increasing](https://www.thetimes.com/uk/politics/article/rachel-reeves-ditches-tax-raid-doctors-lawyers-f8hbbn7s3) the basic rate of income tax from 20% to 22%, reducing National Insurance contributions from 8% to 6%, and extending the income tax threshold freeze to 2029-30. The first two reforms would shift the tax burden from workers to groups not subject to National Insurance, including pensioners and landlords, while the threshold freeze would raise revenue through fiscal drag as inflation pushes more income into higher tax brackets.

This analysis examines each reform using PolicyEngine's microsimulation model to assess impacts on government revenue, household finances, and poverty rates. We model the reforms individually to understand their effects on different income groups and the overall economy.

## Budgetary impact

Table 1 shows the budgetary impact of each reform across fiscal years 2026-27 through 2030-31. Reducing the National Insurance rate from 8% to 6% would cost [£11.7 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) in 2026-27, while increasing the income tax rate from 20% to 22% would raise [£14.5 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94361&region=uk&timePeriod=2026&baseline=1) in 2026-27. Extending the threshold freeze to 2029-30 would raise [£3.5 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) in 2028-29, when thresholds would otherwise be unfrozen after the existing freeze through 2027-28. Combined, all three reforms would raise [£37.7 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.budgetaryImpact&reform=94908&region=uk&timePeriod=2026&baseline=1&simYears=5) from 2026-27 to 2030-31.

**Table 1: Budgetary impact by reform (£ billions)**

| Reform                           | 2026-27                                                                                                                                 | 2027-28 | 2028-29                                                                                                                                | 2029-30 | 2030-31 | 2026-31                                                                                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| NI rate reduction (8% to 6%)     | [-11.7](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) | -12.0   | -12.3                                                                                                                                  | -12.7   | -13.1   | -61.8                                                                                                                                              |
| Income tax increase (20% to 22%) | [+14.5](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94361&region=uk&timePeriod=2026&baseline=1) | +14.9   | +15.4                                                                                                                                  | +15.9   | +16.5   | +77.3                                                                                                                                              |
| Threshold freeze extension       | 0.0                                                                                                                                     | 0.0     | [+3.5](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) | +7.2    | +11.0   | +22.0                                                                                                                                              |
| Combined                         | +2.8                                                                                                                                    | +3.0    | +6.6                                                                                                                                   | +10.5   | +14.7   | [+37.7](https://legacy.policyengine.org/uk/policy?focus=policyOutput.budgetaryImpact&reform=94908&region=uk&timePeriod=2026&baseline=1&simYears=5) |

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

### Income tax rate increase (20% to 22%)

Figure 2 shows the relative change in household income by income decile from increasing the income tax rate from 20% to 22% in 2026-27. All income deciles experience decreases in household income, with deciles 7, 8, and 9 seeing the largest reductions of 1.2% to 1.3%, while the lowest income decile decreases by 0.2%.

**Figure 2: Change in household income by income decile from income tax rate increase, 2026-27**

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [-0.002, -0.004, -0.004, -0.006, -0.008, -0.010, -0.012, -0.013, -0.013, -0.008],
      "type": "bar",
      "marker": {
        "color": "#616161",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Change: %{y:.1%}<extra></extra>",
      "text": ["-0.2%", "-0.4%", "-0.4%", "-0.6%", "-0.8%", "-1.0%", "-1.2%", "-1.3%", "-1.3%", "-0.8%"],
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

Figure 4 shows that 63% of the population would see income gains from reducing the National Insurance rate. Across all income deciles, 3% of the population gains more than 5% in income, while 60% gain less than 5%. The distribution of winners varies across deciles, with higher-income deciles showing larger shares of gainers.

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

### Income tax rate increase (20% to 22%)

Figure 5 shows that 74.1% of the population would see income decreases from increasing the income tax rate. Across all income deciles, less than 0.1% of the population gains income, while 26% experience gains less than 5%, 68% see no change, and 6% lose more than 5%.

**Figure 5: Population share by income change from income tax rate increase, 2026-27**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#2C6496"},
      "text": ["", "6%", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [26, 0, 10, 13, 11, 15, 19, 26, 35, 47, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#C5D3E8"},
      "text": ["26%", "", "10%", "13%", "11%", "15%", "19%", "26%", "35%", "47%", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [68, 86, 81, 77, 81, 79, 77, 68, 62, 49, 77],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#F0F0F0"},
      "text": ["68%", "86%", "81%", "77%", "81%", "79%", "77%", "68%", "62%", "49%", "77%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 19],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#A0A0A0"},
      "text": ["", "", "", "", "", "", "", "", "", "", "19%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [6, 8, 9, 9, 8, 6, 4, 6, 3, 4, 4],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#616161"},
      "text": ["6%", "8%", "9%", "9%", "8%", "6%", "", "6%", "", "", ""],
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

Figure 6 shows that 79.7% of the population would see income decreases from extending the threshold freeze. Across all income deciles, less than 0.1% of the population gains income, while 20% see no change, 77% lose less than 5%, and 3% lose more than 5%.

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
      "x": [0, 7, 0, 0, 0, 8, 14, 26, 27, 40, 0],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#C5D3E8"},
      "text": ["", "7%", "", "", "", "8%", "14%", "26%", "27%", "40%", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [20, 90, 96, 92, 92, 90, 84, 71, 70, 58, 72],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#F0F0F0"},
      "text": ["20%", "90%", "96%", "92%", "92%", "90%", "84%", "71%", "70%", "58%", "72%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>"
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [77, 0, 4, 8, 8, 2, 2, 3, 3, 2, 27],
      "y": ["All", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      "marker": {"color": "#A0A0A0"},
      "text": ["77%", "", "", "8%", "8%", "", "", "", "", "", "27%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>"
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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

Table 2 shows the change in overall poverty rate for each reform in 2026-27. Reducing the National Insurance rate from 8% to 6% would reduce the overall poverty rate by [0.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) in 2026-27. Increasing the income tax rate from 20% to 22% would raise the overall poverty rate by [1.7%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94361&region=uk&timePeriod=2026&baseline=1) in 2026-27. Extending the threshold freeze to 2029-30 would raise the overall poverty rate by [0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) in 2028-29.

**Table 2: Poverty impact by reform**

| Reform                           | Change in poverty rate |
| -------------------------------- | ---------------------- |
| NI rate reduction (8% to 6%)     | -0.2%                  |
| Income tax increase (20% to 22%) | +1.7%                  |
| Threshold freeze extension       | +0.3%                  |

## Inequality impact

The three reforms show no substantial change in the Gini index, with the National Insurance rate reduction producing a [0.1% increase](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) while the [income tax increase](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94361&region=uk&timePeriod=2026&baseline=1) and [threshold freeze extension](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) have no impact on income inequality.

## Conclusion

Increasing the basic income tax rate from 20% to 22% would raise £14.5 billion in 2026-27 but increase poverty by 1.7%, while reducing National Insurance from 8% to 6% would cost £11.7 billion and reduce poverty by 0.2%. Extending the threshold freeze to 2029-30 would raise £3.5 billion in 2028-29 and increase poverty by 0.3%. Combined, the three reforms would raise £37.7 billion from 2026-27 to 2030-31.
