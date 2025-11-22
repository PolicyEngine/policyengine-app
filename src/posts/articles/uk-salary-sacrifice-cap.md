_Image credit: qualitycompanyformations_

## Introduction

Salary sacrifice arrangements allow employees to exchange part of their salary for non-cash benefits before tax and National Insurance are calculated. The Financial Times [reported](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95) that the government is considering capping the amount that can be put into pension salary sacrifice schemes at £2,000 annually without paying National Insurance. Above this threshold, standard NI rates would apply. UK government guidance [defines](https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye) salary sacrifice as an arrangement where an employee gives up the right to part of their cash pay, usually in return for a non-cash benefit.

HMRC's research [shows](https://www.gov.uk/government/publications/understanding-the-attitudes-and-behaviours-of-employers-towards-salary-sacrifice-for-pensions/understanding-the-attitudes-and-behaviours-of-employers-towards-salary-sacrifice-for-pensions) that salary sacrifice is widely used when it is available: in 2019, 30% of private-sector employees and 9% of public-sector employees in organisations offering salary sacrifice contributed to pensions through these arrangements.

The Financial Times [reports](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95) that the government estimates the proposed £2,000 cap would raise around £2 billion, though pension experts have warned that employers may respond by reducing contributions. This analysis examines the cap's impact on households, government revenue, and income distribution, assuming employees shift contributions above £2,000 into standard, non-salary-sacrifice pension contributions.

## Household impact

Under current law, when an employee makes pension contributions through salary sacrifice, both the employee and employer save on National Insurance contributions on the sacrificed amount. As an example, consider an employee earning £50,000 who contributes £5,000 to their pension through salary sacrifice. The table below shows the tax calculation:

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

### Impact of the proposed cap

This analysis assumes a full behavioral response: employees would shift excess contributions above £2,000 from salary sacrifice to regular employee pension contributions. An employee wanting to contribute £5,000 to their pension would contribute £2,000 via salary sacrifice (receiving NI relief) and £3,000 as a regular employee pension contribution.

**Table 2: With £2,000 cap - £50,000 earner contributing £5,000 total**

| Component                           | Amount      | Calculation                                            |
| :---------------------------------- | :---------- | :----------------------------------------------------- |
| Gross salary                        | £50,000     |                                                        |
| Salary sacrifice                    | £2,000      | Capped at £2,000                                       |
| Taxable salary                      | £48,000     | £50,000 - £2,000                                       |
| Employee pension contribution       | £3,000      | Additional contribution (tax relief, no NI relief)     |
| Taxable income                      | £45,000     | £48,000 - £3,000                                       |
| Employee NI (8% on £12,570-£48,000) | £2,835      | 8% × (£48,000 - £12,570)                               |
| Employer NI (15% on above £9,100)   | £5,835      | 15% × (£48,000 - £9,100)                               |
| Income tax (20% on £12,570-£45,000) | £6,486      | 20% × (£45,000 - £12,570)                              |
| **Take-home pay**                   | **£27,294** | £48,000 - £3,000 - £2,835 - £6,486                     |
| **Total pension contribution**      | **£5,000**  | £2,000 salary sacrifice + £3,000 employee contribution |

## Budgetary impact

PolicyEngine's microsimulation [estimates](https://gist.github.com/vahid-ahmadi/da3dc1f9c2e26ee319ef4e04c34d3be3) that in 2026-27, 653,000 people make pension contributions through salary sacrifice arrangements. Of these, 410,000 people (62.8% of these contributors) would exceed the £2,000 cap and face higher National Insurance costs.

Under baseline policy, total salary sacrifice contributions amount to £4.04 billion. With the cap in place, salary sacrifice would fall to £1.09 billion, with the remaining £2.95 billion shifting to regular employee pension contributions. This shift would generate a government budgetary impact of £1.85 billion in 2026-27, rising to £1.90 billion by 2029-30, as shown in Table 3.

**Table 3: Revenue impact of £2,000 salary sacrifice cap, 2026-27 to 2029-30**

| Fiscal year | Revenue increase (£bn) |
| :---------- | :--------------------- |
| 2026-27     | 1.85                   |
| 2027-28     | 1.86                   |
| 2028-29     | 1.88                   |
| 2029-30     | 1.90                   |

## Distributional analysis

Figure 1 [shows](https://gist.github.com/vahid-ahmadi/da3dc1f9c2e26ee319ef4e04c34d3be3) the average percentage change in household net income after pension deductions by income decile. The impact rises with income, from near zero for the bottom five deciles to 0.3% for the top decile.

**Figure 1: Average percentage change in household net income after pension deductions by decile, 2026-27**

```plotly
{
  "data": [
    {
      "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "y": [0.00, 0.00, 0.00, 0.012, 0.005, 0.008, 0.012, 0.031, 0.068, 0.299],
      "type": "bar",
      "marker": {
        "color": "#2C6496",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "%{x}<br>Change: %{y:.3f}%<extra></extra>"
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
      "tickmode": "array",
      "tickvals": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "showgrid": true,
      "gridcolor": "#E5E5E5"
    },
    "yaxis": {
      "title": "Change in household net income (%)",
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
      "range": [0, 0.35]
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

The impact by income decile is: deciles 1-3 see no change, deciles 4-7 see changes from 0.01% to 0.012%, decile 8 sees 0.03%, decile 9 sees 0.07%, and decile 10 sees 0.3%.

## Conclusion

The cap would raise £1.85 billion in 2026-27, close to the government's £2 billion [estimate](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95), affecting 410,000 workers who currently contribute above £2,000. The impact concentrates on higher earners, with the top income decile experiencing a 0.3% increase in household net income after pension deductions.
