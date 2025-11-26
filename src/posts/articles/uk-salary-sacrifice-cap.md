_Image credit: qualitycompanyformations_

## Introduction

Salary sacrifice arrangements allow employees to exchange part of their salary for non-cash benefits before tax and National Insurance are calculated. The Financial Times [reported](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95) that the government is considering capping the amount that can be put into pension salary sacrifice schemes at £2,000 annually without paying National Insurance. Above this threshold, standard NI rates would apply. UK government guidance [defines](https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye) salary sacrifice as an arrangement where an employee gives up the right to part of their cash pay, usually in return for a non-cash benefit.

HMRC's research [shows](https://www.gov.uk/government/publications/understanding-the-attitudes-and-behaviours-of-employers-towards-salary-sacrifice-for-pensions/understanding-the-attitudes-and-behaviours-of-employers-towards-salary-sacrifice-for-pensions) that salary sacrifice is widely used when it is available: in 2019, 30% of private-sector employees and 9% of public-sector employees in organisations offering salary sacrifice contributed to pensions through these arrangements.

The Financial Times [reports](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95) that the government estimates the proposed £2,000 cap would raise around £2 billion, though pension experts have warned that employers may respond by reducing contributions. This analysis examines the cap's impact on households, government revenue, and income distribution.

### Data

This analysis uses salary sacrifice pension contribution data imputed from the Family Resources Survey (FRS), following the same approach used for other PolicyEngine variables. The FRS collects information on salary sacrifice pension contributions through the SPNAMT field in the job table. PolicyEngine's microsimulation identifies 2.1% of workers with salary sacrifice pension contributions. Among these contributors, average annual contributions are £6,181, with a median of £3,315. The data shows contributions ranging from £0.01 to £71,686 per year. For more information on PolicyEngine's data methodology, see the [PolicyEngine UK data documentation](https://policyengine.github.io/policyengine-uk-data/).

### Assumptions

This analysis models the cap's effects under the following assumptions:

1. **Continued pension saving**: Employees currently using salary sacrifice maintain their desire to contribute the same total amount to pensions.

2. **Contribution redirection**: Contributions exceeding the £2,000 cap shift from salary sacrifice to regular employee pension contributions (which receive income tax relief but not National Insurance relief).

3. **Employer behavioural response**: Employers reduce total compensation by 13% of the excess contribution amount. This reflects labour market adjustments and the increased employer National Insurance costs from higher taxable payroll. For an employee previously contributing £5,000 via salary sacrifice, the £3,000 excess would result in a £390 reduction in total compensation (13% of £3,000), with the remaining £2,610 becoming available for regular employee pension contributions.

4. **No changes to other benefits**: Employer pension matching rates and other employment benefits remain unchanged.

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
| **Take-home pay**                   | **£35,920** | £45,000 - £2,594 - £6,486 |

### Impact of the proposed cap

With the cap in place, an employee previously contributing £5,000 via salary sacrifice faces the following changes: the £3,000 excess over the £2,000 cap triggers a 13% employer haircut (£390), reducing total compensation to £49,610. The remaining £2,610 becomes available for regular employee pension contributions, which receive income tax relief but not National Insurance relief. The employee's take-home pay decreases from £35,920 to £35,711, whilst total pension contributions fall from £5,000 to £4,610.

**Table 2: With £2,000 cap - £50,000 earner with 13% employer haircut**

| Component                           | Amount      | Calculation                        |
| :---------------------------------- | :---------- | :--------------------------------- |
| Original gross salary               | £50,000     |                                    |
| Excess over cap                     | £3,000      | £5,000 - £2,000                    |
| Employer haircut (13%)              | £390        | 13% × £3,000                       |
| Adjusted gross salary               | £49,610     | £50,000 - £390                     |
| Salary sacrifice                    | £2,000      | Capped at £2,000                   |
| Taxable salary                      | £47,610     | £49,610 - £2,000                   |
| Employee pension contribution       | £2,610      | 87% × £3,000                       |
| Taxable income                      | £45,000     | £47,610 - £2,610                   |
| Employee NI (8% on £12,570-£47,610) | £2,803      | 8% × (£47,610 - £12,570)           |
| Employer NI (15% on above £9,100)   | £5,777      | 15% × (£47,610 - £9,100)           |
| Income tax (20% on £12,570-£45,000) | £6,486      | 20% × (£45,000 - £12,570)          |
| **Take-home pay**                   | **£35,711** | £47,610 - £2,610 - £2,803 - £6,486 |
| **Total pension contribution**      | **£4,610**  | £2,000 + £2,610                    |

## Government revenue impact

PolicyEngine's microsimulation [estimates](https://gist.github.com/vahid-ahmadi/580b4d12318b97afd26fcc0038fe047b) that in 2026-27, 653,000 people make pension contributions through salary sacrifice arrangements. Of these, 410,000 people (62.75% of these contributors) would exceed the £2,000 cap and face reduced disposable income.

Under baseline policy, total salary sacrifice contributions amount to £4.04 billion. With the cap in place and assuming a 13% employer haircut on excess contributions, salary sacrifice would fall to £1.09 billion. Of the £2.95 billion excess, employers would retain £380 million (13%), with the remaining £2.57 billion shifting to regular employee pension contributions. This shift would generate government revenue of £1.33 billion in 2026-27, rising to £1.41 billion by 2029-30, as shown in Table 3.

**Table 3: Revenue impact of £2,000 salary sacrifice cap, 2026-27 to 2029-30**

| Fiscal year | Revenue increase (£bn) |
| :---------- | :--------------------- |
| 2026-27     | 1.33                   |
| 2027-28     | 1.35                   |
| 2028-29     | 1.38                   |
| 2029-30     | 1.41                   |

## Distributional analysis

Figure 1 [shows](https://gist.github.com/vahid-ahmadi/580b4d12318b97afd26fcc0038fe047b) the average percentage change in household net income by income decile. The impact rises with income, from near zero for the bottom five deciles to 0.279% for the top decile.

**Figure 1: Average percentage change in household net income by decile, 2026-27**

```plotly
{
  "data": [
    {
      "x": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      "y": [0.000, 0.000, 0.000, 0.019, 0.006, 0.012, 0.018, 0.049, 0.101, 0.279],
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

The impact by income decile is: deciles 1-3 see no change, decile 4 sees 0.019%, deciles 5-7 see changes from 0.006% to 0.018%, decile 8 sees 0.049%, decile 9 sees 0.101%, and decile 10 sees 0.279%.

## Conclusion

The cap would raise £1.33 billion in 2026-27, close to the government's £2 billion [estimate](https://www.ft.com/content/11602ac1-44fc-4b58-8b17-af5e851f5c95), affecting 410,000 workers who currently contribute above £2,000. The impact concentrates on higher earners, with the top income decile experiencing a 0.279% reduction in household net income. The analysis assumes employers reduce total compensation by 13% of excess contributions, approximately offsetting their increased National Insurance costs while maintaining most pension saving capacity for affected employees.
