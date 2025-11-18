## Introduction

The Times [reported](https://www.thetimes.com/uk/politics/article/rachel-reeves-budget-watchdog-raise-income-tax-plan-sr2wd8mp7) that Chancellor Rachel Reeves informed the Office for Budget Responsibility on November 6 that she planned to increase the basic and higher income tax rates by 2 percentage points (from 20% to 22% and from 40% to 42%), reduce National Insurance contributions from 8% to 6%, and extend the income tax threshold freeze to 2029-30; current law already [freezes](https://www.gov.uk/government/publications/the-personal-allowance-and-basic-rate-limit-for-income-tax-and-certain-national-insurance-contributions-nics-thresholds-from-6-april-2026-to-5-apr/income-tax-personal-allowance-and-the-basic-rate-limit-and-certain-national-insurance-contributions-thresholds-from-6-april-2026-to-5-april-2028) thresholds until 2027-28. The Financial Times subsequently [reported](https://www.ft.com/content/6cbb46b1-c075-453b-a9f9-7eb1e9120d9b) that Reeves did not include the income tax and National Insurance changes in her November 13 submission to the OBR, ahead of the November 26 Autumn Budget. Together, the first two reforms would raise net revenue of £6.9 billion in 2026-27: workers would face partially offsetting changes (lower National Insurance, higher income tax), while pensioners and landlords would pay only the income tax increase. The threshold freeze would raise revenue through fiscal drag as inflation pushes more income into higher tax brackets.

This analysis examines each reform option using PolicyEngine's microsimulation model to assess their potential impacts on government revenue, household finances, and poverty rates. We model the reforms individually to understand their effects on different income groups and the overall economy.

## Budgetary impact

Figure 1 shows the change in government revenue from each reform across fiscal years 2026-27 through 2029-30. Reducing the National Insurance rate from 8% to 6% would cost [£11.7 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) in 2026-27, while increasing the basic and higher income tax rates by 2 percentage points would raise [£18.6 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) in 2026-27. Extending the threshold freeze to 2029-30 would raise [£3.5 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) in 2028-29, when thresholds would otherwise be unfrozen after the existing freeze through 2027-28.

**Figure 1: Change in government revenue by reform, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [6.9, 7.3, 11.3, 15.5],
      "type": "bar",
      "name": "Combined",
      "marker": {
        "color": "#B0B0B0",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "%{x}<br>Combined: £%{y:.1f}bn<extra></extra>"
    },
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [-11.7, -12.0, -12.3, -12.7],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "NI reduction",
      "line": {
        "color": "#2C6496",
        "width": 2
      },
      "marker": {
        "size": 6,
        "color": "#2C6496"
      },
      "hovertemplate": "%{x}<br>NI reduction: £%{y:.1f}bn<extra></extra>"
    },
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [18.6, 19.3, 19.9, 20.6],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "Income tax increase",
      "line": {
        "color": "#D32F2F",
        "width": 2
      },
      "marker": {
        "size": 6,
        "color": "#D32F2F"
      },
      "hovertemplate": "%{x}<br>Income tax increase: £%{y:.1f}bn<extra></extra>"
    },
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [0.0, 0.0, 3.5, 7.2],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "Threshold freeze extension",
      "line": {
        "color": "#388E3C",
        "width": 2,
        "dash": "dash"
      },
      "marker": {
        "size": 6,
        "color": "#388E3C"
      },
      "hovertemplate": "%{x}<br>Threshold freeze: £%{y:.1f}bn<extra></extra>"
    }
  ],
  "layout": {
    "xaxis": {
      "title": "Fiscal year",
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
      "title": "Change in government revenue (£ billions)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1,
      "zeroline": true,
      "zerolinecolor": "#333",
      "zerolinewidth": 2
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
    "legend": {
      "x": 0.5,
      "y": -0.25,
      "xanchor": "center",
      "yanchor": "top",
      "orientation": "h",
      "font": {
        "family": "Roboto Serif",
        "size": 12
      },
      "bgcolor": "rgba(255,255,255,0.8)"
    },
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

The Times [reported](https://www.thetimes.com/uk/politics/article/rachel-reeves-budget-watchdog-raise-income-tax-plan-sr2wd8mp7) that an expected Office for Budget Responsibility productivity forecast downgrade would create an estimated £30 billion shortfall in fiscal headroom—the amount needed to meet fiscal rules while maintaining adequate buffers against future economic shocks—that Reeves sought to address with these options. The combined package of income tax increases and National Insurance reductions would raise [£6.9 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.budgetaryImpact&reform=94911&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=false&simYears=5) in 2026-27, rising to £15.5 billion by 2029-30, while the threshold freeze extension would contribute additional revenue in later years.

## Distributional impact

### National Insurance rate reduction (8% to 6%)

Figure 2 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) the relative change in household income by income decile from reducing the National Insurance rate from 8% to 6% in 2026-27. Higher-income deciles experience larger percentage increases, with deciles 8 and 9 each gaining 1.1% in household income, while the lowest income decile gains 0.1%.

**Figure 2: Change in household income by income decile from National Insurance rate reduction, 2026-27**

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

Figure 3 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) the relative change in household income by income decile from increasing the basic and higher income tax rates by 2 percentage points in 2026-27. All income deciles experience decreases in household income, with deciles 8 and 9 seeing the largest reductions of 1.5% to 1.6%, while the lowest income decile decreases by 0.2%.

**Figure 3: Change in household income by income decile from basic and higher rate income tax increase, 2026-27**

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

Figure 4 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) the relative change in household income by income decile from extending the threshold freeze to 2029-30. All income deciles experience decreases in household income, with decile 9 seeing the largest reduction of 0.32%, while the lowest income decile decreases by 0.08%.

**Figure 4: Change in household income by income decile from threshold freeze extension, 2028-29**

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

### Combined reform impact

Figure 5 shows the relative change in household income by income decile from each reform component across fiscal years 2026-27 through 2029-30. The combined effect (gray bars) [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.distributionalImpact.incomeDecile.relative&reform=94911&region=uk&timePeriod=2029&baseline=1&uk_local_areas_beta=false) the net impact, while individual components are shown as lines: the National Insurance reduction (blue) provides gains across all deciles, the income tax increase (red) reduces income for all deciles, and the threshold freeze extension (green dashed line) has no effect until 2028-29. Use the play button to animate between years or drag the slider to view a specific year.

**Figure 5: Change in household income by reform component, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [-0.0008404643377922063, -0.001172374718198446, -0.0010744446884733457, -0.001778002685614101, -0.001990429749908251, -0.002361145498149557, -0.0031083137415573348, -0.003578224564197467, -0.004824496731617453, -0.008670772518602776],
      "type": "bar",
      "name": "Combined",
      "marker": {
        "color": "#616161",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Combined: %{y:.2%}<extra></extra>"
    },
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0.001, 0.002, 0.003, 0.005, 0.007, 0.008, 0.010, 0.011, 0.011, 0.006],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "NI reduction",
      "line": {
        "color": "#2C6496",
        "width": 2
      },
      "marker": {
        "size": 6,
        "color": "#2C6496"
      },
      "hovertemplate": "Decile %{x}<br>NI reduction: +%{y:.1%}<extra></extra>"
    },
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [-0.002, -0.004, -0.004, -0.006, -0.009, -0.011, -0.013, -0.015, -0.016, -0.015],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "Income tax increase",
      "line": {
        "color": "#D32F2F",
        "width": 2
      },
      "marker": {
        "size": 6,
        "color": "#D32F2F"
      },
      "hovertemplate": "Decile %{x}<br>Income tax increase: %{y:.1%}<extra></extra>"
    },
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "Threshold freeze extension",
      "line": {
        "color": "#388E3C",
        "width": 2,
        "dash": "dash"
      },
      "marker": {
        "size": 6,
        "color": "#388E3C"
      },
      "hovertemplate": "Decile %{x}<br>Threshold freeze: %{y:.1%}<extra></extra>"
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
      "gridwidth": 1,
      "range": [-0.02, 0.012],
      "zeroline": true,
      "zerolinecolor": "#333",
      "zerolinewidth": 2
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
    "legend": {
      "x": 0.5,
      "y": -0.25,
      "xanchor": "center",
      "yanchor": "top",
      "orientation": "h",
      "font": {
        "family": "Roboto Serif",
        "size": 12
      },
      "bgcolor": "rgba(255,255,255,0.8)"
    },
    "updatemenus": [
      {
        "buttons": [
          {
            "args": [null, {
              "frame": {"duration": 2000, "redraw": false},
              "fromcurrent": true,
              "transition": {"duration": 1000, "easing": "quadratic-in-out"}
            }],
            "label": "▶ Play",
            "method": "animate"
          }
        ],
        "direction": "left",
        "pad": {"r": 10, "t": 10},
        "showactive": false,
        "type": "buttons",
        "x": 0.1,
        "xanchor": "left",
        "y": 1.18,
        "yanchor": "middle"
      }
    ],
    "sliders": [
      {
        "active": 0,
        "yanchor": "middle",
        "xanchor": "center",
        "currentvalue": {
          "font": {"size": 16, "family": "Roboto Serif"},
          "prefix": "Year: ",
          "visible": false,
          "xanchor": "center"
        },
        "transition": {"duration": 800, "easing": "cubic-in-out"},
        "pad": {"b": 10, "t": 10, "l": 100},
        "len": 0.6,
        "x": 0.5,
        "y": 1.18,
        "steps": [
          {
            "args": [["2026-27"], {
              "frame": {"duration": 800, "redraw": false},
              "mode": "immediate",
              "transition": {"duration": 800}
            }],
            "label": "2026-27",
            "method": "animate"
          },
          {
            "args": [["2027-28"], {
              "frame": {"duration": 800, "redraw": false},
              "mode": "immediate",
              "transition": {"duration": 800}
            }],
            "label": "2027-28",
            "method": "animate"
          },
          {
            "args": [["2028-29"], {
              "frame": {"duration": 800, "redraw": false},
              "mode": "immediate",
              "transition": {"duration": 800}
            }],
            "label": "2028-29",
            "method": "animate"
          },
          {
            "args": [["2029-30"], {
              "frame": {"duration": 800, "redraw": false},
              "mode": "immediate",
              "transition": {"duration": 800}
            }],
            "label": "2029-30",
            "method": "animate"
          }
        ]
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
  },
  "frames": [
    {
      "name": "2026-27",
      "data": [
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0008404643377922063, -0.001172374718198446, -0.0010744446884733457, -0.001778002685614101, -0.001990429749908251, -0.002361145498149557, -0.0031083137415573348, -0.003578224564197467, -0.004824496731617453, -0.008670772518602776]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [0.001, 0.002, 0.003, 0.005, 0.007, 0.008, 0.010, 0.011, 0.011, 0.006]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.002, -0.004, -0.004, -0.006, -0.009, -0.011, -0.013, -0.015, -0.016, -0.015]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    },
    {
      "name": "2027-28",
      "data": [
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0009034144990075913, -0.0011466299017517127, -0.0013402245914201079, -0.0018393297857669856, -0.00219013611058554, -0.002432533780166643, -0.003362550544922168, -0.0038197668868537463, -0.005202130591101457, -0.00880031746533969]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [0.001514917669324894, 0.0026599542845124834, 0.00311645118075411, 0.004738438927208677, 0.007331494052846933, 0.008221426306114665, 0.009877643936161248, 0.011192869676190757, 0.011280868067275268, 0.00632915711648]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0022661948150679303, -0.0037943045707877518, -0.00443149674026318, -0.006541237373689673, -0.009518683123279977, -0.010648530561395886, -0.013240423707335984, -0.01500775596839262, -0.01648303516416866, -0.01512960376800393]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    },
    {
      "name": "2028-29",
      "data": [
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0017683485611327953, -0.00259554598252653, -0.0029205119936799103, -0.0036164277274954924, -0.004123153134820119, -0.004800676184344943, -0.00586377415324342, -0.006354432137631925, -0.009031157801543076, -0.01094196415734078]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [0.0015331749629684049, 0.002702007039579483, 0.003175455109597322, 0.004747349811383466, 0.007035690826921812, 0.00865968848234345, 0.010109936011707467, 0.011470002093978469, 0.011212398456155832, 0.006314265716721235]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0024744917486270437, -0.003866211598972672, -0.004502002112104917, -0.0066209759850566555, -0.0092253291937919, -0.011262597040863655, -0.013572398265059408, -0.01497593220905118, -0.016879849361857907, -0.015140639270831261]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0008, -0.0013, -0.0014, -0.0016, -0.0018, -0.0020, -0.0022, -0.0027, -0.0032, -0.0021]
        }
      ]
    },
    {
      "name": "2029-30",
      "data": [
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.002659026986271291, -0.0038102009408676786, -0.004794641694754507, -0.005419598185330531, -0.0061751703691525295, -0.007042308595007999, -0.008490922120223345, -0.009860542068948215, -0.012435158385416452, -0.013030468024998767]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [0.00154468397309933, 0.0026226465619254118, 0.00324023391209549, 0.004862756215357796, 0.007229599784563245, 0.008885433561750065, 0.0101550642438065, 0.011652099131287138, 0.011268491168533214, 0.006317902174273791]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0025250084572074048, -0.0035529003706007397, -0.004837330586559224, -0.00676379542456162, -0.009484464371582554, -0.01147321138367515, -0.013771340118193372, -0.015565818120361997, -0.016881222656571472, -0.015160517019831583]
        },
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0015458225723352281, -0.0026502102076757933, -0.002904189278252138, -0.003204420718509267, -0.003636451551620021, -0.0041527558116686855, -0.00456836067211672, -0.005670585705797827, -0.006580958244817833, -0.004091999128675859]
        }
      ]
    }
  ]
}
```

## Winners and losers

### National Insurance rate reduction (8% to 6%)

Figure 6 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) the distribution of income changes from reducing the National Insurance rate. Across the population, 3% gain more than 5% in income, 60% gain less than 5%, and 37% experience no change. The share gaining income ranges from 17% in the lowest decile to 85% in decile 9.

**Figure 6: Population share by income change from National Insurance rate reduction, 2026-27**

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

Figure 7 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) the distribution of income changes from increasing the basic and higher income tax rates. Across the population, 26% experience no change, 64% lose less than 5%, and 10% lose more than 5%. The share losing more than 5% ranges from 4% in the lowest decile to 31% in the highest decile.

**Figure 7: Population share by income change from basic and higher rate income tax increase, 2026-27**

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

Figure 8 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) the distribution of income changes from extending the threshold freeze. Across the population, 20% experience no change, 77% lose less than 5%, and 3% lose more than 5%. The share experiencing income loss ranges from 28% in the lowest decile to 93% in decile 9.

**Figure 8: Population share by income change from threshold freeze extension, 2028-29**

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

Table 1 shows the change in absolute before-housing-costs poverty rate for each reform. Reducing the National Insurance rate from 8% to 6% would reduce the overall poverty rate by [0.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) in 2026-27. Increasing the basic and higher income tax rates by 2 percentage points would raise the overall poverty rate by [1.7%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94910&region=uk&timePeriod=2026&baseline=1) in 2026-27. Extending the threshold freeze to 2029-30 would raise the overall poverty rate by [0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) in 2028-29 (current law already freezes thresholds until 2027-28).

**Table 1: Poverty impact by reform**

| Reform                                            | Year    | Change in poverty rate                                                                                                                  |
| ------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| NI rate reduction (8% to 6%)                      | 2026-27 | [-0.2%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) |
| Income tax increase (basic and higher rates +2pp) | 2026-27 | [+1.7%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) |
| Threshold freeze extension                        | 2028-29 | [+0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) |

## Inequality impact

The three reforms show minimal change in the Gini index, with the National Insurance rate reduction producing a [0.1%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) increase in 2026-27, the income tax increase producing a [0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94910&region=uk&timePeriod=2026&baseline=1) decrease in 2026-27, and the threshold freeze extension having [no impact](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) on income inequality in 2028-29 (current law already freezes thresholds until 2027-28).

## Conclusion

Increasing the basic and higher income tax rates by 2 percentage points would raise £18.6 billion in 2026-27 but increase absolute before-housing-costs poverty by 1.7% and reduce the Gini index by 0.3%, while reducing National Insurance from 8% to 6% would cost £11.7 billion and reduce poverty by 0.2%. Extending the threshold freeze to 2029-30 would raise £3.5 billion in 2028-29 and increase poverty by 0.3%.
