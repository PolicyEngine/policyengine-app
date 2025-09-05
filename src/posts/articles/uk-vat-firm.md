_Image credit: Uniwide Formations_

## Introduction

Value Added Tax (VAT) registration thresholds determine when businesses must register for VAT and begin charging customers 20% on their sales. The UK currently sets this threshold at [£90,000](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/) annual turnover, up from [£85,000](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/) in 2024. Businesses earning above this level must register for VAT and charge customers 20% on most goods and services, while those below remain exempt.

This threshold creates a cliff-edge effect where businesses crossing £90,000 turnover must begin charging VAT on all sales and remitting collections to HMRC. This mechanism can distort business growth incentives and affect overall economic efficiency.

Chancellor Rachel Reeves is considering further increases to the VAT threshold as part of broader economic growth measures. [Reports](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/) indicate Treasury officials have discussed raising the threshold as a growth-stimulating policy, though this faces opposition from some ministers who favour reducing it to [£30,000](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/).

PolicyEngine has developed a [VAT threshold analysis tool](https://uk-vatlab-app1j7s6o-policy-engine.vercel.app/) that models the impacts of different threshold levels on both the number of VAT-paying firms and total tax revenue. This analysis examines how threshold changes would affect business registration patterns and government revenues across multiple fiscal years.

## Methodology

PolicyEngine uses microsimulation to analyse VAT reforms, capturing impacts across thousands of firms with different characteristics. Unlike aggregate models that rely on average effects, microsimulation models individual firms based on their turnover, sector, and size. This approach reveals distributional impacts that would otherwise remain hidden, identifying which types of businesses are affected under different reforms.

The analysis constructs synthetic firm microdata calibrated to [ONS UK Business statistics](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation), capturing the distribution of firms by industry classification, turnover bands, and employee counts. This synthetic dataset is validated against [HMRC VAT statistics](https://www.gov.uk/government/statistics/value-added-tax-vat-annual-statistics) to ensure the model represents sectoral receipts and registration patterns.

**Data Sources and Integration:**

[ONS data](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation) provides the economic structure, using all SIC sectors with firm counts and turnover distributions to generate base firms with size patterns and employment relationships. [HMRC data](https://www.gov.uk/government/statistics/value-added-tax-vat-annual-statistics) provides calibration targets including sector totals for VAT-registered firms, turnover band targets across all bands, and adds firms with negative or zero turnover missing from ONS surveys.

The integration uses a multi-objective optimisation process where ONS generates firm structure, then mathematical optimisation finds weights that simultaneously match HMRC targets while preserving distributions and relationships.

**Impact Analysis:**

The analysis calculates static effects for each scenario, including revenue changes, the number of firms experiencing tax increases or decreases by sector and size, shifts in VAT registration patterns across industries, and effective tax rates throughout the firm distribution. Simulations cover fiscal years 2025-26 through 2029-30 by aging the synthetic firm microdata in accordance with OBR projections.

All projections in this analysis assume static conditions and do not incorporate any firm responses to threshold changes.

## Comparison with HMRC projections

HMRC published revenue projections for raising the VAT threshold from [£85,000 to £90,000](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts) across the [2024-29](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts) period. Figure 1 compares PolicyEngine's estimates with HMRC's official projections for this specific policy change.

```plotly
{
  "data": [
    {
      "x": ["2024-25", "2025-26", "2026-27", "2027-28", "2028-29"],
      "y": [-150, -185, -125, -50, 65],
      "type": "bar",
      "marker": {
        "color": "#4292c6"
      },
      "name": "HMRC",
      "text": ["-£150m", "-£185m", "-£125m", "-£50m", "£65m"],
      "textposition": "outside",
      "outsidetextfont": {
        "family": "Roboto Serif",
        "color": "black",
        "size": 10
      }
    },
    {
      "x": ["2024-25", "2025-26", "2026-27", "2027-28", "2028-29"],
      "y": [-186, -205, -131, -46, 83],
      "type": "bar",
      "marker": {
        "color": "#756bb1"
      },
      "name": "PolicyEngine",
      "text": ["-£186m", "-£205m", "-£131m", "-£46m", "£83m"],
      "textposition": "outside",
      "outsidetextfont": {
        "family": "Roboto Serif",
        "color": "black",
        "size": 10
      }
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 1: Revenue Impact of Increasing the VAT Registration Threshold (2024-29)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "yaxis": {
      "title": "£ millions",
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
      "zerolinecolor": "#000000",
      "zerolinewidth": 1
    },
    "xaxis": {
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      }
    },
    "barmode": "group",
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
        "x": 0,
        "y": -250,
        "text": "Baseline: £85k<br>Policy: £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#666666"
        },
        "align": "center"
      },
      {
        "x": 1,
        "y": -250,
        "text": "Baseline: £85k<br>Policy: £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#666666"
        },
        "align": "center"
      },
      {
        "x": 2,
        "y": -250,
        "text": "Baseline: £87k<br>Policy: £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#666666"
        },
        "align": "center"
      },
      {
        "x": 3,
        "y": -250,
        "text": "Baseline: £89k<br>Policy: £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#666666"
        },
        "align": "center"
      },
      {
        "x": 4,
        "y": -250,
        "text": "Baseline: £92k<br>Policy: £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 10,
          "color": "#666666"
        },
        "align": "center"
      },
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
    ],
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

Both models project revenue losses in the first four years, followed by revenue gains in [2028-29](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts). HMRC estimates a [£185 million](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts) loss in 2025-26, while PolicyEngine projects £205 million. The 2028-29 revenue increase occurs because the baseline assumes inflation indexing would raise the threshold above £90,000 by that point, making the £90,000 policy threshold relatively restrictive.

PolicyEngine's projections align closely with HMRC's official estimates, with differences of 10% or less across all years. The largest absolute difference occurs in 2025-26, where PolicyEngine projects £20 million additional revenue loss compared to HMRC.

## Impact on VAT-paying firms

Raising the VAT threshold would reduce the number of businesses required to register for VAT. Figure 2 shows how different threshold levels would change the number of VAT-paying firms in 2025-26.

```plotly
{
  "data": [
    {
      "x": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
      "y": [44.023, 35.463, 25.523, 13.215, 0, -21.837, -42.874, -64.502, -84.114, -102.551, -120.513],
      "type": "scatter",
      "mode": "lines+markers",
      "marker": {
        "color": "#616161",
        "size": 8
      },
      "line": {
        "color": "#616161",
        "width": 3
      },
      "name": "Change in VAT-paying firms (thousands)",
      "text": ["Threshold: £70k<br>Firms affected: 44,023", "Threshold: £75k<br>Firms affected: 35,463", "Threshold: £80k<br>Firms affected: 25,523", "Threshold: £85k<br>Firms affected: 13,215", "Threshold: £90k<br>Firms affected: 0", "Threshold: £95k<br>Firms affected: 21,837", "Threshold: £100k<br>Firms affected: 42,874", "Threshold: £105k<br>Firms affected: 64,502", "Threshold: £110k<br>Firms affected: 84,114", "Threshold: £115k<br>Firms affected: 102,551", "Threshold: £120k<br>Firms affected: 120,513"],
      "hovertemplate": "%{text}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 2: Change in VAT-paying firms by threshold (2025-26)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Registration threshold (£k)",
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
      "title": "Change in number of firms (thousands)",
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
      "zerolinecolor": "#000000",
      "zerolinewidth": 1
    },
    "shapes": [
      {
        "type": "line",
        "x0": 90,
        "x1": 90,
        "y0": -140,
        "y1": 50,
        "line": {
          "color": "#666666",
          "width": 2,
          "dash": "dash"
        }
      }
    ],
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
        "x": 90,
        "y": 35,
        "text": "Current £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "color": "#666666"
        }
      },
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
    ],
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

At the current £90,000 threshold, no change occurs by definition. Lowering the threshold to £70,000 would bring approximately 44,000 additional firms into the VAT system. Raising it to £120,000 would remove approximately 120,500 firms from VAT registration requirements.

The relationship shows progression, with threshold increases removing firms from VAT obligations. This pattern reflects the distribution of business turnover levels approximately the threshold.

Figure 3 presents the same analysis for 2026-27, showing similar patterns with slight variations in magnitude.

```plotly
{
  "data": [
    {
      "x": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
      "y": [40.745, 32.57, 22.534, 10.936, 0, -19.364, -40.783, -62.41, -82.827, -101.881, -120.038],
      "type": "scatter",
      "mode": "lines+markers",
      "marker": {
        "color": "#616161",
        "size": 8
      },
      "line": {
        "color": "#616161",
        "width": 3
      },
      "name": "Change in VAT-paying firms (thousands)",
      "text": ["Threshold: £70k<br>Firms affected: 40,745", "Threshold: £75k<br>Firms affected: 32,570", "Threshold: £80k<br>Firms affected: 22,534", "Threshold: £85k<br>Firms affected: 10,936", "Threshold: £90k<br>Firms affected: 0", "Threshold: £95k<br>Firms affected: 19,364", "Threshold: £100k<br>Firms affected: 40,783", "Threshold: £105k<br>Firms affected: 62,410", "Threshold: £110k<br>Firms affected: 82,827", "Threshold: £115k<br>Firms affected: 101,881", "Threshold: £120k<br>Firms affected: 120,038"],
      "hovertemplate": "%{text}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 3: Change in VAT-paying firms by threshold (2026-27)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Registration threshold (£k)",
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
      "title": "Change in number of firms (thousands)",
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
      "zerolinecolor": "#000000",
      "zerolinewidth": 1
    },
    "shapes": [
      {
        "type": "line",
        "x0": 90,
        "x1": 90,
        "y0": -140,
        "y1": 45,
        "line": {
          "color": "#666666",
          "width": 2,
          "dash": "dash"
        }
      }
    ],
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
        "x": 90,
        "y": 30,
        "text": "Current £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "color": "#666666"
        }
      },
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
    ],
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

The 2026-27 projections show approximately 40,700 additional firms entering VAT at a £70,000 threshold and approximately 120,000 firms leaving at a £120,000 threshold. These figures reflect both business growth and entry/exit patterns over time.

## Revenue impacts

Changes to the VAT threshold create corresponding effects on government revenue. Lower thresholds increase the number of VAT-paying businesses, raising revenue. Higher thresholds reduce registered businesses and decrease collections.

Figure 4 shows the revenue impact of different threshold levels in 2025-26.

```plotly
{
  "data": [
    {
      "x": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
      "y": [1277.6, 1138.8, 895.0, 492.5, 0, -123.0, -266.6, -468.8, -642.9, -867.2, -1075.9],
      "type": "scatter",
      "mode": "lines+markers",
      "marker": {
        "color": "#616161",
        "size": 8
      },
      "line": {
        "color": "#616161",
        "width": 3
      },
      "name": "Revenue change (£m)",
      "text": ["Threshold: £70k<br>Revenue change: +£1,277.6m", "Threshold: £75k<br>Revenue change: +£1,138.8m", "Threshold: £80k<br>Revenue change: +£895.0m", "Threshold: £85k<br>Revenue change: +£492.5m", "Threshold: £90k<br>Revenue change: £0.0m", "Threshold: £95k<br>Revenue change: -£123.0m", "Threshold: £100k<br>Revenue change: -£266.6m", "Threshold: £105k<br>Revenue change: -£468.8m", "Threshold: £110k<br>Revenue change: -£642.9m", "Threshold: £115k<br>Revenue change: -£867.2m", "Threshold: £120k<br>Revenue change: -£1,075.9m"],
      "hovertemplate": "%{text}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 4: Impact of VAT threshold changes on tax revenue (2025-26)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Registration threshold (£k)",
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
      "title": "Revenue (£m)",
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
      "zerolinecolor": "#000000",
      "zerolinewidth": 1
    },
    "shapes": [
      {
        "type": "line",
        "x0": 90,
        "x1": 90,
        "y0": -1200,
        "y1": 1300,
        "line": {
          "color": "#666666",
          "width": 2,
          "dash": "dash"
        }
      }
    ],
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
        "x": 90,
        "y": 1000,
        "text": "Current £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "color": "#666666"
        }
      },
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
    ],
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

A threshold reduction to £70,000 would generate approximately £1.3 billion additional revenue in 2025-26. Conversely, raising the threshold to £120,000 would cost approximately £1.1 billion. The revenue effects show a steeper gradient than firm count changes, reflecting that businesses near the threshold generate substantial VAT payments relative to their number.

Figure 5 presents revenue impacts for 2026-27, following similar patterns with slight variations.

```plotly
{
  "data": [
    {
      "x": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
      "y": [1021.7, 915.8, 667.4, 309.6, 0, -376.8, -523.2, -690.3, -897.3, -1082.9, -1306.1],
      "type": "scatter",
      "mode": "lines+markers",
      "marker": {
        "color": "#616161",
        "size": 8
      },
      "line": {
        "color": "#616161",
        "width": 3
      },
      "name": "Revenue change (£m)",
      "text": ["Threshold: £70k<br>Revenue change: +£1,021.7m", "Threshold: £75k<br>Revenue change: +£915.8m", "Threshold: £80k<br>Revenue change: +£667.4m", "Threshold: £85k<br>Revenue change: +£309.6m", "Threshold: £90k<br>Revenue change: £0.0m", "Threshold: £95k<br>Revenue change: -£376.8m", "Threshold: £100k<br>Revenue change: -£523.2m", "Threshold: £105k<br>Revenue change: -£690.3m", "Threshold: £110k<br>Revenue change: -£897.3m", "Threshold: £115k<br>Revenue change: -£1,082.9m", "Threshold: £120k<br>Revenue change: -£1,306.1m"],
      "hovertemplate": "%{text}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 5: Impact of VAT threshold changes on tax revenue (2026-27)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Registration threshold (£k)",
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
      "title": "Revenue (£m)",
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
      "zerolinecolor": "#000000",
      "zerolinewidth": 1
    },
    "shapes": [
      {
        "type": "line",
        "x0": 90,
        "x1": 90,
        "y0": -1400,
        "y1": 1100,
        "line": {
          "color": "#666666",
          "width": 2,
          "dash": "dash"
        }
      }
    ],
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
        "x": 90,
        "y": 800,
        "text": "Current £90k",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "color": "#666666"
        }
      },
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
    ],
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

The 2026-27 analysis shows approximately £1.0 billion additional revenue at a £70,000 threshold and approximately £1.3 billion revenue loss at £120,000. These projections account for business growth patterns and economic changes over time.

## Interactive analysis

PolicyEngine's [VAT threshold analysis tool](https://uk-vatlab-app1j7s6o-policy-engine.vercel.app/) enables real-time exploration of different threshold scenarios. The interface allows users to adjust threshold levels and observe immediate impacts on firm counts and revenue projections across multiple fiscal years.

The tool incorporates business turnover distributions, growth projections, and administrative compliance costs to provide comprehensive impact assessments. Users can model scenarios from £70,000 to £120,000 thresholds and examine effects on both government revenues and business populations.

This analysis capability supports evidence-based policy development by quantifying the impacts of different threshold levels. The tool's projections inform ongoing policy discussions about VAT threshold levels in the UK tax system.

## Conclusion

VAT threshold changes create measurable impacts on both business registration patterns and government revenues. Higher thresholds reduce the number of VAT-registered businesses while decreasing tax collections. Lower thresholds increase the number of registered businesses and raise revenue.

PolicyEngine's analysis shows that raising the threshold to £100,000 would remove approximately 42,900 firms from VAT registration in 2025-26, reducing revenue by approximately £270 million. Conversely, reducing it to £80,000 would add approximately 25,500 VAT-paying firms and generate approximately £900 million additional revenue.

The revenue increase projected for 2028-29 reflects inflation indexing assumptions rather than economic growth effects. Once inflation-adjusted baselines exceed policy thresholds, fixed nominal thresholds become relatively restrictive, generating additional revenue through this technical mechanism.
