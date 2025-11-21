## Introduction

The Times [reported](https://www.thetimes.com/uk/politics/article/rachel-reeves-budget-watchdog-raise-income-tax-plan-sr2wd8mp7) that Chancellor Rachel Reeves informed the Office for Budget Responsibility on November 6 that she planned to increase the basic and higher income tax rates by 2 percentage points (from 20% to 22% and from 40% to 42%), reduce National Insurance contributions from 8% to 6%, and extend the income tax threshold freeze to 2029-30; current law already [freezes](https://www.gov.uk/government/publications/the-personal-allowance-and-basic-rate-limit-for-income-tax-and-certain-national-insurance-contributions-nics-thresholds-from-6-april-2026-to-5-apr/income-tax-personal-allowance-and-the-basic-rate-limit-and-certain-national-insurance-contributions-thresholds-from-6-april-2026-to-5-april-2028) thresholds until 2027-28. The Financial Times subsequently [reported](https://www.ft.com/content/6cbb46b1-c075-453b-a9f9-7eb1e9120d9b) that Reeves did not include the income tax and National Insurance changes in her November 13 submission to the OBR, ahead of the November 26 Autumn Budget. Together, the first two reforms would raise net revenue of £6.9 billion in 2026-27: workers would face partially offsetting changes (lower National Insurance, higher income tax), while pensioners and landlords would pay only the income tax increase. The threshold freeze would raise revenue through fiscal drag as inflation pushes more income into higher tax brackets.

This analysis examines each reform option using PolicyEngine's microsimulation model to assess their potential impacts on government revenue, household finances, and poverty rates. Revenue impacts are modelled sequentially to capture interaction effects between reforms, while distributional impacts show each reform independently to understand their distinct effects on different income groups.

## Household impact

To understand how these reforms affect households, we first look at a step-by-step calculation for a specific example, and then examine how the impact varies with income.

### Example calculation

Consider a single earner with a gross income of £60,000 who contributes £10,000 (approx. 16.7%) to a workplace pension. We calculate their tax liabilities for the 2026-27 tax year under both the baseline (current law) and the proposed reform package. Note that in 2026-27, the proposed threshold freeze extension has not yet taken effect, so we focus on the rate changes: National Insurance (NI) reducing from 8% to 6%, and Income Tax (IT) increasing by 2 percentage points (20% to 22% basic, 40% to 42% higher).

**Table 1: Example tax calculation for a single earner (£60k gross, £10k pension)**

| Tax                                                  | Baseline (current law)                                   | Reform package                                           | Change                       |
| :--------------------------------------------------- | :------------------------------------------------------- | :------------------------------------------------------- | :--------------------------- |
| **National Insurance**<br>_(Gross earnings £60,000)_ | **£3,210.60**<br>8% on £12,570–£50,270<br>2% on >£50,270 | **£2,456.60**<br>6% on £12,570–£50,270<br>2% on >£50,270 | **-£754.00**<br>_(Tax cut)_  |
| **Income Tax**<br>_(Taxable income £50,000)_         | **£7,486.00**<br>20% on £12,570–£50,270                  | **£8,234.60**<br>22% on £12,570–£50,270                  | **+£748.60**<br>_(Tax rise)_ |
| **Total net impact**                                 |                                                          |                                                          | **+£5.40**<br>_(Better off)_ |

_Note: Pension contributions of £10,000 reduce taxable income for Income Tax but not for National Insurance._

### Varying earnings

The combined reform creates different outcomes for households depending on their income level. [Figure 1 shows how the net income change varies with gross household income](https://legacy.policyengine.org/uk/household?focus=householdOutput.earnings&reform=94911&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=false&household=56492), assuming a single earner making a £10,000 pension contribution.

**Figure 1: Change in household net income by gross income (with £10k pension contribution), 2026-27**

```plotly
{
  "data": [
    {
      "x": [0, 4000, 8000, 12000, 16000, 20000, 24000, 28000, 32000, 36000, 40000, 44000, 48000, 52000, 56000, 60000, 64000, 68000, 72000, 76000, 80000, 84000, 88000, 92000, 96000, 100000, 104000, 108000, 112000, 116000, 120000, 124000, 128000, 132000, 136000, 140000, 144000, 148000, 152000, 156000, 160000, 164000, 168000, 172000, 176000, 180000, 184000, 188000, 192000, 196000, 200000],
      "y": [0, 0, 0, 0, 68, 148, 200, 200, 200, 200, 200, 200, 200, 166, 86, 6, -74, -154, -234, -314, -394, -474, -554, -634, -714, -794, -914, -1034, -1154, -1274, -1394, -1514, -1606, -1686, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748, -1748],
      "type": "scatter",
      "mode": "lines",
      "line": {
        "color": "#2C6496",
        "width": 3
      },
      "hovertemplate": "Gross income: £%{x:,.0f}<br>Net income change: £%{y:,.0f}<extra></extra>"
    }
  ],
  "layout": {
    "xaxis": {
      "title": "Gross household income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": "£,.0f",
      "showgrid": true,
      "gridcolor": "#E5E5E5"
    },
    "yaxis": {
      "title": "Change in household net income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": "£,.0f",
      "showgrid": true,
      "gridcolor": "#E5E5E5",
      "zeroline": true,
      "zerolinecolor": "#333",
      "zerolinewidth": 2
    },
    "height": 500,
    "margin": {
      "l": 80,
      "r": 40,
      "b": 80,
      "t": 80,
      "pad": 4
    },
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa",
    "font": {
      "family": "Roboto Serif"
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

At low to moderate income levels (where the NI cut applies to most taxable earnings), households gain. However, as income rises, the Income Tax increase (which applies to all taxable income above the allowance) begins to outweigh the NI reduction (which is capped at the Upper Earnings Limit of £50,270).

Pension contributions affect how the reforms impact households. While they reduce taxable income for Income Tax, they do _not_ reduce earnings for National Insurance (except in salary sacrifice arrangements, which are not assumed here). A pension contribution lowers the amount of income exposed to the 2 percentage point Income Tax increase, while the household receives the National Insurance cut on their gross earnings. As a result, households with pension contributions face a smaller net tax increase than those without.

## Budgetary impact

Figure 2 shows the change in government revenue from each reform across fiscal years 2026-27 through 2029-30, using a stacking methodology where each reform is applied on top of the previous ones to capture interaction effects. The first reform, extending the threshold freeze to 2029-30, would raise [£3.5 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) in 2028-29, when thresholds would otherwise be unfrozen. The second reform, reducing the National Insurance rate from 8% to 6% applied on top of the freeze, would cost an additional [£11.7 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94938&region=uk&timePeriod=2026&baseline=83092) in 2026-27. The third reform, increasing the basic and higher income tax rates by 2 percentage points applied on top of both the freeze and NI reduction, would raise an additional [£18.6 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94911&region=uk&timePeriod=2026&baseline=94938) in 2026-27.

**Figure 2: Change in government revenue by reform, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [0, 0, 3.5, 7.2],
      "type": "bar",
      "name": "Threshold freeze extension",
      "marker": {
        "color": "#22C55E",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "%{x}<br>Threshold freeze: £%{y:.1f}bn<extra></extra>"
    },
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [-11.7, -12.0, -12.3, -12.7],
      "type": "bar",
      "name": "NI reduction (8% to 6%)",
      "marker": {
        "color": "#616161",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "%{x}<br>NI reduction: £%{y:.1f}bn<extra></extra>"
    },
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [18.6, 19.3, 20.1, 20.9],
      "type": "bar",
      "name": "Income tax increase (+2pp)",
      "marker": {
        "color": "#2C6496",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "%{x}<br>Income tax increase: £%{y:.1f}bn<extra></extra>"
    },
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [6.9, 7.3, 11.3, 15.4],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "Net combined effect",
      "line": {
        "color": "#000000",
        "width": 3
      },
      "marker": {
        "size": 8,
        "color": "#000000",
        "symbol": "diamond"
      },
      "hovertemplate": "%{x}<br>Net combined: £%{y:.1f}bn<extra></extra>"
    }
  ],
  "layout": {
    "barmode": "relative",
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

The Times [reported](https://www.thetimes.com/uk/politics/article/rachel-reeves-budget-watchdog-raise-income-tax-plan-sr2wd8mp7) that an expected Office for Budget Responsibility productivity forecast downgrade would create an estimated £30 billion shortfall in fiscal headroom—the amount needed to meet fiscal rules while maintaining adequate buffers against future economic shocks—that Reeves sought to address with these options. Following standard budget analysis practice, we apply a stacking methodology: each reform is modeled sequentially with the prior reforms already in effect, ensuring the individual components add to the combined total and capturing how reforms interact. The stacked bars show each reform's contribution, with the line showing the net combined effect. The combined package would raise [£6.9 billion](https://legacy.policyengine.org/uk/policy?focus=policyOutput.budgetaryImpact&reform=94911&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=false&simYears=5) in 2026-27, rising to £15.4 billion by 2029-30, with the threshold freeze extension contributing additional revenue in later years as fiscal drag increases.

## Distributional impact

The following distributional analyses show each reform independently against the baseline.

### National Insurance rate reduction (8% to 6%)

Figure 3 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) the relative change in household income by income decile from reducing the National Insurance rate from 8% to 6% in 2026-27. Higher-income deciles experience larger percentage increases, with deciles 8 and 9 each gaining 1.1% in household income, while the lowest income decile gains 0.1%.

**Figure 3: Change in household income by income decile from National Insurance rate reduction, 2026-27**

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

Figure 4 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) the relative change in household income by income decile from increasing the basic and higher income tax rates by 2 percentage points in 2026-27. All income deciles experience decreases in household income, with deciles 8 and 9 seeing the largest reductions of 1.5% to 1.6%, while the lowest income decile decreases by 0.2%.

**Figure 4: Change in household income by income decile from basic and higher rate income tax increase, 2026-27**

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

Figure 5 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) the relative change in household income by income decile from extending the threshold freeze to 2029-30. All income deciles experience decreases in household income, with decile 9 seeing the largest reduction of 0.32%, while the lowest income decile decreases by 0.08%.

**Figure 5: Change in household income by income decile from threshold freeze extension, 2028-29**

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

Figure 6 shows the relative change in household income by income decile from each reform component across fiscal years 2026-27 through 2029-30. The stacked bars show individual reform contributions: the threshold freeze extension (green), the National Insurance reduction (gray), and the income tax increase (blue). The line [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.distributionalImpact.incomeDecile.relative&reform=94911&region=uk&timePeriod=2029&baseline=1&uk_local_areas_beta=false) the net combined effect across deciles. Use the play button to animate between years or drag the slider to view a specific year.

**Figure 6: Change in household income by reform component, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "type": "bar",
      "name": "Threshold freeze extension",
      "marker": {
        "color": "#22C55E",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Threshold freeze: %{y:.1%}<extra></extra>"
    },
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [0.001, 0.002, 0.003, 0.005, 0.007, 0.008, 0.010, 0.011, 0.011, 0.006],
      "type": "bar",
      "name": "NI reduction (8% to 6%)",
      "marker": {
        "color": "#616161",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>NI reduction: +%{y:.1%}<extra></extra>"
    },
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [-0.002, -0.004, -0.004, -0.006, -0.009, -0.011, -0.013, -0.015, -0.016, -0.015],
      "type": "bar",
      "name": "Income tax increase (+2pp)",
      "marker": {
        "color": "#2C6496",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Income tax increase: %{y:.1%}<extra></extra>"
    },
    {
      "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "y": [-0.0008404643377922063, -0.001172374718198446, -0.0010744446884733457, -0.001778002685614101, -0.001990429749908251, -0.002361145498149557, -0.0031083137415573348, -0.003578224564197467, -0.004824496731617453, -0.008670772518602776],
      "type": "scatter",
      "mode": "lines+markers",
      "name": "Net combined effect",
      "line": {
        "color": "#000000",
        "width": 3
      },
      "marker": {
        "size": 8,
        "color": "#000000",
        "symbol": "diamond"
      },
      "hovertemplate": "Decile %{x}<br>Net combined: %{y:.2%}<extra></extra>"
    }
  ],
  "layout": {
    "barmode": "relative",
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
          "y": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
          "y": [-0.0008404643377922063, -0.001172374718198446, -0.0010744446884733457, -0.001778002685614101, -0.001990429749908251, -0.002361145498149557, -0.0031083137415573348, -0.003578224564197467, -0.004824496731617453, -0.008670772518602776]
        }
      ]
    },
    {
      "name": "2027-28",
      "data": [
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
          "y": [-0.0009034144990075913, -0.0011466299017517127, -0.0013402245914201079, -0.0018393297857669856, -0.00219013611058554, -0.002432533780166643, -0.003362550544922168, -0.0038197668868537463, -0.005202130591101457, -0.00880031746533969]
        }
      ]
    },
    {
      "name": "2028-29",
      "data": [
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0008, -0.0013, -0.0014, -0.0016, -0.0018, -0.0020, -0.0022, -0.0027, -0.0032, -0.0021]
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
          "y": [-0.0017683485611327953, -0.00259554598252653, -0.0029205119936799103, -0.0036164277274954924, -0.004123153134820119, -0.004800676184344943, -0.00586377415324342, -0.006354432137631925, -0.009031157801543076, -0.01094196415734078]
        }
      ]
    },
    {
      "name": "2029-30",
      "data": [
        {
          "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "y": [-0.0015458225723352281, -0.0026502102076757933, -0.002904189278252138, -0.003204420718509267, -0.003636451551620021, -0.0041527558116686855, -0.00456836067211672, -0.005670585705797827, -0.006580958244817833, -0.004091999128675859]
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
          "y": [-0.002659026986271291, -0.0038102009408676786, -0.004794641694754507, -0.005419598185330531, -0.0061751703691525295, -0.007042308595007999, -0.008490922120223345, -0.009860542068948215, -0.012435158385416452, -0.013030468024998767]
        }
      ]
    }
  ]
}
```

## Winners and losers

Winner and loser status varies within income deciles based on individual circumstances, particularly pension contributions. National Insurance applies to gross earnings before pension contributions, while income tax applies to earnings after pension contributions. Individuals with higher pension contribution rates gain more from National Insurance reductions and lose less from income tax increases compared to those with lower contribution rates at the same gross income level.

### National Insurance rate reduction (8% to 6%)

Figure 7 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94906&region=uk&timePeriod=2026&baseline=1) the distribution of income changes from reducing the National Insurance rate across fiscal years 2026-27 through 2029-30. In 2026-27, 3% gain more than 5% in income, 60% gain less than 5%, and 37% experience no change.

**Figure 7: Population share by income change from National Insurance rate reduction, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [2, 1, 2, 3, 2, 3, 5, 6, 6, 3, 0, 3],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#2C6496"},
      "text": ["2%", "", "2%", "3%", "2%", "3%", "5%", "6%", "6%", "3%", "", "3%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [15, 38, 44, 57, 64, 71, 76, 73, 79, 79, 0, 60],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#C5D3E8"},
      "text": ["15%", "38%", "44%", "57%", "64%", "71%", "76%", "73%", "79%", "79%", "", "60%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [83, 61, 54, 40, 34, 26, 19, 21, 15, 18, 0, 37],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#F0F0F0"},
      "text": ["83%", "61%", "54%", "40%", "34%", "26%", "19%", "21%", "15%", "18%", "", "37%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#A0A0A0"},
      "text": ["", "", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#616161"},
      "text": ["", "", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x}%<extra></extra>",
      "showlegend": true
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
      "type": "category",
      "categoryorder": "array",
      "categoryarray": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
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
          "font": {"size": 20, "family": "Roboto Serif"},
          "prefix": "Year: ",
          "visible": false,
          "xanchor": "center"
        },
        "transition": {"duration": 800, "easing": "cubic-in-out"},
        "pad": {"b": 15, "t": 15, "l": 100},
        "len": 0.75,
        "x": 0.5,
        "y": 1.18,
        "ticklen": 8,
        "tickwidth": 2,
        "tickcolor": "#333",
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
        {"x": [2, 1, 2, 3, 2, 3, 5, 6, 6, 3, 0, 3], "text": ["2%", "", "2%", "3%", "2%", "3%", "5%", "6%", "6%", "3%", "", "3%"]},
        {"x": [15, 38, 44, 57, 64, 71, 76, 73, 79, 79, 0, 60], "text": ["15%", "38%", "44%", "57%", "64%", "71%", "76%", "73%", "79%", "79%", "", "60%"]},
        {"x": [83, 61, 54, 40, 34, 26, 19, 21, 15, 18, 0, 37], "text": ["83%", "61%", "54%", "40%", "34%", "26%", "19%", "21%", "15%", "18%", "", "37%"]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]}
      ]
    },
    {
      "name": "2027-28",
      "data": [
        {"x": [2, 1, 2, 3, 2, 3, 6, 6, 6, 4, 0, 3], "text": ["2%", "", "2%", "3%", "2%", "3%", "6%", "6%", "6%", "4%", "", "3%"]},
        {"x": [16, 40, 44, 57, 67, 69, 75, 73, 79, 78, 0, 60], "text": ["16%", "40%", "44%", "57%", "67%", "69%", "75%", "73%", "79%", "78%", "", "60%"]},
        {"x": [82, 59, 54, 40, 31, 28, 19, 21, 15, 18, 0, 37], "text": ["82%", "59%", "54%", "40%", "31%", "28%", "19%", "21%", "15%", "18%", "", "37%"]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]}
      ]
    },
    {
      "name": "2028-29",
      "data": [
        {"x": [2, 1, 2, 3, 2, 3, 6, 7, 6, 4, 0, 4], "text": ["2%", "", "2%", "3%", "2%", "3%", "6%", "7%", "6%", "4%", "", "4%"]},
        {"x": [15, 40, 44, 56, 65, 72, 75, 74, 77, 78, 0, 59], "text": ["15%", "40%", "44%", "56%", "65%", "72%", "75%", "74%", "77%", "78%", "", "59%"]},
        {"x": [83, 59, 54, 41, 33, 25, 19, 19, 17, 18, 0, 37], "text": ["83%", "59%", "54%", "41%", "33%", "25%", "19%", "19%", "17%", "18%", "", "37%"]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]}
      ]
    },
    {
      "name": "2029-30",
      "data": [
        {"x": [2, 2, 2, 2, 4, 3, 7, 7, 6, 4, 0, 4], "text": ["2%", "2%", "2%", "2%", "4%", "3%", "7%", "7%", "6%", "4%", "", "4%"]},
        {"x": [15, 38, 45, 58, 63, 72, 74, 74, 77, 78, 0, 59], "text": ["15%", "38%", "45%", "58%", "63%", "72%", "74%", "74%", "77%", "78%", "", "59%"]},
        {"x": [83, 60, 53, 40, 33, 25, 19, 19, 17, 18, 0, 37], "text": ["83%", "60%", "53%", "40%", "33%", "25%", "19%", "19%", "17%", "18%", "", "37%"]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]}
      ]
    }
  ]
}
```

### Income tax rate increase (basic and higher rates +2pp)

Figure 8 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) the distribution of income changes from increasing the basic and higher income tax rates across fiscal years 2026-27 through 2029-30. In 2026-27, 26% experience no change, 64% lose less than 5%, and 10% lose more than 5%.

**Figure 8: Population share by income change from basic and higher rate income tax increase, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#2C6496"},
      "text": ["", "", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#C5D3E8"},
      "text": ["", "", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [77, 47, 35, 26, 19, 15, 11, 13, 10, 6, 0, 26],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#F0F0F0"},
      "text": ["77%", "47%", "35%", "26%", "19%", "15%", "11%", "13%", "10%", "6%", "", "26%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [19, 49, 62, 68, 77, 79, 80, 72, 74, 63, 0, 64],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#A0A0A0"},
      "text": ["19%", "49%", "62%", "68%", "77%", "79%", "80%", "72%", "74%", "63%", "", "64%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [4, 4, 3, 6, 4, 6, 9, 15, 16, 31, 0, 10],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#616161"},
      "text": ["4%", "4%", "3%", "6%", "4%", "6%", "9%", "15%", "16%", "31%", "", "10%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x}%<extra></extra>",
      "showlegend": true
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
      "type": "category",
      "categoryorder": "array",
      "categoryarray": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
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
          "font": {"size": 20, "family": "Roboto Serif"},
          "prefix": "Year: ",
          "visible": false,
          "xanchor": "center"
        },
        "transition": {"duration": 800, "easing": "cubic-in-out"},
        "pad": {"b": 15, "t": 15, "l": 100},
        "len": 0.75,
        "x": 0.5,
        "y": 1.18,
        "ticklen": 8,
        "tickwidth": 2,
        "tickcolor": "#333",
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
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [77, 47, 35, 26, 19, 15, 11, 13, 10, 6, 0, 26], "text": ["77%", "47%", "35%", "26%", "19%", "15%", "11%", "13%", "10%", "6%", "", "26%"]},
        {"x": [19, 49, 62, 68, 77, 79, 80, 72, 74, 63, 0, 64], "text": ["19%", "49%", "62%", "68%", "77%", "79%", "80%", "72%", "74%", "63%", "", "64%"]},
        {"x": [4, 4, 3, 6, 4, 6, 9, 15, 16, 31, 0, 10], "text": ["4%", "4%", "3%", "6%", "4%", "6%", "9%", "15%", "16%", "31%", "", "10%"]}
      ]
    },
    {
      "name": "2027-28",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [77, 47, 34, 27, 16, 16, 10, 13, 10, 6, 0, 26], "text": ["77%", "47%", "34%", "27%", "16%", "16%", "10%", "13%", "10%", "6%", "", "26%"]},
        {"x": [19, 48, 62, 67, 79, 77, 80, 70, 73, 61, 0, 63], "text": ["19%", "48%", "62%", "67%", "79%", "77%", "80%", "70%", "73%", "61%", "", "63%"]},
        {"x": [4, 5, 4, 6, 5, 7, 10, 17, 17, 33, 0, 11], "text": ["4%", "5%", "4%", "6%", "5%", "7%", "10%", "17%", "17%", "33%", "", "11%"]}
      ]
    },
    {
      "name": "2028-29",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [77, 46, 33, 28, 18, 13, 10, 13, 10, 6, 0, 25], "text": ["77%", "46%", "33%", "28%", "18%", "13%", "10%", "13%", "10%", "6%", "", "25%"]},
        {"x": [19, 49, 63, 66, 77, 80, 79, 70, 71, 62, 0, 64], "text": ["19%", "49%", "63%", "66%", "77%", "80%", "79%", "70%", "71%", "62%", "", "64%"]},
        {"x": [4, 5, 4, 6, 5, 7, 11, 17, 19, 32, 0, 11], "text": ["4%", "5%", "4%", "6%", "5%", "7%", "11%", "17%", "19%", "32%", "", "11%"]}
      ]
    },
    {
      "name": "2029-30",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [77, 45, 35, 26, 18, 13, 10, 13, 10, 6, 0, 25], "text": ["77%", "45%", "35%", "26%", "18%", "13%", "10%", "13%", "10%", "6%", "", "25%"]},
        {"x": [19, 52, 59, 68, 76, 79, 78, 70, 71, 60, 0, 63], "text": ["19%", "52%", "59%", "68%", "76%", "79%", "78%", "70%", "71%", "60%", "", "63%"]},
        {"x": [4, 3, 6, 6, 6, 8, 12, 17, 19, 34, 0, 12], "text": ["4%", "3%", "6%", "6%", "6%", "8%", "12%", "17%", "19%", "34%", "", "12%"]}
      ]
    }
  ]
}
```

### Threshold freeze extension

Figure 9 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=83092&region=uk&timePeriod=2028&baseline=1) the distribution of income changes from extending the threshold freeze across fiscal years 2026-27 through 2029-30. The threshold freeze extension only applies from 2028-29 onward (current law already freezes thresholds through 2027-28). In 2028-29, 20% experience no change, 77% lose less than 5%, and 3% lose more than 5%.

**Figure 9: Population share by income change from threshold freeze extension, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#2C6496"},
      "text": ["", "", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#C5D3E8"},
      "text": ["", "", "", "", "", "", "", "", "", "", "", ""],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [72, 40, 27, 26, 14, 8, 4, 4, 1, 7, 0, 20],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#F0F0F0"},
      "text": ["72%", "40%", "27%", "26%", "14%", "8%", "4%", "4%", "1%", "7%", "", "20%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [26, 58, 70, 71, 84, 90, 92, 92, 96, 90, 0, 77],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#A0A0A0"},
      "text": ["26%", "58%", "70%", "71%", "84%", "90%", "92%", "92%", "96%", "90%", "", "77%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [2, 2, 3, 3, 2, 2, 4, 4, 3, 3, 0, 3],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#616161"},
      "text": ["2%", "2%", "3%", "3%", "2%", "2%", "4%", "4%", "3%", "3%", "", "3%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x}%<extra></extra>",
      "showlegend": true
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
      "type": "category",
      "categoryorder": "array",
      "categoryarray": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
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
        "active": 2,
        "yanchor": "middle",
        "xanchor": "center",
        "currentvalue": {
          "font": {"size": 20, "family": "Roboto Serif"},
          "prefix": "Year: ",
          "visible": false,
          "xanchor": "center"
        },
        "transition": {"duration": 800, "easing": "cubic-in-out"},
        "pad": {"b": 15, "t": 15, "l": 100},
        "len": 0.75,
        "x": 0.5,
        "y": 1.18,
        "ticklen": 8,
        "tickwidth": 2,
        "tickcolor": "#333",
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
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 100], "text": ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "", "100%"]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]}
      ]
    },
    {
      "name": "2027-28",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 100], "text": ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "", "100%"]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]}
      ]
    },
    {
      "name": "2028-29",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [72, 40, 27, 26, 14, 8, 4, 4, 1, 7, 0, 20], "text": ["72%", "40%", "27%", "26%", "14%", "8%", "4%", "4%", "1%", "7%", "", "20%"]},
        {"x": [26, 58, 70, 71, 84, 90, 92, 92, 96, 90, 0, 77], "text": ["26%", "58%", "70%", "71%", "84%", "90%", "92%", "92%", "96%", "90%", "", "77%"]},
        {"x": [2, 2, 3, 3, 2, 2, 4, 4, 3, 3, 0, 3], "text": ["2%", "2%", "3%", "3%", "2%", "2%", "4%", "4%", "3%", "3%", "", "3%"]}
      ]
    },
    {
      "name": "2029-30",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [71, 35, 20, 16, 10, 4, 3, 2, 1, 4, 0, 17], "text": ["71%", "35%", "20%", "16%", "10%", "4%", "3%", "2%", "1%", "4%", "", "17%"]},
        {"x": [27, 62, 75, 81, 86, 93, 92, 92, 94, 92, 0, 79], "text": ["27%", "62%", "75%", "81%", "86%", "93%", "92%", "92%", "94%", "92%", "", "79%"]},
        {"x": [2, 3, 5, 3, 4, 3, 5, 6, 5, 4, 0, 4], "text": ["2%", "3%", "5%", "3%", "4%", "3%", "5%", "6%", "5%", "4%", "", "4%"]}
      ]
    }
  ]
}
```

### Combined reform impact

Figure 10 [shows](https://legacy.policyengine.org/uk/policy?focus=policyOutput.winnersAndLosers.incomeDecile&reform=94911&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=false) the distribution of income changes from the combined reform package (income tax increase, National Insurance reduction, and threshold freeze extension) across fiscal years 2026-27 through 2029-30. In 2026-27, 1% gain more than 5%, 20% gain less than 5%, 36% experience no change, 39% lose less than 5%, and 4% lose more than 5%.

**Figure 10: Population share by income change from combined reform, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "name": "Gain more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [0, 1, 1, 2, 0, 0, 1, 1, 0, 0, 0, 1],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#2C6496"},
      "text": ["", "", "", "", "", "", "", "", "", "", "", "1%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Gain more than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Gain less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [9, 19, 17, 22, 25, 31, 29, 27, 19, 6, 0, 20],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#C5D3E8"},
      "text": ["9%", "19%", "17%", "22%", "25%", "31%", "29%", "27%", "19%", "6%", "", "20%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>Gain less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "No change",
      "type": "bar",
      "orientation": "h",
      "x": [82, 57, 53, 44, 41, 29, 19, 15, 17, 4, 0, 36],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#F0F0F0"},
      "text": ["82%", "57%", "53%", "44%", "41%", "29%", "19%", "15%", "17%", "4%", "", "36%"],
      "textposition": "inside",
      "textfont": {"color": "#333", "size": 11},
      "hovertemplate": "%{y}<br>No change: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss less than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [7, 20, 27, 30, 31, 36, 47, 51, 58, 78, 0, 39],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#A0A0A0"},
      "text": ["7%", "20%", "27%", "30%", "31%", "36%", "47%", "51%", "58%", "78%", "", "39%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss less than 5%: %{x}%<extra></extra>",
      "showlegend": true
    },
    {
      "name": "Loss more than 5%",
      "type": "bar",
      "orientation": "h",
      "x": [2, 3, 2, 2, 3, 4, 4, 6, 6, 12, 0, 4],
      "y": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
      "marker": {"color": "#616161"},
      "text": ["2%", "3%", "2%", "2%", "3%", "4%", "4%", "6%", "6%", "12%", "", "4%"],
      "textposition": "inside",
      "textfont": {"color": "white", "size": 11},
      "hovertemplate": "%{y}<br>Loss more than 5%: %{x}%<extra></extra>",
      "showlegend": true
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
      "type": "category",
      "categoryorder": "array",
      "categoryarray": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", "All"],
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
          "font": {"size": 20, "family": "Roboto Serif"},
          "prefix": "Year: ",
          "visible": false,
          "xanchor": "center"
        },
        "transition": {"duration": 800, "easing": "cubic-in-out"},
        "pad": {"b": 15, "t": 15, "l": 100},
        "len": 0.75,
        "x": 0.5,
        "y": 1.18,
        "ticklen": 8,
        "tickwidth": 2,
        "tickcolor": "#333",
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
        {"x": [0, 1, 1, 2, 0, 0, 1, 1, 0, 0, 0, 1], "text": ["", "", "", "", "", "", "", "", "", "", "", "1%"]},
        {"x": [9, 19, 17, 22, 25, 31, 29, 27, 19, 6, 0, 20], "text": ["9%", "19%", "17%", "22%", "25%", "31%", "29%", "27%", "19%", "6%", "", "20%"]},
        {"x": [82, 57, 53, 44, 41, 29, 19, 15, 17, 4, 0, 36], "text": ["82%", "57%", "53%", "44%", "41%", "29%", "19%", "15%", "17%", "4%", "", "36%"]},
        {"x": [7, 20, 27, 30, 31, 36, 47, 51, 58, 78, 0, 39], "text": ["7%", "20%", "27%", "30%", "31%", "36%", "47%", "51%", "58%", "78%", "", "39%"]},
        {"x": [2, 3, 2, 2, 3, 4, 4, 6, 6, 12, 0, 4], "text": ["2%", "3%", "2%", "2%", "3%", "4%", "4%", "6%", "6%", "12%", "", "4%"]}
      ]
    },
    {
      "name": "2027-28",
      "data": [
        {"x": [0, 1, 1, 2, 0, 0, 1, 1, 0, 0, 0, 1], "text": ["", "", "", "", "", "", "", "", "", "", "", "1%"]},
        {"x": [10, 19, 17, 23, 26, 29, 28, 25, 19, 6, 0, 20], "text": ["10%", "19%", "17%", "23%", "26%", "29%", "28%", "25%", "19%", "6%", "", "20%"]},
        {"x": [81, 57, 51, 44, 37, 30, 19, 16, 16, 4, 0, 35], "text": ["81%", "57%", "51%", "44%", "37%", "30%", "19%", "16%", "16%", "4%", "", "35%"]},
        {"x": [7, 19, 29, 29, 34, 37, 48, 52, 58, 78, 0, 39], "text": ["7%", "19%", "29%", "29%", "34%", "37%", "48%", "52%", "58%", "78%", "", "39%"]},
        {"x": [2, 4, 2, 2, 3, 4, 4, 6, 7, 12, 0, 5], "text": ["2%", "4%", "2%", "2%", "3%", "4%", "4%", "6%", "7%", "12%", "", "5%"]}
      ]
    },
    {
      "name": "2028-29",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [1, 4, 4, 7, 6, 7, 6, 8, 7, 4, 0, 6], "text": ["", "", "", "7%", "6%", "7%", "6%", "8%", "7%", "", "", "6%"]},
        {"x": [74, 50, 36, 32, 20, 13, 7, 10, 3, 1, 0, 24], "text": ["74%", "50%", "36%", "32%", "20%", "13%", "7%", "10%", "3%", "", "", "24%"]},
        {"x": [22, 41, 56, 56, 70, 75, 80, 74, 74, 79, 0, 63], "text": ["22%", "41%", "56%", "56%", "70%", "75%", "80%", "74%", "74%", "79%", "", "63%"]},
        {"x": [3, 5, 4, 5, 4, 5, 7, 8, 16, 16, 0, 7], "text": ["3%", "5%", "4%", "5%", "4%", "5%", "7%", "8%", "16%", "16%", "", "7%"]}
      ]
    },
    {
      "name": "2029-30",
      "data": [
        {"x": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "text": ["", "", "", "", "", "", "", "", "", "", "", ""]},
        {"x": [1, 4, 3, 5, 5, 6, 6, 8, 6, 4, 0, 5], "text": ["", "", "", "5%", "5%", "6%", "6%", "8%", "6%", "", "", "5%"]},
        {"x": [71, 36, 21, 20, 11, 6, 3, 3, 1, 2, 0, 17], "text": ["71%", "36%", "21%", "20%", "11%", "6%", "3%", "3%", "", "", "", "17%"]},
        {"x": [25, 56, 70, 70, 78, 81, 82, 76, 75, 72, 0, 69], "text": ["25%", "56%", "70%", "70%", "78%", "81%", "82%", "76%", "75%", "72%", "", "69%"]},
        {"x": [3, 4, 6, 5, 6, 7, 9, 13, 18, 22, 0, 9], "text": ["3%", "4%", "6%", "5%", "6%", "7%", "9%", "13%", "18%", "22%", "", "9%"]}
      ]
    }
  ]
}
```

## Poverty impact

Table 1 shows the change in absolute before-housing-costs poverty rate for each reform. Reducing the National Insurance rate from 8% to 6% would have [no impact](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) on the overall poverty rate in 2026-27. Increasing the basic and higher income tax rates by 2 percentage points would raise the overall poverty rate by [0.2 percentage points](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) in 2026-27. Extending the threshold freeze to 2029-30 would have [no impact](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) on the overall poverty rate in 2028-29 (current law already freezes thresholds until 2027-28).

**Table 1: Poverty impact by reform**

| Reform                                            | Fiscal year | Change in poverty rate (pp)                                                                                                              |
| ------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| NI rate reduction (8% to 6%)                      | 2026-27     | [0pp](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=94906&region=uk&timePeriod=2026&baseline=1)      |
| Income tax increase (basic and higher rates +2pp) | 2026-27     | [+0.2pp](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94910&region=uk&timePeriod=2026&baseline=1) |
| Threshold freeze extension                        | 2028-29     | [0pp](https://legacy.policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=83092&region=uk&timePeriod=2028&baseline=1)      |

Table 2 shows the net poverty impact from the combined reform package across fiscal years 2026-27 through 2029-30. The [combined package](https://legacy.policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=94911&region=uk&timePeriod=2026&baseline=1&uk_local_areas_beta=false) would have no impact on absolute before-housing-costs poverty in 2026-27, with the poverty impact increasing to 0.2 percentage points by 2029-30 as the threshold freeze extension effect accumulates alongside the income tax and National Insurance reforms.

**Table 2: Net poverty impact from combined reform package**

| Fiscal year | Change in poverty rate (pp) |
| ----------- | --------------------------- |
| 2026-27     | 0pp                         |
| 2027-28     | 0pp                         |
| 2028-29     | +0.1pp                      |
| 2029-30     | +0.2pp                      |

## Inequality impact

The three reforms show minimal change in the Gini index, with the National Insurance rate reduction producing a [0.1%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94906&region=uk&timePeriod=2026&baseline=1) increase in 2026-27, the income tax increase producing a [0.3%](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=94910&region=uk&timePeriod=2026&baseline=1) decrease in 2026-27, and the threshold freeze extension having [no impact](https://legacy.policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=83092&region=uk&timePeriod=2028&baseline=1) on income inequality in 2028-29 (current law already freezes thresholds until 2027-28).

## Conclusion

Increasing the basic and higher income tax rates by 2 percentage points would raise £18.6 billion in 2026-27 but increase absolute before-housing-costs poverty by 0.2 percentage points and reduce the Gini index by 0.3%, while reducing National Insurance from 8% to 6% would cost £11.7 billion with no change in poverty. Extending the threshold freeze to 2029-30 would raise £3.5 billion in 2028-29 with no change in poverty.
