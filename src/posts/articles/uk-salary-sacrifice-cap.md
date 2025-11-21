_Image credit: qualitycompanyformations_

## Introduction

Salary sacrifice arrangements allow employees to exchange part of their salary for non-cash benefits before tax and National Insurance are calculated. The Financial Times [reported](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95) that the government is considering capping the amount that can be put into pension salary sacrifice schemes at £2,000 annually without paying National Insurance. Above this threshold, the standard NI rates would apply: 15% for employers and 8% for employees on salaries below £50,270, and 2% on income above that threshold. The [UK government guidance](https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye) defines salary sacrifice as an arrangement where an employee gives up the right to part of their cash pay, usually in return for a non-cash benefit.

The Financial Times [reports](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95) that the government estimates the cap would raise £2 billion, though pension experts have warned employers may respond by reducing contributions. This analysis examines the cap's impact on households, government revenue, and income distribution, assuming employees shift amounts above £2,000 to regular pension contributions.

## Household impact

### How salary sacrifice works currently

Under current law, when an employee makes pension contributions through salary sacrifice, both the employee and employer save on National Insurance contributions on the sacrificed amount. Consider an employee earning £50,000 who contributes £5,000 to their pension through salary sacrifice:

**Table 1: Current system - £50,000 earner with £5,000 pension contribution via salary sacrifice**

| Component                           | Amount      | Calculation               |
| :---------------------------------- | :---------- | :------------------------ |
| Gross salary                        | £50,000     |                           |
| Salary sacrifice                    | £5,000      |                           |
| Taxable salary                      | £45,000     | £50,000 - £5,000          |
| Employee NI (8% on £12,570-£45,000) | £2,594      | 8% × (£45,000 - £12,570)  |
| Employer NI (15% on above £9,100)   | £5,385      | 15% × (£45,000 - £9,100)  |
| Income tax (20% on £12,570-£45,000) | £6,486      | 20% × (£45,000 - £12,570) |
| **Take-home pay**                   | **£30,535** | £45,000 - £2,594 - £6,486 |
| **Pension contribution**            | **£5,000**  | Via salary sacrifice      |

### Impact of the proposed cap

An employee wanting to contribute £5,000 to their pension would:

- Contribute £2,000 via salary sacrifice (receiving NI relief)
- Contribute £3,000 as a regular employee pension contribution (receiving income tax relief but not NI relief)

**Table 2: With £2,000 cap - £50,000 earner contributing £5,000 total**

| Component                             | Amount      | Calculation                                            |
| :------------------------------------ | :---------- | :----------------------------------------------------- |
| Gross salary                          | £50,000     |                                                        |
| Salary sacrifice                      | £2,000      | Capped at £2,000                                       |
| Taxable salary                        | £48,000     | £50,000 - £2,000                                       |
| Employee pension contribution         | £3,000      | Additional contribution (tax relief, no NI relief)     |
| Taxable income                        | £45,000     | £48,000 - £3,000                                       |
| Employee NI (8% on £12,570-£48,000)   | £2,835      | 8% × (£48,000 - £12,570)                               |
| Employer NI (15% on above £9,100)     | £5,835      | 15% × (£48,000 - £9,100)                               |
| Income tax (20% on £12,570-£45,000)   | £6,486      | 20% × (£45,000 - £12,570)                              |
| **Take-home pay**                     | **£27,294** | £48,000 - £3,000 - £2,835 - £6,486                     |
| **Total pension contribution**        | **£5,000**  | £2,000 salary sacrifice + £3,000 employee contribution |
| **Additional employee NI vs current** | **£241**    | £2,835 - £2,594                                        |

The employee pays £241 more in NI (£2,835 - £2,594). The employer pays £450 more in NI (15% × £3,000).

## Budgetary impact

PolicyEngine's microsimulation model [estimates](https://gist.github.com/vahid-ahmadi/778f329d245a1e3675c16338c1fa7c41) the cap would raise £1.85 billion in 2026-27, rising to £1.90 billion by 2029-30, as shown in Figure 1.

**Figure 1: Revenue impact of £2,000 salary sacrifice cap, 2026-27 to 2029-30**

```plotly
{
  "data": [
    {
      "x": ["2026-27", "2027-28", "2028-29", "2029-30"],
      "y": [1.85, 1.86, 1.88, 1.90],
      "type": "bar",
      "marker": {
        "color": "#2C6496",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "%{x}<br>Revenue increase: £%{y:.2f}bn<extra></extra>"
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
      "gridcolor": "#E5E5E5"
    },
    "yaxis": {
      "title": "Change in government revenue (£bn)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": "£.2f",
      "showgrid": true,
      "gridcolor": "#E5E5E5",
      "range": [0, 2.5]
    },
    "height": 500,
    "margin": {
      "l": 80,
      "r": 40,
      "b": 80,
      "t": 40,
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

## Distributional analysis

PolicyEngine's microsimulation [estimates](https://gist.github.com/vahid-ahmadi/778f329d245a1e3675c16338c1fa7c41) that in 2026-27, 653,000 people (2.0% of workers) make pension contributions through salary sacrifice arrangements. Of these, 410,000 people (62.8% of salary sacrifice users) would exceed the £2,000 cap and face higher National Insurance costs.

Under baseline policy, total salary sacrifice contributions amount to £4.04 billion. With the cap, salary sacrifice would fall to £1.09 billion, with the remaining £2.95 billion shifting to regular employee pension contributions.

Figure 2 [shows](https://gist.github.com/vahid-ahmadi/778f329d245a1e3675c16338c1fa7c41) the average percentage change in employment income by income decile, rising from near zero for the bottom five deciles to 0.228% for the top decile.

**Figure 2: Average percentage change in employment income by decile, 2026-27**

```plotly
{
  "data": [
    {
      "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "y": [0.001, 0.000, 0.000, 0.005, 0.006, 0.007, 0.010, 0.022, 0.060, 0.228],
      "type": "bar",
      "marker": {
        "color": "#2C6496",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Decile %{x}<br>Change: %{y:.3f}%<extra></extra>"
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
      "gridcolor": "#E5E5E5"
    },
    "yaxis": {
      "title": "Average percentage change in employment income",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": ".3f",
      "ticksuffix": "%",
      "showgrid": true,
      "gridcolor": "#E5E5E5",
      "range": [0, 0.25]
    },
    "height": 500,
    "margin": {
      "l": 80,
      "r": 40,
      "b": 80,
      "t": 40,
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

The impact by income decile is: deciles 1-5 see changes from 0.000% to 0.006%, deciles 6-8 see changes from 0.007% to 0.022%, decile 9 sees 0.060%, and decile 10 sees 0.228%.

## Conclusion

The cap would raise £1.85 billion in 2026-27, close to the government's £2 billion [estimate](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95), affecting 410,000 workers who currently contribute above £2,000. The impact concentrates on higher earners, with the top income decile experiencing a 0.228% increase in employment income, leading to higher NI payments.
