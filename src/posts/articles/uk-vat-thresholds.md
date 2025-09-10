_Photograph: House of Commons/Reuters_

## Introduction

The UK requires businesses to register for VAT and charge customers 20% on their sales once annual turnover reaches [£90,000](https://www.gov.uk/vat-registration-thresholds), up from [£85,000](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold) in 2024-25. The Telegraph [reported](https://www.telegraph.co.uk/business/2025/08/30/reeves-talks-to-raise-vat-threshold-battle-to-grow-economy/) that Chancellor Rachel Reeves is considering further increases to the VAT threshold.

We analyse how VAT threshold changes between £70,000 and £120,000 would affect revenues and the number of VAT-paying firms for the 2026-27 fiscal year. We constructed synthetic firm microdata to generate these projections and compare them with HMRC's official estimates.

## Methodology

We calibrated synthetic firm microdata to official UK business statistics from two sources: [ONS UK Business statistics](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation) for overall firm distributions and [HMRC VAT statistics](https://www.gov.uk/government/statistics/value-added-tax-vat-annual-statistics) for VAT-registered businesses.

Figure 1 shows the distribution of UK firms by turnover band in 2024 according to ONS business statistics.

```plotly
{
  "data": [
    {
      "x": ["£0-49k", "£50-99k", "£100-249k", "£250-499k", "£500-999k", "£1-5m", "£5m+"],
      "y": [777330, 1075080, 1749330, 769140, 469320, 452890, 156460],
      "type": "bar",
      "marker": {
        "color": "#A0A0A0",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Turnover band: %{x}<br>Firms: %{y:,.0f}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 1: Distribution of UK firms by turnover band, 2024 (ONS)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Turnover band",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif",
        "size": 10
      },
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1
    },
    "yaxis": {
      "title": "Number of firms (thousands)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickvals": [0, 200000, 400000, 600000, 800000, 1000000, 1200000, 1400000, 1600000, 1800000],
      "ticktext": ["0", "200", "400", "600", "800", "1,000", "1,200", "1,400", "1,600", "1,800"],
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
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: ONS UK Business Statistics",
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

ONS data shows 32.1% of UK firms have turnover between £100,000 and £249,000, with 14.3% below £50,000 and 19.7% in the £50,000-£99,000 range. Most UK businesses operate with turnover below £250,000.

Figure 2 presents the distribution of VAT-registered firms by turnover band in 2024-25 from HMRC statistics.

```plotly
{
  "data": [
    {
      "x": ["≤£0", "£1-90k", "£90-150k", "£150-300k", "£300-500k", "£500k-1m", "£1-10m", ">£10m"],
      "y": [216500, 678350, 305320, 334470, 184080, 180500, 235060, 44680],
      "type": "bar",
      "marker": {
        "color": "#A0A0A0",
        "line": {
          "width": 0
        }
      },
      "hovertemplate": "Turnover band: %{x}<br>Firms: %{y:,.0f}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 2: Distribution of VAT-registered firms by turnover band, 2024-25 (HMRC)",
      "font": {
        "family": "Roboto Serif",
        "size": 16
      },
      "x": 0,
      "xanchor": "left"
    },
    "xaxis": {
      "title": "Turnover band",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif",
        "size": 10
      },
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1
    },
    "yaxis": {
      "title": "Number of firms (thousands)",
      "titlefont": {
        "family": "Roboto Serif"
      },
      "tickfont": {
        "family": "Roboto Serif"
      },
      "tickvals": [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000],
      "ticktext": ["0", "100", "200", "300", "400", "500", "600", "700"],
      "showgrid": true,
      "gridcolor": "#e0e0e0",
      "gridwidth": 1
    },
    "height": 500,
    "margin": {
      "l": 100,
      "r": 50,
      "b": 100,
      "t": 100,
      "pad": 4
    },
    "annotations": [
      {
        "x": 1,
        "y": -0.25,
        "xref": "paper",
        "yref": "paper",
        "text": "Source: HMRC VAT Annual Statistics",
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

HMRC data shows 31.1% of VAT-registered firms have turnover between £1 and £90,000, just below the registration threshold, with 14.0% in the £90,000-£150,000 band.

We constructed synthetic firm microdata through multi-objective optimisation that matches both ONS firm structures and HMRC targets. The data captures firms by industry classification, turnover bands, employee counts, and VAT tax liability.

Figure 3 shows the resulting distribution of UK firms by annual turnover in 2024.

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
      "text": "Figure 3: Distribution of UK firms by annual turnover, 2024",
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
      "gridcolor": "#e0e0e0",
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
      "gridcolor": "#e0e0e0",
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
        "text": "VAT Flat Rate<br>Scheme (£150k)",
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

The distribution shows drops in firm density above both the £90,000 VAT threshold and the £150,000 [VAT Flat Rate Scheme](https://www.gov.uk/vat-flat-rate-scheme) limit, which offers simplified VAT accounting for smaller businesses.

We construct the initial synthetic firm set for 2024-25, then age turnover and VAT liability values to 2026-27 using growth factors from the [OBR's Retail Price Index forecasts](https://obr.uk/efo/economic-and-fiscal-outlook-march-2024/#annex-a), maintaining the same number of firms. Projections assume no behavioral responses to threshold changes.

## Comparison with HMRC projections

HMRC published revenue projections for raising the VAT threshold from [£85,000 to £90,000](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts) across the 2024-29 period. My colleague Max Ghenis [confirmed](https://maxghenis.substack.com/p/vat-thresholds-revenues-and-the-role) that HMRC assumed baseline thresholds of £85,000 in 2024-25, £87,000 in 2025-26, £89,000 in 2026-27, and £92,000 in 2028-29. Figure 4 compares PolicyEngine's estimates with HMRC's projections.

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
        "color": "#A0A0A0"
      },
      "name": "PolicyEngine",
      "hovertemplate": "Year: %{x}<br>PolicyEngine: £%{y:.3f}m<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 4: Revenue impact of increasing the VAT registration threshold (2024-29)",
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

Both models project revenue losses in the first four years, followed by gains in 2028-29. HMRC estimates a [£185 million](https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds/increasing-the-vat-registration-threshold#summary-of-impacts) loss in 2025-26; PolicyEngine projects £184 million. The 2028-29 revenue increase occurs because HMRC's baseline assumes the threshold would grow with inflation to £92,000 by that point, so fixing it at £90,000 captures more firms. PolicyEngine's estimates deviate an average 12.3% from HMRC's projections across all five years.

## Revenue impacts

Figure 7 shows revenue impacts for different thresholds in 2026-27.

```plotly
{
  "data": [
    {
      "x": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
      "y": [642.0, 504.9, 352.9, 188.2, 0, -186.2, -370.5, -556.0, -747.9, -945.6, -1142.2],
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
      "text": ["Threshold: £70k<br>Revenue change: +£642.0m", "Threshold: £75k<br>Revenue change: +£504.9m", "Threshold: £80k<br>Revenue change: +£352.9m", "Threshold: £85k<br>Revenue change: +£188.2m", "Threshold: £90k<br>Revenue change: £0.0m", "Threshold: £95k<br>Revenue change: -£186.2m", "Threshold: £100k<br>Revenue change: -£370.5m", "Threshold: £105k<br>Revenue change: -£556.0m", "Threshold: £110k<br>Revenue change: -£747.9m", "Threshold: £115k<br>Revenue change: -£945.6m", "Threshold: £120k<br>Revenue change: -£1,142.2m"],
      "hovertemplate": "%{text}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 7: Impact of VAT threshold changes on tax revenue (2026-27)",
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

In 2026-27, a £70,000 threshold would generate approximately £642 million additional revenue while a £120,000 threshold would reduce revenue by approximately £1.1 billion.

## Impact on VAT-paying firms

Figure 5 shows how different threshold levels change the number of VAT-paying firms in 2026-27.

```plotly
{
  "data": [
    {
      "x": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
      "y": [109.105, 81.456, 54.086, 27.12, 0, -26.006, -47.621, -65.847, -83.434, -100.46, -116.319],
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
      "text": ["Threshold: £70k<br>Firms affected: 109,105", "Threshold: £75k<br>Firms affected: 81,456", "Threshold: £80k<br>Firms affected: 54,086", "Threshold: £85k<br>Firms affected: 27,120", "Threshold: £90k<br>Firms affected: 0", "Threshold: £95k<br>Firms affected: 26,006", "Threshold: £100k<br>Firms affected: 47,621", "Threshold: £105k<br>Firms affected: 65,847", "Threshold: £110k<br>Firms affected: 83,434", "Threshold: £115k<br>Firms affected: 100,460", "Threshold: £120k<br>Firms affected: 116,319"],
      "hovertemplate": "%{text}<extra></extra>"
    }
  ],
  "layout": {
    "title": {
      "text": "Figure 5: Change in VAT-paying firms by threshold (2026-27)",
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
        "y1": 120,
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

A £70,000 threshold would add approximately 109,000 firms to VAT registration in 2026-27, while a £120,000 threshold would remove approximately 116,000 firms.

## Conclusion

Our synthetic firm microsimulation model shows that VAT threshold changes affect government revenues and the number of VAT-registered businesses. Raising the threshold to £100,000 would remove approximately 48,000 firms from VAT registration in 2026-27, reducing revenue by approximately £371 million.

This analysis represents PolicyEngine's first application of firm-level microsimulation to UK tax policy. In the coming weeks, we'll apply this VAT model to evaluate other policy alternatives, including sector-specific thresholds, phase-ins, and mechanisms to address cliff effects.
