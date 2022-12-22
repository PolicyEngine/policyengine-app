# Impact of the Chancellor’s Cost of Living Support package

See the analysis in PolicyEngine UK

Today, the Chancellor of the Exchequer [announced a new Cost of Living Support package](https://www.gov.uk/government/news/millions-of-most-vulnerable-households-will-receive-1200-of-help-with-cost-of-living) of cash transfers:

- £650 to households receiving means-tested benefits

- £150 to households receiving non-means-tested disability benefits

- £300 to households receiving the Winter Fuel Payment (i.e., those with pensioners)

- £200 to households receiving energy bills, doubling the [Energy Bills Support Scheme rebate announced in February](https://www.gov.uk/government/news/millions-to-receive-350-boost-to-help-with-rising-energy-costs) and removing the need to repay it over five years

Alongside a six-month extension of the Household Support Fund, HM Treasury estimated that the package would cost £15.3bn, and be partly offset by £5bn from a new temporary Energy Profits Levy. We’ve added these four payments (not the Household Support Fund or Energy Profits Levy) to PolicyEngine. This post shows how to define the reform in PolicyEngine, compares PolicyEngine’s results to HM Treasury’s, and shows novel impacts on poverty, inequality, and households.

## Defining the reform in PolicyEngine

_Skip this section to see the results._

To accommodate this package, we’ve added a new section to the Benefit menu in the [Policy page](https://policyengine.org/uk/policy), for the _Cost-of-living support payment_. This includes payments to each of the three new household categories: those receiving means tested benefits, those with pensioners (the qualification for receiving Winter Fuel Payment), and those receiving non-means-tested disability benefits. These are set to £0 until they become legislation.

![](https://cdn-images-1.medium.com/max/3200/0*fKtwMJpHA8ua9nti)

To model the Cost of Living Support package, set these parameters to £650, £300, and £150, respectively.

![](https://cdn-images-1.medium.com/max/3200/0*niEvXilrDsNIERMK)

Next, navigate to the _Energy bills support_ menu. This defaults to £0 because it doesn’t take effect until October. Set it to £400.

![](https://cdn-images-1.medium.com/max/3200/0*-QfroG-AojdZbEiv)

This, however, will compare the full £400 against £0. To focus on the additional £200, we need to first set the baseline value to £200 by toggling the Baseline in the upper right and setting the credit to £200. This effectively front-loads the £200 announced in February to the beginning of the year.

![](https://cdn-images-1.medium.com/max/3200/0*ZC3T6NytGLf7n9SM)

If you made it this far, congratulations, you’ve modelled the newly announced Cost of Living Support package! Your URL should look like this: [https://policyengine.org/uk/policy?col_benefit_payment_amount=650&col_disability_payment_amount=150&col_pensioner_payment_amount=300&ebr_energy_bills_credit=400&baseline_ebr_energy_bills_credit=200](https://policyengine.org/uk/policy?col_benefit_payment_amount=650&col_disability_payment_amount=150&col_pensioner_payment_amount=300&ebr_energy_bills_credit=400&baseline_ebr_energy_bills_credit=200).

## Budgetary impact

![](https://cdn-images-1.medium.com/max/4544/1*1QUONsnbioHZgnKl5cd3gw.png)

PolicyEngine estimates that these four programs would cost £16.2bn, 9% higher than HM Treasury’s estimate of £14.8bn. Most of this discrepancy, and the largest proportional discrepancy, comes from the payment to pensioner households receiving Winter Fuel Payment. It’s not clear how HM Treasury estimated that this program would cost £2.5bn; the [factsheet](https://www.gov.uk/government/publications/cost-of-living-support/cost-of-living-support-factsheet-26-may-2022) states that it is not exclusive with other payments, and [DWP forecasts 11.4m households receiving Winter Fuel Payment in 2022–23](https://www.gov.uk/government/publications/benefit-expenditure-and-caseload-tables-2021), which would cost £3.4bn when multiplied by £300.

## Comparison to HM Treasury distributional impact

HM Treasury released an [“Illustrative analysis of the impact of the Cost of Living Support packages on households”](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1078837/DA_May_2022_publication.pdf) along with the package announcement, including distributional impacts on English households. Here’s one chart from their report:

![](https://cdn-images-1.medium.com/max/3200/0*kNAJvbiWYIkVklP6)

To replicate these results, select England from the Geography menu in the Policy page. Doing so yields [this impact page](https://policyengine.org/uk/population-impact?col_benefit_payment_amount=650&col_disability_payment_amount=150&col_pensioner_payment_amount=300&ebr_energy_bills_credit=400&baseline_ebr_energy_bills_credit=200&baseline_country_specific=ENGLAND).

![](https://cdn-images-1.medium.com/max/3052/0*SIcutajl_eFEU4Mn)

This shows that the package would increase incomes among low-income England households by a larger percentage than high-income England households (the same holds across the UK). PolicyEngine estimates slightly larger impacts than HM Treasury, aligning with our larger budgetary impact; for example, increasing the bottom decile’s income by 8% instead of 7%.

![](https://cdn-images-1.medium.com/max/3200/0*sfXwma_6_dIT67cS)

HM Treasury also shows the impact by decile in pounds.

![](https://cdn-images-1.medium.com/max/3200/0*mhiMc1dHvacyjXnn)

PolicyEngine estimates a lower absolute impact on low-income households than HM Treasury. Combined with the relative impact graph, these results reveal that PolicyEngine estimates a significantly lower baseline income for households in the bottom income decile than HM Treasury: £500 / 8.1% = ~£6,200, compared to £830 / 7% = ~£12,000. This is probably due to our reweighting, which improves the accuracy of our microdata, but we’ll investigate it further in [this GitHub issue](https://github.com/PolicyEngine/policyengine/issues/740).

![](https://cdn-images-1.medium.com/max/3200/0*c0wwoflvFJ-eqqor)

## Poverty and inequality impact

In addition to the decile breakdowns, PolicyEngine estimates the poverty and inequality impacts. Overall, the package lowers the poverty rate by 7%, and by 17% among pensioners.

![](https://cdn-images-1.medium.com/max/3200/0*tMkZ4fTNtcOR4O6g)

The package has a larger effect on deep poverty–the population share whose household has net income below half its poverty threshold–lowering it by 10%, and more consistently across age groups than the poverty impact.

![](https://cdn-images-1.medium.com/max/3200/0*pwjC5NxVYM0sV9Rq)

The policy would also lower inequality, especially measured most broadly via the Gini index, which would fall 1.8%.

![](https://cdn-images-1.medium.com/max/3200/0*mQx7AjV1JbdzydRD)

## Impact on individual households

The package provides between £200 and £1,100 for each household. £650 of that depends on a household’s earnings, since it is limited to claimants of means-tested benefits. This creates a “welfare cliff” at the point where a household is no longer eligible for means-tested benefits.

For example, an unmarried person with no children will receive £850 if they earn between £0 and about £7,300 per year. Once they earn more than that, they would receive £200. Their net income after taxes and benefits would fall from £8,504 when they earn £7,300, to £7,950 when they earn £7,400. To exceed £8,504 net income, their earnings would have to rise to about £8,000; that is, they’d see less net income earning between £7,300 and £8,000.

![](https://cdn-images-1.medium.com/max/2916/0*SPY_UZBNq8oHBK_0)

The placement and size of this “earnings dead zone” (the shaded rectangle) depends on household characteristics. For example, a family of four paying £1,000 per month for rent would see it between £67,900 and £69,100 earnings, since families can earn more and still receive means-tested benefits.

![](https://cdn-images-1.medium.com/max/2948/0*wFCqcj0lTdjAlyFv)

## Conclusion

PolicyEngine UK now supports payments to households receiving means-tested benefits, non-means-tested disability benefits, and Winter Fuel Payment. You can set these values to mirror the Chancellor’s announcement, or define your own household payment scheme. Our estimates generally fall within 10% of HM Treasury’s, and we’ve also produced the first poverty and inequality analyses of the package, as well as personalised estimates that reveal welfare cliffs.

**To explore the package in more detail, [see our full analysis in PolicyEngine UK](https://policyengine.org/uk/population-impact?col_benefit_payment_amount=650&col_disability_payment_amount=150&col_pensioner_payment_amount=300&ebr_energy_bills_credit=400&baseline_ebr_energy_bills_credit=200).**
