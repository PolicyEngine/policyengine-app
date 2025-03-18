Work and Pensions Secretary Liz Kendall has [announced](https://www.gov.uk/government/consultations/pathways-to-work-reforming-benefits-and-support-to-get-britain-working-green-paper/pathways-to-work-reforming-benefits-and-support-to-get-britain-working-green-paper#section-1--what-the-reformed-system-will-look-like) reforms to the Personal Independence Payment (PIP) that would reduce benefits by £5 billion by 2029-30. The reform restricts eligibility for the daily living (DL) part based on severity.

Using the open-source PolicyEngine microsimulation model, we simulated the impact of two potential realisations of this policy:

1. Assign each PIP DL participant an equal chance of losing eligibility
2. Assign only non-enhanced PIP DL participants an equal chance of losing eligibility

We then calibrated each potential realisation to reduce benefits by £5 billion by 2029-30.

## How PIP works

DWP qualifies people for PIP based on a [points system](https://www.legislation.gov.uk/uksi/2013/377). Daily living and mobility parts each require at least 8 points for the lower (standard) amount and 12 points for the higher (enhanced) parts. Daily living has 10 activities; mobility has two. PIP does not have an income or asset limit.

**Table 1: PIP amounts (2025)**

| **Component**     | **Lower weekly rate** | **Higher weekly rate** |
| ----------------- | --------------------- | ---------------------- |
| Daily living part | £72.65                | £108.55                |
| Mobility part     | £28.70                | £75.75                 |

We uprate these elements with inflation, projecting that by 2029, the daily living part will be [£80.31 (lower)](https://policyengine.org/uk/policy?reform=1&focus=gov.dwp.pip.daily_living.standard) and [£119.99 (higher)](https://policyengine.org/uk/policy?reform=1&focus=gov.dwp.pip.daily_living.enhanced) per week.

## The reform

The [green paper](https://www.gov.uk/government/consultations/pathways-to-work-reforming-benefits-and-support-to-get-britain-working-green-paper/pathways-to-work-reforming-benefits-and-support-to-get-britain-working-green-paper#section-1--what-the-reformed-system-will-look-like) states:

_"We will introduce a new, additional eligibility requirement so that a minimum of 4 points must be scored on one PIP daily living activity to receive the daily living element of the benefit. This means that people who only score the lowest points on each of the PIP daily living activities will lose their entitlement in future."_

## The simulation results

The reform may affect both non-enhanced and enhanced PIP DL enrollees, so we simulated realisations that remove both non-enhanced only and all PIP DL enrollees. For each realisation, we adjusted the removal share of the affected population to result in £5 billion in reduced benefit payments.

**Table 2: Total impacts of PIP DL reforms in 2029**

| **Realisation**       | **Cut to PIP DL non-enhanced** | **Cut to total PIP DL** | **Poverty** | **Deep poverty** |
| --------------------- | ------------------------------ | ----------------------- | ----------- | ---------------- |
| Only cut non-enhanced | 62%                            | 35%                     | 134,000     | 28,000           |
| Cut all               | 25%                            | 25%                     | 119,000     | 63,000           |

In the realisation that cuts both enhanced and non-enhanced, the reform increases female poverty in greater absolute numbers than male, but the reverse is true for deep poverty.

**Table 3: Poverty impacts by gender of PIP DL reforms in 2029**
| **Realisation** | **Male poverty** | **Female poverty** | **Male deep poverty** | **Female deep poverty** |
|-----------------|------------------|--------------------|-----------------------|-------------------------|
| Only cut non-enhanced | 29,000 | 28,000 | 8,000 | 3,000 |
| Cut all | 55,000 | 64,000 | 34,000 | 28,000 |

Our model and analysis [code](https://gist.github.com/nikhilwoodruff/1d1b89276162a09aa81061d6abd6e21a) is open-source. All poverty statistics represent absolute poverty before housing costs. We invite users to explore other PIP reforms at policyengine.org/uk.
