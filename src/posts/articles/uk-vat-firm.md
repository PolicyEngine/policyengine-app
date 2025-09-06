## Introduction

Value Added Tax (VAT) registration thresholds determine when businesses must register for VAT and begin charging customers 20% on their sales. The UK currently sets this threshold at [£90,000](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/) annual turnover, up from [£85,000](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/) in 2024. Businesses earning above this level must register for VAT and charge customers 20% on most goods and services, while those below remain exempt. This threshold creates a cliff-edge effect where businesses crossing £90,000 turnover must begin charging VAT on all sales and remitting collections to HMRC.

The Telegraph [reported](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/) that UK Chancellor Rachel Reeves is considering further increases to the VAT threshold as part of broader economic growth measures. Treasury officials have discussed raising the threshold as a growth-stimulating policy, though this faces opposition from some ministers who favour reducing it to [£30,000](https://www.telegraph.co.uk/politics/2024/04/27/labour-tax-adviser-suggests-slashing-vat-threshold/).

In this blog post, we introduce PolicyEngine's [VAT threshold analysis dashboard](https://uk-vatlab-app1j7s6o-policy-engine.vercel.app/), a tool that models the impacts of different VAT registration thresholds on UK businesses and government revenues. We analyse how threshold changes between £70,000 and £120,000 would affect the number of VAT-paying firms, examine revenue implications across fiscal years 2025-26 through 2029-30, and compare our projections with HMRC's official estimates.

## What the tool does

The [VAT threshold analysis dashboard](https://uk-vatlab-app1j7s6o-policy-engine.vercel.app/) enables real-time exploration of different VAT registration threshold scenarios. The interface allows users to adjust threshold levels and observe immediate impacts on firm counts and revenue projections across multiple fiscal years.

The tool incorporates business turnover distributions, growth projections, and administrative compliance costs to provide comprehensive impact assessments. Users can model scenarios from £70,000 to £120,000 thresholds and examine effects on both government revenues and business populations.

This analysis capability supports evidence-based policy development by quantifying the impacts of different threshold levels. The tool's projections inform ongoing policy discussions about VAT threshold levels in the UK tax system.

## Methodology

The analysis constructs synthetic firm microdata calibrated to [ONS UK Business statistics](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation) and [HMRC VAT statistics](https://www.gov.uk/government/statistics/value-added-tax-vat-annual-statistics). The data captures the distribution of firms by industry classification, turnover bands, employee counts, and VAT tax liability, using a multi-objective optimisation process to match both ONS firm structures and HMRC targets.

Figure 1 shows the distribution of UK firms by annual turnover in 2024, illustrating the concentration of businesses around key thresholds.

```plotly
{
  "data": [
    {
      "x": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299],
      "y": [4.821,5.301,5.283,5.630,5.762,5.745,6.014,6.092,6.068,6.538,6.732,6.558,6.882,6.964,7.288,7.333,7.315,7.319,7.644,7.769,7.639,7.723,7.977,8.077,8.264,8.286,8.582,8.657,8.661,8.785,8.689,8.875,9.041,9.149,9.361,9.363,9.221,9.363,9.480,9.426,9.543,9.656,9.647,9.769,9.899,9.697,10.024,10.194,10.341,10.191,10.391,10.464,10.099,10.306,10.582,10.393,10.388,10.471,10.541,10.677,10.391,10.487,10.879,10.705,10.638,10.628,10.605,10.899,10.833,10.675,10.756,10.678,10.587,10.492,10.583,10.637,10.437,10.270,10.308,10.507,10.527,10.165,10.290,10.258,10.102,9.997,9.687,9.878,9.849,8.399,7.012,7.141,6.874,6.837,6.832,6.835,6.712,6.575,6.791,6.437,6.436,6.412,6.455,6.240,6.336,6.223,5.939,5.999,5.945,5.763,5.709,5.880,5.763,5.630,5.528,5.590,5.426,5.520,5.413,5.294,5.281,5.248,5.141,5.168,5.177,5.090,5.100,5.008,5.187,4.999,4.942,4.932,4.963,4.893,4.867,5.022,4.969,4.898,4.800,4.890,4.869,4.746,4.839,4.821,4.853,4.868,4.791,4.849,4.931,4.202,3.219,3.433,3.275,3.250,3.339,3.301,3.293,3.347,3.344,3.335,3.301,3.342,3.359,3.317,3.257,3.417,3.346,3.369,3.341,3.281,3.450,3.364,3.270,3.367,3.293,3.296,3.307,3.412,3.405,3.311,3.287,3.331,3.327,3.330,3.347,3.337,3.412,3.430,3.417,3.438,3.427,3.244,3.462,3.335,3.347,3.431,3.342,3.368,3.372,3.314,3.311,3.398,3.404,3.333,3.350,3.311,3.292,3.331,3.298,3.163,3.343,3.215,3.179,3.194,3.228,3.230,3.208,3.171,3.087,3.165,3.108,3.085,3.092,3.100,3.016,3.024,2.999,2.886,2.880,2.807,2.802,2.814,2.758,2.718,2.747,2.698,2.571,2.595,2.554,2.432,2.441,2.346,2.476,2.452,2.408,2.417,2.249,2.272,2.185,2.126,2.139,2.093,2.053,1.942,1.979,1.926,1.935,1.876,1.811,1.741,1.762,1.705,1.681,1.668,1.613,1.547,1.577,1.490,1.453,1.474,1.414,1.385,1.329,1.320,1.339,1.276,1.322,1.309,1.212,1.162,1.194,1.207,1.171,1.122,1.121,1.119,1.096,1.112,1.044,1.067,1.036,1.016,1.058,0.944,1.022,0.987,1.025,0.957,0.929],
      "type": "bar",
      "marker": {
        "color": "#A0A0A0",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Turnover: £%{x}k<br>Firms: %{y:,.1f}k<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 1: Distribution of UK firms by annual turnover",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Annual turnover (£k)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "showgrid": true,
      "gridcolor": "#FFFFFF",
      "gridwidth": 1,
      "range": [0, 300],
      "tick0": 0,
      "dtick": 25
    },
    "yaxis": {
      "title": "Number of firms (thousands)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickformat": ",.0f",
      "showgrid": true,
      "gridcolor": "#FFFFFF",
      "gridwidth": 1
    },
    "shapes": [
      {
        "type": "line",
        "x0": 90,
        "x1": 90,
        "y0": 0,
        "y1": 11,
        "line": {
          "color": "#2C6496",
          "width": 2,
          "dash": "dash"
        }
      },
      {
        "type": "line",
        "x0": 150,
        "x1": 150,
        "y0": 0,
        "y1": 11,
        "line": {
          "color": "#2C6496",
          "width": 2,
          "dash": "dash"
        }
      }
    ],
    "annotations": [
      {
        "x": 92,
        "y": 10.5,
        "text": "VAT threshold<br>(£90k)",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 11,
          "color": "#333333"
        },
        "align": "left",
        "xanchor": "left"
      },
      {
        "x": 152,
        "y": 10.5,
        "text": "Flat Rate<br>Scheme (£150k)",
        "showarrow": false,
        "font": {
          "family": "Roboto Serif",
          "size": 11,
          "color": "#333333"
        },
        "align": "left",
        "xanchor": "left"
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
    "height": 500,
    "margin": {
      "l": 60,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "plot_bgcolor": "#ebf2fa",
    "paper_bgcolor": "#ebf2fa"
  }
}
```

The distribution shows a drop in firm density around the £90,000 VAT threshold, with businesses clustering just below this level. The £150,000 threshold marks the limit for the [VAT Flat Rate Scheme](https://www.gov.uk/vat-flat-rate-scheme), which offers simplified VAT accounting for smaller businesses.

The analysis below and the dashboard calculate static effects for each scenario, including revenue changes and the number of firms affected by sector and size. Simulations cover fiscal years 2025-26 through 2029-30 by ageing the synthetic firm microdata in accordance with OBR and HMRC projections. All projections assume static conditions and do not incorporate any firm responses to threshold changes.

## Comparison with HMRC projections

HMRC published revenue projections for raising the VAT threshold from [£85,000 to £90,000](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts) across the 2024-29 period. Figure 2 compares PolicyEngine's estimates with HMRC's official projections for this specific policy change.

```plotly
{
  "data": [
    {
      "x": ["2024-25", "2025-26", "2026-27", "2027-28", "2028-29"],
      "y": [-150, -185, -125, -50, 65],
      "type": "bar",
      "marker": {
        "color": "#2C6496"
      },
      "name": "HMRC",
      "hovertemplate": "Year: %{x}<br>HMRC: £%{y}m<extra></extra>"
    },
    {
      "x": ["2024-25", "2025-26", "2026-27", "2027-28", "2028-29"],
      "y": [-183.012, -184.498, -114.333, -40.224, 72.293],
      "type": "bar",
      "marker": {
        "color": "#616161"
      },
      "name": "PolicyEngine",
      "hovertemplate": "Year: %{x}<br>PolicyEngine: £%{y:.3f}m<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 2: Revenue impact of increasing the VAT registration threshold (2024-29)",
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
    "legend": {
      "font": {
        "family": "Roboto Serif"
      }
    },
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

Both models project revenue losses in the first four years, followed by revenue gains in 2028-29. HMRC estimates a [£185 million](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts) loss in 2025-26, while PolicyEngine projects a £184 million loss. The 2028-29 revenue increase occurs because the baseline assumes inflation indexing would raise the threshold above £90,000 by that point, making the £90,000 policy threshold relatively restrictive.

PolicyEngine's projections align closely with HMRC's official estimates, with the largest absolute difference of £33 million occurring in 2024-25. In 2025-26, the estimates are nearly identical, differing by less than £1 million.

## Revenue impacts

We estimate that changes to the VAT threshold create corresponding effects on government revenue. Lower thresholds increase the number of VAT-paying businesses, raising revenue. Higher thresholds reduce registered businesses and decrease collections.

Figure 5 shows the revenue impact of different threshold levels in 2025-26.

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
      "text": "Figure 5: Impact of VAT threshold changes on tax revenue (2025-26)",
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
        "x": 95,
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

We estimate that a threshold reduction to £70,000 would generate approximately £1.3 billion additional revenue in 2025-26. Conversely, raising the threshold to £120,000 would cost approximately £1.1 billion. The revenue effects show a steeper gradient than firm count changes, reflecting that businesses near the threshold generate substantial VAT payments relative to their number.

Figure 6 presents revenue impacts for 2026-27, following similar patterns with slight variations.

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
      "text": "Figure 6: Impact of VAT threshold changes on tax revenue (2026-27)",
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
        "x": 95,
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

We estimate that in 2026-27, a £70,000 threshold would generate approximately £1.0 billion additional revenue while a £120,000 threshold would result in approximately £1.3 billion revenue loss. These projections account for business growth patterns and economic changes over time.

## Impact on VAT-paying firms

We estimate that raising the VAT threshold would reduce the number of businesses required to register for VAT. Figure 3 shows how different threshold levels would change the number of VAT-paying firms in 2025-26.

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
      "text": "Figure 3: Change in VAT-paying firms by threshold (2025-26)",
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
        "x": 95,
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

At the current £90,000 threshold, no change occurs by definition. We estimate that lowering the threshold to £70,000 would bring approximately 44,000 additional firms into the VAT system, while raising it to £120,000 would remove approximately 120,500 firms from VAT registration requirements.

The relationship shows progression, with threshold increases removing firms from VAT obligations. This pattern reflects the distribution of business turnover levels approximately the threshold.

Figure 4 presents the same analysis for 2026-27, showing similar patterns with slight variations in magnitude.

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
      "text": "Figure 4: Change in VAT-paying firms by threshold (2026-27)",
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
        "x": 95,
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

We project that in 2026-27, approximately 40,700 additional firms would enter VAT at a £70,000 threshold and approximately 120,000 firms would leave at a £120,000 threshold. These figures reflect both business growth and entry/exit patterns over time.

## Conclusion

VAT threshold changes create measurable impacts on government revenues. Higher thresholds reduce the number of VAT-registered businesses while decreasing tax collections. Lower thresholds increase the number of registered businesses and raise revenue. We estimate that raising the threshold to £100,000 would remove approximately 42,900 firms from VAT registration in 2025-26, reducing revenue by approximately £270 million.

We invite you to use PolicyEngine's [VAT threshold analysis tool](https://uk-vatlab-app1j7s6o-policy-engine.vercel.app/) to explore custom threshold scenarios and conduct your own analysis of VAT policy impacts.
