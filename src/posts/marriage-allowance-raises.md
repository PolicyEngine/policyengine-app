# Raising the marriage allowance from 10% to 100%

See the reform in PolicyEngine

![A couple putting on a wedding ring.](https://cdn-images-1.medium.com/max/2846/0*fc3BRBJv8D_8kk2v)_A couple putting on a wedding ring._

On 21 July, UK Prime Minister candidate Liz Truss promised to “review the taxation of families to ensure people aren’t penalised for taking time out to care for their children or elderly relatives.” Her campaign team [elaborated](https://www.reuters.com/world/uk/uk-pm-candidate-truss-eyes-tax-breaks-carers-2022-07-21/) that this involved transferring the full personal tax allowance within households, rather than the 10 percent allowed under current law, though they haven’t specified if the reform would also affect other parts of the policy, such as the limitation to Basic Rate taxpayers.

In this blog post, I’ll explain the marriage allowance and show how to use PolicyEngine to score two potential reforms to the policy:

1. [\*\*Raising the marriage allowance from 10% to 100%.](https://policyengine.org/uk/population-impact?marriage_allowance_cap=100)\*\* PolicyEngine estimates that this reform would cost £3.05 billion in 2022, lowering poverty by 0.5%, benefiting 15% of the population, and widening the marriage allowance’s earnings dead zone by roughly a factor of 10.

1. [\*\*Raising the marriage allowance from 10% to 100% and removing the limitation to Basic Rate taxpayers.](https://policyengine.org/uk/population-impact?marriage_allowance_cap=100&abolish_marriage_allowance_income_condition=1)\*\* PolicyEngine estimates that this reform would cost £5.91 billion in 2022, lowering poverty by 0.5%, benefiting 20% of the population, and removing the marriage allowance’s earnings dead zone.

## What is the marriage allowance?

The [marriage allowance](https://www.gov.uk/marriage-allowance) allows a person to transfer £1,260 of their personal allowance (10% of the maximum) to their spouse, if their income is below the personal allowance and their spouse pays income tax at the basic rate (income between £12,571 and £50,270).

To compute the impact of the current marriage allowance in PolicyEngine, [compare the current law to a baseline without the marriage allowance.](https://policyengine.org/uk/population-impact?marriage_allowance_cap=10&baseline_marriage_allowance_cap=0)

For example, consider a married couple with one child. One person earns £30,000, and the other earns £0. Without the marriage allowance, they would pay £5,954 in taxes; the marriage allowance lowers that by £252 to £5,702. However, since DWP bases benefits on after-tax income, they also lose £139 of benefits. In total, the marriage allowance increases their net income by £113, or about 0.4%.

![](https://cdn-images-1.medium.com/max/3200/0*IY_xXY22mfz2x73x)

This household benefits from the marriage allowance because their earnings are higher than the personal allowance, but lower than the basic rate threshold. The marriage allowance increases their net income by £113 if their income qualifies them for Universal Credit; once they become ineligible, it increases their net income by £252. The marriage allowance creates a welfare cliff with an associated earnings dead zone about £600 wide — the household is worse off earning between about £50,200 and £50,800.

![](https://cdn-images-1.medium.com/max/3116/0*xF8DsVz0qIXXevqg)

Overall, PolicyEngine estimates that the marriage allowance currently costs £844 million per year, cuts poverty 0.8%, and benefits 17% of the population. For comparison, [HMRC estimated the true budgetary impact](https://researchbriefings.files.parliament.uk/documents/SN00870/SN00870.pdf) at £560 million in 2020/21, 34% below our 2022 estimate. However, HMRC reports that actual costs have been 30% to 37% below HMRC forecasts from 2016/17 to 2018/19. PolicyEngine’s forecasts, like HMRC’s, do not consider the take-up rate of the program, though [we intend to model the marriage allowance’s take-up rate in the future](https://github.com/PolicyEngine/openfisca-uk/issues/623).

## How does increasing the marriage allowance from 10% to 100% affect a household?

Let’s return to our sample household: a married couple with one child, one of whom earns £30,000 and the other earns £0. If we [compare their situation](https://policyengine.org/uk/household?marriage_allowance_cap=100) under current law to that in which the marriage allowance rises from 10% to 100%, we see that the reform would increase their net income by £2,143, or 8.4%. This again comes from lower taxes, which are partly offset by lower benefits.

![](https://cdn-images-1.medium.com/max/3200/0*dS7FHuDa6qzqDSHD)

The household would benefit from the policy if their income between about £13,830 (the £12,570 personal allowance plus the £1,260 current marriage allowance) and £50,270. They would receive the maximum gain of £2,262 for earnings between £30,400 and £50,270.

![](https://cdn-images-1.medium.com/max/3144/0*4KZZFs4JwdkocX9a)

The reform lowers marginal tax rates by 9.0p for earnings between £13,830 and £25,200, and then by 36.7p for earnings between £27,000 and £30,200. It then amplifies the cliff by an order of magnitude, from its current £252 to £2,514 (£2,262 + £252). The policy widens the earnings dead zone by a similar factor to £5,600: the household is worse off earning above £50,270 until their earnings exceed £55,800.

![](https://cdn-images-1.medium.com/max/3200/0*IlxZTi9EJ5bsJng7)

[\*\*You can enter your household information here to see how it would affect you.](https://policyengine.org/uk/household?marriage_allowance_cap=100)\*\*

## How does increasing the marriage allowance from 10% to 100% affect the population?

Raising the marriage allowance to 100% lowers tax liabilities by £3.36 billion, partly offset by £309 million less in benefit outlays. The reform costs £3.05 billion on net.

![](https://cdn-images-1.medium.com/max/3200/0*YJqbE0m1-c2KiAC0)

Overall, the reform cuts poverty by 0.5%, including child poverty by 0.8%. It has no effect on senior poverty or deep poverty.

![](https://cdn-images-1.medium.com/max/3200/0*t0fNme32sgA86h6j)

As a percentage of income, expanding the marriage allowance most benefits households in the second through fourth deciles.

![](https://cdn-images-1.medium.com/max/3200/0*P2_1CJU4mH1gN90s)

Similarly, households in the second through fourth deciles are most likely to benefit, and most likely to gain at least 5% of their income.

![](https://cdn-images-1.medium.com/max/3200/0*Wa_NYSZdWUVIrAVi)

We can aggregate these impacts to find that the reform reduces inequality according to the three measures reported by PolicyEngine: the Gini index (a broad measure) falls by 0.5%, and the net income shares held by the top 10% and 1% each fall by 0.3%.

![](https://cdn-images-1.medium.com/max/3200/0*swg8UEVRUQgcjA64)

[\*\*Explore the full population impacts of the reform in PolicyEngine here](https://policyengine.org/uk/population-impact?marriage_allowance_cap=100), and [find how it would affect your own household here.](https://policyengine.org/uk/household?marriage_allowance_cap=100)\*\*

## How does removing the Basic Rate restriction affect households?

Since our sample household is in the Basic Rate band, removing that restriction doesn’t affect them at £30,000 income. However, if their income rises, the policy continues to benefit them, up to £5,656 per year if their income exceeds £162,600.

![](https://cdn-images-1.medium.com/max/3200/0*js3K_uoEtwe_2yX9)

This reform would also lower their marginal tax rates in several earnings regions.

![](https://cdn-images-1.medium.com/max/3156/0*ERQ1akHhXK9d5BKQ)

## How does removing the Basic Rate restriction affect the population?

Compared to only raising the percentage, removing the Basic Rate restriction roughly doubles the budgetary impact and has roughly no additional poverty impact. The main difference is that upper income deciles would benefit more, in particular the top two which would not benefit without this provision.

![](https://cdn-images-1.medium.com/max/3200/0*I28U_nsGjYjwsAm3)

[\*\*Explore the full population impacts of the reform in PolicyEngine here](https://policyengine.org/uk/population-impact?marriage_allowance_cap=100&abolish_marriage_allowance_income_condition=1), and [find how it would affect your own household here.](https://policyengine.org/uk/household?marriage_allowance_cap=100&abolish_marriage_allowance_income_condition=1)\*\*
